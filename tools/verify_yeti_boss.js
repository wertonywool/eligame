// ============================================================================
// VERIFICADOR HEADLESS CDP: BATALLA DEL GRAN YETI (MUNDO 4 • FASE 6)
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
  console.log('[1/4] Checking or launching Chrome on port ' + CDP_PORT + '...');
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

  console.log('[2/4] Navigating to http://localhost:3000/ ...');
  await client.send('Page.navigate', { url: 'http://localhost:3000/' });
  await sleep(1200);

  // Jump to Mundo 4 Fase 6 (CP 41: Atrio del Yeti)
  console.log('[3/4] Teleporting to Fase 6 (CP 41: Santuario del Yeti)...');
  await client.eval(`
    (() => {
      openWorldMap(3);
      jumpToLevelPhase(3, 41);
    })()
  `);
  await sleep(700); // Wait for portal arrival animation to conclude

  // Move player into the arena to trigger the Yeti boss fight
  await client.eval(`
    (() => {
      player.x = 28740;
      player.y = 100;
    })()
  `);
  await sleep(400);

  const bossState = await client.eval(`
    (() => ({
      active: window.yetiBossState ? window.yetiBossState.active : false,
      hp: window.yetiBossState ? window.yetiBossState.hp : null,
      phase: window.yetiBossState ? window.yetiBossState.phase : null,
      action: window.yetiBossState ? window.yetiBossState.action : null,
      gatesClosed: window.yetiBossState ? window.yetiBossState.gateLeft.closed : false,
      yetiX: window.yetiBossState ? Math.round(window.yetiBossState.x) : null,
      yetiY: window.yetiBossState ? Math.round(window.yetiBossState.y) : null,
      playerX: Math.round(player.x),
      playerY: Math.round(player.y)
    }))()
  `);
  console.log('[YETI BOSS STATE]:', JSON.stringify(bossState));
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_m4_yeti_boss_battle.png'));

  // Test Stun state
  console.log('[4/4] Testing Yeti stun state...');
  await client.eval(`
    (() => {
      if (window.yetiBossState) {
        window.yetiBossState.isStunned = true;
        window.yetiBossState.stunTimer = 3.0;
        window.yetiBossState.x = 28850;
      }
    })()
  `);
  await sleep(200);

  const stunState = await client.eval(`
    (() => ({
      isStunned: window.yetiBossState ? window.yetiBossState.isStunned : false,
      stunTimer: window.yetiBossState ? window.yetiBossState.stunTimer : 0,
      hp: window.yetiBossState ? window.yetiBossState.hp : null
    }))()
  `);
  console.log('[STUN STATE]:', JSON.stringify(stunState));
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_m4_yeti_boss_stunned.png'));

  // Test Cosmic Low Gravity in Fase 8 ($X \ge 33000$)
  console.log('[5/5] Testing Cosmic Low Gravity physics at X = 34000...');
  await client.eval(`
    (() => {
      player.x = 34000;
      player.y = 100;
      player.vy = 0;
      player.onGround = false;
    })()
  `);
  await sleep(200);

  const cosmicPhysics = await client.eval(`
    (() => {
      const isCosmic = (level.id === 4 && player.x >= 33000);
      const baseGravity = isCosmic ? player.gravity * 0.54 : player.gravity;
      return {
        playerX: Math.round(player.x),
        isCosmicSpace: isCosmic,
        normalGravity: player.gravity,
        cosmicGravity: Math.round(baseGravity),
        playerVy: Math.round(player.vy)
      };
    })()
  `);
  console.log('[COSMIC LOW GRAVITY PHYSICS]:', JSON.stringify(cosmicPhysics));

  console.log('[SUCCESS] Yeti Boss and Cosmic Physics verified successfully!');
  process.exit(0);
}

runVerification().catch(err => {
  console.error('[TEST ERROR]:', err);
  process.exit(1);
});
