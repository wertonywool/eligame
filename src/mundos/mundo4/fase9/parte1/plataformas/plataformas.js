// ============================================================================
// MUNDO 4 - FASE 9 - PARTE 1: PLATAFORMAS DEL FIRMAMENTO COSMICO (X: 36400 -> 38100)
// ============================================================================
// NOTA: En X >= 33000 la gravedad cosmica es reducida; saltos largos y flotantes.

module.exports = [
  // 1. Rampa de Salida del Portal de Agartha hacia el Firmamento
  { x: 36400, y: 126, w: 160, h: 28, subType: 'snow_ground' },
  { x: 36470, y: 80, w: 60, h: 14, subType: 'ice_rock' },
  { x: 36540, y: 54, w: 50, h: 12, subType: 'slippery_ice' },

  // 2. Primer Puente Flotante de Aurora Boreal (Hielo Arcoiris translucido)
  { x: 36590, y: 108, w: 120, h: 16, subType: 'rainbow_ice' },
  { x: 36660, y: 72, w: 65, h: 14, subType: 'rainbow_ice' },
  { x: 36730, y: 48, w: 55, h: 12, subType: 'slippery_ice' },

  // 3. Terraza Flotante de Meteorito Astral (Queso #95)
  { x: 36740, y: 92, w: 130, h: 18, subType: 'ice_rock' },
  { x: 36840, y: 64, w: 70, h: 14, subType: 'ice_rock' },

  // 4. Pilar Quebrable de Luz Boreal #1
  { x: 36900, y: 114, w: 46, h: 64, subType: 'ice_pillar' },

  // 5. Terraza del Observatorio de las Constelaciones
  { x: 36970, y: 126, w: 140, h: 20, subType: 'ice_rock' },
  { x: 37040, y: 80, w: 70, h: 14, subType: 'ice_rock' },
  { x: 37120, y: 52, w: 60, h: 12, subType: 'slippery_ice' },

  // 6. Gran Mirador de la Via Lactea (Vigia Cosmico Kelsang y Checkpoint #46)
  { x: 37140, y: 126, w: 240, h: 30, subType: 'snow_ground' },
  { x: 37240, y: 84, w: 75, h: 14, subType: 'ice_rock' },
  { x: 37330, y: 54, w: 60, h: 12, subType: 'slippery_ice' },

  // 7. Fosa de Polvo Estelar y Cometas con Queso #96
  { x: 37410, y: 154, w: 160, h: 26, subType: 'snow_bank' },
  { x: 37490, y: 110, w: 60, h: 14, subType: 'snow_bank' },

  // 8. Pilar Quebrable de Luz Boreal #2
  { x: 37600, y: 112, w: 46, h: 60, subType: 'ice_pillar' },

  // 9. Segundo Puente Flotante de Aurora Boreal
  { x: 37680, y: 96, w: 130, h: 16, subType: 'rainbow_ice' },
  { x: 37740, y: 62, w: 65, h: 14, subType: 'rainbow_ice' },
  { x: 37810, y: 42, w: 55, h: 12, subType: 'slippery_ice' },

  // 10. Aguja Superior de las Pleyades con Queso #97
  { x: 37840, y: 82, w: 110, h: 18, subType: 'ice_rock' },

  // 11. Terraza de Transicion hacia el Laberinto de Nebulosas (Parte 2)
  { x: 37980, y: 118, w: 140, h: 28, subType: 'snow_ground' },
  { x: 38040, y: 84, w: 65, h: 14, subType: 'ice_rock' }
];
