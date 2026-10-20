// ============================================================================
// 🌋 MUNDO 2: "LA CALDERA DEL VOLCÁN" — ARCHIVO MAESTRO MODULAR
// ============================================================================
// Este archivo une de forma limpia y transparente las 4 fases volcánicas:
// - Fase 1: Villa Ceniza y Sendero de Basalto (Partes 1, 2, 3)
// - Fase 2: Galerías de Cristal (Partes 1, 2, 3)
// - Fase 3: Gran Ciudadela y Forja de Obsidiana (Partes 1, 2, 3)
// - Fase 4: Castillo del Cráter y Boss Omni-Man (Partes 1, 2)

const config = require('./config');
const fase1 = require('./fase1/fase1');
const fase2 = require('./fase2/fase2');
const fase3 = require('./fase3/fase3');
const fase4 = require('./fase4/fase4');

const fases = [fase1, fase2, fase3, fase4];

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
  mergedData,
  {
    bossCastleGate: fase4.bossCastleGate,
    babyMouse: fase4.babyMouse
  }
);
