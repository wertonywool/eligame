// ============================================================================
// 🌿 MUNDO 1 • FASE 1: "La Aldea del Trébol y el Sendero de los Cerezos" (X: 0 -> 1800)
// ============================================================================
// Ensamblador de partes 1, 2, 3 y 4 de la Fase 1

const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');
const parte4 = require('./parte4/index');

const partes = [parte1, parte2, parte3, parte4];

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
