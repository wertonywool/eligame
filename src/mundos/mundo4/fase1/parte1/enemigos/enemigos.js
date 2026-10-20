// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 1: ENEMIGOS DE LAS FALDAS DEL EVEREST
// ============================================================================
// Frost Crawlers y Frost Fliers acorazados de hielo glacial.

module.exports = {
  crawlers: [
    // Oruga de escarcha en el Campamento Base
    { x: 180, y: 196, minX: 100, maxX: 260, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga helada sobre el primer banco de nieve
    { x: 520, y: 196, minX: 450, maxX: 620, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga helada patrullando la meseta intermedia
    { x: 740, y: 196, minX: 700, maxX: 850, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga helada custodiando la superficie del gran banco de nieve
    { x: 1140, y: 196, minX: 1100, maxX: 1300, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga helada en el puente alpino
    { x: 1380, y: 196, minX: 1340, maxX: 1460, speed: 45, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobre el primer banco de nieve
    { x: 560, y: 65, baseY: 65, minX: 490, maxX: 630, speed: 38, variant: 'frost_flier' },
    // Murcielago de hielo sobre las cornisas de pizarra
    { x: 910, y: 65, baseY: 65, minX: 840, maxX: 980, speed: 35, variant: 'frost_flier' },
    // Murcielago glacial en el puente rustico alpino
    { x: 1390, y: 60, baseY: 60, minX: 1340, maxX: 1450, speed: 40, variant: 'frost_flier' }
  ]
};
