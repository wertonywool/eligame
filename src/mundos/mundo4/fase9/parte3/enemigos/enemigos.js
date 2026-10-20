// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 3: ENEMIGOS DEL SANCTUM SANCTORUM (X: 39800 -> 41600)
// ============================================================================

module.exports = {
  crawlers: [
    // Guardia de diamante en la Terraza de la Estrella Solitaria
    { x: 40200, y: 92, minX: 40160, maxX: 40280, speed: 45, dir: 1, variant: 'frost_crawler' },
    // Guardia de diamante en la Fosa Profunda de la Estrella Polar
    { x: 40870, y: 156, minX: 40830, maxX: 40960, speed: 50, dir: 1, variant: 'frost_crawler' }
  ],
  fliers: [
    // Murciélago celestial en el Primer Puente Prismático
    { x: 40050, y: 60, baseY: 60, minX: 40000, maxX: 40100, speed: 46, variant: 'frost_flier' },
    // Murciélago celestial en el Segundo Puente Prismático
    { x: 41130, y: 56, baseY: 56, minX: 41090, maxX: 41190, speed: 48, variant: 'frost_flier' }
  ]
};
