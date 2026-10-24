const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\e858ec00-aa45-40e5-b683-e289a43f24c3';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_f2_verify';
const CDP_PORT = 9290;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = ''; res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) { this.wsUrl = wsUrl; this.id = 1; this.callbacks = new Map(); }
  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = e => {
        const m = JSON.parse(e.data);
        if (m.id && this.callbacks.has(m.id)) {
          const { resolve, reject } = this.callbacks.get(m.id);
          this.callbacks.delete(m.id);
          if (m.error) reject(m.error); else resolve(m.result);
        }
      };
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = this.id++;
      this.callbacks.set(msgId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }
  async eval(expression) {
    const res = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) throw new Error(JSON.stringify(res.exceptionDetails));
    return res.result ? res.result.value : undefined;
  }
  async screenshot(filename) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const p = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(p, Buffer.from(res.data, 'base64'));
    console.log('[SAVED]: ' + filename);
  }
  close() { if (this.ws) this.ws.close(); }
}

async function run() {
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--window-size=1280,720',
    'http://localhost:3000/?v=' + Date.now()
  ]);

  let client = null;
  try {
    for (let i = 0; i < 20; i++) {
      await sleep(400);
      try {
        const t = await getJson(`http://127.0.0.1:${CDP_PORT}/json`);
        if (t && t.length > 0) {
          const pt = t.find(x => x.type === 'page') || t[0];
          client = new CDPClient(pt.webSocketDebuggerUrl);
          await client.connect();
          break;
        }
      } catch (e) {}
    }
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await sleep(2000);

    // Teletransporte al inicio de Fase 2 (CP 19)
    await client.eval(`jumpToLevelPhase(3, 19);`);
    await sleep(600);

    const shots = [
      { x: 3950, y: 196, camX: 3800, file: 'shot_1_cp19_gateway.png' },
      { x: 4200, y: 196, camX: 4100, file: 'shot_2_tenzing_camp.png' },
      { x: 4340, y: 196, camX: 4230, file: 'shot_3_first_aluminum_bridge.png' },
      { x: 4620, y: 162, camX: 4500, file: 'shot_4_slippery_ice_traverse.png' },
      { x: 4850, y: 196, camX: 4720, file: 'shot_5_snowbank_and_tunnel.png' },
      { x: 5080, y: 184, camX: 4970, file: 'shot_6_twin_aluminum_ladders.png' },
      { x: 5410, y: 196, camX: 5300, file: 'shot_7_ang_rita_camp5.png' },
      { x: 5630, y: 175, camX: 5520, file: 'shot_8_celestial_bounce_crystal.png' },
      { x: 5880, y: 140, camX: 5770, file: 'shot_9_cracking_ice_balcony.png' },
      { x: 6330, y: 160, camX: 6200, file: 'shot_10_great_khumbu_bridge.png' },
      { x: 6750, y: 196, camX: 6620, file: 'shot_11_col_plateau.png' },
      { x: 7040, y: 110, camX: 6920, file: 'shot_12_double_bounce_crystals.png' },
      { x: 7300, y: 196, camX: 7180, file: 'shot_13_grand_snow_cavern.png' },
      { x: 7600, y: 155, camX: 7470, file: 'shot_14_terminal_stepped_ladders.png' },
      { x: 7900, y: 196, camX: 7770, file: 'shot_15_apa_sherpa_and_ice_arch.png' }
    ];

    for (let s of shots) {
      await client.eval(`
        player.x = ${s.x};
        player.y = ${s.y};
        player.vx = 0;
        player.vy = 0;
        cameraX = ${s.camX};
      `);
      await sleep(350);
      await client.screenshot(s.file);
    }

    console.log('[ALL VERIFICATIONS COMPLETED SUCCESSFULLY]');
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(console.error);
