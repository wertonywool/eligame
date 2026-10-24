const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\2d8eb4c4-8afc-486a-816a-45baedeea85a';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test_mechanics_f5';
const CDP_PORT = 9295;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
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
  console.log('Testing Fase 5 mechanics & structure...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--window-size=1280,720',
    'http://localhost:3000/?test=' + Date.now()
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

    if (!targets || targets.length === 0) throw new Error('Cannot reach Chrome target');
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    await sleep(2000);

    // Initialize Level 4 at Fase 5
    await client.eval(`
      loadLevel(3);
      gameState = 'PLAYING';
    `);

    // TEST 1: Checkpoint list & IDs
    const cpTest = await client.eval(`
      (() => {
        const cps = level.checkpoints.filter(c => c.id >= 34 && c.id <= 37);
        return {
          count: cps.length,
          ids: cps.map(c => c.id),
          names: cps.map(c => c.name)
        };
      })()
    `);
    console.log('[CHECKPOINTS TEST]:', JSON.stringify(cpTest));
    if (cpTest.count !== 4) throw new Error('Expected 4 checkpoints in Fase 5');

    // TEST 2: Cheeses list & IDs
    const cheeseTest = await client.eval(`
      (() => {
        const chs = level.cheeses.filter(c => c.id >= 65 && c.id <= 70);
        return {
          count: chs.length,
          ids: chs.map(c => c.id)
        };
      })()
    `);
    console.log('[CHEESES TEST]:', JSON.stringify(cheeseTest));
    if (cheeseTest.count !== 6) throw new Error('Expected 6 cheeses in Fase 5');

    // TEST 3: NPCs
    const npcTest = await client.eval(`
      (() => {
        const npcs = level.npcs.filter(n => n.x >= 18000 && n.x <= 23800);
        return {
          count: npcs.length,
          names: npcs.map(n => n.name)
        };
      })()
    `);
    console.log('[NPCS TEST]:', JSON.stringify(npcTest));
    if (npcTest.count !== 4) throw new Error('Expected 4 NPCs in Fase 5');

    // TEST 4: Spikes
    const spikesTest = await client.eval(`
      (() => {
        const spks = (level.spikes || []).filter(s => s.x >= 18000 && s.x <= 23800);
        return {
          count: spks.length,
          spikes: spks
        };
      })()
    `);
    console.log('[SPIKES TEST]:', JSON.stringify(spikesTest));
    if (spikesTest.count < 6) throw new Error('Expected at least 6 spike pits in Fase 5');

    // TEST 5: Breakable ice pillar test
    console.log('Testing Breakable Ice Pillar mechanic...');
    const pillarBefore = await client.eval(`
      (() => {
        const p = level.platforms.find(p => p.x === 18370 && p.subType === 'ice_pillar');
        return { found: !!p, broken: p ? p.broken : false };
      })()
    `);
    console.log('[PILLAR BEFORE]:', pillarBefore);

    // Hit the pillar with ice pick swing
    const hitResult = await client.eval(`
      (() => {
        player.x = 18350;
        player.y = 110;
        player.facingRight = true;
        player.ability = 'ice_pick';
        initIcePickAbility();
        keys.dashJustPressed = true;

        const pBefore = level.platforms.find(p => p.x === 18370 && p.subType === 'ice_pillar');
        const dashEntered = (keys.dashJustPressed && icePickState.swingCooldown <= 0);
        
        // Execute
        updateIcePickAbility(0.016);
        
        const pAfter = level.platforms.find(p => p.x === 18370 && p.subType === 'ice_pillar');
        return {
          dashEntered,
          hitX: player.x + (player.facingRight ? 24 : -6),
          hitY: player.y + 12,
          pProps: pBefore ? { x: pBefore.x, y: pBefore.y, w: pBefore.w, h: pBefore.h, subType: pBefore.subType, breakable: pBefore.breakable } : null,
          broken: pAfter ? pAfter.broken : false
        };
      })()
    `);
    console.log('[PILLAR AFTER ICE PICK HIT]:', JSON.stringify(hitResult));
    if (!hitResult.broken) throw new Error('Breakable ice pillar did not break on pick hit');

    // TEST 6: Bounce Crystal test
    console.log('Testing Bounce Crystal mechanic...');
    const bounceResult = await client.eval(`
      (() => {
        player.x = 18815;
        player.y = 150;
        player.vy = 100;
        player.onGround = false;
        // Simulate collision step with bounce crystal
        updatePlayerCollisions(0.016);
        return {
          vy: player.vy,
          jumpsLeft: player.jumpsLeft,
          bounced: player.vy < -300
        };
      })()
    `);
    console.log('[BOUNCE CRYSTAL TEST]:', bounceResult);
    if (!bounceResult.bounced) throw new Error('Bounce crystal did not launch player upward');

    // TEST 7: Cracking Ice test
    console.log('Testing Cracking Ice mechanic...');
    const crackResult = await client.eval(`
      (() => {
        const p = level.platforms.find(p => p.subType === 'cracking_ice' && p.x === 18420);
        player.x = 18430;
        player.y = 106;
        player.onGround = true;
        player.currentPlatform = p;
        // Step on it for 1 second
        for (let i = 0; i < 60; i++) {
          updatePlatforms(0.016);
        }
        return {
          broken: p.broken,
          crackTimer: p.crackTimer
        };
      })()
    `);
    console.log('[CRACKING ICE TEST]:', crackResult);
    if (!crackResult.broken) throw new Error('Cracking ice did not break after standing on it');

    // TEST 8: Blizzard Ice-Anchor test
    console.log('Testing Blizzard Ice-Anchor mechanic...');
    const blizzardResult = await client.eval(`
      (() => {
        player.x = 19000;
        player.y = 112;
        player.vx = 0;
        player.onGround = true;
        player.ability = 'ice_pick';
        keys.down = true; // Anchoring with ice pick
        blizzardState.active = true;
        blizzardState.timer = 2.0;
        updateBlizzardSystem(0.1);
        return {
          playerVx: player.vx,
          resisted: player.vx >= 0
        };
      })()
    `);
    console.log('[BLIZZARD ANCHOR TEST]:', blizzardResult);
    if (!blizzardResult.resisted) throw new Error('Ice pick anchor did not resist blizzard wind');

    // Take screenshot of updated Summit
    await client.eval(`
      (() => {
        player.x = 22900;
        player.y = 74;
        cameraX = 22800;
        cameraY = 0;
      })()
    `);
    await sleep(1000);
    await client.screenshot('fase5_everest_summit_perfect.png');

    console.log('[ALL FASE 5 TESTS PASSED SUCCESSFULLY!]');
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(e => {
  console.error('[TEST ERROR]:', e);
  process.exit(1);
});
