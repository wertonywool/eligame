// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 2: ENEMIGOS DE LAS NEBULOSAS (X: 38100 -> 39800)
// ============================================================================

module.exports = {
  crawlers: [
    // Guardia de escarcha en la entrada a los Jardines de Nebulosa
    { x: 38190, y: 120, minX: 38130, maxX: 38240, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Guardia astral en la terraza inferior de la nebulosa
    { x: 38530, y: 126, minX: 38490, maxX: 38600, speed: 42, dir: 1, variant: 'frost_crawler' },
    // Guardia de escarcha en el borde este del Oasis de la Aurora (lejos del NPC Tara)
    { x: 39020, y: 126, minX: 38960, maxX: 39060, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Guardia astral en la rampa previa al Cometa Dorado
    { x: 39390, y: 112, minX: 39350, maxX: 39440, speed: 44, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago astral en el Puente de Aurora Verde y Violeta
    { x: 38340, y: 65, baseY: 65, minX: 38290, maxX: 38400, speed: 44, variant: 'frost_flier' },
    // Murciélago astral sobrevolando el Jardín de Lotos
    { x: 38700, y: 55, baseY: 55, minX: 38640, maxX: 38770, speed: 46, variant: 'frost_flier' },
    // Murciélago astral en el ascenso al Cometa Dorado
    { x: 39550, y: 40, baseY: 40, minX: 39490, maxX: 39620, speed: 52, variant: 'frost_flier' }
  ]
};
