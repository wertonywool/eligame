// ============================================================================
// COMPILADOR AUTOMÁTICO DE CÓDIGO DEL JUEGO: MÓDULOS -> src/game.js
// ============================================================================
// Compila la arquitectura modular ultra-dividida (core, entities, render, scenes, ui)
// en src/game.js para máxima compatibilidad y rendimiento.

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

const MODULE_FILES = [
  'core/config.js',
  'ui/helpers.js',
  'render/fx.js',
  'render/parallax_megatsunami.js',
  'render/parallax_pretsunami.js',
  'render/parallax_everest.js',
  'render/parallax.js',
  'render/water_system.js',
  'render/disaster_platforms.js',
  'render/snow_platforms.js',
  'render/platforms.js',
  'render/hazards/lava_vortex.js',
  'render/hazards/spikes.js',
  'render/hazards/castle_gate.js',
  'render/hazards/icecream_parlor.js',
  'render/hazards/skyscraper_lobby.js',
  'render/hazards/atmosphere.js',
  'render/hazards/blizzard_system.js',
  'render/hazards/kangshung_mechanics.js',
  'render/hazards/snow_village_interiors.js',
  'render/hazards/snow_village_interiors_pt2.js',
  'entities/collectibles.js',
  'entities/enemies/crawlers.js',
  'entities/enemies/fliers.js',
  'entities/enemies/volcano_special.js',
  'entities/enemies/omniman.js',
  'entities/enemies/kraken_boss.js',
  'entities/enemies/kraken_render.js',
  'entities/enemies/yeti_boss.js',
  'entities/enemies/yeti_render.js',
  'entities/enemies/astral_boss.js',
  'entities/enemies/astral_render.js',
  'entities/homelander.js',
  'entities/quests/sami_icecream.js',
  'entities/quests/kai_surf.js',
  'entities/quests/raul_frog.js',
  'entities/quests/don_pancho_hotdogs.js',
  'entities/quests/dialogue_manager.js',
  'entities/surfboard_skins.js',
  'entities/quests/earthquake_prelude.js',
  'entities/player/shovel_ability.js',
  'entities/player/ice_pick_ability.js',
  'mechanics/arcade_minigame.js',
  'entities/player/doors.js',
  'entities/player/actions.js',
  'entities/player/physics.js',
  'entities/player/camera.js',
  'entities/player/combat.js',
  'entities/player/portal_teleport.js',
  'entities/player/portal_render.js',
  'entities/player/index.js',
  'core/level.js',
  'ui/hud/status.js',
  'ui/hud/boss.js',
  'ui/hud/index.js',
  'ui/dialogue.js',
  'scenes/title.js',
  'scenes/worldmap/particles.js',
  'scenes/worldmap/planets.js',
  'scenes/worldmap/card_locked.js',
  'scenes/worldmap/card.js',
  'scenes/worldmap/index.js',
  'scenes/shop/skills.js',
  'scenes/shop/skins.js',
  'scenes/shop/index.js',
  'scenes/safehouse/room.js',
  'scenes/safehouse/index.js',
  'scenes/gameover/heart.js',
  'scenes/gameover/index.js',
  'scenes/victory/trophy.js',
  'scenes/victory/index.js',
  'scenes/surf_preview.js',
  'scenes/key_assembly.js',
  'scenes/elevator_cutscene.js',
  'scenes/tsunami_cutscene.js',
  'scenes/kraken_intro.js',
  'scenes/kraken_victory_cutscene.js',
  'core/input/keyboard.js',
  'core/input/touch.js',
  'core/input/gamepad.js',
  'core/input/pointer.js',
  'core/loop/update.js',
  'core/loop/render_hud_post.js',
  'core/loop/render.js',
  'core/loop/index.js'
];

function buildGame() {
  const parts = [];
  parts.push(`// ============================================================================
// EL GRAN ESCAPE DE ELIZABETH - MOTOR PRINCIPAL
// ARCHIVO GENERADO AUTOMATICAMENTE DESDE src/ (core, entities, render, scenes, ui)
// Para modificar el juego, edita directamente los archivos modulares en sus carpetas.
// ============================================================================
`);

  for (const rel of MODULE_FILES) {
    const fullPath = path.join(srcDir, rel);
    if (!fs.existsSync(fullPath)) {
      throw new Error('Archivo modular no encontrado: ' + fullPath);
    }
    const content = fs.readFileSync(fullPath, 'utf8');
    parts.push(`\n// --- MODULO: src/${rel} ---\n` + content);
  }

  const bundled = parts.join('\n');
  const targetPath = path.join(srcDir, 'game.js');
  fs.writeFileSync(targetPath, bundled, 'utf8');

  console.log(`[OK] game.js compilado con exito (${MODULE_FILES.length} modulos unidos)`);
}

module.exports = buildGame;

if (require.main === module) {
  buildGame();
}
