const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\e858ec00-aa45-40e5-b683-e289a43f24c3';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_f2';
const CDP_PORT = 9288;

function sleep(ms) {
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
    console.log('[2/4] Connected to target:', pageTarget.title, pageTarget.url);

    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('[3/4] Waiting for game load...');
    await sleep(2000);

    // Teletransportarse al Checkpoint 19 (Puerta de la Cascada de Hielo / Inicio Fase 2)
    console.log('[4/4] Teleporting to CP 19 (Mundo 4 Fase 2)...');
    await client.eval(`jumpToLevelPhase(3, 19);`);
    await sleep(1000);
    await client.screenshot('shot_fase2_cp19_start.png');

    // Teletransportarse al Checkpoint 20 (Fase 2 Parte 1)
    await client.eval(`jumpToLevelPhase(3, 20);`);
    await sleep(1000);
    await client.screenshot('shot_fase2_cp20_parte1.png');

    // Teletransportarse al Checkpoint 21 (Fase 2 Parte 2)
    await client.eval(`jumpToLevelPhase(3, 21);`);
    await sleep(1000);
    await client.screenshot('shot_fase2_cp21_parte2.png');

    // Teletransportarse al Checkpoint 22 (Fase 2 Parte 3)
    await client.eval(`jumpToLevelPhase(3, 22);`);
    await sleep(1000);
    await client.screenshot('shot_fase2_cp22_parte3.png');

    console.log('[DONE] All screenshots captured successfully.');
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('[ERROR]:', err);
  process.exit(1);
});
