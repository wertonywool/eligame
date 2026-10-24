// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 1: ARCHIVO MAESTRO MODULAR (X: 33000 -> 34700)
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
