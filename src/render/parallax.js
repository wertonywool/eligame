// ============================================================================
// FONDO DINÁMICO Y RENDERIZADO DEL JARDÍN BOTÁNICO (MUNDO 1) Y VOLCÁN (MUNDO 2)
// ============================================================================
let parallaxCache = null;

function initParallaxCache() {
  const tileW = 640;

  // 🌸 0. Capa Lejana 100% SAKURA (Fase 1: Bosque Sagrado de Cerezos y Pagodas Nocturnas)
  const sakuraFarCanvas = document.createElement('canvas');
  sakuraFarCanvas.width = tileW;
  sakuraFarCanvas.height = H;
  const sfctx = sakuraFarCanvas.getContext('2d');

  sfctx.fillStyle = '#1e0926';
  sfctx.fillRect(0, H - 72, tileW, 72);

  for (let i = 0; i < 8; i++) {
    const gx = i * 80;
    const hillH = 62 + ((i * 29) % 4) * 12;
    const gy = H - hillH;
    sfctx.fillStyle = '#260c30';
    sfctx.fillRect(gx - 12, gy + 14, 98, hillH - 14);
    sfctx.fillStyle = '#32103e';
    sfctx.fillRect(gx + 4, gy, 72, hillH);

    if (i % 2 === 1) {
      const pagX = gx + 38;
      const pagY = gy - 16;
      sfctx.fillStyle = '#15061c';
      sfctx.fillRect(pagX - 10, pagY, 20, 26);
      sfctx.fillStyle = '#42144e';
      sfctx.fillRect(pagX - 16, pagY + 6, 32, 3);
      sfctx.fillRect(pagX - 14, pagY - 4, 28, 3);
      sfctx.fillRect(pagX - 11, pagY - 14, 22, 3);
      sfctx.fillStyle = '#ffd166';
      sfctx.fillRect(pagX - 1, pagY - 24, 2, 10);
      sfctx.fillStyle = 'rgba(255, 209, 102, 0.45)';
      sfctx.fillRect(pagX - 3, pagY + 12, 6, 5);
    } else {
      sfctx.fillStyle = '#3a1145';
      sfctx.beginPath();
      sfctx.ellipse(gx + 36, gy - 20, 26, 16, 0, 0, Math.PI * 2);
      sfctx.fill();
      sfctx.fillStyle = 'rgba(255, 143, 171, 0.45)';
      sfctx.beginPath();
      sfctx.ellipse(gx + 34, gy - 24, 20, 11, 0, 0, Math.PI * 2);
      sfctx.fill();
      sfctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      sfctx.fillRect(gx + 26, gy - 26, 8, 3);
    }
  }

  // 🌸 Capa Media 100% SAKURA (Cerezos en flor, toriis y faroles de papel tradicionales)
  const sakuraMidCanvas = document.createElement('canvas');
  sakuraMidCanvas.width = tileW;
  sakuraMidCanvas.height = H;
  const smctx = sakuraMidCanvas.getContext('2d');

  smctx.fillStyle = '#230b2c';
  smctx.fillRect(0, H - 38, tileW, 38);

  for (let i = 0; i < 12; i++) {
    const hx = i * 54;
    const hh = 32 + ((i * 19) % 3) * 12;
    const hy = H - hh - 12;

    smctx.fillStyle = '#200826';
    smctx.fillRect(hx + 20, hy + 4, 8, hh + 8);
    smctx.fillRect(hx + 8, hy - 4, 16, 4);
    smctx.fillRect(hx + 24, hy - 2, 16, 4);

    smctx.fillStyle = '#4c1256';
    smctx.beginPath();
    smctx.ellipse(hx + 24, hy - 14, 22, 14, 0, 0, Math.PI * 2);
    smctx.fill();

    smctx.fillStyle = '#7a1f68';
    smctx.beginPath();
    smctx.ellipse(hx + 23, hy - 16, 18, 11, 0, 0, Math.PI * 2);
    smctx.fill();

    smctx.fillStyle = '#ff758f';
    smctx.beginPath();
    smctx.ellipse(hx + 21, hy - 19, 13, 8, 0, 0, Math.PI * 2);
    smctx.fill();

    smctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    smctx.fillRect(hx + 17, hy - 22, 6, 3);

    if (i % 2 === 0) {
      smctx.fillStyle = '#15061c';
      smctx.fillRect(hx + 10, hy, 1, 6);
      smctx.fillStyle = '#e63946';
      smctx.fillRect(hx + 8, hy + 6, 5, 6);
      smctx.fillStyle = '#ffd166';
      smctx.fillRect(hx + 9, hy + 7, 3, 4);
    }
  }

  // 1. Capa Lejana del Jardín Botánico (Colinas suaves, grandes árboles antiguos y cúpulas de invernadero lejanas, CERO rascacielos)
  const gardenFarCanvas = document.createElement('canvas');
  gardenFarCanvas.width = tileW;
  gardenFarCanvas.height = H;
  const gfctx = gardenFarCanvas.getContext('2d');

  // Colinas botánicas onduladas al fondo
  gfctx.fillStyle = '#0f2421';
  gfctx.fillRect(0, H - 68, tileW, 68);

  for (let i = 0; i < 8; i++) {
    const gx = i * 80;
    const hillH = 58 + ((i * 23) % 3) * 14;
    const gy = H - hillH;
    // Silueta redondeada de colina y arboleda lejana
    gfctx.fillStyle = '#112a26';
    gfctx.fillRect(gx - 10, gy + 12, 96, hillH - 12);
    gfctx.fillRect(gx + 6, gy, 68, hillH);

    if (i % 3 === 1) {
      // Cúpula lejana de Invernadero Real iluminada suavemente
      gfctx.fillStyle = '#163832';
      gfctx.fillRect(gx + 14, gy - 26, 52, 26);
      gfctx.fillRect(gx + 22, gy - 34, 36, 8);
      gfctx.fillStyle = 'rgba(144, 224, 239, 0.18)';
      gfctx.fillRect(gx + 18, gy - 22, 10, 18);
      gfctx.fillRect(gx + 34, gy - 22, 10, 18);
      gfctx.fillRect(gx + 50, gy - 22, 8, 18);
    } else {
      // Copa frondosa de gran sauce / cerezo ancestral en la lejanía
      gfctx.fillStyle = '#14332d';
      gfctx.fillRect(gx + 28, gy - 28, 10, 28);
      gfctx.fillStyle = '#193f36';
      gfctx.fillRect(gx + 8, gy - 48, 50, 24);
      gfctx.fillRect(gx + 16, gy - 56, 34, 10);
      // Destellos de flores nocturnas en las copas lejanas
      gfctx.fillStyle = i % 2 === 0 ? 'rgba(255, 143, 171, 0.35)' : 'rgba(149, 213, 178, 0.35)';
      gfctx.fillRect(gx + 18, gy - 44, 6, 4);
      gfctx.fillRect(gx + 38, gy - 40, 6, 4);
    }
  }

  // 2. Capa Media del Jardín Botánico (Setos florales, celosías de jardín y arbustos de lirios)
  const gardenMidCanvas = document.createElement('canvas');
  gardenMidCanvas.width = tileW;
  gardenMidCanvas.height = H;
  const gmctx = gardenMidCanvas.getContext('2d');

  gmctx.fillStyle = '#16362c';
  gmctx.fillRect(0, H - 36, tileW, 36);

  for (let i = 0; i < 16; i++) {
    const hx = i * 40;
    const hh = 26 + ((i * 17) % 3) * 9;
    const hy = H - hh - 14;
    // Seto botánico escalonado
    gmctx.fillStyle = '#16362c';
    gmctx.fillRect(hx, hy, 42, hh + 14);
    gmctx.fillStyle = '#1e4638';
    gmctx.fillRect(hx + 4, hy - 8, 34, 12);
    // Flores silvestres y celosías cada ciertos tramos
    gmctx.fillStyle = i % 3 === 0 ? '#ff8fab' : (i % 3 === 1 ? '#95d5b2' : '#ffd166');
    gmctx.fillRect(hx + 10, hy - 4, 3, 3);
    gmctx.fillRect(hx + 24, hy - 2, 3, 3);
  }

  // Capas pre-renderizadas del Volcán (Bóvedas cavernosas orgánicas estilo Hollow Knight)
  const volcanoFarCanvas = document.createElement('canvas');
  volcanoFarCanvas.width = tileW;
  volcanoFarCanvas.height = H;
  const vfctx = volcanoFarCanvas.getContext('2d');

  for (let i = 0; i < 10; i++) {
    const bx = i * 64;
    const peakH = 85 + ((i * 37) % 5) * 18;
    const by = H - peakH;
    vfctx.fillStyle = '#1e0813';
    vfctx.fillRect(bx - 12, by + 28, 88, peakH - 28);
    vfctx.fillRect(bx, by + 14, 64, peakH - 14);
    vfctx.fillRect(bx + 14, by, 36, peakH);

    if (i % 3 === 0) {
      vfctx.fillStyle = '#280b19';
      vfctx.fillRect(bx + 18, by - 32, 6, 32);
      vfctx.fillRect(bx + 40, by - 32, 6, 32);
      vfctx.fillRect(bx + 14, by - 36, 36, 6);
    }
  }

  const volcanoMidCanvas = document.createElement('canvas');
  volcanoMidCanvas.width = tileW;
  volcanoMidCanvas.height = H;
  const vmctx = volcanoMidCanvas.getContext('2d');

  for (let i = 0; i < 20; i++) {
    const sx = i * 32;
    const sh = 14 + ((i * 23) % 5) * 8;
    vmctx.fillStyle = '#14050c';
    vmctx.fillRect(sx, 0, 28, Math.floor(sh * 0.45));
    vmctx.fillRect(sx + 5, Math.floor(sh * 0.45), 18, Math.floor(sh * 0.35));
    vmctx.fillRect(sx + 10, Math.floor(sh * 0.8), 8, Math.floor(sh * 0.35));
    vmctx.fillRect(sx + 13, sh, 3, 6);

    if (i % 2 === 0) {
      const mh = 18 + ((i * 17) % 4) * 9;
      vmctx.fillStyle = '#17060e';
      ctx.fillRect(sx + 4, H - mh, 18, mh);
      ctx.fillRect(sx + 8, H - mh - 10, 10, 10);
      ctx.fillRect(sx + 11, H - mh - 16, 4, 6);
    }
  }

  // 3. Capas del Palacio Imperial y Terrazas de Rosas Reales (Fase 3 del Mundo 1)
  const royalFarCanvas = document.createElement('canvas');
  royalFarCanvas.width = tileW;
  royalFarCanvas.height = H;
  const rfctx = royalFarCanvas.getContext('2d');

  // Crestas montañosas en violeta nocturno aterciopelado
  rfctx.fillStyle = '#180826';
  rfctx.fillRect(0, H - 75, tileW, 75);

  // Siluetas del Palacio Real de los Lirios (Cúpulas, agujas y ventanales góticos iluminados)
  for (let i = 0; i < 4; i++) {
    const px = i * 160;
    // Cúpula central
    rfctx.fillStyle = '#1c0c2e';
    rfctx.beginPath();
    rfctx.arc(px + 80, H - 54, 46, Math.PI, 0, false);
    rfctx.fill();
    rfctx.fillRect(px + 36, H - 56, 88, 56);

    // Agujas del palacio
    const palSpires = [
      { x: px + 18, w: 14, h: 84, capH: 22 },
      { x: px + 48, w: 16, h: 108, capH: 26 },
      { x: px + 80, w: 22, h: 144, capH: 36 },
      { x: px + 112, w: 16, h: 108, capH: 26 },
      { x: px + 142, w: 14, h: 84, capH: 22 }
    ];

    for (const sp of palSpires) {
      rfctx.fillStyle = '#1c0c2e';
      rfctx.fillRect(sp.x - Math.floor(sp.w / 2), H - sp.h, sp.w, sp.h);
      rfctx.beginPath();
      rfctx.moveTo(sp.x - Math.floor(sp.w / 2) - 2, H - sp.h);
      rfctx.lineTo(sp.x, H - sp.h - sp.capH);
      rfctx.lineTo(sp.x + Math.floor(sp.w / 2) + 2, H - sp.h);
      rfctx.fill();

      // Remate dorado de flor de lis en la cúspide
      rfctx.fillStyle = 'rgba(255, 209, 102, 0.85)';
      rfctx.fillRect(sp.x - 1, H - sp.h - sp.capH - 5, 2, 5);
      rfctx.fillRect(sp.x - 3, H - sp.h - sp.capH - 3, 6, 2);

      // Ventanales ojivales iluminados con vidrieras carmesí y ámbar
      rfctx.fillStyle = 'rgba(255, 117, 143, 0.45)';
      rfctx.fillRect(sp.x - 2, H - sp.h + 16, 4, 14);
      rfctx.fillStyle = 'rgba(255, 209, 102, 0.4)';
      rfctx.fillRect(sp.x - 2, H - sp.h + 38, 4, 14);
    }

    // Gran Rosetón de vidriera en la cúpula
    rfctx.fillStyle = 'rgba(255, 77, 109, 0.65)';
    rfctx.beginPath();
    rfctx.arc(px + 80, H - 76, 14, 0, Math.PI * 2);
    rfctx.fill();
    rfctx.fillStyle = 'rgba(255, 209, 102, 0.85)';
    rfctx.beginPath();
    rfctx.arc(px + 80, H - 76, 6, 0, Math.PI * 2);
    rfctx.fill();
  }

  const royalMidCanvas = document.createElement('canvas');
  royalMidCanvas.width = tileW;
  royalMidCanvas.height = H;
  const rmctx = royalMidCanvas.getContext('2d');

  // Muro terraza y balaustradas de mármol del palacio en la distancia media
  rmctx.fillStyle = '#220f33';
  rmctx.fillRect(0, H - 42, tileW, 42);

  // Pasamanos y balaustres de mármol
  rmctx.fillStyle = '#140820';
  rmctx.fillRect(0, H - 42, tileW, 4);
  rmctx.fillRect(0, H - 26, tileW, 4);
  rmctx.fillStyle = '#d8e2dc';
  rmctx.fillRect(0, H - 41, tileW, 3);
  rmctx.fillRect(0, H - 25, tileW, 3);
  rmctx.fillStyle = '#ffffff';
  rmctx.fillRect(0, H - 41, tileW, 1);

  for (let bx = 6; bx < tileW - 6; bx += 8) {
    rmctx.fillStyle = '#140820';
    rmctx.fillRect(bx, H - 38, 3, 12);
    rmctx.fillStyle = '#e2eafc';
    rmctx.fillRect(bx + 1, H - 38, 2, 12);
  }

  // Copas de piedra con rosas y faroles en las columnas de la balaustrada
  for (let i = 0; i < 8; i++) {
    const ux = i * 80 + 36;
    rmctx.fillStyle = '#d8e2dc';
    rmctx.fillRect(ux - 4, H - 50, 10, 8);
    rmctx.fillStyle = '#2d6a4f';
    rmctx.fillRect(ux - 6, H - 56, 14, 6);
    rmctx.fillStyle = '#e63946';
    rmctx.fillRect(ux - 4, H - 58, 5, 4);
    rmctx.fillRect(ux + 1, H - 57, 5, 4);
    rmctx.fillStyle = '#ff8fab';
    rmctx.fillRect(ux - 2, H - 59, 4, 3);

    if (i % 2 === 1) {
      rmctx.fillStyle = '#ffd166';
      rmctx.fillRect(ux + 28, H - 54, 4, 12);
      rmctx.fillRect(ux + 26, H - 58, 8, 5);
      rmctx.fillStyle = '#ffffff';
      rmctx.fillRect(ux + 28, H - 57, 4, 3);
    }
  }

  // Capa de bruma y niebla violeta aterciopelada sobre la base
  const mistGrad = rmctx.createLinearGradient(0, H - 30, 0, H);
  mistGrad.addColorStop(0, 'rgba(44, 22, 59, 0)');
  mistGrad.addColorStop(1, 'rgba(44, 22, 59, 0.85)');
  rmctx.fillStyle = mistGrad;
  rmctx.fillRect(0, H - 30, tileW, 30);

  parallaxCache = { tileW, sakuraFarCanvas, sakuraMidCanvas, gardenFarCanvas, gardenMidCanvas, royalFarCanvas, royalMidCanvas, volcanoFarCanvas, volcanoMidCanvas };
}

function lerpColor(c1, c2, t) {
  const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

function drawParallaxBackground(theme) {
  if (!parallaxCache) initParallaxCache();

  if (theme === 'snow') {
    // MUNDO 4: EL MONTE EVEREST Y LAS CUMBRES HELADAS (CELESTE STYLE)
    if (typeof drawEverestParallax === 'function') {
      drawEverestParallax(ctx, cameraX, globalFrame);
      return;
    }
  }

  if (theme === 'space') {
    // MUNDO 4: EL ESPACIO, LA LUNA Y LAS ESTRELLAS
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#07020a');
    grad.addColorStop(0.65, '#120415');
    grad.addColorStop(1, '#3b0820');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Luna plateada luminosa con relieve y crateres
    const moonX = W - 90 - Math.round((cameraX * 0.02) % (W + 120));
    const moonY = 54;
    ctx.fillStyle = '#ffcad4';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(moonX, moonY, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffcad4';
    ctx.fillRect(moonX - 8, moonY - 6, 6, 4);
    ctx.fillRect(moonX + 4, moonY + 2, 8, 5);
    ctx.fillRect(moonX - 4, moonY + 8, 5, 3);

    // Polvo estelar y estrellas titilantes en 3 planos cosmicos
    for (let i = 0; i < 48; i++) {
      const starX = ((i * 47 - Math.round(cameraX * 0.06)) % W + W) % W;
      const starY = (i * 31) % (H - 40);
      const twinkle = (globalFrame + i * 7) % 30 < 15;
      ctx.fillStyle = twinkle ? '#ffffff' : (i % 3 === 0 ? '#ffd166' : '#ff2a70');
      ctx.fillRect(starX, starY, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
    }
    return;
  }

  if (theme === 'coastal' || theme === 'coastal_sunset') {
    // Si estamos en la azotea o en el megatsunami (Fase 4 Azotea o Fase 5)
    const isMegatsunamiZone = (cameraX >= 14400) ||
      (typeof player !== 'undefined' && player && player.x >= 14400) ||
      (level && level.phase === 5);

    if (isMegatsunamiZone && typeof drawMegatsunamiParallax === 'function') {
      drawMegatsunamiParallax(ctx, cameraX, globalFrame);
      return;
    }

    // Si estamos en Fase 4 Parte 1 o 2 (Avenida y Plaza Urbana Pre-Catástrofe, X: 11800 -> 14400)
    const isPreCatastropheZone = (cameraX >= 11800) ||
      (typeof player !== 'undefined' && player && player.x >= 11800);

    if (isPreCatastropheZone && typeof drawPreTsunamiSky === 'function') {
      drawPreTsunamiSky(ctx, cameraX, globalFrame);
      return;
    }

    // MUNDO 3: CIUDAD COSTERA, PLAYA Y MAR EN DÍA SOLEADO
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#1d8cf8');      // Azul cielo radiante
    grad.addColorStop(0.38, '#4ea8de');   // Azul tropical luminoso
    grad.addColorStop(0.70, '#90e0ef');   // Cyan suave playero
    grad.addColorStop(1, '#caf0f8');      // Horizonte brumoso soleado
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 1. Sol radiante de mediodía en lo alto del cielo
    const sunX = Math.round(W * 0.76);
    const sunY = 44;
    const sunR = 24;

    // Resplandor cálido exterior
    ctx.fillStyle = 'rgba(255, 243, 176, 0.22)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR + 26, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 230, 109, 0.38)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR + 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 214, 0.72)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR + 5, 0, Math.PI * 2);
    ctx.fill();

    // Disco del sol blanco brillante
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
    ctx.fill();

    // 2. Nubes blancas algodonadas de verano en suave deriva
    const cloudSpeed = globalFrame * 0.12;
    for (let ci = 0; ci < 6; ci++) {
      const cx = ((ci * 120 + 40 - cloudSpeed) % (W + 140) + (W + 140)) % (W + 140) - 70;
      const cy = 24 + (ci % 3) * 14;
      const cw = 42 + (ci % 2) * 16;
      // Sombra inferior de la nube en azul celeste
      ctx.fillStyle = 'rgba(180, 220, 245, 0.65)';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 3, Math.floor(cw / 2), 8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Núcleo blanco algodonado
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.floor(cw / 2), 7, 0, 0, Math.PI * 2);
      ctx.ellipse(cx - 7, cy - 2, Math.floor(cw / 3), 6, 0, 0, Math.PI * 2);
      ctx.ellipse(cx + 8, cy - 1, Math.floor(cw / 3.5), 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Bandada de gaviotas blancas planeando en el cielo soleado
    const birdOff = ((Math.round(globalFrame * 0.32) % 450) + 450) % 450;
    for (let bi = 0; bi < 4; bi++) {
      const bx = Math.round((W + 50 - birdOff + bi * 20));
      const by = Math.round(36 + bi * 9 + Math.sin(globalFrame * 0.05 + bi) * 2.2);
      if (bx > 10 && bx < W - 10) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(bx, by, 1, 2);
        ctx.fillRect(bx - 2, by - 1, 2, 1);
        ctx.fillRect(bx + 1, by - 1, 2, 1);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(bx + 1, by, 1, 1); // Pico dorado
      }
    }

    // 4. Siluetas de la ciudad playera y rascacielos lejanos
    const skyOff = ((Math.round(cameraX * 0.08) % 360) + 360) % 360;
    for (let i = -1; i < 7; i++) {
      const bx = i * 65 - skyOff;
      const bh = 50 + ((i * 37) % 42);
      // Fachada de torre costera (marfil y azul náutico suave)
      ctx.fillStyle = (i % 2 === 0) ? '#d8eefe' : '#c3e2f5';
      ctx.fillRect(bx, H - 72 - bh, 52, bh + 72);
      // Perfil arquitectónico
      ctx.fillStyle = '#a0cbe6';
      ctx.fillRect(bx + 51, H - 72 - bh, 1, bh + 72);

      // Ventanales reflectantes en azul cielo
      for (let wy = H - 68 - bh + 6; wy < H - 78; wy += 11) {
        for (let wx = bx + 5; wx < bx + 46; wx += 9) {
          if (((wx * 11 + wy * 7) % 3) !== 0) {
            ctx.fillStyle = '#00b4d8';
            ctx.fillRect(wx, wy, 4, 4);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(wx + 1, wy + 1, 1, 1);
          }
        }
      }
      // Palmera decorativa en la terraza
      if (i % 3 === 0) {
        const px = bx + 16, py = H - 72 - bh;
        ctx.fillStyle = '#7f5539';
        ctx.fillRect(px, py - 8, 2, 8);
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(px - 5, py - 11, 12, 3);
        ctx.fillRect(px - 3, py - 9, 8, 3);
      }
    }

    // 5. Dunas doradas lejanas en la orilla de la costa
    const duneOff = ((Math.round(cameraX * 0.05) % 380) + 380) % 380;
    for (let di = -1; di < 5; di++) {
      const dx = di * 115 - duneOff;
      ctx.fillStyle = '#edd59e';
      ctx.beginPath();
      ctx.ellipse(dx + 55, H - 66, 75, 22, 0, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = '#dfbe79';
      ctx.beginPath();
      ctx.ellipse(dx + 55, H - 64, 68, 16, 0, Math.PI, 0);
      ctx.fill();
    }

    // 6. Mar y oleaje realista en el horizonte oceánico
    if (typeof drawRealisticOceanHorizon === 'function') {
      drawRealisticOceanHorizon(ctx, H - 68, 68, cameraX, globalFrame);
    } else {
      const seaGrad = ctx.createLinearGradient(0, H - 68, 0, H);
      seaGrad.addColorStop(0, '#0096c7');
      seaGrad.addColorStop(1, '#48cae4');
      ctx.fillStyle = seaGrad;
      ctx.fillRect(0, H - 68, W, 68);
    }
    return;
  }

  if (theme === 'volcano') {
    const altitudeRatio = level ? Math.max(0, Math.min(1, 1 - cameraY / Math.max(1, level.worldHeight - H))) : 0;
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    if (altitudeRatio > 0.72) {
      grad.addColorStop(0, '#0d0618');
      grad.addColorStop(0.55, '#2b0922');
      grad.addColorStop(1, '#7a0418');
    } else {
      grad.addColorStop(0, '#16050b');
      grad.addColorStop(0.6, '#340615');
      grad.addColorStop(1, '#6a040f');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    const { tileW, volcanoFarCanvas, volcanoMidCanvas } = parallaxCache;
    const farOffset = ((Math.round(cameraX * 0.12 * renderScale) / renderScale) % tileW + tileW) % tileW;
    ctx.drawImage(volcanoFarCanvas, -farOffset, 0);
    ctx.drawImage(volcanoFarCanvas, tileW - farOffset, 0);

    const midOffset = ((Math.round(cameraX * 0.26 * renderScale) / renderScale) % tileW + tileW) % tileW;
    ctx.drawImage(volcanoMidCanvas, -midOffset, 0);
    ctx.drawImage(volcanoMidCanvas, tileW - midOffset, 0);

    const glowGrad = ctx.createLinearGradient(0, H - 45, 0, H);
    glowGrad.addColorStop(0, 'rgba(255, 84, 0, 0)');
    glowGrad.addColorStop(1, 'rgba(255, 84, 0, 0.28)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, H - 45, W, 45);
    return;
  }

  // Cielo Nocturno con Transición Continua Matemática entre Fases (CERO saltos bruscos)
  // Fase 1: Sakura Twilight (0 -> 1300)
  // Transición F1 -> F2: (1300 -> 1850)
  // Fase 2: Lotus Sapphire (1850 -> 3150)
  // Transición F2 -> F3: (3150 -> 3650)
  // Fase 3: Royal Rose/Marble (3650+)
  let topColor, midColor, botColor;

  if (cameraX < 1300) {
    topColor = '#0d061c';
    midColor = '#240c31';
    botColor = '#4a1542';
  } else if (cameraX < 1850) {
    const t = (cameraX - 1300) / 550;
    topColor = lerpColor('#0d061c', '#06101f', t);
    midColor = lerpColor('#240c31', '#0d253d', t);
    botColor = lerpColor('#4a1542', '#16425b', t);
  } else if (cameraX < 3150) {
    topColor = '#06101f';
    midColor = '#0d253d';
    botColor = '#16425b';
  } else if (cameraX < 3650) {
    const t = (cameraX - 3150) / 500;
    topColor = lerpColor('#06101f', '#12081c', t);
    midColor = lerpColor('#0d253d', '#241134', t);
    botColor = lerpColor('#16425b', '#3c1642', t);
  } else {
    topColor = '#12081c';
    midColor = '#241134';
    botColor = '#3c1642';
  }

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, topColor);
  grad.addColorStop(0.55, midColor);
  grad.addColorStop(1, botColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Luna llena celestial circular con resplandor suave y cráteres sutiles estilo Ghibli
  const moonX = Math.round(375 - cameraX * 0.025);
  const moonY = 32;
  const moonR = 14;

  // Resplandor suave de la luna sin crear gradientes radiales por frame
  ctx.fillStyle = 'rgba(255, 248, 220, 0.18)';
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR * 2.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(255, 243, 204, 0.08)';
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR * 2.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fffdf0';
  ctx.beginPath();
  ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
  ctx.fill();

  // Relieve de cráteres lunares sutiles
  ctx.fillStyle = '#faedcd';
  ctx.beginPath();
  ctx.arc(moonX - 4, moonY - 3, 3.5, 0, Math.PI * 2);
  ctx.arc(moonX + 3, moonY + 4, 4, 0, Math.PI * 2);
  ctx.arc(moonX - 2, moonY + 6, 2.5, 0, Math.PI * 2);
  ctx.fill();

  for (const s of bgStars) {
    const sx = ((s.x - cameraX * s.speed) % W + W) % W;
    const trans1to2Temp = Math.max(0, Math.min(1, (cameraX - 1300) / 550));
    const starColor = s.size === 2 ? '#ffd166' : lerpColor('#ffcad4', '#95d5b2', trans1to2Temp);
    ctx.fillStyle = starColor;
    ctx.fillRect(Math.round(sx * renderScale) / renderScale, s.y, s.size, s.size);
  }

  const { tileW, sakuraFarCanvas, sakuraMidCanvas, gardenFarCanvas, gardenMidCanvas, royalFarCanvas, royalMidCanvas } = parallaxCache;
  const trans1to2 = Math.max(0, Math.min(1, (cameraX - 1300) / 550));
  const royalRatio = Math.max(0, Math.min(1, (cameraX - 3250) / 450));

  // Capa Lejana (Far Layer) — Fondo Sólido Continuo (CERO horizonte transparente)
  const farOffset = ((Math.round(cameraX * 0.14 * renderScale) / renderScale) % tileW + tileW) % tileW;
  if (royalRatio < 1) {
    ctx.save();
    if (royalRatio > 0) ctx.globalAlpha = 1 - royalRatio;

    // Base sólida continua de colinas lejanas de Sakura
    if (sakuraFarCanvas) {
      ctx.drawImage(sakuraFarCanvas, -farOffset, 0);
      ctx.drawImage(sakuraFarCanvas, tileW - farOffset, 0);
    }

    // El horizonte del Estanque de Loto se funde suavemente sobre la base sin perder opacidad
    if (trans1to2 > 0 && gardenFarCanvas) {
      ctx.save();
      ctx.globalAlpha = trans1to2;
      ctx.drawImage(gardenFarCanvas, -farOffset, 0);
      ctx.drawImage(gardenFarCanvas, tileW - farOffset, 0);
      ctx.restore();
    }

    ctx.restore();
  }

  // Fondo Lejano del Gran Palacio Real de los Lirios (Fase 3: 100% Armonia Visual)
  if (royalRatio > 0 && royalFarCanvas) {
    ctx.save();
    ctx.globalAlpha = royalRatio;
    ctx.drawImage(royalFarCanvas, -farOffset, 0);
    ctx.drawImage(royalFarCanvas, tileW - farOffset, 0);
    ctx.restore();
  }

  // Capa Media (Mid Layer) — Transición Espacial Limpia entre Biomas (CERO fantasmas superpuestos)
  const midOffset = ((Math.round(cameraX * 0.28 * renderScale) / renderScale) % tileW + tileW) % tileW;
  if (royalRatio < 1) {
    ctx.save();
    if (royalRatio > 0) ctx.globalAlpha = 1 - royalRatio;

    if (trans1to2 <= 0) {
      // 100% Sakura
      if (sakuraMidCanvas) {
        ctx.drawImage(sakuraMidCanvas, -midOffset, 0);
        ctx.drawImage(sakuraMidCanvas, tileW - midOffset, 0);
      }
    } else if (trans1to2 >= 1) {
      // 100% Estanque de Loto
      if (gardenMidCanvas) {
        ctx.drawImage(gardenMidCanvas, -midOffset, 0);
        ctx.drawImage(gardenMidCanvas, tileW - midOffset, 0);
      }
    } else {
      // Transición espacial: Oeste (izquierda) Cerezos, Este (derecha) Lotos
      const splitX = Math.round(W * (1 - trans1to2));

      // Lado Oeste: Arboleda de Cerezos
      if (sakuraMidCanvas && splitX > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, splitX + 24, H);
        ctx.clip();
        ctx.drawImage(sakuraMidCanvas, -midOffset, 0);
        ctx.drawImage(sakuraMidCanvas, tileW - midOffset, 0);
        ctx.restore();
      }

      // Lado Este: Vegetación y Nenúfares del Estanque
      if (gardenMidCanvas && splitX < W) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(splitX - 24, 0, W - (splitX - 24), H);
        ctx.clip();
        ctx.drawImage(gardenMidCanvas, -midOffset, 0);
        ctx.drawImage(gardenMidCanvas, tileW - midOffset, 0);
        ctx.restore();
      }

      // Bruma suave del río en la confluencia entre ambos biomas
      const mistGrad = ctx.createLinearGradient(splitX - 30, 0, splitX + 30, 0);
      mistGrad.addColorStop(0, 'rgba(36, 12, 49, 0)');
      mistGrad.addColorStop(0.5, 'rgba(22, 50, 79, 0.45)');
      mistGrad.addColorStop(1, 'rgba(13, 37, 61, 0)');
      ctx.fillStyle = mistGrad;
      ctx.fillRect(splitX - 30, H - 60, 60, 60);
    }

    ctx.restore();
  }

  // Terrazas de Marmol y Rosales Reales en la Capa Media (Fase 3)
  if (royalRatio > 0 && royalMidCanvas) {
    ctx.save();
    ctx.globalAlpha = royalRatio;
    ctx.drawImage(royalMidCanvas, -midOffset, 0);
    ctx.drawImage(royalMidCanvas, tileW - midOffset, 0);
    ctx.restore();
  }
}