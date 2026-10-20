// ============================================================================
// SPRITES MUNDO 3: EFECTOS DE IMPULSO ACUÁTICO Y NAVEGACIÓN EN OLAS
// ============================================================================
// Incluye:
// - Chorro de propulsión hidrodinámica de alta presión (Twin Hydro-Jets)
// - Ola de corte en proa (Bow Wave) y anillo de cavitación supersónico
// - Estela de espuma blanca marina, burbujas y siluetas de velocidad (Ghost Trails)

SpriteManager.prototype.drawSurfSpray = function(ctx, x, y, facingRight, isImpulse, frame) {
  ctx.save();
  const dir = facingRight ? 1 : -1;
  const tailX = x - dir * 18;
  const tailY = y + 21;
  const bowX = x + dir * 20;
  const bowY = y + 21;

  if (isImpulse) {
    // ========================================================================
    // 🚀 WATER DASH: CHORRO DE PROPULSIÓN HIDRODINÁMICA A MÁXIMA POTENCIA
    // ========================================================================

    // 1. Doble cono de eyección de agua a alta presión hacia atrás
    for (let i = 0; i < 9; i++) {
      const dist = 10 + i * 8 + ((frame * 3 + i * 11) % 22);
      const spread = Math.sin(frame * 0.45 + i * 0.8) * (3 + i * 1.8);
      const px = tailX - dir * dist;
      const py = tailY + spread;

      // Núcleo de agua marina presurizada en azul marino
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(Math.round(px), Math.round(py + 1), 6, 4);
      // Chorro intermedio en turquesa vibrante y cyan
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(Math.round(px + dir * 2), Math.round(py), 5, 3);
      ctx.fillStyle = '#48cae4';
      ctx.fillRect(Math.round(px + dir * 4), Math.round(py), 3, 2);

      // Gotas y burbujas de espuma blanca marina
      ctx.fillStyle = (i % 2 === 0) ? '#ffffff' : '#caf0f8';
      ctx.fillRect(Math.round(px - dir), Math.round(py - 1), 2, 2);
    }

    // 2. Anillo de cavitación supersónico en popa (Onda de choque al acelerar)
    const ringRadius = 6 + (frame % 8) * 2;
    const ringAlpha = (1 - (frame % 8) / 8) * 0.6;
    const ringColor = `rgba(0, 180, 216, ${ringAlpha.toFixed(2)})`;
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(tailX - dir * 4, tailY + 1, ringRadius, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Ola de proa afilada (Bow Wave) cortando el mar como una flecha
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bowX + dir * 2, bowY - 2, 5, 4);
    ctx.fillRect(bowX + dir * 6, bowY - 4, 4, 3);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(bowX + dir * 1, bowY, 6, 2);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(bowX + dir * 4, bowY + 2, 5, 2);

    // Salpicaduras aerodinámicas proyectadas hacia arriba a los lados
    for (let s = 0; s < 3; s++) {
      const splashX = bowX + dir * (4 + s * 4);
      const splashY = bowY - 5 - s * 3 - ((frame + s * 2) % 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(splashX), Math.round(splashY), 2, 2);
    }

    // 4. Manto superficial de estela blanca (Wake) con líneas de velocidad
    for (let w = 0; w < 5; w++) {
      const wakeX = tailX - dir * (6 + w * 14);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(wakeX), tailY + 3, 9, 2);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(Math.round(wakeX + dir * 3), tailY + 5, 6, 1);
    }

  } else {
    // ========================================================================
    // 🌊 SURFING NORMAL: DESLIZAMIENTO FLUIDO CON OLEAJE Y BRISA MARINA
    // ========================================================================
    const waveBob = Math.sin(frame * 0.22) * 2;

    // Salpicadura suave en popa (Estela de quillas)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(tailX - dir * 6, tailY + Math.round(waveBob), 4, 2);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(tailX - dir * 3, tailY + 1 + Math.round(waveBob), 5, 2);
    ctx.fillRect(tailX - dir * 8, tailY + 2, 3, 1);

    // Arco de corte tenue en proa
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bowX + dir, bowY + Math.round(waveBob * 0.5), 4, 2);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(bowX, bowY + 1, 3, 1);
  }

  ctx.restore();
};
