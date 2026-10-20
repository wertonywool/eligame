// 🏕️ MUNDO 2 • FASE 1 • PARTE 3: Cueva Secreta #1 y Géiser (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const cascadaLava = require('./mecanicas/cascada_lava');
const geyser = require('./mecanicas/geyser');
const roquefort = require('./npcs/maestro_roquefort');
const magmaCrawlers = require('./enemigos/magma_crawlers');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lavaWalls: cascadaLava,
  geysers: geyser,
  npcs: roquefort,
  magmaCrawlers: magmaCrawlers,
  cheeses: cheeses
};
