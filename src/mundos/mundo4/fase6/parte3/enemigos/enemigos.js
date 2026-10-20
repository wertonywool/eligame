// ============================================================================
// MUNDO 4 - FASE 6 - PARTE 3: ENEMIGOS DEL UMBRAL DEL SANTUARIO (X: 26700 -> 28150)
// ============================================================================

module.exports = {
  crawlers: [
    // Oruga de escarcha en la terraza de entrada
    { x: 26790, y: 78, minX: 26780, maxX: 26840, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Terraza de los Guardianes
    { x: 26980, y: 96, minX: 26960, maxX: 27040, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en el Atrio del Santuario
    { x: 27400, y: 84, minX: 27390, maxX: 27460, speed: 48, dir: -1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Cripta Baja de Permafrost del Santuario
    { x: 27630, y: 156, minX: 27600, maxX: 27740, speed: 50, dir: 1, variant: 'frost_crawler' },
    // Oruga de escarcha en la Terraza Elevada de la Antesala
    { x: 27920, y: 88, minX: 27900, maxX: 27980, speed: 48, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murcielago glacial sobrevolando la entrada al umbral
    { x: 26840, y: 50, baseY: 50, minX: 26780, maxX: 26900, speed: 42, variant: 'frost_flier' },
    // Murcielago glacial acechando sobre el puente de lajas del foso sagrado
    { x: 27140, y: 75, baseY: 75, minX: 27090, maxX: 27190, speed: 42, variant: 'frost_flier' },
    // Murcielago glacial sobre el Atrio del Santuario
    { x: 27490, y: 35, baseY: 35, minX: 27420, maxX: 27550, speed: 46, variant: 'frost_flier' },
    // Murcielago glacial sobrevolando el puente de hielo puro de la antesala
    { x: 27830, y: 58, baseY: 58, minX: 27780, maxX: 27880, speed: 46, variant: 'frost_flier' }
  ]
};
