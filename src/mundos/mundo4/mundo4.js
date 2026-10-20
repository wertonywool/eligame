// ============================================================================
// MUNDO 4: "EL MONTE EVEREST Y LA GRAN CUMBRE" — ARCHIVO MAESTRO MODULAR
// ============================================================================
const config = require('./config');
const fase1 = require('./fase1/fase1');
const fase2 = require('./fase2/fase2');
const fase3 = require('./fase3/fase3');
const fase4 = require('./fase4/fase4');
const fase5 = require('./fase5/fase5');
const fase6 = require('./fase6/fase6');
const fase7 = require('./fase7/fase7');
const fase8 = require('./fase8/fase8');
const fase9 = require('./fase9/fase9');

const fases = [fase1, fase2, fase3, fase4, fase5, fase6, fase7, fase8, fase9];

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
