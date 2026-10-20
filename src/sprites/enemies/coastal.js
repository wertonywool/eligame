// ============================================================================
// SPRITES MUNDO 3: ENEMIGOS ÚNICOS DE LA CIUDAD COSTERA
// ============================================================================
// Incluye:
// - Cangrejo Costero (Cangrejo pellizcador con tenazas animadas)
// - Carro Urbano (Cruiser metropolitano veloz con faros de xenón y luces traseras)
// - Gaviota Costera (Ave marina planeando con aleteo suave)

SpriteManager.prototype.drawCoastalCrab = function(ctx, x, y, facingRight, frame) {
  const px = Math.round(x);
  const py = Math.round(y);
  const step = Math.floor(frame * 0.22) % 2;
  const pinch = Math.sin(frame * 0.28) * 2;

  // 1. Patitas laterales de cangrejo (caminando de lado)
  ctx.fillStyle = '#9d0208';
  ctx.fillRect(px - 1, py + 8 + step, 4, 3);
  ctx.fillRect(px + 17, py + 8 + (1 - step), 4, 3);
  ctx.fillRect(px + 2, py + 11, 3, 2);
  ctx.fillRect(px + 15, py + 11, 3, 2);

  // 2. Caparazón acorazado rojo anaranjado de playa
  ctx.fillStyle = '#6a040f';
  ctx.fillRect(px + 2, py + 2, 16, 9);
  ctx.fillStyle = '#d00000';
  ctx.fillRect(px + 3, py + 3, 14, 7);
  ctx.fillStyle = '#e85d04';
  ctx.fillRect(px + 5, py + 4, 10, 4);
  ctx.fillStyle = '#f48c06';
  ctx.fillRect(px + 7, py + 4, 6, 2);

  // 3. Ojos en pedúnculos verticales saltones
  ctx.fillStyle = '#212529';
  ctx.fillRect(px + 5, py - 2, 3, 4);
  ctx.fillRect(px + 12, py - 2, 3, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 6, py - 2, 2, 2);
  ctx.fillRect(px + 13, py - 2, 2, 2);
  ctx.fillStyle = '#000000';
  ctx.fillRect(px + (facingRight ? 7 : 6), py - 2, 1, 1);
  ctx.fillRect(px + (facingRight ? 14 : 13), py - 2, 1, 1);

  // 4. Tenazas articuladas que chasquean (Pincers)
  const leftClawX = px - 2;
  const rightClawX = px + 16;
  const clawY = py + 3 + Math.round(pinch);

  ctx.fillStyle = '#e85d04';
  ctx.fillRect(leftClawX, clawY, 4, 4);
  ctx.fillRect(rightClawX, clawY, 4, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(leftClawX - 1, clawY - 1, 2, 2); // Puntas afiladas
  ctx.fillRect(rightClawX + 3, clawY - 1, 2, 2);
};

SpriteManager.prototype.drawCityCar = function(ctx, x, y, facingRight, frame) {
  const px = Math.round(x);
  const py = Math.round(y);
  const dir = facingRight ? 1 : -1;

  // 1. Chasis exterior aerodinámico (32px ancho, 14px alto)
  ctx.fillStyle = '#212529';
  ctx.fillRect(px, py + 2, 32, 11);
  // Cabina de pasajeros
  ctx.fillRect(px + (facingRight ? 7 : 9), py - 3, 16, 6);

  // 2. Pintura de carrocería en azul turquesa metalizado
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px + 1, py + 3, 30, 8);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 3, py + 4, 26, 4);
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px + 2, py + 7, 28, 1); // Franja lateral deportiva

  // 3. Ventanillas oscuras con reflejo de cielo soleado
  ctx.fillStyle = '#1d3557';
  ctx.fillRect(px + (facingRight ? 8 : 10), py - 2, 14, 5);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + (facingRight ? 16 : 11), py - 2, 5, 2); // Reflejo blanco/celeste

  // 4. Faros delanteros de xenón blanco brillante
  const headX = facingRight ? px + 29 : px + 1;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(headX, py + 4, 2, 3);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillRect(facingRight ? headX + 2 : headX - 6, py + 3, 6, 5); // Haz de luz

  // 5. Luces traseras de freno rojas
  const tailX = facingRight ? px + 1 : px + 29;
  ctx.fillStyle = '#e63946';
  ctx.fillRect(tailX, py + 4, 2, 3);

  // 6. Ruedas giratorias con llantas de aleación
  const wheelSpin = Math.floor(frame * 0.4) % 2;
  const w1X = px + 5;
  const w2X = px + 21;
  ctx.fillStyle = '#212529';
  ctx.fillRect(w1X, py + 10, 6, 5);
  ctx.fillRect(w2X, py + 10, 6, 5);
  ctx.fillStyle = wheelSpin ? '#ffffff' : '#ced4da';
  ctx.fillRect(w1X + 2, py + 12, 2, 2);
  ctx.fillRect(w2X + 2, py + 12, 2, 2);
};

SpriteManager.prototype.drawCoastalGull = function(ctx, x, y, frame) {
  const px = Math.round(x);
  const py = Math.round(y);
  const flap = Math.floor(frame * 0.28) % 2 === 0;

  // 1. Cuerpo y plumaje blanco puro
  ctx.fillStyle = '#495057';
  ctx.fillRect(px + 2, py + 2, 12, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 3, py + 3, 10, 4);
  ctx.fillStyle = '#e9ecef';
  ctx.fillRect(px + 4, py + 5, 6, 2); // Sombra del pecho

  // 2. Alas batientes con puntas grises
  ctx.fillStyle = '#495057';
  if (flap) {
    // Alas levantadas
    ctx.fillRect(px + 3, py - 4, 5, 6);
    ctx.fillRect(px + 8, py - 4, 5, 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 4, py - 3, 3, 4);
    ctx.fillRect(px + 9, py - 3, 3, 4);
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px + 4, py - 4, 2, 2); // Borde ala
    ctx.fillRect(px + 10, py - 4, 2, 2);
  } else {
    // Alas en planeo horizontal
    ctx.fillRect(px - 3, py + 1, 6, 3);
    ctx.fillRect(px + 13, py + 1, 6, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 2, py + 1, 5, 2);
    ctx.fillRect(px + 13, py + 1, 5, 2);
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px - 3, py + 1, 2, 2);
    ctx.fillRect(px + 17, py + 1, 2, 2);
  }

  // 3. Pico afilado amarillo dorado
  ctx.fillStyle = '#ffbe0b';
  ctx.fillRect(px + 13, py + 4, 3, 2);
  // Ojo negro
  ctx.fillStyle = '#000000';
  ctx.fillRect(px + 11, py + 3, 1, 1);
};
