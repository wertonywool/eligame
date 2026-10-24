// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 6: NPCS DEL TALLER DE FORJA (CASA 6)
// ============================================================================

module.exports = [
  // 1. Exterior: Jampa el Minero del Glaciar en el bulevar metalúrgico
  {
    x: 11920,
    y: 178,
    name: 'Jampa el Minero del Glaciar',
    role: 'Veterano de las Minas de Hielo',
    color: '#94a3b8',
    hatColor: '#334155',
    lines: [
      '¡Saludos, Elizabeth! El permafrost de esta cordillera es tan duro como el diamante.',
      'Solo las herramientas forjadas por el Maestro Kazi pueden horadar el hielo milenario sin quebrarse.',
      'Kazi utiliza un horno de fuego azul y templa las hojas de los picos en agua del lago gélido.',
      '¡Entra al taller pulsando Arriba frente a la puerta reforzada de roble y hierro!'
    ],
    dialogue: [
      '¡Saludos, Elizabeth! El permafrost de esta cordillera es tan duro como el diamante.',
      'Solo las herramientas forjadas por el Maestro Kazi pueden horadar el hielo milenario sin quebrarse.',
      'Kazi utiliza un horno de fuego azul y templa las hojas de los picos en agua del lago gélido.',
      '¡Entra al taller pulsando Arriba frente a la puerta reforzada de roble y hierro!'
    ]
  },

  // 2. Interior: Maestro Kazi el Herrero de Hielo junto al gran yunque
  {
    x: 52230,
    y: 178,
    name: 'Maestro Kazi el Herrero de Hielo',
    role: 'Maestro Forjador de Escarcha',
    color: '#cbd5e1',
    hatColor: '#0f172a',
    lines: [
      '¡Por las barbas del Yeti! ¡Ese Pico de Hielo que portas tiene un temple legendario!',
      'Veo que Gastón te confió su reliquia más preciada... ¡Acércate a mi yunque!',
      'Voy a templar la hoja con acero de meteorito y fuego azul... ¡CLANC! ¡Listo!',
      '¡Tu Pico de Hielo ha sido mejorado con mayor alcance, filo de diamante y cortes más rápidos!',
      'La última casa del pueblo, la gran Casa 7 (La Alcaldía), custodia el portón de salida hacia la cumbre.',
      '¡Afina tus reflejos sobre el hielo y que el viento glacial guíe tus saltos!'
    ],
    dialogue: [
      '¡Por las barbas del Yeti! ¡Ese Pico de Hielo que portas tiene un temple legendario!',
      'Veo que Gastón te confió su reliquia más preciada... ¡Acércate a mi yunque!',
      'Voy a templar la hoja con acero de meteorito y fuego azul... ¡CLANC! ¡Listo!',
      '¡Tu Pico de Hielo ha sido mejorado con mayor alcance, filo de diamante y cortes más rápidos!',
      'La última casa del pueblo, la gran Casa 7 (La Alcaldía), custodia el portón de salida hacia la cumbre.',
      '¡Afina tus reflejos sobre el hielo y que el viento glacial guíe tus saltos!'
    ],
    onDialogueEnd: function() {
      if (typeof player !== 'undefined' && player) {
        player.hasForgedPick = true;
        if (window.sfx && window.sfx.playHit) window.sfx.playHit();
        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(player.x + 11, player.y + 12, 24, '#facc15');
          spawnStarSparkles(player.x + 11, player.y + 12, 18, '#38bdf8');
        }
        if (typeof triggerShake === 'function') triggerShake(0.14, 2.0);
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(player.x - 20, player.y - 20, '¡PICO FORJADO MEJORADO!', '#facc15');
        }
      }
    }
  }
];
