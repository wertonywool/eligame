// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 1: ENEMIGOS DE KANGSHUNG (X: 23800 -> 25250)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en la rampa de descenso
    { x: 23900, y: 76, minX: 23880, maxX: 23950, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la cornisa superior de la Caverna de Hielo
    { x: 24320, y: 114, minX: 24290, maxX: 24410, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la base de la Garganta de Estalactitas
    { x: 24700, y: 162, minX: 24620, maxX: 24820, speed: 50, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en el Balcón mirador de Kangshung
    { x: 25060, y: 124, minX: 24980, maxX: 25160, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago glacial sobrevolando el descenso
    { x: 23960, y: 40, baseY: 40, minX: 23900, maxX: 24020, speed: 42, variant: 'frost_flier' },
    // Murciélago glacial en la entrada a la caverna
    { x: 24320, y: 48, baseY: 48, minX: 24260, maxX: 24380, speed: 44, variant: 'frost_flier' },
    // Murciélago glacial patrullando sobre el balcón mirador
    { x: 25120, y: 45, baseY: 45, minX: 25050, maxX: 25200, speed: 46, variant: 'frost_flier' }
  ]
};
