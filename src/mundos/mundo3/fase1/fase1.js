// ============================================================================
// 🏙️ MUNDO 3 • FASE 1: "CIUDAD METROPOLITANA Y CAMINO A LA COSTA" (X: 0 -> 3600)
// ============================================================================
// Ensamblador de las 4 partes de la Fase 1:
// - Parte 1: Distrito Urbano y Avenidas Centrales (X: 0 -> 900)
// - Parte 2: Gran Cruce Comercial y Tráfico de Carros (X: 900 -> 1800)
// - Parte 3: El Gran Malecón y Paseo Marítimo (X: 1800 -> 2700)
// - Parte 4: Muelle Salado y Mirador Costero del Océano (X: 2700 -> 3600)

const parte1 = require('./parte1/index');
const parte2 = require('./parte2/index');
const parte3 = require('./parte3/index');
const parte4 = require('./parte4/index');

const partes = [parte1, parte2, parte3, parte4];

function assembleFase1() {
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

module.exports = assembleFase1();
