// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 2: PLATAFORMAS DE LA TIENDA DE ROPA (CASA 2)
// ============================================================================
// Exterior: Distrito Textil, tendederos de lana y tejados escalables (X: 8800 -> 9550)
// Interior: Tienda de Ropa y Gorros "El Gorro Nevado" (X: 50400 -> 50700)

module.exports = [
  // --- SECTOR EXTERIOR: DISTRITO TEXTIL Y CALLE COMERCIAL ---
  // 1. Calzada de entrada desde la plaza de la taberna (X: 8800 -> 8980)
  { x: 8800, y: 196, w: 180, h: 28, subType: 'snow_ground' },
  { x: 8880, y: 165, w: 65, h: 10, oneWay: true, subType: 'ice_rock' }, // Terraza de secado de lana

  // 2. Gran Banco de Nieve frente al taller textil con queso enterrado #43 (X: 8980 -> 9140)
  { x: 8980, y: 196, w: 160, h: 32, subType: 'snow_bank' },
  { x: 9015, y: 154, w: 85, h: 12, oneWay: true, subType: 'ice_rock' }, // Pasarela elevada de madera sobre la nieve

  // 3. Acera comercial frente a la tienda "El Gorro Nevado" (X: 9140 -> 9340)
  { x: 9140, y: 196, w: 200, h: 28, subType: 'snow_ground' },
  { x: 9150, y: 162, w: 60, h: 10, oneWay: true, subType: 'ice_rock' }, // Toldo de la sastrería

  // 4. Tejado nevado de la tienda con veleta y mástil para parkour (X: 9160 -> 9240)
  { x: 9160, y: 122, w: 80, h: 12, oneWay: true, subType: 'ice_rock' },
  { x: 9185, y: 80, w: 45, h: 10, oneWay: true, subType: 'ice_rock' }, // Mástil con queso #42

  // 5. Tendedero de bufandas tibetanas cruzando hacia la siguiente casa
  { x: 9240, y: 84, w: 75, h: 8, oneWay: true, subType: 'ice_rock' },
  { x: 9370, y: 148, w: 35, h: 10, oneWay: true, subType: 'ice_rock' }, // Repisa del farol

  // 6. Paseo nevado hacia el Checkpoint #24 y Casa 3 (X: 9340 -> 9550)
  { x: 9340, y: 196, w: 210, h: 28, subType: 'snow_ground' },

  // --- SECTOR INTERIOR: TIENDA "EL GORRO NEVADO" (X: 50400 -> 50700) ---
  // 7. Suelo de madera lustrosa de la boutique
  { x: 50400, y: 196, w: 300, h: 28, subType: 'snow_ground' },

  // 8. Muros aislantes y techo de la sastrería
  { x: 50380, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 50700, y: 50, w: 20, h: 150, subType: 'snow_ground' },
  { x: 50400, y: 50, w: 300, h: 20, subType: 'snow_ground' },

  // 9. Mobiliario escalable en la sastrería
  { x: 50475, y: 166, w: 50, h: 10, oneWay: true, subType: 'ice_rock' }, // Mostrador de corte
  { x: 50535, y: 148, w: 45, h: 10, oneWay: true, subType: 'ice_rock' }, // Pedestal de maniquíes
  { x: 50570, y: 116, w: 90, h: 12, oneWay: true, subType: 'ice_rock' }, // Estantería alta con queso #41
  { x: 50460, y: 84, w: 65, h: 8, oneWay: true, subType: 'ice_rock' } // Vigas superiores de tapicería
];
