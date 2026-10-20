// 🌋 MUNDO 2 • FASE 4 • PARTE 2: Interior del Castillo y Arena Boss (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const omniMen = require('./enemigos/omni_man');
const babyMouse = require('./mecanicas/baby_mouse');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  omniMen: omniMen,
  babyMouse: babyMouse,
  cheeses: cheeses
};
