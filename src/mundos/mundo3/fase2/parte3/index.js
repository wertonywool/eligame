// MUNDO 3 - FASE 2 - PARTE 3: Ensamblador de Dunas y Canal de Surf (X: 5400 -> 6300)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const enemigos = require('./enemigos/enemigos');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');
const surfista = require('./npcs/surfista');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: enemigos.crawlers,
  fireBats: enemigos.fliers,
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: surfista
};
