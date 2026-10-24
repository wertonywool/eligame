// ============================================================================
// MUNDO 4 - FASE 7: "EL REINO OCULTO DE SHAMBHALA Y EL LOTO DEL NIRVANA"
// ============================================================================
const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');

const partes = [parte1, parte2];

function assembleFase7() {
  const arrayKeys = [
    'platforms',
    'decorations',
    'checkpoints',
    'spikes',
    'geysers',
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

module.exports = assembleFase7();
