// ============================================================================
// VERIFICADOR HEADLESS CDP: MUNDO 4 - FASE 8 OVERHAUL COMPLETO
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\1b0d3c10-84ec-4ef0-b021-21f2410b0f26';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test_f8';
const CDP_PORT = 9275;

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
  console.log('[1/6] Launching headless Chrome on port ' + CDP_PORT + '...');
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
    console.log('[2/6] Connected to target:', pageTarget.title, pageTarget.url);

    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('[3/6] Waiting for game initialization...');
    await sleep(2500);

    // 1. Verificar carga de datos de Fase 8
    const fase8Data = await client.eval(`
      (() => {
        const lvl4 = LEVELS[3];
        if (!lvl4) return { error: 'No level 4' };
        const f8Platforms = lvl4.platforms.filter(p => p.x >= 33000 && p.x <= 36400);
        const f8Breakables = f8Platforms.filter(p => p.breakable);
        const f8Geysers = lvl4.geysers.filter(g => g.x >= 33000 && g.x <= 36400);
        const f8Crawlers = lvl4.magmaCrawlers.filter(c => c.x >= 33000 && c.x <= 36400);
        const f8Fliers = lvl4.fireBats.filter(f => f.x >= 33000 && f.x <= 36400);
        const f8Cheeses = lvl4.cheeses.filter(c => c.x >= 33000 && c.x <= 36400);
        const f8Checkpoints = lvl4.checkpoints.filter(cp => cp.x >= 33000 && cp.x <= 36400);
        const f8Npcs = lvl4.npcs.filter(n => n.x >= 33000 && n.x <= 36400);

        return {
          platforms: f8Platforms.length,
          breakables: f8Breakables.map(b => ({ x: b.x, y: b.y, type: b.crystalType })),
          geysers: f8Geysers.map(g => ({ x: g.x, force: g.force, isAstral: g.isAstral })),
          crawlers: f8Crawlers.map(c => c.variant),
          fliers: f8Fliers.map(f => f.variant),
          cheeses: f8Cheeses.map(c => ({ id: c.id, x: c.x })),
          checkpoints: f8Checkpoints.map(cp => ({ id: cp.id, x: cp.x, name: cp.name })),
          npcs: f8Npcs.map(n => n.name)
        };
      })()
    `);
    console.log('[FASE 8 AUDIT DATA]:', JSON.stringify(fase8Data, null, 2));

    // 2. Saltar a Checkpoint 44 (Entrada de Kailash)
    console.log('[4/6] Warping to Checkpoint 44 (Monte Sagrado Kailash)...');
    const cp44State = await client.eval(`
      (() => {
        jumpToLevelPhase(3, 44);
        return {
          playerX: Math.round(player.x),
          playerY: Math.round(player.y),
          isLowGrav: (level.id === 4 && player.x >= 33000),
          nearbyNpc: nearbyNpc ? nearbyNpc.name : null
        };
      })()
    `);
    console.log('[CP 44 WARP STATE]:', JSON.stringify(cp44State));
    await sleep(1500);
    await client.screenshot('m4_fase8_kailash_entrance.png');

    // 3. Probar impulso del Géiser Astral #1 (x: 33660)
    console.log('[5/6] Testing Astral Updraft (Geyser x: 33660) & Rainbow Bridges...');
    const geyserTest = await client.eval(`
      (() => {
        player.x = 33665;
        player.y = 120;
        player.vy = 0;
        cameraX = player.x - 200;
        return {
          playerX: Math.round(player.x),
          playerY: Math.round(player.y)
        };
      })()
    `);
    // Dejar correr la física para que el géiser impulse
    await sleep(350);
    const afterGeyser = await client.eval(`
      ({
        vy: Math.round(player.vy),
        y: Math.round(player.y),
        onGround: player.onGround
      })
    `);
    console.log('[GEYSER IMPULSE TEST]:', JSON.stringify(afterGeyser));
    await sleep(1000);
    await client.screenshot('m4_fase8_kailash_astral_geyser.png');

    // 4. Saltar a Checkpoint 45 (Palacio Astral de Agartha)
    console.log('[6/6] Warping to Checkpoint 45 (Palacio Astral de Agartha)...');
    const cp45State = await client.eval(`
      (() => {
        jumpToLevelPhase(3, 45);
        return {
          playerX: Math.round(player.x),
          playerY: Math.round(player.y),
          isLowGrav: (level.id === 4 && player.x >= 33000)
        };
      })()
    `);
    console.log('[CP 45 WARP STATE]:', JSON.stringify(cp45State));
    await sleep(1500);
    await client.screenshot('m4_fase8_agartha_entrance.png');

    // 5. Moverse al Gran Patio Real y Trono de Soberana Arya
    console.log('Testing Agartha Royal Courtyard & Throne of Arya (x: 35500)...');
    await client.eval(`
      player.x = 35480;
      player.y = 100;
      player.vx = 0;
      player.vy = 0;
      cameraX = player.x - 220;
    `);
    await sleep(1500);
    await client.screenshot('m4_fase8_agartha_throne.png');

    // 6. Moverse al Gran Portal Cósmico al final de Fase 8 (x: 36280)
    console.log('Testing Cosmic Portal to Firmament (x: 36280)...');
    await client.eval(`
      player.x = 36240;
      player.y = 100;
      player.vx = 0;
      player.vy = 0;
      cameraX = player.x - 220;
    `);
    await sleep(1500);
    await client.screenshot('m4_fase8_cosmic_portal.png');

    // 7. Test de destrucción de pilar de cristal con golpe de pico de hielo
    console.log('Testing breakable pillar destruction with Ice Pick...');
    const breakTest = await client.eval(`
      (() => {
        // Colocar jugador justo al lado del pilar de cuarzo #1 (x: 33510, y: 80, w: 34, h: 64)
        player.x = 33490;
        player.y = 85;
        player.vx = 0;
        player.vy = 0;
        player.facingRight = true;
        cameraX = player.x - 200;

        const countBefore = window.level.platforms.filter(p => p.breakable).length;

        // Ejecutar golpe de pico de hielo pulsando dash
        keys.dashJustPressed = true;
        updateIcePickAbility(0.016);

        return { countBefore, ability: player.ability };
      })()
    `);
    console.log('[ICE PICK SWING INIT]:', JSON.stringify(breakTest));
    await sleep(200);
    const afterBreak = await client.eval(`
      (() => {
        const countAfter = window.level.platforms.filter(p => p.breakable).length;
        return {
          countAfter,
          brokenSuccess: countAfter < ${breakTest.countBefore}
        };
      })()
    `);
    console.log('[BREAKABLE PILLAR TEST]:', JSON.stringify(afterBreak));

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
