// 🏕️ MUNDO 2 • FASE 1 • PARTE 1: Villa Ceniza (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const cascadaLava = require('./mecanicas/cascada_lava');
const checkpoint = require('./mecanicas/checkpoint');
const npcs = require('./npcs/npcs_aldea');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lavaWalls: cascadaLava,
  checkpoints: checkpoint,
  npcs: npcs,
  cheeses: cheeses
};
