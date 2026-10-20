// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 2: ARCHIVO MAESTRO MODULAR (X: 34700 -> 36400)
// ============================================================================

const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const npcs = require('./npcs/npcs');
const checkpoints = require('./mecanicas/checkpoint');
const quesos = require('./coleccionables/quesos');
const enemigos = require('./enemigos/enemigos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  npcs: npcs,
  checkpoints: checkpoints,
  cheeses: quesos,
  magmaCrawlers: enemigos.crawlers,
  fireBats: enemigos.fliers
};
