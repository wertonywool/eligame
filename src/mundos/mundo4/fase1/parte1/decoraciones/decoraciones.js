// ============================================================================
// MUNDO 4 - FASE 1 - PARTE 1: DECORACIONES DE LAS FALDAS DEL MONTE EVEREST
// ============================================================================
// Cabaña del guardabosques, abetos alpinos nevados, señales y faroles de montaña.

module.exports = [
  // 1. Cabaña alpina de madera y piedra en el Campamento Base
  { x: 110, y: 196, subType: 'alpine_cabin' },

  // 2. Abetos y coníferas alpinas cargadas de nieve fresca
  { x: 40, y: 196, subType: 'alpine_pine', scale: 1.0 },
  { x: 290, y: 196, subType: 'alpine_pine', scale: 0.9 },
  { x: 690, y: 196, subType: 'alpine_pine', scale: 1.15 },
  { x: 1010, y: 162, subType: 'alpine_pine', scale: 0.85 },

  // 3. Señalética de madera del sendero del Everest
  { x: 260, y: 196, subType: 'alpine_sign' },

  // 4. Pila de leña cortada para la chimenea del refugio
  { x: 200, y: 196, subType: 'firewood_pile' },

  // 5. Faroles de hierro forjado con luz cálida de montaña
  { x: 370, y: 196, subType: 'snow_lantern' },
  { x: 830, y: 196, subType: 'snow_lantern' },
  { x: 1330, y: 196, subType: 'snow_lantern' }
];
