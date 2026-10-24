// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 7: PLATAFORMAS DE LA ALCALDÍA (CASA 7)
// ============================================================================
// Exterior: Plaza Cívica, Gran Campanario y Puerta Glacial al Lago Congelado (X: 12550 -> 13300)
// Interior: Gran Salón de Audiencias de la Alcaldía (X: 52400 -> 52700)

module.exports = [
  // --- SECTOR EXTERIOR: PLAZA CÍVICA Y GRAN PUERTA GLACIAL ---
  // 1. Calzada ceremonial desde el Distrito de la Forja (X: 12550 -> 12750)
  { x: 12550, y: 196, w: 200, h: 28, subType: 'snow_ground' },
  { x: 12640, y: 165, w: 65, h: 10, oneWay: true, subType: 'ice_rock' }, // Terraza de la guardia cívica

  // 2. Banco de nieve y permafrost en la plaza con queso enterrado #58 (X: 12750 -> 12850)
  { x: 12750, y: 196, w: 100, h: 32, subType: 'snow_bank' },
  { x: 12770, y: 154, w: 75, h: 12, oneWay: true, subType: 'ice_rock' }, // Balustrada de mármol nevada

  // 3. Acera monumental frente a la Alcaldía (X: 12850 -> 13080)
  { x: 12850, y: 196, w: 230, h: 28, subType: 'snow_ground' },
  { x: 12865, y: 160, w: 65, h: 10, oneWay: true, subType: 'ice_rock' }, // Pórtico señorial de entrada

  // 4. Tejado y gran torre del reloj para parkour (X: 12880 -> 12970)
  { x: 12880, y: 120, w: 85, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 12905, y: 66, w: 35, h: 10, oneWay: true, subType: 'ice_rock' }, // Cúpula del campanario con queso #57

  // 5. Cuerda ceremonial con banderines dorados hacia el Gran Arco Glacial
  { x: 12950, y: 84, w: 85, h: 8, oneWay: true, subType: 'ice_rock' },
  { x: 13060, y: 148, w: 35, h: 10, oneWay: true, subType: 'ice_rock' }, // Farol cívico con repisa

  // 6. Explanada monumental del Gran Arco Glacial hacia la Fase 4 (X: 13080 -> 13300)
  { x: 13080, y: 196, w: 220, h: 28, subType: 'snow_ground' },
  { x: 13220, y: 124, w: 60, h: 12, oneWay: true, subType: 'ice_rock' }, // Cornisa del Gran Arco Glacial

  // --- SECTOR INTERIOR: GRAN SALÓN DE AUDIENCIAS (X: 52400 -> 52700) ---
  // 7. Suelo ceremonial de parquet y alfombra roja
  { x: 52400, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 8. Muros y techo señorial de la Alcaldía
  { x: 52380, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 52700, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 52400, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 9. Estrado y balconada señorial escalable
  { x: 52480, y: 170, w: 45, h: 10, oneWay: true, subType: 'ice_rock' }, // Asientos del concejo
  { x: 52540, y: 152, w: 55, h: 10, oneWay: true, subType: 'ice_rock' }, // Estrado del Gran Alcalde
  { x: 52570, y: 116, w: 90, h: 12, oneWay: true, subType: 'ice_rock' }, // Balcón de vitrales con queso #56
  { x: 52460, y: 82, w: 65, h: 8, oneWay: true, subType: 'ice_rock' } // Viga de la lámpara de cristal
];
