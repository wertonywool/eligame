// 🏬 MUNDO 3 • FASE 1 • PARTE 2: Ensamblador de Gran Cruce Comercial
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const carros = require('./enemigos/carros');
const cangrejos = require('./enemigos/enemigos');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: carros.concat(cangrejos),
  cheeses: quesos,
  checkpoints: checkpoint
};
