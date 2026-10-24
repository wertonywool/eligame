// ============================================================================
// MUNDO 4 - FASE 5 - PARTE 1: PLATAFORMAS DEL KHUMBU Y LHOTSE (X: 18000 -> 20750)
// ============================================================================
// Morrena glacial, seracs del Khumbu, pasarela de escaleras, Cwm Occidental y Pared del Lhotse.

module.exports = [
  // 1. Morrena Glacial de Entrada desde la Fase 4 (X: 18000 -> 18300)
  { x: 18000, y: 196, w: 300, h: 28, subType: 'snow_ground' },
  { x: 18200, y: 160, w: 90, h: 14, subType: 'ice_rock' },

  // 2. Laberinto de Seracs de la Cascada del Khumbu y Sima Glacial
  { x: 18320, y: 154, w: 75, h: 16, subType: 'ice_rock' },
  // Saliente secreto detrás de Serac quebrable
  { x: 18320, y: 94, w: 50, h: 14, subType: 'ice_rock' },
  // Serac Milenario Quebrable con el Pico de Hielo (¡Despeja el saliente secreto!)
  { x: 18370, y: 90, w: 30, h: 56, subType: 'ice_pillar', breakable: true },
  // Peldaño quebradizo sobre la grieta del Khumbu
  { x: 18420, y: 130, w: 70, h: 14, subType: 'cracking_ice' },
  { x: 18510, y: 112, w: 80, h: 16, subType: 'ice_rock' },
  { x: 18610, y: 136, w: 80, h: 16, subType: 'slippery_ice' },
  { x: 18680, y: 108, w: 60, h: 16, subType: 'ice_rock' },

  // 3. Puente de Escaleras de Aluminio sobre la Gran Grieta del Khumbu con Queso #65
  { x: 18740, y: 108, w: 180, h: 10, oneWay: true, subType: 'aluminum_bridge' },
  // Cristal de impulso celestial debajo del puente para salvar caídas heroicas
  { x: 18815, y: 160, w: 26, h: 22, subType: 'bounce_crystal' },

  // 4. Plataforma de Aclimatación del Campamento 11 y Pemba (X: 18920 -> 19320)
  { x: 18920, y: 136, w: 400, h: 28, subType: 'snow_ground' },

  // 5. El Valle del Silencio (Western Cwm) - Glaciar con formaciones de roca y pilar secreto
  { x: 19340, y: 156, w: 160, h: 24, subType: 'snow_ground' },
  // Saliente superior con pilar quebrable que protege el Queso #66
  { x: 19420, y: 96, w: 120, h: 16, subType: 'ice_rock' },
  { x: 19480, y: 64, w: 28, h: 32, subType: 'ice_pillar', breakable: true },
  // Paso quebradizo sobre la sima intermedia
  { x: 19505, y: 136, w: 65, h: 14, subType: 'cracking_ice' },
  { x: 19580, y: 120, w: 80, h: 16, subType: 'slippery_ice' },
  { x: 19670, y: 140, w: 80, h: 20, subType: 'snow_ground' },

  // 6. Escarpada Pared de Hielo del Lhotse (Lhotse Face Climb) - Ascenso vertical técnico
  { x: 19760, y: 144, w: 75, h: 18, subType: 'ice_rock' },
  { x: 19840, y: 120, w: 60, h: 14, subType: 'slippery_ice' },
  // Cristal de impulso celestial del Lhotse (¡catapulta vertical por la pared!)
  { x: 19910, y: 130, w: 26, h: 22, subType: 'bounce_crystal' },
  { x: 19930, y: 88, w: 85, h: 16, subType: 'ice_rock' },
  { x: 20030, y: 72, w: 60, h: 14, subType: 'cracking_ice' },
  { x: 20100, y: 58, w: 85, h: 16, subType: 'ice_rock' },

  // 7. Pináculo Aéreo sobre el Lhotse con Queso #67
  { x: 20170, y: 32, w: 55, h: 12, oneWay: true, subType: 'ice_rock' },

  // 8. Plataforma del Campamento 12 (Pared del Lhotse) con Karma y Checkpoint #35
  { x: 20240, y: 74, w: 340, h: 28, subType: 'snow_ground' },

  // 9. Arista de transición hacia el Collado Sur (Fase 5 Parte 2)
  { x: 20600, y: 96, w: 80, h: 24, subType: 'snow_ground' },
  { x: 20680, y: 116, w: 80, h: 22, subType: 'slippery_ice' }
];
