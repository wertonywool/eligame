// MUNDO 3 - FASE 3 - PARTE 3: Ensamblador de Voleibol y Palapas (X: 9000 -> 9900)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const turistas3 = require('./npcs/turistas3');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: [
    { x: 9680, y: 206, minX: 9610, maxX: 9750, speed: 26, variant: 'crab' }
  ],
  fireBats: [
    { x: 9420, y: 80, baseY: 80, minX: 9280, maxX: 9580, speed: 36, variant: 'seagull' }
  ],
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: turistas3
};
