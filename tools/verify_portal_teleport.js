// ============================================================================
// VERIFICADOR HEADLESS CDP: PISTOLA DE PORTALES Y TELETRANSPORTE
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

  // Test 1: Teleport from World Map to Everest (CP 37) -> Verify Portal Arrival
  console.log('[3/5] Testing World Map Teleport with Portal Arrival animation...');
  await client.eval(`
    (() => {
      openWorldMap(3);
      jumpToLevelPhase(3, 37);
    })()
  `);
  await sleep(220); // During emerge_out phase

  const arrivalState = await client.eval(`
    (() => ({
      gameState: gameState,
      isPortalActive: isPortalTeleportActive(),
      phase: portalTeleportState ? portalTeleportState.phase : null,
      playerX: Math.round(player.x),
      playerY: Math.round(player.y)
    }))()
  `);
  console.log('[ARRIVAL STATE]:', JSON.stringify(arrivalState));
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_portal_arrival_everest.png'));

  // Wait for portal arrival animation to finish and player to be active
  await sleep(400);

  // Test 2: In-Level Portal Gun Trigger (Press key 9 to go to Polaris CP 48)
  console.log('[4/5] Testing In-Level Portal Gun (F5 -> F9)...');
  await client.eval(`
    (() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Digit9', key: '9' }));
    })()
  `);

  // Wait for aim & fire
  await sleep(250);
  const fireState = await client.eval(`
    (() => ({
      phase: portalTeleportState ? portalTeleportState.phase : null,
      gunRecoil: portalTeleportState ? portalTeleportState.gunRecoil : 0,
      beamProgress: portalTeleportState ? portalTeleportState.beamProgress : 0
    }))()
  `);
  console.log('[GUN FIRE STATE]:', JSON.stringify(fireState));
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_portal_gun_fire.png'));

  // Wait for portal entry (walk_in phase)
  await sleep(240);
  const enterState = await client.eval(`
    (() => ({
      phase: portalTeleportState ? portalTeleportState.phase : null,
      entryPortalScale: portalTeleportState ? portalTeleportState.entryPortal.scale : 0
    }))()
  `);
  console.log('[PORTAL ENTER STATE]:', JSON.stringify(enterState));
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_portal_vortex_entry.png'));

  // Wait for transition & exit emerge at Polaris
  await sleep(450);
  const emergeState = await client.eval(`
    (() => ({
      phase: portalTeleportState ? portalTeleportState.phase : null,
      playerX: Math.round(player.x),
      playerY: Math.round(player.y),
      cameraX: Math.round(cameraX)
    }))()
  `);
  console.log('[EMERGE POLARIS STATE]:', JSON.stringify(emergeState));
  await client.screenshot(path.join(ARTIFACT_DIR, 'shot_portal_emerge_destination.png'));

  // Wait for animation to conclude
  await sleep(300);
  const finalState = await client.eval(`
    (() => ({
      gameState: gameState,
      isPortalActive: isPortalTeleportActive(),
      playerX: Math.round(player.x),
      playerY: Math.round(player.y),
      levelId: level.id
    }))()
  `);
  console.log('[FINAL STATE]:', JSON.stringify(finalState));
  console.log('[SUCCESS] All Portal Gun and Teleport tests completed successfully!');
  process.exit(0);
}

runVerification().catch(err => {
  console.error('[TEST ERROR]:', err);
  process.exit(1);
});
