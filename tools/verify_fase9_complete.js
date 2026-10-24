// ============================================================================
// VERIFICADOR COMPLETO HEADLESS CDP: MUNDO 4 FASE 9 (LAS 3 PARTES)
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\8729af41-6ae8-43fd-b7a7-44e557ca1fdf';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_fase9_test';
const CDP_PORT = 9277;

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
      throw new Error('Evaluation exception: ' + JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }

  async screenshot(fileName) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    const outPath = path.join(ARTIFACT_DIR, fileName);
    fs.writeFileSync(outPath, buffer);
    console.log(`[SCREENSHOT CAPTURED]: ${fileName} (${buffer.length} bytes)`);
    return outPath;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function main() {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

  console.log('[1/5] Launching Chrome Headless on port', CDP_PORT);
  const chromeProcess = spawn(CHROME_PATH, [
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1280,720',
    'about:blank'
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

    console.log('[3/5] Navigating to game...');
    await client.send('Page.navigate', { url: 'http://localhost:3000/' });
    await sleep(2500);

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
          platformsCount: level && level.platforms ? level.platforms.length : 0,
          geysersCount: level && level.geysers ? level.geysers.length : 0,
          checkpointsCount: level && level.checkpoints ? level.checkpoints.length : 0,
          cheesesCount: level && level.cheeses ? level.cheeses.length : 0,
          npcsCount: level && level.npcs ? level.npcs.length : 0,
          babyMouse: level && level.babyMouse ? { x: level.babyMouse.x, y: level.babyMouse.y, name: level.babyMouse.name } : null
        };
      })()
    `);
    console.log('[DEBUG LEVEL INIT]:', JSON.stringify(initRes, null, 2));

    await sleep(800);

    console.log('[4/5] Capturing gameplay screenshots of Mundo 4 Fase 9...');

    // 1. Parte 1: Entrada y Primer Vórtice Cósmico (X: 36620)
    await client.eval(`
      (() => {
        player.x = 36640;
        player.y = 90;
        player.vx = 0;
        player.vy = 0;
        cameraX = 36640 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(400);
    await client.screenshot('shot_m4_fase9_p1_vortice_aurora.png');

    // 2. Parte 1: Gran Mirador de la Vía Láctea con Vigía Kelsang y Checkpoint #46 (X: 37170)
    await client.eval(`
      (() => {
        player.x = 37150;
        player.y = 100;
        player.vx = 0;
        player.vy = 0;
        cameraX = 37150 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(400);
    await client.screenshot('shot_m4_fase9_p1_observatorio_kelsang.png');

    // 3. Parte 1: Abismo de Polvo Estelar y Vórtice hacia Queso #96 (X: 37480)
    await client.eval(`
      (() => {
        player.x = 37480;
        player.y = 90;
        player.vx = 0;
        player.vy = 0;
        cameraX = 37480 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(400);
    await client.screenshot('shot_m4_fase9_p1_abismo_estelar.png');

    // 4. Parte 2: Entrada a Jardines de Nebulosa (X: 38280)
    await client.eval(`
      (() => {
        player.x = 38280;
        player.y = 80;
        player.vx = 0;
        player.vy = 0;
        cameraX = 38280 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(400);
    await client.screenshot('shot_m4_fase9_p2_jardines_nebulosa.png');

    // 5. Parte 2: Gran Oasis de la Aurora Boreal con Sacerdotisa Tara y CP #47 (X: 38870)
    await client.eval(`
      (() => {
        player.x = 38850;
        player.y = 100;
        player.vx = 0;
        player.vy = 0;
        cameraX = 38850 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(400);
    await client.screenshot('shot_m4_fase9_p2_oasis_tara.png');

    // 6. Parte 2: Aguja Solar del Cometa Dorado con Queso #100 (X: 39580)
    await client.eval(`
      (() => {
        player.x = 39580;
        player.y = 40;
        player.vx = 0;
        player.vy = 0;
        cameraX = 39580 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(400);
    await client.screenshot('shot_m4_fase9_p2_cometa_queso100.png');

    // 7. Parte 3: Atrio de los Sabios con Patriarca Rigden y CP #48 (X: 40540)
    await client.eval(`
      (() => {
        player.x = 40530;
        player.y = 100;
        player.vx = 0;
        player.vy = 0;
        cameraX = 40530 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(400);
    await client.screenshot('shot_m4_fase9_p3_atrio_rigden.png');

    // 8. Parte 3: Gran Arena Celestial de Combate del Dragón Astral (X: 40950)
    await client.eval(`
      (() => {
        player.x = 40950;
        player.y = 100;
        player.vx = 0;
        player.vy = 0;
        cameraX = 40950 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(500);
    await client.screenshot('shot_m4_fase9_p3_arena_dragon_astral.png');

    // 9. Parte 3: Trono Supremo de Polaris con Baby Mouse #4 y Portal a la Madriguera (X: 41420)
    await client.eval(`
      (() => {
        player.x = 41400;
        player.y = 100;
        player.vx = 0;
        player.vy = 0;
        cameraX = 41400 - 200;
        if (typeof updatePlayerCollisions === 'function') updatePlayerCollisions(0.016);
      })()
    `);
    await sleep(500);
    await client.screenshot('shot_m4_fase9_p3_trono_polaris_babymouse.png');

    // Validation Report
    const report = await client.eval(`
      (() => {
        const m4Cheeses = (level.cheeses || []).filter(c => c.id >= 95 && c.id <= 103);
        const m4Geysers = (level.geysers || []).filter(g => g.x >= 36400 && g.x <= 41600);
        const m4Checkpoints = (level.checkpoints || []).filter(cp => cp.id >= 46 && cp.id <= 48);
        const m4Npcs = (level.npcs || []).filter(n => n.x >= 36400 && n.x <= 41600);
        const m4Platforms = (level.platforms || []).filter(p => p.x >= 36400 && p.x <= 41600);
        const arenaFloor = m4Platforms.find(p => p.x <= 40750 && p.x + p.w >= 41350 && p.subType === 'snow_ground');

        return {
          cheesesFound: m4Cheeses.length,
          cheesesIds: m4Cheeses.map(c => c.id),
          geysersFound: m4Geysers.length,
          checkpointsFound: m4Checkpoints.length,
          checkpointsIds: m4Checkpoints.map(cp => cp.id),
          npcsFound: m4Npcs.map(n => n.name),
          platformsInFase9: m4Platforms.length,
          arenaFloorValid: !!arenaFloor,
          babyMousePresent: !!(level.babyMouse && level.babyMouse.x === 41440)
        };
      })()
    `);

    console.log('\n======================================================');
    console.log('[5/5] MUNDO 4 FASE 9 AUDIT REPORT:');
    console.log(JSON.stringify(report, null, 2));
    console.log('======================================================\n');

  } catch (err) {
    console.error('[ERROR in verify_fase9_complete]:', err);
  } finally {
    if (client) client.close();
    chromeProcess.kill();
    console.log('Cleanup completed.');
  }
}

main();
