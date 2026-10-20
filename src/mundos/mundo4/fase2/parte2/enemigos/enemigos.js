// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 2: ENEMIGOS DE LA CASCADA VERTICAL (X: 5350 -> 6650)
// ============================================================================
// Frost Crawlers y Frost Fliers custodiando las agujas y bloques flotantes.

module.exports = {
  crawlers: [
    // Oruga de hielo patrullando la repisa superior de nieve
    { x: 5860, y: 120, minX: 5810, maxX: 5960, speed: 48, dir: 1, variant: 'frost_crawler' },
    // Oruga de hielo custodiando el banco de nieve del desfiladero
    { x: 6420, y: 184, minX: 6380, maxX: 6520, speed: 52, dir: -1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago de hielo sobrevolando las agujas y bloques superiores
    { x: 5660, y: 55, baseY: 55, minX: 5600, maxX: 5740, speed: 40, variant: 'frost_flier' },
    // Murciélago de hielo vigilando el cruce del gran puente alpino
    { x: 6180, y: 70, baseY: 70, minX: 6120, maxX: 6240, speed: 42, variant: 'frost_flier' }
  ]
};
