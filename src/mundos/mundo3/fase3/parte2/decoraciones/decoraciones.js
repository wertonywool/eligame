// MUNDO 3 - FASE 3 - PARTE 2: Decoraciones de Tienda Kai, Stands de Tablas y Playa (X: 8100 -> 9000)
module.exports = [
  // 1. Tienda de Surf de Kai ("Kai Surf Shack")
  { type: 'surf_shop', x: 8250, y: 220 },

  // 2. Pedestales con las 3 Skins de Tablas de Surf de Kai
  { type: 'surfboard_stand', skinKey: 'classic', x: 8150, y: 220 },
  { type: 'surfboard_stand', skinKey: 'nacar', x: 8185, y: 220 },
  { type: 'surfboard_stand', skinKey: 'obsidian', x: 8220, y: 220 },

  // 3. Palmeras y ambientacion del paseo maritimo
  { type: 'coastal_palm', x: 8120, y: 220, h: 72 },
  { type: 'beach_umbrella', x: 8110, y: 220 },
  { type: 'beach_towel', x: 8105, y: 220 },

  // Boya marina flotante en la laguna de rompiente
  { type: 'buoy_marker', x: 8560, y: 220 },

  // 4. Castillos de arena elaborados en la orilla este
  { type: 'sand_castle', x: 8800, y: 220 },
  { type: 'sand_castle', x: 8930, y: 220 },

  // 5. Toallas y tumbonas en la orilla este
  { type: 'beach_towel', x: 8850, y: 220 },
  { type: 'beach_chair', x: 8880, y: 220 },
  { type: 'beach_umbrella', x: 8910, y: 220 },

  // 6. Palmeras y conchas marinas
  { type: 'coastal_palm', x: 8820, y: 220, h: 68 },
  { type: 'coastal_palm', x: 8970, y: 220, h: 74 },
  { type: 'seashells', x: 8340, y: 216 },
  { type: 'seashells', x: 8790, y: 220 }
];
