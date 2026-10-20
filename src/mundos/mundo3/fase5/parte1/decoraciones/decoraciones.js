// MUNDO 3 - FASE 5 - PARTE 1: Decoraciones Ambientales del Megatsunami y Escombros
module.exports = [
  // 1. Olas gigantes y rompientes en las zonas de agua
  { x: 16020, y: 196, subType: 'tsunami_wave', w: 110, h: 28 },
  { x: 16420, y: 196, subType: 'tsunami_wave', w: 130, h: 28 },
  { x: 16880, y: 196, subType: 'tsunami_wave', w: 120, h: 28 },
  { x: 17340, y: 196, subType: 'tsunami_wave', w: 140, h: 28 },
  { x: 17740, y: 196, subType: 'tsunami_wave', w: 150, h: 28 },

  // 2. Escombros urbanos: Taxis amarillos sumergidos y a la deriva
  { x: 16240, y: 192, subType: 'floating_debris', debrisType: 'taxi' },
  { x: 16720, y: 192, subType: 'floating_debris', debrisType: 'taxi' },
  { x: 17480, y: 192, subType: 'floating_debris', debrisType: 'taxi' },

  // 3. Contenedores de carga flotantes a media inmersión
  { x: 16360, y: 190, subType: 'floating_debris', debrisType: 'container' },
  { x: 17160, y: 190, subType: 'floating_debris', debrisType: 'container' },

  // 4. Vigas estructurales de acero con franjas amarillas de peligro
  { x: 16120, y: 188, subType: 'floating_debris', debrisType: 'girder' },
  { x: 16960, y: 188, subType: 'floating_debris', debrisType: 'girder' },
  { x: 17620, y: 188, subType: 'floating_debris', debrisType: 'girder' },

  // 5. Losas fracturadas de autopista con ferralla oxidada expuesta
  { x: 16480, y: 188, subType: 'floating_debris', debrisType: 'slab' },
  { x: 17280, y: 188, subType: 'floating_debris', debrisType: 'slab' },

  // 6. Montones de desastre y boyas de advertencia marítima
  { x: 16620, y: 194, subType: 'debris_pile' },
  { x: 17800, y: 194, subType: 'debris_pile' },

  // 7. Tentáculos abisales gigantes del Kraken acechando en las aguas
  { x: 16560, y: 192, subType: 'kraken_tentacle', scale: 0.85 },
  { x: 17220, y: 192, subType: 'kraken_tentacle', scale: 1.0 },
  { x: 17940, y: 192, subType: 'kraken_tentacle', scale: 1.15 }
];
