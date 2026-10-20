// 🦋 FASE 2 • PARTE 1: Muelle de Entrada y Travesía Acuática (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const lirios = require('./decoraciones/lirios');
const checkpoint = require('./mecanicas/checkpoint');
const florBrisa = require('./mecanicas/flor_brisa');
const flora = require('./npcs/flora');
const abejas = require('./enemigos/abejas');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lilies: lirios,
  checkpoints: checkpoint,
  geysers: florBrisa,
  npcs: flora,
  fireBats: abejas,
  cheeses: cheeses
};
