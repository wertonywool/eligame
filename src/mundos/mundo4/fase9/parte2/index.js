// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 2: ARCHIVO MAESTRO MODULAR (X: 38100 -> 39800)
// ============================================================================

const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const npcs = require('./npcs/npcs');
const checkpoints = require('./mecanicas/checkpoint');
const geysers = require('./mecanicas/geysers');
const quesos = require('./coleccionables/quesos');
const enemigos = require('./enemigos/enemigos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  npcs: npcs,
  checkpoints: checkpoints,
  geysers: geysers,
  cheeses: quesos,
  magmaCrawlers: enemigos.crawlers,
  fireBats: enemigos.fliers
};
