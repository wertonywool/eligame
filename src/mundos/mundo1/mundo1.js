// ============================================================================
// 🌸 MUNDO 1: "EL JARDÍN DE LOS LIRIOS" — ARCHIVO MAESTRO MODULAR
// ============================================================================
// Este archivo une de forma limpia y transparente las 3 fases botánicas:
// - Fase 1: Aldea del Trébol y Cerezos (Partes 1, 2, 3, 4)
// - Fase 2: Estanque de Loto e Invernadero (Partes 1, 2, 3)
// - Fase 3: Gran Corte Imperial y Santuario del Lirio (Partes 1, 2, 3)

const config = require('./config');
const fase1 = require('./fase1/fase1');
const fase2 = require('./fase2/fase2');
const fase3 = require('./fase3/fase3');

const fases = [fase1, fase2, fase3];

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

const mergedData = {};
arrayKeys.forEach(k => {
  mergedData[k] = [];
  fases.forEach(f => {
    if (f[k] && Array.isArray(f[k])) {
      mergedData[k] = mergedData[k].concat(f[k]);
    }
  });
});

module.exports = Object.assign(
  {},
  config,
  mergedData,
  {
    colorSequence: fase3.colorSequence,
    homelander: fase3.homelander,
    babyMouse: fase3.babyMouse
  }
);
