// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 3: ENEMIGOS DEL UMBRAL DEL SANTUARIO (X: 26700 -> 28150)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en el desfiladero de acceso
    { x: 26740, y: 110, minX: 26700, maxX: 26840, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Terraza de los Guardianes
    { x: 26920, y: 116, minX: 26880, maxX: 27010, speed: 46, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el atrio del templo
    { x: 27420, y: 126, minX: 27360, maxX: 27550, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la antesala de la batalla
    { x: 27910, y: 110, minX: 27860, maxX: 28000, speed: 50, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago glacial sobre el Puente Ceremonial del Cañón
    { x: 27150, y: 55, baseY: 55, minX: 27110, maxX: 27240, speed: 42, variant: 'frost_flier' },
    // Murciélago glacial sobre el atrio monumental
    { x: 27500, y: 50, baseY: 50, minX: 27440, maxX: 27580, speed: 44, variant: 'frost_flier' }
  ]
};
