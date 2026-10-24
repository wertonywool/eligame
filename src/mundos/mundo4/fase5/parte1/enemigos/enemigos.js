// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 1: ENEMIGOS DE ALTA MONTAÑA (X: 18000 -> 20750)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en la morrena inicial
    { x: 18130, y: 196, minX: 18100, maxX: 18230, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha patrullando los bloques de serac del Khumbu
    { x: 18520, y: 112, minX: 18510, maxX: 18580, speed: 40, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el Valle del Silencio
    { x: 19370, y: 156, minX: 19350, maxX: 19480, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Pared del Lhotse
    { x: 19940, y: 88, minX: 19930, maxX: 20000, speed: 44, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la arista de salida al Collado Sur
    { x: 20620, y: 96, minX: 20600, maxX: 20670, speed: 46, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago glacial sobrevolando los seracs del Khumbu
    { x: 18440, y: 65, baseY: 65, minX: 18360, maxX: 18520, speed: 45, variant: 'frost_flier' },
    // Murciélago glacial sobre la gran grieta del Khumbu
    { x: 18820, y: 35, baseY: 35, minX: 18760, maxX: 18900, speed: 42, variant: 'frost_flier' },
    // Murciélago glacial en las corrientes del Valle del Silencio
    { x: 19560, y: 55, baseY: 55, minX: 19490, maxX: 19640, speed: 44, variant: 'frost_flier' },
    // Murciélago glacial en las corrientes de viento de la Pared del Lhotse
    { x: 19980, y: 30, baseY: 30, minX: 19900, maxX: 20080, speed: 45, variant: 'frost_flier' }
  ]
};
