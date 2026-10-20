// 🌹 FASE 3 • PARTE 2: La Gran Plaza Imperial y 3 Glorietas — Plataformas (X: 3880 -> 5380)
module.exports = [
  // Suelo Imperial Sólido y Continuo en toda la Corte (sin huecos ni fosas en el piso)
  { x: 3880, y: 220, w: 520, h: 65, type: 'grass', subType: 'royal_marble', zone: 3 }, // Sector Oeste y Glorieta 1 (3880 -> 4400)
  { x: 4400, y: 220, w: 550, h: 65, type: 'grass', subType: 'royal_marble', zone: 3 }, // Terraza Central y Glorieta 2 (4400 -> 4950)
  { x: 4950, y: 220, w: 480, h: 65, type: 'grass', subType: 'royal_marble', zone: 3 }, // Sector Este y Glorieta 3 (4950 -> 5430)

  // GLORIETA REAL 1 (Techo de mármol que bloquea el láser de Homelander - Botón 1 Azul)
  { x: 4170, y: 156, w: 140, h: 14, type: 'floating', subType: 'royal_gazebo', zone: 3, oneWay: true },
  { x: 4345, y: 180, w: 50, h: 14, type: 'floating', subType: 'royal_marble', zone: 3, oneWay: true }, // Balcón aéreo 1

  // GLORIETA REAL 2 (Cúpula Central de Mármol y Oro - Botón 3 Amarillo)
  { x: 4710, y: 148, w: 150, h: 14, type: 'floating', subType: 'royal_gazebo', zone: 3, oneWay: true },
  { x: 4625, y: 178, w: 50, h: 14, type: 'floating', subType: 'royal_marble', zone: 3, oneWay: true }, // Balcón aéreo 2

  // GLORIETA REAL 3 (Techo este de mármol - Botón 4 Púrpura)
  { x: 5215, y: 156, w: 140, h: 14, type: 'floating', subType: 'royal_gazebo', zone: 3, oneWay: true },
  { x: 5135, y: 180, w: 50, h: 14, type: 'floating', subType: 'royal_marble', zone: 3, oneWay: true }  // Balcón aéreo 3
];
