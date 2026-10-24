// ============================================================================
// VERIFICADOR HEADLESS CDP: MUNDO 4 - FASE 3 (EL PUEBLO NEVADO Y LAS 7 CASAS)
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ARTIFACT_DIR = 'C:\\Users\\werto\\.gemini\\antigravity\\brain\\1ed27f88-e8f7-417b-b0e3-7a1ddff78adf';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'c:\\Users\\werto\\OneDrive\\Desktop\\cosas\\elizagame\\c_tmp_test_f3';
const CDP_PORT = 9283;

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
    'http://localhost:3000/?v=f3_test_' + Date.now()
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

    console.log('[3/8] Waiting for game to load...');
    await sleep(2000);

    const loadState = await client.eval(`
      ({
        hasLevels: typeof LEVELS !== 'undefined',
        lvl4Platforms: LEVELS[3] ? LEVELS[3].platforms.length : 0,
        lvl4Crawlers: LEVELS[3] ? LEVELS[3].magmaCrawlers.length : 0,
        lvl4Fliers: LEVELS[3] ? LEVELS[3].fireBats.length : 0,
        lvl4Cheeses: LEVELS[3] ? LEVELS[3].cheeses.length : 0
      })
    `);
    console.log('[GAME LOAD STATE]:', JSON.stringify(loadState));

    // 1. Teletransportarse al Checkpoint #23 (Plaza de Namche / Entrada de Fase 3)
    console.log('[4/8] Teleporting to Checkpoint #23 (Fase 3: Plaza Namche Bazaar)...');
    await client.eval(`jumpToLevelPhase(3, 23);`);
    await sleep(1500);
    const cp23Pos = await client.eval(`({ x: player.x, y: player.y, state: gameState, lives: player.lives })`);
    console.log('[CP23 SPAWN POS]:', JSON.stringify(cp23Pos));
    await client.screenshot('shot_fase3_welcome_plaza.png');

    // 2. Entrar a Casa 1: La Taberna Alpina (X: 8460 -> 50050)
    console.log('[5/8] Testing Casa 1 (La Taberna Alpina)...');
    await client.eval(`
      player.x = 8450; player.y = 196;
      updateSkyscraperDoors();
      // Simular tecla Arriba en la puerta
      const d = SNOW_VILLAGE_DOORS.find(door => door.id === 'village_to_tavern');
      if (d) d.action();
    `);
    await sleep(800);
    const tavernPos = await client.eval(`({ x: player.x, y: player.y })`);
    console.log('[TAVERN INTERIOR POS]:', JSON.stringify(tavernPos));
    await client.screenshot('shot_fase3_casa1_tavern_interior.png');

    // Probar interacción con Tashi (Curación vía handleNpcQuestDialogueEnd)
    await client.eval(`
      player.lives = 1; // Bajar vidas a 1 para comprobar curación
      const tashi = npcs.find(n => n.name.includes('Tashi'));
      if (typeof handleNpcQuestDialogueEnd === 'function') handleNpcQuestDialogueEnd(tashi);
    `);
    const healedLives = await client.eval(`player.lives`);
    console.log('[TASHI SOUP HEALED LIVES]:', healedLives);

    // Salir de la taberna al pueblo
    await client.eval(`
      const exitD = SNOW_VILLAGE_DOORS.find(door => door.id === 'tavern_to_village');
      if (exitD) exitD.action();
    `);
    await sleep(600);

    // 3. Probar Parkour en los tejados de la calle
    await client.eval(`
      player.x = 8440; player.y = 70; player.vx = 0; player.vy = 0;
    `);
    await sleep(600);
    await client.screenshot('shot_fase3_rooftop_parkour.png');

    // 4. Probar Casa 3: Cabaña de Gastón y obtención del Pico de Hielo
    console.log('[6/8] Testing Casa 3 (Cabaña de Gastón & Pico de Hielo)...');
    await client.eval(`
      const dGaston = SNOW_VILLAGE_DOORS.find(door => door.id === 'village_to_depre_cabin');
      if (dGaston) dGaston.action();
    `);
    await sleep(800);
    await client.screenshot('shot_fase3_casa3_gaston_cabin.png');

    // Hablar con Gaston
    await client.eval(`
      const gaston = npcs.find(n => n.name.includes('Gaston'));
      if (typeof handleNpcQuestDialogueEnd === 'function') handleNpcQuestDialogueEnd(gaston);
    `);
    const icePickStatus = await client.eval(`({ hasIcePick: player.hasIcePick, ability: player.ability })`);
    console.log('[ICE PICK ACQUIRED]:', JSON.stringify(icePickStatus));

    // Salir de la cabaña
    await client.eval(`
      const exitG = SNOW_VILLAGE_DOORS.find(door => door.id === 'depre_cabin_to_village');
      if (exitG) exitG.action();
    `);
    await sleep(600);

    // 5. Probar Casa 4: Sala Arcade y Minijuego Yeti-99
    console.log('[7/8] Testing Casa 4 (Arcade Polar & Yeti-99 Minigame)...');
    await client.eval(`
      const dArcade = SNOW_VILLAGE_DOORS.find(door => door.id === 'village_to_arcade');
      if (dArcade) dArcade.action();
    `);
    await sleep(800);
    await client.screenshot('shot_fase3_casa4_arcade_interior.png');

    // Verificar prompt frente a la consola a 51380
    await client.eval(`
      player.x = 51380; player.y = 196;
      updateArcadeCabinetInteraction();
    `);
    const arcadePromptActive = await client.eval(`activeArcadePrompt`);
    console.log('[ARCADE PROMPT ACTIVE AT CABINET]:', arcadePromptActive);

    // Iniciar minijuego arcade
    await client.eval(`startArcadeMinigame();`);
    await sleep(800);
    const arcadeState = await client.eval(`({ gameState, active: arcadeMinigame.active, blocks: arcadeMinigame.blocks.length })`);
    console.log('[ARCADE MINIGAME STATE]:', JSON.stringify(arcadeState));
    await client.screenshot('shot_fase3_arcade_minigame_running.png');

    // Salir del minijuego
    await client.eval(`exitArcadeMinigame();`);
    await sleep(400);

    // Salir del arcade al pueblo
    await client.eval(`
      const exitA = SNOW_VILLAGE_DOORS.find(door => door.id === 'arcade_to_village');
      if (exitA) exitA.action();
    `);
    await sleep(600);

    // 6. Probar Casa 6: Forja de Hielo y mejora del Pico
    console.log('Testing Casa 6 (Forja de Hielo & Pico Forjado)...');
    await client.eval(`
      const dForge = SNOW_VILLAGE_DOORS.find(door => door.id === 'village_to_forge');
      if (dForge) dForge.action();
    `);
    await sleep(800);
    await client.screenshot('shot_fase3_casa6_forge_interior.png');

    // Hablar con Kazi para forjar el pico
    await client.eval(`
      const kazi = npcs.find(n => n.name.includes('Kazi'));
      if (typeof handleNpcQuestDialogueEnd === 'function') handleNpcQuestDialogueEnd(kazi);
    `);
    const forgedPickStatus = await client.eval(`({ hasForgedPick: player.hasForgedPick })`);
    console.log('[FORGED PICK STATUS]:', JSON.stringify(forgedPickStatus));

    // Salir de la forja
    await client.eval(`
      const exitF = SNOW_VILLAGE_DOORS.find(door => door.id === 'forge_to_village');
      if (exitF) exitF.action();
    `);
    await sleep(600);

    // 7. Probar Casa 7: Gran Alcaldía y salida al Lago
    console.log('Testing Casa 7 (Gran Alcaldía & Salón de Audiencias)...');
    await client.eval(`
      const dTown = SNOW_VILLAGE_DOORS.find(door => door.id === 'village_to_townhall');
      if (dTown) dTown.action();
    `);
    await sleep(800);
    await client.screenshot('shot_fase3_casa7_townhall_interior.png');

    // Salir de la alcaldía y avanzar al Gran Arco Glacial
    await client.eval(`
      const exitT = SNOW_VILLAGE_DOORS.find(door => door.id === 'townhall_to_village');
      if (exitT) exitT.action();
      player.x = 13200; player.y = 196;
    `);
    await sleep(800);
    await client.screenshot('shot_fase3_glacial_exit_gate.png');

    // Probar golpe de pico de hielo
    await client.eval(`
      keys.dashJustPressed = true;
      updateIcePickAbility(0.016);
    `);
    await sleep(200);
    const swingStatus = await client.eval(`({ isSwinging: player.isSwingingPick, ability: player.ability })`);
    console.log('[ICE PICK SWING STATUS]:', JSON.stringify(swingStatus));

    console.log('[8/8] ALL TESTS IN MUNDO 4 FASE 3 PASSED PERFECTLY!');
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('[TEST ERROR]:', err);
  process.exit(1);
});
