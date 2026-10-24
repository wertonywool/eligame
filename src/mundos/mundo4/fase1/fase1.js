// ============================================================================
// MUNDO 4 - FASE 1: "LAS FALDAS DEL MONTE EVEREST" (X: 0 -> 4000)
// ============================================================================
const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');

const partes = [parte1, parte2, parte3];

function assembleFase1() {
  const arrayKeys = [
    'platforms',
    'decorations',
    'checkpoints',
    'npcs',
    'magmaCrawlers',
    'fireBats',
    'cheeses',
    'icicles'
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

module.exports = assembleFase1();
