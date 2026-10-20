// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 1: ENEMIGOS DE KAILASH (X: 33000 -> 34700)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga astral en la plataforma flotante inicial
    { x: 33100, y: 84, minX: 33092, maxX: 33150, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Terraza de las Estrellas
    { x: 33300, y: 96, minX: 33280, maxX: 33380, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga astral en el puente arcoiris superior
    { x: 33340, y: 64, minX: 33332, maxX: 33395, speed: 52, dir: -1, variant: 'frost_crawler' },
    // Oruga astral en la terraza superior de Kailash
    { x: 33730, y: 82, minX: 33722, maxX: 33790, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Fosa Astral
    { x: 34040, y: 156, minX: 34000, maxX: 34140, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga astral en la terraza de transicion a Agartha
    { x: 34570, y: 84, minX: 34562, maxX: 34620, speed: 52, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago astral a gran altura sobre Kailash
    { x: 33180, y: 26, baseY: 26, minX: 33120, maxX: 33240, speed: 54, variant: 'frost_flier' },
    // Murcielago glacial en el Puente Celestial
    { x: 33480, y: 55, baseY: 55, minX: 33430, maxX: 33540, speed: 45, variant: 'frost_flier' },
    // Murcielago astral flotando en la cima de Kailash
    { x: 33830, y: 22, baseY: 22, minX: 33770, maxX: 33900, speed: 56, variant: 'frost_flier' },
    // Murcielago astral sobre el Puente del Arcoiris
    { x: 34350, y: 35, baseY: 35, minX: 34270, maxX: 34420, speed: 48, variant: 'frost_flier' }
  ]
};
