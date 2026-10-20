// 💎 MUNDO 2 • FASE 2 • PARTE 3: Galería Oeste y Santuario Secreto #2 (Índice de Ensamblaje)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const cascadaLava = require('./mecanicas/cascada_lava');
const geyser = require('./mecanicas/geyser');
const magmaCrawlers = require('./enemigos/magma_crawlers');
const fireBats = require('./enemigos/fire_bats');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lavaWalls: cascadaLava,
  geysers: geyser,
  magmaCrawlers: magmaCrawlers,
  fireBats: fireBats,
  cheeses: cheeses
};
