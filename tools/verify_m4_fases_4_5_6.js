// ============================================================================
// VERIFICADOR HEADLESS CDP: FASES 4, 5 Y 6 MEJORADAS DE MUNDO 4
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\e4c6b645-acc2-4863-b4a4-3efb36686251';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test_f456';
const CDP_PORT = 9274;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
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
  console.log('[1/7] Launching headless Chrome on port ' + CDP_PORT + '...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--window-size=1280,720',
    'http://localhost:3000/?v=78'
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

    if (!targets || targets.length === 0) {
      throw new Error('Could not connect to Chrome targets list');
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    console.log('[2/7] Connected to target:', pageTarget.title, pageTarget.url);

    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('[3/7] Waiting for game to load...');
    await sleep(2000);

    const loadState = await client.eval(`
      ({
        hasLevels: typeof LEVELS !== 'undefined',
        lvl4Platforms: LEVELS[3] ? LEVELS[3].platforms.length : 0,
        lvl4Crawlers: LEVELS[3] ? LEVELS[3].magmaCrawlers.length : 0,
        lvl4Fliers: LEVELS[3] ? LEVELS[3].fireBats.length : 0
      })
    `);
    console.log('[GAME LOAD STATE]:', JSON.stringify(loadState));

    // 1. Fase 4 Parte 1 (Lago Congelado CP 30)
    console.log('[4/7] Testing Fase 4 P1 (Lago Congelado CP 30)...');
    await client.eval(`jumpToLevelPhase(3, 30);`);
    await sleep(1500);
    await client.screenshot('shot_m4_fase4_lake_enhanced.png');

    // 2. Fase 4 Parte 2 (Santuario Glacial CP 32)
    console.log('[5/7] Testing Fase 4 P2 (Santuario Glacial CP 32)...');
    await client.eval(`jumpToLevelPhase(3, 32);`);
    await sleep(1500);
    await client.screenshot('shot_m4_fase4_sanctuary_enhanced.png');

    // 3. Fase 5 Parte 1 (Cascada Khumbu CP 34)
    console.log('[6/7] Testing Fase 5 P1 (Cascada Khumbu CP 34)...');
    await client.eval(`jumpToLevelPhase(3, 34);`);
    await sleep(1500);
    await client.screenshot('shot_m4_fase5_khumbu_enhanced.png');

    // 4. Fase 5 Parte 2 (Cima Everest 8848m CP 37)
    console.log('[7/7] Testing Fase 5 P2 (Cima Everest CP 37)...');
    await client.eval(`jumpToLevelPhase(3, 37);`);
    await sleep(1500);
    await client.screenshot('shot_m4_fase5_summit_enhanced.png');

    // 5. Fase 6 Parte 2 (Torres Celestiales CP 39)
    console.log('Testing Fase 6 P2 (Torres Celestiales CP 39)...');
    await client.eval(`jumpToLevelPhase(3, 39);`);
    await sleep(1500);
    await client.screenshot('shot_m4_fase6_towers_enhanced.png');

    // 6. Fase 6 Parte 4 (Yeti Boss Arena CP 41)
    console.log('Testing Fase 6 P4 (Yeti Boss Arena CP 41)...');
    await client.eval(`jumpToLevelPhase(3, 41);`);
    await sleep(1500);
    await client.screenshot('shot_m4_fase6_yeti_arena_enhanced.png');

    console.log('[ALL VERIFICATIONS COMPLETED SUCCESSFULLY]');
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('[TEST ERROR]:', err);
  process.exit(1);
});
