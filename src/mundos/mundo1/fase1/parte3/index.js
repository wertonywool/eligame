// 🌿 FASE 1 • PARTE 3: El Gran Barranco de los Cerezos y Glorieta Secreta (Índice)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const lirios = require('./decoraciones/lirios');
const florBrisa = require('./mecanicas/flor_brisa');
const espinas = require('./peligros/espinas');
const dexter = require('./npcs/boticario_dexter');
const mariquitas = require('./enemigos/mariquitas');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lilies: lirios,
  geysers: florBrisa,
  spikes: espinas,
  npcs: dexter,
  magmaCrawlers: mariquitas,
  cheeses: cheeses
};
