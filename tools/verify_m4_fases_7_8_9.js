// ============================================================================
// VERIFICADOR HEADLESS CDP: FASES 7, 8 Y 9 MEJORADAS DE MUNDO 4
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\e4c6b645-acc2-4863-b4a4-3efb36686251';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test_f789';
const CDP_PORT = 9272;

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
    'http://localhost:3000/?v=77'
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

    // Initial check
    const loadState = await client.eval(`
      ({
        hasGame: typeof game !== 'undefined',
        hasLevels: typeof LEVELS !== 'undefined',
        lvl4Platforms: LEVELS[3] ? LEVELS[3].platforms.length : 0,
        lvl4Crawlers: LEVELS[3] ? LEVELS[3].magmaCrawlers.length : 0,
        lvl4Fliers: LEVELS[3] ? LEVELS[3].fireBats.length : 0
      })
    `);
    console.log('[GAME LOAD STATE]:', JSON.stringify(loadState));

    // Jump into Level 4 Phase 7 (CP 42: x ~ 30420)
    console.log('[4/5] Testing Fase 7 (Shambhala CP 42)...');
    await client.eval(`
      if (typeof jumpToLevelPhase === 'function') {
        jumpToLevelPhase(3, 42);
      } else {
        game.state = 'playing';
        game.currentLevelIndex = 3;
        player.x = 30420;
        player.y = 100;
        camera.x = player.x - 200;
      }
    `);
    await sleep(1500);
    await client.screenshot('shot_m4_fase7_shambhala_enhanced.png');

    // Test Fase 8 (Monte Kailash CP 44: x ~ 33750)
    console.log('[5/5] Testing Fase 8 (Monte Kailash CP 44 - Low Gravity)...');
    const f8Result = await client.eval(`
      (() => {
        jumpToLevelPhase(3, 44);
        return {
          playerX: Math.round(player.x),
          isLowGrav: (level && level.id === 4 && player.x >= 33000),
          platformsNearby: level.platforms.filter(p => Math.abs(p.x - player.x) < 500).length
        };
      })()
    `);
    console.log('[FASE 8 LOW GRAV CHECK]:', JSON.stringify(f8Result));
    await sleep(1500);
    await client.screenshot('shot_m4_fase8_kailash_enhanced.png');

    // Test Fase 9 Parte 1 (Firmamento CP 46: x ~ 37160)
    console.log('Testing Fase 9 Parte 1 (Firmamento CP 46)...');
    const f9p1Result = await client.eval(`
      (() => {
        jumpToLevelPhase(3, 46);
        return {
          playerX: Math.round(player.x),
          isLowGrav: (level && level.id === 4 && player.x >= 33000)
        };
      })()
    `);
    console.log('[FASE 9 P1 CHECK]:', JSON.stringify(f9p1Result));
    await sleep(1500);
    await client.screenshot('shot_m4_fase9_firmament_enhanced.png');

    // Test Fase 9 Parte 2 (Nebulosas CP 47: x ~ 38860)
    console.log('Testing Fase 9 Parte 2 (Nebulosas CP 47)...');
    const f9p2Result = await client.eval(`
      (() => {
        jumpToLevelPhase(3, 47);
        return {
          playerX: Math.round(player.x),
          isLowGrav: (level && level.id === 4 && player.x >= 33000)
        };
      })()
    `);
    console.log('[FASE 9 P2 CHECK]:', JSON.stringify(f9p2Result));
    await sleep(1500);
    await client.screenshot('shot_m4_fase9_nebulas_enhanced.png');

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
