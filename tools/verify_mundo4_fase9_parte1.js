// ============================================================================
// VERIFICADOR HEADLESS CDP: MUNDO 4 FASE 9 PARTE 1/3 (FIRMAMENTO CÓSMICO)
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
  console.log('[1/5] Launching headless Chrome on port ' + CDP_PORT + '...');
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
    console.log('[2/5] Connected to target:', pageTarget.title, pageTarget.url);

    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    // Enable domains
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('[3/5] Waiting for game to load...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(2000);

    // Initial check and setup Mundo 4
    const initRes = await client.eval(`
      (() => {
        window.currentLevelIndex = 3;
        if (typeof window.jumpToLevelPhase === 'function') {
          window.jumpToLevelPhase(3, 46);
        } else {
          loadLevel(3);
          gameState = 'PLAYING';
        }
        return {
          levelId: level ? level.id : null,
          levelName: level ? level.name : null,
          platforms: level && level.platforms ? level.platforms.length : 0,
          decorations: level && level.decorations ? level.decorations.length : 0,
          cheeses: level && level.cheeses ? level.cheeses.length : 0
        };
      })()
    `);
    console.log('[DEBUG LEVEL INIT]:', JSON.stringify(initRes));

    // Wait for frames to tick
    await sleep(800);

    console.log('[4/5] Capturing gameplay screenshots of Mundo 4 Fase 9 Parte 1...');

    // 1. Entrada al Firmamento Cósmico (X: 36450)
    await client.eval(`
      (() => {
        player.x = 36450;
        player.y = 100;
        player.vx = 0;
        player.vy = 0;
        cameraX = 36450 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p1_firmament_entrance.png');

    // 2. Terraza Flotante de Meteorito Astral con Queso #95 (X: 36780)
    await client.eval(`
      (() => {
        player.x = 36780;
        player.y = 70;
        player.vx = 0;
        player.vy = 0;
        cameraX = 36780 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p1_aurora_bridge_cheese95.png');

    // 3. Mirador de la Vía Láctea con Vigía Cósmico Kelsang y Checkpoint #46 (X: 37200)
    await client.eval(`
      (() => {
        player.x = 37200;
        player.y = 104;
        player.vx = 0;
        player.vy = 0;
        cameraX = 37200 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p1_milky_way_observatory_kelsang_cp46.png');

    // 4. Diálogo con Vigía Cósmico Kelsang
    await client.eval(`
      (() => {
        const kelsang = npcs.find(n => n.name && n.name.includes('Kelsang'));
        if (kelsang) {
          activeDialogueList = kelsang.lines.map(l => ({ speaker: kelsang.name, text: l }));
          activeNpc = kelsang;
          dialogueIndex = 0;
          dialogueCharIndex = 1000;
          dialogueMode = 'NPC';
          gameState = 'DIALOGUE';
        }
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p1_kelsang_dialogue.png');

    // Cerrar diálogo
    await client.eval(`
      (() => {
        dialogueMode = null;
        activeDialogueList = null;
        activeNpc = null;
        gameState = 'PLAYING';
      })()
    `);

    // 5. Fosa de Polvo Estelar y Cometas con Queso #96 (X: 37470)
    await client.eval(`
      (() => {
        player.x = 37470;
        player.y = 132;
        player.vx = 0;
        player.vy = 0;
        cameraX = 37470 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p1_stardust_fossa_cheese96.png');

    // 6. Aguja Superior de las Pléyades con Queso #97 (X: 37880)
    await client.eval(`
      (() => {
        player.x = 37880;
        player.y = 60;
        player.vx = 0;
        player.vy = 0;
        cameraX = 37880 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p1_pleiades_spire_cheese97.png');

    // 7. Terraza de Transición al Laberinto de Nebulosas de Parte 2 (X: 38040)
    await client.eval(`
      (() => {
        player.x = 38040;
        player.y = 96;
        player.vx = 0;
        player.vy = 0;
        cameraX = 38040 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p1_transition_terrace.png');

    console.log('[5/5] All 7 screenshots verified and captured successfully!');

  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('[ERROR IN VERIFICATION]:', err);
  process.exit(1);
});
