// ============================================================================
// ENEMIGOS DEL VOLCÁN (MUNDO 2)
// ============================================================================
SpriteManager.prototype.drawMagmaCrawler = function(ctx, x, y, facingRight, frame, variant = 'magma') {
    const px = Math.round(x);
    const py = Math.round(y);
    const step = Math.floor(frame * 0.25) % 2;

    if (variant === 'crab' && this.drawCoastalCrab) {
      this.drawCoastalCrab(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'car' && this.drawCityCar) {
      this.drawCityCar(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'shark' && this.drawTsunamiShark) {
      this.drawTsunamiShark(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'space_drone' && this.drawSpaceDrone) {
      this.drawSpaceDrone(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'frost_crawler' && this.drawFrostCrawler) {
      this.drawFrostCrawler(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'kailash_scarab' && this.drawKailashScarab) {
      this.drawKailashScarab(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'agartha_sentinel' && this.drawAgarthaSentinel) {
      this.drawAgarthaSentinel(ctx, x, y, facingRight, frame);
      return;
    }

    if (variant === 'ladybug') {
      // FASE 1 MUNDO 1: Mariquita / Catarina del Jardin Silvestre
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 1, py + 2, 16, 12);
      // Caparazón rojo carmesí con lunares negros
      ctx.fillStyle = '#e63946';
      ctx.fillRect(px + 2, py + 3, 14, 9);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + 4, py + 3, 5, 2);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 5, py + 6, 2, 2);
      ctx.fillRect(px + 10, py + 5, 2, 2);
      ctx.fillRect(px + 8, py + 9, 2, 2);
      // Cabecita y antenitas verdes de hoja
      const headX = facingRight ? px + 12 : px + 2;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(headX, py + 5, 4, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(facingRight ? headX + 2 : headX, py + 6, 2, 2);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(facingRight ? px + 14 : px + 3, py, 2, 3);
      // Patitas
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 3 + step, py + 13, 3, 2);
      ctx.fillRect(px + 12 - step, py + 13, 3, 2);
      return;
    }

    if (variant === 'emerald_beetle') {
      // FASE 2 MUNDO 1: Escarabajo Esmeralda del Estanque de Loto
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 1, py + 2, 16, 12);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px + 2, py + 3, 14, 9);
      // Brillo iridiscente esmeralda y gota de rocío cian
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 3, py + 3, 12, 5);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 5, py + 2, 8, 3);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(px + 7, py + 2, 3, 2);
      const eyeX = facingRight ? px + 13 : px + 3;
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(eyeX, py + 7, 2, 2);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 3 + step, py + 13, 3, 2);
      ctx.fillRect(px + 12 - step, py + 13, 3, 2);
      return;
    }

    // Contorno y caparazón de roca volcánica (Mundo 2)
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 1, py + 2, 16, 12);
    ctx.fillStyle = '#370617';
    ctx.fillRect(px + 2, py + 3, 14, 9);

    // Grietas de lava brillante en el lomo
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 4, py + 2, 10, 4);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 6, py + 3, 6, 2);

    // Ojos amarillos brillantes
    const eyeX = facingRight ? px + 13 : px + 3;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(eyeX, py + 7, 2, 2);

    // Patitas animadas
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 3 + step, py + 13, 3, 2);
    ctx.fillRect(px + 12 - step, py + 13, 3, 2);
  }

  // Dibuja una Criatura Voladora (Abeja Real o Mariposa Nocturna en Mundo 1, Murciélago Ígneo en Mundo 2)
SpriteManager.prototype.drawFireBat = function(ctx, x, y, frame, variant = 'fire_bat') {
    const px = Math.round(x);
    const py = Math.round(y);
    const flap = Math.floor(frame * 0.35) % 2 === 0;

    if (variant === 'seagull' && this.drawCoastalGull) {
      this.drawCoastalGull(ctx, x, y, frame);
      return;
    }
    if (variant === 'jellyfish' && this.drawElectricJellyfish) {
      this.drawElectricJellyfish(ctx, x, y, frame);
      return;
    }
    if (variant === 'space_probe' && this.drawSpaceProbe) {
      this.drawSpaceProbe(ctx, x, y, frame);
      return;
    }
    if (variant === 'frost_flier' && this.drawFrostFlier) {
      this.drawFrostFlier(ctx, x, y, frame);
      return;
    }
    if (variant === 'astral_flier' && this.drawAstralFlier) {
      this.drawAstralFlier(ctx, x, y, frame);
      return;
    }

    if (variant === 'bee') {
      // FASE 2 MUNDO 1: Abeja Real de Nectar del Invernadero
      ctx.fillStyle = 'rgba(202, 240, 248, 0.85)';
      if (flap) {
        ctx.fillRect(px + 1, py - 5, 4, 5);
        ctx.fillRect(px + 7, py - 5, 4, 5);
      } else {
        ctx.fillRect(px - 1, py - 2, 4, 4);
        ctx.fillRect(px + 9, py - 2, 4, 4);
      }
      // Cuerpo redondeado con franjas doradas y negras
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py, 12, 10);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 1, py + 1, 3, 8);
      ctx.fillRect(px + 6, py + 1, 3, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 9, py + 3, 2, 2);
      return;
    }

    if (variant === 'moth') {
      // FASE 3 MUNDO 1: Mariposa Nocturna de las Rosas Reales
      ctx.fillStyle = '#ff4d6d';
      if (flap) {
        ctx.fillRect(px - 5, py - 4, 6, 8);
        ctx.fillRect(px + 11, py - 4, 6, 8);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(px - 3, py - 2, 2, 3);
        ctx.fillRect(px + 13, py - 2, 2, 3);
      } else {
        ctx.fillRect(px - 4, py + 1, 5, 6);
        ctx.fillRect(px + 11, py + 1, 5, 6);
      }
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 2, py, 8, 10);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + 4, py + 2, 4, 6);
      return;
    }

    ctx.fillStyle = '#d00000';
    if (flap) {
      ctx.fillRect(px - 6, py - 4, 6, 7);
      ctx.fillRect(px + 12, py - 4, 6, 7);
    } else {
      ctx.fillRect(px - 6, py + 2, 6, 6);
      ctx.fillRect(px + 12, py + 2, 6, 6);
    }

    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py, 12, 10);
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 2, py + 2, 8, 6);

    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 3, py + 3, 2, 2);
    ctx.fillRect(px + 7, py + 3, 2, 2);
  }

  // Variante 3: Sapo Volcánico Saltarín (Lava Hopper - Da grandes saltos y escupe chispas)
SpriteManager.prototype.drawLavaHopper = function(ctx, x, y, facingRight, inAir, frame) {
    const px = Math.round(x);
    const py = Math.round(y);

    // Contorno negro
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py + (inAir ? 0 : 3), 18, inAir ? 16 : 13);

    // Cuerpo anfibio de magma carmesí y panza amarilla
    ctx.fillStyle = '#9d0208';
    ctx.fillRect(px + 2, py + 4, 14, 10);
    ctx.fillStyle = '#ffbe0b';
    ctx.fillRect(px + 4, py + 9, 10, 4);

    // Pústulas incandescentes en la espalda
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 4, py + 3, 4, 3);
    ctx.fillRect(px + 10, py + 3, 4, 3);

    // Ojo saltones
    const ex = facingRight ? px + 12 : px + 3;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ex, py + 1, 4, 4);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(facingRight ? ex + 2 : ex, py + 2, 2, 2);

    // Patas estiradas al saltar o encogidas en el suelo
    ctx.fillStyle = '#6a040f';
    if (inAir) {
      ctx.fillRect(px + 1, py + 14, 4, 5);
      ctx.fillRect(px + 13, py + 14, 4, 5);
    } else {
      ctx.fillRect(px - 1, py + 12, 5, 4);
      ctx.fillRect(px + 14, py + 12, 5, 4);
    }
  }

  // Variante 4: Espíritu Orbital de Ceniza y Fuego (Flame Wisp - Flota en círculos)
SpriteManager.prototype.drawFlameWisp = function(ctx, x, y, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    const flicker = Math.floor(frame * 0.35) % 2;

    // Halo circular suave (sin bloques cuadrados)
    const grad = ctx.createRadialGradient(px + 7, py + 5, 1, px + 7, py + 5, 13);
    grad.addColorStop(0, 'rgba(255, 120, 0, 0.45)');
    grad.addColorStop(1, 'rgba(255, 84, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px + 7, py + 5, 13, 0, Math.PI * 2);
    ctx.fill();

    // Llama exterior violeta/carmesí y núcleo dorado
    ctx.fillStyle = '#d00000';
    ctx.fillRect(px + 2, py - 2 - flicker, 10, 14 + flicker);
    ctx.fillRect(px, py + 2, 14, 9);
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 2, py + 1, 10, 9);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 4, py + 3, 6, 6);

    // Ojos oscuros de espíritu
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 4, py + 5, 2, 3);
    ctx.fillRect(px + 8, py + 5, 2, 3);
  }

  // Variante 5: Gólem Acorazado de Obsidiana (Obsidian Brute - Élite de 2 Golpes con Dash)
SpriteManager.prototype.drawObsidianBrute = function(ctx, x, y, facingRight, hp, maxHp, hitFlash, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    const step = Math.floor(frame * 0.16) % 2;

    // Barra de 2 vidas sobre el Gólem
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 1, py - 9, 20, 5);
    for (let i = 0; i < maxHp; i++) {
      ctx.fillStyle = i < hp ? '#ff5400' : '#3b2d54';
      ctx.fillRect(px + 2 + i * 9, py - 8, 8, 3);
    }

    // Cuerpo pesado de obsidiana negra con bordes morados y grietas de magma
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 1, py, 24, 22);
    ctx.fillStyle = hitFlash ? '#ffffff' : '#241934';
    ctx.fillRect(px + 1, py + 2, 20, 17);

    // Hombreras y grietas de lava en el pecho
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 3, py + 5, 16, 3);
    ctx.fillRect(px + 8, py + 8, 6, 7);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 9, py + 6, 4, 4);

    // Visor de ojo ardiente
    const visorX = facingRight ? px + 11 : px + 4;
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(visorX, py + 3, 6, 2);

    // Pies pesados
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 2, py + 19 + step, 7, 4);
    ctx.fillRect(px + 13, py + 20 - step, 7, 4);
  }

  // Variante 6: Gusano / Serpiente de Magma (Magma Worm - Salta verticalmente de las grietas)
SpriteManager.prototype.drawMagmaWorm = function(ctx, x, y, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    const wave = Math.round(Math.sin(frame * 0.25) * 2);

    // Segmentos articulados de lava
    for (let s = 0; s < 3; s++) {
      const sx = px + (s % 2 === 0 ? wave : -wave);
      const sy = py + s * 6;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(sx, sy, 12, 7);
      ctx.fillStyle = s === 0 ? '#ff5400' : '#d00000';
      ctx.fillRect(sx + 1, sy + 1, 10, 5);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(sx + 3, sy + 2, 4, 2);
    }
    // Mandíbulas superiores
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 2, py - 2, 2, 2);
    ctx.fillRect(px + 8, py - 2, 2, 2);
  }
