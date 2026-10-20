// 🌊 MUNDO 3 • FASE 1 • PARTE 4: Ensamblador de Muelle Salado y Mirador Costero
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const enemigos = require('./enemigos/enemigos');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');
const pescador = require('./npcs/pescador');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: enemigos.crawlers,
  fireBats: enemigos.fliers,
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: pescador
};
