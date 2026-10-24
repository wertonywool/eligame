// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 1: DECORACIONES DE LAS FALDAS DEL MONTE EVEREST
// ============================================================================
// Cabana del guardabosques, abetos alpinos nevados, senal y faroles de montana.

module.exports = [
  // 1. Cabana alpina de madera y piedra en el Campamento Base
  { x: 100, y: 196, subType: 'alpine_cabin' },

  // 2. Abetos y coniferas alpinas cargadas de nieve fresca
  { x: 30, y: 196, subType: 'alpine_pine', scale: 1.0 },
  { x: 310, y: 196, subType: 'alpine_pine', scale: 0.9 },
  { x: 730, y: 196, subType: 'alpine_pine', scale: 1.1 },

  // 3. Pila de lena cortada para la chimenea del refugio
  { x: 190, y: 196, subType: 'firewood_pile' },

  // 4. Senal de madera del sendero hacia la cumbre
  { x: 270, y: 196, subType: 'alpine_sign' },

  // 5. Faroles de hierro forjado con luz calida de montana
  { x: 380, y: 196, subType: 'snow_lantern' },
  { x: 1100, y: 196, subType: 'snow_lantern' },
  { x: 1475, y: 196, subType: 'snow_lantern' }
];
