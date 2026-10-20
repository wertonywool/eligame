// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 2: PLATAFORMAS DE LA CASCADA VERTICAL (X: 5350 -> 6650)
// ============================================================================
// Agujas de hielo, bloques flotantes de cristal, cornisas de nieve y puentes alpinos.

module.exports = [
  // 1. Terraza de avanzada del Campamento 4.5 de Ang Rita (X: 5350 -> 5500)
  { x: 5350, y: 196, w: 150, h: 28, subType: 'snow_ground' },

  // 2. Primera Aguja / Pilar de Hielo Vertical (X: 5530 -> 5580)
  { x: 5530, y: 154, w: 50, h: 70, subType: 'ice_pillar' },

  // 3. Bloques Flotantes de Diamante Glacial para parkour vertical estilo Celeste
  { x: 5610, y: 116, w: 70, h: 14, oneWay: true, subType: 'ice_crystal' },
  { x: 5710, y: 82, w: 60, h: 14, oneWay: true, subType: 'ice_crystal' },

  // 4. Repisa Intermedia de Nieve Profunda en la Altura (X: 5800 -> 5980)
  // Permite cavar para eludir el viento polar y reabastecer bolas de nieve
  { x: 5800, y: 120, w: 180, h: 32, subType: 'snow_bank' },

  // 5. Segunda Aguja de Hielo con descenso técnico hacia el puente (X: 6010 -> 6070)
  { x: 6010, y: 146, w: 60, h: 78, subType: 'ice_pillar' },

  // 6. Gran Puente Alpino de Escalera sobre la sima de hielo (X: 6100 -> 6240)
  { x: 6100, y: 136, w: 140, h: 14, subType: 'alpine_bridge' },

  // 7. Bloque de Cristal Glacial Suspendido (X: 6270 -> 6340)
  { x: 6270, y: 104, w: 70, h: 14, oneWay: true, subType: 'ice_crystal' },

  // 8. Banco de Nieve del Desfiladero con queso enterrado (X: 6370 -> 6540)
  { x: 6370, y: 184, w: 170, h: 36, subType: 'snow_bank' },

  // 9. Terraza de Llegada hacia el Campamento 5 (X: 6560 -> 6720)
  { x: 6560, y: 196, w: 160, h: 28, subType: 'snow_ground' }
];
