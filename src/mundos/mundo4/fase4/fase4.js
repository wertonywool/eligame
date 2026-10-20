// ============================================================================
// MUNDO 4 - FASE 4: "EL INMENSO LAGO CONGELADO" (X: 13300 -> 18000)
// ============================================================================
const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');

const partes = [parte1, parte2];

function assembleFase4() {
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

module.exports = assembleFase4();
