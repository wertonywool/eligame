// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 2: ENEMIGOS DE AGARTHA (X: 34700 -> 36400)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de cristal en la terraza aerea de entrada
    { x: 34790, y: 78, minX: 34782, maxX: 34840, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Oruga de cristal en la Primera Terraza de Agartha
    { x: 35020, y: 96, minX: 34970, maxX: 35090, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de cristal en el arcoiris superior
    { x: 35030, y: 64, minX: 35022, maxX: 35085, speed: 52, dir: -1, variant: 'frost_crawler' },
    // Oruga de cristal en la terraza del Gran Patio
    { x: 35400, y: 80, minX: 35392, maxX: 35460, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Fosa de Diamante Astral
    { x: 35680, y: 156, minX: 35630, maxX: 35770, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga astral en la cornisa de la Via Lactea
    { x: 35910, y: 88, minX: 35902, maxX: 35970, speed: 48, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobrevolando los jardines de cristal
    { x: 34870, y: 22, baseY: 22, minX: 34810, maxX: 34930, speed: 52, variant: 'frost_flier' },
    // Murcielago glacial en el Puente de Arcoiris Menor
    { x: 35200, y: 48, baseY: 48, minX: 35140, maxX: 35260, speed: 44, variant: 'frost_flier' },
    // Murcielago astral sobre el Gran Patio de Agartha
    { x: 35490, y: 20, baseY: 20, minX: 35430, maxX: 35550, speed: 56, variant: 'frost_flier' },
    // Murcielago glacial sobre el Puente de la Via Lactea
    { x: 36010, y: 35, baseY: 35, minX: 35940, maxX: 36080, speed: 48, variant: 'frost_flier' }
  ]
};
