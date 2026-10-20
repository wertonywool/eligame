// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 1: PLATAFORMAS DEL KHUMBU Y LHOTSE (X: 18000 -> 20750)
// ============================================================================
// Morrena glacial, seracs del Khumbu, puentes de escaleras, Valle del Silencio y Pared del Lhotse.

module.exports = [
  // 1. Morrena Glacial de Entrada desde la Fase 4 (X: 18000 -> 18320)
  { x: 18000, y: 196, w: 320, h: 28, subType: 'snow_ground' },
  { x: 18120, y: 160, w: 75, h: 14, subType: 'ice_rock' },
  { x: 18240, y: 130, w: 65, h: 12, subType: 'slippery_ice' },

  // 2. Bloques Serac Gigantes de la Cascada del Khumbu (ascenso vertical escalonado)
  { x: 18360, y: 168, w: 90, h: 20, subType: 'ice_rock' },
  { x: 18420, y: 140, w: 70, h: 14, subType: 'ice_rock' },
  { x: 18490, y: 136, w: 100, h: 20, subType: 'ice_rock' },
  { x: 18560, y: 112, w: 65, h: 12, subType: 'slippery_ice' },
  { x: 18630, y: 108, w: 80, h: 20, subType: 'ice_rock' },

  // 3. Puente de Escaleras de Aluminio sobre la Gran Grieta del Khumbu con Queso #65
  { x: 18740, y: 108, w: 160, h: 10, oneWay: true, subType: 'aluminum_bridge' },
  { x: 18840, y: 76, w: 65, h: 12, subType: 'ice_rock' },

  // 4. Plataforma de Aclimatacion del Campamento 11 y Pemba (X: 18930 -> 19310)
  { x: 18930, y: 136, w: 380, h: 28, subType: 'snow_ground' },
  { x: 19040, y: 98, w: 75, h: 14, subType: 'ice_rock' },
  { x: 19160, y: 70, w: 65, h: 12, subType: 'slippery_ice' },

  // 5. El Valle del Silencio (Western Cwm) - Gran banco de permafrost profundo con Queso #66
  { x: 19340, y: 168, w: 380, h: 32, subType: 'snow_bank' },
  { x: 19480, y: 124, w: 70, h: 14, subType: 'ice_rock' },
  { x: 19620, y: 98, w: 65, h: 12, subType: 'slippery_ice' },

  // 6. Escarpada Pared de Hielo del Lhotse (Lhotse Face) - Escalones de ascenso
  { x: 19760, y: 136, w: 90, h: 18, subType: 'ice_rock' },
  { x: 19820, y: 116, w: 60, h: 12, subType: 'slippery_ice' },
  { x: 19890, y: 104, w: 90, h: 18, subType: 'ice_rock' },
  { x: 19960, y: 86, w: 65, h: 12, subType: 'slippery_ice' },
  { x: 20020, y: 74, w: 100, h: 18, subType: 'ice_rock' },

  // 7. Pinaculo Aereo sobre el Lhotse con Queso #67
  { x: 20140, y: 46, w: 50, h: 14, oneWay: true, subType: 'ice_rock' },

  // 8. Plataforma del Campamento 12 (Pared del Lhotse) con Karma y Checkpoint #35
  { x: 20220, y: 74, w: 360, h: 28, subType: 'snow_ground' },
  { x: 20340, y: 44, w: 70, h: 12, subType: 'slippery_ice' },

  // 9. Rampa de salida hacia el Collado Sur (Fase 5 Parte 2)
  { x: 20600, y: 96, w: 160, h: 28, subType: 'snow_ground' }
];
