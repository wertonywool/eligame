// ============================================================================
// MUNDO 4 - FASE 4 - PARTE 2: ENEMIGOS DEL LAGO PROFUNDO (X: 15650 -> 18000)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de hielo en la orilla de entrada
    { x: 15760, y: 156, minX: 15750, maxX: 15820, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo patrullando la cadena de tempanos flotantes
    { x: 16180, y: 168, minX: 16180, maxX: 16250, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en la Isla del Santuario
    { x: 16690, y: 154, minX: 16680, maxX: 16750, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de hielo patrullando la pista de hielo hacia el pie del Everest
    { x: 17240, y: 196, minX: 17180, maxX: 17350, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en la rampa de ascenso final
    { x: 17830, y: 154, minX: 17820, maxX: 17890, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago gelido sobrevolando la fosa profunda
    { x: 16150, y: 60, baseY: 60, minX: 16080, maxX: 16220, speed: 42, variant: 'frost_flier' },
    // Murcielago gelido sobre el tempano movil
    { x: 16350, y: 55, baseY: 55, minX: 16280, maxX: 16420, speed: 40, variant: 'frost_flier' },
    // Murcielago gelido sobre el Santuario Glacial
    { x: 16980, y: 48, baseY: 48, minX: 16920, maxX: 17040, speed: 44, variant: 'frost_flier' },
    // Murcielago gelido en las corrientes ascendentes de la cumbre
    { x: 17700, y: 55, baseY: 55, minX: 17620, maxX: 17780, speed: 42, variant: 'frost_flier' }
  ]
};
