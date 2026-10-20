// ============================================================================
// MUNDO 4 - FASE 8 - PARTE 1: PLATAFORMAS DE KAILASH (X: 33000 -> 34700)
// ============================================================================
// Ascenso al Monte Kailash, Terrazas de Lapislazuli y el Puente del Arcoiris.
// NOTA: En X >= 33000 la gravedad cosmica es reducida; saltos largos y flotantes.

module.exports = [
  // 1. Rampa de Ascenso Astral al Monte Kailash (X: 33000 -> 33170)
  { x: 33000, y: 126, w: 170, h: 28, subType: 'snow_ground' },

  // Plataformas flotantes de baja gravedad
  { x: 33090, y: 84, w: 65, h: 14, subType: 'ice_rock' },
  { x: 33170, y: 52, w: 55, h: 12, subType: 'slippery_ice' },

  // 2. Aguja de Lapislazuli y Pilar de Cuarzo quebrable
  { x: 33200, y: 110, w: 46, h: 64, subType: 'ice_pillar' },

  // 3. Terraza de las Estrellas de Kailash con Queso #89
  { x: 33270, y: 96, w: 120, h: 18, subType: 'ice_rock' },
  { x: 33330, y: 64, w: 70, h: 14, subType: 'rainbow_ice' },
  { x: 33410, y: 44, w: 55, h: 12, subType: 'slippery_ice' },

  // 4. Puente Celestial de Hielo Resbaladizo
  { x: 33420, y: 114, w: 130, h: 14, subType: 'slippery_ice' },
  { x: 33500, y: 80, w: 65, h: 14, subType: 'ice_rock' },

  // 5. Columna Quebrable de Jade Cosmico
  { x: 33580, y: 126, w: 44, h: 56, subType: 'ice_pillar' },

  // 6. Gran Terraza del Lapislazuli de Kailash y Checkpoint #44 (X: 33650 -> 33970)
  { x: 33650, y: 126, w: 320, h: 30, subType: 'snow_ground' },
  { x: 33720, y: 82, w: 75, h: 14, subType: 'ice_rock' },
  { x: 33810, y: 48, w: 60, h: 12, subType: 'slippery_ice' },
  { x: 33900, y: 78, w: 65, h: 14, subType: 'rainbow_ice' },

  // 7. Fosa Astral de Escarcha y Polvo Estelar con Queso #90 (X: 33990 -> 34150)
  { x: 33990, y: 156, w: 160, h: 26, subType: 'snow_bank' },
  { x: 34060, y: 112, w: 60, h: 14, subType: 'ice_rock' },

  // 8. Pilar de Cristal Runico Quebrable
  { x: 34180, y: 112, w: 46, h: 58, subType: 'ice_pillar' },

  // 9. Gran Puente del Arcoiris de Kailash con Queso #91
  { x: 34260, y: 100, w: 180, h: 14, subType: 'rainbow_ice' },
  { x: 34320, y: 60, w: 70, h: 14, subType: 'rainbow_ice' },
  { x: 34400, y: 42, w: 55, h: 12, subType: 'slippery_ice' },

  // 10. Terraza de Transicion hacia Agartha (X: 34470 -> 34700)
  { x: 34470, y: 118, w: 230, h: 28, subType: 'snow_ground' },
  { x: 34560, y: 84, w: 65, h: 14, subType: 'ice_rock' }
];
