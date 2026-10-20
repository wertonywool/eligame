// ============================================================================
// ELEMENTOS INTERACTIVOS: NPCS, PADS DE COLORES, FAROLES Y LIRIOS
// ============================================================================
SpriteManager.prototype.drawNPC = function(ctx, x, y, npc, frame, isGarden = false) {
    const px = Math.round(x);
    const py = Math.round(y);

    if (npc.questNpc === 'hotdogs' || npc.name === 'Don Pancho') {
      const q = typeof getHotdogQuest === 'function' ? getHotdogQuest() : null;
      const fate = q ? q.fate : null;
      if (typeof drawHotdogCart === 'function') drawHotdogCart(ctx, px - 18, py + 2, frame);
      if (typeof drawDonPancho === 'function') drawDonPancho(ctx, px + 8, py, fate, frame);
      if (!fate) {
        const iconBob = Math.round(Math.sin(frame * 0.1 + x) * 1.5);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(px + 9, py - 18 + iconBob, 6, 4);
        ctx.fillStyle = '#14101c';
        ctx.fillRect(px + 10, py - 17 + iconBob, 1, 1);
        ctx.fillRect(px + 13, py - 17 + iconBob, 1, 1);
      }
      return;
    }

    if (npc.isBaby || npc.name === 'Hijo Ratoncito') {
      if (typeof this.drawBabyMouse === 'function') {
        this.drawBabyMouse(ctx, px, py - 6, frame, 3);
        return;
      }
    }

    const bob = Math.floor(Math.sin(frame * 0.08 + x) * 1);

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(px + 1, py + 16, 14, 2);

    // Orejitas de ratón NPC
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 1, py - 2 + bob, 4, 4);
    ctx.fillRect(px + 11, py - 2 + bob, 4, 4);
    ctx.fillStyle = npc.color || '#d8e2dc';
    ctx.fillRect(px + 2, py - 1 + bob, 2, 2);
    ctx.fillRect(px + 12, py - 1 + bob, 2, 2);

    // Cuerpo de ratoncito aldeano / jardinero / explorador
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 2, py + 2 + bob, 12, 15);
    ctx.fillStyle = npc.color || '#d8e2dc';
    ctx.fillRect(px + 3, py + 3 + bob, 10, 13);

    // Sombrero de paja/flor para el Jardín o Casco de minero para el Volcán
    ctx.fillStyle = npc.hatColor || '#ffb703';
    ctx.fillRect(px + 1, py + bob, 14, 4);
    if (isGarden || npc.gardenHat) {
      // Florcita decorativa en el sombrero del Jardín
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 6, py - 2 + bob, 4, 2);
      ctx.fillStyle = '#ff2a55';
      ctx.fillRect(px + 7, py - 2 + bob, 2, 1);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 11, py + 1 + bob, 2, 2); // Linterna de casco en el Volcán
    }

    // Ojo y bigotito
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 10, py + 6 + bob, 2, 2);

    // Ranita posada sobre el sombrero de Raúl antes de entregársela a Elizabeth
    if (npc.name === 'Raúl' && (typeof saveState === 'undefined' || !saveState.raulQuest || saveState.raulQuest.state === 'NOT_STARTED')) {
      if (typeof drawFrogSprite === 'function') {
        drawFrogSprite(ctx, px + 8, py - 3 + bob, true, frame);
      }
    }
    // Indicador flotante discreto sobre el NPC ("💬")
    const iconBob = Math.round(Math.sin(frame * 0.1 + x) * 1.5);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 5, py - 9 + iconBob, 6, 4);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 6, py - 8 + iconBob, 1, 1);
    ctx.fillRect(px + 9, py - 8 + iconBob, 1, 1);
  }


SpriteManager.prototype.drawColorPad = function(ctx, pad, isCurrentTarget, isActivated, isWrong, frame) {
    const px = Math.round(pad.x);
    const py = Math.round(pad.y);
    const pw = pad.w || 32;
    const ph = pad.h || 10;
    const cx = px + pw / 2;
    const cy = py - ph / 2;

    const rgb = pad.rgb || (pad.hex === '#ff0055' ? '255,0,85' : (pad.hex === '#0077b6' ? '0,119,182' : (pad.hex === '#2ec4b6' ? '46,196,182' : (pad.hex === '#ffd166' ? '255,209,102' : (pad.hex === '#9b5de5' ? '155,93,229' : (pad.hex === '#ff7b00' ? '255,123,0' : '255,255,255'))))));
    const gemColor = isWrong ? '#ff0033' : (isActivated ? '#ffd166' : pad.hex);
    const glowColor = isWrong ? '#ff758f' : (isActivated ? '#fff3b0' : (pad.glowHex || pad.hex));
    const padLabel = pad.label || pad.colorName || '';

    // --- 1. AURA RADIANTE INTENSA (Visible a gran distancia en todo momento) ---
    const ambPulse = Math.sin(frame * 0.14 + px * 0.05) * 2;
    const ambRad = isCurrentTarget ? 38 : (isActivated ? 24 : 18 + ambPulse);
    const ambGrad = ctx.createRadialGradient(cx, cy - 4, 3, cx, cy - 4, ambRad);
    if (isActivated) {
      ambGrad.addColorStop(0, 'rgba(255, 209, 102, 0.65)');
      ambGrad.addColorStop(0.5, 'rgba(0, 245, 212, 0.25)');
      ambGrad.addColorStop(1, 'rgba(0,0,0,0)');
    } else if (isCurrentTarget) {
      ambGrad.addColorStop(0, `rgba(${rgb}, 0.90)`);
      ambGrad.addColorStop(0.4, `rgba(${rgb}, 0.45)`);
      ambGrad.addColorStop(1, 'rgba(0,0,0,0)');
    } else {
      // Incluso en reposo emite un resplandor vivo de su color (NUNCA apagado ni invisible)
      ambGrad.addColorStop(0, `rgba(${rgb}, 0.58)`);
      ambGrad.addColorStop(0.6, `rgba(${rgb}, 0.22)`);
      ambGrad.addColorStop(1, 'rgba(0,0,0,0)');
    }
    ctx.fillStyle = ambGrad;
    ctx.beginPath();
    ctx.arc(cx, cy - 4, ambRad, 0, Math.PI * 2);
    ctx.fill();

    // --- 2. COLUMNA DE LUZ CELESTIAL / BEACON (Cuando es el objetivo activo a pisar) ---
    if (isCurrentTarget && !isActivated) {
      const beamH = 68;
      const beamGrad = ctx.createLinearGradient(0, py - ph - beamH, 0, py - ph);
      beamGrad.addColorStop(0, `rgba(${rgb}, 0)`);
      beamGrad.addColorStop(0.3, `rgba(${rgb}, 0.25)`);
      beamGrad.addColorStop(0.7, `rgba(${rgb}, 0.65)`);
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(px + 4, py - ph - beamH, pw - 8, beamH);

      // Partículas y destellos de luz orbitando el rayo
      for (let i = 0; i < 5; i++) {
        const sparkAng = frame * 0.16 + i * (Math.PI * 2 / 5);
        const spRadX = 16 + Math.sin(frame * 0.2 + i) * 3;
        const spRadY = 10 + Math.cos(frame * 0.2 + i) * 2;
        const spX = cx + Math.cos(sparkAng) * spRadX;
        const spY = cy - 8 + Math.sin(sparkAng) * spRadY;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(Math.round(spX) - 1, Math.round(spY) - 1, 2, 2);
        ctx.fillStyle = glowColor;
        ctx.fillRect(Math.round(spX), Math.round(spY), 1, 1);
      }

      // Flecha pixel art pulsante sobre el cristal objetivo (sin textos que saturen)
      const arrowBob = Math.round(Math.sin(frame * 0.2) * 3);
      const arrowY = py - ph - 14 + arrowBob;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 4, arrowY, 8, 2);
      ctx.fillRect(cx - 3, arrowY + 2, 6, 2);
      ctx.fillRect(cx - 2, arrowY + 4, 4, 2);
      ctx.fillRect(cx - 1, arrowY + 6, 2, 2);
    }

    // --- 3. PEDESTAL / ALTAR IMPERIAL DE MÁRMOL Y ORO ---
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 2, py - ph - 1, pw + 4, ph + 2);
    // Escalón inferior de mármol pulido
    ctx.fillStyle = '#2d1b4e';
    ctx.fillRect(px - 1, py - ph, pw + 2, ph);
    ctx.fillStyle = isActivated ? '#ffd166' : '#ffd166';
    ctx.fillRect(px, py - ph, pw, 2); // Moldura dorada superior
    // Zócalo de mármol
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(px + 2, py - ph + 2, pw - 4, ph - 2);
    ctx.fillStyle = '#dee2e6';
    ctx.fillRect(px + 3, py - ph + 4, pw - 6, ph - 4);

    // --- 4. GEMA / CRISTAL RECTANGULAR FACETADO ELEVADO ---
    // Sombra del cristal sobre el altar
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 3, py - ph - 6, pw - 6, 8);
    // Cuerpo vibrante de la gema con su color puro (siempre brillante, nunca oscuro)
    ctx.fillStyle = gemColor;
    ctx.fillRect(px + 4, py - ph - 5, pw - 8, 7);
    // Faceta iluminada superior
    ctx.fillStyle = glowColor;
    ctx.fillRect(px + 5, py - ph - 5, pw - 10, 3);
    // Destello blanco central estilo diamante
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + pw / 2 - 3, py - ph - 5, 6, 2);
    ctx.fillRect(px + pw / 2 - 1, py - ph - 6, 2, 4);

    // --- 5. INDICADOR CENTRAL: ✓ si completado, o inicial clara ---
    if (isActivated) {
      ctx.fillStyle = '#14101c';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('✓', cx, py - ph + 1);
      ctx.fillStyle = '#00f5d4';
      ctx.fillText('✓', cx, py - ph);
      ctx.textAlign = 'left';
    }
  }


SpriteManager.prototype.drawLantern = function(ctx, x, y, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    const r = 24 + Math.sin(frame * 0.15 + x) * 2;

    const grad = ctx.createRadialGradient(px + 4, py - 22, 2, px + 4, py - 22, r);
    grad.addColorStop(0, 'rgba(255, 209, 102, 0.34)');
    grad.addColorStop(0.55, 'rgba(252, 163, 17, 0.12)');
    grad.addColorStop(1, 'rgba(252, 163, 17, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px + 4, py - 22, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 2, py - 24, 4, 24);
    ctx.fillStyle = '#3b3355';
    ctx.fillRect(px + 3, py - 23, 2, 22);
    ctx.fillRect(px, py - 3, 8, 3);

    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py - 27, 8, 8);
    ctx.fillRect(px + 2, py - 29, 4, 2);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 2, py - 25, 4, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 3, py - 24, 2, 3);
  }

  // Dibuja un Lirio del Valle silvestre (guiño a Dexter)
SpriteManager.prototype.drawWildLily = function(ctx, x, y, sway) {
    const px = Math.round(x);
    const py = Math.round(y);
    const s = Math.round(sway);

    ctx.fillStyle = '#1e4d20';
    ctx.fillRect(px - 2, py - 5, 2, 5);
    ctx.fillStyle = '#409142';
    ctx.fillRect(px, py - 7, 2, 7);
    ctx.fillRect(px + 2, py - 5, 2, 5);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 1 + s, py - 9, 3, 2);
    ctx.fillRect(px + 3 + s, py - 7, 3, 2);
    ctx.fillStyle = '#d90429';
    ctx.fillRect(px + 2 + s, py - 10, 1, 1);
  }
