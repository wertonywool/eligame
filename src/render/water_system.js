// ============================================================================
// SISTEMA REALISTA DE AGUA, OLAS Y MEGATSUNAMI (CANVAS 2D 16-BIT)
// ============================================================================
// Simulación hidrodinámica avanzada basada en ondas trocoidales y Gerstner
// con movimiento orbital, oleaje violento de gran masa, crestas empinadas,
// rompientes con espuma en cascada, cáusticas submarinas, estela de surf
// y spray pulverizado en suspensión.

// 1. CÁLCULO DE DESPLAZAMIENTO TROCOIDAL / GERSTNER MULTI-ARMÓNICO
function getOceanWaveDisplacement(worldX, time, intensity = 1.0) {
  // Armónico 1: Gran masa de marea y swell oceánico profundo
  const theta1 = worldX * 0.026 - time * 3.4;
  const cos1 = Math.cos(theta1);
  // Agudizamiento trocoidal: crestas afiladas y valles anchos
  const h1 = (cos1 > 0 ? Math.pow(cos1, 2.0) : -Math.pow(-cos1, 0.85)) * 9.5;

  // Armónico 2: Rompiente empinada que avanza rápido
  const theta2 = worldX * 0.065 - time * 5.6 + 1.1;
  const cos2 = Math.cos(theta2);
  const h2 = (cos2 > 0 ? Math.pow(cos2, 1.5) : -Math.pow(-cos2, 0.9)) * 5.2;

  // Armónico 3: Contrapicada turbulenta que rompe la regularidad
  const theta3 = worldX * 0.14 + time * 4.2;
  const h3 = Math.sin(theta3) * 2.8;

  // Armónico 4: Micro-ondas de viento y espuma picada
  const theta4 = worldX * 0.28 - time * 7.5;
  const h4 = Math.sin(theta4) * 1.4;

  return (h1 + h2 + h3 + h4) * intensity;
}

// 2. RENDERIZADO DE CUERPOS DE AGUA Y LAGUNAS DE SURF (PLATAFORMAS DE AGUA)
function drawRealisticWaterPlatform(ctx, p, frame) {
  const t = frame * 0.052;
  const step = 4; // Muestreo denso de 4px para curvas hiper-suaves a 60 FPS

  // Fondo base abisal o lecho marino
  const isDeepOcean = (p.isWater || p.subType === 'ocean_water' || p.x >= 15000);
  if (isDeepOcean) {
    ctx.fillStyle = '#001233';
    ctx.fillRect(p.x - 2, p.y + 6, p.w + 4, p.h);
  } else {
    // Lecho arenoso solo en la base inferior de charcos someros
    ctx.fillStyle = '#9c6644';
    ctx.fillRect(p.x, p.y + p.h - 8, p.w, 8);
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(p.x, p.y + p.h - 4, p.w, 4);
  }

  // Comprobar interacción del jugador con el agua
  const hasPlayer = (typeof player !== 'undefined' && player) &&
                    (player.x + player.w >= p.x - 12 && player.x <= p.x + p.w + 12);
  const playerSurfX = hasPlayer ? (player.x + player.w * 0.5) : -9999;
  const isSurfingSpeed = hasPlayer && player.isSurfing && Math.abs(player.vx) > 30;
  const isDashing = hasPlayer && player.dashTimer > 0;

  // Muestreo de la superficie con solape de 3px para costuras 100% invisibles
  const points = [];
  const startX = p.x - 2;
  const endX = p.x + p.w + 2;
  for (let wx = startX; wx <= endX; wx += step) {
    let waveDy = getOceanWaveDisplacement(wx, t, 1.0);

    // Interacción con la tabla de surf:
    // Arco de proa levantado hacia adelante + surco hidrodinámico profundo bajo la quilla
    if (hasPlayer) {
      const relX = wx - playerSurfX;
      const dist = Math.abs(relX);
      if (dist < 32) {
        const bowDir = player.facingRight ? 1 : -1;
        // La proa empuja agua hacia arriba formando la ola de proa
        if (relX * bowDir > 4 && relX * bowDir < 22) {
          waveDy -= (1 - Math.abs(relX * bowDir - 12) / 10) * 3.5;
        }
        // La popa y el peso hunden la superficie
        if (dist < 18) {
          waveDy += (1 - dist / 18) * (isDashing ? 6.5 : 4.5);
        }
      }
    }

    const sy = p.y + 3 + waveDy;
    points.push({ x: wx, y: sy, dy: waveDy });
  }

  // A. Gran masa de agua oceánica profunda (Gradiente abisal multicapa)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(startX, p.y + p.h + 2);
  ctx.lineTo(startX, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineTo(endX, p.y + p.h + 2);
  ctx.closePath();

  // Gradiente vertical oceánico profundo: luz turquesa superficial -> azul abisal
  const waterGrad = ctx.createLinearGradient(0, p.y - 12, 0, p.y + p.h);
  waterGrad.addColorStop(0, '#90e0ef');    // Luz solar incidiendo en crestas
  waterGrad.addColorStop(0.12, '#48cae4'); // Turquesa caribeño brillante
  waterGrad.addColorStop(0.32, '#00b4d8'); // Turquesa vivo profundo
  waterGrad.addColorStop(0.62, '#0077b6'); // Azul marino intenso
  waterGrad.addColorStop(0.88, '#023e8a'); // Azul océano profundo
  waterGrad.addColorStop(1, '#001845');    // Fondo abisal
  ctx.fillStyle = waterGrad;
  ctx.fill();

  // B. Cáusticas submarinas y redes de luz solar refractada
  ctx.clip(); // Limitar cáusticas al interior del agua
  ctx.fillStyle = 'rgba(202, 240, 248, 0.26)';
  for (let cx = p.x - 24; cx < p.x + p.w + 36; cx += 20) {
    const shift = Math.sin(t * 2.2 + cx * 0.12) * 8;
    ctx.beginPath();
    ctx.moveTo(cx + shift, p.y);
    ctx.lineTo(cx + shift + 14, p.y);
    ctx.lineTo(cx + shift + 4, p.y + p.h);
    ctx.lineTo(cx + shift - 10, p.y + p.h);
    ctx.closePath();
    ctx.fill();
  }

  // Vórtices y burbujas de aire atrapadas bajo el agua
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  for (let bx = p.x + 6; bx < p.x + p.w - 6; bx += 22) {
    const bubbleY = p.y + p.h - 4 - ((frame * 1.8 + bx * 9) % Math.max(12, p.h - 8));
    const bubbleWav = Math.sin(t * 2.5 + bx * 0.4) * 3;
    ctx.fillRect(bx + bubbleWav, bubbleY, 2, 2);
    if (bx % 44 === 0) {
      ctx.fillRect(bx + bubbleWav + 1, bubbleY - 4, 1, 1);
    }
  }
  ctx.restore();

  // C. Capa de volumen y sombra bajo las crestas (Efecto tridimensional)
  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    const isCrest = pt.dy < -2.0;       // Cresta levantada
    const isViolentPeak = pt.dy < -5.5; // Pico violento y espumoso

    // Sombra profunda bajo la masa de la cresta
    ctx.fillStyle = 'rgba(3, 4, 94, 0.65)';
    ctx.fillRect(pt.x, pt.y + 4, step, 4);

    // Manto translúcido de la ola
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(pt.x, pt.y + 1, step, 3);
    ctx.fillStyle = '#48cae4';
    ctx.fillRect(pt.x, pt.y, step, 2);

    // D. Rompiente espumosa violenta en las crestas (Whitecap / Foam Lip)
    if (isCrest) {
      // Espuma turquesa claro
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(pt.x, pt.y - 2, step, 4);

      // Labio de espuma blanca pura y espesa
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(pt.x, pt.y - 3, step, 3);

      // Espuma deslizándose en cascada hacia el valle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fillRect(pt.x + 1, pt.y + 2, step - 1, 3);

      // E. Salpicaduras violentas y gotas de spray en picos agudos
      if (isViolentPeak) {
        const sprayOff = ((frame * 2 + i * 7) % 5);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(pt.x + 1, pt.y - 6 - sprayOff, 2, 2);
        ctx.fillRect(pt.x + 3, pt.y - 4, 2, 2);
        ctx.fillStyle = '#caf0f8';
        ctx.fillRect(pt.x - 1, pt.y - 5, 2, 2);
      }
    } else {
      // Agua reflectante en los valles
      ctx.fillStyle = '#90e0ef';
      ctx.fillRect(pt.x, pt.y - 1, step, 1.5);
    }
  }

  // F. Estela violenta de la tabla de surf en el agua
  if (isSurfingSpeed) {
    const wakeDir = player.facingRight ? -1 : 1;
    // Chorro de propulsión y spray expulsado hacia atrás
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(playerSurfX + wakeDir * 16, p.y + 1, 14, 4);
    ctx.fillRect(playerSurfX + wakeDir * 28, p.y - 1, 10, 3);
    ctx.fillRect(playerSurfX + wakeDir * 36, p.y - 3, 6, 2);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(playerSurfX + wakeDir * 12, p.y + 4, 18, 3);
    ctx.fillRect(playerSurfX + wakeDir * 24, p.y + 2, 12, 2);

    // Salpicaduras de spray lateral
    if (frame % 2 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(playerSurfX + wakeDir * 20, p.y - 5, 3, 3);
      ctx.fillRect(playerSurfX + wakeDir * 32, p.y - 7, 2, 2);
    }
  }

  // G. Rompiente costera de arena en los extremos de la orilla
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(p.x, p.y - 1, 6, 4);
  ctx.fillRect(p.x + p.w - 6, p.y - 1, 6, 4);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(p.x + 4, p.y + 1, 5, 3);
  ctx.fillRect(p.x + p.w - 9, p.y + 1, 5, 3);
}

// 3. RENDERIZADO DEL MEGATSUNAMI VIOLENTO Y COLOSAL (PARED DE AGUA EN FASES 4 Y 5)
function drawRealisticTsunamiWall(ctx, x, y, w, h, frame) {
  const px = Math.round(x);
  const py = Math.round(y);
  const t = frame * 0.058;

  // Oleaje de masa violenta colosal
  const surgeHeight = Math.max(h, 60);
  const bobSurge = Math.sin(t * 1.6 + x * 0.02) * 6;

  // A. Gran cuerpo de agua abisal de la pared del tsunami
  const waveGrad = ctx.createLinearGradient(px, py - 24, px, py + surgeHeight);
  waveGrad.addColorStop(0, '#90e0ef');    // Cresta que refracta luz solar
  waveGrad.addColorStop(0.12, '#00b4d8'); // Turquesa vivo
  waveGrad.addColorStop(0.3, '#0077b6');  // Azul marino profundo
  waveGrad.addColorStop(0.65, '#023e8a'); // Azul océano abisal
  waveGrad.addColorStop(1, '#001233');    // Negro oceánico colosal
  ctx.fillStyle = waveGrad;
  ctx.fillRect(px, py + bobSurge, w, surgeHeight);

  // B. Corrientes submarinas y vórtices violentos dentro de la pared de agua
  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py + bobSurge, w, surgeHeight);
  ctx.clip();

  for (let vx = px - 12; vx < px + w + 16; vx += 22) {
    const vOffset = Math.sin(t * 2.4 + vx * 0.1) * 8;
    ctx.fillStyle = 'rgba(144, 224, 239, 0.3)';
    ctx.fillRect(vx + vOffset, py + 8 + bobSurge, 18, 4);
    ctx.fillStyle = 'rgba(2, 62, 138, 0.55)';
    ctx.fillRect(vx - vOffset, py + 20 + bobSurge, 22, 5);
    ctx.fillStyle = 'rgba(0, 180, 216, 0.28)';
    ctx.fillRect(vx + vOffset * 1.5, py + 34 + bobSurge, 16, 3);
  }
  ctx.restore();

  // C. Labio superior curvo y violento que se desploma hacia adelante
  const step = 4;
  for (let ox = 0; ox < w; ox += step) {
    const curX = px + ox;
    const waveCurl = Math.sin(t * 3.4 + curX * 0.12) * 5.5 +
                     Math.cos(t * 1.9 + curX * 0.07) * 3.8;
    const crestY = py + bobSurge + Math.round(waveCurl);

    // Sombra profunda bajo el tubo del tsunami
    ctx.fillStyle = '#03045e';
    ctx.fillRect(curX, crestY + 6, step, 6);

    // Manto translúcido de la ola
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(curX, crestY + 2, step, 5);

    // Labio de espuma turquesa claro
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(curX, crestY - 1, step, 4);

    // Espuma blanca pura violenta
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(curX, crestY - 4, step, 3);

    // Pulverización de spray marino masivo al viento
    if ((frame + ox) % 3 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(curX + 1, crestY - 9, 2, 2);
      ctx.fillRect(curX + 3, crestY - 14, 2, 2);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(curX - 1, crestY - 7, 2, 2);
    }
  }

  // D. Base de agua revuelta espumosa (chocando con escombros / suelo)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.fillRect(px, py + surgeHeight - 8, w, 8);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px, py + surgeHeight - 4, w, 4);
}

// 4. RENDERIZADO DE OLAS TUBULARES DE SURF (SURF WAVE CREST - KAI SURF)
function drawRealisticSurfWave(ctx, wave, frame) {
  const wx = Math.round(wave.x);
  const wy = Math.round(wave.y);
  const t = frame * 0.15 + (wave.id || 0) * 1.6;
  const bob = Math.sin(t) * 4.0;

  // 1. Sombra marina profunda bajo el tubo
  ctx.fillStyle = 'rgba(2, 62, 138, 0.6)';
  ctx.beginPath();
  ctx.ellipse(wx + 16, wy + 4, 20, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Pared del tubo (Concavidad en azul marino profundo)
  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.moveTo(wx + 32, wy + 2);
  ctx.quadraticCurveTo(wx + 16, wy - 24 + bob, wx - 6, wy - 32 + bob);
  ctx.lineTo(wx - 12, wy - 22 + bob);
  ctx.quadraticCurveTo(wx + 4, wy - 2, wx + 6, wy + 2);
  ctx.closePath();
  ctx.fill();

  // 3. Interior del tubo translúcido (Luz solar filtrándose por el pocket)
  ctx.fillStyle = '#00b4d8';
  ctx.beginPath();
  ctx.moveTo(wx + 22, wy);
  ctx.quadraticCurveTo(wx + 12, wy - 20 + bob, wx - 3, wy - 27 + bob);
  ctx.lineTo(wx - 8, wy - 21 + bob);
  ctx.quadraticCurveTo(wx + 6, wy - 4, wx + 10, wy);
  ctx.closePath();
  ctx.fill();

  // 4. Labio cayendo hacia adelante (Pitching Lip)
  ctx.fillStyle = '#48cae4';
  ctx.beginPath();
  ctx.moveTo(wx - 4, wy - 28 + bob);
  ctx.quadraticCurveTo(wx + 2, wy - 33 + bob, wx + 9, wy - 24 + bob);
  ctx.lineTo(wx + 5, wy - 20 + bob);
  ctx.quadraticCurveTo(wx, wy - 25 + bob, wx - 5, wy - 24 + bob);
  ctx.closePath();
  ctx.fill();

  // 5. Espuma blanca pura explosiva en la cresta
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(wx - 9, wy - 34 + Math.round(bob), 16, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(wx - 7, wy - 36 + Math.round(bob), 13, 5);
  ctx.fillRect(wx + 5, wy - 29 + Math.round(bob), 6, 4);

  // 6. Chorro de spray (Spit) y gotas en suspensión
  const sprayAnim = (frame * 2 + (wave.id || 0) * 11) % 6;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(wx - 14 + sprayAnim, wy - 41 + Math.round(bob), 3, 3);
  ctx.fillRect(wx - 7 - sprayAnim, wy - 44 + Math.round(bob), 2, 2);
  ctx.fillRect(wx + 10 + sprayAnim, wy - 32 + Math.round(bob), 2, 2);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(wx + 14, wy - 27 + Math.round(bob), 2, 2);
}

// 5. RENDERIZADO DEL HORIZONTE OCEÁNICO EN PARALLAX (DÍA SOLEADO)
function drawRealisticOceanHorizon(ctx, horizonY, seaHeight, cameraX, frame) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  const t = frame * 0.045;

  // A. Gradiente del mar en el horizonte (Azul zafiro a turquesa brillante)
  const seaGrad = ctx.createLinearGradient(0, horizonY, 0, horizonY + seaHeight);
  seaGrad.addColorStop(0, '#0077b6');   // Zafiro horizonte
  seaGrad.addColorStop(0.28, '#0096c7'); // Azul cerúleo
  seaGrad.addColorStop(0.68, '#00b4d8'); // Turquesa radiante
  seaGrad.addColorStop(1, '#48cae4');   // Turquesa caribeño
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, horizonY, W, seaHeight);

  // B. Reflejo del sol sobre el agua (Sun Glitter Path)
  const sunGlintX = Math.round(W * 0.76);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.68)';
  for (let ry = horizonY + 2; ry < horizonY + seaHeight; ry += 3) {
    const depthRatio = (ry - horizonY) / seaHeight;
    const rw = Math.round((16 + ((ry * 17) % 32)) * (0.8 + depthRatio * 1.3));
    const waveGlitter = Math.sin(t * 3.2 + ry * 0.5) * 4;
    ctx.fillRect(sunGlintX - Math.floor(rw / 2) + Math.round(waveGlitter), ry, rw, 1.3);
  }

  // C. Filas escalonadas de oleaje oceánico (Swells de horizonte)
  // Fila 1: Olas distantes
  ctx.fillStyle = '#005f73';
  for (let wx = 0; wx < W; wx += 28) {
    const swell1 = Math.sin(t * 1.6 + (wx + cameraX * 0.08) * 0.06) * 2.0;
    ctx.fillRect(wx, horizonY + 5 + Math.round(swell1), 28, 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.fillRect(wx + 8, horizonY + 5 + Math.round(swell1), 12, 1);
    ctx.fillStyle = '#005f73';
  }

  // Fila 2: Olas intermedias con crestas de espuma blanca
  for (let wx = 0; wx < W; wx += 22) {
    const swell2 = Math.sin(t * 2.4 + (wx + cameraX * 0.14) * 0.09) * 3.2;
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(wx, horizonY + 18 + Math.round(swell2), 22, 3);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(wx + 4, horizonY + 17 + Math.round(swell2), 14, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx + 6, horizonY + 16 + Math.round(swell2), 9, 1.5);
  }

  // Fila 3: Olas cercanas con rompiente turbulenta y espuma gruesa
  for (let wx = 0; wx < W; wx += 16) {
    const swell3 = Math.sin(t * 3.0 + (wx + cameraX * 0.22) * 0.12) * 4.2;
    ctx.fillStyle = '#0096c7';
    ctx.fillRect(wx, horizonY + 34 + Math.round(swell3), 16, 5);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(wx + 2, horizonY + 33 + Math.round(swell3), 12, 2.5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx + 3, horizonY + 31 + Math.round(swell3), 9, 2);
  }
}

// Exportación modular
if (typeof module !== 'undefined') {
  module.exports = {
    getOceanWaveDisplacement,
    drawRealisticWaterPlatform,
    drawRealisticTsunamiWall,
    drawRealisticSurfWave,
    drawRealisticOceanHorizon
  };
}
