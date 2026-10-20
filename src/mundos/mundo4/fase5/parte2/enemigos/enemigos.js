// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 2: ENEMIGOS DE LA CIMA DEL EVEREST (X: 20750 -> 23800)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en el Collado Sur
    { x: 20890, y: 98, minX: 20880, maxX: 20950, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la arista de la Cresta Sureste
    { x: 21560, y: 104, minX: 21540, maxX: 21620, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la rampa resbaladiza hacia el Paso de Hillary
    { x: 21740, y: 116, minX: 21700, maxX: 21820, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en los peldanos del Paso de Hillary
    { x: 22270, y: 112, minX: 22260, maxX: 22330, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Gran Meseta de la Cima
    { x: 23040, y: 98, minX: 22960, maxX: 23150, speed: 52, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobre el abismo del Collado Sur
    { x: 21020, y: 45, baseY: 45, minX: 20960, maxX: 21080, speed: 42, variant: 'frost_flier' },
    // Murcielago glacial en los vientos huracanados de la Cresta Sureste
    { x: 21450, y: 60, baseY: 60, minX: 21400, maxX: 21520, speed: 42, variant: 'frost_flier' },
    // Murcielago glacial acechando en las cornisas del Paso de Hillary
    { x: 22350, y: 50, baseY: 50, minX: 22280, maxX: 22420, speed: 45, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando el monumento de la cima (8848 m)
    { x: 23200, y: 35, baseY: 35, minX: 23120, maxX: 23280, speed: 48, variant: 'frost_flier' }
  ]
};
