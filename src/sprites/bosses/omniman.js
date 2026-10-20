// ============================================================================
// JEFE: OMNI-MAN (FASE 4 - MUNDO 2 VOLCÁN)
// ============================================================================
SpriteManager.prototype.drawOmniMan = function(ctx, x, y, facingRight, isThrowing, frame, hp = 7, maxHp = 7, hitFlash = false, bossState = 'patrol', isEnraged = false) {
    const hoverY = (bossState === 'swoop' || bossState === 'slam_down' || bossState === 'slam_recover')
      ? 0
      : Math.round(Math.sin(frame * (isEnraged ? 0.2 : 0.1)) * 4);
    const px = Math.round(x);
    const py = Math.round(y + hoverY);

    ctx.save();

    // Aura de Furia Viltrumita cuando entra en FASE 2 (tras recibir 3 golpes: hp <= 4)
    if (isEnraged) {
      const pulse = 20 + Math.sin(frame * 0.4) * 5;
      const grad = ctx.createRadialGradient(px + 12, py + 12, 3, px + 12, py + 12, pulse);
      grad.addColorStop(0, 'rgba(255, 0, 55, 0.65)');
      grad.addColorStop(0.6, 'rgba(255, 84, 0, 0.3)');
      grad.addColorStop(1, 'rgba(255, 0, 55, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(px - 16, py - 16, 56, 56);
    }

    // Indicador visual de carga de ataque sin texto en pantalla
    if (bossState === 'swoop_charge' || bossState === 'slam_aim') {
      const flash = Math.floor(frame / 2) % 2 === 0;
      ctx.fillStyle = flash ? '#ffffff' : '#ff0055';
      ctx.fillRect(px + 10, py - 18, 4, 7);
      ctx.fillRect(px + 10, py - 9, 4, 3);
    }

    // Barra compacta de 7 vidas sobre Omni-Man
    const barW = maxHp * 5 + 2;
    const barX = px + 12 - Math.floor(barW / 2);
    const barY = py - 13;
    ctx.fillStyle = '#14101c';
    ctx.fillRect(barX - 1, barY - 1, barW, 6);
    for (let i = 0; i < maxHp; i++) {
      ctx.fillStyle = i < hp ? (isEnraged ? '#ff0055' : '#ff5400') : '#3b2d54';
      ctx.fillRect(barX + i * 5, barY, 4, 4);
    }

    ctx.translate(px + 12, py + 28);
    if (!facingRight) ctx.scale(-1, 1);

    if (bossState === 'swoop') {
      ctx.rotate(0.35);
      // Cono de ruptura sónica
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillRect(-10, -24, 24, 22);
    }

    // Aura de vuelo sónico bajo sus botas
    ctx.fillStyle = isEnraged ? 'rgba(255, 42, 85, 0.55)' : 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(-9, 0, 18, 3);

    // Capa roja viltrumita ondeando al volar
    const wave = Math.round(Math.sin(frame * (isEnraged ? 0.35 : 0.22)) * 4);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(-16 - wave, -21, 20 + wave, 21);
    ctx.fillStyle = hitFlash ? '#ffffff' : (isEnraged ? '#ff0a36' : '#d62828');
    ctx.fillRect(-15 - wave, -20, 16 + wave, 19);

    // Torso musculoso blanco y rojo (Traje de Omni-Man)
    ctx.fillStyle = '#14101c';
    ctx.fillRect(-7, -21, 15, 15);
    ctx.fillStyle = hitFlash ? '#ffd166' : '#ffffff';
    ctx.fillRect(-6, -20, 13, 13);
    // Emblema "O" rojo en el pecho
    ctx.fillStyle = hitFlash ? '#ffffff' : '#d62828';
    ctx.fillRect(-3, -18, 8, 9);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-1, -16, 4, 5);

    // Cabeza con cabello negro, sienes canosas blancas y el icónico BIGOTE
    ctx.fillStyle = '#14101c';
    ctx.fillRect(-5, -30, 11, 10);
    ctx.fillStyle = hitFlash ? '#ffffff' : '#f4b393';
    ctx.fillRect(-4, -28, 9, 7);
    ctx.fillStyle = '#1d1e2c';
    ctx.fillRect(-4, -30, 9, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-4, -28, 2, 3);
    // Ojos rojos brillantes en Fase 2 Enfurecida
    ctx.fillStyle = isEnraged ? '#ff0033' : '#14101c';
    ctx.fillRect(1, -26, 3, 2);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(0, -23, 5, 2); // Bigote viltrumita

    // Brazos
    if (isThrowing) {
      ctx.fillStyle = '#f4b393';
      ctx.fillRect(2, -28, 4, 8);
      this.drawMagmaRock(ctx, 0, -34, frame);
    } else if (bossState === 'swoop') {
      ctx.fillStyle = '#f4b393';
      ctx.fillRect(6, -22, 6, 4);
    } else {
      ctx.fillStyle = '#d62828';
      ctx.fillRect(5, -15, 3, 5);
    }

    // Piernas flotando en postura de vuelo aéreo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-6, -7, 4, 4);
    ctx.fillRect(0, -6, 4, 4);
    ctx.fillStyle = '#d62828';
    ctx.fillRect(-7, -3, 4, 4);
    ctx.fillRect(0, -2, 4, 3);

    ctx.restore();
  }
