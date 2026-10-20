// ============================================================================
// RENDERIZADO DEL KRAKEN EN EL MUNDO: ATAQUES, GÉISERES, OLAS Y ESCOMBROS
// ============================================================================

function drawKrakenBossWorld(ctx) {
  const k = window.krakenBossState || krakenBossState;
  if (!k || (!k.active && !k.isDefeated)) return;

  // --------------------------------------------------------------------------
  // 1. DIBUJAR CUERPO Y CABEZA DEL KRAKEN EN SU POSICIÓN DEL REMOLINO
  // --------------------------------------------------------------------------
  if (window.sprites && window.sprites.drawKrakenBoss) {
    window.sprites.drawKrakenBoss(ctx, k, globalFrame);
  }

  // --------------------------------------------------------------------------
  // 2. INDICADORES DE ALERTA Y APLASTAMIENTO DE TENTÁCULOS (SLAMS)
  // --------------------------------------------------------------------------
  if (k.slams && k.slams.length > 0) {
    k.slams.forEach(s => {
      if (s.timer > 0) {
        // Retícula de advertencia náutica: vórtice de remolino en el suelo
        const pulse = Math.sin(globalFrame * 0.3) * 3;
        ctx.strokeStyle = '#ffd166';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y - 4, 22 + pulse, 7 + pulse * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 245, 212, 0.28)';
        ctx.fill();

        // Signo de exclamación de peligro
        ctx.fillStyle = '#ff0054';
        ctx.fillRect(s.x - 2, s.y - 24, 4, 9);
        ctx.fillRect(s.x - 2, s.y - 13, 4, 3);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(s.x - 1, s.y - 23, 2, 7);
        ctx.fillRect(s.x - 1, s.y - 12, 2, 2);
      } else {
        // Tentáculo titánico estrellándose contra el suelo
        if (window.sprites && window.sprites.drawKrakenTentacle) {
          window.sprites.drawKrakenTentacle(ctx, s.x, s.y, globalFrame, 1.3);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. ONDAS DE CHOQUE EXPANSIVAS POR EL SUELO
  // --------------------------------------------------------------------------
  if (k.shockwaves && k.shockwaves.length > 0) {
    k.shockwaves.forEach(sw => {
      const dir = sw.vx > 0 ? 1 : -1;
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(sw.x - 4, sw.y - 5, 8, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sw.x - 2, sw.y - 7, 5, 3);
      // Espuela de agua proyectada
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(sw.x + dir * 3, sw.y - 4, 4, 4);
    });
  }

  // --------------------------------------------------------------------------
  // 4. OLAS DE SURF AVANZANDO POR LA ARENA DE COMBATE
  // --------------------------------------------------------------------------
  if (k.waves && k.waves.length > 0) {
    k.waves.forEach(wv => {
      const wx = Math.round(wv.x);
      const wy = Math.round(wv.y);
      // Masa de ola turquesa
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(wx, wy - 10, wv.w, 14);
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(wx + 2, wy - 12, wv.w - 4, 4);
      // Cresta espumosa blanca
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(wx, wy - 14, wv.w, 3);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(wx + 2, wy - 15, wv.w - 6, 2);
    });
  }

  // --------------------------------------------------------------------------
  // 5. GÉISERES DE AGUA A PRESIÓN ERUPCIONANDO (FASE 2 Y 3)
  // --------------------------------------------------------------------------
  if (k.geysers && k.geysers.length > 0) {
    k.geysers.forEach(g => {
      const gx = Math.round(g.x);
      if (g.timer > 0) {
        // Burbujeo de advertencia en la rejilla
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fillRect(gx - 8, g.y - 3, 16, 3);
        ctx.fillStyle = '#00f5d4';
        ctx.fillRect(gx - 4, g.y - 5, 8, 2);
      } else if (g.erupted) {
        // Columna vertical de agua a presión
        const colH = 95;
        const colY = g.y - colH;
        // Núcleo acuático
        ctx.fillStyle = 'rgba(0, 180, 216, 0.85)';
        ctx.fillRect(gx - 7, colY, 14, colH);
        ctx.fillStyle = 'rgba(72, 202, 228, 0.9)';
        ctx.fillRect(gx - 4, colY, 8, colH);
        // Espuma blanca en la cúspide
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(gx - 10, colY - 4, 20, 8);
        ctx.fillStyle = '#caf0f8';
        ctx.fillRect(gx - 8, colY - 8, 16, 5);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. BARRIDO DE TENTÁCULO HORIZONTAL (FASE 3)
  // --------------------------------------------------------------------------
  if (k.sweep && k.sweep.active) {
    const swx = Math.round(k.sweep.x);
    const swy = Math.round(k.sweep.y);
    // Masa del tentáculo gigante barriendo
    ctx.fillStyle = '#000814';
    ctx.fillRect(swx - 2, swy - 2, k.sweep.w + 4, k.sweep.h + 4);
    ctx.fillStyle = '#03045e';
    ctx.fillRect(swx, swy, k.sweep.w, k.sweep.h);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(swx + 4, swy + 2, k.sweep.w - 8, 4);

    // Ventosas bioluminiscentes doradas de furia
    for (let vx = swx + 8; vx < swx + k.sweep.w - 8; vx += 16) {
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(vx, swy + 6, 6, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(vx + 2, swy + 8, 2, 2);
    }
    // Estela de agua arrastrada por el barrido
    ctx.fillStyle = 'rgba(202, 240, 248, 0.65)';
    ctx.fillRect(swx + k.sweep.w, swy, 36, k.sweep.h);
  }

  // --------------------------------------------------------------------------
  // 7. MONTÍCULOS DE ESCOMBROS URBANOS (ESTACIONES DE LANZAMIENTO)
  // --------------------------------------------------------------------------
  const piles = [
    { x: 18360, type: 'slab' },
    { x: 18660, type: 'taxi' },
    { x: 18860, type: 'girder' }
  ];

  piles.forEach(p => {
    const px = p.x;
    if (p.type === 'slab') {
      // Losa de hormigón fracturado
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 14, 188, 28, 8);
      ctx.fillStyle = '#495057';
      ctx.fillRect(px - 12, 186, 24, 7);
      ctx.fillStyle = '#7f4f24'; // Ferralla expuesta
      ctx.fillRect(px + 10, 188, 5, 2);
    } else if (p.type === 'taxi') {
      // Capó / resto de taxi amarillo
      ctx.fillStyle = '#0a1128';
      ctx.fillRect(px - 16, 186, 32, 10);
      ctx.fillStyle = '#ffb703';
      ctx.fillRect(px - 14, 185, 28, 9);
      ctx.fillStyle = '#14101c'; // Franja a cuadros
      ctx.fillRect(px - 8, 187, 4, 3);
      ctx.fillRect(px, 187, 4, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px - 4, 187, 4, 3);
    } else if (p.type === 'girder') {
      // Viga de acero con franja amarilla de peligro
      ctx.fillStyle = '#0a1128';
      ctx.fillRect(px - 15, 187, 30, 9);
      ctx.fillStyle = '#293241';
      ctx.fillRect(px - 13, 186, 26, 7);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 8, 187, 5, 5);
      ctx.fillRect(px + 2, 187, 5, 5);
    }

    // Indicador interactivo si Elizabeth está cerca
    if (k.active && Math.abs(player.x + 11 - px) < 42) {
      const bob = Math.sin(globalFrame * 0.2) * 2.5;
      const py = 168 + bob;
      ctx.fillStyle = 'rgba(10, 17, 40, 0.88)';
      ctx.fillRect(px - 34, py - 6, 68, 13);
      ctx.strokeStyle = '#ffd166';
      ctx.lineWidth = 1;
      ctx.strokeRect(px - 34, py - 6, 68, 13);

      ctx.fillStyle = '#ffd166';
      ctx.font = `bold 6.5px ${UI_FONT}`;
      ctx.textAlign = 'center';
      ctx.fillText('[DASH] ARROJAR', px, py + 3);
    }
  });

  // --------------------------------------------------------------------------
  // 8. ESCOMBRO EN PLENO VUELO DISPARADO HACIA LOS OJOS DEL KRAKEN
  // --------------------------------------------------------------------------
  const r = k.debrisRock;
  if (r && r.active) {
    const rx = Math.round(r.x);
    const ry = Math.round(r.y);

    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(r.rot || 0);

    if (r.type === 'taxi') {
      ctx.fillStyle = '#ffb703';
      ctx.fillRect(-6, -5, 12, 10);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(-2, -3, 4, 3);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(2, -4, 3, 3);
    } else if (r.type === 'girder') {
      ctx.fillStyle = '#293241';
      ctx.fillRect(-8, -4, 16, 8);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(-4, -3, 4, 6);
      ctx.fillRect(2, -3, 4, 6);
    } else {
      ctx.fillStyle = '#495057';
      ctx.fillRect(-6, -5, 12, 10);
      ctx.fillStyle = '#6c757d';
      ctx.fillRect(-4, -4, 8, 8);
      ctx.fillStyle = '#7f4f24';
      ctx.fillRect(3, -2, 4, 2);
    }
    ctx.restore();

    // Estela de agua y velocidad
    ctx.fillStyle = 'rgba(202, 240, 248, 0.65)';
    ctx.fillRect(rx - 12, ry - 2, 8, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(rx - 8, ry - 1, 5, 2);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { drawKrakenBossWorld };
}
