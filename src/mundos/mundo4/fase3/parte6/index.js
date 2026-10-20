// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 6: CASA 6 - TALLER DE FORJA DE HIELO (X: 11800 -> 12550)
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
