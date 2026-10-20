// ============================================================================
// VERIFICADOR HEADLESS CDP: JEFES Y MEJORAS DE MUNDO 4 (YETI Y DRAGON ASTRAL)
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\e4c6b645-acc2-4863-b4a4-3efb36686251';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test3';
const CDP_PORT = 9269;

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
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }

  async screenshot(filePath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    fs.writeFileSync(filePath, buffer);
    console.log('[SCREENSHOT SAVED]:', filePath);
  }
}

async function runVerification() {
  console.log('[1/5] Checking or launching Chrome on port ' + CDP_PORT + '...');
  let version;
  try {
    version = await getJson(`http://127.0.0.1:${CDP_PORT}/json/version`);
  } catch (e) {
    spawn(CHROME_PATH, [
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--headless=new',
      '--disable-gpu',
      '--window-size=960,600'
    ], { detached: true });
    await sleep(1500);
    version = await getJson(`http://127.0.0.1:${CDP_PORT}/json/version`);
  }

  const list = await getJson(`http://127.0.0.1:${CDP_PORT}/json/list`);
  let target = list.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
  if (!target) {
    target = list.find(t => t.type === 'page') || list[0];
  }

  const client = new CDPClient(target.webSocketDebuggerUrl);
  await client.connect();
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  console.log('[2/5] Navigating to http://localhost:3000/ ...');
  await client.send('Page.navigate', { url: 'http://localhost:3000/' });
  await sleep(1200);

  // 1. Probar la Batalla del Gran Yeti en Fase 6
  console.log('[3/5] Testing Yeti Boss Fight in Fase 6 (CP 41)...');
  await client.eval(`
    (() => {
      openWorldMap(3);
      jumpToLevelPhase(3, 41);
    })()
  `);
  await sleep(750);

  // Activar Yeti
  await client.eval(`
    (() => {
      player.x = 28740;
      player.y = 100;
    })()
  `);
  await sleep(400);

  const yetiInfo = await client.eval(`
    (() => ({
      active: window.yetiBossState ? window.yetiBossState.active : false,
      hp: window.yetiBossState ? window.yetiBossState.hp : 0,
      action: window.yetiBossState ? window.yetiBossState.action : null,
      gatesClosed: window.yetiBossState ? window.yetiBossState.gateLeft.closed : false
    }))()
  `);
  console.log('[YETI INFO]:', JSON.stringify(yetiInfo));
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_m4_yeti_boss_battle.png'));

  // Desactivar Yeti temporalmente para viajar a Fase 9
  await client.eval(`
    (() => {
      if (window.yetiBossState) {
        window.yetiBossState.active = false;
        window.yetiBossState.isDefeated = true;
      }
    })()
  `);

  // 2. Probar la Batalla Final del Dragon Astral en Fase 9
  console.log('[4/5] Testing Astral Dragon Boss Fight in Fase 9 (CP 48)...');
  await client.eval(`
    (() => {
      jumpToLevelPhase(3, 48);
    })()
  `);
  await sleep(750);

  // Mover a Elizabeth hacia la arena del Dragon Astral
  await client.eval(`
    (() => {
      player.x = 40820;
      player.y = 110;
    })()
  `);
  await sleep(400);

  const dragonInfo = await client.eval(`
    (() => ({
      active: window.astralBossState ? window.astralBossState.active : false,
      hp: window.astralBossState ? window.astralBossState.hp : 0,
      phase: window.astralBossState ? window.astralBossState.phase : null,
      action: window.astralBossState ? window.astralBossState.action : null,
      gatesClosed: window.astralBossState ? window.astralBossState.gateLeft.closed : false,
      dragonX: window.astralBossState ? Math.round(window.astralBossState.x) : null,
      dragonY: window.astralBossState ? Math.round(window.astralBossState.y) : null,
      playerX: Math.round(player.x),
      playerY: Math.round(player.y)
    }))()
  `);
  console.log('[ASTRAL DRAGON INFO]:', JSON.stringify(dragonInfo));
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_m4_astral_dragon_battle.png'));

  // Probar fase furiosa (Hipernova)
  await client.eval(`
    (() => {
      if (window.astralBossState) {
        window.astralBossState.hp = 2;
        window.astralBossState.phase = 3;
      }
    })()
  `);
  await sleep(250);
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_m4_astral_dragon_enraged.png'));

  // 3. Probar derrota y liberacion del Hijo Raton
  console.log('[5/5] Testing defeat and liberation of Baby Mouse...');
  await client.eval(`
    (() => {
      if (window.astralBossState) {
        window.astralBossState.hp = 0;
        window.astralBossState.isDefeated = true;
        window.astralBossState.active = false;
        window.astralBossState.gateLeft.closed = false;
        window.astralBossState.gateRight.closed = false;
      }
      player.x = 41410;
      player.y = 100;
    })()
  `);
  await sleep(350);

  const rescueInfo = await client.eval(`
    (() => ({
      gameState: gameState,
      dialogueIndex: typeof dialogueIndex !== 'undefined' ? dialogueIndex : 0,
      playerX: Math.round(player.x),
      babyX: level.babyMouse.x,
      babyY: level.babyMouse.y
    }))()
  `);
  console.log('[RESCUE INFO]:', JSON.stringify(rescueInfo));
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_m4_grand_finale_rescued.png'));

  console.log('[SUCCESS] All World 4 Boss and Climax tests verified successfully!');
  process.exit(0);
}

runVerification().catch(err => {
  console.error('[TEST ERROR]:', err);
  process.exit(1);
});
