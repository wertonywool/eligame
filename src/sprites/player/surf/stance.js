// ============================================================================
// SPRITES MUNDO 3: POSTURA DE SURFISTA PROFESIONAL Y SOPORTE DE TODAS LAS SKINS
// ============================================================================
// Utiliza los sprites oficiales pre-renderizados en memoria (mamaSurf0, mamaSurf1, mamaSurfDash)
// garantizando 100% de coherencia anatómica con el personaje principal e integrando
// accesorios exclusivos de todas las Skins:
// - empress: Corona dorada imperial con rubí
// - mage: Sombrero de brujita cósmica con luna dorada
// - steampunk: Gafas de aviador de cobre con lentes cian
// - noir: Antifaz táctico negro con cintas ninjas ondeando al viento
// - sakura: Flor de loto sagrada y alitas etéreas de luz
// - rick_prime: Pelo puntiagudo gris, visor cibernético cian y chispa cuántica
// - homelander: Hombreras doradas de águila, pelo rubio impecable y ojos láser
// - peacemaker: Casco cromado con emblema de la paloma dorada
// - ivan_alien_stage: Flequillo rebelde, colmillo blanco y corbata de idol roja
// - abaddon_hotel: Cuernos demoníacos curvados, ojos espectrales y niebla oscura

SpriteManager.prototype.drawSurferSkinAccessories = function(ctx, drawX, drawY, activeSkin, isImpulse, frame) {
  if (activeSkin === 'empress') {
    // Corona dorada de 3 puntas con rubí y destellos
    const cx = drawX + (isImpulse ? 17 : 15);
    const cy = drawY + (isImpulse ? 2 : -2);
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
    // Sombrero de brujita cósmica con luna dorada
    const hx = drawX + (isImpulse ? 16 : 14);
    const hy = drawY + (isImpulse ? -1 : -5);
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
    // Gafas de aviador de cobre con lentes cian
    const gx = drawX + (isImpulse ? 20 : 18);
    const gy = drawY + (isImpulse ? 9 : 6);
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
    // Antifaz táctico y cintas ninjas flotando al viento
    const nx = drawX + (isImpulse ? 21 : 19);
    const ny = drawY + (isImpulse ? 11 : 8);
    ctx.fillStyle = '#0f0c14';
    ctx.fillRect(nx, ny, 6, 3);
    ctx.fillStyle = '#ff2a75';
    ctx.fillRect(nx + 2, ny + 1, 2, 1);
    const wave = Math.sin((frame || 0) * 0.4) * 2;
    ctx.fillStyle = '#ff2a75';
    ctx.fillRect(nx - 7, ny + 1 + Math.round(wave), 6, 2);
    ctx.fillRect(nx - 11, ny + 2 + Math.round(wave * 1.5), 5, 2);
  } else if (activeSkin === 'sakura') {
    // Flor de loto sagrada en oreja y alitas etéreas de luz
    const fx = drawX + (isImpulse ? 14 : 12);
    const fy = drawY + (isImpulse ? 6 : 3);
    ctx.fillStyle = '#ff8fab';
    ctx.fillRect(fx, fy + 1, 4, 2);
    ctx.fillRect(fx + 1, fy, 2, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(fx + 1, fy + 1, 2, 2);
    ctx.fillStyle = 'rgba(255, 200, 221, 0.65)';
    const wingFlap = Math.sin((frame || 0) * 0.35) * 2.5;
    ctx.fillRect(drawX + (isImpulse ? 6 : 7), drawY + 13 + Math.round(wingFlap), 6, 4);
    ctx.fillRect(drawX + (isImpulse ? 4 : 5), drawY + 12 + Math.round(wingFlap), 4, 3);
  } else if (activeSkin === 'rick_prime') {
    // Visor HUD ocular cibernético animado, retícula de escaneo láser y chispas cuánticas
    const eyeX = drawX + (isImpulse ? 23 : 21);
    const eyeY = drawY + (isImpulse ? 11 : 9);
    const scanPulse = (Math.sin((frame || 0) * 0.25) + 1) * 0.5;

    ctx.fillStyle = '#00f5d4';
    ctx.fillRect(eyeX, eyeY, 3, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(eyeX + 1, eyeY + 1, 1, 1);

    ctx.strokeStyle = `rgba(0, 245, 212, ${(0.45 + scanPulse * 0.5).toFixed(2)})`;
    ctx.lineWidth = 1;
    ctx.strokeRect(eyeX - 2, eyeY - 2, 7, 7);

    const scanLen = 3 + Math.round(scanPulse * 6);
    ctx.fillStyle = 'rgba(85, 255, 153, 0.8)';
    ctx.fillRect(eyeX + 3, eyeY + 1, scanLen, 1);

    if (Math.floor((frame || 0) * 0.2) % 2 === 0) {
      ctx.fillStyle = '#55ff99';
      ctx.fillRect(drawX + (isImpulse ? 28 : 26), drawY + (isImpulse ? 17 : 15), 2, 2);
    }
  } else if (activeSkin === 'homelander') {
    // 🦅 HOMELANDER: Haz de calor láser proyectado sobre las olas y destellos de energía
    const lx = drawX + (isImpulse ? 21 : 19);
    const ly = drawY + (isImpulse ? 11 : 8);
    const pulse = (Math.sin((frame || 0) * 0.35) + 1) * 0.5;
    const beamLen = 7 + Math.round(pulse * 8);

    // Núcleo blanco y brillo carmesí
    ctx.fillStyle = '#ff0033';
    ctx.fillRect(lx, ly, 3, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(lx + 1, ly, 1, 1);

    // Haz láser de calor proyectado hacia adelante cortando el spray del mar
    ctx.fillStyle = `rgba(255, 0, 51, ${(0.6 + pulse * 0.35).toFixed(2)})`;
    ctx.fillRect(lx + 3, ly, beamLen, 2);
    ctx.fillStyle = `rgba(254, 240, 138, ${(0.75 + pulse * 0.25).toFixed(2)})`;
    ctx.fillRect(lx + 2, ly, Math.max(3, beamLen - 3), 1);

    // Chispas incandescentes que vuelan sobre el agua
    if (Math.floor((frame || 0) * 0.25) % 2 === 0) {
      ctx.fillStyle = '#ffea00';
      ctx.fillRect(lx + beamLen + 1, ly - 1, 2, 1);
      ctx.fillStyle = '#ff0033';
      ctx.fillRect(lx + beamLen - 1, ly + 2, 1, 1);
    }
  } else if (activeSkin === 'peacemaker') {
    // 🕊️ PEACEMAKER: Destello especular cromado sobre las olas y pluma de la paz flotando
    const hx = drawX + (isImpulse ? 20 : 18);
    const hy = drawY + (isImpulse ? 8 : 6);
    const shineT = (frame || 0) * 0.25;

    // Destello de cromo pulido reflejando el sol del mediodía
    if (Math.sin(shineT) > 0.5) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(hx, hy - 2, 2, 3);
      ctx.fillRect(hx + 1, hy - 1, 1, 3);
    }

    // Estrella de 4 puntas en el emblema de la paloma dorada
    if (Math.sin(shineT * 0.8 + 1.5) > 0.75) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(hx - 1, hy + 2, 1, 4);
      ctx.fillRect(hx - 2, hy + 3, 4, 1);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(hx - 1, hy + 3, 1, 1);
    }

    // Pluma blanca de la paz flotando sobre el spray marino
    if (Math.floor((frame || 0) * 0.25) % 2 === 0) {
      const sprayWave = Math.sin((frame || 0) * 0.5) * 2;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(drawX + (isImpulse ? 6 : 8), drawY + 14 + Math.round(sprayWave), 2, 2);
    }
  } else if (activeSkin === 'ivan_alien_stage') {
    // 🎤 IVAN (ALIEN STAGE): Pétalos de rosa negra y brasas carmesí sobre las olas
    const t = (frame || 0) * 0.3;
    const fangX = drawX + (isImpulse ? 25 : 23);
    const fangY = drawY + (isImpulse ? 13 : 11);

    // Destello en el colmillo sobre el agua
    if (Math.sin(t * 0.7) > 0.8) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(fangX - 1, fangY, 3, 1);
      ctx.fillRect(fangX, fangY - 1, 1, 3);
    }

    // Pétalo de rosa negra flotando sobre el spray
    const pWav = Math.sin(t) * 2.5;
    ctx.fillStyle = '#18181b';
    ctx.fillRect(drawX + (isImpulse ? 5 : 7), drawY + 12 + Math.round(pWav), 2, 2);
    ctx.fillStyle = '#27272a';
    ctx.fillRect(drawX + (isImpulse ? 6 : 8), drawY + 13 + Math.round(pWav), 1, 1);

    // Brasa carmesí de concierto
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(drawX + (isImpulse ? 28 : 26), drawY + 16 - Math.round(pWav), 2, 2);
  } else if (activeSkin === 'abaddon_hotel') {
    // 👁️ ABADDON (HOTEL EMBRUJADO): Destellos espectrales sobre el mar y niebla púrpura
    const t = (frame || 0) * 0.35;
    const eyeX = drawX + (isImpulse ? 24 : 22);
    const eyeY = drawY + (isImpulse ? 11 : 9);

    // Pulso ardiente en los ojos espectrales carmesí
    const eyePulse = (Math.sin(t) + 1) * 0.5;
    if (eyePulse > 0.4) {
      ctx.fillStyle = `rgba(255, 0, 85, ${(0.4 + eyePulse * 0.5).toFixed(2)})`;
      ctx.fillRect(eyeX - 1, eyeY - 1, 4, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(eyeX + 1, eyeY, 1, 1);
    }

    // Niebla espectral violeta y brasas sobre el agua y la tabla
    const mistWave = Math.sin(t * 1.2) * 2;
    ctx.fillStyle = 'rgba(147, 51, 234, 0.45)';
    ctx.fillRect(drawX + (isImpulse ? 5 : 7), drawY + 16 + Math.round(mistWave), 6, 3);
    ctx.fillStyle = 'rgba(192, 132, 252, 0.35)';
    ctx.fillRect(drawX + (isImpulse ? 7 : 9), drawY + 15 + Math.round(mistWave), 4, 2);

    // Brasa carmesí de los cuernos flotando sobre las olas
    if (Math.floor(t) % 2 === 0) {
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(drawX + (isImpulse ? 18 : 16), drawY + 1, 2, 2);
    }
  }
};

SpriteManager.prototype.drawSurferMama = function(ctx, x, y, facingRight, isImpulse = false, frame = 0, tilt = 0, forceSkin = null) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (!facingRight) ctx.scale(-1, 1);
  ctx.rotate(tilt * 0.6);

  const activeSkin = forceSkin || (typeof saveState !== 'undefined' && saveState && saveState.equippedSkin) || 'classic';
  const skinPrefix = (activeSkin && activeSkin !== 'classic') ? `mama_${activeSkin}_` : 'mama_';

  // Seleccionar sprite según modo de navegación (Impulso / Water Dash o Navegación en el oleaje)
  let spriteKey;
  let drawX = -18;
  let drawY = -10;

  if (isImpulse) {
    spriteKey = `${skinPrefix}surf_dash`;
    drawY = -7;
  } else {
    const cycle = Math.floor(frame * 0.14) % 2;
    spriteKey = cycle === 0 ? `${skinPrefix}surf_0` : `${skinPrefix}surf_1`;
    drawY = -10;
  }

  const img = this.cache[spriteKey] || this.cache[`${skinPrefix}idle_0`] || this.cache['mama_idle_0'];
  if (img) {
    ctx.drawImage(img, drawX, drawY);

    // Accesorios físicos exclusivos en Pixel Art según el TIPO de Skin adaptados a la postura de Surf
    this.drawSurferSkinAccessories(ctx, drawX, drawY, activeSkin, isImpulse, frame);
  }

  // Destellos de concentración aerodinámica en modo impulso
  if (isImpulse) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(drawX + 31, drawY + 12, 3, 1);
    ctx.fillRect(drawX + 29, drawY + 15, 2, 1);
  }

  ctx.restore();
};
