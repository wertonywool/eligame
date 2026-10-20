// MUNDO 3 - FASE 5 - PARTE 1: Ensamblador del Torrente del Megatsunami
const platforms = require('./plataformas/plataformas');
const decorations = require('./decoraciones/decoraciones');
const enemies = require('./enemigos/enemigos');
const cheeses = require('./coleccionables/quesos');
const checkpoints = require('./mecanicas/checkpoint');

module.exports = {
  platforms,
  decorations,
  checkpoints,
  magmaCrawlers: enemies.crawlers,
  fireBats: enemies.fliers,
  cheeses
};
