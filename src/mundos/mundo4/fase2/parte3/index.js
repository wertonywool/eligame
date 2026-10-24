// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 3: EL COL Y UMBRAL (X: 6650 -> 8050)
// ============================================================================
const platforms = require('./plataformas/plataformas');
const decorations = require('./decoraciones/decoraciones');
const enemies = require('./enemigos/enemigos');
const checkpoints = require('./mecanicas/checkpoint');
const spikes = require('./mecanicas/spikes');
const icicles = require('./mecanicas/icicles');
const npcs = require('./npcs/apa_sherpa');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms,
  decorations,
  checkpoints,
  spikes,
  icicles,
  npcs,
  magmaCrawlers: enemies.crawlers,
  fireBats: enemies.fliers,
  cheeses
};
