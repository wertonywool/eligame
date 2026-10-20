// MUNDO 3 - FASE 4 - PARTE 2: Ensamblador del Lobby del Rascacielos (X: 13450 -> 14100)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const npcsLobby = require('./npcs/npcs_lobby');
const quesos = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decoraciones: decoraciones,
  decorations: decoraciones,
  npcs: npcsLobby,
  cheeses: quesos,
  checkpoints: [],
  magmaCrawlers: [],
  fireBats: []
};
