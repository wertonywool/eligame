// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 1: ENEMIGOS DE ALTA MONTANA (X: 18000 -> 20750)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en la morrena inicial
    { x: 18130, y: 160, minX: 18120, maxX: 18190, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha patrullando los bloques de serac del Khumbu
    { x: 18510, y: 136, minX: 18490, maxX: 18580, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el Valle del Silencio
    { x: 19490, y: 124, minX: 19480, maxX: 19550, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha patrullando los peldanos de la Pared del Lhotse
    { x: 19910, y: 104, minX: 19890, maxX: 19970, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la rampa de salida al Collado Sur
    { x: 20640, y: 96, minX: 20600, maxX: 20720, speed: 48, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobrevolando los seracs
    { x: 18480, y: 65, baseY: 65, minX: 18400, maxX: 18540, speed: 42, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando la gran grieta del Khumbu
    { x: 18800, y: 35, baseY: 35, minX: 18740, maxX: 18880, speed: 40, variant: 'frost_flier' },
    // Murcielago glacial en las corrientes del Valle del Silencio
    { x: 19550, y: 55, baseY: 55, minX: 19480, maxX: 19620, speed: 44, variant: 'frost_flier' },
    // Murcielago glacial en las corrientes de viento de la Pared del Lhotse
    { x: 20080, y: 25, baseY: 25, minX: 20020, maxX: 20160, speed: 45, variant: 'frost_flier' }
  ]
};
