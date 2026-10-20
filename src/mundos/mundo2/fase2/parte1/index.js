// 💎 MUNDO 2 • FASE 2 • PARTE 1: Campamento Minero del Este (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const checkpoint = require('./mecanicas/checkpoint');
const picoFino = require('./npcs/pico_fino');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  checkpoints: checkpoint,
  npcs: picoFino
};
