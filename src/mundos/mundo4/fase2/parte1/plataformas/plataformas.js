// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 1: PLATAFORMAS DE LOS PILARES CELESTE (X: 4050 -> 5350)
// ============================================================================
// Pilares de hielo cristalino, bloques flotantes de diamante glacial y bancos elevados.

module.exports = [
  // 1. Terraza de bienvenida tras el Gran Arco Glacial (X: 4050 -> 4200)
  { x: 4050, y: 196, w: 150, h: 28, subType: 'snow_ground' },

  // 2. Primer Pilar de Hielo Cristalino Vertical (X: 4230 -> 4280)
  { x: 4230, y: 160, w: 50, h: 64, subType: 'ice_pillar' },

  // 3. Bloques Flotantes de Diamante Glacial para parkour vertical estilo Celeste
  { x: 4310, y: 120, w: 70, h: 14, oneWay: true, subType: 'ice_crystal' },
  { x: 4410, y: 86, w: 60, h: 14, oneWay: true, subType: 'ice_crystal' },

  // 4. Repisa Superior de Nieve Profunda en la Altura (X: 4500 -> 4680)
  // Permite cavar para evitar la ventisca superior y recargar bolas de nieve
  { x: 4500, y: 124, w: 180, h: 32, subType: 'snow_bank' },

  // 5. Segundo Pilar de Hielo con descenso técnico (X: 4710 -> 4770)
  { x: 4710, y: 150, w: 60, h: 74, subType: 'ice_pillar' },

  // 6. Puente Alpino de Escalera sobre la sima de estalagmitas (X: 4800 -> 4920)
  { x: 4800, y: 144, w: 120, h: 14, subType: 'alpine_bridge' },

  // 7. Bloque de Cristal Glacial suspendido (X: 4940 -> 5000)
  { x: 4940, y: 108, w: 60, h: 14, oneWay: true, subType: 'ice_crystal' },

  // 8. Banco de Nieve del Desfiladero con queso enterrado (X: 5030 -> 5210)
  { x: 5030, y: 184, w: 180, h: 36, subType: 'snow_bank' },

  // 9. Terraza de Llegada del Campamento 4 (X: 5230 -> 5400)
  { x: 5230, y: 196, w: 170, h: 28, subType: 'snow_ground' }
];
