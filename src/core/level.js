// ============================================================================
// INICIALIZACIÓN DEL NIVEL (CON SOPORTE DE CHECKPOINT Y QUESOS PERMANENTES)
// ============================================================================
function loadLevel(idx) {
  currentLevelIndex = idx;
  const raw = window.LEVELS[idx] || window.LEVELS[0];
  level = JSON.parse(JSON.stringify(raw));
  const maxLives = saveState.upgrades.extraHeart2 ? 5 : ((saveState.upgrades.extraHeart1 || saveState.upgrades.extraHeart) ? 4 : 3);

  // Verificar si el jugador tiene un Checkpoint guardado y usar siempre las coordenadas actuales del nivel
  const rawSavedCp = saveState.activeCheckpoints && saveState.activeCheckpoints[level.id];
  const savedCp = rawSavedCp ? (level.checkpoints || []).find(c => c.id === rawSavedCp.id) : null;
  if (rawSavedCp && !savedCp) {
    delete saveState.activeCheckpoints[level.id];
  }
  const initialX = savedCp ? savedCp.x : level.playerSpawn.x;
  const initialY = savedCp ? (savedCp.y - 26) : level.playerSpawn.y;

  player = {
    x: initialX,
    y: initialY,
    spawnX: initialX,
    spawnY: initialY,
    w: 22,
    h: 24,
    vx: 0,
    vy: 0,
    speed: 148,
    jumpForce: -278,
    gravity: 690,
    onGround: false,
    jumpsLeft: 2,
    coyoteTimer: 0,
    jumpBufferTimer: 0,
    facingRight: true,
    state: 'idle',
    animFrame: 0,
    squashX: 1,
    squashY: 1,
    lives: maxLives,
    maxLives,
    invulnTimer: 0,
    trailTimer: 0,
    transitionTimer: 0,
    ability: level.ability || null,
    dashTimer: 0,
    dashCooldown: 0
  };

  const dashBtn = document.getElementById('btn-dash');
  if (dashBtn) {
    if (player.ability === 'lava_run' || player.ability === 'surf' || player.ability === 'shovel' || player.ability === 'ice_pick') {
      dashBtn.classList.add('visible');
    } else {
      dashBtn.classList.remove('visible');
    }
  }

  // Si ya cogiste un queso en este nivel y terminaste el nivel antes, queda descubierto permanentemente y no se puede volver a coger
  const savedCheeseIds = (saveState.collectedCheeseIds && saveState.collectedCheeseIds[level.id]) || [];
  cheeses = (level.cheeses || []).map((c, index) => {
    const alreadySaved = savedCheeseIds.includes(index);
    const gy = getGroundYUnder(c.x + 6, c.y + 14, 45);
    return {
      ...c,
      id: index,
      groundY: gy !== null ? gy : (c.y + 16),
      collected: alreadySaved,
      permanentlySaved: alreadySaved,
      collectedThisRun: false
    };
  });

  lavaWalls = level.lavaWalls || [];
  geysers = level.geysers || [];
  checkpoints = (level.checkpoints || []).map(cp => ({
    ...cp,
    active: savedCp ? (cp.id <= savedCp.id) : false
  }));
  npcs = level.npcs || [];

  omniMen = (level.omniMen || []).map(om => ({
    ...om,
    dir: 1,
    hp: om.hp || 5,
    maxHp: om.maxHp || 5,
    baseY: om.baseY || om.y,
    groundY: om.groundY || (om.y + 70),
    bossState: 'patrol',
    stateTimer: 2.0,
    attackCycle: 0,
    isEnraged: false,
    hitTimer: 0,
    timer: om.throwInterval * 0.7,
    facingRight: false
  }));
  magmaRocks = [];

  magmaCrawlers = (level.magmaCrawlers || []).map(mc => ({
    ...mc,
    dir: 1
  }));

  fireBats = (level.fireBats || []).map((fb, i) => ({
    ...fb,
    baseY: fb.baseY !== undefined ? fb.baseY : fb.y,
    dir: 1,
    phase: i * 1.4
  }));

  lavaHoppers = (level.lavaHoppers || []).map((lh, i) => ({
    ...lh,
    dir: i % 2 === 0 ? 1 : -1,
    vx: 0,
    vy: 0,
    inAir: false,
    hopTimer: 0.55 + (i % 3) * 0.35
  }));

  flameWisps = (level.flameWisps || []).map(fw => ({
    ...fw,
    x: fw.centerX + Math.cos(fw.angle || 0) * fw.radius - 7,
    y: fw.centerY + Math.sin(fw.angle || 0) * fw.radius - 7
  }));

  obsidianBrutes = (level.obsidianBrutes || []).map(ob => ({
    ...ob,
    dir: 1,
    hp: ob.hp || 2,
    maxHp: ob.maxHp || 2,
    hitTimer: 0
  }));

  magmaWorms = (level.magmaWorms || []).map(mw => ({
    ...mw,
    y: mw.baseY
  }));

  droppedLilies = [];

  if (level.homelander && level.homelander.active) {
    homelander = {
      ...level.homelander,
      x: (level.homelander.minX + level.homelander.maxX) / 2,
      vx: 0,
      dir: 1,
      phase: 'patrol',
      timer: 1.6,
      burstStep: 1
    };
  } else {
    homelander = null;
  }

  // Puzzle de Secuencia de Botones de Colores (Nivel 1 - Plaza de Homelander)
  colorPads = (level.colorPads || []).map(p => ({
    ...p,
    activated: false,
    playerOverlapping: false,
    wrongFlash: 0
  }));
  homelanderPuzzle = {
    active: colorPads.length > 0,
    solved: false,
    sequence: level.colorSequence ? [...level.colorSequence] : [0, 1, 2, 3, 4],
    currentIndex: 0,
    wrongTimer: 0
  };

  grassBlades = [];
  if (level.theme !== 'volcano') {
    for (const p of level.platforms) {
      for (let gx = p.x + 6; gx < p.x + p.w - 6; gx += 10) {
        grassBlades.push({ x: gx, y: p.y, h: 3 + (gx % 3), bend: 0 });
      }
    }
  }

  particles = [];
  afterimages = [];
  floatingTexts = [];
  scorchMarks = [];
  exitPortal = null;
  nearbyNpc = null;
  if (typeof resetEarthquakePrelude === 'function') {
    resetEarthquakePrelude();
  }
  if (typeof initShovelAbility === 'function') {
    initShovelAbility();
  }
  if (typeof initYetiBoss === 'function') {
    initYetiBoss();
  }
  if (typeof initAstralBoss === 'function') {
    initAstralBoss();
  }
  if (typeof initIcePickAbility === 'function') {
    initIcePickAbility();
  }

  cameraX = Math.max(0, Math.min(level.worldWidth - W, player.x - W * 0.35));
  cameraY = Math.max(0, Math.min(level.worldHeight - H, player.y - H * 0.6));

  if (savedCp) {
    spawnFloatingText(player.x - 18, player.y - 12, `📍 ${savedCp.name}`, '#00f5d4');
  }
}

