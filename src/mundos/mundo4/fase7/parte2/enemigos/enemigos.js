// ============================================================================
// MUNDO 4 - FASE 7 - PARTE 2: ENEMIGOS DE LA GRAN PAGODA (X: 31300 -> 33000)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en la cornisa de la Primera Terraza
    { x: 31630, y: 64, minX: 31615, maxX: 31670, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la base de la terraza
    { x: 31620, y: 96, minX: 31570, maxX: 31690, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el piso superior de la Gran Pagoda
    { x: 32020, y: 84, minX: 32005, maxX: 32070, speed: 52, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la cornisa de la Fosa de Meditacion
    { x: 32300, y: 112, minX: 32292, maxX: 32345, speed: 46, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el fondo de la Fosa de Meditacion
    { x: 32280, y: 156, minX: 32230, maxX: 32370, speed: 50, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobrevolando el Puente de Cristal
    { x: 31800, y: 44, baseY: 44, minX: 31740, maxX: 31860, speed: 48, variant: 'frost_flier' },
    // Murcielago glacial en la cuspide de la Gran Pagoda
    { x: 32100, y: 36, baseY: 36, minX: 32040, maxX: 32160, speed: 52, variant: 'frost_flier' },
    // Murcielago glacial sobre el Vortice de Shambhala
    { x: 32560, y: 34, baseY: 34, minX: 32510, maxX: 32620, speed: 48, variant: 'frost_flier' },
    // Murcielago glacial sobre el Puente Ceremonial
    { x: 32700, y: 50, baseY: 50, minX: 32650, maxX: 32750, speed: 44, variant: 'frost_flier' }
  ]
};
