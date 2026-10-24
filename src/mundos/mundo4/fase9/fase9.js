// ============================================================================
// MUNDO 4 - FASE 9: "EL FIRMAMENTO CÓSMICO Y LA BÓVEDA DE LAS ESTRELLAS ETERNAS"
// ============================================================================
const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');

const partes = [parte1, parte2, parte3];

function assembleFase9() {
  const arrayKeys = [
    'platforms',
    'decorations',
    'checkpoints',
    'geysers',
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

module.exports = assembleFase9();
