// ============================================================================
// 🦋 MUNDO 1 • FASE 2: "El Estanque de Loto y el Invernadero de Cristal" (X: 1800 -> 3670)
// ============================================================================
// Ensamblador de partes 1, 2 y 3 de la Fase 2

const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');

const partes = [parte1, parte2, parte3];

function mergeParts(keys) {
  const result = {};
  keys.forEach(k => { result[k] = []; });
  partes.forEach(parte => {
    keys.forEach(k => {
      if (parte[k] && Array.isArray(parte[k])) {
        result[k] = result[k].concat(parte[k]);
      }
    });
  });
  return result;
}

module.exports = mergeParts([
  'platforms',
  'decorations',
  'lanterns',
  'lilies',
  'geysers',
  'spikes',
  'checkpoints',
  'npcs',
  'colorPads',
  'magmaCrawlers',
  'fireBats',
  'cheeses'
]);
