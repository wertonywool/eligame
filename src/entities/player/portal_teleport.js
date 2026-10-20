// ============================================================================
// SISTEMA DE TELETRANSPORTE Y PISTOLA DE PORTALES
// ============================================================================
// Maneja la logica y maquina de estados del teletransporte: disparo,
// apertura del portal, entrada del jugador, corte de camara y salida en destino.

let portalTeleportState = null;

function isPortalTeleportActive() {
  return portalTeleportState !== null;
}

function isPortalPlayerHidden() {
  if (!portalTeleportState) return false;
  const p = portalTeleportState.phase;
  return p === 'close_in' || p === 'warp' || p === 'open_out';
}

function getPortalPlayerTransform() {
  if (!portalTeleportState) return null;
  return portalTeleportState.playerTransform || null;
}

function getCheckpointCoordinates(cpId) {
  if (!cpId || cpId === 0) {
    return {
      x: (level.playerSpawn && level.playerSpawn.x) || 100,
      y: (level.playerSpawn && level.playerSpawn.y) || 160
    };
  }
  const cp = (level.checkpoints || []).find(c => c.id === cpId);
  if (cp) {
    return { x: cp.x, y: cp.y - 26 };
  }
  return {
    x: (level.playerSpawn && level.playerSpawn.x) || 100,
    y: (level.playerSpawn && level.playerSpawn.y) || 160
  };
}

function startInLevelPortalTeleport(cpId) {
  if (portalTeleportState) return;
  const target = getCheckpointCoordinates(cpId);
  const dir = player.facingRight ? 1 : -1;
  const entryX = player.x + 11 + dir * 36;
  const entryY = player.y + 8;
  const exitX = target.x + 11 - dir * 22;
  const exitY = target.y + 8;

  portalTeleportState = {
    mode: 'in_level',
    phase: 'aim',
    timer: 0,
    targetCpId: cpId,
    targetX: target.x,
    targetY: target.y,
    dir: dir,
    gunRecoil: 0,
    beamProgress: 0,
    entryPortal: { x: entryX, y: entryY, scale: 0 },
    exitPortal: { x: exitX, y: exitY, scale: 0 },
    startX: player.x,
    startY: player.y,
    playerTransform: {
      x: player.x,
      y: player.y,
      alpha: 1,
      squashX: 1,
      squashY: 1,
      state: 'idle'
    }
  };

  player.vx = 0;
  player.vy = 0;
  player.state = 'idle';
  if (window.sfx && window.sfx.init) window.sfx.init();
}

function startPortalArrival() {
  const dir = player.facingRight ? 1 : -1;
  const exitX = player.x + 11 - dir * 18;
  const exitY = player.y + 8;

  portalTeleportState = {
    mode: 'arrival',
    phase: 'open_out',
    timer: 0,
    targetCpId: null,
    targetX: player.x,
    targetY: player.y,
    dir: dir,
    gunRecoil: 0,
    beamProgress: 0,
    entryPortal: { x: exitX, y: exitY, scale: 0 },
    exitPortal: { x: exitX, y: exitY, scale: 0 },
    startX: player.x,
    startY: player.y,
    playerTransform: {
      x: player.x,
      y: player.y,
      alpha: 0,
      squashX: 1,
      squashY: 1,
      state: 'jump'
    }
  };

  player.vx = 0;
  player.vy = 0;
  if (window.sfx && window.sfx.playPortalWoosh) {
    window.sfx.playPortalWoosh();
  }
}

function updatePortalTeleport(dt) {
  if (!portalTeleportState) return;
  const s = portalTeleportState;
  s.timer += dt;

  // 1. Apuntar con la pistola de portales
  if (s.phase === 'aim') {
    player.state = 'idle';
    s.playerTransform = {
      x: player.x,
      y: player.y,
      alpha: 1,
      squashX: 1,
      squashY: 1,
      state: 'idle'
    };
    if (s.timer >= 0.22) {
      s.phase = 'fire';
      s.timer = 0;
      s.gunRecoil = 1;
      if (window.sfx && window.sfx.playPortalGunShot) window.sfx.playPortalGunShot();
      if (typeof triggerShake === 'function') triggerShake(0.12, 1.8);
    }
  }

  // 2. Disparo de rayo hacia el punto de impacto
  else if (s.phase === 'fire') {
    s.gunRecoil = Math.max(0, s.gunRecoil - dt * 5.5);
    s.beamProgress = Math.min(1, s.timer / 0.12);
    if (s.timer >= 0.12) {
      s.phase = 'open_in';
      s.timer = 0;
      s.beamProgress = 1;
      if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(s.entryPortal.x, s.entryPortal.y, 14, '#39ff14');
        spawnStarSparkles(s.entryPortal.x, s.entryPortal.y, 10, '#00ffff');
      }
    }
  }

  // 3. Apertura del portal de entrada
  else if (s.phase === 'open_in') {
    s.entryPortal.scale = Math.min(1, s.timer / 0.18);
    if (globalFrame % 4 === 0 && typeof spawnStarSparkles === 'function') {
      spawnStarSparkles(
        s.entryPortal.x + (Math.random() - 0.5) * 12,
        s.entryPortal.y + (Math.random() - 0.5) * 18,
        1,
        '#39ff14'
      );
    }
    if (s.timer >= 0.18) {
      s.phase = 'walk_in';
      s.timer = 0;
    }
  }

  // 4. Elizabeth entra al portal y es absorbida por el vortice
  else if (s.phase === 'walk_in') {
    const dur = 0.26;
    const t = Math.min(1, s.timer / dur);
    const targetX = s.entryPortal.x - s.dir * 4;
    const curX = s.startX + (targetX - s.startX) * t;
    const curY = s.startY + Math.sin(t * Math.PI) * -8;
    const sqX = 1 - t * 0.55;
    const sqY = 1 + Math.sin(t * Math.PI) * 0.45;
    const alpha = Math.max(0, 1 - Math.pow(t, 2.2));

    s.playerTransform = {
      x: curX,
      y: curY,
      alpha: alpha,
      squashX: sqX,
      squashY: sqY,
      state: 'run'
    };

    if (s.timer >= dur) {
      s.phase = 'close_in';
      s.timer = 0;
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(s.entryPortal.x, s.entryPortal.y, 16, '#00f5d4');
      }
    }
  }

  // 5. Cierre del portal de entrada
  else if (s.phase === 'close_in') {
    const dur = 0.14;
    const t = Math.min(1, s.timer / dur);
    s.entryPortal.scale = Math.max(0, 1 - t);
    s.playerTransform = { x: player.x, y: player.y, alpha: 0, squashX: 1, squashY: 1, state: 'idle' };

    if (s.timer >= dur) {
      s.phase = 'warp';
      s.timer = 0;
    }
  }

  // 6. Transicion / Corte dimensional hacia el destino
  else if (s.phase === 'warp') {
    player.x = s.targetX;
    player.y = s.targetY;
    player.vx = 0;
    player.vy = 0;

    if (!saveState.activeCheckpoints) saveState.activeCheckpoints = {};
    if (s.targetCpId) {
      const cp = (level.checkpoints || []).find(c => c.id === s.targetCpId);
      if (cp) {
        saveState.activeCheckpoints[level.id] = { id: cp.id, x: cp.x, y: cp.y, name: cp.name };
      }
    } else {
      delete saveState.activeCheckpoints[level.id];
    }
    persistSave();

    cameraX = Math.max(0, Math.min(level.worldWidth - W, player.x - W * 0.38));
    cameraY = 0;

    s.exitPortal.x = player.x + 11 - s.dir * 18;
    s.exitPortal.y = player.y + 8;
    s.phase = 'open_out';
    s.timer = 0;
    if (window.sfx && window.sfx.playPortalWoosh) window.sfx.playPortalWoosh();
  }

  // 7. Apertura del portal de salida en el destino
  else if (s.phase === 'open_out') {
    const dur = 0.18;
    s.exitPortal.scale = Math.min(1, s.timer / dur);
    s.playerTransform = { x: player.x, y: player.y, alpha: 0, squashX: 1, squashY: 1, state: 'jump' };

    if (globalFrame % 3 === 0 && typeof spawnStarSparkles === 'function') {
      spawnStarSparkles(
        s.exitPortal.x + (Math.random() - 0.5) * 14,
        s.exitPortal.y + (Math.random() - 0.5) * 20,
        1,
        '#00ffff'
      );
    }
    if (s.timer >= dur) {
      s.phase = 'emerge_out';
      s.timer = 0;
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
      if (typeof spawnStarSparkles === 'function') {
        spawnStarSparkles(s.exitPortal.x, s.exitPortal.y, 16, '#ffffff');
        spawnStarSparkles(s.exitPortal.x, s.exitPortal.y, 14, '#39ff14');
      }
    }
  }

  // 8. Elizabeth sale del portal aterrizando sobre la plataforma
  else if (s.phase === 'emerge_out') {
    const dur = 0.28;
    const t = Math.min(1, s.timer / dur);
    const startX = s.exitPortal.x;
    const finalX = player.x;
    const curX = startX + (finalX - startX) * t;
    const curY = player.y - Math.sin(t * Math.PI) * 10;
    const alpha = Math.min(1, 0.2 + t * 0.9);

    let sqX = 1;
    let sqY = 1;
    if (t < 0.6) {
      sqX = 0.7 + t * 0.3;
      sqY = 1.3 - t * 0.3;
    } else {
      const landT = (t - 0.6) / 0.4;
      sqX = 1 + Math.sin(landT * Math.PI) * 0.22;
      sqY = 1 - Math.sin(landT * Math.PI) * 0.22;
    }

    s.playerTransform = {
      x: curX,
      y: curY,
      alpha: alpha,
      squashX: sqX,
      squashY: sqY,
      state: t < 0.65 ? 'jump' : 'idle'
    };

    if (s.timer >= dur) {
      s.phase = 'close_out';
      s.timer = 0;
      player.squashX = 1;
      player.squashY = 1;
      s.playerTransform = { x: player.x, y: player.y, alpha: 1, squashX: 1, squashY: 1, state: 'idle' };
    }
  }

  // 9. Cierre del portal de salida
  else if (s.phase === 'close_out') {
    const dur = 0.15;
    const t = Math.min(1, s.timer / dur);
    s.exitPortal.scale = Math.max(0, 1 - t);
    s.playerTransform = { x: player.x, y: player.y, alpha: 1, squashX: 1, squashY: 1, state: 'idle' };

    if (s.timer >= dur) {
      portalTeleportState = null;
      player.state = 'idle';
      player.squashX = 1;
      player.squashY = 1;
    }
  }
}
