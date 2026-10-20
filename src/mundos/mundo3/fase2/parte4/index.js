// MUNDO 3 - FASE 2 - PARTE 4: Ensamblador del Estuario y Mirador (X: 6300 -> 7200)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const enemigos = require('./enemigos/enemigos');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');
const observador = require('./npcs/observador');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: enemigos.crawlers,
  fireBats: enemigos.fliers,
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: observador
};
