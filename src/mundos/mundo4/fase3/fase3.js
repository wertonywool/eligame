// ============================================================================
// MUNDO 4 - FASE 3: "EL PUEBLO NEVADO Y LAS SIETE CASAS" (X: 8050 -> 13300)
// ============================================================================
const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');
const parte4 = require('./parte4/index');
const parte5 = require('./parte5/index');
const parte6 = require('./parte6/index');
const parte7 = require('./parte7/index');

const partes = [parte1, parte2, parte3, parte4, parte5, parte6, parte7];

function assembleFase3() {
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

module.exports = assembleFase3();
