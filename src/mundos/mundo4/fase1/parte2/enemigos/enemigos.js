// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 2: ENEMIGOS DEL GLACIAR KHUMBU (X: 1490 -> 2720)
// ============================================================================
// Frost Crawlers y Frost Fliers custodiando los seracs y grietas heladas.

module.exports = {
  crawlers: [
    // Oruga de escarcha en la morrena inicial
    { x: 1530, y: 196, minX: 1490, maxX: 1620, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el primer banco de nieve profunda
    { x: 1740, y: 196, minX: 1700, maxX: 1900, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la repisa intermedia
    { x: 2080, y: 164, minX: 2060, maxX: 2160, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el terraplen de seracs
    { x: 2360, y: 186, minX: 2310, maxX: 2480, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el saliente del Campamento 2
    { x: 2590, y: 196, minX: 2550, maxX: 2680, speed: 45, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobrevolando el primer banco de nieve
    { x: 1780, y: 70, baseY: 70, minX: 1720, maxX: 1850, speed: 40, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando el abismo de la grieta helada
    { x: 2220, y: 85, baseY: 85, minX: 2160, maxX: 2280, speed: 38, variant: 'frost_flier' },
    // Murcielago glacial sobre el terraplen de seracs
    { x: 2440, y: 65, baseY: 65, minX: 2380, maxX: 2500, speed: 42, variant: 'frost_flier' }
  ]
};
