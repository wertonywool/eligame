// MUNDO 3 - FASE 5 - PARTE 2: Plataformas de la Antesala y Arena de Combate del Kraken
module.exports = [
  // 1. Canal de entrada a la zona de calma del ojo del tsunami
  { x: 18000, y: 196, w: 220, h: 64, subType: 'water_puddle', isWater: true, oneWay: true },

  // 2. Gran Plataforma de Hormigón y Arena de Combate Central (X: 18220 -> 18980)
  { x: 18220, y: 196, w: 760, h: 28, subType: 'city_sidewalk' },

  // 3. Estructuras elevadas para maniobras acrobáticas con la tabla de surf
  // Contenedor de carga azul elevado
  { x: 18340, y: 140, w: 90, h: 22, oneWay: true, subType: 'shipping_container', containerColor: 'blue' },
  // Losa de autopista central elevada
  { x: 18540, y: 108, w: 110, h: 14, oneWay: true, subType: 'submerged_highway' },
  // Contenedor de carga rojo elevado
  { x: 18760, y: 140, w: 90, h: 22, oneWay: true, subType: 'shipping_container', containerColor: 'red' },

  // 4. Foso de remolino acuático frente a la torre del hijo
  { x: 18980, y: 196, w: 180, h: 64, subType: 'water_puddle', isWater: true, oneWay: true },

  // 5. Estructura de la torre semisumergida donde está retenido el hijo
  { x: 19160, y: 140, w: 180, h: 84, subType: 'city_building' },
  { x: 19180, y: 100, w: 80, h: 14, oneWay: true, subType: 'submerged_highway' }
];
