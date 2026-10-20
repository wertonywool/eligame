// ============================================================================
// MUNDO 3: "CIUDAD COSTERA & TSUNAMI" — ARCHIVO MAESTRO MODULAR
// ============================================================================
// Ensamblador modular de fases del Mundo 3:
// - Fase 1: Ciudad Metropolitana y Camino a la Costa (Partes 1, 2, 3, 4)

const config = require('./config');
const fase1 = require('./fase1/fase1');
const fase2 = require('./fase2/fase2');
const fase3 = require('./fase3/fase3');
const fase4 = require('./fase4/fase4');
const fase5 = require('./fase5/fase5');

const fases = [fase1, fase2, fase3, fase4, fase5];

const arrayKeys = [
  'platforms',
  'decorations',
  'lanterns',
  'geysers',
  'lavaWalls',
  'spikes',
  'checkpoints',
  'npcs',
  'magmaCrawlers',
  'lavaHoppers',
  'fireBats',
  'magmaWorms',
  'obsidianBrutes',
  'flameWisps',
  'omniMen',
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
  mergedData
);
