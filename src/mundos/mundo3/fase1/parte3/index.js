// 🌊 MUNDO 3 • FASE 1 • PARTE 3: Ensamblador de El Gran Malecón
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const cangrejos = require('./enemigos/cangrejos');
const gaviotas = require('./enemigos/gaviotas');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: cangrejos,
  fireBats: gaviotas,
  cheeses: quesos,
  checkpoints: checkpoint
};
