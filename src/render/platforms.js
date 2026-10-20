function drawPlatform(p) {
  // Frustum Culling ultrarrápido: descartar plataformas fuera de la pantalla
  if (p.x + p.w < cameraX - 60 || p.x > cameraX + W + 60 || p.y + p.h < cameraY - 60 || p.y > cameraY + H + 60) {
    return;
  }

  // Plataformas especializadas del megatsunami y desastre urbano
  if (typeof drawDisasterPlatform === 'function' && drawDisasterPlatform(ctx, p, globalFrame)) {
    return;
  }

  // Plataformas especializadas de nieve y alta montaña (Everest)
  if (typeof drawSnowPlatform === 'function' && drawSnowPlatform(ctx, p, globalFrame)) {
    return;
  }

  const isVolcano = level.theme === 'volcano' || p.type === 'volcano';

  if (isVolcano && p.oneWay) {
    if (p.w >= 180) {
      ctx.fillStyle = 'rgba(22, 11, 20, 0.72)';
      ctx.fillRect(p.x + 14, p.y + p.h, 14, 72);
      ctx.fillRect(p.x + p.w - 28, p.y + p.h, 14, 72);
    }

    ctx.fillStyle = '#14101c';
    ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);

    ctx.fillStyle = '#2d1e3e';
    ctx.fillRect(p.x, p.y, p.w, p.h);

    ctx.fillStyle = '#8f143c';
    ctx.fillRect(p.x, p.y, p.w, 5);
    ctx.fillStyle = '#b31b52';
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(p.x + 2, p.y, p.w - 4, 1);

    for (let rx = p.x + 10; rx < p.x + p.w - 14; rx += 28) {
      ctx.fillStyle = '#191024';
      ctx.fillRect(rx, p.y + 5, 12, p.h - 5);
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(rx + 5, p.y + 7, 2, 2);

      const vineH = 5 + ((rx * 13) % 9);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(rx + 4, p.y + p.h, 3, vineH);
      if (rx % 56 === 10) {
        ctx.fillStyle = p.y > 900 && p.y < 1200 ? '#00f5d4' : '#ff5400';
        ctx.fillRect(rx + 5, p.y + p.h + vineH - 2, 2, 2);
      }
    }

    for (let gx = p.x + 12; gx < p.x + p.w - 12; gx += 26) {
      const isCrystalZone = p.y > 900 && p.y < 1200;
      ctx.fillStyle = isCrystalZone ? '#00b4d8' : '#9d0208';
      ctx.fillRect(gx, p.y - 2, 3, 2);
      if (gx % 52 < 26) {
        ctx.fillStyle = isCrystalZone ? '#90e0ef' : '#ffd166';
        ctx.fillRect(gx + 1, p.y - 3, 1, 2);
      }
    }
    return;
  }

  // ==========================================================================
  // 🌸 PLATAFORMAS AÉREAS ÚNICAS POR FASE EN EL MUNDO 1 (JARDÍN DE LOS LIRIOS)
  if (!isVolcano && p.oneWay) {
    if (p.subType === 'wood_pergola') {
      const reach = 95;
      if (p._groundLeft === undefined) {
        p._groundLeft = getGroundYUnder(p.x + 11, p.y + p.h, reach);
        p._groundRight = getGroundYUnder(p.x + p.w - 11, p.y + p.h, reach);
      }
      const groundLeft = p._groundLeft;
      const groundRight = p._groundRight;

      if (groundLeft !== null && groundRight !== null) {
        const postHLeft = groundLeft - (p.y + p.h);
        const postHRight = groundRight - (p.y + p.h);

        // Postes de madera lacada oscura
        ctx.fillStyle = 'rgba(38, 20, 16, 0.85)';
        ctx.fillRect(p.x + 8, p.y + p.h, 6, postHLeft);
        ctx.fillRect(p.x + p.w - 14, p.y + p.h, 6, postHRight);

        // Vetas y relieve de los postes
        ctx.fillStyle = '#583101';
        ctx.fillRect(p.x + 9, p.y + p.h, 2, postHLeft);
        ctx.fillRect(p.x + p.w - 13, p.y + p.h, 2, postHRight);

        // Base izquierda: si cae en agua (y >= 250) dibuja ondas acuáticas; si cae en tierra, base de piedra tallada
        if (groundLeft >= 250) {
          ctx.fillStyle = '#2d6a4f';
          ctx.fillRect(p.x + 6, groundLeft - 2, 10, 2);
          ctx.fillStyle = '#90e0ef';
          ctx.fillRect(p.x + 5, groundLeft, 12, 1);
        } else {
          ctx.fillStyle = '#14101c';
          ctx.fillRect(p.x + 5, groundLeft - 5, 12, 5);
          ctx.fillStyle = '#6c757d';
          ctx.fillRect(p.x + 6, groundLeft - 4, 10, 4);
          ctx.fillStyle = '#adb5bd';
          ctx.fillRect(p.x + 7, groundLeft - 4, 8, 1);
        }

        // Base derecha
        if (groundRight >= 250) {
          ctx.fillStyle = '#2d6a4f';
          ctx.fillRect(p.x + p.w - 16, groundRight - 2, 10, 2);
          ctx.fillStyle = '#90e0ef';
          ctx.fillRect(p.x + p.w - 17, groundRight, 12, 1);
        } else {
          ctx.fillStyle = '#14101c';
          ctx.fillRect(p.x + p.w - 17, groundRight - 5, 12, 5);
          ctx.fillStyle = '#6c757d';
          ctx.fillRect(p.x + p.w - 16, groundRight - 4, 10, 4);
          ctx.fillStyle = '#adb5bd';
          ctx.fillRect(p.x + p.w - 15, groundRight - 4, 8, 1);
        }
      } else {
        // Mirador en las copas de los árboles: ménsulas ornamentales cantilever japonesas (Kigumi)
        ctx.fillStyle = '#14101c';
        ctx.fillRect(p.x + 6, p.y + p.h, 10, 9);
        ctx.fillRect(p.x + p.w - 16, p.y + p.h, 10, 9);
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(p.x + 7, p.y + p.h, 8, 8);
        ctx.fillRect(p.x + p.w - 15, p.y + p.h, 8, 8);
        ctx.fillStyle = '#ba181b';
        ctx.fillRect(p.x + 8, p.y + p.h + 1, 6, 6);
        ctx.fillRect(p.x + p.w - 14, p.y + p.h + 1, 6, 6);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(p.x + 9, p.y + p.h + 5, 4, 2);
        ctx.fillRect(p.x + p.w - 13, p.y + p.h + 5, 4, 2);
      }

      // Silueta exterior de la plataforma con aleros alados hacia arriba estilo pagoda
      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 4, p.y - 1, p.w + 8, p.h + 2);
      ctx.fillRect(p.x - 7, p.y - 3, 5, 4);
      ctx.fillRect(p.x + p.w + 2, p.y - 3, 5, 4);

      // Viga principal de cedro rojo lacado con remates dorados
      ctx.fillStyle = '#ba181b';
      ctx.fillRect(p.x - 2, p.y + 1, p.w + 4, p.h - 2);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x - 6, p.y - 2, 4, 3);
      ctx.fillRect(p.x + p.w + 2, p.y - 2, 4, 3);

      // Tablones de madera pulida con uniones
      ctx.fillStyle = '#583101';
      ctx.fillRect(p.x, p.y + 3, p.w, p.h - 5);
      for (let bx = p.x + 12; bx < p.x + p.w - 8; bx += 14) {
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(bx, p.y + 3, 1, p.h - 5);
      }

      // Cubierta superior tradicional de cedro lacado rojo y alfombra de pétalos de sakura (100% SAKURA)
      ctx.fillStyle = '#9d0208';
      ctx.fillRect(p.x, p.y, p.w, 3);
      ctx.fillStyle = '#ff758f';
      ctx.fillRect(p.x + 1, p.y, p.w - 2, 2);
      ctx.fillStyle = '#ffccd5';
      ctx.fillRect(p.x + 2, p.y, p.w - 4, 1);

      // Pétalos de flor de cerezo dispersos sobre la pasarela
      for (let px = p.x + 6; px < p.x + p.w - 6; px += 10) {
        ctx.fillStyle = (px % 20 === 6) ? '#ffffff' : '#ff8fab';
        ctx.fillRect(px, p.y - 1, 3, 2);
        if (px % 30 === 6) {
          ctx.fillStyle = '#ff758f';
          ctx.fillRect(px + 1, p.y - 2, 2, 1);
        }
      }

      // Faroles de papel rojos (Chōchin) elegantes y compactos bajo la pérgola (sin amontonar)
      if (p.w >= 60) {
        const lanternXs = p.w >= 100 ? [p.x + 18, p.x + p.w - 24] : [p.x + Math.floor(p.w / 2) - 4];
        for (const lx of lanternXs) {
          const swayL = Math.sin(globalFrame * 0.08 + lx) * 1;
          ctx.fillStyle = '#14101c';
          ctx.fillRect(lx + 2, p.y + p.h, 2, 3);
          ctx.fillStyle = '#e63946';
          ctx.fillRect(lx + swayL, p.y + p.h + 3, 6, 7);
          ctx.fillStyle = '#ffd166';
          ctx.fillRect(lx + 1 + swayL, p.y + p.h + 5, 4, 3);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(lx + 2 + swayL, p.y + p.h + 6, 2, 1);
        }
      }
      return;
    }

    if (p.subType === 'lotus_pad') {
      // 🦋 FASE 2: Hoja de Loto Gigante Flotante con Flor de Loto en el Borde
      // Tallo acuático subacuático bajo la gran hoja de loto
      ctx.fillStyle = 'rgba(27, 67, 50, 0.75)';
      ctx.fillRect(p.x + Math.floor(p.w / 2) - 4, p.y + p.h, 8, 56);

      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 2, p.y, p.w + 4, p.h);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(p.x, p.y + 1, p.w, p.h - 2);
      ctx.fillStyle = '#40916c';
      ctx.fillRect(p.x + 3, p.y, p.w - 6, 7);
      ctx.fillStyle = '#74c69d';
      ctx.fillRect(p.x + 6, p.y, p.w - 12, 3);
      // Nervaduras de la hoja de nenúfar y gotas de rocío cian
      for (let lx = p.x + 16; lx < p.x + p.w - 16; lx += 24) {
        ctx.fillStyle = '#95d5b2';
        ctx.fillRect(lx, p.y + 4, 10, 2);
        ctx.fillStyle = '#00f5d4';
        ctx.fillRect(lx + 4, p.y - 2, 3, 2);
      }
      // Capullo de loto rosado en el extremo de la hoja
      ctx.fillStyle = '#ff4d6d';
      ctx.fillRect(p.x + 8, p.y - 6, 10, 6);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(p.x + 10, p.y - 8, 6, 5);
      return;
    }

    if (p.subType === 'greenhouse') {
      // 🦋 FASE 2: Pasarela Victoriana de Hierro Forjado Verde y Cristal Luminoso
      const groundDist = Math.max(36, 235 - (p.y + p.h));
      ctx.fillStyle = 'rgba(27, 67, 50, 0.72)';
      ctx.fillRect(p.x + 10, p.y + p.h, 6, groundDist);
      ctx.fillRect(p.x + p.w - 16, p.y + p.h, 6, groundDist);

      // Ménsulas y anclajes ornamentales de hierro forjado
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(p.x + 6, p.y + p.h, 14, 4);
      ctx.fillRect(p.x + p.w - 20, p.y + p.h, 14, 4);

      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(p.x, p.y, p.w, p.h);

      // Paneles de cristal celeste iluminado con marco de celosía
      for (let gx = p.x + 6; gx < p.x + p.w - 14; gx += 18) {
        ctx.fillStyle = '#48cae4';
        ctx.fillRect(gx, p.y + 4, 12, p.h - 7);
        ctx.fillStyle = '#caf0f8';
        ctx.fillRect(gx + 2, p.y + 5, 4, 3);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(gx + 3, p.y + 5, 1, 1);
      }
      ctx.fillStyle = '#52b788';
      ctx.fillRect(p.x, p.y, p.w, 3);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(p.x, p.y, p.w, 1);
      return;
    }

    if (p.subType === 'royal_gazebo') {
      // 🌹 FASE 3: Glorieta Real de Mármol Blanco, Columnas Corintias y Rosas Reales
      // (SU TECHO BLOQUEA EL LÁSER DE HOMELANDER Y CREA UN CAMPO DE FUERZA DEFENSIVO)
      const groundDist = Math.max(24, 220 - (p.y + p.h));

      // Columnas traseras de mármol
      ctx.fillStyle = 'rgba(180, 195, 190, 0.72)';
      ctx.fillRect(p.x + 12, p.y + p.h, 6, groundDist);
      ctx.fillRect(p.x + p.w - 18, p.y + p.h, 6, groundDist);

      // Columnas frontales acanaladas
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + 4, p.y + p.h, 8, groundDist);
      ctx.fillRect(p.x + p.w - 12, p.y + p.h, 8, groundDist);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(p.x + 6, p.y + p.h, 2, groundDist);
      ctx.fillRect(p.x + p.w - 10, p.y + p.h, 2, groundDist);
      // Capiteles y basas doradas
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x + 2, p.y + p.h, 12, 3);
      ctx.fillRect(p.x + p.w - 14, p.y + p.h, 12, 3);
      ctx.fillRect(p.x + 2, p.y + p.h + groundDist - 3, 12, 3);
      ctx.fillRect(p.x + p.w - 14, p.y + p.h + groundDist - 3, 12, 3);

      // Enredaderas de rosas carmesí trepando por las columnas
      for (let ry = p.y + p.h + 8; ry < p.y + p.h + groundDist - 6; ry += 12) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(p.x + 3, ry, 10, 3);
        ctx.fillRect(p.x + p.w - 13, ry, 10, 3);
        ctx.fillStyle = ry % 24 === 8 ? '#e63946' : '#ff758f';
        ctx.fillRect(p.x + 6, ry - 1, 4, 3);
        ctx.fillRect(p.x + p.w - 10, ry - 1, 4, 3);
      }

      // 🕯️ Lámpara / Candelabro Imperial colgante en el centro con luz cálida
      const centerX = p.x + Math.floor(p.w / 2);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(centerX - 1, p.y + p.h, 2, 9);
      ctx.fillStyle = '#e5b80b';
      ctx.fillRect(centerX - 4, p.y + p.h + 9, 8, 3);
      // Cristales colgantes
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(centerX - 3, p.y + p.h + 12, 2, 4);
      ctx.fillRect(centerX + 1, p.y + p.h + 12, 2, 4);
      // Núcleo de luz cálida
      const lightPulse = Math.sin(globalFrame * 0.08) * 0.15;
      const radGrad = ctx.createRadialGradient(centerX, p.y + p.h + 12, 2, centerX, p.y + p.h + 18, 42);
      radGrad.addColorStop(0, `rgba(255, 230, 109, ${0.45 + lightPulse})`);
      radGrad.addColorStop(0.5, `rgba(255, 183, 3, ${0.18 + lightPulse * 0.5})`);
      radGrad.addColorStop(1, 'rgba(255, 183, 3, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(centerX, p.y + p.h + 14, 42, 0, Math.PI * 2);
      ctx.fill();

      // Techo / Cornisa blindada de mármol blanco, oro y tejas festoneadas
      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 3, p.y - 2, p.w + 6, p.h + 3);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(p.x - 1, p.y, p.w + 2, p.h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + 1, p.y + 1, p.w - 2, 4);
      // Relieve dorado y friso carmesí
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x - 2, p.y + p.h - 3, p.w + 4, 3);
      ctx.fillStyle = '#b7094c';
      ctx.fillRect(p.x + 4, p.y + 2, p.w - 8, 2);

      // Tejas festoneadas en la cresta del tejado
      for (let tx = p.x + 3; tx < p.x + p.w - 5; tx += 8) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(tx, p.y - 2, 6, 2);
        ctx.fillStyle = '#c5d3cb';
        ctx.fillRect(tx + 1, p.y - 1, 4, 1);
      }

      // Rosas reales y hiedra sobre la cornisa
      for (let rx = p.x + 6; rx < p.x + p.w - 6; rx += 14) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(rx - 2, p.y - 3, 6, 3);
        ctx.fillStyle = '#e63946';
        ctx.fillRect(rx, p.y - 4, 3, 3);
      }

      // 🛡️ BARRERA / RESPLANDOR DEFENSIVO si Homelander está cargando o disparando su láser
      const isHomelanderAttacking = homelander && (homelander.phase === 'charging' || homelander.phase === 'firing');
      if (isHomelanderAttacking) {
        const shieldAlpha = homelander.phase === 'firing' ? (0.65 + Math.sin(globalFrame * 0.3) * 0.25) : (0.35 + Math.sin(globalFrame * 0.15) * 0.15);
        ctx.fillStyle = `rgba(144, 224, 239, ${shieldAlpha.toFixed(2)})`;
        ctx.fillRect(p.x - 4, p.y - 4, p.w + 8, 4);
        ctx.fillStyle = `rgba(255, 255, 255, ${(shieldAlpha * 1.2).toFixed(2)})`;
        ctx.fillRect(p.x, p.y - 3, p.w, 2);
        if (homelander.phase === 'firing' && Math.random() < 0.4) {
          const spX = p.x + Math.random() * p.w;
          ctx.fillStyle = '#caf0f8';
          ctx.fillRect(spX, p.y - 6, 2, 3);
        }
      }

      return;
    }

    if (p.subType === 'royal_marble') {
      // 🌹 FASE 3: Balcón Aéreo de Mármol Blanco y Oro en la Corte Real
      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x - 2, p.y - 1, p.w + 4, p.h + 2);

      // Ménsulas de soporte clásicas debajo del balcón
      ctx.fillStyle = '#14101c';
      ctx.fillRect(p.x + 4, p.y + p.h, 8, 7);
      ctx.fillRect(p.x + p.w - 12, p.y + p.h, 8, 7);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(p.x + 5, p.y + p.h, 6, 6);
      ctx.fillRect(p.x + p.w - 11, p.y + p.h, 6, 6);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x + 6, p.y + p.h + 4, 4, 2);
      ctx.fillRect(p.x + p.w - 10, p.y + p.h + 4, 4, 2);

      // Losa del balcón de mármol blanco
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + 1, p.y + 1, p.w - 2, 3);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(p.x, p.y + p.h - 3, p.w, 3);
      ctx.fillStyle = '#b7094c';
      ctx.fillRect(p.x + 2, p.y + 2, p.w - 4, 2);

      // Rosas reales en el balcón
      for (let rx = p.x + 4; rx < p.x + p.w - 6; rx += 14) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(rx, p.y - 2, 6, 2);
        ctx.fillStyle = '#ff758f';
        ctx.fillRect(rx + 1, p.y - 3, 4, 2);
      }
      return;
    }

    if (p.subType === 'city_awning') {
      // 🏬 MUNDO 3: Toldo Comercial Náutico Rayado de Tienda Boulevard
      ctx.fillStyle = '#07020a';
      ctx.fillRect(p.x - 2, p.y - 1, p.w + 4, p.h + 2);

      // Franjas alternadas blanco puro (#ffffff) y azul marino (#0077b6)
      for (let ax = p.x; ax < p.x + p.w; ax += 12) {
        const stripeW = Math.min(12, p.x + p.w - ax);
        const isWhite = (Math.floor(ax / 12) % 2 === 0);
        ctx.fillStyle = isWhite ? '#ffffff' : '#0077b6';
        ctx.fillRect(ax, p.y, stripeW, p.h);
        ctx.fillStyle = isWhite ? '#e2eafc' : '#005f73';
        ctx.fillRect(ax, p.y + p.h - 3, stripeW, 3);
      }
      // Borde festoneado inferior en blanco puro
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x, p.y + p.h - 1, p.w, 1);
      // Soportes diagonales de latón pulido hacia la pared
      ctx.fillStyle = '#c4923e';
      ctx.fillRect(p.x + 3, p.y + p.h, 2, 8);
      ctx.fillRect(p.x + p.w - 5, p.y + p.h, 2, 8);
      return;
    }

    if (p.subType === 'coastal_boardwalk') {
      // 🌊 MUNDO 3: Pasarela Elevada del Malecón y Mirador Náutico en Madera de Teca
      ctx.fillStyle = '#4a2810';
      ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
      ctx.fillStyle = '#a26e3c';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#7f4f24';
      ctx.fillRect(p.x, p.y + 4, p.w, p.h - 4);
      ctx.fillStyle = '#c48b4f';
      ctx.fillRect(p.x, p.y, p.w, 3);
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(p.x, p.y + 1, p.w, 1);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(p.x + 2, p.y, p.w - 4, 1);
      for (let bx = p.x + 14; bx < p.x + p.w - 10; bx += 22) {
        ctx.fillStyle = '#583110';
        ctx.fillRect(bx, p.y + 4, 2, p.h - 4);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(bx - 1, p.y + 6, 4, 2);
      }
      return;
    }

    if (p.subType === 'city_building') {
      // 🏢 MUNDO 3: Cornisa y Azotea Elevada de Edificio Costero
      ctx.fillStyle = '#495057';
      ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#ced4da';
      ctx.fillRect(p.x, p.y + 4, p.w, p.h - 4);
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(p.x, p.y, p.w, 3);
      ctx.fillStyle = '#90e0ef';
      ctx.fillRect(p.x, p.y + 1, p.w, 1);
      return;
    }

    if (p.subType === 'driftwood_plank') {
      // MUNDO 3 - FASE 2: Pasarela y Plataforma Elevada de Deriva Marina
      if (p.y < 210) {
        ctx.fillStyle = '#5c4033';
        ctx.fillRect(p.x + 8, p.y + p.h, 4, 220 - (p.y + p.h));
        ctx.fillRect(p.x + p.w - 12, p.y + p.h, 4, 220 - (p.y + p.h));
        ctx.fillStyle = '#7f5539';
        ctx.fillRect(p.x + 9, p.y + p.h, 2, 220 - (p.y + p.h));
        ctx.fillRect(p.x + p.w - 11, p.y + p.h, 2, 220 - (p.y + p.h));
      }
      ctx.fillStyle = '#5c4033';
      ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
      ctx.fillStyle = '#ddb892';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = '#b08968';
      ctx.fillRect(p.x, p.y + 4, p.w, p.h - 4);
      ctx.fillStyle = '#ede0d4';
      ctx.fillRect(p.x + 2, p.y, p.w - 4, 1);
      for (let kx = p.x + 14; kx < p.x + p.w - 14; kx += 32) {
        ctx.fillStyle = '#7f5539';
        ctx.fillRect(kx, p.y + 3, 3, 3);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(kx + 1, p.y + 4, 1, 1);
      }
      return;
    }
  }

  // Detección de plataformas adyacentes continuas para evitar costuras verticales
  let hasNeighborLeft = false;
  let hasNeighborRight = false;
  if (level && level.platforms) {
    for (let i = 0; i < level.platforms.length; i++) {
      const other = level.platforms[i];
      if (other !== p && !other.oneWay && !p.oneWay && other.y === p.y) {
        if (Math.abs(other.x + other.w - p.x) <= 2) hasNeighborLeft = true;
        if (Math.abs(p.x + p.w - other.x) <= 2) hasNeighborRight = true;
      }
    }
  }

  const borderLeft = hasNeighborLeft ? p.x : p.x - 1;
  const borderRight = hasNeighborRight ? p.x + p.w : p.x + p.w + 1;
  const borderW = borderRight - borderLeft;

  ctx.fillStyle = '#14101c';
  ctx.fillRect(borderLeft, p.y - 1, borderW, p.h + 2);

  if (isVolcano) {
    ctx.fillStyle = '#2b1620';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#1b0d14';
    ctx.fillRect(p.x, p.y + 7, p.w, p.h - 7);

    if (p.h >= 35) {
      let row = 0;
      for (let by = p.y + 12; by < p.y + p.h - 10; by += 16) {
        const offset = (row % 2) * 16;
        for (let bx = p.x + 6 + offset; bx < p.x + p.w - 24; bx += 32) {
          ctx.fillStyle = '#24111a';
          ctx.fillRect(bx, by, 24, 10);
          ctx.fillStyle = '#2f1723';
          ctx.fillRect(bx + 1, by + 1, 22, 2);
        }
        row++;
      }
    }

    ctx.fillStyle = '#8f143c';
    ctx.fillRect(p.x, p.y, p.w, 6);
    ctx.fillStyle = '#b31b52';
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(p.x, p.y, p.w, 1);

    for (let gx = p.x + 10; gx < p.x + p.w - 10; gx += 22) {
      ctx.fillStyle = '#370617';
      ctx.fillRect(gx, p.y - 2, 4, 2);
      ctx.fillStyle = '#ffcad4';
      ctx.fillRect(gx + 1, p.y, 2, 1);
    }
    return;
  }

  // Suelo del Mundo 1 diferenciado por Fase (Fase 1 Sakura, Fase 2 Muelle Botánico / Lecho Acuático, Fase 3 Mármol Real)
  if (p.subType === 'lotus_pond') {
    // 🌊 Lecho y Canal de Agua Tranquila (Fondo de agua mansa reflectante con limo y guijarros)
    ctx.fillStyle = '#0a1d2e';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#06131f';
    ctx.fillRect(p.x, p.y + 6, p.w, p.h - 6);

    // Guijarros pulidos por el agua y sedimentos del río
    for (let gx = p.x + 8; gx < p.x + p.w - 12; gx += 22) {
      ctx.fillStyle = '#16324f';
      ctx.fillRect(gx, p.y + 4, 12, 3);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(gx + 3, p.y + 3, 6, 2);
    }
  } else if (p.zone === 2) {
    // 🦋 Fase 2: Gran Muelle Botánico Victoriano de Madera Oscura y Mampostería Portuaria
    ctx.fillStyle = '#102232';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#091520';
    ctx.fillRect(p.x, p.y + 10, p.w, p.h - 10);

    // Pilares / pilotes verticales de madera de roble oscuro del muelle con anclajes de hierro
    for (let px = p.x + 8; px < p.x + p.w - 12; px += 28) {
      ctx.fillStyle = '#0a1622';
      ctx.fillRect(px, p.y + 6, 10, p.h - 6);
      ctx.fillStyle = '#162c3f';
      ctx.fillRect(px + 2, p.y + 6, 6, p.h - 6);
      // Remache / anclaje de bronce en la madera
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 4, p.y + 11, 2, 2);
      // Musgo verde en la base del pilote junto al agua
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px - 1, p.y + p.h - 8, 12, 8);
    }

    // Cubierta superior del muelle de tablones de madera pulida y remate verde musgo
    ctx.fillStyle = '#1b3b4b';
    ctx.fillRect(p.x, p.y, p.w, 6);
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(p.x, p.y, p.w, 2);
    ctx.fillStyle = '#40916c';
    ctx.fillRect(p.x, p.y + 2, p.w, 1);
  } else if (p.subType === 'royal_marble' || p.zone === 3) {
    // 🌹 Fase 3: Terraza Imperial de Mosaicos de Mármol Blanco, Cuarzo Rosa y Filigrana Dorada
    ctx.fillStyle = '#2c1e3b';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#1e1429';
    ctx.fillRect(p.x, p.y + 12, p.w, p.h - 12);

    // Mosaico continuo de losas de mármol marfil y cuarzo rosado biseladas (alineado al mundo)
    const tileW = 18;
    const tileGap = 2;
    const tileStep = tileW + tileGap; // 20px
    const startTile = Math.floor(p.x / tileStep) * tileStep;
    for (let mx = startTile; mx < p.x + p.w; mx += tileStep) {
      const drawX = Math.max(p.x, mx);
      const drawW = Math.min(mx + tileW, p.x + p.w) - drawX;
      if (drawW <= 0) continue;
      const tileIndex = Math.floor(mx / tileStep);
      const isQuartz = (tileIndex % 2) !== 0;
      ctx.fillStyle = isQuartz ? '#fcd5ce' : '#f8f9fa';
      ctx.fillRect(drawX, p.y + 7, drawW, p.h - 10);
      ctx.fillStyle = isQuartz ? '#f8edeb' : '#ffffff';
      ctx.fillRect(drawX + 1, p.y + 8, Math.max(1, drawW - 2), 2);
      ctx.fillStyle = isQuartz ? '#e8a598' : '#d8e2dc';
      ctx.fillRect(drawX + 1, p.y + p.h - 5, Math.max(1, drawW - 2), 2);
      if (drawW >= 10 && mx >= p.x) {
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(drawX + Math.floor(drawW / 2) - 1, p.y + 12, 2, 2);
      }
    }

    // Moldura superior continua de filigrana dorada, friso carmesí y césped real podado
    const topX = hasNeighborLeft ? p.x : p.x - 1;
    const topW = (hasNeighborRight ? p.x + p.w : p.x + p.w + 1) - topX;
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(topX, p.y, topW, 2);
    ctx.fillStyle = '#b7094c';
    ctx.fillRect(topX, p.y + 2, topW, 2);
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(topX, p.y + 4, topW, 3);

    // Seto bajo de rosas y pétalos dispersos en el suelo de la corte imperial (alineado al mundo)
    const startRose = Math.floor(p.x / 16) * 16;
    for (let rx = startRose; rx < p.x + p.w; rx += 16) {
      if (rx < p.x - 2 || rx > p.x + p.w - 6) continue;
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(rx, p.y - 1, 8, 2);
      ctx.fillStyle = (Math.floor(rx / 16) % 2 === 0) ? '#ff4d6d' : '#ff758f';
      ctx.fillRect(rx + 2, p.y - 3, 4, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(rx + 3, p.y - 2, 1, 1);
    }
  } else if (p.subType === 'city_asphalt' || p.subType === 'city_sidewalk' || (level && level.theme === 'coastal' && (!p.subType || p.subType === 'grass'))) {
    // 🏙️ MUNDO 3: Avenida de Asfalto Urbano Costero y Aceras Soleadas
    ctx.fillStyle = '#343a40';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#212529';
    ctx.fillRect(p.x, p.y + 8, p.w, p.h - 8);

    // Bordillo de acera biselado en granito blanco y gris claro
    ctx.fillStyle = '#e9ecef';
    ctx.fillRect(p.x, p.y, p.w, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(p.x, p.y, p.w, 1);
    ctx.fillStyle = '#ced4da';
    ctx.fillRect(p.x, p.y + 3, p.w, 1);

    // Franjas de cruce peatonal blanco reflectante (Zebra crossing)
    for (let zx = Math.floor(p.x / 24) * 24; zx < p.x + p.w; zx += 24) {
      if ((Math.floor(zx / 24) % 4) === 0 && zx >= p.x && zx + 14 <= p.x + p.w) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(zx, p.y + 4, 14, 4);
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(zx + 1, p.y + 7, 12, 1);
      }
    }

    // Adoquines de la acera metropolitana soleada
    for (let cx = Math.floor(p.x / 18) * 18; cx < p.x + p.w; cx += 18) {
      if (cx >= p.x && cx + 16 <= p.x + p.w) {
        ctx.fillStyle = '#dee2e6';
        ctx.fillRect(cx, p.y + 11, 16, 7);
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(cx + 1, p.y + 12, 14, 1);
      }
    }
  } else if (p.subType === 'coastal_boardwalk') {
    // 🌊 MUNDO 3: Gran Malecón y Paseo Marítimo de Madera de Teca
    ctx.fillStyle = '#583110';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#7f4f24';
    ctx.fillRect(p.x, p.y + 8, p.w, p.h - 8);

    // Tablones de madera marina pulida con vetas cálidas
    for (let bx = Math.floor(p.x / 16) * 16; bx < p.x + p.w; bx += 16) {
      if (bx >= p.x) {
        const plankW = Math.min(14, p.x + p.w - bx);
        ctx.fillStyle = '#b57639';
        ctx.fillRect(bx, p.y + 2, plankW, p.h - 4);
        ctx.fillStyle = '#d49b5d';
        ctx.fillRect(bx + 1, p.y + 3, Math.max(1, plankW - 2), 2);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(bx + 2, p.y + 6, 2, 2);
      }
    }

    // Remate superior del malecón con franja náutica blanca y teca
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(p.x, p.y, p.w, 2);
    ctx.fillStyle = '#c48b4f';
    ctx.fillRect(p.x, p.y + 2, p.w, 1);
  } else if (p.subType === 'city_building') {
    // 🏢 MUNDO 3: Azoteas de Edificios Costeros de Concreto Claro
    ctx.fillStyle = '#ced4da';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#adb5bd';
    ctx.fillRect(p.x, p.y + 6, p.w, p.h - 6);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(p.x, p.y + 1, p.w, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(p.x, p.y, p.w, 1);
  } else if (p.subType === 'water_puddle' || p.isWater || p.subType === 'ocean_water') {
    // MUNDO 3: Sistema Hidrodinámico de Agua y Olas Realistas de Surf
    if (typeof drawRealisticWaterPlatform === 'function') {
      drawRealisticWaterPlatform(ctx, p, globalFrame);
    } else {
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(p.x, p.y, p.w, p.h);
    }
  } else if (p.subType === 'coastal_shore_sand') {
    // MUNDO 3 - FASE 2: Orilla de Arena Marina Tropical Dorada
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#d4a373';
    ctx.fillRect(p.x, p.y + 6, p.w, p.h - 6);

    // Franja superior de arena cálida y dorada soleada
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(p.x, p.y, p.w, 4);
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(p.x, p.y, p.w, 2);
    ctx.fillStyle = '#f4e0a5';
    ctx.fillRect(p.x, p.y, p.w, 1);

    // Destellos de conchas y cuarzo brillante en la arena
    for (let sx = p.x + 12; sx < p.x + p.w - 12; sx += 22) {
      const glint = ((sx * 13) % 7) === 0;
      if (glint) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(sx, p.y + 2, 1, 1);
        ctx.fillStyle = '#fff3b0';
        ctx.fillRect(sx + 1, p.y + 3, 1, 1);
      }
    }
  } else if (p.subType === 'coastal_dune') {
    // MUNDO 3 - FASE 2: Duna de Arena Dorada con Pasto Marino Tropical
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(p.x, p.y + 5, p.w, p.h - 5);
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(p.x, p.y, p.w, 3);
    ctx.fillStyle = '#f4e0a5';
    ctx.fillRect(p.x, p.y, p.w, 1);
    // Pasto marino verde tropical meciéndose con la brisa del mar
    for (let gx = p.x + 8; gx < p.x + p.w - 8; gx += 16) {
      const sway = Math.sin(globalFrame * 0.08 + gx * 0.2) * 1.5;
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(gx + Math.round(sway), p.y - 4, 2, 4);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(gx + Math.round(sway), p.y - 5, 1, 2);
    }
  } else {
    // 🌸 FASE 1: SENDERO SAGRADO DE LOS CEREZOS (100% SAKURA)
    // Base del terreno: piedra de jardín japonés y tierra arcillosa de cerezo
    ctx.fillStyle = '#260f1e';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#190814';
    ctx.fillRect(p.x, p.y + 8, p.w, p.h - 8);

    // Losas de piedra zen y adoquines del sendero
    for (let ex = p.x + 8; ex < p.x + p.w - 18; ex += 24) {
      ctx.fillStyle = '#3d1d33';
      ctx.fillRect(ex, p.y + 11, 16, 6);
      if (ex % 48 === 8) {
        ctx.fillStyle = '#522744';
        ctx.fillRect(ex + 2, p.y + 12, 8, 2);
      }
    }

    // 🌸 100% SAKURA: Manto esponjoso y grueso de pétalos de cerezo caídos sobre el sendero
    ctx.fillStyle = '#a21b5d';
    ctx.fillRect(p.x, p.y, p.w, 6);
    ctx.fillStyle = '#ff758f';
    ctx.fillRect(p.x, p.y, p.w, 4);
    ctx.fillStyle = '#ffccd5';
    ctx.fillRect(p.x, p.y, p.w, 2);

    // Flores de cerezo completas y cúmulos de pétalos recién caídos
    const flowerStart = p.x + (hasNeighborLeft ? 2 : 6);
    const flowerEnd = p.x + p.w - (hasNeighborRight ? 2 : 8);
    for (let sx = flowerStart; sx < flowerEnd; sx += 12) {
      const isWhite = (sx % 24 === 6);
      ctx.fillStyle = isWhite ? '#ffffff' : '#ffcad4';
      ctx.fillRect(sx, p.y - 2, 4, 3);
      ctx.fillRect(sx + 1, p.y - 3, 2, 1);
      ctx.fillStyle = '#ff4d6d';
      ctx.fillRect(sx + 1, p.y - 1, 2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx + 1, p.y - 1, 1, 1);
    }
  }
}
