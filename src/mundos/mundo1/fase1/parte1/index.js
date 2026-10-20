// 🌿 FASE 1 • PARTE 1: La Aldea del Trébol (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const lirios = require('./decoraciones/lirios');
const npcs = require('./npcs/abuela_camelia');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lilies: lirios,
  npcs: npcs,
  cheeses: cheeses
};
