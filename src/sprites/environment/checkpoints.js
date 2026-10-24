// ============================================================================
// ELEMENTOS DE ENTORNO: CHECKPOINTS, PORTALES Y GÉISERES
// ============================================================================
SpriteManager.prototype.drawPortal = function(ctx, x, y, frame, scale = 1) {
    if (scale <= 0.01) return;
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(scale, scale);

    // 1. Resplandor volumétrico exterior en Rosado Oscuro y aura pulsante
    const auraPulse = Math.sin(frame * 0.12) * 3;
    const auraRx = 28 + auraPulse;
    const auraRy = 38 + auraPulse * 1.3;
    const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, auraRy);
    grad.addColorStop(0, 'rgba(255, 42, 110, 0.72)');
    grad.addColorStop(0.32, 'rgba(180, 24, 76, 0.42)');
    grad.addColorStop(0.68, 'rgba(74, 8, 32, 0.18)');
    grad.addColorStop(1, 'rgba(10, 2, 8, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, auraRx, auraRy, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Ondas de choque dimensionales saliendo del núcleo (Shockwave Rings)
    for (let r = 0; r < 2; r++) {
      const ringProg = ((frame * 0.038 + r * 0.5) % 1);
      const ringW = 16 * ringProg + 3;
      const ringH = 26 * ringProg + 4;
      const ringAlpha = (1 - ringProg) * 0.6;
      ctx.save();
      ctx.strokeStyle = `rgba(255, 143, 171, ${ringAlpha})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(0, 0, ringW, ringH, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 3. Silueta orgánica exterior ondulante (Tear in Space-Time)
    const numPoints = 18;
    const baseRx = 14;
    const baseRy = 23;

    // Capa 1: Borde exterior profundo negro obsidiana/vino
    ctx.beginPath();
    for (let i = 0; i <= numPoints; i++) {
      const ang = (i / numPoints) * Math.PI * 2;
      const wobble = Math.sin(ang * 4 + frame * 0.14) * 1.8 + Math.cos(ang * 3 - frame * 0.18) * 1.2;
      const vx = Math.cos(ang) * (baseRx + 2.5 + wobble);
      const vy = Math.sin(ang) * (baseRy + 3.2 + wobble * 1.25);
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();
    ctx.fillStyle = '#1a040f';
    ctx.fill();

    // Capa 2: Manto rosado oscuro profundo
    ctx.beginPath();
    for (let i = 0; i <= numPoints; i++) {
      const ang = (i / numPoints) * Math.PI * 2;
      const wobble = Math.sin(ang * 4 + frame * 0.14) * 1.4 + Math.cos(ang * 3 - frame * 0.18) * 0.9;
      const vx = Math.cos(ang) * (baseRx + wobble);
      const vy = Math.sin(ang) * (baseRy + wobble * 1.2);
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();
    ctx.fillStyle = '#7a1038';
    ctx.fill();

    // Capa 3: Plasma interior rosado magenta vibrante
    ctx.beginPath();
    for (let i = 0; i <= numPoints; i++) {
      const ang = (i / numPoints) * Math.PI * 2;
      const wobble = Math.sin(ang * 3 - frame * 0.16) * 1.1;
      const vx = Math.cos(ang) * (baseRx * 0.78 + wobble);
      const vy = Math.sin(ang) * (baseRy * 0.78 + wobble * 1.2);
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();
    ctx.fillStyle = '#d92568';
    ctx.fill();

    // 4. Brazos de Vórtice en Espiral Fluida (Blanco Puro y Rosado Claro)
    const arms = 3;
    ctx.save();
    for (let a = 0; a < arms; a++) {
      const baseAng = frame * 0.15 + (a * (Math.PI * 2 / arms));
      ctx.beginPath();
      for (let step = 0; step < 11; step++) {
        const t = step / 10;
        const armAng = baseAng + t * 2.3;
        const armR = (t * baseRx * 0.74);
        const ax = Math.cos(armAng) * armR;
        const ay = Math.sin(armAng) * armR * 1.45;
        if (step === 0) ctx.moveTo(ax, ay);
        else ctx.lineTo(ax, ay);
      }
      ctx.strokeStyle = a % 2 === 0 ? '#ffffff' : '#ff75a0';
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.restore();

    // 5. Núcleo de Singularidad Cósmica (Centro palpitante negro vacío y blanco puro)
    const coreWobbleX = Math.sin(frame * 0.24) * 1.4;
    const coreWobbleY = Math.cos(frame * 0.20) * 1.8;
    const corePulse = Math.sin(frame * 0.28) * 1.2;

    ctx.fillStyle = '#ff2a70';
    ctx.beginPath();
    ctx.ellipse(coreWobbleX, coreWobbleY, 5.5 + corePulse, 8.5 + corePulse * 1.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Centro blanco puro brillante
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(coreWobbleX, coreWobbleY, 3 + corePulse * 0.6, 5 + corePulse * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // 6. Chispas y Arcos de Plasma Orbitando el Portal
    const sparkCount = 7;
    for (let i = 0; i < sparkCount; i++) {
      const spkAng = frame * (0.09 + (i % 3) * 0.03) + (i * Math.PI * 2 / sparkCount);
      const orbitRx = baseRx + 3 + Math.sin(frame * 0.2 + i) * 2.5;
      const orbitRy = baseRy + 4 + Math.cos(frame * 0.2 + i) * 3;
      const sx = Math.cos(spkAng) * orbitRx;
      const sy = Math.sin(spkAng) * orbitRy;

      const isStar = (i + Math.floor(frame * 0.1)) % 3 === 0;
      if (isStar) {
        this.drawSparkleStar(ctx, Math.round(sx), Math.round(sy), 2.2, '#ffffff');
      } else {
        ctx.fillStyle = (i % 2 === 0) ? '#ff8fab' : '#ffffff';
        ctx.beginPath();
        ctx.arc(Math.round(sx), Math.round(sy), 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  };

SpriteManager.prototype.drawGeyser = function(ctx, g, frame, isGarden = false) {
    const px = Math.round(g.x);
    const py = Math.round(g.y);

    if (g.isCosmic || (typeof level !== 'undefined' && level && level.id === 4 && g.x >= 33000)) {
      // ✨ Vórtice de Polvo Estelar / Fuente Cósmica del Firmamento (Mundo 4 Fase 9)
      // 1. Pedestal astral de obsidiana y oro celestial
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(px - 3, py - 4, g.w + 6, 5);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(px - 1, py - 6, g.w + 2, 3);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 3, py - 7, g.w + 6, 2);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 4, py - 8, g.w - 8, 2);

      // 2. Columna de energía luminosa translúcida
      const grad = ctx.createLinearGradient(0, py - g.boostHeight, 0, py);
      grad.addColorStop(0, 'rgba(0, 245, 212, 0.05)');
      grad.addColorStop(0.5, 'rgba(114, 9, 183, 0.22)');
      grad.addColorStop(1, 'rgba(0, 245, 212, 0.45)');
      ctx.fillStyle = grad;
      ctx.fillRect(px, py - g.boostHeight, g.w, g.boostHeight);

      // 3. Estrellas y polvo cósmico ascendiendo en espiral
      for (let i = 0; i < 7; i++) {
        const offset = ((frame * 2.4 + i * 20) % g.boostHeight);
        const wy = py - 8 - offset;
        const sway = Math.round(Math.sin(frame * 0.12 + i * 1.2) * 5);
        const alpha = Math.max(0.2, 1 - offset / g.boostHeight);

        // Estrellas titilantes
        ctx.fillStyle = (i % 2 === 0) ? `rgba(255, 209, 102, ${alpha.toFixed(2)})` : `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        ctx.fillRect(px + 4 + ((i * 6) % (g.w - 8)) + sway, Math.round(wy), 3, 3);

        // Chispas turquesas cruzadas
        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(0, 245, 212, ${(alpha * 0.9).toFixed(2)})`;
          ctx.fillRect(px + 5 + ((i * 4) % (g.w - 10)) - sway, Math.round(wy) - 2, 2, 5);
          ctx.fillRect(px + 3 + ((i * 4) % (g.w - 10)) - sway, Math.round(wy), 5, 2);
        }
      }

      // 4. Anillo de energía boreal en la base
      const pulse = Math.sin(frame * 0.2) * 2;
      ctx.strokeStyle = '#00f5d4';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 2 - pulse, py - 9, g.w - 4 + pulse * 2, 3);
      return;
    }

    if (isGarden || g.isGarden) {
      // 🌸 Flor de Brisa Mágica del Jardín (Hojas esmeralda, corola rosada y pétalos flotando hacia arriba)
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px - 2, py - 4, g.w + 4, 5);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px, py - 5, 8, 4);
      ctx.fillRect(px + g.w - 8, py - 5, 8, 4);
      // Pétalos de la flor impulsora
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + 5, py - 7, g.w - 10, 5);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 9, py - 6, g.w - 18, 3);

      // Pétalos rosados y hojas verdes subiendo en espiral con la brisa
      for (let i = 0; i < 6; i++) {
        const offset = ((frame * 1.9 + i * 18) % g.boostHeight);
        const wy = py - 8 - offset;
        const sway = Math.round(Math.sin(frame * 0.1 + i) * 3);
        const alpha = Math.max(0.15, 1 - offset / g.boostHeight);
        ctx.fillStyle = i % 2 === 0
          ? `rgba(255, 143, 171, ${(alpha * 0.75).toFixed(2)})`
          : `rgba(149, 213, 178, ${(alpha * 0.7).toFixed(2)})`;
        ctx.fillRect(px + 4 + ((i * 5) % (g.w - 8)) + sway, Math.round(wy), 4, 4);
      }
      return;
    }

    // Base de cráter pequeño en el suelo (Mundo 2 Volcán)
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 2, py - 5, g.w + 4, 6);
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 2, py - 4, g.w - 4, 4);

    // Columnas de vapor / aire caliente subiendo
    for (let i = 0; i < 6; i++) {
      const offset = ((frame * 2.2 + i * 18) % g.boostHeight);
      const wy = py - 6 - offset;
      const alpha = Math.max(0.1, 1 - offset / g.boostHeight);
      ctx.fillStyle = `rgba(255, 209, 102, ${(alpha * 0.55).toFixed(2)})`;
      ctx.fillRect(px + 3 + ((i * 5) % (g.w - 8)), Math.round(wy), 4, 8);
    }
  }

  // Dibuja una Piedra de Lava / Magma ardiente
SpriteManager.prototype.drawMagmaRock = function(ctx, x, y, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 5, py - 5, 10, 10);
    ctx.fillStyle = '#370617';
    ctx.fillRect(px - 4, py - 4, 8, 8);
    // Grietas de magma incandescente
    ctx.fillStyle = Math.floor(frame / 4) % 2 === 0 ? '#ff5400' : '#ffd166';
    ctx.fillRect(px - 2, py - 3, 4, 2);
    ctx.fillRect(px - 3, py, 5, 2);
    ctx.fillRect(px, py + 2, 2, 2);
  }

  // Dibuja un Checkpoint (Santuario Floral del Lirio en Mundo 1 o Cristal Volcánico en Mundo 2)
SpriteManager.prototype.drawCheckpoint = function(ctx, x, y, active, frame, isGarden = false) {
    const px = Math.round(x);
    const py = Math.round(y);

    if (isGarden) {
      if (active) {
        const pulse = Math.sin(frame * 0.12) * 3;
        const r = 24 + pulse;
        const grad = ctx.createRadialGradient(px + 8, py - 15, 2, px + 8, py - 15, r);
        grad.addColorStop(0, 'rgba(149, 213, 178, 0.45)');
        grad.addColorStop(1, 'rgba(149, 213, 178, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px + 8, py - 15, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Pedestal de mármol blanco con musgo esmeralda
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 1, py - 7, 18, 7);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px + 1, py - 6, 14, 5);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 2, py - 6, 12, 2);
      // Tallo y hojas del Gran Lirio de Guardado
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px + 7, py - 20, 3, 13);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 3, py - 14, 4, 3);
      ctx.fillRect(px + 10, py - 16, 4, 3);
      // Flor del Lirio Sagrado (cerrada en gris lavanda, abierta blanca y carmesí al activarse)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 3, py - 27, 11, 9);
      ctx.fillStyle = active ? '#ffffff' : '#6c757d';
      ctx.fillRect(px + 4, py - 26, 9, 7);
      ctx.fillStyle = active ? '#ff2a55' : '#3b2d54';
      ctx.fillRect(px + 7, py - 24, 3, 4);
      if (active) {
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(px + 8, py - 25, 1, 2);
      }
      return;
    }

    if (active) {
      const pulse = Math.sin(frame * 0.12) * 3;
      const r = 22 + pulse;
      const grad = ctx.createRadialGradient(px + 8, py - 14, 2, px + 8, py - 14, r);
      grad.addColorStop(0, 'rgba(0, 245, 212, 0.42)');
      grad.addColorStop(1, 'rgba(0, 245, 212, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px + 8, py - 14, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pedestal de piedra
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py - 6, 16, 6);
    ctx.fillStyle = '#4a4e69';
    ctx.fillRect(px + 2, py - 5, 12, 4);

    // Cristal central
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 4, py - 24, 8, 18);
    ctx.fillStyle = active ? '#00f5d4' : '#3b2d54';
    ctx.fillRect(px + 5, py - 22, 6, 15);
    if (active) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 6, py - 20, 2, 10);
    }
  };

