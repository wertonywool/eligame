// MUNDO 3 - FASE 2 - PARTE 1: Ensamblador de Entrada a la Playa (X: 3600 -> 4500)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const enemigos = require('./enemigos/enemigos');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');
const salvavidas = require('./npcs/salvavidas');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: enemigos.crawlers,
  fireBats: enemigos.fliers,
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: salvavidas
};
