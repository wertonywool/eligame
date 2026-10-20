// MUNDO 3 - FASE 3 - PARTE 2: NPC Surfista Kai (Mision 2 de 4)
module.exports = [
  {
    x: 8350,
    y: 196,
    name: 'Surfista Kai',
    role: 'Pro Surfista & Shaper',
    questNpc: 'kai',
    getLines: function() {
      const q = typeof getKaiQuest === 'function' ? getKaiQuest() : { state: 'NOT_STARTED', wavesCrossed: 0 };
      if (q.state === 'NOT_STARTED') {
        return [
          '¡Aloha Elizabeth! ¿Tú eres la intrépida mamá ratoncita de la que todos hablan?',
          'Dicen que tienes una tabla legendaria... ¡pero en esta costa hay que demostrarlo!',
          'Toda la playa necesita un show épico para motivarse. ¡Te reto a las 67 OLAS de la rompiente!',
          'Métete al agua y usa tu WATER DASH (botón de dash) para cortar las crestas de ola.',
          'Si logras impresionar a la multitud, te daré la segunda Llave Maestra del Rascacielos.',
          '¡Y además dejaré mi tienda de surf abierta para ti! ¿Lista para lanzarte al agua?'
        ];
      }
      if (q.state === 'ACTIVE') {
        return [
          `Llevas ${q.wavesCrossed} de las 67 olas atravesadas.`,
          '¡Entra a la laguna y pulsa el botón de WATER DASH justo al toparte con cada ola!',
          '¡Vamos, demuéstrale a toda la playa tu poder sobre las aguas!'
        ];
      }
      if (q.state === 'READY_TO_TURN_IN') {
        return [
          '¡WOOOOW! ¡BASTA, BASTA! ¡Por todos los mares!',
          'Iba a hacerte pasar las 67 olas enteras... ¡pero ya me queda claro que llegas a las 67 de sobra!',
          '¡Vaya reflejos y qué potencia de Water Dash! Toda la playa ha quedado boquiabierta.',
          'Cumplo mi palabra: aquí tienes la segunda parte de la llave [LLAVE DE BRONCE #2].',
          '¡Y desde hoy las puertas de mi tienda de surf quedan abiertas para ti de por vida!'
        ];
      }
      return [
        '¡La auténtica leyenda del surf! Mi tienda de tablas está siempre abierta para ti.',
        'Ya tienes 2 de las 4 llaves. Aún hay otros en la playa que necesitan tu ayuda para abrir las oficinas.'
      ];
    },
    onDialogueEnd: function() {
      const q = typeof getKaiQuest === 'function' ? getKaiQuest() : null;
      if (!q) return;
      if (q.state === 'NOT_STARTED') {
        startKaiQuest();
      } else if (q.state === 'READY_TO_TURN_IN') {
        completeKaiQuest(this);
      }
    }
  }
];
