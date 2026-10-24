// ============================================================================
// TEST CDP: WALKTHROUGH Y VERIFICACION DE MECANICAS DE FASE 1 MUNDO 4
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\e4c6b645-acc2-4863-b4a4-3efb36686251';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test_walk_f1';
const CDP_PORT = 9278;

async function sleep(ms) {
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
  console.log('[1/4] Launching headless Chrome...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--disable-gpu',
    '--window-size=1280,720',
    'http://localhost:3000/?v=80'
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

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await sleep(2000);

    console.log('[2/4] Testing Digging in Snow Bank at X=500...');
    const digTest = await client.eval(`
      (function() {
        jumpToLevelPhase(3, 17);
        player.x = 500;
        player.y = 196;
        player.onGround = true;
        player.ability = 'shovel';
        keys.down = true;
        updateShovelAbility(0.016);
        const isDigging = player.isDigging;
        // Simular avance bajo la nieve
        keys.right = true;
        updateShovelAbility(0.016);
        const vx = player.vx;
        // Salto de nieve impulsado
        keys.jumpJustPressed = true;
        updateShovelAbility(0.016);
        const jumpVy = player.vy;
        return { isDigging, vx, jumpVy };
      })()
    `);
    console.log('[DIG TEST RESULT]:', JSON.stringify(digTest));

    console.log('[3/4] Testing Snowball Combat vs Enemy...');
    const combatTest = await client.eval(`
      (function() {
        // Colocar enemigo crawler a 80px de distancia
        const testEnemy = { x: 580, y: 196, dead: false, w: 20, h: 18 };
        level.magmaCrawlers = [testEnemy];
        player.x = 500;
        player.y = 174;
        player.facingRight = true;
        shovelState.snowballs = 2;
        keys.down = false;
        keys.dashJustPressed = true;
        updateShovelAbility(0.016); // Lanza proyectil
        
        // Simular avance de proyectil hasta impacto
        for (let frame = 0; frame < 15; frame++) {
          updateShovelAbility(0.016);
          if (testEnemy.dead) break;
        }
        return { enemyDead: testEnemy.dead, scoreAfterHit: score };
      })()
    `);
    console.log('[COMBAT TEST RESULT]:', JSON.stringify(combatTest));

    console.log('[4/4] Capturing Digging Screenshot...');
    await client.eval(`
      jumpToLevelPhase(3, 17);
      player.x = 550;
      player.y = 196;
      player.ability = 'shovel';
      player.isDigging = true;
      cameraX = 400;
    `);
    await sleep(800);
    await client.screenshot('shot_m4_fase1_digging.png');

    console.log('[FASE 1 WALKTHROUGH TEST COMPLETED SUCCESSFULLY]');
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('[TEST ERROR]:', err);
  process.exit(1);
});
