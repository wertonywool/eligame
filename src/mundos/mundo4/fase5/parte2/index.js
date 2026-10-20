// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 2: LA GRAN CIMA DEL EVEREST (X: 20750 -> 23800)
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
