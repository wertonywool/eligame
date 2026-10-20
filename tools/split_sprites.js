const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');
const spritesDir = path.join(srcDir, 'sprites');

// Ensure target directories exist
const dirs = [
  spritesDir,
  path.join(spritesDir, 'player'),
  path.join(spritesDir, 'bosses'),
  path.join(spritesDir, 'enemies'),
  path.join(spritesDir, 'collectibles'),
  path.join(spritesDir, 'environment'),
  path.join(spritesDir, 'decorations')
];

for (const d of dirs) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

const orig = fs.readFileSync(path.join(srcDir, 'sprites.js'), 'utf8');
const lines = orig.split('\n');

console.log('Original lines in src/sprites.js:', lines.length);

// Helper to extract line range (1-indexed inclusive)
function sliceLines(start, end) {
  return lines.slice(start - 1, end).join('\n');
}

// 1. Manager Base: constructor and bakeGrid
// Lines 10 to 85
const managerBase = `// ============================================================================
// SPRITE MANAGER BASE: CACHÉ Y RASTERIZACIÓN PIXEL-ART 16-BIT
// ============================================================================
class SpriteManager {
  constructor() {
    this.cache = {};
    this.palettes = {
      mama: {
        '.': null,
        'K': '#14101c', // Contorno oscuro pixel-art
        'W': '#ffffff', // Pelaje blanco brillante
        'S': '#dce2f0', // Sombra suave del pelaje blanco
        'D': '#b0bad0', // Sombra profunda del pelaje
        'P': '#f4a398', // Rosa interior oreja / manos / pies / nariz
        'p': '#d0766c', // Sombra rosa (cola, pies, oreja)
        'C': '#7a1f42', // Capa borgoña / vino principal
        'c': '#54122c', // Sombra capa borgoña
        'L': '#9b2d57', // Luz capa borgoña
        'G': '#f7c948', // Broche dorado brillante
        'g': '#c89216', // Sombra broche dorado
        'E': '#2b6e2e', // Hoja verde del Lirio
        'e': '#52b74a', // Luz verde hoja del Lirio
        'F': '#f8f9fa', // Campanita blanca del Lirio
        'R': '#d90429'  // Detalle rojo carmesí del Lirio
      },
      baby: {
        '.': null,
        'K': '#14101c',
        'W': '#ffffff',
        'S': '#dce2f0',
        'D': '#b0bad0',
        'P': '#f4a398',
        'p': '#d0766c',
        'B': '#4ea8de',
        'G': '#f7c948'
      },
      homelander: {
        '.': null,
        'K': '#120e1a',
        'Y': '#ffd166',
        'y': '#e09f3e',
        'F': '#f4b393',
        'f': '#d98a6c',
        'B': '#1d3557',
        'b': '#11223a',
        'u': '#2b5082',
        'R': '#d62828',
        'r': '#9b1515',
        'W': '#f1faee',
        'L': '#ff0033',
        'l': '#ff758f'
      }
    };

    this.initSprites();
  }

  bakeGrid(key, grid, palette) {
    const h = grid.length;
    const w = grid[0].length;
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const octx = off.getContext('2d');

    for (let y = 0; y < h; y++) {
      const row = grid[y];
      for (let x = 0; x < w; x++) {
        const ch = row[x];
        const color = palette[ch];
        if (color) {
          octx.fillStyle = color;
          octx.fillRect(x, y, 1, 1);
        }
      }
    }
    this.cache[key] = off;
  }
}
`;

fs.writeFileSync(path.join(spritesDir, 'manager.js'), managerBase, 'utf8');

// 2. Player Palettes: Lines 363 to 514
// const skinPalettes = { ... };
const playerPalettes = `// ============================================================================
// PALETAS DE COLOR DE SKINS: MAMÁ RATÓN
// ============================================================================
` + sliceLines(363, 514);
fs.writeFileSync(path.join(spritesDir, 'player', 'palettes.js'), playerPalettes, 'utf8');

// 3. Player Grids: Lines 88 to 362
const playerGrids = `// ============================================================================
// MATRICES PIXEL ART: MAMÁ RATÓN (IDLE, TRANSICIÓN, CARRERA, SALTO)
// ============================================================================
` + sliceLines(88, 362);
fs.writeFileSync(path.join(spritesDir, 'player', 'grids.js'), playerGrids, 'utf8');

// 4. Baby & Homelander Grids + initSprites registration:
// Lines 516 to 653
const initBaking = `// ============================================================================
// REGISTRO Y PRE-RENDERIZADO DE SPRITES EN MEMORIA
// ============================================================================
SpriteManager.prototype.initSprites = function() {
` + sliceLines(516, 653) + `
};
`;
fs.writeFileSync(path.join(spritesDir, 'player', 'bake.js'), initBaking, 'utf8');

// 5. Draw Mama Mouse: Lines 656 to 890
const drawMama = `// ============================================================================
// RENDERIZADO DE MAMÁ RATÓN (ANIMACIÓN, SKINS Y EFECTO VÓRTICE LAVA RUN)
// ============================================================================
SpriteManager.prototype.` + sliceLines(656, 890);
fs.writeFileSync(path.join(spritesDir, 'player', 'render.js'), drawMama, 'utf8');

// 6. Collectibles: Baby Mouse & Baby Cage
// Baby Mouse: lines 892 to 922
// Baby Cage: lines 1951 to 2020
const babyMouse = `// ============================================================================
// HIJOS RATONCITOS Y JAULA DE RESCATE
// ============================================================================
SpriteManager.prototype.` + sliceLines(892, 922) + '\n\nSpriteManager.prototype.' + sliceLines(1951, 2020);
fs.writeFileSync(path.join(spritesDir, 'collectibles', 'baby_mouse.js'), babyMouse, 'utf8');

// 7. Collectibles: Cheese, Dropped Lily, Sparkle Star
// Dropped Lily: 1453 to 1489
// Sparkle Star: 1055 to 1066
// Cheese: 1855 to 1900
const cheese = `// ============================================================================
// COLECCIONABLES: QUESO DORADO, LIRIOS SOLTADOS Y DESTELLOS
// ============================================================================
SpriteManager.prototype.` + sliceLines(1055, 1066) + '\n\nSpriteManager.prototype.' + sliceLines(1453, 1489) + '\n\nSpriteManager.prototype.' + sliceLines(1855, 1900);
fs.writeFileSync(path.join(spritesDir, 'collectibles', 'cheese.js'), cheese, 'utf8');

// 8. Bosses: Homelander
// Lines 1677 to 1721
const homelanderBoss = `// ============================================================================
// JEFE: HOMELANDER (FASE 4 - MUNDO 1)
// ============================================================================
SpriteManager.prototype.` + sliceLines(1677, 1721);
fs.writeFileSync(path.join(spritesDir, 'bosses', 'homelander.js'), homelanderBoss, 'utf8');

// 9. Bosses: Omni-Man
// Lines 1068 to 1177
const omniManBoss = `// ============================================================================
// JEFE: OMNI-MAN (FASE 4 - MUNDO 2 VOLCÁN)
// ============================================================================
SpriteManager.prototype.` + sliceLines(1068, 1177);
fs.writeFileSync(path.join(spritesDir, 'bosses', 'omniman.js'), omniManBoss, 'utf8');

// 10. Enemies: Volcano
// Magma Rock: 1158 to 1177 (or within 1539 to 1552)
// Magma Crawler: 1179 to 1256
// Fire Bat: 1258 to 1322
// Lava Hopper: 1324 to 1360
// Flame Wisp: 1362 to 1390
// Obsidian Brute: 1392 to 1428
// Magma Worm: 1430 to 1451
const volcanoEnemies = `// ============================================================================
// ENEMIGOS DEL VOLCÁN (MUNDO 2)
// ============================================================================
SpriteManager.prototype.` + sliceLines(1179, 1451);
fs.writeFileSync(path.join(spritesDir, 'enemies', 'volcano.js'), volcanoEnemies, 'utf8');

// 11. Environment: Checkpoints, Portals, Geysers, Magma Rock
// Portal: 924 to 960 (check end)
// Geyser: 1491 to 1537
// Magma Rock: 1539 to 1552
// Checkpoint: 1554 to 1625
const checkpoints = `// ============================================================================
// ELEMENTOS DE ENTORNO: CHECKPOINTS, PORTALES Y GÉISERES
// ============================================================================
SpriteManager.prototype.` + sliceLines(924, 1053) + '\n\nSpriteManager.prototype.' + sliceLines(1491, 1625);
fs.writeFileSync(path.join(spritesDir, 'environment', 'checkpoints.js'), checkpoints, 'utf8');

// 12. Environment: Interactive (Color Pad, NPCs, Lanterns, Wild Lily)
// NPC: 1627 to 1675
// Color Pad: 1723 to 1833
// Lantern: 1902 to 1930
// Wild Lily: 1932 to 1949
const interactive = `// ============================================================================
// ELEMENTOS INTERACTIVOS: NPCS, PADS DE COLORES, FAROLES Y LIRIOS
// ============================================================================
SpriteManager.prototype.` + sliceLines(1627, 1675) + '\n\nSpriteManager.prototype.' + sliceLines(1723, 1833) + '\n\nSpriteManager.prototype.' + sliceLines(1902, 1949);
fs.writeFileSync(path.join(spritesDir, 'environment', 'interactive.js'), interactive, 'utf8');

// 13. Decorations: Volcano
// Lines 2022 to 2600
const volcanoDecor = `// ============================================================================
// DECORACIONES DEL VOLCÁN (ESTALACTITAS, ANTORCHAS, TOTEMS, VÓRTICES)
// ============================================================================
SpriteManager.prototype.` + sliceLines(2022, 2600);
fs.writeFileSync(path.join(spritesDir, 'decorations', 'volcano.js'), volcanoDecor, 'utf8');

// 14. Decorations: Garden
// Lines 2603 to 3614
const gardenDecor = `// ============================================================================
// DECORACIONES DEL JARDÍN (PÉRGOLAS, ROSALES, CEREZOS, FUENTES)
// ============================================================================
SpriteManager.prototype.` + sliceLines(2603, 3614);
fs.writeFileSync(path.join(spritesDir, 'decorations', 'garden.js'), gardenDecor, 'utf8');

// 15. Index / Instantiation
const indexFile = `// ============================================================================
// INSTANCIA GLOBAL DE SPRITES
// ============================================================================
window.sprites = new SpriteManager();
`;
fs.writeFileSync(path.join(spritesDir, 'index.js'), indexFile, 'utf8');

console.log('✅ Archivos de sprites divididos con éxito en src/sprites/');
