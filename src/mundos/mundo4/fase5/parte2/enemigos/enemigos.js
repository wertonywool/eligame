// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 2: ENEMIGOS DE LA CIMA DEL EVEREST (X: 20750 -> 23800)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en el Collado Sur
    { x: 20890, y: 136, minX: 20850, maxX: 20970, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la arista de la Cresta Sureste
    { x: 21560, y: 76, minX: 21550, maxX: 21625, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la cumbre sur
    { x: 21750, y: 110, minX: 21730, maxX: 21830, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la aproximación al Hillary Step
    { x: 22030, y: 104, minX: 22025, maxX: 22090, speed: 46, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Gran Terraza de la Cima
    { x: 23280, y: 98, minX: 23200, maxX: 23360, speed: 50, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago glacial sobre el abismo del Collado Sur
    { x: 21020, y: 45, baseY: 45, minX: 20960, maxX: 21080, speed: 42, variant: 'frost_flier' },
    // Murciélago glacial en los vientos huracanados de la Cresta Sureste
    { x: 21450, y: 50, baseY: 50, minX: 21380, maxX: 21520, speed: 42, variant: 'frost_flier' },
    // Murciélago glacial acechando en las cornisas del Paso de Hillary
    { x: 22320, y: 35, baseY: 35, minX: 22240, maxX: 22420, speed: 46, variant: 'frost_flier' },
    // Murciélago glacial sobrevolando el mirador oriental
    { x: 23550, y: 45, baseY: 45, minX: 23480, maxX: 23640, speed: 48, variant: 'frost_flier' }
  ]
};
