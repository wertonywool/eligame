// 🌹 FASE 3 • PARTE 3: Escalinata y Santuario Sagrado (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const lirios = require('./decoraciones/lirios');
const babyMouse = require('./mecanicas/baby_mouse');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lilies: lirios,
  babyMouse: babyMouse,
  cheeses: cheeses
};
