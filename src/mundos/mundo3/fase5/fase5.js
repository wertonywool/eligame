// ============================================================================
// MUNDO 3 - FASE 5: "EL MEGATSUNAMI Y LA ANTESALA DEL KRAKEN" (X: 16000 -> 20000)
// ============================================================================
const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');

const partes = [parte1, parte2];

function assembleFase5() {
  const arrayKeys = [
    'platforms',
    'decorations',
    'checkpoints',
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

module.exports = assembleFase5();
