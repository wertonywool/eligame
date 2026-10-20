// MUNDO 3 - FASE 5 - PARTE 2: Decoraciones de la Antesala y Arena del Kraken
module.exports = [
  // 1. Helipuerto central de la plataforma de combate
  { x: 18560, y: 196, subType: 'city_helipad', w: 64, h: 12 },

  // 2. Estaciones de escombros para arrojar al monstruo (losa, taxi, viga)
  { x: 18360, y: 196, subType: 'floating_debris', debrisType: 'slab' },
  { x: 18660, y: 196, subType: 'floating_debris', debrisType: 'taxi' },
  { x: 18860, y: 196, subType: 'floating_debris', debrisType: 'girder' },

  // 3. Tentáculos titánicos del Kraken acechando en las aguas
  { x: 18150, y: 192, subType: 'kraken_tentacle', scale: 1.0 },
  { x: 19040, y: 192, subType: 'kraken_tentacle', scale: 1.25 },
  { x: 19360, y: 192, subType: 'kraken_tentacle', scale: 1.15 }
];
