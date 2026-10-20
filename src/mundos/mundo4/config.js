// ============================================================================
// MUNDO 4: "EL MONTE EVEREST Y LA GRAN CUMBRE" — CONFIGURACIÓN Y METADATOS
// ============================================================================
module.exports = {
  id: 4,
  name: "Mundo 4: El Monte Everest y la Gran Cumbre",
  subtitle: "Fase 9: El Firmamento Cósmico • El Sanctum Sanctorum y la Gran Reunión Familiar",
  theme: "snow",
  ability: "shovel",
  worldWidth: 56000,
  worldHeight: 280,
  playerSpawn: { x: 80, y: 196 },
  babyMouse: {
    id: 4,
    x: 41440,
    y: 110,
    name: 'Hijo del Santuario',
    nextAbilityName: 'EL PICO DE ALTA MONTAÑA',
    dialogues: [
      {
        speaker: 'Hijo del Santuario',
        text: '¡MAMÁ! ¡Derrotaste al Dragón Astral de Polaris y cruzaste todo el cosmos solo para salvarme!'
      },
      {
        speaker: 'Mamá Eli',
        text: '¡Mi pequeño tesoro! Crucé glaciares, la gran cima del Everest, el Yeti y las estrellas para tenerte en mis brazos.'
      },
      {
        speaker: 'Hijo del Santuario',
        text: '¡La constelación de nuestra familia está completa y el Gran Portal a la Madriguera está abierto! ¡Volvamos a casa!'
      },
      {
        speaker: 'Mamá Eli',
        text: '¡Crucemos el portal juntos hacia el hogar! ¡Nuestra familia vuelve a estar unida para siempre!'
      }
    ]
  }
};
