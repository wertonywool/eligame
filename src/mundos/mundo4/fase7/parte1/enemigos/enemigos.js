// ============================================================================
// MUNDO 4 - FASE 7 - PARTE 1: ENEMIGOS DE SHAMBHALA (X: 29600 -> 31300)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en la terraza inicial
    { x: 29750, y: 126, minX: 29710, maxX: 29810, speed: 38, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la terraza elevada
    { x: 29980, y: 96, minX: 29950, maxX: 30040, speed: 42, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha patrullando la fosa de permafrost
    { x: 30750, y: 156, minX: 30700, maxX: 30840, speed: 45, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago glacial sobrevolando el río sagrado
    { x: 30130, y: 48, baseY: 48, minX: 30080, maxX: 30180, speed: 42, variant: 'frost_flier' },
    // Murciélago glacial sobre la caverna de permafrost
    { x: 30860, y: 46, baseY: 46, minX: 30800, maxX: 30930, speed: 44, variant: 'frost_flier' },
    // Murciélago glacial custodiando el Gran Puente hacia la Pagoda
    { x: 31070, y: 44, baseY: 44, minX: 31010, maxX: 31130, speed: 46, variant: 'frost_flier' }
  ]
};
