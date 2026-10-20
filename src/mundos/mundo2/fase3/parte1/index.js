// ⛓️ MUNDO 2 • FASE 3 • PARTE 1: Entrada de la Gran Forja (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const checkpoint = require('./mecanicas/checkpoint');
const vulcano = require('./npcs/maestro_vulcano');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  checkpoints: checkpoint,
  npcs: vulcano
};
