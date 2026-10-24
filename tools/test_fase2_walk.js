const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\e858ec00-aa45-40e5-b683-e289a43f24c3';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_f2_walk';
const CDP_PORT = 9289;

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
    fs.writeFileSync(path.join(ARTIFACT_DIR, filename), Buffer.from(res.data, 'base64'));
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

    // Ir a Mundo 4
    await client.eval(`jumpToLevelPhase(3, 19);`);
    await sleep(600);

    const positions = [
      { x: 4300, y: 100, name: 'shot_f2_x4300_pillars.png' },
      { x: 4750, y: 130, name: 'shot_f2_x4750_bridge.png' },
      { x: 5700, y: 100, name: 'shot_f2_x5700_parte2.png' },
      { x: 7000, y: 100, name: 'shot_f2_x7000_parte3.png' }
    ];

    for (let pos of positions) {
      await client.eval(`
        player.x = ${pos.x};
        player.y = ${pos.y};
        player.vx = 0;
        player.vy = 0;
        cameraX = ${pos.x} - 200;
      `);
      await sleep(300);
      await client.screenshot(pos.name);
      console.log('Saved ' + pos.name);
    }
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(console.error);
