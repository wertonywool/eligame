// ============================================================================
// MUNDO 4 - FASE 7 - PARTE 2: ARCHIVO MAESTRO MODULAR (X: 31300 -> 33000)
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
