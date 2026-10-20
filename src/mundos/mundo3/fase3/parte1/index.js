// MUNDO 3 - FASE 3 - PARTE 1: Ensamblador de Puesto de Sami y Plaza (X: 7200 -> 8100)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const sami = require('./npcs/sami');
const turistas1 = require('./npcs/turistas1');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: [
    { x: 7850, y: 206, minX: 7780, maxX: 7920, speed: 24, variant: 'crab' }
  ],
  fireBats: [
    { x: 7500, y: 85, baseY: 85, minX: 7400, maxX: 7650, speed: 36, variant: 'seagull' }
  ],
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: sami.concat(turistas1)
};
