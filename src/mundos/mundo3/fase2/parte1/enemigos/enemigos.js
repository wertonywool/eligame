// MUNDO 3 - FASE 2 - PARTE 1: Fauna Costera Pacifica (X: 3600 -> 4500)
module.exports = {
  crawlers: [
    // Cangrejos tranquilos patrullando la orilla de arena
    { x: 3820, y: 206, minX: 3770, maxX: 3880, speed: 28, variant: 'crab' },
    { x: 4220, y: 206, minX: 4160, maxX: 4280, speed: 26, variant: 'crab' }
  ],
  fliers: [
    // Gaviota planeando alto en la brisa de la tarde
    { x: 4050, y: 85, baseY: 85, minX: 3950, maxX: 4150, speed: 38, variant: 'seagull' }
  ]
};
