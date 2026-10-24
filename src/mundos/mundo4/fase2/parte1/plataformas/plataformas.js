// ============================================================================
// MUNDO 4 - FASE 2 - PARTE 1: PLATAFORMAS DE LA CASCADA DE KHUMBU (X: 4050 -> 5350)
// ============================================================================
// Laberinto de seracs: Puentes de escalera de aluminio sobre grietas, bancos de nieve,
// plataformas de hielo resbaladizo y bloques de diamante celestial.

module.exports = [
  // 1. Terraza de Campamento 4 tras el Gran Arco Glacial (X: 4050 -> 4260)
  { x: 4050, y: 196, w: 210, h: 28, subType: 'snow_ground' },

  // 2. Primer Gran Abismo de Khumbu cruzado por Puente de Escalera de Aluminio (X: 4260 -> 4420)
  { x: 4260, y: 196, w: 160, h: 14, subType: 'aluminum_bridge' },

  // 3. Primer Macizo de Hielo Intermedio y Cornisas de Ascenso (X: 4420 -> 4540)
  { x: 4420, y: 196, w: 120, h: 28, subType: 'snow_ground' },
  { x: 4450, y: 154, w: 80, h: 14, oneWay: true, subType: 'ice_rock' },

  // 4. Paso Superior de Hielo Resbaladizo (Slippery Ice) para deslizamiento técnico (X: 4560 -> 4720)
  { x: 4560, y: 162, w: 75, h: 12, subType: 'slippery_ice' },
  { x: 4655, y: 135, w: 70, h: 12, subType: 'slippery_ice' },

  // 5. Suelo Inferior y Gran Banco de Nieve para Cavar Túneles Subterráneos (X: 4740 -> 5000)
  { x: 4740, y: 196, w: 260, h: 36, subType: 'snow_bank' },

  // 6. Ruta Aérea Acrobática (Alternativa para saltadores)
  { x: 4780, y: 136, w: 60, h: 12, oneWay: true, subType: 'cracking_ice' },
  { x: 4865, y: 104, w: 65, h: 12, oneWay: true, subType: 'ice_crystal' },
  { x: 4945, y: 136, w: 60, h: 12, oneWay: true, subType: 'cracking_ice' },

  // 7. Segunda Gran Grieta de Seracs cruzada por Doble Escalera de Aluminio (X: 5020 -> 5180)
  { x: 5020, y: 184, w: 70, h: 14, subType: 'aluminum_bridge' },
  { x: 5090, y: 154, w: 35, h: 70, subType: 'ice_pillar' },
  { x: 5125, y: 184, w: 65, h: 14, subType: 'aluminum_bridge' },

  // 8. Terraza de Llegada al Campamento 4 y Checkpoint 20 (X: 5190 -> 5350)
  { x: 5190, y: 196, w: 160, h: 28, subType: 'snow_ground' },
  { x: 5240, y: 154, w: 75, h: 14, oneWay: true, subType: 'ice_rock' }
];
