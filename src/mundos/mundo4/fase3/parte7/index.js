// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 7: CASA 7 - LA ALCALDÍA Y SALIDA AL LAGO (X: 12550 -> 13300)
// ============================================================================
const platforms = require('./plataformas/plataformas');
const decorations = require('./decoraciones/decoraciones');
const enemies = require('./enemigos/enemigos');
const checkpoints = require('./mecanicas/checkpoint');
const npcs = require('./npcs/npcs');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms,
  decorations,
  checkpoints,
  npcs,
  magmaCrawlers: enemies.crawlers,
  fireBats: enemies.fliers,
  cheeses
};
