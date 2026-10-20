// ============================================================================
// MUNDO 3 - FASE 3: "EL RESORT PLAYERO Y LAS 4 MISIONES" (X: 7200 -> 10800)
// ============================================================================
// Ensamblador de las 4 partes de la Fase 3:
// - Parte 1: Puesto de Helados de Sami y Plaza de Palmeras (X: 7200 -> 8100)
// - Parte 2: La Ensenada de Toallas y Castillos de Arena (X: 8100 -> 9000)
// - Parte 3: La Cancha de Voleibol Playero y Palapas (X: 9000 -> 9900)
// - Parte 4: El Gran Acceso Corporativo & Puerta de las 4 Llaves (X: 9900 -> 10800)

const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');
const parte4 = require('./parte4/index');

const partes = [parte1, parte2, parte3, parte4];

function assembleFase3() {
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

module.exports = assembleFase3();
