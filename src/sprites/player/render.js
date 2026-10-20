// ============================================================================
// RENDERIZADO DE MAMÁ RATÓN (ANIMACIÓN, SKINS Y EFECTO VÓRTICE LAVA RUN)
// ============================================================================
SpriteManager.prototype.drawMamaMouse = function(ctx, x, y, state, frame, facingRight, squashX = 1, squashY = 1, vy = 0, isLavaDash = false, forceSkin = null) {
    ctx.save();
    const footX = Math.round(x + 12);
    const footY = Math.round(y + 24);
    ctx.translate(footX, footY);

    const safeSquashX = Math.max(0.2, Math.min(2.5, isNaN(squashX) ? 1 : squashX));
    const safeSquashY = Math.max(0.2, Math.min(2.5, isNaN(squashY) ? 1 : squashY));

    if (!facingRight) {
      ctx.scale(-safeSquashX, safeSquashY);
    } else {
      ctx.scale(safeSquashX, safeSquashY);
    }

    if (isLavaDash) {
      // VÓRTICE DE LLAMAS ROSAS OSCURAS (Lava Run Dash estilo Hollow Knight Shade Cloak)
      const swirlT = (frame || 0) * 0.3;
      
      // Halo exterior de vacío y borgoña profundo
      ctx.fillStyle = 'rgba(12, 2, 14, 0.75)';
      ctx.beginPath();
      ctx.ellipse(-2, -15, 22, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Manto ciclónico de llamas rosas oscuras
      ctx.fillStyle = '#8f143c';
      ctx.beginPath();
      ctx.ellipse(-2, -15, 19, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hebras helicoidales del vórtice
      ctx.fillStyle = '#b31b52';
      ctx.fillRect(-18, -19, 32, 8);
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(-15, -18, 26, 6);
      
      // Espuelas de fuego y cola del vórtice
      const trailWav = Math.sin(swirlT) * 3;
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(-22, -17 + Math.round(trailWav), 8, 4);
      ctx.fillRect(-26, -15 - Math.round(trailWav), 6, 2);

      // Núcleo de sombra oscura interior
      ctx.fillStyle = '#07020a';
      ctx.fillRect(-12, -17, 20, 8);

      // Ojo de fuego incandescente blanco/rosa
      ctx.fillStyle = '#ffcad4';
      ctx.fillRect(4, -16, 6, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(6, -15, 3, 2);

      ctx.restore();
      return;
    }

    const activeSkin = forceSkin || (window.saveState && window.saveState.equippedSkin) || 'classic';
    const skinPrefix = (activeSkin && activeSkin !== 'classic') ? `mama_${activeSkin}_` : 'mama_';

    let spriteKey = `${skinPrefix}idle_0`;
    let drawX = -15;
    let drawY = -29;

    if (state === 'jump') {
      if (vy < 20) {
        spriteKey = `${skinPrefix}jump_up`;
        drawY = -25;
      } else {
        spriteKey = `${skinPrefix}jump_fall`;
        drawY = -21;
      }
    } else if (state === 'transition') {
      spriteKey = `${skinPrefix}transition`;
      drawY = -27;
    } else if (state === 'run') {
      const runIdx = Math.floor(frame) % 4;
      spriteKey = `${skinPrefix}run_${runIdx}`;
      drawY = -25;
    } else {
      spriteKey = Math.floor(frame * 0.45) % 2 === 0 ? `${skinPrefix}idle_0` : `${skinPrefix}idle_1`;
      drawY = -29;
    }

    let img = this.cache[spriteKey] || this.cache['mama_idle_0'];
    if (img) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
      ctx.fillRect(-9, -2, 18, 3);

      // Vórtice interdimensional de Rick Prime (Portal verde y lima giratorio detrás)
      if (activeSkin === 'rick_prime') {
        const t = (frame || 0) * 0.08;
        ctx.save();
        ctx.translate(drawX + 3, drawY + 14);
        ctx.rotate(t * 0.25);
        ctx.fillStyle = 'rgba(22, 163, 74, 0.45)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 4; i++) {
          const ang = t + i * (Math.PI / 2);
          ctx.fillStyle = (i % 2 === 0) ? '#22c55e' : '#4ade80';
          const px = Math.cos(ang) * 11;
          const py = Math.sin(ang) * 7;
          ctx.fillRect(Math.round(px) - 2, Math.round(py) - 2, 3, 3);
        }

        ctx.fillStyle = '#052e16';
        ctx.beginPath();
        ctx.ellipse(0, 0, 7, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-1, -1, 2, 2);
        ctx.restore();
      }

      ctx.drawImage(img, drawX, drawY);

      // Accesorios físicos exclusivos en Pixel Art según el TIPO de Skin
      if (activeSkin === 'empress') {
        // 👑 TIPO REALEZA / IMPERIAL: Corona dorada de 3 puntas con rubí y destellos
        const cx = drawX + 11;
        const cy = drawY - 3;
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(cx, cy + 2, 8, 3);
        ctx.fillRect(cx - 1, cy, 2, 4);
        ctx.fillRect(cx + 3, cy - 1, 2, 5);
        ctx.fillRect(cx + 7, cy, 2, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(cx - 1, cy, 1, 1);
        ctx.fillRect(cx + 3, cy - 1, 1, 1);
        ctx.fillRect(cx + 7, cy, 1, 1);
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(cx + 3, cy + 2, 2, 2);
      } else if (activeSkin === 'mage') {
        // 🔮 TIPO ARCANO / MAGA: Sombrero de brujita cósmica con luna dorada
        const hx = drawX + 9;
        const hy = drawY - 6;
        ctx.fillStyle = '#240046';
        ctx.fillRect(hx - 2, hy + 5, 13, 2);
        ctx.fillRect(hx + 1, hy + 2, 7, 3);
        ctx.fillRect(hx + 3, hy, 4, 3);
        ctx.fillRect(hx + 5, hy - 2, 2, 3);
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(hx + 3, hy + 4, 3, 2);
        ctx.fillStyle = '#c77dff';
        ctx.fillRect(hx + 5, hy - 3, 2, 2);
      } else if (activeSkin === 'steampunk') {
        // ⚡ TIPO TECNOLOGÍA / CIENCIA: Gafas de aviador de cobre con lentes cian
        const gx = drawX + 13;
        const gy = drawY + 3;
        ctx.fillStyle = '#8c4f27';
        ctx.fillRect(gx, gy, 7, 4);
        ctx.fillStyle = '#48cae4';
        ctx.fillRect(gx + 1, gy + 1, 2, 2);
        ctx.fillRect(gx + 4, gy + 1, 2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(gx + 1, gy + 1, 1, 1);
        ctx.fillRect(gx + 4, gy + 1, 1, 1);
        ctx.fillStyle = '#3a1f11';
        ctx.fillRect(gx - 3, gy + 1, 3, 2);
      } else if (activeSkin === 'noir') {
        // 🥷 TIPO SIGILO / ASESINA: Antifaz táctico y cintas ninjas flotando al viento
        const nx = drawX + 14;
        const ny = drawY + 5;
        ctx.fillStyle = '#0f0c14';
        ctx.fillRect(nx, ny, 6, 3);
        ctx.fillStyle = '#ff2a75';
        ctx.fillRect(nx + 2, ny + 1, 2, 1);
        const wave = Math.sin((frame || 0) * 0.4) * 2;
        ctx.fillStyle = '#ff2a75';
        ctx.fillRect(nx - 6, ny + 1 + wave, 5, 2);
        ctx.fillRect(nx - 9, ny + 2 + wave * 1.5, 4, 2);
      } else if (activeSkin === 'sakura') {
        // 🌸 TIPO SAGRADA / DIVINA: Flor de loto sagrada en oreja y alitas etéreas de luz
        const fx = drawX + 8;
        const fy = drawY + 1;
        ctx.fillStyle = '#ff8fab';
        ctx.fillRect(fx, fy + 1, 4, 2);
        ctx.fillRect(fx + 1, fy, 2, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(fx + 1, fy + 1, 2, 2);
        ctx.fillStyle = 'rgba(255, 200, 221, 0.55)';
        const wingFlap = Math.sin((frame || 0) * 0.3) * 2;
        ctx.fillRect(drawX + 3, drawY + 11 + wingFlap, 5, 4);
        ctx.fillRect(drawX + 1, drawY + 10 + wingFlap, 3, 3);
      } else if (activeSkin === 'rick_prime') {
        // 🔬 RICK PRIME: Visor HUD ocular cibernético animado, retícula de escaneo láser y chispas del guantelete
        const eyeX = drawX + 18;
        const eyeY = drawY + 10;
        const scanPulse = (Math.sin((frame || 0) * 0.25) + 1) * 0.5;

        // Ocular cian brillante con núcleo blanco
        ctx.fillStyle = '#00f5d4';
        ctx.fillRect(eyeX, eyeY, 3, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(eyeX + 1, eyeY + 1, 1, 1);

        // Retícula holográfica de escaneo HUD
        ctx.strokeStyle = `rgba(0, 245, 212, ${(0.45 + scanPulse * 0.5).toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(eyeX - 2, eyeY - 2, 7, 7);

        // Haz láser horizontal de barrido
        const scanLen = 3 + Math.round(scanPulse * 6);
        ctx.fillStyle = 'rgba(85, 255, 153, 0.8)';
        ctx.fillRect(eyeX + 3, eyeY + 1, scanLen, 1);

        // Chispas de energía cuántica del guantelete de portal
        if (Math.floor((frame || 0) * 0.2) % 2 === 0) {
          ctx.fillStyle = '#55ff99';
          ctx.fillRect(drawX + 22, drawY + 16, 2, 2);
          ctx.fillStyle = '#00f5d4';
          ctx.fillRect(drawX + 24, drawY + 14, 1, 1);
        }
      } else if (activeSkin === 'homelander') {
        // 🦅 HOMELANDER: Ojos láser de calor proyectados, haz incandescente y destellos de águila dorada
        let eyeOffsetY = 8;
        if (state === 'run' || (state === 'jump' && vy < 20)) eyeOffsetY = 7;
        else if (state === 'jump') eyeOffsetY = 6;
        else if (Math.floor((frame || 0) * 0.45) % 2 !== 0) eyeOffsetY = 9;

        const eyeX = drawX + 18;
        const eyeY = drawY + eyeOffsetY;
        const pulse = (Math.sin((frame || 0) * 0.35) + 1) * 0.5;
        const beamLen = 8 + Math.round(pulse * 8);

        // Núcleo blanco de calor extremo en la pupila
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(eyeX, eyeY, 2, 2);

        // Haz de calor láser proyectado al frente cortando el aire
        ctx.fillStyle = `rgba(255, 0, 51, ${(0.65 + pulse * 0.35).toFixed(2)})`;
        ctx.fillRect(eyeX + 2, eyeY, beamLen, 2);
        ctx.fillStyle = `rgba(254, 240, 138, ${(0.8 + pulse * 0.2).toFixed(2)})`;
        ctx.fillRect(eyeX + 1, eyeY, Math.max(3, beamLen - 3), 1);

        // Chispas de plasma que saltan del rayo de calor
        if (Math.floor((frame || 0) * 0.25) % 2 === 0) {
          ctx.fillStyle = '#ffea00';
          ctx.fillRect(eyeX + beamLen + 1, eyeY - 1, 2, 1);
          ctx.fillStyle = '#ff0033';
          ctx.fillRect(eyeX + beamLen - 2, eyeY + 2, 1, 1);
        }

        // Destello especular ocasional en la hombrera de águila dorada
        const glint = Math.sin((frame || 0) * 0.15);
        if (glint > 0.8) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(drawX + 25, drawY + eyeOffsetY + 4, 2, 2);
        }
      } else if (activeSkin === 'peacemaker') {
        // 🕊️ PEACEMAKER: Destello especular cromado, brillo en la Paloma de la Paz y pluma etérea
        let helmOffsetY = 6;
        if (state === 'run' || (state === 'jump' && vy < 20)) helmOffsetY = 5;
        else if (state === 'jump') helmOffsetY = 4;
        else if (Math.floor((frame || 0) * 0.45) % 2 !== 0) helmOffsetY = 7;

        const helmX = drawX + 17;
        const helmY = drawY + helmOffsetY;
        const shineT = (frame || 0) * 0.2;
        const shineSweep = Math.sin(shineT);

        // Barrido de brillo especular sobre el cromo curvo del casco
        if (shineSweep > 0.4) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          const sx = helmX - 3 + Math.round((shineSweep - 0.4) * 8);
          ctx.fillRect(sx, helmY - 2, 2, 3);
          ctx.fillRect(sx + 1, helmY - 1, 1, 3);
        }

        // Destello en forma de estrella de 4 puntas en la Paloma de la Paz dorada
        const doveGlint = Math.sin((frame || 0) * 0.18 + 1.2);
        if (doveGlint > 0.82) {
          const gx = helmX - 1;
          const gy = helmY + 1;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(gx, gy - 2, 1, 5);
          ctx.fillRect(gx - 2, gy, 5, 1);
          ctx.fillStyle = '#facc15';
          ctx.fillRect(gx, gy, 1, 1);
        }

        // Pluma blanca etérea flotando serenamente detrás del héroe
        if (Math.floor((frame || 0) * 0.3) % 3 === 0) {
          const featherWav = Math.sin((frame || 0) * 0.4) * 2;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(drawX + 4, drawY + helmOffsetY + 8 + Math.round(featherWav), 2, 2);
          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(drawX + 5, drawY + helmOffsetY + 9 + Math.round(featherWav), 1, 1);
        }
      } else if (activeSkin === 'ivan_alien_stage') {
        // 🎤 IVAN (ALIEN STAGE): Destello en colmillo canino, pétalos de rosa negra y brasas rojas de concierto
        let headOffsetY = 0;
        if (state === 'run' || (state === 'jump' && vy < 20)) headOffsetY = -1;
        else if (state === 'jump') headOffsetY = -2;
        else if (Math.floor((frame || 0) * 0.45) % 2 !== 0) headOffsetY = 1;

        const fangX = drawX + 18;
        const fangY = drawY + headOffsetY + 12;

        // Destello especular en el colmillo canino afilado
        const toothGlint = Math.sin((frame || 0) * 0.22);
        if (toothGlint > 0.8) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(fangX - 1, fangY, 3, 1);
          ctx.fillRect(fangX, fangY - 1, 1, 3);
        }

        // Pétalos negros de rosa y brasas de concierto flotando alrededor
        const t = (frame || 0) * 0.35;
        const p1Wav = Math.sin(t) * 2;
        const p2Wav = Math.cos(t * 0.8) * 3;

        // Pétalo negro 1
        ctx.fillStyle = '#18181b';
        ctx.fillRect(drawX + 3, drawY + 14 + Math.round(p1Wav), 2, 2);
        ctx.fillStyle = '#27272a';
        ctx.fillRect(drawX + 4, drawY + 15 + Math.round(p1Wav), 1, 1);

        // Brasa roja incandescente de escenario
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(drawX + 25, drawY + 8 + Math.round(p2Wav), 2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(drawX + 25, drawY + 8 + Math.round(p2Wav), 1, 1);

        // Ondeo rítmico de la cinta / corbata carmesí
        if (Math.floor(t) % 2 === 0) {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(drawX + 19, drawY + headOffsetY + 19, 2, 2);
        }
      } else if (activeSkin === 'abaddon_hotel') {
        // 👁️ ABADDON (HOTEL EMBRUJADO): Destello ocular demoníaco, destello en sonrisa afilada y niebla espectral etérea
        let headOffsetY = 0;
        if (state === 'run' || (state === 'jump' && vy < 20)) headOffsetY = -1;
        else if (state === 'jump') headOffsetY = -2;
        else if (Math.floor((frame || 0) * 0.45) % 2 !== 0) headOffsetY = 1;

        const eyeX = drawX + 18;
        const eyeY = drawY + headOffsetY + 9;
        const t = (frame || 0) * 0.28;

        // Pulso ardiente en los ojos espectrales carmesí neón
        const eyePulse = (Math.sin(t) + 1) * 0.5;
        if (eyePulse > 0.4) {
          ctx.fillStyle = `rgba(255, 0, 85, ${(0.4 + eyePulse * 0.5).toFixed(2)})`;
          ctx.fillRect(eyeX - 1, eyeY - 1, 4, 3);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(eyeX + 1, eyeY, 1, 1);
        }

        // Destello siniestro en la sonrisa demoníaca
        const grinGlint = Math.sin(t * 0.8 + 1.2);
        if (grinGlint > 0.78) {
          const gx = drawX + 19;
          const gy = drawY + headOffsetY + 13;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(gx - 1, gy, 3, 1);
          ctx.fillRect(gx, gy - 1, 1, 3);
        }

        // Fuego fatuo y niebla espectral púrpura flotando alrededor del manto
        const mistWave = Math.sin(t * 1.2) * 2.5;
        ctx.fillStyle = 'rgba(147, 51, 234, 0.4)';
        ctx.fillRect(drawX + 2, drawY + 16 + Math.round(mistWave), 5, 3);
        ctx.fillStyle = 'rgba(192, 132, 252, 0.35)';
        ctx.fillRect(drawX + 4, drawY + 15 + Math.round(mistWave), 3, 2);

        // Brasa carmesí de las puntas de los cuernos
        if (Math.floor(t * 1.5) % 2 === 0) {
          ctx.fillStyle = '#ff0055';
          ctx.fillRect(drawX + 11, drawY - 2, 2, 2);
          ctx.fillRect(drawX + 19, drawY - 2, 2, 2);
        }
      }
    }

    ctx.restore();
  }
