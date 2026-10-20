// 🌹 FASE 3 • PARTE 1: Terraza Monumental de Entrada (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const lirios = require('./decoraciones/lirios');
const checkpoint = require('./mecanicas/checkpoint');
const rosalia = require('./npcs/rosalia');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lilies: lirios,
  checkpoints: checkpoint,
  npcs: rosalia
};
