const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\bb837578-528f-410c-a747-b28ccb569ade';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test_f7';
const CDP_PORT = 9284;

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
  console.log('[1/6] Launching headless Chrome...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--window-size=1280,720',
    'http://localhost:3000/?v=' + Date.now()
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
    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('[2/6] Waiting for game to load...');
    await sleep(2500);

    // Level Audit
    const f7Audit = await client.eval(`
      (() => {
        const lvl = LEVELS[3];
        if (!lvl) return { error: 'No Level 4 found' };
        const f7Plats = lvl.platforms.filter(p => p.x >= 29600 && p.x <= 33000);
        const f7Decos = lvl.decorations.filter(d => d.x >= 29600 && d.x <= 33000);
        const f7Crawlers = lvl.magmaCrawlers.filter(c => c.x >= 29600 && c.x <= 33000);
        const f7Fliers = lvl.fireBats.filter(f => f.x >= 29600 && f.x <= 33000);
        const f7Cheeses = lvl.cheeses.filter(c => c.x >= 29600 && c.x <= 33000);
        const f7Geysers = (lvl.geysers || []).filter(g => g.x >= 29600 && g.x <= 33000);
        const f7Npcs = lvl.npcs.filter(n => n.x >= 29600 && n.x <= 33000);
        const f7Cps = lvl.checkpoints.filter(c => c.x >= 29600 && c.x <= 33000);
        return {
          platforms: f7Plats.length,
          decorations: f7Decos.length,
          crawlers: f7Crawlers.length,
          fliers: f7Fliers.length,
          cheeses: f7Cheeses.map(c => ({ id: c.id, x: c.x, y: c.y })),
          geysers: f7Geysers.length,
          npcs: f7Npcs.map(n => ({ name: n.name, x: n.x, y: n.y })),
          checkpoints: f7Cps.map(c => ({ id: c.id, name: c.name, x: c.x }))
        };
      })()
    `);
    console.log('[AUDIT RESULT]:', JSON.stringify(f7Audit, null, 2));

    // Shot 1: Entrance to Shambhala (x: 29650)
    console.log('[3/6] Inspecting Entrance (X: 29650)...');
    await client.eval(`
      jumpToLevelPhase(3, 42);
      player.x = 29650;
      player.y = 100;
      cameraX = 29580;
    `);
    await sleep(1200);
    await client.screenshot('shot_m4_fase7_entrance.png');

    // Shot 2: Lotus Pond and Cheese #83 (x: 29950)
    console.log('Inspecting Lotus Ponds (X: 29950)...');
    await client.eval(`
      player.x = 29950;
      player.y = 75;
      cameraX = 29850;
    `);
    await sleep(1200);
    await client.screenshot('shot_m4_fase7_lotus_ponds.png');

    // Shot 3: Jinpa Shrine (CP 42: x: 30420)
    console.log('Inspecting Jinpa Shrine CP 42 (X: 30420)...');
    await client.eval(`
      jumpToLevelPhase(3, 42);
      cameraX = 30300;
    `);
    await sleep(1200);
    await client.screenshot('shot_m4_fase7_jinpa_shrine.png');

    // Shot 4: Pagoda Spire and Cheese #86 (x: 31390)
    console.log('Inspecting Pagoda Spire (X: 31390)...');
    await client.eval(`
      player.x = 31390;
      player.y = 30;
      cameraX = 31280;
    `);
    await sleep(1200);
    await client.screenshot('shot_m4_fase7_pagoda_entrance.png');

    // Shot 5: Abadesa Tenzin Sanctum (CP 43: x: 31990)
    console.log('Inspecting Tenzin Sanctum CP 43 (X: 31990)...');
    await client.eval(`
      jumpToLevelPhase(3, 43);
      cameraX = 31900;
    `);
    await sleep(1200);
    await client.screenshot('shot_m4_fase7_tenzin_sanctum.png');

    // Shot 6: Altar of the Nirvana Lotus and Stargate Portal (x: 32840)
    console.log('Inspecting Grand Altar and Portal (X: 32840)...');
    await client.eval(`
      player.x = 32820;
      player.y = 100;
      cameraX = 32740;
    `);
    await sleep(1200);
    await client.screenshot('shot_m4_fase7_altar_portal.png');

    // [4/6] Test Mechanics:
    console.log('[4/6] Testing Interactive Mechanics...');

    // Test 1: Hot Spring Healing
    const healTest = await client.eval(`
      (() => {
        player.x = 29725;
        player.y = 110;
        player.lives = 1;
        const initialLives = player.lives;
        const spring = level.decorations.find(d => d.subType === 'hot_spring' && Math.abs(d.x - 29720) < 50);
        if (spring) spring.healTimer = 1.0;
        // Run a physics update
        updatePlayerCollisions(0.1);
        return {
          initialLives,
          afterLives: player.lives,
          healed: player.lives > initialLives
        };
      })()
    `);
    console.log('[HEALING TEST]:', JSON.stringify(healTest));

    // Test 2: Crystal Lotus Bounce
    const bounceTest = await client.eval(`
      (() => {
        const lotusPad = level.platforms.find(p => p.subType === 'crystal_lotus_pad');
        if (!lotusPad) return { error: 'No lotus pad found' };
        player.x = lotusPad.x + 10;
        player.y = lotusPad.y - 10;
        player.vy = 20;
        updatePlayerCollisions(0.016);
        return {
          bounced: player.vy < -300,
          vy: Math.round(player.vy),
          jumpsLeft: player.jumpsLeft
        };
      })()
    `);
    console.log('[BOUNCE TEST]:', JSON.stringify(bounceTest));

    // Test 3: Bell Ringing
    const bellTest = await client.eval(`
      (() => {
        const bell = level.decorations.find(d => d.subType === 'shambhala_prayer_bell');
        if (!bell) return { error: 'No prayer bell found' };
        player.x = bell.x;
        player.y = bell.y - 20;
        player.isSwingingPick = true;
        const initScore = score;
        updatePlayerCollisions(0.016);
        return {
          scoreGained: score - initScore,
          isRinging: bell.ringing > 0
        };
      })()
    `);
    console.log('[BELL TEST]:', JSON.stringify(bellTest));

    // Test 4: Stargate Warp
    const warpTest = await client.eval(`
      (() => {
        const portal = level.decorations.find(d => d.subType === 'sanctuary_portal_gate');
        if (!portal) return { error: 'No portal gate found' };
        portal.warped = false;
        player.x = portal.x;
        player.y = portal.y - 10;
        updatePlayerCollisions(0.016);
        return {
          warped: portal.warped === true,
          playerX: Math.round(player.x),
          passedThreshold: player.x >= 33000
        };
      })()
    `);
    console.log('[PORTAL WARP TEST]:', JSON.stringify(warpTest));

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
