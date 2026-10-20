// MUNDO 3 - FASE 3 - PARTE 2: Ensamblador de Tienda Kai, Rompiente y Playa (X: 8100 -> 9000)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const turistas2 = require('./npcs/turistas2');
const kai = require('./npcs/kai');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: [
    { x: 8850, y: 206, minX: 8780, maxX: 8920, speed: 25, variant: 'crab' }
  ],
  fireBats: [
    { x: 8550, y: 85, baseY: 85, minX: 8400, maxX: 8720, speed: 38, variant: 'seagull' }
  ],
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: kai.concat(turistas2)
};
