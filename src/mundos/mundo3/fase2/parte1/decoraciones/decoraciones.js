// MUNDO 3 - FASE 2 - PARTE 1: Decoraciones de la Entrada a la Playa (X: 3600 -> 4500)
module.exports = [
  // Palmeras en el acceso costero
  { type: 'coastal_palm', x: 3660, y: 220, h: 72 },
  { type: 'coastal_palm', x: 3820, y: 220, h: 64 },

  // Torre de Salvavidas y rack de tablas
  { type: 'lifeguard_tower', x: 3740, y: 220 },
  { type: 'surf_rack', x: 3870, y: 220 },

  // Sombrillas de playa y castillo de arena
  { type: 'sandcastle', x: 3890, y: 220 },
  { type: 'beach_umbrella', x: 3915, y: 220 },
  { type: 'beach_umbrella', x: 4180, y: 220 },

  // Tronco de deriva y conchas cerca del charco
  { type: 'driftwood_log', x: 4130, y: 220 },
  { type: 'seashells', x: 3930, y: 220 },
  { type: 'seashells', x: 4230, y: 220 },
  { type: 'seashells', x: 4380, y: 220 }
];
