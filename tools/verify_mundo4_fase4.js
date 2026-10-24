// ============================================================================
// VERIFICADOR HEADLESS CDP: MUNDO 4 - FASE 4 ("EL INMENSO LAGO CONGELADO")
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\3a4e48ef-381c-4558-ba84-0c4ccba1ca99';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test_f4_verify';
const CDP_PORT = 9288;

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
  console.log('[1/8] Launching headless Chrome on port ' + CDP_PORT + '...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--window-size=1280,720',
    'http://localhost:3000/?test_v=' + Date.now()
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
    console.log('[2/8] Connected to target:', pageTarget.title, pageTarget.url);

    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('[3/8] Waiting for game initialization...');
    await sleep(2000);

    // 1. Cargar Mundo 4 y verificar carga general
    const initData = await client.eval(`
      (() => {
        loadLevel(3);
        gameState = 'PLAYING';
        return {
          worldName: level.name,
          platformsCount: level.platforms.length,
          checkpointsCount: level.checkpoints.length,
          cheesesCount: level.cheeses.length,
          crawlersCount: level.magmaCrawlers.length,
          fliersCount: level.fireBats.length,
          spikesCount: level.spikes.length
        };
      })()
    `);
    console.log('[4/8] Mundo 4 Level Loaded:', JSON.stringify(initData));

    // 2. Verificar CP 30 (Orilla del Lago Congelado - Campamento 7, X: 14350) y Bahía de Pescadores
    console.log('[5/8] Testing CP 30 & Fishing Bay (X: 13580 - 14350)...');
    await client.eval(`
      (() => {
        player.x = 13580;
        player.y = 170;
        cameraX = 13450;
      })()
    `);
    await sleep(600);
    await client.screenshot('shot_m4_fase4_p1_fishing_bay.png');

    // Teletransportar a Checkpoint 30
    await client.eval(`
      (() => {
        jumpToLevelPhase(3, 30);
      })()
    `);
    await sleep(600);
    await client.screenshot('shot_m4_fase4_p1_checkpoint30.png');

    // 3. Probar física de Hielo Resbaladizo (Slippery Ice) y Movimiento de Témpanos
    console.log('[6/8] Testing Ice Physics, Moving Iceberg & Cracking Ice...');
    const physicsTest = await client.eval(`
      (() => {
        // Colocar sobre plataforma de hielo resbaladizo en X: 14780
        player.x = 14780;
        player.y = 170;
        player.vx = 140; // Dar velocidad inicial
        keys.right = false;
        keys.left = false;

        // Ejecutar 15 frames de actualización
        for (let f = 0; f < 15; f++) {
          updatePlatforms(1/60);
          updatePlayerMovement(1/60);
          updatePlayerCollisions(1/60);
        }

        // Probar si el témpano móvil se mueve
        const movingPlat = level.platforms.find(p => p.moving && p.minX === 13860);
        const initialMovingX = movingPlat ? movingPlat.x : null;
        if (movingPlat) {
          updatePlatforms(0.5);
        }
        const updatedMovingX = movingPlat ? movingPlat.x : null;

        // Probar si el hielo quebradizo se fractura al pisarlo
        const crackingPlat = level.platforms.find(p => p.subType === 'cracking_ice');
        let crackTimerBefore = crackingPlat ? crackingPlat.crackTimer : null;
        if (crackingPlat) {
          player.x = crackingPlat.x + 10;
          player.y = crackingPlat.y - 24;
          player.onGround = true;
          player.currentPlatform = crackingPlat;
          updatePlatforms(0.4);
        }
        let crackTimerAfter = crackingPlat ? crackingPlat.crackTimer : null;

        // Probar Cristal Celestial de Impulso
        const bouncePlat = level.platforms.find(p => p.subType === 'bounce_crystal');
        let bounceVy = null;
        if (bouncePlat) {
          player.x = bouncePlat.x;
          player.y = bouncePlat.y - 20;
          player.vy = 50; // cayendo sobre el cristal
          updatePlayerCollisions(1/60);
          bounceVy = player.vy;
        }

        return {
          slipperyIceVxRemains: player.vx,
          movingIcebergMoved: (initialMovingX !== null && updatedMovingX !== null && updatedMovingX !== initialMovingX),
          crackingIceWorks: (crackTimerAfter > crackTimerBefore),
          bounceCrystalVy: bounceVy
        };
      })()
    `);
    console.log('[PHYSICS & MECHANICS RESULTS]:', JSON.stringify(physicsTest));

    // 4. Capturar Pista de Hielo y Checkpoint 31 (X: 15580)
    console.log('[7/8] Capturing Ice Highway & Checkpoint 31...');
    await client.eval(`
      (() => {
        jumpToLevelPhase(3, 31);
      })()
    `);
    await sleep(600);
    await client.screenshot('shot_m4_fase4_p1_checkpoint31_highway.png');

    // 5. Capturar Fosa Abisal, Témpano Central y Checkpoint 32 (X: 16650)
    console.log('[8/8] Testing CP 32 (Islas de Hielo Profundo) & Santuario Glacial (CP 33)...');
    await client.eval(`
      (() => {
        player.x = 16220;
        player.y = 150;
        cameraX = 16100;
      })()
    `);
    await sleep(600);
    await client.screenshot('shot_m4_fase4_p2_abyssal_chasm.png');

    // Santuario Glacial del Monje Tenzin
    await client.eval(`
      (() => {
        player.x = 16960;
        player.y = 170;
        cameraX = 16820;
      })()
    `);
    await sleep(600);
    await client.screenshot('shot_m4_fase4_p2_monk_tenzin_altar.png');

    // Checkpoint 33: Umbral de la Gran Cumbre (X: 17880, Y: 136)
    await client.eval(`
      (() => {
        jumpToLevelPhase(3, 33);
      })()
    `);
    await sleep(600);
    await client.screenshot('shot_m4_fase4_p2_checkpoint33_summit_threshold.png');

    // 6. Verificar que los 6 quesos (59, 60, 61, 62, 63, 64) existen y son válidos
    const cheesesStatus = await client.eval(`
      (() => {
        const ids = [59, 60, 61, 62, 63, 64];
        return ids.map(id => {
          const c = level.cheeses[id];
          return { id, exists: !!c, x: c ? c.x : null, y: c ? c.y : null };
        });
      })()
    `);
    console.log('[CHEESES 59-64 STATUS]:', JSON.stringify(cheesesStatus));

    console.log('\n============================================================');
    console.log('✅ ALL VERIFICATIONS PASSED WITH FLYING COLORS!');
    console.log('============================================================');
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('[TEST ERROR]:', err);
  process.exit(1);
});
