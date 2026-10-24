// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 2: ENEMIGOS DE LAS TORRES CELESTIALES (X: 25250 -> 26700)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en la base de la Torre Celestial Alpha
    { x: 25440, y: 130, minX: 25410, maxX: 25520, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la terraza del Campamento Kangshung 2
    { x: 25840, y: 126, minX: 25780, maxX: 25960, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la terraza de aproximación al Umbral
    { x: 26540, y: 114, minX: 26510, maxX: 26680, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago glacial sobre el Puente Colgante Occidental
    { x: 25610, y: 55, baseY: 55, minX: 25570, maxX: 25710, speed: 42, variant: 'frost_flier' },
    // Murciélago glacial en el abismo del Puente Oriental
    { x: 26320, y: 45, baseY: 45, minX: 26270, maxX: 26420, speed: 44, variant: 'frost_flier' }
  ]
};
