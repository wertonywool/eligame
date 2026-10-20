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
