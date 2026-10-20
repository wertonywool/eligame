// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 2: ENEMIGOS DE LAS NEBULOSAS (X: 38100 -> 39800)
// ============================================================================

module.exports = {
  crawlers: [
    // Guardia de escarcha en la roca de nebulosa inicial
    { x: 38180, y: 80, minX: 38172, maxX: 38225, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Guardia de escarcha en la Terraza de Polvo de Nebulosa
    { x: 38490, y: 92, minX: 38450, maxX: 38560, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Guardia astral en el balcon de la flora cosmica
    { x: 38550, y: 64, minX: 38542, maxX: 38605, speed: 52, dir: -1, variant: 'frost_crawler' },
    // Guardia de escarcha en la terraza del jardin de lotos
    { x: 38750, y: 84, minX: 38742, maxX: 38805, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Guardia astral en la terraza alta del Oasis
    { x: 38950, y: 82, minX: 38942, maxX: 39010, speed: 52, dir: -1, variant: 'frost_crawler' },
    // Guardia de escarcha en la Fosa Profunda de Meteoritos
    { x: 39160, y: 156, minX: 39120, maxX: 39250, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Guardia astral en el cometa dorado
    { x: 39540, y: 82, minX: 39532, maxX: 39620, speed: 46, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago astral en el Puente de Aurora Verde y Violeta
    { x: 38350, y: 38, baseY: 38, minX: 38300, maxX: 38400, speed: 46, variant: 'frost_flier' },
    // Murcielago astral en la cuspide de la aurora
    { x: 38440, y: 20, baseY: 20, minX: 38380, maxX: 38500, speed: 55, variant: 'frost_flier' },
    // Murcielago astral sobrevolando el Oasis Boreal
    { x: 39030, y: 22, baseY: 22, minX: 38970, maxX: 39090, speed: 54, variant: 'frost_flier' },
    // Murcielago astral en el Puente de Estrellas Fugaces
    { x: 39420, y: 24, baseY: 24, minX: 39380, maxX: 39480, speed: 48, variant: 'frost_flier' },
    // Murcielago astral sobre la Aguja Solar
    { x: 39590, y: 26, baseY: 26, minX: 39530, maxX: 39650, speed: 56, variant: 'frost_flier' }
  ]
};
