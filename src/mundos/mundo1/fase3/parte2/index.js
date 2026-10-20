// 🌹 FASE 3 • PARTE 2: La Gran Plaza Imperial y 3 Glorietas (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const lirios = require('./decoraciones/lirios');
const espinas = require('./peligros/espinas');
const florBrisa = require('./mecanicas/flor_brisa');
const puzzle = require('./mecanicas/puzzle_7_colores');
const homelander = require('./enemigos/homelander');
const mariposa = require('./enemigos/mariposa_nocturna');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lilies: lirios,
  spikes: espinas,
  geysers: florBrisa,
  colorPads: puzzle.pads,
  colorSequence: puzzle.sequence,
  homelander: homelander,
  fireBats: mariposa,
  cheeses: cheeses
};
