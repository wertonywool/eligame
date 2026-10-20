// ============================================================================
// PORTÓN DEL CASTILLO DEL JEFE (OMNI-MAN / CASTLE GATE)
// ============================================================================

function drawBossCastleGate(gate) {
  const gx = Math.round(gate.x);
  const gy = Math.round(gate.y);
  const gw = gate.w;
  const gh = gate.h;

  ctx.fillStyle = '#07020a';
  ctx.fillRect(gx - 6, gy - 14, gw + 12, 16);
  ctx.fillStyle = '#26041c';
  ctx.fillRect(gx - 4, gy - 12, gw + 8, 12);
  ctx.fillStyle = bossFightActive ? '#ff2a70' : '#ffd166';
  ctx.fillRect(gx + 4, gy - 8, gw - 8, 4);

  if (bossFightActive && omniMen.length > 0) {
    ctx.fillStyle = 'rgba(12, 2, 14, 0.95)';
    ctx.fillRect(gx, gy, gw, gh);

    for (let bx = gx + 2; bx < gx + gw - 2; bx += 5) {
      ctx.fillStyle = '#07020a';
      ctx.fillRect(bx, gy, 3, gh);
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(bx + 1, gy, 1, gh);
    }
    for (let by = gy + 14; by < gy + gh - 8; by += 22) {
      ctx.fillStyle = '#26041c';
      ctx.fillRect(gx, by, gw, 5);
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(gx + 2, by + 1, gw - 4, 2);
    }
  } else {
    ctx.fillStyle = '#07020a';
    ctx.fillRect(gx + 2, gy, gw - 4, 18);
    for (let bx = gx + 3; bx < gx + gw - 2; bx += 5) {
      ctx.fillStyle = '#5c0c2e';
      ctx.fillRect(bx, gy, 3, 22);
    }
  }
}
