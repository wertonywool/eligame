// ============================================================================
// 🌸 LIRIOS DE DEXTER FÍSICOS (BOTÍN DE ENEMIGOS ESTILO "GEO" DE HOLLOW KNIGHT)
// ============================================================================
function spawnDroppedLilies(x, y, count) {
  for (let i = 0; i < count; i++) {
    const spread = (i - (count - 1) / 2) * 34 + (Math.random() - 0.5) * 30;
    droppedLilies.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y - 4,
      vx: spread,
      vy: -135 - Math.random() * 65,
      pickupDelay: 0.16,
      life: 30
    });
  }
}

function updateDroppedLilies(dt) {
  for (let i = droppedLilies.length - 1; i >= 0; i--) {
    const dl = droppedLilies[i];
    if (dl.pickupDelay > 0) dl.pickupDelay -= dt;
    dl.life -= dt;

    // Física de caída y rebote sobre las plataformas
    const prevBottom = dl.y + 8;
    dl.vy += 490 * dt;
    if (dl.vy > 320) dl.vy = 320;
    dl.x += dl.vx * dt;
    dl.y += dl.vy * dt;

    for (const p of level.platforms) {
      if (dl.x + 8 > p.x && dl.x < p.x + p.w && prevBottom <= p.y + 8 && dl.y + 8 >= p.y) {
        dl.y = p.y - 8;
        if (Math.abs(dl.vy) > 50) {
          dl.vy = -dl.vy * 0.42;
          dl.vx *= 0.65;
        } else {
          dl.vy = 0;
          dl.vx *= 0.78;
        }
      }
    }

    // Atracción magnética suave al acercarse Mamá Ratón
    if (dl.pickupDelay <= 0) {
      const attractRadius = saveState.upgrades.cheeseMagnet ? 80 : 34;
      const dx = (player.x + 11) - (dl.x + 4);
      const dy = (player.y + 12) - (dl.y + 4);
      const dist = Math.hypot(dx, dy);
      if (dist < attractRadius && dist > 1) {
        dl.x += (dx / dist) * 190 * dt;
        dl.y += (dy / dist) * 190 * dt;
      }

      // Recolección inmediata en el acto (se suma directo a saveState.dexterLilies)
      if (rectOverlap(player.x - 3, player.y - 3, player.w + 6, player.h + 6, dl.x, dl.y, 9, 9)) {
        const gain = saveState.upgrades.flowerHarvest ? 2 : 1;
        saveState.dexterLilies = (saveState.dexterLilies || 0) + gain;
        score += 50 * gain;
        persistSave();
        window.sfx.playCheese();
        spawnParticles(dl.x + 4, dl.y + 4, 7, '#ff8fab', 55, 35);
        spawnParticles(dl.x + 4, dl.y + 4, 4, '#ffffff', 45, 25);
        spawnStarSparkles(dl.x + 4, dl.y + 4, 4, '#ffccd5');
        spawnFloatingText(dl.x - 4, dl.y - 6, '+1 🌸', '#ff8fab');
        droppedLilies.splice(i, 1);
        continue;
      }
    }

    if (dl.life <= 0 || dl.y > level.worldHeight + 50) {
      droppedLilies.splice(i, 1);
    }
  }
}

