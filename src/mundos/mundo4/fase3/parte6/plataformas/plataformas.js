// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 6: PLATAFORMAS DEL TALLER DE FORJA (CASA 6)
// ============================================================================
// Exterior: Distrito de la Forja, chimeneas de acero y tejados escalables (X: 11800 -> 12550)
// Interior: Taller de Herramientas y Forja de Hielo "La Forja del Glaciar" (X: 52000 -> 52300)

module.exports = [
  // --- SECTOR EXTERIOR: DISTRITO DE LA FORJA ---
  // 1. Calzada de entrada desde el Distrito Gastronómico (X: 11800 -> 11980)
  { x: 11800, y: 196, w: 180, h: 28, subType: 'snow_ground' },
  { x: 11880, y: 165, w: 65, h: 10, oneWay: true, subType: 'ice_rock' }, // Rampa de carga de carbón y mineral

  // 2. Gran Banco de Nieve y permafrost frente a la forja con queso enterrado #55 (X: 11980 -> 12100)
  { x: 11980, y: 196, w: 120, h: 32, subType: 'snow_bank' },
  { x: 12010, y: 154, w: 80, h: 12, oneWay: true, subType: 'ice_rock' }, // Pasarela de vigas reforzadas

  // 3. Acera empedrada frente a la Forja de Hielo (X: 12100 -> 12320)
  { x: 12100, y: 196, w: 220, h: 28, subType: 'snow_ground' },
  { x: 12115, y: 162, w: 60, h: 10, oneWay: true, subType: 'ice_rock' }, // Porche de roble y hierro de la forja

  // 4. Tejado de pizarra nevada con gran chimenea de forja para parkour (X: 12140 -> 12240)
  { x: 12140, y: 122, w: 85, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 12185, y: 76, w: 40, h: 10, oneWay: true, subType: 'ice_rock' }, // Chimenea de acero con queso #54

  // 5. Cadena de izado industrial suspendida hacia la Gran Alcaldía
  { x: 12240, y: 84, w: 80, h: 8, oneWay: true, subType: 'ice_rock' },
  { x: 12360, y: 148, w: 35, h: 10, oneWay: true, subType: 'ice_rock' }, // Farol con repisa

  // 6. Paseo hacia el Checkpoint #28 y la Alcaldía (X: 12320 -> 12550)
  { x: 12320, y: 196, w: 230, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: TALLER DE FORJA DE HIELO (X: 52000 -> 52300) ---
  // 7. Suelo de losas de piedra refractaria y virutas de metal
  { x: 52000, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 8. Muros de piedra ciclópea y techo reforzado
  { x: 51980, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 52300, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 52000, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 9. Maquinaria de forja escalable
  { x: 52080, y: 168, w: 45, h: 10, oneWay: true, subType: 'ice_rock' }, // Yunque ciclópeo
  { x: 52140, y: 150, w: 50, h: 10, oneWay: true, subType: 'ice_rock' }, // Mesa de temple de fuego azul
  { x: 52160, y: 118, w: 90, h: 12, oneWay: true, subType: 'ice_rock' }, // Estante de herramientas con queso #53
  { x: 52060, y: 84, w: 65, h: 8, oneWay: true, subType: 'ice_rock' } // Viga del polipasto de cadenas
];
