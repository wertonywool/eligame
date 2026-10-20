// MUNDO 3 - FASE 5 - PARTE 1: Plataformas del Megatsunami y Desastre Urbano
// Arquitectura de desastre: viaductos de autopista, carguero encallado,
// contenedores intermodales, azotea con helipuerto y tubo colosal de surf.
module.exports = [
  // ==========================================================================
  // SECCIÓN 1: AMERIZAJE, CORRIENTE RÁPIDA Y RAMPA DE AUTOPISTA (X: 15850 -> 16420)
  // ==========================================================================
  // Canal de amerizaje inicial con corriente de aceleración hidrodinámica
  { x: 15850, y: 196, w: 440, h: 64, subType: 'water_puddle', isWater: true, oneWay: true, boostCurrent: true },

  // Viaducto de autopista sumergido que sirve como rampa de aceleración y salto
  { x: 16160, y: 162, w: 200, h: 16, subType: 'submerged_highway', oneWay: true, launchRamp: true },

  // Sección rota de la autopista elevada sobre el torrente
  { x: 16320, y: 138, w: 110, h: 14, subType: 'submerged_highway', oneWay: true },

  // ==========================================================================
  // SECCIÓN 2: CARGUERO MERCANTE ENCALLADO Y CONTENEDORES (X: 16380 -> 17050)
  // ==========================================================================
  // Canal de agua continua de seguridad bajo las estructuras
  { x: 16260, y: 196, w: 520, h: 64, subType: 'water_puddle', isWater: true, oneWay: true },

  // Casco de carguero comercial encallado con cubierta metálica y ojos de buey
  { x: 16440, y: 164, w: 220, h: 32, subType: 'cargo_ship_hull', oneWay: true },

  // Contenedor de carga 1 (Azul marítimo)
  { x: 16640, y: 136, w: 90, h: 22, subType: 'shipping_container', containerColor: 'blue', oneWay: true },

  // Contenedor de carga 2 (Naranja de seguridad - bajo el Queso #18)
  { x: 16750, y: 106, w: 90, h: 22, subType: 'shipping_container', containerColor: 'orange', oneWay: true },

  // Contenedor de carga 3 (Rojo industrial)
  { x: 16860, y: 126, w: 90, h: 22, subType: 'shipping_container', containerColor: 'red', oneWay: true },

  // Corriente de agua rápida intermedia
  { x: 16760, y: 196, w: 420, h: 64, subType: 'water_puddle', isWater: true, oneWay: true, boostCurrent: true },

  // ==========================================================================
  // SECCIÓN 3: AZOTEA SUMERGIDA DE RASCACIELOS Y HELIPUERTO (X: 17020 -> 17560)
  // ==========================================================================
  // Azotea inundada con helipuerto H y paneles solares
  { x: 17040, y: 148, w: 240, h: 24, subType: 'submerged_skyscraper_roof', oneWay: true },

  // Viga de tendido eléctrico caída sobre el remolino
  { x: 17240, y: 114, w: 100, h: 12, subType: 'submerged_highway', oneWay: true },

  // Contenedor de carga 4 (Verde azulado portuario)
  { x: 17380, y: 134, w: 90, h: 22, subType: 'shipping_container', containerColor: 'teal', oneWay: true },

  // Canal de agua marina turbulenta
  { x: 17140, y: 196, w: 440, h: 64, subType: 'water_puddle', isWater: true, oneWay: true },

  // ==========================================================================
  // SECCIÓN 4: TUBO DE MEGATSUNAMI Y CATAPULTA HACIA EL JEFE (X: 17540 -> 18050)
  // ==========================================================================
  // Tubo colosal de surf (Tsunami Barrel Wave) con bóveda de agua y acelerador
  { x: 17540, y: 188, w: 320, h: 72, subType: 'tsunami_barrel_wave', isWater: true, oneWay: true, boostCurrent: true },

  // Rampa de autopista catapulta final hacia la antesala del Kraken
  { x: 17820, y: 154, w: 140, h: 16, subType: 'submerged_highway', oneWay: true, launchRamp: true },

  // Canal de conexión hacia la Parte 2 (X: 18000+)
  { x: 17820, y: 196, w: 240, h: 64, subType: 'water_puddle', isWater: true, oneWay: true }
];
