// 🌋 MUNDO 2 • FASE 4 • PARTE 1: Antesala Imperial del Cráter (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const checkpoint = require('./mecanicas/checkpoint');
const portonCastillo = require('./mecanicas/porton_castillo');
const capitanCheddar = require('./npcs/capitan_cheddar');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  checkpoints: checkpoint,
  bossCastleGate: portonCastillo,
  npcs: capitanCheddar
};
