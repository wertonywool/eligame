// 🦋 FASE 2 • PARTE 2: El Gran Invernadero de Cristal y Cúpula Secreta (Índice)
const plataformas = require('./plataformas/plataformas');
const decoraciones = require('./decoraciones/decoraciones');
const faroles = require('./decoraciones/faroles');
const lirios = require('./decoraciones/lirios');
const florBrisa = require('./mecanicas/flor_brisa');
const cornelio = require('./npcs/cornelio');
const escarabajos = require('./enemigos/escarabajos');
const abejas = require('./enemigos/abejas');
const cheeses = require('./coleccionables/quesos');

module.exports = {
  platforms: plataformas,
  decorations: decoraciones,
  lanterns: faroles,
  lilies: lirios,
  geysers: florBrisa,
  npcs: cornelio,
  magmaCrawlers: escarabajos,
  fireBats: abejas,
  cheeses: cheeses
};
