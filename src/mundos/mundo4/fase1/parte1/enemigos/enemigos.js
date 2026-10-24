// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 1: ENEMIGOS DE LAS FALDAS DEL EVEREST
// ============================================================================
// Frost Crawlers terrestres y Frost Fliers alados de hielo.

module.exports = {
  crawlers: [
    // Oruga de escarcha sobre la superficie del primer banco de nieve (se elude cavando)
    { x: 540, y: 196, minX: 460, maxX: 660, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga patrullando la base de la colina rocosa
    { x: 760, y: 196, minX: 720, maxX: 850, speed: 42, dir: -1, variant: 'frost_crawler' },
    // Oruga custodiando la superficie del banco de nieve de la ventisca
    { x: 1210, y: 196, minX: 1140, maxX: 1320, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobre el primer banco de nieve
    { x: 620, y: 65, baseY: 65, minX: 560, maxX: 680, speed: 36, variant: 'frost_flier' },
    // Murcielago de hielo vigilando el ascenso por cornisas
    { x: 890, y: 65, baseY: 65, minX: 830, maxX: 960, speed: 36, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando el puente alpino
    { x: 1410, y: 65, baseY: 65, minX: 1360, maxX: 1470, speed: 38, variant: 'frost_flier' }
  ]
};
