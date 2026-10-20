// 🌿 FASE 1 • PARTE 4: Ribera Sagrada y Travesía del Río — Plataformas (X: 1400 -> 1800)
// Plataformeo escénico y orgánico sobre el canal de agua entre el Bosque de Cerezos y el Estanque de Loto
module.exports = [
  // 1. Lecho y canal de agua mansa del río (Suelo acuático inferior seguro)
  { x: 1490, y: 255, w: 310, h: 30, type: 'grass', subType: 'lotus_pond', zone: 1 },

  // 3. Puente Arqueado Tradicional Zen de Madera Lacada (Rampa y Pico del arco)
  { x: 1515, y: 195, w: 70, h: 14, type: 'floating', subType: 'wood_pergola', zone: 1, oneWay: true },
  { x: 1580, y: 168, w: 80, h: 14, type: 'floating', subType: 'wood_pergola', zone: 1, oneWay: true },

  // 4. Pilar de Piedra del Santuario en el Río (Stepping Stone firme con farol de piedra)
  { x: 1675, y: 200, w: 50, h: 65, type: 'grass', zone: 1 },

  // 5. Hoja de Nenúfar Gigante de Loto (Plataforma flotante y elástica hacia el Muelle de Fase 2)
  { x: 1735, y: 185, w: 60, h: 16, type: 'floating', subType: 'lotus_pad', zone: 2, oneWay: true }
];
