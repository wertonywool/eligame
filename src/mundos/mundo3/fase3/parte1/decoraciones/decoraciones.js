// MUNDO 3 - FASE 3 - PARTE 1: Decoraciones de la Heladeria y Plaza (X: 7200 -> 8100)
module.exports = [
  // 1. Exterior: Entrada a la Heladeria con palmera y pizarra de sabores
  { type: 'coastal_palm', x: 7240, y: 220, h: 72 },
  { type: 'ice_cream_menu_board', x: 7288, y: 220 },

  // 2. Interior de la Heladeria: Mostrador frigorifico de Sami
  { type: 'ice_cream_counter', x: 7360, y: 220 },

  // 3. Interior de la Heladeria: Mesas de degustacion y cabina acolchada
  { type: 'ice_cream_table', x: 7470, y: 220 },
  { type: 'ice_cream_table', x: 7580, y: 220 },
  { type: 'ice_cream_booth', x: 7675, y: 220 },

  // 4. Exterior Este: Salida hacia el paseo maritimo y duna
  { type: 'coastal_palm', x: 7780, y: 220, h: 70 },
  { type: 'beach_umbrella', x: 7850, y: 220 },
  { type: 'beach_chair', x: 7890, y: 220 },
  { type: 'beach_towel', x: 7940, y: 182 },
  { type: 'seashells', x: 7820, y: 220 },
  { type: 'driftwood_log', x: 8020, y: 220 }
];
