// ============================================================================
// VERIFICADOR HEADLESS CDP: SELECTOR DE FASES DE MUNDO 4 (WARP PAD / WORLD MAP)
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
  console.log('[1/4] Launching headless Chrome on port ' + CDP_PORT + '...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--window-size=1280,720',
    'http://localhost:3000/'
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
    console.log('[2/4] Connected to target:', pageTarget.title, pageTarget.url);

    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('[3/4] Navigating to http://localhost:3000/ and opening World Map on Mundo 4...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(1500);

    // Abrir Mapa de Mundos seleccionando Mundo 4 (index 3)
    const mapInfo = await client.eval(`
      (() => {
        openWorldMap(3);
        // Forzar un frame de dibujo para que menuButtons se pueble
        drawWorldMapScreen();
        return {
          gameState: gameState,
          selectedWorldIndex: selectedWorldIndex,
          buttonsCount: menuButtons.length
        };
      })()
    `);
    console.log('[MAP INFO]:', JSON.stringify(mapInfo));

    await sleep(400);

    // 1. Capturar pantalla del Selector de Mundo 4 mostrando todas las fases
    await client.screenshot('shot_m4_worldmap_phase_selector.png');

    console.log('[4/4] Testing Teleport to F9: POLARIS (cpId: 48)...');
    const tpResult = await client.eval(`
      (() => {
        // Encontrar el botón F9: POLARIS en menuButtons
        jumpToLevelPhase(3, 48);
        return {
          gameState: gameState,
          levelId: level ? level.id : null,
          playerX: player ? player.x : null,
          playerY: player ? player.y : null,
          cameraX: cameraX
        };
      })()
    `);
    console.log('[TP RESULT]:', JSON.stringify(tpResult));

    await sleep(400);

    // 2. Capturar pantalla del jugador tras teletransportarse exitosamente a F9: POLARIS
    await client.screenshot('shot_m4_teleported_to_polaris.png');

    // 3. Probar también teletransporte a F5: EVEREST (cpId: 37)
    console.log('[4/4] Testing Teleport to F5: EVEREST (cpId: 37)...');
    const tpEverest = await client.eval(`
      (() => {
        jumpToLevelPhase(3, 37);
        return {
          gameState: gameState,
          levelId: level ? level.id : null,
          playerX: player ? player.x : null,
          playerY: player ? player.y : null,
          cameraX: cameraX
        };
      })()
    `);
    console.log('[TP EVEREST RESULT]:', JSON.stringify(tpEverest));

    await sleep(400);
    await client.screenshot('shot_m4_teleported_to_everest.png');

    console.log('[SUCCESS] All phase selector tests and screenshots completed successfully!');

  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('[ERROR IN SELECTOR VERIFICATION]:', err);
  process.exit(1);
});
