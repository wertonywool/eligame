// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 7: NPCS DE LA ALCALDÍA (CASA 7)
// ============================================================================

module.exports = [
  // 1. Exterior: Tsering el Alguacil en la plaza cívica
  {
    x: 12680,
    y: 178,
    name: 'Tsering el Alguacil',
    role: 'Guardia Mayor de la Villa',
    color: '#fed7aa',
    hatColor: '#991b1b',
    lines: [
      '¡Atención, noble viajera! Estás ante la Gran Alcaldía de nuestro Pueblo Nevado.',
      'El Gran Alcalde Dorje te espera en el salón de audiencias.',
      'Solo él posee el cetro que activa el Arco Glacial que da paso al Lago Congelado.',
      '¡Pulsa Arriba frente a la puerta doble para solicitar audiencia!'
    ],
    dialogue: [
      '¡Atención, noble viajera! Estás ante la Gran Alcaldía de nuestro Pueblo Nevado.',
      'El Gran Alcalde Dorje te espera en el salón de audiencias.',
      'Solo él posee el cetro que activa el Arco Glacial que da paso al Lago Congelado.',
      '¡Pulsa Arriba frente a la puerta doble para solicitar audiencia!'
    ]
  },

  // 2. Interior: Alcalde Dorje el Sabio tras su escritorio señorial
  {
    x: 52630,
    y: 178,
    name: 'Alcalde Dorje el Sabio',
    role: 'Gran Alcalde del Pueblo Nevado',
    color: '#fef08a',
    hatColor: '#b45309',
    lines: [
      '¡Bienvenida seas, intrépida Elizabeth! Las noticias de tu valentía han recorrido cada rincón del pueblo.',
      'Has visitado la Taberna, la Tienda de Gorros, la Cabaña de Gastón, el Arcade, la Panadería y la Forja.',
      'Ese Pico de Hielo te permitirá abrirte paso entre los enormes témpanos del Lago Congelado.',
      '¡Por el poder que me confiere el Pueblo Nevado, declaro abierto el Gran Arco Glacial!',
      '¡Avanza con cautela a través del portal hacia la Fase 4: El Lago Congelado de la Gran Cumbre!'
    ],
    dialogue: [
      '¡Bienvenida seas, intrépida Elizabeth! Las noticias de tu valentía han recorrido cada rincón del pueblo.',
      'Has visitado la Taberna, la Tienda de Gorros, la Cabaña de Gastón, el Arcade, la Panadería y la Forja.',
      'Ese Pico de Hielo te permitirá abrirte paso entre los enormes témpanos del Lago Congelado.',
      '¡Por el poder que me confiere el Pueblo Nevado, declaro abierto el Gran Arco Glacial!',
      '¡Avanza con cautela a través del portal hacia la Fase 4: El Lago Congelado de la Gran Cumbre!'
    ],
    onDialogueEnd: function() {
      if (typeof player !== 'undefined' && player) {
        if (!this.decreeGranted) {
          this.decreeGranted = true;
          saveState.dexterLilies = (saveState.dexterLilies || 0) + 20;
          if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
          if (typeof spawnStarSparkles === 'function') {
            spawnStarSparkles(player.x + 11, player.y + 12, 28, '#ffd166');
            spawnStarSparkles(player.x + 11, player.y + 12, 20, '#38bdf8');
          }
          if (typeof triggerShake === 'function') triggerShake(0.16, 2.2);
          if (typeof spawnFloatingText === 'function') {
            spawnFloatingText(player.x - 30, player.y - 20, '¡SELLO OFICIAL DEL PUEBLO! +20 LIRIOS', '#ffd166');
          }
        }
      }
    }
  }
];
