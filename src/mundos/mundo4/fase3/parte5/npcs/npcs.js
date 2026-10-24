// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 5: NPCS DE LA PANADERÍA (CASA 5)
// ============================================================================

module.exports = [
  // 1. Exterior: Sonam el Catador de Té en el bulevar gastronómico
  {
    x: 11170,
    y: 178,
    name: 'Sonam el Catador de Te',
    role: 'Sibarita de Infusiones Alpinas',
    color: '#fed7aa',
    hatColor: '#b45309',
    lines: [
      '¡Ah, nada como un buen tazón de té de mantequilla de yak en medio de la nieve!',
      'El dulce aroma a canela y pan tostado que sale de El Horno del Yeti abre el apetito a cualquiera.',
      'Mimi hornea unos bollos de jengibre que reconfortan el alma y te devuelven toda la vitalidad.',
      '¡Entra por la puerta de roble usando Arriba! No te vayas sin probar un bocado.'
    ],
    dialogue: [
      '¡Ah, nada como un buen tazón de té de mantequilla de yak en medio de la nieve!',
      'El dulce aroma a canela y pan tostado que sale de El Horno del Yeti abre el apetito a cualquiera.',
      'Mimi hornea unos bollos de jengibre que reconfortan el alma y te devuelven toda la vitalidad.',
      '¡Entra por la puerta de roble usando Arriba! No te vayas sin probar un bocado.'
    ]
  },

  // 2. Interior: Mimi la Maestra Panadera tras el mostrador
  {
    x: 51830,
    y: 178,
    name: 'Mimi la Maestra Panadera',
    role: 'Chef Repostera del Himalaya',
    color: '#fef08a',
    hatColor: '#ffffff',
    lines: [
      '¡Bienvenida, Elizabeth! ¡Pasa y caliéntate junto a la gran bóveda del horno!',
      'Aquí preparamos pan de centeno de montaña y bollos de canela recién salidos de la leña.',
      'Toma un bollo caliente... ¡Mmm, todos tus corazones restaurados al máximo!',
      'Más adelante en el pueblo está el Taller de Forja y la gran Alcaldía que da paso al Lago de Hielo de la Fase 4.',
      '¡Ese Pico de Hielo que llevas te será imprescindible para abrirte camino entre los témpanos!'
    ],
    dialogue: [
      '¡Bienvenida, Elizabeth! ¡Pasa y caliéntate junto a la gran bóveda del horno!',
      'Aquí preparamos pan de centeno de montaña y bollos de canela recién salidos de la leña.',
      'Toma un bollo caliente... ¡Mmm, todos tus corazones restaurados al máximo!',
      'Más adelante en el pueblo está el Taller de Forja y la gran Alcaldía que da paso al Lago de Hielo de la Fase 4.',
      '¡Ese Pico de Hielo que llevas te será imprescindible para abrirte camino entre los témpanos!'
    ],
    onDialogueEnd: function() {
      if (typeof player !== 'undefined' && player) {
        player.lives = player.maxLives;
        player.speed = 175;
        if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(player.x + 11, player.y + 12, 22, '#f59e0b');
          spawnStarSparkles(player.x + 11, player.y + 12, 16, '#ffd166');
        }
        if (typeof triggerShake === 'function') triggerShake(0.08, 1.2);
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(player.x, player.y - 20, '¡BOLLO DE CANELA! ¡CORAZONES Y VELOCIDAD AL MÁXIMO!', '#f59e0b');
        }
      }
    }
  }
];
