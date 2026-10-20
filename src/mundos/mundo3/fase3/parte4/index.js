// MUNDO 3 - FASE 3 - PARTE 4: Ensamblador del Rascacielos y Azotea (X: 9900 -> 12000)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const guardian = require('./npcs/guardian');
const babyRooftop = require('./npcs/baby_on_rooftop');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: [],
  fireBats: [],
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: guardian.concat(babyRooftop)
};
