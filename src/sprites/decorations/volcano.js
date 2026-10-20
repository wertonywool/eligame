// ============================================================================
// DECORACIONES DEL VOLCÁN (ESTALACTITAS, ANTORCHAS, TOTEMS, VÓRTICES)
// ============================================================================
SpriteManager.prototype.drawVolcanoDecor = function(ctx, d, frame) {
    const px = Math.round(d.x);
    const py = Math.round(d.y);

    if (d.type === 'hut') {
      // Cabaña de piedra volcánica en Villa Ceniza (con tejado escalonado, chimenea, ventana cálida y jardinera)
      const w = d.w || 68;
      const h = d.h || 46;
      const smokeY = (frame * 0.45) % 16;
      ctx.fillStyle = 'rgba(235, 220, 210, 0.35)';
      ctx.fillRect(px + w - 16, Math.round(py - h - 11 - smokeY), 5, 4);
      ctx.fillRect(px + w - 13, Math.round(py - h - 17 - smokeY * 0.8), 4, 3);
      ctx.fillStyle = '#2b1822';
      ctx.fillRect(px + w - 18, py - h - 8, 8, 12);

      // Cuerpo de mampostería basáltica
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h, w, h);
      ctx.fillStyle = '#34222e';
      ctx.fillRect(px + 2, py - h + 2, w - 4, h - 2);
      ctx.fillStyle = '#24151f';
      ctx.fillRect(px + 6, py - h + 12, 14, 5);
      ctx.fillRect(px + w - 22, py - h + 20, 14, 5);
      ctx.fillRect(px + 28, py - h + 8, 12, 4);

      // Tejado curvado de tejas de obsidiana carmesí
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 6, py - h - 4, w + 12, 10);
      ctx.fillStyle = '#7a1f42';
      ctx.fillRect(px - 4, py - h - 2, w + 8, 6);
      ctx.fillStyle = '#b5179e';
      ctx.fillRect(px, py - h - 4, w, 2);

      // Puerta arqueada de madera con herrajes dorados
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 10, py - 25, 17, 25);
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + 12, py - 23, 13, 23);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 21, py - 12, 2, 2);

      // Ventana iluminada (halo circular suave, sin rectángulo cuadrado)
      const glow = Math.floor(frame * 0.08) % 2 === 0 ? '#ffd166' : '#fca311';
      const wGrad = ctx.createRadialGradient(px + w - 20, py - 19, 2, px + w - 20, py - 19, 16);
      wGrad.addColorStop(0, 'rgba(255, 209, 102, 0.32)');
      wGrad.addColorStop(1, 'rgba(255, 209, 102, 0)');
      ctx.fillStyle = wGrad;
      ctx.beginPath();
      ctx.arc(px + w - 20, py - 19, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + w - 28, py - 26, 16, 14);
      ctx.fillStyle = glow;
      ctx.fillRect(px + w - 26, py - 24, 12, 10);
      ctx.fillStyle = '#34222e';
      ctx.fillRect(px + w - 21, py - 24, 2, 10);
      ctx.fillRect(px + w - 26, py - 20, 12, 2);
      // Maceta con flores de ceniza bajo la ventana
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + w - 29, py - 12, 18, 4);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + w - 26, py - 14, 3, 2);
      ctx.fillRect(px + w - 18, py - 14, 3, 2);
    } else if (d.type === 'garland') {
      // Guirnalda de farolillos brillantes tendida entre las casas o puentes
      const w = d.w || 120;
      for (let gx = 0; gx <= w; gx += 12) {
        const sag = Math.round(Math.sin((gx / w) * Math.PI) * 10);
        ctx.fillStyle = '#2b1822';
        ctx.fillRect(px + gx, py + sag, 12, 1);
        if (gx > 0 && gx < w) {
          const swing = Math.round(Math.sin(frame * 0.08 + gx) * 1);
          ctx.fillStyle = '#14101c';
          ctx.fillRect(px + gx - 1 + swing, py + sag, 6, 7);
          ctx.fillStyle = (gx / 12) % 2 === 0 ? '#ffd166' : '#ff5400';
          ctx.fillRect(px + gx + swing, py + sag + 1, 4, 5);
        }
      }
    } else if (d.type === 'campfire') {
      // Fogata acogedora con bancos de piedra estilo Hollow Knight (halo circular real)
      const flicker = Math.floor(frame * 0.3) % 3;
      const grad = ctx.createRadialGradient(px + 10, py - 8, 2, px + 10, py - 8, 30);
      grad.addColorStop(0, 'rgba(255, 175, 50, 0.44)');
      grad.addColorStop(1, 'rgba(255, 84, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px + 10, py - 8, 30, 0, Math.PI * 2);
      ctx.fill();

      // Bancos de descanso a los lados
      ctx.fillStyle = '#2b1822';
      ctx.fillRect(px - 22, py - 8, 16, 4);
      ctx.fillRect(px - 20, py - 4, 3, 4);
      ctx.fillRect(px - 11, py - 4, 3, 4);
      ctx.fillRect(px + 26, py - 8, 16, 4);
      ctx.fillRect(px + 28, py - 4, 3, 4);
      ctx.fillRect(px + 37, py - 4, 3, 4);

      // Troncos y piedras
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + 2, py - 5, 16, 4);
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(px, py - 3, 5, 3);
      ctx.fillRect(px + 15, py - 3, 5, 3);

      // Llamas animadas
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(px + 4, py - 15 - flicker, 12, 11 + flicker);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 6, py - 11 - (flicker % 2), 8, 7);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 8, py - 8, 4, 4);
    } else if (d.type === 'signpost') {
      // Letrero de madera de explorador
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 6, py - 26, 4, 26);
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + 7, py - 25, 2, 25);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 2, py - 23, 22, 8);
      ctx.fillStyle = '#7f4f24';
      ctx.fillRect(px, py - 22, 18, 6);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 3, py - 20, 11, 2);
    } else if (d.type === 'minecart') {
      // Vagoneta minera llena de minerales incandescentes y gemas
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(px + 3, py - 18, 6, 5);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 10, py - 19, 5, 6);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 15, py - 17, 5, 4);
      // Caja de hierro
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 14, 24, 11);
      ctx.fillStyle = '#3b3355';
      ctx.fillRect(px + 2, py - 12, 20, 8);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 3, py - 4, 5, 4);
      ctx.fillRect(px + 16, py - 4, 5, 4);
    } else if (d.type === 'mushrooms') {
      // Hongos bioluminiscentes de caverna (SIN bloque cuadrado; con esporas pixeladas flotantes)
      const isCyan = d.color === 'cyan';
      const capColor = isCyan ? '#00f5d4' : (d.color === 'magenta' ? '#ff007f' : '#ff7b00');
      const hiColor = isCyan ? '#caf0f8' : (d.color === 'magenta' ? '#ff8fab' : '#ffd166');
      // Tallos
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 1, py - 7, 4, 7);
      ctx.fillRect(px + 7, py - 10, 4, 10);
      ctx.fillRect(px + 13, py - 6, 4, 6);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px + 2, py - 6, 2, 6);
      ctx.fillRect(px + 8, py - 9, 2, 9);
      ctx.fillRect(px + 14, py - 5, 2, 5);
      // Sombreros brillantes con borde oscuro nítido
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 1, py - 10, 8, 4);
      ctx.fillRect(px + 5, py - 13, 8, 4);
      ctx.fillRect(px + 12, py - 8, 6, 3);
      ctx.fillStyle = capColor;
      ctx.fillRect(px, py - 9, 6, 2);
      ctx.fillRect(px + 6, py - 12, 6, 2);
      ctx.fillRect(px + 13, py - 7, 4, 2);
      ctx.fillStyle = hiColor;
      ctx.fillRect(px + 1, py - 9, 2, 1);
      ctx.fillRect(px + 7, py - 12, 2, 1);
      // Esporas bioluminiscentes flotando hacia arriba (1x1 px)
      const sporeY = Math.round((frame * 0.25 + px) % 10);
      ctx.fillStyle = hiColor;
      ctx.fillRect(px + 3, py - 13 - sporeY, 1, 1);
      ctx.fillRect(px + 11, py - 11 - ((sporeY + 5) % 10), 1, 1);
    } else if (d.type === 'crystal') {
      // Racimo de cristales geotérmicos brillantes (SIN bloque cuadrado)
      const c1 = d.color === 'cyan' ? '#00b4d8' : (d.color === 'magenta' ? '#b5179e' : '#ff5400');
      const c2 = d.color === 'cyan' ? '#90e0ef' : (d.color === 'magenta' ? '#ff8fab' : '#ffd166');
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 15, 7, 15);
      ctx.fillRect(px + 6, py - 11, 7, 11);
      ctx.fillStyle = c1;
      ctx.fillRect(px + 1, py - 14, 5, 14);
      ctx.fillRect(px + 7, py - 10, 5, 10);
      ctx.fillStyle = c2;
      ctx.fillRect(px + 2, py - 13, 2, 9);
      ctx.fillRect(px + 8, py - 9, 2, 6);
      // Destello pixelado en la punta
      if (Math.floor((frame + px) * 0.1) % 3 === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 3, py - 17, 2, 2);
      }
    } else if (d.type === 'giant_crystal') {
      // Gran aguja de cristal estilo "Crystal Peak" (SIN bloque cuadrado; con destellos puros)
      const isCyan = d.color === 'cyan';
      const mainCol = isCyan ? '#0096c7' : '#e85d04';
      const hiCol = isCyan ? '#caf0f8' : '#ffd166';
      // Tres puntas cristalinas escalonadas con contorno oscuro
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 4, py - 38, 12, 38);
      ctx.fillRect(px - 2, py - 24, 8, 24);
      ctx.fillRect(px + 14, py - 28, 8, 28);
      ctx.fillStyle = mainCol;
      ctx.fillRect(px + 6, py - 36, 8, 35);
      ctx.fillRect(px, py - 22, 5, 21);
      ctx.fillRect(px + 15, py - 26, 5, 25);
      ctx.fillStyle = hiCol;
      ctx.fillRect(px + 8, py - 34, 3, 28);
      ctx.fillRect(px + 1, py - 20, 2, 14);
      ctx.fillRect(px + 16, py - 24, 2, 16);
      // Partículas cristalinas flotando alrededor
      const glint = Math.floor(frame * 0.12 + px) % 12;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 9, py - 41 - (glint % 4), 2, 2);
      ctx.fillStyle = hiCol;
      ctx.fillRect(px - 4, py - 18 - (glint % 6), 2, 2);
      ctx.fillRect(px + 22, py - 24 - ((glint + 3) % 6), 2, 2);
    } else if (d.type === 'ceiling_crystals') {
      // Drusas de cristal y estalactitas colgando del techo de la caverna (Fase 2)
      const isCyan = d.color !== 'orange';
      const cMain = isCyan ? '#0096c7' : '#e85d04';
      const cHi = isCyan ? '#90e0ef' : '#ffd166';
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py, 28, 10);
      ctx.fillRect(px + 3, py + 8, 7, 16);
      ctx.fillRect(px + 11, py + 8, 8, 24);
      ctx.fillRect(px + 20, py + 8, 6, 14);
      ctx.fillStyle = cMain;
      ctx.fillRect(px + 4, py + 6, 5, 16);
      ctx.fillRect(px + 12, py + 6, 6, 24);
      ctx.fillRect(px + 21, py + 6, 4, 14);
      ctx.fillStyle = cHi;
      ctx.fillRect(px + 14, py + 8, 2, 18);
      ctx.fillRect(px + 5, py + 8, 2, 10);
    } else if (d.type === 'miner_camp') {
      // Campamento de Expedición Minera en las Galerías de Cristal (Tienda de campaña + Mesa de planos + Caja de gemas)
      // Tienda de lona y madera
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 38, 52, 38);
      ctx.fillStyle = '#3d263b';
      ctx.fillRect(px + 2, py - 36, 48, 36);
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(px + 4, py - 34, 44, 12);
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(px + 6, py - 34, 40, 4);
      // Entrada abierta de la tienda con farol interno cálido
      ctx.fillStyle = '#191024';
      ctx.fillRect(px + 14, py - 22, 24, 22);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 24, py - 18, 4, 5);
      // Mesa de madera del cartógrafo al lado con pergaminos
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + 56, py - 14, 26, 4);
      ctx.fillRect(px + 59, py - 10, 3, 10);
      ctx.fillRect(px + 76, py - 10, 3, 10);
      ctx.fillStyle = '#f4e285';
      ctx.fillRect(px + 60, py - 17, 14, 3);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 75, py - 19, 4, 5);
    } else if (d.type === 'pulley_crane') {
      // Grúa de polea minera que sube cristales pesados en la Fase 2
      const h = d.h || 64;
      const sway = Math.round(Math.sin(frame * 0.06 + px) * 2);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h, 8, h);
      ctx.fillRect(px - 2, py - h, 36, 7);
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + 2, py - h + 2, 4, h - 2);
      ctx.fillRect(px, py - h + 2, 32, 3);
      // Rueda de polea y cuerda con cristal colgante
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 26, py - h - 2, 6, 6);
      ctx.fillStyle = '#8d99ae';
      ctx.fillRect(px + 28 + sway, py - h + 5, 2, 24);
      // Cristal cian suspendido en red
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 23 + sway, py - h + 28, 12, 14);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 25 + sway, py - h + 30, 8, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 27 + sway, py - h + 32, 3, 6);
    } else if (d.type === 'lumafly_swarm') {
      // Enjambre vivo de Luciérnagas Bioluminiscentes (Estilo Lumaflies de Hollow Knight)
      const isCyan = d.color === 'cyan';
      const coreCol = isCyan ? '#caf0f8' : '#fff3b0';
      const wingCol = isCyan ? '#00f5d4' : '#ff9e00';
      for (let i = 0; i < 4; i++) {
        const ang = frame * 0.06 + i * 1.57 + px * 0.1;
        const lx = px + Math.round(Math.cos(ang) * 14 + Math.sin(ang * 2) * 5);
        const ly = py + Math.round(Math.sin(ang * 1.5) * 9);
        ctx.fillStyle = wingCol;
        ctx.fillRect(lx - 1, ly, 4, 2);
        ctx.fillStyle = coreCol;
        ctx.fillRect(lx, ly, 2, 2);
      }
    } else if (d.type === 'blast_furnace') {
      // Alto Horno Monumental de la Forja de Obsidiana (Fase 3: estructura viva con fuego y colada de magma)
      const flicker = Math.floor(frame * 0.3) % 3;
      // Chimenea doble superior humeante
      const puff = (frame * 0.5) % 16;
      ctx.fillStyle = 'rgba(255, 140, 60, 0.32)';
      ctx.fillRect(px + 10, Math.round(py - 72 - puff), 6, 5);
      ctx.fillRect(px + 34, Math.round(py - 76 - puff * 0.8), 6, 5);

      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 8, py - 64, 12, 18);
      ctx.fillRect(px + 32, py - 64, 12, 18);
      ctx.fillStyle = '#2b2d42';
      ctx.fillRect(px + 10, py - 62, 8, 16);
      ctx.fillRect(px + 34, py - 62, 8, 16);

      // Cuerpo acorazado del Alto Horno (52x48)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 48, 52, 48);
      ctx.fillStyle = '#251724';
      ctx.fillRect(px + 2, py - 46, 48, 44);
      // Bandas de hierro remachado y bronce
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(px, py - 42, 52, 4);
      ctx.fillRect(px, py - 26, 52, 4);
      ctx.fillStyle = '#ffd166';
      for (let rx = px + 6; rx < px + 48; rx += 10) {
        ctx.fillRect(rx, py - 41, 2, 2);
        ctx.fillRect(rx, py - 25, 2, 2);
      }

      // Boca de fuego rugiente con rejas de hierro
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 12, py - 20, 28, 16);
      ctx.fillStyle = '#ff2a55';
      ctx.fillRect(px + 14, py - 18, 24, 12);
      ctx.fillStyle = '#ff7b00';
      ctx.fillRect(px + 16, py - 15 - flicker, 20, 9 + flicker);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 20, py - 12, 12, 6);
      // Barrotes de la parrilla del horno
      ctx.fillStyle = '#14101c';
      for (let gx = px + 18; gx <= px + 34; gx += 5) {
        ctx.fillRect(gx, py - 18, 2, 12);
      }
    } else if (d.type === 'forge_wheel') {
      // Rueda Hidráulica / Engranaje Gigante de Forja girando con magma (Fase 3)
      const cx = px + 18;
      const cy = py - 20;
      const step = Math.floor(frame * 0.15) % 2;
      // Soportes de piedra
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 2, py - 18, 32, 18);
      // Aro de hierro del engranaje
      ctx.fillStyle = '#2b2d42';
      ctx.fillRect(cx - 14, cy - 14, 28, 28);
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(cx - 12, cy - 12, 24, 24);
      ctx.fillStyle = '#191024';
      ctx.fillRect(cx - 8, cy - 8, 16, 16);
      // Dientes animados y núcleo incandescente
      ctx.fillStyle = '#ffd166';
      if (step === 0) {
        ctx.fillRect(cx - 2, cy - 16, 4, 32);
        ctx.fillRect(cx - 16, cy - 2, 32, 4);
      } else {
        ctx.fillRect(cx - 12, cy - 12, 6, 6);
        ctx.fillRect(cx + 6, cy - 12, 6, 6);
        ctx.fillRect(cx - 12, cy + 6, 6, 6);
        ctx.fillRect(cx + 6, cy + 6, 6, 6);
      }
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(cx - 4, cy - 4, 8, 8);
    } else if (d.type === 'hanging_cage') {
      // Jaula de hierro colgante estilo Hollow Knight / Forja (se mece suavemente)
      const chainH = d.chainH || 36;
      const sway = Math.round(Math.sin(frame * 0.05 + px) * 2);
      for (let cy = py; cy < py + chainH; cy += 7) {
        ctx.fillStyle = '#4a4e69';
        ctx.fillRect(px + 9 + Math.round(sway * ((cy - py) / chainH)), cy, 4, 5);
      }
      const kx = px + sway;
      const ky = py + chainH;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(kx, ky, 22, 26);
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(kx + 1, ky + 1, 20, 3);
      ctx.fillRect(kx + 1, ky + 22, 20, 3);
      for (let bx = kx + 2; bx <= kx + 18; bx += 4) {
        ctx.fillRect(bx, ky + 4, 2, 18);
      }
      // Brasa o calavera brillante dentro de la jaula
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(kx + 8, ky + 16, 6, 5);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(kx + 9, ky + 17, 4, 3);
    } else if (d.type === 'weapon_rack') {
      // Armero de lanzas y escudos forjados (Fases 3 y 4)
      ctx.fillStyle = '#583101';
      ctx.fillRect(px, py - 18, 26, 3);
      ctx.fillRect(px + 2, py - 24, 3, 24);
      ctx.fillRect(px + 21, py - 24, 3, 24);
      // Lanzas verticales con puntas incandescentes
      for (let sx = px + 6; sx <= px + 18; sx += 5) {
        ctx.fillStyle = '#8d99ae';
        ctx.fillRect(sx, py - 32, 2, 32);
        ctx.fillStyle = '#ff5400';
        ctx.fillRect(sx - 1, py - 37, 4, 6);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(sx, py - 36, 2, 4);
      }
    } else if (d.type === 'colosseum_tribune') {
      // Gran Arco / Tribuna Imperial del Coliseo del Cráter (Fase 4: Arena del Boss)
      const w = d.w || 96;
      const h = d.h || 92;
      ctx.fillStyle = '#190d1a';
      ctx.fillRect(px, py - h, 14, h);
      ctx.fillRect(px + w - 14, py - h, 14, h);
      ctx.fillRect(px - 6, py - h, w + 12, 16);
      ctx.fillStyle = '#2d182e';
      ctx.fillRect(px + 3, py - h + 3, w - 6, 10);
      // Cornisa dorada y emblemas reales del Coliseo
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 4, py - h + 2, w + 8, 2);
      ctx.fillStyle = '#ff2a55';
      ctx.fillRect(px + Math.floor(w / 2) - 6, py - h + 5, 12, 8);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + Math.floor(w / 2) - 3, py - h + 7, 6, 4);
    } else if (d.type === 'steam_pipe') {
      // Tubería geotérmica antigua con manómetro y chorros de vapor
      const h = d.h || 70;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h, 12, h);
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(px + 2, py - h, 8, h);
      ctx.fillStyle = '#8d99ae';
      ctx.fillRect(px + 3, py - h, 2, h);
      // Anillos de bronce
      ctx.fillStyle = '#ca6702';
      for (let ry = py - h + 10; ry < py - 6; ry += 22) {
        ctx.fillRect(px - 1, ry, 14, 4);
      }
      // Nube de vapor animada saliendo de la válvula
      const puff = (frame * 0.6) % 16;
      ctx.fillStyle = 'rgba(220, 240, 255, 0.35)';
      ctx.fillRect(px + 12 + Math.round(puff), py - 28 - Math.round(puff * 0.3), 6, 5);
    } else if (d.type === 'stone_arch') {
      // Arco gótico subterráneo estilo Hollow Knight que enmarca los caminos
      const w = d.w || 64;
      const h = d.h || 75;
      ctx.fillStyle = '#1c0f1b';
      ctx.fillRect(px, py - h, 10, h);
      ctx.fillRect(px + w - 10, py - h, 10, h);
      ctx.fillRect(px - 4, py - h, w + 8, 12);
      ctx.fillStyle = '#2d192b';
      ctx.fillRect(px + 2, py - h + 2, w - 4, 8);
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(px + Math.floor(w / 2) - 2, py - h + 3, 4, 6);
    } else if (d.type === 'crucible') {
      // Gran Caldero de Fundición colgante derramando lava dorada (Fase 3: La Forja)
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(px + 11, py - 68, 4, 30);
      // Cuerpo del caldero
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 40, 26, 20);
      ctx.fillStyle = '#2b2d42';
      ctx.fillRect(px + 2, py - 38, 22, 16);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 3, py - 40, 20, 3);
      // Chorro de magma cayendo del caldero
      const flow = Math.floor(frame * 0.7) % 8;
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(px + 9, py - 20, 8, 20);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 11, py - 20 + flow, 4, 10);
    } else if (d.type === 'anvil') {
      // Yunque de herrero con espada incandescente recién forjada (Fase 3)
      ctx.fillStyle = '#2b1822';
      ctx.fillRect(px, py - 6, 22, 6);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 3, py - 15, 16, 9);
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(px + 1, py - 16, 20, 5);
      // Espada de fuego apoyada
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(px + 9, py - 26, 3, 12);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 7, py - 20, 7, 2);
    } else if (d.type === 'banner') {
      // Estandarte real carmesí y oro ondeando en la Forja y en el Cráter
      const h = d.h || 42;
      const sway = Math.round(Math.sin(frame * 0.09 + px) * 2);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 2, py - h, 18, 2);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h + 2, 14, h - 8);
      ctx.fillStyle = '#9b2d57';
      ctx.fillRect(px + 1 + sway * 0.5, py - h + 3, 12, h - 10);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 5 + sway * 0.5, py - h + 10, 4, 12);
    } else if (d.type === 'statue') {
      // Estatua ancestral de Ratón Caballero (Estilo Hollow Knight) en el Cráter
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 10, 26, 10);
      ctx.fillStyle = '#3d263b';
      ctx.fillRect(px + 2, py - 9, 22, 8);
      // Silueta de piedra del caballero ratón
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 5, py - 42, 16, 32);
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(px + 7, py - 40, 12, 29);
      // Orejas y yelmo
      ctx.fillRect(px + 5, py - 46, 5, 6);
      ctx.fillRect(px + 16, py - 46, 5, 6);
      // Ojos brillantes de la estatua y lanza vertical
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 11, py - 36, 4, 2);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 21, py - 54, 2, 44);
      ctx.fillStyle = '#ff2a55';
      ctx.fillRect(px + 20, py - 58, 4, 6);
    } else if (d.type === 'beast_skull') {
      // Cráneo fosilizado de dragón/bestia volcánica antigua
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 16, 26, 16);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px + 2, py - 14, 22, 12);
      // Cuernos curvados hacia arriba
      ctx.fillStyle = '#4a4e69';
      ctx.fillRect(px - 3, py - 24, 5, 12);
      ctx.fillRect(px + 24, py - 24, 5, 12);
      // Cuenca ocular encendida con brasa
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 6, py - 10, 5, 5);
      ctx.fillRect(px + 15, py - 10, 5, 5);
      ctx.fillStyle = '#ff5400';
      ctx.fillRect(px + 8, py - 9, 2, 2);
      ctx.fillRect(px + 17, py - 9, 2, 2);
    } else if (d.type === 'pillar') {
      // Pilar antiguo de la Forja o del Cráter con runas ígneas
      const h = d.h || 90;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 2, py - h, 24, h);
      ctx.fillStyle = '#251724';
      ctx.fillRect(px, py - h + 4, 20, h - 8);
      ctx.fillStyle = '#3d263b';
      ctx.fillRect(px - 4, py - h, 28, 7);
      ctx.fillRect(px - 4, py - 7, 28, 7);
      const glow = Math.floor(frame * 0.08) % 2 === 0 ? '#ff5400' : '#ffd166';
      ctx.fillStyle = glow;
      for (let ry = py - h + 18; ry < py - 16; ry += 18) {
        ctx.fillRect(px + 8, ry, 4, 8);
      }
    } else if (d.type === 'chain') {
      // Cadenas pesadas de forja colgando
      const h = d.h || 80;
      for (let cy = py; cy < py + h; cy += 8) {
        ctx.fillStyle = '#14101c';
        ctx.fillRect(px, cy, 6, 7);
        ctx.fillStyle = '#4a4e69';
        ctx.fillRect(px + 1, cy + 1, 4, 5);
      }
    } else if (d.type === 'brazier') {
      // Brasero ceremonial del Cráter (Halo circular real sin bloque cuadrado)
      const flicker = Math.floor(frame * 0.25) % 3;
      const bGrad = ctx.createRadialGradient(px + 8, py - 18, 2, px + 8, py - 18, 20);
      bGrad.addColorStop(0, 'rgba(255, 110, 30, 0.38)');
      bGrad.addColorStop(1, 'rgba(255, 42, 85, 0)');
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.arc(px + 8, py - 18, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 16, 16, 16);
      ctx.fillStyle = '#3d263b';
      ctx.fillRect(px + 2, py - 14, 12, 6);
      ctx.fillRect(px + 5, py - 8, 6, 8);
      ctx.fillStyle = '#ff2a55';
      ctx.fillRect(px + 2, py - 23 - flicker, 12, 8 + flicker);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 5, py - 20, 6, 5);
    }
  }

  // ==========================================================================