// ⛓️ MUNDO 2 • FASE 3 • PARTE 3: Gran Terraza Oriental y Mirador (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const geyser = require('./mecanicas/geyser');
const sirBrie = require('./npcs/sir_brie');
const lavaHoppers = require('./enemigos/lava_hoppers');
const flameWisps = require('./enemigos/flame_wisps');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  geysers: geyser,
  npcs: sirBrie,
  lavaHoppers: lavaHoppers,
  flameWisps: flameWisps
};
