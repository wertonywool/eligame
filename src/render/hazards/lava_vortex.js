// ============================================================================
// VÓRTICE DE LLAMAS ROSAS OSCURAS (CASCADAS Y PAREDES DE LAVA DEL VOLCÁN)
// ============================================================================
// Efecto de vórtice ciclónico 3D con 4 hebras de fuego helicoidales entrelazadas,
// núcleo incandescente blanco/magenta, ascuas orbitales y brocales de obsidiana.

function drawLavaWall(lw) {
  if (lw.x + lw.w < cameraX - 50 || lw.x > cameraX + W + 50) return;

  const cx = Math.round(lw.x + lw.w / 2);
  const halfW = lw.w / 2;
  const topY = lw.y;
  const botY = lw.y + lw.h;

  // 1. Silueta exterior y aura de sombra oscura / vacío
  ctx.fillStyle = '#0c020e';
  ctx.fillRect(lw.x - 3, topY, lw.w + 6, lw.h);

  // 2. Fondo del cuerpo de magma: vino oscuro y borgoña profundo
  ctx.fillStyle = '#2c041c';
  ctx.fillRect(lw.x - 1, topY, lw.w + 2, lw.h);
  ctx.fillStyle = '#5c0c2e';
  ctx.fillRect(lw.x + 1, topY, lw.w - 2, lw.h);

  // 3. VÓRTICE HELICOIDAL 3D (4 hebras entrelazadas que giran en espiral)
  const strandCount = 4;
  const stepY = 3;

  for (let s = 0; s < strandCount; s++) {
    const strandPhase = s * (Math.PI * 2 / strandCount);

    for (let y = topY; y < botY - stepY; y += stepY) {
      // Ángulo de rotación del vórtice dependiente de la altura y el tiempo
      const angle = (y * 0.075) - (globalFrame * 0.16) + strandPhase;
      const sinA = Math.sin(angle);
      const cosA = Math.cos(angle);

      // Posición horizontal de la hebra dentro de la columna
      const sx = Math.round(cx + sinA * (halfW - 3));

      if (cosA < -0.2) {
        // Hebra en la parte POSTERIOR del vórtice (sombra carmesí profunda)
        ctx.fillStyle = '#7a103c';
        ctx.fillRect(sx - 1, y, 2, stepY);
      } else {
        // Hebra en la parte FRONTAL del vórtice (brillante y expansiva)
        const frontWidth = cosA > 0.6 ? 4 : 3;
        
        // Capa base de llama rosa oscura
        ctx.fillStyle = '#b31b52';
        ctx.fillRect(sx - Math.floor(frontWidth / 2), y, frontWidth, stepY);

        // Filamento ígneo magenta vivo
        ctx.fillStyle = '#ff2a70';
        ctx.fillRect(sx - 1, y, 2, stepY);

        // Cresta incandescente blanca/rosa pastel en el ápice del giro
        if (cosA > 0.75) {
          ctx.fillStyle = (y + globalFrame) % 6 < 3 ? '#ffffff' : '#ffcad4';
          ctx.fillRect(sx, y, 1, stepY);
        }
      }
    }
  }

  // 4. Núcleo central palpitante (Ojo del Vórtice)
  const corePulse = Math.sin(globalFrame * 0.18) * 1.5;
  const coreW = Math.max(2, Math.round(halfW * 0.45 + corePulse));
  ctx.fillStyle = 'rgba(179, 27, 82, 0.6)';
  ctx.fillRect(cx - Math.floor(coreW / 2), topY, coreW, lw.h);
  ctx.fillStyle = 'rgba(255, 42, 112, 0.45)';
  ctx.fillRect(cx - 1, topY, 2, lw.h);

  // 5. Ascuas orbitales que ascienden en espiral ciclónica alrededor del vórtice
  const emberCount = 6;
  for (let i = 0; i < emberCount; i++) {
    const orbitSpeed = 0.12 + (i % 3) * 0.02;
    const orbAng = globalFrame * orbitSpeed + (i * Math.PI * 2 / emberCount);
    const riseY = (topY + lw.h - ((globalFrame * 1.8 + i * 22) % lw.h));
    const orbRadius = halfW + 3 + Math.sin(globalFrame * 0.1 + i) * 2;
    const ex = Math.round(cx + Math.cos(orbAng) * orbRadius);
    const inFront = Math.sin(orbAng) > 0;

    if (inFront) {
      ctx.fillStyle = i % 2 === 0 ? '#ffffff' : '#ffcad4';
      ctx.fillRect(ex, Math.round(riseY), 2, 2);
    } else {
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(ex, Math.round(riseY), 1, 1);
    }
  }

  // 6. Brocal superior de roca volcánica (Gárgola / Dintel de Obsidiana)
  ctx.fillStyle = '#07020a';
  ctx.fillRect(lw.x - 5, topY - 5, lw.w + 10, 7);
  ctx.fillStyle = '#26041c';
  ctx.fillRect(lw.x - 3, topY - 4, lw.w + 6, 5);
  ctx.fillStyle = '#b31b52';
  ctx.fillRect(lw.x + 2, topY - 1, lw.w - 4, 2);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(cx - 2, topY - 2, 4, 2);

  // 7. Base de impacto y salpicadura ciclónica (Espuma de magma rosa)
  const splashWave = Math.sin(globalFrame * 0.22) * 2;
  ctx.fillStyle = '#07020a';
  ctx.fillRect(lw.x - 6, botY - 3, lw.w + 12, 6);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(lw.x - 4, botY - 2, lw.w + 8, 4);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(lw.x - 2 + Math.round(splashWave), botY - 1, lw.w + 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - 3, botY - 1, 6, 2);
}
