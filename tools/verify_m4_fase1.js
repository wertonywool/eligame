// ============================================================================
// VERIFICADOR HEADLESS CDP: FASE 1 MEJORADA DE MUNDO 4
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\e4c6b645-acc2-4863-b4a4-3efb36686251';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test_f1';
const CDP_PORT = 9276;

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
  console.log('[1/5] Launching headless Chrome on port ' + CDP_PORT + '...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--window-size=1280,720',
    'http://localhost:3000/?v=80'
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
    console.log('[2/5] Connected to target:', pageTarget.title, pageTarget.url);

    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('[3/5] Waiting for game to load...');
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

    // 0. Inicio en Campamento Base (Don Mateo, cabaña, inicio del Everest)
    console.log('[4/6] Testing Campamento Base (X=80, Don Mateo, cabana)...');
    await client.eval(`
      if (typeof jumpToLevelPhase === 'function') {
        jumpToLevelPhase(3, 17);
        player.x = 80;
        player.y = 174;
        cameraX = 0;
      }
    `);
    await sleep(1500);
    await client.screenshot('shot_m4_fase1_camp0_clean.png');

    // 1. Fase 1 Parte 1 (Paso del Glaciar CP 17)
    console.log('[5/6] Testing Fase 1 P1 (Paso del Glaciar CP 17)...');
    await client.eval(`jumpToLevelPhase(3, 17);`);
    await sleep(1500);
    await client.screenshot('shot_m4_fase1_base_enhanced.png');

    // 2. Fase 1 Parte 2 (Cascada Khumbu CP 18)
    console.log('Testing Fase 1 P2 (Cascada Khumbu CP 18)...');
    await client.eval(`jumpToLevelPhase(3, 18);`);
    await sleep(1500);
    await client.screenshot('shot_m4_fase1_khumbu_enhanced.png');

    // 3. Fase 1 Parte 3 (Puerta de la Cascada CP 19)
    console.log('[6/6] Testing Fase 1 P3 (Puerta de la Cascada CP 19)...');
    await client.eval(`jumpToLevelPhase(3, 19);`);
    await sleep(1500);
    await client.screenshot('shot_m4_fase1_gate_enhanced.png');

    // 4. Test mecánico: Recoger y lanzar bola de nieve
    console.log('Testing Shovel Mechanics (Scoop & Throw)...');
    const mechTest = await client.eval(`
      (function() {
        player.x = 200;
        player.y = 174;
        player.onGround = true;
        player.ability = 'shovel';
        if (typeof initShovelAbility === 'function') initShovelAbility();
        keys.dashJustPressed = true;
        updateShovelAbility(0.016);
        const snowAfterScoop = typeof shovelState !== 'undefined' ? shovelState.snowballs : -1;
        keys.dashJustPressed = true;
        updateShovelAbility(0.016);
        const snowAfterThrow = typeof shovelState !== 'undefined' ? shovelState.snowballs : -1;
        const projs = typeof shovelState !== 'undefined' ? shovelState.projectiles.length : 0;
        return { snowAfterScoop, snowAfterThrow, projs };
      })()
    `);
    console.log('[SHOVEL MECHANICS TEST RESULT]:', JSON.stringify(mechTest));

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
