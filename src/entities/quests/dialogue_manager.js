// ============================================================================
// GESTOR DE DIÁLOGOS DINÁMICOS Y MISIONES DE NPCS (MUNDO 3 • FASE 3)
// ============================================================================

function getNpcDynamicLines(npc) {
  if (!npc) return [];

  // 1. Surfista Kai (Misión 2)
  if (npc.name === 'Surfista Kai' || npc.questNpc === 'kai') {
    const q = getKaiQuest();
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
      'He expuesto 3 skins personalizadas en los pedestales: Rosa Neón, Nácar Marina y Obsidiana Magma.',
      '¡Acércate a cualquier pedestal y salta para equiparte la que más te guste!'
    ];
  }

  // 2. Sami el Heladero (Misión 1)
  if (npc.name === 'Sami el Heladero' || npc.questNpc === 'sami') {
    const q = getSamiQuest();
    if (q.state === 'NOT_STARTED') {
      return [
        '¡Hola Elizabeth! ¡Qué calor tan intenso hace esta tarde en la costa!',
        'Tengo este carrito repleto de deliciosos helados de fresa y vainilla...',
        'Pero con este dolor de espalda no puedo recorrer la playa entera.',
        '¿Me ayudarías a ofrecer 10 helados a los turistas que están vacacionando?',
        '¡Entrégaselos a 10 bañistas, tráeme el pago de $100 y te daré una Llave de la Ciudadela!'
      ];
    }
    if (q.state === 'ACTIVE') {
      return [
        `Llevas vendidos ${q.sold} de 10 helados.`,
        'Busca a los turistas que toman el sol o descansan en la arena y ofréceles uno.',
        '¡Vuelve cuando hayas vendido los 10 con todo el dinero!'
      ];
    }
    if (q.state === 'READY_TO_TURN_IN') {
      return [
        '¡Extraordinario Elizabeth! ¡Vendiste los 10 helados y me trajiste los $100 completos!',
        'Toma esta Llave de Bronce de la Ciudadela como recompensa prometida.',
        '¡Es la primera de las 4 llaves necesarias para entrar a las oficinas del frente!'
      ];
    }
    return [
      '¡Gracias a ti todos los turistas del resort están disfrutando de sus helados!',
      'Avanza por la playa, todavía hay otras personas que necesitan tu ayuda para las otras llaves.'
    ];
  }

  // 3. Turistas del Resort (Clientes de Sami)
  if (npc.isTourist || npc.role === 'Turista' || npc.questNpc === 'tourist' || (npc.name && (npc.name.includes('Turista') || npc.name.includes('Bañista') || npc.name.includes('Veraneante') || npc.name.includes('Mateo') || npc.name.includes('Clara') || npc.name.includes('Lucas') || npc.name.includes('Voley') || npc.name.includes('Román') || npc.name.includes('Alan')))) {
    const q = typeof getSamiQuest === 'function' ? getSamiQuest() : null;
    if (q && q.state === 'ACTIVE' && !npc.boughtIceCream) {
      return deliverIceCreamToTourist(npc);
    }
    if (npc.boughtIceCream) {
      return ['¡Qué delicia de helado de fresa y vainilla! ¡Muchas gracias Elizabeth!'];
    }
    return npc.dialogue || [
      '¡Qué lindo día en el resort costero!',
      'Un delicioso helado de Sami vendría genial con este calor.'
    ];
  }

  // 4. Conserje Bruno (Acceso al Rascacielos)
  if (npc.name === 'Conserje Bruno') {
    const keys = saveState.keysPhase3 || 0;
    if (keys === 0) {
      return [
        '¡Alto ahí, ratoncita! Este es el edificio corporativo principal.',
        'Para activar el ascensor hacia la azotea se requieren 4 Llaves Maestras.',
        'Los comerciantes y deportistas de la playa custodian cada una de las 4 llaves.',
        'Ve a la playa y ayúdales con sus misiones para conseguirlas.'
      ];
    }
    if (keys < 4) {
      return [
        `Llevas ${keys} de las 4 Llaves Maestras de la Ciudadela.`,
        keys === 1 ? 'Tienes la Llave #1 de Sami. ¡Buen inicio!' : 'Tienes las Llaves #1 de Sami y #2 de Kai. ¡Gran progreso!',
        'Aún te faltan llaves de las otras misiones para desbloquear el ascensor.'
      ];
    }
    return [
      '¡Increíble! ¡Tienes las 4 Llaves Maestras completas!',
      'Las puertas del ascensor están desbloqueadas. ¡Sube a la azotea y salva a tu hijo!'
    ];
  }

  // 5. Raul y su ranita (Fase 4: Edificio Objetivo)
  if (npc.name === 'Raúl' || npc.questNpc === 'raul') {
    const q = typeof getRaulQuest === 'function' ? getRaulQuest() : null;
    if (!q || !q.keyGiven) {
      return [
        'Hola Elizabeth! Me llamo Raul y esta es mi querida ranita de la bahia.',
        'Nos enteramos de que buscas subir a la cima del rascacielos para salvar a tu hijo.',
        'Mi ranita encontro este fragmento brillante junto al estanque... toma la [LLAVE DE BRONCE #3]!',
        'Mucho exito enfrentando la gran ola marina que se aproxima!'
      ];
    }
    return [
      'Mucho exito en la cima del rascacielos, Elizabeth!',
      'Usa las llaves maestras en el gran portal para tomar el ascensor de alta velocidad.'
    ];
  }

  // 6. Ingeniero Daniel (Fase 4: Edificio Objetivo)
  if (npc.name === 'Ingeniero Daniel' || npc.questNpc === 'daniel') {
    return [
      '¡Cuidado, señora ratoncita! ¡Este edificio corporativo está en máxima alerta!',
      '¿Buscas a tu hijo? ¡Vimos a unos sujetos subirlo a toda prisa hacia las cornisas superiores!',
      'El lobby interior está sellado por el sismo, pero puedes trepar por las pasarelas exteriores.',
      '¡Sube por las marquesinas laterales si quieres alcanzar la cima y encontrar a tu pequeño!'
    ];
  }

  // 7. Guardia Miranda (Fase 4: Edificio Objetivo)
  if (npc.name === 'Guardia Miranda' || npc.questNpc === 'miranda') {
    return [
      '¡El agua de la bahía entera se ha retirado hacia el horizonte! ¡Es la calma antes de la catástrofe!',
      'Un megatsunami gigantesco viene en camino y arrasará todas las avenidas de la costa.',
      'Tu hijo está arriba en el edificio. ¡Escala por las terrazas exteriores antes del impacto!',
      '¡Mantén tu tabla de surf bien sujeta, la vas a necesitar para sobrevivir a la ola gigante!'
    ];
  }

  // 8. Don Pancho y sus Hot Dogs (Mundo 3 • Fase 4 • Parte 2)
  if (npc.name === 'Don Pancho' || npc.questNpc === 'hotdogs') {
    const q = typeof getHotdogQuest === 'function' ? getHotdogQuest() : null;
    if (q && q.state !== 'NOT_STARTED') {
      if (q.fate === 'EXPLODE') {
        return ['* Solo quedan cenizas de Don Pancho y migajas de pan tostado. *'];
      }
      if (q.fate === 'FREEZE') {
        return ['* Don Pancho sigue congelado dentro de un sólido bloque de hielo. *'];
      }
      return ['* La silueta chamuscada de Don Pancho aún emite diminutas chispas. *'];
    }

    return [
      '¡Hola Elizabeth! ¡Acabo de inventar una nueva receta secreta de hot dogs costeros!',
      {
        speaker: 'Don Pancho',
        text: '¡Toma, prueba uno recién salido de la parrilla! ¿Qué te parece el sabor?',
        choices: [
          { text: 'Saben asqueroso', value: 'asqueroso' },
          { text: 'Saben muy bien', value: 'bien' },
          { text: 'No sé...', value: 'nose' }
        ],
        onChoice: function(idx, choice) {
          let responseText = '';
          if (choice.value === 'asqueroso') {
            responseText = 'A';
          } else if (choice.value === 'bien') {
            responseText = 'muchas gracias por la respuesta generica donde esta el originilismo';
          } else {
            responseText = 'si tiene sentido solo soy un npc no tiene sentido nada';
          }

          if (typeof triggerDonPanchoFate === 'function') {
            triggerDonPanchoFate(choice.value);
          }

          activeDialogueList = [
            { speaker: 'Don Pancho', text: responseText }
          ];
          dialogueIndex = 0;
          dialogueCharIndex = 0;
        }
      }
    ];
  }

  // Gaston el Melancólico (Casa 3)
  if (npc.name && npc.name.includes('Gaston')) {
    if (typeof player !== 'undefined' && player && player.hasIcePick) {
      return [
        '¡Gracias infinitas por la pala, Elizabeth! Ahora puedo laburar feliz en el jardín de nieve.',
        'Usa el Pico de Hielo con el botón de Acción / Dash para destrozar los muros de hielo del lago en la Fase 4.',
        '¡Sube a la cima del Everest y rescata a tu hijo!'
      ];
    }
  }

  return null;
}

function handleNpcQuestDialogueEnd(npc) {
  if (!npc) return;
  if (npc.name === 'Surfista Kai' || npc.questNpc === 'kai') {
    const q = getKaiQuest();
    if (q.state === 'NOT_STARTED') {
      startKaiQuest();
    } else if (q.state === 'READY_TO_TURN_IN') {
      completeKaiQuest(npc);
    }
  } else if (npc.name === 'Sami el Heladero' || npc.questNpc === 'sami') {
    const q = getSamiQuest();
    if (q.state === 'NOT_STARTED') {
      startSamiQuest();
    } else if (q.state === 'READY_TO_TURN_IN') {
      completeSamiQuest(npc);
    }
  } else if (npc.name === 'Raúl' || npc.questNpc === 'raul') {
    if (typeof completeRaulDialogue === 'function') {
      completeRaulDialogue(npc);
    }
  } else if (npc.name === 'Hijo Ratoncito' && npc.x >= 18000) {
    if (typeof startKrakenIntroAnimation === 'function') {
      startKrakenIntroAnimation();
    }
  } else if (npc.name && npc.name.includes('Tashi')) {
    // Tabernero Tashi: Sopa del Himalaya (Restaura corazones)
    if (typeof player !== 'undefined' && player) {
      player.lives = player.maxLives;
      if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 18, '#ff75a0');
        spawnStarSparkles(player.x + 11, player.y + 12, 12, '#ffd166');
      }
      if (typeof triggerShake === 'function') triggerShake(0.08, 1.2);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x, player.y - 20, '¡CORAZONES RESTAURADOS!', '#ff75a0');
      }
    }
  } else if (npc.name && npc.name.includes('Lobsang')) {
    // Lobsang el Jugador: Dados de la suerte (+10 lirios)
    if (!npc.rewardGiven) {
      npc.rewardGiven = true;
      saveState.dexterLilies = (saveState.dexterLilies || 0) + 10;
      if (window.sfx && window.sfx.playCheese) window.sfx.playCheese();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 14, '#fde047');
      }
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x, player.y - 20, '¡+10 LIRIOS DE LA SUERTE!', '#fde047');
      }
    }
  } else if (npc.name && npc.name.includes('Dolma')) {
    // Madame Dolma: Bendición de lana alpina (Botas y bufanda calientita, velocidad 168)
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
  } else if (npc.name && npc.name.includes('Gaston')) {
    // Gaston el Melancólico: Intercambio de Pala por Pico de Hielo Profesional
    if (typeof player !== 'undefined' && player && !player.hasIcePick) {
      player.hasIcePick = true;
      player.ability = 'ice_pick';
      const dashBtn = document.getElementById('btn-dash');
      if (dashBtn) {
        dashBtn.classList.add('visible');
        const tag = dashBtn.querySelector('.btn-tag');
        if (tag) tag.textContent = 'PICO';
      }
      if (window.sfx && window.sfx.playPowerup) window.sfx.playPowerup();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(player.x + 11, player.y + 12, 24, '#38bdf8');
      }
      if (typeof triggerShake === 'function') triggerShake(0.12, 1.8);
      if (typeof spawnFloatingText === 'function') {
        spawnFloatingText(player.x - 20, player.y - 20, '¡PICO DE HIELO OBTENIDO!', '#38bdf8');
      }
    }
  } else if (npc.name && npc.name.includes('Mimi')) {
    // Mimi la Repostera: Bollo de Canela del Horno (Restaura corazones + velocidad 175)
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
  } else if (npc.name && npc.name.includes('Kazi')) {
    // Maestro Kazi el Herrero: Templado de Pico en Acero Glacial
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
  } else if (npc.name && npc.name.includes('Dorje')) {
    // Alcalde Dorje: Sello Oficial del Pueblo (+20 lirios)
    if (!npc.decreeGranted) {
      npc.decreeGranted = true;
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
