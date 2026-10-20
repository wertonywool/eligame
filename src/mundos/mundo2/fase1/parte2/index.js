// 🏕️ MUNDO 2 • FASE 1 • PARTE 2: Sendero de 4 Terrazas de Basalto (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const fososLava = require('./peligros/fosos_lava');
const cascadaLava = require('./mecanicas/cascada_lava');
const magmaCrawlers = require('./enemigos/magma_crawlers');
const lavaHoppers = require('./enemigos/lava_hoppers');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  spikes: fososLava,
  lavaWalls: cascadaLava,
  magmaCrawlers: magmaCrawlers,
  lavaHoppers: lavaHoppers,
  cheeses: cheeses
};
