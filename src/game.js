// ============================================================================
// EL GRAN ESCAPE DE ELIZABETH - MOTOR PRINCIPAL
// ARCHIVO GENERADO AUTOMATICAMENTE DESDE src/ (core, entities, render, scenes, ui)
// Para modificar el juego, edita directamente los archivos modulares en sus carpetas.
// ============================================================================


// --- MODULO: src/core/config.js ---
// ============================================================================
// MOTOR PRINCIPAL: "EL GRAN ESCAPE DE ELIZABETH" (NIVELES 1-2, CASA, PORTAL Y TIENDA)
// ============================================================================

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const W = 480;  // Resolución lógica base 16:9
const H = 270;

let renderScale = 2; // Factor de resolución interna HD para nitidez absoluta

function updateCanvasResolution() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  const rect = canvas.getBoundingClientRect();
  const displayW = rect.width > 0 ? rect.width : (window.innerWidth || 960);
  // Escala entera óptima (2x, 3x o 4x) para sincronización con pantallas 1080p/1440p
  const idealScale = Math.max(2, Math.min(4, Math.round((displayW * dpr) / W)));
  if (renderScale !== idealScale || canvas.width !== W * idealScale || canvas.height !== H * idealScale) {
    renderScale = idealScale;
    canvas.width = W * renderScale;
    canvas.height = H * renderScale;
    ctx.imageSmoothingEnabled = false;
  }
}

updateCanvasResolution();
window.addEventListener('resize', updateCanvasResolution);
window.addEventListener('orientationchange', updateCanvasResolution);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    updateCanvasResolution();
  });
}

// Tipografía retro nítida para UI (Prioriza Press Start 2P sólida y de alto contraste)
const UI_FONT = '"Press Start 2P", "Silkscreen", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

// Estados globales:
// 'TITLE' | 'SHOP' | 'PLAYING' | 'DIALOGUE' | 'PORTAL_OUT' | 'SAFE_HOUSE' | 'VICTORY' | 'GAMEOVER'
let gameState = 'TITLE';
let currentLevelIndex = 0;
let level = null;
let globalFrame = 0;

window.setGameState = function(st) { gameState = st; };
window.getGameState = function() { return gameState; };


// Progreso persistente (Quesos, Flores/Lirios, Árbol de Evolución, Skins, Checkpoints e Hijos)
let saveState = {
  bankCheeses: 0,          // Reiniciado a 0 para testear recolección de quesos
  collectedCheeseIds: {},  // Vacío para que todos los quesos del juego aparezcan activos
  dexterLilies: 500,       // Lirios de prueba para el vestidor de skins
  activeCheckpoints: {},   // Checkpoints limpios
  rescuedBabies: [],       // Hijos sin rescatar para probar flujo completo
  upgrades: {
    extraHeart1: false,
    cheeseMagnet: false,
    fastDash: false,
    featherFall: false,
    longerInvuln: false,
    flowerHarvest: false,
    extraHeart2: false
  },
  unlockedSkins: ['classic', 'sakura', 'noir', 'mage', 'steampunk', 'empress'],
  equippedSkin: 'classic'
};

// Limpiar almacenamiento persistente previo según pedido del usuario
try {
  localStorage.removeItem('eliza_save_v2');
  localStorage.removeItem('eliza_save');
} catch (e) {}

// Sincronizar saveState global en memoria (sin persistencia en localStorage para testing)
window.saveState = saveState;
let previousShopState = 'TITLE';

function persistSave() {
  window.saveState = saveState;
  // Guardado en disco desactivado temporalmente para permitir testear los quesos
}

// Controles (Teclado + Táctil Multitouch + Mandos / Gamepads)
const keys = {
  left: false,
  right: false,
  down: false,
  downJustPressed: false,
  jumpPressed: false,
  jumpJustPressed: false,
  dashJustPressed: false
};

const keyboardState = { left: false, right: false, down: false, jump: false };
const touchState = { left: false, right: false, down: false, jump: false };
const gamepadMovement = { left: false, right: false, down: false, jump: false };

let gamepadConnected = false;
let gamepadName = '';
let prevGamepadButtons = [];
let selectedMenuIndex = 0;
let menuNavCooldown = 0;
let gamepadToast = null;

// Vibración táctil háptica en el mando (Xbox, PlayStation, etc.)
function rumbleGamepad(duration = 140, weak = 0.4, strong = 0.6) {
  if (!navigator.getGamepads) return;
  try {
    const pads = navigator.getGamepads();
    for (let i = 0; i < pads.length; i++) {
      const p = pads[i];
      if (p && p.vibrationActuator && typeof p.vibrationActuator.playEffect === 'function') {
        p.vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: duration,
          weakMagnitude: weak,
          strongMagnitude: strong
        }).catch(() => {});
      }
    }
  } catch (e) {}
}

function cleanGamepadName(rawId) {
  if (!rawId) return 'Mando Genérico';
  if (/xbox/i.test(rawId)) return 'Mando Xbox';
  if (/playstation|dualshock|dualsense|054c/i.test(rawId)) return 'Mando PlayStation';
  if (/nintendo|switch|joy-con|057e/i.test(rawId)) return 'Mando Nintendo Switch';
  const clean = rawId.split('(')[0].trim();
  return clean.length > 22 ? clean.slice(0, 22) + '...' : clean;
}

function showGamepadToast(text) {
  gamepadToast = { text, timer: 3.5 };
}

function updateGamepadToast(dt) {
  if (gamepadToast) {
    gamepadToast.timer -= dt;
    if (gamepadToast.timer <= 0) gamepadToast = null;
  }
}

function drawGamepadToast() {
  if (!gamepadToast) return;
  const alpha = Math.min(1, gamepadToast.timer * 2.5);
  ctx.save();
  ctx.globalAlpha = alpha;
  const tw = Math.max(160, gamepadToast.text.length * 6.5 + 24);
  const tx = Math.round(W / 2 - tw / 2);
  const ty = 8;
  drawRoundedPanel(tx, ty, tw, 20, 8, 'rgba(14, 20, 36, 0.95)', '#00f5d4', 1.5);
  ctx.fillStyle = '#00f5d4';
  ctx.font = 'bold 8px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(gamepadToast.text, W / 2, ty + 13);
  ctx.textAlign = 'left';
  ctx.restore();
}

function drawGamepadHUDPrompt() {
  // Desactivado para mantener la pantalla 100% limpia sin banners que tapen el juego
  return;
}

// Entidades del nivel activo
let player = null;
let homelander = null;
let omniMen = [];
let bossFightActive = false;
let magmaRocks = [];
let magmaCrawlers = [];
let fireBats = [];
let lavaHoppers = [];
let flameWisps = [];
let obsidianBrutes = [];
let magmaWorms = [];
let droppedLilies = [];
let geysers = [];
let cheeses = [];
let checkpoints = [];
let npcs = [];
let lavaWalls = [];
let particles = [];
let afterimages = [];
let floatingTexts = [];
let scorchMarks = [];
let grassBlades = [];
let colorPads = [];
let homelanderPuzzle = {
  active: false,
  solved: false,
  sequence: [0, 1, 2, 3, 4],
  currentIndex: 0,
  wrongTimer: 0
};

// Cámara 2D fluida a 144 FPS (Subpíxel físico y amortiguación sin judder)
let cameraX = 0;
let cameraY = 0;
let cameraLookAheadX = 0;
let shakeTime = 0;
let shakeMagnitude = 0;
let score = 0;

// Portales y Escena de la Casa-Refugio
let exitPortal = null;
let houseState = {
  mamaX: 90,
  mamaY: 196,
  phase: 'greeting',
  timer: 0,
  portalX: 395,
  portalY: 185,
  unlockedAbilityText: ''
};

// Estado de diálogos (Hijos Ratones y NPCs)
let activeDialogueList = [];
let dialogueIndex = 0;
let dialogueCharIndex = 0;
let dialogueTimer = 0;
let dialogueMode = 'BABY';
let nearbyNpc = null;
let activeNpc = null;

// Configuración Maestra de los 8 Mundos (Estética unificada: Negro, Blanco y Rosado Oscuro)
const WORLDS_CONFIG = [
  {
    idx: 0,
    name: 'MUNDO 1',
    title: 'JARDÍN DE LIRIOS',
    sub: 'Jardín Lirios',
    desc: 'Tierras florecidas protegidas por cerezos ancestrales y pozas sagradas.',
    objective: 'Rescata al 1er Hijo Ratón y recolecta los 5 quesos sagrados.',
    x: 70, y: 72,
    color: '#b31b52',
    ring: '#ff75a0',
    unlocked: true
  },
  {
    idx: 1,
    name: 'MUNDO 2',
    title: 'CALDERA DEL VOLCÁN',
    sub: 'Caldera Magma',
    desc: 'Ríos de lava viva, cavernas de basalto y los altos hornos del castillo.',
    objective: 'Cruza el río de magma, esquiva la forja y enfrenta a Omni-Man.',
    x: 164, y: 64,
    color: '#d92568',
    ring: '#ff8fab',
    unlocked: true
  },
  {
    idx: 2,
    name: 'MUNDO 3',
    title: 'CIUDAD COSTERA & TSUNAMI',
    sub: 'Ciudad Costera',
    desc: 'Metrópolis moderna y gran malecón frente a un mar de olas gigantescas.',
    objective: 'Avanza por las avenidas, esquiva el tráfico veloz y llega al mirador de la costa.',
    x: 258, y: 74,
    color: '#8f143c',
    ring: '#ff75a0',
    unlocked: true
  },
  {
    idx: 3,
    name: 'MUNDO 4',
    title: 'EL MONTE EVEREST',
    sub: 'Monte Everest',
    desc: 'Escalada extrema a la cima más alta del mundo estilo Celeste. Ventiscas heladas y túneles en la nieve.',
    objective: 'Cava túneles bajo la nieve con la pala, esquiva las ventiscas heladas y rescata a tu 4to Hijo Ratón.',
    x: 352, y: 64,
    color: '#00b4d8',
    ring: '#caf0f8',
    unlocked: true
  },
  {
    idx: 4,
    name: 'MUNDO 5',
    title: 'CUMBRE NEVADA Y TEMPLO DEL VIENTO',
    sub: 'Cumbre Nevada',
    desc: 'Picos escarpados azotados por ventiscas heladas, hielo resbaladizo y estalagmitas.',
    objective: 'Enciende los braseros sagrados de la cima y rescata al 5to Hijo Ratón.',
    x: 446, y: 74,
    color: '#a01a50',
    ring: '#ff9ebb',
    unlocked: false
  },
  {
    idx: 5,
    name: 'MUNDO 6',
    title: 'SELVA PRIMORDIAL Y CAÑÓN DE ÁMBAR',
    sub: 'Selva Ámbar',
    desc: 'Junglas impenetrables con lianas colgantes, hongos elásticos y ríos de ámbar.',
    objective: 'Asciende por el dosel viviente de árboles gigantes y salva al 6to Hijo Ratón.',
    x: 540, y: 64,
    color: '#b31b52',
    ring: '#ff75a0',
    unlocked: false
  },
  {
    idx: 6,
    name: 'MUNDO 7',
    title: 'FORTALEZA CÓSMICA DE GRAVEDAD',
    sub: 'Fortaleza Grav.',
    desc: 'Plataformas gravitacionales inversas y distorsiones del espacio-tiempo.',
    objective: 'Supera el laberinto antigravitatorio orbital y recupera al 7mo Hijo Ratón.',
    x: 634, y: 74,
    color: '#c2185b',
    ring: '#ff8fab',
    unlocked: false
  },
  {
    idx: 7,
    name: 'MUNDO 8',
    title: 'NÚCLEO DEL CAOS Y TRONO DEL VACÍO',
    sub: 'Trono del Caos',
    desc: 'El vórtice del Vacío Eterno. El enfrentamiento culminante por la salvación total.',
    objective: 'BATALLA FINAL: Desata el poder de los 7 hijos y derrota la Oscuridad Suprema.',
    x: 728, y: 64,
    color: '#e62b75',
    ring: '#ffffff',
    unlocked: false
  }
];

// Botones clickeables en el Menú Principal, Mapa de Mundos, Tienda y HUD

// ============================================================================
// UTILIDADES MATEMÁTICAS Y COLISIÓN
// ============================================================================
function rectOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}


// --- MODULO: src/ui/helpers.js ---
// ============================================================================
// UTILIDADES VISUALES ESTILO STEVEN UNIVERSE (PANELES REDONDEADOS, ESTRELLAS Y WARP PAD)
// ============================================================================
function drawRoundedPanel(x, y, w, h, r, fill, stroke, lineW = 2) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineW;
    ctx.stroke();
  }
}

// Dibuja una cuña de queso 3D en pixel art (reemplazo sin emojis)
function drawPixelCheeseIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px, py + 1, 11, 9);
  ctx.fillStyle = '#ffe169';
  ctx.fillRect(px + 1, py + 2, 9, 3);
  ctx.fillStyle = '#fca311';
  ctx.fillRect(px + 1, py + 5, 9, 4);
  ctx.fillStyle = '#d48b00';
  ctx.fillRect(px + 2, py + 6, 2, 2);
  ctx.fillRect(px + 7, py + 7, 2, 1);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 2, py + 2, 2, 1);
}

// Dibuja un bolso de boutique de skins en pixel art (reemplazo de emoji de tienda)
function drawPixelShopIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 3, py, 4, 1);
  ctx.fillRect(px + 2, py + 1, 1, 2);
  ctx.fillRect(px + 7, py + 1, 1, 2);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px, py + 3, 10, 8);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(px + 1, py + 4, 8, 6);
  ctx.fillStyle = '#ff758f';
  ctx.fillRect(px + 2, py + 4, 6, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 6, 2, 2);
}

// Dibuja un lirio sagrado en pixel art (reemplazo de emoji de flor)
function drawPixelLilyIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px + 1, py, 8, 9);
  ctx.fillStyle = '#ff758f';
  ctx.fillRect(px + 3, py + 1, 4, 3);
  ctx.fillRect(px + 2, py + 3, 6, 4);
  ctx.fillStyle = '#ffcad4';
  ctx.fillRect(px + 4, py + 2, 2, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 3, 2, 1);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(px + 3, py + 7, 4, 2);
}

// Dibuja un ratoncito en pixel art (reemplazo de emoji de ratón)
function drawPixelBabyMouseIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  ctx.fillStyle = '#ff8fab';
  ctx.fillRect(px + 1, py, 2, 2);
  ctx.fillRect(px + 7, py, 2, 2);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px + 2, py + 2, 6, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 3, py + 3, 4, 4);
  ctx.fillStyle = '#ff0054';
  ctx.fillRect(px + 4, py + 5, 2, 1);
}

// Dibuja un candado dorado en pixel art (reemplazo de emoji de candado)
function drawPixelLockIcon(ctx, x, y) {
  const px = Math.round(x);
  const py = Math.round(y);
  // Arco del candado
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 2, py - 4, 4, 1);
  ctx.fillRect(px - 3, py - 3, 2, 3);
  ctx.fillRect(px + 1, py - 3, 2, 3);
  // Cuerpo del candado
  ctx.fillStyle = '#100618';
  ctx.fillRect(px - 4, py - 1, 8, 7);
  ctx.fillStyle = '#ff9e00';
  ctx.fillRect(px - 3, py, 6, 5);
  ctx.fillStyle = '#100618';
  ctx.fillRect(px - 1, py + 1, 2, 2);
}

function drawCrystalWarpPad(cx, cy, radiusX, radiusY, glowColor) {
  // Haz de luz ascendente del Warp Pad estilo Steven Universe (Rosado y Blanco)
  const grad = ctx.createLinearGradient(cx, cy - 55, cx, cy);
  grad.addColorStop(0, 'rgba(217, 37, 104, 0)');
  grad.addColorStop(1, glowColor || 'rgba(217, 37, 104, 0.28)');
  ctx.fillStyle = grad;
  ctx.fillRect(cx - radiusX + 4, cy - 55, (radiusX - 4) * 2, 55);

  // Base octogonal/elíptica de obsidiana y cuarzo rosa oscuro
  ctx.fillStyle = '#0f0412';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 5, radiusX + 4, radiusY + 3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#6e1034';
  ctx.beginPath();
  ctx.ellipse(cx, cy, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#b31b52';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 1, radiusX * 0.72, radiusY * 0.68, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(cx, cy - 1, radiusX * 0.72, radiusY * 0.68, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Estrella central tallada en el Warp Pad
  drawSparkleStar(cx, cy - 1, 5, '#ffffff');
}


function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}



// --- MODULO: src/render/fx.js ---
// ============================================================================
// EFECTOS VISUALES, PARTÍCULAS, SOMBRAS Y POLVO ESTILO CHIKI'S CHASE
// ============================================================================
// ============================================================================
// SOMBRAS DINÁMICAS, PARTÍCULAS Y JUICE ESTILO CHIKI'S CHASE
// ============================================================================
function drawDropShadow(ctx, cx, cy, rx, ry, alpha = 0.28) {
  ctx.save();
  ctx.fillStyle = `rgba(10, 5, 22, ${alpha})`;
  ctx.beginPath();
  ctx.ellipse(Math.round(cx), Math.round(cy), Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function getGroundYUnder(x, startY, maxCheck = 120) {
  if (!level || !level.platforms) return null;
  let groundY = startY + maxCheck;
  let found = false;
  for (let i = 0; i < level.platforms.length; i++) {
    const p = level.platforms[i];
    if (x >= p.x && x <= p.x + p.w && p.y >= startY - 3 && p.y < groundY) {
      groundY = p.y;
      found = true;
    }
  }
  return found ? groundY : null;
}

function drawSparkleStar(arg1, arg2, arg3, arg4, arg5) {
  let c = ctx;
  let cx = arg1, cy = arg2, size = arg3, color = arg4 || '#ffd166';
  if (arg1 && typeof arg1.save === 'function') {
    c = arg1;
    cx = arg2;
    cy = arg3;
    size = arg4;
    color = arg5 || '#ffd166';
  }
  c.save();
  c.fillStyle = color;
  c.beginPath();
  c.moveTo(cx, cy - size);
  c.lineTo(cx + size * 0.32, cy - size * 0.32);
  c.lineTo(cx + size, cy);
  c.lineTo(cx + size * 0.32, cy + size * 0.32);
  c.lineTo(cx, cy + size);
  c.lineTo(cx - size * 0.32, cy + size * 0.32);
  c.lineTo(cx - size, cy);
  c.lineTo(cx - size * 0.32, cy - size * 0.32);
  c.closePath();
  c.fill();
  c.fillStyle = '#ffffff';
  c.fillRect(cx - 0.75, cy - 0.75, 1.5, 1.5);
  c.restore();
}

function getBiomeDustColor(playerX) {
  if (level && level.theme === 'volcano') {
    return Math.random() > 0.5 ? '#ff9e00' : '#ff5400';
  }
  if (playerX < 1800) {
    return Math.random() > 0.4 ? '#ffb3c1' : '#ffe5ec'; // Pétalos suaves de cerezo
  } else if (playerX < 3670) {
    return Math.random() > 0.4 ? '#bbf2f6' : '#d8f3dc'; // Brisa botánica de loto
  } else {
    return Math.random() > 0.4 ? '#fde4cf' : '#ffd166'; // Polvo áureo y mármol real
  }
}

function spawnDustPuff(x, y, count, color, baseVx = 0) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.random() - 0.5) * 1.3 - Math.PI / 2;
    const spd = 16 + Math.random() * 32;
    const life = 0.22 + Math.random() * 0.16;
    particles.push({
      x: x + (Math.random() - 0.5) * 4,
      y: y - 1,
      vx: baseVx + Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd * 0.4 - 12,
      gravity: -10, // Flota hacia arriba sutilmente como humo/polvillo
      color: color || '#ffccd5',
      size: 2.2 + Math.random() * 1.6,
      life,
      maxLife: life,
      isDust: true
    });
  }
}

function spawnStarSparkles(x, y, count, color = '#ffd166') {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const spd = 36 + Math.random() * 50;
    const life = 0.32 + Math.random() * 0.22;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - 14,
      gravity: 70,
      color,
      size: 3 + Math.random() * 2,
      life,
      maxLife: life,
      isStar: true
    });
  }
}

function spawnParticles(x, y, count, color, speed = 60, gravity = 120) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spd = (0.3 + Math.random() * 0.7) * speed;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * spd,
      vy: Math.sin(angle) * spd - 20,
      gravity,
      color,
      size: Math.random() > 0.4 ? 2 : 3,
      life: 0.25 + Math.random() * 0.35
    });
  }
}

function spawnFloatingText(x, y, text, color = '#ffd166') {
  // Sin textos intrusivos en el gameplay
  return;
}

function triggerShake(duration, magnitude) {
  shakeTime = duration;
  shakeMagnitude = magnitude;
}


function updateEffects(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += p.gravity * dt;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }

  for (let i = afterimages.length - 1; i >= 0; i--) {
    afterimages[i].alpha -= dt * 2.4;
    if (afterimages[i].alpha <= 0) afterimages.splice(i, 1);
  }

  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y -= 20 * dt;
    ft.life -= dt;
    if (ft.life <= 0) floatingTexts.splice(i, 1);
  }

  for (let i = scorchMarks.length - 1; i >= 0; i--) {
    scorchMarks[i].life -= dt;
    if (scorchMarks[i].life <= 0) scorchMarks.splice(i, 1);
  }
}


// ============================================================================
// PARTÍCULAS ATMOSFÉRICAS FLOTANTES POR FASE (SAKURA, LOTO, ROSAS)
// ============================================================================
function drawDriftingSakuraPetals() {
  if (!level || level.theme === 'volcano') return;
  if (cameraX > 1860 && player.x > 1860) return;

  for (const sp of sakuraPetals) {
    const sx = (sp.x + globalFrame * sp.speedX + Math.sin(globalFrame * sp.swingSpeed + sp.phase) * 16) % 1820;
    const sy = (sp.y + globalFrame * sp.speedY) % 230 + 10;

    if (sx < cameraX - 20 || sx > cameraX + W + 20) continue;

    // Desvanecimiento suave sobre el río antes del muelle de la Fase 2
    const fade = Math.max(0, Math.min(1, (1820 - sx) / 180));
    if (fade <= 0) continue;

    ctx.save();
    ctx.fillStyle = sp.color;
    ctx.globalAlpha = (0.8 + Math.sin(globalFrame * 0.06 + sp.phase) * 0.2) * fade;
    const angle = Math.sin(globalFrame * sp.swingSpeed * 0.9 + sp.phase) * 0.6;
    ctx.translate(Math.round(sx), Math.round(sy));
    ctx.rotate(angle);
    ctx.fillRect(-sp.size, -1, sp.size * 2, sp.size);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-1, -1, 1, 1);
    ctx.restore();
  }
}

// 🦋 Esporas bioluminiscentes y luciérnagas acuáticas de la Fase 2 del Mundo 1 (X: 1800 -> 3670)
const lotusSpores = Array.from({ length: 46 }, (_, i) => ({
  x: 1800 + (i * 41) % 1870,
  y: 30 + (i * 29) % 210,
  speedX: 0.15 + (i % 3) * 0.08,
  speedY: -0.22 - (i % 4) * 0.05, // Ascienden suavemente desde el agua
  pulseSpeed: 0.06 + (i % 5) * 0.015,
  phase: i * 0.75,
  size: (i % 3 === 0) ? 2 : 1.5,
  color: (i % 4 === 0) ? '#00f5d4' : ((i % 4 === 1) ? '#48cae4' : ((i % 4 === 2) ? '#95d5b2' : '#ffd166'))
}));

function drawDriftingLotusSpores() {
  if (!level || level.theme === 'volcano') return;
  if (cameraX < 1700 || cameraX > 3700) return;

  for (const ls of lotusSpores) {
    const lx = 1800 + ((ls.x - 1800 + globalFrame * ls.speedX + Math.sin(globalFrame * 0.04 + ls.phase) * 12) % 1870 + 1870) % 1870;
    const ly = ((ls.y + globalFrame * ls.speedY) % 230 + 230) % 230 + 15;

    if (lx < cameraX - 20 || lx > cameraX + W + 20) continue;

    ctx.save();
    ctx.fillStyle = ls.color;
    const pulse = 0.65 + Math.sin(globalFrame * ls.pulseSpeed + ls.phase) * 0.35;
    ctx.globalAlpha = pulse;
    ctx.fillRect(Math.round(lx), Math.round(ly), ls.size, ls.size);
    if (ls.size >= 2) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(lx), Math.round(ly), 1, 1);
    }
    ctx.restore();
  }
}

// 🌹 Pétalos de rosas reales flotando en la brisa de la Fase 3 del Mundo 1 (X: 3670 -> 5600)
const rosePetals = Array.from({ length: 48 }, (_, i) => ({
  x: 3670 + (i * 39) % 1900,
  y: 20 + (i * 29) % 200,
  speedX: 0.35 + (i % 4) * 0.15,
  speedY: 0.18 + (i % 3) * 0.12,
  swingSpeed: 0.04 + (i % 5) * 0.015,
  phase: i * 0.9,
  size: (i % 3 === 0) ? 3 : 2,
  color: (i % 4 === 0) ? '#ff4d6d' : ((i % 4 === 1) ? '#ff758f' : ((i % 4 === 2) ? '#ffb3c1' : '#c9184a'))
}));

function drawDriftingRosePetals() {
  if (!level || level.theme === 'volcano') return;
  if (cameraX < 3600) return;

  for (const rp of rosePetals) {
    const rx = 3670 + ((rp.x - 3670 - globalFrame * rp.speedX + Math.sin(globalFrame * rp.swingSpeed + rp.phase) * 14) % 1900 + 1900) % 1900;
    const ry = (rp.y + globalFrame * rp.speedY) % 230 + 15;

    if (rx < cameraX - 20 || rx > cameraX + W + 20) continue;

    ctx.save();
    ctx.fillStyle = rp.color;
    ctx.globalAlpha = 0.75 + Math.sin(globalFrame * 0.05 + rp.phase) * 0.2;
    const angle = Math.sin(globalFrame * rp.swingSpeed * 0.8 + rp.phase) * 0.5;
    ctx.translate(Math.round(rx), Math.round(ry));
    ctx.rotate(angle);
    ctx.fillRect(-rp.size, -1, rp.size * 2, rp.size);
    ctx.fillStyle = '#fff0f3';
    ctx.fillRect(-1, -1, 1, 1);
    ctx.restore();
  }
}




// --- MODULO: src/render/parallax_megatsunami.js ---
// ============================================================================
// FONDO PARALLAX DEL MEGATSUNAMI Y VÓRTICE SÍSMICO (MUNDO 3 - FASE 5)
// ============================================================================
// Atmósfera de catástrofe oceánica:
// 1. Cielo de tempestad abisal con gradientes de tormenta y viento huracanado
// 2. Destellos estroboscópicos de relámpagos con rayos bifurcados
// 3. Nubes oscuras de tormenta rodando velozmente
// 4. Siluetas colosales de megatsunamis en el horizonte
// 5. Rascacielos costeros inundados y balizas rojas de auxilio
// 6. Ráfagas de lluvia y bruma marina en suspensión

function drawMegatsunamiParallax(ctx, camX, frame) {
  // 1. Cielo de tempestad marina
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#03071e');      // Negro tormentoso abisal
  grad.addColorStop(0.35, '#0a1128');   // Azul medianoche tempestuoso
  grad.addColorStop(0.70, '#1c2541');   // Gris azulado de vórtice
  grad.addColorStop(1, '#3a506b');      // Horizonte brumoso del oleaje
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 2. Relámpagos estroboscópicos atmosféricos
  const lightningCycle = frame % 150;
  const isLightning = (lightningCycle === 0 || lightningCycle === 2 || lightningCycle === 5 || (frame % 280 === 10));
  if (isLightning) {
    // Resplandor de cielo iluminado por el rayo
    ctx.fillStyle = 'rgba(202, 240, 248, 0.42)';
    ctx.fillRect(0, 0, W, H);

    // Bifurcación del relámpago pixel art en el horizonte
    const lX = Math.round(((camX * 0.15 + 180) % (W - 80)) + 40);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(lX, 0, 3, 22);
    ctx.fillRect(lX - 4, 20, 6, 18);
    ctx.fillRect(lX + 1, 36, 4, 20);
    ctx.fillRect(lX - 6, 54, 8, 22);
    ctx.fillRect(lX - 2, 74, 5, 24);
    // Ramal secundario
    ctx.fillRect(lX + 3, 42, 10, 3);
    ctx.fillRect(lX + 12, 44, 4, 16);
  }

  // 3. Nubes de tormenta bajas rodando a gran velocidad por el vendaval
  const stormCloudSpeed = frame * 0.48;
  for (let ci = 0; ci < 8; ci++) {
    const cx = ((ci * 95 + 20 - stormCloudSpeed) % (W + 160) + (W + 160)) % (W + 160) - 80;
    const cy = 12 + (ci % 3) * 16;
    const cw = 54 + (ci % 2) * 22;

    // Sombra oscura inferior de la nube
    ctx.fillStyle = isLightning ? 'rgba(40, 60, 90, 0.85)' : 'rgba(10, 15, 25, 0.88)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, Math.floor(cw / 2), 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Núcleo de tormenta azul petróleo
    ctx.fillStyle = isLightning ? '#caf0f8' : '#1c2541';
    ctx.beginPath();
    ctx.ellipse(cx, cy, Math.floor(cw / 2), 9, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 9, cy - 2, Math.floor(cw / 3), 8, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 1, Math.floor(cw / 3.5), 7, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Siluetas colosales de olas lejanas del Megatsunami en el horizonte
  const waveOff = ((Math.round(camX * 0.05) % 400) + 400) % 400;
  for (let wi = -1; wi < 5; wi++) {
    const wx = wi * 120 - waveOff;
    const surgeH = 46 + Math.sin(frame * 0.06 + wi * 1.5) * 6;
    const wy = H - 68 - surgeH;

    // Gran lomo de la ola lejana
    ctx.fillStyle = '#0a1128';
    ctx.beginPath();
    ctx.moveTo(wx, H - 68);
    ctx.quadraticCurveTo(wx + 60, wy, wx + 130, H - 68);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#03045e';
    ctx.beginPath();
    ctx.moveTo(wx + 10, H - 68);
    ctx.quadraticCurveTo(wx + 65, wy + 5, wx + 120, H - 68);
    ctx.closePath();
    ctx.fill();

    // Cresta espumosa de la ola colosal
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(wx + 45, wy, 35, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx + 52, wy - 2, 22, 2);
  }

  // 5. Rascacielos costeros semisumergidos e inclinados en la lejanía
  const skyOff = ((Math.round(camX * 0.08) % 360) + 360) % 360;
  for (let i = -1; i < 7; i++) {
    const bx = i * 65 - skyOff;
    const bh = 55 + ((i * 37) % 38);
    const tilt = (i % 2 === 0) ? -2 : 3;

    // Silueta de torre inundada en penumbra
    ctx.fillStyle = '#0d1b2a';
    ctx.fillRect(bx + tilt, H - 68 - bh, 46, bh + 68);
    ctx.fillStyle = '#1b263b';
    ctx.fillRect(bx + tilt + 2, H - 68 - bh + 2, 42, bh + 66);

    // Ventanas a oscuras y pocas con luces de emergencia rojas
    for (let wy = H - 64 - bh + 6; wy < H - 76; wy += 12) {
      for (let wx = bx + tilt + 6; wx < bx + tilt + 40; wx += 10) {
        if (((wx * 7 + wy * 13) % 7) === 0) {
          ctx.fillStyle = '#e63946'; // Luz de emergencia
          ctx.fillRect(wx, wy, 3, 3);
        } else {
          ctx.fillStyle = '#0a1128'; // Cristal apagado
          ctx.fillRect(wx, wy, 4, 4);
        }
      }
    }

    // Baliza de aviación en la cúspide con destello rojo intermitente
    const beaconFlash = (Math.floor(frame * 0.14 + i) % 2 === 0);
    ctx.fillStyle = '#495057';
    ctx.fillRect(bx + tilt + 22, H - 68 - bh - 10, 2, 10);
    ctx.fillStyle = beaconFlash ? '#ff0054' : '#590d22';
    ctx.fillRect(bx + tilt + 21, H - 68 - bh - 12, 4, 3);
  }

  // 6. Horizonte marino agitado con oleaje oscuro y espuma
  const oceanGrad = ctx.createLinearGradient(0, H - 68, 0, H);
  oceanGrad.addColorStop(0, '#001233');
  oceanGrad.addColorStop(0.35, '#001845');
  oceanGrad.addColorStop(0.70, '#023e8a');
  oceanGrad.addColorStop(1, '#03045e');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, H - 68, W, 68);

  // Espuma rompiente en el horizonte distante
  for (let ox = 0; ox < W; ox += 14) {
    const foamY = H - 68 + Math.round(Math.sin(frame * 0.1 + ox * 0.08) * 3);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(ox, foamY, 14, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ox + 2, foamY - 1, 9, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ox + 4, foamY - 2, 5, 1);
  }

  // 7. Ráfagas de viento y bruma marina horizontal en suspensión (Squalls)
  const squallSpeed = frame * 4.5;
  for (let si = 0; si < 9; si++) {
    const sx = ((si * 85 - squallSpeed) % (W + 120) + (W + 120)) % (W + 120) - 60;
    const sy = 35 + (si * 21) % (H - 80);
    ctx.fillStyle = 'rgba(202, 240, 248, 0.28)';
    ctx.fillRect(sx, sy, 36 + (si % 3) * 14, 1);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.fillRect(sx + 10, sy, 18, 1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawMegatsunamiParallax };
}


// --- MODULO: src/render/parallax_pretsunami.js ---
// ============================================================================
// FONDO PARALLAX PRE-TSUNAMI: CIUDAD COSTERA AL ANOCHECER TORMENTOSO (FASE 4)
// ============================================================================
// Atmósfera de tensión previa a la catástrofe (X: 11800 -> 14400):
// 1. Cielo crepuscular violeta-índigo con resplandor ámbar en el horizonte
// 2. Nubes cumulonimbus de tormenta aglomerándose en la lejanía sobre el mar
// 3. Océano retirado hacia el horizonte, dejando al descubierto arrecifes y bancos de arena
// 4. Siluetas de rascacielos lejanos con ventanales iluminados y balizas de alarma rojas
// 5. Destellos intermitentes de relámpagos distantes en la línea de la tempestad

function drawPreTsunamiSky(ctx, camX, frame) {
  // 1. Gradiente del cielo pre-catástrofe (Violeta oscuro a ámbar amenazante)
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0a0d24');      // Índigo noche cerrado
  grad.addColorStop(0.38, '#1d1135');   // Violeta oscuro tempestuoso
  grad.addColorStop(0.68, '#3d1245');   // Púrpura de marea
  grad.addColorStop(0.88, '#6a1b4d');   // Carmesí crepuscular
  grad.addColorStop(1, '#d94e28');      // Filo ámbar-fuego en el horizonte del mar
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 2. Relámpagos lejanos en la línea del frente de tormenta
  const isLightning = (frame % 220 < 4) || (frame % 380 === 15);
  if (isLightning) {
    ctx.fillStyle = 'rgba(230, 210, 255, 0.28)';
    ctx.fillRect(0, 0, W, H);
  }

  // 3. Estrellas y planetas tempranos brillando entre las brumas altas
  for (let s = 0; s < 24; s++) {
    const sx = ((s * 59 - Math.round(camX * 0.04)) % W + W) % W;
    const sy = 12 + (s * 19) % 65;
    const twinkle = (frame + s * 9) % 36 < 18;
    ctx.fillStyle = twinkle ? '#ffffff' : '#ffd166';
    ctx.fillRect(sx, sy, 1, 1);
  }

  // 4. Silueta del gran frente de nubes oscuras de tormenta (Cumulonimbus)
  const cloudSpeed = frame * 0.22;
  for (let ci = 0; ci < 6; ci++) {
    const cx = ((ci * 110 + 30 - cloudSpeed) % (W + 160) + (W + 160)) % (W + 160) - 80;
    const cy = 28 + (ci % 3) * 12;
    const cw = 60 + (ci % 2) * 26;

    ctx.fillStyle = isLightning ? 'rgba(75, 45, 95, 0.85)' : 'rgba(20, 10, 30, 0.82)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, Math.floor(cw / 2), 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isLightning ? '#b388ff' : '#2b1b3d';
    ctx.beginPath();
    ctx.ellipse(cx, cy, Math.floor(cw / 2), 10, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 8, cy - 3, Math.floor(cw / 3), 9, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 10, cy - 2, Math.floor(cw / 3.5), 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Océano retirado hacia el horizonte (Calma tensa antes de la ola)
  const seaY = H - 52;
  const seaGrad = ctx.createLinearGradient(0, seaY, 0, H);
  seaGrad.addColorStop(0, '#001233');
  seaGrad.addColorStop(0.4, '#03045e');
  seaGrad.addColorStop(1, '#023e8a');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, seaY, W, 18);

  // Cresta oscura de la gran masa de agua que se agrupa mar adentro
  ctx.fillStyle = '#010b19';
  ctx.fillRect(0, seaY, W, 2);

  // Arrecifes y lecho marino expuesto por la bajamar extrema
  ctx.fillStyle = '#1e1b18';
  ctx.fillRect(0, seaY + 16, W, H - (seaY + 16));
  ctx.fillStyle = '#2b2622';
  for (let bx = 0; bx < W; bx += 28) {
    ctx.fillRect(bx, seaY + 14, 18, 4);
    ctx.fillStyle = '#4a4036';
    ctx.fillRect(bx + 4, seaY + 13, 8, 2);
  }

  // 6. Rascacielos lejanos de la ciudad costera con ventanales encendidos
  const bldgOffset = Math.round(camX * 0.08);
  for (let bi = 0; bi < 10; bi++) {
    const bx = ((bi * 68 + 14 - bldgOffset) % (W + 80) + (W + 80)) % (W + 80) - 40;
    const bh = 54 + (bi % 4) * 16;
    const by = seaY + 14 - bh;
    const bw = 24 + (bi % 3) * 6;

    // Cuerpo del rascacielos
    ctx.fillStyle = '#110d1f';
    ctx.fillRect(bx, by, bw, bh);

    // Borde de recorte
    ctx.fillStyle = '#1e1735';
    ctx.fillRect(bx, by, bw, 2);

    // Ventanales iluminados en tono ámbar y cian
    for (let wy = by + 6; wy < by + bh - 6; wy += 8) {
      for (let wx = bx + 3; wx < bx + bw - 4; wx += 6) {
        if ((bi + wx + wy) % 3 === 0) {
          ctx.fillStyle = (bi % 2 === 0) ? '#ffd166' : '#90e0ef';
          ctx.fillRect(wx, wy, 3, 4);
        }
      }
    }

    // Baliza roja de aviación parpadeante en la cúspide
    const isBeacon = Math.floor(frame * 0.08 + bi) % 2 === 0;
    ctx.fillStyle = '#495057';
    ctx.fillRect(bx + Math.floor(bw / 2) - 1, by - 6, 2, 6);
    ctx.fillStyle = isBeacon ? '#ff0054' : '#4a0e17';
    ctx.fillRect(bx + Math.floor(bw / 2) - 2, by - 8, 4, 3);
    if (isBeacon) {
      ctx.fillStyle = 'rgba(255, 0, 84, 0.45)';
      ctx.fillRect(bx + Math.floor(bw / 2) - 4, by - 10, 8, 7);
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawPreTsunamiSky };
}


// --- MODULO: src/render/parallax_everest.js ---
// ============================================================================
// FONDO PARALLAX MUNDO 4: EL MONTE EVEREST Y LAS CUMBRES HELADAS (CELESTE STYLE)
// ============================================================================
// 1. Cielo alpino helado con degradado ártico y suave resplandor de alpenglow
// 2. Silueta colosal del Monte Everest en la lejanía con picos nevados y glaciares
// 3. Cordillera media de picos escarpados de pizarra y abetos alpinos
// 4. Copos de nieve flotando suavemente en la atmósfera

function drawEverestParallax(ctx, camX, frame) {
  // 0. Si la cámara está en el Valle Oculto de Shambhala (Mundo 4 - Fase 7: X 29400 -> 33100)
  if (camX >= 29300 && camX <= 33150) {
    drawShambhalaParallax(ctx, camX, frame);
    return;
  }

  // 1. Degradado del cielo ártico alpino
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#0b132b');      // Azul medianoche polar
  grad.addColorStop(0.42, '#1c2541');   // Índigo de alta montaña
  grad.addColorStop(0.72, '#3a506b');   // Azul pizarra frío
  grad.addColorStop(0.88, '#6c757d');   // Bruma de glaciares
  grad.addColorStop(1, '#f1c0e8');      // Alpenglow rosado suave en el horizonte
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 2. Luna plateada tenue de alta montaña
  const moonX = Math.round(W * 0.78);
  const moonY = 38;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.arc(moonX, moonY, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(moonX, moonY, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0b132b';
  ctx.beginPath();
  ctx.arc(moonX + 4, moonY - 2, 9, 0, Math.PI * 2);
  ctx.fill();

  // 3. Picos lejanos del Monte Everest (Capa muy distante, Parallax 0.04)
  const farOffset = Math.round(camX * 0.04);
  const peaks = [
    { x: 30, h: 140, w: 120 },
    { x: 140, h: 175, w: 150 }, // Pico Everest principal
    { x: 280, h: 130, w: 110 },
    { x: 380, h: 155, w: 130 }
  ];

  for (let p of peaks) {
    const px = ((p.x - farOffset) % (W + 160) + (W + 160)) % (W + 160) - 80;
    const py = H - p.h;

    // Cuerpo rocoso oscuro del pico
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(px, H);
    ctx.lineTo(px + Math.floor(p.w / 2), py);
    ctx.lineTo(px + p.w, H);
    ctx.closePath();
    ctx.fill();

    // Cumbre de nieve perpetua blanca
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(px + Math.floor(p.w * 0.35), py + Math.floor(p.h * 0.35));
    ctx.lineTo(px + Math.floor(p.w / 2), py);
    ctx.lineTo(px + Math.floor(p.w * 0.65), py + Math.floor(p.h * 0.35));
    ctx.lineTo(px + Math.floor(p.w * 0.52), py + Math.floor(p.h * 0.28));
    ctx.closePath();
    ctx.fill();

    // Sombra azulada del glaciar
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(px + Math.floor(p.w / 2) - 1, py, 2, Math.floor(p.h * 0.32));
  }

  // 4. Cordillera intermedia de bosques alpinos y riscos nevados (Parallax 0.12)
  const midOffset = Math.round(camX * 0.12);
  ctx.fillStyle = '#0f172a';
  for (let mi = 0; mi < 10; mi++) {
    const mx = ((mi * 65 - midOffset) % (W + 80) + (W + 80)) % (W + 80) - 40;
    const mh = 50 + (mi % 3) * 16;
    const my = H - mh;

    // Silueta de pino alpino nevado
    ctx.beginPath();
    ctx.moveTo(mx, H);
    ctx.lineTo(mx + 16, my);
    ctx.lineTo(mx + 32, H);
    ctx.closePath();
    ctx.fill();

    // Nieve en las ramas
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(mx + 10, my + 8, 12, 3);
    ctx.fillRect(mx + 6, my + 20, 20, 3);
    ctx.fillStyle = '#0f172a';
  }

  // 5. Copos de nieve flotantes cayendo suavemente
  for (let f = 0; f < 30; f++) {
    const fx = ((f * 33 - frame * 0.5 - camX * 0.2) % W + W) % W;
    const fy = (f * 17 + frame * 0.6) % H;
    const size = f % 3 === 0 ? 2 : 1;
    ctx.fillStyle = f % 2 === 0 ? '#ffffff' : '#caf0f8';
    ctx.fillRect(fx, fy, size, size);
  }
}

// ============================================================================
// PARALLAX MUNDO 4 - FASE 7: EL REINO OCULTO DE SHAMBHALA (VALLE CELESTIAL)
// ============================================================================
function drawShambhalaParallax(ctx, camX, frame) {
  // 1. Degradado del amanecer sagrado de Shambhala (Amatista, Carmesí, Ámbar y Oro)
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#150d2a');      // Púrpura cósmico superior
  grad.addColorStop(0.32, '#351848');   // Amatista de las altas cumbres
  grad.addColorStop(0.58, '#782655');   // Rosa magenta cálido
  grad.addColorStop(0.78, '#c75643');   // Ámbar dorado místico
  grad.addColorStop(0.92, '#f59e0b');   // Resplandor de oro puro
  grad.addColorStop(1, '#fef08a');      // Bruma dorada termal del valle
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 2. Sol Sagrado del Loto / Corona Solar Radiante
  const sunX = Math.round(W * 0.74);
  const sunY = 52;
  const haloGlow = Math.sin(frame * 0.05) * 5 + 34;

  const sunGrad = ctx.createRadialGradient(sunX, sunY, 3, sunX, sunY, haloGlow);
  sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
  sunGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.55)');
  sunGrad.addColorStop(0.75, 'rgba(217, 70, 239, 0.22)');
  sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, haloGlow, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(sunX, sunY, 13, 0, Math.PI * 2);
  ctx.fill();

  // Rayos solares sutiles
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.18)';
  ctx.lineWidth = 1.5;
  for (let r = 0; r < 8; r++) {
    const ang = r * Math.PI / 4 + frame * 0.005;
    ctx.beginPath();
    ctx.moveTo(sunX + Math.cos(ang) * 16, sunY + Math.sin(ang) * 16);
    ctx.lineTo(sunX + Math.cos(ang) * (haloGlow + 12), sunY + Math.sin(ang) * (haloGlow + 12));
    ctx.stroke();
  }

  // 3. Picos Celestiales Lejanos de Shambhala (Parallax 0.04)
  const farOffset = Math.round(camX * 0.04);
  const peaks = [
    { x: 20, h: 145, w: 130 },
    { x: 135, h: 180, w: 160 }, // Pico Supremo de Shambhala
    { x: 275, h: 135, w: 120 },
    { x: 380, h: 160, w: 140 }
  ];

  for (let p of peaks) {
    const px = ((p.x - farOffset) % (W + 160) + (W + 160)) % (W + 160) - 80;
    const py = H - p.h;

    // Silueta púrpura de montaña sagrada
    ctx.fillStyle = '#2c1236';
    ctx.beginPath();
    ctx.moveTo(px, H);
    ctx.lineTo(px + Math.floor(p.w / 2), py);
    ctx.lineTo(px + p.w, H);
    ctx.closePath();
    ctx.fill();

    // Cumbre de nieve dorada iluminada por el sol
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(px + Math.floor(p.w * 0.35), py + Math.floor(p.h * 0.35));
    ctx.lineTo(px + Math.floor(p.w / 2), py);
    ctx.lineTo(px + Math.floor(p.w * 0.65), py + Math.floor(p.h * 0.35));
    ctx.lineTo(px + Math.floor(p.w * 0.52), py + Math.floor(p.h * 0.28));
    ctx.closePath();
    ctx.fill();

    // Arista iluminada de cuarzo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + Math.floor(p.w / 2) - 1, py, 2, Math.floor(p.h * 0.28));
  }

  // 4. Cordillera Intermedia: Pagodas Doradas y Chortens Tibetanos en la niebla (Parallax 0.10)
  const midOffset = Math.round(camX * 0.10);
  for (let mi = 0; mi < 8; mi++) {
    const mx = ((mi * 85 - midOffset) % (W + 120) + (W + 120)) % (W + 120) - 60;
    const mh = 55 + (mi % 3) * 18;
    const my = H - mh;

    // Colina rocosa redondeada de jade y basalto
    ctx.fillStyle = '#45163e';
    ctx.beginPath();
    ctx.arc(mx + 30, H + 10, 48, Math.PI, Math.PI * 2);
    ctx.fill();

    // Silueta de Pagoda Dorada lejana
    if (mi % 2 === 0) {
      const pagX = mx + 24;
      const pagY = my + 8;
      ctx.fillStyle = '#661b47';
      ctx.fillRect(pagX - 6, pagY, 12, 16);
      // Tejadillo alado dorado
      ctx.fillStyle = '#d97706';
      ctx.fillRect(pagX - 10, pagY - 2, 20, 3);
      ctx.fillRect(pagX - 7, pagY - 8, 14, 6);
      ctx.fillRect(pagX - 11, pagY - 10, 22, 2);
      // Pináculo
      ctx.fillStyle = '#fde047';
      ctx.fillRect(pagX - 1, pagY - 16, 2, 6);
      // Ventana iluminada
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(pagX - 2, pagY + 4, 4, 5);
    }
  }

  // 5. Esporas de Loto y Partículas Doradas que ascienden en la atmósfera sagrada
  for (let s = 0; s < 36; s++) {
    const sx = ((s * 41 + frame * 0.4 + Math.sin(frame * 0.03 + s) * 14 - camX * 0.14) % W + W) % W;
    const sy = ((s * 23 - frame * 0.35) % H + H) % H;
    const glow = Math.sin(frame * 0.12 + s) * 0.3 + 0.7;
    ctx.fillStyle = (s % 3 === 0)
      ? 'rgba(56, 189, 248, ' + glow.toFixed(2) + ')'
      : 'rgba(254, 240, 138, ' + glow.toFixed(2) + ')';
    const sz = (s % 5 === 0) ? 2 : 1;
    ctx.fillRect(sx, sy, sz, sz);
  }

  // 6. Bruma termal cálida del fondo
  const mistGrad = ctx.createLinearGradient(0, H - 34, 0, H);
  mistGrad.addColorStop(0, 'rgba(254, 240, 138, 0)');
  mistGrad.addColorStop(0.5, 'rgba(103, 232, 249, 0.12)');
  mistGrad.addColorStop(1, 'rgba(254, 240, 138, 0.28)');
  ctx.fillStyle = mistGrad;
  ctx.fillRect(0, H - 34, W, 34);
}

if (typeof module !== 'undefined') {
  module.exports = { drawEverestParallax, drawShambhalaParallax };
}


// --- MODULO: src/render/parallax.js ---
// ============================================================================
// FONDO DINÁMICO Y RENDERIZADO DEL JARDÍN BOTÁNICO (MUNDO 1) Y VOLCÁN (MUNDO 2)
// ============================================================================
let parallaxCache = null;

function initParallaxCache() {
  const tileW = 640;

  // 🌸 0. Capa Lejana 100% SAKURA (Fase 1: Bosque Sagrado de Cerezos y Pagodas Nocturnas)
  const sakuraFarCanvas = document.createElement('canvas');
  sakuraFarCanvas.width = tileW;
  sakuraFarCanvas.height = H;
  const sfctx = sakuraFarCanvas.getContext('2d');

  sfctx.fillStyle = '#1e0926';
  sfctx.fillRect(0, H - 72, tileW, 72);

  for (let i = 0; i < 8; i++) {
    const gx = i * 80;
    const hillH = 62 + ((i * 29) % 4) * 12;
    const gy = H - hillH;
    sfctx.fillStyle = '#260c30';
    sfctx.fillRect(gx - 12, gy + 14, 98, hillH - 14);
    sfctx.fillStyle = '#32103e';
    sfctx.fillRect(gx + 4, gy, 72, hillH);

    if (i % 2 === 1) {
      const pagX = gx + 38;
      const pagY = gy - 16;
      sfctx.fillStyle = '#15061c';
      sfctx.fillRect(pagX - 10, pagY, 20, 26);
      sfctx.fillStyle = '#42144e';
      sfctx.fillRect(pagX - 16, pagY + 6, 32, 3);
      sfctx.fillRect(pagX - 14, pagY - 4, 28, 3);
      sfctx.fillRect(pagX - 11, pagY - 14, 22, 3);
      sfctx.fillStyle = '#ffd166';
      sfctx.fillRect(pagX - 1, pagY - 24, 2, 10);
      sfctx.fillStyle = 'rgba(255, 209, 102, 0.45)';
      sfctx.fillRect(pagX - 3, pagY + 12, 6, 5);
    } else {
      sfctx.fillStyle = '#3a1145';
      sfctx.beginPath();
      sfctx.ellipse(gx + 36, gy - 20, 26, 16, 0, 0, Math.PI * 2);
      sfctx.fill();
      sfctx.fillStyle = 'rgba(255, 143, 171, 0.45)';
      sfctx.beginPath();
      sfctx.ellipse(gx + 34, gy - 24, 20, 11, 0, 0, Math.PI * 2);
      sfctx.fill();
      sfctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      sfctx.fillRect(gx + 26, gy - 26, 8, 3);
    }
  }

  // 🌸 Capa Media 100% SAKURA (Cerezos en flor, toriis y faroles de papel tradicionales)
  const sakuraMidCanvas = document.createElement('canvas');
  sakuraMidCanvas.width = tileW;
  sakuraMidCanvas.height = H;
  const smctx = sakuraMidCanvas.getContext('2d');

  smctx.fillStyle = '#230b2c';
  smctx.fillRect(0, H - 38, tileW, 38);

  for (let i = 0; i < 12; i++) {
    const hx = i * 54;
    const hh = 32 + ((i * 19) % 3) * 12;
    const hy = H - hh - 12;

    smctx.fillStyle = '#200826';
    smctx.fillRect(hx + 20, hy + 4, 8, hh + 8);
    smctx.fillRect(hx + 8, hy - 4, 16, 4);
    smctx.fillRect(hx + 24, hy - 2, 16, 4);

    smctx.fillStyle = '#4c1256';
    smctx.beginPath();
    smctx.ellipse(hx + 24, hy - 14, 22, 14, 0, 0, Math.PI * 2);
    smctx.fill();

    smctx.fillStyle = '#7a1f68';
    smctx.beginPath();
    smctx.ellipse(hx + 23, hy - 16, 18, 11, 0, 0, Math.PI * 2);
    smctx.fill();

    smctx.fillStyle = '#ff758f';
    smctx.beginPath();
    smctx.ellipse(hx + 21, hy - 19, 13, 8, 0, 0, Math.PI * 2);
    smctx.fill();

    smctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    smctx.fillRect(hx + 17, hy - 22, 6, 3);

    if (i % 2 === 0) {
      smctx.fillStyle = '#15061c';
      smctx.fillRect(hx + 10, hy, 1, 6);
      smctx.fillStyle = '#e63946';
      smctx.fillRect(hx + 8, hy + 6, 5, 6);
      smctx.fillStyle = '#ffd166';
      smctx.fillRect(hx + 9, hy + 7, 3, 4);
    }
  }

  // 1. Capa Lejana del Jardín Botánico (Colinas suaves, grandes árboles antiguos y cúpulas de invernadero lejanas, CERO rascacielos)
  const gardenFarCanvas = document.createElement('canvas');
  gardenFarCanvas.width = tileW;
  gardenFarCanvas.height = H;
  const gfctx = gardenFarCanvas.getContext('2d');

  // Colinas botánicas onduladas al fondo
  gfctx.fillStyle = '#0f2421';
  gfctx.fillRect(0, H - 68, tileW, 68);

  for (let i = 0; i < 8; i++) {
    const gx = i * 80;
    const hillH = 58 + ((i * 23) % 3) * 14;
    const gy = H - hillH;
    // Silueta redondeada de colina y arboleda lejana
    gfctx.fillStyle = '#112a26';
    gfctx.fillRect(gx - 10, gy + 12, 96, hillH - 12);
    gfctx.fillRect(gx + 6, gy, 68, hillH);

    if (i % 3 === 1) {
      // Cúpula lejana de Invernadero Real iluminada suavemente
      gfctx.fillStyle = '#163832';
      gfctx.fillRect(gx + 14, gy - 26, 52, 26);
      gfctx.fillRect(gx + 22, gy - 34, 36, 8);
      gfctx.fillStyle = 'rgba(144, 224, 239, 0.18)';
      gfctx.fillRect(gx + 18, gy - 22, 10, 18);
      gfctx.fillRect(gx + 34, gy - 22, 10, 18);
      gfctx.fillRect(gx + 50, gy - 22, 8, 18);
    } else {
      // Copa frondosa de gran sauce / cerezo ancestral en la lejanía
      gfctx.fillStyle = '#14332d';
      gfctx.fillRect(gx + 28, gy - 28, 10, 28);
      gfctx.fillStyle = '#193f36';
      gfctx.fillRect(gx + 8, gy - 48, 50, 24);
      gfctx.fillRect(gx + 16, gy - 56, 34, 10);
      // Destellos de flores nocturnas en las copas lejanas
      gfctx.fillStyle = i % 2 === 0 ? 'rgba(255, 143, 171, 0.35)' : 'rgba(149, 213, 178, 0.35)';
      gfctx.fillRect(gx + 18, gy - 44, 6, 4);
      gfctx.fillRect(gx + 38, gy - 40, 6, 4);
    }
  }

  // 2. Capa Media del Jardín Botánico (Setos florales, celosías de jardín y arbustos de lirios)
  const gardenMidCanvas = document.createElement('canvas');
  gardenMidCanvas.width = tileW;
  gardenMidCanvas.height = H;
  const gmctx = gardenMidCanvas.getContext('2d');

  gmctx.fillStyle = '#16362c';
  gmctx.fillRect(0, H - 36, tileW, 36);

  for (let i = 0; i < 16; i++) {
    const hx = i * 40;
    const hh = 26 + ((i * 17) % 3) * 9;
    const hy = H - hh - 14;
    // Seto botánico escalonado
    gmctx.fillStyle = '#16362c';
    gmctx.fillRect(hx, hy, 42, hh + 14);
    gmctx.fillStyle = '#1e4638';
    gmctx.fillRect(hx + 4, hy - 8, 34, 12);
    // Flores silvestres y celosías cada ciertos tramos
    gmctx.fillStyle = i % 3 === 0 ? '#ff8fab' : (i % 3 === 1 ? '#95d5b2' : '#ffd166');
    gmctx.fillRect(hx + 10, hy - 4, 3, 3);
    gmctx.fillRect(hx + 24, hy - 2, 3, 3);
  }

  // Capas pre-renderizadas del Volcán (Bóvedas cavernosas orgánicas estilo Hollow Knight)
  const volcanoFarCanvas = document.createElement('canvas');
  volcanoFarCanvas.width = tileW;
  volcanoFarCanvas.height = H;
  const vfctx = volcanoFarCanvas.getContext('2d');

  for (let i = 0; i < 10; i++) {
    const bx = i * 64;
    const peakH = 85 + ((i * 37) % 5) * 18;
    const by = H - peakH;
    vfctx.fillStyle = '#1e0813';
    vfctx.fillRect(bx - 12, by + 28, 88, peakH - 28);
    vfctx.fillRect(bx, by + 14, 64, peakH - 14);
    vfctx.fillRect(bx + 14, by, 36, peakH);

    if (i % 3 === 0) {
      vfctx.fillStyle = '#280b19';
      vfctx.fillRect(bx + 18, by - 32, 6, 32);
      vfctx.fillRect(bx + 40, by - 32, 6, 32);
      vfctx.fillRect(bx + 14, by - 36, 36, 6);
    }
  }

  const volcanoMidCanvas = document.createElement('canvas');
  volcanoMidCanvas.width = tileW;
  volcanoMidCanvas.height = H;
  const vmctx = volcanoMidCanvas.getContext('2d');

  for (let i = 0; i < 20; i++) {
    const sx = i * 32;
    const sh = 14 + ((i * 23) % 5) * 8;
    vmctx.fillStyle = '#14050c';
    vmctx.fillRect(sx, 0, 28, Math.floor(sh * 0.45));
    vmctx.fillRect(sx + 5, Math.floor(sh * 0.45), 18, Math.floor(sh * 0.35));
    vmctx.fillRect(sx + 10, Math.floor(sh * 0.8), 8, Math.floor(sh * 0.35));
    vmctx.fillRect(sx + 13, sh, 3, 6);

    if (i % 2 === 0) {
      const mh = 18 + ((i * 17) % 4) * 9;
      vmctx.fillStyle = '#17060e';
      ctx.fillRect(sx + 4, H - mh, 18, mh);
      ctx.fillRect(sx + 8, H - mh - 10, 10, 10);
      ctx.fillRect(sx + 11, H - mh - 16, 4, 6);
    }
  }

  // 3. Capas del Palacio Imperial y Terrazas de Rosas Reales (Fase 3 del Mundo 1)
  const royalFarCanvas = document.createElement('canvas');
  royalFarCanvas.width = tileW;
  royalFarCanvas.height = H;
  const rfctx = royalFarCanvas.getContext('2d');

  // Crestas montañosas en violeta nocturno aterciopelado
  rfctx.fillStyle = '#180826';
  rfctx.fillRect(0, H - 75, tileW, 75);

  // Siluetas del Palacio Real de los Lirios (Cúpulas, agujas y ventanales góticos iluminados)
  for (let i = 0; i < 4; i++) {
    const px = i * 160;
    // Cúpula central
    rfctx.fillStyle = '#1c0c2e';
    rfctx.beginPath();
    rfctx.arc(px + 80, H - 54, 46, Math.PI, 0, false);
    rfctx.fill();
    rfctx.fillRect(px + 36, H - 56, 88, 56);

    // Agujas del palacio
    const palSpires = [
      { x: px + 18, w: 14, h: 84, capH: 22 },
      { x: px + 48, w: 16, h: 108, capH: 26 },
      { x: px + 80, w: 22, h: 144, capH: 36 },
      { x: px + 112, w: 16, h: 108, capH: 26 },
      { x: px + 142, w: 14, h: 84, capH: 22 }
    ];

    for (const sp of palSpires) {
      rfctx.fillStyle = '#1c0c2e';
      rfctx.fillRect(sp.x - Math.floor(sp.w / 2), H - sp.h, sp.w, sp.h);
      rfctx.beginPath();
      rfctx.moveTo(sp.x - Math.floor(sp.w / 2) - 2, H - sp.h);
      rfctx.lineTo(sp.x, H - sp.h - sp.capH);
      rfctx.lineTo(sp.x + Math.floor(sp.w / 2) + 2, H - sp.h);
      rfctx.fill();

      // Remate dorado de flor de lis en la cúspide
      rfctx.fillStyle = 'rgba(255, 209, 102, 0.85)';
      rfctx.fillRect(sp.x - 1, H - sp.h - sp.capH - 5, 2, 5);
      rfctx.fillRect(sp.x - 3, H - sp.h - sp.capH - 3, 6, 2);

      // Ventanales ojivales iluminados con vidrieras carmesí y ámbar
      rfctx.fillStyle = 'rgba(255, 117, 143, 0.45)';
      rfctx.fillRect(sp.x - 2, H - sp.h + 16, 4, 14);
      rfctx.fillStyle = 'rgba(255, 209, 102, 0.4)';
      rfctx.fillRect(sp.x - 2, H - sp.h + 38, 4, 14);
    }

    // Gran Rosetón de vidriera en la cúpula
    rfctx.fillStyle = 'rgba(255, 77, 109, 0.65)';
    rfctx.beginPath();
    rfctx.arc(px + 80, H - 76, 14, 0, Math.PI * 2);
    rfctx.fill();
    rfctx.fillStyle = 'rgba(255, 209, 102, 0.85)';
    rfctx.beginPath();
    rfctx.arc(px + 80, H - 76, 6, 0, Math.PI * 2);
    rfctx.fill();
  }

  const royalMidCanvas = document.createElement('canvas');
  royalMidCanvas.width = tileW;
  royalMidCanvas.height = H;
  const rmctx = royalMidCanvas.getContext('2d');

  // Muro terraza y balaustradas de mármol del palacio en la distancia media
  rmctx.fillStyle = '#220f33';
  rmctx.fillRect(0, H - 42, tileW, 42);

  // Pasamanos y balaustres de mármol
  rmctx.fillStyle = '#140820';
  rmctx.fillRect(0, H - 42, tileW, 4);
  rmctx.fillRect(0, H - 26, tileW, 4);
  rmctx.fillStyle = '#d8e2dc';
  rmctx.fillRect(0, H - 41, tileW, 3);
  rmctx.fillRect(0, H - 25, tileW, 3);
  rmctx.fillStyle = '#ffffff';
  rmctx.fillRect(0, H - 41, tileW, 1);

  for (let bx = 6; bx < tileW - 6; bx += 8) {
    rmctx.fillStyle = '#140820';
    rmctx.fillRect(bx, H - 38, 3, 12);
    rmctx.fillStyle = '#e2eafc';
    rmctx.fillRect(bx + 1, H - 38, 2, 12);
  }

  // Copas de piedra con rosas y faroles en las columnas de la balaustrada
  for (let i = 0; i < 8; i++) {
    const ux = i * 80 + 36;
    rmctx.fillStyle = '#d8e2dc';
    rmctx.fillRect(ux - 4, H - 50, 10, 8);
    rmctx.fillStyle = '#2d6a4f';
    rmctx.fillRect(ux - 6, H - 56, 14, 6);
    rmctx.fillStyle = '#e63946';
    rmctx.fillRect(ux - 4, H - 58, 5, 4);
    rmctx.fillRect(ux + 1, H - 57, 5, 4);
    rmctx.fillStyle = '#ff8fab';
    rmctx.fillRect(ux - 2, H - 59, 4, 3);

    if (i % 2 === 1) {
      rmctx.fillStyle = '#ffd166';
      rmctx.fillRect(ux + 28, H - 54, 4, 12);
      rmctx.fillRect(ux + 26, H - 58, 8, 5);
      rmctx.fillStyle = '#ffffff';
      rmctx.fillRect(ux + 28, H - 57, 4, 3);
    }
  }

  // Capa de bruma y niebla violeta aterciopelada sobre la base
  const mistGrad = rmctx.createLinearGradient(0, H - 30, 0, H);
  mistGrad.addColorStop(0, 'rgba(44, 22, 59, 0)');
  mistGrad.addColorStop(1, 'rgba(44, 22, 59, 0.85)');
  rmctx.fillStyle = mistGrad;
  rmctx.fillRect(0, H - 30, tileW, 30);

  parallaxCache = { tileW, sakuraFarCanvas, sakuraMidCanvas, gardenFarCanvas, gardenMidCanvas, royalFarCanvas, royalMidCanvas, volcanoFarCanvas, volcanoMidCanvas };
}

function lerpColor(c1, c2, t) {
  const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

function drawParallaxBackground(theme) {
  if (!parallaxCache) initParallaxCache();

  if (theme === 'snow') {
    // MUNDO 4: EL MONTE EVEREST Y LAS CUMBRES HELADAS (CELESTE STYLE)
    if (typeof drawEverestParallax === 'function') {
      drawEverestParallax(ctx, cameraX, globalFrame);
      return;
    }
  }

  if (theme === 'space') {
    // MUNDO 4: EL ESPACIO, LA LUNA Y LAS ESTRELLAS
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#07020a');
    grad.addColorStop(0.65, '#120415');
    grad.addColorStop(1, '#3b0820');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Luna plateada luminosa con relieve y crateres
    const moonX = W - 90 - Math.round((cameraX * 0.02) % (W + 120));
    const moonY = 54;
    ctx.fillStyle = '#ffcad4';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffcad4';
    ctx.fillRect(moonX - 8, moonY - 6, 6, 4);
    ctx.fillRect(moonX + 4, moonY + 2, 8, 5);
    ctx.fillRect(moonX - 4, moonY + 8, 5, 3);

    // Polvo estelar y estrellas titilantes en 3 planos cosmicos
    for (let i = 0; i < 48; i++) {
      const starX = ((i * 47 - Math.round(cameraX * 0.06)) % W + W) % W;
      const starY = (i * 31) % (H - 40);
      const twinkle = (globalFrame + i * 7) % 30 < 15;
      ctx.fillStyle = twinkle ? '#ffffff' : (i % 3 === 0 ? '#ffd166' : '#ff2a70');
      ctx.fillRect(starX, starY, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
    }
    return;
  }

  if (theme === 'coastal' || theme === 'coastal_sunset') {
    // Si estamos en la azotea o en el megatsunami (Fase 4 Azotea o Fase 5)
    const isMegatsunamiZone = (cameraX >= 14400) ||
      (typeof player !== 'undefined' && player && player.x >= 14400) ||
      (level && level.phase === 5);

    if (isMegatsunamiZone && typeof drawMegatsunamiParallax === 'function') {
      drawMegatsunamiParallax(ctx, cameraX, globalFrame);
      return;
    }

    // Si estamos en Fase 4 Parte 1 o 2 (Avenida y Plaza Urbana Pre-Catástrofe, X: 11800 -> 14400)
    const isPreCatastropheZone = (cameraX >= 11800) ||
      (typeof player !== 'undefined' && player && player.x >= 11800);

    if (isPreCatastropheZone && typeof drawPreTsunamiSky === 'function') {
      drawPreTsunamiSky(ctx, cameraX, globalFrame);
      return;
    }

    // MUNDO 3: CIUDAD COSTERA, PLAYA Y MAR EN DÍA SOLEADO
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#1d8cf8');      // Azul cielo radiante
    grad.addColorStop(0.38, '#4ea8de');   // Azul tropical luminoso
    grad.addColorStop(0.70, '#90e0ef');   // Cyan suave playero
    grad.addColorStop(1, '#caf0f8');      // Horizonte brumoso soleado
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 1. Sol radiante de mediodía en lo alto del cielo
    const sunX = Math.round(W * 0.76);
    const sunY = 44;
    const sunR = 24;

    // Resplandor cálido exterior
    ctx.fillStyle = 'rgba(255, 243, 176, 0.22)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR + 26, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 230, 109, 0.38)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR + 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 214, 0.72)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR + 5, 0, Math.PI * 2);
    ctx.fill();

    // Disco del sol blanco brillante
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
    ctx.fill();

    // 2. Nubes blancas algodonadas de verano en suave deriva
    const cloudSpeed = globalFrame * 0.12;
    for (let ci = 0; ci < 6; ci++) {
      const cx = ((ci * 120 + 40 - cloudSpeed) % (W + 140) + (W + 140)) % (W + 140) - 70;
      const cy = 24 + (ci % 3) * 14;
      const cw = 42 + (ci % 2) * 16;
      // Sombra inferior de la nube en azul celeste
      ctx.fillStyle = 'rgba(180, 220, 245, 0.65)';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 3, Math.floor(cw / 2), 8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Núcleo blanco algodonado
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.floor(cw / 2), 7, 0, 0, Math.PI * 2);
      ctx.ellipse(cx - 7, cy - 2, Math.floor(cw / 3), 6, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + 8, cy - 1, Math.floor(cw / 3.5), 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Bandada de gaviotas blancas planeando en el cielo soleado
    const birdOff = ((Math.round(globalFrame * 0.32) % 450) + 450) % 450;
    for (let bi = 0; bi < 4; bi++) {
      const bx = Math.round((W + 50 - birdOff + bi * 20));
      const by = Math.round(36 + bi * 9 + Math.sin(globalFrame * 0.05 + bi) * 2.2);
      if (bx > 10 && bx < W - 10) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(bx, by, 1, 2);
        ctx.fillRect(bx - 2, by - 1, 2, 1);
        ctx.fillRect(bx + 1, by - 1, 2, 1);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(bx + 1, by, 1, 1); // Pico dorado
      }
    }

    // 4. Siluetas de la ciudad playera y rascacielos lejanos
    const skyOff = ((Math.round(cameraX * 0.08) % 360) + 360) % 360;
    for (let i = -1; i < 7; i++) {
      const bx = i * 65 - skyOff;
      const bh = 50 + ((i * 37) % 42);
      // Fachada de torre costera (marfil y azul náutico suave)
      ctx.fillStyle = (i % 2 === 0) ? '#d8eefe' : '#c3e2f5';
      ctx.fillRect(bx, H - 72 - bh, 52, bh + 72);
      // Perfil arquitectónico
      ctx.fillStyle = '#a0cbe6';
      ctx.fillRect(bx + 51, H - 72 - bh, 1, bh + 72);

      // Ventanales reflectantes en azul cielo
      for (let wy = H - 68 - bh + 6; wy < H - 78; wy += 11) {
        for (let wx = bx + 5; wx < bx + 46; wx += 9) {
          if (((wx * 11 + wy * 7) % 3) !== 0) {
            ctx.fillStyle = '#00b4d8';
            ctx.fillRect(wx, wy, 4, 4);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(wx + 1, wy + 1, 1, 1);
          }
        }
      }
      // Palmera decorativa en la terraza
      if (i % 3 === 0) {
        const px = bx + 16, py = H - 72 - bh;
        ctx.fillStyle = '#7f5539';
        ctx.fillRect(px, py - 8, 2, 8);
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(px - 5, py - 11, 12, 3);
        ctx.fillRect(px - 3, py - 9, 8, 3);
      }
    }

    // 5. Dunas doradas lejanas en la orilla de la costa
    const duneOff = ((Math.round(cameraX * 0.05) % 380) + 380) % 380;
    for (let di = -1; di < 5; di++) {
      const dx = di * 115 - duneOff;
      ctx.fillStyle = '#edd59e';
      ctx.beginPath();
      ctx.ellipse(dx + 55, H - 66, 75, 22, 0, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = '#dfbe79';
      ctx.beginPath();
      ctx.ellipse(dx + 55, H - 64, 68, 16, 0, Math.PI, 0);
      ctx.fill();
    }

    // 6. Mar y oleaje realista en el horizonte oceánico
    if (typeof drawRealisticOceanHorizon === 'function') {
      drawRealisticOceanHorizon(ctx, H - 68, 68, cameraX, globalFrame);
    } else {
      const seaGrad = ctx.createLinearGradient(0, H - 68, 0, H);
      seaGrad.addColorStop(0, '#0096c7');
      seaGrad.addColorStop(1, '#48cae4');
      ctx.fillStyle = seaGrad;
      ctx.fillRect(0, H - 68, W, 68);
    }
    return;
  }

  if (theme === 'volcano') {
    const altitudeRatio = level ? Math.max(0, Math.min(1, 1 - cameraY / Math.max(1, level.worldHeight - H))) : 0;
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    if (altitudeRatio > 0.72) {
      grad.addColorStop(0, '#0d0618');
      grad.addColorStop(0.55, '#2b0922');
      grad.addColorStop(1, '#7a0418');
    } else {
      grad.addColorStop(0, '#16050b');
      grad.addColorStop(0.6, '#340615');
      grad.addColorStop(1, '#6a040f');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const { tileW, volcanoFarCanvas, volcanoMidCanvas } = parallaxCache;
    const farOffset = ((Math.round(cameraX * 0.12 * renderScale) / renderScale) % tileW + tileW) % tileW;
    ctx.drawImage(volcanoFarCanvas, -farOffset, 0);
    ctx.drawImage(volcanoFarCanvas, tileW - farOffset, 0);

    const midOffset = ((Math.round(cameraX * 0.26 * renderScale) / renderScale) % tileW + tileW) % tileW;
    ctx.drawImage(volcanoMidCanvas, -midOffset, 0);
    ctx.drawImage(volcanoMidCanvas, tileW - midOffset, 0);

    const glowGrad = ctx.createLinearGradient(0, H - 45, 0, H);
    glowGrad.addColorStop(0, 'rgba(255, 84, 0, 0)');
    glowGrad.addColorStop(1, 'rgba(255, 84, 0, 0.28)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, H - 45, W, 45);
    return;
  }

  // Cielo Nocturno con Transición Continua Matemática entre Fases (CERO saltos bruscos)
  // Fase 1: Sakura Twilight (0 -> 1300)
  // Transición F1 -> F2: (1300 -> 1850)
  // Fase 2: Lotus Sapphire (1850 -> 3150)
  // Transición F2 -> F3: (3150 -> 3650)
  // Fase 3: Royal Rose/Marble (3650+)
  let topColor, midColor, botColor;

  if (cameraX < 1300) {
    topColor = '#0d061c';
    midColor = '#240c31';
    botColor = '#4a1542';
  } else if (cameraX < 1850) {
    const t = (cameraX - 1300) / 550;
    topColor = lerpColor('#0d061c', '#06101f', t);
    midColor = lerpColor('#240c31', '#0d253d', t);
    botColor = lerpColor('#4a1542', '#16425b', t);
  } else if (cameraX < 3150) {
    topColor = '#06101f';
    midColor = '#0d253d';
    botColor = '#16425b';
  } else if (cameraX < 3650) {
    const t = (cameraX - 3150) / 500;
    topColor = lerpColor('#06101f', '#12081c', t);
    midColor = lerpColor('#0d253d', '#241134', t);
    botColor = lerpColor('#16425b', '#3c1642', t);
  } else {
    topColor = '#12081c';
    midColor = '#241134';
    botColor = '#3c1642';
  }

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, topColor);
  grad.addColorStop(0.55, midColor);
  grad.addColorStop(1, botColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Luna llena celestial circular con resplandor suave y cráteres sutiles estilo Ghibli
  const moonX = Math.round(375 - cameraX * 0.025);
  const moonY = 32;
  const moonR = 14;

  // Resplandor suave de la luna sin crear gradientes radiales por frame
  ctx.fillStyle = 'rgba(255, 248, 220, 0.18)';
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR * 2.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 243, 204, 0.08)';
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR * 2.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fffdf0';
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
  ctx.fill();

  // Relieve de cráteres lunares sutiles
  ctx.fillStyle = '#faedcd';
  ctx.beginPath();
  ctx.arc(moonX - 4, moonY - 3, 3.5, 0, Math.PI * 2);
  ctx.arc(moonX + 3, moonY + 4, 4, 0, Math.PI * 2);
  ctx.arc(moonX - 2, moonY + 6, 2.5, 0, Math.PI * 2);
  ctx.fill();

  for (const s of bgStars) {
    const sx = ((s.x - cameraX * s.speed) % W + W) % W;
    const trans1to2Temp = Math.max(0, Math.min(1, (cameraX - 1300) / 550));
    const starColor = s.size === 2 ? '#ffd166' : lerpColor('#ffcad4', '#95d5b2', trans1to2Temp);
    ctx.fillStyle = starColor;
    ctx.fillRect(Math.round(sx * renderScale) / renderScale, s.y, s.size, s.size);
  }

  const { tileW, sakuraFarCanvas, sakuraMidCanvas, gardenFarCanvas, gardenMidCanvas, royalFarCanvas, royalMidCanvas } = parallaxCache;
  const trans1to2 = Math.max(0, Math.min(1, (cameraX - 1300) / 550));
  const royalRatio = Math.max(0, Math.min(1, (cameraX - 3250) / 450));

  // Capa Lejana (Far Layer) — Fondo Sólido Continuo (CERO horizonte transparente)
  const farOffset = ((Math.round(cameraX * 0.14 * renderScale) / renderScale) % tileW + tileW) % tileW;
  if (royalRatio < 1) {
    ctx.save();
    if (royalRatio > 0) ctx.globalAlpha = 1 - royalRatio;

    // Base sólida continua de colinas lejanas de Sakura
    if (sakuraFarCanvas) {
      ctx.drawImage(sakuraFarCanvas, -farOffset, 0);
      ctx.drawImage(sakuraFarCanvas, tileW - farOffset, 0);
    }

    // El horizonte del Estanque de Loto se funde suavemente sobre la base sin perder opacidad
    if (trans1to2 > 0 && gardenFarCanvas) {
      ctx.save();
      ctx.globalAlpha = trans1to2;
      ctx.drawImage(gardenFarCanvas, -farOffset, 0);
      ctx.drawImage(gardenFarCanvas, tileW - farOffset, 0);
      ctx.restore();
    }

    ctx.restore();
  }

  // Fondo Lejano del Gran Palacio Real de los Lirios (Fase 3: 100% Armonia Visual)
  if (royalRatio > 0 && royalFarCanvas) {
    ctx.save();
    ctx.globalAlpha = royalRatio;
    ctx.drawImage(royalFarCanvas, -farOffset, 0);
    ctx.drawImage(royalFarCanvas, tileW - farOffset, 0);
    ctx.restore();
  }

  // Capa Media (Mid Layer) — Transición Espacial Limpia entre Biomas (CERO fantasmas superpuestos)
  const midOffset = ((Math.round(cameraX * 0.28 * renderScale) / renderScale) % tileW + tileW) % tileW;
  if (royalRatio < 1) {
    ctx.save();
    if (royalRatio > 0) ctx.globalAlpha = 1 - royalRatio;

    if (trans1to2 <= 0) {
      // 100% Sakura
      if (sakuraMidCanvas) {
        ctx.drawImage(sakuraMidCanvas, -midOffset, 0);
        ctx.drawImage(sakuraMidCanvas, tileW - midOffset, 0);
      }
    } else if (trans1to2 >= 1) {
      // 100% Estanque de Loto
      if (gardenMidCanvas) {
        ctx.drawImage(gardenMidCanvas, -midOffset, 0);
        ctx.drawImage(gardenMidCanvas, tileW - midOffset, 0);
      }
    } else {
      // Transición espacial: Oeste (izquierda) Cerezos, Este (derecha) Lotos
      const splitX = Math.round(W * (1 - trans1to2));

      // Lado Oeste: Arboleda de Cerezos
      if (sakuraMidCanvas && splitX > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, splitX + 24, H);
        ctx.clip();
        ctx.drawImage(sakuraMidCanvas, -midOffset, 0);
        ctx.drawImage(sakuraMidCanvas, tileW - midOffset, 0);
        ctx.restore();
      }

      // Lado Este: Vegetación y Nenúfares del Estanque
      if (gardenMidCanvas && splitX < W) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(splitX - 24, 0, W - (splitX - 24), H);
        ctx.clip();
        ctx.drawImage(gardenMidCanvas, -midOffset, 0);
        ctx.drawImage(gardenMidCanvas, tileW - midOffset, 0);
        ctx.restore();
      }

      // Bruma suave del río en la confluencia entre ambos biomas
      const mistGrad = ctx.createLinearGradient(splitX - 30, 0, splitX + 30, 0);
      mistGrad.addColorStop(0, 'rgba(36, 12, 49, 0)');
      mistGrad.addColorStop(0.5, 'rgba(22, 50, 79, 0.45)');
      mistGrad.addColorStop(1, 'rgba(13, 37, 61, 0)');
      ctx.fillStyle = mistGrad;
      ctx.fillRect(splitX - 30, H - 60, 60, 60);
    }

    ctx.restore();
  }

  // Terrazas de Marmol y Rosales Reales en la Capa Media (Fase 3)
  if (royalRatio > 0 && royalMidCanvas) {
    ctx.save();
    ctx.globalAlpha = royalRatio;
    ctx.drawImage(royalMidCanvas, -midOffset, 0);
    ctx.drawImage(royalMidCanvas, tileW - midOffset, 0);
    ctx.restore();
  }
}

// --- MODULO: src/render/water_system.js ---
// ============================================================================
// SISTEMA REALISTA DE AGUA, OLAS Y MEGATSUNAMI (CANVAS 2D 16-BIT)
// ============================================================================
// Simulación hidrodinámica avanzada basada en ondas trocoidales y Gerstner
// con movimiento orbital, oleaje violento de gran masa, crestas empinadas,
// rompientes con espuma en cascada, cáusticas submarinas, estela de surf
// y spray pulverizado en suspensión.

// 1. CÁLCULO DE DESPLAZAMIENTO TROCOIDAL / GERSTNER MULTI-ARMÓNICO
function getOceanWaveDisplacement(worldX, time, intensity = 1.0) {
  // Armónico 1: Gran masa de marea y swell oceánico profundo
  const theta1 = worldX * 0.026 - time * 3.4;
  const cos1 = Math.cos(theta1);
  // Agudizamiento trocoidal: crestas afiladas y valles anchos
  const h1 = (cos1 > 0 ? Math.pow(cos1, 2.0) : -Math.pow(-cos1, 0.85)) * 9.5;

  // Armónico 2: Rompiente empinada que avanza rápido
  const theta2 = worldX * 0.065 - time * 5.6 + 1.1;
  const cos2 = Math.cos(theta2);
  const h2 = (cos2 > 0 ? Math.pow(cos2, 1.5) : -Math.pow(-cos2, 0.9)) * 5.2;

  // Armónico 3: Contrapicada turbulenta que rompe la regularidad
  const theta3 = worldX * 0.14 + time * 4.2;
  const h3 = Math.sin(theta3) * 2.8;

  // Armónico 4: Micro-ondas de viento y espuma picada
  const theta4 = worldX * 0.28 - time * 7.5;
  const h4 = Math.sin(theta4) * 1.4;

  return (h1 + h2 + h3 + h4) * intensity;
}

// 2. RENDERIZADO DE CUERPOS DE AGUA Y LAGUNAS DE SURF (PLATAFORMAS DE AGUA)
function drawRealisticWaterPlatform(ctx, p, frame) {
  const t = frame * 0.052;
  const step = 4; // Muestreo denso de 4px para curvas hiper-suaves a 60 FPS

  // Fondo base abisal o lecho marino
  const isDeepOcean = (p.isWater || p.subType === 'ocean_water' || p.x >= 15000);
  if (isDeepOcean) {
    ctx.fillStyle = '#001233';
    ctx.fillRect(p.x - 2, p.y + 6, p.w + 4, p.h);
  } else {
    // Lecho arenoso solo en la base inferior de charcos someros
    ctx.fillStyle = '#9c6644';
    ctx.fillRect(p.x, p.y + p.h - 8, p.w, 8);
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(p.x, p.y + p.h - 4, p.w, 4);
  }

  // Comprobar interacción del jugador con el agua
  const hasPlayer = (typeof player !== 'undefined' && player) &&
                    (player.x + player.w >= p.x - 12 && player.x <= p.x + p.w + 12);
  const playerSurfX = hasPlayer ? (player.x + player.w * 0.5) : -9999;
  const isSurfingSpeed = hasPlayer && player.isSurfing && Math.abs(player.vx) > 30;
  const isDashing = hasPlayer && player.dashTimer > 0;

  // Muestreo de la superficie con solape de 3px para costuras 100% invisibles
  const points = [];
  const startX = p.x - 2;
  const endX = p.x + p.w + 2;
  for (let wx = startX; wx <= endX; wx += step) {
    let waveDy = getOceanWaveDisplacement(wx, t, 1.0);

    // Interacción con la tabla de surf:
    // Arco de proa levantado hacia adelante + surco hidrodinámico profundo bajo la quilla
    if (hasPlayer) {
      const relX = wx - playerSurfX;
      const dist = Math.abs(relX);
      if (dist < 32) {
        const bowDir = player.facingRight ? 1 : -1;
        // La proa empuja agua hacia arriba formando la ola de proa
        if (relX * bowDir > 4 && relX * bowDir < 22) {
          waveDy -= (1 - Math.abs(relX * bowDir - 12) / 10) * 3.5;
        }
        // La popa y el peso hunden la superficie
        if (dist < 18) {
          waveDy += (1 - dist / 18) * (isDashing ? 6.5 : 4.5);
        }
      }
    }

    const sy = p.y + 3 + waveDy;
    points.push({ x: wx, y: sy, dy: waveDy });
  }

  // A. Gran masa de agua oceánica profunda (Gradiente abisal multicapa)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(startX, p.y + p.h + 2);
  ctx.lineTo(startX, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineTo(endX, p.y + p.h + 2);
  ctx.closePath();

  // Gradiente vertical oceánico profundo: luz turquesa superficial -> azul abisal
  const waterGrad = ctx.createLinearGradient(0, p.y - 12, 0, p.y + p.h);
  waterGrad.addColorStop(0, '#90e0ef');    // Luz solar incidiendo en crestas
  waterGrad.addColorStop(0.12, '#48cae4'); // Turquesa caribeño brillante
  waterGrad.addColorStop(0.32, '#00b4d8'); // Turquesa vivo profundo
  waterGrad.addColorStop(0.62, '#0077b6'); // Azul marino intenso
  waterGrad.addColorStop(0.88, '#023e8a'); // Azul océano profundo
  waterGrad.addColorStop(1, '#001845');    // Fondo abisal
  ctx.fillStyle = waterGrad;
  ctx.fill();

  // B. Cáusticas submarinas y redes de luz solar refractada
  ctx.clip(); // Limitar cáusticas al interior del agua
  ctx.fillStyle = 'rgba(202, 240, 248, 0.26)';
  for (let cx = p.x - 24; cx < p.x + p.w + 36; cx += 20) {
    const shift = Math.sin(t * 2.2 + cx * 0.12) * 8;
    ctx.beginPath();
    ctx.moveTo(cx + shift, p.y);
    ctx.lineTo(cx + shift + 14, p.y);
    ctx.lineTo(cx + shift + 4, p.y + p.h);
    ctx.lineTo(cx + shift - 10, p.y + p.h);
    ctx.closePath();
    ctx.fill();
  }

  // Vórtices y burbujas de aire atrapadas bajo el agua
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  for (let bx = p.x + 6; bx < p.x + p.w - 6; bx += 22) {
    const bubbleY = p.y + p.h - 4 - ((frame * 1.8 + bx * 9) % Math.max(12, p.h - 8));
    const bubbleWav = Math.sin(t * 2.5 + bx * 0.4) * 3;
    ctx.fillRect(bx + bubbleWav, bubbleY, 2, 2);
    if (bx % 44 === 0) {
      ctx.fillRect(bx + bubbleWav + 1, bubbleY - 4, 1, 1);
    }
  }
  ctx.restore();

  // C. Capa de volumen y sombra bajo las crestas (Efecto tridimensional)
  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    const isCrest = pt.dy < -2.0;       // Cresta levantada
    const isViolentPeak = pt.dy < -5.5; // Pico violento y espumoso

    // Sombra profunda bajo la masa de la cresta
    ctx.fillStyle = 'rgba(3, 4, 94, 0.65)';
    ctx.fillRect(pt.x, pt.y + 4, step, 4);

    // Manto translúcido de la ola
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(pt.x, pt.y + 1, step, 3);
    ctx.fillStyle = '#48cae4';
    ctx.fillRect(pt.x, pt.y, step, 2);

    // D. Rompiente espumosa violenta en las crestas (Whitecap / Foam Lip)
    if (isCrest) {
      // Espuma turquesa claro
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(pt.x, pt.y - 2, step, 4);

      // Labio de espuma blanca pura y espesa
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(pt.x, pt.y - 3, step, 3);

      // Espuma deslizándose en cascada hacia el valle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fillRect(pt.x + 1, pt.y + 2, step - 1, 3);

      // E. Salpicaduras violentas y gotas de spray en picos agudos
      if (isViolentPeak) {
        const sprayOff = ((frame * 2 + i * 7) % 5);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(pt.x + 1, pt.y - 6 - sprayOff, 2, 2);
        ctx.fillRect(pt.x + 3, pt.y - 4, 2, 2);
        ctx.fillStyle = '#caf0f8';
        ctx.fillRect(pt.x - 1, pt.y - 5, 2, 2);
      }
    } else {
      // Agua reflectante en los valles
      ctx.fillStyle = '#90e0ef';
      ctx.fillRect(pt.x, pt.y - 1, step, 1.5);
    }
  }

  // F. Estela violenta de la tabla de surf en el agua
  if (isSurfingSpeed) {
    const wakeDir = player.facingRight ? -1 : 1;
    // Chorro de propulsión y spray expulsado hacia atrás
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(playerSurfX + wakeDir * 16, p.y + 1, 14, 4);
    ctx.fillRect(playerSurfX + wakeDir * 28, p.y - 1, 10, 3);
    ctx.fillRect(playerSurfX + wakeDir * 36, p.y - 3, 6, 2);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(playerSurfX + wakeDir * 12, p.y + 4, 18, 3);
    ctx.fillRect(playerSurfX + wakeDir * 24, p.y + 2, 12, 2);

    // Salpicaduras de spray lateral
    if (frame % 2 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(playerSurfX + wakeDir * 20, p.y - 5, 3, 3);
      ctx.fillRect(playerSurfX + wakeDir * 32, p.y - 7, 2, 2);
    }
  }

  // G. Rompiente costera de arena en los extremos de la orilla
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(p.x, p.y - 1, 6, 4);
  ctx.fillRect(p.x + p.w - 6, p.y - 1, 6, 4);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(p.x + 4, p.y + 1, 5, 3);
  ctx.fillRect(p.x + p.w - 9, p.y + 1, 5, 3);
}

// 3. RENDERIZADO DEL MEGATSUNAMI VIOLENTO Y COLOSAL (PARED DE AGUA EN FASES 4 Y 5)
function drawRealisticTsunamiWall(ctx, x, y, w, h, frame) {
  const px = Math.round(x);
  const py = Math.round(y);
  const t = frame * 0.058;

  // Oleaje de masa violenta colosal
  const surgeHeight = Math.max(h, 60);
  const bobSurge = Math.sin(t * 1.6 + x * 0.02) * 6;

  // A. Gran cuerpo de agua abisal de la pared del tsunami
  const waveGrad = ctx.createLinearGradient(px, py - 24, px, py + surgeHeight);
  waveGrad.addColorStop(0, '#90e0ef');    // Cresta que refracta luz solar
  waveGrad.addColorStop(0.12, '#00b4d8'); // Turquesa vivo
  waveGrad.addColorStop(0.3, '#0077b6');  // Azul marino profundo
  waveGrad.addColorStop(0.65, '#023e8a'); // Azul océano abisal
  waveGrad.addColorStop(1, '#001233');    // Negro oceánico colosal
  ctx.fillStyle = waveGrad;
  ctx.fillRect(px, py + bobSurge, w, surgeHeight);

  // B. Corrientes submarinas y vórtices violentos dentro de la pared de agua
  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py + bobSurge, w, surgeHeight);
  ctx.clip();

  for (let vx = px - 12; vx < px + w + 16; vx += 22) {
    const vOffset = Math.sin(t * 2.4 + vx * 0.1) * 8;
    ctx.fillStyle = 'rgba(144, 224, 239, 0.3)';
    ctx.fillRect(vx + vOffset, py + 8 + bobSurge, 18, 4);
    ctx.fillStyle = 'rgba(2, 62, 138, 0.55)';
    ctx.fillRect(vx - vOffset, py + 20 + bobSurge, 22, 5);
    ctx.fillStyle = 'rgba(0, 180, 216, 0.28)';
    ctx.fillRect(vx + vOffset * 1.5, py + 34 + bobSurge, 16, 3);
  }
  ctx.restore();

  // C. Labio superior curvo y violento que se desploma hacia adelante
  const step = 4;
  for (let ox = 0; ox < w; ox += step) {
    const curX = px + ox;
    const waveCurl = Math.sin(t * 3.4 + curX * 0.12) * 5.5 +
                     Math.cos(t * 1.9 + curX * 0.07) * 3.8;
    const crestY = py + bobSurge + Math.round(waveCurl);

    // Sombra profunda bajo el tubo del tsunami
    ctx.fillStyle = '#03045e';
    ctx.fillRect(curX, crestY + 6, step, 6);

    // Manto translúcido de la ola
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(curX, crestY + 2, step, 5);

    // Labio de espuma turquesa claro
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(curX, crestY - 1, step, 4);

    // Espuma blanca pura violenta
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(curX, crestY - 4, step, 3);

    // Pulverización de spray marino masivo al viento
    if ((frame + ox) % 3 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(curX + 1, crestY - 9, 2, 2);
      ctx.fillRect(curX + 3, crestY - 14, 2, 2);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(curX - 1, crestY - 7, 2, 2);
    }
  }

  // D. Base de agua revuelta espumosa (chocando con escombros / suelo)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.fillRect(px, py + surgeHeight - 8, w, 8);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px, py + surgeHeight - 4, w, 4);
}

// 4. RENDERIZADO DE OLAS TUBULARES DE SURF (SURF WAVE CREST - KAI SURF)
function drawRealisticSurfWave(ctx, wave, frame) {
  const wx = Math.round(wave.x);
  const wy = Math.round(wave.y);
  const t = frame * 0.15 + (wave.id || 0) * 1.6;
  const bob = Math.sin(t) * 4.0;

  // 1. Sombra marina profunda bajo el tubo
  ctx.fillStyle = 'rgba(2, 62, 138, 0.6)';
  ctx.beginPath();
  ctx.ellipse(wx + 16, wy + 4, 20, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Pared del tubo (Concavidad en azul marino profundo)
  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.moveTo(wx + 32, wy + 2);
  ctx.quadraticCurveTo(wx + 16, wy - 24 + bob, wx - 6, wy - 32 + bob);
  ctx.lineTo(wx - 12, wy - 22 + bob);
  ctx.quadraticCurveTo(wx + 4, wy - 2, wx + 6, wy + 2);
  ctx.closePath();
  ctx.fill();

  // 3. Interior del tubo translúcido (Luz solar filtrándose por el pocket)
  ctx.fillStyle = '#00b4d8';
  ctx.beginPath();
  ctx.moveTo(wx + 22, wy);
  ctx.quadraticCurveTo(wx + 12, wy - 20 + bob, wx - 3, wy - 27 + bob);
  ctx.lineTo(wx - 8, wy - 21 + bob);
  ctx.quadraticCurveTo(wx + 6, wy - 4, wx + 10, wy);
  ctx.closePath();
  ctx.fill();

  // 4. Labio cayendo hacia adelante (Pitching Lip)
  ctx.fillStyle = '#48cae4';
  ctx.beginPath();
  ctx.moveTo(wx - 4, wy - 28 + bob);
  ctx.quadraticCurveTo(wx + 2, wy - 33 + bob, wx + 9, wy - 24 + bob);
  ctx.lineTo(wx + 5, wy - 20 + bob);
  ctx.quadraticCurveTo(wx, wy - 25 + bob, wx - 5, wy - 24 + bob);
  ctx.closePath();
  ctx.fill();

  // 5. Espuma blanca pura explosiva en la cresta
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(wx - 9, wy - 34 + Math.round(bob), 16, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(wx - 7, wy - 36 + Math.round(bob), 13, 5);
  ctx.fillRect(wx + 5, wy - 29 + Math.round(bob), 6, 4);

  // 6. Chorro de spray (Spit) y gotas en suspensión
  const sprayAnim = (frame * 2 + (wave.id || 0) * 11) % 6;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(wx - 14 + sprayAnim, wy - 41 + Math.round(bob), 3, 3);
  ctx.fillRect(wx - 7 - sprayAnim, wy - 44 + Math.round(bob), 2, 2);
  ctx.fillRect(wx + 10 + sprayAnim, wy - 32 + Math.round(bob), 2, 2);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(wx + 14, wy - 27 + Math.round(bob), 2, 2);
}

// 5. RENDERIZADO DEL HORIZONTE OCEÁNICO EN PARALLAX (DÍA SOLEADO)
function drawRealisticOceanHorizon(ctx, horizonY, seaHeight, cameraX, frame) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  const t = frame * 0.045;

  // A. Gradiente del mar en el horizonte (Azul zafiro a turquesa brillante)
  const seaGrad = ctx.createLinearGradient(0, horizonY, 0, horizonY + seaHeight);
  seaGrad.addColorStop(0, '#0077b6');   // Zafiro horizonte
  seaGrad.addColorStop(0.28, '#0096c7'); // Azul cerúleo
  seaGrad.addColorStop(0.68, '#00b4d8'); // Turquesa radiante
  seaGrad.addColorStop(1, '#48cae4');   // Turquesa caribeño
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, horizonY, W, seaHeight);

  // B. Reflejo del sol sobre el agua (Sun Glitter Path)
  const sunGlintX = Math.round(W * 0.76);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
  for (let ry = horizonY + 2; ry < horizonY + seaHeight; ry += 3) {
    const depthRatio = (ry - horizonY) / seaHeight;
    const rw = Math.round((16 + ((ry * 17) % 32)) * (0.8 + depthRatio * 1.3));
    const waveGlitter = Math.sin(t * 3.2 + ry * 0.5) * 4;
    ctx.fillRect(sunGlintX - Math.floor(rw / 2) + Math.round(waveGlitter), ry, rw, 1.3);
  }

  // C. Filas escalonadas de oleaje oceánico (Swells de horizonte)
  // Fila 1: Olas distantes
  ctx.fillStyle = '#005f73';
  for (let wx = 0; wx < W; wx += 28) {
    const swell1 = Math.sin(t * 1.6 + (wx + cameraX * 0.08) * 0.06) * 2.0;
    ctx.fillRect(wx, horizonY + 5 + Math.round(swell1), 28, 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillRect(wx + 8, horizonY + 5 + Math.round(swell1), 12, 1);
    ctx.fillStyle = '#005f73';
  }

  // Fila 2: Olas intermedias con crestas de espuma blanca
  for (let wx = 0; wx < W; wx += 22) {
    const swell2 = Math.sin(t * 2.4 + (wx + cameraX * 0.14) * 0.09) * 3.2;
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(wx, horizonY + 18 + Math.round(swell2), 22, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(wx + 4, horizonY + 17 + Math.round(swell2), 14, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx + 6, horizonY + 16 + Math.round(swell2), 9, 1.5);
  }

  // Fila 3: Olas cercanas con rompiente turbulenta y espuma gruesa
  for (let wx = 0; wx < W; wx += 16) {
    const swell3 = Math.sin(t * 3.0 + (wx + cameraX * 0.22) * 0.12) * 4.2;
    ctx.fillStyle = '#0096c7';
    ctx.fillRect(wx, horizonY + 34 + Math.round(swell3), 16, 5);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(wx + 2, horizonY + 33 + Math.round(swell3), 12, 2.5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx + 3, horizonY + 31 + Math.round(swell3), 9, 2);
  }
}

// Exportación modular
if (typeof module !== 'undefined') {
  module.exports = {
    getOceanWaveDisplacement,
    drawRealisticWaterPlatform,
    drawRealisticTsunamiWall,
    drawRealisticSurfWave,
    drawRealisticOceanHorizon
  };
}


// --- MODULO: src/render/disaster_platforms.js ---
// ============================================================================
// RENDERIZADO DE PLATAFORMAS DE DESASTRE Y MEGATSUNAMI (MUNDO 3 - FASE 5)
// ============================================================================
// Renderiza estructuras urbanas sumergidas e infraestructuras del tsunami:
// 1. submerged_highway: Viaductos de autopista rota con asfalto, franjas y guardarraíles
// 2. shipping_container: Contenedores intermodales de carga con chapa ondulada y marcajes
// 3. cargo_ship_hull: Casco de carguero comercial encallado con remaches y ojos de buey
// 4. submerged_skyscraper_roof: Azotea de rascacielos con helipuerto H, paneles solares y baliza
// 5. tsunami_barrel_wave: Tubo de ola colosal de surf con vórtice interno y cresta espumosa

function drawDisasterPlatform(ctx, p, frame) {
  if (!p || !p.subType) return false;

  const px = Math.round(p.x);
  const py = Math.round(p.y);
  const pw = p.w;
  const ph = p.h;

  if (p.subType === 'submerged_highway') {
    drawSubmergedHighway(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'shipping_container') {
    drawShippingContainer(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'cargo_ship_hull') {
    drawCargoShipHull(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'submerged_skyscraper_roof') {
    drawSubmergedSkyscraperRoof(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'tsunami_barrel_wave') {
    drawTsunamiBarrelWave(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'construction_girder') {
    drawConstructionGirder(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'skyscraper_rooftop_level') {
    drawSkyscraperRooftopLevel(ctx, px, py, pw, ph, p, frame);
    return true;
  }

  return false;
}

// 1. AUTOPISTA URBANA SUMERGIDA / RAMPA DE LANZAMIENTO
function drawSubmergedHighway(ctx, px, py, pw, ph, p, frame) {
  // Pilares de concreto sumergidos hacia el fondo marino
  const pierStep = 70;
  for (let pierX = px + 20; pierX < px + pw - 20; pierX += pierStep) {
    ctx.fillStyle = '#212529';
    ctx.fillRect(pierX - 6, py + ph, 12, 55);
    ctx.fillStyle = '#343a40';
    ctx.fillRect(pierX - 4, py + ph, 8, 55);
    // Manchas de algas marinas en la línea de agua
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(pierX - 5, py + ph + 24, 10, 8);
    ctx.fillStyle = '#1b4332';
    ctx.fillRect(pierX - 4, py + ph + 28, 8, 12);
  }

  // Base y grosor de la losa de autopista (concreto armado)
  ctx.fillStyle = '#16181b';
  ctx.fillRect(px - 1, py - 1, pw + 2, ph + 2);
  ctx.fillStyle = '#2b2d42';
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = '#1e1e24';
  ctx.fillRect(px, py + 4, pw, ph - 4);

  // Bordillo exterior de granito biselado
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(px, py, pw, 2);
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(px, py, pw, 1);

  // Línea blanca lateral continua (arcén)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 2, pw - 8, 1);

  // Doble línea amarilla de autopista (centro)
  const lineY = py + Math.floor(ph * 0.45);
  for (let lx = px + 8; lx < px + pw - 8; lx += 18) {
    const dashW = Math.min(10, px + pw - 8 - lx);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(lx, lineY, dashW, 2);
    ctx.fillStyle = '#e76f51';
    ctx.fillRect(lx, lineY + 1, dashW, 1);
  }

  // Guardarraíl metálico superior con reflectores ámbar
  for (let rx = px + 6; rx < px + pw - 6; rx += 24) {
    ctx.fillStyle = '#6c757d';
    ctx.fillRect(rx, py - 5, 2, 5);
    ctx.fillStyle = '#adb5bd';
    ctx.fillRect(rx - 1, py - 5, 4, 2);
    ctx.fillStyle = '#ffb703';
    ctx.fillRect(rx, py - 4, 2, 2); // Reflector de peligro
  }

  // Si es rampa de lanzamiento con impulso: flechas chevron amarillas brillantes
  if (p.launchRamp) {
    const pulse = (Math.floor(frame * 0.12) % 3);
    for (let cx = px + 24; cx < px + pw - 24; cx += 32) {
      const isLit = (Math.floor((cx - px) / 32) % 3) === pulse;
      ctx.fillStyle = isLit ? '#ffffff' : '#ffd166';
      // Flecha >
      ctx.fillRect(cx, py + 6, 2, 6);
      ctx.fillRect(cx + 2, py + 7, 2, 4);
      ctx.fillRect(cx + 4, py + 8, 2, 2);
    }
  }

  // Grietas de fractura sísmica por el terremoto
  for (let kx = px + 36; kx < px + pw - 30; kx += 64) {
    ctx.fillStyle = '#14101c';
    ctx.fillRect(kx, py + 2, 3, ph - 4);
    ctx.fillRect(kx + 2, py + 5, 4, 2);
    // Salpicaduras de agua emergiendo de la grieta
    if (globalFrame % 4 < 2) {
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(kx + 1, py - 2, 2, 2);
    }
  }
}

// 2. CONTENEDOR INDUSTRIAL DE CARGA INTERMODAL
function drawShippingContainer(ctx, px, py, pw, ph, p, frame) {
  // Balanceo suave sobre las olas
  const bob = Math.round(Math.sin(frame * 0.05 + px * 0.03) * 1.5);
  const cy = py + bob;

  // Paleta según color de la naviera
  let baseCol = '#0077b6', ribCol = '#0096c7', darkCol = '#023e8a', textCol = '#ffffff';
  if (p.containerColor === 'orange') {
    baseCol = '#d9480f'; ribCol = '#f77f00'; darkCol = '#7f2a03';
  } else if (p.containerColor === 'red') {
    baseCol = '#c1121f'; ribCol = '#e63946'; darkCol = '#660708';
  } else if (p.containerColor === 'teal') {
    baseCol = '#2a9d8f'; ribCol = '#52b788'; darkCol = '#1d3557';
  }

  // Borde y cuerpo de acero acanalado
  ctx.fillStyle = '#0b0c10';
  ctx.fillRect(px - 1, cy - 1, pw + 2, ph + 2);
  ctx.fillStyle = baseCol;
  ctx.fillRect(px, cy, pw, ph);

  // Chapa ondulada: costillas verticales de sombra y luz en 3D
  for (let rx = px + 6; rx < px + pw - 6; rx += 7) {
    ctx.fillStyle = darkCol;
    ctx.fillRect(rx, cy + 2, 2, ph - 4);
    ctx.fillStyle = ribCol;
    ctx.fillRect(rx + 2, cy + 2, 2, ph - 4);
  }

  // Vigas perimetrales y refuerzo superior
  ctx.fillStyle = ribCol;
  ctx.fillRect(px, cy, pw, 2);
  ctx.fillStyle = darkCol;
  ctx.fillRect(px, cy + ph - 2, pw, 2);

  // Cantoneras de esquina (Corner Castings) de alta resistencia
  const corners = [
    { x: px, y: cy },
    { x: px + pw - 6, y: cy },
    { x: px, y: cy + ph - 5 },
    { x: px + pw - 6, y: cy + ph - 5 }
  ];
  for (const c of corners) {
    ctx.fillStyle = '#1f2421';
    ctx.fillRect(c.x, c.y, 6, 5);
    ctx.fillStyle = '#495057';
    ctx.fillRect(c.x + 1, c.y + 1, 4, 3);
    ctx.fillStyle = '#000000';
    ctx.fillRect(c.x + 2, c.y + 2, 2, 1); // Orificio de izado de grúa
  }

  // Matrícula y marcajes marítimos estarcidos
  ctx.fillStyle = textCol;
  ctx.fillRect(px + 10, cy + 3, 14, 2);
  ctx.fillRect(px + 28, cy + 3, 8, 2);
  // Rombo de mercancías peligrosas (Hazmat diamond)
  ctx.fillStyle = '#ffbe0b';
  ctx.fillRect(px + pw - 20, cy + 3, 4, 4);
  ctx.fillStyle = '#d90429';
  ctx.fillRect(px + pw - 19, cy + 4, 2, 2);

  // Espuma y salpicaduras en la línea de flotación
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillRect(px - 2, cy + ph - 2, pw + 4, 2);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 1, cy + ph - 1, pw + 2, 1);
}

// 3. CASCO DE CARGUERO MERCANTE ENCALLADO
function drawCargoShipHull(ctx, px, py, pw, ph, p, frame) {
  // Sombra y contorno de acero naval
  ctx.fillStyle = '#0a1128';
  ctx.fillRect(px - 2, py - 1, pw + 4, ph + 2);

  // Cubierta superior y regala de acero oscuro
  ctx.fillStyle = '#1b263b';
  ctx.fillRect(px, py, pw, ph);

  // Casco inferior con pintura antiincrustante roja abisal
  const hullMid = py + Math.floor(ph * 0.45);
  ctx.fillStyle = '#780001';
  ctx.fillRect(px, hullMid, pw, ph - Math.floor(ph * 0.45));
  ctx.fillStyle = '#540b0e';
  ctx.fillRect(px, hullMid + 6, pw, ph - Math.floor(ph * 0.45) - 6);

  // Franja blanca de demarcación de francobordo
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(px, hullMid - 2, pw, 3);
  ctx.fillStyle = '#e9ecef';
  ctx.fillRect(px, hullMid + 1, pw, 1);

  // Remaches navales y juntas de placas de acero soldadas
  for (let jx = px + 18; jx < px + pw - 12; jx += 38) {
    ctx.fillStyle = '#0d1b2a';
    ctx.fillRect(jx, py + 2, 2, ph - 4);
    for (let ry = py + 4; ry < py + ph - 4; ry += 6) {
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(jx - 1, ry, 1, 1);
      ctx.fillRect(jx + 2, ry, 1, 1);
    }
  }

  // Ojos de buey de bronce con cristal marino reflectante
  for (let ox = px + 26; ox < px + pw - 26; ox += 42) {
    // Marco de bronce
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(ox - 3, py + 5, 7, 7);
    ctx.fillStyle = '#c4923e';
    ctx.fillRect(ox - 2, py + 6, 5, 5);
    // Cristal marino azul turquesa
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(ox - 1, py + 7, 3, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ox, py + 7, 1, 1); // Destello
  }

  // Barandilla de cubierta superior con pasamanos
  ctx.fillStyle = '#adb5bd';
  ctx.fillRect(px, py, pw, 2);
  for (let bx = px + 10; bx < px + pw - 10; bx += 20) {
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(bx, py - 4, 2, 4); // Candelero
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bx - 1, py - 5, 4, 1); // Perno
  }

  // Olas rompiendo contra el casco encallado
  const waveSplash = Math.sin(frame * 0.12 + px * 0.05) * 3;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 4, hullMid + Math.round(waveSplash), 8, 4);
  ctx.fillRect(px + pw - 4, hullMid - Math.round(waveSplash), 8, 4);
}

// 4. AZOTEA SUMERGIDA DE RASCACIELOS CON HELIPUERTO Y PANELES SOLARES
function drawSubmergedSkyscraperRoof(ctx, px, py, pw, ph, p, frame) {
  // Contorno y parapeto de concreto blanco arquitectónico
  ctx.fillStyle = '#1f2421';
  ctx.fillRect(px - 1, py - 1, pw + 2, ph + 2);
  ctx.fillStyle = '#dee2e6';
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(px, py + 4, pw, ph - 4);

  // Remate superior de aluminio blanco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 2);

  // Zona A: Helipuerto corporativo (Círculo y letra H gigante)
  const heliX = px + 44;
  const heliY = py + Math.floor(ph * 0.48);
  // Anillo perimetral amarillo
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(heliX - 16, heliY - 7, 32, 14);
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(heliX - 14, heliY - 5, 28, 10);
  // Letra H blanca gruesa de aterrizaje
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(heliX - 8, heliY - 4, 3, 8); // Barra izq
  ctx.fillRect(heliX + 5, heliY - 4, 3, 8); // Barra der
  ctx.fillRect(heliX - 5, heliY - 1, 10, 2); // Travesaño central

  // Zona B: Campo de paneles solares fotovoltaicos en rejilla azul índigo
  const solarStart = px + 80;
  const solarEnd = px + pw - 40;
  for (let sx = solarStart; sx < solarEnd; sx += 22) {
    const sw = Math.min(18, solarEnd - sx);
    ctx.fillStyle = '#03045e';
    ctx.fillRect(sx, py + 3, sw, ph - 7);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(sx + 1, py + 4, sw - 2, ph - 9);
    // Rejilla de silicio y reflejo solar
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(sx + Math.floor(sw / 2), py + 4, 1, ph - 9);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(sx + 2, py + 5, 3, 2);
  }

  // Zona C: Chiller de aire acondicionado y compuertas de ventilación
  const hvacX = px + pw - 34;
  ctx.fillStyle = '#343a40';
  ctx.fillRect(hvacX, py + 3, 28, ph - 6);
  ctx.fillStyle = '#495057';
  ctx.fillRect(hvacX + 2, py + 5, 24, ph - 10);
  for (let vy = py + 7; vy < py + ph - 8; vy += 3) {
    ctx.fillStyle = '#212529';
    ctx.fillRect(hvacX + 4, vy, 20, 1);
  }

  // Antena / baliza de aviación en el extremo con destello rojo intermitente
  const beaconX = px + pw - 8;
  ctx.fillStyle = '#6c757d';
  ctx.fillRect(beaconX, py - 14, 2, 14);
  ctx.fillStyle = '#adb5bd';
  ctx.fillRect(beaconX - 2, py - 4, 6, 2);
  const isFlash = Math.floor(frame * 0.12) % 2 === 0;
  ctx.fillStyle = isFlash ? '#ff0054' : '#590d22';
  ctx.fillRect(beaconX - 1, py - 16, 4, 3);
  if (isFlash) {
    ctx.fillStyle = 'rgba(255, 0, 84, 0.45)';
    ctx.fillRect(beaconX - 4, py - 19, 10, 9);
  }
}

// 5. TUBO DE OLA COLOSAL DE SURF (TSUNAMI BARREL WAVE)
function drawTsunamiBarrelWave(ctx, px, py, pw, ph, p, frame) {
  // 1. Renderizar la base de agua hidrodinámica continua sin costuras
  if (typeof drawRealisticWaterPlatform === 'function') {
    drawRealisticWaterPlatform(ctx, p, frame);
  }

  const t = frame * 0.06;

  // 2. Líneas de corriente hiper-rápidas en el interior del vórtice
  for (let stream = 0; stream < 4; stream++) {
    const streamY = py + 8 + stream * 10;
    const speed = (stream + 2) * 2.2;
    const streamOff = (frame * speed) % pw;
    ctx.fillStyle = (stream % 2 === 0) ? 'rgba(144, 224, 239, 0.45)' : 'rgba(202, 240, 248, 0.65)';
    ctx.fillRect(px + streamOff, streamY, 26, 2);
    ctx.fillRect(px + ((streamOff + Math.floor(pw * 0.5)) % pw), streamY, 32, 2);
  }

  // 3. Bóveda y labio superior que se curva overhead formando el túnel de agua
  const step = 6;
  for (let wx = 0; wx < pw; wx += step) {
    const curX = px + wx;
    const waveSin = Math.sin(t * 3.0 + curX * 0.08) * 5.0;
    const curlY = py - 18 + Math.round(waveSin);

    // Bóveda de agua curvada sobre la cabeza
    ctx.fillStyle = '#03045e';
    ctx.fillRect(curX, curlY - 6, step, 6);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(curX, curlY - 4, step, 5);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(curX, curlY - 2, step, 4);

    // Espuma blanca hirviente en la cresta de la bóveda
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(curX, curlY - 1, step, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(curX, curlY - 3, step, 2);

    // Gotas de agua y spray pulverizado cayendo del labio
    if ((frame + wx) % 6 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(curX + 2, curlY + 5, 2, 2);
      ctx.fillRect(curX + 4, curlY + 14, 1, 2);
    }
  }

  // 4. Acelerador de corriente visible en agua
  if (p.boostCurrent) {
    ctx.fillStyle = 'rgba(0, 245, 212, 0.45)';
    for (let fx = px + ((frame * 6) % 36); fx < px + pw - 18; fx += 36) {
      ctx.fillRect(fx, py + 8, 16, 2);
    }
  }
}

// 6. VIGA DE ACERO INDUSTRIAL SUSPENDIDA ENTRE RASCACIELOS (CONSTRUCTION GIRDER)
function drawConstructionGirder(ctx, px, py, pw, ph, p, frame) {
  // Cables de suspensión tensados hacia el cielo
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px + 8, py);
  ctx.lineTo(px + 4, 0);
  ctx.moveTo(px + pw - 8, py);
  ctx.lineTo(px + pw - 4, 0);
  ctx.stroke();

  // Grilletes de amarre
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 6, py - 4, 5, 4);
  ctx.fillRect(px + pw - 11, py - 4, 5, 4);

  // Ala superior de la viga I con remaches
  ctx.fillStyle = '#d90429';
  ctx.fillRect(px, py, pw, 3);
  ctx.fillStyle = '#ff758f';
  ctx.fillRect(px, py, pw, 1);

  // Alma central de acero con franjas diagonales de peligro
  ctx.fillStyle = '#780001';
  ctx.fillRect(px + 1, py + 3, pw - 2, ph - 5);

  ctx.save();
  ctx.beginPath();
  ctx.rect(px + 2, py + 3, pw - 4, ph - 6);
  ctx.clip();
  for (let sx = px - 20; sx < px + pw + 20; sx += 12) {
    ctx.fillStyle = '#ffd166';
    ctx.beginPath();
    ctx.moveTo(sx, py + ph - 2);
    ctx.lineTo(sx + 6, py + ph - 2);
    ctx.lineTo(sx + 12, py + 2);
    ctx.lineTo(sx + 6, py + 2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Ala inferior de la viga
  ctx.fillStyle = '#590d22';
  ctx.fillRect(px, py + ph - 2, pw, 2);

  // Remaches
  ctx.fillStyle = '#ffffff';
  for (let rx = px + 4; rx < px + pw; rx += 14) {
    ctx.fillRect(rx, py + 1, 1, 1);
    ctx.fillRect(rx, py + ph - 2, 1, 1);
  }
}

// 7. AZOTEA MONUMENTAL DEL RASCACIELOS (PISO 100 / HELIPUERTO)
function drawSkyscraperRooftopLevel(ctx, px, py, pw, ph, p, frame) {
  // Base de hormigón armado y grava asfáltica
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py + 3, pw, ph - 3);

  // Placas de cubierta de mantenimiento
  for (let tx = px; tx < px + pw; tx += 28) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(tx, py + 1, 26, 3);
  }

  // Coronación de aluminio
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 1);

  // Franja perimetral de peligro amarilla y negra
  for (let hx = px; hx < px + pw; hx += 16) {
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(hx, py + 4, 8, 2);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(hx + 8, py + 4, 8, 2);
  }

  // Helipuerto monumental corporativo
  const heliX = px + Math.min(220, Math.floor(pw * 0.45));
  const heliR = 22;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(heliX, py + 18, heliR, 10, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Letra H gigante
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(heliX - 9, py + 11, 4, 14);
  ctx.fillRect(heliX + 5, py + 11, 4, 14);
  ctx.fillRect(heliX - 5, py + 16, 10, 3);

  // Balizas perimetrales del helipuerto
  const heliPulse = Math.sin(frame * 0.15) * 0.4 + 0.6;
  ctx.fillStyle = `rgba(255, 209, 102, ${heliPulse})`;
  ctx.fillRect(heliX - heliR - 2, py + 16, 4, 4);
  ctx.fillRect(heliX + heliR - 2, py + 16, 4, 4);

  // Turbinas y chillers HVAC
  for (let vx = px + 60; vx < px + pw - 60; vx += 130) {
    if (Math.abs(vx - heliX) < 45) continue;
    ctx.fillStyle = '#334155';
    ctx.fillRect(vx, py + 8, 32, 14);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(vx + 2, py + 10, 28, 10);
    const fanAngle = (frame * 0.35 + vx) % (Math.PI * 2);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(vx + 16 - Math.cos(fanAngle) * 8, py + 15 - Math.sin(fanAngle) * 3);
    ctx.lineTo(vx + 16 + Math.cos(fanAngle) * 8, py + 15 + Math.sin(fanAngle) * 3);
    ctx.stroke();
  }

  // Balizas de aviación rojas intermitentes en las esquinas
  const isBeacon = Math.floor(frame * 0.1) % 2 === 0;
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + 4, py - 16, 2, 16);
  ctx.fillStyle = isBeacon ? '#ff0054' : '#4a0e17';
  ctx.fillRect(px + 3, py - 19, 4, 4);
  if (isBeacon) {
    ctx.fillStyle = 'rgba(255, 0, 84, 0.45)';
    ctx.fillRect(px, py - 22, 10, 10);
  }

  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + pw - 6, py - 16, 2, 16);
  ctx.fillStyle = isBeacon ? '#ff0054' : '#4a0e17';
  ctx.fillRect(px + pw - 7, py - 19, 4, 4);
  if (isBeacon) {
    ctx.fillStyle = 'rgba(255, 0, 84, 0.45)';
    ctx.fillRect(px + pw - 10, py - 22, 10, 10);
  }

  // Grietas dinámicas durante el terremoto
  if (typeof earthquakeTriggered !== 'undefined' && earthquakeTriggered) {
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px + 140, py);
    ctx.lineTo(px + 155, py + 12);
    ctx.lineTo(px + 150, py + 24);
    ctx.moveTo(px + 310, py);
    ctx.lineTo(px + 300, py + 10);
    ctx.lineTo(px + 318, py + 22);
    ctx.stroke();
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawDisasterPlatform,
    drawSubmergedHighway,
    drawShippingContainer,
    drawCargoShipHull,
    drawSubmergedSkyscraperRoof,
    drawTsunamiBarrelWave,
    drawConstructionGirder,
    drawSkyscraperRooftopLevel
  };
}


// --- MODULO: src/render/snow_platforms.js ---
// ============================================================================
// RENDERIZADO DE PLATAFORMAS DE NIEVE Y ALTA MONTAÑA (MUNDO 4 - EVEREST)
// ============================================================================
// 1. snow_ground: Terreno rocoso alpino con gruesa capa de nieve fresca y polvillo
// 2. snow_bank: Banco de nieve profunda donde Elizabeth cava túneles subterráneos
// 3. ice_rock: Risco de pizarra helada con estalagmitas y carámbanos colgantes
// 4. alpine_bridge: Puente rústico de troncos alpinos y cuerdas cubierto de escarcha

function drawSnowPlatform(ctx, p, frame) {
  if (!p || !p.subType || p.broken) return false;

  const px = Math.round(p.x);
  const py = Math.round(p.y);
  const pw = p.w;
  const ph = p.h;

  if (p.subType === 'snow_ground') {
    drawSnowGround(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'snow_bank') {
    drawSnowBank(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'ice_rock') {
    drawIceRock(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'alpine_bridge') {
    drawAlpineBridge(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'ice_pillar') {
    drawIcePillar(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'ice_crystal') {
    drawIceCrystal(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'slippery_ice' || p.subType === 'frozen_lake_ice') {
    drawFrozenLakeIce(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'cracking_ice') {
    drawCrackingIce(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'bounce_crystal' || p.subType === 'ice_crystal_spring') {
    drawBounceCrystal(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'crystal_lotus_pad' || p.subType === 'lotus_pad_shambhala') {
    drawCrystalLotusPad(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'shambhala_pagoda_roof' || p.subType === 'pagoda_roof') {
    drawShambhalaPagodaRoof(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'shambhala_marble_terrace' || p.subType === 'shambhala_marble') {
    drawShambhalaMarbleTerrace(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'shambhala_bridge') {
    drawShambhalaBridge(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'rainbow_ice' || p.subType === 'rainbow_bridge') {
    drawRainbowIcePlatform(ctx, px, py, pw, ph, p, frame);
    return true;
  }
  if (p.subType === 'aluminum_bridge') {
    if (typeof drawAluminumLadderBridge === 'function') {
      drawAluminumLadderBridge(ctx, px, py, pw, frame);
    } else {
      drawAlpineBridge(ctx, px, py, pw, ph, p, frame);
    }
    return true;
  }

  return false;
}

// 1. TERRENO NEVADO ESTÁNDAR
function drawSnowGround(ctx, px, py, pw, ph, p, frame) {
  // Base de roca pizarra oscura
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py + 8, pw, ph - 8);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py + 10, pw, ph - 10);

  // Estrato de roca azulada
  for (let rx = px + 10; rx < px + pw; rx += 28) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(rx, py + 12, 14, 6);
  }

  // Capa intermedia de hielo compactado
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px, py + 5, pw, 3);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px, py + 4, pw, 2);

  // Manto superior de nieve virgen esponjosa con ondas onduladas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 5);

  // Pequeñas dunas y montículos de nieve rítmicos en el borde
  for (let mx = px; mx < px + pw; mx += 16) {
    ctx.fillRect(mx + 2, py - 1, 10, 2);
    // Destello de escarcha
    if ((mx + frame) % 40 < 20) {
      ctx.fillStyle = '#90e0ef';
      ctx.fillRect(mx + 6, py - 1, 1, 1);
      ctx.fillStyle = '#ffffff';
    }
  }
}

// 2. BANCO DE NIEVE PROFUNDA (TÚNELES SUBTERRÁNEOS PARA CAVAR)
function drawSnowBank(ctx, px, py, pw, ph, p, frame) {
  // Masa profunda de nieve compacta
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px, py, pw, ph);

  // Núcleo blanco brillante
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 1, py + 2, pw - 2, ph - 4);

  // Ondas de polvo de nieve en el borde superior
  for (let mx = px; mx < px + pw; mx += 14) {
    ctx.fillRect(mx, py - 2, 12, 3);
    ctx.fillRect(mx + 3, py - 4, 6, 2);
  }

  // Indicador de sendero / túnel subterráneo en el interior del banco
  ctx.fillStyle = 'rgba(144, 224, 239, 0.45)';
  ctx.fillRect(px + 4, py + Math.floor(ph * 0.45), pw - 8, Math.floor(ph * 0.4));

  // Cristales de nieve brillantes en el interior
  for (let cx = px + 16; cx < px + pw - 16; cx += 26) {
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(cx, py + 10, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 1, py + 10, 1, 2);
    ctx.fillRect(cx + 2, py + 10, 1, 2);
  }

  // Borde inferior con adherencia al suelo
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px, py + ph - 2, pw, 2);
}

// 3. RISCO DE PIZARRA HELADA CON CARÁMBANOS
function drawIceRock(ctx, px, py, pw, ph, p, frame) {
  // Núcleo de roca oscura
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 1, py + 1, pw - 2, ph - 2);

  // Escarcha superficial
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px, py, pw, 3);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px, py, pw, 1.5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 2, py, pw - 4, 1);

  // Carámbanos de hielo colgando bajo la plataforma
  for (let ix = px + 8; ix < px + pw - 6; ix += 18) {
    const iLen = 6 + ((ix * 7) % 8);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ix, py + ph, 3, iLen);
    ctx.fillRect(ix + 1, py + ph + iLen, 1, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ix, py + ph, 1, iLen - 2);
  }
}

// 4. PUENTE ALPINO DE TRONCOS Y CUERDAS
function drawAlpineBridge(ctx, px, py, pw, ph, p, frame) {
  // Troncos individuales en hilera
  for (let bx = px; bx < px + pw - 8; bx += 14) {
    // Tronco de madera alpina
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(bx, py, 12, ph);
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(bx + 1, py + 1, 10, ph - 2);
    // Veta de madera
    ctx.fillStyle = '#27160c';
    ctx.fillRect(bx + 4, py + 2, 2, ph - 4);

    // Manto de nieve sobre cada tronco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bx, py, 12, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(bx + 1, py + 2, 10, 1);
  }

  // Cuerdas de amarre laterales
  ctx.fillStyle = '#8d6e63';
  ctx.fillRect(px, py + ph - 2, pw, 2);
  for (let kx = px + 6; kx < px + pw; kx += 16) {
    // Poste / candelero de madera conectado al puente
    ctx.fillStyle = '#4e342e';
    ctx.fillRect(kx, py - 4, 2, 6);
    // Capucha de nieve sobre el poste
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(kx - 1, py - 5, 4, 2);
  }
}

// 4b. PUENTE DE ESCALERA DE ALUMINIO DE KHUMBU (LADDER BRIDGE SOBRE GRIETAS)
function drawAluminumLadderBridge(ctx, px, py, pw, frame) {
  // Niebla fría / vapor gélido que asciende de la grieta profunda bajo la escalera
  const mistAlpha = 0.22 + Math.sin(frame * 0.08 + px * 0.02) * 0.1;
  ctx.fillStyle = `rgba(186, 230, 253, ${mistAlpha.toFixed(2)})`;
  ctx.fillRect(px + 4, py + 8, pw - 8, 14);

  // Estacas de anclaje de acero y picos en los dos extremos
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(px - 4, py - 3, 6, 10);
  ctx.fillRect(px + pw - 2, py - 3, 6, 10);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 3, py - 3, 4, 2);
  ctx.fillRect(px + pw - 1, py - 3, 4, 2);

  // Cuerdas de seguridad tensoras naranjas de escalada de alta montaña (Kernmantle rope)
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 2);
  ctx.lineTo(px + pw + 2, py - 2);
  ctx.stroke();

  // Nudos de amarre en los extremos
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(px - 2, py - 4, 3, 4);
  ctx.fillRect(px + pw - 1, py - 4, 3, 4);

  // Rieles de aluminio dobles (superior e inferior)
  // Sombra del riel inferior
  ctx.fillStyle = '#334155';
  ctx.fillRect(px, py + 5, pw, 2);
  // Riel inferior metálico
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px, py + 4, pw, 2);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px, py + 4, pw, 1);

  // Sombra del riel superior
  ctx.fillStyle = '#475569';
  ctx.fillRect(px, py + 1, pw, 2);
  // Riel superior brillante de aleación de aluminio aeroespacial
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(px, py, pw, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 1);

  // Peldaños / travesaños de aluminio perpendiculares (rungs) cada 8 píxeles
  for (let rx = px + 4; rx <= px + pw - 4; rx += 8) {
    // Sombra del peldaño
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(rx, py + 1, 2, 5);
    // Cuerpo del peldaño de aluminio
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(rx, py, 2, 5);
    // Destello de escarcha sobre el peldaño
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(rx, py, 1, 2);

    // Pequeño remache de fijación
    ctx.fillStyle = '#475569';
    ctx.fillRect(rx, py, 1, 1);
    ctx.fillRect(rx, py + 4, 1, 1);
  }

  // Chispas de escarcha / hielo adherido en el aluminio
  const glintPos = (Math.floor(frame * 0.4) * 16) % Math.max(16, pw - 12);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + glintPos, py, 3, 1);
  ctx.fillRect(px + glintPos + 1, py - 1, 1, 3);
}

// 5. PILAR / MONOLITO DE HIELO CRISTALINO VERTICAL (ESTILO CELESTE)
function drawIcePillar(ctx, px, py, pw, ph, p, frame) {
  // Contorno oscuro de hielo glacial
  ctx.fillStyle = '#03045e';
  ctx.fillRect(px, py, pw, ph);

  // Cuerpo translúcido de hielo comprimido
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px + 2, py + 2, pw - 4, ph - 4);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 4, py + 2, Math.max(2, pw - 8), ph - 4);

  // Bandas de refracción vertical
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px + 5, py + 4, 3, ph - 8);
  if (pw > 20) {
    ctx.fillRect(px + pw - 8, py + 6, 2, ph - 12);
  }

  // Líneas de fractura interna de cristal
  ctx.fillStyle = '#caf0f8';
  for (let fy = py + 12; fy < py + ph - 8; fy += 22) {
    ctx.fillRect(px + 3, fy, pw - 6, 1);
    ctx.fillRect(px + Math.floor(pw * 0.4), fy - 3, 2, 6);
  }

  // Si el pilar es quebrable, dibujar vetas luminosas de fractura y runa de impacto
  if (p.breakable) {
    const pulse = Math.sin(frame * 0.12 + px * 0.05) * 0.3 + 0.7;
    ctx.strokeStyle = p.crystalType === 'amethyst'
      ? `rgba(192, 132, 252, ${pulse.toFixed(2)})`
      : (p.crystalType === 'jade' ? `rgba(52, 211, 153, ${pulse.toFixed(2)})` : `rgba(56, 189, 248, ${pulse.toFixed(2)})`);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px + Math.floor(pw * 0.3), py + 6);
    ctx.lineTo(px + Math.floor(pw * 0.6), py + Math.floor(ph * 0.45));
    ctx.lineTo(px + Math.floor(pw * 0.25), py + Math.floor(ph * 0.75));
    ctx.lineTo(px + Math.floor(pw * 0.5), py + ph - 6);
    ctx.stroke();

    // Runa central de cristal pulsante
    ctx.fillStyle = p.crystalType === 'amethyst' ? '#c084fc' : (p.crystalType === 'jade' ? '#34d399' : '#38bdf8');
    ctx.fillRect(px + Math.floor(pw / 2) - 3, py + Math.floor(ph / 2) - 3, 6, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + Math.floor(pw / 2) - 1, py + Math.floor(ph / 2) - 1, 2, 2);
  }

  // Tapa superior de nieve compacta
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 3);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 1, py + 3, pw - 2, 2);

  // Carámbanos colgantes en la base del pilar
  for (let ix = px + 4; ix < px + pw - 4; ix += 14) {
    const iLen = 4 + ((ix * 5) % 6);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ix, py + ph, 2, iLen);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ix, py + ph, 1, iLen - 1);
  }
}

// 6. BLOQUE FLOTANTE DE HIELO CRISTALINO (PARKOUR AÉREO CELESTE)
function drawIceCrystal(ctx, px, py, pw, ph, p, frame) {
  // Facetas externas de diamante glacial
  ctx.fillStyle = '#023e8a';
  ctx.fillRect(px, py, pw, ph);

  // Prisma interno celeste brillante
  ctx.fillStyle = '#0096c7';
  ctx.fillRect(px + 1, py + 1, pw - 2, ph - 2);

  // Centro radiante
  ctx.fillStyle = '#48cae4';
  ctx.fillRect(px + 3, py + 2, pw - 6, ph - 4);

  // Destellos geométricos
  const pulse = Math.sin(frame * 0.08 + px * 0.02) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + pulse.toFixed(2) + ')';
  ctx.fillRect(px + 4, py + 2, 4, 2);
  ctx.fillRect(px + pw - 8, py + ph - 4, 3, 2);

  // Borde superior de escarcha para agarre de pisada
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 2);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 1, py + 2, pw - 2, 1);

  // Micro-carámbanos de cristal
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 3, py + ph, 2, 4);
  ctx.fillRect(px + pw - 5, py + ph, 2, 4);
}

// 7. PISTA DE HIELO CRISTALINO / HIELO DESLIZANTE DEL LAGO CONGELADO
function drawFrozenLakeIce(ctx, px, py, pw, ph, p, frame) {
  // Base profunda de aguas gélidas y basalto submarino
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py + 12, pw, ph - 12);
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(px, py + 8, pw, ph - 8);

  // Bloque de hielo cristalino translúcido azul cian
  const iceGrad = ctx.createLinearGradient(0, py, 0, py + ph);
  iceGrad.addColorStop(0, '#bae6fd');
  iceGrad.addColorStop(0.3, '#38bdf8');
  iceGrad.addColorStop(0.8, '#0284c7');
  iceGrad.addColorStop(1, '#0369a1');
  ctx.fillStyle = iceGrad;
  ctx.fillRect(px, py + 2, pw, ph - 2);

  // Grietas y vetas de permafrost submarino en el hielo
  ctx.strokeStyle = '#e0f2fe';
  ctx.lineWidth = 1;
  for (let cx = px + 16; cx < px + pw - 12; cx += 32) {
    ctx.beginPath();
    ctx.moveTo(cx, py + 3);
    ctx.lineTo(cx + 6, py + 10);
    ctx.lineTo(cx + 12, py + 14);
    ctx.stroke();
  }

  // Capa de pulido cristalino de espejo (reflejo de cielo ártico)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 2);
  ctx.fillStyle = '#f0f9ff';
  ctx.fillRect(px, py + 2, pw, 1);

  // Destellos de luz en la pista de patinaje
  for (let sx = px + 8; sx < px + pw; sx += 48) {
    const glint = (frame + sx * 3) % 40 < 10;
    if (glint) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx, py + 1, 4, 1);
      ctx.fillRect(sx + 1, py, 2, 3);
    }
  }

  // Pequeños témpanos en la parte inferior si está suspendida
  if (p.oneWay) {
    ctx.fillStyle = '#7dd3fc';
    for (let ix = px + 8; ix < px + pw - 6; ix += 20) {
      ctx.beginPath();
      ctx.moveTo(ix, py + ph);
      ctx.lineTo(ix + 4, py + ph);
      ctx.lineTo(ix + 2, py + ph + 6);
      ctx.closePath();
      ctx.fill();
    }
  }
}

// 8. PUENTE DE ARCOIRIS DE KAILASH (CRISTAL CROMATICO CELESTIAL)
function drawRainbowIcePlatform(ctx, px, py, pw, ph, p, frame) {
  // Espectro cromatico de 7 colores
  const rainbowColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7'
  ];
  const barH = Math.max(1, Math.floor(ph / rainbowColors.length));
  for (let c = 0; c < rainbowColors.length; c++) {
    ctx.fillStyle = rainbowColors[c];
    ctx.fillRect(px, py + c * barH, pw, (c === rainbowColors.length - 1) ? (ph - c * barH) : barH);
  }

  // Reflejo blanco cristalino superior
  const pulse = Math.sin(frame * 0.1) * 0.25 + 0.75;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + pulse.toFixed(2) + ')';
  ctx.fillRect(px, py, pw, 2);

  // Pilares de anclaje dorados en ambos extremos
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 3, py - 8, 4, ph + 8);
  ctx.fillRect(px + pw - 1, py - 8, 4, ph + 8);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 2, py - 9, 2, 2);
  ctx.fillRect(px + pw, py - 9, 2, 2);

  // Cuerdas de luz estelar de pasamanos
  const sway = Math.sin(frame * 0.08) * 1.5;
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 1, py - 6);
  ctx.quadraticCurveTo(px + pw / 2, py - 6 + sway, px + pw + 1, py - 6);
  ctx.stroke();

  // Chispas flotantes sobre el puente
  for (let s = 0; s < 4; s++) {
    const sProg = (frame * 0.05 + s * 0.25) % 1;
    const sx = px + 10 + sProg * (pw - 20);
    const sy = py - 4 - Math.sin(sProg * Math.PI) * 8;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx, sy, 2, 2);
  }
}

// 9. HIELO QUEBRADIZO / CAPA FRÁGIL DE LAGO (CRACKING ICE)
function drawCrackingIce(ctx, px, py, pw, ph, p, frame) {
  if (p.broken) {
    // Si está rota, dibujamos trozos hundiéndose y burbujas de agua
    const fade = Math.max(0, p.respawnTimer / 2.8);
    ctx.fillStyle = `rgba(186, 230, 253, ${fade * 0.4})`;
    for (let c = 0; c < 3; c++) {
      const cx = px + (pw * 0.25) * (c + 1) - 6;
      const cy = py + 4 + (1 - fade) * 8;
      ctx.fillRect(cx, cy, 10, 4);
    }
    return;
  }

  const shakeX = p.shakeOffset || 0;
  const shakeY = (p.shakeOffset ? Math.cos(frame * 2.0) * 1.2 : 0);
  const curX = px + Math.round(shakeX);
  const curY = py + Math.round(shakeY);

  // Base de hielo congelado translúcido
  drawFrozenLakeIce(ctx, curX, curY, pw, ph, p, frame);

  // Grietas activas según el temporizador de pisada
  const crack = p.crackTimer || 0;
  if (crack > 0.05) {
    const crackAlpha = Math.min(1, crack / 0.7);
    ctx.strokeStyle = `rgba(255, 255, 255, ${crackAlpha})`;
    ctx.lineWidth = 1.5;

    // Red de fracturas en zigzag
    ctx.beginPath();
    ctx.moveTo(curX + pw * 0.15, curY + 2);
    ctx.lineTo(curX + pw * 0.35, curY + ph * 0.45);
    ctx.lineTo(curX + pw * 0.5, curY + 2);
    ctx.lineTo(curX + pw * 0.7, curY + ph * 0.6);
    ctx.lineTo(curX + pw * 0.88, curY + 2);
    ctx.stroke();

    if (crack > 0.4) {
      // Grietas transversales profundas
      ctx.strokeStyle = `rgba(224, 242, 254, ${crackAlpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(curX + pw * 0.35, curY + ph * 0.45);
      ctx.lineTo(curX + pw * 0.3, curY + ph - 2);
      ctx.moveTo(curX + pw * 0.7, curY + ph * 0.6);
      ctx.lineTo(curX + pw * 0.75, curY + ph - 2);
      ctx.stroke();

      // Destellos de peligro de quiebre inminente
      if (Math.sin(frame * 0.6) > 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(curX + pw * 0.5 - 2, curY, 4, 3);
      }
    }
  }
}

// 10. CRISTAL CELESTIAL DE IMPULSO / RESORTE GLACIAL (BOUNCE CRYSTAL)
function drawBounceCrystal(ctx, px, py, pw, ph, p, frame) {
  const cx = px + pw / 2;
  const cy = py + ph / 2;
  const pulse = Math.sin(frame * 0.12) * 2;
  const rad = Math.min(pw, ph) / 2 + pulse;

  // Halo de energía celestial circundante
  const halo = ctx.createRadialGradient(cx, cy, 2, cx, cy, rad + 14);
  halo.addColorStop(0, 'rgba(0, 245, 212, 0.6)');
  halo.addColorStop(0.5, 'rgba(56, 189, 248, 0.25)');
  halo.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, rad + 14, 0, Math.PI * 2);
  ctx.fill();

  // Rombo / Diamante de Cristal Glacial
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(cx, cy - rad - 2);
  ctx.lineTo(cx + rad + 2, cy);
  ctx.lineTo(cx, cy + rad + 2);
  ctx.lineTo(cx - rad - 2, cy);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#00f5d4';
  ctx.beginPath();
  ctx.moveTo(cx, cy - rad);
  ctx.lineTo(cx + rad, cy);
  ctx.lineTo(cx, cy + rad);
  ctx.lineTo(cx - rad, cy);
  ctx.closePath();
  ctx.fill();

  // Núcleo brillante blanco
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(cx, cy - rad * 0.5);
  ctx.lineTo(cx + rad * 0.5, cy);
  ctx.lineTo(cx, cy + rad * 0.5);
  ctx.lineTo(cx - rad * 0.5, cy);
  ctx.closePath();
  ctx.fill();

  // Chispas estelares orbitando
  for (let s = 0; s < 3; s++) {
    const sAngle = frame * 0.08 + s * (Math.PI * 2 / 3);
    const sx = cx + Math.cos(sAngle) * (rad + 6);
    const sy = cy + Math.sin(sAngle) * (rad + 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(sx) - 1, Math.round(sy) - 1, 2, 2);
  }
}

// 11. PLATAFORMA DE LOTO DE CRISTAL FLOTANTE (SHAMBHALA BOUNCE PAD)
function drawCrystalLotusPad(ctx, px, py, pw, ph, p, frame) {
  const bob = Math.sin(frame * 0.08 + px * 0.04) * 2;
  const cy = py + bob;
  const cx = px + pw / 2;

  // Halo luminoso radial místico
  const glow = Math.sin(frame * 0.12 + px * 0.02) * 0.2 + 0.8;
  const grad = ctx.createRadialGradient(cx, cy + ph / 2, 4, cx, cy + ph / 2, pw / 2 + 10);
  grad.addColorStop(0, 'rgba(56, 189, 248, ' + (glow * 0.45).toFixed(2) + ')');
  grad.addColorStop(0.6, 'rgba(254, 240, 138, ' + (glow * 0.25).toFixed(2) + ')');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy + ph / 2, pw / 2 + 10, 0, Math.PI * 2);
  ctx.fill();

  // Hoja basal de jade esmeralda
  ctx.fillStyle = '#065f46';
  ctx.beginPath();
  ctx.ellipse(cx, cy + ph / 2 + 2, pw / 2, ph / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.ellipse(cx, cy + ph / 2, pw / 2 - 2, ph / 2 - 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pétalos cristalinos celestes en abanico
  const numPetals = 7;
  for (let i = 0; i < numPetals; i++) {
    const ang = (i * Math.PI) / (numPetals - 1) - Math.PI;
    const petX = cx + Math.cos(ang) * (pw / 2 - 4);
    const petY = cy + ph / 2 + Math.sin(ang) * 4;
    ctx.fillStyle = (i % 2 === 0) ? '#0284c7' : '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(petX, petY, 5, 8, ang * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Capa superior de pétalos blancos de cuarzo
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.ellipse(cx - 8, cy + 2, 6, 4, -0.2, 0, Math.PI * 2);
  ctx.ellipse(cx + 8, cy + 2, 6, 4, 0.2, 0, Math.PI * 2);
  ctx.ellipse(cx, cy, 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Corola dorada elástica de rebote
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.ellipse(cx, cy + 1, pw / 3, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#eab308';
  ctx.fillRect(cx - 3, cy, 6, 2);

  // Destellos estelares
  const spark = (frame * 0.08) % 1;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 4 + Math.sin(frame * 0.15) * 8, cy - 6 - spark * 8, 2, 2);
}

// 12. TECHO DE PAGODA ASIÁTICA DE SHAMBHALA (ALEROS CURVOS DE ORO)
function drawShambhalaPagodaRoof(ctx, px, py, pw, ph, p, frame) {
  // 1. Viga inferior de madera lacada rojo carmesí tibetano
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(px + 4, py + ph - 5, pw - 8, 5);
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px + 6, py + ph - 4, pw - 12, 3);

  // Ménsulas de madera dorada tallada
  for (let bx = px + 10; bx < px + pw - 10; bx += 18) {
    ctx.fillStyle = '#b45309';
    ctx.fillRect(bx, py + ph - 3, 4, 3);
  }

  // 2. Faldón principal de tejas doradas
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + 2, py + 4, pw - 4, ph - 8);

  ctx.fillStyle = '#d97706';
  ctx.fillRect(px + 1, py + 2, pw - 2, 5);

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px, py + 1, pw, 3);

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px + 4, py, pw - 8, 2);

  // Relieve de canales de tejas doradas
  for (let tx = px + 6; tx < px + pw - 6; tx += 8) {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(tx, py + 3, 1, ph - 6);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(tx + 1, py + 1, 1, 3);
  }

  // 3. Aleros curvos hacia arriba en los extremos (estilo asiático oriental)
  ctx.fillStyle = '#f59e0b';
  // Extremo izquierdo hacia arriba
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 4);
  ctx.lineTo(px + 4, py + 2);
  ctx.lineTo(px, py + 5);
  ctx.closePath();
  ctx.fill();

  // Extremo derecho hacia arriba
  ctx.beginPath();
  ctx.moveTo(px + pw + 4, py - 4);
  ctx.lineTo(px + pw - 4, py + 2);
  ctx.lineTo(px + pw, py + 5);
  ctx.closePath();
  ctx.fill();

  // Campanas de viento oscilantes en las puntas de los aleros
  const sway = Math.sin(frame * 0.08) * 1.5;
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 4 + sway, py + 2, 2, 4);
  ctx.fillRect(px + pw + 2 + sway, py + 2, 2, 4);

  // Manto sutil de nieve fresca en la cumbrera
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 8, py - 1, pw - 16, 2);
}

// 13. TERRAZA DE MÁRMOL BLANCO Y ORO DE SHAMBHALA
function drawShambhalaMarbleTerrace(ctx, px, py, pw, ph, p, frame) {
  // Base de roca basalto y mármol
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py + 8, pw, ph - 8);

  // Bloque de mármol blanco puro de Shambhala
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(px, py + 3, pw, ph - 3);

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px, py, pw, 7);

  // Cenefa ornamental de oro y lapislázuli
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px, py + 6, pw, 2);
  for (let gx = px + 12; gx < px + pw - 8; gx += 20) {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(gx, py + 6, 3, 2);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(gx + 4, py + 6, 2, 2);
  }

  // Reflejo pulido en la superficie
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, py, pw, 2);
  for (let sx = px + 10; sx < px + pw - 10; sx += 32) {
    if ((sx + frame) % 50 < 15) {
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(sx, py + 1, 4, 1);
      ctx.fillStyle = '#ffffff';
    }
  }
}

// 14. PUENTE CEREMONIAL DE SHAMBHALA (MADERA ROJA, ORO Y BARANDILLAS)
function drawShambhalaBridge(ctx, px, py, pw, ph, p, frame) {
  // Viga maestra de madera lacada rojo carmesí
  ctx.fillStyle = '#7f1d1d';
  ctx.fillRect(px, py + 6, pw, ph - 6);

  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px, py + 3, pw, 5);

  // Tablones de paso
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px, py + 1, pw, 3);
  for (let bx = px + 6; bx < px + pw; bx += 10) {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(bx, py + 1, 1, 4);
  }

  // Barandillas de madera roja y adornos de oro
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px, py - 6, pw, 2);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px, py - 7, pw, 1);

  // Postes con remates dorados
  for (let px_post = px + 6; px_post < px + pw; px_post += 18) {
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(px_post, py - 6, 2, 7);
    ctx.fillStyle = '#fde047';
    ctx.fillRect(px_post - 1, py - 9, 4, 3);
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawSnowPlatform,
    drawSnowGround,
    drawSnowBank,
    drawIceRock,
    drawAlpineBridge,
    drawIcePillar,
    drawIceCrystal,
    drawFrozenLakeIce,
    drawRainbowIcePlatform,
    drawCrackingIce,
    drawBounceCrystal,
    drawAluminumLadderBridge,
    drawCrystalLotusPad,
    drawShambhalaPagodaRoof,
    drawShambhalaMarbleTerrace,
    drawShambhalaBridge
  };
}


// --- MODULO: src/render/platforms.js ---
function drawPlatform(p) {
  // Frustum Culling ultrarrápido: descartar plataformas fuera de la pantalla
  if (p.x + p.w < cameraX - 60 || p.x > cameraX + W + 60 || p.y + p.h < cameraY - 60 || p.y > cameraY + H + 60) {
    return;
  }

  // Plataformas especializadas del megatsunami y desastre urbano
  if (typeof drawDisasterPlatform === 'function' && drawDisasterPlatform(ctx, p, globalFrame)) {
    return;
  }

  // Plataformas especializadas de nieve y alta montaña (Everest)
  if (typeof drawSnowPlatform === 'function' && drawSnowPlatform(ctx, p, globalFrame)) {
    return;
  }

  const isVolcano = level.theme === 'volcano' || p.type === 'volcano';

  if (isVolcano && p.oneWay) {
    if (p.w >= 180) {
      ctx.fillStyle = 'rgba(22, 11, 20, 0.72)';
      ctx.fillRect(p.x + 14, p.y + p.h, 14, 72);
      ctx.fillRect(p.x + p.w - 28, p.y + p.h, 14, 72);
    }

    ctx.fillStyle = '#14101c';
    ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);

    ctx.fillStyle = '#2d1e3e';
    ctx.fillRect(p.x, p.y, p.w, p.h);

    ctx.fillStyle = '#8f143c';
    ctx.fillRect(p.x, p.y, p.w, 5);
    ctx.fillStyle = '#b31b52';
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(p.x + 2, p.y, p.w - 4, 1);

    for (let rx = p.x + 10; rx < p.x + p.w - 14; rx += 28) {
      ctx.fillStyle = '#191024';
      ctx.fillRect(rx, p.y + 5, 12, p.h - 5);
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(rx + 5, p.y + 7, 2, 2);

      const vineH = 5 + ((rx * 13) % 9);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(rx + 4, p.y + p.h, 3, vineH);
      if (rx % 56 === 10) {
        ctx.fillStyle = p.y > 900 && p.y < 1200 ? '#00f5d4' : '#ff5400';
        ctx.fillRect(rx + 5, p.y + p.h + vineH - 2, 2, 2);
      }
    }

    for (let gx = p.x + 12; gx < p.x + p.w - 12; gx += 26) {
      const isCrystalZone = p.y > 900 && p.y < 1200;
      ctx.fillStyle = isCrystalZone ? '#00b4d8' : '#9d0208';
      ctx.fillRect(gx, p.y - 2, 3, 2);
      if (gx % 52 < 26) {
        ctx.fillStyle = isCrystalZone ? '#90e0ef' : '#ffd166';
        ctx.fillRect(gx + 1, p.y - 3, 1, 2);
      }
    }
    return;
  }

  // ==========================================================================
  // 🌸 PLATAFORMAS AÉREAS ÚNICAS POR FASE EN EL MUNDO 1 (JARDÍN DE LOS LIRIOS)
  if (!isVolcano && p.oneWay) {
    if (p.subType === 'wood_pergola') {
      const reach = 95;
      if (p._groundLeft === undefined) {
        p._groundLeft = getGroundYUnder(p.x + 11, p.y + p.h, reach);
        p._groundRight = getGroundYUnder(p.x + p.w - 11, p.y + p.h, reach);
      }
      const groundLeft = p._groundLeft;
      const groundRight = p._groundRight;

      if (groundLeft !== null && groundRight !== null) {
        const postHLeft = groundLeft - (p.y + p.h);
        const postHRight = groundRight - (p.y + p.h);

        // Postes de madera lacada oscura
        ctx.fillStyle = 'rgba(38, 20, 16, 0.85)';
        ctx.fillRect(p.x + 8, p.y + p.h, 6, postHLeft);
        ctx.fillRect(p.x + p.w - 14, p.y + p.h, 6, postHRight);

        // Vetas y relieve de los postes
        ctx.fillStyle = '#583101';
        ctx.fillRect(p.x + 9, p.y + p.h, 2, postHLeft);
        ctx.fillRect(p.x + p.w - 13, p.y + p.h, 2, postHRight);

        // Base izquierda: si cae en agua (y >= 250) dibuja ondas acuáticas; si cae en tierra, base de piedra tallada
        if (groundLeft >= 250) {
          ctx.fillStyle = '#2d6a4f';
          ctx.fillRect(p.x + 6, groundLeft - 2, 10, 2);
          ctx.fillStyle = '#90e0ef';
          ctx.fillRect(p.x + 5, groundLeft, 12, 1);
        } else {
          ctx.fillStyle = '#14101c';
          ctx.fillRect(p.x + 5, groundLeft - 5, 12, 5);
          ctx.fillStyle = '#6c757d';
          ctx.fillRect(p.x + 6, groundLeft - 4, 10, 4);
          ctx.fillStyle = '#adb5bd';
          ctx.fillRect(p.x + 7, groundLeft - 4, 8, 1);
        }

        // Base derecha
        if (groundRight >= 250) {
          ctx.fillStyle = '#2d6a4f';
          ctx.fillRect(p.x + p.w - 16, groundRight - 2, 10, 2);
          ctx.fillStyle = '#90e0ef';
          ctx.fillRect(p.x + p.w - 17, groundRight, 12, 1);
        } else {
          ctx.fillStyle = '#14101c';
          ctx.fillRect(p.x + p.w - 17, groundRight - 5, 12, 5);
          ctx.fillStyle = '#6c757d';
          ctx.fillRect(p.x + p.w - 16, groundRight - 4, 10, 4);
          ctx.fillStyle = '#adb5bd';
          ctx.fillRect(p.x + p.w - 15, groundRight - 4, 8, 1);
        }
      } else {
        // Mirador en las copas de los árboles: ménsulas ornamentales cantilever japonesas (Kigumi)
        ctx.fillStyle = '#14101c';
        ctx.fillRect(p.x + 6, p.y + p.h, 10, 9);
        ctx.fillRect(p.x + p.w - 16, p.y + p.h, 10, 9);
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(p.x + 7, p.y + p.h, 8, 8);
        ctx.fillRect(p.x + p.w - 15, p.y + p.h, 8, 8);
        ctx.fillStyle = '#ba181b';
        ctx.fillRect(p.x + 8, p.y + p.h + 1, 6, 6);
        ctx.fillRect(p.x + p.w - 14, p.y + p.h + 1, 6, 6);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(p.x + 9, p.y + p.h + 5, 4, 2);
        ctx.fillRect(p.x + p.w - 13, p.y + p.h + 5, 4, 2);
      }

      // Silueta exterior de la plataforma con aleros alados hacia arriba estilo pagoda
      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 4, p.y - 1, p.w + 8, p.h + 2);
      ctx.fillRect(p.x - 7, p.y - 3, 5, 4);
      ctx.fillRect(p.x + p.w + 2, p.y - 3, 5, 4);

      // Viga principal de cedro rojo lacado con remates dorados
      ctx.fillStyle = '#ba181b';
      ctx.fillRect(p.x - 2, p.y + 1, p.w + 4, p.h - 2);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x - 6, p.y - 2, 4, 3);
      ctx.fillRect(p.x + p.w + 2, p.y - 2, 4, 3);

      // Tablones de madera pulida con uniones
      ctx.fillStyle = '#583101';
      ctx.fillRect(p.x, p.y + 3, p.w, p.h - 5);
      for (let bx = p.x + 12; bx < p.x + p.w - 8; bx += 14) {
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(bx, p.y + 3, 1, p.h - 5);
      }

      // Cubierta superior tradicional de cedro lacado rojo y alfombra de pétalos de sakura (100% SAKURA)
      ctx.fillStyle = '#9d0208';
      ctx.fillRect(p.x, p.y, p.w, 3);
      ctx.fillStyle = '#ff758f';
      ctx.fillRect(p.x + 1, p.y, p.w - 2, 2);
      ctx.fillStyle = '#ffccd5';
      ctx.fillRect(p.x + 2, p.y, p.w - 4, 1);

      // Pétalos de flor de cerezo dispersos sobre la pasarela
      for (let px = p.x + 6; px < p.x + p.w - 6; px += 10) {
        ctx.fillStyle = (px % 20 === 6) ? '#ffffff' : '#ff8fab';
        ctx.fillRect(px, p.y - 1, 3, 2);
        if (px % 30 === 6) {
          ctx.fillStyle = '#ff758f';
          ctx.fillRect(px + 1, p.y - 2, 2, 1);
        }
      }

      // Faroles de papel rojos (Chōchin) elegantes y compactos bajo la pérgola (sin amontonar)
      if (p.w >= 60) {
        const lanternXs = p.w >= 100 ? [p.x + 18, p.x + p.w - 24] : [p.x + Math.floor(p.w / 2) - 4];
        for (const lx of lanternXs) {
          const swayL = Math.sin(globalFrame * 0.08 + lx) * 1;
          ctx.fillStyle = '#14101c';
          ctx.fillRect(lx + 2, p.y + p.h, 2, 3);
          ctx.fillStyle = '#e63946';
          ctx.fillRect(lx + swayL, p.y + p.h + 3, 6, 7);
          ctx.fillStyle = '#ffd166';
          ctx.fillRect(lx + 1 + swayL, p.y + p.h + 5, 4, 3);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(lx + 2 + swayL, p.y + p.h + 6, 2, 1);
        }
      }
      return;
    }

    if (p.subType === 'lotus_pad') {
      // 🦋 FASE 2: Hoja de Loto Gigante Flotante con Flor de Loto en el Borde
      // Tallo acuático subacuático bajo la gran hoja de loto
      ctx.fillStyle = 'rgba(27, 67, 50, 0.75)';
      ctx.fillRect(p.x + Math.floor(p.w / 2) - 4, p.y + p.h, 8, 56);

      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 2, p.y, p.w + 4, p.h);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(p.x, p.y + 1, p.w, p.h - 2);
      ctx.fillStyle = '#40916c';
      ctx.fillRect(p.x + 3, p.y, p.w - 6, 7);
      ctx.fillStyle = '#74c69d';
      ctx.fillRect(p.x + 6, p.y, p.w - 12, 3);
      // Nervaduras de la hoja de nenúfar y gotas de rocío cian
      for (let lx = p.x + 16; lx < p.x + p.w - 16; lx += 24) {
        ctx.fillStyle = '#95d5b2';
        ctx.fillRect(lx, p.y + 4, 10, 2);
        ctx.fillStyle = '#00f5d4';
        ctx.fillRect(lx + 4, p.y - 2, 3, 2);
      }
      // Capullo de loto rosado en el extremo de la hoja
      ctx.fillStyle = '#ff4d6d';
      ctx.fillRect(p.x + 8, p.y - 6, 10, 6);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(p.x + 10, p.y - 8, 6, 5);
      return;
    }

    if (p.subType === 'greenhouse') {
      // 🦋 FASE 2: Pasarela Victoriana de Hierro Forjado Verde y Cristal Luminoso
      const groundDist = Math.max(36, 235 - (p.y + p.h));
      ctx.fillStyle = 'rgba(27, 67, 50, 0.72)';
      ctx.fillRect(p.x + 10, p.y + p.h, 6, groundDist);
      ctx.fillRect(p.x + p.w - 16, p.y + p.h, 6, groundDist);

      // Ménsulas y anclajes ornamentales de hierro forjado
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(p.x + 6, p.y + p.h, 14, 4);
      ctx.fillRect(p.x + p.w - 20, p.y + p.h, 14, 4);

      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(p.x, p.y, p.w, p.h);

      // Paneles de cristal celeste iluminado con marco de celosía
      for (let gx = p.x + 6; gx < p.x + p.w - 14; gx += 18) {
        ctx.fillStyle = '#48cae4';
        ctx.fillRect(gx, p.y + 4, 12, p.h - 7);
        ctx.fillStyle = '#caf0f8';
        ctx.fillRect(gx + 2, p.y + 5, 4, 3);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(gx + 3, p.y + 5, 1, 1);
      }
      ctx.fillStyle = '#52b788';
      ctx.fillRect(p.x, p.y, p.w, 3);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(p.x, p.y, p.w, 1);
      return;
    }

    if (p.subType === 'royal_gazebo') {
      // 🌹 FASE 3: Glorieta Real de Mármol Blanco, Columnas Corintias y Rosas Reales
      // (SU TECHO BLOQUEA EL LÁSER DE HOMELANDER Y CREA UN CAMPO DE FUERZA DEFENSIVO)
      const groundDist = Math.max(24, 220 - (p.y + p.h));

      // Columnas traseras de mármol
      ctx.fillStyle = 'rgba(180, 195, 190, 0.72)';
      ctx.fillRect(p.x + 12, p.y + p.h, 6, groundDist);
      ctx.fillRect(p.x + p.w - 18, p.y + p.h, 6, groundDist);

      // Columnas frontales acanaladas
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + 4, p.y + p.h, 8, groundDist);
      ctx.fillRect(p.x + p.w - 12, p.y + p.h, 8, groundDist);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(p.x + 6, p.y + p.h, 2, groundDist);
      ctx.fillRect(p.x + p.w - 10, p.y + p.h, 2, groundDist);
      // Capiteles y basas doradas
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x + 2, p.y + p.h, 12, 3);
      ctx.fillRect(p.x + p.w - 14, p.y + p.h, 12, 3);
      ctx.fillRect(p.x + 2, p.y + p.h + groundDist - 3, 12, 3);
      ctx.fillRect(p.x + p.w - 14, p.y + p.h + groundDist - 3, 12, 3);

      // Enredaderas de rosas carmesí trepando por las columnas
      for (let ry = p.y + p.h + 8; ry < p.y + p.h + groundDist - 6; ry += 12) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(p.x + 3, ry, 10, 3);
        ctx.fillRect(p.x + p.w - 13, ry, 10, 3);
        ctx.fillStyle = ry % 24 === 8 ? '#e63946' : '#ff758f';
        ctx.fillRect(p.x + 6, ry - 1, 4, 3);
        ctx.fillRect(p.x + p.w - 10, ry - 1, 4, 3);
      }

      // 🕯️ Lámpara / Candelabro Imperial colgante en el centro con luz cálida
      const centerX = p.x + Math.floor(p.w / 2);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(centerX - 1, p.y + p.h, 2, 9);
      ctx.fillStyle = '#e5b80b';
      ctx.fillRect(centerX - 4, p.y + p.h + 9, 8, 3);
      // Cristales colgantes
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(centerX - 3, p.y + p.h + 12, 2, 4);
      ctx.fillRect(centerX + 1, p.y + p.h + 12, 2, 4);
      // Núcleo de luz cálida
      const lightPulse = Math.sin(globalFrame * 0.08) * 0.15;
      const radGrad = ctx.createRadialGradient(centerX, p.y + p.h + 12, 2, centerX, p.y + p.h + 18, 42);
      radGrad.addColorStop(0, `rgba(255, 230, 109, ${0.45 + lightPulse})`);
      radGrad.addColorStop(0.5, `rgba(255, 183, 3, ${0.18 + lightPulse * 0.5})`);
      radGrad.addColorStop(1, 'rgba(255, 183, 3, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(centerX, p.y + p.h + 14, 42, 0, Math.PI * 2);
      ctx.fill();

      // Techo / Cornisa blindada de mármol blanco, oro y tejas festoneadas
      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 3, p.y - 2, p.w + 6, p.h + 3);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(p.x - 1, p.y, p.w + 2, p.h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + 1, p.y + 1, p.w - 2, 4);
      // Relieve dorado y friso carmesí
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x - 2, p.y + p.h - 3, p.w + 4, 3);
      ctx.fillStyle = '#b7094c';
      ctx.fillRect(p.x + 4, p.y + 2, p.w - 8, 2);

      // Tejas festoneadas en la cresta del tejado
      for (let tx = p.x + 3; tx < p.x + p.w - 5; tx += 8) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(tx, p.y - 2, 6, 2);
        ctx.fillStyle = '#c5d3cb';
        ctx.fillRect(tx + 1, p.y - 1, 4, 1);
      }

      // Rosas reales y hiedra sobre la cornisa
      for (let rx = p.x + 6; rx < p.x + p.w - 6; rx += 14) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(rx - 2, p.y - 3, 6, 3);
        ctx.fillStyle = '#e63946';
        ctx.fillRect(rx, p.y - 4, 3, 3);
      }

      // 🛡️ BARRERA / RESPLANDOR DEFENSIVO si Homelander está cargando o disparando su láser
      const isHomelanderAttacking = homelander && (homelander.phase === 'charging' || homelander.phase === 'firing');
      if (isHomelanderAttacking) {
        const shieldAlpha = homelander.phase === 'firing' ? (0.65 + Math.sin(globalFrame * 0.3) * 0.25) : (0.35 + Math.sin(globalFrame * 0.15) * 0.15);
        ctx.fillStyle = `rgba(144, 224, 239, ${shieldAlpha.toFixed(2)})`;
        ctx.fillRect(p.x - 4, p.y - 4, p.w + 8, 4);
        ctx.fillStyle = `rgba(255, 255, 255, ${(shieldAlpha * 1.2).toFixed(2)})`;
        ctx.fillRect(p.x, p.y - 3, p.w, 2);
        if (homelander.phase === 'firing' && Math.random() < 0.4) {
          const spX = p.x + Math.random() * p.w;
          ctx.fillStyle = '#caf0f8';
          ctx.fillRect(spX, p.y - 6, 2, 3);
        }
      }

      return;
    }

    if (p.subType === 'royal_marble') {
      // 🌹 FASE 3: Balcón Aéreo de Mármol Blanco y Oro en la Corte Real
      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 2, p.y - 1, p.w + 4, p.h + 2);

      // Ménsulas de soporte clásicas debajo del balcón
      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x + 4, p.y + p.h, 8, 7);
      ctx.fillRect(p.x + p.w - 12, p.y + p.h, 8, 7);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(p.x + 5, p.y + p.h, 6, 6);
      ctx.fillRect(p.x + p.w - 11, p.y + p.h, 6, 6);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x + 6, p.y + p.h + 4, 4, 2);
      ctx.fillRect(p.x + p.w - 10, p.y + p.h + 4, 4, 2);

      // Losa del balcón de mármol blanco
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + 1, p.y + 1, p.w - 2, 3);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x, p.y + p.h - 3, p.w, 3);
      ctx.fillStyle = '#b7094c';
      ctx.fillRect(p.x + 2, p.y + 2, p.w - 4, 2);

      // Rosas reales en el balcón
      for (let rx = p.x + 4; rx < p.x + p.w - 6; rx += 14) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(rx, p.y - 2, 6, 2);
        ctx.fillStyle = '#ff758f';
        ctx.fillRect(rx + 1, p.y - 3, 4, 2);
      }
      return;
    }

    if (p.subType === 'city_awning') {
      // 🏬 MUNDO 3: Toldo Comercial Náutico Rayado de Tienda Boulevard
      ctx.fillStyle = '#07020a';
      ctx.fillRect(p.x - 2, p.y - 1, p.w + 4, p.h + 2);

      // Franjas alternadas blanco puro (#ffffff) y azul marino (#0077b6)
      for (let ax = p.x; ax < p.x + p.w; ax += 12) {
        const stripeW = Math.min(12, p.x + p.w - ax);
        const isWhite = (Math.floor(ax / 12) % 2 === 0);
        ctx.fillStyle = isWhite ? '#ffffff' : '#0077b6';
        ctx.fillRect(ax, p.y, stripeW, p.h);
        ctx.fillStyle = isWhite ? '#e2eafc' : '#005f73';
        ctx.fillRect(ax, p.y + p.h - 3, stripeW, 3);
      }
      // Borde festoneado inferior en blanco puro
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x, p.y + p.h - 1, p.w, 1);
      // Soportes diagonales de latón pulido hacia la pared
      ctx.fillStyle = '#c4923e';
      ctx.fillRect(p.x + 3, p.y + p.h, 2, 8);
      ctx.fillRect(p.x + p.w - 5, p.y + p.h, 2, 8);
      return;
    }

    if (p.subType === 'coastal_boardwalk') {
      // 🌊 MUNDO 3: Pasarela Elevada del Malecón y Mirador Náutico en Madera de Teca
      ctx.fillStyle = '#4a2810';
      ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
      ctx.fillStyle = '#a26e3c';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#7f4f24';
      ctx.fillRect(p.x, p.y + 4, p.w, p.h - 4);
      ctx.fillStyle = '#c48b4f';
      ctx.fillRect(p.x, p.y, p.w, 3);
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(p.x, p.y + 1, p.w, 1);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + 2, p.y, p.w - 4, 1);
      for (let bx = p.x + 14; bx < p.x + p.w - 10; bx += 22) {
        ctx.fillStyle = '#583110';
        ctx.fillRect(bx, p.y + 4, 2, p.h - 4);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(bx - 1, p.y + 6, 4, 2);
      }
      return;
    }

    if (p.subType === 'city_building') {
      // 🏢 MUNDO 3: Cornisa y Azotea Elevada de Edificio Costero
      ctx.fillStyle = '#495057';
      ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#ced4da';
      ctx.fillRect(p.x, p.y + 4, p.w, p.h - 4);
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(p.x, p.y, p.w, 3);
      ctx.fillStyle = '#90e0ef';
      ctx.fillRect(p.x, p.y + 1, p.w, 1);
      return;
    }

    if (p.subType === 'driftwood_plank') {
      // MUNDO 3 - FASE 2: Pasarela y Plataforma Elevada de Deriva Marina
      if (p.y < 210) {
        ctx.fillStyle = '#5c4033';
        ctx.fillRect(p.x + 8, p.y + p.h, 4, 220 - (p.y + p.h));
        ctx.fillRect(p.x + p.w - 12, p.y + p.h, 4, 220 - (p.y + p.h));
        ctx.fillStyle = '#7f5539';
        ctx.fillRect(p.x + 9, p.y + p.h, 2, 220 - (p.y + p.h));
        ctx.fillRect(p.x + p.w - 11, p.y + p.h, 2, 220 - (p.y + p.h));
      }
      ctx.fillStyle = '#5c4033';
      ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
      ctx.fillStyle = '#ddb892';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#b08968';
      ctx.fillRect(p.x, p.y + 4, p.w, p.h - 4);
      ctx.fillStyle = '#ede0d4';
      ctx.fillRect(p.x + 2, p.y, p.w - 4, 1);
      for (let kx = p.x + 14; kx < p.x + p.w - 14; kx += 32) {
        ctx.fillStyle = '#7f5539';
        ctx.fillRect(kx, p.y + 3, 3, 3);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(kx + 1, p.y + 4, 1, 1);
      }
      return;
    }
  }

  // Detección de plataformas adyacentes continuas para evitar costuras verticales
  let hasNeighborLeft = false;
  let hasNeighborRight = false;
  if (level && level.platforms) {
    for (let i = 0; i < level.platforms.length; i++) {
      const other = level.platforms[i];
      if (other !== p && !other.oneWay && !p.oneWay && other.y === p.y) {
        if (Math.abs(other.x + other.w - p.x) <= 2) hasNeighborLeft = true;
        if (Math.abs(p.x + p.w - other.x) <= 2) hasNeighborRight = true;
      }
    }
  }

  const borderLeft = hasNeighborLeft ? p.x : p.x - 1;
  const borderRight = hasNeighborRight ? p.x + p.w : p.x + p.w + 1;
  const borderW = borderRight - borderLeft;

  ctx.fillStyle = '#14101c';
  ctx.fillRect(borderLeft, p.y - 1, borderW, p.h + 2);

  if (isVolcano) {
    ctx.fillStyle = '#2b1620';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#1b0d14';
    ctx.fillRect(p.x, p.y + 7, p.w, p.h - 7);

    if (p.h >= 35) {
      let row = 0;
      for (let by = p.y + 12; by < p.y + p.h - 10; by += 16) {
        const offset = (row % 2) * 16;
        for (let bx = p.x + 6 + offset; bx < p.x + p.w - 24; bx += 32) {
          ctx.fillStyle = '#24111a';
          ctx.fillRect(bx, by, 24, 10);
          ctx.fillStyle = '#2f1723';
          ctx.fillRect(bx + 1, by + 1, 22, 2);
        }
        row++;
      }
    }

    ctx.fillStyle = '#8f143c';
    ctx.fillRect(p.x, p.y, p.w, 6);
    ctx.fillStyle = '#b31b52';
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(p.x, p.y, p.w, 1);

    for (let gx = p.x + 10; gx < p.x + p.w - 10; gx += 22) {
      ctx.fillStyle = '#370617';
      ctx.fillRect(gx, p.y - 2, 4, 2);
      ctx.fillStyle = '#ffcad4';
      ctx.fillRect(gx + 1, p.y, 2, 1);
    }
    return;
  }

  // Suelo del Mundo 1 diferenciado por Fase (Fase 1 Sakura, Fase 2 Muelle Botánico / Lecho Acuático, Fase 3 Mármol Real)
  if (p.subType === 'lotus_pond') {
    // 🌊 Lecho y Canal de Agua Tranquila (Fondo de agua mansa reflectante con limo y guijarros)
    ctx.fillStyle = '#0a1d2e';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#06131f';
    ctx.fillRect(p.x, p.y + 6, p.w, p.h - 6);

    // Guijarros pulidos por el agua y sedimentos del río
    for (let gx = p.x + 8; gx < p.x + p.w - 12; gx += 22) {
      ctx.fillStyle = '#16324f';
      ctx.fillRect(gx, p.y + 4, 12, 3);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(gx + 3, p.y + 3, 6, 2);
    }
  } else if (p.zone === 2) {
    // 🦋 Fase 2: Gran Muelle Botánico Victoriano de Madera Oscura y Mampostería Portuaria
    ctx.fillStyle = '#102232';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#091520';
    ctx.fillRect(p.x, p.y + 10, p.w, p.h - 10);

    // Pilares / pilotes verticales de madera de roble oscuro del muelle con anclajes de hierro
    for (let px = p.x + 8; px < p.x + p.w - 12; px += 28) {
      ctx.fillStyle = '#0a1622';
      ctx.fillRect(px, p.y + 6, 10, p.h - 6);
      ctx.fillStyle = '#162c3f';
      ctx.fillRect(px + 2, p.y + 6, 6, p.h - 6);
      // Remache / anclaje de bronce en la madera
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 4, p.y + 11, 2, 2);
      // Musgo verde en la base del pilote junto al agua
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px - 1, p.y + p.h - 8, 12, 8);
    }

    // Cubierta superior del muelle de tablones de madera pulida y remate verde musgo
    ctx.fillStyle = '#1b3b4b';
    ctx.fillRect(p.x, p.y, p.w, 6);
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(p.x, p.y, p.w, 2);
    ctx.fillStyle = '#40916c';
    ctx.fillRect(p.x, p.y + 2, p.w, 1);
  } else if (p.subType === 'royal_marble' || p.zone === 3) {
    // 🌹 Fase 3: Terraza Imperial de Mosaicos de Mármol Blanco, Cuarzo Rosa y Filigrana Dorada
    ctx.fillStyle = '#2c1e3b';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#1e1429';
    ctx.fillRect(p.x, p.y + 12, p.w, p.h - 12);

    // Mosaico continuo de losas de mármol marfil y cuarzo rosado biseladas (alineado al mundo)
    const tileW = 18;
    const tileGap = 2;
    const tileStep = tileW + tileGap; // 20px
    const startTile = Math.floor(p.x / tileStep) * tileStep;
    for (let mx = startTile; mx < p.x + p.w; mx += tileStep) {
      const drawX = Math.max(p.x, mx);
      const drawW = Math.min(mx + tileW, p.x + p.w) - drawX;
      if (drawW <= 0) continue;
      const tileIndex = Math.floor(mx / tileStep);
      const isQuartz = (tileIndex % 2) !== 0;
      ctx.fillStyle = isQuartz ? '#fcd5ce' : '#f8f9fa';
      ctx.fillRect(drawX, p.y + 7, drawW, p.h - 10);
      ctx.fillStyle = isQuartz ? '#f8edeb' : '#ffffff';
      ctx.fillRect(drawX + 1, p.y + 8, Math.max(1, drawW - 2), 2);
      ctx.fillStyle = isQuartz ? '#e8a598' : '#d8e2dc';
      ctx.fillRect(drawX + 1, p.y + p.h - 5, Math.max(1, drawW - 2), 2);
      if (drawW >= 10 && mx >= p.x) {
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(drawX + Math.floor(drawW / 2) - 1, p.y + 12, 2, 2);
      }
    }

    // Moldura superior continua de filigrana dorada, friso carmesí y césped real podado
    const topX = hasNeighborLeft ? p.x : p.x - 1;
    const topW = (hasNeighborRight ? p.x + p.w : p.x + p.w + 1) - topX;
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(topX, p.y, topW, 2);
    ctx.fillStyle = '#b7094c';
    ctx.fillRect(topX, p.y + 2, topW, 2);
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(topX, p.y + 4, topW, 3);

    // Seto bajo de rosas y pétalos dispersos en el suelo de la corte imperial (alineado al mundo)
    const startRose = Math.floor(p.x / 16) * 16;
    for (let rx = startRose; rx < p.x + p.w; rx += 16) {
      if (rx < p.x - 2 || rx > p.x + p.w - 6) continue;
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(rx, p.y - 1, 8, 2);
      ctx.fillStyle = (Math.floor(rx / 16) % 2 === 0) ? '#ff4d6d' : '#ff758f';
      ctx.fillRect(rx + 2, p.y - 3, 4, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(rx + 3, p.y - 2, 1, 1);
    }
  } else if (p.subType === 'city_asphalt' || p.subType === 'city_sidewalk' || (level && level.theme === 'coastal' && (!p.subType || p.subType === 'grass'))) {
    // 🏙️ MUNDO 3: Avenida de Asfalto Urbano Costero y Aceras Soleadas
    ctx.fillStyle = '#343a40';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#212529';
    ctx.fillRect(p.x, p.y + 8, p.w, p.h - 8);

    // Bordillo de acera biselado en granito blanco y gris claro
    ctx.fillStyle = '#e9ecef';
    ctx.fillRect(p.x, p.y, p.w, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(p.x, p.y, p.w, 1);
    ctx.fillStyle = '#ced4da';
    ctx.fillRect(p.x, p.y + 3, p.w, 1);

    // Franjas de cruce peatonal blanco reflectante (Zebra crossing)
    for (let zx = Math.floor(p.x / 24) * 24; zx < p.x + p.w; zx += 24) {
      if ((Math.floor(zx / 24) % 4) === 0 && zx >= p.x && zx + 14 <= p.x + p.w) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(zx, p.y + 4, 14, 4);
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(zx + 1, p.y + 7, 12, 1);
      }
    }

    // Adoquines de la acera metropolitana soleada
    for (let cx = Math.floor(p.x / 18) * 18; cx < p.x + p.w; cx += 18) {
      if (cx >= p.x && cx + 16 <= p.x + p.w) {
        ctx.fillStyle = '#dee2e6';
        ctx.fillRect(cx, p.y + 11, 16, 7);
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(cx + 1, p.y + 12, 14, 1);
      }
    }
  } else if (p.subType === 'coastal_boardwalk') {
    // 🌊 MUNDO 3: Gran Malecón y Paseo Marítimo de Madera de Teca
    ctx.fillStyle = '#583110';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#7f4f24';
    ctx.fillRect(p.x, p.y + 8, p.w, p.h - 8);

    // Tablones de madera marina pulida con vetas cálidas
    for (let bx = Math.floor(p.x / 16) * 16; bx < p.x + p.w; bx += 16) {
      if (bx >= p.x) {
        const plankW = Math.min(14, p.x + p.w - bx);
        ctx.fillStyle = '#b57639';
        ctx.fillRect(bx, p.y + 2, plankW, p.h - 4);
        ctx.fillStyle = '#d49b5d';
        ctx.fillRect(bx + 1, p.y + 3, Math.max(1, plankW - 2), 2);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(bx + 2, p.y + 6, 2, 2);
      }
    }

    // Remate superior del malecón con franja náutica blanca y teca
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(p.x, p.y, p.w, 2);
    ctx.fillStyle = '#c48b4f';
    ctx.fillRect(p.x, p.y + 2, p.w, 1);
  } else if (p.subType === 'city_building') {
    // 🏢 MUNDO 3: Azoteas de Edificios Costeros de Concreto Claro
    ctx.fillStyle = '#ced4da';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#adb5bd';
    ctx.fillRect(p.x, p.y + 6, p.w, p.h - 6);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(p.x, p.y + 1, p.w, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(p.x, p.y, p.w, 1);
  } else if (p.subType === 'water_puddle' || p.isWater || p.subType === 'ocean_water') {
    // MUNDO 3: Sistema Hidrodinámico de Agua y Olas Realistas de Surf
    if (typeof drawRealisticWaterPlatform === 'function') {
      drawRealisticWaterPlatform(ctx, p, globalFrame);
    } else {
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(p.x, p.y, p.w, p.h);
    }
  } else if (p.subType === 'coastal_shore_sand') {
    // MUNDO 3 - FASE 2: Orilla de Arena Marina Tropical Dorada
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(p.x, p.y + 6, p.w, p.h - 6);

    // Franja superior de arena cálida y dorada soleada
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(p.x, p.y, p.w, 4);
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(p.x, p.y, p.w, 2);
    ctx.fillStyle = '#f4e0a5';
    ctx.fillRect(p.x, p.y, p.w, 1);

    // Destellos de conchas y cuarzo brillante en la arena
    for (let sx = p.x + 12; sx < p.x + p.w - 12; sx += 22) {
      const glint = ((sx * 13) % 7) === 0;
      if (glint) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(sx, p.y + 2, 1, 1);
        ctx.fillStyle = '#fff3b0';
        ctx.fillRect(sx + 1, p.y + 3, 1, 1);
      }
    }
  } else if (p.subType === 'coastal_dune') {
    // MUNDO 3 - FASE 2: Duna de Arena Dorada con Pasto Marino Tropical
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(p.x, p.y + 5, p.w, p.h - 5);
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = '#f4e0a5';
    ctx.fillRect(p.x, p.y, p.w, 1);
    // Pasto marino verde tropical meciéndose con la brisa del mar
    for (let gx = p.x + 8; gx < p.x + p.w - 8; gx += 16) {
      const sway = Math.sin(globalFrame * 0.08 + gx * 0.2) * 1.5;
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(gx + Math.round(sway), p.y - 4, 2, 4);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(gx + Math.round(sway), p.y - 5, 1, 2);
    }
  } else {
    // 🌸 FASE 1: SENDERO SAGRADO DE LOS CEREZOS (100% SAKURA)
    // Base del terreno: piedra de jardín japonés y tierra arcillosa de cerezo
    ctx.fillStyle = '#260f1e';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#190814';
    ctx.fillRect(p.x, p.y + 8, p.w, p.h - 8);

    // Losas de piedra zen y adoquines del sendero
    for (let ex = p.x + 8; ex < p.x + p.w - 18; ex += 24) {
      ctx.fillStyle = '#3d1d33';
      ctx.fillRect(ex, p.y + 11, 16, 6);
      if (ex % 48 === 8) {
        ctx.fillStyle = '#522744';
        ctx.fillRect(ex + 2, p.y + 12, 8, 2);
      }
    }

    // 🌸 100% SAKURA: Manto esponjoso y grueso de pétalos de cerezo caídos sobre el sendero
    ctx.fillStyle = '#a21b5d';
    ctx.fillRect(p.x, p.y, p.w, 6);
    ctx.fillStyle = '#ff758f';
    ctx.fillRect(p.x, p.y, p.w, 4);
    ctx.fillStyle = '#ffccd5';
    ctx.fillRect(p.x, p.y, p.w, 2);

    // Flores de cerezo completas y cúmulos de pétalos recién caídos
    const flowerStart = p.x + (hasNeighborLeft ? 2 : 6);
    const flowerEnd = p.x + p.w - (hasNeighborRight ? 2 : 8);
    for (let sx = flowerStart; sx < flowerEnd; sx += 12) {
      const isWhite = (sx % 24 === 6);
      ctx.fillStyle = isWhite ? '#ffffff' : '#ffcad4';
      ctx.fillRect(sx, p.y - 2, 4, 3);
      ctx.fillRect(sx + 1, p.y - 3, 2, 1);
      ctx.fillStyle = '#ff4d6d';
      ctx.fillRect(sx + 1, p.y - 1, 2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx + 1, p.y - 1, 1, 1);
    }
  }
}


// --- MODULO: src/render/hazards/lava_vortex.js ---
// ============================================================================
// VÓRTICE DE LLAMAS ROSAS OSCURAS (CASCADAS Y PAREDES DE LAVA DEL VOLCÁN)
// ============================================================================
// Efecto de vórtice ciclónico 3D con 4 hebras de fuego helicoidales entrelazadas,
// núcleo incandescente blanco/magenta, ascuas orbitales y brocales de obsidiana.

function drawLavaWall(lw) {
  if (lw.x + lw.w < cameraX - 50 || lw.x > cameraX + W + 50) return;

  const cx = Math.round(lw.x + lw.w / 2);
  const halfW = lw.w / 2;
  const topY = lw.y;
  const botY = lw.y + lw.h;

  // 1. Silueta exterior y aura de sombra oscura / vacío
  ctx.fillStyle = '#0c020e';
  ctx.fillRect(lw.x - 3, topY, lw.w + 6, lw.h);

  // 2. Fondo del cuerpo de magma: vino oscuro y borgoña profundo
  ctx.fillStyle = '#2c041c';
  ctx.fillRect(lw.x - 1, topY, lw.w + 2, lw.h);
  ctx.fillStyle = '#5c0c2e';
  ctx.fillRect(lw.x + 1, topY, lw.w - 2, lw.h);

  // 3. VÓRTICE HELICOIDAL 3D (4 hebras entrelazadas que giran en espiral)
  const strandCount = 4;
  const stepY = 3;

  for (let s = 0; s < strandCount; s++) {
    const strandPhase = s * (Math.PI * 2 / strandCount);

    for (let y = topY; y < botY - stepY; y += stepY) {
      // Ángulo de rotación del vórtice dependiente de la altura y el tiempo
      const angle = (y * 0.075) - (globalFrame * 0.16) + strandPhase;
      const sinA = Math.sin(angle);
      const cosA = Math.cos(angle);

      // Posición horizontal de la hebra dentro de la columna
      const sx = Math.round(cx + sinA * (halfW - 3));

      if (cosA < -0.2) {
        // Hebra en la parte POSTERIOR del vórtice (sombra carmesí profunda)
        ctx.fillStyle = '#7a103c';
        ctx.fillRect(sx - 1, y, 2, stepY);
      } else {
        // Hebra en la parte FRONTAL del vórtice (brillante y expansiva)
        const frontWidth = cosA > 0.6 ? 4 : 3;
        
        // Capa base de llama rosa oscura
        ctx.fillStyle = '#b31b52';
        ctx.fillRect(sx - Math.floor(frontWidth / 2), y, frontWidth, stepY);

        // Filamento ígneo magenta vivo
        ctx.fillStyle = '#ff2a70';
        ctx.fillRect(sx - 1, y, 2, stepY);

        // Cresta incandescente blanca/rosa pastel en el ápice del giro
        if (cosA > 0.75) {
          ctx.fillStyle = (y + globalFrame) % 6 < 3 ? '#ffffff' : '#ffcad4';
          ctx.fillRect(sx, y, 1, stepY);
        }
      }
    }
  }

  // 4. Núcleo central palpitante (Ojo del Vórtice)
  const corePulse = Math.sin(globalFrame * 0.18) * 1.5;
  const coreW = Math.max(2, Math.round(halfW * 0.45 + corePulse));
  ctx.fillStyle = 'rgba(179, 27, 82, 0.6)';
  ctx.fillRect(cx - Math.floor(coreW / 2), topY, coreW, lw.h);
  ctx.fillStyle = 'rgba(255, 42, 112, 0.45)';
  ctx.fillRect(cx - 1, topY, 2, lw.h);

  // 5. Ascuas orbitales que ascienden en espiral ciclónica alrededor del vórtice
  const emberCount = 6;
  for (let i = 0; i < emberCount; i++) {
    const orbitSpeed = 0.12 + (i % 3) * 0.02;
    const orbAng = globalFrame * orbitSpeed + (i * Math.PI * 2 / emberCount);
    const riseY = (topY + lw.h - ((globalFrame * 1.8 + i * 22) % lw.h));
    const orbRadius = halfW + 3 + Math.sin(globalFrame * 0.1 + i) * 2;
    const ex = Math.round(cx + Math.cos(orbAng) * orbRadius);
    const inFront = Math.sin(orbAng) > 0;

    if (inFront) {
      ctx.fillStyle = i % 2 === 0 ? '#ffffff' : '#ffcad4';
      ctx.fillRect(ex, Math.round(riseY), 2, 2);
    } else {
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(ex, Math.round(riseY), 1, 1);
    }
  }

  // 6. Brocal superior de roca volcánica (Gárgola / Dintel de Obsidiana)
  ctx.fillStyle = '#07020a';
  ctx.fillRect(lw.x - 5, topY - 5, lw.w + 10, 7);
  ctx.fillStyle = '#26041c';
  ctx.fillRect(lw.x - 3, topY - 4, lw.w + 6, 5);
  ctx.fillStyle = '#b31b52';
  ctx.fillRect(lw.x + 2, topY - 1, lw.w - 4, 2);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(cx - 2, topY - 2, 4, 2);

  // 7. Base de impacto y salpicadura ciclónica (Espuma de magma rosa)
  const splashWave = Math.sin(globalFrame * 0.22) * 2;
  ctx.fillStyle = '#07020a';
  ctx.fillRect(lw.x - 6, botY - 3, lw.w + 12, 6);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(lw.x - 4, botY - 2, lw.w + 8, 4);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(lw.x - 2 + Math.round(splashWave), botY - 1, lw.w + 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 3, botY - 1, 6, 2);
}


// --- MODULO: src/render/hazards/spikes.js ---
// ============================================================================
// PELIGROS: ESPINAS DEL JARDÍN Y FOSOS DE MAGMA / LAVA VOLCÁNICA
// ============================================================================

function drawSpikes(s) {
  if (s.x + s.w < cameraX - 40 || s.x > cameraX + W + 40) return;

  const isSnow = (level && level.theme === 'snow') || s.theme === 'snow' || s.subType === 'ice_spikes';

  // 1. Mar / Foso extenso (Agua gélida del lago o Magma volcánico)
  if (s.w > 200) {
    const waveT = globalFrame * 0.12;

    if (isSnow) {
      // ❄️ Abismo de Aguas Gélidas del Lago Glacial
      ctx.fillStyle = '#051923';
      ctx.fillRect(s.x, s.y, s.w, 40);
      ctx.fillStyle = '#003554';
      ctx.fillRect(s.x, s.y + 3, s.w, 35);
      ctx.fillStyle = '#006494';
      ctx.fillRect(s.x, s.y + 6, s.w, 30);

      // Oleaje de aguas bajo cero con trozos de hielo
      const step = 8;
      for (let x = s.x; x < s.x + s.w; x += step) {
        const h1 = Math.sin((x * 0.04) + waveT) * 2.5;
        const h2 = Math.cos((x * 0.08) - waveT * 0.7) * 1.8;
        const waveY = s.y + h1 + h2;

        ctx.fillStyle = '#0284c7';
        ctx.fillRect(x, Math.round(waveY), step, 6);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(x, Math.round(waveY - 1), step, 3);
        ctx.fillStyle = '#bae6fd';
        ctx.fillRect(x + 1, Math.round(waveY - 2), step - 2, 2);

        // Bloques de hielo flotante en las crestas
        if (h1 + h2 > 2.2) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x + 1, Math.round(waveY - 3), 5, 2);
        }
      }

      // Vapores de frío ártico condensado ascendente
      const mistSeed = Math.floor(globalFrame * 0.12);
      for (let i = 0; i < 6; i++) {
        const mx = s.x + ((mistSeed * 43 + i * 79) % (s.w - 20));
        const my = s.y - 3 - ((globalFrame * 0.5 + i * 6) % 10);
        ctx.fillStyle = 'rgba(202, 240, 248, 0.45)';
        ctx.fillRect(Math.round(mx), Math.round(my), 4, 2);
      }
      return;
    }

    // Fondo del abismo de magma (Volcán)
    ctx.fillStyle = '#0c020e';
    ctx.fillRect(s.x, s.y, s.w, 35);
    ctx.fillStyle = '#2c041c';
    ctx.fillRect(s.x, s.y + 2, s.w, 30);
    ctx.fillStyle = '#5c0c2e';
    ctx.fillRect(s.x, s.y + 5, s.w, 25);

    // Oleaje sinuoso de magma rosa oscuro
    const step = 8;
    for (let x = s.x; x < s.x + s.w; x += step) {
      const h1 = Math.sin((x * 0.05) + waveT) * 3;
      const h2 = Math.cos((x * 0.09) - waveT * 0.8) * 2;
      const waveY = s.y + h1 + h2;

      // Capa de llama rosa oscura
      ctx.fillStyle = '#8f143c';
      ctx.fillRect(x, Math.round(waveY), step, 6);

      // Cresta viva magenta
      ctx.fillStyle = '#b31b52';
      ctx.fillRect(x, Math.round(waveY - 1), step, 3);
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(x + 1, Math.round(waveY - 2), step - 2, 2);

      // Espuma incandescente blanca en picos del oleaje
      if (h1 + h2 > 3.2) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 2, Math.round(waveY - 3), 4, 2);
      }
    }

    // Mini-vórtices de burbujas incandescentes
    const bubbleSeed = Math.floor(globalFrame * 0.15);
    for (let i = 0; i < 5; i++) {
      const bx = s.x + ((bubbleSeed * 37 + i * 83) % (s.w - 20));
      const by = s.y - 2 - ((globalFrame * 0.6 + i * 5) % 8);
      ctx.fillStyle = '#ffcad4';
      ctx.fillRect(Math.round(bx), Math.round(by), 2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(bx) + 1, Math.round(by), 1, 1);
    }
    return;
  }

  const isVolcano = level && level.theme === 'volcano';

  if (isSnow) {
    // ❄️ Estalagmitas y Púas Afiladas de Hielo Glacial Cristalino (Estilo Celeste)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(s.x - 2, s.y + 4, s.w + 4, 6);
    ctx.fillStyle = '#03045e';
    ctx.fillRect(s.x, s.y + 5, s.w, 5);

    const step = 8;
    for (let x = s.x; x < s.x + s.w; x += step) {
      const idx = Math.floor((x - s.x) / step);
      const hVar = (idx % 2 === 0) ? 14 : 11;
      const tilt = (idx % 3 === 0) ? -2 : ((idx % 3 === 1) ? 2 : 0);
      const tipX = x + 4 + tilt;
      const tipY = s.y - hVar + 6;

      // Base oscura de hielo profundo
      ctx.fillStyle = '#023e8a';
      ctx.beginPath();
      ctx.moveTo(x - 1, s.y + 8);
      ctx.lineTo(tipX, tipY - 2);
      ctx.lineTo(x + 9, s.y + 8);
      ctx.closePath();
      ctx.fill();

      // Cono de hielo cian translúcido
      ctx.fillStyle = '#0077b6';
      ctx.beginPath();
      ctx.moveTo(x, s.y + 8);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(x + 8, s.y + 8);
      ctx.closePath();
      ctx.fill();

      // Reflejo cristalino
      ctx.fillStyle = '#90e0ef';
      ctx.beginPath();
      ctx.moveTo(x + 1, s.y + 8);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(tipX + 1, s.y + 8);
      ctx.closePath();
      ctx.fill();

      // Punta afilada y escarcha blanca
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(tipX - 1, tipY, 2, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tipX - 1, tipY - 1, 2, 2);

      // Destello intermitente de luz polar
      if ((idx * 7 + Math.floor(globalFrame * 0.1)) % 10 === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(tipX - 1, tipY - 2, 2, 1);
        ctx.fillStyle = '#caf0f8';
        ctx.fillRect(tipX - 2, tipY - 1, 4, 1);
      }
    }
    return;
  }

  if (!isVolcano) {
    // 🌹 Espinas de Zarzarrosa / Zarzas Espinosas Mortales del Jardín
    ctx.fillStyle = '#14101c';
    ctx.fillRect(s.x - 2, s.y + 4, s.w + 4, 6);
    ctx.fillStyle = '#2b101e';
    ctx.fillRect(s.x, s.y + 5, s.w, 5);

    const step = 8;
    for (let x = s.x; x < s.x + s.w; x += step) {
      const idx = Math.floor((x - s.x) / step);
      const hVar = (idx % 2 === 0) ? 14 : 11;
      const tilt = (idx % 3 === 0) ? -2 : ((idx % 3 === 1) ? 2 : 0);
      const tipX = x + 4 + tilt;
      const tipY = s.y - hVar + 6;

      ctx.fillStyle = '#14101c';
      ctx.beginPath();
      ctx.moveTo(x - 1, s.y + 8);
      ctx.lineTo(tipX, tipY - 2);
      ctx.lineTo(x + 9, s.y + 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#800f2f';
      ctx.beginPath();
      ctx.moveTo(x, s.y + 8);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(x + 8, s.y + 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#c9184a';
      ctx.beginPath();
      ctx.moveTo(x + 1, s.y + 8);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(tipX + 1, s.y + 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ff758f';
      ctx.fillRect(tipX - 1, tipY, 2, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(tipX - 1, tipY - 1, 2, 2);

      if (idx % 2 === 1) {
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(tipX - 3, tipY + 4, 2, 2);
      }
    }

    const dripIdx = Math.floor(globalFrame * 0.1) % Math.max(1, Math.floor(s.w / step));
    const dripX = s.x + dripIdx * step + 4;
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(dripX, s.y + 2, 2, 3);
    return;
  }

  // Volcán: Estalagmitas afiladas de obsidiana y basalto incandescente rosa oscuro
  ctx.fillStyle = '#07020a';
  ctx.fillRect(s.x - 2, s.y + 4, s.w + 4, 6);
  for (let x = s.x; x < s.x + s.w; x += 8) {
    const tipX = x + 4;
    const tipY = s.y - 8;
    ctx.fillStyle = '#07020a';
    ctx.beginPath();
    ctx.moveTo(x - 1, s.y + 8);
    ctx.lineTo(tipX, tipY - 2);
    ctx.lineTo(x + 9, s.y + 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#5c0c2e';
    ctx.beginPath();
    ctx.moveTo(x, s.y + 8);
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(x + 8, s.y + 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#b31b52';
    ctx.fillRect(tipX - 1, tipY, 2, 4);
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(tipX, tipY - 1, 1, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(tipX, tipY - 1, 1, 1);
  }
}


// --- MODULO: src/render/hazards/castle_gate.js ---
// ============================================================================
// PORTÓN DEL CASTILLO DEL JEFE (OMNI-MAN / CASTLE GATE)
// ============================================================================

function drawBossCastleGate(gate) {
  const gx = Math.round(gate.x);
  const gy = Math.round(gate.y);
  const gw = gate.w;
  const gh = gate.h;

  ctx.fillStyle = '#07020a';
  ctx.fillRect(gx - 6, gy - 14, gw + 12, 16);
  ctx.fillStyle = '#26041c';
  ctx.fillRect(gx - 4, gy - 12, gw + 8, 12);
  ctx.fillStyle = bossFightActive ? '#ff2a70' : '#ffd166';
  ctx.fillRect(gx + 4, gy - 8, gw - 8, 4);

  if (bossFightActive && omniMen.length > 0) {
    ctx.fillStyle = 'rgba(12, 2, 14, 0.95)';
    ctx.fillRect(gx, gy, gw, gh);

    for (let bx = gx + 2; bx < gx + gw - 2; bx += 5) {
      ctx.fillStyle = '#07020a';
      ctx.fillRect(bx, gy, 3, gh);
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(bx + 1, gy, 1, gh);
    }
    for (let by = gy + 14; by < gy + gh - 8; by += 22) {
      ctx.fillStyle = '#26041c';
      ctx.fillRect(gx, by, gw, 5);
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(gx + 2, by + 1, gw - 4, 2);
    }
  } else {
    ctx.fillStyle = '#07020a';
    ctx.fillRect(gx + 2, gy, gw - 4, 18);
    for (let bx = gx + 3; bx < gx + gw - 2; bx += 5) {
      ctx.fillStyle = '#5c0c2e';
      ctx.fillRect(bx, gy, 3, 22);
    }
  }
}


// --- MODULO: src/render/hazards/icecream_parlor.js ---
// ============================================================================
// FONDO ARQUITECTONICO DE LA HELADERIA ARTESANAL DE SAMI (MUNDO 3 • FASE 3)
// ============================================================================

function drawIceCreamParlorBackdrop(ctx, viewL, viewR, frame) {
  const pStart = 7300, pEnd = 7750, pFloor = 220, pCeil = 70;
  if (viewR < pStart || viewL > pEnd) return;

  const left = Math.max(pStart, viewL - 10);
  const right = Math.min(pEnd, viewR + 10);
  const width = right - left;

  // 1. Pared interior en degradado calido de salon costero vintage
  const wallGrad = ctx.createLinearGradient(0, pCeil, 0, pFloor);
  wallGrad.addColorStop(0, '#fefae0');
  wallGrad.addColorStop(0.5, '#faedcd');
  wallGrad.addColorStop(1, '#e9d8a6');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(left, pCeil, width, pFloor - pCeil);

  // 2. Ventanales arqueados con vista al cielo soleado y mar turquesa
  const windows = [7440, 7620];
  for (const wx of windows) {
    if (wx + 54 >= left && wx <= right) {
      ctx.fillStyle = '#495057'; ctx.fillRect(wx - 2, pCeil + 18, 56, 76);
      // Cielo azul y mar turquesa a traves del cristal
      const winGrad = ctx.createLinearGradient(0, pCeil + 20, 0, pCeil + 92);
      winGrad.addColorStop(0, '#48cae4');
      winGrad.addColorStop(0.6, '#90e0ef');
      winGrad.addColorStop(0.61, '#0096c7');
      winGrad.addColorStop(1, '#0077b6');
      ctx.fillStyle = winGrad; ctx.fillRect(wx, pCeil + 20, 52, 72);
      // Arco superior
      ctx.fillStyle = '#ffffff'; ctx.fillRect(wx, pCeil + 62, 52, 2); // Horizonte con espuma
      ctx.fillStyle = '#495057'; ctx.fillRect(wx + 25, pCeil + 20, 2, 72);
      ctx.fillRect(wx, pCeil + 54, 52, 2);
    }
  }

  // 3. Moldura de boiserie y zocalo de madera de teca
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(left, 172, width, 48);
  ctx.fillStyle = '#b57639'; ctx.fillRect(left, 170, width, 3);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(left, 173, width, 1);

  // 4. Suelo de baldosas ajedrezadas vintage (turquesa y blanco marfil)
  for (let bx = Math.floor(left / 12) * 12; bx < right; bx += 12) {
    const isAlt = Math.floor(bx / 12) % 2 === 0;
    ctx.fillStyle = isAlt ? '#ffffff' : '#00b4d8';
    ctx.fillRect(bx, 214, 12, 6);
  }

  // 5. Lamparas colgantes de laton con conos de luz calida
  const lamps = [7370, 7470, 7580, 7690];
  for (const lx of lamps) {
    if (lx + 24 >= left && lx - 24 <= right) {
      ctx.fillStyle = '#4a2810'; ctx.fillRect(lx, pCeil, 1, 26);
      ctx.fillStyle = '#ffd166'; ctx.fillRect(lx - 4, pCeil + 26, 9, 4);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(lx - 2, pCeil + 30, 5, 2);
      ctx.fillStyle = 'rgba(255, 235, 120, 0.18)';
      ctx.beginPath();
      ctx.moveTo(lx, pCeil + 32);
      ctx.lineTo(lx - 22, pFloor);
      ctx.lineTo(lx + 22, pFloor);
      ctx.closePath();
      ctx.fill();
    }
  }

  // 6. Gran letrero luminoso en la marquesina de entrada
  const signX = 7320;
  if (signX + 70 >= left && signX <= right) {
    ctx.fillStyle = '#4a2810'; ctx.fillRect(signX - 2, pCeil - 4, 76, 18);
    ctx.fillStyle = '#0077b6'; ctx.fillRect(signX, pCeil - 2, 72, 14);
    ctx.fillStyle = '#00b4d8'; ctx.fillRect(signX + 2, pCeil - 1, 68, 1);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(signX + 6, pCeil + 2, 60, 6);
    // Miniatura de cono de helado en el letrero
    ctx.fillStyle = '#ffffff'; ctx.fillRect(signX + 10, pCeil + 3, 4, 4);
    ctx.fillStyle = '#ffbe0b'; ctx.fillRect(signX + 15, pCeil + 3, 4, 4);
    ctx.fillStyle = '#e63946'; ctx.fillRect(signX + 20, pCeil + 3, 4, 4);
  }

  // 7. Pizarra mural de menu tras el mostrador
  const menuX = 7380;
  if (menuX + 44 >= left && menuX <= right) {
    ctx.fillStyle = '#4a2810'; ctx.fillRect(menuX, 106, 42, 28);
    ctx.fillStyle = '#212529'; ctx.fillRect(menuX + 2, 108, 38, 24);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(menuX + 5, 112, 32, 2);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(menuX + 5, 117, 26, 1);
    ctx.fillRect(menuX + 5, 122, 28, 1);
    ctx.fillStyle = '#90e0ef'; ctx.fillRect(menuX + 5, 126, 20, 1);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawIceCreamParlorBackdrop };
}


// --- MODULO: src/render/hazards/skyscraper_lobby.js ---
// ============================================================================
// FONDO ARQUITECTONICO DEL INTERIOR DEL RASCACIELOS (LOBBY / PLANTA BAJA)
// ============================================================================
function drawSkyscraperLobbyBackdrop(ctx, viewL, viewR, frame) {
  const lobbyStart = 13450, lobbyEnd = 14050, lobbyFloor = 220, lobbyCeil = 64;
  if (viewR < lobbyStart || viewL > lobbyEnd) return;

  const left = Math.max(lobbyStart, viewL - 10);
  const right = Math.min(lobbyEnd, viewR + 10);
  const width = right - left;

  // 1. Superestructura superior de la torre (pisos superiores de hormigón armado, sin fugas de cielo exterior)
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(viewL - 20, 0, (viewR - viewL) + 40, lobbyCeil);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(left, lobbyCeil - 12, width, 12);
  // Casetones de techo con moldura Art-Deco y focos downlight
  for (let bx = Math.floor(left / 32) * 32; bx < right; bx += 32) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(bx + 4, 12, 24, lobbyCeil - 26);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(bx + 6, 14, 20, lobbyCeil - 30);
    // Downlight cálido
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(bx + 14, lobbyCeil - 13, 4, 2);
  }

  // Muros de fachada en los extremos exteriores
  if (viewL < lobbyStart) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(viewL - 20, 0, (lobbyStart - (viewL - 20)), H);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(lobbyStart - 8, 0, 8, H);
  }
  if (viewR > lobbyEnd) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(lobbyEnd, 0, (viewR + 20) - lobbyEnd, H);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(lobbyEnd, 0, 8, H);
  }

  // 2. Pared de fondo del gran vestíbulo en mármol claro elegante
  const wallGrad = ctx.createLinearGradient(0, lobbyCeil, 0, lobbyFloor);
  wallGrad.addColorStop(0, '#f8f9fa'); wallGrad.addColorStop(0.35, '#e9ecef');
  wallGrad.addColorStop(0.7, '#dee2e6'); wallGrad.addColorStop(1, '#ced4da');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(left, lobbyCeil, width, lobbyFloor - lobbyCeil);

  // 3. Grandes ventanales arqueados con vista al mar retirado y cielo de tormenta violeta
  const windows = [13510, 13870];
  for (const wx of windows) {
    if (wx + 65 >= left && wx <= right) {
      ctx.fillStyle = '#1e293b'; ctx.fillRect(wx - 2, lobbyCeil + 18, 64, 84);
      // Vista exterior de la catástrofe inminente (océano retirado y cielo violeta tempestuoso)
      const winGrad = ctx.createLinearGradient(0, lobbyCeil + 20, 0, lobbyCeil + 100);
      winGrad.addColorStop(0, '#10002b');   // Cielo violeta tormentoso
      winGrad.addColorStop(0.40, '#240046');
      winGrad.addColorStop(0.60, '#3c096c');
      winGrad.addColorStop(0.61, '#001233'); // Océano retirado mar adentro
      winGrad.addColorStop(0.75, '#03045e');
      winGrad.addColorStop(0.76, '#2b2622'); // Fondo marino expuesto (arrecifes y bancos de arena secos)
      winGrad.addColorStop(1, '#1e1b18');
      ctx.fillStyle = winGrad; ctx.fillRect(wx, lobbyCeil + 20, 60, 80);

      // Relámpago distante en el ventanal
      if (frame % 180 < 4) {
        ctx.fillStyle = 'rgba(230, 210, 255, 0.45)';
        ctx.fillRect(wx, lobbyCeil + 20, 60, 80);
      }

      // Marcos y maineles de bronce y acero
      ctx.fillStyle = '#475569';
      ctx.fillRect(wx + 29, lobbyCeil + 20, 2, 80);
      ctx.fillRect(wx, lobbyCeil + 55, 60, 2);
      ctx.fillRect(wx, lobbyCeil + 75, 60, 2);
    }
  }

  // 4. Moldura inferior de boiserie y madera de teca
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(left, 174, width, 46);
  ctx.fillStyle = '#b57639'; ctx.fillRect(left, 172, width, 3);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(left, 175, width, 1);

  // 5. Friso superior dorado bajo el techo
  ctx.fillStyle = '#583110'; ctx.fillRect(left, lobbyCeil, width, 8);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(left, lobbyCeil + 7, width, 1.5);
  for (let fx = Math.floor(left / 16) * 16; fx < right; fx += 16) {
    ctx.fillStyle = '#f8f9fa'; ctx.fillRect(fx + 6, lobbyCeil + 2, 4, 3);
  }

  // 5. Columnas monumentales de mármol blanco con capiteles dorados
  const columns = [13460, 13580, 13700, 13820, 13940, 14030];
  for (const cx of columns) {
    if (cx + 14 >= left && cx - 14 <= right) {
      ctx.fillStyle = '#adb5bd'; ctx.fillRect(cx - 7, lobbyCeil + 6, 14, lobbyFloor - lobbyCeil - 6);
      ctx.fillStyle = '#f8f9fa'; ctx.fillRect(cx - 5, lobbyCeil + 8, 10, lobbyFloor - lobbyCeil - 10);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 2, lobbyCeil + 8, 4, lobbyFloor - lobbyCeil - 10);
      ctx.fillStyle = '#ffd166'; ctx.fillRect(cx - 8, lobbyCeil + 7, 16, 5);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 6, lobbyCeil + 8, 12, 2);
      ctx.fillStyle = '#ffd166'; ctx.fillRect(cx - 8, lobbyFloor - 10, 16, 10);
      ctx.fillStyle = '#583110'; ctx.fillRect(cx - 6, lobbyFloor - 8, 12, 8);

      // Aplique de pared con luz cálida
      ctx.fillStyle = '#ffd166'; ctx.fillRect(cx - 2, 128, 4, 6);
      ctx.fillStyle = '#ffffff'; ctx.fillRect(cx - 1, 129, 2, 3);
      ctx.fillStyle = 'rgba(255, 235, 120, 0.18)'; ctx.beginPath();
      ctx.moveTo(cx, 134); ctx.lineTo(cx - 16, lobbyFloor); ctx.lineTo(cx + 16, lobbyFloor);
      ctx.closePath(); ctx.fill();
    }
  }

  // 6. Mural dorado "TORRE CENTRAL BAHIA" sobre la recepcion
  const muralX = 13625;
  if (muralX + 50 >= left && muralX <= right) {
    ctx.fillStyle = '#1d3557'; ctx.fillRect(muralX - 1, 88, 52, 22);
    ctx.fillStyle = '#0077b6'; ctx.fillRect(muralX, 89, 50, 20);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(muralX + 2, 90, 46, 1); ctx.fillRect(muralX + 2, 107, 46, 1);
    ctx.beginPath(); ctx.arc(muralX + 25, 99, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.fillRect(muralX + 10, 102, 30, 2);
  }

  // 7. Alfombra roja de gala sobre el suelo de marmol
  const carpetL = Math.max(13465, left), carpetR = Math.min(14010, right);
  if (carpetR > carpetL) {
    ctx.fillStyle = '#c1121f'; ctx.fillRect(carpetL, lobbyFloor - 3, carpetR - carpetL, 3);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(carpetL, lobbyFloor - 4, carpetR - carpetL, 1);
    ctx.fillRect(carpetL, lobbyFloor, carpetR - carpetL, 1);
  }
}


// --- MODULO: src/render/hazards/atmosphere.js ---
// ============================================================================
// ATMÓSFERA Y CENIZAS EN PRIMER PLANO DEL VOLCÁN
// ============================================================================

function drawVolcanoLandmarks() {
  // Desactivado: los carteles flotantes tapaban la pantalla y se veían borrosos
}

let cachedVolcanoVignette = null;

function getCachedVolcanoVignette() {
  if (!cachedVolcanoVignette) {
    cachedVolcanoVignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.36, W / 2, H / 2, W * 0.62);
    cachedVolcanoVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    cachedVolcanoVignette.addColorStop(1, 'rgba(12, 4, 15, 0.50)');
  }
  return cachedVolcanoVignette;
}

function drawVolcanoForegroundAtmosphere() {
  for (let i = 0; i < 14; i++) {
    const fx = ((i * 97 - cameraX * 1.35 + globalFrame * (0.4 + (i % 3) * 0.2)) % W + W) % W;
    const fy = ((i * 61 - cameraY * 1.25 - globalFrame * 0.55) % H + H) % H;
    ctx.fillStyle = i % 3 === 0 ? 'rgba(255, 202, 212, 0.45)' : 'rgba(255, 42, 112, 0.38)';
    ctx.fillRect(Math.round(fx), Math.round(fy), 3, 3);
  }

  ctx.fillStyle = getCachedVolcanoVignette();
  ctx.fillRect(0, 0, W, H);
}


// --- MODULO: src/render/hazards/blizzard_system.js ---
// ============================================================================
// PELIGRO AMBIENTAL MUNDO 4: VENTISCAS HELADAS PERIÓDICAS (ICE BLIZZARD)
// ============================================================================
// Cada 7 segundos, una furiosa ventisca ártica azota la superficie de la montaña.
// - En superficie: empuja fuertemente a Elizabeth hacia atrás y congela.
// - Bajo la nieve: si Elizabeth cava con la pala (player.isDigging), es 100% inmune.

let blizzardState = {
  active: false,
  cycleTimer: 7.0,
  duration: 2.8,
  timer: 0,
  particles: []
};

function getBlizzardState() {
  return blizzardState;
}

function updateBlizzardSystem(dt) {
  if (gameState !== 'PLAYING' || !level || level.theme !== 'snow') {
    blizzardState.active = false;
    return;
  }

  // En la Fase 6 (Santuario del Yeti), Fase 7 (Valle Sagrado de Shambhala) y Fase 8/9 (Cosmos),
  // el clima está protegido o fuera de la atmósfera montañosa.
  if (player.x >= 23700) {
    blizzardState.active = false;
    return;
  }

  blizzardState.cycleTimer -= dt;
  if (blizzardState.cycleTimer <= 0) {
    if (!blizzardState.active) {
      blizzardState.active = true;
      blizzardState.timer = blizzardState.duration;
      triggerShake(0.15, 2.0);
      if (window.sfx && window.sfx.playWaterSplash) window.sfx.playWaterSplash();
      const warnMsg = (player && player.ability === 'ice_pick')
        ? '¡VENTISCA HELADA! ¡CLAVA EL PICO CON [ABAJO] O REFÚGIATE!'
        : '¡VENTISCA HELADA! ¡CAVA BAJO LA NIEVE O REFÚGIATE!';
      spawnFloatingText(player.x - 45, player.y - 18, warnMsg, '#caf0f8');
    }
  }

  if (blizzardState.active) {
    blizzardState.timer -= dt;

    // Resistencia del viento helado: Cabañas, templos, tiendas, anclaje de pico y túneles subterráneos resguardan
    let isSheltered = (player.isDigging) || (player.x < 420);

    // Mecánica única de Alta Montaña: Clavar el Pico de Hielo en el permafrost con [ABAJO]
    const isIceAnchored = (player.ability === 'ice_pick' && player.onGround && (keys.down || keys.downJustPressed));
    if (isIceAnchored) {
      isSheltered = true;
      player.vx = 0;
      if (globalFrame % 8 === 0) {
        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(player.x + (player.facingRight ? 18 : 2), player.y + 22, 2, '#38bdf8');
          spawnStarSparkles(player.x + (player.facingRight ? 18 : 2), player.y + 22, 1, '#ffffff');
        }
      }
      if (globalFrame % 45 === 0) {
        spawnFloatingText(player.x - 16, player.y - 12, 'PICO ANCLADO!', '#38bdf8');
      }
    }

    if (!isSheltered && level && level.decorations) {
      for (let i = 0; i < level.decorations.length; i++) {
        const d = level.decorations[i];
        if (d.subType === 'alpine_cabin' || d.subType === 'ice_fishing_hut' || d.subType === 'sherpa_tent' ||
            d.subType === 'assault_tent' || d.subType === 'glacial_altar' || d.subType === 'prayer_cairn' ||
            d.subType === 'summit_monument' || d.subType === 'summit_nest' || d.subType === 'climbing_gear_rack' ||
            d.subType === 'expedition_stove') {
          if (Math.abs(player.x - d.x) < 55 && Math.abs(player.y - d.y) < 50) {
            isSheltered = true;
            break;
          }
        }
      }
    }

    if (isSheltered) {
      if (globalFrame % 50 === 0) {
        spawnFloatingText(player.x - 14, player.y - 10, 'REFUGIADO!', '#00f5d4');
      }
    } else {
      player.vx -= 160 * dt;
      if (globalFrame % 14 === 0) {
        spawnParticles(player.x + 11, player.y + 12, 1, '#caf0f8', 40, -10);
      }
    }

    if (blizzardState.timer <= 0) {
      blizzardState.active = false;
      blizzardState.cycleTimer = 7.5;
    }
  }

  // 2. SISTEMA DE CARÁMBANOS INESTABLES DE KHUMBU (FALLING ICICLES)
  if (level && level.icicles && Array.isArray(level.icicles)) {
    updateKhumbuIcicles(dt);
  }
}

function updateKhumbuIcicles(dt) {
  if (!level || !level.icicles || !player) return;

  for (let i = 0; i < level.icicles.length; i++) {
    const ic = level.icicles[i];
    if (!ic.state) {
      ic.state = 'hanging';
      ic.baseY = ic.y;
      ic.vy = 0;
      ic.shakeX = 0;
      ic.timer = 0;
      ic.respawnTimer = 0;
    }

    if (ic.state === 'hanging') {
      // Detección: si Elizabeth se acerca a menos de 55px horizontalmente y está debajo
      const dx = Math.abs((player.x + 11) - ic.x);
      if (dx < 55 && player.y > ic.y - 15) {
        ic.state = 'wobbling';
        ic.timer = 0.42; // Tiembla 0.42s con polvo de escarcha antes de soltarse
      }
    } else if (ic.state === 'wobbling') {
      ic.timer -= dt;
      ic.shakeX = Math.sin(globalFrame * 1.8) * 2;
      if (globalFrame % 4 === 0) {
        spawnParticles(ic.x, ic.y + 16, 1, '#caf0f8', 15, 20);
      }
      if (ic.timer <= 0) {
        ic.state = 'falling';
        ic.vy = 75;
        ic.shakeX = 0;
      }
    } else if (ic.state === 'falling') {
      ic.vy += 460 * dt;
      ic.y += ic.vy * dt;
      if (globalFrame % 3 === 0) {
        spawnParticles(ic.x, ic.y, 1, '#ffffff', 18, -10);
      }

      // Colisión con Elizabeth
      const pLeft = player.x + 2;
      const pRight = player.x + player.w - 2;
      const pTop = player.y;
      const pBottom = player.y + player.h;

      if (ic.x >= pLeft && ic.x <= pRight && (ic.y + 18) >= pTop && ic.y <= pBottom) {
        if (player.isDigging) {
          // Si Elizabeth está cavando bajo la nieve, el carámbano se rompe en el manto superior
          spawnParticles(ic.x, ic.y, 12, '#ffffff', 60, -25);
          spawnParticles(ic.x, ic.y, 8, '#caf0f8', 45, -15);
          ic.state = 'broken';
          ic.respawnTimer = 4.0;
        } else {
          // Daño al jugador
          damagePlayer(false);
          triggerShake(0.12, 1.8);
          spawnParticles(ic.x, ic.y, 14, '#caf0f8', 80, -30);
          spawnParticles(ic.x, ic.y, 8, '#00b4d8', 60, -20);
          ic.state = 'broken';
          ic.respawnTimer = 4.5;
        }
      }

      // Colisión con proyectil de bola de nieve de Elizabeth
      if (ic.state === 'falling' && typeof shovelState !== 'undefined' && shovelState.projectiles) {
        for (let b of shovelState.projectiles) {
          if (Math.hypot(b.x - ic.x, b.y - (ic.y + 10)) < 16) {
            b.life = 0;
            ic.state = 'broken';
            ic.respawnTimer = 5.0;
            triggerShake(0.08, 1.2);
            spawnParticles(ic.x, ic.y, 14, '#00f5d4', 70, -30);
            spawnFloatingText(ic.x - 14, ic.y - 8, '¡DESTRUIDO!', '#caf0f8');
            if (window.sfx && window.sfx.playHit) window.sfx.playHit();
            break;
          }
        }
      }

      // Colisión con terreno sólido
      if (ic.state === 'falling' && level && level.platforms) {
        for (let p of level.platforms) {
          if (!p.oneWay && ic.x >= p.x && ic.x <= p.x + p.w && (ic.y + 18) >= p.y && ic.y <= p.y + p.h) {
            spawnParticles(ic.x, p.y, 10, '#caf0f8', 55, -25);
            spawnParticles(ic.x, p.y, 6, '#ffffff', 40, -15);
            ic.state = 'broken';
            ic.respawnTimer = 4.5;
            break;
          }
        }
      }

      if (ic.y > 300) {
        ic.state = 'broken';
        ic.respawnTimer = 4.0;
      }
    } else if (ic.state === 'broken') {
      ic.respawnTimer -= dt;
      if (ic.respawnTimer <= 0) {
        ic.state = 'hanging';
        ic.y = ic.baseY || 40;
        ic.vy = 0;
        ic.shakeX = 0;
      }
    }
  }
}

function drawBlizzardSystem(ctx, camX, frame) {
  if (!level || level.theme !== 'snow' || (player && player.x >= 23700 && player.x <= 29650)) return;

  // 1. Dibujar carámbanos inestables de Khumbu en el mundo
  if (level.icicles && Array.isArray(level.icicles)) {
    for (let ic of level.icicles) {
      if (ic.state === 'broken') continue;
      const ix = Math.round(ic.x + (ic.shakeX || 0));
      const iy = Math.round(ic.y);
      if (ix < camX - 30 || ix > camX + W + 30) continue;

      // Base ancha fijada al techo de roca/hielo
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(ix - 5, iy - 2, 11, 3);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(ix - 4, iy - 1, 9, 2);

      // Cono afilado de carámbano de hielo translúcido
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(ix - 4, iy + 1);
      ctx.lineTo(ix, iy + 22);
      ctx.lineTo(ix + 4, iy + 1);
      ctx.closePath();
      ctx.fill();

      // Capa de hielo cian brillante
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(ix - 3, iy + 1);
      ctx.lineTo(ix, iy + 20);
      ctx.lineTo(ix + 2, iy + 1);
      ctx.closePath();
      ctx.fill();

      // Reflejo blanco cristalino en el borde
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(ix - 2, iy + 1);
      ctx.lineTo(ix, iy + 18);
      ctx.lineTo(ix - 1, iy + 1);
      ctx.closePath();
      ctx.fill();

      // Destello intermitente en la punta
      if ((frame + ix) % 30 < 6) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ix - 1, iy + 20, 2, 2);
      }
    }
  }

  // Generar ráfagas de nieve continua en el viento
  const isBlizzard = blizzardState.active;
  const count = isBlizzard ? 18 : 6;
  const speed = isBlizzard ? 8 : 2.5;

  ctx.fillStyle = isBlizzard ? 'rgba(255, 255, 255, 0.75)' : 'rgba(224, 242, 254, 0.45)';
  for (let i = 0; i < count; i++) {
    const sx = ((i * 37 - frame * speed * 3) % (W + 60) + (W + 60)) % (W + 60) - 30;
    const sy = (i * 23 + frame * 0.8) % H;
    const len = isBlizzard ? (12 + (i % 3) * 6) : 3;

    ctx.fillRect(sx, sy, len, isBlizzard ? 1.5 : 1);
  }

  // Tinte helado durante la ventisca activa
  if (isBlizzard) {
    ctx.fillStyle = 'rgba(202, 240, 248, 0.12)';
    ctx.fillRect(0, 0, W, H);
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    getBlizzardState,
    updateBlizzardSystem,
    drawBlizzardSystem
  };
}


// --- MODULO: src/render/hazards/kangshung_mechanics.js ---
// ============================================================================
// MECÁNICAS ÚNICAS DE KANGSHUNG: VÓRTICES POLARES, SERACS Y PRESENCIA DEL YETI
// (MUNDO 4 • FASE 6: "LA VERTIENTE PROHIBIDA DEL KANGSHUNG Y EL SANTUARIO DEL YETI")
// ============================================================================

let kangshungState = {
  updrafts: [
    { x: 25620, w: 75, minY: 40, maxY: 230, name: 'Vórtice Abismo Occidental' },
    { x: 26340, w: 75, minY: 40, maxY: 230, name: 'Vórtice Gran Puente Oriental' },
    { x: 27170, w: 70, minY: 45, maxY: 230, name: 'Vórtice del Cañón Sagrado' }
  ],
  seracs: [],
  roarTimer: 18.0,
  activeWindSoundCooldown: 0
};

function initKangshungMechanics() {
  kangshungState.seracs = [
    { id: 1, x: 24650, y: 44, startY: 44, triggerX: 24650, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 140 },
    { id: 2, x: 24780, y: 42, startY: 42, triggerX: 24780, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 114 },
    { id: 3, x: 24890, y: 46, startY: 46, triggerX: 24890, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 96 },
    { id: 4, x: 27040, y: 40, startY: 40, triggerX: 27040, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 116 },
    { id: 5, x: 27790, y: 42, startY: 42, triggerX: 27790, state: 'idle', shakeTimer: 0.32, vy: 0, groundY: 148 }
  ];
  kangshungState.roarTimer = 16.0;
  kangshungState.activeWindSoundCooldown = 0;
  window.kangshungState = kangshungState;
}

function updateKangshungMechanics(dt) {
  if (gameState !== 'PLAYING' || !level || level.id !== 4) return;
  if (player.x < 23700 || player.x > 29650) return;

  const s = kangshungState;
  if (!s.seracs || s.seracs.length === 0) {
    initKangshungMechanics();
  }

  // 1. VÓRTICES POLARES ASCENDENTES DE KANGSHUNG (KANGSHUNG UPDRAFTS)
  for (const ud of s.updrafts) {
    const pCenterX = player.x + player.w / 2;
    const inColX = pCenterX >= ud.x - ud.w / 2 && pCenterX <= ud.x + ud.w / 2;
    const inColY = player.y >= ud.minY && (player.y + player.h) <= ud.maxY + 15;

    if (inColX && inColY) {
      // Fuerza ascensional suave y controlada
      if (player.vy > -175) {
        player.vy = Math.max(player.vy - 480 * dt, -175);
      }
      player.jumpsLeft = 2; // Permite saltos aéreos dentro de la corriente

      // Partículas y destellos de viento ártico
      if (globalFrame % 2 === 0 && typeof spawnParticles === 'function') {
        spawnParticles(pCenterX + (Math.random() * 24 - 12), player.y + player.h, 2, '#38bdf8', 45, -90);
        spawnParticles(pCenterX + (Math.random() * 20 - 10), player.y + player.h, 1, '#ffffff', 30, -80);
      }
      if (globalFrame % 8 === 0 && typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(pCenterX, player.y + 12, 1, '#e0f2fe');
      }

      if (s.activeWindSoundCooldown <= 0) {
        s.activeWindSoundCooldown = 0.55;
        if (window.sfx && window.sfx.playWaterSplash) window.sfx.playWaterSplash();
      }
    }
  }

  if (s.activeWindSoundCooldown > 0) s.activeWindSoundCooldown -= dt;

  // 2. SERACS REACTIVOS CAÍDOS (ESTALACTITAS GLACIALES)
  for (let i = s.seracs.length - 1; i >= 0; i--) {
    const sc = s.seracs[i];

    if (sc.state === 'idle') {
      // Detectar aproximación horizontal de Elizabeth
      const pCenterX = player.x + player.w / 2;
      if (Math.abs(pCenterX - sc.triggerX) < 42 && player.y > sc.y) {
        sc.state = 'shaking';
        sc.shakeTimer = 0.32;
      }
    } else if (sc.state === 'shaking') {
      sc.shakeTimer -= dt;
      if (sc.shakeTimer <= 0) {
        sc.state = 'falling';
        sc.vy = 50;
        if (typeof spawnParticles === 'function') {
          spawnParticles(sc.x, sc.y, 4, '#e0f2fe', 40, -20);
        }
      }
    } else if (sc.state === 'falling') {
      sc.vy += 430 * dt;
      sc.y += sc.vy * dt;

      // Colisión con Elizabeth
      if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, sc.x - 4, sc.y, 8, 18)) {
        damagePlayer(false);
        if (typeof spawnParticles === 'function') {
          spawnParticles(sc.x, sc.y + 10, 10, '#38bdf8', 70, -20);
        }
        s.seracs.splice(i, 1);
        continue;
      }

      // Colisión con el suelo rocoso/helado
      if (sc.y >= sc.groundY) {
        if (typeof spawnParticles === 'function') {
          spawnParticles(sc.x, sc.groundY, 12, '#38bdf8', 80, -30);
          spawnParticles(sc.x, sc.groundY, 8, '#ffffff', 60, -20);
        }
        if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
        s.seracs.splice(i, 1);
        continue;
      }
    }
  }

  // 3. RUGIDOS DISTANTES DEL GRAN YETI Y TEMBLOR SÍSMICO (X: 23800 -> 28600)
  if (player.x < 28600) {
    s.roarTimer -= dt;
    if (s.roarTimer <= 0) {
      s.roarTimer = 22.0 + Math.random() * 8.0;
      if (typeof triggerShake === 'function') triggerShake(0.18, 1.8);
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x - 28, player.y - 20, '¡UN RUGIDO SACUDE EL KANGSHUNG!', '#38bdf8');
      }
      if (typeof spawnParticles === 'function') {
        for (let k = 0; k < 12; k++) {
          spawnParticles(player.x - 80 + Math.random() * 160, player.y - 50 + Math.random() * 40, 1, '#ffffff', 40, 30);
        }
      }
    }
  }
}

function drawKangshungMechanics(ctx) {
  if (!level || level.id !== 4) return;
  const s = kangshungState;
  if (!s) return;
  const frame = globalFrame;

  // 1. DIBUJAR VÓRTICES POLARES ASCENDENTES
  for (const ud of s.updrafts) {
    const vx = Math.round(ud.x);
    if (vx < cameraX - 100 || vx > cameraX + W + 100) continue;

    ctx.save();
    // Columna de resplandor etéreo
    const grad = ctx.createLinearGradient(vx, ud.minY, vx, ud.maxY);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.02)');
    grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.14)');
    grad.addColorStop(1, 'rgba(186, 230, 253, 0.28)');
    ctx.fillStyle = grad;
    ctx.fillRect(vx - ud.w / 2, ud.minY, ud.w, ud.maxY - ud.minY);

    // Cintas espirales de viento ascendente
    for (let b = 0; b < 3; b++) {
      const phase = (frame * 0.06 + (b * Math.PI * 2 / 3)) % (Math.PI * 2);
      ctx.strokeStyle = b % 2 === 0 ? 'rgba(224, 242, 254, 0.65)' : 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let y = ud.maxY; y >= ud.minY; y -= 8) {
        const prog = (ud.maxY - y) / (ud.maxY - ud.minY);
        const wave = Math.sin(phase + prog * 6) * (ud.w * 0.35);
        if (y === ud.maxY) ctx.moveTo(vx + wave, y);
        else ctx.lineTo(vx + wave, y);
      }
      ctx.stroke();
    }

    // Cristales de hielo ascendentes
    ctx.fillStyle = '#ffffff';
    for (let c = 0; c < 5; c++) {
      const cy = ((ud.maxY - (frame * 1.8 + c * 38)) % (ud.maxY - ud.minY) + (ud.maxY - ud.minY)) % (ud.maxY - ud.minY) + ud.minY;
      const cx = vx + Math.sin(cy * 0.08 + c) * (ud.w * 0.28);
      ctx.fillRect(Math.round(cx) - 1, Math.round(cy) - 1, 2, 2);
    }
    ctx.restore();
  }

  // 2. DIBUJAR SERACS REACTIVOS (ESTALACTITAS)
  for (const sc of s.seracs) {
    const sx = Math.round(sc.x + (sc.state === 'shaking' ? (Math.random() * 3 - 1.5) : 0));
    const sy = Math.round(sc.y);
    if (sx < cameraX - 40 || sx > cameraX + W + 40) continue;

    ctx.save();
    // Cuerpo del carámbano de hielo
    ctx.fillStyle = sc.state === 'shaking' ? '#00f5d4' : '#0284c7';
    ctx.beginPath();
    ctx.moveTo(sx - 4, sy);
    ctx.lineTo(sx + 4, sy);
    ctx.lineTo(sx + 1, sy + 18);
    ctx.lineTo(sx - 1, sy + 18);
    ctx.closePath();
    ctx.fill();

    // Brillo interior diamantino
    ctx.fillStyle = sc.state === 'shaking' ? '#ffffff' : '#7dd3fc';
    ctx.beginPath();
    ctx.moveTo(sx - 2, sy + 2);
    ctx.lineTo(sx + 2, sy + 2);
    ctx.lineTo(sx, sy + 15);
    ctx.closePath();
    ctx.fill();

    // Punta afilada blanca
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx - 1, sy + 15, 2, 3);
    ctx.restore();
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    initKangshungMechanics,
    updateKangshungMechanics,
    drawKangshungMechanics
  };
}


// --- MODULO: src/render/hazards/snow_village_interiors.js ---
// ============================================================================
// FONDOS ARQUITECTÓNICOS INTERIORES DEL PUEBLO NEVADO (MUNDO 4 • FASE 3)
// ============================================================================
// Salón rústico de la Taberna Alpina (X: 50000 -> 50300)

function drawSnowVillageInteriors(ctx, viewL, viewR, frame) {
  // 1. Interior de la Taberna Alpina "El Refugio Cálido" (X: 50000 -> 50300)
  const tStart = 50000, tEnd = 50300, tFloor = 196, tCeil = 60;
  if (viewR >= tStart && viewL <= tEnd) {
    const left = Math.max(tStart, viewL - 10);
    const right = Math.min(tEnd, viewR + 10);
    const width = right - left;

    // Fondo cálido de madera de cedro ahumado
    const wallGrad = ctx.createLinearGradient(0, tCeil, 0, tFloor);
    wallGrad.addColorStop(0, '#27160c');
    wallGrad.addColorStop(0.4, '#451a03');
    wallGrad.addColorStop(1, '#1c0f08');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, tCeil, width, tFloor - tCeil);

    // Listones de madera verticales
    for (let lx = Math.floor(left / 18) * 18; lx < right; lx += 18) {
      ctx.fillStyle = '#1c0f08';
      ctx.fillRect(lx, tCeil, 1, tFloor - tCeil);
      ctx.fillStyle = 'rgba(255, 209, 102, 0.05)';
      ctx.fillRect(lx + 1, tCeil, 2, tFloor - tCeil);
    }

    // Suelo de parquet rústico lustroso
    for (let bx = Math.floor(left / 14) * 14; bx < right; bx += 14) {
      const isAlt = Math.floor(bx / 14) % 2 === 0;
      ctx.fillStyle = isAlt ? '#78350f' : '#92400e';
      ctx.fillRect(bx, tFloor, 14, 28);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(bx, tFloor, 14, 1);
    }

    // Vigas maestras de madera en el techo
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(left, tCeil, width, 8);
    ctx.fillStyle = '#451a03';
    ctx.fillRect(left, tCeil + 1, width, 6);

    // Lámpara de araña de hierro forjado con velas cálidas en el centro
    const chanX = 50150;
    if (chanX >= left - 30 && chanX <= right + 30) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(chanX - 1, tCeil + 8, 2, 22);
      ctx.fillRect(chanX - 16, tCeil + 30, 32, 3);
      // 3 velas
      [-12, 0, 12].forEach(vx => {
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(chanX + vx - 1, tCeil + 24, 2, 6);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(chanX + vx - 1, tCeil + 22, 2, 2);
      });
      // Halo de luz dorada
      const halo = ctx.createRadialGradient(chanX, tCeil + 28, 6, chanX, tCeil + 28, 48);
      halo.addColorStop(0, 'rgba(255, 215, 0, 0.22)');
      halo.addColorStop(1, 'rgba(255, 180, 0, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(chanX, tCeil + 28, 48, 0, Math.PI * 2);
      ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 50040)
    const doorX = 50040;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX - 2, tFloor - 32, 24, 32);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(doorX, tFloor - 30, 20, 30);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 14, tFloor - 16, 2, 4); // Picaporte
    }
  }

  // 2. Interior de la Tienda de Ropa y Gorros "El Gorro Nevado" (X: 50400 -> 50700)
  const sStart = 50400, sEnd = 50700, sFloor = 196, sCeil = 60;
  if (viewR >= sStart && viewL <= sEnd) {
    const left = Math.max(sStart, viewL - 10);
    const right = Math.min(sEnd, viewR + 10);
    const width = right - left;

    // Papel tapiz verde bosque alpino elegante
    const wallGrad = ctx.createLinearGradient(0, sCeil, 0, sFloor);
    wallGrad.addColorStop(0, '#042f2e');
    wallGrad.addColorStop(0.5, '#064e3b');
    wallGrad.addColorStop(1, '#022c22');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, sCeil, width, sFloor - sCeil);

    // Molduras decorativas verticales doradas tenues
    for (let mx = Math.floor(left / 22) * 22; mx < right; mx += 22) {
      ctx.fillStyle = 'rgba(253, 224, 71, 0.08)';
      ctx.fillRect(mx, sCeil, 1, sFloor - sCeil - 20);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(mx + 1, sCeil, 1, sFloor - sCeil - 20);
    }

    // Zócalo de madera noble en la parte inferior
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(left, sFloor - 20, width, 20);
    ctx.fillStyle = '#27160c';
    ctx.fillRect(left, sFloor - 19, width, 18);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(left, sFloor - 20, width, 2);

    // Suelo de tablas de madera pulida
    for (let bx = Math.floor(left / 12) * 12; bx < right; bx += 12) {
      const isAlt = Math.floor(bx / 12) % 2 === 0;
      ctx.fillStyle = isAlt ? '#78350f' : '#854d0e';
      ctx.fillRect(bx, sFloor, 12, 28);
      ctx.fillStyle = '#1c0f08';
      ctx.fillRect(bx, sFloor, 12, 1);
    }

    // Alfombra roja señorial en el pasillo central (X: 50460 -> 50660)
    const carpetL = Math.max(left, 50460);
    const carpetR = Math.min(right, 50660);
    if (carpetR > carpetL) {
      ctx.fillStyle = '#991b1b';
      ctx.fillRect(carpetL, sFloor - 2, carpetR - carpetL, 3);
      ctx.fillStyle = '#d97706';
      ctx.fillRect(carpetL, sFloor - 2, carpetR - carpetL, 1);
      ctx.fillRect(carpetL, sFloor, carpetR - carpetL, 1);
    }

    // Estantería de fondo con rollos de tela de colores (X: 50480 -> 50530)
    const shelfX = 50480;
    if (shelfX >= left - 60 && shelfX <= right + 60) {
      ctx.fillStyle = '#1c0f08';
      ctx.fillRect(shelfX, 90, 50, 4);
      // Rollos de lana alpina
      const woolColors = ['#ef4444', '#0284c7', '#eab308', '#10b981', '#ec4899'];
      woolColors.forEach((wc, idx) => {
        ctx.fillStyle = wc;
        ctx.fillRect(shelfX + 4 + idx * 9, 82, 7, 8);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillRect(shelfX + 4 + idx * 9, 82, 7, 2);
      });
    }

    // Vigas de madera en el techo
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(left, sCeil, width, 8);
    ctx.fillStyle = '#27160c';
    ctx.fillRect(left, sCeil + 1, width, 6);

    // Lámpara colgante de latón con luz cálida (X: 50560)
    const lampX = 50560;
    if (lampX >= left - 30 && lampX <= right + 30) {
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(lampX - 1, sCeil + 8, 2, 18);
      ctx.fillStyle = '#b45309';
      ctx.fillRect(lampX - 8, sCeil + 26, 16, 4);
      // Foco brillante
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(lampX - 4, sCeil + 30, 8, 6);
      const lHalo = ctx.createRadialGradient(lampX, sCeil + 33, 4, lampX, sCeil + 33, 46);
      lHalo.addColorStop(0, 'rgba(255, 230, 120, 0.3)');
      lHalo.addColorStop(1, 'rgba(255, 200, 50, 0)');
      ctx.fillStyle = lHalo;
      ctx.beginPath();
      ctx.arc(lampX, sCeil + 33, 46, 0, Math.PI * 2);
      ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 50440)
    const doorX = 50440;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX - 2, sFloor - 34, 22, 34);
      ctx.fillStyle = '#0f766e';
      ctx.fillRect(doorX, sFloor - 32, 18, 32);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 12, sFloor - 16, 2, 4); // Picaporte
    }
  }

  // 3. Interior de la Cabaña de Gaston el Melancólico (X: 50800 -> 51100)
  const gStart = 50800, gEnd = 51100, gFloor = 196, gCeil = 60;
  if (viewR >= gStart && viewL <= gEnd) {
    const left = Math.max(gStart, viewL - 10);
    const right = Math.min(gEnd, viewR + 10);
    const width = right - left;

    // Paredes de madera grisácea y azulada melancólica
    const wallGrad = ctx.createLinearGradient(0, gCeil, 0, gFloor);
    wallGrad.addColorStop(0, '#0f172a');
    wallGrad.addColorStop(0.6, '#1e293b');
    wallGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, gCeil, width, gFloor - gCeil);

    // Listones de madera horizontales desgastados
    for (let ly = gCeil + 12; ly < gFloor; ly += 14) {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(left, ly, width, 1);
      ctx.fillStyle = 'rgba(148, 163, 184, 0.04)';
      ctx.fillRect(left, ly + 1, width, 1);
    }

    // Suelo de tablas desgastadas
    for (let bx = Math.floor(left / 14) * 14; bx < right; bx += 14) {
      const isAlt = Math.floor(bx / 14) % 2 === 0;
      ctx.fillStyle = isAlt ? '#1e293b' : '#334155';
      ctx.fillRect(bx, gFloor, 14, 28);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(bx, gFloor, 14, 1);
    }

    // Ventana melancólica con vista a la nieve exterior (X: 50920)
    const winX = 50920;
    if (winX >= left - 40 && winX <= right + 40) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(winX - 1, gCeil + 18, 30, 36);
      // Cristal oscuro con noche azul y copos cayendo
      ctx.fillStyle = '#0b1329';
      ctx.fillRect(winX, gCeil + 19, 28, 34);
      // Copos en la ventana
      for (let s = 0; s < 4; s++) {
        const sx = winX + 4 + ((s * 7 + frame * 0.2) % 20);
        const sy = gCeil + 22 + ((s * 9 + frame * 0.3) % 26);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }
      // Marco de la ventana
      ctx.fillStyle = '#334155';
      ctx.fillRect(winX + 13, gCeil + 19, 2, 34);
      ctx.fillRect(winX, gCeil + 35, 28, 2);
    }

    // Vigas del techo deslucidas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(left, gCeil, width, 8);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(left, gCeil + 1, width, 6);

    // Farol solitario colgante con luz fría tenue (X: 51020)
    const lanX = 51020;
    if (lanX >= left - 30 && lanX <= right + 30) {
      ctx.fillStyle = '#475569';
      ctx.fillRect(lanX - 1, gCeil + 8, 2, 16);
      ctx.fillStyle = '#334155';
      ctx.fillRect(lanX - 6, gCeil + 24, 12, 4);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(lanX - 2, gCeil + 28, 4, 4);
      // Halo azulado pálido
      const halo = ctx.createRadialGradient(lanX, gCeil + 30, 2, lanX, gCeil + 30, 38);
      halo.addColorStop(0, 'rgba(203, 213, 225, 0.18)');
      halo.addColorStop(1, 'rgba(148, 163, 184, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(lanX, gCeil + 30, 38, 0, Math.PI * 2);
      ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 50840)
    const doorX = 50840;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX - 2, gFloor - 34, 22, 34);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(doorX, gFloor - 32, 18, 32);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(doorX + 12, gFloor - 16, 2, 4); // Picaporte
    }
  }

  // Delegación a Parte 2 para Casas 4, 5, 6 y 7
  if (typeof drawSnowVillageInteriorsPt2 === 'function') {
    drawSnowVillageInteriorsPt2(ctx, viewL, viewR, frame);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawSnowVillageInteriors };
}


// --- MODULO: src/render/hazards/snow_village_interiors_pt2.js ---
// ============================================================================
// FONDOS ARQUITECTÓNICOS INTERIORES DEL PUEBLO NEVADO (PARTE 2: CASAS 4 A 7)
// ============================================================================
// Casa 4: Sala Arcade Retro "Arcade Polar" (X: 51200 -> 51500)
// Casa 5: Panadería y Casa de Té "El Horno del Yeti" (X: 51600 -> 51900)
// Casa 6: Taller de Herramientas y Forja de Hielo "La Forja del Glaciar" (X: 52000 -> 52300)

function drawSnowVillageInteriorsPt2(ctx, viewL, viewR, frame) {
  // 4. Interior de la Sala Arcade Retro "Arcade Polar" (X: 51200 -> 51500)
  const aStart = 51200, aEnd = 51500, aFloor = 196, aCeil = 60;
  if (viewR >= aStart && viewL <= aEnd) {
    const left = Math.max(aStart, viewL - 10);
    const right = Math.min(aEnd, viewR + 10);
    const width = right - left;

    // Fondo synthwave violeta oscuro
    const wallGrad = ctx.createLinearGradient(0, aCeil, 0, aFloor);
    wallGrad.addColorStop(0, '#090514');
    wallGrad.addColorStop(0.5, '#1e0a38');
    wallGrad.addColorStop(1, '#0f051d');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, aCeil, width, aFloor - aCeil);

    // Rejilla de perspectiva neón retro en la pared
    for (let gy = aCeil + 16; gy < aFloor; gy += 14) {
      ctx.fillStyle = 'rgba(236, 72, 153, 0.08)';
      ctx.fillRect(left, gy, width, 1);
    }
    for (let gx = Math.floor(left / 24) * 24; gx < right; gx += 24) {
      ctx.fillStyle = 'rgba(6, 182, 212, 0.06)';
      ctx.fillRect(gx, aCeil, 1, aFloor - aCeil);
    }

    // Suelo de baldosas a cuadros retro violeta y negro
    for (let bx = Math.floor(left / 12) * 12; bx < right; bx += 12) {
      const isAlt = Math.floor(bx / 12) % 2 === 0;
      ctx.fillStyle = isAlt ? '#2e1065' : '#0f051d';
      ctx.fillRect(bx, aFloor, 12, 28);
      ctx.fillStyle = '#3b0764';
      ctx.fillRect(bx, aFloor, 12, 1);
    }

    // Tubos de neón suspendidos en el techo (magenta y cian)
    const neonPink = (frame % 36 < 28) ? '#ec4899' : '#9d174d';
    const neonCyan = (frame % 30 < 24) ? '#06b6d4' : '#0e7490';
    ctx.fillStyle = '#0f051d'; ctx.fillRect(left, aCeil, width, 6);
    ctx.fillStyle = neonPink; ctx.fillRect(left, aCeil + 6, width, 2);
    ctx.fillStyle = neonCyan; ctx.fillRect(left, aCeil + 9, width, 1);

    // Pantalla de Récords del Arcade en la pared (X: 51340)
    const boardX = 51340;
    if (boardX >= left - 40 && boardX <= right + 40) {
      ctx.fillStyle = '#09090b'; ctx.fillRect(boardX, aCeil + 16, 36, 24);
      ctx.strokeStyle = '#f43f5e'; ctx.lineWidth = 1; ctx.strokeRect(boardX, aCeil + 16, 36, 24);
      ctx.fillStyle = '#facc15'; ctx.font = 'bold 4px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('HI-SCORE', boardX + 18, aCeil + 22);
      ctx.fillStyle = '#22c55e'; ctx.fillText('1. PIXEL 99990', boardX + 18, aCeil + 28);
      ctx.fillStyle = '#38bdf8'; ctx.fillText('2. ELIZA 85400', boardX + 18, aCeil + 34);
    }

    // Marco de la puerta de salida al pueblo con moldura de neón cian (X: 51240)
    const doorX = 51240;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f051d';
      ctx.fillRect(doorX - 2, aFloor - 34, 22, 34);
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(doorX, aFloor - 32, 18, 32);
      ctx.fillStyle = '#06b6d4';
      ctx.strokeRect(doorX, aFloor - 32, 18, 32);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 12, aFloor - 16, 2, 4);
    }
  }

  // 5. Interior de la Panadería y Casa de Té "El Horno del Yeti" (X: 51600 -> 51900)
  const bStart = 51600, bEnd = 51900, bFloor = 196, bCeil = 60;
  if (viewR >= bStart && viewL <= bEnd) {
    const left = Math.max(bStart, viewL - 10);
    const right = Math.min(bEnd, viewR + 10);
    const width = right - left;

    // Paredes de arcilla cálida y madera color miel tostada
    const wallGrad = ctx.createLinearGradient(0, bCeil, 0, bFloor);
    wallGrad.addColorStop(0, '#451a03');
    wallGrad.addColorStop(0.5, '#78350f');
    wallGrad.addColorStop(1, '#27160c');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, bCeil, width, bFloor - bCeil);

    // Listones de madera horizontales cálidos
    for (let ly = bCeil + 12; ly < bFloor; ly += 14) {
      ctx.fillStyle = '#1c0f08'; ctx.fillRect(left, ly, width, 1);
      ctx.fillStyle = 'rgba(251, 191, 36, 0.05)'; ctx.fillRect(left, ly + 1, width, 1);
    }

    // Suelo de parquet rústico en tonos ámbar
    for (let bx = Math.floor(left / 14) * 14; bx < right; bx += 14) {
      const isAlt = Math.floor(bx / 14) % 2 === 0;
      ctx.fillStyle = isAlt ? '#b45309' : '#d97706';
      ctx.fillRect(bx, bFloor, 14, 28);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(bx, bFloor, 14, 1);
    }

    // Estantería de fondo con sacos de harina y botes de té (X: 51680 -> 51740)
    const shelfX = 51680;
    if (shelfX >= left - 60 && shelfX <= right + 60) {
      ctx.fillStyle = '#451a03'; ctx.fillRect(shelfX, 90, 60, 4);
      // Sacos de harina
      ctx.fillStyle = '#f8fafc'; ctx.fillRect(shelfX + 4, 80, 10, 10);
      ctx.fillStyle = '#cbd5e1'; ctx.fillRect(shelfX + 6, 80, 6, 2);
      // Botes de té verde y especias
      ctx.fillStyle = '#10b981'; ctx.fillRect(shelfX + 20, 82, 8, 8);
      ctx.fillStyle = '#f59e0b'; ctx.fillRect(shelfX + 32, 82, 8, 8);
      ctx.fillStyle = '#ef4444'; ctx.fillRect(shelfX + 44, 82, 8, 8);
    }

    // Vigas de madera en el techo
    ctx.fillStyle = '#1c0f08'; ctx.fillRect(left, bCeil, width, 8);
    ctx.fillStyle = '#451a03'; ctx.fillRect(left, bCeil + 1, width, 6);

    // Lámpara de cobre colgante con luz dorada envolvente (X: 51780)
    const lampX = 51780;
    if (lampX >= left - 30 && lampX <= right + 30) {
      ctx.fillStyle = '#b45309'; ctx.fillRect(lampX - 1, bCeil + 8, 2, 18);
      ctx.fillStyle = '#d97706'; ctx.fillRect(lampX - 8, bCeil + 26, 16, 4);
      ctx.fillStyle = '#fef08a'; ctx.fillRect(lampX - 4, bCeil + 30, 8, 6);
      const lHalo = ctx.createRadialGradient(lampX, bCeil + 33, 4, lampX, bCeil + 33, 48);
      lHalo.addColorStop(0, 'rgba(251, 191, 36, 0.35)');
      lHalo.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = lHalo; ctx.beginPath(); ctx.arc(lampX, bCeil + 33, 48, 0, Math.PI * 2); ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 51640)
    const doorX = 51640;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#1c0f08';
      ctx.fillRect(doorX - 2, bFloor - 34, 22, 34);
      ctx.fillStyle = '#451a03';
      ctx.fillRect(doorX, bFloor - 32, 18, 32);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 12, bFloor - 16, 2, 4);
    }
  }

  // 6. Interior de la Forja de Hielo "La Forja del Glaciar" (X: 52000 -> 52300)
  const fStart = 52000, fEnd = 52300, fFloor = 196, fCeil = 60;
  if (viewR >= fStart && viewL <= fEnd) {
    const left = Math.max(fStart, viewL - 10);
    const right = Math.min(fEnd, viewR + 10);
    const width = right - left;

    // Paredes de piedra de basalto y carbón vegetal
    const wallGrad = ctx.createLinearGradient(0, fCeil, 0, fFloor);
    wallGrad.addColorStop(0, '#0f172a');
    wallGrad.addColorStop(0.5, '#1e293b');
    wallGrad.addColorStop(1, '#0b0f19');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, fCeil, width, fFloor - fCeil);

    // Sillares de piedra oscura y juntas de mortero
    for (let sy = fCeil + 14; sy < fFloor; sy += 16) {
      ctx.fillStyle = '#020617'; ctx.fillRect(left, sy, width, 1);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.04)'; ctx.fillRect(left, sy + 1, width, 1);
    }
    for (let sx = Math.floor(left / 32) * 32; sx < right; sx += 32) {
      ctx.fillStyle = '#020617'; ctx.fillRect(sx, fCeil, 1, fFloor - fCeil);
    }

    // Suelo de losas pesadas de basalto gris
    for (let bx = Math.floor(left / 16) * 16; bx < right; bx += 16) {
      const isAlt = Math.floor(bx / 16) % 2 === 0;
      ctx.fillStyle = isAlt ? '#1e293b' : '#334155';
      ctx.fillRect(bx, fFloor, 16, 28);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(bx, fFloor, 16, 1);
    }

    // Silueta de estantes con lingotes de hierro y picos en la pared (X: 52080 -> 52140)
    const rackX = 52080;
    if (rackX >= left - 60 && rackX <= right + 60) {
      ctx.fillStyle = '#0f172a'; ctx.fillRect(rackX, 90, 60, 4);
      // Lingotes apilados
      ctx.fillStyle = '#64748b'; ctx.fillRect(rackX + 4, 82, 14, 8);
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(rackX + 22, 82, 14, 8); // Lingotes de hielo
      ctx.fillStyle = '#475569'; ctx.fillRect(rackX + 40, 82, 14, 8);
    }

    // Vigas de acero negro y cadenas colgantes en el techo
    ctx.fillStyle = '#020617'; ctx.fillRect(left, fCeil, width, 8);
    ctx.fillStyle = '#1e293b'; ctx.fillRect(left, fCeil + 1, width, 6);

    // Cadenas de hierro colgantes
    const chainX = 52170;
    if (chainX >= left - 20 && chainX <= right + 20) {
      ctx.fillStyle = '#475569';
      for (let cy = fCeil + 7; cy < fCeil + 32; cy += 4) {
        ctx.fillRect(chainX, cy, 2, 3);
      }
      // Gancho de forja al final
      ctx.fillRect(chainX - 2, fCeil + 32, 6, 4);
    }

    // Farol de forja criogénica con resplandor azul celeste (X: 52210)
    const lanX = 52210;
    if (lanX >= left - 30 && lanX <= right + 30) {
      ctx.fillStyle = '#0f172a'; ctx.fillRect(lanX - 1, fCeil + 8, 2, 16);
      ctx.fillStyle = '#1e293b'; ctx.fillRect(lanX - 6, fCeil + 24, 12, 12);
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(lanX - 4, fCeil + 26, 8, 8);
      const fHalo = ctx.createRadialGradient(lanX, fCeil + 30, 4, lanX, fCeil + 30, 44);
      fHalo.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      fHalo.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = fHalo; ctx.beginPath(); ctx.arc(lanX, fCeil + 30, 44, 0, Math.PI * 2); ctx.fill();
    }

    // Marco de la puerta de salida al pueblo (X: 52040)
    const doorX = 52040;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#020617';
      ctx.fillRect(doorX - 2, fFloor - 34, 22, 34);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX, fFloor - 32, 18, 32);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(doorX + 2, fFloor - 28, 4, 2); // Remache
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 12, fFloor - 16, 2, 4); // Picaporte
    }
  }

  // 7. Interior de la Gran Alcaldía del Pueblo Nevado (X: 52400 -> 52700)
  const hStart = 52400, hEnd = 52700, hFloor = 196, hCeil = 60;
  if (viewR >= hStart && viewL <= hEnd) {
    const left = Math.max(hStart, viewL - 10);
    const right = Math.min(hEnd, viewR + 10);
    const width = right - left;

    // Paredes de caoba señorial y cortinajes carmesí
    const wallGrad = ctx.createLinearGradient(0, hCeil, 0, hFloor);
    wallGrad.addColorStop(0, '#1c0710');
    wallGrad.addColorStop(0.5, '#3c0a1a');
    wallGrad.addColorStop(1, '#17030a');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(left, hCeil, width, hFloor - hCeil);

    // Listones de madera tallada verticales con molduras doradas
    for (let lx = Math.floor(left / 22) * 22; lx < right; lx += 22) {
      ctx.fillStyle = '#17030a'; ctx.fillRect(lx, hCeil, 1, hFloor - hCeil);
      ctx.fillStyle = 'rgba(255, 209, 102, 0.08)'; ctx.fillRect(lx + 1, hCeil, 2, hFloor - hCeil);
    }

    // Suelo de parquet noble con gran alfombra ceremonial roja en el centro
    for (let bx = Math.floor(left / 14) * 14; bx < right; bx += 14) {
      ctx.fillStyle = '#451a03';
      ctx.fillRect(bx, hFloor, 14, 28);
      ctx.fillStyle = '#27160c';
      ctx.fillRect(bx, hFloor, 14, 1);
    }
    // Alfombra roja señorial
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(left, hFloor, width, 5);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(left, hFloor, width, 1); // Cenefa dorada

    // Gran Tapiz Mural de la Cumbre del Everest en la pared (X: 52540 -> 52620)
    const tapX = 52540;
    if (tapX >= left - 80 && tapX <= right + 80) {
      ctx.fillStyle = '#1e1b4b'; ctx.fillRect(tapX, 78, 64, 42);
      ctx.fillStyle = '#ffd166'; ctx.strokeRect(tapX, 78, 64, 42);
      // Montaña nevada bordada en el tapiz
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(tapX + 10, 118);
      ctx.lineTo(tapX + 32, 88);
      ctx.lineTo(tapX + 54, 118);
      ctx.closePath();
      ctx.fill();
      // Sol naciente alpino
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(tapX + 46, 92, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Vigas de caoba en el techo
    ctx.fillStyle = '#17030a'; ctx.fillRect(left, hCeil, width, 8);
    ctx.fillStyle = '#451a03'; ctx.fillRect(left, hCeil + 1, width, 6);

    // Lámpara de araña de bronce y cristal en el centro (X: 52570)
    const chanX = 52570;
    if (chanX >= left - 40 && chanX <= right + 40) {
      ctx.fillStyle = '#ffd166'; ctx.fillRect(chanX - 1, hCeil + 8, 2, 18);
      ctx.fillRect(chanX - 14, hCeil + 26, 28, 3);
      // Luces de velas cálidas
      for (let c = -12; c <= 12; c += 8) {
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(chanX + c - 1, hCeil + 22, 2, 4);
      }
      const cHalo = ctx.createRadialGradient(chanX, hCeil + 26, 6, chanX, hCeil + 26, 52);
      cHalo.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
      cHalo.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = cHalo; ctx.beginPath(); ctx.arc(chanX, hCeil + 26, 52, 0, Math.PI * 2); ctx.fill();
    }

    // Marco de la gran puerta doble de salida a la plaza (X: 52440)
    const doorX = 52440;
    if (doorX >= left - 20 && doorX <= right + 20) {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(doorX - 2, hFloor - 36, 26, 36);
      ctx.fillStyle = '#3f2213';
      ctx.fillRect(doorX, hFloor - 34, 22, 34);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(doorX + 8, hFloor - 30, 6, 8); // Escudo
      ctx.fillRect(doorX + 8, hFloor - 18, 2, 4); // Picaporte
      ctx.fillRect(doorX + 12, hFloor - 18, 2, 4);
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawSnowVillageInteriorsPt2 };
}


// --- MODULO: src/entities/collectibles.js ---
// ============================================================================
// 🌸 LIRIOS DE DEXTER FÍSICOS (BOTÍN DE ENEMIGOS ESTILO "GEO" DE HOLLOW KNIGHT)
// ============================================================================
function spawnDroppedLilies(x, y, count) {
  for (let i = 0; i < count; i++) {
    const spread = (i - (count - 1) / 2) * 34 + (Math.random() - 0.5) * 30;
    droppedLilies.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y - 4,
      vx: spread,
      vy: -135 - Math.random() * 65,
      pickupDelay: 0.16,
      life: 30
    });
  }
}

function updateDroppedLilies(dt) {
  for (let i = droppedLilies.length - 1; i >= 0; i--) {
    const dl = droppedLilies[i];
    if (dl.pickupDelay > 0) dl.pickupDelay -= dt;
    dl.life -= dt;

    // Física de caída y rebote sobre las plataformas
    const prevBottom = dl.y + 8;
    dl.vy += 490 * dt;
    if (dl.vy > 320) dl.vy = 320;
    dl.x += dl.vx * dt;
    dl.y += dl.vy * dt;

    for (const p of level.platforms) {
      if (dl.x + 8 > p.x && dl.x < p.x + p.w && prevBottom <= p.y + 8 && dl.y + 8 >= p.y) {
        dl.y = p.y - 8;
        if (Math.abs(dl.vy) > 50) {
          dl.vy = -dl.vy * 0.42;
          dl.vx *= 0.65;
        } else {
          dl.vy = 0;
          dl.vx *= 0.78;
        }
      }
    }

    // Atracción magnética suave al acercarse Mamá Ratón
    if (dl.pickupDelay <= 0) {
      const attractRadius = saveState.upgrades.cheeseMagnet ? 80 : 34;
      const dx = (player.x + 11) - (dl.x + 4);
      const dy = (player.y + 12) - (dl.y + 4);
      const dist = Math.hypot(dx, dy);
      if (dist < attractRadius && dist > 1) {
        dl.x += (dx / dist) * 190 * dt;
        dl.y += (dy / dist) * 190 * dt;
      }

      // Recolección inmediata en el acto (se suma directo a saveState.dexterLilies)
      if (rectOverlap(player.x - 3, player.y - 3, player.w + 6, player.h + 6, dl.x, dl.y, 9, 9)) {
        const gain = saveState.upgrades.flowerHarvest ? 2 : 1;
        saveState.dexterLilies = (saveState.dexterLilies || 0) + gain;
        score += 50 * gain;
        persistSave();
        window.sfx.playCheese();
        spawnParticles(dl.x + 4, dl.y + 4, 7, '#ff8fab', 55, 35);
        spawnParticles(dl.x + 4, dl.y + 4, 4, '#ffffff', 45, 25);
        spawnStarSparkles(dl.x + 4, dl.y + 4, 4, '#ffccd5');
        spawnFloatingText(dl.x - 4, dl.y - 6, '+1 🌸', '#ff8fab');
        droppedLilies.splice(i, 1);
        continue;
      }
    }

    if (dl.life <= 0 || dl.y > level.worldHeight + 50) {
      droppedLilies.splice(i, 1);
    }
  }
}



// --- MODULO: src/entities/enemies/crawlers.js ---
// ============================================================================
// IA DE ENEMIGOS TERRESTRES (MARIQUITAS, ESCARABAJOS Y ORUGAS DE MAGMA)
// ============================================================================
function updateCrawlers(dt, isLavaDashing) {
  for (let i = magmaCrawlers.length - 1; i >= 0; i--) {
    const mc = magmaCrawlers[i];
    if (mc.dead) {
      magmaCrawlers.splice(i, 1);
      continue;
    }
    mc.x += mc.dir * mc.speed * dt;
    if (mc.x >= mc.maxX) { mc.x = mc.maxX; mc.dir = -1; }
    if (mc.x <= mc.minX) { mc.x = mc.minX; mc.dir = 1; }

    // Si Elizabeth esta excavando bajo la nieve con la pala, es inmune a los enemigos de superficie
    if (player && player.isDigging) {
      continue;
    }

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, mc.x, mc.y, 18, 15)) {
      const isStomping = player.vy > 0 && (player.y + player.h - player.vy * dt) <= mc.y + 9;
      if (isLavaDashing || isStomping) {
        window.sfx.playEnemyHit();
        score += 150;
        if (isStomping && !isLavaDashing) {
          player.vy = -235;
          player.jumpsLeft = 2;
        }
        spawnDroppedLilies(mc.x + 9, mc.y + 4, 2);
        spawnParticles(mc.x + 9, mc.y + 7, 16, '#ff2a70', 95, 70);
        magmaCrawlers.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }
}


// --- MODULO: src/entities/enemies/fliers.js ---
// ============================================================================
// IA DE ENEMIGOS VOLADORES (ABEJAS, MARIPOSAS NOCTURNAS Y MURCIELAGOS)
// ============================================================================
function updateFliers(dt, isLavaDashing) {
  for (let i = fireBats.length - 1; i >= 0; i--) {
    const fb = fireBats[i];
    if (fb.dead) {
      fireBats.splice(i, 1);
      continue;
    }
    fb.x += fb.dir * fb.speed * dt;
    if (fb.x >= fb.maxX) { fb.x = fb.maxX; fb.dir = -1; }
    if (fb.x <= fb.minX) { fb.x = fb.minX; fb.dir = 1; }
    fb.y = fb.baseY + Math.sin(globalFrame * 0.08 + fb.phase) * 16;

    // Si Elizabeth esta excavando bajo la nieve con la pala, es inmune a los murcielagos aereos
    if (player && player.isDigging) {
      continue;
    }

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, fb.x, fb.y, 12, 10)) {
      const isStomping = player.vy > 0 && (player.y + player.h - player.vy * dt) <= fb.y + 8;
      if (isLavaDashing || isStomping) {
        window.sfx.playEnemyHit();
        score += 150;
        if (isStomping && !isLavaDashing) {
          player.vy = -240;
        }
        player.jumpsLeft = 2; // Recarga salto en el aire
        spawnDroppedLilies(fb.x + 6, fb.y + 4, 2);
        spawnParticles(fb.x + 6, fb.y + 5, 16, '#ffd166', 95, 50);
        fireBats.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }
}


// --- MODULO: src/entities/enemies/volcano_special.js ---
// ============================================================================
// IA DE ENEMIGOS ESPECIALES DEL VOLCÁN (SAPOS, ESPÍRITUS, GÓLEMS Y GUSANOS)
// ============================================================================
function updateVolcanoSpecialEnemies(dt, isLavaDashing) {
  // 1. Sapos Volcánicos Saltarines (Lava Hoppers)
  for (let i = lavaHoppers.length - 1; i >= 0; i--) {
    const lh = lavaHoppers[i];
    if (lh.inAir) {
      lh.vy += 480 * dt;
      lh.x += lh.vx * dt;
      lh.y += lh.vy * dt;
      if (lh.x <= lh.minX) { lh.x = lh.minX; lh.dir = 1; lh.vx = Math.abs(lh.vx); }
      if (lh.x >= lh.maxX) { lh.x = lh.maxX; lh.dir = -1; lh.vx = -Math.abs(lh.vx); }
      if (lh.y >= lh.groundY) {
        lh.y = lh.groundY;
        lh.vy = 0;
        lh.vx = 0;
        lh.inAir = false;
        lh.hopTimer = 0.85;
      }
    } else {
      lh.hopTimer -= dt;
      if (lh.hopTimer <= 0) {
        lh.inAir = true;
        lh.vy = -205;
        if (lh.x <= lh.minX + 10) lh.dir = 1;
        else if (lh.x >= lh.maxX - 10) lh.dir = -1;
        lh.vx = lh.dir * 62;
      }
    }

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, lh.x, lh.y, 18, 16)) {
      if (isLavaDashing) {
        window.sfx.playEnemyHit();
        score += 180;
        player.jumpsLeft = 2;
        spawnDroppedLilies(lh.x + 9, lh.y + 4, 3);
        spawnParticles(lh.x + 9, lh.y + 8, 18, '#ff2a70', 100, 65);
        lavaHoppers.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }

  // 2. Espíritus Orbitales de Fuego (Flame Wisps)
  for (let i = flameWisps.length - 1; i >= 0; i--) {
    const fw = flameWisps[i];
    fw.angle += fw.speed * dt;
    fw.x = fw.centerX + Math.cos(fw.angle) * fw.radius - 7;
    fw.y = fw.centerY + Math.sin(fw.angle) * fw.radius - 7;

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, fw.x, fw.y, 14, 14)) {
      if (isLavaDashing) {
        window.sfx.playEnemyHit();
        score += 180;
        player.jumpsLeft = 2;
        spawnDroppedLilies(fw.x + 7, fw.y + 7, 3);
        spawnParticles(fw.x + 7, fw.y + 7, 18, '#ff2a70', 95, 45);
        flameWisps.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }

  // 3. Gólems Acorazados de Obsidiana (Obsidian Brutes)
  for (let i = obsidianBrutes.length - 1; i >= 0; i--) {
    const ob = obsidianBrutes[i];
    if (ob.hitTimer > 0) ob.hitTimer -= dt;

    ob.x += ob.dir * ob.speed * dt;
    if (ob.x >= ob.maxX) { ob.x = ob.maxX; ob.dir = -1; }
    if (ob.x <= ob.minX) { ob.x = ob.minX; ob.dir = 1; }

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 2, ob.x, ob.y, 22, 22)) {
      if (isLavaDashing) {
        if (ob.hitTimer <= 0) {
          ob.hp--;
          ob.hitTimer = 0.4;
          player.vy = -175;
          player.jumpsLeft = 2;
          player.dashCooldown = 0.2;
          triggerShake(0.16, 2.5);
          spawnParticles(ob.x + 11, ob.y + 10, 16, '#ff2a70', 100, 60);

          if (ob.hp <= 0) {
            window.sfx.playEnemyDefeat();
            score += 300;
            spawnDroppedLilies(ob.x + 11, ob.y + 8, 5);
            spawnParticles(ob.x + 11, ob.y + 10, 24, '#b31b52', 115, 70);
            spawnFloatingText(ob.x - 12, ob.y - 12, '💥 ¡GÓLEM DESTRUIDO! (🌸x5)', '#ff8fab');
            obsidianBrutes.splice(i, 1);
          } else {
            window.sfx.playEnemyHit();
            spawnDroppedLilies(ob.x + 11, ob.y + 8, 1);
            spawnFloatingText(ob.x - 10, ob.y - 12, '🛡️ ¡ARMADURA ROTA! (1/2)', '#ffcad4');
          }
        }
      } else if (ob.hitTimer <= 0) {
        damagePlayer(false);
      }
    }
  }

  // 4. Gusanos de Magma Saltarines (Magma Worms)
  for (let i = magmaWorms.length - 1; i >= 0; i--) {
    const mw = magmaWorms[i];
    const jumpArc = Math.max(0, Math.sin(globalFrame * 0.045 * mw.speed + mw.phase));
    mw.y = mw.baseY - jumpArc * mw.jumpHeight;

    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, mw.x, mw.y, 12, 18)) {
      if (isLavaDashing) {
        window.sfx.playEnemyHit();
        score += 180;
        player.jumpsLeft = 2;
        spawnDroppedLilies(mw.x + 6, mw.y + 6, 3);
        spawnParticles(mw.x + 6, mw.y + 8, 18, '#ff2a70', 95, 55);
        magmaWorms.splice(i, 1);
      } else {
        damagePlayer(false);
      }
    }
  }
}


// --- MODULO: src/entities/enemies/omniman.js ---
// ============================================================================
// 🦸🏻‍♂️ BOSS FIGHT: OMNI-MAN (5 DE VIDA, FASE 2 TRAS 2 GOLPES, PUERTA DE CASTILLO CERRADA)
// ============================================================================
function updateOmniMenAndRocks(dt, isLavaDashing) {
  const gate = level.bossCastleGate;

  // Control del Portón del Castillo de Omni-Man
  if (gate && omniMen.length > 0) {
    if (!bossFightActive && player.x < gate.triggerX && player.y <= gate.triggerY) {
      bossFightActive = true;
      window.sfx.playLaserFire();
      triggerShake(0.28, 3.8);
      spawnParticles(gate.x + 10, gate.y + 60, 24, '#ff2a55', 95, 40);
      spawnFloatingText(player.x - 48, player.y - 26, '🏰 ¡CASTILLO CERRADO! ¡DERROTA A OMNI-MAN!', '#ff2a55');
    }

    if (bossFightActive) {
      if (player.x + player.w > gate.x) {
        player.x = gate.x - player.w;
        if (player.vx > 0) player.vx = 0;
      }
      if (player.x < 765) {
        player.x = 765;
        if (player.vx < 0) player.vx = 0;
      }
    }
  } else {
    bossFightActive = false;
  }

  for (let i = omniMen.length - 1; i >= 0; i--) {
    const om = omniMen[i];
    if (om.hitTimer > 0) om.hitTimer -= dt;

    const dx = player.x - om.x;
    const dy = player.y - om.y;
    const dist = Math.hypot(dx, dy);
    const inArena = gate ? bossFightActive : (dist < (om.range || 500));
    const speedMult = om.isEnraged ? 1.6 : 1.0;

    if (inArena) {
      om.stateTimer -= dt;
    }

    if (om.bossState === 'patrol') {
      om.y += (om.baseY - om.y) * Math.min(1, dt * 6);
      if (om.minX !== undefined && om.maxX !== undefined) {
        om.x += om.dir * (om.speed || 66) * speedMult * dt;
        if (om.x >= om.maxX) { om.x = om.maxX; om.dir = -1; }
        if (om.x <= om.minX) { om.x = om.minX; om.dir = 1; }
      }
      om.facingRight = dx > 0;

      if (inArena) {
        om.timer -= dt * (om.isEnraged ? 1.35 : 1.0);
        if (om.timer <= 0) {
          om.timer = om.throwInterval;
          window.sfx.playMagmaThrow();
          const flightTime = Math.max(0.5, Math.min(1.0, Math.abs(dx) / 220));
          const baseVx = dx / flightTime;
          const baseVy = (dy - 0.5 * 380 * flightTime * flightTime) / flightTime;

          const spreads = om.isEnraged ? [-55, 0, 55] : [0];
          for (const sp of spreads) {
            magmaRocks.push({
              x: om.x + 12,
              y: om.y - 4,
              vx: baseVx + sp,
              vy: baseVy - Math.abs(sp) * 0.25,
              isShockwave: false,
              life: 3.5
            });
          }
        }

        if (om.stateTimer <= 0) {
          om.attackCycle = (om.attackCycle + 1) % 2;
          if (om.attackCycle === 0) {
            om.bossState = 'swoop_charge';
            om.stateTimer = om.isEnraged ? 0.45 : 0.65;
            om.swoopDir = player.x >= om.x ? 1 : -1;
            om.facingRight = om.swoopDir > 0;
            window.sfx.playLaserWarning();
          } else {
            om.bossState = 'slam_aim';
            om.stateTimer = om.isEnraged ? 0.48 : 0.68;
            window.sfx.playLaserWarning();
          }
        }
      }
    } else if (om.bossState === 'swoop_charge') {
      const targetY = om.groundY - 28;
      om.y += (targetY - om.y) * Math.min(1, dt * 8);
      if (om.stateTimer <= 0) {
        om.bossState = 'swoop';
        om.stateTimer = om.isEnraged ? 1.15 : 1.35;
        window.sfx.playLavaDash();
        triggerShake(0.18, 2.5);
      }
    } else if (om.bossState === 'swoop') {
      const swoopSpeed = om.isEnraged ? 320 : 235;
      om.x += om.swoopDir * swoopSpeed * dt;
      if (globalFrame % 2 === 0) {
        spawnParticles(om.x + 12, om.y + 14, 2, '#ff0055', 50, 0);
      }
      if (om.x <= om.minX - 20 || om.x >= om.maxX + 20 || om.stateTimer <= 0) {
        om.x = Math.max(om.minX, Math.min(om.maxX, om.x));
        om.bossState = 'patrol';
        om.stateTimer = om.isEnraged ? 1.5 : 2.3;
      }
    } else if (om.bossState === 'slam_aim') {
      const targetX = Math.max(om.minX + 30, Math.min(om.maxX - 30, player.x));
      om.x += (targetX - om.x) * Math.min(1, dt * 7);
      om.y += ((om.baseY - 18) - om.y) * Math.min(1, dt * 7);
      om.facingRight = dx > 0;
      if (om.stateTimer <= 0) {
        om.bossState = 'slam_down';
        window.sfx.playLavaDash();
      }
    } else if (om.bossState === 'slam_down') {
      om.y += (om.isEnraged ? 520 : 420) * dt;
      spawnParticles(om.x + 12, om.y, 2, '#ff2a70', 60, -30);
      if (om.y >= om.groundY) {
        om.y = om.groundY;
        om.bossState = 'slam_recover';
        om.stateTimer = om.isEnraged ? 0.75 : 1.05;
        window.sfx.playLaserFire();
        triggerShake(0.35, 4.5);
        spawnParticles(om.x + 12, om.y + 24, 26, '#ff2a70', 140, 60);
        spawnParticles(om.x + 12, om.y + 24, 14, '#ffcad4', 110, 40);

        const waveSpd = om.isEnraged ? 235 : 175;
        magmaRocks.push(
          { x: om.x, y: om.groundY + 22, vx: -waveSpd, vy: 0, isShockwave: true, life: 1.8 },
          { x: om.x + 20, y: om.groundY + 22, vx: waveSpd, vy: 0, isShockwave: true, life: 1.8 }
        );
        if (om.isEnraged) {
          magmaRocks.push(
            { x: om.x + 6, y: om.groundY + 10, vx: -110, vy: -220, isShockwave: false, life: 2.5 },
            { x: om.x + 16, y: om.groundY + 10, vx: 110, vy: -220, isShockwave: false, life: 2.5 }
          );
        }
      }
    } else if (om.bossState === 'slam_recover') {
      if (om.stateTimer <= 0) {
        om.bossState = 'patrol';
        om.stateTimer = om.isEnraged ? 1.4 : 2.2;
      }
    }

    // Colisión Jugador <-> Boss Omni-Man
    if (rectOverlap(player.x, player.y, player.w, player.h, om.x - 4, om.y - 6, 30, 34)) {
      if (isLavaDashing) {
        if (om.hitTimer <= 0) {
          om.hp--;
          om.hitTimer = 0.48;
          player.vy = -215;
          player.jumpsLeft = 2;
          player.dashCooldown = 0.22;
          triggerShake(0.24, 3.8);
          spawnParticles(om.x + 12, om.y + 10, 18, '#ff2a70', 110, 60);
          spawnParticles(om.x + 12, om.y + 10, 10, '#ffcad4', 90, 40);

          if (om.hp <= 0) {
            bossFightActive = false;
            magmaRocks = [];
            window.sfx.playEnemyDefeat();
            score += 1000;
            spawnDroppedLilies(om.x + 12, om.y + 10, 15);
            spawnParticles(om.x + 12, om.y + 10, 40, '#ff2a55', 145, 80);
            spawnFloatingText(om.x - 36, om.y - 18, '💥 ¡OMNI-MAN DERROTADO! ¡CASTILLO Y JAULA ABIERTOS!', '#00f5d4');
            if (gate) {
              spawnParticles(gate.x + 10, gate.y + 60, 24, '#00f5d4', 110, 45);
            }
            if (level.babyMouse) {
              spawnParticles(level.babyMouse.x + 8, level.babyMouse.y, 30, '#00f5d4', 115, 50);
              spawnFloatingText(level.babyMouse.x - 20, level.babyMouse.y - 18, '🔓 ¡JAULA ROTA!', '#ffd166');
            }
            omniMen.splice(i, 1);
            continue;
          } else if (om.hp <= 3 && !om.isEnraged) {
            om.isEnraged = true;
            om.bossState = 'patrol';
            om.stateTimer = 0.8;
            window.sfx.playLaserFire();
            triggerShake(0.45, 5);
            spawnDroppedLilies(om.x + 12, om.y + 10, 4);
            spawnParticles(om.x + 12, om.y + 10, 32, '#ff0055', 140, 40);
            spawnFloatingText(om.x - 45, om.y - 24, `🔥 ¡FASE 2: FURIA VILTRUMITA! (${om.hp}/${om.maxHp})`, '#ff0055');
          } else {
            window.sfx.playEnemyHit();
            spawnDroppedLilies(om.x + 12, om.y + 10, 2);
            spawnFloatingText(om.x - 12, om.y - 16, `💥 ¡GOLPE! (${om.hp}/${om.maxHp})`, '#ff8fab');
          }
        }
      } else if (om.hitTimer <= 0) {
        damagePlayer(false);
      }
    }
  }

  for (let i = magmaRocks.length - 1; i >= 0; i--) {
    const r = magmaRocks[i];
    r.x += r.vx * dt;
    r.y += r.vy * dt;
    if (!r.isShockwave) {
      r.vy += 380 * dt;
    }
    r.life -= dt;

    if (globalFrame % 2 === 0) {
      spawnParticles(r.x, r.y, 1, r.isShockwave ? '#ff0055' : '#ff2a70', 28, r.isShockwave ? -30 : 20);
    }

    if (rectOverlap(player.x + 3, player.y + 3, player.w - 6, player.h - 6, r.x - 6, r.y - 6, 12, 12)) {
      if (isLavaDashing) {
        spawnParticles(r.x, r.y, 10, '#ffcad4', 90, 40);
        magmaRocks.splice(i, 1);
        continue;
      } else {
        damagePlayer(false);
        magmaRocks.splice(i, 1);
        continue;
      }
    }

    if (r.life <= 0 || r.y > level.worldHeight + 40) {
      magmaRocks.splice(i, 1);
    }
  }
}


// --- MODULO: src/entities/enemies/kraken_boss.js ---
// ============================================================================
// BOSS FIGHT: KRAKEN DE LAS PROFUNDIDADES (8 OJOS, 3 FASES Y COMBATE CINEMÁTICO)
// ============================================================================
let krakenBossState = {
  active: false,
  x: 18920,
  y: 135,
  eyesRemaining: 8,
  maxEyes: 8,
  phase: 1,
  hitTimer: 0,
  attackTimer: 2.0,
  waveTimer: 4.5,
  geyserTimer: 3.5,
  sweepTimer: 6.0,
  slams: [],
  shockwaves: [],
  waves: [],
  geysers: [],
  sweep: { active: false, x: 0, w: 90, h: 22, timer: 0 },
  debrisRock: { active: false, x: 0, y: 0, vx: 0, vy: 0, type: 'slab' },
  isDefeated: false
};

function startKrakenBossFight() {
  krakenBossState = {
    active: true,
    x: 18920,
    y: 135,
    eyesRemaining: 8,
    maxEyes: 8,
    phase: 1,
    hitTimer: 0,
    attackTimer: 1.8,
    waveTimer: 4.0,
    geyserTimer: 3.5,
    sweepTimer: 6.0,
    slams: [],
    shockwaves: [],
    waves: [],
    geysers: [],
    sweep: { active: false, x: 0, w: 90, h: 22, timer: 0 },
    debrisRock: { active: false, x: 0, y: 0, vx: 0, vy: 0, type: 'slab' },
    isDefeated: false
  };
  window.krakenBossState = krakenBossState;
  triggerShake(1.4, 2.8);
  if (typeof spawnFloatingText === 'function') {
    spawnFloatingText(player.x - 20, player.y - 30, '¡BATALLA: KRAKEN ABISAL!', '#ffd166');
  }
}

function updateKrakenBossFight(dt) {
  const k = window.krakenBossState || krakenBossState;
  if (!k.active || k.isDefeated) return;

  // 1. Confinar a Elizabeth en la plataforma de combate del helipuerto
  if (player.x < 18260) { player.x = 18260; if (player.vx < 0) player.vx = 0; }
  if (player.x > 18860) { player.x = 18860; if (player.vx > 0) player.vx = 0; }

  if (k.hitTimer > 0) k.hitTimer -= dt;

  // 2. Fases de dificultad según ojos destruidos
  k.phase = k.eyesRemaining <= 2 ? 3 : (k.eyesRemaining <= 5 ? 2 : 1);

  // --------------------------------------------------------------------------
  // 3. ATAQUE A: IMPACTOS DE TENTÁCULO Y ONDAS DE CHOQUE (SLAMS)
  // --------------------------------------------------------------------------
  k.attackTimer -= dt;
  if (k.attackTimer <= 0) {
    k.attackTimer = k.phase === 3 ? 1.3 : (k.phase === 2 ? 1.7 : 2.2);

    // En Fase 2 y 3, lanza 1 o 2 tentáculos
    const count = k.phase >= 2 && Math.random() > 0.4 ? 2 : 1;
    for (let c = 0; c < count; c++) {
      const offset = c === 0 ? (Math.random() * 60 - 30) : (Math.random() > 0.5 ? 90 : -90);
      const targetX = Math.min(18920, Math.max(18280, player.x + offset));
      k.slams.push({ x: targetX, y: 196, timer: 0.8, struck: false });
    }
  }

  // Actualizar impactos de tentáculos
  for (let i = k.slams.length - 1; i >= 0; i--) {
    const s = k.slams[i];
    s.timer -= dt;
    if (s.timer <= 0 && !s.struck) {
      s.struck = true;
      triggerShake(0.3, 1.4);
      spawnParticles(s.x, s.y, 16, '#00b4d8', 90, 40);
      spawnParticles(s.x, s.y, 10, '#ffffff', 80, 30);

      // Generar dos ondas de choque que viajan por el suelo hacia izq y der
      k.shockwaves.push({ x: s.x - 8, y: 194, vx: -160, life: 0.7 });
      k.shockwaves.push({ x: s.x + 8, y: 194, vx: 160, life: 0.7 });

      // Daño por aplastamiento directo
      if (Math.abs(player.x + 11 - s.x) < 28 && Math.abs(player.y + 12 - s.y) < 28 && player.dashTimer <= 0) {
        damagePlayer(false);
      }
    }
    if (s.timer < -0.45) k.slams.splice(i, 1);
  }

  // Actualizar ondas de choque en el suelo
  for (let i = k.shockwaves.length - 1; i >= 0; i--) {
    const sw = k.shockwaves[i];
    sw.x += sw.vx * dt;
    sw.life -= dt;
    // Daño si el jugador está en el suelo y colisiona con la onda
    if (Math.abs(player.x + 11 - sw.x) < 14 && player.y >= 180 && player.dashTimer <= 0 && player.invulnTimer <= 0) {
      damagePlayer(false);
    }
    if (sw.life <= 0 || sw.x < 18220 || sw.x > 18980) {
      k.shockwaves.splice(i, 1);
    }
  }

  // --------------------------------------------------------------------------
  // 4. ATAQUE B: OLAS DE SURF AVANZANDO POR EL SUELO
  // --------------------------------------------------------------------------
  k.waveTimer -= dt;
  if (k.waveTimer <= 0) {
    k.waveTimer = k.phase === 3 ? 3.2 : (k.phase === 2 ? 4.2 : 5.2);
    k.waves.push({ x: 19020, y: 194, vx: -200, w: 38, h: 22 });
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }

  for (let i = k.waves.length - 1; i >= 0; i--) {
    const wv = k.waves[i];
    wv.x += wv.vx * dt;
    // Si el jugador está sobre la plataforma y no salta / no surfea la ola
    if (Math.abs(player.x + 11 - (wv.x + wv.w / 2)) < 20 && player.y >= 178 && player.dashTimer <= 0 && player.invulnTimer <= 0) {
      damagePlayer(false);
      player.vy = -180;
    }
    if (wv.x + wv.w < 18200) {
      k.waves.splice(i, 1);
    }
  }

  // --------------------------------------------------------------------------
  // 5. ATAQUE C: GÉISERES DE AGUA A PRESIÓN (FASE 2 Y 3)
  // --------------------------------------------------------------------------
  if (k.phase >= 2) {
    k.geyserTimer -= dt;
    if (k.geyserTimer <= 0) {
      k.geyserTimer = k.phase === 3 ? 2.5 : 3.8;
      const geyserX = 18320 + Math.floor(Math.random() * 5) * 120;
      k.geysers.push({ x: geyserX, y: 196, timer: 0.7, activeTimer: 0.6, erupted: false });
    }

    for (let i = k.geysers.length - 1; i >= 0; i--) {
      const g = k.geysers[i];
      g.timer -= dt;
      if (g.timer <= 0) {
        g.erupted = true;
        g.activeTimer -= dt;
        // Chorro activo hacia arriba
        if (Math.abs(player.x + 11 - g.x) < 22 && player.y > 110 && player.invulnTimer <= 0) {
          damagePlayer(false);
          player.vy = -260;
        }
      }
      if (g.activeTimer <= 0) {
        k.geysers.splice(i, 1);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 6. ATAQUE D: BARRIDO DE TENTÁCULO HORIZONTAL (FASE 3 - CLÍMAX)
  // --------------------------------------------------------------------------
  if (k.phase === 3) {
    k.sweepTimer -= dt;
    if (k.sweepTimer <= 0 && !k.sweep.active) {
      k.sweepTimer = 5.5;
      k.sweep = { active: true, x: 19050, vx: -360, y: 184, w: 90, h: 18, timer: 2.4 };
      triggerShake(0.8, 1.8);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x - 20, player.y - 25, '¡BARRIDO! ¡SUBE A LOS CONTENEDORES!', '#ff0054');
      }
    }

    if (k.sweep.active) {
      k.sweep.x += k.sweep.vx * dt;
      k.sweep.timer -= dt;
      // Daño si el jugador está en el nivel del suelo (y >= 165)
      if (rectOverlap(player.x, player.y, player.w, player.h, k.sweep.x, k.sweep.y, k.sweep.w, k.sweep.h)) {
        if (player.dashTimer <= 0 && player.invulnTimer <= 0) {
          damagePlayer(false);
          player.vy = -200;
        }
      }
      if (k.sweep.x + k.sweep.w < 18180 || k.sweep.timer <= 0) {
        k.sweep.active = false;
      }
    }
  }

  // --------------------------------------------------------------------------
  // 7. LANZAMIENTO DE ESCOMBROS HACIA LOS OJOS DEL KRAKEN
  // --------------------------------------------------------------------------
  const piles = [
    { x: 18360, type: 'slab' },
    { x: 18660, type: 'taxi' },
    { x: 18860, type: 'girder' }
  ];
  const currentNearPile = piles.find(p => Math.abs(player.x + 11 - p.x) < 42);

  if (keys.dashJustPressed && currentNearPile && !k.debrisRock.active) {
    k.debrisRock = {
      active: true,
      x: player.x + 14,
      y: player.y + 6,
      vx: 440,
      vy: -125,
      type: currentNearPile.type,
      rot: 0
    };
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(true);
    spawnFloatingText(player.x - 10, player.y - 22, '¡ESCOMBRO LANZADO!', '#ffd166');
    triggerShake(0.2, 0.4);
  }

  // --------------------------------------------------------------------------
  // 8. FÍSICAS E IMPACTO DEL ESCOMBRO EN LOS OJOS
  // --------------------------------------------------------------------------
  const r = k.debrisRock;
  if (r && r.active) {
    r.x += r.vx * dt;
    r.y += r.vy * dt;
    r.vy += 220 * dt;
    r.rot += dt * 8;

    // Colisión con la cabeza del Kraken
    if (r.x >= k.x - 38 && r.y >= k.y - 55 && r.y <= k.y + 35) {
      r.active = false;
      k.eyesRemaining--;
      k.hitTimer = 0.5;
      triggerShake(0.7, 2.2);

      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
      spawnParticles(k.x, k.y - 15, 26, '#ffd166', 120, 60);
      spawnParticles(k.x, k.y - 15, 22, '#00f5d4', 110, 50);
      spawnParticles(k.x, k.y - 15, 18, '#ffffff', 100, 40);

      spawnFloatingText(k.x - 50, k.y - 60, `¡OJO DESTRUIDO! (QUEDAN ${k.eyesRemaining})`, '#ffd166');

      // Si se destruyeron todos los ojos -> VICTORIA MONUMENTAL
      if (k.eyesRemaining <= 0) {
        k.isDefeated = true;
        k.active = false;
        triggerShake(1.6, 4.5);
        if (typeof startKrakenVictoryCutscene === 'function') {
          startKrakenVictoryCutscene();
        } else if (window.sfx && window.sfx.playVictory) {
          window.sfx.playVictory();
        }
      }
    }
    if (r.y > 230 || r.x > k.x + 60) r.active = false;
  }
}

if (typeof module !== 'undefined') {
  module.exports = { startKrakenBossFight, updateKrakenBossFight };
}


// --- MODULO: src/entities/enemies/kraken_render.js ---
// ============================================================================
// RENDERIZADO DEL KRAKEN EN EL MUNDO: ATAQUES, GÉISERES, OLAS Y ESCOMBROS
// ============================================================================

function drawKrakenBossWorld(ctx) {
  const k = window.krakenBossState || krakenBossState;
  if (!k || (!k.active && !k.isDefeated)) return;

  // --------------------------------------------------------------------------
  // 1. DIBUJAR CUERPO Y CABEZA DEL KRAKEN EN SU POSICIÓN DEL REMOLINO
  // --------------------------------------------------------------------------
  if (window.sprites && window.sprites.drawKrakenBoss) {
    window.sprites.drawKrakenBoss(ctx, k, globalFrame);
  }

  // --------------------------------------------------------------------------
  // 2. INDICADORES DE ALERTA Y APLASTAMIENTO DE TENTÁCULOS (SLAMS)
  // --------------------------------------------------------------------------
  if (k.slams && k.slams.length > 0) {
    k.slams.forEach(s => {
      if (s.timer > 0) {
        // Retícula de advertencia náutica: vórtice de remolino en el suelo
        const pulse = Math.sin(globalFrame * 0.3) * 3;
        ctx.strokeStyle = '#ffd166';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y - 4, 22 + pulse, 7 + pulse * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 245, 212, 0.28)';
        ctx.fill();

        // Signo de exclamación de peligro
        ctx.fillStyle = '#ff0054';
        ctx.fillRect(s.x - 2, s.y - 24, 4, 9);
        ctx.fillRect(s.x - 2, s.y - 13, 4, 3);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(s.x - 1, s.y - 23, 2, 7);
        ctx.fillRect(s.x - 1, s.y - 12, 2, 2);
      } else {
        // Tentáculo titánico estrellándose contra el suelo
        if (window.sprites && window.sprites.drawKrakenTentacle) {
          window.sprites.drawKrakenTentacle(ctx, s.x, s.y, globalFrame, 1.3);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. ONDAS DE CHOQUE EXPANSIVAS POR EL SUELO
  // --------------------------------------------------------------------------
  if (k.shockwaves && k.shockwaves.length > 0) {
    k.shockwaves.forEach(sw => {
      const dir = sw.vx > 0 ? 1 : -1;
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(sw.x - 4, sw.y - 5, 8, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sw.x - 2, sw.y - 7, 5, 3);
      // Espuela de agua proyectada
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(sw.x + dir * 3, sw.y - 4, 4, 4);
    });
  }

  // --------------------------------------------------------------------------
  // 4. OLAS DE SURF AVANZANDO POR LA ARENA DE COMBATE
  // --------------------------------------------------------------------------
  if (k.waves && k.waves.length > 0) {
    k.waves.forEach(wv => {
      const wx = Math.round(wv.x);
      const wy = Math.round(wv.y);
      // Masa de ola turquesa
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(wx, wy - 10, wv.w, 14);
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(wx + 2, wy - 12, wv.w - 4, 4);
      // Cresta espumosa blanca
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(wx, wy - 14, wv.w, 3);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(wx + 2, wy - 15, wv.w - 6, 2);
    });
  }

  // --------------------------------------------------------------------------
  // 5. GÉISERES DE AGUA A PRESIÓN ERUPCIONANDO (FASE 2 Y 3)
  // --------------------------------------------------------------------------
  if (k.geysers && k.geysers.length > 0) {
    k.geysers.forEach(g => {
      const gx = Math.round(g.x);
      if (g.timer > 0) {
        // Burbujeo de advertencia en la rejilla
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fillRect(gx - 8, g.y - 3, 16, 3);
        ctx.fillStyle = '#00f5d4';
        ctx.fillRect(gx - 4, g.y - 5, 8, 2);
      } else if (g.erupted) {
        // Columna vertical de agua a presión
        const colH = 95;
        const colY = g.y - colH;
        // Núcleo acuático
        ctx.fillStyle = 'rgba(0, 180, 216, 0.85)';
        ctx.fillRect(gx - 7, colY, 14, colH);
        ctx.fillStyle = 'rgba(72, 202, 228, 0.9)';
        ctx.fillRect(gx - 4, colY, 8, colH);
        // Espuma blanca en la cúspide
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(gx - 10, colY - 4, 20, 8);
        ctx.fillStyle = '#caf0f8';
        ctx.fillRect(gx - 8, colY - 8, 16, 5);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. BARRIDO DE TENTÁCULO HORIZONTAL (FASE 3)
  // --------------------------------------------------------------------------
  if (k.sweep && k.sweep.active) {
    const swx = Math.round(k.sweep.x);
    const swy = Math.round(k.sweep.y);
    // Masa del tentáculo gigante barriendo
    ctx.fillStyle = '#000814';
    ctx.fillRect(swx - 2, swy - 2, k.sweep.w + 4, k.sweep.h + 4);
    ctx.fillStyle = '#03045e';
    ctx.fillRect(swx, swy, k.sweep.w, k.sweep.h);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(swx + 4, swy + 2, k.sweep.w - 8, 4);

    // Ventosas bioluminiscentes doradas de furia
    for (let vx = swx + 8; vx < swx + k.sweep.w - 8; vx += 16) {
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(vx, swy + 6, 6, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(vx + 2, swy + 8, 2, 2);
    }
    // Estela de agua arrastrada por el barrido
    ctx.fillStyle = 'rgba(202, 240, 248, 0.65)';
    ctx.fillRect(swx + k.sweep.w, swy, 36, k.sweep.h);
  }

  // --------------------------------------------------------------------------
  // 7. MONTÍCULOS DE ESCOMBROS URBANOS (ESTACIONES DE LANZAMIENTO)
  // --------------------------------------------------------------------------
  const piles = [
    { x: 18360, type: 'slab' },
    { x: 18660, type: 'taxi' },
    { x: 18860, type: 'girder' }
  ];

  piles.forEach(p => {
    const px = p.x;
    if (p.type === 'slab') {
      // Losa de hormigón fracturado
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 14, 188, 28, 8);
      ctx.fillStyle = '#495057';
      ctx.fillRect(px - 12, 186, 24, 7);
      ctx.fillStyle = '#7f4f24'; // Ferralla expuesta
      ctx.fillRect(px + 10, 188, 5, 2);
    } else if (p.type === 'taxi') {
      // Capó / resto de taxi amarillo
      ctx.fillStyle = '#0a1128';
      ctx.fillRect(px - 16, 186, 32, 10);
      ctx.fillStyle = '#ffb703';
      ctx.fillRect(px - 14, 185, 28, 9);
      ctx.fillStyle = '#14101c'; // Franja a cuadros
      ctx.fillRect(px - 8, 187, 4, 3);
      ctx.fillRect(px, 187, 4, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px - 4, 187, 4, 3);
    } else if (p.type === 'girder') {
      // Viga de acero con franja amarilla de peligro
      ctx.fillStyle = '#0a1128';
      ctx.fillRect(px - 15, 187, 30, 9);
      ctx.fillStyle = '#293241';
      ctx.fillRect(px - 13, 186, 26, 7);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 8, 187, 5, 5);
      ctx.fillRect(px + 2, 187, 5, 5);
    }

    // Indicador interactivo si Elizabeth está cerca
    if (k.active && Math.abs(player.x + 11 - px) < 42) {
      const bob = Math.sin(globalFrame * 0.2) * 2.5;
      const py = 168 + bob;
      ctx.fillStyle = 'rgba(10, 17, 40, 0.88)';
      ctx.fillRect(px - 34, py - 6, 68, 13);
      ctx.strokeStyle = '#ffd166';
      ctx.lineWidth = 1;
      ctx.strokeRect(px - 34, py - 6, 68, 13);

      ctx.fillStyle = '#ffd166';
      ctx.font = `bold 6.5px ${UI_FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText('[DASH] ARROJAR', px, py + 3);
    }
  });

  // --------------------------------------------------------------------------
  // 8. ESCOMBRO EN PLENO VUELO DISPARADO HACIA LOS OJOS DEL KRAKEN
  // --------------------------------------------------------------------------
  const r = k.debrisRock;
  if (r && r.active) {
    const rx = Math.round(r.x);
    const ry = Math.round(r.y);

    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(r.rot || 0);

    if (r.type === 'taxi') {
      ctx.fillStyle = '#ffb703';
      ctx.fillRect(-6, -5, 12, 10);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(-2, -3, 4, 3);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(2, -4, 3, 3);
    } else if (r.type === 'girder') {
      ctx.fillStyle = '#293241';
      ctx.fillRect(-8, -4, 16, 8);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(-4, -3, 4, 6);
      ctx.fillRect(2, -3, 4, 6);
    } else {
      ctx.fillStyle = '#495057';
      ctx.fillRect(-6, -5, 12, 10);
      ctx.fillStyle = '#6c757d';
      ctx.fillRect(-4, -4, 8, 8);
      ctx.fillStyle = '#7f4f24';
      ctx.fillRect(3, -2, 4, 2);
    }
    ctx.restore();

    // Estela de agua y velocidad
    ctx.fillStyle = 'rgba(202, 240, 248, 0.65)';
    ctx.fillRect(rx - 12, ry - 2, 8, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(rx - 8, ry - 1, 5, 2);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawKrakenBossWorld };
}


// --- MODULO: src/entities/enemies/yeti_boss.js ---
// ============================================================================
// BOSS FIGHT: EL GRAN YETI DE CRISTAL (MUNDO 4 • FASE 6)
// ============================================================================
// Combate colosal en el Santuario de Cristal: pisotones con estalactitas,
// lanzamiento de bolas de nieve gigantes y embestidas con aturdimiento.

let yetiBossState = {
  active: false,
  x: 29050,
  y: 78,
  w: 44,
  h: 48,
  vx: 0,
  vy: 0,
  facingRight: false,
  hp: 6,
  maxHp: 6,
  phase: 1,
  action: 'idle',
  actionTimer: 1.6,
  isStunned: false,
  stunTimer: 0,
  hitCooldown: 0,
  isDefeated: false,
  icicles: [],
  snowballs: [],
  shockwaves: [],
  gateLeft: { x: 28640, y: 126, closed: false },
  gateRight: { x: 29360, y: 126, closed: false },
  arenaMinX: 28655,
  arenaMaxX: 29345
};

function initYetiBoss() {
  yetiBossState = {
    active: false,
    x: 29050,
    y: 78,
    w: 44,
    h: 48,
    vx: 0,
    vy: 0,
    facingRight: false,
    hp: 6,
    maxHp: 6,
    phase: 1,
    action: 'idle',
    actionTimer: 1.6,
    isStunned: false,
    stunTimer: 0,
    hitCooldown: 0,
    isDefeated: false,
    icicles: [],
    snowballs: [],
    shockwaves: [],
    gateLeft: { x: 28640, y: 126, closed: false },
    gateRight: { x: 29360, y: 126, closed: false },
    arenaMinX: 28655,
    arenaMaxX: 29345
  };
  window.yetiBossState = yetiBossState;
}

function startYetiBossFight() {
  if (yetiBossState.active || yetiBossState.isDefeated) return;
  yetiBossState.active = true;
  yetiBossState.gateLeft.closed = true;
  yetiBossState.gateRight.closed = true;
  yetiBossState.action = 'roar';
  yetiBossState.actionTimer = 1.4;
  yetiBossState.hp = 6;
  yetiBossState.phase = 1;
  window.yetiBossState = yetiBossState;

  if (typeof triggerShake === 'function') triggerShake(1.2, 2.5);
  if (window.sfx && window.sfx.playHit) window.sfx.playHit();
  if (typeof spawnFloatingText === 'function') {
    spawnFloatingText(player.x - 30, player.y - 25, 'BATALLA: EL GRAN YETI!', '#38bdf8');
  }
}

function updateYetiBoss(dt) {
  if (!level || level.id !== 4) return;
  const s = yetiBossState;

  // Activar combate cuando Elizabeth entra al santuario
  if (!s.active && !s.isDefeated && player.x >= 28680 && player.x <= 29320) {
    startYetiBossFight();
  }

  if (!s.active && !s.isDefeated) return;

  // Bloquear a Elizabeth dentro de la arena durante la batalla
  if (s.active && !s.isDefeated) {
    if (player.x < s.arenaMinX) { player.x = s.arenaMinX; if (player.vx < 0) player.vx = 0; }
    if (player.x > s.arenaMaxX) { player.x = s.arenaMaxX; if (player.vx > 0) player.vx = 0; }
  }

  if (s.hitCooldown > 0) s.hitCooldown -= dt;

  // Actualizar proyectiles: estalactitas cayendo
  for (let i = s.icicles.length - 1; i >= 0; i--) {
    const ic = s.icicles[i];
    ic.y += ic.vy * dt;
    ic.vy += 450 * dt;

    if (rectOverlap(player.x, player.y, player.w, player.h, ic.x - 4, ic.y, 8, 16)) {
      damagePlayer(false);
      s.icicles.splice(i, 1);
      continue;
    }
    if (ic.y >= 126) {
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(ic.x, 126, 4, '#e0f2fe');
      }
      s.icicles.splice(i, 1);
    }
  }

  // Actualizar proyectiles: bolas de nieve rodantes
  for (let i = s.snowballs.length - 1; i >= 0; i--) {
    const sb = s.snowballs[i];
    sb.x += sb.vx * dt;
    sb.rot += sb.vx * dt * 0.08;

    if (rectOverlap(player.x, player.y, player.w, player.h, sb.x - sb.r, sb.y - sb.r, sb.r * 2, sb.r * 2)) {
      damagePlayer(false);
      s.snowballs.splice(i, 1);
      continue;
    }
    if (sb.x < s.arenaMinX - 20 || sb.x > s.arenaMaxX + 20) {
      s.snowballs.splice(i, 1);
    }
  }

  // Actualizar ondas de choque en el suelo
  for (let i = s.shockwaves.length - 1; i >= 0; i--) {
    const sw = s.shockwaves[i];
    sw.x += sw.dir * sw.speed * dt;
    sw.life -= dt;

    if (rectOverlap(player.x, player.y, player.w, player.h, sw.x - 8, sw.y - 10, 16, 12)) {
      damagePlayer(false);
    }
    if (sw.life <= 0 || sw.x < s.arenaMinX || sw.x > s.arenaMaxX) {
      s.shockwaves.splice(i, 1);
    }
  }

  // Si esta derrotado, esperar y permanecer pacifico
  if (s.isDefeated) {
    s.vx = 0;
    return;
  }

  // Estado: Aturdido (momento para que Elizabeth golpee con el Pico de Hielo)
  if (s.isStunned) {
    s.stunTimer -= dt;
    s.vx = 0;

    // Elizabeth golpea al Yeti mientras esta mareado
    const canHitWithPick = player.isSwingingPick || (keys.dashJustPressed && player.ability === 'ice_pick');
    const isStomping = player.vy > 0 && player.y + player.h <= s.y + 26;
    const isNear = Math.abs((player.x + 11) - (s.x + s.w / 2)) < 44;

    if (s.hitCooldown <= 0 && isNear && (canHitWithPick || isStomping)) {
      s.hitCooldown = 1.0;
      s.hp--;
      if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
      if (typeof triggerShake === 'function') triggerShake(0.35, 3.2);

      if (typeof spawnParticles === 'function') {
        spawnParticles(s.x + s.w / 2, s.y + 18, 25, '#38bdf8', 120, -50);
        spawnParticles(s.x + s.w / 2, s.y + 18, 15, '#ffffff', 80, -30);
      }
      if (isStomping) {
        player.vy = -260;
        player.jumpsLeft = 2;
      }

      if (s.hp <= 0) {
        // Derrota del Yeti
        s.isDefeated = true;
        s.active = false;
        s.isStunned = false;
        s.action = 'defeated';
        s.gateLeft.closed = false;
        s.gateRight.closed = false;
        score += 5000;
        if (window.sfx && window.sfx.playVictory) window.sfx.playVictory();
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(s.x - 20, s.y - 20, 'YETI PACIFICADO! +5000', '#ffd166');
        }
        return;
      } else {
        // Despertar enfurecido
        s.isStunned = false;
        s.phase = s.hp <= 2 ? 3 : (s.hp <= 4 ? 2 : 1);
        s.action = 'roar';
        s.actionTimer = 0.9;
      }
    }

    if (s.stunTimer <= 0) {
      s.isStunned = false;
      s.action = 'roar';
      s.actionTimer = 0.8;
    }
    return;
  }

  // Daño por contacto si Elizabeth toca al Yeti cuando NO esta aturdido
  if (rectOverlap(player.x, player.y, player.w, player.h, s.x + 4, s.y + 4, s.w - 8, s.h - 4)) {
    damagePlayer(false);
  }

  // Maquina de estados del combate
  s.actionTimer -= dt;
  s.facingRight = player.x > s.x + s.w / 2;

  // 1. Rugido inicial o transicion
  if (s.action === 'roar') {
    s.vx = 0;
    if (globalFrame % 5 === 0 && typeof spawnParticles === 'function') {
      spawnParticles(s.x + s.w / 2, s.y + 12, 2, '#e0f2fe', 40, -10);
    }
    if (s.actionTimer <= 0) {
      // Elegir siguiente accion segun fase
      const r = Math.random();
      if (s.phase === 1) {
        s.action = r < 0.5 ? 'stomp' : 'charge';
      } else if (s.phase === 2) {
        s.action = r < 0.35 ? 'stomp' : (r < 0.7 ? 'throw' : 'charge');
      } else {
        s.action = r < 0.4 ? 'charge' : (r < 0.7 ? 'stomp' : 'throw');
      }
      s.actionTimer = s.action === 'charge' ? 2.2 : (s.action === 'stomp' ? 1.4 : 1.2);
    }
  }

  // 2. Pisoton Sismico (Estalactitas y Ondas)
  else if (s.action === 'stomp') {
    s.vx = 0;
    if (s.actionTimer < 0.6 && s.actionTimer > 0.5) {
      if (typeof triggerShake === 'function') triggerShake(0.25, 2.8);
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();

      // Ondas en el suelo
      s.shockwaves.push({ x: s.x + s.w / 2, y: 126, dir: -1, speed: 110, life: 2.0 });
      s.shockwaves.push({ x: s.x + s.w / 2, y: 126, dir: 1, speed: 110, life: 2.0 });

      // Caida de 4 estalactitas
      for (let k = 0; k < 4; k++) {
        const dropX = s.arenaMinX + 40 + Math.random() * (s.arenaMaxX - s.arenaMinX - 80);
        s.icicles.push({ x: dropX, y: 30, vy: 40 });
      }
    }
    if (s.actionTimer <= 0) {
      s.action = 'idle';
      s.actionTimer = 1.0;
    }
  }

  // 3. Lanzamiento de Bola de Nieve Gigante
  else if (s.action === 'throw') {
    s.vx = 0;
    if (s.actionTimer < 0.5 && s.actionTimer > 0.4) {
      const dir = s.facingRight ? 1 : -1;
      s.snowballs.push({
        x: s.x + (dir > 0 ? s.w + 10 : -10),
        y: 116,
        vx: dir * (s.phase === 3 ? 165 : 130),
        r: 10,
        rot: 0
      });
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
    }
    if (s.actionTimer <= 0) {
      s.action = 'idle';
      s.actionTimer = 1.2;
    }
  }

  // 4. Embestida Salvaje (Charge)
  else if (s.action === 'charge') {
    const chargeSpeed = s.phase === 3 ? 195 : 155;
    s.vx = (s.facingRight ? 1 : -1) * chargeSpeed;
    s.x += s.vx * dt;

    if (globalFrame % 3 === 0 && typeof spawnParticles === 'function') {
      spawnParticles(s.x + s.w / 2, s.y + s.h - 4, 3, '#ffffff', -s.vx * 0.3, -15);
    }

    // Chocar contra las columnas de los extremos de la arena
    if (s.x <= s.arenaMinX + 15 || s.x + s.w >= s.arenaMaxX - 15) {
      s.isStunned = true;
      s.stunTimer = 3.2;
      s.vx = 0;
      if (typeof triggerShake === 'function') triggerShake(0.4, 3.8);
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
      if (typeof spawnParticles === 'function') {
        spawnParticles(s.x + s.w / 2, s.y + 15, 20, '#e0f2fe', 80, -30);
      }
      return;
    }

    if (s.actionTimer <= 0) {
      s.action = 'idle';
      s.actionTimer = 0.8;
      s.vx = 0;
    }
  }

  // 5. Reposo entre ataques
  else if (s.action === 'idle') {
    s.vx = 0;
    if (s.actionTimer <= 0) {
      s.action = 'roar';
      s.actionTimer = 0.6;
    }
  }
}


// --- MODULO: src/entities/enemies/yeti_render.js ---
// ============================================================================
// RENDERIZADO DEL GRAN YETI DE CRISTAL (MUNDO 4 • FASE 6)
// ============================================================================
// Dibuja el sprite pixel art del Yeti gigante, cuernos glaciares, estalactitas,
// bolas de nieve rodantes, ondas sismicas y compuertas de hielo de la arena.

function drawYetiBoss(ctx) {
  if (!level || level.id !== 4) return;
  const s = window.yetiBossState;
  if (!s || (!s.active && !s.isDefeated)) return;

  const bx = Math.round(s.x);
  const by = Math.round(s.y);
  const facingRight = s.facingRight;
  const isEnraged = s.hp <= 2;
  const frame = globalFrame;

  // 1. Compuertas de hielo en los extremos de la arena
  if (s.gateLeft.closed) {
    drawIcePortcullis(ctx, s.gateLeft.x, s.gateLeft.y);
  }
  if (s.gateRight.closed) {
    drawIcePortcullis(ctx, s.gateRight.x, s.gateRight.y);
  }

  // 2. Proyectiles: Estalactitas cayendo
  for (const ic of s.icicles) {
    const ix = Math.round(ic.x);
    const iy = Math.round(ic.y);
    ctx.save();
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(ix - 3, iy - 12, 6, 12);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(ix - 2, iy - 10, 4, 10);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(ix - 2, iy);
    ctx.lineTo(ix, iy + 6);
    ctx.lineTo(ix + 2, iy);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // 3. Proyectiles: Bolas de nieve rodantes
  for (const sb of s.snowballs) {
    const sx = Math.round(sb.x);
    const sy = Math.round(sb.y);
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(sb.rot);
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(0, 0, sb.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, 0, sb.r - 2, 0, Math.PI * 2);
    ctx.fill();
    // Grietas en la bola de nieve
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-3, -2, 6, 2);
    ctx.fillRect(-1, -4, 2, 6);
    ctx.restore();
  }

  // 4. Ondas de choque en el suelo
  for (const sw of s.shockwaves) {
    const wx = Math.round(sw.x);
    const wy = Math.round(sw.y);
    ctx.save();
    ctx.fillStyle = isEnraged ? '#ef4444' : '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(wx - 8, wy);
    ctx.lineTo(wx - 2, wy - 9);
    ctx.lineTo(wx + 4, wy - 4);
    ctx.lineTo(wx + 8, wy);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx - 2, wy - 8, 2, 5);
    ctx.restore();
  }

  // 5. Cuerpo colosal del Gran Yeti
  ctx.save();
  ctx.translate(bx + s.w / 2, by + s.h);
  if (!facingRight) ctx.scale(-1, 1);

  // Sombra proyectada
  ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
  ctx.beginPath();
  ctx.ellipse(0, -2, 22, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Aura de furia cuando le quedan 2 o menos vidas
  if (isEnraged && !s.isDefeated) {
    const auraPulse = Math.sin(frame * 0.25) * 3;
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.55)';
    ctx.lineWidth = 3;
    ctx.strokeRect(-24 - auraPulse, -48 - auraPulse, 48 + auraPulse * 2, 48 + auraPulse * 2);
  }

  const breath = Math.sin(frame * 0.12) * 1.5;
  const isStomp = s.action === 'stomp';
  const isCharge = s.action === 'charge';
  const armRaise = isStomp ? -14 : (isCharge ? 4 : 0);

  // Patas peludas gruesas
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-16, -14, 12, 14);
  ctx.fillRect(4, -14, 12, 14);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-15, -13, 10, 11);
  ctx.fillRect(5, -13, 10, 11);
  // Garras de hielo en los pies
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(-17, -3, 4, 3);
  ctx.fillRect(-12, -3, 4, 3);
  ctx.fillRect(5, -3, 4, 3);
  ctx.fillRect(10, -3, 4, 3);

  // Torso masivo de pelaje blanco alpino
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(-20, -42 + breath, 40, 32, [10, 10, 4, 4]);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.roundRect(-18, -40 + breath, 36, 29, [8, 8, 3, 3]);
  ctx.fill();

  // Pecho muscular celeste gélido
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(-10, -36 + breath, 20, 16);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(-1, -34 + breath, 2, 12);

  // Brazos gigantescos con pelaje y garras
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-24, -38 + armRaise, 9, 26);
  ctx.fillRect(15, -38 - armRaise, 9, 26);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-23, -37 + armRaise, 7, 23);
  ctx.fillRect(16, -37 - armRaise, 7, 23);
  // Garras frontales
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(-23, -15 + armRaise, 7, 4);
  ctx.fillRect(16, -15 - armRaise, 7, 4);

  // Cabeza con facciones bestiales y cuernos de hielo
  const headY = -46 + breath;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-12, headY - 10, 24, 16);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-10, headY - 8, 20, 13);

  // Rostro oscuro de simio ártico
  ctx.fillStyle = '#334155';
  ctx.fillRect(-6, headY - 5, 14, 9);

  // Ojos brillantes cian o rojos si enfurecido
  ctx.fillStyle = isEnraged ? '#ef4444' : '#00f5d4';
  ctx.fillRect(0, headY - 4, 3, 3);
  ctx.fillRect(4, headY - 4, 3, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(1, headY - 4, 1, 1);
  ctx.fillRect(5, headY - 4, 1, 1);

  // Cuernos de hielo curvos en la cabeza
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(-10, headY - 8);
  ctx.lineTo(-17, headY - 18);
  ctx.lineTo(-7, headY - 10);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(8, headY - 8);
  ctx.lineTo(16, headY - 18);
  ctx.lineTo(6, headY - 10);
  ctx.closePath();
  ctx.fill();

  // Efecto de aturdimiento: estrellas orbitando sobre la cabeza
  if (s.isStunned) {
    const starCount = 3;
    for (let st = 0; st < starCount; st++) {
      const starAngle = frame * 0.15 + (st * Math.PI * 2 / starCount);
      const starX = Math.cos(starAngle) * 16;
      const starY = headY - 20 + Math.sin(starAngle) * 6;
      drawSparkleStar(ctx, starX, starY, 4, '#ffd166');
    }
  }

  ctx.restore();
}

function drawIcePortcullis(ctx, gx, gy) {
  const px = Math.round(gx);
  const py = Math.round(gy);
  ctx.save();
  // Columnas laterales
  ctx.fillStyle = '#0c4a6e';
  ctx.fillRect(px - 6, py - 90, 12, 90);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 4, py - 88, 8, 86);

  // Rejas de picos de hielo verticales
  for (let bar = -3; bar <= 3; bar += 3) {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(px + bar - 1, py - 80, 3, 80);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + bar, py - 78, 1, 76);
  }
  ctx.restore();
}


// --- MODULO: src/entities/enemies/astral_boss.js ---
// ============================================================================
// GRAN JEFE FINAL: EL DRAGÓN ASTRAL DE POLARIS (MUNDO 4 • FASE 9)
// ============================================================================
// El enfrentamiento cumbre en el Sanctum Sanctorum de la Estrella Polar:
// cometas estelares, rayos de plasma orbital y disolucion en constelacion.

let astralBossState = {
  active: false,
  x: 41050,
  y: 65,
  w: 74,
  h: 46,
  vx: 0,
  vy: 0,
  hp: 8,
  maxHp: 8,
  phase: 1,
  action: 'orbit',
  actionTimer: 2.0,
  hitCooldown: 0,
  isVulnerable: false,
  isDefeated: false,
  comets: [],
  stars: [],
  beam: { active: false, x: 0, y: 0, angle: 0, timer: 0 },
  gateLeft: { x: 40740, y: 126, closed: false },
  gateRight: { x: 41380, y: 126, closed: false },
  arenaMinX: 40755,
  arenaMaxX: 41365
};

function initAstralBoss() {
  astralBossState = {
    active: false,
    x: 41050,
    y: 65,
    w: 74,
    h: 46,
    vx: 0,
    vy: 0,
    hp: 8,
    maxHp: 8,
    phase: 1,
    action: 'orbit',
    actionTimer: 2.0,
    hitCooldown: 0,
    isVulnerable: false,
    isDefeated: false,
    comets: [],
    stars: [],
    beam: { active: false, x: 0, y: 0, angle: 0, timer: 0 },
    gateLeft: { x: 40740, y: 126, closed: false },
    gateRight: { x: 41380, y: 126, closed: false },
    arenaMinX: 40755,
    arenaMaxX: 41365
  };
  window.astralBossState = astralBossState;
}

function startAstralBossFight() {
  if (astralBossState.active || astralBossState.isDefeated) return;
  astralBossState.active = true;
  astralBossState.gateLeft.closed = true;
  astralBossState.gateRight.closed = true;
  astralBossState.hp = 8;
  astralBossState.phase = 1;
  astralBossState.action = 'intro';
  astralBossState.actionTimer = 1.8;
  window.astralBossState = astralBossState;

  if (typeof triggerShake === 'function') triggerShake(1.5, 3.0);
  if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
  if (typeof spawnFloatingText === 'function') {
    spawnFloatingText(player.x - 35, player.y - 25, 'JEFE FINAL: DRAGON ASTRAL!', '#ffd166');
  }
}

function updateAstralBoss(dt) {
  if (!level || level.id !== 4) return;
  const s = astralBossState;

  // Activar combate cuando Elizabeth cruza hacia el atrio de Polaris
  if (!s.active && !s.isDefeated && player.x >= 40780 && player.x <= 41350) {
    startAstralBossFight();
  }

  if (!s.active && !s.isDefeated) return;

  // Bloquear a Elizabeth dentro de la arena celestial
  if (s.active && !s.isDefeated) {
    if (player.x < s.arenaMinX) { player.x = s.arenaMinX; if (player.vx < 0) player.vx = 0; }
    if (player.x > s.arenaMaxX) { player.x = s.arenaMaxX; if (player.vx > 0) player.vx = 0; }
  }

  if (s.hitCooldown > 0) s.hitCooldown -= dt;

  // Actualizar proyectiles: cometas que caen
  for (let i = s.comets.length - 1; i >= 0; i--) {
    const c = s.comets[i];
    c.x += c.vx * dt;
    c.y += c.vy * dt;

    if (rectOverlap(player.x, player.y, player.w, player.h, c.x - 6, c.y - 6, 12, 12)) {
      damagePlayer(false);
      s.comets.splice(i, 1);
      continue;
    }
    if (c.y > 170 || c.x < s.arenaMinX - 30 || c.x > s.arenaMaxX + 30) {
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(c.x, Math.min(150, c.y), 6, '#00f5d4');
      }
      s.comets.splice(i, 1);
    }
  }

  // Actualizar proyectiles: estrellas teledirigidas
  for (let i = s.stars.length - 1; i >= 0; i--) {
    const st = s.stars[i];
    const dx = (player.x + 11) - st.x;
    const dy = (player.y + 12) - st.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 5) {
      st.vx += (dx / dist) * 110 * dt;
      st.vy += (dy / dist) * 110 * dt;
    }
    st.x += st.vx * dt;
    st.y += st.vy * dt;
    st.life -= dt;

    if (rectOverlap(player.x, player.y, player.w, player.h, st.x - 4, st.y - 4, 8, 8)) {
      damagePlayer(false);
      s.stars.splice(i, 1);
      continue;
    }
    if (st.life <= 0) {
      s.stars.splice(i, 1);
    }
  }

  // Si esta derrotado, desvanecerse en el cosmos
  if (s.isDefeated) {
    return;
  }

  // Comprobar si Elizabeth golpea al Dragon en su nucleo vulnerable
  const isAttacking = player.isSwingingPick || (keys.dashJustPressed && player.ability === 'ice_pick');
  const isStomping = player.vy > 0 && player.y + player.h <= s.y + 22;
  const isClose = Math.abs((player.x + 11) - (s.x + s.w / 2)) < 42 && Math.abs((player.y + 12) - (s.y + s.h / 2)) < 36;

  if (s.hitCooldown <= 0 && isClose && (isAttacking || isStomping)) {
    s.hitCooldown = 0.9;
    s.hp--;
    if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
    if (typeof triggerShake === 'function') triggerShake(0.35, 3.0);

    if (typeof spawnParticles === 'function') {
      spawnParticles(s.x + s.w / 2, s.y + s.h / 2, 28, '#ffd166', 140, -60);
      spawnParticles(s.x + s.w / 2, s.y + s.h / 2, 18, '#ffffff', 100, -30);
    }
    if (isStomping) {
      player.vy = -280;
      player.jumpsLeft = 2;
    }

    if (s.hp <= 0) {
      // Derrota Suprema del Dragon Final
      s.isDefeated = true;
      s.active = false;
      s.gateLeft.closed = false;
      s.gateRight.closed = false;
      score += 10000;
      if (window.sfx && window.sfx.playVictory) window.sfx.playVictory();
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(s.x - 30, s.y - 30, 'CONSTELACION LIBERADA! +10000', '#ffd166');
      }
      return;
    } else {
      s.phase = s.hp <= 3 ? 3 : (s.hp <= 5 ? 2 : 1);
      s.action = 'recoil';
      s.actionTimer = 0.7;
    }
  }

  // Daño por contacto si el cuerpo del dragon toca a Elizabeth
  if (rectOverlap(player.x, player.y, player.w, player.h, s.x + 8, s.y + 8, s.w - 16, s.h - 16)) {
    damagePlayer(false);
  }

  // Maquina de estados del Dragon Astral
  s.actionTimer -= dt;

  if (s.action === 'intro') {
    s.y = 55 + Math.sin(globalFrame * 0.08) * 8;
    if (s.actionTimer <= 0) {
      s.action = 'orbit';
      s.actionTimer = 2.4;
    }
  } else if (s.action === 'recoil') {
    s.y = 45 + Math.sin(globalFrame * 0.14) * 6;
    if (s.actionTimer <= 0) {
      s.action = 'swoop';
      s.actionTimer = 2.0;
    }
  } else if (s.action === 'orbit') {
    // Vuelo ondulante horizontal
    const t = globalFrame * 0.03;
    s.x = (s.arenaMinX + s.arenaMaxX) / 2 + Math.sin(t) * 160;
    s.y = 58 + Math.cos(t * 1.8) * 16;

    if (globalFrame % 14 === 0) {
      // Disparar cometa estelar
      const dirX = (player.x > s.x ? 1 : -1) * (60 + Math.random() * 40);
      s.comets.push({
        x: s.x + s.w / 2,
        y: s.y + s.h / 2,
        vx: dirX,
        vy: 110 + (s.phase === 3 ? 40 : 0)
      });
      if (window.sfx && window.sfx.playPortalGunShot) window.sfx.playPortalGunShot();
    }

    if (s.actionTimer <= 0) {
      s.action = s.phase >= 2 && Math.random() < 0.5 ? 'homing_stars' : 'swoop';
      s.actionTimer = s.action === 'homing_stars' ? 1.8 : 2.2;
    }
  } else if (s.action === 'swoop') {
    // Picada rasante hacia la altura del jugador (momento vulnerable)
    const swoopT = (2.2 - s.actionTimer) / 2.2;
    const targetX = player.x;
    s.x += (targetX - s.x) * dt * 2.2;
    s.y = 50 + Math.sin(swoopT * Math.PI) * 55;

    if (s.actionTimer <= 0) {
      s.action = 'orbit';
      s.actionTimer = 2.5;
    }
  } else if (s.action === 'homing_stars') {
    // Flotar en el centro y emitir 3 estrellas teledirigidas
    s.y = 48 + Math.sin(globalFrame * 0.1) * 4;
    if (s.actionTimer < 1.0 && s.actionTimer > 0.9 && s.stars.length === 0) {
      for (let k = 0; k < (s.phase === 3 ? 4 : 2); k++) {
        const ang = (k * Math.PI * 2) / (s.phase === 3 ? 4 : 2);
        s.stars.push({
          x: s.x + s.w / 2 + Math.cos(ang) * 20,
          y: s.y + s.h / 2 + Math.sin(ang) * 20,
          vx: Math.cos(ang) * 70,
          vy: Math.sin(ang) * 70,
          life: 3.5
        });
      }
      if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
    }

    if (s.actionTimer <= 0) {
      s.action = 'swoop';
      s.actionTimer = 2.0;
    }
  }
}


// --- MODULO: src/entities/enemies/astral_render.js ---
// ============================================================================
// RENDERIZADO DEL DRAGÓN ASTRAL DE POLARIS (MUNDO 4 • FASE 9)
// ============================================================================
// Dibuja el dragon cosmico serpentino con alas estelares, cometas celestiales,
// estrellas teledirigidas y barreras de luz polar en el Sanctum Sanctorum.

function drawAstralBoss(ctx) {
  if (!level || level.id !== 4) return;
  const s = window.astralBossState;
  if (!s || (!s.active && !s.isDefeated)) return;

  const bx = Math.round(s.x);
  const by = Math.round(s.y);
  const frame = globalFrame;
  const isEnraged = s.hp <= 3;

  // 1. Barreras de luz estelar en los extremos de la arena
  if (s.gateLeft.closed) {
    drawAstralBarrier(ctx, s.gateLeft.x, s.gateLeft.y);
  }
  if (s.gateRight.closed) {
    drawAstralBarrier(ctx, s.gateRight.x, s.gateRight.y);
  }

  // 2. Cometas cayendo
  for (const c of s.comets) {
    const cx = Math.round(c.x);
    const cy = Math.round(c.y);
    ctx.save();
    // Estela del cometa
    ctx.strokeStyle = isEnraged ? 'rgba(255, 0, 128, 0.45)' : 'rgba(0, 245, 212, 0.45)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - c.vx * 0.08, cy - c.vy * 0.08);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    // Nucleo del cometa
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isEnraged ? '#ff007f' : '#00f5d4';
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 3. Estrellas teledirigidas
  for (const st of s.stars) {
    const sx = Math.round(st.x);
    const sy = Math.round(st.y);
    drawSparkleStar(ctx, sx, sy, 5, isEnraged ? '#ff0055' : '#ffd166');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx - 1, sy - 1, 2, 2);
  }

  // Si esta derrotado, no dibujar el cuerpo (se ha convertido en constelacion)
  if (s.isDefeated) {
    // Brillo residual de estrellas
    drawSparkleStar(ctx, bx + s.w / 2, by + s.h / 2, 8, '#ffd166');
    return;
  }

  // 4. Dragon Astral Serpentino
  ctx.save();
  ctx.translate(bx + s.w / 2, by + s.h / 2);

  // Segmentos serpentinos flotantes del cuerpo
  const segments = 4;
  for (let i = segments; i >= 1; i--) {
    const segT = frame * 0.08 - i * 0.35;
    const offX = -i * 14;
    const offY = Math.sin(segT) * 12;
    const segR = 12 - i * 1.8;

    // Resplandor de aura
    const grad = ctx.createRadialGradient(offX, offY, 2, offX, offY, segR + 6);
    grad.addColorStop(0, isEnraged ? 'rgba(255, 0, 128, 0.8)' : 'rgba(0, 245, 212, 0.8)');
    grad.addColorStop(0.5, isEnraged ? 'rgba(128, 0, 255, 0.4)' : 'rgba(0, 119, 182, 0.4)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(offX, offY, segR + 6, 0, Math.PI * 2);
    ctx.fill();

    // Nucleo estelar
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(offX, offY, Math.max(2, segR * 0.4), 0, Math.PI * 2);
    ctx.fill();
  }

  // Alas celestiales que aletean
  const wingFlap = Math.sin(frame * 0.18) * 16;
  ctx.fillStyle = isEnraged ? 'rgba(255, 117, 143, 0.65)' : 'rgba(180, 240, 255, 0.65)';
  // Ala izquierda
  ctx.beginPath();
  ctx.moveTo(-4, -6);
  ctx.lineTo(-24, -28 + wingFlap);
  ctx.lineTo(-6, -14);
  ctx.closePath();
  ctx.fill();

  // Ala derecha
  ctx.beginPath();
  ctx.moveTo(8, -6);
  ctx.lineTo(26, -28 + wingFlap);
  ctx.lineTo(12, -14);
  ctx.closePath();
  ctx.fill();

  // Cabeza majestuosa del Dragon
  const headBob = Math.sin(frame * 0.12) * 4;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(8, -12 + headBob, 26, 20);
  ctx.fillStyle = isEnraged ? '#e11d48' : '#0284c7';
  ctx.fillRect(10, -10 + headBob, 22, 16);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(12, -8 + headBob, 18, 12);

  // Cuernos de luz dorada
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.moveTo(18, -12 + headBob);
  ctx.lineTo(26, -26 + headBob);
  ctx.lineTo(23, -12 + headBob);
  ctx.closePath();
  ctx.fill();

  // Ojos luminosos
  ctx.fillStyle = isEnraged ? '#ffd166' : '#00f5d4';
  ctx.fillRect(22, -6 + headBob, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(23, -5 + headBob, 2, 2);

  // Nucleo Supernova en el pecho
  const corePulse = Math.sin(frame * 0.22) * 2;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 2, 6 + corePulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = isEnraged ? '#ff0055' : '#ffd166';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

function drawAstralBarrier(ctx, gx, gy) {
  const px = Math.round(gx);
  const py = Math.round(gy);
  ctx.save();
  // Columna de luz vertical con gradiente estelar
  const grad = ctx.createLinearGradient(px, py - 110, px, py);
  grad.addColorStop(0, 'rgba(255, 209, 102, 0.85)');
  grad.addColorStop(0.5, 'rgba(0, 245, 212, 0.65)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');
  ctx.fillStyle = grad;
  ctx.fillRect(px - 4, py - 110, 8, 110);

  // Runa central de poder
  drawSparkleStar(ctx, px, py - 55, 6, '#ffffff');
  ctx.restore();
}


// --- MODULO: src/entities/homelander.js ---
// ============================================================================
// HOMELANDER AI, HAZ LÁSER Y SECUENCIA DE CRISTALES (FASE 3)
// ============================================================================
function getHomelanderLaserEndY(beamCenterX, startY, defaultGroundY) {
  let endY = defaultGroundY;
  if (!level || !level.platforms) return endY;
  for (const p of level.platforms) {
    if (p.oneWay && p.y > startY + 8 && p.y < endY) {
      if (beamCenterX >= p.x - 4 && beamCenterX <= p.x + p.w + 4) {
        endY = p.y;
      }
    }
  }
  return endY;
}

function updateColorPadsAndPuzzle(dt) {
  if (!homelanderPuzzle || !homelanderPuzzle.active) return;

  for (const pad of colorPads) {
    if (pad.wrongFlash > 0) pad.wrongFlash -= dt;
    if (pad.cooldown > 0) pad.cooldown -= dt;

    if (homelanderPuzzle.solved) continue;

    // Colisión física con la caja del jugador
    const isOverlapping = rectOverlap(player.x, player.y, player.w, player.h, pad.x, pad.y - 14, pad.w, 16);
    const justStepped = isOverlapping && !pad.playerOverlapping;
    pad.playerOverlapping = isOverlapping;

    if (justStepped) {
      const curTargetId = homelanderPuzzle.sequence[homelanderPuzzle.currentIndex];

      if (pad.activated) {
        // Ya activado previamente, no penaliza
        spawnFloatingText(pad.x - 14, pad.y - 20, '✓ ¡Ya activado!', '#00f5d4');
      } else if (pad.id === curTargetId) {
        // ¡Paso correcto de la secuencia!
        pad.activated = true;
        homelanderPuzzle.currentIndex++;
        const step = homelanderPuzzle.currentIndex;
        window.sfx.playPatternCorrect(step);
        rumbleGamepad(90, 0.3, 0.4);
        spawnParticles(pad.x + pad.w / 2, pad.y - 6, 22, pad.hex, 90, 80);

        if (step >= homelanderPuzzle.sequence.length) {
          // ¡Todos los 7 botones activados! Escudo roto y Homelander derrotado
          homelanderPuzzle.solved = true;
          if (homelander) {
            homelander.phase = 'defeated';
            homelander.timer = 5.0;
          }
          window.sfx.playShieldBreak();
          triggerShake(0.65, 6);
          rumbleGamepad(450, 0.8, 1.0);
          if (level.babyMouse) {
            spawnParticles(level.babyMouse.x + 10, level.babyMouse.y, 40, '#ffd166', 130, 80);
            spawnParticles(level.babyMouse.x + 10, level.babyMouse.y, 35, '#00f5d4', 120, 70);
            spawnFloatingText(level.babyMouse.x - 45, level.babyMouse.y - 26, '💥 ¡ESCUDO ROTO! ¡HOMELANDER DERROTADO!', '#ffd166');
          }
          spawnFloatingText(pad.x - 18, pad.y - 24, `✨ ¡SECUENCIA COMPLETADA (${step}/${homelanderPuzzle.sequence.length})!`, '#00f5d4');
        } else {
          const nextTargetId = homelanderPuzzle.sequence[step];
          const nextPad = colorPads.find(p => p.id === nextTargetId);
          const nextName = nextPad ? nextPad.colorName : '';
          spawnFloatingText(pad.x - 16, pad.y - 22, `✨ ¡${pad.colorName} ACTIVADO! Siguiente: [${nextName}]`, pad.glowHex || pad.hex);
          if (step === 3) {
            spawnFloatingText(player.x - 32, player.y - 32, '🔥 ¡HOMELANDER AUMENTA SU VELOCIDAD!', '#ff758f');
          } else if (step === 5) {
            spawnFloatingText(player.x - 36, player.y - 32, '⚡ ¡PELIGRO! HOMELANDER ACTIVA DOBLE RÁFAGA', '#ff0055');
          }
        }
      } else {
        // Error de secuencia: pisó un botón fuera de orden (NO SE REINICIA EL PROGRESO)
        if (!pad.cooldown || pad.cooldown <= 0) {
          pad.cooldown = 1.0;
          pad.wrongFlash = 0.45;
          window.sfx.playJump(false);
          triggerShake(0.08, 1.2);
          const targetPad = colorPads.find(p => p.id === curTargetId);
          const targetName = targetPad ? targetPad.colorName : '';
          spawnFloatingText(pad.x - 28, pad.y - 24, `⚠️ ¡Este es [${pad.colorName}]! Busca el [${targetName}]`, '#ffd166');
        }
      }
    }
  }
}

function updateHomelander(dt) {
  if (!homelander) return;
  const playerCenter = player.x + player.w / 2;
  // Fase 3 abarca desde X: 3670 hasta el final del nivel (~5750)
  const playerInPhase3 = playerCenter >= 3650;
  const defaultGroundY = homelander.groundY || 220;
  const laserEndY = getHomelanderLaserEndY(homelander.x, homelander.y + 8, defaultGroundY);

  if (homelander.phase === 'defeated') {
    homelander.y -= 155 * dt;
    homelander.x += Math.sin(globalFrame * 0.25) * 2;
    if (Math.random() < 0.35) {
      spawnParticles(homelander.x, homelander.y + 8, 2, '#ffd166', 70, 90);
    }
    return;
  }

  if (!playerInPhase3) {
    // Si estás en Fase 1 o 2, Homelander flota sobre su plaza imperial esperando
    homelander.phase = 'patrol';
    homelander.timer = 1.2;
    homelander.y = 44 + Math.sin(globalFrame * 0.08) * 4;
    homelander.x += homelander.dir * 45 * dt;
    if (homelander.x >= 4500) homelander.dir = -1;
    if (homelander.x <= 4100) homelander.dir = 1;
    return;
  }

  // Dificultad Progresiva según cuántos botones seguidos del patrón de 7 colores se hayan activado
  const progress = (homelanderPuzzle && !homelanderPuzzle.solved) ? homelanderPuzzle.currentIndex : 0;
  let currentSpeed = homelander.speed || 135;
  let currentAimDuration = homelander.aimDuration || 1.10;
  let currentCooldown = homelander.cooldown || 1.40;
  let currentFireDuration = homelander.fireDuration || 0.75;
  let beamTrackingRate = 3.8; // Qué tan rápido sigue la mira al jugador mientras carga

  if (progress >= 3 && progress < 5) {
    // A partir del paso 4: Homelander se enfurece, vuela más veloz y su mira es más tenaz
    currentSpeed = 160;
    currentAimDuration = 0.90;
    currentCooldown = 1.15;
    currentFireDuration = 0.70;
    beamTrackingRate = 5.0;
  } else if (progress >= 5) {
    // Últimos botones (pasos 6 y 7): máxima furia, persecución implacable y doble ráfaga láser
    currentSpeed = 195;
    currentAimDuration = 0.72;
    currentCooldown = 0.95;
    currentFireDuration = 0.65;
    beamTrackingRate = 6.4;
  }

  homelander.timer -= dt;

  // =========================================================================
  // FASE 1: PERSECUCIÓN AÉREA ACTIVA (CHASE / PATROL)
  // Homelander NO sigue un camino fijo: VUELA DIRECTO HACIA TI Y TE ACOSA
  // =========================================================================
  if (homelander.phase === 'patrol') {
    // Flotación aérea orgánica en 2D
    const targetY = 44 + Math.sin(globalFrame * 0.1) * 6;
    homelander.y += (targetY - homelander.y) * Math.min(1, dt * 5);

    // Objetivo: Posicionarse justo encima de Mamá Ratón
    const targetX = Math.max(homelander.minX, Math.min(homelander.maxX, playerCenter));
    const diff = targetX - homelander.x;

    // Persecución ágil con aceleración y anticipación
    const desiredVx = Math.sign(diff) * Math.min(Math.abs(diff) * 5.2, currentSpeed * 1.3);
    homelander.vx += (desiredVx - homelander.vx) * Math.min(1, dt * 7);

    homelander.x += homelander.vx * dt;
    homelander.x = Math.max(homelander.minX, Math.min(homelander.maxX, homelander.x));

    // Partículas de estela de vuelo en persecución
    if (globalFrame % 5 === 0 && Math.abs(homelander.vx) > 40) {
      spawnParticles(homelander.x - Math.sign(homelander.vx) * 8, homelander.y + 12, 1, 'rgba(255, 209, 102, 0.45)', 30, 20);
    }

    // Si ya está alineado con la rata o el temporizador de patrulla expira, pasa a apuntar y cargar láser
    const isOverPlayer = Math.abs(diff) < 32;
    if (homelander.timer <= 0 || (isOverPlayer && homelander.timer < currentCooldown * 0.6)) {
      homelander.vx = 0;
      homelander.phase = 'charging';
      homelander.timer = currentAimDuration;
      homelander.burstStep = 1;
      window.sfx.playLaserWarning();

      // Taunt visual al fijar al jugador
      if (Math.random() < 0.45) {
        const taunts = ['👁️ ¡TE VEO!', '⚡ ¡LÁSER FIJADO!', '🔥 ¡NO ESCAPES!'];
        const chosen = taunts[Math.floor(Math.random() * taunts.length)];
        spawnFloatingText(homelander.x - 24, homelander.y - 12, chosen, '#ff0055');
      }
    }
  }

  // =========================================================================
  // FASE 2: CARGA Y BLOQUEO DE MIRA (CHARGING LASER)
  // ¡Homelander SIGUE PERSIGUIÉNDOTE y ajustando la mira sobre tu cabeza!
  // =========================================================================
  else if (homelander.phase === 'charging') {
    // Swoop amenazante hacia abajo
    const targetY = 52 + Math.sin(globalFrame * 0.16) * 4;
    homelander.y += (targetY - homelander.y) * Math.min(1, dt * 6);

    // MIRA ACTIVA: La mira láser sigue el movimiento del jugador
    const targetX = Math.max(homelander.minX, Math.min(homelander.maxX, playerCenter));
    const diff = targetX - homelander.x;
    const trackingSpeed = (homelander.burstStep === 2) ? currentSpeed * 1.25 : currentSpeed * 0.90;
    const moveX = Math.sign(diff) * Math.min(Math.abs(diff) * beamTrackingRate, trackingSpeed);
    homelander.x += moveX * dt;
    homelander.x = Math.max(homelander.minX, Math.min(homelander.maxX, homelander.x));

    if (Math.floor(homelander.timer * 10) % 3 === 0 && Math.random() < 0.3) {
      window.sfx.playLaserWarning();
    }

    if (homelander.timer <= 0) {
      homelander.phase = 'firing';
      homelander.timer = currentFireDuration;
      window.sfx.playLaserFire();
      triggerShake(0.35, 3.5);
      rumbleGamepad(280, 0.5, 0.75);
      scorchMarks.push({ x: homelander.x, y: laserEndY, w: homelander.beamWidth + 6, life: 3.2 });
    }
  }

  // =========================================================================
  // FASE 3: DISPARO CONTINUO (FIRING BEAM)
  // ¡El rayo abrasa el suelo y se desplaza barriendo hacia la posición del jugador!
  // =========================================================================
  else if (homelander.phase === 'firing') {
    // Barrido dinámico del rayo persiguiendo al jugador
    const targetX = Math.max(homelander.minX, Math.min(homelander.maxX, playerCenter));
    const sweepDiff = targetX - homelander.x;
    if (Math.abs(sweepDiff) > 8) {
      const sweepSpeed = (progress >= 5 ? 75 : 48);
      homelander.x += Math.sign(sweepDiff) * sweepSpeed * dt;
      homelander.x = Math.max(homelander.minX, Math.min(homelander.maxX, homelander.x));
    }

    const beamLeft = homelander.x - homelander.beamWidth / 2;
    const beamRight = homelander.x + homelander.beamWidth / 2;

    if (Math.random() < 0.75) {
      spawnParticles(homelander.x + (Math.random() - 0.5) * 16, laserEndY - 1, 2, '#ff0033', 95, 140);
    }

    // Si Mamá Ratón está refugiada DEBAJO del techo de una Glorieta Real (player.y >= laserEndY - 2), el techo bloquea el láser
    if (
      player.x + player.w > beamLeft + 3 &&
      player.x < beamRight - 3 &&
      player.y + player.h > homelander.y + 10 &&
      player.y < laserEndY - 2
    ) {
      damagePlayer(false);
    }

    if (homelander.timer <= 0) {
      if (progress >= 5 && homelander.burstStep === 1) {
        // En los últimos botones: ¡DOBLE RÁFAGA LÁSER! Re-apunta rápidamente y dispara de nuevo
        homelander.burstStep = 2;
        homelander.phase = 'charging';
        homelander.timer = 0.40;
        window.sfx.playLaserWarning();
        spawnFloatingText(homelander.x - 28, homelander.y - 14, '⚡ ¡DOBLE RÁFAGA!', '#ff0055');
      } else {
        homelander.burstStep = 1;
        homelander.phase = 'patrol';
        homelander.timer = currentCooldown;
      }
    }
  }
}


function drawHomelanderAndLaser() {
  const eyes = window.sprites.drawHomelander(ctx, homelander.x, homelander.y, homelander.phase, globalFrame);
  const defaultGroundY = homelander.groundY || 220;
  const endY = getHomelanderLaserEndY(homelander.x, eyes.eyeY, defaultGroundY);
  const beamLeft = Math.round(homelander.x - homelander.beamWidth / 2);
  const beamW = homelander.beamWidth;

  if (homelander.phase === 'charging') {
    const blink = Math.floor(globalFrame / 4) % 2 === 0;
    ctx.strokeStyle = blink ? 'rgba(255, 0, 55, 0.85)' : 'rgba(255, 117, 143, 0.45)';
    ctx.beginPath();
    ctx.moveTo(eyes.leftEyeX, eyes.eyeY);
    ctx.lineTo(beamLeft, endY);
    ctx.moveTo(eyes.rightEyeX, eyes.eyeY);
    ctx.lineTo(beamLeft + beamW, endY);
    ctx.stroke();

    ctx.fillStyle = blink ? 'rgba(255, 0, 55, 0.24)' : 'rgba(255, 0, 55, 0.09)';
    ctx.fillRect(beamLeft, eyes.eyeY, beamW, endY - eyes.eyeY);
  } else if (homelander.phase === 'firing') {
    const startY = eyes.eyeY;
    const beamH = endY - startY;
    ctx.fillStyle = 'rgba(255, 0, 55, 0.45)';
    ctx.fillRect(beamLeft - 5, startY, beamW + 10, beamH);
    ctx.fillStyle = '#ff0033';
    ctx.fillRect(beamLeft, startY, beamW, beamH);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(beamLeft + 5, startY, beamW - 10, beamH);
  }
}




// --- MODULO: src/entities/quests/sami_icecream.js ---
// ============================================================================
// MISIONES MUNDO 3 • FASE 3: MISIÓN 1 "SAMI EL HELADERO"
// ============================================================================
// Misión 1 de 4:
// - Vende 10 helados a los turistas de la playa.
// - Reúne el pago total ($100).
// - Devuelve el pago a Sami para recibir la Llave de Bronce de la Ciudadela.

function getSamiQuest() {
  if (!saveState.samiQuest) {
    saveState.samiQuest = {
      state: 'NOT_STARTED', // 'NOT_STARTED' | 'ACTIVE' | 'READY_TO_TURN_IN' | 'COMPLETED'
      sold: 0,
      target: 10,
      money: 0
    };
  }
  return saveState.samiQuest;
}

function startSamiQuest() {
  const q = getSamiQuest();
  q.state = 'ACTIVE';
  q.sold = 0;
  q.target = 10;
  q.money = 0;
  persistSave();
  spawnFloatingText(player.x - 10, player.y - 14, '¡MISIÓN 1: 10 HELADOS!', '#ffd166');
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
}

function deliverIceCreamToTourist(npc) {
  const q = getSamiQuest();
  if (q.state !== 'ACTIVE' || npc.boughtIceCream) return null;

  npc.boughtIceCream = true;
  q.sold++;
  q.money += 10;
  persistSave();

  if (q.sold >= q.target) {
    q.state = 'READY_TO_TURN_IN';
    spawnFloatingText(npc.x - 12, npc.y - 16, '¡10/10 VENDIDOS! VUELVE CON SAMI', '#ffcad4');
  } else {
    spawnFloatingText(npc.x - 6, npc.y - 14, `+$10 (${q.sold}/${q.target} Helados)`, '#ffd166');
  }

  spawnParticles(npc.x + 8, npc.y + 4, 8, '#ffcad4', 50, -15);
  spawnParticles(npc.x + 8, npc.y + 4, 4, '#ffffff', 60, -20);
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();

  return [
    `¡Mmm, qué delicia de helado de fresa y vainilla! ¡Muchas gracias Elizabeth!`,
    `Aquí tienes tus $10 de pago. ¡Sigue así!`
  ];
}

function completeSamiQuest(samiNpc) {
  const q = getSamiQuest();
  if (q.state !== 'READY_TO_TURN_IN') return;

  q.state = 'COMPLETED';
  saveState.keysPhase3 = (saveState.keysPhase3 || 0) + 1;
  persistSave();

  triggerShake(0.15, 2);
  spawnStarSparkles(samiNpc.x + 14, samiNpc.y - 12, 18, '#ffd166');
  spawnStarSparkles(samiNpc.x + 14, samiNpc.y - 12, 12, '#ffffff');
  spawnFloatingText(samiNpc.x - 14, samiNpc.y - 22, '★ ¡LLAVE DE BRONCE #1 DESBLOQUEADA! ★', '#ffffff');
  if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
}

function drawSamiQuestHUD(ctx) {
  if (!saveState || !saveState.samiQuest) return;
  const q = saveState.samiQuest;
  if (q.state !== 'ACTIVE' && q.state !== 'READY_TO_TURN_IN') return;

  // Mini-Panel de progreso de la misión en la parte superior derecha
  const pw = 124;
  const ph = 20;
  const px = W - pw - 10;
  const py = 32;

  drawRoundedPanel(px, py, pw, ph, 6, 'rgba(18, 5, 24, 0.94)', '#b31b52', 1.2);

  if (window.sprites && window.sprites.drawIceCreamCone) {
    window.sprites.drawIceCreamCone(ctx, px + 11, py + 12, 0.9);
  }

  ctx.textAlign = 'left';
  ctx.fillStyle = q.state === 'READY_TO_TURN_IN' ? '#ffd166' : '#ffffff';
  ctx.font = `bold 6.5px ${UI_FONT}`;

  if (q.state === 'READY_TO_TURN_IN') {
    ctx.fillText(`¡Vuelve con Sami!`, px + 22, py + 13);
  } else {
    ctx.fillText(`Helados: ${q.sold}/10 ($${q.money})`, px + 22, py + 13);
  }
}


// --- MODULO: src/entities/quests/kai_surf.js ---
// ============================================================================
// MISIONES MUNDO 3 • FASE 3: MISIÓN 2 "EL SURFISTA KAI Y LAS 67 OLAS"
// ============================================================================
// Misión 2 de 4:
// - Desafío propuesto por Kai el Surfista: atravesar "67 olas" en la rompiente.
// - Al cruzar 8 olas con el Water Dash, Kai queda perplejo ("ya me queda claro que llegas a las 67").
// - Recompensa: Llave de Bronce #2 y la apertura definitiva de la Tienda de Surf.

let activeKaiWaves = [];
let kaiWaveSpawnTimer = 0;

function getKaiQuest() {
  if (!saveState.kaiQuest) {
    saveState.kaiQuest = {
      state: 'NOT_STARTED', // 'NOT_STARTED' | 'ACTIVE' | 'READY_TO_TURN_IN' | 'COMPLETED'
      wavesCrossed: 0,
      memeTarget: 67,
      realTarget: 8,
      shopOpen: false,
      boardSkin: 'fucsia' // 'fucsia' | 'nacar' | 'neon'
    };
  }
  return saveState.kaiQuest;
}

function startKaiQuest() {
  const q = getKaiQuest();
  q.state = 'ACTIVE';
  q.wavesCrossed = 0;
  activeKaiWaves = [];
  kaiWaveSpawnTimer = 0.5;
  persistSave();
  spawnFloatingText(player.x - 10, player.y - 14, '¡MISIÓN 2: ATRAVIESA LAS 67 OLAS!', '#ffd166');
  if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
}

function updateKaiWaves(dt) {
  const q = typeof getKaiQuest === 'function' ? getKaiQuest() : null;
  if (!q || q.state !== 'ACTIVE') {
    activeKaiWaves = [];
    return;
  }

  // Zona de rompiente: X entre 8380 y 8780
  kaiWaveSpawnTimer -= dt;
  if (kaiWaveSpawnTimer <= 0) {
    kaiWaveSpawnTimer = 1.4 + Math.random() * 0.4;
    activeKaiWaves.push({
      id: Date.now() + Math.random(),
      x: 8780,
      y: 220,
      w: 24,
      h: 22,
      speed: 85 + Math.random() * 15,
      pierced: false
    });
  }

  const pFeetX = player.x + 11;
  const pFeetY = player.y + 22;

  for (let i = activeKaiWaves.length - 1; i >= 0; i--) {
    const w = activeKaiWaves[i];
    w.x -= w.speed * dt;

    // Colisión con Elizabeth
    const inRange = Math.abs(pFeetX - (w.x + 10)) < 18 && Math.abs(pFeetY - w.y) < 22;
    if (inRange && !w.pierced) {
      if (player.dashTimer > 0 && player.isSurfing) {
        // ¡Water Dash perfecto a través de la cresta!
        w.pierced = true;
        q.wavesCrossed++;
        persistSave();

        spawnParticles(w.x + 10, w.y - 10, 14, '#ffffff', 80, -25);
        spawnParticles(w.x + 10, w.y - 10, 8, '#ffcad4', 70, -15);
        spawnParticles(w.x + 10, w.y - 10, 6, '#ff2a70', 60, -10);
        triggerShake(0.08, 1.5);
        if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();

        if (q.wavesCrossed >= q.realTarget) {
          q.state = 'READY_TO_TURN_IN';
          persistSave();
          spawnFloatingText(player.x - 20, player.y - 22, '¡8/67! ¡KAI QUEDÓ IMPRESIONADO!', '#ffcad4');
          spawnStarSparkles(player.x + 11, player.y + 12, 18, '#ffd166');
          if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
        } else {
          spawnFloatingText(player.x - 12, player.y - 16, `¡OLA ATRAVESADA! (${q.wavesCrossed}/67)`, '#ffd166');
        }
      } else if (!w.hitCooldown || globalFrame - w.hitCooldown > 40) {
        w.hitCooldown = globalFrame;
        player.vx = -120;
        spawnParticles(player.x + 11, player.y + 22, 6, '#ffffff', 40, -10);
        spawnFloatingText(player.x - 14, player.y - 12, '¡USA WATER DASH (BOTÓN)!', '#ff75a0');
      }
    }

    if (w.x < 8350 || w.pierced) {
      activeKaiWaves.splice(i, 1);
    }
  }
}

function drawKaiWaves(ctx) {
  if (!activeKaiWaves || activeKaiWaves.length === 0) return;
  for (const w of activeKaiWaves) {
    if (window.sprites && window.sprites.drawSurfWave) {
      window.sprites.drawSurfWave(ctx, w, globalFrame);
    }
  }
}

function completeKaiQuest(kaiNpc) {
  const q = getKaiQuest();
  if (q.state !== 'READY_TO_TURN_IN') return;

  q.state = 'COMPLETED';
  q.shopOpen = true;
  saveState.keysPhase3 = Math.max(saveState.keysPhase3 || 0, 2);
  persistSave();

  triggerShake(0.18, 2.5);
  spawnStarSparkles(kaiNpc.x + 14, kaiNpc.y - 14, 22, '#ffd166');
  spawnStarSparkles(kaiNpc.x + 14, kaiNpc.y - 14, 16, '#ffffff');
  spawnFloatingText(kaiNpc.x - 24, kaiNpc.y - 24, '★ ¡LLAVE #2 OBTENIDA! TIENDA DE SURF ABIERTA ★', '#ffffff');
  if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
}

function drawKaiQuestHUD(ctx) {
  if (!saveState || !saveState.kaiQuest) return;
  const q = saveState.kaiQuest;
  if (q.state !== 'ACTIVE' && q.state !== 'READY_TO_TURN_IN') return;

  // Si Sami también está activo, ubicar debajo
  const samiActive = saveState.samiQuest && (saveState.samiQuest.state === 'ACTIVE' || saveState.samiQuest.state === 'READY_TO_TURN_IN');
  const pw = 124;
  const ph = 20;
  const px = W - pw - 10;
  const py = samiActive ? 56 : 32;

  drawRoundedPanel(px, py, pw, ph, 6, 'rgba(18, 5, 24, 0.94)', '#ff2a70', 1.2);

  // Icono de ola de surf
  ctx.fillStyle = '#ffcad4';
  ctx.beginPath();
  ctx.arc(px + 11, py + 11, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px + 9, py + 8, 4, 3);

  ctx.textAlign = 'left';
  ctx.fillStyle = q.state === 'READY_TO_TURN_IN' ? '#ffd166' : '#ffffff';
  ctx.font = `bold 6.5px ${UI_FONT}`;

  if (q.state === 'READY_TO_TURN_IN') {
    ctx.fillText(`¡Habla con Kai! (8/67)`, px + 22, py + 13);
  } else {
    ctx.fillText(`Olas: ${q.wavesCrossed}/67 (Water Dash)`, px + 22, py + 13);
  }
}


// --- MODULO: src/entities/quests/raul_frog.js ---
// ============================================================================
// MISIONES MUNDO 3: EL NPC RAÚL Y EL FRAGMENTO DE LLAVE #3
// ============================================================================
// Al hablar con Raúl, entrega directamente el fragmento de Llave de Bronce #3.
// Sin cronómetro ni temporizador de cuenta regresiva (pedido expreso del usuario).

function getRaulQuest() {
  if (!saveState.raulQuest) {
    saveState.raulQuest = {
      state: 'NOT_STARTED', // 'NOT_STARTED' | 'COMPLETED'
      keyGiven: false
    };
  }
  return saveState.raulQuest;
}

function completeRaulDialogue(npc) {
  const q = getRaulQuest();
  if (q.keyGiven) return;
  q.keyGiven = true;
  q.state = 'COMPLETED';

  saveState.keysPhase3 = Math.max(saveState.keysPhase3 || 0, 3);
  persistSave();

  const px = npc ? npc.x : player.x;
  const py = npc ? npc.y : player.y;

  triggerShake(0.15, 2.0);
  spawnStarSparkles(px + 8, py - 4, 20, '#ffd166');
  spawnStarSparkles(px + 8, py - 4, 14, '#ffffff');
  spawnFloatingText(player.x - 36, player.y - 20, 'LLAVE DE BRONCE #3 RECIBIDA!', '#ffd166');
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
}

function updateRaulFrog(dt) {
  // Cronometro eliminado segun pedido del usuario
}

function drawRaulFrogHUD(ctx) {
  // Cronometro y HUD eliminados segun pedido del usuario
}

if (typeof module !== 'undefined') {
  module.exports = {
    getRaulQuest,
    completeRaulDialogue,
    updateRaulFrog,
    drawRaulFrogHUD
  };
}


// --- MODULO: src/entities/quests/don_pancho_hotdogs.js ---
// ============================================================================
// MISIONES MUNDO 3 • FASE 4: DON PANCHO, SUS HOTDOGS Y LA ÚLTIMA LLAVE
// ============================================================================
// 1. "Saben asqueroso" -> Don Pancho dice "A" y EXPLOTA.
// 2. "Saben muy bien"   -> Don Pancho dice "muchas gracias por la respuesta generica donde esta el originilismo" y se CONGELA.
// 3. "No sé"            -> Don Pancho dice "si tiene sentido solo soy un npc no tiene sentido nada" y se ELECTROCHUTA.
// En cualquiera de las 3 opciones suelta el último pedazo de llave (4/4).

function getHotdogQuest() {
  if (!saveState.hotdogQuest) {
    saveState.hotdogQuest = {
      state: 'NOT_STARTED', // 'NOT_STARTED' | 'KEY_DROPPED' | 'COMPLETED'
      choice: null,
      fate: null,
      keyCollected: false,
      keyX: 12480,
      keyY: 192
    };
  }
  return saveState.hotdogQuest;
}

function triggerDonPanchoFate(choice) {
  const q = getHotdogQuest();
  q.choice = choice;

  if (choice === 'asqueroso') q.fate = 'EXPLODE';
  else if (choice === 'bien') q.fate = 'FREEZE';
  else q.fate = 'ELECTROCUTE';

  q.state = 'KEY_DROPPED';
  q.keyX = 12480;
  q.keyY = 192;
  persistSave();

  const kx = q.keyX + 8;
  const ky = q.keyY + 6;

  if (q.fate === 'EXPLODE') {
    spawnParticles(kx, ky, 30, '#ffffff', 140, -40);
    spawnParticles(kx, ky, 22, '#ff2a70', 120, -30);
    spawnParticles(kx, ky, 16, '#3b0820', 90, -15);
    triggerShake(0.24, 3.8);
    if (window.sfx && window.sfx.playHit) window.sfx.playHit();
    if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();
    spawnFloatingText(kx - 16, ky - 26, '¡BOOOOOOM!', '#ffd166');
  } else if (q.fate === 'FREEZE') {
    spawnParticles(kx, ky, 26, '#ffffff', 80, -20);
    spawnParticles(kx, ky, 18, '#ffcad4', 70, -15);
    triggerShake(0.12, 1.8);
    if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
    spawnFloatingText(kx - 20, ky - 26, '¡CONGELADO!', '#ffffff');
  } else {
    spawnParticles(kx, ky, 28, '#ffffff', 110, -30);
    spawnParticles(kx, ky, 18, '#ff2a70', 100, -20);
    triggerShake(0.18, 3.0);
    if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();
    spawnFloatingText(kx - 20, ky - 26, '¡BZZZZZZT!', '#ffd166');
  }

  // Desprendimiento del último pedazo de llave
  spawnStarSparkles(kx, ky, 20, '#ffd166');
  spawnStarSparkles(kx, ky, 14, '#ffffff');
  spawnFloatingText(kx - 34, ky - 14, '¡EL ÚLTIMO PEDAZO DE LLAVE!', '#ffd166');
}

function updateDonPanchoHotdogs(dt) {
  if (gameState !== 'PLAYING') return;
  const q = typeof getHotdogQuest === 'function' ? getHotdogQuest() : null;
  if (!q || q.state !== 'KEY_DROPPED' || q.keyCollected) return;

  if (globalFrame % 14 === 0) {
    spawnStarSparkles(q.keyX + 6, q.keyY + 6, 1, '#ffd166');
  }

  // Detección de recogida por Mamá Elizabeth
  const dist = Math.hypot(player.x + 11 - (q.keyX + 6), player.y + 12 - (q.keyY + 6));
  if (dist < 20) {
    q.keyCollected = true;
    q.state = 'COMPLETED';
    saveState.keysPhase3 = 4; // 4 llaves completas para el ascensor
    persistSave();

    triggerShake(0.2, 3.0);
    spawnStarSparkles(player.x + 11, player.y + 8, 24, '#ffd166');
    spawnStarSparkles(player.x + 11, player.y + 8, 16, '#ffffff');
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
    if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();

    if (typeof startKeyAssemblyAnimation === 'function') {
      startKeyAssemblyAnimation();
    }
  }
}

function drawDonPanchoHotdogsWorld(ctx) {
  const q = typeof getHotdogQuest === 'function' ? getHotdogQuest() : null;
  if (!q || q.state !== 'KEY_DROPPED' || q.keyCollected) return;
  if (window.sprites && window.sprites.drawDroppedKeyPiece) {
    window.sprites.drawDroppedKeyPiece(ctx, q.keyX, q.keyY, globalFrame);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { getHotdogQuest, triggerDonPanchoFate, updateDonPanchoHotdogs, drawDonPanchoHotdogsWorld };
}


// --- MODULO: src/entities/quests/dialogue_manager.js ---
// ============================================================================
// GESTOR DE DIÁLOGOS DINÁMICOS Y MISIONES DE NPCS (MUNDO 3 • FASE 3)
// ============================================================================

function getNpcDynamicLines(npc) {
  if (!npc) return [];

  // 1. Surfista Kai (Misión 2)
  if (npc.name === 'Surfista Kai' || npc.questNpc === 'kai') {
    const q = getKaiQuest();
    if (q.state === 'NOT_STARTED') {
      return [
        '¡Aloha Elizabeth! ¿Tú eres la intrépida mamá ratoncita de la que todos hablan?',
        'Dicen que tienes una tabla legendaria... ¡pero en esta costa hay que demostrarlo!',
        'Toda la playa necesita un show épico para motivarse. ¡Te reto a las 67 OLAS de la rompiente!',
        'Métete al agua y usa tu WATER DASH (botón de dash) para cortar las crestas de ola.',
        'Si logras impresionar a la multitud, te daré la segunda Llave Maestra del Rascacielos.',
        '¡Y además dejaré mi tienda de surf abierta para ti! ¿Lista para lanzarte al agua?'
      ];
    }
    if (q.state === 'ACTIVE') {
      return [
        `Llevas ${q.wavesCrossed} de las 67 olas atravesadas.`,
        '¡Entra a la laguna y pulsa el botón de WATER DASH justo al toparte con cada ola!',
        '¡Vamos, demuéstrale a toda la playa tu poder sobre las aguas!'
      ];
    }
    if (q.state === 'READY_TO_TURN_IN') {
      return [
        '¡WOOOOW! ¡BASTA, BASTA! ¡Por todos los mares!',
        'Iba a hacerte pasar las 67 olas enteras... ¡pero ya me queda claro que llegas a las 67 de sobra!',
        '¡Vaya reflejos y qué potencia de Water Dash! Toda la playa ha quedado boquiabierta.',
        'Cumplo mi palabra: aquí tienes la segunda parte de la llave [LLAVE DE BRONCE #2].',
        '¡Y desde hoy las puertas de mi tienda de surf quedan abiertas para ti de por vida!'
      ];
    }
    return [
      '¡La auténtica leyenda del surf! Mi tienda de tablas está siempre abierta para ti.',
      'He expuesto 3 skins personalizadas en los pedestales: Rosa Neón, Nácar Marina y Obsidiana Magma.',
      '¡Acércate a cualquier pedestal y salta para equiparte la que más te guste!'
    ];
  }

  // 2. Sami el Heladero (Misión 1)
  if (npc.name === 'Sami el Heladero' || npc.questNpc === 'sami') {
    const q = getSamiQuest();
    if (q.state === 'NOT_STARTED') {
      return [
        '¡Hola Elizabeth! ¡Qué calor tan intenso hace esta tarde en la costa!',
        'Tengo este carrito repleto de deliciosos helados de fresa y vainilla...',
        'Pero con este dolor de espalda no puedo recorrer la playa entera.',
        '¿Me ayudarías a ofrecer 10 helados a los turistas que están vacacionando?',
        '¡Entrégaselos a 10 bañistas, tráeme el pago de $100 y te daré una Llave de la Ciudadela!'
      ];
    }
    if (q.state === 'ACTIVE') {
      return [
        `Llevas vendidos ${q.sold} de 10 helados.`,
        'Busca a los turistas que toman el sol o descansan en la arena y ofréceles uno.',
        '¡Vuelve cuando hayas vendido los 10 con todo el dinero!'
      ];
    }
    if (q.state === 'READY_TO_TURN_IN') {
      return [
        '¡Extraordinario Elizabeth! ¡Vendiste los 10 helados y me trajiste los $100 completos!',
        'Toma esta Llave de Bronce de la Ciudadela como recompensa prometida.',
        '¡Es la primera de las 4 llaves necesarias para entrar a las oficinas del frente!'
      ];
    }
    return [
      '¡Gracias a ti todos los turistas del resort están disfrutando de sus helados!',
      'Avanza por la playa, todavía hay otras personas que necesitan tu ayuda para las otras llaves.'
    ];
  }

  // 3. Turistas del Resort (Clientes de Sami)
  if (npc.isTourist || npc.role === 'Turista' || npc.questNpc === 'tourist' || (npc.name && (npc.name.includes('Turista') || npc.name.includes('Bañista') || npc.name.includes('Veraneante') || npc.name.includes('Mateo') || npc.name.includes('Clara') || npc.name.includes('Lucas') || npc.name.includes('Voley') || npc.name.includes('Román') || npc.name.includes('Alan')))) {
    const q = typeof getSamiQuest === 'function' ? getSamiQuest() : null;
    if (q && q.state === 'ACTIVE' && !npc.boughtIceCream) {
      return deliverIceCreamToTourist(npc);
    }
    if (npc.boughtIceCream) {
      return ['¡Qué delicia de helado de fresa y vainilla! ¡Muchas gracias Elizabeth!'];
    }
    return npc.dialogue || [
      '¡Qué lindo día en el resort costero!',
      'Un delicioso helado de Sami vendría genial con este calor.'
    ];
  }

  // 4. Conserje Bruno (Acceso al Rascacielos)
  if (npc.name === 'Conserje Bruno') {
    const keys = saveState.keysPhase3 || 0;
    if (keys === 0) {
      return [
        '¡Alto ahí, ratoncita! Este es el edificio corporativo principal.',
        'Para activar el ascensor hacia la azotea se requieren 4 Llaves Maestras.',
        'Los comerciantes y deportistas de la playa custodian cada una de las 4 llaves.',
        'Ve a la playa y ayúdales con sus misiones para conseguirlas.'
      ];
    }
    if (keys < 4) {
      return [
        `Llevas ${keys} de las 4 Llaves Maestras de la Ciudadela.`,
        keys === 1 ? 'Tienes la Llave #1 de Sami. ¡Buen inicio!' : 'Tienes las Llaves #1 de Sami y #2 de Kai. ¡Gran progreso!',
        'Aún te faltan llaves de las otras misiones para desbloquear el ascensor.'
      ];
    }
    return [
      '¡Increíble! ¡Tienes las 4 Llaves Maestras completas!',
      'Las puertas del ascensor están desbloqueadas. ¡Sube a la azotea y salva a tu hijo!'
    ];
  }

  // 5. Raul y su ranita (Fase 4: Edificio Objetivo)
  if (npc.name === 'Raúl' || npc.questNpc === 'raul') {
    const q = typeof getRaulQuest === 'function' ? getRaulQuest() : null;
    if (!q || !q.keyGiven) {
      return [
        'Hola Elizabeth! Me llamo Raul y esta es mi querida ranita de la bahia.',
        'Nos enteramos de que buscas subir a la cima del rascacielos para salvar a tu hijo.',
        'Mi ranita encontro este fragmento brillante junto al estanque... toma la [LLAVE DE BRONCE #3]!',
        'Mucho exito enfrentando la gran ola marina que se aproxima!'
      ];
    }
    return [
      'Mucho exito en la cima del rascacielos, Elizabeth!',
      'Usa las llaves maestras en el gran portal para tomar el ascensor de alta velocidad.'
    ];
  }

  // 6. Ingeniero Daniel (Fase 4: Edificio Objetivo)
  if (npc.name === 'Ingeniero Daniel' || npc.questNpc === 'daniel') {
    return [
      '¡Cuidado, señora ratoncita! ¡Este edificio corporativo está en máxima alerta!',
      '¿Buscas a tu hijo? ¡Vimos a unos sujetos subirlo a toda prisa hacia las cornisas superiores!',
      'El lobby interior está sellado por el sismo, pero puedes trepar por las pasarelas exteriores.',
      '¡Sube por las marquesinas laterales si quieres alcanzar la cima y encontrar a tu pequeño!'
    ];
  }

  // 7. Guardia Miranda (Fase 4: Edificio Objetivo)
  if (npc.name === 'Guardia Miranda' || npc.questNpc === 'miranda') {
    return [
      '¡El agua de la bahía entera se ha retirado hacia el horizonte! ¡Es la calma antes de la catástrofe!',
      'Un megatsunami gigantesco viene en camino y arrasará todas las avenidas de la costa.',
      'Tu hijo está arriba en el edificio. ¡Escala por las terrazas exteriores antes del impacto!',
      '¡Mantén tu tabla de surf bien sujeta, la vas a necesitar para sobrevivir a la ola gigante!'
    ];
  }

  // 8. Don Pancho y sus Hot Dogs (Mundo 3 • Fase 4 • Parte 2)
  if (npc.name === 'Don Pancho' || npc.questNpc === 'hotdogs') {
    const q = typeof getHotdogQuest === 'function' ? getHotdogQuest() : null;
    if (q && q.state !== 'NOT_STARTED') {
      if (q.fate === 'EXPLODE') {
        return ['* Solo quedan cenizas de Don Pancho y migajas de pan tostado. *'];
      }
      if (q.fate === 'FREEZE') {
        return ['* Don Pancho sigue congelado dentro de un sólido bloque de hielo. *'];
      }
      return ['* La silueta chamuscada de Don Pancho aún emite diminutas chispas. *'];
    }

    return [
      '¡Hola Elizabeth! ¡Acabo de inventar una nueva receta secreta de hot dogs costeros!',
      {
        speaker: 'Don Pancho',
        text: '¡Toma, prueba uno recién salido de la parrilla! ¿Qué te parece el sabor?',
        choices: [
          { text: 'Saben asqueroso', value: 'asqueroso' },
          { text: 'Saben muy bien', value: 'bien' },
          { text: 'No sé...', value: 'nose' }
        ],
        onChoice: function(idx, choice) {
          let responseText = '';
          if (choice.value === 'asqueroso') {
            responseText = 'A';
          } else if (choice.value === 'bien') {
            responseText = 'muchas gracias por la respuesta generica donde esta el originilismo';
          } else {
            responseText = 'si tiene sentido solo soy un npc no tiene sentido nada';
          }

          if (typeof triggerDonPanchoFate === 'function') {
            triggerDonPanchoFate(choice.value);
          }

          activeDialogueList = [
            { speaker: 'Don Pancho', text: responseText }
          ];
          dialogueIndex = 0;
          dialogueCharIndex = 0;
        }
      }
    ];
  }

  // Gaston el Melancólico (Casa 3)
  if (npc.name && npc.name.includes('Gaston')) {
    if (typeof player !== 'undefined' && player && player.hasIcePick) {
      return [
        '¡Gracias infinitas por la pala, Elizabeth! Ahora puedo laburar feliz en el jardín de nieve.',
        'Usa el Pico de Hielo con el botón de Acción / Dash para destrozar los muros de hielo del lago en la Fase 4.',
        '¡Sube a la cima del Everest y rescata a tu hijo!'
      ];
    }
  }

  return null;
}

function handleNpcQuestDialogueEnd(npc) {
  if (!npc) return;
  if (npc.name === 'Surfista Kai' || npc.questNpc === 'kai') {
    const q = getKaiQuest();
    if (q.state === 'NOT_STARTED') {
      startKaiQuest();
    } else if (q.state === 'READY_TO_TURN_IN') {
      completeKaiQuest(npc);
    }
  } else if (npc.name === 'Sami el Heladero' || npc.questNpc === 'sami') {
    const q = getSamiQuest();
    if (q.state === 'NOT_STARTED') {
      startSamiQuest();
    } else if (q.state === 'READY_TO_TURN_IN') {
      completeSamiQuest(npc);
    }
  } else if (npc.name === 'Raúl' || npc.questNpc === 'raul') {
    if (typeof completeRaulDialogue === 'function') {
      completeRaulDialogue(npc);
    }
  } else if (npc.name === 'Hijo Ratoncito' && npc.x >= 18000) {
    if (typeof startKrakenIntroAnimation === 'function') {
      startKrakenIntroAnimation();
    }
  } else if (npc.name && npc.name.includes('Tashi')) {
    // Tabernero Tashi: Sopa del Himalaya (Restaura corazones)
    if (typeof player !== 'undefined' && player) {
      player.lives = player.maxLives;
      if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 18, '#ff75a0');
        spawnStarSparkles(player.x + 11, player.y + 12, 12, '#ffd166');
      }
      if (typeof triggerShake === 'function') triggerShake(0.08, 1.2);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x, player.y - 20, '¡CORAZONES RESTAURADOS!', '#ff75a0');
      }
    }
  } else if (npc.name && npc.name.includes('Lobsang')) {
    // Lobsang el Jugador: Dados de la suerte (+10 lirios)
    if (!npc.rewardGiven) {
      npc.rewardGiven = true;
      saveState.dexterLilies = (saveState.dexterLilies || 0) + 10;
      if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 14, '#fde047');
      }
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x, player.y - 20, '¡+10 LIRIOS DE LA SUERTE!', '#fde047');
      }
    }
  } else if (npc.name && npc.name.includes('Dolma')) {
    // Madame Dolma: Bendición de lana alpina (Botas y bufanda calientita, velocidad 168)
    if (typeof player !== 'undefined' && player) {
      player.speed = 168;
      if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 20, '#ec4899');
        spawnStarSparkles(player.x + 11, player.y + 12, 16, '#f472b6');
      }
      if (typeof triggerShake === 'function') triggerShake(0.08, 1.2);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x, player.y - 20, '¡BUFANDA Y BOTAS DE LANA EQUIPADAS!', '#f472b6');
      }
    }
  } else if (npc.name && npc.name.includes('Gaston')) {
    // Gaston el Melancólico: Intercambio de Pala por Pico de Hielo Profesional
    if (typeof player !== 'undefined' && player && !player.hasIcePick) {
      player.hasIcePick = true;
      player.ability = 'ice_pick';
      const dashBtn = document.getElementById('btn-dash');
      if (dashBtn) {
        dashBtn.classList.add('visible');
        const tag = dashBtn.querySelector('.btn-tag');
        if (tag) tag.textContent = 'PICO';
      }
      if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 24, '#38bdf8');
      }
      if (typeof triggerShake === 'function') triggerShake(0.12, 1.8);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x - 20, player.y - 20, '¡PICO DE HIELO OBTENIDO!', '#38bdf8');
      }
    }
  } else if (npc.name && npc.name.includes('Mimi')) {
    // Mimi la Repostera: Bollo de Canela del Horno (Restaura corazones + velocidad 175)
    if (typeof player !== 'undefined' && player) {
      player.lives = player.maxLives;
      player.speed = 175;
      if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 22, '#f59e0b');
        spawnStarSparkles(player.x + 11, player.y + 12, 16, '#ffd166');
      }
      if (typeof triggerShake === 'function') triggerShake(0.08, 1.2);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x, player.y - 20, '¡BOLLO DE CANELA! ¡CORAZONES Y VELOCIDAD AL MÁXIMO!', '#f59e0b');
      }
    }
  } else if (npc.name && npc.name.includes('Kazi')) {
    // Maestro Kazi el Herrero: Templado de Pico en Acero Glacial
    if (typeof player !== 'undefined' && player) {
      player.hasForgedPick = true;
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 24, '#facc15');
        spawnStarSparkles(player.x + 11, player.y + 12, 18, '#38bdf8');
      }
      if (typeof triggerShake === 'function') triggerShake(0.14, 2.0);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x - 20, player.y - 20, '¡PICO FORJADO MEJORADO!', '#facc15');
      }
    }
  } else if (npc.name && npc.name.includes('Dorje')) {
    // Alcalde Dorje: Sello Oficial del Pueblo (+20 lirios)
    if (!npc.decreeGranted) {
      npc.decreeGranted = true;
      saveState.dexterLilies = (saveState.dexterLilies || 0) + 20;
      if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 28, '#ffd166');
        spawnStarSparkles(player.x + 11, player.y + 12, 20, '#38bdf8');
      }
      if (typeof triggerShake === 'function') triggerShake(0.16, 2.2);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x - 30, player.y - 20, '¡SELLO OFICIAL DEL PUEBLO! +20 LIRIOS', '#ffd166');
      }
    }
  }
}


// --- MODULO: src/entities/surfboard_skins.js ---
// ============================================================================
// MECÁNICAS MUNDO 3 • FASE 3: INTERACCIÓN CON SKINS DE TABLA DE SURF
// ============================================================================

const SURFBOARD_STANDS = [
  { skinKey: 'classic', x: 8150, y: 220, name: 'Rosa Neón' },
  { skinKey: 'nacar', x: 8185, y: 220, name: 'Nácar Marina' },
  { skinKey: 'obsidian', x: 8220, y: 220, name: 'Obsidiana Magma' }
];

function updateSurfboardSkinsInteraction() {
  if (gameState !== 'PLAYING') return;

  const px = player.x + 11;
  const py = player.y + 22;

  for (const stand of SURFBOARD_STANDS) {
    const inRange = Math.abs(px - stand.x) < 18 && Math.abs(py - stand.y) < 24;
    if (inRange) {
      if (keys.jumpJustPressed) {
        const isShopOpen = saveState && saveState.kaiQuest && saveState.kaiQuest.shopOpen;
        if (!isShopOpen) {
          spawnFloatingText(stand.x - 24, stand.y - 45, '¡COMPLETA EL RETO DE KAI PARA DESBLOQUEAR!', '#ff75a0');
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          return;
        }

        if (saveState.surfboardSkin === stand.skinKey) {
          spawnFloatingText(stand.x - 14, stand.y - 42, `¡YA TIENES EQUIPADA LA ${stand.name.toUpperCase()}!`, '#ffd166');
          return;
        }

        // Equipar nueva skin
        saveState.surfboardSkin = stand.skinKey;
        persistSave();

        keys.jumpJustPressed = false;
        player.vy = 0;

        // Efectos temáticos de cada skin
        if (stand.skinKey === 'nacar') {
          spawnStarSparkles(stand.x, stand.y - 20, 16, '#ffd166');
          spawnStarSparkles(stand.x, stand.y - 20, 12, '#ffffff');
          spawnParticles(player.x + 11, player.y + 12, 12, '#ffcad4', 70, -20);
        } else if (stand.skinKey === 'obsidian') {
          spawnStarSparkles(stand.x, stand.y - 20, 16, '#ff2a70');
          spawnParticles(player.x + 11, player.y + 12, 14, '#8f143c', 80, -25);
          spawnParticles(player.x + 11, player.y + 12, 8, '#07020a', 60, -15);
        } else {
          spawnStarSparkles(stand.x, stand.y - 20, 16, '#ff2a70');
          spawnParticles(player.x + 11, player.y + 12, 12, '#ffffff', 70, -20);
        }

        triggerShake(0.1, 1.5);
        spawnFloatingText(player.x - 24, player.y - 22, `¡TABLA EQUIPADA: ${stand.name.toUpperCase()}!`, '#ffd166');
        if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
        return;
      }
    }
  }
}

function getSurfboardStands() {
  return SURFBOARD_STANDS;
}


// --- MODULO: src/entities/quests/earthquake_prelude.js ---
// ============================================================================
// CINEMÁTICA Y PRELUDIO DE LA FASE 4: EL ENCUENTRO EN LA AZOTEA Y EL TERREMOTO
// ============================================================================
let earthquakeTriggered = false;
let earthquakeTimer = 0;
let tsunamiLaunched = false;

// Estado de la animación de sorpresa (Terremoto, signo !!! y mirada a los lados)
let rooftopShock = {
  triggered: false,
  active: false,
  timer: 0,
  duration: 2.8,
  popScale: 0
};

function isRooftopTremorLocked() {
  return rooftopShock && rooftopShock.active;
}

function updateEarthquakePrelude(dt) {
  if (gameState !== 'PLAYING') return;

  // Si el jugador está antes del mirador del edificio, reiniciar estado si retrocede o reaparece
  if (player.x < 15000) {
    earthquakeTriggered = false;
    tsunamiLaunched = false;
    earthquakeTimer = 0;
    rooftopShock.triggered = false;
    rooftopShock.active = false;
    rooftopShock.timer = 0;
    rooftopShock.popScale = 0;
    return;
  }

  // Se activa cuando el jugador salta y aterriza en el segundo edificio (X >= 15110)
  const landedOnSecondBuilding = player.x >= 15110 && player.x <= 15300 && player.onGround;

  if (landedOnSecondBuilding && !rooftopShock.triggered) {
    rooftopShock.triggered = true;
    rooftopShock.active = true;
    rooftopShock.timer = 0;
    rooftopShock.popScale = 0;

    earthquakeTriggered = true;
    earthquakeTimer = 999.0;

    triggerShake(0.9, 3.2);
    rumbleGamepad(600, 0.9, 0.9);
    if (window.sfx && window.sfx.playHit) window.sfx.playHit();

    // Reacción física de sobresalto
    player.squashY = 1.3;
    player.squashX = 0.75;
    player.vx = 0;
    player.facingRight = true;

    spawnParticles(player.x + 11, player.y - 25, 18, '#ffffff', 80, 50);
    spawnParticles(player.x + 11, player.y - 25, 12, '#ffcad4', 60, 40);
    spawnParticles(player.x + 11, player.y - 25, 10, '#ff2a70', 70, 50);
  }

  // Secuencia de animación de sorpresa: temblor, signo !!! y mirada a los lados
  if (rooftopShock.active) {
    rooftopShock.timer += dt;
    const t = rooftopShock.timer;

    // Escala del pop para el signo !!! (animación elástica)
    if (t < 0.18) {
      rooftopShock.popScale = (t / 0.18) * 1.35;
    } else if (t < 0.35) {
      rooftopShock.popScale = 1.35 - ((t - 0.18) / 0.17) * 0.35;
    } else {
      rooftopShock.popScale = 1.0;
    }

    // Terremoto violento continuo durante la sorpresa
    if (globalFrame % 5 === 0) {
      triggerShake(0.28, 2.2);
    }
    // Partículas de polvo cayendo y desprendiéndose de la estructura
    if (globalFrame % 4 === 0) {
      spawnParticles(player.x + (Math.random() * 60 - 30), player.y - 14, 2, '#ffffff', 40, 25);
      spawnParticles(player.x + (Math.random() * 40 - 20), player.y + 24, 1, '#ffd166', 30, -10);
    }

    // Elizabeth no puede moverse y mira a los lados asustada
    player.vx = 0;
    player.state = 'idle';

    if (t < 0.6) {
      // 1. Momento de impacto inicial: mira al frente (derecha), sobresaltada
      player.facingRight = true;
    } else if (t < 1.2) {
      // 2. Gira la cabeza y mira hacia atrás (izquierda) alarmada
      player.facingRight = false;
    } else if (t < 1.8) {
      // 3. Gira de nuevo hacia el frente (derecha), viendo al hijo en apuros
      player.facingRight = true;
    } else if (t < 2.4) {
      // 4. Mira rápidamente a ambos lados con el terremoto intensificándose
      player.facingRight = (Math.floor(t * 8) % 2 === 0);
    } else {
      // 5. ¡DE LA NADA! Se desencadena la destrucción del rascacielos y el megatsunami
      rooftopShock.active = false;
      tsunamiLaunched = true;
      player.facingRight = true;
      if (typeof startTsunamiCutscene === 'function') {
        startTsunamiCutscene(16050, 172);
      }
    }
  }

  // Temblores sísmicos ambientales continuos
  if (earthquakeTriggered && !tsunamiLaunched && !rooftopShock.active) {
    if (globalFrame % 14 === 0) {
      triggerShake(0.12, 1.4);
      spawnParticles(player.x + (Math.random() * 80 - 40), player.y - 20, 2, '#ffffff', 40, 30);
    }
  }
}

// Dibuja el signo !!! y los efectos de sorpresa sobre Mamá Ratón en coordenadas del mundo
function drawRooftopShockEffects(ctx) {
  if (!rooftopShock.active || rooftopShock.popScale <= 0) return;

  const bx = Math.round(player.x + 11);
  const by = Math.round(player.y - 10 + Math.sin(globalFrame * 0.2) * 1.5);
  const scale = rooftopShock.popScale;

  ctx.save();
  ctx.translate(bx, by);
  ctx.scale(scale, scale);

  const bw = 26;
  const bh = 16;
  const rx = -bw / 2;
  const ry = -bh / 2;

  // Sombra exterior
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(rx + 2, ry + 2, bw, bh);

  // Panel del badge (estilo cómic / alerta)
  drawRoundedPanel(rx, ry, bw, bh, 4, 'rgba(18, 4, 21, 0.95)', '#ff2a70', 1.6);

  // Flechita / puntero del bocadillo hacia la cabeza de Elizabeth
  ctx.fillStyle = '#ff2a70';
  ctx.beginPath();
  ctx.moveTo(-4, ry + bh);
  ctx.lineTo(0, ry + bh + 4);
  ctx.lineTo(4, ry + bh);
  ctx.fill();

  ctx.fillStyle = '#120415';
  ctx.beginPath();
  ctx.moveTo(-2, ry + bh);
  ctx.lineTo(0, ry + bh + 2);
  ctx.lineTo(2, ry + bh);
  ctx.fill();

  // Rayos de impacto estilo manga / cómic
  const pulse = Math.sin(globalFrame * 0.3) * 2;
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(rx - 4 - pulse, ry - 3, 3, 2);
  ctx.fillRect(rx - 2, ry - 5 - pulse, 2, 3);
  ctx.fillRect(rx + bw + 1 + pulse, ry - 3, 3, 2);
  ctx.fillRect(rx + bw, ry - 5 - pulse, 2, 3);

  // Signo "!!!"
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = `900 8px ${UI_FONT}`;
  ctx.fillText('!!!', 0, 1);
  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 8px ${UI_FONT}`;
  ctx.fillText('!!!', 0, 0);

  ctx.restore();
}

function drawEarthquakePreludeBanner(ctx) {
  // Solo se muestra tras terminar la sorpresa para no sobrecargar la pantalla
  if (!earthquakeTriggered || tsunamiLaunched || rooftopShock.active || gameState !== 'PLAYING') return;

  ctx.save();
  const pw = 360;
  const ph = 32;
  const px = (W - pw) / 2;
  const py = H - 42;

  drawRoundedPanel(px, py, pw, ph, 8, 'rgba(18, 4, 21, 0.94)', '#ff2a70', 1.8);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText('¡ALERTA DE MEGATSUNAMI! ¡EL OCÉANO SE RETIRA EN EL HORIZONTE!', W / 2, py + 12);

  ctx.fillStyle = '#ffffff';
  ctx.font = `5.5px ${UI_FONT}`;
  ctx.fillText('¡Habla con tu hijo y corre a la rampa de salto para lanzarte con tu tabla de surf!', W / 2, py + 23);

  ctx.restore();
}

function resetEarthquakePrelude() {
  earthquakeTriggered = false;
  earthquakeTimer = 0;
  tsunamiLaunched = false;
  rooftopShock = {
    triggered: false,
    active: false,
    timer: 0,
    duration: 2.8,
    popScale: 0
  };
}

if (typeof module !== 'undefined') {
  module.exports = {
    updateEarthquakePrelude,
    drawEarthquakePreludeBanner,
    drawRooftopShockEffects,
    resetEarthquakePrelude,
    isRooftopTremorLocked
  };
}


// --- MODULO: src/entities/player/shovel_ability.js ---
// ============================================================================
// HABILIDAD MUNDO 4: LA PALA (CAVADO DE TÚNELES EN NIEVE Y BOLAS DE NIEVE)
// ============================================================================
// 1. Cavado subterráneo: Elizabeth se sumerge en los bancos de nieve (snow_bank)
//    para avanzar a gran velocidad como ratona, esquivando ventiscas y enemigos.
// 2. Bolas de nieve (Máx 5): Con la pala recoge bolas de nieve en el suelo helado
//    y las arroja a los enemigos con trayectoria balística para congelarlos/destruirlos.

let shovelState = {
  snowballs: 0,
  maxSnowballs: 5,
  isDigging: false,
  digSpeed: 235,
  projectiles: [],
  scoopCooldown: 0,
  throwCooldown: 0
};

function getShovelState() {
  return shovelState;
}

function initShovelAbility() {
  shovelState = {
    snowballs: 0,
    maxSnowballs: 5,
    isDigging: false,
    digSpeed: 235,
    projectiles: [],
    scoopCooldown: 0,
    throwCooldown: 0
  };
  if (typeof player !== 'undefined' && player) {
    player.snowballs = 0;
    player.isDigging = false;
  }
}

function updateShovelAbility(dt) {
  if (gameState !== 'PLAYING' || !player || player.ability !== 'shovel') {
    return;
  }

  if (shovelState.scoopCooldown > 0) shovelState.scoopCooldown -= dt;
  if (shovelState.throwCooldown > 0) shovelState.throwCooldown -= dt;

  // 1. DETECCIÓN DE BANCOS DE NIEVE PARA CAVAR TÚNELES SUBTERRÁNEOS
  const feetX = player.x + player.w / 2;
  const feetY = player.y + player.h;
  let inSnowBank = false;
  let activeSnowBank = null;

  if (level && level.platforms) {
    for (let i = 0; i < level.platforms.length; i++) {
      const p = level.platforms[i];
      if (p.subType === 'snow_bank') {
        if (feetX >= p.x && feetX <= p.x + p.w && feetY >= p.y - 2 && player.y <= p.y + p.h + 6) {
          inSnowBank = true;
          activeSnowBank = p;
          break;
        }
      }
    }
  }

  // Activar o desactivar estado de cavado subterráneo
  const wantsDive = inSnowBank && (keys.down || keys.downJustPressed || (keys.dashJustPressed && shovelState.snowballs === shovelState.maxSnowballs));
  if (inSnowBank && (wantsDive || shovelState.isDigging)) {
    shovelState.isDigging = true;
    player.isDigging = true;

    // Mantener la posición física dentro de la masa de nieve
    if (activeSnowBank) {
      player.y = activeSnowBank.y - 4;
      player.vy = 0;
    }

    // Aumento de velocidad al excavar por debajo de la nieve
    if (keys.left || keys.right) {
      const dir = keys.right ? 1 : -1;
      player.vx = dir * shovelState.digSpeed;
      player.facingRight = dir > 0;
    }

    // Efectos de partículas de nieve salpicando mientras excava
    if (globalFrame % 3 === 0) {
      spawnParticles(player.x + 11, player.y + 18, 3, '#ffffff', 50, -35);
      spawnParticles(player.x + 11, player.y + 18, 2, '#caf0f8', 40, -25);
      spawnParticles(player.x + 11, player.y + 18, 1, '#90e0ef', 30, -15);
    }

    // Salto impulsado para salir del banco de nieve con impacto ofensivo
    if (keys.jumpJustPressed) {
      shovelState.isDigging = false;
      player.isDigging = false;
      player.vy = -305;
      triggerShake(0.1, 1.8);
      spawnParticles(player.x + 11, player.y + 10, 20, '#ffffff', 100, -65);
      spawnParticles(player.x + 11, player.y + 10, 14, '#caf0f8', 85, -50);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(true);
      spawnFloatingText(player.x - 10, player.y - 14, 'SALTO DE NIEVE!', '#ffffff');

      // Destruir enemigos terrestres que esten justo encima del banco
      const nearbyEnemies = (level && level.magmaCrawlers ? level.magmaCrawlers : []).concat(level && level.fireBats ? level.fireBats : []);
      for (let e of nearbyEnemies) {
        if (!e.dead && Math.hypot((player.x + 11) - (e.x + 10), (player.y + 10) - (e.y + 9)) < 38) {
          e.dead = true;
          score += 150;
          spawnParticles(e.x + 10, e.y + 10, 14, '#38bdf8', 80, -30);
          spawnFloatingText(e.x - 10, e.y - 12, 'IMPACTO DE NIEVE! +150', '#38bdf8');
        }
      }
    }
  } else if (!inSnowBank) {
    shovelState.isDigging = false;
    player.isDigging = false;
  }

  // 2. DETECCION DE NIEVE EN EL SUELO (SNOW_GROUND O SNOW_BANK)
  let onSnowGround = false;
  if (level && level.platforms && player.onGround) {
    const feetX = player.x + player.w / 2;
    const feetY = player.y + player.h + 2;
    for (let i = 0; i < level.platforms.length; i++) {
      const p = level.platforms[i];
      if ((p.subType === 'snow_ground' || p.subType === 'snow_bank' || (level.theme === 'snow' && (!p.subType || p.subType === 'grass'))) &&
          feetX >= p.x && feetX <= p.x + p.w && feetY >= p.y && feetY <= p.y + p.h + 10) {
        onSnowGround = true;
        break;
      }
    }
  }

  // 3. RECOGER BOLAS DE NIEVE CON LA PALA (MAXIMO 5)
  // Se recoge si se pulsa Dash estando agachado con Down, o si no tenemos ninguna bola
  const wantsScoop = keys.dashJustPressed && onSnowGround &&
    shovelState.snowballs < shovelState.maxSnowballs &&
    (keys.down || shovelState.snowballs === 0);

  if (wantsScoop && shovelState.scoopCooldown <= 0) {
    keys.dashJustPressed = false;
    shovelState.scoopCooldown = 0.32;
    shovelState.snowballs = Math.min(shovelState.maxSnowballs, shovelState.snowballs + 1);
    player.snowballs = shovelState.snowballs;

    triggerShake(0.06, 1.0);
    spawnParticles(player.x + (player.facingRight ? 18 : 4), player.y + 20, 10, '#ffffff', 60, -30);
    spawnParticles(player.x + (player.facingRight ? 18 : 4), player.y + 20, 6, '#caf0f8', 50, -20);
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();

    spawnFloatingText(
      player.x - 14,
      player.y - 12,
      `BOLA DE NIEVE! (${shovelState.snowballs}/${shovelState.maxSnowballs})`,
      '#caf0f8'
    );
  }

  // 4. LANZAR BOLA DE NIEVE A LOS ENEMIGOS
  // Si se pulsa Dash y tenemos bolas de nieve acumuladas (sin estar agachados recogiendo)
  const wantsThrow = keys.dashJustPressed && shovelState.snowballs > 0 && !wantsScoop;

  if (wantsThrow && shovelState.throwCooldown <= 0) {
    keys.dashJustPressed = false;
    shovelState.throwCooldown = 0.28;
    shovelState.snowballs--;
    player.snowballs = shovelState.snowballs;

    const dir = player.facingRight ? 1 : -1;
    const startX = player.x + (player.facingRight ? 18 : -2);
    const startY = player.y + 12;

    shovelState.projectiles.push({
      x: startX,
      y: startY,
      vx: dir * 360,
      vy: -35,
      radius: 4.5,
      life: 1.8
    });

    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    spawnParticles(startX, startY, 5, '#ffffff', 50, -10);
  }

  // 5. FISICA Y COLISIONES DE LAS BOLAS DE NIEVE
  for (let i = shovelState.projectiles.length - 1; i >= 0; i--) {
    const b = shovelState.projectiles[i];
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.vy += 270 * dt; // Gravedad suave
    b.life -= dt;

    // Estela de nieve voladora
    if (globalFrame % 2 === 0) {
      spawnParticles(b.x, b.y, 1, '#ffffff', 18, -5);
    }

    let hit = false;

    // Colision con enemigos (magmaCrawlers, fireBats u orugas heladas)
    const enemies = (level && level.magmaCrawlers ? level.magmaCrawlers : []).concat(level && level.fireBats ? level.fireBats : []);
    for (let e of enemies) {
      if (!e.dead) {
        const eCenterX = e.x + (e.w || 20) / 2;
        const eCenterY = e.y + (e.h || 18) / 2;
        const dx = Math.abs(b.x - eCenterX);
        const dy = Math.abs(b.y - eCenterY);
        const isNear = (dx < 18 && dy < 20) || (b.x >= e.x - 4 && b.x <= e.x + (e.w || 20) + 4 && b.y >= e.y - 12 && b.y <= e.y + (e.h || 18) + 8);
        if (isNear) {
          hit = true;
          e.dead = true;
          score += 150;
          triggerShake(0.12, 1.8);
          spawnParticles(e.x + 10, e.y + 10, 18, '#ffffff', 90, 40);
          spawnParticles(e.x + 10, e.y + 10, 12, '#caf0f8', 80, 30);
          spawnParticles(e.x + 10, e.y + 10, 8, '#00b4d8', 70, 20);
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          spawnFloatingText(e.x - 10, e.y - 14, 'CONGELADO! +150', '#caf0f8');
          break;
        }
      }
    }

    // Colisión con terreno sólido o pilares quebrables
    if (!hit && level && level.platforms) {
      for (let pIdx = level.platforms.length - 1; pIdx >= 0; pIdx--) {
        const p = level.platforms[pIdx];
        if (b.x >= p.x && b.x <= p.x + p.w && b.y >= p.y && b.y <= p.y + p.h) {
          hit = true;
          if (p.breakable) {
            p.hp = (p.hp || 1) - 1;
            if (p.hp <= 0) {
              level.platforms.splice(pIdx, 1);
              score += 200;
              triggerShake(0.18, 2.5);
              if (window.sfx && window.sfx.playHit) window.sfx.playHit();
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 22, '#38bdf8', 110, -45);
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 16, '#c084fc', 90, -35);
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 12, '#ffffff', 80, -25);
              spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 10, '#fef08a');
              spawnFloatingText(p.x + p.w / 2 - 20, p.y - 12, '¡PILAR QUEBRADO! +200', '#38bdf8');
              spawnDroppedLilies(p.x + p.w / 2, p.y + p.h / 2, 3);
            } else {
              triggerShake(0.08, 1.2);
              spawnParticles(b.x, b.y, 10, '#38bdf8', 60, -20);
            }
          } else {
            spawnParticles(b.x, b.y, 8, '#ffffff', 60, -20);
            spawnParticles(b.x, b.y, 5, '#caf0f8', 45, -15);
          }
          break;
        }
      }
    }

    if (hit || b.life <= 0) {
      shovelState.projectiles.splice(i, 1);
    }
  }
}

// Renderizado de las bolas de nieve en vuelo y efectos subterráneos
function drawShovelWorld(ctx) {
  if (!shovelState) return;

  // Bolas de nieve activas proyectadas
  for (const b of shovelState.projectiles) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#caf0f8';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Brillo estelar
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(b.x - 1, b.y - 1, 2, 2);
  }

  // Efecto visual cuando Elizabeth cava bajo un banco de nieve
  if (player && player.isDigging) {
    const mx = player.x + 11;
    const my = player.y + 16;
    const pulse = Math.sin(globalFrame * 0.3) * 2;

    // Montículo de nieve superficial en avance
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(mx, my + 6, 14 + pulse, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#caf0f8';
    ctx.beginPath();
    ctx.ellipse(mx, my + 5, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pala de metal asomando rítmicamente
    ctx.fillStyle = '#adb5bd';
    const palaOff = Math.sin(globalFrame * 0.4) * 4;
    ctx.fillRect(mx + (player.facingRight ? 8 : -12), my - 2 + palaOff, 4, 6);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(mx + (player.facingRight ? 9 : -11), my + 4 + palaOff, 2, 5);
  }
}

// Renderizado de la munición de bolas de nieve en el HUD
function drawShovelHUD(ctx, x, y) {
  if (!player || player.ability !== 'shovel') return;

  // Icono de la pala
  ctx.fillStyle = '#495057';
  ctx.fillRect(x, y + 2, 3, 10);
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(x - 2, y + 10, 7, 5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x - 1, y + 11, 5, 3);

  // 5 ranuras de bolas de nieve
  const sx = x + 12;
  for (let i = 0; i < shovelState.maxSnowballs; i++) {
    const bx = sx + i * 9;
    const by = y + 7;
    const hasBall = i < shovelState.snowballs;

    if (hasBall) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#90e0ef';
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bx, by, 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    getShovelState,
    initShovelAbility,
    updateShovelAbility,
    drawShovelWorld,
    drawShovelHUD
  };
}


// --- MODULO: src/entities/player/ice_pick_ability.js ---
// ============================================================================
// HABILIDAD MUNDO 4: EL PICO DE HIELO (GOLPE GLACIAL Y QUIEBRE DE TÉMPANOS)
// ============================================================================
// Obtenido de Gaston el Melancólico en la Casa 3 del Pueblo Nevado.
// Permite que Elizabeth golpee con un pico de hielo profesional para romper
// muros de hielo, desviar proyectiles y atacar enemigos helados.

let icePickState = {
  swingTimer: 0,
  swingCooldown: 0,
  swingDuration: 0.18,
  particles: []
};

function initIcePickAbility() {
  icePickState = {
    swingTimer: 0,
    swingCooldown: 0,
    swingDuration: 0.18,
    particles: []
  };
  if (typeof player !== 'undefined' && player) {
    player.isSwingingPick = false;
  }
}

function updateIcePickAbility(dt) {
  if (gameState !== 'PLAYING' || !player || player.ability !== 'ice_pick') {
    return;
  }

  if (icePickState.swingCooldown > 0) icePickState.swingCooldown -= dt;
  if (icePickState.swingTimer > 0) {
    icePickState.swingTimer -= dt;
    if (icePickState.swingTimer <= 0) {
      player.isSwingingPick = false;
    }
  }

  // Ejecución de golpe con el pico al pulsar DASH o TECLA DE ACCIÓN
  if (keys.dashJustPressed && icePickState.swingCooldown <= 0) {
    keys.dashJustPressed = false;
    icePickState.swingTimer = icePickState.swingDuration;
    icePickState.swingCooldown = 0.28;
    player.isSwingingPick = true;

    if (window.sfx && window.sfx.playHit) window.sfx.playHit();
    triggerShake(0.06, 1.2);

    const hitX = player.x + (player.facingRight ? (player.hasForgedPick ? 30 : 24) : (player.hasForgedPick ? -12 : -6));
    const hitY = player.y + 12;
    const reach = player.hasForgedPick ? 48 : 34;

    spawnParticles(hitX, hitY, 10, player.hasForgedPick ? '#facc15' : '#38bdf8', 80, -20);
    spawnParticles(hitX, hitY, 6, '#e0f2fe', 60, -10);
    spawnStarSparkles(hitX, hitY, 6, player.hasForgedPick ? '#fde047' : '#ffffff');

    // 1. Comprobar colisión con enemigos terrestres (Frost Crawlers / Magma Crawlers)
    if (typeof magmaCrawlers !== 'undefined' && magmaCrawlers) {
      for (let i = magmaCrawlers.length - 1; i >= 0; i--) {
        const mc = magmaCrawlers[i];
        const ex = mc.x + 9;
        const ey = mc.y + 7;
        if (Math.abs(hitX - ex) < reach && Math.abs(hitY - ey) < 28) {
          score += 150;
          if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
          triggerShake(0.12, 2.0);
          spawnFloatingText(mc.x, mc.y - 10, player.hasForgedPick ? '¡CORTE FORJADO! +150' : '¡PICADO! +150', '#38bdf8');
          spawnParticles(mc.x + 9, mc.y + 7, 16, player.hasForgedPick ? '#fde047' : '#38bdf8', 110, -30);
          spawnParticles(mc.x + 9, mc.y + 7, 10, '#e0f2fe', 80, -15);
          if (typeof spawnDroppedLilies === 'function') spawnDroppedLilies(mc.x + 9, mc.y + 4, 2);
          magmaCrawlers.splice(i, 1);
        }
      }
    }

    // 2. Comprobar colisión con enemigos voladores (Frost Fliers / Fire Bats)
    if (typeof fireBats !== 'undefined' && fireBats) {
      for (let i = fireBats.length - 1; i >= 0; i--) {
        const fb = fireBats[i];
        const ex = fb.x + 6;
        const ey = fb.y + 5;
        if (Math.abs(hitX - ex) < reach && Math.abs(hitY - ey) < 28) {
          score += 150;
          if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
          triggerShake(0.12, 2.0);
          spawnFloatingText(fb.x, fb.y - 10, player.hasForgedPick ? '¡CORTE FORJADO! +150' : '¡PICADO! +150', '#38bdf8');
          spawnParticles(fb.x + 6, fb.y + 5, 16, player.hasForgedPick ? '#fde047' : '#38bdf8', 110, -30);
          spawnParticles(fb.x + 6, fb.y + 5, 10, '#e0f2fe', 80, -15);
          if (typeof spawnDroppedLilies === 'function') spawnDroppedLilies(fb.x + 6, fb.y + 4, 2);
          fireBats.splice(i, 1);
        }
      }
    }

    // 3. Romper pilares de hielo milenario (ice_pillar o breakable)
    if (level && level.platforms) {
      for (const p of level.platforms) {
        if (p.broken) continue;
        if (p.subType === 'ice_pillar' || p.breakable) {
          const inReachX = hitX >= p.x - 18 && hitX <= p.x + p.w + 18;
          const inReachY = hitY >= p.y - 16 && hitY <= p.y + p.h + 16;
          if (inReachX && inReachY) {
            p.broken = true;
            score += 250;
            if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
            if (window.sfx && window.sfx.playHit) window.sfx.playHit();
            triggerShake(0.22, 3.2);
            if (typeof rumbleGamepad === 'function') rumbleGamepad(140, 0.5, 0.3);
            spawnFloatingText(p.x, p.y - 14, '¡HIELO QUEBRADO! +250', '#7dd3fc');
            const pCenterX = p.x + p.w / 2;
            const pCenterY = p.y + p.h / 2;
            spawnParticles(pCenterX, pCenterY, 30, '#38bdf8', 130, -50);
            spawnParticles(pCenterX, pCenterY, 20, '#e0f2fe', 100, -30);
            spawnParticles(pCenterX, pCenterY, 15, '#ffffff', 80, -20);
            if (typeof spawnStarSparkles === 'function') {
              spawnStarSparkles(pCenterX, pCenterY, 12, '#38bdf8');
            }
          }
        }
      }
    }

    // 4. Desviar y destruir proyectiles del Gran Yeti (Estalactitas y Bolas de Nieve)
    if (window.yetiBossState && window.yetiBossState.active) {
      const s = window.yetiBossState;
      // Estalactitas
      for (let i = s.icicles.length - 1; i >= 0; i--) {
        const ic = s.icicles[i];
        if (Math.abs(hitX - ic.x) < 28 && Math.abs(hitY - ic.y) < 28) {
          s.icicles.splice(i, 1);
          score += 50;
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          spawnParticles(ic.x, ic.y, 12, '#38bdf8', 90, -40);
          spawnFloatingText(ic.x - 8, ic.y - 10, '¡DESVIADO!', '#7dd3fc');
        }
      }
      // Bolas de nieve
      for (let i = s.snowballs.length - 1; i >= 0; i--) {
        const sb = s.snowballs[i];
        if (Math.abs(hitX - sb.x) < 30 && Math.abs(hitY - sb.y) < 30) {
          s.snowballs.splice(i, 1);
          score += 100;
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          spawnParticles(sb.x, sb.y, 16, '#ffffff', 110, -50);
          spawnFloatingText(sb.x - 10, sb.y - 10, '¡DESTRUIDA!', '#e0f2fe');
        }
      }
    }

    // 5. Destruir Seracs Glaciales que caen
    if (window.kangshungState && window.kangshungState.seracs) {
      const s = window.kangshungState;
      for (let i = s.seracs.length - 1; i >= 0; i--) {
        const sc = s.seracs[i];
        if (Math.abs(hitX - sc.x) < 30 && Math.abs(hitY - sc.y) < 30) {
          score += 100;
          if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
          spawnFloatingText(sc.x - 10, sc.y - 10, '¡SERAC DESTRUIDO! +100', '#38bdf8');
          spawnParticles(sc.x, sc.y, 16, '#38bdf8', 110, -40);
          spawnParticles(sc.x, sc.y, 10, '#ffffff', 80, -20);
          s.seracs.splice(i, 1);
        }
      }
    }

    // Comprobar colisión con monolitos y pilares de cristal quebrables
    if (typeof level !== 'undefined' && level && level.platforms) {
      for (let pIdx = level.platforms.length - 1; pIdx >= 0; pIdx--) {
        const p = level.platforms[pIdx];
        if (p.breakable && rectOverlap(hitX - 16, hitY - 16, 32, 32, p.x, p.y, p.w, p.h)) {
          level.platforms.splice(pIdx, 1);
          score += 200;
          triggerShake(0.18, 2.5);
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 22, '#38bdf8', 110, -45);
          spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 16, '#c084fc', 90, -35);
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 10, '#ffffff');
          spawnFloatingText(p.x + p.w / 2 - 20, p.y - 12, '¡PILAR QUEBRADO! +200', '#38bdf8');
          spawnDroppedLilies(p.x + p.w / 2, p.y + p.h / 2, 3);
        }
      }
    }
  }
}

function drawIcePickWorld(ctx) {
  if (!player || player.ability !== 'ice_pick' || !player.isSwingingPick) return;

  const swingProgress = 1 - (icePickState.swingTimer / icePickState.swingDuration);
  const dir = player.facingRight ? 1 : -1;
  const hx = player.x + (player.facingRight ? 18 : 4);
  const hy = player.y + 12;

  // Arco glacial del golpe
  ctx.save();
  ctx.translate(hx, hy);
  ctx.scale(dir, 1);
  ctx.rotate((swingProgress - 0.5) * Math.PI * 0.8);

  // Mango
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-2, -14, 4, 18);
  // Empuñadura azul
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(-2, 0, 4, 5);
  // Cabeza del pico de hielo
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(-10, -14);
  ctx.lineTo(12, -14);
  ctx.lineTo(8, -10);
  ctx.lineTo(-8, -10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(8, -14, 4, 2);

  ctx.restore();

  // Estela de hielo cortante
  ctx.strokeStyle = 'rgba(56, 189, 248, ' + (1 - swingProgress) + ')';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(hx, hy, 16, (player.facingRight ? -Math.PI * 0.4 : Math.PI * 0.6), (player.facingRight ? Math.PI * 0.4 : Math.PI * 1.4));
  ctx.stroke();
}

function drawIcePickHUD(ctx, x, y) {
  if (!player || player.ability !== 'ice_pick') return;

  const isForged = player.hasForgedPick;
  // Icono del Pico de Hielo en el HUD
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(x - 3, y, isForged ? 64 : 54, 16);
  ctx.strokeStyle = isForged ? '#facc15' : '#38bdf8';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 3, y, isForged ? 64 : 54, 16);

  // Mini pico
  ctx.fillStyle = isForged ? '#facc15' : '#38bdf8';
  ctx.fillRect(x + 2, y + 2, 7, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x + 7, y + 2, 2, 2);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x + 4, y + 4, 2, 8);

  // Etiqueta
  ctx.fillStyle = isForged ? '#fef08a' : '#e0f2fe';
  ctx.font = 'bold 5.5px sans-serif';
  ctx.fillText(isForged ? 'PICO FORJADO' : 'PICO DE HIELO', x + 12, y + 10);
}

if (typeof module !== 'undefined') {
  module.exports = {
    initIcePickAbility,
    updateIcePickAbility,
    drawIcePickWorld,
    drawIcePickHUD
  };
}


// --- MODULO: src/mechanics/arcade_minigame.js ---
// ============================================================================
// MINIJUEGO ARCADE: YETI-99 ICE BREAKER (CASA 4 • PUEBLO NEVADO)
// ============================================================================
// Minijuego interactivo estilo retro Arkanoid / Pong en la consola del Arcade Polar.

let arcadeMinigame = {
  active: false,
  score: 0,
  lives: 3,
  won: false,
  gameOver: false,
  paddle: { x: 75, w: 32, h: 5, speed: 180 },
  ball: { x: 90, y: 70, vx: 90, vy: -90, r: 3 },
  blocks: [],
  winTimer: 0
};

let activeArcadePrompt = false;

function initArcadeBlocks() {
  arcadeMinigame.blocks = [];
  const colors = ['#06b6d4', '#ec4899', '#facc15', '#10b981', '#f43f5e'];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      arcadeMinigame.blocks.push({
        x: 18 + c * 29,
        y: 22 + r * 10,
        w: 25,
        h: 7,
        color: colors[(r * 5 + c) % colors.length],
        alive: true
      });
    }
  }
}

function startArcadeMinigame() {
  arcadeMinigame.active = true;
  arcadeMinigame.score = 0;
  arcadeMinigame.lives = 3;
  arcadeMinigame.won = false;
  arcadeMinigame.gameOver = false;
  arcadeMinigame.winTimer = 0;
  arcadeMinigame.paddle.x = 75;
  arcadeMinigame.ball.x = 90;
  arcadeMinigame.ball.y = 80;
  arcadeMinigame.ball.vx = (Math.random() > 0.5 ? 95 : -95);
  arcadeMinigame.ball.vy = -105;
  initArcadeBlocks();

  gameState = 'ARCADE_MINIGAME';
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
}

function exitArcadeMinigame() {
  arcadeMinigame.active = false;
  gameState = 'PLAYING';
  keys.jumpJustPressed = false;
  keys.upJustPressed = false;
  if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
}

function updateArcadeCabinetInteraction() {
  if (gameState !== 'PLAYING' || !player) {
    activeArcadePrompt = false;
    return;
  }

  // Zona de interacción frente al gabinete maestro en el interior del arcade (X: 51350 -> 51420)
  const px = player.x + player.w / 2;
  const py = player.y + player.h;
  if (px >= 51330 && px <= 51430 && py >= 160 && py <= 230) {
    activeArcadePrompt = true;
    if (keys.upJustPressed || keys.jumpJustPressed || keyboardState.ArrowUp || keyboardState.KeyW) {
      keys.upJustPressed = false;
      keys.jumpJustPressed = false;
      keyboardState.ArrowUp = false;
      keyboardState.KeyW = false;
      startArcadeMinigame();
    }
  } else {
    activeArcadePrompt = false;
  }
}

function updateArcadeMinigame(dt) {
  // Salir con tecla de salto o Escape
  if (keys.jumpJustPressed || keyboardState.Escape || keyboardState.KeyX) {
    exitArcadeMinigame();
    return;
  }

  if (arcadeMinigame.won || arcadeMinigame.gameOver) {
    if (keys.dashJustPressed || keys.upJustPressed) {
      startArcadeMinigame();
    }
    return;
  }

  const p = arcadeMinigame.paddle;
  const b = arcadeMinigame.ball;
  const boxW = 180;
  const boxH = 120;

  // Movimiento de la paleta
  if (keys.left || keyboardState.ArrowLeft || keyboardState.KeyA) {
    p.x -= p.speed * dt;
  }
  if (keys.right || keyboardState.ArrowRight || keyboardState.KeyD) {
    p.x += p.speed * dt;
  }
  p.x = Math.max(4, Math.min(boxW - p.w - 4, p.x));

  // Movimiento de la bola
  b.x += b.vx * dt;
  b.y += b.vy * dt;

  // Rebote en paredes laterales y techo
  if (b.x - b.r <= 4) {
    b.x = 4 + b.r;
    b.vx = Math.abs(b.vx);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  } else if (b.x + b.r >= boxW - 4) {
    b.x = boxW - 4 - b.r;
    b.vx = -Math.abs(b.vx);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }
  if (b.y - b.r <= 16) {
    b.y = 16 + b.r;
    b.vy = Math.abs(b.vy);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }

  // Rebote en la paleta
  const padY = boxH - 14;
  if (b.y + b.r >= padY && b.y - b.r <= padY + p.h && b.x >= p.x - 2 && b.x <= p.x + p.w + 2) {
    b.y = padY - b.r;
    const hitOffset = (b.x - (p.x + p.w / 2)) / (p.w / 2);
    b.vx = hitOffset * 130;
    b.vy = -Math.abs(b.vy);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(true);
  }

  // Caída de la bola
  if (b.y > boxH + 6) {
    arcadeMinigame.lives--;
    if (arcadeMinigame.lives <= 0) {
      arcadeMinigame.gameOver = true;
    } else {
      b.x = p.x + p.w / 2;
      b.y = padY - 10;
      b.vx = (Math.random() > 0.5 ? 90 : -90);
      b.vy = -105;
    }
  }

  // Colisión con bloques
  let remaining = 0;
  for (const block of arcadeMinigame.blocks) {
    if (block.alive) {
      remaining++;
      if (b.x + b.r >= block.x && b.x - b.r <= block.x + block.w &&
          b.y + b.r >= block.y && b.y - b.r <= block.y + block.h) {
        block.alive = false;
        b.vy = -b.vy;
        arcadeMinigame.score += 50;
        if (window.sfx && window.sfx.playHit) window.sfx.playHit();
        break;
      }
    }
  }

  if (remaining === 0 && !arcadeMinigame.won) {
    arcadeMinigame.won = true;
    score += 500;
    saveState.dexterLilies = (saveState.dexterLilies || 0) + 25;
    if (typeof spawnStarSparkles === 'function') {
      spawnStarSparkles(W / 2, H / 2, 28, '#ec4899');
      spawnStarSparkles(W / 2, H / 2, 28, '#06b6d4');
      spawnStarSparkles(W / 2, H / 2, 28, '#ffd166');
    }
    if (typeof spawnFloatingText === 'function') {
      spawnFloatingText(player.x, player.y - 24, '¡CAMPEÓN DE YETI-99! +25 LIRIOS', '#ffd166');
    }
    if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
  }
}

function drawArcadeCabinetPrompt(ctx) {
  if (!activeArcadePrompt || gameState !== 'PLAYING') return;
  const bob = Math.sin(globalFrame * 0.16) * 2;
  const bx = Math.round(player.x + 11);
  const by = Math.round(player.y - 22 + bob);

  const text = '[ARRIBA: JUGAR ARCADE YETI-99]';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  const tw = ctx.measureText(text).width;
  drawRoundedPanel(bx - tw / 2 - 6, by - 8, tw + 12, 14, 4, 'rgba(15, 5, 29, 0.95)', '#06b6d4', 1.2);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#facc15';
  ctx.fillText(text, bx, by + 1);
}

function drawArcadeMinigame(ctx) {
  // Oscurecer fondo del juego
  ctx.fillStyle = 'rgba(10, 4, 20, 0.88)';
  ctx.fillRect(0, 0, W, H);

  const boxW = 180, boxH = 120;
  const bx = Math.round((W - boxW) / 2);
  const by = Math.round((H - boxH) / 2);

  // Chasis exterior del gabinete CRT
  drawRoundedPanel(bx - 6, by - 6, boxW + 12, boxH + 12, 8, '#0f051d', '#ec4899', 2);
  ctx.fillStyle = '#022c22';
  ctx.fillRect(bx, by, boxW, boxH);

  // Barra de cabecera retro
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(bx, by, boxW, 14);
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 6px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('YETI-99 • ICE BREAKER', bx + 6, by + 10);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#facc15';
  ctx.fillText(`SCORE: ${arcadeMinigame.score}`, bx + boxW - 6, by + 10);

  // Bloques de hielo
  for (const blk of arcadeMinigame.blocks) {
    if (blk.alive) {
      ctx.fillStyle = blk.color;
      ctx.fillRect(bx + blk.x, by + blk.y, blk.w, blk.h);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillRect(bx + blk.x, by + blk.y, blk.w, 1.5);
    }
  }

  // Paleta del jugador
  const p = arcadeMinigame.paddle;
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(bx + p.x, by + boxH - 14, p.w, p.h);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(bx + p.x + 2, by + boxH - 14, p.w - 4, 1.5);

  // Bola
  const b = arcadeMinigame.ball;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(bx + b.x, by + b.y, b.r, 0, Math.PI * 2);
  ctx.fill();

  // Vidas (mini corazones)
  for (let l = 0; l < arcadeMinigame.lives; l++) {
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(bx + 6 + l * 8, by + boxH - 6, 5, 4);
  }

  // Rótulos de Victoria o Game Over
  if (arcadeMinigame.won) {
    drawRoundedPanel(bx + 20, by + 40, boxW - 40, 40, 6, 'rgba(15, 23, 42, 0.95)', '#22c55e', 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 8px monospace';
    ctx.fillText('¡VICTORIA RETRO!', bx + boxW / 2, by + 56);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 5.5px monospace';
    ctx.fillText('+500 PUNTOS • [SALTAR: SALIR]', bx + boxW / 2, by + 70);
  } else if (arcadeMinigame.gameOver) {
    drawRoundedPanel(bx + 20, by + 40, boxW - 40, 40, 6, 'rgba(15, 23, 42, 0.95)', '#ef4444', 2);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 8px monospace';
    ctx.fillText('GAME OVER', bx + boxW / 2, by + 56);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 5.5px monospace';
    ctx.fillText('[DASH: REINTENTAR • SALTAR: SALIR]', bx + boxW / 2, by + 70);
  }

  // Botón de salir en la esquina inferior
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '5px monospace';
  ctx.fillText('[SALTAR: SALIR]', bx + boxW - 6, by + boxH - 2);
}

if (typeof module !== 'undefined') {
  module.exports = {
    startArcadeMinigame,
    exitArcadeMinigame,
    updateArcadeCabinetInteraction,
    updateArcadeMinigame,
    drawArcadeCabinetPrompt,
    drawArcadeMinigame
  };
}


// --- MODULO: src/entities/player/doors.js ---
// ============================================================================
// SISTEMA DE PUERTAS, ASCENSORES Y TRANSICIONES INTERIORES (FASE 4)
// ============================================================================
let activeDoorPrompt = null;

const SKYSCRAPER_DOORS = [
  {
    id: 'plaza_to_lobby',
    x1: 12620, x2: 12680, y1: 150, y2: 198,
    label: 'ENTRAR AL EDIFICIO',
    action: function() {
      if ((saveState.keysPhase3 || 0) < 4) {
        spawnFloatingText(player.x - 24, player.y - 18, '¡SE REQUIEREN 4 LLAVES!', '#ff75a0');
        if (window.sfx && window.sfx.playHit) window.sfx.playHit();
        return;
      }
      player.x = 13500; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = player.y - H / 2;
      triggerShake(0.1, 1.5);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#ffffff');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'lobby_to_plaza',
    x1: 13460, x2: 13520, y1: 180, y2: 220,
    label: 'SALIR A LA PLAZA',
    action: function() {
      player.x = 12630; player.y = 172; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = player.y - H / 2;
      triggerShake(0.1, 1.5);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'lobby_to_rooftop_elevator',
    x1: 13970, x2: 14030, y1: 180, y2: 220,
    label: 'ASCENSOR AL PISO 100',
    action: function() {
      if (typeof startElevatorAscentAnimation === 'function') {
        startElevatorAscentAnimation(14520, 46);
      } else {
        player.x = 14520; player.y = 46;
      }
    }
  },
  {
    id: 'rooftop_to_lobby_elevator',
    x1: 14460, x2: 14510, y1: 30, y2: 70,
    label: 'BAJAR AL LOBBY',
    action: function() {
      player.x = 13990; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = player.y - H / 2;
      triggerShake(0.1, 1.5);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  }
];

const SNOW_VILLAGE_DOORS = [
  // Casa 1: Taberna Alpina "El Refugio Cálido"
  {
    id: 'village_to_tavern',
    x1: 8430, x2: 8490, y1: 170, y2: 210,
    label: 'ENTRAR A LA TABERNA',
    action: function() {
      player.x = 50050; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 12, '#ffd166');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'tavern_to_village',
    x1: 50020, x2: 50080, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 8460; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 2: Tienda de Ropa y Gorros de Invierno "El Gorro Nevado"
  {
    id: 'village_to_hat_shop',
    x1: 9160, x2: 9220, y1: 170, y2: 210,
    label: 'ENTRAR A LA TIENDA',
    action: function() {
      player.x = 50450; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 12, '#38bdf8');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'hat_shop_to_village',
    x1: 50420, x2: 50480, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 9190; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 3: Cabaña de Gaston el Melancólico (El Tipo Súper Depre)
  {
    id: 'village_to_depre_cabin',
    x1: 9880, x2: 9940, y1: 170, y2: 210,
    label: 'ENTRAR A LA CABAÑA',
    action: function() {
      player.x = 50850; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 12, '#94a3b8');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'depre_cabin_to_village',
    x1: 50820, x2: 50880, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 9910; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 4: Sala Arcade Retro "Arcade Polar"
  {
    id: 'village_to_arcade',
    x1: 10660, x2: 10720, y1: 170, y2: 210,
    label: 'ENTRAR AL ARCADE',
    action: function() {
      player.x = 51250; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#ec4899');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'arcade_to_village',
    x1: 51220, x2: 51280, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 10690; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 5: Panadería y Casa de Té "El Horno del Yeti"
  {
    id: 'village_to_bakery',
    x1: 11410, x2: 11470, y1: 170, y2: 210,
    label: 'ENTRAR A LA PANADERIA',
    action: function() {
      player.x = 51650; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#f59e0b');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'bakery_to_village',
    x1: 51620, x2: 51680, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 11440; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 6: Taller de Herramientas y Forja de Hielo "La Forja del Glaciar"
  {
    id: 'village_to_forge',
    x1: 12160, x2: 12220, y1: 170, y2: 210,
    label: 'ENTRAR AL TALLER DE FORJA',
    action: function() {
      player.x = 52050; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#38bdf8');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'forge_to_village',
    x1: 52020, x2: 52080, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 12190; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 7: La Gran Alcaldía del Pueblo Nevado
  {
    id: 'village_to_townhall',
    x1: 12860, x2: 12920, y1: 170, y2: 210,
    label: 'ENTRAR A LA ALCALDIA',
    action: function() {
      player.x = 52450; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#ffd166');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'townhall_to_village',
    x1: 52420, x2: 52480, y1: 170, y2: 210,
    label: 'SALIR A LA PLAZA',
    action: function() {
      player.x = 12890; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  }
];

function updateSkyscraperDoors() {
  if (gameState !== 'PLAYING') {
    activeDoorPrompt = null;
    return;
  }

  const px = player.x + player.w / 2;
  const py = player.y + player.h;
  activeDoorPrompt = null;

  const allDoors = (level && Array.isArray(level.doors)) ? SKYSCRAPER_DOORS.concat(SNOW_VILLAGE_DOORS).concat(level.doors) : SKYSCRAPER_DOORS.concat(SNOW_VILLAGE_DOORS);
  for (const d of allDoors) {
    if (px >= d.x1 && px <= d.x2 && py >= d.y1 && py <= d.y2 + 8) {
      activeDoorPrompt = d;
      break;
    }
  }

  // Interacción al pulsar ARRIBA o SALTAR en la puerta
  if (activeDoorPrompt && (keys.jumpJustPressed || keys.upJustPressed || keyboardState.ArrowUp || keyboardState.KeyW)) {
    keys.jumpJustPressed = false;
    keys.upJustPressed = false;
    keyboardState.ArrowUp = false;
    keyboardState.KeyW = false;
    activeDoorPrompt.action();
  }
}

function drawSkyscraperDoorPrompt(ctx) {
  if (!activeDoorPrompt || gameState !== 'PLAYING') return;
  const d = activeDoorPrompt;
  const bob = Math.sin(globalFrame * 0.14) * 2;
  const bx = Math.round(player.x + 11);
  const by = Math.round(player.y - 20 + bob);

  const text = `[ARRIBA: ${d.label}]`;
  ctx.font = `bold 6.5px ${UI_FONT}`;
  const tw = ctx.measureText(text).width;
  drawRoundedPanel(bx - tw / 2 - 6, by - 8, tw + 12, 14, 4, 'rgba(18, 5, 24, 0.95)', '#ffd166', 1.2);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, bx, by + 1);
}

if (typeof module !== 'undefined') {
  module.exports = { updateSkyscraperDoors, drawSkyscraperDoorPrompt, SKYSCRAPER_DOORS };
}


// --- MODULO: src/entities/player/actions.js ---
// ============================================================================
// MAMÁ RATÓN: ENTRADA, SALTO, DASH Y PARTÍCULAS DE SKINS
// ============================================================================
function updatePlayerMovement(dt) {
  player.squashX += (1 - player.squashX) * Math.min(1, dt * 14);
  player.squashY += (1 - player.squashY) * Math.min(1, dt * 14);

  if (player.invulnTimer > 0) player.invulnTimer -= dt;
  if (player.dashCooldown > 0) player.dashCooldown -= dt;

  // Bloqueo dramático de controles durante la sorpresa sísmica en la azotea (signo !!! y mirada a los lados)
  if (typeof isRooftopTremorLocked === 'function' && isRooftopTremorLocked()) {
    player.vx = 0;
    keys.left = false;
    keys.right = false;
    keys.jump = false;
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    keys.downJustPressed = false;
    player.state = 'idle';
    return;
  }

let cachedDashBtn = null;
function getDashBtn() {
  if (!cachedDashBtn) cachedDashBtn = document.getElementById('btn-dash');
  return cachedDashBtn;
}

  // Detección de contacto con agua (Charcos de Marea, Olas y Tubos de Surf)
  let inWater = false;
  let activeWaterPlat = null;
  if (level && level.platforms) {
    const feetX = player.x + player.w / 2;
    const feetY = player.y + player.h;
    for (let i = 0; i < level.platforms.length; i++) {
      const p = level.platforms[i];
      if ((p.subType === 'water_puddle' || p.isWater || p.subType === 'ocean_water' || p.subType === 'tsunami_barrel_wave') &&
          feetX >= p.x && feetX <= p.x + p.w &&
          feetY >= p.y - 4 && feetY <= p.y + p.h + 8) {
        inWater = true;
        activeWaterPlat = p;
        break;
      }
    }
  }
  // El oleaje del remolino inunda la arena de combate contra el Kraken
  const kBoss = window.krakenBossState || (typeof krakenBossState !== 'undefined' ? krakenBossState : null);
  if (kBoss && kBoss.active) {
    inWater = true;
  }

  player.inWater = inWater;
  player.isSurfing = inWater && player.ability === 'surf';

  // Impulso y aceleración por corrientes hidrodinámicas de gran velocidad
  if (player.isSurfing && activeWaterPlat && activeWaterPlat.boostCurrent) {
    if (player.facingRight && player.vx < 280) {
      player.vx = Math.min(310, player.vx + dt * 550);
    }
    if (globalFrame % 2 === 0) {
      const trailX = player.x + (player.facingRight ? -4 : 26);
      spawnParticles(trailX, player.y + 21, 2, '#00f5d4', 60, -18);
    }
  }

  // Salpicaduras y spray continuo mientras se surfea en el agua
  if (player.isSurfing && Math.abs(player.vx) > 20 && globalFrame % 3 === 0) {
    const sprayX = player.x + (player.facingRight ? -2 : 24);
    spawnParticles(sprayX, player.y + 21, 2, '#ffffff', 45, -20);
    spawnParticles(sprayX, player.y + 22, 2, '#caf0f8', 35, -12);
    if (Math.abs(player.vx) > 120 && Math.random() > 0.4) {
      spawnParticles(sprayX, player.y + 19, 1, '#90e0ef', 50, -26);
    }
  }

  // Actualizar estado visual del botón táctil de Dash
  const dashBtn = getDashBtn();
  if (dashBtn) {
    if (player.ability === 'lava_run') {
      if (player.dashCooldown > 0) dashBtn.classList.add('cooldown');
      else dashBtn.classList.remove('cooldown');
    } else if (player.ability === 'surf') {
      if (player.inWater && player.dashCooldown <= 0) dashBtn.classList.remove('cooldown');
      else dashBtn.classList.add('cooldown');
    } else if (player.ability === 'shovel' || player.ability === 'ice_pick') {
      dashBtn.classList.remove('cooldown');
    }
  }

  // Ejecución de Habilidad Especial: LAVA RUN (Dash Oscuro de Magma)
  if (keys.dashJustPressed && player.ability === 'lava_run' && player.dashCooldown <= 0 && player.dashTimer <= 0) {
    player.dashTimer = 0.22;
    player.dashCooldown = saveState.upgrades.fastDash ? 0.55 : 0.82;
    player.vy = 0;
    player.vx = (player.facingRight ? 1 : -1) * 340;
    window.sfx.playLavaDash();
    triggerShake(0.12, 2);
    rumbleGamepad(110, 0.4, 0.2);
    spawnParticles(player.x + 11, player.y + 12, 10, '#b31b52', 110, 10);
    spawnParticles(player.x + 11, player.y + 12, 6, '#ff2a70', 130, 15);
    spawnParticles(player.x + 11, player.y + 12, 4, '#ffcad4', 140, 20);
    spawnParticles(player.x + 11, player.y + 12, 8, '#07020a', 90, 0);
  }

  // Ejecución de Habilidad Especial: TABLA DE SURF (Water Dash en Charcos/Agua)
  if (keys.dashJustPressed && player.ability === 'surf' && player.dashCooldown <= 0 && player.dashTimer <= 0) {
    if (player.inWater) {
      player.dashTimer = 0.28;
      player.dashCooldown = saveState.upgrades.fastDash ? 0.45 : 0.68;
      player.vy = 0;
      player.vx = (player.facingRight ? 1 : -1) * 390;
      if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();
      triggerShake(0.1, 2.0);
      rumbleGamepad(90, 0.35, 0.4);
      spawnParticles(player.x + 11, player.y + 21, 14, '#ffffff', 150, -45);
      spawnParticles(player.x + 11, player.y + 22, 10, '#caf0f8', 130, -30);
      spawnParticles(player.x + 11, player.y + 22, 8, '#48cae4', 110, -20);
      spawnParticles(player.x + 11, player.y + 23, 6, '#0077b6', 90, -15);
      spawnFloatingText(player.x - 4, player.y - 10, '¡WATER DASH!', '#caf0f8');
    } else {
      spawnFloatingText(player.x - 6, player.y - 10, '¡SOLO EN AGUA!', '#ff75a0');
    }
  }

  const isDashing = player.dashTimer > 0;

  if (isDashing) {
    player.dashTimer -= dt;
    player.vy = 0;
    const dashSpeed = player.ability === 'surf' ? 390 : 340;
    player.vx = (player.facingRight ? 1 : -1) * dashSpeed;

    if (player.ability === 'surf') {
      // Estela marina violenta de espuma blanca, spray y turquesa
      if (globalFrame % 2 === 0) {
        const trailX = player.x + (player.facingRight ? -6 : 28);
        spawnParticles(trailX, player.y + 21, 4, '#ffffff', 80, -35);
        spawnParticles(trailX, player.y + 22, 3, '#caf0f8', 65, -25);
        spawnParticles(trailX, player.y + 23, 2, '#00b4d8', 50, -15);
      }
    } else {
      // Rastro de sombra y llamas rosas (Lava Run)
      if (globalFrame % 2 === 0) {
        afterimages.push({
          x: player.x,
          y: player.y,
          facingRight: player.facingRight,
          alpha: 0.75,
          isLavaDash: true
        });
        spawnParticles(player.x + 11, player.y + 14, 2, '#ff2a70', 40, -20);
        spawnParticles(player.x + 11, player.y + 14, 1, '#b31b52', 30, -10);
      }
    }
  } else {
    // Movimiento horizontal con física de hielo resbaladizo o suelo normal
    const targetDir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    const onIce = player.onGround && player.currentPlatform && (
      player.currentPlatform.subType === 'slippery_ice' ||
      player.currentPlatform.subType === 'frozen_lake_ice' ||
      player.currentPlatform.subType === 'cracking_ice' ||
      player.currentPlatform.isIce
    );

    if (onIce) {
      if (targetDir !== 0) {
        player.facingRight = targetDir > 0;
        // Mayor velocidad punta en patinaje sobre hielo (1.15x), aceleración más fluida
        const maxIceSpeed = player.speed * 1.15;
        const accelRate = (player.vx * targetDir < 0) ? 6.5 : 4.8;
        player.vx += (targetDir * maxIceSpeed - player.vx) * Math.min(1, dt * accelRate);

        // Derrape con escarcha al cambiar de dirección bruscamente sobre hielo
        if (player.vx * targetDir < -25 && globalFrame % 4 === 0) {
          spawnParticles(player.x + 11, player.y + 22, 2, '#bae6fd', 45, -15);
          spawnParticles(player.x + 11, player.y + 22, 1, '#ffffff', 30, -10);
        }
        player.animFrame += dt * 12;
      } else {
        // Deslizamiento con baja fricción (inercia real en hielo congelado)
        player.vx *= Math.pow(0.55, dt);
        if (Math.abs(player.vx) < 4) player.vx = 0;
        player.animFrame += dt * (Math.abs(player.vx) > 20 ? 8 : 2);
      }

      // Estela brillante de patinaje ártico
      if (Math.abs(player.vx) > 40 && globalFrame % 3 === 0) {
        const skateX = player.facingRight ? player.x + 2 : player.x + player.w - 2;
        spawnParticles(skateX, player.y + 23, 1, '#e0f2fe', 25, -8);
      }
    } else {
      // Movimiento estándar sobre tierra o nieve
      if (targetDir !== 0) {
        if (Math.abs(player.vx) < 25 || (targetDir > 0 !== player.facingRight)) {
          player.transitionTimer = 0.085;
        }
        player.facingRight = targetDir > 0;
        player.vx += (targetDir * player.speed - player.vx) * Math.min(1, dt * 13);
        if (Math.abs(player.vx - targetDir * player.speed) < 6) {
          player.vx = targetDir * player.speed;
        }
        player.animFrame += dt * 11;
      } else {
        if (Math.abs(player.vx) > 65) {
          player.transitionTimer = 0.075;
        }
        player.vx *= Math.pow(0.0005, dt);
        if (Math.abs(player.vx) < 5) player.vx = 0;
        player.animFrame += dt * 4;
      }
    }

    if (player.transitionTimer > 0) player.transitionTimer -= dt;

    // Coyote Time y Jump Buffer
    if (player.onGround) player.coyoteTimer = 0.11;
    else player.coyoteTimer -= dt;

    if (keys.jumpJustPressed) player.jumpBufferTimer = 0.12;
    else player.jumpBufferTimer -= dt;

    // Verificar si el jugador presiona FLECHA ABAJO junto a un NPC para hablar
    if (keys.downJustPressed && nearbyNpc && player.onGround) {
      keys.downJustPressed = false;
      keys.down = false;
      player.vx = 0;
      player.state = 'idle';
      let lines = null;
      if (typeof nearbyNpc.getLines === 'function') {
        lines = nearbyNpc.getLines();
      } else if (typeof getNpcDynamicLines === 'function') {
        lines = getNpcDynamicLines(nearbyNpc);
      }
      if (!lines || lines.length === 0) {
        lines = nearbyNpc.lines || nearbyNpc.dialogue || [];
      }
      activeDialogueList = lines.map(t => (typeof t === 'string' ? { speaker: nearbyNpc.name, text: t } : Object.assign({ speaker: nearbyNpc.name }, t)));
      activeNpc = nearbyNpc;
      dialogueIndex = 0;
      dialogueCharIndex = 0;
      dialogueMode = 'NPC';
      gameState = 'DIALOGUE';
      window.sfx.playCheese();
      keys.jumpJustPressed = false;
      keys.dashJustPressed = false;
      keys.downJustPressed = false;
      return;
    }

    // Salto y Doble Salto
    if (player.jumpBufferTimer > 0) {
      if (player.coyoteTimer > 0) {
        const isLaunchRamp = (player.currentPlatform && player.currentPlatform.launchRamp);
        player.vy = isLaunchRamp ? (player.jumpForce * 1.34) : player.jumpForce;
        if (isLaunchRamp) {
          player.vx = Math.max(player.vx, 290);
          player.trailTimer = 0.35;
          spawnStarSparkles(player.x + 11, player.y + 20, 8, '#00f5d4');
        }
        player.onGround = false;
        player.coyoteTimer = 0;
        player.jumpBufferTimer = 0;
        player.jumpsLeft = 1;
        player.squashX = 0.78;
        player.squashY = 1.24;
        window.sfx.playJump(isLaunchRamp);
        spawnDustPuff(player.x + 11, player.y + 24, 4, getBiomeDustColor(player.x));
      } else if (player.jumpsLeft > 0) {
        player.vy = player.jumpForce * 0.92;
        player.jumpsLeft--;
        player.jumpBufferTimer = 0;
        player.squashX = 1.28;
        player.squashY = 0.76;
        player.trailTimer = 0.24;
        window.sfx.playJump(true);
        spawnStarSparkles(player.x + 11, player.y + 20, 6, '#ffffff');
        spawnDustPuff(player.x + 11, player.y + 20, 3, '#ff8fab');
      }
    }

    // Gravedad con soporte de Baja Gravedad Cósmica (Mundo 4 • Fases 8 y 9) y Pluma de Dexter
    const isCosmicSpace = (level.id === 4 && player.x >= 33000);
    const baseGravity = isCosmicSpace ? player.gravity * 0.54 : player.gravity;
    const isGliding = !player.onGround && player.vy > 10 && keys.jumpPressed && saveState.upgrades.featherFall;
    const effectiveGravity = isGliding ? baseGravity * 0.42 : baseGravity;
    player.vy += effectiveGravity * dt;
    const maxFall = isGliding ? 140 : (isCosmicSpace ? 280 : 420);
    if (player.vy > maxFall) player.vy = maxFall;
    if (isGliding && globalFrame % 6 === 0) {
      spawnStarSparkles(player.x + 11, player.y + 22, 1, '#ffccd5');
    } else if (isCosmicSpace && !player.onGround && globalFrame % 5 === 0) {
      spawnStarSparkles(player.x + 11, player.y + 22, 1, '#00ffff');
    }
  }

  // Estela de doble salto
  if (player.trailTimer > 0) {
    player.trailTimer -= dt;
    if (globalFrame % 2 === 0) {
      afterimages.push({
        x: player.x,
        y: player.y,
        facingRight: player.facingRight,
        alpha: 0.45,
        isLavaDash: false
      });
    }
  }

  // Estelas y efectos cosméticos pasivos según la Skin equipada
  if ((Math.abs(player.vx) > 30 || !player.onGround) && globalFrame % 6 === 0) {
    const sk = saveState.equippedSkin;
    const px = player.x + (player.facingRight ? 4 : 18);
    const py = player.y + 16;
    if (sk === 'rick_prime') {
      spawnParticles(px, py - 2, 2, Math.random() > 0.5 ? '#00f5d4' : '#55ff99', 32, -18);
      if (Math.random() > 0.5) spawnParticles(px, py - 6, 1, '#22c55e', 22, -10);
    } else if (sk === 'homelander') {
      spawnParticles(px, py - 4, 1, Math.random() > 0.4 ? '#ff0033' : '#ffd700', 30, -18);
      if (Math.random() > 0.6) spawnParticles(px, py - 8, 1, '#ff4d4d', 22, -12);
      if (Math.random() > 0.7) spawnParticles(px + 4, py - 2, 1, '#ffffff', 18, -8);
    } else if (sk === 'peacemaker') {
      spawnParticles(px, py - 3, 1, Math.random() > 0.4 ? '#ffffff' : '#e2e8f0', 25, -14);
      if (Math.random() > 0.5) spawnParticles(px, py - 6, 1, '#facc15', 20, -10);
      if (Math.random() > 0.7) spawnParticles(px - 4, py - 2, 1, '#94a3b8', 18, -8);
    } else if (sk === 'ivan_alien_stage') {
      spawnParticles(px, py - 4, 1, Math.random() > 0.4 ? '#ef4444' : '#18181b', 26, -16);
      if (Math.random() > 0.6) spawnParticles(px, py - 8, 1, '#27272a', 18, -10);
      if (Math.random() > 0.7) spawnParticles(px + 4, py - 2, 1, '#ffffff', 20, -12);
    } else if (sk === 'abaddon_hotel') {
      spawnParticles(px, py - 4, 1, Math.random() > 0.4 ? '#ff0055' : '#7c3aed', 28, -20);
      if (Math.random() > 0.5) spawnParticles(px, py - 8, 1, '#11071f', 20, -12);
      if (Math.random() > 0.6) spawnParticles(px + 4, py - 2, 1, '#c084fc', 22, -14);
      if (Math.random() > 0.75) spawnParticles(px - 3, py - 6, 1, '#ff1744', 18, -10);
    } else if (sk === 'sakura') {
      spawnParticles(px, py, 1, Math.random() > 0.4 ? '#ff8fab' : '#ffffff', 22, -15);
    } else if (sk === 'noir') {
      spawnParticles(px, py, 1, Math.random() > 0.4 ? '#1a1420' : '#ff2a75', 18, -10);
    } else if (sk === 'mage') {
      spawnParticles(px, py - 4, 1, Math.random() > 0.4 ? '#c77dff' : '#ffe066', 26, -20);
    } else if (sk === 'steampunk') {
      spawnParticles(px, py, 1, Math.random() > 0.4 ? '#e09f3e' : '#fefae0', 20, 20);
    } else if (sk === 'empress') {
      spawnParticles(px, py - 2, 1, Math.random() > 0.4 ? '#ffd700' : '#ffffff', 24, -18);
    }
  }
}


// --- MODULO: src/entities/player/physics.js ---
// ============================================================================
// MAMÁ RATÓN: COLISIONES, GÉISERES, CHECKPOINTS Y COLECCIONABLES
// ============================================================================
function updatePlayerCollisions(dt) {
  const isLavaDashing = player.dashTimer > 0;

  // Colisión Horizontal con Plataformas
  player.x += player.vx * dt;
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > level.worldWidth) player.x = level.worldWidth - player.w;

  for (const p of level.platforms) {
    if (p.broken) continue;
    if (p.oneWay || p.isWater || p.subType === 'water_puddle' || p.subType === 'ocean_water' || p.subType === 'snow_bank' || p.subType === 'bounce_crystal' || p.subType === 'ice_crystal_spring' || p.subType === 'crystal_lotus_pad' || p.subType === 'lotus_pad_shambhala') continue;
    if (rectOverlap(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
      if (player.vx > 0) player.x = p.x - player.w;
      else if (player.vx < 0) player.x = p.x + p.w;
    }
  }

  // Colisión con Paredes / Cascadas de Lava
  for (const lw of lavaWalls) {
    if (rectOverlap(player.x + 2, player.y + 2, player.w - 4, player.h - 4, lw.x, lw.y, lw.w, lw.h)) {
      if (isLavaDashing) {
        if (globalFrame % 3 === 0) {
          spawnParticles(player.x + 11, player.y + 12, 5, '#ffd166', 90, -20);
        }
      } else {
        damagePlayer(false);
        player.vx = player.x < lw.x ? -130 : 130;
      }
    }
  }

  // Colisión Vertical con Plataformas
  const wasOnGround = player.onGround;
  const prevBottom = player.y + player.h;
  player.y += player.vy * dt;
  player.onGround = false;

  for (const p of level.platforms) {
    if (p.broken) continue;

    // Cristal celestial de salto de gran impulso
    if ((p.subType === 'bounce_crystal' || p.subType === 'ice_crystal_spring') &&
        rectOverlap(player.x, player.y, player.w, player.h, p.x - 4, p.y - 8, p.w + 8, p.h + 12)) {
      if (player.vy > -50 && prevBottom <= p.y + 16) {
        player.y = p.y - player.h;
        player.vy = -345;
        player.jumpsLeft = 2;
        player.onGround = false;
        player.squashX = 0.65;
        player.squashY = 1.45;
        if (window.sfx && window.sfx.playGeyser) window.sfx.playGeyser();
        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 12, '#00f5d4');
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 8, '#ffffff');
        }
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(p.x - 10, p.y - 20, '¡IMPULSO CELESTIAL!', '#00f5d4');
        }
      }
      continue;
    }

    // Loto de Cristal de Shambhala (Gran Salto Elástico y Bendición del Loto)
    if ((p.subType === 'crystal_lotus_pad' || p.subType === 'lotus_pad_shambhala') &&
        rectOverlap(player.x, player.y, player.w, player.h, p.x - 4, p.y - 8, p.w + 8, p.h + 12)) {
      if (player.vy > -50 && prevBottom <= p.y + 16) {
        player.y = p.y - player.h;
        player.vy = -355;
        player.jumpsLeft = 2;
        player.onGround = false;
        player.squashX = 0.60;
        player.squashY = 1.48;
        if (window.sfx && window.sfx.playLotusBounce) window.sfx.playLotusBounce();
        else if (window.sfx && window.sfx.playGeyser) window.sfx.playGeyser();
        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 14, '#38bdf8');
          spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 10, '#fef08a');
        }
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(p.x - 8, p.y - 20, '¡SALTO DE LOTO!', '#38bdf8');
        }
      }
      continue;
    }

    // Si Elizabeth está excavando túneles bajo el banco de nieve
    if (p.subType === 'snow_bank' && player.isDigging) {
      if (rectOverlap(player.x, player.y, player.w, player.h, p.x, p.y - 12, p.w, p.h + 24)) {
        player.onGround = true;
        player.vy = 0;
        player.currentPlatform = p;
        player.jumpsLeft = 2;
      }
      continue;
    }

    if (rectOverlap(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
      if (p.oneWay || p.isWater || p.subType === 'water_puddle') {
        if (player.vy >= 0 && prevBottom <= p.y + 16) {
          player.y = p.y - player.h;
          if (!wasOnGround && player.vy > 60) {
            player.squashX = 1.24;
            player.squashY = 0.78;
            spawnDustPuff(player.x + 11, player.y + 24, 5, getBiomeDustColor(player.x));
          }
          player.vy = 0;
          player.onGround = true;
          player.currentPlatform = p;
          player.jumpsLeft = 2;
        }
      } else {
        if (player.vy > 0) {
          // Si cae con impulso sobre un monolito o pilar quebrable
          if (p.breakable && player.vy > 130 && prevBottom <= p.y + 14) {
            const pIdx = level.platforms.indexOf(p);
            if (pIdx !== -1) {
              level.platforms.splice(pIdx, 1);
              player.vy = -230; // Rebote elástico estelar
              player.jumpsLeft = 2;
              score += 200;
              triggerShake(0.18, 2.5);
              if (window.sfx && window.sfx.playHit) window.sfx.playHit();
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 22, '#38bdf8', 110, -45);
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 16, '#c084fc', 90, -35);
              spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 10, '#ffffff');
              spawnFloatingText(p.x + p.w / 2 - 20, p.y - 12, '¡PILAR DESTRUIDO! +200', '#38bdf8');
              spawnDroppedLilies(p.x + p.w / 2, p.y + p.h / 2, 3);
              continue;
            }
          }
          player.y = p.y - player.h;
          if (!wasOnGround && player.vy > 60) {
            player.squashX = 1.24;
            player.squashY = 0.78;
            spawnDustPuff(player.x + 11, player.y + 24, 5, getBiomeDustColor(player.x));
          }
          player.vy = 0;
          player.onGround = true;
          player.currentPlatform = p;
          player.jumpsLeft = 2;
        } else if (player.vy < 0) {
          player.y = p.y + p.h;
          player.vy = 0;
        }
      }
    }
  }

  // Colisión con Géiseres Térmicos Ascendentes
  for (const g of geysers) {
    if (rectOverlap(player.x, player.y, player.w, player.h, g.x, g.y - g.boostHeight, g.w, g.boostHeight)) {
      if (player.vy > g.force * 0.75) {
        player.vy = g.force;
        player.onGround = false;
        player.jumpsLeft = 2;
        player.dashCooldown = 0;
        player.squashX = 0.75;
        player.squashY = 1.3;
        if (g.isCosmic || g.isAstral || (level && level.id === 4 && player.x >= 33000)) {
          if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
          else window.sfx.playGeyser();
          spawnParticles(player.x + 11, player.y + 22, 14, '#00f5d4', 95, -50);
          spawnParticles(player.x + 11, player.y + 22, 10, '#ffd166', 80, -40);
          spawnStarSparkles(player.x + 11, player.y + 22, 10, '#ffffff');
          spawnFloatingText(g.x - 12, g.y - g.boostHeight - 12, '¡IMPULSO CÓSMICO!', '#00f5d4');
        } else if (g.isAstral || (level && level.theme === 'snow')) {
          window.sfx.playGeyser();
          spawnParticles(player.x + 11, player.y + 22, 12, '#38bdf8', 85, -50);
          spawnParticles(player.x + 11, player.y + 22, 8, '#c084fc', 70, -40);
          spawnStarSparkles(player.x + 11, player.y + 22, 8, '#ffffff');
          spawnFloatingText(g.x - 10, g.y - g.boostHeight - 12, '¡IMPULSO ASTRAL!', '#38bdf8');
        } else {
          window.sfx.playGeyser();
          spawnParticles(player.x + 11, player.y + 22, 8, '#ffd166', 65, -40);
        }
      }
    }
  }

  // Estado de animación y partículas de carrera
  if (!player.onGround) {
    player.state = 'jump';
  } else if (player.transitionTimer > 0 || (Math.abs(player.vx) >= 8 && Math.abs(player.vx) < 85)) {
    player.state = 'transition';
  } else if (Math.abs(player.vx) >= 85) {
    player.state = 'run';
    if (globalFrame % 6 === 0) {
      spawnDustPuff(
        player.facingRight ? player.x + 3 : player.x + player.w - 3,
        player.y + player.h,
        1,
        getBiomeDustColor(player.x),
        -player.vx * 0.16
      );
    }
  } else {
    player.state = 'idle';
  }

  // Caída al vacío o al fondo del volcán
  if (player.y > level.worldHeight + 30) {
    damagePlayer(true);
  }

  // Activar Checkpoints al pasar o saltar cerca de ellos
  for (const cp of checkpoints) {
    if (!cp.active && rectOverlap(player.x, player.y, player.w, player.h, cp.x - 18, cp.y - 72, 52, 82)) {
      cp.active = true;
      player.spawnX = cp.x;
      player.spawnY = cp.y - 26;
      player.lives = player.maxLives;
      if (!saveState.activeCheckpoints) saveState.activeCheckpoints = {};
      saveState.activeCheckpoints[level.id] = { id: cp.id, x: cp.x, y: cp.y, name: cp.name };
      persistSave();
      window.sfx.playCheckpoint();
      spawnParticles(cp.x + 8, cp.y - 14, 22, '#00f5d4', 90, 40);
      spawnFloatingText(cp.x - 24, cp.y - 34, `✓ CHECKPOINT GUARDADO: ${cp.name}`, '#00f5d4');
    }
  }

  // Detectar cercanía a NPCs para conversar
  nearbyNpc = null;
  for (const npc of npcs) {
    if (Math.abs((player.x + 11) - (npc.x + 8)) < 32 && Math.abs((player.y + 12) - (npc.y + 8)) < 32) {
      nearbyNpc = npc;
      break;
    }
  }

  // Recolección de Quesos del Nivel
  for (const c of cheeses) {
    if (!c.collected) {
      if (saveState.upgrades.cheeseMagnet) {
        const dx = (player.x + 11) - (c.x + 6);
        const dy = (player.y + 12) - (c.y + 6);
        const dist = Math.hypot(dx, dy);
        if (dist < 68 && dist > 1) {
          c.x += (dx / dist) * 165 * dt;
          c.y += (dy / dist) * 165 * dt;
        }
      }
      if (rectOverlap(player.x, player.y, player.w, player.h, c.x, c.y, 12, 12)) {
        c.collected = true;
        c.collectedThisRun = true;
        score += 100;
        window.sfx.playCheese();
        spawnParticles(c.x + 6, c.y + 6, 12, '#ffd166', 75, 90);
        spawnStarSparkles(c.x + 6, c.y + 6, 8, '#ffe169');
        triggerShake(0.08, 1.2);
        const currentCollected = cheeses.filter(ch => ch.collected).length;
        spawnFloatingText(c.x - 6, c.y - 4, `QUESO ${currentCollected}/${cheeses.length}`, '#ffe169');
      }
    }
  }

  // Actualizar y recolectar Lirios de Dexter físicos
  updateDroppedLilies(dt);

  // ============================================================================
  // MECÁNICAS ÚNICAS DECORATIVAS DE SHAMBHALA (AGUAS TERMALES, CAMPANAS, PORTAL)
  // ============================================================================
  if (level && level.decorations) {
    for (const d of level.decorations) {
      // 1. Aguas Termales de Shambhala (Curación y Purificación)
      if (d.subType === 'hot_spring' && rectOverlap(player.x, player.y, player.w, player.h, d.x, d.y - 12, 68, 20)) {
        if (globalFrame % 5 === 0) {
          spawnParticles(player.x + 11, player.y + 20, 1, '#cffafe', 40, -25);
        }
        d.healTimer = (d.healTimer || 0) + dt;
        if (d.healTimer >= 1.0) {
          d.healTimer = 0;
          if (player.lives < player.maxLives) {
            player.lives++;
            if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
            spawnParticles(player.x + 11, player.y + 12, 14, '#67e8f9', 75, -35);
            spawnStarSparkles(player.x + 11, player.y + 10, 8, '#ffffff');
            spawnFloatingText(player.x - 14, player.y - 18, '¡AGUAS TERMALES! +1 CORAZÓN', '#38bdf8');
          } else if (!d.blessedNotice) {
            d.blessedNotice = true;
            spawnFloatingText(player.x - 18, player.y - 18, '¡PURIFICACIÓN DE SHAMBHALA!', '#67e8f9');
            spawnStarSparkles(player.x + 11, player.y + 10, 6, '#fef08a');
          }
        }
      }

      // 2. Campanas Sagradas de Oración (Vibración mística, aturdimiento de bestias y puntos)
      if (d.subType === 'shambhala_prayer_bell') {
        const bellHit = rectOverlap(player.x, player.y, player.w, player.h, d.x - 12, d.y - 48, 24, 48);
        const isTriggering = bellHit && (player.isSwingingPick || player.dashTimer > 0 || Math.abs(player.vx) > 30 || player.vy > 40);
        if (isTriggering && (!d.lastRing || Date.now() - d.lastRing > 1200)) {
          d.lastRing = Date.now();
          d.ringing = 1.0;
          if (window.sfx && window.sfx.playShambhalaBell) window.sfx.playShambhalaBell();
          else if (window.sfx && window.sfx.playShieldBreak) window.sfx.playShieldBreak();
          triggerShake(0.12, 2.0);
          spawnStarSparkles(d.x, d.y - 30, 14, '#fde047');
          spawnParticles(d.x, d.y - 30, 16, '#f59e0b', 85, -30);
          spawnFloatingText(d.x - 24, d.y - 54, '¡CAMPANA SAGRADA! +150', '#fde047');
          score += 150;

          // Aturdir / alejar enemigos cercanos
          if (magmaCrawlers) {
            magmaCrawlers.forEach(mc => {
              if (Math.hypot(mc.x - d.x, mc.y - d.y) < 180) {
                mc.dir *= -1;
                spawnStarSparkles(mc.x + 9, mc.y + 6, 6, '#fde047');
              }
            });
          }
          if (fireBats) {
            fireBats.forEach(fb => {
              if (Math.hypot(fb.x - d.x, fb.y - d.y) < 180) {
                fb.dir *= -1;
                spawnStarSparkles(fb.x + 6, fb.y + 4, 6, '#fde047');
              }
            });
          }
        }
      }

      // 3. Portales Dimensionales del Santuario (Hacia Shambhala y hacia el Monte Kailash)
      if (d.subType === 'sanctuary_portal_gate' && rectOverlap(player.x, player.y, player.w, player.h, d.x - 20, d.y - 58, 40, 58)) {
        if (!d.warped) {
          d.warped = true;
          if (window.sfx && window.sfx.playPortal) window.sfx.playPortal();
          triggerShake(0.22, 3.2);
          spawnStarSparkles(player.x + 11, player.y + 12, 22, '#00f5d4');
          spawnParticles(player.x + 11, player.y + 12, 26, '#fde047', 130, -55);
          if (d.x < 30000) {
            spawnFloatingText(player.x - 18, player.y - 28, '¡ENTRANDO A SHAMBHALA!', '#fde047');
            player.x = 29640;
            player.y = 100;
            player.vx = 220;
            player.vy = -120;
          } else {
            spawnFloatingText(player.x - 24, player.y - 28, '¡ASCENSO ASTRAL AL MONTE KAILASH!', '#00f5d4');
            player.x = 33040;
            player.y = 90;
            player.vx = 250;
            player.vy = -190;
          }
          player.jumpsLeft = 2;
        }
      }
    }
  }

  // Colisión con Pinchos / Pozos de Lava
  for (const s of (level.spikes || [])) {
    if (rectOverlap(player.x + 4, player.y + 6, player.w - 8, player.h - 6, s.x, s.y, s.w, 12)) {
      if (!isLavaDashing) {
        damagePlayer(s.w > 200);
      }
    }
  }



  // Verificar llegada al Hijo Ratón
  const bm = level.babyMouse;
  if (bm && rectOverlap(player.x, player.y, player.w, player.h, bm.x - 6, bm.y - 6, 24, 24)) {
    if (bm.requiresBossDefeat && omniMen.length > 0) {
      if (globalFrame % 35 === 0) {
        window.sfx.playHurt();
        spawnFloatingText(bm.x - 45, bm.y - 20, '¡DERROTA A OMNI-MAN (5 HP) PARA LIBERARLO!', '#ff2a55');
      }
    } else if (bm.requiresPuzzle && homelanderPuzzle && !homelanderPuzzle.solved) {
      if (globalFrame % 35 === 0) {
        window.sfx.playPatternWrong();
        spawnFloatingText(bm.x - 55, bm.y - 20, '¡ESCUDO FLORAL ACTIVO! PISA LOS 5 BOTONES', '#ff758f');
      }
    } else if (level.id === 4 && typeof astralBossState !== 'undefined' && astralBossState && !astralBossState.isDefeated) {
      if (globalFrame % 35 === 0) {
        if (window.sfx && window.sfx.playLaserWarning) window.sfx.playLaserWarning();
        spawnFloatingText(bm.x - 55, bm.y - 20, '¡DERROTA AL DRAGON ASTRAL PARA LIBERARLO!', '#ffd166');
      }
    } else {
      player.vx = 0;
      player.dashTimer = 0;
      player.state = 'idle';
      player.facingRight = true;

      const newlyDiscovered = cheeses.filter(c => c.collectedThisRun && !c.permanentlySaved);
      if (newlyDiscovered.length > 0) {
        saveState.bankCheeses += newlyDiscovered.length;
        spawnFloatingText(bm.x - 36, bm.y - 22, `¡+${newlyDiscovered.length} QUESOS NUEVOS GUARDADOS EN EL BANCO!`, '#ffd166');
      }
      if (!saveState.collectedCheeseIds) saveState.collectedCheeseIds = {};
      saveState.collectedCheeseIds[level.id] = cheeses.filter(c => c.collected).map(c => c.id);

      if (saveState.activeCheckpoints && saveState.activeCheckpoints[level.id]) {
        delete saveState.activeCheckpoints[level.id];
      }
      persistSave();

      activeDialogueList = bm.dialogues;
      dialogueIndex = 0;
      dialogueCharIndex = 0;
      dialogueMode = 'BABY';
      gameState = 'DIALOGUE';
      window.sfx.playCheese();
      spawnParticles(bm.x + 8, bm.y + 4, 20, '#ff8fab', 85, 70);
    }
  }
}

// ============================================================================
// ACTUALIZACIÓN DE PLATAFORMAS DINÁMICAS (TÉMPANOS MÓVILES Y HIELO QUEBRADIZO)
// ============================================================================
function updatePlatforms(dt) {
  if (!level || !level.platforms) return;

  for (let i = 0; i < level.platforms.length; i++) {
    const p = level.platforms[i];

    // 1. Témpanos y Plataformas Móviles a la Deriva
    if (p.moving) {
      if (p.dir === undefined) p.dir = 1;
      const speed = p.speed || 45;
      const prevX = p.x;
      p.x += p.dir * speed * dt;

      if (p.dir > 0 && p.x >= p.maxX) {
        p.x = p.maxX;
        p.dir = -1;
      } else if (p.dir < 0 && p.x <= p.minX) {
        p.x = p.minX;
        p.dir = 1;
      }

      const dx = p.x - prevX;
      // Arrastrar a Elizabeth si está parada sobre el témpano
      if (player && player.onGround && player.currentPlatform === p) {
        player.x += dx;
        if (player.x < 0) player.x = 0;
        if (player.x + player.w > level.worldWidth) player.x = level.worldWidth - player.w;
      }
    }

    // 2. Hielo Quebradizo (Cracking Ice)
    if (p.subType === 'cracking_ice') {
      if (p.broken) {
        p.respawnTimer -= dt;
        if (p.respawnTimer <= 0) {
          p.broken = false;
          p.crackTimer = 0;
          p.shakeOffset = 0;
          if (typeof spawnStarSparkles === 'function') {
            spawnStarSparkles(p.x + p.w / 2, p.y + p.h / 2, 8, '#caf0f8');
          }
        }
      } else {
        const isStandingOn = (player && player.onGround && player.currentPlatform === p);
        if (isStandingOn) {
          p.crackTimer = (p.crackTimer || 0) + dt;
          if (p.crackTimer > 0.32) {
            p.shakeOffset = Math.sin(globalFrame * 1.8) * 1.8;
          }
          if (p.crackTimer >= 0.85) {
            p.broken = true;
            p.respawnTimer = 2.8;
            p.shakeOffset = 0;
            if (window.sfx && window.sfx.playEnemyHit) window.sfx.playEnemyHit();
            if (typeof spawnParticles === 'function') {
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 14, '#90e0ef', 80, -30);
              spawnParticles(p.x + p.w / 2, p.y + p.h / 2, 8, '#ffffff', 60, -20);
            }
            if (typeof triggerShake === 'function') triggerShake(0.12, 1.8);
            if (player.currentPlatform === p) {
              player.onGround = false;
              player.currentPlatform = null;
            }
          }
        } else {
          if (p.crackTimer > 0) {
            p.crackTimer = Math.max(0, p.crackTimer - dt * 1.5);
            p.shakeOffset = 0;
          }
        }
      }
    }
  }
}


// --- MODULO: src/entities/player/camera.js ---
// --- Seguimiento suave de Cámara 2D a 144 Hz (CERO temblores, tirones ni judder) ---
function updatePlayerCamera(dt) {
  const targetLookAhead = player.facingRight ? 24 : -24;
  cameraLookAheadX += (targetLookAhead - cameraLookAheadX) * (1 - Math.exp(-4 * dt));
  let targetCamX = Math.max(0, Math.min(level.worldWidth - W, player.x - W * 0.38 + cameraLookAheadX));
  let targetCamY = Math.max(0, Math.min(level.worldHeight - H, player.y - H * 0.58));

  // Encuadre cinematográfico de la batalla contra el Kraken (Mundo 3)
  const kraken = window.krakenBossState || (typeof krakenBossState !== 'undefined' ? krakenBossState : null);
  if (kraken && kraken.active) {
    targetCamX = Math.max(18300, Math.min(18520, player.x - 140));
    targetCamY = 0;
  }

  // Amortiguación fluida matemáticamente invariante a framerate
  const camFactorX = 1 - Math.exp(-9 * dt);
  const camFactorY = player.onGround ? (1 - Math.exp(-8 * dt)) : (1 - Math.exp(-4 * dt));
  cameraX += (targetCamX - cameraX) * camFactorX;
  cameraY += (targetCamY - cameraY) * camFactorY;
}


// --- MODULO: src/entities/player/combat.js ---
// --- Sistema de Combate, Daño y Casa Segura del Jugador ---
function damagePlayer(respawnAtCheckpoint) {
  if (!respawnAtCheckpoint && (player.invulnTimer > 0 || player.dashTimer > 0)) return;

  player.lives--;
  window.sfx.playHurt();
  triggerShake(0.25, 4);
  rumbleGamepad(220, 0.65, 0.85);
  spawnParticles(player.x + 11, player.y + 12, 14, '#ff4d6d', 90, 120);

  if (player.lives <= 0) {
    gameState = 'GAMEOVER';
    return;
  }

  if (respawnAtCheckpoint) {
    // Reaparecer en el último Checkpoint activado
    player.x = player.spawnX;
    player.y = player.spawnY;
    player.vx = 0;
    player.vy = 0;
    if (player.ability === 'surf' && player.x >= 15850 && player.x < 18500) {
      player.vx = 240;
      player.facingRight = true;
      player.isSurfing = true;
      player.inWater = true;
      player.onGround = true;
    }
    if (level && level.id === 4 && player.x >= 11000) {
      player.ability = 'ice_pick';
    }
    if (level && level.id === 4 && window.yetiBossState && window.yetiBossState.active) {
      if (typeof initYetiBoss === 'function') initYetiBoss();
    }
    if (level.bossCastleGate && player.x >= level.bossCastleGate.x) {
      bossFightActive = false;
      magmaRocks = [];
    }
  } else {
    player.vy = -180;
    player.vx = player.facingRight ? -95 : 95;
  }
  player.invulnTimer = saveState.upgrades.longerInvuln ? 2.1 : 1.3;
}

function enterSafeHouse(babyMouse) {
  gameState = 'SAFE_HOUSE';
  houseState.mamaX = 85;
  houseState.mamaY = 196;
  houseState.phase = 'greeting';
  houseState.timer = 0;
  houseState.unlockedAbilityText = babyMouse.nextAbilityName || 'NUEVA HABILIDAD DESBLOQUEADA';
}


// --- MODULO: src/entities/player/portal_teleport.js ---
// ============================================================================
// SISTEMA DE TELETRANSPORTE Y PISTOLA DE PORTALES
// ============================================================================
// Maneja la logica y maquina de estados del teletransporte: disparo,
// apertura del portal, entrada del jugador, corte de camara y salida en destino.

let portalTeleportState = null;

function isPortalTeleportActive() {
  return portalTeleportState !== null;
}

function isPortalPlayerHidden() {
  if (!portalTeleportState) return false;
  const p = portalTeleportState.phase;
  return p === 'close_in' || p === 'warp' || p === 'open_out';
}

function getPortalPlayerTransform() {
  if (!portalTeleportState) return null;
  return portalTeleportState.playerTransform || null;
}

function getCheckpointCoordinates(cpId) {
  if (!cpId || cpId === 0) {
    return {
      x: (level.playerSpawn && level.playerSpawn.x) || 100,
      y: (level.playerSpawn && level.playerSpawn.y) || 160
    };
  }
  const cp = (level.checkpoints || []).find(c => c.id === cpId);
  if (cp) {
    return { x: cp.x, y: cp.y - 26 };
  }
  return {
    x: (level.playerSpawn && level.playerSpawn.x) || 100,
    y: (level.playerSpawn && level.playerSpawn.y) || 160
  };
}

function startInLevelPortalTeleport(cpId) {
  if (portalTeleportState) return;
  const target = getCheckpointCoordinates(cpId);
  const dir = player.facingRight ? 1 : -1;
  const entryX = player.x + 11 + dir * 36;
  const entryY = player.y + 8;
  const exitX = target.x + 11 - dir * 22;
  const exitY = target.y + 8;

  portalTeleportState = {
    mode: 'in_level',
    phase: 'aim',
    timer: 0,
    targetCpId: cpId,
    targetX: target.x,
    targetY: target.y,
    dir: dir,
    gunRecoil: 0,
    beamProgress: 0,
    entryPortal: { x: entryX, y: entryY, scale: 0 },
    exitPortal: { x: exitX, y: exitY, scale: 0 },
    startX: player.x,
    startY: player.y,
    playerTransform: {
      x: player.x,
      y: player.y,
      alpha: 1,
      squashX: 1,
      squashY: 1,
      state: 'idle'
    }
  };

  player.vx = 0;
  player.vy = 0;
  player.state = 'idle';
  if (window.sfx && window.sfx.init) window.sfx.init();
}

function startPortalArrival() {
  const dir = player.facingRight ? 1 : -1;
  const exitX = player.x + 11 - dir * 18;
  const exitY = player.y + 8;

  portalTeleportState = {
    mode: 'arrival',
    phase: 'open_out',
    timer: 0,
    targetCpId: null,
    targetX: player.x,
    targetY: player.y,
    dir: dir,
    gunRecoil: 0,
    beamProgress: 0,
    entryPortal: { x: exitX, y: exitY, scale: 0 },
    exitPortal: { x: exitX, y: exitY, scale: 0 },
    startX: player.x,
    startY: player.y,
    playerTransform: {
      x: player.x,
      y: player.y,
      alpha: 0,
      squashX: 1,
      squashY: 1,
      state: 'jump'
    }
  };

  player.vx = 0;
  player.vy = 0;
  if (window.sfx && window.sfx.playPortalWoosh) {
    window.sfx.playPortalWoosh();
  }
}

function updatePortalTeleport(dt) {
  if (!portalTeleportState) return;
  const s = portalTeleportState;
  s.timer += dt;

  // 1. Apuntar con la pistola de portales
  if (s.phase === 'aim') {
    player.state = 'idle';
    s.playerTransform = {
      x: player.x,
      y: player.y,
      alpha: 1,
      squashX: 1,
      squashY: 1,
      state: 'idle'
    };
    if (s.timer >= 0.22) {
      s.phase = 'fire';
      s.timer = 0;
      s.gunRecoil = 1;
      if (window.sfx && window.sfx.playPortalGunShot) window.sfx.playPortalGunShot();
      if (typeof triggerShake === 'function') triggerShake(0.12, 1.8);
    }
  }

  // 2. Disparo de rayo hacia el punto de impacto
  else if (s.phase === 'fire') {
    s.gunRecoil = Math.max(0, s.gunRecoil - dt * 5.5);
    s.beamProgress = Math.min(1, s.timer / 0.12);
    if (s.timer >= 0.12) {
      s.phase = 'open_in';
      s.timer = 0;
      s.beamProgress = 1;
      if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(s.entryPortal.x, s.entryPortal.y, 14, '#39ff14');
        spawnStarSparkles(s.entryPortal.x, s.entryPortal.y, 10, '#00ffff');
      }
    }
  }

  // 3. Apertura del portal de entrada
  else if (s.phase === 'open_in') {
    s.entryPortal.scale = Math.min(1, s.timer / 0.18);
    if (globalFrame % 4 === 0 && typeof spawnStarSparkles === 'function') {
      spawnStarSparkles(
        s.entryPortal.x + (Math.random() - 0.5) * 12,
        s.entryPortal.y + (Math.random() - 0.5) * 18,
        1,
        '#39ff14'
      );
    }
    if (s.timer >= 0.18) {
      s.phase = 'walk_in';
      s.timer = 0;
    }
  }

  // 4. Elizabeth entra al portal y es absorbida por el vortice
  else if (s.phase === 'walk_in') {
    const dur = 0.26;
    const t = Math.min(1, s.timer / dur);
    const targetX = s.entryPortal.x - s.dir * 4;
    const curX = s.startX + (targetX - s.startX) * t;
    const curY = s.startY + Math.sin(t * Math.PI) * -8;
    const sqX = 1 - t * 0.55;
    const sqY = 1 + Math.sin(t * Math.PI) * 0.45;
    const alpha = Math.max(0, 1 - Math.pow(t, 2.2));

    s.playerTransform = {
      x: curX,
      y: curY,
      alpha: alpha,
      squashX: sqX,
      squashY: sqY,
      state: 'run'
    };

    if (s.timer >= dur) {
      s.phase = 'close_in';
      s.timer = 0;
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(s.entryPortal.x, s.entryPortal.y, 16, '#00f5d4');
      }
    }
  }

  // 5. Cierre del portal de entrada
  else if (s.phase === 'close_in') {
    const dur = 0.14;
    const t = Math.min(1, s.timer / dur);
    s.entryPortal.scale = Math.max(0, 1 - t);
    s.playerTransform = { x: player.x, y: player.y, alpha: 0, squashX: 1, squashY: 1, state: 'idle' };

    if (s.timer >= dur) {
      s.phase = 'warp';
      s.timer = 0;
    }
  }

  // 6. Transicion / Corte dimensional hacia el destino
  else if (s.phase === 'warp') {
    player.x = s.targetX;
    player.y = s.targetY;
    player.vx = 0;
    player.vy = 0;

    if (!saveState.activeCheckpoints) saveState.activeCheckpoints = {};
    if (s.targetCpId) {
      const cp = (level.checkpoints || []).find(c => c.id === s.targetCpId);
      if (cp) {
        saveState.activeCheckpoints[level.id] = { id: cp.id, x: cp.x, y: cp.y, name: cp.name };
      }
    } else {
      delete saveState.activeCheckpoints[level.id];
    }
    persistSave();

    cameraX = Math.max(0, Math.min(level.worldWidth - W, player.x - W * 0.38));
    cameraY = 0;

    s.exitPortal.x = player.x + 11 - s.dir * 18;
    s.exitPortal.y = player.y + 8;
    s.phase = 'open_out';
    s.timer = 0;
    if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
  }

  // 7. Apertura del portal de salida en el destino
  else if (s.phase === 'open_out') {
    const dur = 0.18;
    s.exitPortal.scale = Math.min(1, s.timer / dur);
    s.playerTransform = { x: player.x, y: player.y, alpha: 0, squashX: 1, squashY: 1, state: 'jump' };

    if (globalFrame % 3 === 0 && typeof spawnStarSparkles === 'function') {
      spawnStarSparkles(
        s.exitPortal.x + (Math.random() - 0.5) * 14,
        s.exitPortal.y + (Math.random() - 0.5) * 20,
        1,
        '#00ffff'
      );
    }
    if (s.timer >= dur) {
      s.phase = 'emerge_out';
      s.timer = 0;
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(s.exitPortal.x, s.exitPortal.y, 16, '#ffffff');
        spawnStarSparkles(s.exitPortal.x, s.exitPortal.y, 14, '#39ff14');
      }
    }
  }

  // 8. Elizabeth sale del portal aterrizando sobre la plataforma
  else if (s.phase === 'emerge_out') {
    const dur = 0.28;
    const t = Math.min(1, s.timer / dur);
    const startX = s.exitPortal.x;
    const finalX = player.x;
    const curX = startX + (finalX - startX) * t;
    const curY = player.y - Math.sin(t * Math.PI) * 10;
    const alpha = Math.min(1, 0.2 + t * 0.9);

    let sqX = 1;
    let sqY = 1;
    if (t < 0.6) {
      sqX = 0.7 + t * 0.3;
      sqY = 1.3 - t * 0.3;
    } else {
      const landT = (t - 0.6) / 0.4;
      sqX = 1 + Math.sin(landT * Math.PI) * 0.22;
      sqY = 1 - Math.sin(landT * Math.PI) * 0.22;
    }

    s.playerTransform = {
      x: curX,
      y: curY,
      alpha: alpha,
      squashX: sqX,
      squashY: sqY,
      state: t < 0.65 ? 'jump' : 'idle'
    };

    if (s.timer >= dur) {
      s.phase = 'close_out';
      s.timer = 0;
      player.squashX = 1;
      player.squashY = 1;
      s.playerTransform = { x: player.x, y: player.y, alpha: 1, squashX: 1, squashY: 1, state: 'idle' };
    }
  }

  // 9. Cierre del portal de salida
  else if (s.phase === 'close_out') {
    const dur = 0.15;
    const t = Math.min(1, s.timer / dur);
    s.exitPortal.scale = Math.max(0, 1 - t);
    s.playerTransform = { x: player.x, y: player.y, alpha: 1, squashX: 1, squashY: 1, state: 'idle' };

    if (s.timer >= dur) {
      portalTeleportState = null;
      player.state = 'idle';
      player.squashX = 1;
      player.squashY = 1;
    }
  }
}


// --- MODULO: src/entities/player/portal_render.js ---
// ============================================================================
// RENDERIZADO DE PISTOLA DE PORTALES Y VORTICE DIMENSIONAL
// ============================================================================
// Dibuja la pistola de portales en manos de Elizabeth, el rayo de plasma,
// el resplandor energetico y los vortices de entrada y salida interdimensionales.

function drawPortalGunOnPlayer(ctx, p, frame, recoil = 0) {
  const facingRight = p.facingRight;
  const dir = facingRight ? 1 : -1;
  const kickX = -dir * (recoil * 3.5);
  const kickAngle = -dir * (recoil * 0.18);

  const gunX = Math.round(p.x + (facingRight ? 13 : 9) + kickX);
  const gunY = Math.round(p.y + 13);

  ctx.save();
  ctx.translate(gunX, gunY);
  ctx.rotate(kickAngle);
  if (!facingRight) ctx.scale(-1, 1);

  // Empuñadura ergonomica oscura
  ctx.fillStyle = '#212529';
  ctx.fillRect(-2, 2, 4, 6);

  // Cuerpo metalico blanco ceramico de la pistola
  ctx.fillStyle = '#f8f9fa';
  ctx.beginPath();
  ctx.roundRect(0, -3, 13, 6, [2, 3, 2, 1]);
  ctx.fill();

  // Detalle gris oscuro / chasis
  ctx.fillStyle = '#495057';
  ctx.fillRect(2, -1, 4, 3);

  // Tubo de cristal superior con plasma verde brillante
  ctx.fillStyle = 'rgba(162, 210, 255, 0.6)';
  ctx.fillRect(3, -5, 7, 3);
  const plasmaPulse = Math.sin(frame * 0.25) * 0.5 + 0.5;
  ctx.fillStyle = plasmaPulse > 0.4 ? '#39ff14' : '#00f5d4';
  ctx.fillRect(4, -4, 5, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(5, -4, 2, 1);

  // Garras frontales del emisor de portales
  ctx.fillStyle = '#adb5bd';
  ctx.fillRect(12, -4, 2, 1);
  ctx.fillRect(13, -2, 2, 3);
  ctx.fillRect(12, 2, 2, 1);

  // Destello de energia en la punta durante el disparo
  if (recoil > 0.05) {
    const flashR = 4 + recoil * 6;
    const grad = ctx.createRadialGradient(15, 0, 1, 15, 0, flashR);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.35, '#39ff14');
    grad.addColorStop(1, 'rgba(0, 245, 212, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(15, 0, flashR, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawPortalGunVortex(ctx, x, y, frame, scale = 1) {
  if (scale <= 0.01) return;
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale, scale);

  // Resplandor exterior verde esmeralda y cian
  const auraPulse = Math.sin(frame * 0.14) * 3;
  const auraRx = 26 + auraPulse;
  const auraRy = 36 + auraPulse * 1.3;
  const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, auraRy);
  grad.addColorStop(0, 'rgba(57, 255, 20, 0.75)');
  grad.addColorStop(0.38, 'rgba(0, 245, 212, 0.45)');
  grad.addColorStop(0.72, 'rgba(20, 80, 40, 0.20)');
  grad.addColorStop(1, 'rgba(4, 16, 8, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, 0, auraRx, auraRy, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ondas de choque dimensionales
  for (let r = 0; r < 2; r++) {
    const ringProg = ((frame * 0.042 + r * 0.5) % 1);
    const ringW = 15 * ringProg + 3;
    const ringH = 25 * ringProg + 4;
    const ringAlpha = (1 - ringProg) * 0.65;
    ctx.strokeStyle = `rgba(180, 255, 120, ${ringAlpha})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(0, 0, ringW, ringH, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Silueta organica ondulante del portal
  const numPoints = 18;
  const baseRx = 13;
  const baseRy = 22;

  // Capa 1: Borde exterior verde oscuro obsidiana
  ctx.beginPath();
  for (let i = 0; i <= numPoints; i++) {
    const ang = (i / numPoints) * Math.PI * 2;
    const wobble = Math.sin(ang * 4 + frame * 0.15) * 1.6 + Math.cos(ang * 3 - frame * 0.18) * 1.1;
    const vx = Math.cos(ang) * (baseRx + 2.4 + wobble);
    const vy = Math.sin(ang) * (baseRy + 3.0 + wobble * 1.25);
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.closePath();
  ctx.fillStyle = '#05190d';
  ctx.fill();

  // Capa 2: Manto esmeralda profundo
  ctx.beginPath();
  for (let i = 0; i <= numPoints; i++) {
    const ang = (i / numPoints) * Math.PI * 2;
    const wobble = Math.sin(ang * 4 + frame * 0.15) * 1.3 + Math.cos(ang * 3 - frame * 0.18) * 0.8;
    const vx = Math.cos(ang) * (baseRx + wobble);
    const vy = Math.sin(ang) * (baseRy + wobble * 1.2);
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.closePath();
  ctx.fillStyle = '#1b7a32';
  ctx.fill();

  // Capa 3: Plasma interior verde lima hiperespacial
  ctx.beginPath();
  for (let i = 0; i <= numPoints; i++) {
    const ang = (i / numPoints) * Math.PI * 2;
    const wobble = Math.sin(ang * 3 - frame * 0.17) * 1.1;
    const vx = Math.cos(ang) * (baseRx * 0.78 + wobble);
    const vy = Math.sin(ang) * (baseRy * 0.78 + wobble * 1.2);
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.closePath();
  ctx.fillStyle = '#39ff14';
  ctx.fill();

  // Brazos de vortice en espiral giratoria
  const arms = 3;
  for (let a = 0; a < arms; a++) {
    const baseAng = frame * 0.16 + (a * (Math.PI * 2 / arms));
    ctx.beginPath();
    for (let step = 0; step < 10; step++) {
      const t = step / 9;
      const armAng = baseAng + t * 2.2;
      const armR = (t * baseRx * 0.75);
      const ax = Math.cos(armAng) * armR;
      const ay = Math.sin(armAng) * armR * 1.45;
      if (step === 0) ctx.moveTo(ax, ay);
      else ctx.lineTo(ax, ay);
    }
    ctx.strokeStyle = a % 2 === 0 ? '#ffffff' : '#00ffff';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  // Singularidad oscura central
  ctx.beginPath();
  ctx.ellipse(0, 0, 4, 7, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 0, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.restore();
}

function drawPortalTeleportWorld(ctx, viewL, viewR) {
  if (!portalTeleportState) return;
  const s = portalTeleportState;

  // 1. Rayo de disparo durante la fase 'fire'
  if (s.phase === 'fire' && s.beamProgress > 0) {
    const dir = s.dir;
    const startX = player.x + (dir > 0 ? 25 : -3);
    const startY = player.y + 13;
    const currentEndX = startX + (s.entryPortal.x - startX) * s.beamProgress;
    const currentEndY = startY + (s.entryPortal.y - startY) * s.beamProgress;

    ctx.save();
    ctx.strokeStyle = 'rgba(57, 255, 20, 0.45)';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentEndX, currentEndY);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentEndX, currentEndY);
    ctx.stroke();
    ctx.restore();
  }

  // 2. Portal de Entrada
  if (s.entryPortal.scale > 0.01) {
    if (s.entryPortal.x >= viewL && s.entryPortal.x <= viewR) {
      drawPortalGunVortex(ctx, s.entryPortal.x, s.entryPortal.y, globalFrame, s.entryPortal.scale);
    }
  }

  // 3. Portal de Salida
  if (s.exitPortal.scale > 0.01) {
    if (s.exitPortal.x >= viewL && s.exitPortal.x <= viewR) {
      drawPortalGunVortex(ctx, s.exitPortal.x, s.exitPortal.y, globalFrame, s.exitPortal.scale);
    }
  }
}


// --- MODULO: src/entities/player/index.js ---
// --- Orquestador Principal del Jugador ---
function updatePlayer(dt) {
  if (typeof updatePlatforms === 'function') {
    updatePlatforms(dt);
  }
  updatePlayerMovement(dt);
  updatePlayerCollisions(dt);
  updatePlayerCamera(dt);
}


// --- MODULO: src/core/level.js ---
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
    ability: (level.id === 4 && (initialX >= 11000 || (savedCp && savedCp.id >= 22))) ? 'ice_pick' : (level.ability || null),
    dashTimer: 0,
    dashCooldown: 0
  };
  window.level = level;
  window.player = player;

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
  if (typeof initKangshungMechanics === 'function') {
    initKangshungMechanics();
  }

  cameraX = Math.max(0, Math.min(level.worldWidth - W, player.x - W * 0.35));
  cameraY = Math.max(0, Math.min(level.worldHeight - H, player.y - H * 0.6));

  if (savedCp) {
    spawnFloatingText(player.x - 18, player.y - 12, `📍 ${savedCp.name}`, '#00f5d4');
  }
}



// --- MODULO: src/ui/hud/status.js ---
// ============================================================================
// HUD: ESTADO DEL JUGADOR (VIDAS, QUESOS, FLORES Y BOTÓN ZONAS)
// ============================================================================
// Paleta estricta: Negro Obsidiana, Blanco Puro y Rosado Oscuro

function drawHUDStatus() {
  const collectedCount = cheeses.filter(c => c.collected).length;
  const cheeseText = `${collectedCount}/${cheeses.length}`;
  const flowerText = `${saveState.dexterLilies || 0}`;

  ctx.font = `bold 7.5px ${UI_FONT}`;
  const cheeseTextW = Math.ceil(ctx.measureText(cheeseText).width);
  const flowerTextW = Math.ceil(ctx.measureText(flowerText).width);

  const hudX = 10;
  const hudY = 7;
  const hudH = 22;
  const hudR = 6;

  // Dimensiones dinámicas de secciones para cero colisiones
  const heartSpacing = 13;
  const heartsW = player.maxLives * heartSpacing;

  let curX = hudX + 8;
  const heartsStartX = curX;
  curX += heartsW + 6;

  // Divisor 1
  const div1X = curX;
  curX += 7;

  // Sección Quesos
  const cheeseIconX = curX;
  const cheeseTextX = curX + 13;
  curX = cheeseTextX + cheeseTextW + 7;

  // Divisor 2
  const div2X = curX;
  curX += 7;

  // Sección Flores
  const flowerIconX = curX;
  const flowerTextX = curX + 13;
  curX = flowerTextX + flowerTextW + 7;

  // Divisor 3
  const div3X = curX;
  curX += 7;

  // Botón Zonas / Mapa
  const warpBtnW = 50;
  const warpBtnH = 16;
  const warpBtnX = curX;
  const warpBtnY = hudY + 3;
  curX += warpBtnW + 6;

  const hudW = curX - hudX;

  const warpBtn = {
    x: warpBtnX, y: warpBtnY, w: warpBtnW, h: warpBtnH,
    action: () => {
      window.sfx.playJump(false);
      openWorldMap(currentLevelIndex);
    }
  };

  // Contenedor principal: Cápsula oscura en obsidiana con ribete rosado oscuro
  const hudGrad = ctx.createLinearGradient(hudX, hudY, hudX, hudY + hudH);
  hudGrad.addColorStop(0, 'rgba(22, 6, 26, 0.95)');
  hudGrad.addColorStop(1, 'rgba(10, 3, 14, 0.95)');
  drawRoundedPanel(hudX, hudY, hudW, hudH, hudR, hudGrad, '#8f143c', 1.2);

  // Divisores verticales sutiles
  ctx.fillStyle = 'rgba(255, 117, 160, 0.22)';
  ctx.fillRect(div1X, hudY + 4, 1, hudH - 8);
  ctx.fillRect(div2X, hudY + 4, 1, hudH - 8);
  ctx.fillRect(div3X, hudY + 4, 1, hudH - 8);

  // 1. Corazones de Rubí Pixel Art
  for (let i = 0; i < player.maxLives; i++) {
    const hx = heartsStartX + i * heartSpacing;
    const hy = hudY + 6;
    const isFull = i < player.lives;
    const isPulsing = player.lives === 1 && isFull;
    const pulseY = isPulsing ? Math.round(Math.sin(globalFrame * 0.25) * 1) : 0;

    if (isFull) {
      ctx.fillStyle = '#100618';
      ctx.fillRect(hx + 1, hy - pulseY, 3, 1);
      ctx.fillRect(hx + 5, hy - pulseY, 3, 1);
      ctx.fillRect(hx, hy + 1 - pulseY, 9, 4);
      ctx.fillRect(hx + 1, hy + 5 - pulseY, 7, 2);
      ctx.fillRect(hx + 2, hy + 7 - pulseY, 5, 1);
      ctx.fillRect(hx + 3, hy + 8 - pulseY, 3, 1);
      ctx.fillRect(hx + 4, hy + 9 - pulseY, 1, 1);

      ctx.fillStyle = '#b31b52';
      ctx.fillRect(hx + 1, hy + 1 - pulseY, 7, 4);
      ctx.fillRect(hx + 2, hy + 5 - pulseY, 5, 2);
      ctx.fillRect(hx + 3, hy + 7 - pulseY, 3, 1);

      ctx.fillStyle = '#ff75a0';
      ctx.fillRect(hx + 1, hy + 1 - pulseY, 2, 2);
      ctx.fillRect(hx + 5, hy + 1 - pulseY, 2, 1);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(hx + 2, hy + 2 - pulseY, 1, 1);
    } else {
      ctx.fillStyle = 'rgba(20, 6, 22, 0.8)';
      ctx.fillRect(hx + 1, hy, 7, 5);
      ctx.fillRect(hx + 2, hy + 5, 5, 2);
      ctx.fillRect(hx + 3, hy + 7, 3, 1);
      ctx.fillStyle = '#4a0e22';
      ctx.fillRect(hx + 1, hy, 3, 1);
      ctx.fillRect(hx + 5, hy, 3, 1);
      ctx.fillRect(hx, hy + 1, 1, 4);
      ctx.fillRect(hx + 8, hy + 1, 1, 4);
      ctx.fillRect(hx + 1, hy + 5, 1, 2);
      ctx.fillRect(hx + 7, hy + 5, 1, 2);
      ctx.fillRect(hx + 2, hy + 7, 1, 1);
      ctx.fillRect(hx + 6, hy + 7, 1, 1);
      ctx.fillRect(hx + 3, hy + 8, 3, 1);
    }
  }

  // 2. Insignia de Quesos del Nivel (Sprite Pixel Art)
  drawPixelCheeseIcon(ctx, cheeseIconX, hudY + 5);
  ctx.textAlign = 'left';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(cheeseText, cheeseTextX, hudY + 14);

  // 3. Insignia de Flores / Lirios
  drawPixelLilyIcon(ctx, flowerIconX, hudY + 5);
  ctx.textAlign = 'left';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillStyle = '#ffcad4';
  ctx.fillText(flowerText, flowerTextX, hudY + 14);

  // 4. Botón Zonas / Mapa
  drawRoundedPanel(warpBtn.x, warpBtn.y, warpBtn.w, warpBtn.h, 5, '#5a0c25', '#b31b52', 1.1);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('✦ ZONAS', Math.round(warpBtn.x + warpBtn.w / 2), warpBtn.y + 11);
  ctx.textAlign = 'left';
  hudPhaseButtons.push(warpBtn);
}


// --- MODULO: src/ui/hud/boss.js ---
// ============================================================================
// HUD: BARRAS DE JEFE Y PUZZLES (OMNI-MAN Y HOMELANDER)
// ============================================================================
function drawHUDBosses() {
  // 1. Barra de Jefe de Omni-Man (Solo activa en el interior del Castillo)
  if (omniMen.length > 0 && bossFightActive) {
    const boss = omniMen[0];
    const bw = 140;
    const bx = Math.round(W / 2 - bw / 2);
    const by = 28;
    drawRoundedPanel(bx, by, bw, 18, 6, 'rgba(18, 6, 22, 0.95)', boss.isEnraged ? '#ff0055' : '#b31b52', 1.2);

    ctx.fillStyle = boss.isEnraged ? '#ff758f' : '#ffffff';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText('OMNI-MAN', W / 2, by + 7);
    ctx.textAlign = 'left';

    const segW = Math.floor((bw - 20) / boss.maxHp) - 2;
    for (let i = 0; i < boss.maxHp; i++) {
      ctx.fillStyle = i < boss.hp ? (boss.isEnraged ? '#ff0055' : '#b31b52') : '#261432';
      ctx.fillRect(bx + 10 + i * (segW + 2), by + 10, segW, 4);
    }
  }

  // 2. Indicador de Secuencia de Gemas en la Fase 3 del Nivel 1
  if (level.id === 1 && colorPads.length > 0 && player.x >= 3700) {
    const isSolved = homelanderPuzzle && homelanderPuzzle.solved;
    if (!isSolved) {
      const curIdx = homelanderPuzzle ? homelanderPuzzle.currentIndex : 0;
      const seq = (homelanderPuzzle && homelanderPuzzle.sequence) ? homelanderPuzzle.sequence : [0, 1, 2, 3, 4, 5, 6];
      const bw = 150;
      const bx = Math.round(W / 2 - bw / 2);
      const by = 28;

      drawRoundedPanel(bx, by, bw, 18, 6, 'rgba(18, 6, 22, 0.95)', '#b31b52', 1.2);

      const gemSpacing = 18;
      const startX = W / 2 - (seq.length - 1) * (gemSpacing / 2);
      for (let i = 0; i < seq.length; i++) {
        const padId = seq[i];
        const p = colorPads.find(cp => cp.id === padId) || colorPads[i] || { hex: '#ffd166' };
        const gx = Math.round(startX + i * gemSpacing);
        const gy = by + 9;
        const isCurrent = (i === curIdx);
        const isDone = (i < curIdx);

        if (isCurrent) {
          const pulse = Math.sin(globalFrame * 0.25) * 1.5;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(gx - 6 - pulse, gy - 5 - pulse, 12 + pulse * 2, 10 + pulse * 2);
        }

        ctx.fillStyle = isDone ? p.hex : (isCurrent ? p.hex : '#261432');
        ctx.fillRect(gx - 5, gy - 4, 10, 8);
        ctx.strokeStyle = isDone ? '#ffffff' : (isCurrent ? '#ffffff' : (p.hex || '#555'));
        ctx.lineWidth = 1;
        ctx.strokeRect(gx - 5, gy - 4, 10, 8);

        if (isDone) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold 6px ${UI_FONT}`;
          ctx.textAlign = 'center';
          ctx.fillText('✓', gx, gy + 3);
        }
      }
      ctx.textAlign = 'left';
    }
  }

  // 3. Barra de Jefe del Kraken de las Profundidades (Mundo 3 Fase 5)
  const kraken = typeof krakenBossState !== 'undefined' ? (window.krakenBossState || krakenBossState) : null;
  if (kraken && kraken.active) {
    const bw = 184;
    const bx = Math.round(W / 2 - bw / 2);
    const by = 30;
    const phaseNames = ['DESPERTAR', 'FURIA ABISAL', 'CATACLISMO TOTAL'];
    const pColor = kraken.phase === 3 ? '#ff0054' : (kraken.phase === 2 ? '#00f5d4' : '#ffd166');
    const borderColor = kraken.phase === 3 ? '#ff0054' : (kraken.phase === 2 ? '#00f5d4' : '#00b4d8');

    drawRoundedPanel(bx, by, bw, 25, 6, 'rgba(3, 7, 30, 0.94)', borderColor, 1.4);

    ctx.save();
    ctx.textBaseline = 'top';
    ctx.fillStyle = pColor;
    ctx.font = `bold 6.5px ${UI_FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(`KRAKEN ABISAL - FASE ${kraken.phase}: ${phaseNames[kraken.phase - 1]}`, W / 2, by + 4);

    // 8 Indicadores de ojos del Kraken
    const eyeSpacing = 17;
    const startX = W / 2 - (kraken.maxEyes - 1) * (eyeSpacing / 2);
    for (let i = 0; i < kraken.maxEyes; i++) {
      const isAlive = i < kraken.eyesRemaining;
      const ex = Math.round(startX + i * eyeSpacing);
      const ey = by + 16;

      ctx.fillStyle = isAlive ? '#000814' : '#0a1128';
      ctx.fillRect(ex - 5, ey - 4, 10, 7);
      ctx.strokeStyle = isAlive ? (kraken.phase === 3 ? '#ff0054' : '#00f5d4') : '#343a40';
      ctx.lineWidth = 1;
      ctx.strokeRect(ex - 5, ey - 4, 10, 7);

      if (isAlive) {
        ctx.fillStyle = kraken.phase === 3 ? '#ffbe0b' : '#ffd166';
        ctx.fillRect(ex - 4, ey - 3, 8, 5);
        ctx.fillStyle = kraken.phase === 3 ? '#ff0054' : '#00b4d8';
        ctx.fillRect(ex - 1, ey - 2, 2, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ex - 3, ey - 3, 1, 1);
      } else {
        ctx.fillStyle = '#1c2541';
        ctx.fillRect(ex - 3, ey - 1, 6, 1);
      }
    }
    ctx.restore();
  }

  // 4. Barra de Jefe del Gran Yeti (Mundo 4 • Fase 6)
  if (typeof yetiBossState !== 'undefined' && yetiBossState && yetiBossState.active && !yetiBossState.isDefeated) {
    const bw = 160;
    const bx = Math.round(W / 2 - bw / 2);
    const by = 28;
    const isEnraged = yetiBossState.hp <= 2;
    drawRoundedPanel(bx, by, bw, 18, 6, 'rgba(15, 23, 42, 0.95)', isEnraged ? '#ef4444' : '#0284c7', 1.2);

    ctx.save();
    ctx.fillStyle = isEnraged ? '#fca5a5' : '#e0f2fe';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(isEnraged ? 'GRAN YETI: FURIA ARTICA' : 'EL GRAN YETI DE CRISTAL', W / 2, by + 7);
    ctx.textAlign = 'left';

    const segW = Math.floor((bw - 20) / yetiBossState.maxHp) - 2;
    for (let i = 0; i < yetiBossState.maxHp; i++) {
      ctx.fillStyle = i < yetiBossState.hp ? (isEnraged ? '#ef4444' : '#38bdf8') : '#1e293b';
      ctx.fillRect(bx + 10 + i * (segW + 2), by + 10, segW, 4);
    }
    ctx.restore();
  }

  // 5. Barra de Jefe del Dragón Astral de Polaris (Mundo 4 • Fase 9)
  if (typeof astralBossState !== 'undefined' && astralBossState && astralBossState.active && !astralBossState.isDefeated) {
    const bw = 154;
    const bx = Math.round(W / 2 - bw / 2);
    const by = 34;
    const isEnraged = astralBossState.hp <= 3;
    drawRoundedPanel(bx, by, bw, 18, 6, 'rgba(8, 4, 22, 0.95)', isEnraged ? '#ff007f' : '#ffd166', 1.3);

    ctx.save();
    ctx.fillStyle = isEnraged ? '#ff758f' : '#fff3b0';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.textAlign = 'center';
    ctx.fillText(isEnraged ? 'DRAGON ASTRAL: HIPERNOVA' : 'EL DRAGON ASTRAL DE POLARIS', W / 2, by + 7);
    ctx.textAlign = 'left';

    const segW = Math.floor((bw - 20) / astralBossState.maxHp) - 2;
    for (let i = 0; i < astralBossState.maxHp; i++) {
      ctx.fillStyle = i < astralBossState.hp ? (isEnraged ? '#ff007f' : '#00f5d4') : '#1e1b4b';
      ctx.fillRect(bx + 10 + i * (segW + 2), by + 10, segW, 4);
    }
    ctx.restore();
  }
}


// --- MODULO: src/ui/hud/index.js ---
// ============================================================================
// HUD: ORQUESTADOR PRINCIPAL
// ============================================================================
function drawTutorialSigns() {
  // Desactivado: los carteles flotantes tapaban la pantalla
}

function drawHUD() {
  hudPhaseButtons = [];
  drawHUDStatus();
  drawHUDBosses();
  drawGamepadHUDPrompt();
  if (typeof drawSamiQuestHUD === 'function') {
    drawSamiQuestHUD(ctx);
  }
  if (typeof drawKaiQuestHUD === 'function') {
    drawKaiQuestHUD(ctx);
  }
  if (typeof drawEarthquakePreludeBanner === 'function') {
    drawEarthquakePreludeBanner(ctx);
  }
  if (typeof drawRaulFrogHUD === 'function') {
    drawRaulFrogHUD(ctx);
  }
  if (typeof drawShovelHUD === 'function') {
    drawShovelHUD(ctx, 10, 34);
  }
  if (typeof drawIcePickHUD === 'function') {
    drawIcePickHUD(ctx, 10, 34);
  }
}


// --- MODULO: src/ui/dialogue.js ---
// ============================================================================
// CAJA DE DIÁLOGOS (HISTORIA, NPCS Y OPCIONES INTERACTIVAS)
// ============================================================================
let dialogueChoiceIndex = 0;
let dialogueChoiceButtons = [];

function selectDialogueChoice(idx) {
  const currentLine = activeDialogueList && activeDialogueList[dialogueIndex];
  if (!currentLine || !currentLine.choices || !currentLine.choices[idx]) return;
  const choice = currentLine.choices[idx];
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
  if (typeof currentLine.onChoice === 'function') {
    currentLine.onChoice(idx, choice);
  }
}

function drawDialogueBox() {
  const currentLine = activeDialogueList[dialogueIndex];
  if (!currentLine) return;

  const hasChoices = currentLine.choices && currentLine.choices.length > 0 && dialogueCharIndex >= currentLine.text.length;
  const boxX = 30;
  const boxY = 24;
  const boxW = W - 60;
  const boxH = hasChoices ? 84 : 72;

  drawRoundedPanel(boxX, boxY, boxW, boxH, 10, 'rgba(18, 5, 22, 0.96)', '#b31b52', 1.8);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `bold 9.5px ${UI_FONT}`;
  ctx.fillText(currentLine.speaker + ':', boxX + 12, boxY + 18);

  const visibleText = currentLine.text.slice(0, dialogueCharIndex);
  ctx.fillStyle = '#ffffff';
  ctx.font = `8.5px ${UI_FONT}`;
  wrapText(ctx, visibleText, boxX + 12, boxY + 34, boxW - 24, 13);

  dialogueChoiceButtons = [];

  if (hasChoices) {
    const choices = currentLine.choices;
    const btnW = Math.floor((boxW - 24 - (choices.length - 1) * 6) / choices.length);
    const btnH = 20;
    const btnY = boxY + boxH - 26;

    for (let i = 0; i < choices.length; i++) {
      const btnX = boxX + 12 + i * (btnW + 6);
      const isSelected = (dialogueChoiceIndex === i);
      dialogueChoiceButtons.push({ x: btnX, y: btnY, w: btnW, h: btnH, index: i });

      drawRoundedPanel(
        btnX, btnY, btnW, btnH, 6,
        isSelected ? '#8f143c' : 'rgba(10, 3, 14, 0.92)',
        isSelected ? '#ffffff' : '#b31b52',
        isSelected ? 1.8 : 1.0
      );

      ctx.textAlign = 'center';
      ctx.fillStyle = isSelected ? '#ffffff' : '#ffcad4';
      ctx.font = `bold 6.5px ${UI_FONT}`;
      ctx.fillText(`${i + 1}. ${choices[i].text}`, btnX + btnW / 2, btnY + 13);
    }
    ctx.textAlign = 'left';
  } else if (Math.floor(globalFrame / 20) % 2 === 0) {
    ctx.fillStyle = '#ffcad4';
    ctx.font = `bold 7.5px ${UI_FONT}`;
    const skipLabel = gamepadConnected ? '[A] SIGUIENTE ▶' : '[SALTAR ▶]';
    ctx.fillText(skipLabel, boxX + boxW - 84, boxY + boxH - 8);
  }
}


// --- MODULO: src/scenes/title.js ---
// ============================================================================
// 1. PANTALLA PRINCIPAL: ESTILO UNIFICADO (NEGRO, BLANCO Y ROSADO OSCURO)
// ============================================================================
function drawTitleScreen() {
  menuButtons = [];

  // Fondo cielo cósmico obsidiana profundo
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#07020a');
  skyGrad.addColorStop(0.55, '#160618');
  skyGrad.addColorStop(1, '#09030c');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Estrellas titilantes en blanco y rosado suave
  for (let i = 0; i < 14; i++) {
    const sx = 30 + ((i * 47) % (W - 60));
    const sy = 18 + ((i * 31) % 170);
    const pulse = 2 + Math.sin(globalFrame * 0.06 + i) * 1.5;
    drawSparkleStar(sx, sy, pulse, i % 2 === 0 ? '#ffffff' : '#ff8fab');
  }

  // Emblema Superior Redondeado en Obsidiana con Borde Rosado Oscuro
  drawRoundedPanel(44, 12, W - 88, 48, 12, 'rgba(18, 6, 22, 0.96)', '#b31b52', 2);
  drawSparkleStar(68, 30, 5, '#ffffff');
  drawSparkleStar(W - 68, 30, 5, '#ffffff');

  // Título Nítido en Blanco Puro
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 13px ${UI_FONT}`;
  ctx.fillText('EL GRAN ESCAPE DE ELIZABETH', W / 2, 33);

  // Pastilla de recursos unificada con Sprites Pixel Art (Cero Emojis)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7.5px ${UI_FONT}`;

  const rx1 = Math.round(W / 2 - 155);
  drawPixelCheeseIcon(ctx, rx1, 42);
  ctx.fillText(`${saveState.bankCheeses} Quesos`, rx1 + 15, 49);

  ctx.fillStyle = '#ffcad4';
  ctx.fillText('✦', rx1 + 95, 49);

  const rx2 = Math.round(W / 2 - 45);
  drawPixelLilyIcon(ctx, rx2, 42);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${saveState.dexterLilies || 0} Flores`, rx2 + 14, 49);

  ctx.fillStyle = '#ffcad4';
  ctx.fillText('✦', rx2 + 95, 49);

  const rx3 = Math.round(W / 2 + 65);
  drawPixelBabyMouseIcon(ctx, rx3, 42);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${saveState.rescuedBabies.length}/7 Hijos`, rx3 + 14, 49);

  // Escenario central despejado: Altar de Obsidiana/Cuarzo Rosa con Elizabeth y Portal
  drawCrystalWarpPad(W / 2, 156, 56, 13, 'rgba(217, 37, 104, 0.32)');
  window.sprites.drawPortal(ctx, W / 2 + 30, 132, globalFrame, 0.72);
  window.sprites.drawMamaMouse(ctx, W / 2 - 26, 126, 'idle', globalFrame * 0.08, true, 1.35, 1.35, 0, false, saveState.equippedSkin);

  // Los 3 Botones Principales Unificados en Negro, Blanco y Rosado Oscuro
  const mainBtns = [
    {
      idx: 0,
      title: '★ MUNDOS',
      sub: 'Elegir Mundo y Zona',
      x: 28, y: 192, w: 132, h: 54,
      action: () => {
        window.sfx.playJump(false);
        openWorldMap(currentLevelIndex);
      }
    },
    {
      idx: 1,
      title: '★ MADRIGUERA',
      sub: `Hijos (${saveState.rescuedBabies.length}/7)`,
      x: 174, y: 192, w: 132, h: 54,
      action: () => {
        window.sfx.playJump(false);
        if (saveState.rescuedBabies.length === 0) saveState.rescuedBabies.push(1);
        enterSafeHouse(window.LEVELS[0].babyMouse);
      }
    },
    {
      idx: 2,
      title: '★ TIENDA SKINS',
      sub: '5 Tipos & Evolución',
      x: 320, y: 192, w: 132, h: 54,
      action: () => {
        window.sfx.playJump(false);
        shopTab = 'skins';
        previousShopState = 'TITLE';
        gameState = 'SHOP';
      }
    }
  ];

  for (let i = 0; i < mainBtns.length; i++) {
    const b = mainBtns[i];
    const isSelected = selectedMenuIndex === i;

    // Sombra 3D en negro obsidiana
    drawRoundedPanel(b.x, b.y + 2, b.w, b.h, 12, '#08020a', null);

    // Superficie frontal: Rosado oscuro si está seleccionado, obsidiana profundo si está inactivo
    const fill = isSelected ? '#8f143c' : 'rgba(20, 7, 24, 0.94)';
    const border = isSelected ? '#ffffff' : '#b31b52';
    const borderWidth = isSelected ? 2.2 : 1.4;
    drawRoundedPanel(b.x, b.y, b.w, b.h - 1, 12, fill, border, borderWidth);

    // Halo sutil de selección
    if (isSelected) {
      ctx.strokeStyle = 'rgba(255, 117, 160, 0.45)';
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x - 3, b.y - 3, b.w + 6, b.h + 4);
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 10px ${UI_FONT}`;
    ctx.fillText(b.title, Math.round(b.x + b.w / 2), b.y + 24);

    ctx.fillStyle = isSelected ? '#ffe5ec' : '#d4a5b8';
    ctx.font = `7px ${UI_FONT}`;
    ctx.fillText(b.sub, Math.round(b.x + b.w / 2), b.y + 40);

    menuButtons.push(b);
  }
  ctx.textAlign = 'left';
}



// --- MODULO: src/scenes/worldmap/particles.js ---
// ============================================================================
// PARTÍCULAS AMBIENTALES DEL MAPA DE MUNDOS (ESTRELLAS, LUCIÉRNAGAS, SAKURAS)
// ============================================================================
const bgStars = Array.from({ length: 55 }, (_, i) => ({
  x: (i * 89) % 960,
  y: (i * 41) % 165,
  size: i % 4 === 0 ? 2 : 1,
  speed: i % 2 === 0 ? 0.08 : 0.16,
  phase: i * 0.7
}));

const fireflies = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 115) % 3780,
  y: (i * 67) % 1740,
  phase: i * 1.3
}));

const sakuraPetals = Array.from({ length: 56 }, (_, i) => ({
  x: (i * 33) % 1820,
  y: 15 + (i * 23) % 210,
  speedX: 0.38 + (i % 5) * 0.12,
  speedY: 0.22 + (i % 4) * 0.08,
  swingSpeed: 0.045 + (i % 6) * 0.012,
  phase: i * 0.85,
  size: (i % 4 === 0) ? 3 : 2,
  color: (i % 4 === 0) ? '#ffffff' : ((i % 4 === 1) ? '#ffb3c6' : ((i % 4 === 2) ? '#ff8fab' : '#ffe5ec'))
}));


// --- MODULO: src/scenes/worldmap/planets.js ---
// ============================================================================
// MAPA GALÁCTICO: RENDERIZADO DEL SISTEMA PLANETARIO Y NAVEGACIÓN
// ============================================================================
function drawWorldMapPlanets() {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 34, W, 76);
  ctx.clip();
  ctx.translate(-Math.round(worldMapScrollX), 0);

  // Línea estelar que conecta los planetas
  ctx.strokeStyle = 'rgba(217, 37, 104, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i < WORLDS_CONFIG.length; i++) {
    if (i === 0) ctx.moveTo(WORLDS_CONFIG[i].x, WORLDS_CONFIG[i].y);
    else ctx.lineTo(WORLDS_CONFIG[i].x, WORLDS_CONFIG[i].y);
  }
  ctx.stroke();

  ctx.strokeStyle = '#ff8fab';
  ctx.lineWidth = 1.6;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Dibujar cada planeta
  for (const w of WORLDS_CONFIG) {
    const isSelected = selectedWorldIndex === w.idx;
    const r = isSelected ? 19 : 14;

    if (isSelected) {
      const pulse = Math.sin(globalFrame * 0.12) * 1.8;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(w.x, w.y, r + 5 + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 117, 160, 0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(w.x, w.y, r + 9 + pulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    const pGrad = ctx.createRadialGradient(w.x - r * 0.32, w.y - r * 0.32, 1, w.x, w.y, r);
    if (w.unlocked) {
      pGrad.addColorStop(0, '#ffffff');
      pGrad.addColorStop(0.35, w.ring);
      pGrad.addColorStop(1, w.color);
    } else {
      pGrad.addColorStop(0, '#381022');
      pGrad.addColorStop(0.55, '#1a0612');
      pGrad.addColorStop(1, '#0a0208');
    }
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.arc(w.x, w.y, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = isSelected ? '#ffffff' : (w.unlocked ? w.ring : '#5a1028');
    ctx.lineWidth = isSelected ? 2.2 : 1.2;
    ctx.stroke();

    ctx.strokeStyle = w.unlocked ? w.ring : '#4d0d22';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(w.x, w.y, r + 6, 4, -0.28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = 'center';
    if (w.unlocked) drawSparkleStar(w.x, w.y, isSelected ? 6 : 4, '#ffffff');
    else drawPixelLockIcon(ctx, w.x, w.y);

    ctx.fillStyle = isSelected ? '#ffffff' : (w.unlocked ? '#ffcad4' : '#8a6275');
    ctx.font = isSelected ? `bold 8px ${UI_FONT}` : `7px ${UI_FONT}`;
    ctx.fillText(w.name, w.x, w.y + r + 13);
  }
  ctx.restore();

  // Hitboxes interactivas para clic en cada planeta
  for (const w of WORLDS_CONFIG) {
    const screenX = Math.round(w.x - worldMapScrollX);
    if (screenX >= -30 && screenX <= W + 30) {
      menuButtons.push({
        x: screenX - 22, y: w.y - 22, w: 44, h: 46,
        action: () => { window.sfx.playJump(false); selectedWorldIndex = w.idx; selectedZoneCpId = null; }
      });
    }
  }

  // Flechas de navegación fijas
  if (selectedWorldIndex > 0) {
    const arrowL = { x: 6, y: 56, w: 22, h: 28 };
    drawRoundedPanel(arrowL.x, arrowL.y, arrowL.w, arrowL.h, 6, 'rgba(28, 8, 22, 0.94)', '#b31b52', 1.4);
    ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff'; ctx.font = `bold 11px ${UI_FONT}`;
    ctx.fillText('<', Math.round(arrowL.x + arrowL.w / 2), arrowL.y + 18);
    menuButtons.push({
      x: arrowL.x - 2, y: arrowL.y - 2, w: arrowL.w + 6, h: arrowL.h + 4,
      action: () => { if (selectedWorldIndex > 0) { window.sfx.playJump(false); selectedWorldIndex--; selectedZoneCpId = null; } }
    });
  }

  if (selectedWorldIndex < WORLDS_CONFIG.length - 1) {
    const arrowR = { x: W - 28, y: 56, w: 22, h: 28 };
    drawRoundedPanel(arrowR.x, arrowR.y, arrowR.w, arrowR.h, 6, 'rgba(28, 8, 22, 0.94)', '#b31b52', 1.4);
    ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff'; ctx.font = `bold 11px ${UI_FONT}`;
    ctx.fillText('>', Math.round(arrowR.x + arrowR.w / 2), arrowR.y + 18);
    menuButtons.push({
      x: arrowR.x - 4, y: arrowR.y - 2, w: arrowR.w + 6, h: arrowR.h + 4,
      action: () => { if (selectedWorldIndex < WORLDS_CONFIG.length - 1) { window.sfx.playJump(false); selectedWorldIndex++; selectedZoneCpId = null; } }
    });
  }
}


// --- MODULO: src/scenes/worldmap/card_locked.js ---
// ============================================================================
// MAPA GALACTICO: TARJETA DE MUNDOS BLOQUEADOS
// ============================================================================
function drawLockedWorldMapCard(curWorld, cardX, cardY, cardW) {
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 11px ${UI_FONT}`;
  ctx.fillText(`* ${curWorld.name}: ${curWorld.title}`, cardX + 14, cardY + 20);

  // Insignia Bloqueado
  const lkBadgeW = 96;
  const lkBadgeX = cardX + cardW - lkBadgeW - 10;
  drawRoundedPanel(lkBadgeX, cardY + 7, lkBadgeW, 20, 8, 'rgba(42, 8, 22, 0.92)', '#ff75a0', 1.2);
  drawPixelLockIcon(ctx, lkBadgeX + 10, cardY + 17);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ff75a0';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('BLOQUEADO', lkBadgeX + 22, cardY + 20);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#f3e8ee';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(curWorld.desc, cardX + 14, cardY + 35);

  const tags = [
    { label: 'NUEVAS MECANICAS' },
    { label: 'JEFE GUARDIAN' },
    { label: `HIJO #${curWorld.idx + 1}` }
  ];
  for (let i = 0; i < tags.length; i++) {
    const tx = cardX + 14 + i * 140;
    const ty = cardY + 44;
    drawRoundedPanel(tx, ty, 132, 22, 6, 'rgba(14, 4, 18, 0.88)', '#b31b52', 1);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.fillText(tags[i].label, Math.round(tx + 66), ty + 15);
  }

  // Panel de Mision Principal
  drawRoundedPanel(cardX + 14, cardY + 72, cardW - 28, 26, 6, 'rgba(14, 4, 18, 0.88)', '#6e1034', 1);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ff9ebb';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('MISION:', cardX + 22, cardY + 88);
  ctx.fillStyle = '#ffffff';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(curWorld.objective, cardX + 70, cardY + 88);

  // Boton de Portal Inactivo
  const lockedBtn = {
    x: cardX + 40,
    y: cardY + 106,
    w: cardW - 80,
    h: 32,
    action: () => {
      if (window.sfx && window.sfx.playHit) window.sfx.playHit();
      shakeTime = 0.2;
      shakeMagnitude = 3;
    }
  };
  drawRoundedPanel(lockedBtn.x, lockedBtn.y, lockedBtn.w, lockedBtn.h, 10, 'rgba(42, 8, 22, 0.85)', '#b31b52', 1.6);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffccd5';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText(`COMPLETA EL MUNDO ${curWorld.idx} PARA DESBLOQUEAR ESTE WARP PAD`, Math.round(lockedBtn.x + lockedBtn.w / 2), lockedBtn.y + 20);
  menuButtons.push(lockedBtn);
}


// --- MODULO: src/scenes/worldmap/card.js ---
// ============================================================================
// MAPA GALACTICO: TARJETA DE DETALLES DEL MUNDO Y SELECTOR DE ZONAS
// ============================================================================
function drawWorldMapCard(curWorld) {
  const cardX = 20;
  const cardY = 112;
  const cardW = W - 40;
  const cardH = 148;
  const isVolcanoWorld = selectedWorldIndex === 1;
  const isCoastalWorld = selectedWorldIndex === 2;
  const isSnowWorld = selectedWorldIndex === 3;

  drawRoundedPanel(cardX, cardY, cardW, cardH, 14, 'rgba(18, 6, 22, 0.96)', '#b31b52', 2);

  if (!curWorld.unlocked) {
    drawLockedWorldMapCard(curWorld, cardX, cardY, cardW);
    ctx.textAlign = 'left';
    return;
  }

  const rawLvl = (window.LEVELS && window.LEVELS[selectedWorldIndex]) || (window.LEVELS && window.LEVELS[0]) || { id: 1, cheeses: [] };
  const savedCheeses = (saveState.collectedCheeseIds && saveState.collectedCheeseIds[rawLvl.id])
    ? saveState.collectedCheeseIds[rawLvl.id].length : 0;
  const totalCheeses = rawLvl.cheeses ? rawLvl.cheeses.length : 0;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = curWorld.title.length > 28 ? `bold 6.5px ${UI_FONT}` : `bold 8.5px ${UI_FONT}`;
  ctx.fillText(`* ${curWorld.name}: ${curWorld.title}`, cardX + 14, cardY + 20);

  const badgeW = 104;
  const badgeX = cardX + cardW - badgeW - 10;
  drawRoundedPanel(badgeX, cardY + 7, badgeW, 20, 7, 'rgba(10, 3, 12, 0.92)', '#b31b52', 1.2);
  drawPixelCheeseIcon(ctx, badgeX + 7, cardY + 12);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(`${savedCheeses}/${totalCheeses} Quesos`, badgeX + 22, cardY + 20);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#f3e8ee';
  ctx.font = `6px ${UI_FONT}`;
  const subText = rawLvl.subtitle || curWorld.desc;
  ctx.fillText(subText, cardX + 14, cardY + 34);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('ZONAS DE TELETRANSPORTE:', cardX + 14, cardY + 47);

  let zones = [];
  if (isSnowWorld) {
    zones = [
      { label: 'F1: BASE', sub: 'Campamento 1', cpId: null },
      { label: 'F2: KHUMBU', sub: 'Cascada Hielo', cpId: 19 },
      { label: 'F3: NAMCHE', sub: 'Aldea Nevada', cpId: 23 },
      { label: 'F4: GOKYO', sub: 'Lagos Sagrados', cpId: 30 },
      { label: 'F5: EVEREST', sub: 'La Gran Cima', cpId: 37 },
      { label: 'F6: YETI', sub: 'Santuario', cpId: 41 },
      { label: 'F7: SHAMBHALA', sub: 'Pagoda', cpId: 42 },
      { label: 'F8: KAILASH', sub: 'Agartha', cpId: 44 },
      { label: 'F9: COSMOS', sub: 'Vía Láctea', cpId: 46 },
      { label: 'F9: POLARIS', sub: 'Sanctum', cpId: 48 }
    ];
  } else if (isCoastalWorld) {
    zones = [
      { label: 'F1: CIUDAD', sub: 'Inicio', cpId: null },
      { label: 'F2: PLAYA', sub: 'Surf', cpId: 5 },
      { label: 'F3: RESORT', sub: 'Helados', cpId: 9 },
      { label: 'CP: AZOTEA', sub: 'Oficinas', cpId: 13 },
      { label: 'F4: CIUDAD', sub: 'Objetivo', cpId: 14 }
    ];
  } else if (isVolcanoWorld) {
    zones = [
      { label: 'F1: VILLA', sub: 'Inicio', cpId: null },
      { label: 'CP1: ESTE', sub: 'Basalto', cpId: 1 },
      { label: 'F2: CIAN', sub: 'Cristal', cpId: 2 },
      { label: 'F3: FORJA', sub: 'Hornos', cpId: 3 },
      { label: 'F4: BOSS', sub: 'Castillo', cpId: 4 }
    ];
  } else {
    zones = [
      { label: 'F1: TREBOL', sub: 'Aldea Cerezos', cpId: null },
      { label: 'F2: LOTO', sub: 'Estanque Cristal', cpId: 1 },
      { label: 'F3: ROSAS', sub: 'Jardin Real', cpId: 2 }
    ];
  }

  const hasGrid = zones.length > 5;
  const cols = hasGrid ? 5 : zones.length;
  const zw = hasGrid ? 76 : (zones.length <= 3 ? 132 : 78);
  const zh = hasGrid ? 24 : 38;
  const gapX = hasGrid ? 6 : (zones.length <= 3 ? 8 : 5);
  const gapY = 4;

  for (let i = 0; i < zones.length; i++) {
    const z = zones[i];
    const col = hasGrid ? (i % cols) : i;
    const row = hasGrid ? Math.floor(i / cols) : 0;
    const zx = cardX + 16 + col * (zw + gapX);
    const zy = cardY + 50 + row * (zh + gapY);
    const active = selectedZoneCpId === z.cpId;

    drawRoundedPanel(zx, zy, zw, zh, hasGrid ? 6 : 9,
      active ? '#8f143c' : 'rgba(12, 4, 16, 0.94)',
      active ? '#ffffff' : '#b31b52',
      active ? 2.0 : 1.2
    );

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = hasGrid ? (z.label.length > 10 ? `bold 5.5px ${UI_FONT}` : `bold 6.2px ${UI_FONT}`) : `bold 7px ${UI_FONT}`;
    ctx.fillText(z.label, Math.round(zx + zw / 2), zy + (hasGrid ? 10 : 15));

    ctx.fillStyle = active ? '#ffe5ec' : '#d4a5b8';
    ctx.font = hasGrid ? (z.sub.length > 11 ? `4.8px ${UI_FONT}` : `5.4px ${UI_FONT}`) : `6px ${UI_FONT}`;
    ctx.fillText(z.sub, Math.round(zx + zw / 2), zy + (hasGrid ? 19 : 27));

    menuButtons.push({
      x: zx, y: zy, w: zw, h: zh,
      action: () => {
        selectedZoneCpId = z.cpId;
        jumpToLevelPhase(selectedWorldIndex, z.cpId);
      }
    });
  }

  const playBtnY = hasGrid ? cardY + 108 : cardY + 104;
  const playBtnH = hasGrid ? 28 : 34;
  const playBtn = {
    x: cardX + 60, y: playBtnY, w: cardW - 120, h: playBtnH,
    action: () => { jumpToLevelPhase(selectedWorldIndex, selectedZoneCpId); }
  };
  drawRoundedPanel(playBtn.x, playBtn.y, playBtn.w, playBtn.h, 10, '#8f143c', '#ffffff', 2);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${hasGrid ? '9px' : '10px'} ${UI_FONT}`;
  ctx.fillText('< TELETRANSPORTAR AL MUNDO >', Math.round(playBtn.x + playBtn.w / 2), playBtn.y + (hasGrid ? 18 : 22));
  menuButtons.push(playBtn);
  ctx.textAlign = 'left';
}


// --- MODULO: src/scenes/worldmap/index.js ---
// ============================================================================
// MAPA GALÁCTICO: CONTROLADOR PRINCIPAL Y NAVEGACIÓN ENTRE MUNDOS
// ============================================================================
let menuButtons = [];
let hudPhaseButtons = [];
let selectedWorldIndex = 0;
let selectedZoneCpId = null;
let worldMapScrollX = 0;
let targetWorldMapScrollX = 0;
let worldMapNavCooldown = 0;
let worldMapDrag = { active: false, startX: 0, startScroll: 0, hasMoved: false };

function getWorldMapScrollTarget(idx) {
  const w = WORLDS_CONFIG[idx] || WORLDS_CONFIG[0];
  const maxScroll = Math.max(0, WORLDS_CONFIG[WORLDS_CONFIG.length - 1].x - (W - 80));
  return Math.max(0, Math.min(maxScroll, w.x - W / 2));
}

function openWorldMap(worldIdx = selectedWorldIndex) {
  gameState = 'WORLD_MAP';
  selectedWorldIndex = Math.max(0, Math.min(WORLDS_CONFIG.length - 1, worldIdx));
  targetWorldMapScrollX = getWorldMapScrollTarget(selectedWorldIndex);
  worldMapScrollX = targetWorldMapScrollX;
  selectedZoneCpId = null;
}

function jumpToLevelPhase(levelIdx, checkpointId) {
  const targetRaw = window.LEVELS[levelIdx] || window.LEVELS[0];
  if (!saveState.activeCheckpoints) saveState.activeCheckpoints = {};

  if (!checkpointId || checkpointId === 0) {
    delete saveState.activeCheckpoints[targetRaw.id];
  } else {
    const cp = (targetRaw.checkpoints || []).find(c => c.id === checkpointId);
    if (cp) {
      saveState.activeCheckpoints[targetRaw.id] = {
        id: cp.id,
        x: cp.x,
        y: cp.y,
        name: cp.name
      };
    }
  }
  persistSave();
  loadLevel(levelIdx);
  gameState = 'PLAYING';
  window.sfx.init();
  if (typeof startPortalArrival === 'function') {
    startPortalArrival();
  } else {
    window.sfx.playCheckpoint();
  }
}

function drawWorldMapScreen() {
  menuButtons = [];

  // Fondo estelar profundo en negro obsidiana
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#07020a');
  bgGrad.addColorStop(0.55, '#160618');
  bgGrad.addColorStop(1, '#09030c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Estrellas de fondo con sutil paralaje
  ctx.save();
  ctx.translate(-Math.round(worldMapScrollX * 0.25), 0);
  for (let i = 0; i < 24; i++) {
    const sx = 20 + ((i * 67 + 15) % 850);
    const sy = 12 + ((i * 29 + 8) % 95);
    drawSparkleStar(sx, sy, (i % 2) + 1.2, i % 2 === 0 ? '#ffffff' : '#ff8fab');
  }
  ctx.restore();

  // Barra Superior del Mapa de Mundos + Botón Volver + Acceso a Tienda
  drawRoundedPanel(16, 6, W - 32, 26, 8, 'rgba(20, 7, 24, 0.96)', '#b31b52', 1.5);
  const curWorld = WORLDS_CONFIG[selectedWorldIndex] || WORLDS_CONFIG[0];

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  const titleText = `MUNDO ${selectedWorldIndex + 1}: ${(curWorld.title || curWorld.name).toUpperCase()}`;
  ctx.font = titleText.length > 24 ? `bold 7px ${UI_FONT}` : `bold 9px ${UI_FONT}`;
  ctx.fillText(titleText, Math.round(W / 2 + 20), 22);

  const backBtn = {
    x: 22, y: 8, w: 66, h: 22,
    action: () => { window.sfx.playJump(false); gameState = 'TITLE'; }
  };
  drawRoundedPanel(backBtn.x, backBtn.y, backBtn.w, backBtn.h, 6, '#5a0c25', '#b31b52', 1.2);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8px ${UI_FONT}`;
  ctx.fillText('◀ INICIO', Math.round(backBtn.x + backBtn.w / 2), backBtn.y + 15);
  menuButtons.push(backBtn);


  // Renderizar planetas y tarjeta
  drawWorldMapPlanets();
  drawWorldMapCard(curWorld);

  ctx.textAlign = 'left';
}


// --- MODULO: src/scenes/shop/skills.js ---
// ============================================================================
// TIENDA: ÁRBOL DE EVOLUCIÓN (HABILIDADES CON QUESOS)
// ============================================================================
const SKILLS_TREE_CONFIG = [
  // --- TIER 1 (NIVEL 1) - Costo: 1 Queso ---
  {
    key: 'extraHeart1',
    tier: 1,
    cost: 1,
    reqSkill: null,
    title: '✦ Corazón I',
    benefit: '+1 Vida (4 Corazones)',
    col: 0, row: 0
  },
  {
    key: 'cheeseMagnet',
    tier: 1,
    cost: 1,
    reqSkill: null,
    title: '✦ Imán Dorado',
    benefit: 'Atrae quesos y flores',
    col: 1, row: 0
  },

  // --- TIER 2 (NIVEL 2) - Costo: 2 Quesos ---
  {
    key: 'fastDash',
    tier: 2,
    cost: 2,
    reqSkill: 'extraHeart1',
    title: '✦ Sombra Ígnea',
    benefit: '-30% Enfriamiento Dash',
    col: 0, row: 1
  },
  {
    key: 'featherFall',
    tier: 2,
    cost: 2,
    reqSkill: 'cheeseMagnet',
    title: '✦ Pluma Dexter',
    benefit: 'Salto grácil y planeo',
    col: 1, row: 1
  },

  // --- TIER 3 (NIVEL 3) - Costo: 3 Quesos ---
  {
    key: 'longerInvuln',
    tier: 3,
    cost: 3,
    reqSkill: 'fastDash',
    title: '✦ Resonancia',
    benefit: '+0.8s Inmunidad daño',
    col: 0, row: 2
  },
  {
    key: 'flowerHarvest',
    tier: 3,
    cost: 3,
    reqSkill: 'featherFall',
    title: '✦ Cosecha Doble',
    benefit: 'Doble flor en combate',
    col: 1, row: 2
  },

  // --- TIER 4 (NIVEL 4 - MAESTRÍA SUPREMA) - Costo: 4 Quesos ---
  {
    key: 'extraHeart2',
    tier: 4,
    cost: 4,
    reqSkill: 'longerInvuln',
    title: '✦ Bendición',
    benefit: '+2 Vidas (5 Corazones)',
    col: 0, row: 3
  }
];

function drawShopSkillsView() {
  // Conexiones verticales entre Tiers del árbol
  const connectors = [
    { colX: 22 + 38, r1: 0, r2: 1, active: !!saveState.upgrades.extraHeart1 },
    { colX: 22 + 38, r1: 1, r2: 2, active: !!saveState.upgrades.fastDash },
    { colX: 22 + 38, r1: 2, r2: 3, active: !!saveState.upgrades.longerInvuln },
    { colX: 244 + 38, r1: 0, r2: 1, active: !!saveState.upgrades.cheeseMagnet },
    { colX: 244 + 38, r1: 1, r2: 2, active: !!saveState.upgrades.featherFall },
    { colX: 244 + 38, r1: 2, r2: 3, active: !!saveState.upgrades.flowerHarvest }
  ];

  for (const c of connectors) {
    const topY = 62 + c.r1 * 46 + 40;
    const botY = 62 + c.r2 * 46;
    ctx.strokeStyle = c.active ? '#ffffff' : '#3d0a1a';
    ctx.lineWidth = c.active ? 2.2 : 1.2;
    ctx.beginPath();
    ctx.moveTo(c.colX, topY - 1);
    ctx.lineTo(c.colX, botY + 1);
    ctx.stroke();

    ctx.fillStyle = c.active ? '#ff75a0' : '#5a1028';
    ctx.beginPath();
    ctx.moveTo(c.colX - 3.5, botY - 3);
    ctx.lineTo(c.colX + 3.5, botY - 3);
    ctx.lineTo(c.colX, botY);
    ctx.closePath();
    ctx.fill();
  }

  for (const it of SKILLS_TREE_CONFIG) {
    const bx = it.col === 0 ? 22 : 244;
    const by = 62 + it.row * 46;
    const bw = 214;
    const bh = 40;

    const owned = !!saveState.upgrades[it.key];
    const reqMet = !it.reqSkill || !!saveState.upgrades[it.reqSkill];
    const canBuy = !owned && reqMet && saveState.bankCheeses >= it.cost;

    const cardFill = owned ? 'rgba(40, 10, 24, 0.88)' : (canBuy ? 'rgba(22, 6, 26, 0.94)' : 'rgba(14, 4, 18, 0.82)');
    const cardBorder = owned ? '#ff75a0' : (canBuy ? '#b31b52' : '#5a1028');
    drawRoundedPanel(bx, by, bw, bh, 8, cardFill, cardBorder, owned ? 1.6 : 1.2);

    ctx.fillStyle = owned ? '#ff75a0' : (canBuy ? '#ffffff' : '#4d0a1c');
    ctx.fillRect(bx + 4, by + 12, 3, 16);

    ctx.textAlign = 'left';
    ctx.fillStyle = owned ? '#ffffff' : (reqMet ? '#ffffff' : '#8a6275');
    ctx.font = `bold 7.5px ${UI_FONT}`;
    ctx.fillText(it.title, bx + 12, by + 13);

    ctx.fillStyle = owned ? '#ffcad4' : (reqMet ? '#f3e8ee' : '#6b4859');
    ctx.font = `6.5px ${UI_FONT}`;
    ctx.fillText(it.benefit, bx + 12, by + 24);

    ctx.fillStyle = '#ff75a0';
    ctx.font = `6px ${UI_FONT}`;
    ctx.fillText(`✦ Tier ${it.tier} (${it.cost} Quesos)`, bx + 12, by + 34);

    const btnW = 66;
    const btnH = 24;
    const btnX = bx + bw - btnW - 6;
    const btnY = by + 8;

    let btnFill = '#1c0612';
    let btnBorder = '#5a1028';
    let btnText = `COMPRAR`;
    let btnTextColor = '#8a6275';

    if (owned) {
      btnFill = '#3b0c20';
      btnBorder = '#ff75a0';
      btnText = '✓ ACTIVO';
      btnTextColor = '#ffffff';
    } else if (canBuy) {
      btnFill = '#8f143c';
      btnBorder = '#ffffff';
      btnText = `${it.cost} QUESOS`;
      btnTextColor = '#ffffff';
    } else if (!reqMet) {
      btnFill = '#12040d';
      btnBorder = '#3d0a1a';
      btnText = 'BLOQUEADO';
      btnTextColor = '#6b4859';
    } else {
      btnFill = '#240816';
      btnBorder = '#6e1034';
      btnText = `FALTA Q`;
      btnTextColor = '#d4a5b8';
    }

    drawRoundedPanel(btnX, btnY, btnW, btnH, 6, btnFill, btnBorder, canBuy ? 1.8 : 1);
    ctx.textAlign = 'center';
    ctx.fillStyle = btnTextColor;
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.fillText(btnText, Math.round(btnX + btnW / 2), btnY + 16);

    menuButtons.push({
      x: bx, y: by, w: bw, h: bh,
      action: () => {
        if (canBuy) {
          saveState.bankCheeses -= it.cost;
          saveState.upgrades[it.key] = true;
          persistSave();
          window.sfx.playBuy();
          triggerShake(0.12, 2);
          spawnParticles(bx + bw / 2, by + bh / 2, 14, '#ff75a0', 70, 40);
        } else if (owned) {
          window.sfx.playJump(false);
        } else {
          window.sfx.playHurt();
          triggerShake(0.08, 1.5);
        }
      }
    });
  }

  const mx = 244;
  const my = 62 + 3 * 46;
  const mw = 214;
  const mh = 40;
  const unlockedSkills = Object.values(saveState.upgrades).filter(Boolean).length;
  const isMasteryComplete = unlockedSkills >= 7;
  drawRoundedPanel(mx, my, mw, mh, 8, isMasteryComplete ? 'rgba(56, 12, 34, 0.94)' : 'rgba(26, 8, 30, 0.94)', isMasteryComplete ? '#ffffff' : '#b31b52', isMasteryComplete ? 2 : 1.4);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8px ${UI_FONT}`;
  ctx.fillText(isMasteryComplete ? '★ ¡MAESTRÍA TOTAL ACTIVADA!' : '★ MAESTRÍA DE EVOLUCIÓN', Math.round(mx + mw / 2), my + 15);
  ctx.fillStyle = '#ff9ebb';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(`Progreso: ${unlockedSkills}/7 Habilidades Desbloqueadas`, Math.round(mx + mw / 2), my + 28);
}


// --- MODULO: src/scenes/shop/skins.js ---
// ============================================================================
// TIENDA: BOUTIQUE DE SKINS DE ELIZABETH (5 SKINS TEMÁTICAS + CLÁSICA)
// ============================================================================
const SKINS_CONFIG = [
  {
    key: 'rick_prime',
    name: 'Rick Prime',
    subtitle: 'Científico Multiversal',
    badge: 'Rick & Morty',
    effect: '✦ Portales verdes y chispas ✦',
    cost: 100,
    unlockedByDefault: false
  },
  {
    key: 'homelander',
    name: 'Homelander',
    subtitle: 'El Patriota Supremo',
    badge: 'The Boys',
    effect: '✦ Rastro láser carmesí y oro ✦',
    cost: 200,
    unlockedByDefault: false
  },
  {
    key: 'peacemaker',
    name: 'Peacemaker',
    subtitle: 'Héroe del Casco Cromado',
    badge: 'DC Comics',
    effect: '✦ Cromo pulido y plumas de paz ✦',
    cost: 300,
    unlockedByDefault: false
  },
  {
    key: 'ivan_alien_stage',
    name: 'Ivan',
    subtitle: 'Vocalista Alien Stage',
    badge: 'Alien Stage',
    effect: '✦ Pétalos negros y brasas rojas ✦',
    cost: 400,
    unlockedByDefault: false
  },
  {
    key: 'abaddon_hotel',
    name: 'Abaddon',
    subtitle: 'Sombra Hotel Embrujado',
    badge: 'Hotel Embrujado',
    effect: '✦ Niebla espectral y fuegos fatuos ✦',
    cost: 500,
    unlockedByDefault: false
  },
  {
    key: 'classic',
    name: 'Elizabeth Clásica',
    subtitle: 'Aspecto Original',
    badge: 'Original',
    effect: '✦ Polvo estelar brillante ✦',
    cost: 0,
    unlockedByDefault: true
  }
];

function drawShopSkinsView() {
  const curSkin = SKINS_CONFIG.find(s => s.key === selectedSkinPreview) || SKINS_CONFIG[0];
  const isOwned = (saveState.unlockedSkins && saveState.unlockedSkins.includes(curSkin.key)) || curSkin.unlockedByDefault;
  const isEquipped = saveState.equippedSkin === curSkin.key;
  const canBuySkin = !isOwned && (saveState.dexterLilies || 0) >= curSkin.cost;

  // Cámara de Exhibición (Izquierda)
  const cx = 22;
  const cy = 62;
  const cw = 156;
  const ch = 194;
  drawRoundedPanel(cx, cy, cw, ch, 10, 'rgba(18, 6, 22, 0.96)', '#b31b52', 1.6);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff9ebb';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText('✦ PROBADOR EN VIVO ✦', Math.round(cx + cw / 2), cy + 14);

  // Pastilla del Universo / Tema
  drawRoundedPanel(cx + 14, cy + 20, cw - 28, 14, 5, 'rgba(32, 8, 24, 0.95)', '#ff75a0', 1);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText(`[TEMA: ${curSkin.badge.toUpperCase()}]`, Math.round(cx + cw / 2), cy + 30);

  // Pedestal de exhibición y Mamá Ratón luciendo la skin con sus accesorios en vivo
  drawCrystalWarpPad(cx + cw / 2, cy + 86, 44, 10, 'rgba(217, 37, 104, 0.35)');
  window.sprites.drawMamaMouse(ctx, cx + cw / 2 - 12, cy + 70, 'idle', globalFrame * 0.08, true, 1.45, 1.45, 0, false, curSkin.key);

  // Información de la Skin seleccionada (Minimalista, elegante y sin desbordes)
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText(curSkin.name.toUpperCase(), Math.round(cx + cw / 2), cy + 110);

  ctx.fillStyle = '#ff9ebb';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText(curSkin.subtitle, Math.round(cx + cw / 2), cy + 123);

  // Pastilla del efecto especial (Elegante y contenida dentro de la ventana)
  drawRoundedPanel(cx + 10, cy + 132, cw - 20, 18, 5, 'rgba(12, 4, 16, 0.75)', '#5a1028', 1);
  ctx.fillStyle = '#ffcad4';
  ctx.font = `5.8px ${UI_FONT}`;
  ctx.fillText(curSkin.effect, Math.round(cx + cw / 2), cy + 143);

  // Botón de Acción en la Cámara de Exhibición
  const actBtn = {
    x: cx + 12, y: cy + 160, w: cw - 24, h: 22,
    action: () => {
      if (isEquipped) {
        window.sfx.playJump(false);
      } else if (isOwned) {
        saveState.equippedSkin = curSkin.key;
        persistSave();
        window.sfx.playJump(false);
        spawnParticles(actBtn.x + actBtn.w / 2, actBtn.y + actBtn.h / 2, 14, '#ffffff', 60, 40);
      } else if (canBuySkin) {
        saveState.dexterLilies -= curSkin.cost;
        if (!saveState.unlockedSkins.includes(curSkin.key)) {
          saveState.unlockedSkins.push(curSkin.key);
        }
        saveState.equippedSkin = curSkin.key;
        persistSave();
        window.sfx.playBuy();
        triggerShake(0.12, 2);
        spawnParticles(actBtn.x + actBtn.w / 2, actBtn.y + actBtn.h / 2, 18, '#ff75a0', 80, 50);
      } else {
        window.sfx.playHurt();
        triggerShake(0.08, 1.5);
      }
    }
  };

  let actFill = '#330818';
  let actBorder = '#ff75a0';
  let actText = '✓ EQUIPADA';

  if (!isOwned && canBuySkin) {
    actFill = '#8f143c';
    actBorder = '#ffffff';
    actText = `COMPRAR (${curSkin.cost} FLORES)`;
  } else if (!isOwned) {
    actFill = '#200614';
    actBorder = '#6e1034';
    actText = `FALTAN FLORES (${curSkin.cost})`;
  } else if (!isEquipped) {
    actFill = '#8f143c';
    actBorder = '#ffffff';
    actText = '▶ USAR ASPECTO';
  }

  drawRoundedPanel(actBtn.x, actBtn.y, actBtn.w, actBtn.h, 6, actFill, actBorder, (canBuySkin || (isOwned && !isEquipped)) ? 1.8 : 1.2);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(actText, Math.round(actBtn.x + actBtn.w / 2), actBtn.y + 14);
  menuButtons.push(actBtn);

  // Lista de las 5 Skins + Clásica para Seleccionar (Derecha)
  const listX = 186;
  const listW = 272;
  const cardH = 28;
  const cardGap = 4;
  for (let i = 0; i < SKINS_CONFIG.length; i++) {
    const s = SKINS_CONFIG[i];
    const sy = 62 + i * (cardH + cardGap);
    const isSel = selectedSkinPreview === s.key;
    const sOwned = (saveState.unlockedSkins && saveState.unlockedSkins.includes(s.key)) || s.unlockedByDefault;
    const sEquipped = saveState.equippedSkin === s.key;

    const cardFill = isSel ? '#8f143c' : 'rgba(20, 7, 24, 0.94)';
    const cardBorder = isSel ? '#ffffff' : (sEquipped ? '#ff75a0' : '#b31b52');
    drawRoundedPanel(listX, sy, listW, cardH, 6, cardFill, cardBorder, isSel ? 2 : 1.2);

    // 1. Sprite Único de la Skin (Miniatura Pixel Art interactiva en vivo)
    drawRoundedPanel(listX + 4, sy + 3, 24, 22, 4, isSel ? 'rgba(40, 8, 22, 0.85)' : 'rgba(10, 3, 12, 0.7)', isSel ? '#ffcad4' : '#5a1028', 1);
    ctx.save();
    window.sprites.drawMamaMouse(ctx, listX + 8, sy + 2, 'idle', globalFrame * 0.06, true, 0.65, 0.65, 0, false, s.key);
    ctx.restore();

    // 2. Texto Organizado: Nombre en blanco arriba, subtítulo abajo (Cero choques de texto)
    const textX = listX + 34;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 7.5px ${UI_FONT}`;
    ctx.fillText(s.name, textX, sy + 12);

    ctx.fillStyle = isSel ? '#ffe5ec' : '#ffcad4';
    ctx.font = `5.8px ${UI_FONT}`;
    ctx.fillText(s.subtitle, textX, sy + 22);

    // 3. Estado / Precio a la derecha (Limpio y legible con icono pixel art)
    const badgeRight = listX + listW - 8;
    if (sEquipped) {
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold 7px ${UI_FONT}`;
      ctx.fillText('✓ EQUIPADA', badgeRight, sy + 17);
    } else if (sOwned) {
      ctx.textAlign = 'right';
      ctx.fillStyle = isSel ? '#ffffff' : '#ff9ebb';
      ctx.font = `bold 7px ${UI_FONT}`;
      ctx.fillText('✓ OBTENIDA', badgeRight, sy + 17);
    } else {
      drawPixelLilyIcon(ctx, badgeRight - 60, sy + 8);
      ctx.textAlign = 'right';
      ctx.fillStyle = isSel ? '#ffffff' : '#ffcad4';
      ctx.font = `bold 7px ${UI_FONT}`;
      ctx.fillText(`${s.cost} Flores`, badgeRight, sy + 17);
    }

    menuButtons.push({
      x: listX, y: sy, w: listW, h: cardH,
      action: () => {
        selectedSkinPreview = s.key;
        window.sfx.playJump(false);
      }
    });
  }
}


// --- MODULO: src/scenes/shop/index.js ---
// ============================================================================
// TIENDA: ENTRADA PRINCIPAL Y SELECTOR DE PESTAÑAS (SKINS / HABILIDADES)
// ============================================================================
let shopTab = 'skins'; // 'skins' | 'skills'
let selectedSkinPreview = 'rick_prime';

function drawShopScreen() {
  menuButtons = [];

  // Fondo cielo cósmico obsidiana profundo
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#07020a');
  bgGrad.addColorStop(0.55, '#160618');
  bgGrad.addColorStop(1, '#09030c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Estrellas sutiles de fondo
  for (let i = 0; i < 16; i++) {
    const sx = 20 + ((i * 53 + 12) % (W - 40));
    const sy = 12 + ((i * 37 + 7) % (H - 24));
    drawSparkleStar(sx, sy, 1.2, i % 2 === 0 ? '#ffffff' : '#ff8fab');
  }

  // Barra Superior: Título + Botón Volver + Marcadores de Monedas
  drawRoundedPanel(16, 6, W - 32, 28, 8, 'rgba(20, 7, 24, 0.96)', '#b31b52', 1.5);

  const backBtn = {
    x: 22, y: 9, w: 64, h: 22,
    action: () => {
      window.sfx.playJump(false);
      gameState = previousShopState || 'TITLE';
    }
  };
  drawRoundedPanel(backBtn.x, backBtn.y, backBtn.w, backBtn.h, 6, '#5a0c25', '#b31b52', 1.2);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8px ${UI_FONT}`;
  ctx.fillText('◀ ATRÁS', Math.round(backBtn.x + backBtn.w / 2), backBtn.y + 15);
  menuButtons.push(backBtn);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 9.5px ${UI_FONT}`;
  ctx.fillText(shopTab === 'skins' ? 'BOUTIQUE DE SKINS' : 'ÁRBOL DE EVOLUCIÓN', W / 2 + 10, 18);

  const srx1 = Math.round(W / 2 - 95);
  drawPixelLilyIcon(ctx, srx1, 23);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(`${saveState.dexterLilies || 0} Flores`, srx1 + 14, 30);

  ctx.fillStyle = '#ffcad4';
  ctx.fillText('✦', srx1 + 95, 30);

  const srx2 = Math.round(W / 2 + 15);
  drawPixelCheeseIcon(ctx, srx2, 23);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(`${saveState.bankCheeses} Quesos`, srx2 + 16, 30);
  ctx.textAlign = 'center';

  // Pestañas Superiores de Categoría (Skins en primer lugar con iconos pixel art)
  const tabSkins = {
    x: 22, y: 36, w: 214, h: 22,
    action: () => { window.sfx.playJump(false); shopTab = 'skins'; }
  };
  const isTabSkins = shopTab === 'skins';
  drawRoundedPanel(tabSkins.x, tabSkins.y, tabSkins.w, tabSkins.h, 7, isTabSkins ? '#8f143c' : 'rgba(18, 6, 22, 0.94)', isTabSkins ? '#ffffff' : '#b31b52', isTabSkins ? 2 : 1.2);
  drawPixelShopIcon(ctx, tabSkins.x + 14, tabSkins.y + 6);
  ctx.textAlign = 'left';
  ctx.fillStyle = isTabSkins ? '#ffffff' : '#d4a5b8';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText('BOUTIQUE DE SKINS', tabSkins.x + 30, tabSkins.y + 15);
  ctx.textAlign = 'center';
  menuButtons.push(tabSkins);

  const tabSkills = {
    x: 244, y: 36, w: 214, h: 22,
    action: () => { window.sfx.playJump(false); shopTab = 'skills'; }
  };
  const isTabSkills = shopTab === 'skills';
  drawRoundedPanel(tabSkills.x, tabSkills.y, tabSkills.w, tabSkills.h, 7, isTabSkills ? '#8f143c' : 'rgba(18, 6, 22, 0.94)', isTabSkills ? '#ffffff' : '#b31b52', isTabSkills ? 2 : 1.2);
  drawPixelCheeseIcon(ctx, tabSkills.x + 14, tabSkills.y + 6);
  ctx.textAlign = 'left';
  ctx.fillStyle = isTabSkills ? '#ffffff' : '#d4a5b8';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText('ÁRBOL DE EVOLUCIÓN', tabSkills.x + 30, tabSkills.y + 15);
  ctx.textAlign = 'center';
  menuButtons.push(tabSkills);

  // Renderizar la vista de la pestaña activa
  if (shopTab === 'skills') {
    drawShopSkillsView();
  } else {
    drawShopSkinsView();
  }

  ctx.textAlign = 'left';
}


// --- MODULO: src/scenes/safehouse/room.js ---
// ============================================================================
// MADRIGUERA DE ELIZABETH: ENTORNO Y HABITACIÓN FAMILIAR
// ============================================================================
function drawSafeHouseRoom() {
  // Fondo de madera profunda de la madriguera
  ctx.fillStyle = '#180c10';
  ctx.fillRect(0, 0, W, H);

  // Pared acogedora con moldura rosada oscura
  ctx.fillStyle = '#261219';
  ctx.fillRect(24, 20, W - 48, 196);
  ctx.strokeStyle = '#6e1233';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 20, W - 48, 196);

  // Piso de tablones y alfombra borgoña
  ctx.fillStyle = '#16080d';
  ctx.fillRect(24, 214, W - 48, 36);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(110, 214, 240, 8);

  // Cuadro decorativo del Lirio de Dexter en la pared
  ctx.fillStyle = '#0a0307';
  ctx.fillRect(215, 48, 46, 46);
  ctx.strokeStyle = '#b31b52';
  ctx.strokeRect(215, 48, 46, 46);
  window.sprites.drawWildLily(ctx, 236, 84, 0);

  // Portal de llegada (izquierda) y Portal hacia el siguiente nivel (derecha)
  window.sprites.drawPortal(ctx, 58, 192, globalFrame, 0.85);
  window.sprites.drawPortal(ctx, houseState.portalX, houseState.portalY, globalFrame, 1.0);
}


// --- MODULO: src/scenes/safehouse/index.js ---
// ============================================================================
// ESCENA DE LA MADRIGUERA: RATONCITOS, MAMÁ RATÓN Y PANEL DE HISTORIA
// ============================================================================
function drawSafeHouseScene() {
  drawSafeHouseRoom();

  // Dibujar los hijos ratones rescatados
  const count = saveState.rescuedBabies.length;
  for (let i = 0; i < count; i++) {
    const babyId = saveState.rescuedBabies[i];
    const bx = 165 + i * 36;
    const by = 194;
    window.sprites.drawBabyMouse(ctx, bx, by, globalFrame, babyId);
  }

  // Mamá Ratón en su casa
  const mamaState = houseState.phase === 'entering_next' ? 'run' : 'idle';
  window.sprites.drawMamaMouse(ctx, houseState.mamaX, houseState.mamaY, mamaState, globalFrame * 0.2, true, 1.15, 1.15, 0, false, saveState.equippedSkin);

  // Panel superior elegante en Obsidiana y Rosado Oscuro
  const panelW = 280;
  const panelX = Math.round(W / 2 - panelW / 2);
  const panelY = 20;
  const panelH = 50;
  drawRoundedPanel(panelX, panelY, panelW, panelH, 10, 'rgba(18, 6, 22, 0.95)', '#b31b52', 1.5);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('MADRIGUERA DE ELIZABETH', W / 2, panelY + 16);

  drawPixelBabyMouseIcon(ctx, Math.round(W / 2 - 70), panelY + 22);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffcad4';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(`${count}/7 Hijos Rescatados`, Math.round(W / 2 - 56), panelY + 29);
  ctx.textAlign = 'center';

  if (houseState.unlockedAbilityText) {
    const cleanAbility = (houseState.unlockedAbilityText || '').split('(')[0].trim();
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.fillText(`✦ PODER: ${cleanAbility} ✦`, W / 2, panelY + 41);
  }

  if (Math.floor(globalFrame / 20) % 2 === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold 7px ${UI_FONT}`;
    ctx.fillText('▶ TOCA SALTAR O ESPACIO PARA AVANZAR ◀', W / 2, 244);
  }
  ctx.textAlign = 'left';
}


// --- MODULO: src/scenes/gameover/heart.js ---
// ============================================================================
// GAME OVER: ICONO PIXEL ART DE CORAZÓN ROTO
// ============================================================================
// Paleta estricta: Rosado Oscuro (#b31b52), Carmesí (#8f143c) y Blanco (#ffffff)

function drawPixelBrokenHeart(cx, cy) {
  ctx.save();
  // Mitad Izquierda (Rosado Oscuro)
  ctx.fillStyle = '#b31b52';
  ctx.fillRect(cx - 7, cy - 6, 6, 3);
  ctx.fillRect(cx - 8, cy - 3, 7, 5);
  ctx.fillRect(cx - 7, cy + 2, 5, 3);
  ctx.fillRect(cx - 4, cy + 5, 3, 2);
  ctx.fillRect(cx - 2, cy + 7, 2, 1);

  // Mitad Derecha (Rosado Intenso)
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(cx + 2, cy - 6, 6, 3);
  ctx.fillRect(cx + 2, cy - 3, 7, 5);
  ctx.fillRect(cx + 3, cy + 2, 5, 3);
  ctx.fillRect(cx + 2, cy + 5, 3, 2);
  ctx.fillRect(cx + 1, cy + 7, 2, 1);

  // Grieta central en Blanco Puro
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 1, cy - 6, 2, 2);
  ctx.fillRect(cx, cy - 4, 2, 2);
  ctx.fillRect(cx - 2, cy - 2, 2, 2);
  ctx.fillRect(cx - 1, cy, 2, 2);
  ctx.fillRect(cx - 3, cy + 2, 2, 2);
  ctx.fillRect(cx - 1, cy + 4, 2, 3);

  // Destello superior
  ctx.fillStyle = '#ffcad4';
  ctx.fillRect(cx - 6, cy - 5, 2, 2);
  ctx.restore();
}


// --- MODULO: src/scenes/gameover/index.js ---
// ============================================================================
// PANTALLA DE FIN DE PARTIDA (GAME OVER)
// ============================================================================
// Paleta unificada: Negro Obsidiana, Blanco Puro y Rosado Oscuro
// Cero emojis, cero textos desbordados, 100% responsive.

function drawGameOverScreen() {
  // Fondo oscuro que cubre todo el gameplay
  ctx.fillStyle = 'rgba(7, 2, 10, 0.92)';
  ctx.fillRect(0, 0, W, H);

  const pw = 330;
  const ph = 196;
  const px = Math.round(W / 2 - pw / 2);
  const py = Math.round(H / 2 - ph / 2);

  // Panel central en Obsidiana con Borde Rosado Oscuro
  drawRoundedPanel(px, py, pw, ph, 12, 'rgba(18, 5, 22, 0.98)', '#b31b52', 2);

  // Ribete interior decorativo
  ctx.strokeStyle = 'rgba(255, 202, 212, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(px + 4, py + 4, pw - 8, ph - 8);

  // Icono Pixel Art de Corazón Roto
  drawPixelBrokenHeart(W / 2, py + 26);

  // Título Nítido en Blanco Puro
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 13px ${UI_FONT}`;
  ctx.fillText('FIN DE LA PARTIDA', W / 2, py + 52);

  // Subtítulo en Rosado Suave
  ctx.fillStyle = '#ffcad4';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText('Elizabeth ha caído en el laberinto...', W / 2, py + 66);

  // Tarjeta de Punto de Control (Evita cualquier desborde de texto)
  const savedCp = saveState.activeCheckpoints && saveState.activeCheckpoints[level.id];
  const cw = 270;
  const ch = 38;
  const cx = Math.round(W / 2 - cw / 2);
  const cy = py + 78;

  drawRoundedPanel(cx, cy, cw, ch, 8, 'rgba(9, 2, 12, 0.94)', '#8f143c', 1.2);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText('PUNTO DE REAPARICIÓN', W / 2, cy + 13);

  let cpName = savedCp ? savedCp.name : 'Inicio del nivel';
  cpName = cpName.replace(/^Checkpoint\s*#?\d*:\s*/i, '');
  if (cpName.length > 30) {
    cpName = cpName.slice(0, 28) + '...';
  }
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText(cpName, W / 2, cy + 28);

  // Botón Reintentar con Brillo de Pulso
  const bw = 160;
  const bh = 28;
  const bx = Math.round(W / 2 - bw / 2);
  const by = py + 126;
  const pulse = Math.sin(globalFrame * 0.08) > 0;

  drawRoundedPanel(bx, by, bw, bh, 6, '#8f143c', pulse ? '#ffffff' : '#b31b52', 1.5);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('▶ REINTENTAR', W / 2, by + 18);

  // Mensaje inferior de control
  ctx.fillStyle = '#ffcad4';
  ctx.font = `6.5px ${UI_FONT}`;
  const promptText = gamepadConnected ? '[A] Continuar' : 'Toca la pantalla o presiona [ESPACIO]';
  ctx.fillText(promptText, W / 2, py + ph - 12);

  ctx.textAlign = 'left';
}


// --- MODULO: src/scenes/victory/trophy.js ---
// ============================================================================
// VICTORIA: ICONO PIXEL ART DE COPA DE VICTORIA
// ============================================================================
function drawPixelTrophy(cx, cy) {
  ctx.save();
  ctx.fillStyle = '#ffcad4';
  ctx.fillRect(cx - 6, cy - 7, 12, 6);
  ctx.fillRect(cx - 4, cy - 1, 8, 3);
  ctx.fillRect(cx - 2, cy + 2, 4, 3);
  ctx.fillRect(cx - 5, cy + 5, 10, 2);

  // Asas laterales
  ctx.fillStyle = '#b31b52';
  ctx.fillRect(cx - 8, cy - 6, 2, 4);
  ctx.fillRect(cx + 6, cy - 6, 2, 4);

  // Brillo
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 4, cy - 6, 2, 4);
  ctx.restore();
}


// --- MODULO: src/scenes/victory/index.js ---
// ============================================================================
// PANTALLA DE VICTORIA FINAL (NIVEL COMPLETADO)
// ============================================================================
// Paleta unificada: Negro Obsidiana, Blanco Puro y Rosado Oscuro
// Cero emojis, cero textos desbordados.

function drawVictoryScreen() {
  ctx.fillStyle = 'rgba(7, 2, 10, 0.92)';
  ctx.fillRect(0, 0, W, H);

  const pw = 330;
  const ph = 196;
  const px = Math.round(W / 2 - pw / 2);
  const py = Math.round(H / 2 - ph / 2);

  drawRoundedPanel(px, py, pw, ph, 12, 'rgba(18, 5, 22, 0.98)', '#b31b52', 2);

  ctx.strokeStyle = 'rgba(255, 202, 212, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(px + 4, py + 4, pw - 8, ph - 8);

  drawPixelTrophy(W / 2, py + 26);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 13px ${UI_FONT}`;
  ctx.fillText('¡NIVEL COMPLETADO!', W / 2, py + 52);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `7px ${UI_FONT}`;
  ctx.fillText(`Hijos ratoncitos a salvo: ${saveState.rescuedBabies.length}/7`, W / 2, py + 66);

  // Tarjeta de Recompensas
  const cw = 270;
  const ch = 38;
  const cx = Math.round(W / 2 - cw / 2);
  const cy = py + 78;

  drawRoundedPanel(cx, cy, cw, ch, 8, 'rgba(9, 2, 12, 0.94)', '#8f143c', 1.2);

  // Icono queso + conteo
  drawPixelCheeseIcon(ctx, cx + 24, cy + 13);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 7.5px ${UI_FONT}`;
  ctx.fillText(`Banco: ${saveState.bankCheeses}`, cx + 42, cy + 23);

  // Icono lirio + conteo
  drawPixelLilyIcon(ctx, cx + 150, cy + 13);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Lirios: ${saveState.dexterLilies || 0}`, cx + 168, cy + 23);

  // Botón Continuar
  const bw = 160;
  const bh = 28;
  const bx = Math.round(W / 2 - bw / 2);
  const by = py + 126;
  const pulse = Math.sin(globalFrame * 0.08) > 0;

  drawRoundedPanel(bx, by, bw, bh, 6, '#8f143c', pulse ? '#ffffff' : '#b31b52', 1.5);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('▶ CONTINUAR', W / 2, by + 18);

  ctx.fillStyle = '#ffcad4';
  ctx.font = `6.5px ${UI_FONT}`;
  const promptText = gamepadConnected ? '[A] Volver al Menú' : 'Toca la pantalla o presiona [ESPACIO]';
  ctx.fillText(promptText, W / 2, py + ph - 12);

  ctx.textAlign = 'left';
}


// --- MODULO: src/scenes/surf_preview.js ---
// ============================================================================
// ESCENA DE PREVISUALIZACIÓN: TABLA DE SURF & WATER DASH (MUNDO 3)
// ============================================================================
function drawSurfPreviewScene() {
  // Cielo soleado diurno
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 118);
  skyGrad.addColorStop(0, '#1d8cf8');
  skyGrad.addColorStop(0.6, '#4ea8de');
  skyGrad.addColorStop(1, '#90e0ef');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, 118);

  // Sol brillante
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(W - 40, 28, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 230, 109, 0.35)';
  ctx.beginPath();
  ctx.arc(W - 40, 28, 18, 0, Math.PI * 2);
  ctx.fill();

  // Mar y oleaje realista
  if (typeof drawRealisticOceanHorizon === 'function') {
    drawRealisticOceanHorizon(ctx, 118, H - 118, 0, globalFrame);
  } else {
    const seaGrad = ctx.createLinearGradient(0, 118, 0, H);
    seaGrad.addColorStop(0, '#0096c7');
    seaGrad.addColorStop(0.4, '#0077b6');
    seaGrad.addColorStop(1, '#023e8a');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, 118, W, 152);
  }

  const activeSkin = (typeof saveState !== 'undefined' && saveState && saveState.equippedSkin) || 'classic';
  const activeBoard = (typeof saveState !== 'undefined' && saveState && saveState.surfboardSkin) || 'classic';

  // Títulos pixel art
  ctx.fillStyle = '#ffffff';
  ctx.font = '9px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HABILIDAD: TABLA DE SURF & IMPULSO (WATER DASH)', W / 2, 22);
  ctx.fillStyle = '#ffd166';
  ctx.font = '7px "Silkscreen", monospace';
  ctx.fillText(`MUNDO 3: CIUDAD COSTERA • SKIN: ${activeSkin.toUpperCase()} • TABLA: ${activeBoard.toUpperCase()}`, W / 2, 34);

  // 1. Navegación en el agua (Surfing Normal)
  ctx.fillStyle = '#ffffff';
  ctx.font = '7px "Silkscreen", monospace';
  ctx.fillText('SURFING NORMAL (CRUISING)', 110, 56);
  window.sprites.drawMamaSurfing(ctx, 110, 94, true, false, globalFrame, activeSkin, activeBoard);

  // 2. Animación de Impulso (Water Dash con chorro de propulsión)
  ctx.fillStyle = '#ffd166';
  ctx.fillText('IMPULSO ACUATICO (WATER DASH)', 340, 56);
  window.sprites.drawMamaSurfing(ctx, 340, 94, true, true, globalFrame, activeSkin, activeBoard);

  // 3. Detalle de ingeniería de la Tabla de Surf (Zoom x2.6)
  ctx.fillStyle = '#ffffff';
  ctx.fillText('DESGLOSE: ALMA NEON • KICK-TAIL • LEASH • 3 QUILLAS', W / 2, 182);
  ctx.save();
  ctx.translate(W / 2, 206);
  ctx.scale(2.6, 2.6);
  window.sprites.drawSurfboard(ctx, 0, 0, true, 0, true, activeBoard);
  ctx.restore();

  // 4. Muestrario de la paleta oficial
  const palette = ['#0077b6', '#00b4d8', '#48cae4', '#90e0ef', '#ffd166', '#ff2a70', '#ffffff', '#14101c'];
  const startX = Math.round(W / 2 - (palette.length * 20) / 2);
  for (let i = 0; i < palette.length; i++) {
    ctx.fillStyle = palette[i];
    ctx.fillRect(startX + i * 20, 240, 16, 7);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(startX + i * 20, 240, 16, 7);
  }
  ctx.fillStyle = '#caf0f8';
  ctx.font = '6px "Silkscreen", monospace';
  ctx.fillText('PALETA OFICIAL COSTERA & NEON', W / 2, 258);

  ctx.textAlign = 'left';
}


// --- MODULO: src/scenes/key_assembly.js ---
// ============================================================================
// ESCENA CINEMÁTICA: ENSAMBLAJE DE LA LLAVE MAESTRA DEL RASCACIELOS (ANIMACIÓN 1)
// ============================================================================
let keyAssemblyState = { timer: 0, flashAlpha: 0, shockwaveR: 0, clanks: [false, false, false] };

function startKeyAssemblyAnimation() {
  gameState = 'KEY_ASSEMBLY';
  keyAssemblyState = { timer: 0, flashAlpha: 0, shockwaveR: 0, clanks: [false, false, false] };
  if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
}

function updateKeyAssembly(dt) {
  const s = keyAssemblyState;
  s.timer += dt;
  if (s.flashAlpha > 0) s.flashAlpha = Math.max(0, s.flashAlpha - dt * 2.5);
  if (s.shockwaveR > 0) s.shockwaveR += dt * 280;

  // Clanks mecánicos de acoplamiento progresivo
  if (s.timer >= 1.2 && !s.clanks[0]) {
    s.clanks[0] = true; triggerShake(0.08, 1.5);
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }
  if (s.timer >= 1.8 && !s.clanks[1]) {
    s.clanks[1] = true; triggerShake(0.1, 2.0);
    if (window.sfx && window.sfx.playLavaDash) window.sfx.playLavaDash();
  }
  if (s.timer >= 2.4 && !s.clanks[2]) {
    s.clanks[2] = true; s.flashAlpha = 1.0; s.shockwaveR = 8;
    triggerShake(0.25, 4.0);
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
    if (window.sfx && window.sfx.playCheckpoint) window.sfx.playCheckpoint();
  }

  if ((s.timer >= 3.0 && keys.jumpJustPressed) || s.timer >= 7.5) {
    saveState.keysPhase3 = 4;
    saveState.keyAssemblySeen = true;
    persistSave();
    gameState = 'PLAYING';
    if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
  }
}

function drawKeyAssemblyScene() {
  const s = keyAssemblyState;
  const t = s.timer;
  const cx = W / 2, cy = 102;

  ctx.fillStyle = '#07020a';
  ctx.fillRect(0, 0, W, H);

  // Anillo de ondas de choque en la fusión
  if (s.shockwaveR > 0 && s.shockwaveR < W) {
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, s.shockwaveR, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffcad4';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('FORJA DE LA LLAVE MAESTRA DEL RASCACIELOS', cx, 22);

  if (t < 2.4) {
    // Fase 1: Las 4 partes atraídas magnéticamente hacia el centro
    const progress = Math.min(1, t / 2.2);
    const ease = 1 - Math.pow(1 - progress, 3);
    const dist = (1 - ease) * 130;
    const coords = [
      { x: cx - dist * 0.7, y: cy - dist - 16 },           // Pieza 1: Cabezal (Norte)
      { x: cx, y: cy + dist * 0.2 },                       // Pieza 2: Vástago (Centro)
      { x: cx + dist * 0.8 + 8, y: cy + dist * 0.5 + 14 }, // Pieza 3: Dientes (Este)
      { x: cx - dist * 0.8, y: cy + dist * 0.4 }           // Pieza 4: Joya (Oeste)
    ];

    for (let i = 0; i < 4; i++) {
      if (window.sprites && window.sprites.drawKeyFragment) {
        window.sprites.drawKeyFragment(ctx, i, coords[i].x, coords[i].y, 1.6, 1);
      }
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = `7px ${UI_FONT}`;
    ctx.fillText('ATRAYENDO FRAGMENTOS DE LA CIUDADELA...', cx, 196);
  } else {
    // Fase 2: Llave Maestra ensamblada y resplandeciente
    const bob = Math.sin((t - 2.4) * 3) * 3;
    const glint = (t - 2.4) * 0.8;
    if (window.sprites && window.sprites.drawMasterKeyAssembled) {
      window.sprites.drawMasterKeyAssembled(ctx, cx, cy + bob, 1.8, 1.2, glint);
    }

    ctx.fillStyle = '#ffd166';
    ctx.font = `bold 8px ${UI_FONT}`;
    ctx.fillText('¡4/4 PIEZAS UNIFICADAS CON ÉXITO!', cx, 186);
    ctx.fillStyle = '#ffffff';
    ctx.font = `6.5px ${UI_FONT}`;
    ctx.fillText('Las puertas del ascensor hacia la azotea están desbloqueadas.', cx, 200);

    if (Math.floor(globalFrame / 20) % 2 === 0) {
      ctx.fillStyle = '#ffcad4';
      ctx.font = `bold 7px ${UI_FONT}`;
      ctx.fillText('[SALTAR / CONTINUAR >]', cx, 216);
    }
  }

  // Destello blanco cegador de fusión
  if (s.flashAlpha > 0) {
    ctx.fillStyle = `rgba(255, 255, 255, ${s.flashAlpha})`;
    ctx.fillRect(0, 0, W, H);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { startKeyAssemblyAnimation, updateKeyAssembly, drawKeyAssemblyScene };
}


// --- MODULO: src/scenes/elevator_cutscene.js ---
// ============================================================================
// ESCENA CINEMÁTICA: ASCENSOR PANORÁMICO EXPRÉS AL PISO 100 (FASE 4)
// ============================================================================
let elevatorRideState = { active: false, timer: 0, duration: 3.6, targetX: 14490, targetY: 46, doorSlide: 0 };

function startElevatorAscentAnimation(destX = 14490, destY = 46) {
  gameState = 'ELEVATOR_RIDE';
  keys.jumpJustPressed = false;
  keys.upJustPressed = false;
  keyboardState.ArrowUp = false;
  keyboardState.KeyW = false;

  elevatorRideState = { active: true, timer: 0, duration: 3.6, targetX: destX, targetY: destY, doorSlide: 0 };
  triggerShake(0.12, 1.5);
  if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
}

function updateElevatorCutscene(dt) {
  const s = elevatorRideState;
  s.timer += dt;

  if (s.timer < 0.5) {
    s.doorSlide = Math.min(1, s.timer / 0.5);
  } else if (s.timer < 2.9) {
    s.doorSlide = 0;
    if (globalFrame % 8 === 0) triggerShake(0.04, 0.8);
  } else if (s.timer < 3.5) {
    s.doorSlide = Math.max(0, 1 - (s.timer - 2.9) / 0.6);
    if (s.timer >= 3.0 && s.timer - dt < 3.0 && window.sfx && window.sfx.playCheckpoint) {
      window.sfx.playCheckpoint();
    }
  }

  // Finalización o salto voluntario (solo tras 0.8s para evitar saltos involuntarios)
  if (s.timer >= s.duration || (s.timer >= 0.8 && keys.jumpJustPressed)) {
    keys.jumpJustPressed = false;
    player.x = s.targetX;
    player.y = s.targetY;
    player.vx = 0;
    player.vy = 0;
    cameraX = player.x - W / 2;
    cameraY = player.y - H / 2;
    gameState = 'PLAYING';
    s.active = false;
    spawnStarSparkles(player.x + 11, player.y + 12, 16, '#ffffff');
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
  }
}

function drawElevatorCutscene() {
  const s = elevatorRideState;
  const t = s.timer;

  // 1. Cielo crepuscular de alta altitud en ascenso
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#02040f');
  skyGrad.addColorStop(0.5, '#0a1128');
  skyGrad.addColorStop(1, '#1c2541');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Rascacielos de la ciudad cayendo a gran velocidad (Efecto panorámico exterior)
  const scrollOffset = (t * 280) % 54;
  for (let y = -60; y < H + 60; y += 40) {
    const drawY = y + scrollOffset;
    // Rascacielos izquierdo
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(W / 2 - 105, drawY, 52, 28);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(W / 2 - 85, drawY + 8, 4, 3);
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(W / 2 - 75, drawY + 8, 4, 3);

    // Rascacielos derecho
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(W / 2 + 55, drawY + 10, 48, 24);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(W / 2 + 75, drawY + 15, 4, 3);
  }

  // 3. Estelas de velocidad luminosas verticales
  ctx.fillStyle = 'rgba(72, 202, 228, 0.55)';
  for (let i = 0; i < 7; i++) {
    const sx = W / 2 - 85 + i * 28;
    const sy = ((t * 440 + i * 48) % (H + 40)) - 20;
    ctx.fillRect(sx, sy, 2, 20);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(sx, sy + 6, 2, 8);
    ctx.fillStyle = 'rgba(72, 202, 228, 0.55)';
  }

  // 4. Paredes y hueco estructural del hueco del ascensor
  ctx.fillStyle = '#070a13';
  ctx.fillRect(0, 0, 110, H);
  ctx.fillRect(W - 110, 0, 110, H);

  // Columnas de acero estructural y rieles de guía de latón
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(104, 0, 8, H);
  ctx.fillRect(W - 112, 0, 8, H);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(109, 0, 2, H);
  ctx.fillRect(W - 111, 0, 2, H);

  // 5. Suelo, barandilla de bronce y panel de la cabina
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(110, H / 2 + 32, W - 220, 24);
  ctx.fillStyle = '#d4a373';
  ctx.fillRect(110, H / 2 + 32, W - 220, 2);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(116, H / 2 + 20, W - 232, 2);

  // 6. Pantalla digital LED: Contador de Pisos en marco Art-Deco
  const floorProgress = Math.min(1, Math.max(0, (t - 0.5) / 2.5));
  const currentFloor = Math.floor(1 + floorProgress * 99);
  const panelW = 160;
  const panelH = 34;
  const panelX = Math.round((W - panelW) / 2);
  const panelY = 18;

  drawRoundedPanel(panelX, panelY, panelW, panelH, 6, 'rgba(15, 23, 42, 0.94)', '#00b4d8', 1.8);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#caf0f8';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText('ASCENSOR PANORÁMICO EXPRÉS', W / 2, panelY + 11);

  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 11px ${UI_FONT}`;
  ctx.fillText(`SUBIENDO: PISO ${currentFloor} / 100`, W / 2, panelY + 26);

  // 7. Mamá Elizabeth en la cabina
  window.sprites.drawMamaMouse(ctx, W / 2 - 11, H / 2 + 10, 'idle', globalFrame, true, 1, 1, 0, false, saveState.equippedSkin);

  // 8. Puertas correderas de cristal templado tintado
  if (s.doorSlide > 0.05) {
    const doorW = (W / 2 - 110);
    const slidePx = Math.round(s.doorSlide * doorW);

    ctx.fillStyle = 'rgba(0, 180, 216, 0.45)';
    ctx.fillRect(112, 54, slidePx, H / 2 - 20);
    ctx.fillRect(W - 112 - slidePx, 54, slidePx, H / 2 - 20);

    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 1;
    ctx.strokeRect(112, 54, slidePx, H / 2 - 20);
    ctx.strokeRect(W - 112 - slidePx, 54, slidePx, H / 2 - 20);

    // Tiradores dorados
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(112 + slidePx - 4, H / 2 - 10, 3, 20);
    ctx.fillRect(W - 112 - slidePx + 1, H / 2 - 10, 3, 20);
  }

  // 9. Subtítulo dinámico
  ctx.fillStyle = '#caf0f8';
  ctx.font = `bold 6.5px ${UI_FONT}`;
  ctx.fillText(t >= 2.9 ? '¡LLEGANDO A LA AZOTEA (PISO 100)!' : 'ASCENDIENDO A TODA VELOCIDAD...', W / 2, H - 18);
}

if (typeof module !== 'undefined') {
  module.exports = { startElevatorAscentAnimation, updateElevatorCutscene, drawElevatorCutscene };
}


// --- MODULO: src/scenes/tsunami_cutscene.js ---
// ============================================================================
// ESCENA CINEMÁTICA: DESTRUCCIÓN DEL RASCACIELOS, MEGATSUNAMI Y SEPARACIÓN DEL HIJO
// ============================================================================
let tsunamiCutsceneState = { active: false, timer: 0, duration: 7.2, destX: 16050, destY: 172 };

function startTsunamiCutscene(destX = 16050, destY = 172) {
  gameState = 'TSUNAMI_CUTSCENE';
  tsunamiCutsceneState = { active: true, timer: 0, duration: 7.2, destX, destY };
  window.tsunamiCutsceneState = tsunamiCutsceneState;
  triggerShake(1.2, 3.8);
  rumbleGamepad(700, 0.95, 0.95);
  if (window.sfx && window.sfx.playHit) window.sfx.playHit();
}

function updateTsunamiCutscene(dt) {
  const s = window.tsunamiCutsceneState || tsunamiCutsceneState;
  s.timer += dt;
  const t = s.timer;

  // Sacudidas continuas según el clímax de la escena
  if (t < 2.5) {
    // Acto 1: Terremoto destructor y colapso de hormigón
    if (globalFrame % 5 === 0) triggerShake(0.55, 1.8);
    if (t >= 0.5 && t - dt < 0.5 && window.sfx && window.sfx.playHit) window.sfx.playHit();
  } else if (t < 5.0) {
    // Acto 2: Impacto colosal de la masa de agua del megatsunami
    if (globalFrame % 4 === 0) triggerShake(0.7, 2.2);
    if (t >= 2.6 && t - dt < 2.6 && window.sfx && window.sfx.playWaterSplash) window.sfx.playWaterSplash();
  } else {
    // Acto 3: Salto épico con tabla y viento extremo
    if (globalFrame % 10 === 0) triggerShake(0.3, 1.2);
  }

  // Finalización o salto de la cinemática
  if (s.timer >= s.duration || keys.jumpJustPressed) {
    s.active = false;
    gameState = 'PLAYING';
    currentPhase = 5;
    player.x = s.destX || 16050;
    player.y = 172; // Ras de la superficie en y=196 (196 - 24 = 172)
    player.vx = 280;
    player.vy = 0;
    player.facingRight = true;
    player.ability = 'surf';
    player.isSurfing = true;
    player.inWater = true;
    player.onGround = true;
    player.spawnX = player.x;
    player.spawnY = player.y;
    player.lives = player.maxLives;

    if (typeof persistSave === 'function') {
      if (!saveState.activeCheckpoints) saveState.activeCheckpoints = {};
      saveState.activeCheckpoints[3] = { id: 155, x: 16120, y: 196, name: 'Entrada al Megatsunami' };
      persistSave();
    }

    cameraX = player.x - W / 2;
    cameraY = player.y - H / 2;

    // Gran estallido de espuma y agua al entrar al megatsunami
    spawnParticles(player.x + 11, player.y + 20, 28, '#ffffff', 160, -50);
    spawnParticles(player.x + 11, player.y + 20, 20, '#caf0f8', 140, -40);
    spawnParticles(player.x + 11, player.y + 20, 14, '#00b4d8', 110, -25);
    if (window.sfx && window.sfx.playWaterSplash) window.sfx.playWaterSplash();
  }
}

function drawTsunamiCutscene() {
  const s = window.tsunamiCutsceneState || tsunamiCutsceneState;
  const t = s.timer;

  // Fondo cielo costero tormentoso
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#02182b');
  skyGrad.addColorStop(0.55, '#073b4c');
  skyGrad.addColorStop(1, '#118ab2');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Relámpagos intermitentes en el horizonte
  if (globalFrame % 50 < 2) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(0, 0, W, H);
  }

  // Sol oscurecido por la tormenta
  ctx.fillStyle = 'rgba(255, 209, 102, 0.25)';
  ctx.beginPath();
  ctx.arc(W / 2 + 80, 50, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(W / 2 + 80, 50, 24, 0, Math.PI * 2);
  ctx.fill();

  // ==========================================================================
  // ACTO 1: EL EDIFICIO SE PARTE EN DOS Y SE DESTRUYE (0.0s -> 2.5s)
  // ==========================================================================
  if (t < 2.5) {
    const sinkY = t < 0.5 ? 0 : Math.min(38, (t - 0.5) * 20);

    // 1. Edificio Izquierdo (Donde está Elizabeth)
    ctx.fillStyle = '#141724';
    ctx.fillRect(20, 140, 185, H);
    // Cornisa superior y barandilla
    ctx.fillStyle = '#2b2d42';
    ctx.fillRect(16, 136, 192, 5);
    ctx.fillStyle = '#48cae4';
    ctx.fillRect(16, 135, 192, 1);
    // Ventanas del rascacielos
    ctx.fillStyle = 'rgba(144, 224, 239, 0.45)';
    for (let wx = 35; wx < 190; wx += 22) {
      for (let wy = 148; wy < H; wy += 20) {
        ctx.fillRect(wx, wy, 10, 12);
      }
    }

    // 2. Edificio Derecho (Donde está el Hijo Ratón) - Se quiebra y se inclina
    ctx.save();
    ctx.translate(225, 140 + sinkY);
    const tilt = t < 0.5 ? 0 : Math.min(0.06, (t - 0.5) * 0.035);
    ctx.rotate(tilt);

    ctx.fillStyle = '#1a1c29';
    ctx.fillRect(0, 0, 225, H);
    ctx.fillStyle = '#3a3d52';
    ctx.fillRect(-2, -4, 230, 5);
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(-2, -5, 230, 1);
    ctx.fillStyle = 'rgba(144, 224, 239, 0.35)';
    for (let wx = 15; wx < 210; wx += 22) {
      for (let wy = 8; wy < H; wy += 20) {
        ctx.fillRect(wx, wy, 10, 12);
      }
    }
    ctx.restore();

    // 3. FRACTURA COLOSAL EN EL CENTRO (Grieta abismal que separa a ambos)
    const crackX = 205;
    ctx.fillStyle = '#05030a';
    ctx.beginPath();
    ctx.moveTo(crackX, 135);
    ctx.lineTo(crackX + 18, 135);
    ctx.lineTo(crackX + 28, H);
    ctx.lineTo(crackX - 4, H);
    ctx.closePath();
    ctx.fill();

    // Líneas incandescentes de fricción y rotura estructural
    ctx.strokeStyle = '#ff2a70';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(crackX + 3, 135);
    ctx.lineTo(crackX + 11, 165);
    ctx.lineTo(crackX + 4, 195);
    ctx.lineTo(crackX + 16, 235);
    ctx.lineTo(crackX + 9, H);
    ctx.stroke();

    // Bloques de hormigón y escombros desprendiéndose al abismo
    for (let i = 0; i < 9; i++) {
      const rx = crackX - 10 + (i * 7);
      const ry = 145 + ((t * 120 + i * 28) % (H - 120));
      ctx.fillStyle = i % 2 === 0 ? '#8d99ae' : '#2b2d42';
      ctx.fillRect(rx, ry, 5, 5);
      ctx.fillStyle = '#ffcad4';
      ctx.fillRect(rx + 1, ry + 1, 2, 2);
    }

    // Polvareda del derrumbe
    for (let p = 0; p < 6; p++) {
      const px = crackX - 15 + p * 8 + Math.sin(globalFrame * 0.1 + p) * 6;
      const py = 138 + Math.sin(globalFrame * 0.15 + p * 2) * 5;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.arc(px, py, 6 + (p % 4), 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Mamá Elizabeth en el borde izquierdo, desesperada
    const mamaX = 150;
    const mamaY = 112;
    window.sprites.drawMamaMouse(ctx, mamaX, mamaY, 'idle', globalFrame, true, 1.15, 0.9, 0, false, saveState.equippedSkin);

    // Bocadillo de Elizabeth: "¡¡HIJITO!! ¡¡NOOO!!"
    drawDialogueBubble(ctx, mamaX + 11, mamaY - 14, '¡¡HIJITO!! ¡¡NOOO!!', '#ffd166', '#ff2a70');

    // 5. Hijo Ratón en el bloque derecho hundiéndose, aterrado y llorando
    const babyX = 305;
    const babyY = 118 + sinkY;
    window.sprites.drawBabyMouse(ctx, babyX, babyY, globalFrame, 3);

    // Lágrimas del hijo salpicando en el aire
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(babyX + 2, babyY + 8, 2, 3);
    ctx.fillRect(babyX - 3, babyY + 11, 2, 2);
    ctx.fillRect(babyX - 7, babyY + 14, 2, 2);

    // Bocadillo del Hijo: "¡¡MAMÁAA!! ¡¡EL PISO SE CAE!!"
    drawDialogueBubble(ctx, babyX + 10, babyY - 15, '¡¡MAMÁAA!! ¡¡EL PISO SE CAE!!', '#ffffff', '#00b4d8');

    // Banner de Alerta Sísmica
    drawCutsceneBottomBanner(ctx, '¡¡EL RASCACIELOS SE DERRUMBA Y SE PARTE EN DOS POR EL TERREMOTO!!');
  }

  // ==========================================================================
  // ACTO 2: VIENE EL MONTÓN DE AGUA Y ARRASTRA AL HIJO (2.5s -> 5.0s)
  // ==========================================================================
  else if (t < 5.0) {
    const waveProgress = Math.min(1, (t - 2.5) / 2.5);
    const waveFrontX = Math.round(W + 40 - waveProgress * (W * 0.76));
    const floodH = Math.round(40 + waveProgress * (H - 80));

    // Edificio izquierdo resistiendo el empuje
    ctx.fillStyle = '#141724';
    ctx.fillRect(15, 140, 165, H);
    ctx.fillStyle = '#2b2d42';
    ctx.fillRect(10, 136, 175, 5);

    // Muro Colosal del Megatsunami que arrasa la ciudad y el segundo edificio
    const waveGrad = ctx.createLinearGradient(0, H - floodH - 30, 0, H);
    waveGrad.addColorStop(0, '#48cae4');
    waveGrad.addColorStop(0.2, '#00b4d8');
    waveGrad.addColorStop(0.6, '#0077b6');
    waveGrad.addColorStop(1, '#023e8a');
    ctx.fillStyle = waveGrad;
    ctx.fillRect(waveFrontX, H - floodH, W - waveFrontX + 40, floodH);

    // Corrientes turbulentas y vórtices de agua dentro del megatsunami
    ctx.fillStyle = 'rgba(202, 240, 248, 0.3)';
    for (let vx = waveFrontX; vx < W; vx += 28) {
      const vOff = Math.sin(globalFrame * 0.16 + vx * 0.08) * 8;
      ctx.fillRect(vx, H - floodH + 16 + vOff, 20, 4);
      ctx.fillRect(vx + 6, H - floodH + 36 - vOff, 18, 3);
    }

    // Cresta violenta de espuma marina rompiendo hacia la izquierda
    for (let x = waveFrontX - 8; x < W; x += 4) {
      const cy = H - floodH + Math.round(Math.sin(globalFrame * 0.18 + x * 0.14) * 5 + Math.cos(globalFrame * 0.1 + x * 0.06) * 4);
      ctx.fillStyle = '#03045e';
      ctx.fillRect(x, cy + 4, 5, 4);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(x, cy + 1, 5, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, cy - 2, 5, 3);

      // Salpicaduras violentas pulverizadas
      if ((globalFrame + x) % 4 === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x - 2, cy - 8, 2, 3);
        ctx.fillRect(x - 6, cy - 12, 3, 2);
      }
    }

    // Edificio derecho siendo devorado por las aguas del megatsunami
    ctx.fillStyle = 'rgba(20, 23, 36, 0.85)';
    ctx.fillRect(230, 160 + waveProgress * 40, 190, H);

    // Mamá Elizabeth en el borde del edificio izquierdo, estirando los brazos
    const mamaX = 145;
    const mamaY = 112;
    window.sprites.drawMamaMouse(ctx, mamaX, mamaY, 'run', globalFrame, true, 1.2, 0.85, 0, false, saveState.equippedSkin);

    // Bocadillo de Elizabeth: "¡¡NOOO!! ¡¡HIJOOO!!"
    drawDialogueBubble(ctx, mamaX + 11, mamaY - 14, '¡¡NOOO!! ¡¡HIJOOO!!', '#ffd166', '#ff2a70');

    // Hijo Ratón siendo arrastrado por el torrente del tsunami mar adentro
    const babyX = Math.round(280 + waveProgress * 110);
    const babyY = Math.round(130 - Math.sin(waveProgress * Math.PI) * 16 + Math.sin(globalFrame * 0.22) * 5);

    // Espuma arremolinada alrededor del hijo
    ctx.fillStyle = '#caf0f8';
    ctx.beginPath();
    ctx.arc(babyX + 8, babyY + 16, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(babyX + 8, babyY + 16, 9, 0, Math.PI * 2);
    ctx.fill();

    window.sprites.drawBabyMouse(ctx, babyX, babyY, globalFrame, 3);

    // Lágrimas y salpicaduras del hijo pidiendo auxilio
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(babyX - 4, babyY + 6, 2, 2);
    ctx.fillRect(babyX - 8, babyY + 2, 2, 2);
    ctx.fillRect(babyX - 12, babyY - 2, 2, 2);

    drawDialogueBubble(ctx, babyX + 8, babyY - 16, '¡¡MAMÁAA!! ¡¡EL AGUA ME LLEVA!!', '#ffffff', '#0077b6');

    // Banner informativo inferior
    drawCutsceneBottomBanner(ctx, '¡¡UN MONTÓN COLOSAL DE AGUA ARRASTRA A TU HIJO MAR ADENTRO!!');
  }

  // ==========================================================================
  // ACTO 3: ELIZABETH SE LANZA CON SU TABLA DE SURF (5.0s -> 7.2s)
  // ==========================================================================
  else {
    const diveProgress = Math.min(1, (t - 5.0) / 2.2);

    // Mar embravecido en la parte inferior ocupando la pantalla
    const seaGrad = ctx.createLinearGradient(0, H / 2, 0, H);
    seaGrad.addColorStop(0, '#0077b6');
    seaGrad.addColorStop(0.35, '#023e8a');
    seaGrad.addColorStop(1, '#001233');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, H / 2 + 10, W, H / 2);

    // Oleaje agitado con espuma blanca continua
    for (let x = 0; x < W; x += 6) {
      const waveDy = Math.sin(globalFrame * 0.16 + x * 0.12) * 5;
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(x, H / 2 + 12 + waveDy, 6, 4);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(x, H / 2 + 10 + waveDy, 6, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, H / 2 + 8 + waveDy, 6, 2);
    }

    // Silueta de la torre sumergida en el horizonte (Antesala del Kraken)
    ctx.fillStyle = 'rgba(7, 18, 38, 0.75)';
    ctx.fillRect(W - 85, H / 2 - 35, 65, 80);
    ctx.fillRect(W - 75, H / 2 - 50, 45, 20);

    // Hijo en la cresta de la ola siendo llevado hacia la torre sumergida
    const sonDistX = Math.round(W - 100 + Math.sin(globalFrame * 0.15) * 8);
    const sonDistY = Math.round(H / 2 + 6 + Math.cos(globalFrame * 0.18) * 4);
    window.sprites.drawBabyMouse(ctx, sonDistX, sonDistY - 14, globalFrame, 3);
    drawDialogueBubble(ctx, sonDistX + 8, sonDistY - 26, '¡¡AYÚDAME MAMÁ!!', '#ffffff', '#00b4d8');

    // Salto parabólico épico de Elizabeth con su tabla de surf
    const arcY = Math.sin(diveProgress * Math.PI) * 48;
    const mamaX = Math.round(90 + diveProgress * (W / 2 - 40));
    const mamaY = Math.round(45 - arcY + diveProgress * 75);

    // Estela aerodinámica y destellos estelares tras la tabla
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 7; i++) {
      ctx.fillRect(mamaX - 16 - i * 14, mamaY + 6 - i * 5, 10, 2);
    }
    ctx.fillStyle = '#ffd166';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(mamaX - 12 - i * 18, mamaY + 9 - i * 4, 3, 3);
    }

    // Dibujar a Mamá Elizabeth montada en su tabla
    window.sprites.drawMamaSurfing(ctx, mamaX, mamaY, true, true, globalFrame, saveState.equippedSkin, saveState.surfboardSkin);

    // Bocadillo de Elizabeth con determinación heroica
    drawDialogueBubble(ctx, mamaX + 11, mamaY - 16, '¡¡RESISTE, HIJO! ¡¡YA VOY POR TI!!', '#ffd166', '#ff2a70');

    // Banner de lanzamiento
    drawCutsceneBottomBanner(ctx, '¡¡LANZAMIENTO ÉPICO: SURFEA EL MEGATSUNAMI PARA RESCATAR A TU HIJO!!');
  }
}

// Bocadillo de diálogo dinámico con estilo cómic / pixel art
function drawDialogueBubble(ctx, cx, cy, text, textColor = '#ffffff', borderColor = '#ff2a70') {
  ctx.save();
  ctx.font = `bold 6.5px ${UI_FONT}`;
  const tw = ctx.measureText(text).width;
  const bw = Math.round(tw + 12);
  const bh = 15;
  const bx = Math.round(cx - bw / 2);
  const by = Math.round(cy - bh / 2);

  // Sombra exterior
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(bx + 1, by + 1, bw, bh);

  // Panel
  drawRoundedPanel(bx, by, bw, bh, 3, 'rgba(18, 6, 22, 0.95)', borderColor, 1.2);

  // Puntero inferior hacia el personaje
  ctx.fillStyle = borderColor;
  ctx.beginPath();
  ctx.moveTo(cx - 3, by + bh);
  ctx.lineTo(cx, by + bh + 3);
  ctx.lineTo(cx + 3, by + bh);
  ctx.fill();

  // Texto
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = textColor;
  ctx.fillText(text, cx, cy + 0.5);

  ctx.restore();
}

// Banner inferior cinematográfico con borde de neón
function drawCutsceneBottomBanner(ctx, text) {
  const pw = 420;
  const ph = 26;
  const px = (W - pw) / 2;
  const py = H - 34;

  drawRoundedPanel(px, py, pw, ph, 6, 'rgba(12, 4, 16, 0.94)', '#ff2a70', 1.6);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 7px ${UI_FONT}`;
  ctx.fillText(text, W / 2, py + ph / 2);
}

if (typeof module !== 'undefined') {
  module.exports = { startTsunamiCutscene, updateTsunamiCutscene, drawTsunamiCutscene };
}


// --- MODULO: src/scenes/kraken_intro.js ---
// ============================================================================
// ESCENA CINEMÁTICA: APARICIÓN Y RUGIDO DEL KRAKEN DE LAS PROFUNDIDADES
// ============================================================================
let krakenIntroState = {
  active: false,
  timer: 0,
  duration: 4.2
};

function startKrakenIntroAnimation() {
  gameState = 'KRAKEN_INTRO';
  krakenIntroState = {
    active: true,
    timer: 0,
    duration: 4.2
  };
  window.krakenIntroState = krakenIntroState;
  triggerShake(1.5, 4.0);
  if (window.sfx && window.sfx.playHit) window.sfx.playHit();
}

function updateKrakenIntro(dt) {
  const s = window.krakenIntroState || krakenIntroState;
  s.timer += dt;

  if (globalFrame % 7 === 0) {
    triggerShake(0.6, 1.4);
  }

  if (s.timer >= s.duration || keys.jumpJustPressed) {
    s.active = false;
    gameState = 'PLAYING';
    if (typeof startKrakenBossFight === 'function') {
      startKrakenBossFight();
    }
  }
}

function drawKrakenIntroScene() {
  const s = window.krakenIntroState || krakenIntroState;
  const t = s.timer;

  // 1. Cielo de tempestad marina abisal
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#03071e');
  skyGrad.addColorStop(0.4, '#0a1128');
  skyGrad.addColorStop(0.75, '#1c2541');
  skyGrad.addColorStop(1, '#001233');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Relámpago ambiental cinemático
  if (t > 1.2 && (Math.floor(t * 12) % 18 === 0)) {
    ctx.fillStyle = 'rgba(202, 240, 248, 0.45)';
    ctx.fillRect(0, 0, W, H);
  }

  // 2. Aguas torrenciales y remolino en la base
  const seaGrad = ctx.createLinearGradient(0, H - 75, 0, H);
  seaGrad.addColorStop(0, '#0077b6');
  seaGrad.addColorStop(0.3, '#023e8a');
  seaGrad.addColorStop(0.7, '#001845');
  seaGrad.addColorStop(1, '#000814');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, H - 75, W, 75);

  // Espuma rompiente y spray pulverizado
  ctx.fillStyle = '#ffffff';
  for (let x = 0; x < W; x += 6) {
    const wy = H - 75 + Math.round(Math.sin(globalFrame * 0.15 + x * 0.25) * 3);
    ctx.fillRect(x, wy, 5, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(x + 1, wy + 2, 3, 2);
    ctx.fillStyle = '#ffffff';
  }

  // 3. Tentáculos laterales alzándose del remolino
  const tentRise = Math.min(1, t / 1.6);
  const ty = H - Math.round(tentRise * 115);
  if (window.sprites && window.sprites.drawKrakenTentacle) {
    window.sprites.drawKrakenTentacle(ctx, W / 2 - 120, ty + 20, globalFrame, 1.4);
    window.sprites.drawKrakenTentacle(ctx, W / 2 + 120, ty + 20, globalFrame, 1.4);
    window.sprites.drawKrakenTentacle(ctx, W / 2 - 65, ty + 40, globalFrame, 1.15);
    window.sprites.drawKrakenTentacle(ctx, W / 2 + 65, ty + 40, globalFrame, 1.15);
  }

  // 4. Cabeza colosal del Kraken emergiendo desde el fondo
  const headRise = Math.min(1, Math.max(0, (t - 0.7) / 2.0));
  const headY = H - 15 - Math.round(headRise * 95);
  const tempBoss = { x: W / 2, y: headY, hitTimer: 0, eyesRemaining: 8, phase: 1 };
  if (window.sprites && window.sprites.drawKrakenBoss) {
    window.sprites.drawKrakenBoss(ctx, tempBoss, globalFrame);
  }

  // Ondas de choque sónicas del rugido si t > 1.8
  if (t >= 1.8) {
    const pulse = ((t - 1.8) * 140) % 200;
    ctx.strokeStyle = '#00f5d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(W / 2, headY - 10, pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(W / 2, headY - 10, pulse * 0.65, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 5. Banner cinemático del Boss en marco náutico abisal
  if (t >= 1.4) {
    const bw = 350;
    const bh = 36;
    const bx = Math.round((W - bw) / 2);
    const by = 20;
    drawRoundedPanel(bx, by, bw, bh, 8, 'rgba(3, 7, 30, 0.95)', '#00b4d8', 2.0);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd166';
    ctx.font = `bold 8.5px ${UI_FONT}`;
    ctx.fillText('¡KRAKEN ABISAL DEL MEGATSUNAMI!', W / 2, by + 13);

    ctx.fillStyle = '#caf0f8';
    ctx.font = `6px ${UI_FONT}`;
    ctx.fillText('Guardián del Remolino - ¡Arroja escombros para destruir sus 8 ojos!', W / 2, by + 26);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { startKrakenIntroAnimation, updateKrakenIntro, drawKrakenIntroScene };
}


// --- MODULO: src/scenes/kraken_victory_cutscene.js ---
// ============================================================================
// CINEMÁTICA FINAL: HUNDIMIENTO DEL KRAKEN, ABRAZO Y RETORNO A LA MADRIGUERA
// ============================================================================
let krakenVictoryState = { active: false, timer: 0, duration: 5.2 };

function startKrakenVictoryCutscene() {
  gameState = 'KRAKEN_VICTORY_CUTSCENE';
  krakenVictoryState = { active: true, timer: 0, duration: 5.2 };
  window.krakenVictoryState = krakenVictoryState;
  triggerShake(1.2, 2.0);
  if (window.sfx && window.sfx.playVictory) window.sfx.playVictory();
  if (!saveState.rescuedBabies.includes(3)) {
    saveState.rescuedBabies.push(3);
    if (typeof persistSave === 'function') persistSave();
  }
}

function updateKrakenVictoryCutscene(dt) {
  const s = window.krakenVictoryState || krakenVictoryState;
  s.timer += dt;
  if (s.timer >= s.duration || (s.timer > 1.2 && keys.jumpJustPressed)) {
    s.active = false;
    const baby = (window.LEVELS && window.LEVELS[2] && window.LEVELS[2].babyMouse) || {
      id: 3, name: 'Hijo Ratoncito', nextAbilityName: 'MAESTRA DE LAS OLAS Y CIUDAD RESCATADA'
    };
    enterSafeHouse(baby);
  }
}

function drawKrakenVictoryCutscene() {
  const s = window.krakenVictoryState || krakenVictoryState;
  const t = s.timer;

  // 1. Cielo de calma post-tormenta: atardecer dorado en el océano
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
  skyGrad.addColorStop(0, '#10002b');
  skyGrad.addColorStop(0.35, '#240046');
  skyGrad.addColorStop(0.65, '#e85d04');
  skyGrad.addColorStop(1, '#ffba08');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Sol poniente dorado rompiendo las nubes
  const sunX = W / 2 + 30;
  const sunY = 75;
  ctx.fillStyle = 'rgba(255, 209, 102, 0.35)';
  ctx.beginPath();
  ctx.arc(sunX, sunY, 52, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffbe0b';
  ctx.beginPath();
  ctx.arc(sunX, sunY, 34, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(sunX, sunY, 22, 0, Math.PI * 2);
  ctx.fill();

  // 2. Aguas marinas en calma y suave oleaje
  const seaGrad = ctx.createLinearGradient(0, H - 70, 0, H);
  seaGrad.addColorStop(0, '#0077b6');
  seaGrad.addColorStop(0.4, '#0096c7');
  seaGrad.addColorStop(0.8, '#023e8a');
  seaGrad.addColorStop(1, '#001233');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, H - 70, W, 70);

  // Espuma suave y destellos dorados del sol en el agua
  ctx.fillStyle = '#caf0f8';
  for (let x = 0; x < W; x += 12) {
    const wy = H - 70 + Math.round(Math.sin(globalFrame * 0.08 + x * 0.15) * 2);
    ctx.fillRect(x, wy, 8, 2);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(x + 2, wy + 2, 4, 1);
    ctx.fillStyle = '#caf0f8';
  }

  // 3. Hundimiento definitivo del Kraken en el abismo
  if (t < 3.2) {
    const sinkY = H - 15 + Math.round((t / 2.5) * 85);
    const defBoss = { x: W / 2 + 105, y: sinkY, hitTimer: 0.1, eyesRemaining: 0, phase: 1 };
    if (window.sprites && window.sprites.drawKrakenBoss) {
      window.sprites.drawKrakenBoss(ctx, defBoss, globalFrame);
    }
    // Burbujas subiendo a la superficie
    for (let b = 0; b < 6; b++) {
      const bx = W / 2 + 85 + (b * 12);
      const by = H - 65 - ((Math.floor(globalFrame * 2 + b * 14)) % 50);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(bx, by, 3, 3);
    }
  }

  // 4. Plataforma del helipuerto de la torre
  const platX = 50, platY = H - 65, platW = 280;
  ctx.fillStyle = '#1f2421';
  ctx.fillRect(platX, platY, platW, 20);
  ctx.fillStyle = '#dee2e6';
  ctx.fillRect(platX, platY, platW, 4);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(platX + 20, platY + 4, platW - 40, 2);

  // 5. Mamá Ratón y su Hijo corriendo a abrazarse
  let mamaX = platX + 40 + Math.min(60, t * 40);
  let sonX = platX + 170 - Math.min(50, t * 35);
  const reached = (sonX - mamaX) <= 16;
  if (reached) {
    mamaX = platX + 94;
    sonX = platX + 110;
    const heartBob = Math.sin(globalFrame * 0.2) * 4;
    ctx.fillStyle = '#ff0054';
    ctx.fillRect(platX + 101, platY - 26 + heartBob, 4, 4);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(platX + 102, platY - 28 + heartBob, 2, 2);
  }

  if (window.sprites) {
    window.sprites.drawMamaMouse(ctx, mamaX, platY - 22, reached ? 'idle' : 'run', globalFrame * 0.15, true, 1.2, 1.2, 0, false, saveState.equippedSkin);
    window.sprites.drawBabyMouse(ctx, sonX, platY - 18, globalFrame, 3);
  }

  // 6. Portal Interdimensional Verde hacia la Madriguera
  if (t >= 2.4) {
    const portalScale = Math.min(1.0, (t - 2.4) / 0.8);
    const portalX = platX + 220, portalY = platY - 16;
    if (window.sprites && window.sprites.drawPortal) {
      window.sprites.drawPortal(ctx, portalX, portalY, globalFrame, portalScale);
    }
    if (globalFrame % 4 === 0) spawnStarSparkles(portalX, portalY, 1, '#ccff33');
  }

  // 7. Banner Cinemático Triunfal
  const bw = 340, bh = 36, bx = Math.round((W - bw) / 2), by = 18;
  drawRoundedPanel(bx, by, bw, bh, 8, 'rgba(3, 7, 30, 0.94)', '#ffd166', 1.8);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd166';
  ctx.font = `bold 8.5px ${UI_FONT}`;
  ctx.fillText('¡KRAKEN DERROTADO! ¡HIJO RESCATADO!', W / 2, by + 14);
  ctx.fillStyle = '#caf0f8';
  ctx.font = `6px ${UI_FONT}`;
  ctx.fillText('¡El Megatsunami ha sido calmado! Regresando a la Madriguera...', W / 2, by + 27);
  ctx.textAlign = 'left';
}

if (typeof module !== 'undefined') {
  module.exports = { startKrakenVictoryCutscene, updateKrakenVictoryCutscene, drawKrakenVictoryCutscene };
}


// --- MODULO: src/core/input/keyboard.js ---
// ============================================================================
// CONTROLES TÁCTILES, CLICS EN PANEL DE MENÚ Y TECLADO
// ============================================================================
window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    keyboardState.left = true;
    keys.left = true;
  }
  if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    keyboardState.right = true;
    keys.right = true;
  }
  if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    keyboardState.down = true;
    if (!keys.down) keys.downJustPressed = true;
    keys.down = true;
  }
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    keyboardState.jump = true;
    if (!keys.jumpPressed) keys.jumpJustPressed = true;
    keys.jumpPressed = true;
  }
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyX' || e.code === 'KeyK') {
    keys.dashJustPressed = true;
  }
  // Tecla Escape / M / P para abrir el mapa de mundos o retroceder
  if (e.code === 'Escape' || e.code === 'KeyM' || e.code === 'KeyP') {
    if (gameState === 'PLAYING') {
      window.sfx.playJump(false);
      openWorldMap(currentLevelIndex);
    } else if (gameState === 'WORLD_MAP') {
      window.sfx.playJump(false);
      gameState = 'TITLE';
    } else if (gameState === 'SHOP') {
      window.sfx.playJump(false);
      gameState = previousShopState || 'TITLE';
    }
  }
  // Atajos de teclado (1 a 9) para cambiar entre Fases / Checkpoints con animacion de pistola de portales
  if (level && gameState === 'PLAYING') {
    if (typeof isPortalTeleportActive === 'function' && isPortalTeleportActive()) return;

    function triggerPhaseTeleport(levelIdx, cpId) {
      if (gameState === 'PLAYING' && currentLevelIndex === levelIdx) {
        if (typeof startInLevelPortalTeleport === 'function') {
          startInLevelPortalTeleport(cpId);
          return;
        }
      }
      jumpToLevelPhase(levelIdx, cpId);
    }

    if (level.id === 1) {
      if (e.code === 'Digit1') triggerPhaseTeleport(0, null);
      if (e.code === 'Digit2') triggerPhaseTeleport(0, 1);
      if (e.code === 'Digit3') triggerPhaseTeleport(0, 2);
    } else if (level.id === 2) {
      if (e.code === 'Digit1') triggerPhaseTeleport(1, null);
      if (e.code === 'Digit2') triggerPhaseTeleport(1, 1);
      if (e.code === 'Digit3') triggerPhaseTeleport(1, 2);
      if (e.code === 'Digit4') triggerPhaseTeleport(1, 3);
      if (e.code === 'Digit5') triggerPhaseTeleport(1, 4);
    } else if (level.id === 3) {
      if (e.code === 'Digit1') triggerPhaseTeleport(2, null);
      if (e.code === 'Digit2') triggerPhaseTeleport(2, 5);
      if (e.code === 'Digit3') triggerPhaseTeleport(2, 9);
      if (e.code === 'Digit4') triggerPhaseTeleport(2, 13);
      if (e.code === 'Digit5') triggerPhaseTeleport(2, 14);
    } else if (level.id === 4) {
      if (e.code === 'Digit1') triggerPhaseTeleport(3, null);
      if (e.code === 'Digit2') triggerPhaseTeleport(3, 19);
      if (e.code === 'Digit3') triggerPhaseTeleport(3, 23);
      if (e.code === 'Digit4') triggerPhaseTeleport(3, 30);
      if (e.code === 'Digit5') triggerPhaseTeleport(3, 37);
      if (e.code === 'Digit6') triggerPhaseTeleport(3, 41);
      if (e.code === 'Digit7') triggerPhaseTeleport(3, 42);
      if (e.code === 'Digit8') triggerPhaseTeleport(3, 45);
      if (e.code === 'Digit9') triggerPhaseTeleport(3, 48);
    }
  }
});

window.addEventListener('keyup', e => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    keyboardState.left = false;
    keys.left = touchState.left || gamepadMovement.left;
  }
  if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    keyboardState.right = false;
    keys.right = touchState.right || gamepadMovement.right;
  }
  if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    keyboardState.down = false;
    keys.down = touchState.down || gamepadMovement.down;
  }
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    keyboardState.jump = false;
    keys.jumpPressed = touchState.jump || gamepadMovement.jump;
  }
});


// --- MODULO: src/core/input/touch.js ---
function bindTouchButton(id, onDown, onUp) {
  const btn = document.getElementById(id);
  if (!btn) return;

  const handleStart = e => {
    e.preventDefault();
    window.sfx.init();
    btn.classList.add('pressed');
    document.getElementById('touch-controls')?.classList.remove('gamepad-active');
    onDown();
  };

  const handleEnd = e => {
    e.preventDefault();
    btn.classList.remove('pressed');
    if (onUp) onUp();
  };

  btn.addEventListener('touchstart', handleStart, { passive: false });
  btn.addEventListener('touchend', handleEnd, { passive: false });
  btn.addEventListener('touchcancel', handleEnd, { passive: false });
  btn.addEventListener('mousedown', handleStart);
  btn.addEventListener('mouseup', handleEnd);
  btn.addEventListener('mouseleave', handleEnd);
}

bindTouchButton(
  'btn-left',
  () => { touchState.left = true; keys.left = true; },
  () => { touchState.left = false; keys.left = keyboardState.left || gamepadMovement.left; }
);
bindTouchButton(
  'btn-right',
  () => { touchState.right = true; keys.right = true; },
  () => { touchState.right = false; keys.right = keyboardState.right || gamepadMovement.right; }
);
bindTouchButton('btn-dash', () => { keys.dashJustPressed = true; });
bindTouchButton(
  'btn-jump',
  () => {
    touchState.jump = true;
    if (!keys.jumpPressed) keys.jumpJustPressed = true;
    keys.jumpPressed = true;
  },
  () => {
    touchState.jump = false;
    keys.jumpPressed = keyboardState.jump || gamepadMovement.jump;
  }
);


// --- MODULO: src/core/input/gamepad.js ---
// Eventos de conexión de mando (Xbox, PlayStation, Switch, Genéricos)
window.addEventListener('gamepadconnected', e => {
  gamepadConnected = true;
  gamepadName = cleanGamepadName(e.gamepad.id);
  showGamepadToast(`🎮 ¡MANDO CONECTADO: ${gamepadName}!`);
  document.getElementById('touch-controls')?.classList.add('gamepad-active');
  if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
  rumbleGamepad(180, 0.4, 0.7);
});

window.addEventListener('gamepaddisconnected', () => {
  gamepadConnected = false;
  showGamepadToast('🎮 Mando desconectado');
  document.getElementById('touch-controls')?.classList.remove('gamepad-active');
});

window.addEventListener('touchstart', () => {
  document.getElementById('touch-controls')?.classList.remove('gamepad-active');
}, { passive: true });


function drawGamepadMenuCursor() {
  if (!gamepadConnected) return;
  if (!menuButtons || menuButtons.length === 0) return;
  if (selectedMenuIndex >= menuButtons.length) selectedMenuIndex = 0;
  const b = menuButtons[selectedMenuIndex];
  if (!b) return;

  const pulse = Math.sin(globalFrame * 0.22) * 1.5;
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(b.x - 2 - pulse, b.y - 2 - pulse, b.w + 4 + pulse * 2, b.h + 4 + pulse * 2);
  ctx.restore();
}

function pollGamepad(dt) {
  if (!navigator.getGamepads) return;

  const gamepads = navigator.getGamepads();
  let pad = null;
  for (let i = 0; i < gamepads.length; i++) {
    if (gamepads[i] && gamepads[i].connected) {
      pad = gamepads[i];
      break;
    }
  }

  if (!pad) {
    if (gamepadConnected) {
      gamepadConnected = false;
      showGamepadToast('🎮 Mando desconectado');
      document.getElementById('touch-controls')?.classList.remove('gamepad-active');
    }
    gamepadMovement.left = false;
    gamepadMovement.right = false;
    gamepadMovement.jump = false;
    return;
  }

  if (!gamepadConnected) {
    gamepadConnected = true;
    gamepadName = cleanGamepadName(pad.id);
    showGamepadToast(`🎮 ¡MANDO CONECTADO: ${gamepadName}!`);
    document.getElementById('touch-controls')?.classList.add('gamepad-active');
    if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
    rumbleGamepad(160, 0.4, 0.6);
  }

  const btnCount = pad.buttons.length;
  const isBtnDown = idx => (idx < btnCount && pad.buttons[idx].pressed);
  const isBtnJustPressed = idx => (idx < btnCount && pad.buttons[idx].pressed && !prevGamepadButtons[idx]);

  // Ejes del stick izquierdo con zona muerta
  const axisX = (pad.axes && pad.axes.length > 0) ? pad.axes[0] : 0;
  const axisY = (pad.axes && pad.axes.length > 1) ? pad.axes[1] : 0;
  const deadzone = 0.25;
  const stickLeft = axisX < -deadzone;
  const stickRight = axisX > deadzone;
  const stickUp = axisY < -deadzone;
  const stickDown = axisY > deadzone;

  // D-Pad standard mapping
  const dpadUp = isBtnDown(12);
  const dpadDown = isBtnDown(13);
  const dpadLeft = isBtnDown(14);
  const dpadRight = isBtnDown(15);

  const moveLeft = stickLeft || dpadLeft;
  const moveRight = stickRight || dpadRight;

  if (menuNavCooldown > 0) menuNavCooldown -= dt;

  // Si se detecta cualquier pulsación en el mando, asegurar que se atenúen los controles táctiles
  if (moveLeft || moveRight || isBtnDown(0) || isBtnDown(1) || isBtnDown(2) || isBtnDown(3)) {
    document.getElementById('touch-controls')?.classList.add('gamepad-active');
  }

  // =========================================================================
  // MODO 1: NAVEGACIÓN EN MENÚS (TITLE, WORLD_MAP, SHOP)
  // =========================================================================
  if (gameState === 'TITLE' || gameState === 'WORLD_MAP' || gameState === 'SHOP') {
    if (menuButtons.length > 0) {
      if (selectedMenuIndex >= menuButtons.length) selectedMenuIndex = 0;
      if (selectedMenuIndex < 0) selectedMenuIndex = menuButtons.length - 1;

      if (menuNavCooldown <= 0) {
        if (moveRight || stickDown || dpadDown) {
          selectedMenuIndex = (selectedMenuIndex + 1) % menuButtons.length;
          menuNavCooldown = 0.20;
          if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
        } else if (moveLeft || stickUp || dpadUp) {
          selectedMenuIndex = (selectedMenuIndex - 1 + menuButtons.length) % menuButtons.length;
          menuNavCooldown = 0.20;
          if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
        }
      }

      if (isBtnJustPressed(0) || isBtnJustPressed(2) || isBtnJustPressed(9)) {
        rumbleGamepad(70, 0.3, 0.4);
        if (menuButtons[selectedMenuIndex] && menuButtons[selectedMenuIndex].action) {
          menuButtons[selectedMenuIndex].action();
        }
      }
    }

    if (isBtnJustPressed(1)) {
      rumbleGamepad(50, 0.2, 0.2);
      if (gameState === 'SHOP' || gameState === 'WORLD_MAP') {
        gameState = 'TITLE';
        selectedMenuIndex = 0;
        if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
      }
    }
  }

  // =========================================================================
  // MODO 2: DIÁLOGOS
  // =========================================================================
  else if (gameState === 'DIALOGUE') {
    if (isBtnJustPressed(0) || isBtnJustPressed(1) || isBtnJustPressed(2) || isBtnJustPressed(3) || isBtnJustPressed(9)) {
      keys.jumpJustPressed = true;
      rumbleGamepad(40, 0.2, 0.2);
    }
  }

  // =========================================================================
  // MODO 3: ESCENAS DE INTERLUDIO
  // =========================================================================
  else if (gameState === 'VICTORY' || gameState === 'GAMEOVER' || gameState === 'SAFE_HOUSE') {
    if (isBtnJustPressed(0) || isBtnJustPressed(1) || isBtnJustPressed(2) || isBtnJustPressed(3) || isBtnJustPressed(9)) {
      keys.jumpJustPressed = true;
      rumbleGamepad(70, 0.3, 0.4);
    }
  }

  // =========================================================================
  // MODO 4: GAMEPLAY ACTIVO (PLAYING)
  // =========================================================================
  else if (gameState === 'PLAYING') {
    // Salto
    const jumpBtnDown = isBtnDown(0) || isBtnDown(3) || dpadUp;
    const jumpBtnJust = isBtnJustPressed(0) || isBtnJustPressed(3) || (dpadUp && !prevGamepadButtons[12]);
    if (jumpBtnJust) {
      keys.jumpJustPressed = true;
      rumbleGamepad(40, 0.1, 0.1);
    }

    // Dash (Lava Run)
    const dashBtnJust = isBtnJustPressed(2) || isBtnJustPressed(1) || isBtnJustPressed(4) || isBtnJustPressed(5) || isBtnJustPressed(6) || isBtnJustPressed(7);
    if (dashBtnJust) {
      keys.dashJustPressed = true;
      rumbleGamepad(110, 0.4, 0.2);
    }

    // Selector de Zonas / Mapa
    if (isBtnJustPressed(8)) {
      rumbleGamepad(60, 0.2, 0.2);
      openWorldMap(currentLevelIndex);
      selectedMenuIndex = 0;
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }

    // Pausa / Menú
    if (isBtnJustPressed(9)) {
      rumbleGamepad(60, 0.2, 0.2);
      gameState = 'TITLE';
      selectedMenuIndex = 0;
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }

    // Reaparición rápida en Checkpoint (L3 / R3)
    if (isBtnJustPressed(10) || isBtnJustPressed(11)) {
      if (player) {
        player.x = player.spawnX;
        player.y = player.spawnY;
        player.vx = 0;
        player.vy = 0;
        spawnFloatingText(player.x - 20, player.y - 12, '📍 REAPARICIÓN', '#00f5d4');
        rumbleGamepad(110, 0.4, 0.4);
      }
    }

    // Flecha abajo / Hablar con NPC
    const downBtnDown = stickDown || dpadDown;
    const downBtnJust = (dpadDown && !prevGamepadButtons[13]);
    if (downBtnJust) {
      keys.downJustPressed = true;
    }

    // Movimiento
    gamepadMovement.left = moveLeft;
    gamepadMovement.right = moveRight;
    gamepadMovement.down = downBtnDown;
    gamepadMovement.jump = jumpBtnDown;
  }

  // Actualizar keys combinando teclado, táctil y mando
  keys.left = keyboardState.left || touchState.left || gamepadMovement.left;
  keys.right = keyboardState.right || touchState.right || gamepadMovement.right;
  keys.down = keyboardState.down || touchState.down || gamepadMovement.down;
  keys.jumpPressed = keyboardState.jump || touchState.jump || gamepadMovement.jump;

  // Guardar estado de botones
  for (let i = 0; i < btnCount; i++) {
    prevGamepadButtons[i] = pad.buttons[i].pressed;
  }
}

// --- MODULO: src/core/input/pointer.js ---
// Detectar toques/clics sobre los botones del Menú Principal, Mapa de Mundos, Tienda y HUD
canvas.addEventListener('pointerdown', e => {
  window.sfx.init();
  const rect = canvas.getBoundingClientRect();
  const cx = ((e.clientX - rect.left) / rect.width) * W;
  const cy = ((e.clientY - rect.top) / rect.height) * H;

  if (gameState === 'TITLE' || gameState === 'WORLD_MAP' || gameState === 'SHOP') {
    for (const b of menuButtons) {
      if (cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h) {
        b.action();
        return;
      }
    }
    // Si toca en la zona de planetas de la constelación, permitir arrastre horizontal
    if (gameState === 'WORLD_MAP' && cy >= 34 && cy <= 110) {
      worldMapDrag.active = true;
      worldMapDrag.startX = cx;
      worldMapDrag.startScroll = worldMapScrollX;
      worldMapDrag.hasMoved = false;
    }
  } else if (gameState === 'PLAYING') {
    for (const hb of hudPhaseButtons) {
      if (cx >= hb.x && cx <= hb.x + hb.w && cy >= hb.y && cy <= hb.y + hb.h) {
        hb.action();
        return;
      }
    }
    if (typeof nearbyNpc !== 'undefined' && nearbyNpc) {
      const camX = typeof camera !== 'undefined' ? camera.x : 0;
      const camY = typeof camera !== 'undefined' ? camera.y : 0;
      const worldX = cx + camX;
      const worldY = cy + camY;
      if (Math.abs(worldX - (nearbyNpc.x + 8)) < 40 && Math.abs(worldY - (nearbyNpc.y + 8)) < 45) {
        keys.downJustPressed = true;
        return;
      }
    }
  } else if (gameState === 'DIALOGUE') {
    if (typeof dialogueChoiceButtons !== 'undefined' && dialogueChoiceButtons.length > 0) {
      for (const cb of dialogueChoiceButtons) {
        if (cx >= cb.x && cx <= cb.x + cb.w && cy >= cb.y && cy <= cb.y + cb.h) {
          selectDialogueChoice(cb.index);
          return;
        }
      }
    }
    keys.jumpJustPressed = true;
  } else {
    keys.jumpJustPressed = true;
  }
});

window.addEventListener('pointermove', e => {
  if (gameState === 'WORLD_MAP' && worldMapDrag.active) {
    const rect = canvas.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * W;
    const dx = cx - worldMapDrag.startX;
    if (Math.abs(dx) > 4) {
      worldMapDrag.hasMoved = true;
      const maxScroll = Math.max(0, WORLDS_CONFIG[WORLDS_CONFIG.length - 1].x - (W - 80));
      targetWorldMapScrollX = Math.max(0, Math.min(maxScroll, worldMapDrag.startScroll - dx));
      worldMapScrollX = targetWorldMapScrollX;
    }
  }
});

window.addEventListener('pointerup', () => {
  if (gameState === 'WORLD_MAP' && worldMapDrag.active) {
    worldMapDrag.active = false;
    if (worldMapDrag.hasMoved) {
      const centerWorldX = worldMapScrollX + W / 2;
      let closestIdx = 0, minDist = Infinity;
      for (let i = 0; i < WORLDS_CONFIG.length; i++) {
        const d = Math.abs(WORLDS_CONFIG[i].x - centerWorldX);
        if (d < minDist) { minDist = d; closestIdx = i; }
      }
      selectedWorldIndex = closestIdx;
      selectedZoneCpId = null;
      targetWorldMapScrollX = getWorldMapScrollTarget(selectedWorldIndex);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  }
});

// Botones de la barra superior con Iconos SVG
document.getElementById('btn-menu')?.addEventListener('click', () => {
  const dashBtn = document.getElementById('btn-dash');
  if (dashBtn) dashBtn.classList.remove('visible');
  gameState = 'TITLE';
});

document.getElementById('btn-map')?.addEventListener('click', () => {
  const dashBtn = document.getElementById('btn-dash');
  if (dashBtn) dashBtn.classList.remove('visible');
  openWorldMap(currentLevelIndex);
});

document.getElementById('btn-mute')?.addEventListener('click', e => {
  const muted = window.sfx.toggleMute();
  e.currentTarget.style.opacity = muted ? '0.45' : '1';
});

document.getElementById('btn-restart')?.addEventListener('click', () => {
  if (gameState === 'PLAYING' && player) {
    player.x = player.spawnX;
    player.y = player.spawnY;
    player.vx = 0;
    player.vy = 0;
  } else {
    loadLevel(currentLevelIndex);
    gameState = 'PLAYING';
  }
});

document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
  const wrapper = document.getElementById('game-wrapper');
  if (!document.fullscreenElement) {
    wrapper.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
});



// --- MODULO: src/core/loop/update.js ---
// ============================================================================
// ACTUALIZACIÓN PRINCIPAL (60 FPS)
// ============================================================================
function update(dt) {
  globalFrame += dt * 60;

  if (shakeTime > 0) shakeTime -= dt;
  updateGamepadToast(dt);

  // 1. Pantalla de Menú Principal, Mapa de Mundos o Tienda
  if (gameState === 'TITLE' || gameState === 'WORLD_MAP' || gameState === 'SHOP') {
    if (gameState === 'TITLE' && keys.jumpJustPressed) {
      window.sfx.init();
      window.sfx.playCheese();
      openWorldMap(currentLevelIndex);
    } else if (gameState === 'WORLD_MAP') {
      if (worldMapNavCooldown > 0) worldMapNavCooldown -= dt;

      // Navegación fluida con Teclado (A/D, Flechas) y Mando en el Mapa Estelar
      if (worldMapNavCooldown <= 0) {
        if (keys.right || keyboardState.right) {
          if (selectedWorldIndex < WORLDS_CONFIG.length - 1) {
            selectedWorldIndex++;
            selectedZoneCpId = null;
            worldMapNavCooldown = 0.22;
            if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
          }
        } else if (keys.left || keyboardState.left) {
          if (selectedWorldIndex > 0) {
            selectedWorldIndex--;
            selectedZoneCpId = null;
            worldMapNavCooldown = 0.22;
            if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
          }
        }
      }

      // Desplazamiento horizontal suave (lerp) de la cámara hacia el mundo seleccionado
      targetWorldMapScrollX = getWorldMapScrollTarget(selectedWorldIndex);
      worldMapScrollX += (targetWorldMapScrollX - worldMapScrollX) * Math.min(1, dt * 10);

      if (keys.jumpJustPressed) {
        window.sfx.init();
        if (selectedWorldIndex < 4) {
          jumpToLevelPhase(selectedWorldIndex, selectedZoneCpId);
        } else {
          // Mundo bloqueado
          if (window.sfx && window.sfx.playHit) window.sfx.playHit();
          shakeTime = 0.2;
          shakeMag = 3;
        }
      }
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Minijuego Arcade Retro (Mundo 4 • Casa 4)
  if (gameState === 'ARCADE_MINIGAME') {
    if (typeof updateArcadeMinigame === 'function') {
      updateArcadeMinigame(dt);
    }
    return;
  }

  // Animación Cinemática de Ensamblaje de Llave Maestra (Mundo 3 • Fase 4)
  if (gameState === 'KEY_ASSEMBLY') {
    if (typeof updateKeyAssembly === 'function') {
      updateKeyAssembly(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Animación Cinemática de Ascensor al Piso 100
  if (gameState === 'ELEVATOR_RIDE') {
    if (typeof updateElevatorCutscene === 'function') {
      updateElevatorCutscene(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Animación Cinemática de Terremoto, Megatsunami y Salto en Tabla
  if (gameState === 'TSUNAMI_CUTSCENE') {
    if (typeof updateTsunamiCutscene === 'function') {
      updateTsunamiCutscene(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Animación Cinemática de Aparición del Kraken (Mundo 3 • Fase 5)
  if (gameState === 'KRAKEN_INTRO') {
    if (typeof updateKrakenIntro === 'function') {
      updateKrakenIntro(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // Animación Cinemática Final: Victoria del Kraken y Regreso a la Madriguera
  if (gameState === 'KRAKEN_VICTORY_CUTSCENE') {
    if (typeof updateKrakenVictoryCutscene === 'function') {
      updateKrakenVictoryCutscene(dt);
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // 2. Pantalla de Victoria Final o Game Over
  if (gameState === 'VICTORY' || gameState === 'GAMEOVER') {
    if (keys.jumpJustPressed) {
      window.sfx.playJump(false);
      if (gameState === 'GAMEOVER') {
        loadLevel(currentLevelIndex);
        gameState = 'PLAYING';
      } else {
        gameState = 'TITLE';
      }
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // 3. Modo Diálogo (Con Hijo Ratón o con un NPC de la Villa)
  if (gameState === 'DIALOGUE') {
    const currentLine = activeDialogueList[dialogueIndex];
    if (currentLine) {
      dialogueTimer += dt;
      if (dialogueTimer >= 0.028 && dialogueCharIndex < currentLine.text.length) {
        dialogueTimer = 0;
        dialogueCharIndex++;
        if (dialogueCharIndex % 2 === 0) {
          const isBaby = currentLine.speaker.includes('Hijo');
          window.sfx.playBlip(isBaby);
        }
      }

      const hasChoices = currentLine.choices && currentLine.choices.length > 0 && dialogueCharIndex >= currentLine.text.length;
      if (hasChoices) {
        if (typeof dialogueChoiceIndex === 'undefined') dialogueChoiceIndex = 0;
        if (keys.rightJustPressed) {
          dialogueChoiceIndex = (dialogueChoiceIndex + 1) % currentLine.choices.length;
          if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
        } else if (keys.leftJustPressed) {
          dialogueChoiceIndex = (dialogueChoiceIndex - 1 + currentLine.choices.length) % currentLine.choices.length;
          if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
        }

        if (keyboardState['1'] || keyboardState['Digit1'] || keyboardState['Numpad1']) {
          selectDialogueChoice(0);
          keyboardState['1'] = false; keyboardState['Digit1'] = false; keyboardState['Numpad1'] = false;
        } else if (keyboardState['2'] || keyboardState['Digit2'] || keyboardState['Numpad2']) {
          selectDialogueChoice(1);
          keyboardState['2'] = false; keyboardState['Digit2'] = false; keyboardState['Numpad2'] = false;
        } else if (keyboardState['3'] || keyboardState['Digit3'] || keyboardState['Numpad3']) {
          selectDialogueChoice(2);
          keyboardState['3'] = false; keyboardState['Digit3'] = false; keyboardState['Numpad3'] = false;
        } else if (keys.jumpJustPressed) {
          selectDialogueChoice(dialogueChoiceIndex);
        }
        keys.jumpJustPressed = false;
        keys.dashJustPressed = false;
        return;
      }

      if (keys.jumpJustPressed || keys.downJustPressed) {
        if (dialogueCharIndex < currentLine.text.length) {
          dialogueCharIndex = currentLine.text.length;
        } else {
          dialogueIndex++;
          dialogueCharIndex = 0;
          if (dialogueIndex >= activeDialogueList.length) {
            if (dialogueMode === 'NPC') {
              // Termina de hablar con el NPC y sigue jugando
              if (activeNpc && typeof activeNpc.onDialogueEnd === 'function') {
                activeNpc.onDialogueEnd();
              }
              if (activeNpc && typeof handleNpcQuestDialogueEnd === 'function') {
                handleNpcQuestDialogueEnd(activeNpc);
              }
              activeNpc = null;
              gameState = 'PLAYING';
              keys.downJustPressed = false;
              keys.down = false;
              window.sfx.playJump(false);
            } else {
              // Terminó de hablar con el Hijo Ratón: ¡Se abre el Portal estilo Rick & Morty!
              window.sfx.playPortal();
              exitPortal = {
                x: level.babyMouse.x + 36,
                y: level.babyMouse.y + 6,
                scale: 0.05
              };
              triggerShake(0.18, 2.2);
              spawnStarSparkles(exitPortal.x, exitPortal.y, 14, '#ccff33');
              spawnStarSparkles(exitPortal.x, exitPortal.y, 10, '#ffffff');
              gameState = 'PORTAL_OUT';
            }
          } else {
            window.sfx.playJump(false);
          }
        }
      }
    }
    updateEffects(dt);
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    keys.downJustPressed = false;
    return;
  }

  // 4. Animación de Entrada al Portal Interdimensional (Fin de Nivel -> Casa)
  if (gameState === 'PORTAL_OUT') {
    if (exitPortal.scale < 1) {
      exitPortal.scale = Math.min(1, exitPortal.scale + dt * 3.2);
    }
    // Chispas continuas emanando del portal
    if (globalFrame % 5 === 0) {
      spawnStarSparkles(
        exitPortal.x + (Math.random() - 0.5) * 14,
        exitPortal.y + (Math.random() - 0.5) * 24,
        1,
        '#ccff33'
      );
    }

    // Mamá Ratón y el Hijo caminan hacia el portal verde
    const targetX = exitPortal.x - 6;
    const distPlayer = Math.abs(player.x - targetX);
    player.x += (targetX - player.x) * Math.min(1, dt * 4.5);
    level.babyMouse.x += (targetX - level.babyMouse.x) * Math.min(1, dt * 5.5);
    player.state = 'run';
    player.animFrame += dt * 12;

    // Distorsión gravitatoria / atracción del portal
    if (distPlayer < 22) {
      player.squashX = 0.65;
      player.squashY = 1.35;
    }

    if (distPlayer < 5 && exitPortal.scale >= 0.95) {
      // Estallido de plasma al entrar al hiperespacio
      spawnStarSparkles(exitPortal.x, exitPortal.y, 20, '#ffffff');
      spawnStarSparkles(exitPortal.x, exitPortal.y, 16, '#70e000');
      triggerShake(0.15, 2.0);

      // Guardar hijo rescatado en la Casa
      const babyId = level.babyMouse.id || (currentLevelIndex + 1);
      if (!saveState.rescuedBabies.includes(babyId)) {
        saveState.rescuedBabies.push(babyId);
        persistSave();
      }
      enterSafeHouse(level.babyMouse);
    }
    updateEffects(dt);
    keys.jumpJustPressed = false;
    return;
  }

  // 5. Escena en LA CASA / MADRIGUERA (Continuidad de hijos rescatados + Entrega de Habilidad)
  if (gameState === 'SAFE_HOUSE') {
    houseState.timer += dt;
    if (houseState.phase === 'greeting') {
      if (keys.jumpJustPressed) {
        window.sfx.playPortal();
        houseState.phase = 'entering_next';
      }
    } else if (houseState.phase === 'entering_next') {
      houseState.mamaX += 155 * dt;
      // Estela de chispas verdes
      if (globalFrame % 6 === 0) {
        spawnStarSparkles(houseState.mamaX, houseState.mamaY - 10, 1, '#9ef01a');
      }
      if (houseState.mamaX >= houseState.portalX - 10) {
        spawnStarSparkles(houseState.portalX, houseState.portalY, 18, '#ffffff');
        spawnStarSparkles(houseState.portalX, houseState.portalY, 14, '#ccff33');
        triggerShake(0.14, 2.0);
        // Teletransportarse al siguiente nivel (o pantalla de victoria si completó los niveles disponibles)
        if (currentLevelIndex + 1 < window.LEVELS.length) {
          loadLevel(currentLevelIndex + 1);
          window.sfx.playPortal();
          gameState = 'PLAYING';
        } else {
          window.sfx.playVictory();
          gameState = 'VICTORY';
        }
      }
    }
    keys.jumpJustPressed = false;
    keys.dashJustPressed = false;
    return;
  }

  // ================== 6. JUGABILIDAD ACTIVA ('PLAYING') ==================
  if (gameState === 'PLAYING') {
    // Animacion cinemática de Pistola de Portales y Teletransporte Interdimensional
    if (typeof isPortalTeleportActive === 'function' && isPortalTeleportActive()) {
      if (typeof updatePortalTeleport === 'function') {
        updatePortalTeleport(dt);
      }
      updateEffects(dt);
      keys.jumpJustPressed = false;
      keys.dashJustPressed = false;
      return;
    }

    updatePlayer(dt);

    const isLavaDashing = (player.dashTimer > 0 && player.ability === 'lava_run');
    if (droppedLilies.length > 0) updateDroppedLilies(dt);

    // Actualización de enemigos comunes (Mundo 1 Jardín y Mundo 2 Volcán)
    updateCrawlers(dt, isLavaDashing);
    updateFliers(dt, isLavaDashing);

    if (level.theme === 'volcano') {
      updateOmniMenAndRocks(dt, isLavaDashing);
      updateVolcanoSpecialEnemies(dt, isLavaDashing);
    } else {
      if (colorPads.length > 0) updateColorPadsAndPuzzle(dt);
      if (homelander) updateHomelander(dt);
    }

    if (typeof updateKaiWaves === 'function') {
      updateKaiWaves(dt);
    }

    if (typeof updateSurfboardSkinsInteraction === 'function') {
      updateSurfboardSkinsInteraction();
    }

    if (typeof updateEarthquakePrelude === 'function') {
      updateEarthquakePrelude(dt);
    }

    if (typeof updateRaulFrog === 'function') {
      updateRaulFrog(dt);
    }

    if (typeof updateDonPanchoHotdogs === 'function') {
      updateDonPanchoHotdogs(dt);
    }

    if (typeof updateSkyscraperDoors === 'function') {
      updateSkyscraperDoors();
    }

    if (typeof updateArcadeCabinetInteraction === 'function') {
      updateArcadeCabinetInteraction();
    }

    if (typeof updateKrakenBossFight === 'function') {
      updateKrakenBossFight(dt);
    }

    if (typeof updateYetiBoss === 'function') {
      updateYetiBoss(dt);
    }

    if (typeof updateAstralBoss === 'function') {
      updateAstralBoss(dt);
    }

    if (typeof updateShovelAbility === 'function') {
      updateShovelAbility(dt);
    }

    if (typeof updateIcePickAbility === 'function') {
      updateIcePickAbility(dt);
    }

    if (typeof updateKangshungMechanics === 'function') {
      updateKangshungMechanics(dt);
    }

    if (typeof updateBlizzardSystem === 'function') {
      updateBlizzardSystem(dt);
    }

    if (currentLevelIndex === 2 && player.x >= 18840 && (!window.krakenBossState || !window.krakenBossState.active) && (!window.krakenIntroState || !window.krakenIntroState.active) && (!window.krakenBossState || !window.krakenBossState.isDefeated)) {
      if (typeof startKrakenIntroAnimation === 'function') {
        startKrakenIntroAnimation();
      }
    }
  }

  updateEffects(dt);
  keys.jumpJustPressed = false;
  keys.dashJustPressed = false;
  keys.downJustPressed = false;
}


// --- MODULO: src/core/loop/render_hud_post.js ---
// ============================================================================
// POST-PROCESAMIENTO, PARTICULAS FINALES, HUD Y PANTALLAS DE MENU
// ============================================================================

function drawMenuOrCutsceneScreen() {
  if (gameState === 'TITLE') {
    drawParallaxBackground('garden');
    drawTitleScreen();
    drawGamepadMenuCursor();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'WORLD_MAP') {
    drawParallaxBackground('garden');
    drawWorldMapScreen();
    drawGamepadMenuCursor();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'SHOP') {
    drawParallaxBackground('garden');
    drawShopScreen();
    drawGamepadMenuCursor();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'SAFE_HOUSE') {
    drawSafeHouseScene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'SURF_PREVIEW') {
    drawSurfPreviewScene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'ARCADE_MINIGAME') {
    if (typeof drawArcadeMinigame === 'function') drawArcadeMinigame(ctx);
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'KEY_ASSEMBLY') {
    if (typeof drawKeyAssemblyScene === 'function') drawKeyAssemblyScene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'ELEVATOR_RIDE') {
    if (typeof drawElevatorCutscene === 'function') drawElevatorCutscene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'TSUNAMI_CUTSCENE') {
    if (typeof drawTsunamiCutscene === 'function') drawTsunamiCutscene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'KRAKEN_INTRO') {
    if (typeof drawKrakenIntroScene === 'function') drawKrakenIntroScene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  if (gameState === 'KRAKEN_VICTORY_CUTSCENE') {
    if (typeof drawKrakenVictoryCutscene === 'function') drawKrakenVictoryCutscene();
    drawGamepadToast();
    ctx.restore();
    return true;
  }
  return false;
}

let cachedGlobalVignette = null;
function getCachedGlobalVignette() {
  if (!cachedGlobalVignette) {
    cachedGlobalVignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.44, W / 2, H / 2, W * 0.64);
    cachedGlobalVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    cachedGlobalVignette.addColorStop(1, 'rgba(8, 4, 16, 0.30)');
  }
  return cachedGlobalVignette;
}

function drawAtmosphericParticlesAndVignette() {
  // Particulas de impacto, salto, polvo y estrellas de 4 puntas
  for (const p of particles) {
    if (p.isDust) {
      const alpha = Math.max(0, p.life / (p.maxLife || 0.25));
      const r = Math.max(0.8, p.size * alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(Math.round(p.x), Math.round(p.y), r, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.isStar) {
      const s = Math.max(1, (p.size * p.life) / (p.maxLife || 0.35));
      drawSparkleStar(ctx, Math.round(p.x), Math.round(p.y), s, p.color);
    } else {
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
    }
  }

  // Particulas atmosfericas unicas por fase (Sakura en F1, Esporas en F2, Rosas en F3)
  drawDriftingSakuraPetals();
  drawDriftingLotusSpores();
  drawDriftingRosePetals();

  ctx.restore();

  // Viñeta atmosferica de foco sutil estilo Chiki's Chase para todo el juego
  ctx.fillStyle = getCachedGlobalVignette();
  ctx.fillRect(0, 0, W, H);

  // Viñeta atmosferica y cenizas en primer plano estilo Hollow Knight
  if (level.theme === 'volcano') {
    drawVolcanoForegroundAtmosphere();
  }

  // Peligro ambiental: Ventiscas heladas del Everest (Mundo 4)
  if (typeof drawBlizzardSystem === 'function') {
    drawBlizzardSystem(ctx, cameraX, globalFrame);
  }
}

function drawHUDAndOverlayScenes() {
  // HUD Y DIALOGOS
  if (gameState === 'PLAYING' || gameState === 'DIALOGUE') {
    drawHUD();
  }

  if (gameState === 'DIALOGUE') {
    drawDialogueBox();
  } else if (gameState === 'VICTORY') {
    drawVictoryScreen();
  } else if (gameState === 'GAMEOVER') {
    drawGameOverScreen();
  }

  drawGamepadToast();
  ctx.restore();
}


// --- MODULO: src/core/loop/render.js ---
// ============================================================================
// RENDERIZADO PRINCIPAL (60 FPS)
// ============================================================================
function draw() {
  ctx.save();
  ctx.scale(renderScale, renderScale);
  ctx.imageSmoothingEnabled = false;

  if (shakeTime > 0) {
    const dx = (Math.random() - 0.5) * 2 * shakeMagnitude;
    const dy = (Math.random() - 0.5) * 2 * shakeMagnitude;
    ctx.translate(Math.round(dx), Math.round(dy));
  }

  if (drawMenuOrCutsceneScreen()) return;

  const isGardenLevel = !level || !level.theme || level.theme === 'garden';

  // Fondo dinámico según el tema del nivel ('garden', 'volcano' o 'coastal')
  drawParallaxBackground(level.theme || 'garden');

  // ================== MUNDO DEL NIVEL (CON CÁMARA 2D X/Y) ==================
  ctx.save();
  const smoothCamX = Math.round(cameraX * renderScale) / renderScale;
  const smoothCamY = Math.round(cameraY * renderScale) / renderScale;
  ctx.translate(-smoothCamX, -smoothCamY);

  const viewL = cameraX - 70;
  const viewR = cameraX + W + 70;
  const viewT = cameraY - 70;
  const viewB = cameraY + H + 70;

  // Luciérnagas del Jardín o Brasas Volcánicas flotando
  for (const f of fireflies) {
    if (f.x < viewL || f.x > viewR) continue;
    const fx = f.x + Math.sin(globalFrame * 0.03 + f.phase) * 8;
    const fy = f.y + Math.cos(globalFrame * 0.04 + f.phase) * 6;
    if (isGardenLevel) {
      if (f.x < 1750) {
        const sway = Math.sin(globalFrame * 0.05 + f.phase) * 3;
        ctx.fillStyle = f.phase % 2 === 0 ? '#ffb3c6' : '#ffffff';
        ctx.fillRect(Math.round(fx + sway), Math.round(fy), 3, 2);
        ctx.fillStyle = '#ff758f';
        ctx.fillRect(Math.round(fx + sway) + 1, Math.round(fy), 1, 1);
      } else {
        ctx.fillStyle = 'rgba(149, 213, 178, 0.55)';
        ctx.fillRect(Math.round(fx), Math.round(fy), 2, 2);
      }
    } else if (level && level.theme === 'volcano') {
      ctx.fillStyle = 'rgba(255, 120, 0, 0.55)';
      ctx.fillRect(Math.round(fx), Math.round(fy), 2, 2);
    } else if (level && level.theme === 'space') {
      ctx.fillStyle = f.phase % 2 === 0 ? 'rgba(255, 42, 112, 0.7)' : 'rgba(255, 209, 102, 0.8)';
      ctx.fillRect(Math.round(fx), Math.round(fy), 2, 2);
    }
  }

  // Fondo arquitectonico de la Heladeria de Sami (X: 7300 -> 7750)
  if (level && level.id === 3 && typeof drawIceCreamParlorBackdrop === 'function') {
    drawIceCreamParlorBackdrop(ctx, viewL, viewR, globalFrame);
  }

  // Fondo arquitectonico del interior del Rascacielos (Lobby: X: 13450 -> 14050)
  if (level && level.id === 3 && typeof drawSkyscraperLobbyBackdrop === 'function') {
    drawSkyscraperLobbyBackdrop(ctx, viewL, viewR, globalFrame);
  }

  // Fondo arquitectonico de interiores del Pueblo Nevado (Taberna: X: 15000 -> 15300)
  if (level && level.theme === 'snow' && typeof drawSnowVillageInteriors === 'function') {
    drawSnowVillageInteriors(ctx, viewL, viewR, globalFrame);
  }

  // Decoraciones ambientales del nivel con frustum culling
  if (level.decorations) {
    for (const d of level.decorations) {
      const dw = d.w || 90;
      if (d.x + dw < viewL || d.x - dw > viewR) continue;
      if (level && (level.theme === 'coastal' || level.theme === 'coastal_sunset') && window.sprites.drawCoastalDecoration) {
        window.sprites.drawCoastalDecoration(ctx, d, globalFrame);
      } else if (level && level.theme === 'snow' && window.sprites.drawSnowDecoration) {
        window.sprites.drawSnowDecoration(ctx, d, globalFrame);
      } else if (level && level.theme === 'space' && window.sprites.drawSpaceDecoration) {
        window.sprites.drawSpaceDecoration(ctx, d, globalFrame);
      } else if (level && level.theme === 'volcano') {
        window.sprites.drawVolcanoDecor(ctx, d, globalFrame);
      } else {
        window.sprites.drawGardenDecor(ctx, d, globalFrame);
      }
    }
  }

  // Faroles y Lirios con culling
  if (level.lanterns) {
    for (const l of level.lanterns) {
      if (l.x < viewL || l.x > viewR) continue;
      window.sprites.drawLantern(ctx, l.x, l.y, globalFrame);
    }
  }
  if (level.lilies) {
    for (const li of level.lilies) {
      if (li.x < viewL || li.x > viewR) continue;
      const dist = Math.abs((player.x + 11) - li.x);
      const sway = dist < 20 ? (player.facingRight ? 2 : -2) : Math.sin(globalFrame * 0.06 + li.x) * 1.2;
      window.sprites.drawWildLily(ctx, li.x, li.y, sway);
    }
  }

  // Cascadas / Paredes verticales de Lava
  for (const lw of lavaWalls) {
    if (lw.x + lw.w < viewL || lw.x > viewR) continue;
    drawLavaWall(lw);
  }

  // Flores de Brisa Mágica / Géiseres Térmicos
  for (const g of geysers) {
    if (g.x + 35 < viewL || g.x > viewR) continue;
    window.sprites.drawGeyser(ctx, g, globalFrame, isGardenLevel);
  }

  // Plataformas con frustum culling
  for (const p of level.platforms) {
    if (p.x + p.w < viewL || p.x > viewR || p.y + p.h < viewT || p.y > viewB) continue;
    drawPlatform(p);
  }

  // Olas de rompiente del desafío de surf de Kai
  if (typeof drawKaiWaves === 'function') {
    drawKaiWaves(ctx);
  }

  // Puerta del Castillo de Omni-Man
  if (level.bossCastleGate) {
    drawBossCastleGate(level.bossCastleGate);
  }

  // Checkpoints
  for (const cp of checkpoints) {
    if (cp.x < viewL || cp.x > viewR) continue;
    window.sprites.drawCheckpoint(ctx, cp.x, cp.y, cp.active, globalFrame, isGardenLevel);
  }

  // NPCs con sombra Chiki's Chase
  for (const npc of npcs) {
    if (npc.x < viewL || npc.x > viewR) continue;
    drawDropShadow(ctx, npc.x + 8, npc.y + 15, 8, 2.8, 0.32);
    window.sprites.drawNPC(ctx, npc.x, npc.y, npc, globalFrame, isGardenLevel);
  }

  // Espinas con culling
  for (const s of (level.spikes || [])) {
    if (s.x + s.w < viewL || s.x > viewR) continue;
    drawSpikes(s);
  }

  // Botones de Secuencia de Color
  for (let i = 0; i < colorPads.length; i++) {
    const pad = colorPads[i];
    if (pad.x + pad.w < viewL || pad.x > viewR) continue;
    const isTarget = homelanderPuzzle && !homelanderPuzzle.solved && homelanderPuzzle.sequence[homelanderPuzzle.currentIndex] === pad.id;
    const isWrong = pad.wrongFlash > 0;
    window.sprites.drawColorPad(ctx, pad, isTarget, pad.activated, isWrong, globalFrame);
  }

  // Quesos del nivel con sombra precalculada y culling
  for (const c of cheeses) {
    if (!c.collected && c.x >= viewL && c.x <= viewR) {
      const cy = c.groundY ?? (c.y + 16);
      drawDropShadow(ctx, c.x + 6, cy, 6.5, 2.4, 0.22);
      window.sprites.drawCheese(ctx, c.x, c.y, globalFrame);
    }
  }

  // Lirios de Dexter físicos caídos de enemigos
  for (const dl of droppedLilies) {
    if (dl.x >= viewL && dl.x <= viewR) {
      drawDropShadow(ctx, dl.x + 4, dl.y + 12, 5.5, 2.0, 0.24);
      window.sprites.drawDroppedLily(ctx, dl.x, dl.y, globalFrame);
    }
  }

  // Último pedazo de llave de Don Pancho (Fase 4)
  if (typeof drawDonPanchoHotdogsWorld === 'function') {
    drawDonPanchoHotdogsWorld(ctx);
  }

  // Portal Interdimensional
  if (exitPortal && exitPortal.x >= viewL && exitPortal.x <= viewR) {
    window.sprites.drawPortal(ctx, exitPortal.x, exitPortal.y, globalFrame, exitPortal.scale);
  }
  if (typeof drawPortalTeleportWorld === 'function') {
    drawPortalTeleportWorld(ctx, viewL, viewR);
  }

  // Hijo Ratoncito en la meta con sombra
  if (level.babyMouse && level.babyMouse.x >= viewL && level.babyMouse.x <= viewR) {
    drawDropShadow(ctx, level.babyMouse.x + 8, level.babyMouse.y + 15, 7, 2.5, 0.32);
    window.sprites.drawBabyMouse(ctx, level.babyMouse.x, level.babyMouse.y, globalFrame, level.babyMouse.id || 1);
    if (level.babyMouse.requiresBossDefeat && omniMen.length > 0) {
      window.sprites.drawBabyCage(ctx, level.babyMouse.x, level.babyMouse.y, globalFrame, false);
    } else if (level.babyMouse.requiresPuzzle && homelanderPuzzle && !homelanderPuzzle.solved) {
      window.sprites.drawBabyCage(ctx, level.babyMouse.x, level.babyMouse.y, globalFrame, true);
    } else if (level.id === 4 && typeof astralBossState !== 'undefined' && astralBossState && !astralBossState.isDefeated) {
      window.sprites.drawBabyCage(ctx, level.babyMouse.x, level.babyMouse.y, globalFrame, true);
    }
  }

  // Criaturas y enemigos con frustum culling
  for (const mc of magmaCrawlers) {
    if (mc.x < viewL || mc.x > viewR) continue;
    drawDropShadow(ctx, mc.x + 10, mc.y + 13, 9, 3, 0.28);
    window.sprites.drawMagmaCrawler(ctx, mc.x, mc.y, mc.dir > 0, globalFrame, mc.variant || 'magma');
  }
  for (const fb of fireBats) {
    if (fb.x < viewL || fb.x > viewR) continue;
    window.sprites.drawFireBat(ctx, fb.x, fb.y, globalFrame, fb.variant || 'fire_bat');
  }
  for (const lh of lavaHoppers) {
    if (lh.x < viewL || lh.x > viewR) continue;
    drawDropShadow(ctx, lh.x + 8, lh.y + 16, 7, 2.5, 0.28);
    window.sprites.drawLavaHopper(ctx, lh.x, lh.y, lh.dir > 0, lh.inAir, globalFrame);
  }
  for (const fw of flameWisps) {
    if (fw.x < viewL || fw.x > viewR) continue;
    window.sprites.drawFlameWisp(ctx, fw.x, fw.y, globalFrame);
  }
  for (const ob of obsidianBrutes) {
    if (ob.x < viewL || ob.x > viewR) continue;
    drawDropShadow(ctx, ob.x + 12, ob.y + 24, 13, 4, 0.38);
    window.sprites.drawObsidianBrute(ctx, ob.x, ob.y, ob.dir > 0, ob.hp, ob.maxHp, ob.hitTimer > 0, globalFrame);
  }
  for (const mw of magmaWorms) {
    if (mw.x < viewL || mw.x > viewR) continue;
    window.sprites.drawMagmaWorm(ctx, mw.x, mw.y, globalFrame);
  }

  // Boss Omni-Man Volador (5 Vidas, se enfurece tras 2 golpes, solo ataca dentro de su Castillo)
  for (const om of omniMen) {
    if (om.bossState === 'slam_aim') {
      ctx.fillStyle = Math.floor(globalFrame / 2) % 2 === 0 ? 'rgba(255, 0, 85, 0.45)' : 'rgba(255, 209, 102, 0.35)';
      ctx.fillRect(Math.round(om.x + 6), Math.round(om.y + 24), 12, Math.round(om.groundY - om.y + 4));
    }
    const isThrowing = bossFightActive && om.bossState === 'patrol' && om.timer < 0.45;
    window.sprites.drawOmniMan(
      ctx,
      om.x,
      om.y,
      om.facingRight,
      isThrowing,
      globalFrame,
      om.hp,
      om.maxHp,
      om.hitTimer > 0,
      om.bossState,
      om.isEnraged
    );
  }

  // Proyectiles de Rocas de Magma y Ondas de Choque a ras de suelo
  for (const r of magmaRocks) {
    if (r.isShockwave) {
      const rx = Math.round(r.x);
      const ry = Math.round(r.y);
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(rx - 6, ry - 10, 12, 12);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(rx - 3, ry - 7, 6, 8);
    } else {
      window.sprites.drawMagmaRock(ctx, r.x, r.y, globalFrame);
    }
  }

  // Estelas de Doble Salto o Lava Run
  for (const ai of afterimages) {
    ctx.save();
    ctx.globalAlpha = ai.alpha;
    window.sprites.drawMamaMouse(ctx, ai.x, ai.y, 'jump', 0, ai.facingRight, 1, 1, -100, ai.isLavaDash, saveState.equippedSkin);
    ctx.restore();
  }

  // Sombra dinámica bajo Mamá Ratón (Chiki's Chase style: proyectada en la plataforma bajo sus patas)
  const mamaFeetX = player.x + player.w / 2;
  const mamaFeetY = player.y + player.h;
  const groundY = getGroundYUnder(mamaFeetX, mamaFeetY, 120);
  if (groundY !== null) {
    const fallDist = Math.max(0, groundY - mamaFeetY);
    const shadowScale = Math.max(0.35, 1 - fallDist / 120);
    const shadowAlpha = Math.max(0.12, 0.34 * shadowScale);
    drawDropShadow(ctx, mamaFeetX, groundY + 1, 9 * shadowScale, 3.2 * shadowScale, shadowAlpha);
  }

  // Mamá Ratón (Modo Surfing, Teletransporte o Caminata Normal)
  if (typeof isPortalPlayerHidden === 'function' && isPortalPlayerHidden()) {
    // Elizabeth oculta dentro del hiperespacio entre entrada y salida
  } else if (typeof isPortalTeleportActive === 'function' && isPortalTeleportActive()) {
    const pt = typeof getPortalPlayerTransform === 'function' ? getPortalPlayerTransform() : null;
    const px = pt ? pt.x : player.x;
    const py = pt ? pt.y : player.y;
    const pAlpha = pt && typeof pt.alpha === 'number' ? pt.alpha : 1;
    const pSquashX = pt && typeof pt.squashX === 'number' ? pt.squashX : player.squashX;
    const pSquashY = pt && typeof pt.squashY === 'number' ? pt.squashY : player.squashY;
    const pState = pt && pt.state ? pt.state : player.state;

    ctx.save();
    ctx.globalAlpha = pAlpha;
    window.sprites.drawMamaMouse(
      ctx,
      px,
      py,
      pState,
      player.animFrame,
      player.facingRight,
      pSquashX,
      pSquashY,
      0,
      false,
      saveState.equippedSkin
    );
    if (portalTeleportState && (portalTeleportState.phase === 'aim' || portalTeleportState.phase === 'fire')) {
      if (typeof drawPortalGunOnPlayer === 'function') {
        drawPortalGunOnPlayer(ctx, { x: px, y: py, facingRight: player.facingRight }, globalFrame, portalTeleportState.gunRecoil);
      }
    }
    ctx.restore();
  } else if (player.invulnTimer <= 0 || Math.floor(globalFrame / 3) % 2 === 0) {
    if (player.isSurfing && window.sprites.drawMamaSurfing) {
      window.sprites.drawMamaSurfing(
        ctx,
        player.x,
        player.y,
        player.facingRight,
        player.dashTimer > 0,
        globalFrame,
        saveState.equippedSkin,
        saveState.surfboardSkin
      );
    } else if (player.isDigging) {
      // Ratona excavando túnel: medio sumergida en el banco de nieve
      ctx.save();
      ctx.beginPath();
      ctx.rect(player.x - 8, player.y - 12, player.w + 16, player.h + 2);
      ctx.clip();
      window.sprites.drawMamaMouse(
        ctx,
        player.x,
        player.y + 11,
        'run',
        player.animFrame,
        player.facingRight,
        player.squashX,
        player.squashY,
        0,
        false,
        saveState.equippedSkin
      );
      ctx.restore();
    } else {
      window.sprites.drawMamaMouse(
        ctx,
        player.x,
        player.y,
        player.state,
        player.animFrame,
        player.facingRight,
        player.squashX,
        player.squashY,
        player.vy,
        player.dashTimer > 0,
        saveState.equippedSkin
      );
    }

    // Ranita de Raúl sobre la cabeza de Mamá Ratón
    if (typeof drawFrogOnHead === 'function') {
      drawFrogOnHead(ctx, player, globalFrame);
    }
  }

  // Homelander (Nivel 1)
  if (homelander) {
    drawHomelanderAndLaser();
  }

  // Indicador visual de interacción con NPC (Flecha hacia abajo para hablar)
  if (nearbyNpc && gameState === 'PLAYING') {
    const bob = Math.sin(globalFrame * 0.18) * 2;
    const nx = Math.round(nearbyNpc.x + 8);
    const ny = Math.round(nearbyNpc.y - 19 + bob);
    drawRoundedPanel(nx - 11, ny - 9, 22, 15, 4, 'rgba(18, 6, 22, 0.95)', '#b31b52', 1.2);
    // Flecha hacia abajo pixel art en dorado y blanco
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(nx - 1, ny - 6, 2, 5);
    ctx.fillRect(nx - 4, ny - 1, 8, 2);
    ctx.fillRect(nx - 3, ny + 1, 6, 1);
    ctx.fillRect(nx - 2, ny + 2, 4, 1);
    ctx.fillRect(nx - 1, ny + 3, 2, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(nx - 1, ny - 5, 2, 2);
  }

  // Indicador interactivo de puertas y ascensor del rascacielos
  if (typeof drawSkyscraperDoorPrompt === 'function') {
    drawSkyscraperDoorPrompt(ctx);
  }

  // Indicador interactivo de consola arcade
  if (typeof drawArcadeCabinetPrompt === 'function') {
    drawArcadeCabinetPrompt(ctx);
  }

  // Efectos de sorpresa sísmica en la azotea (signo !!! sobre Mamá Ratón)
  if (typeof drawRooftopShockEffects === 'function') {
    drawRooftopShockEffects(ctx);
  }

  // Kraken de las Profundidades (Combate Mundo 3 • Fase 5)
  if (typeof drawKrakenBossWorld === 'function') {
    drawKrakenBossWorld(ctx);
  }

  // Gran Yeti de Cristal (Combate Mundo 4 • Fase 6)
  if (typeof drawYetiBoss === 'function') {
    drawYetiBoss(ctx);
  }

  // Mecánicas de Kangshung: Vórtices y Seracs (Mundo 4 • Fase 6)
  if (typeof drawKangshungMechanics === 'function') {
    drawKangshungMechanics(ctx);
  }

  // Dragón Astral de Polaris (Jefe Final Mundo 4 • Fase 9)
  if (typeof drawAstralBoss === 'function') {
    drawAstralBoss(ctx);
  }

  // Habilidades Mundo 4: Pala y Pico de Hielo
  if (typeof drawShovelWorld === 'function') drawShovelWorld(ctx);
  if (typeof drawIcePickWorld === 'function') drawIcePickWorld(ctx);

  // Partículas atmosféricas y post-procesado
  drawAtmosphericParticlesAndVignette();
  drawHUDAndOverlayScenes();
}


// --- MODULO: src/core/loop/index.js ---

// ============================================================================
// BUCLE PRINCIPAL (60 FPS ESTABLES)
// ============================================================================
let lastTime = performance.now();
loadLevel(0);

function loop(now) {
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;

  pollGamepad(dt);
  update(dt);
  draw();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

