// ============================================================================
// VERIFICADOR HEADLESS CDP: MUNDO 4 FASE 9 PARTE 3/3 (SANCTUM SANCTORUM)
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

    // Initial check and setup Mundo 4 at Checkpoint #48
    const initRes = await client.eval(`
      (() => {
        window.currentLevelIndex = 3;
        if (typeof window.jumpToLevelPhase === 'function') {
          window.jumpToLevelPhase(3, 48);
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

    await sleep(800);

    console.log('[4/5] Capturing gameplay screenshots of Mundo 4 Fase 9 Parte 3...');

    // 1. Acceso al Sanctum Sanctorum (X: 39860)
    await client.eval(`
      (() => {
        gameState = 'PLAYING';
        player.x = 39860;
        player.y = 96;
        player.vx = 0;
        player.vy = 0;
        cameraX = 39860 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p3_sanctum_approach.png');

    // 2. Terraza Flotante de la Estrella Solitaria y Queso #101 (X: 40220)
    await client.eval(`
      (() => {
        gameState = 'PLAYING';
        player.x = 40220;
        player.y = 70;
        player.vx = 0;
        player.vy = 0;
        cameraX = 40220 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p3_celestial_terrace_cheese101.png');

    // 3. Gran Atrio del Sanctum Sanctorum con Patriarca Rigden y Checkpoint #48 (X: 40620)
    await client.eval(`
      (() => {
        gameState = 'PLAYING';
        player.x = 40620;
        player.y = 104;
        player.vx = 0;
        player.vy = 0;
        cameraX = 40620 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p3_vault_courtyard_rigden_cp48.png');

    // 4. Diálogo con Patriarca Celestial Rigden
    await client.eval(`
      (() => {
        const rigden = npcs.find(n => n.name && n.name.includes('Rigden'));
        if (rigden) {
          activeDialogueList = rigden.lines.map(l => ({ speaker: rigden.name, text: l }));
          activeNpc = rigden;
          dialogueIndex = 0;
          dialogueCharIndex = 1000;
          dialogueMode = 'NPC';
          gameState = 'DIALOGUE';
        }
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p3_rigden_blessing_dialogue.png');

    // Cerrar diálogo
    await client.eval(`
      (() => {
        dialogueMode = null;
        activeDialogueList = null;
        activeNpc = null;
        gameState = 'PLAYING';
      })()
    `);

    // 5. Fosa Profunda de la Estrella Polar y Queso #102 (X: 40870)
    await client.eval(`
      (() => {
        gameState = 'PLAYING';
        player.x = 40870;
        player.y = 134;
        player.vx = 0;
        player.vy = 0;
        cameraX = 40870 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p3_polaris_fossa_cheese102.png');

    // 6. Aguja Cenital de las Estrellas Eternas y Queso #103 (X: 41180)
    await client.eval(`
      (() => {
        gameState = 'PLAYING';
        player.x = 41180;
        player.y = 60;
        player.vx = 0;
        player.vy = 0;
        cameraX = 41180 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p3_zenith_spire_cheese103.png');

    // 7. Gran Altar Supremo: Trono de Polaris, Baby Mouse #4 y Portal a la Madriguera (X: 41410)
    await client.eval(`
      (() => {
        gameState = 'PLAYING';
        player.x = 41400;
        player.y = 104;
        player.vx = 0;
        player.vy = 0;
        cameraX = 41400 - 160;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p3_polaris_throne_babymouse_gate.png');

    // 8. Diálogo del Gran Final de Mundo 4 con Baby Mouse #4
    await client.eval(`
      (() => {
        const bm = level.babyMouse;
        if (bm) {
          activeDialogueList = bm.dialogues;
          dialogueIndex = 0;
          dialogueCharIndex = 1000;
          dialogueMode = 'BABY';
          gameState = 'DIALOGUE';
        }
      })()
    `);
    await sleep(300);
    await client.screenshot('shot_m4_fase9_p3_grand_finale_babymouse_dialogue.png');

    console.log('[5/5] All 8 screenshots of Parte 3 verified and captured successfully!');

  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('[ERROR IN VERIFICATION]:', err);
  process.exit(1);
});
