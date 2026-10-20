// 🏙️ MUNDO 3 • FASE 1 • PARTE 1: Ensamblador de Distrito Urbano
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const enemigos = require('./enemigos/enemigos');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');
const ciudadano = require('./npcs/ciudadano');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: enemigos,
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: ciudadano
};
