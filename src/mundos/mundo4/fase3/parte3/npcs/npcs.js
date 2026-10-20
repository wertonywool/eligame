// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 3: NPCS DE LA CABAÑA DE GASTON (CASA 3)
// ============================================================================

module.exports = [
  // 1. Exterior: Pema la Curiosa en el paseo melancólico
  {
    x: 9680,
    y: 178,
    name: 'Pema la Curiosa',
    role: 'Vecina Preocupada',
    color: '#e2e8f0',
    hatColor: '#64748b',
    lines: [
      '¡Psst, ratoncita! Ten cuidado si te acercas a la Cabaña 3...',
      'Allí vive Gaston. Lleva semanas encerrado suspirando tan fuerte que hace temblar los carámbanos del tejado.',
      'Dicen que cayó en una depresión absurda por algo de un volcán y una cuchara... y que tiene un pico de hielo profesional que no quiere ni tocar.',
      '¡Si entras por su puerta, háblale con cuidado! Quizás tú puedas levantarle el ánimo.'
    ],
    dialogue: [
      '¡Psst, ratoncita! Ten cuidado si te acercas a la Cabaña 3...',
      'Allí vive Gaston. Lleva semanas encerrado suspirando tan fuerte que hace temblar los carámbanos del tejado.',
      'Dicen que cayó en una depresión absurda por algo de un volcán y una cuchara... y que tiene un pico de hielo profesional que no quiere ni tocar.',
      '¡Si entras por su puerta, háblale con cuidado! Quizás tú puedas levantarle el ánimo.'
    ]
  },

  // 2. Interior: Gaston el Melancólico (El Tipo Súper Depre)
  {
    x: 50980,
    y: 178,
    name: 'Gaston el Melancolico',
    role: 'Montanero en Crisis',
    color: '#cbd5e1',
    hatColor: '#475569',
    getLines: function() {
      if (typeof player !== 'undefined' && player && player.hasIcePick) {
        return [
          '¡Gracias infinitas por la pala, Elizabeth! Ahora puedo laburar feliz en el jardín de nieve.',
          'Usa el Pico de Hielo con el botón de Acción / Dash para destrozar los muros de hielo del lago en la Fase 4.',
          '¡Sube a la cima del Everest y rescata a tu hijo!'
        ];
      }
      return [
        'Ahhh... suspira con pesadumbre... ¿Me preguntas por qué estoy tan depre, pequeña ratoncita?',
        'Verás... Yo soñaba con abrir la primera heladería artesanal en el cráter de un volcán nevado.',
        'Pero al batir la crema, se me cayó mi cuchara favorita en una grieta sin fondo, y el eco me gritó: ¡NO HAY FLAN PARA TI!',
        'Desde entonces todo me sabe a sopa fría... Y para colmo me obligaron a comprar este Pico de Hielo Profesional.',
        '¿Para qué quiero un pico de hielo si odio el ruido metálico? ¡CLANC, CLANC! ¡Me parte la cabeza de dolor!',
        '¡Espera un segundo!... ¿Eso en tu espalda es... UNA PALA DE LABURAR?',
        '¡Por la nieve virgen! ¡Una pala silenciosa para ponerme a laburar la huerta sin ruidos molestos!',
        '¡Te lo suplico, Elizabeth! Llévate mi Pico de Hielo Profesional del pedestal y dame esa pala.',
        'Con el pico podrás romper los gruesos muros de hielo que bloquean el camino hacia la Fase 4. ¡Acepta este intercambio!'
      ];
    },
    onDialogueEnd: function() {
      if (typeof player !== 'undefined' && player && !player.hasIcePick) {
        player.hasIcePick = true;
        player.ability = 'ice_pick';
        const dashBtn = document.getElementById('btn-dash');
        if (dashBtn) dashBtn.classList.add('visible');

        if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
        else if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();

        if (typeof spawnStarSparkles === 'function') {
          spawnStarSparkles(player.x + 11, player.y + 12, 24, '#38bdf8');
        }
        if (typeof triggerShake === 'function') {
          triggerShake(0.12, 1.8);
        }
        if (typeof spawnFloatingText === 'function') {
          spawnFloatingText(player.x - 24, player.y - 20, '¡PICO DE HIELO OBTENIDO!', '#38bdf8');
        }
      }
    },
    lines: [
      'Ahhh... suspira con pesadumbre... ¿Me preguntas por qué estoy tan depre, pequeña ratoncita?',
      'Verás... Yo soñaba con abrir la primera heladería artesanal en el cráter de un volcán nevado.',
      'Pero al batir la crema, se me cayó mi cuchara favorita en una grieta sin fondo, y el eco me gritó: ¡NO HAY FLAN PARA TI!',
      'Desde entonces todo me sabe a sopa fría... Y para colmo me obligaron a comprar este Pico de Hielo Profesional.',
      '¿Para qué quiero un pico de hielo si odio el ruido metálico? ¡CLANC, CLANC! ¡Me parte la cabeza de dolor!',
      '¡Espera un segundo!... ¿Eso en tu espalda es... UNA PALA DE LABURAR?',
      '¡Por la nieve virgen! ¡Una pala silenciosa para ponerme a laburar la huerta sin ruidos molestos!',
      '¡Te lo suplico, Elizabeth! Llévate mi Pico de Hielo Profesional del pedestal y dame esa pala.',
      'Con el pico podrás romper los gruesos muros de hielo que bloquean el camino hacia la Fase 4. ¡Acepta este intercambio!'
    ]
  }
];
