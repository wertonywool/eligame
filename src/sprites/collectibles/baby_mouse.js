// ============================================================================
// HIJOS RATONCITOS Y JAULA DE RESCATE
// ============================================================================
SpriteManager.prototype.drawBabyMouse = function(ctx, x, y, frame, babyId = 1) {
    ctx.save();
    const bounce = Math.abs(Math.floor(Math.sin((frame + babyId * 17) * 0.1) * 3));
    const px = Math.round(x);
    const py = Math.round(y + 4 - bounce);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(px + 2, Math.round(y + 18), 14, 2);

    const img = this.cache['baby_0'];
    if (img) {
      ctx.drawImage(img, px, py);
    }

    // Distintivo de color para cada hermanito ratón (Hijo #1 Celeste, Hijo #2 Fuego/Naranja, etc.)
    const bandanaColors = ['#4ea8de', '#ff5400', '#70e000', '#ffd166', '#b5179e', '#00f5d4', '#ff0055'];
    ctx.fillStyle = bandanaColors[(babyId - 1) % bandanaColors.length];
    ctx.fillRect(px + 3, py + 8, 8, 2);

    const heartY = py - 8 + Math.round(Math.sin(frame * 0.12) * 2);
    ctx.fillStyle = '#ff4d6d';
    ctx.fillRect(px + 6, heartY, 2, 2);
    ctx.fillRect(px + 9, heartY, 2, 2);
    ctx.fillRect(px + 5, heartY + 1, 7, 2);
    ctx.fillRect(px + 6, heartY + 3, 5, 1);
    ctx.fillRect(px + 7, heartY + 4, 3, 1);
    ctx.fillRect(px + 8, heartY + 5, 1, 1);

    ctx.restore();
  }


SpriteManager.prototype.drawBabyCage = function(ctx, x, y, frame, isGarden = false) {
    const px = Math.round(x - 6);
    const py = Math.round(y - 8);

    if (isGarden) {
      // 🌸 Escudo de Fuerza Floral y Vought de Homelander en el Jardín
      const pulse = Math.sin(frame * 0.18) * 0.15 + 0.35;
      const r = 20 + Math.sin(frame * 0.15) * 2;
      const grad = ctx.createRadialGradient(px + 14, py + 14, 2, px + 14, py + 14, r + 6);
      grad.addColorStop(0, 'rgba(255, 0, 85, 0.12)');
      grad.addColorStop(0.65, `rgba(0, 245, 212, ${pulse.toFixed(2)})`);
      grad.addColorStop(1, 'rgba(255, 0, 85, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px + 14, py + 14, r + 6, 0, Math.PI * 2);
      ctx.fill();

      // Aro exterior del escudo con runas giratorias
      ctx.strokeStyle = '#00f5d4';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px + 14, py + 14, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#ff0055';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(px + 14, py + 14, r - 3, frame * 0.05, frame * 0.05 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Candado de 5 gemas en la parte superior
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 9, py - 9, 10, 7);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 10, py - 8, 8, 5);
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(px + 13, py - 6, 2, 2);
      return;
    }

    const pulse = Math.sin(frame * 0.15) * 0.12 + 0.25;

    // Campo de fuerza carmesí interno (dentro de los barrotes de la jaula)
    ctx.fillStyle = `rgba(255, 42, 85, ${pulse.toFixed(2)})`;
    ctx.fillRect(px + 3, py + 4, 24, 24);

    // Base y techo de obsidiana
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py, 30, 4);
    ctx.fillRect(px - 2, py + 28, 34, 4);
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 2, py + 1, 26, 2);

    // Barrotes láser incandescentes
    for (let bx = px + 3; bx <= px + 27; bx += 6) {
      ctx.fillStyle = '#d00000';
      ctx.fillRect(bx, py + 4, 3, 24);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(bx + 1, py + 4, 1, 24);
    }

    // Candado energético superior
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 12, py - 5, 6, 5);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 14, py - 3, 2, 2);
  }
