// ============================================================================
// MUNDO 4 - FASE 4 - PARTE 2: ENEMIGOS DEL LAGO PROFUNDO (X: 15650 -> 18000)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de hielo en la orilla de entrada a la zona abisal
    { x: 15720, y: 196, minX: 15660, maxX: 15830, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo patrullando la cornisa sobre la fosa abisal
    { x: 16100, y: 136, minX: 16092, maxX: 16150, speed: 40, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en la Isla del Santuario (Campamento 9)
    { x: 16540, y: 196, minX: 16480, maxX: 16640, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de hielo en la cornisa superior del Santuario
    { x: 16570, y: 154, minX: 16562, maxX: 16630, speed: 42, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo veloz en la pista de hielo hacia el pie del Everest
    { x: 17320, y: 196, minX: 17260, maxX: 17460, speed: 52, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en los escalones ceremoniales hacia la Cumbre
    { x: 17860, y: 136, minX: 17852, maxX: 17925, speed: 46, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago gélido vigilando el acceso a la Fosa Abisal
    { x: 15800, y: 60, baseY: 60, minX: 15740, maxX: 15870, speed: 42, variant: 'frost_flier' },
    // Murciélago gélido sobrevolando el témpano móvil de la fosa
    { x: 16220, y: 55, baseY: 55, minX: 16160, maxX: 16300, speed: 40, variant: 'frost_flier' },
    // Murciélago gélido sobre las terrazas del Santuario Glacial
    { x: 16600, y: 50, baseY: 50, minX: 16540, maxX: 16680, speed: 44, variant: 'frost_flier' },
    // Murciélago gélido en las corrientes ascendentes de la rampa final
    { x: 17400, y: 55, baseY: 55, minX: 17330, maxX: 17480, speed: 42, variant: 'frost_flier' },
    // Murciélago gélido en el Umbral de la Cumbre
    { x: 17840, y: 48, baseY: 48, minX: 17780, maxX: 17930, speed: 46, variant: 'frost_flier' }
  ]
};
