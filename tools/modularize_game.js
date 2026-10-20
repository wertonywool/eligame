const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const gameJsPath = path.join(srcDir, 'game.js');
const rawCode = fs.readFileSync(gameJsPath, 'utf8');

// Directorios destino
const dirs = ['core', 'entities', 'render', 'scenes', 'ui'];
dirs.forEach(d => {
  const p = path.join(srcDir, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Función auxiliar para cortar entre dos strings únicos
function extractBetween(startStr, endStr) {
  const startIdx = rawCode.indexOf(startStr);
  if (startIdx === -1) throw new Error('Start not found: ' + startStr);
  if (!endStr) return rawCode.slice(startIdx);
  const endIdx = rawCode.indexOf(endStr, startIdx);
  if (endIdx === -1) throw new Error('End not found: ' + endStr);
  return rawCode.slice(startIdx, endIdx);
}

// 1. src/core/config.js
// Desde el inicio de game.js hasta antes de let menuButtons = [];
// más la función rectOverlap
const configPart1 = extractBetween(
  '// ============================================================================',
  'let menuButtons = [];'
);
const rectOverlapCode = `
// ============================================================================
// UTILIDADES MATEMÁTICAS Y COLISIÓN
// ============================================================================
function rectOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
`;
fs.writeFileSync(path.join(srcDir, 'core', 'config.js'), configPart1 + rectOverlapCode, 'utf8');

// 2. src/core/level.js
// loadLevel(idx)
const levelCode = extractBetween(
  '// ============================================================================\n// INICIALIZACIÓN DEL NIVEL',
  '// ============================================================================\n// SOMBRAS DINÁMICAS'
);
fs.writeFileSync(path.join(srcDir, 'core', 'level.js'), levelCode, 'utf8');

// 3. src/render/fx.js
// Efectos visuales, partículas, sombras y pétalos flotantes
const driftingPetalsCode = extractBetween(
  'function drawDriftingSakuraPetals()',
  '// ============================================================================\n// SELECTOR RÁPIDO DE FASES'
);
const fxCodePart = extractBetween(
  '// ============================================================================\n// SOMBRAS DINÁMICAS',
  '// ============================================================================\n// ACTUALIZACIÓN PRINCIPAL'
);
const updateEffectsCode = extractBetween(
  'function updateEffects(dt)',
  'function rectOverlap'
);
fs.writeFileSync(
  path.join(srcDir, 'render', 'fx.js'),
  `// ============================================================================
// EFECTOS VISUALES, PARTÍCULAS, SOMBRAS Y POLVO ESTILO CHIKI'S CHASE
// ============================================================================
${fxCodePart}
${updateEffectsCode}
// ============================================================================
// PARTÍCULAS ATMOSFÉRICAS FLOTANTES POR FASE (SAKURA, LOTO, ROSAS)
// ============================================================================
${driftingPetalsCode}
`,
  'utf8'
);

// 4. src/entities/collectibles.js
const collectiblesCode = extractBetween(
  '// ============================================================================\n// 🌸 LIRIOS DE DEXTER FÍSICOS',
  '// ============================================================================\n// 🦸🏻‍♂️ BOSS FIGHT: OMNI-MAN'
);
fs.writeFileSync(path.join(srcDir, 'entities', 'collectibles.js'), collectiblesCode, 'utf8');

// 5. src/entities/enemies.js
const omniManCode = extractBetween(
  '// ============================================================================\n// 🦸🏻‍♂️ BOSS FIGHT: OMNI-MAN',
  'function getHomelanderLaserEndY'
);
fs.writeFileSync(path.join(srcDir, 'entities', 'enemies.js'), omniManCode, 'utf8');

// 6. src/entities/homelander.js
const homelanderUpdateCode = extractBetween(
  'function getHomelanderLaserEndY',
  'function damagePlayer'
);
const homelanderDrawCode = extractBetween(
  'function drawHomelanderAndLaser()',
  'function drawTutorialSigns()'
);
fs.writeFileSync(
  path.join(srcDir, 'entities', 'homelander.js'),
  `// ============================================================================
// HOMELANDER AI, HAZ LÁSER Y SECUENCIA DE CRISTALES (FASE 3)
// ============================================================================
${homelanderUpdateCode}
${homelanderDrawCode}
`,
  'utf8'
);

// 7. src/entities/player.js
// updatePlayer(dt), damagePlayer, enterSafeHouse
const playerUpdateBody = extractBetween(
  '  // ================== 6. JUGABILIDAD ACTIVA (\'PLAYING\') ==================\n  player.squashX +=',
  '  updateEffects(dt);\n  keys.jumpJustPressed = false;\n  keys.dashJustPressed = false;\n}'
);
const enterSafeHouseCode = extractBetween(
  'function enterSafeHouse(babyMouse)',
  '// ============================================================================\n// 🌸 LIRIOS DE DEXTER FÍSICOS'
);
const damagePlayerCode = extractBetween(
  'function damagePlayer(respawnAtCheckpoint)',
  'function updateEffects'
);

const playerCode = `// ============================================================================
// FÍSICAS, MOVIMIENTO, DASH Y MECÁNICAS DE MAMÁ RATÓN (ELIZABETH)
// ============================================================================
function updatePlayer(dt) {
  // ================== JUGABILIDAD ACTIVA ('PLAYING') ==================
  player.squashX +=${playerUpdateBody}
}

${damagePlayerCode}
${enterSafeHouseCode}
`;
fs.writeFileSync(path.join(srcDir, 'entities', 'player.js'), playerCode, 'utf8');

// 8. src/ui/helpers.js
const helpersPart1 = extractBetween(
  '// ============================================================================\n// UTILIDADES VISUALES ESTILO STEVEN UNIVERSE',
  '// ============================================================================\n// 1. PANTALLA PRINCIPAL'
);
const overlayAndWrap = extractBetween(
  'function drawOverlayScreen',
  '// ============================================================================\n// CONTROLES TÁCTILES'
);
fs.writeFileSync(path.join(srcDir, 'ui', 'helpers.js'), helpersPart1 + '\n' + overlayAndWrap, 'utf8');

// 9. src/ui/hud.js
const hudCode = extractBetween(
  'function drawTutorialSigns()',
  'function drawDialogueBox()'
);
fs.writeFileSync(path.join(srcDir, 'ui', 'hud.js'), hudCode, 'utf8');

// 10. src/ui/dialogue.js
const dialogueCode = extractBetween(
  'function drawDialogueBox()',
  'function drawOverlayScreen'
);
fs.writeFileSync(path.join(srcDir, 'ui', 'dialogue.js'), dialogueCode, 'utf8');

// 11. src/scenes/title.js
const titleCode = extractBetween(
  '// ============================================================================\n// 1. PANTALLA PRINCIPAL: ESTILO UNIFICADO',
  '// ============================================================================\n// 2. MAPA GALÁCTICO DE 8 MUNDOS'
);
fs.writeFileSync(path.join(srcDir, 'scenes', 'title.js'), titleCode, 'utf8');

// 12. src/scenes/worldmap.js
const worldMapVars = extractBetween(
  'let menuButtons = [];',
  'function drawDriftingSakuraPetals()'
);
const jumpPhaseCode = extractBetween(
  '// ============================================================================\n// SELECTOR RÁPIDO DE FASES',
  '// ============================================================================\n// INICIALIZACIÓN DEL NIVEL'
);
const worldMapScreenCode = extractBetween(
  '// ============================================================================\n// 2. MAPA GALÁCTICO DE 8 MUNDOS',
  '// ============================================================================\n// TIENDA DE QUESOS'
);
fs.writeFileSync(
  path.join(srcDir, 'scenes', 'worldmap.js'),
  `// ============================================================================
// MAPA GALÁCTICO DE 8 MUNDOS Y SELECTOR DE FASES
// ============================================================================
${worldMapVars}
${jumpPhaseCode}
${worldMapScreenCode}
`,
  'utf8'
);

// 13. src/scenes/shop.js
const shopCode = extractBetween(
  '// ============================================================================\n// TIENDA DE QUESOS',
  '// ============================================================================\n// FONDO DINÁMICO'
);
fs.writeFileSync(path.join(srcDir, 'scenes', 'shop.js'), shopCode, 'utf8');

// 14. src/scenes/safehouse.js
const safeHouseCode = extractBetween(
  '// ============================================================================\n// ESCENA DE "LA CASA / MADRIGUERA"',
  '// ============================================================================\n// UTILIDADES VISUALES'
);
fs.writeFileSync(path.join(srcDir, 'scenes', 'safehouse.js'), safeHouseCode, 'utf8');

// 15. src/render/backgrounds.js
const bgCode = extractBetween(
  '// ============================================================================\n// FONDO DINÁMICO',
  'function drawHomelanderAndLaser()'
);
fs.writeFileSync(path.join(srcDir, 'render', 'backgrounds.js'), bgCode, 'utf8');

// 16. src/core/input.js
const inputCode = extractBetween(
  '// ============================================================================\n// CONTROLES TÁCTILES',
  '// ============================================================================\n// BUCLE PRINCIPAL'
);
fs.writeFileSync(path.join(srcDir, 'core', 'input.js'), inputCode, 'utf8');

// 17. src/core/loop.js
// update(dt) maestro, draw() maestro, loop(now)
const updateHeaderAndMenus = extractBetween(
  '// ============================================================================\n// ACTUALIZACIÓN PRINCIPAL (60 FPS)\n// ============================================================================\nfunction update(dt) {',
  '  // ================== 6. JUGABILIDAD ACTIVA (\'PLAYING\') =================='
);

const masterUpdateCode = `${updateHeaderAndMenus}  // ================== 6. JUGABILIDAD ACTIVA ('PLAYING') ==================
  if (gameState === 'PLAYING') {
    updatePlayer(dt);

    const isLavaDashing = (player.dashTime > 0 && player.ability === 'lava_run');
    updateDroppedLilies(dt);
    updateOmniMenAndRocks(dt, isLavaDashing);
    updateVolcanoEnemies(dt, isLavaDashing);
    updateColorPadsAndPuzzle(dt);
    updateHomelander(dt);
  }

  updateEffects(dt);
  keys.jumpJustPressed = false;
  keys.dashJustPressed = false;
}
`;

const masterDrawCode = extractBetween(
  '// ============================================================================\n// RENDERIZADO PRINCIPAL (60 FPS)',
  '// ============================================================================\n// ESCENA DE "LA CASA / MADRIGUERA"'
);

const loopTailCode = extractBetween(
  '// ============================================================================\n// BUCLE PRINCIPAL',
  null
);

fs.writeFileSync(
  path.join(srcDir, 'core', 'loop.js'),
  `${masterUpdateCode}
${masterDrawCode}
${loopTailCode}
`,
  'utf8'
);

console.log('✅ Archivos modularizados generados con éxito en src/');
