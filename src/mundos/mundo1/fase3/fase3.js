// ============================================================================
// 🌹 MUNDO 1 • FASE 3: "La Gran Corte Imperial y Santuario del Lirio" (X: 3670 -> 5750)
// ============================================================================
// Ensamblador de partes 1, 2 y 3 de la Fase 3

const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');

const partes = [parte1, parte2, parte3];

function assembleFase3() {
  const arrayKeys = [
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

  // Objetos y mecánicas singulares
  if (parte2.colorSequence) result.colorSequence = parte2.colorSequence;
  if (parte2.homelander) result.homelander = parte2.homelander;
  if (parte3.babyMouse) result.babyMouse = parte3.babyMouse;

  return result;
}

module.exports = assembleFase3();
