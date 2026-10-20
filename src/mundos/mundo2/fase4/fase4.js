// ============================================================================
// 🌋 MUNDO 2 • FASE 4: "Castillo del Cráter — Boss Omni-Man" (Y: 220)
// ============================================================================
// Ensamblador de partes 1 y 2 de la Fase 4 del Mundo 2

const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');

const partes = [parte1, parte2];

function assembleFase4() {
  const arrayKeys = [
    'platforms',
    'decorations',
    'lanterns',
    'checkpoints',
    'npcs',
    'omniMen',
    'cheeses'
  ];

  const result = {};
  arrayKeys.forEach(k => { result[k] = []; });

  partes.forEach(parte => {
    arrayKeys.forEach(k => {
      if (parte[k] && Array.isArray(parte[k])) {
        result[k] = result[k].concat(parte[k]);
      }
    });
  });

  if (parte1.bossCastleGate) result.bossCastleGate = parte1.bossCastleGate;
  if (parte2.babyMouse) result.babyMouse = parte2.babyMouse;

  return result;
}

module.exports = assembleFase4();
