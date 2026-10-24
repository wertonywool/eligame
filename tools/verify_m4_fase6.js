// ============================================================================
// VERIFICADOR INTEGRAL DE MUNDO 4 - FASE 6
// ============================================================================

const fs = require('fs');
const path = require('path');

global.window = {};
require('../src/level4.js');

const m4 = window.LEVELS[3];

console.log('--- VERIFICANDO MUNDO 4 FASE 6 ---');
console.log('Mundo ID:', m4.id, '| Nombre:', m4.name);

// 1. Checkpoints
const f6Checkpoints = m4.checkpoints.filter(cp => cp.x >= 23800 && cp.x <= 29600);
console.log('\n[1] Checkpoints en Fase 6 (esperados 4: #38, #39, #40, #41):', f6Checkpoints.length);
f6Checkpoints.forEach(cp => {
  console.log(`  - Checkpoint #${cp.id} en (${cp.x}, ${cp.y}): "${cp.name}"`);
});
if (f6Checkpoints.length !== 4) {
  console.error('ERROR: No coinciden los 4 checkpoints de Fase 6!');
  process.exit(1);
}

// 2. Quesos
const f6Cheeses = m4.cheeses.filter(c => c.x >= 23800 && c.x <= 29600);
console.log('\n[2] Quesos en Fase 6 (esperados 12: #71 a #82):', f6Cheeses.length);
f6Cheeses.forEach(c => {
  console.log(`  - Queso #${c.id} en (${c.x}, ${c.y})`);
});
if (f6Cheeses.length !== 12) {
  console.error('ERROR: No coinciden los 12 quesos de Fase 6!');
  process.exit(1);
}

// 3. NPCs
const f6Npcs = m4.npcs.filter(npc => npc.x >= 23800 && npc.x <= 29600);
console.log('\n[3] NPCs en Fase 6 (esperados 4):', f6Npcs.length);
f6Npcs.forEach(npc => {
  console.log(`  - NPC: ${npc.name} (${npc.role}) en (${npc.x}, ${npc.y}) | Líneas: ${npc.lines.length}`);
});
if (f6Npcs.length !== 4) {
  console.error('ERROR: No coinciden los 4 NPCs de Fase 6!');
  process.exit(1);
}

// 4. Pilares de Hielo Quebrables
const f6Pillars = m4.platforms.filter(p => p.subType === 'ice_pillar' && p.x >= 23800 && p.x <= 29600);
console.log('\n[4] Pilares de Hielo Quebrables en Fase 6:', f6Pillars.length);
f6Pillars.forEach(p => {
  console.log(`  - Pilar en (${p.x}, ${p.y}) W:${p.w} H:${p.h} | breakable: ${p.breakable}`);
});

// 5. Arena del Gran Yeti
const arenaFloor = m4.platforms.find(p => p.x === 28640 && p.y === 126 && p.w >= 700);
console.log('\n[5] Suelo Maestro de la Arena del Gran Yeti:');
if (arenaFloor) {
  console.log(`  - OK: Suelo continuo encontrado en (${arenaFloor.x}, ${arenaFloor.y}) con ancho ${arenaFloor.w}px`);
} else {
  console.error('ERROR: No se encontró el suelo continuo de la arena del Yeti!');
  process.exit(1);
}

const balconies = m4.platforms.filter(p => p.x >= 28640 && p.x <= 29360 && p.oneWay);
console.log(`  - Balcones aéreos de combate en la arena: ${balconies.length}`);
balconies.forEach(b => {
  console.log(`    * Balcón en (${b.x}, ${b.y}) W:${b.w} H:${b.h}`);
});

// 6. Verificar que NO hay estatua estática duplicada de great_snow_yeti en la arena
const duplicateYeti = m4.decorations.find(d => d.subType === 'great_snow_yeti' && d.x >= 28640 && d.x <= 29360);
if (duplicateYeti) {
  console.error('ERROR: Todavía existe una estatua duplicada de great_snow_yeti dentro de la arena!');
  process.exit(1);
} else {
  console.log('  - OK: Sin estatua duplicada de great_snow_yeti en la arena.');
}

console.log('\n>>> ¡TODAS LAS VERIFICACIONES DE MUNDO 4 FASE 6 HAN SIDO UN ÉXITO! <<<');
