// ============================================================================
// MUNDO 4 - FASE 3 - PARTE 1: NPCS DE LA TABERNA ALPINA (CASA 1)
// ============================================================================

module.exports = [
  // 1. Exterior: Norbu el Aldeano paseando por la plaza
  {
    x: 8180,
    y: 178,
    name: 'Norbu el Aldeano',
    role: 'Habitante del Pueblo Nevado',
    color: '#e2e8f0',
    hatColor: '#3b82f6',
    lines: [
      '¡Bienvenida al Pueblo Nevado, Elizabeth! Es el asentamiento habitado más alto de todo el monte.',
      'En este pueblo tenemos 7 casas únicas donde puedes entrar a refugiarte, jugar y comerciar.',
      'La primera es la Taberna "El Refugio Cálido". Entra pulsando Arriba en la puerta, el tabernero Tashi sirve una sopa que devuelve las fuerzas.',
      '¡Más adelante hay tiendas, una sala de juegos retro, y la cabaña de un tipo súper depre que no para de quejarse!'
    ],
    dialogue: [
      '¡Bienvenida al Pueblo Nevado, Elizabeth! Es el asentamiento habitado más alto de todo el monte.',
      'En este pueblo tenemos 7 casas únicas donde puedes entrar a refugiarte, jugar y comerciar.',
      'La primera es la Taberna "El Refugio Cálido". Entra pulsando Arriba en la puerta, el tabernero Tashi sirve una sopa que devuelve las fuerzas.',
      '¡Más adelante hay tiendas, una sala de juegos retro, y la cabaña de un tipo súper depre que no para de quejarse!'
    ]
  },

  // 2. Interior: Tabernero Tashi tras la barra
  {
    x: 50220,
    y: 178,
    name: 'Tabernero Tashi',
    role: 'Posadero del Refugio Cálido',
    color: '#fed7aa',
    hatColor: '#ea580c',
    lines: [
      '¡Pasa, pasa, Elizabeth! ¡Cierra esa puerta que entra un frío polar!',
      'Toma un tazón de nuestra famosa Sopa Caliente del Himalaya... ¡Listo, todos tus corazones restaurados!',
      'Si buscas aventuras, en las casas del pueblo encontrarás de todo: una sastrería polar, una sala arcade...',
      '...¡y en la Casa 3 vive un tipo súper depre que no para de suspirar porque extraña su pala favorita y solo tiene un pico de hielo!',
      '¡Tómate tu tiempo y descansa junto a la chimenea!'
    ],
    dialogue: [
      '¡Pasa, pasa, Elizabeth! ¡Cierra esa puerta que entra un frío polar!',
      'Toma un tazón de nuestra famosa Sopa Caliente del Himalaya... ¡Listo, todos tus corazones restaurados!',
      'Si buscas aventuras, en las casas del pueblo encontrarás de todo: una sastrería polar, una sala arcade...',
      '...¡y en la Casa 3 vive un tipo súper depre que no para de suspirar porque extraña su pala favorita y solo tiene un pico de hielo!',
      '¡Tómate tu tiempo y descansa junto a la chimenea!'
    ]
  },

  // 3. Interior: Lobsang el Jugador en la mesa de dados
  {
    x: 50100,
    y: 178,
    name: 'Lobsang el Jugador',
    role: 'Aficionado a los Dados',
    color: '#fef08a',
    hatColor: '#6366f1',
    lines: [
      '¡He sacado un doble seis en los Dados de la Suerte del Yeti! ¡Hoy es mi día de gloria!',
      'Toma 10 flores alpinas de mi botín para festejar la buena suerte. ¡Disfruta la taberna!'
    ],
    dialogue: [
      '¡He sacado un doble seis en los Dados de la Suerte del Yeti! ¡Hoy es mi día de gloria!',
      'Toma 10 flores alpinas de mi botín para festejar la buena suerte. ¡Disfruta la taberna!'
    ]
  }
];
