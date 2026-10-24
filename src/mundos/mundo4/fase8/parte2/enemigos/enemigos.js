// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 2: ENEMIGOS DE AGARTHA (X: 34700 -> 36400)
// ============================================================================
// Guardianes cristalinos de cuarzo y amatista, y fénix astrales celestiales.

module.exports = {
  crawlers: [
    // 1. Guardián de cristal en la Columnata de la Gran Puerta
    { x: 34840, y: 126, minX: 34740, maxX: 34940, speed: 45, dir: 1, variant: 'agartha_sentinel' },
    // 2. Guardián de cristal custodiando los Jardines de Cuarzo
    { x: 35140, y: 130, minX: 35110, maxX: 35240, speed: 48, dir: 1, variant: 'agartha_sentinel' },
    // 3. Guardián de cristal en el flanco del Gran Patio Celestial
    { x: 35460, y: 126, minX: 35400, maxX: 35560, speed: 42, dir: 1, variant: 'agartha_sentinel' },
    // 4. Guardián de cristal patrullando el acceso al Sanctum de la Vía Láctea
    { x: 35780, y: 126, minX: 35760, maxX: 35840, speed: 50, dir: -1, variant: 'agartha_sentinel' }
  ],
  fliers: [
    // 1. Fénix astral sobrevolando la Columnata de entrada
    { x: 34950, y: 28, baseY: 28, minX: 34870, maxX: 35040, speed: 52, variant: 'astral_flier' },
    // 2. Fénix astral planeando sobre las arañas de cristal del Salón
    { x: 35320, y: 24, baseY: 24, minX: 35230, maxX: 35410, speed: 46, variant: 'astral_flier' },
    // 3. Fénix astral surcando los peldaños estelares de la Vía Láctea
    { x: 36020, y: 20, baseY: 20, minX: 35940, maxX: 36100, speed: 54, variant: 'astral_flier' }
  ]
};
