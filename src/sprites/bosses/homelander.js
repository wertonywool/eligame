// ============================================================================
// JEFE: HOMELANDER (FASE 4 - MUNDO 1)
// ============================================================================
SpriteManager.prototype.drawHomelander = function(ctx, x, y, phase, frame) {
    ctx.save();

    if (phase === 'defeated') {
      // Homelander derrotado: gira fuera de control con humo hacia el cielo
      const spinAngle = (frame * 0.35);
      ctx.translate(Math.round(x), Math.round(y));
      ctx.rotate(spinAngle);
      const img = this.cache['hl_laser_0'] || this.cache['hl_patrol_0'];
      if (img) ctx.drawImage(img, -12, -12);
      ctx.restore();
      return { leftEyeX: x, rightEyeX: x, eyeY: y };
    }

    const hoverOffset = Math.round(Math.sin(frame * 0.08) * 3);
    const px = Math.round(x - 12);
    const py = Math.round(y + hoverOffset);

    if (phase === 'charging' || phase === 'firing') {
      const radius = 18 + Math.sin(frame * 0.6) * 4;
      const grad = ctx.createRadialGradient(x, py + 8, 2, x, py + 8, radius);
      grad.addColorStop(0, 'rgba(255, 0, 55, 0.65)');
      grad.addColorStop(1, 'rgba(255, 0, 55, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, py + 8, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const capeFrame = Math.floor(frame * 0.18) % 2;
    const key = phase === 'patrol' ? `hl_patrol_${capeFrame}` : `hl_laser_${capeFrame}`;
    const img = this.cache[key];
    if (img) {
      ctx.drawImage(img, px, py);
    }

    ctx.restore();

    return {
      leftEyeX: px + 9,
      rightEyeX: px + 13,
      eyeY: py + 5
    };
  }
