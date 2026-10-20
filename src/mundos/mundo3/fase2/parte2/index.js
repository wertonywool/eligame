// MUNDO 3 - FASE 2 - PARTE 2: Ensamblador de Orilla Serena (X: 4500 -> 5400)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const enemigos = require('./enemigos/enemigos');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');
const caracola = require('./npcs/caracola');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: enemigos.crawlers,
  fireBats: enemigos.fliers,
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: caracola
};
