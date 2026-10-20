// ============================================================================
// MUNDO 3 - FASE 4: "LA CIUDAD, EL EDIFICIO OBJETIVO Y EL MEGATSUNAMI" (X: 12000 -> 16000)
// ============================================================================
// Ensamblador de las partes de la Fase 4:
// - Parte 1: La Avenida de los Rascacielos y los 2 NPCs del Edificio Objetivo (X: 12000 -> 13200)

const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');

const partes = [parte1, parte2, parte3];

function assembleFase4() {
  const arrayKeys = [
    'platforms',
    'decorations',
    'lanterns',
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

module.exports = assembleFase4();
