// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 3: PLATAFORMAS DE LA CUMBRE Y DESCENSO (X: 6650 -> 8050)
// ============================================================================
// Grandes agujas de cumbre, bloques de diamante glacial y umbral al Pueblo Nevado.

module.exports = [
  // 1. Terraza de cumbre del Campamento 5.5 de Apa Sherpa (X: 6650 -> 6800)
  { x: 6650, y: 196, w: 150, h: 28, subType: 'snow_ground' },

  // 2. Primera Gran Aguja de Cumbre (X: 6830 -> 6880)
  { x: 6830, y: 150, w: 50, h: 74, subType: 'ice_pillar' },

  // 3. Bloques Flotantes de Diamante Glacial para parkour vertical de cumbre
  { x: 6910, y: 112, w: 70, h: 14, oneWay: true, subType: 'ice_crystal' },
  { x: 7010, y: 78, w: 70, h: 14, oneWay: true, subType: 'ice_crystal' },

  // 4. Repisa Aérea de Nieve Profunda en la Cresta Superior (X: 7110 -> 7300)
  // Permite cavar con la pala para eludir el viento polar y abastecerse de bolas de nieve
  { x: 7110, y: 118, w: 190, h: 32, subType: 'snow_bank' },

  // 5. Segunda Aguja de Hielo con descenso técnico hacia la sima terminal (X: 7330 -> 7390)
  { x: 7330, y: 144, w: 60, h: 80, subType: 'ice_pillar' },

  // 6. Gran Puente Alpino de Escalera sobre el abismo final (X: 7420 -> 7580)
  { x: 7420, y: 136, w: 160, h: 14, subType: 'alpine_bridge' },

  // 7. Bloque de Cristal Glacial de Enlace (X: 7610 -> 7680)
  { x: 7610, y: 104, w: 70, h: 14, oneWay: true, subType: 'ice_crystal' },

  // 8. Banco de Nieve del Desfiladero con queso enterrado (X: 7710 -> 7880)
  { x: 7710, y: 184, w: 170, h: 36, subType: 'snow_bank' },

  // 9. Terraza de Llegada y Umbral al Pueblo Nevado de la Fase 3 (X: 7900 -> 8050)
  { x: 7900, y: 196, w: 150, h: 28, subType: 'snow_ground' }
];
