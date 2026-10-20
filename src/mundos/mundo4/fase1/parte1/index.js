// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 1: FALDAS DEL MONTE EVEREST (X: 0 -> 1400)
// ============================================================================
const platforms = require('./plataformas/plataformas');
const decorations = require('./decoraciones/decoraciones');
const enemies = require('./enemigos/enemigos');
const checkpoints = require('./mecanicas/checkpoint');
const npcs = require('./npcs/guardabosques');
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
