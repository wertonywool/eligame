// 🏙️ MUNDO 3 • FASE 4 • PARTE 1: Ensamblador de la Avenida y Edificio Objetivo (X: 12000 -> 13200)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const npcsCiudad = require('./npcs/npcs_ciudad');
const quesos = require('./coleccionables/quesos');
const checkpoint = require('./mecanicas/checkpoint');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  magmaCrawlers: [],
  fireBats: [],
  cheeses: quesos,
  checkpoints: checkpoint,
  npcs: npcsCiudad
};
