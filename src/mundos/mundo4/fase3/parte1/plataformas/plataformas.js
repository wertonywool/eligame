// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 1: PLATAFORMAS DE LA TABERNA ALPINA (CASA 1)
// ============================================================================
// Exterior: Plaza de bienvenida, terrazas y tejados para parkour (X: 8050 -> 8800)
// Interior: Salón rústico de la Taberna "El Refugio Cálido" (X: 50000 -> 50300)

module.exports = [
  // --- SECTOR EXTERIOR: PLAZA Y CALLE DEL PUEBLO NEVADO ---
  // 1. Terraza de bienvenida y arco de entrada (X: 8050 -> 8240)
  { x: 8050, y: 196, w: 190, h: 28, subType: 'snow_ground' },
  { x: 8130, y: 168, w: 60, h: 10, oneWay: true, subType: 'ice_rock' }, // Bancal de piedra floral

  // 2. Banco de Nieve excavable de la plaza con queso enterrado #40 (X: 8240 -> 8400)
  { x: 8240, y: 196, w: 160, h: 32, subType: 'snow_bank' },
  { x: 8270, y: 152, w: 80, h: 12, oneWay: true, subType: 'ice_rock' }, // Terraza de nieve elevada

  // 3. Acera empedrada frente a la Taberna Alpina (X: 8400 -> 8600)
  { x: 8400, y: 196, w: 200, h: 28, subType: 'snow_ground' },
  { x: 8415, y: 162, w: 65, h: 10, oneWay: true, subType: 'ice_rock' }, // Toldo de madera de la taberna

  // 4. Tejado nevado inferior y cumbrera de la taberna para parkour (X: 8425 -> 8540)
  { x: 8425, y: 122, w: 85, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 8440, y: 82, w: 60, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 8485, y: 62, w: 25, h: 10, oneWay: true, subType: 'ice_rock' }, // Repisa de la chimenea con queso #39

  // 5. Cuerda con banderines tibetanos / tirolina hacia la siguiente manzana
  { x: 8535, y: 84, w: 65, h: 8, oneWay: true, subType: 'ice_rock' },
  { x: 8630, y: 148, w: 35, h: 10, oneWay: true, subType: 'ice_rock' }, // Farol con repisa

  // 6. Bulevar nevado hacia el Distrito Textil (X: 8600 -> 8800)
  { x: 8600, y: 196, w: 200, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: TABERNA ALPINA "EL REFUGIO CÁLIDO" (X: 50000 -> 50300) ---
  // 7. Suelo de madera lustrosa del salón interior
  { x: 50000, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 8. Paredes sólidas y techo aislante del interior
  { x: 49980, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 50300, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 50000, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 9. Mobiliario rústico escalable en la taberna
  { x: 50080, y: 172, w: 45, h: 8, oneWay: true, subType: 'ice_rock' }, // Mesa de Lobsang
  { x: 50130, y: 148, w: 45, h: 10, oneWay: true, subType: 'ice_rock' }, // Repisa de la chimenea
  { x: 50205, y: 166, w: 55, h: 10, oneWay: true, subType: 'ice_rock' }, // Barra del tabernero Tashi
  { x: 50160, y: 118, w: 105, h: 12, oneWay: true, subType: 'ice_rock' }, // Altillo con queso #38
  { x: 50060, y: 88, w: 60, h: 8, oneWay: true, subType: 'ice_rock' } // Viga de la lámpara de araña
];
