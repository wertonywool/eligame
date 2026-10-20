// ============================================================================
// SISTEMA DE PUERTAS, ASCENSORES Y TRANSICIONES INTERIORES (FASE 4)
// ============================================================================
let activeDoorPrompt = null;

const SKYSCRAPER_DOORS = [
  {
    id: 'plaza_to_lobby',
    x1: 12620, x2: 12680, y1: 150, y2: 198,
    label: 'ENTRAR AL EDIFICIO',
    action: function() {
      if ((saveState.keysPhase3 || 0) < 4) {
        spawnFloatingText(player.x - 24, player.y - 18, '¡SE REQUIEREN 4 LLAVES!', '#ff75a0');
        if (window.sfx && window.sfx.playHit) window.sfx.playHit();
        return;
      }
      player.x = 13500; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = player.y - H / 2;
      triggerShake(0.1, 1.5);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#ffffff');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'lobby_to_plaza',
    x1: 13460, x2: 13520, y1: 180, y2: 220,
    label: 'SALIR A LA PLAZA',
    action: function() {
      player.x = 12630; player.y = 172; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = player.y - H / 2;
      triggerShake(0.1, 1.5);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'lobby_to_rooftop_elevator',
    x1: 13970, x2: 14030, y1: 180, y2: 220,
    label: 'ASCENSOR AL PISO 100',
    action: function() {
      if (typeof startElevatorAscentAnimation === 'function') {
        startElevatorAscentAnimation(14520, 46);
      } else {
        player.x = 14520; player.y = 46;
      }
    }
  },
  {
    id: 'rooftop_to_lobby_elevator',
    x1: 14460, x2: 14510, y1: 30, y2: 70,
    label: 'BAJAR AL LOBBY',
    action: function() {
      player.x = 13990; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = player.y - H / 2;
      triggerShake(0.1, 1.5);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  }
];

const SNOW_VILLAGE_DOORS = [
  // Casa 1: Taberna Alpina "El Refugio Cálido"
  {
    id: 'village_to_tavern',
    x1: 8430, x2: 8490, y1: 170, y2: 210,
    label: 'ENTRAR A LA TABERNA',
    action: function() {
      player.x = 50050; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 12, '#ffd166');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'tavern_to_village',
    x1: 50020, x2: 50080, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 8460; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 2: Tienda de Ropa y Gorros de Invierno "El Gorro Nevado"
  {
    id: 'village_to_hat_shop',
    x1: 9160, x2: 9220, y1: 170, y2: 210,
    label: 'ENTRAR A LA TIENDA',
    action: function() {
      player.x = 50450; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 12, '#38bdf8');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'hat_shop_to_village',
    x1: 50420, x2: 50480, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 9190; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 3: Cabaña de Gaston el Melancólico (El Tipo Súper Depre)
  {
    id: 'village_to_depre_cabin',
    x1: 9880, x2: 9940, y1: 170, y2: 210,
    label: 'ENTRAR A LA CABAÑA',
    action: function() {
      player.x = 50850; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 12, '#94a3b8');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'depre_cabin_to_village',
    x1: 50820, x2: 50880, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 9910; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 4: Sala Arcade Retro "Arcade Polar"
  {
    id: 'village_to_arcade',
    x1: 10660, x2: 10720, y1: 170, y2: 210,
    label: 'ENTRAR AL ARCADE',
    action: function() {
      player.x = 51250; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#ec4899');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'arcade_to_village',
    x1: 51220, x2: 51280, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 10690; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 5: Panadería y Casa de Té "El Horno del Yeti"
  {
    id: 'village_to_bakery',
    x1: 11410, x2: 11470, y1: 170, y2: 210,
    label: 'ENTRAR A LA PANADERIA',
    action: function() {
      player.x = 51650; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#f59e0b');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'bakery_to_village',
    x1: 51620, x2: 51680, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 11440; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 6: Taller de Herramientas y Forja de Hielo "La Forja del Glaciar"
  {
    id: 'village_to_forge',
    x1: 12160, x2: 12220, y1: 170, y2: 210,
    label: 'ENTRAR AL TALLER DE FORJA',
    action: function() {
      player.x = 52050; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#38bdf8');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'forge_to_village',
    x1: 52020, x2: 52080, y1: 170, y2: 210,
    label: 'SALIR AL PUEBLO',
    action: function() {
      player.x = 12190; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  // Casa 7: La Gran Alcaldía del Pueblo Nevado
  {
    id: 'village_to_townhall',
    x1: 12860, x2: 12920, y1: 170, y2: 210,
    label: 'ENTRAR A LA ALCALDIA',
    action: function() {
      player.x = 52450; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      spawnStarSparkles(player.x + 11, player.y + 12, 14, '#ffd166');
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  },
  {
    id: 'townhall_to_village',
    x1: 52420, x2: 52480, y1: 170, y2: 210,
    label: 'SALIR A LA PLAZA',
    action: function() {
      player.x = 12890; player.y = 196; player.vx = 0; player.vy = 0;
      cameraX = player.x - W / 2; cameraY = 0;
      triggerShake(0.08, 1.2);
      if (window.sfx && window.sfx.playJump) window.sfx.playJump(false);
    }
  }
];

function updateSkyscraperDoors() {
  if (gameState !== 'PLAYING') {
    activeDoorPrompt = null;
    return;
  }

  const px = player.x + player.w / 2;
  const py = player.y + player.h;
  activeDoorPrompt = null;

  const allDoors = (level && Array.isArray(level.doors)) ? SKYSCRAPER_DOORS.concat(SNOW_VILLAGE_DOORS).concat(level.doors) : SKYSCRAPER_DOORS.concat(SNOW_VILLAGE_DOORS);
  for (const d of allDoors) {
    if (px >= d.x1 && px <= d.x2 && py >= d.y1 && py <= d.y2 + 8) {
      activeDoorPrompt = d;
      break;
    }
  }

  // Interacción al pulsar ARRIBA o SALTAR en la puerta
  if (activeDoorPrompt && (keys.jumpJustPressed || keys.upJustPressed || keyboardState.ArrowUp || keyboardState.KeyW)) {
    keys.jumpJustPressed = false;
    keys.upJustPressed = false;
    keyboardState.ArrowUp = false;
    keyboardState.KeyW = false;
    activeDoorPrompt.action();
  }
}

function drawSkyscraperDoorPrompt(ctx) {
  if (!activeDoorPrompt || gameState !== 'PLAYING') return;
  const d = activeDoorPrompt;
  const bob = Math.sin(globalFrame * 0.14) * 2;
  const bx = Math.round(player.x + 11);
  const by = Math.round(player.y - 20 + bob);

  const text = `[ARRIBA: ${d.label}]`;
  ctx.font = `bold 6.5px ${UI_FONT}`;
  const tw = ctx.measureText(text).width;
  drawRoundedPanel(bx - tw / 2 - 6, by - 8, tw + 12, 14, 4, 'rgba(18, 5, 24, 0.95)', '#ffd166', 1.2);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, bx, by + 1);
}

if (typeof module !== 'undefined') {
  module.exports = { updateSkyscraperDoors, drawSkyscraperDoorPrompt, SKYSCRAPER_DOORS };
}
