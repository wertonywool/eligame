// ============================================================================
// MUNDO 3 - FASE 2: "LA ORILLA SERENA DEL ATARDECER Y PRUEBA DE SURF" (X: 3600 -> 7200)
// ============================================================================
// Ensamblador de las 4 partes de la Fase 2:
// - Parte 1: Bajada a la Playa Dorada y Charco de Marea #1 (X: 3600 -> 4500)
// - Parte 2: La Orilla Serena del Atardecer y Laguna de Marea #2 (X: 4500 -> 5400)
// - Parte 3: Las Dunas Rosadas y el Gran Canal de Surf #3 (X: 5400 -> 6300)
// - Parte 4: El Gran Estuario y Mirador del Sol Poniente #4 (X: 6300 -> 7200)

const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');
const parte4 = require('./parte4/index');

const partes = [parte1, parte2, parte3, parte4];

function assembleFase2() {
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

module.exports = assembleFase2();
