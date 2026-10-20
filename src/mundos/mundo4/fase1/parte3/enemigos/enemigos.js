// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 3: ENEMIGOS DE LA CASCADA DE HIELO (X: 2720 -> 4050)
// ============================================================================
// Frost Crawlers y Frost Fliers custodiando las cornisas y bancos de nieve polar.

module.exports = {
  crawlers: [
    // Oruga de hielo en la terraza de suministros
    { x: 2760, y: 196, minX: 2730, maxX: 2850, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo patrullando el primer banco de nieve del desfiladero
    { x: 2980, y: 196, minX: 2920, maxX: 3150, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo en la cornisa superior
    { x: 3060, y: 150, minX: 3040, maxX: 3140, speed: 45, dir: -1, variant: 'frost_crawler' },
    // Oruga de hielo patrullando el banco superior de nieve profunda
    { x: 3500, y: 184, minX: 3440, maxX: 3670, speed: 52, dir: -1, variant: 'frost_crawler' },
    // Oruga de hielo en la Gran Terraza Terminal
    { x: 3860, y: 196, minX: 3820, maxX: 3980, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago de hielo en la terraza inicial
    { x: 2840, y: 65, baseY: 65, minX: 2780, maxX: 2900, speed: 40, variant: 'frost_flier' },
    // Murcielago de hielo vigilando los pinaculos del abismo intermedio
    { x: 3120, y: 85, baseY: 85, minX: 3050, maxX: 3200, speed: 40, variant: 'frost_flier' },
    // Murcielago de hielo sobre el puente de escalera alpino
    { x: 3380, y: 60, baseY: 60, minX: 3320, maxX: 3440, speed: 42, variant: 'frost_flier' },
    // Murcielago de hielo sobrevolando la antesala del portal glacial
    { x: 3620, y: 70, baseY: 70, minX: 3550, maxX: 3700, speed: 42, variant: 'frost_flier' }
  ]
};
