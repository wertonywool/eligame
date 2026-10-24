const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\2d8eb4c4-8afc-486a-816a-45baedeea85a';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_inspect_f5';
const CDP_PORT = 9288;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.consoleAPICalled') {
          console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
        }
        if (msg.method === 'Runtime.exceptionThrown') {
          console.error('[BROWSER EXCEPTION]', JSON.stringify(msg.params.exceptionDetails));
        }
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
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
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error('Evaluation error: ' + JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }

  async screenshot(filename) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const outPath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(outPath, buffer);
    console.log('[SCREENSHOT SAVED]: ' + outPath);
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log('Launching headless Chrome...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--window-size=1280,720',
    'http://localhost:3000/?test=' + Date.now()
  ]);

  let client = null;
  try {
    let targets = null;
    for (let i = 0; i < 20; i++) {
      await sleep(500);
      try {
        targets = await getJson(`http://127.0.0.1:${CDP_PORT}/json`);
        if (targets && targets.length > 0) break;
      } catch (e) {}
    }

    if (!targets || targets.length === 0) throw new Error('Cannot reach Chrome target');
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('Waiting for game ready...');
    await sleep(2500);

    // Inspect level 4 info
    const levelInfo = await client.eval(`
      (() => {
        const lvl = window.LEVELS && window.LEVELS[3];
        if (!lvl) return { error: 'No level 4' };
        const f5Platforms = lvl.platforms.filter(p => p.x >= 17900 && p.x <= 24000);
        const f5Decorations = lvl.decorations.filter(d => d.x >= 17900 && d.x <= 24000);
        const f5Crawlers = (lvl.magmaCrawlers || []).filter(c => c.x >= 17900 && c.x <= 24000);
        const f5Fliers = (lvl.fireBats || []).filter(f => f.x >= 17900 && f.x <= 24000);
        const f5Checkpoints = (lvl.checkpoints || []).filter(c => c.x >= 17900 && c.x <= 24000);
        const f5Npcs = (lvl.npcs || []).filter(n => n.x >= 17900 && n.x <= 24000);
        const f5Cheeses = (lvl.cheeses || []).filter(ch => ch.x >= 17900 && ch.x <= 24000);
        return {
          platformsCount: f5Platforms.length,
          decorationsCount: f5Decorations.length,
          crawlersCount: f5Crawlers.length,
          fliersCount: f5Fliers.length,
          checkpointsCount: f5Checkpoints.length,
          checkpoints: f5Checkpoints,
          npcsCount: f5Npcs.length,
          cheesesCount: f5Cheeses.length
        };
      })()
    `);
    console.log('Level 4 Fase 5 stats:', JSON.stringify(levelInfo, null, 2));

    // Teleport player directly to X: 18050 in Level 4
    await client.eval(`
      (() => {
        loadLevel(3);
        gameState = 'PLAYING';
        player.x = 18050;
        player.y = 170;
        player.vx = 0;
        player.vy = 0;
        cameraX = 18000;
        cameraY = 0;
      })()
    `);
    await sleep(1000);
    await client.screenshot('fase5_start_18000.png');

    // Teleport to Khumbu ladder bridge (X: 18700)
    await client.eval(`
      (() => {
        player.x = 18720;
        player.y = 90;
        cameraX = 18600;
        cameraY = 0;
      })()
    `);
    await sleep(1000);
    await client.screenshot('fase5_khumbu_bridge_18700.png');

    // Teleport to Western Cwm (X: 19400)
    await client.eval(`
      (() => {
        player.x = 19400;
        player.y = 140;
        cameraX = 19300;
        cameraY = 0;
      })()
    `);
    await sleep(1000);
    await client.screenshot('fase5_western_cwm_19400.png');

    // Teleport to Lhotse Face (X: 19900)
    await client.eval(`
      (() => {
        player.x = 19900;
        player.y = 90;
        cameraX = 19800;
        cameraY = 0;
      })()
    `);
    await sleep(1000);
    await client.screenshot('fase5_lhotse_face_19900.png');

    // Teleport to South Col (X: 20850)
    await client.eval(`
      (() => {
        player.x = 20850;
        player.y = 110;
        cameraX = 20750;
        cameraY = 0;
      })()
    `);
    await sleep(1000);
    await client.screenshot('fase5_south_col_20850.png');

    // Teleport to Hillary Step (X: 22200)
    await client.eval(`
      (() => {
        player.x = 22200;
        player.y = 100;
        cameraX = 22100;
        cameraY = 0;
      })()
    `);
    await sleep(1000);
    await client.screenshot('fase5_hillary_step_22200.png');

    // Teleport to Everest Summit (X: 22900)
    await client.eval(`
      (() => {
        player.x = 22900;
        player.y = 80;
        cameraX = 22800;
        cameraY = 0;
      })()
    `);
    await sleep(1000);
    await client.screenshot('fase5_everest_summit_22900.png');

    console.log('Inspection completed successfully!');
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(e => {
  console.error('Error:', e);
  process.exit(1);
});
