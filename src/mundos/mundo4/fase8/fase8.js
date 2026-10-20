// ============================================================================
// MUNDO 4 - FASE 8: "EL MONTE SAGRADO KAILASH Y EL PALACIO ASTRAL DE AGARTHA"
// ============================================================================
const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');

const partes = [parte1, parte2];

function assembleFase8() {
  const arrayKeys = [
    'platforms',
    'decorations',
    'checkpoints',
    'spikes',
    'npcs',
    'magmaCrawlers',
    'fireBats',
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

  return result;
}

module.exports = assembleFase8();
