// ============================================================================
// COMPILADOR AUTOMÁTICO DE SPRITES: src/sprites/ -> src/sprites.js
// ============================================================================
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const spritesDir = path.join(srcDir, 'sprites');

const SPRITE_MODULES = [
  'manager.js',
  'player/palettes.js',
  'player/grids.js',
  'player/grids_rick_prime.js',
  'player/grids_homelander.js',
  'player/grids_peacemaker.js',
  'player/grids_ivan.js',
  'player/grids_abaddon.js',
  'player/bake.js',
  'player/render.js',
  'player/surf/board.js',
  'player/surf/stance.js',
  'player/surf/dash_fx.js',
  'player/surf/index.js',
  'collectibles/baby_mouse.js',
  'collectibles/cheese.js',
  'collectibles/icecream.js',
  'collectibles/frog.js',
  'collectibles/key_assembly.js',
  'bosses/homelander.js',
  'bosses/omniman.js',
  'bosses/kraken.js',
  'enemies/volcano.js',
  'enemies/coastal.js',
  'enemies/marine.js',
  'enemies/space.js',
  'enemies/snow.js',
  'environment/checkpoints.js',
  'environment/interactive.js',
  'environment/skyscraper_interior.js',
  'environment/skyscraper_lobby_props.js',
  'environment/icecream_parlor_props.js',
  'decorations/volcano.js',
  'decorations/garden.js',
  'decorations/coastal.js',
  'decorations/beach.js',
  'decorations/resort.js',
  'decorations/surfshop.js',
  'decorations/wave_crest.js',
  'decorations/surfboard_stands.js',
  'decorations/offices.js',
  'decorations/hotdog_cart.js',
  'decorations/tsunami.js',
  'decorations/space.js',
  'decorations/snow_base.js',
  'decorations/snow_structures.js',
  'decorations/snow_village.js',
  'decorations/snow_village_cabins.js',
  'decorations/snow_arcade.js',
  'decorations/snow_bakery.js',
  'decorations/snow_forge.js',
  'decorations/snow_townhall.js',
  'decorations/snow_lake.js',
  'decorations/snow_summit.js',
  'decorations/snow_summit_peak.js',
  'decorations/snow_yeti_sanctuary.js',
  'decorations/snow_yeti_boss.js',
  'decorations/snow_shambhala.js',
  'decorations/snow_kailash.js',
  'decorations/snow_firmament.js',
  'decorations/snow_firmament_sanctum.js',
  'decorations/snow_expedition.js',
  'index.js'
];

function buildSprites() {
  const parts = [];
  parts.push(`// ============================================================================
// MOTOR DE SPRITES PIXEL ART 16-BIT (EL GRAN ESCAPE DE ELIZABETH)
// ARCHIVO GENERADO AUTOMATICAMENTE DESDE src/sprites/
// Para modificar los sprites, edita directamente los archivos en src/sprites/
// ============================================================================
`);

  for (const rel of SPRITE_MODULES) {
    const fullPath = path.join(spritesDir, rel);
    if (!fs.existsSync(fullPath)) {
      throw new Error('Módulo de sprite no encontrado: ' + fullPath);
    }
    const content = fs.readFileSync(fullPath, 'utf8');
    parts.push(`\n// --- MÓDULO: src/sprites/${rel} ---\n` + content);
  }

  const bundled = parts.join('\n');
  const targetPath = path.join(srcDir, 'sprites.js');
  fs.writeFileSync(targetPath, bundled, 'utf8');

  console.log(`[OK] sprites.js compilado con exito (${SPRITE_MODULES.length} modulos unidos)`);
}

module.exports = buildSprites;

if (require.main === module) {
  buildSprites();
}
