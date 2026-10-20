// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 1: PLATAFORMAS DE LA TABERNA ALPINA (CASA 1)
// ============================================================================
// Exterior: Plaza del pueblo y fachada (X: 8050 -> 8800)
// Interior: Salón cálido de la Taberna "El Refugio Cálido" (X: 50000 -> 50300)

module.exports = [
  // --- SECTOR EXTERIOR: PLAZA Y CALLE DEL PUEBLO NEVADO ---
  // 1. Terraza de bienvenida tras el gran arco glacial (X: 8050 -> 8240)
  { x: 8050, y: 196, w: 190, h: 28, subType: 'snow_ground' },

  // 2. Banco de Nieve de la Plaza con queso enterrado (X: 8240 -> 8400)
  { x: 8240, y: 196, w: 160, h: 32, subType: 'snow_bank' },

  // 3. Acera adoquinada frente a la Taberna Alpina (X: 8400 -> 8600)
  { x: 8400, y: 196, w: 200, h: 28, subType: 'snow_ground' },

  // 4. Tejado nevado de la Taberna accesible para parkour (X: 8430 -> 8510)
  { x: 8430, y: 108, w: 80, h: 12, oneWay: true, subType: 'ice_rock' },

  // 5. Bulevar nevado hacia el siguiente distrito y Checkpoint #23 (X: 8600 -> 8800)
  { x: 8600, y: 196, w: 200, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: TABERNA ALPINA "EL REFUGIO CÁLIDO" (X: 50000 -> 50300) ---
  // 6. Suelo de madera lustrosa del salón interior
  { x: 50000, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 7. Paredes sólidas y techo aislante del interior
  { x: 49980, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 50300, y: 60, w: 20, h: 140, subType: 'snow_ground' },
  { x: 50000, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 8. Altillo rústico de vigas de madera con queso secreto
  { x: 50150, y: 130, w: 100, h: 12, oneWay: true, subType: 'ice_rock' }
];
