// 🏢 MUNDO 3 • FASE 4 • PARTE 3: Ensamblador de la Azotea (Piso 100) (X: 14450 -> 16000)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const checkpoint = require('./mecanicas/checkpoint');
const babyRooftop = require('./npcs/baby_on_rooftop');

module.exports = {
  platforms: plataformas,
  decoraciones: decoraciones,
  decorations: decoraciones,
  npcs: babyRooftop,
  cheeses: [],
  checkpoints: checkpoint,
  magmaCrawlers: [],
  fireBats: []
};
