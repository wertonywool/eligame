// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 1: ENEMIGOS DE KANGSHUNG (X: 23800 -> 25250)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en la rampa de descenso
    { x: 23890, y: 78, minX: 23880, maxX: 23945, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la cornisa superior de la Caverna de Hielo
    { x: 24320, y: 104, minX: 24280, maxX: 24380, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el banco inferior de permafrost
    { x: 24420, y: 168, minX: 24350, maxX: 24500, speed: 50, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la pista de hielo resbaladizo de la garganta
    { x: 24760, y: 112, minX: 24740, maxX: 24820, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el Balcon de Kangshung
    { x: 25050, y: 124, minX: 24980, maxX: 25150, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobrevolando el descenso de la cumbre
    { x: 23950, y: 45, baseY: 45, minX: 23880, maxX: 24020, speed: 40, variant: 'frost_flier' },
    // Murcielago glacial sobre la entrada a la caverna
    { x: 24310, y: 40, baseY: 40, minX: 24250, maxX: 24380, speed: 44, variant: 'frost_flier' },
    // Murcielago glacial en las corrientes de la Garganta de Estalactitas
    { x: 24680, y: 50, baseY: 50, minX: 24620, maxX: 24760, speed: 45, variant: 'frost_flier' },
    // Murcielago glacial sobre el Balcon de Kangshung
    { x: 25120, y: 35, baseY: 35, minX: 25060, maxX: 25200, speed: 46, variant: 'frost_flier' }
  ]
};
