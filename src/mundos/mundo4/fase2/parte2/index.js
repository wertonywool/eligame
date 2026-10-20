// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 2: LA CASCADA VERTICAL (X: 5350 -> 6650)
// ============================================================================
const platforms = require('./plataformas/plataformas');
const decorations = require('./decoraciones/decoraciones');
const enemies = require('./enemigos/enemigos');
const checkpoints = require('./mecanicas/checkpoint');
const spikes = require('./mecanicas/spikes');
const npcs = require('./npcs/ang_rita');
const cheeses = require('./coleccionables/quesos');

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
