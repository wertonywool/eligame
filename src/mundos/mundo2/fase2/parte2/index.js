// 💎 MUNDO 2 • FASE 2 • PARTE 2: Galerías de Cristal Centrales (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const cascadaLava = require('./mecanicas/cascada_lava');
const geysersRescate = require('./mecanicas/geysers_rescate');
const cornelio = require('./npcs/cornelio');
const magmaCrawlers = require('./enemigos/magma_crawlers');
const fireBats = require('./enemigos/fire_bats');
const magmaWorms = require('./enemigos/magma_worms');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lavaWalls: cascadaLava,
  geysers: geysersRescate,
  npcs: cornelio,
  magmaCrawlers: magmaCrawlers,
  fireBats: fireBats,
  magmaWorms: magmaWorms,
  cheeses: cheeses
};
