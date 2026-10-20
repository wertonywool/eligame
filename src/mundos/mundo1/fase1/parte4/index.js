// 🌿 FASE 1 • PARTE 4: Pasaje Oriental de los Cerezos (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const lirios = require('./decoraciones/lirios');
const mariquitas = require('./enemigos/mariquitas');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lilies: lirios,
  magmaCrawlers: mariquitas,
  cheeses: cheeses
};
