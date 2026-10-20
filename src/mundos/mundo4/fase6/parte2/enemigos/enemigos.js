// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 2: ENEMIGOS DE LAS TORRES CELESTIALES (X: 25250 -> 26700)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en la Torre Celestial Alpha
    { x: 25480, y: 96, minX: 25470, maxX: 25540, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la cornisa de la Torre Celestial Beta
    { x: 25770, y: 104, minX: 25755, maxX: 25820, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la terraza del Campamento Kangshung 2
    { x: 25890, y: 126, minX: 25850, maxX: 25990, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la fosa de permafrost profundo
    { x: 26090, y: 156, minX: 26060, maxX: 26180, speed: 50, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Torre Celestial Delta
    { x: 26530, y: 92, minX: 26520, maxX: 26580, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobre el Puente Colgante Occidental
    { x: 25630, y: 55, baseY: 55, minX: 25580, maxX: 25690, speed: 44, variant: 'frost_flier' },
    // Murcielago glacial en el abismo entre torres
    { x: 25800, y: 40, baseY: 40, minX: 25740, maxX: 25860, speed: 46, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando el vortice polar oriental
    { x: 26380, y: 45, baseY: 45, minX: 26320, maxX: 26440, speed: 48, variant: 'frost_flier' },
    // Murcielago glacial en la entrada al Umbral Sagrado
    { x: 26580, y: 50, baseY: 50, minX: 26520, maxX: 26640, speed: 42, variant: 'frost_flier' }
  ]
};
