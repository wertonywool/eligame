// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 7: PLATAFORMAS DE LA ALCALDÍA (CASA 7)
// ============================================================================
// Exterior: Plaza Cívica y Gran Puerta Glacial al Lago Congelado (X: 12550 -> 13300)
// Interior: Gran Salón de Audiencias de la Alcaldía (X: 52400 -> 52700)

module.exports = [
  // --- SECTOR EXTERIOR: PLAZA CÍVICA Y GRAN PUERTA GLACIAL ---
  // 1. Calzada de entrada desde el Distrito de la Forja (X: 12550 -> 12750)
  { x: 12550, y: 196, w: 200, h: 28, subType: 'snow_ground' },

  // 2. Banco de nieve y permafrost en la plaza con queso enterrado (X: 12750 -> 12850)
  { x: 12750, y: 196, w: 100, h: 32, subType: 'snow_bank' },

  // 3. Acera monumental frente a la Alcaldía (X: 12850 -> 13080)
  { x: 12850, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // 4. Tejado nevado de la Alcaldía para parkour (X: 12870 -> 12970)
  { x: 12870, y: 108, w: 100, h: 12, oneWay: true, subType: 'ice_rock' },

  // 5. Plataforma del campanario de la torre del reloj con queso secreto (X: 12900 -> 12940)
  { x: 12900, y: 72, w: 40, h: 10, oneWay: true, subType: 'ice_rock' },

  // 6. Explanada de la Gran Puerta Glacial hacia el Lago Congelado (Fase 4) (X: 13080 -> 13300)
  { x: 13080, y: 196, w: 220, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: GRAN SALÓN DE AUDIENCIAS (X: 52400 -> 52700) ---
  // 7. Suelo ceremonial de parquet y alfombra roja
  { x: 52400, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 8. Muros y techo señorial de la Alcaldía
  { x: 52380, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 52700, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 52400, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 9. Balcón / estrado de honores con queso secreto
  { x: 52520, y: 130, w: 100, h: 12, oneWay: true, subType: 'ice_rock' }
];
