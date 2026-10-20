// ⛓️ MUNDO 2 • FASE 3 • PARTE 2: Puentes de Fundición (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const cascadaLava = require('./mecanicas/cascada_lava');
const geysersRescate = require('./mecanicas/geysers_rescate');
const obsidianBrutes = require('./enemigos/obsidian_brutes');
const flameWisps = require('./enemigos/flame_wisps');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lavaWalls: cascadaLava,
  geysers: geysersRescate,
  obsidianBrutes: obsidianBrutes,
  flameWisps: flameWisps,
  cheeses: cheeses
};
