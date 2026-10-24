// ============================================================================
// MUNDO 4 - FASE 4 - PARTE 2: EL LAGO PROFUNDO Y LA CUMBRE (X: 15650 -> 18000)
// ============================================================================
const platforms = require('./plataformas/plataformas');
const decorations = require('./decoraciones/decoraciones');
const enemies = require('./enemigos/enemigos');
const checkpoints = require('./mecanicas/checkpoint');
const npcs = require('./npcs/npcs');
const cheeses = require('./coleccionables/quesos');
const spikes = require('./mecanicas/spikes');

module.exports = {
  platforms,
  decorations,
  checkpoints,
  spikes,
  npcs,
  magmaCrawlers: enemies.crawlers,
  fireBats: enemies.fliers,
  cheeses
};
