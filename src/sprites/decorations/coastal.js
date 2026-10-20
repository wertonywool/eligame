// ============================================================================
// SPRITES MUNDO 3: DECORACIONES DE LA CIUDAD COSTERA Y MALECÓN
// ============================================================================
// Incluye:
// - Rascacielos iluminados de fondo (Skyscrapers)
// - Semáforos de tránsito (Traffic lights)
// - Farolas metropolitanas y de paseo marítimo (City lamps)
// - Palmeras costeras tropicales (Coastal palms)
// - Bancos de madera marina (Boardwalk benches)
// - Bocas de incendios (Fire hydrants)

SpriteManager.prototype.drawCoastalDecoration = function(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);

  if (d.type === 'city_skyscraper') {
    // Rascacielos metropolitano costero con fachada clara y ventanas reflectantes
    const w = d.w || 70;
    const h = d.h || 160;
    ctx.fillStyle = '#adb5bd';
    ctx.fillRect(px, py - h, w, h);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(px + 2, py - h + 2, w - 4, h - 2);

    // Retícula de ventanales reflectantes azul cielo y turquesa
    for (let wy = py - h + 8; wy < py - 12; wy += 14) {
      for (let wx = px + 6; wx < px + w - 8; wx += 11) {
        ctx.fillStyle = '#00b4d8';
        ctx.fillRect(wx, wy, 6, 7);
        ctx.fillStyle = '#caf0f8';
        ctx.fillRect(wx + 1, wy + 1, 3, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(wx + 1, wy + 1, 1, 1);
      }
    }
    // Antena / baliza de aviación en la cúspide
    ctx.fillStyle = '#6c757d';
    ctx.fillRect(px + Math.floor(w / 2) - 1, py - h - 14, 2, 14);
    const beaconPulse = Math.floor(frame * 0.15) % 2 === 0;
    ctx.fillStyle = beaconPulse ? '#ffffff' : '#ffd166';
    ctx.fillRect(px + Math.floor(w / 2) - 2, py - h - 16, 4, 3);
  } else if (d.type === 'traffic_light') {
    // Semáforo de avenida costera
    // Poste de soporte
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px + 3, py - 48, 4, 48);
    ctx.fillStyle = '#495057';
    ctx.fillRect(px + 4, py - 46, 2, 46);

    // Caja del semáforo
    ctx.fillStyle = '#212529';
    ctx.fillRect(px - 1, py - 66, 12, 22);
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px, py - 65, 10, 20);

    // Luces: Rojo (Stop), Amarillo (Precaución), Verde (Avance)
    const lightCycle = Math.floor(frame * 0.04) % 3;
    // Lente Roja
    ctx.fillStyle = (lightCycle === 0) ? '#e63946' : '#59161c';
    ctx.fillRect(px + 3, py - 63, 4, 4);
    if (lightCycle === 0) { ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 4, py - 62, 2, 2); }
    // Lente Amarilla
    ctx.fillStyle = (lightCycle === 1) ? '#ffbe0b' : '#664c05';
    ctx.fillRect(px + 3, py - 57, 4, 4);
    if (lightCycle === 1) { ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 4, py - 56, 2, 2); }
    // Lente Verde
    ctx.fillStyle = (lightCycle === 2) ? '#2a9d8f' : '#0f3d38';
    ctx.fillRect(px + 3, py - 51, 4, 4);
    if (lightCycle === 2) { ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 4, py - 50, 2, 2); }
  } else if (d.type === 'coastal_palm') {
    // Palmera tropical costera natural con tronco de madera y frondas verde esmeralda
    const h = d.h || 68;
    const sway = Math.sin(frame * 0.08 + px * 0.05) * 3;

    // Tronco anillado curvado en madera natural
    ctx.fillStyle = '#583110';
    ctx.fillRect(px + 3, py - h, 6, h);
    ctx.fillStyle = '#7f5539';
    ctx.fillRect(px + 4, py - h + 2, 4, h - 2);
    for (let ty = py - h + 6; ty < py - 6; ty += 8) {
      ctx.fillStyle = '#9c6644';
      ctx.fillRect(px + 3, ty, 6, 2);
    }

    // Hojas de palmera arqueadas en verde tropical meciéndose con la brisa
    const crownX = px + 6 + Math.round(sway);
    const crownY = py - h;
    ctx.fillStyle = '#2d6a4f';
    // Fronda izquierda
    ctx.fillRect(crownX - 22, crownY - 3, 20, 5);
    ctx.fillRect(crownX - 18, crownY + 2, 14, 4);
    // Fronda derecha
    ctx.fillRect(crownX + 2, crownY - 3, 20, 5);
    ctx.fillRect(crownX + 4, crownY + 2, 14, 4);
    // Fronda central alta
    ctx.fillRect(crownX - 6, crownY - 11, 12, 8);
    // Brillos de luz en verde lima y esmeralda viva
    ctx.fillStyle = '#40916c';
    ctx.fillRect(crownX - 16, crownY - 2, 14, 2);
    ctx.fillRect(crownX + 3, crownY - 2, 14, 2);
    ctx.fillStyle = '#52b788';
    ctx.fillRect(crownX - 4, crownY - 8, 8, 2);
    ctx.fillStyle = '#74c69d';
    ctx.fillRect(crownX - 2, crownY - 6, 4, 1);
    // Cocos tropicales
    ctx.fillStyle = '#583110';
    ctx.fillRect(crownX - 2, crownY - 1, 4, 4);
  } else if (d.type === 'coastal_bench') {
    // Banco de madera de teca del paseo marítimo
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px, py - 12, 28, 12);
    ctx.fillStyle = '#b57639';
    ctx.fillRect(px + 2, py - 11, 24, 4); // Respaldo
    ctx.fillStyle = '#c48b4f';
    ctx.fillRect(px + 2, py - 6, 24, 3);  // Asiento
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 4, py - 10, 20, 1);
    // Patas de hierro fundido
    ctx.fillStyle = '#212529';
    ctx.fillRect(px + 3, py - 3, 3, 3);
    ctx.fillRect(px + 22, py - 3, 3, 3);
  } else if (d.type === 'fire_hydrant') {
    // Boca de incendios urbana clásica
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px + 2, py - 16, 10, 16);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 3, py - 15, 8, 14);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 4, py - 14, 6, 2); // Cúpula
    ctx.fillRect(px + 5, py - 9, 4, 3);  // Tuerca de manguera
    ctx.fillStyle = '#ced4da';
    ctx.fillRect(px + 1, py - 10, 12, 3); // Boquillas cromadas
  }

  if (typeof this.drawBeachDecoration === 'function') {
    this.drawBeachDecoration(ctx, d, frame);
  }
  if (typeof this.drawResortDecoration === 'function') {
    this.drawResortDecoration(ctx, d, frame);
  }
  if (typeof this.drawOfficeDecoration === 'function') {
    this.drawOfficeDecoration(ctx, d, frame);
  }
  if (typeof this.drawTsunamiDecoration === 'function') {
    this.drawTsunamiDecoration(ctx, d, frame);
  }
};
