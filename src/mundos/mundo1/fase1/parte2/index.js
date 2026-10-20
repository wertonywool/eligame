// 🌿 FASE 1 • PARTE 2: Desfiladero de Zarzas Espinosas (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const lirios = require('./decoraciones/lirios');
const espinas = require('./peligros/espinas');
const mariquitas = require('./enemigos/mariquitas');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lilies: lirios,
  spikes: espinas,
  magmaCrawlers: mariquitas,
  cheeses: cheeses
};
