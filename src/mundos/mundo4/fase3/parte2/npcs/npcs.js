// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 2: NPCS DE LA TIENDA DE ROPA (CASA 2)
// ============================================================================

module.exports = [
  // 1. Exterior: Dawa el Tejedor en la calle del Distrito Textil
  {
    x: 8950,
    y: 178,
    name: 'Dawa el Tejedor',
    role: 'Artesano de Lana Alpina',
    color: '#e2e8f0',
    hatColor: '#10b981',
    lines: [
      '¡Hola, pequeña viajera! Bienvenida al Distrito Textil del pueblo.',
      'Aquí procesamos la lana más suave y abrigada de alpacas y yaks de la alta montaña.',
      'Si vas a subir a la cima del Everest, necesitas protección contra las ventiscas. Madame Dolma tiene los mejores gorros en El Gorro Nevado.',
      '¡Entra por la puerta verde usando Arriba! No te olvides de saludar a la modista.'
    ],
    dialogue: [
      '¡Hola, pequeña viajera! Bienvenida al Distrito Textil del pueblo.',
      'Aquí procesamos la lana más suave y abrigada de alpacas y yaks de la alta montaña.',
      'Si vas a subir a la cima del Everest, necesitas protección contra las ventiscas. Madame Dolma tiene los mejores gorros en El Gorro Nevado.',
      '¡Entra por la puerta verde usando Arriba! No te olvides de saludar a la modista.'
    ]
  },

  // 2. Interior: Madame Dolma la Modista tras el mostrador
  {
    x: 50630,
    y: 178,
    name: 'Madame Dolma la Modista',
    role: 'Maestra Sastra Polar',
    color: '#fbcfe8',
    hatColor: '#ec4899',
    lines: [
      '¡Oh, que encanto de ratoncita! ¡Bienvenida a El Gorro Nevado, tesoro!',
      'Mirate, esa pala que llevas es muy util para excavar en los bancos de nieve fresca y encontrar tesoros enterrados.',
      'Pero cuidado mas adelante... en la Casa 3 vive un escalador que cayo en una profunda depresion. Se la pasa mirando la pared y suspirando por una pala como la tuya.',
      'Dicen que tiene un pico de hielo profesional que no quiere usar... ¡tal vez si hablas con el puedas hacer un buen intercambio!',
      '¡Toma esta bendicion de lana calientita para protegerte del frio glacial y moverte con agilidad!'
    ],
    dialogue: [
      '¡Oh, que encanto de ratoncita! ¡Bienvenida a El Gorro Nevado, tesoro!',
      'Mirate, esa pala que llevas es muy util para excavar en los bancos de nieve fresca y encontrar tesoros enterrados.',
      'Pero cuidado mas adelante... en la Casa 3 vive un escalador que cayo en una profunda depresion. Se la pasa mirando la pared y suspirando por una pala como la tuya.',
      'Dicen que tiene un pico de hielo profesional que no quiere usar... ¡tal vez si hablas con el puedas hacer un buen intercambio!',
      '¡Toma esta bendicion de lana calientita para protegerte del frio glacial y moverte con agilidad!'
    ],
    onDialogueEnd: function() {
      if (typeof player !== 'undefined' && player) {
        player.speed = 168;
        if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(player.x + 11, player.y + 12, 20, '#ec4899');
          spawnStarSparkles(player.x + 11, player.y + 12, 16, '#f472b6');
        }
        if (typeof triggerShake === 'function') triggerShake(0.08, 1.2);
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(player.x, player.y - 20, '¡BUFANDA Y BOTAS DE LANA EQUIPADAS!', '#f472b6');
        }
      }
    }
  }
];
