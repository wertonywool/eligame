// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 6: PLATAFORMAS DEL TALLER DE FORJA (CASA 6)
// ============================================================================
// Exterior: Distrito de la Forja y metalurgia alpina (X: 11800 -> 12550)
// Interior: Taller de Herramientas y Forja de Hielo "La Forja del Glaciar" (X: 52000 -> 52300)

module.exports = [
  // --- SECTOR EXTERIOR: DISTRITO DE LA FORJA ---
  // 1. Calzada de entrada desde el Distrito Gastronómico (X: 11800 -> 11980)
  { x: 11800, y: 196, w: 180, h: 28, subType: 'snow_ground' },

  // 2. Banco de hielo y permafrost frente al taller con queso enterrado (X: 11980 -> 12100)
  { x: 11980, y: 196, w: 120, h: 32, subType: 'snow_bank' },

  // 3. Acera de losas oscuras frente a la forja (X: 12100 -> 12320)
  { x: 12100, y: 196, w: 220, h: 28, subType: 'snow_ground' },

  // 4. Tejado nevado del taller de forja para parkour (X: 12160 -> 12240)
  { x: 12160, y: 108, w: 80, h: 12, oneWay: true, subType: 'ice_rock' },

  // 5. Paseo hacia el Checkpoint #28 y la Alcaldía (Casa 7) (X: 12320 -> 12550)
  { x: 12320, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: FORJA DE HIELO "LA FORJA DEL GLACIAR" (X: 52000 -> 52300) ---
  // 6. Suelo de losas pesadas de basalto gris
  { x: 52000, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 7. Muros y techo reforzado del taller
  { x: 51980, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 52300, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 52000, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 8. Altillo de acero sobre el estante de herramientas con queso secreto
  { x: 52130, y: 130, w: 100, h: 12, oneWay: true, subType: 'ice_rock' }
];
