// MUNDO 3 - FASE 3 - PARTE 4: Plataformas del Ascenso al Rascacielos y Azotea (X: 9900 -> 12000)
module.exports = [
  // 1. Transición de la orilla arenosa al asfalto metropolitano
  { x: 9900, y: 220, w: 200, h: 50, subType: 'coastal_shore_sand' },
  { x: 10100, y: 220, w: 280, h: 50, subType: 'city_asphalt' },
  { x: 10220, y: 172, w: 80, h: 8, oneWay: true, subType: 'city_awning' },

  // 2. Explanada y escalinatas de la Torre Corporativa
  { x: 10380, y: 220, w: 260, h: 50, subType: 'city_asphalt' },
  { x: 10580, y: 198, w: 80, h: 72, subType: 'city_building' },
  { x: 10520, y: 154, w: 100, h: 8, oneWay: true, subType: 'city_awning' },

  // 3. Piso 1: Lobby y Recepción de Oficinas
  { x: 10640, y: 176, w: 220, h: 94, subType: 'city_building' },

  // 4. Piso 2: Planta de Oficinas y Servidores
  { x: 10740, y: 132, w: 180, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 5. Piso 3: Terraza Ejecutiva y Balcón Panorámico
  { x: 10880, y: 92, w: 160, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 6. Andamio de acceso a la azotea
  { x: 10980, y: 64, w: 90, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 7. Gran Azotea del Rascacielos Principal (Helipuerto y Antenas)
  { x: 11040, y: 56, w: 420, h: 224, subType: 'city_building' },
  { x: 11380, y: 44, w: 80, h: 8, oneWay: true, subType: 'driftwood_plank' },

  // 8. Azotea del Edificio del Frente (Donde está nuestro Hijo Ratón pidiendo auxilio)
  { x: 11560, y: 56, w: 400, h: 224, subType: 'city_building' }
];
