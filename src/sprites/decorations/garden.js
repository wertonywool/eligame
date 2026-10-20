// ============================================================================
// DECORACIONES DEL JARDÍN (PÉRGOLAS, ROSALES, CEREZOS, FUENTES)
// ============================================================================
SpriteManager.prototype.drawGardenDecor = function(ctx, d, frame) {
    const px = Math.round(d.x);
    const py = Math.round(d.y);

    // ------------------------------------------------------------------------
    // 🌿 FASE 1: ALDEA DEL TRÉBOL Y JARDÍN SILVESTRE
    // ------------------------------------------------------------------------
    // 🌿 FASE 1: LA ALDEA DEL TRÉBOL Y EL SENDERO DE LOS CEREZOS (SAKURAS)
    // ------------------------------------------------------------------------
    if (d.type === 'garden_cottage') {
      // 🏡 Cabaña de Té / Madriguera Botánica con Tejado de Cedro y Linterna Cálida
      const w = d.w || 74;
      const h = d.h || 52;

      // Chimenea de piedra con bocanada de humo animada
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + w - 20, py - h - 10, 10, 14);
      ctx.fillStyle = '#6c757d';
      ctx.fillRect(px + w - 18, py - h - 8, 7, 12);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + w - 19, py - h - 10, 9, 2);
      // Humo aromático ascendente
      const smokeCycle = (frame * 0.35) % 18;
      const smokeDrift = Math.sin(frame * 0.1) * 3;
      ctx.fillStyle = 'rgba(255, 230, 240, 0.45)';
      ctx.fillRect(px + w - 16 + smokeDrift, py - h - 12 - smokeCycle, 4, 4);
      ctx.fillStyle = 'rgba(255, 230, 240, 0.25)';
      ctx.fillRect(px + w - 18 + smokeDrift * 1.5, py - h - 18 - smokeCycle * 0.8, 6, 6);

      // Muros de madera de roble cálido
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h, w, h);
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + 2, py - h + 2, w - 4, h - 2);
      ctx.fillStyle = '#6f4518';
      ctx.fillRect(px + 4, py - h + 4, w - 8, h - 6);
      // Vigas de madera horizontales
      ctx.fillStyle = '#3e2723';
      ctx.fillRect(px + 3, py - h + 14, w - 6, 3);
      ctx.fillRect(px + 3, py - h + 28, w - 6, 3);

      // Tejado curvado de cedro con aleros y musgo esmeralda
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 8, py - h - 6, w + 16, 12);
      ctx.fillRect(px - 11, py - h - 4, 5, 4);
      ctx.fillRect(px + w + 6, py - h - 4, 5, 4);
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px - 6, py - h - 4, w + 12, 8);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px - 2, py - h - 6, w + 4, 3);
      // Tejas de madera y flores de cerezo caídas en el tejado
      for (let tx = px + 6; tx < px + w - 6; tx += 12) {
        ctx.fillStyle = '#ff8fab';
        ctx.fillRect(tx, py - h - 6, 3, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(tx + 4, py - h - 5, 2, 2);
      }

      // Puerta redondeada de madera con marco floral
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 10, py - 26, 18, 26);
      ctx.fillStyle = '#bc6c25';
      ctx.fillRect(px + 12, py - 24, 14, 24);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 22, py - 13, 2, 2);

      // Ventana de papel shōji iluminada cálidamente
      const wGrad = ctx.createRadialGradient(px + w - 20, py - 20, 2, px + w - 20, py - 20, 18);
      wGrad.addColorStop(0, 'rgba(255, 225, 105, 0.45)');
      wGrad.addColorStop(1, 'rgba(255, 225, 105, 0)');
      ctx.fillStyle = wGrad;
      ctx.beginPath();
      ctx.arc(px + w - 20, py - 20, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + w - 28, py - 26, 16, 14);
      ctx.fillStyle = '#fff3b0';
      ctx.fillRect(px + w - 26, py - 24, 12, 10);
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + w - 21, py - 24, 2, 10);
      ctx.fillRect(px + w - 26, py - 20, 12, 2);

      // Jardinera con lirios y rosas bajo la ventana
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px + w - 30, py - 12, 20, 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + w - 27, py - 15, 3, 3);
      ctx.fillRect(px + w - 19, py - 15, 3, 3);
      ctx.fillStyle = '#ff758f';
      ctx.fillRect(px + w - 23, py - 14, 3, 3);

    } else if (d.type === 'cherry_tree') {
      // 🌸 Árbol de Cerezo Japonés (Sakura) Esbelto, Armonioso y Estilizado (Proporciones refinadas sin sobrecargar)
      const h = d.h || (d.size === 'grand' ? 74 : 58);
      const isGrand = d.size === 'grand' || h >= 70;
      const cx = px + (isGrand ? 28 : 22);
      const trunkW = isGrand ? 8 : 6;

      // Base musgosa sutil con pétalos caídos
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 10, py - 4, 20, 4);
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(cx - 9, py - 3, 18, 3);
      for (let fx = cx - 12; fx <= cx + 12; fx += 5) {
        ctx.fillStyle = fx % 10 === 0 ? '#ffb3c6' : '#ff758f';
        ctx.fillRect(fx, py - 2, 2, 2);
      }

      // Tronco curvado esbelto con madera noble y corteza tallada
      ctx.fillStyle = '#14101c';
      ctx.beginPath();
      ctx.moveTo(cx - trunkW / 2 - 1, py);
      ctx.quadraticCurveTo(cx - trunkW / 2 + 1, py - h * 0.45, cx - trunkW / 2 - 2, py - h * 0.7);
      ctx.lineTo(cx + trunkW / 2 + 2, py - h * 0.7);
      ctx.quadraticCurveTo(cx + trunkW / 2 + 1, py - h * 0.45, cx + trunkW / 2 + 1, py);
      ctx.fill();

      ctx.fillStyle = '#4e342e';
      ctx.beginPath();
      ctx.moveTo(cx - trunkW / 2, py);
      ctx.quadraticCurveTo(cx - trunkW / 2 + 1, py - h * 0.45, cx - trunkW / 2 - 1, py - h * 0.7);
      ctx.lineTo(cx + trunkW / 2 + 1, py - h * 0.7);
      ctx.quadraticCurveTo(cx + trunkW / 2, py - h * 0.45, cx + trunkW / 2, py);
      ctx.fill();

      // Veta de luz en la corteza
      ctx.fillStyle = '#795548';
      ctx.fillRect(cx - 1, py - Math.round(h * 0.6), 2, Math.round(h * 0.4));

      // Ramitas arqueadas
      const branchY = py - Math.round(h * 0.65);
      ctx.fillStyle = '#3e2723';
      ctx.fillRect(cx - 11, branchY - 4, 10, 3);
      ctx.fillRect(cx + 3, branchY - 3, 11, 3);

      // Nubes de flor de cerezo: 3 masas compactas y vaporosas
      const clouds = isGrand ? [
        { x: cx, y: py - h + 14, rx: 22, ry: 15 },
        { x: cx - 16, y: py - h + 19, rx: 16, ry: 13 },
        { x: cx + 16, y: py - h + 18, rx: 17, ry: 13 }
      ] : [
        { x: cx, y: py - h + 12, rx: 17, ry: 12 },
        { x: cx - 12, y: py - h + 16, rx: 13, ry: 10 },
        { x: cx + 12, y: py - h + 15, rx: 13, ry: 10 }
      ];

      // Contorno oscuro de soporte
      ctx.fillStyle = '#14101c';
      for (const c of clouds) {
        ctx.beginPath();
        ctx.ellipse(c.x, c.y + 1, c.rx + 1.5, c.ry + 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Base carmín
      ctx.fillStyle = '#a21b5d';
      for (const c of clouds) {
        ctx.beginPath();
        ctx.ellipse(c.x, c.y + 1, c.rx, c.ry, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cuerpo rosa sakura
      ctx.fillStyle = '#ff758f';
      for (const c of clouds) {
        ctx.beginPath();
        ctx.ellipse(c.x, c.y - 1, c.rx - 1.5, c.ry - 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Luz pastel
      ctx.fillStyle = '#ffcad4';
      for (const c of clouds) {
        ctx.beginPath();
        ctx.ellipse(c.x - 1, c.y - 3, Math.max(2, c.rx - 4), Math.max(2, c.ry - 4), 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Brillo blanco en la cima
      ctx.fillStyle = '#ffffff';
      for (const c of clouds) {
        ctx.beginPath();
        ctx.ellipse(c.x - 2, c.y - 5, Math.max(2, c.rx - 8), Math.max(1, c.ry - 7), 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3 ramilletes colgantes sutiles
      const sway = Math.sin(frame * 0.05 + px * 0.1) * 1.5;
      const sprigs = [cx - 10, cx, cx + 10];
      for (let i = 0; i < sprigs.length; i++) {
        const sx = sprigs[i];
        const sy = py - h + (isGrand ? 25 : 21) + (i % 2) * 3;
        ctx.fillStyle = '#3e2723';
        ctx.fillRect(sx, sy, 1, 4);
        ctx.fillStyle = '#ff758f';
        ctx.fillRect(sx - 1 + sway, sy + 3, 3, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(sx + sway, sy + 4, 1, 1);
      }

      // 3 pétalos flotantes cayendo despacio
      for (let i = 0; i < 3; i++) {
        const pSpeed = 0.35 + i * 0.1;
        const pFall = ((frame * pSpeed + i * 19 + px) % (h * 0.65));
        const pSway = Math.sin(frame * 0.07 + i * 2) * 4;
        const petalX = cx - 12 + i * 12 + pSway;
        const petalY = py - h + 22 + pFall;
        ctx.fillStyle = i % 2 === 0 ? '#ffb3c6' : '#ffffff';
        ctx.fillRect(Math.round(petalX), Math.round(petalY), 2, 2);
      }

    } else if (d.type === 'torii_gate') {
      // ⛩️ Pórtico Sagrado Torii Bermellón del Sendero de los Cerezos
      const w = d.w || 76;
      const h = d.h || 84;
      const cx = px + Math.floor(w / 2);

      // Pedestales de piedra en la base
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 6, py - 8, 14, 8);
      ctx.fillRect(px + w - 20, py - 8, 14, 8);
      ctx.fillStyle = '#6c757d';
      ctx.fillRect(px + 8, py - 7, 10, 7);
      ctx.fillRect(px + w - 18, py - 7, 10, 7);
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px + 7, py - 3, 4, 3);
      ctx.fillRect(px + w - 19, py - 3, 4, 3);

      // Pilares cilíndricos bermellón (Hashira)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 8, py - h + 14, 10, h - 21);
      ctx.fillRect(px + w - 18, py - h + 14, 10, h - 21);
      ctx.fillStyle = '#ba181b';
      ctx.fillRect(px + 9, py - h + 15, 8, h - 22);
      ctx.fillRect(px + w - 17, py - h + 15, 8, h - 22);
      ctx.fillStyle = '#e5383b';
      ctx.fillRect(px + 10, py - h + 15, 2, h - 22);
      ctx.fillRect(px + w - 16, py - h + 15, 2, h - 22);

      // Travesaño intermedio (Nuki) en bermellón
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 2, py - h + 24, w - 4, 6);
      ctx.fillStyle = '#ba181b';
      ctx.fillRect(px + 3, py - h + 25, w - 6, 4);

      // Dintel y Viga Superior Curvada (Kasagi & Shimaki)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 4, py - h + 10, w + 8, 6);
      ctx.fillStyle = '#e5383b';
      ctx.fillRect(px - 2, py - h + 11, w + 4, 3);

      // Gran dintel curvo negro superior con puntas aladas
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 10, py - h, w + 20, 8);
      ctx.fillRect(px - 14, py - h - 3, 8, 5);
      ctx.fillRect(px + w + 6, py - h - 3, 8, 5);
      ctx.fillStyle = '#2b2d42';
      ctx.fillRect(px - 9, py - h + 1, w + 18, 5);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 14, py - h - 2, 4, 2);
      ctx.fillRect(px + w + 10, py - h - 2, 4, 2);

      // Tablilla sagrada central (Gakuzuka)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 7, py - h + 14, 14, 12);
      ctx.fillStyle = '#583101';
      ctx.fillRect(cx - 5, py - h + 15, 10, 10);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(cx - 2, py - h + 17, 4, 6);

      // Cuerda sagrada de paja (Shimenawa) y colgantes blancos (Shide)
      ctx.fillStyle = '#ddb892';
      ctx.fillRect(px + 14, py - h + 21, w - 28, 3);
      for (let sx = px + 22; sx < px + w - 22; sx += 14) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(sx, py - h + 24, 3, 7);
        ctx.fillRect(sx + 2, py - h + 27, 2, 4);
      }

      // Faroles de papel rojos (Chōchin) colgantes bajo el arco
      for (const lx of [px + 14, px + w - 19]) {
        ctx.fillStyle = '#14101c';
        ctx.fillRect(lx + 2, py - h + 30, 2, 6);
        ctx.fillStyle = '#14101c';
        ctx.fillRect(lx - 1, py - h + 36, 8, 12);
        ctx.fillStyle = '#e63946';
        ctx.fillRect(lx, py - h + 37, 6, 10);
        const pulse = Math.sin(frame * 0.12 + lx) * 0.15 + 0.85;
        ctx.fillStyle = `rgba(255, 209, 102, ${pulse.toFixed(2)})`;
        ctx.fillRect(lx + 1, py - h + 39, 4, 6);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(lx + 2, py - h + 41, 2, 2);
        ctx.fillStyle = '#14101c';
        ctx.fillRect(lx + 1, py - h + 48, 4, 3);
      }

    } else if (d.type === 'stone_lantern') {
      // 🏮 Farol Tōrō de Piedra Japonés con Ventana Iluminada y Musgo
      const cx = px + 10;
      // Base escalonada de granito
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 8, py - 4, 16, 4);
      ctx.fillRect(cx - 6, py - 8, 12, 4);
      ctx.fillStyle = '#495057';
      ctx.fillRect(cx - 7, py - 3, 14, 3);
      ctx.fillRect(cx - 5, py - 7, 10, 3);
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(cx - 8, py - 4, 4, 3);
      ctx.fillRect(cx + 4, py - 6, 3, 2);

      // Pedestal central (Sao)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 3, py - 18, 6, 10);
      ctx.fillStyle = '#6c757d';
      ctx.fillRect(cx - 2, py - 18, 4, 10);

      // Plataforma intermedia (Chūdai)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 7, py - 21, 14, 3);
      ctx.fillStyle = '#495057';
      ctx.fillRect(cx - 6, py - 20, 12, 2);

      // Cámara de luz (Hibukuro) con vela cálida
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 5, py - 29, 10, 8);
      const glow = Math.sin(frame * 0.15 + px) * 0.15 + 0.85;
      const grad = ctx.createRadialGradient(cx, py - 25, 1, cx, py - 25, 16);
      grad.addColorStop(0, `rgba(255, 230, 109, ${0.45 * glow})`);
      grad.addColorStop(0.6, `rgba(255, 183, 3, ${0.15 * glow})`);
      grad.addColorStop(1, 'rgba(255, 183, 3, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, py - 25, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffb703';
      ctx.fillRect(cx - 3, py - 28, 6, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 1, py - 27, 2, 4);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx, py - 28, 1, 6);

      // Tejado curvado de pagoda (Kasa)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 9, py - 32, 18, 4);
      ctx.fillRect(cx - 6, py - 35, 12, 3);
      ctx.fillStyle = '#495057';
      ctx.fillRect(cx - 8, py - 32, 16, 3);
      ctx.fillRect(cx - 5, py - 34, 10, 2);
      ctx.fillStyle = '#ffb3c6';
      ctx.fillRect(cx - 5, py - 35, 3, 2);
      ctx.fillRect(cx + 3, py - 33, 2, 2);

      // Remate superior (Hōju)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 2, py - 38, 4, 3);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(cx - 1, py - 38, 2, 2);

    } else if (d.type === 'bamboo_fountain') {
      // 🎋 Fuente de Bambú Basculante Japonesa (Shishi-odoshi)
      const cx = px + 16;
      // Cuenca de piedra de agua (Tsukubai)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 12, py - 10, 24, 10);
      ctx.fillStyle = '#495057';
      ctx.fillRect(cx - 10, py - 8, 20, 8);
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(cx - 12, py - 6, 4, 6);
      // Agua reflectante en la cuenca
      ctx.fillStyle = '#16425b';
      ctx.fillRect(cx - 8, py - 7, 16, 6);
      ctx.fillStyle = '#48cae4';
      ctx.fillRect(cx - 6, py - 6, 12, 2);
      const bob = Math.sin(frame * 0.1) * 1;
      ctx.fillStyle = '#ff758f';
      ctx.fillRect(cx - 3, py - 5 + bob, 3, 2);

      // Poste vertical de soporte de bambú
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx + 6, py - 28, 5, 20);
      ctx.fillStyle = '#40916c';
      ctx.fillRect(cx + 7, py - 27, 3, 19);
      ctx.fillStyle = '#74c69d';
      ctx.fillRect(cx + 7, py - 23, 3, 2);
      ctx.fillRect(cx + 7, py - 15, 3, 2);

      // Caño superior de agua de bambú
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 2, py - 27, 10, 4);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(cx - 1, py - 26, 8, 2);

      // Chorro fino de agua continua
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(cx - 2, py - 24, 2, 10);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 2, py - 20 + ((frame * 2) % 4), 1, 2);

      // Tubo basculante de bambú (Sōzu) con animación de vaivén y golpe
      const cycle = Math.floor(frame * 0.15) % 8;
      const isClacking = cycle === 0;
      const angle = isClacking ? 0.35 : -0.15;
      ctx.save();
      ctx.translate(cx + 4, py - 16);
      ctx.rotate(angle);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(-14, -2, 20, 5);
      ctx.fillStyle = '#74c69d';
      ctx.fillRect(-13, -1, 18, 3);
      ctx.fillStyle = '#40916c';
      ctx.fillRect(-6, -1, 2, 3);
      ctx.restore();

      if (isClacking) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(cx - 9, py - 12, 3, 3);
        ctx.fillRect(cx - 4, py - 13, 2, 2);
      }

    } else if (d.type === 'flower_arch') {
      // 🌸 Arco Floral de Madera con Glicinas y Flores de Cerezo Colgantes
      const w = d.w || 68;
      const h = d.h || 76;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h, 10, h);
      ctx.fillRect(px + w - 10, py - h, 10, h);
      ctx.fillRect(px - 6, py - h, w + 12, 12);
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + 2, py - h + 2, 6, h - 2);
      ctx.fillRect(px + w - 8, py - h + 2, 6, h - 2);
      ctx.fillStyle = '#ba181b';
      ctx.fillRect(px - 4, py - h + 2, w + 8, 4);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 5, py - h + 1, 4, 3);
      ctx.fillRect(px + w + 1, py - h + 1, 4, 3);

      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px - 2, py - h + 6, w + 4, 7);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 2, py - h + 7, w - 4, 4);

      const archSway = Math.sin(frame * 0.06 + px * 0.1) * 2;
      for (let fx = px + 8; fx < px + w - 8; fx += 10) {
        const isWisteria = (fx % 20 === 8);
        const col1 = isWisteria ? '#7209b7' : '#f06292';
        const col2 = isWisteria ? '#b5179e' : '#f8bbd0';
        const col3 = isWisteria ? '#f72585' : '#ffffff';
        const vh = 8 + (fx % 5) * 3;
        ctx.fillStyle = col1;
        ctx.fillRect(fx + archSway, py - h + 12, 5, vh);
        ctx.fillStyle = col2;
        ctx.fillRect(fx + 1 + archSway, py - h + 14, 3, vh - 2);
        ctx.fillStyle = col3;
        ctx.fillRect(fx + 2 + archSway, py - h + 12 + vh, 2, 3);
      }
    } else if (d.type === 'garden_fountain') {
      // Fuente Botánica de Piedra Blanca con Agua Cristalina Animada
      const splash = Math.floor(frame * 0.25) % 3;
      // Taza inferior y columna central de mármol
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 10, 36, 10);
      ctx.fillRect(px + 13, py - 24, 10, 14);
      ctx.fillRect(px + 6, py - 27, 24, 5);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px + 2, py - 8, 32, 7);
      ctx.fillRect(px + 15, py - 23, 6, 15);
      ctx.fillRect(px + 8, py - 26, 20, 3);
      // Chorro de agua turquesa brillante
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(px + 4, py - 9, 28, 3);
      ctx.fillStyle = '#90e0ef';
      ctx.fillRect(px + 16, py - 34 - splash, 4, 8 + splash);
      ctx.fillRect(px + 10, py - 24, 2, 14);
      ctx.fillRect(px + 24, py - 24, 2, 14);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 17, py - 35 - splash, 2, 3);
    } else if (d.type === 'flower_bush') {
      // Seto Redondeado de Jardín con Flores Silvestres
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 14, 26, 14);
      ctx.fillRect(px + 4, py - 18, 18, 5);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px + 2, py - 12, 22, 11);
      ctx.fillStyle = '#40916c';
      ctx.fillRect(px + 5, py - 16, 16, 10);
      ctx.fillStyle = '#74c69d';
      ctx.fillRect(px + 7, py - 15, 10, 4);
      // Florecitas en el arbusto
      ctx.fillStyle = d.color === 'yellow' ? '#ffd166' : '#ff8fab';
      ctx.fillRect(px + 5, py - 10, 3, 3);
      ctx.fillRect(px + 13, py - 14, 3, 3);
      ctx.fillRect(px + 18, py - 8, 3, 3);
    } else if (d.type === 'flower_cart') {
      // Carretilla de Madera del Jardinero llena de Lirios
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px + 3, py - 16, 16, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 5, py - 19, 4, 3);
      ctx.fillRect(px + 13, py - 20, 4, 4);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + 9, py - 18, 4, 3);
      // Caja de madera y rueda
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 13, 22, 9);
      ctx.fillStyle = '#bc6c25';
      ctx.fillRect(px + 2, py - 11, 18, 6);
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + 2, py - 5, 6, 5);
      ctx.fillRect(px + 16, py - 5, 3, 5);

    // ------------------------------------------------------------------------
    // 🦋 FASE 2: ESTANQUE DE LOTO E INVERNADERO DE CRISTAL
    // ------------------------------------------------------------------------
    } else if (d.type === 'greenhouse_dome') {
      // Gran Cúpula de Invernadero Victoriano de Hierro Verde y Cristal Traslúcido
      const w = d.w || 88;
      const h = d.h || 64;
      // Cristal iluminado celeste/esmeralda traslúcido
      ctx.fillStyle = 'rgba(72, 202, 228, 0.16)';
      ctx.fillRect(px + 4, py - h + 8, w - 8, h - 8);
      ctx.fillRect(px + 14, py - h, w - 28, 10);
      // Estructura de hierro forjado verde oscuro
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px, py - h + 8, 4, h - 8);
      ctx.fillRect(px + w - 4, py - h + 8, 4, h - 8);
      ctx.fillRect(px, py - h + 8, w, 4);
      ctx.fillRect(px + 12, py - h, w - 24, 4);
      // Nervaduras verticales de los ventanales de cristal
      for (let gx = px + 22; gx < px + w - 16; gx += 22) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(gx, py - h + 8, 2, h - 8);
      }
      // Reflejos diagonales del vidrio
      ctx.fillStyle = 'rgba(202, 240, 248, 0.35)';
      ctx.fillRect(px + 10, py - h + 16, 4, 18);
      ctx.fillRect(px + w - 18, py - h + 20, 4, 18);
      // Plantas tropicales y helechos dentro del invernadero
      ctx.fillStyle = '#40916c';
      ctx.fillRect(px + 12, py - 18, 14, 18);
      ctx.fillRect(px + w - 28, py - 22, 16, 22);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 16, py - 21, 5, 4);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + w - 22, py - 25, 5, 4);
    } else if (d.type === 'greenhouse_arch') {
      // Arco de Hierro Forjado y Cristal del Invernadero con Campanillas Cian
      const w = d.w || 66;
      const h = d.h || 74;
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px, py - h, 8, h);
      ctx.fillRect(px + w - 8, py - h, 8, h);
      ctx.fillRect(px - 3, py - h, w + 6, 10);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 2, py - h + 2, w - 4, 4);
      // Enredaderas y campanillas luminosas colgando del arco
      for (let vx = px + 10; vx < px + w - 10; vx += 14) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(vx, py - h + 10, 2, 9);
        ctx.fillStyle = '#00f5d4';
        ctx.fillRect(vx - 1, py - h + 18, 4, 4);
      }
    } else if (d.type === 'lotus_water') {
      // Superficie de Agua Reflectante del Estanque de Loto (con nenúfares y ondas)
      const w = d.w || 220;
      const shimmer = Math.floor(frame * 0.15) % 16;
      ctx.fillStyle = 'rgba(0, 119, 182, 0.55)';
      ctx.fillRect(px, py - 6, w, 10);
      ctx.fillStyle = '#48cae4';
      ctx.fillRect(px, py - 6, w, 2);
      // Ondas de luz sobre el agua
      ctx.fillStyle = '#caf0f8';
      for (let wx = px + shimmer; wx < px + w - 14; wx += 28) {
        ctx.fillRect(wx, py - 4, 10, 1);
      }
      // Hojas de nenúfar y flores de loto flotando en el agua
      for (let lx = px + 24; lx < px + w - 30; lx += 65) {
        ctx.fillStyle = '#40916c';
        ctx.fillRect(lx, py - 7, 14, 3);
        ctx.fillStyle = '#ff8fab';
        ctx.fillRect(lx + 4, py - 11, 6, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(lx + 6, py - 12, 2, 3);
      }
    } else if (d.type === 'cattails') {
      // Juncos Acuáticos (Totoras) y Campanillas de Agua en la orilla del Estanque
      const sway = Math.round(Math.sin(frame * 0.07 + px) * 1);
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px + 2, py - 24, 2, 24);
      ctx.fillRect(px + 8, py - 30, 2, 30);
      ctx.fillRect(px + 14, py - 20, 2, 20);
      // Espigas cafés de junco
      ctx.fillStyle = '#6f4518';
      ctx.fillRect(px + 1 + sway, py - 22, 4, 7);
      ctx.fillRect(px + 7 + sway, py - 28, 4, 8);
      // Flor de agua cian al pie
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 13, py - 22, 4, 4);
    } else if (d.type === 'giant_lotus') {
      // Gran Flor de Loto Sagrada flotando con polen dorado
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px - 4, py - 4, 32, 4);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px - 2, py - 5, 28, 3);
      // Pétalos escalonados de loto rosado y marfil
      ctx.fillStyle = '#ff4d6d';
      ctx.fillRect(px + 2, py - 12, 20, 7);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + 5, py - 16, 14, 9);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 8, py - 19, 8, 9);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 10, py - 14, 4, 3);
      // Polen flotando hacia arriba
      const pY = Math.round((frame * 0.3 + px) % 12);
      ctx.fillRect(px + 11, py - 22 - pY, 2, 2);
    } else if (d.type === 'botanist_table') {
      // Mesa de Jardinería del Invernadero con Macetas de Barro y Regadera Dorada
      ctx.fillStyle = '#583101';
      ctx.fillRect(px, py - 14, 34, 4);
      ctx.fillRect(px + 3, py - 10, 3, 10);
      ctx.fillRect(px + 28, py - 10, 3, 10);
      // Macetas de terracota con brotes verdes
      ctx.fillStyle = '#bc6c25';
      ctx.fillRect(px + 4, py - 20, 7, 6);
      ctx.fillRect(px + 14, py - 21, 7, 7);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 6, py - 25, 3, 5);
      ctx.fillRect(px + 15, py - 27, 5, 6);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + 16, py - 30, 3, 3);
      // Regadera dorada a la derecha
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 24, py - 20, 7, 6);
      ctx.fillRect(px + 31, py - 19, 3, 2);

    // ------------------------------------------------------------------------
    // 🌹 FASE 3: LABERINTO DE ROSAS REALES Y SANTUARIO DEL LIRIO
    // ------------------------------------------------------------------------
    } else if (d.type === 'rose_arch') {
      // Gran Arco Real de Setos Podados cubierto de Rosas Rojas y Rosadas
      const w = d.w || 72;
      const h = d.h || 78;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h, 12, h);
      ctx.fillRect(px + w - 12, py - h, 12, h);
      ctx.fillRect(px - 4, py - h, w + 8, 14);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px + 2, py - h + 2, 8, h - 2);
      ctx.fillRect(px + w - 10, py - h + 2, 8, h - 2);
      ctx.fillRect(px - 2, py - h + 2, w + 4, 10);
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px + 2, py - h + 3, w - 4, 6);
      // Rosas carmesí y rosadas en flor por todo el arco
      for (let rx = px + 4; rx < px + w - 6; rx += 11) {
        ctx.fillStyle = rx % 22 === 4 ? '#e63946' : '#ff8fab';
        ctx.fillRect(rx, py - h + 4, 4, 4);
      }
      ctx.fillStyle = '#e63946';
      ctx.fillRect(px + 4, py - 36, 4, 4);
      ctx.fillRect(px + w - 8, py - 36, 4, 4);
    } else if (d.type === 'topiary_tree') {
      // Árbol Ornamental Real Podado (Topiario de Jardín Imperial en Maceta de Mármol)
      // Macetero de mármol blanco y oro
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 4, py - 12, 16, 12);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px + 6, py - 11, 12, 10);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 5, py - 10, 14, 2);
      // Tallo central
      ctx.fillStyle = '#583101';
      ctx.fillRect(px + 10, py - 42, 4, 30);
      // Dos esferas de follaje podado con rosas
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px + 1, py - 32, 22, 14);
      ctx.fillRect(px + 4, py - 48, 16, 12);
      ctx.fillStyle = '#40916c';
      ctx.fillRect(px + 3, py - 30, 18, 10);
      ctx.fillRect(px + 6, py - 46, 12, 8);
      ctx.fillStyle = '#ff4d6d';
      ctx.fillRect(px + 6, py - 27, 3, 3);
      ctx.fillRect(px + 15, py - 26, 3, 3);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 10, py - 44, 4, 3);
    } else if (d.type === 'marble_pillar') {
      // Columna Clásica de Mármol Blanco del Jardín Real envuelta en Hiedra y Rosas
      const h = d.h || 72;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h, 18, h);
      ctx.fillStyle = '#e2eafc';
      ctx.fillRect(px + 2, py - h + 4, 14, h - 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 5, py - h + 4, 4, h - 8);
      // Capitel y base dorada/mármol
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px - 3, py - h, 24, 6);
      ctx.fillRect(px - 3, py - 6, 24, 6);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 1, py - h + 2, 20, 2);
      // Enredadera de rosas trepando por la columna de mármol
      for (let vy = py - h + 12; vy < py - 12; vy += 14) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(px + 3, vy, 12, 4);
        ctx.fillStyle = '#e63946';
        ctx.fillRect(px + 7, vy - 1, 4, 4);
      }
    } else if (d.type === 'lily_statue') {
      // Estatua de Mármol Blanco de la Guardiana del Lirio Sagrado
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 10, 26, 10);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px + 2, py - 9, 22, 8);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 4, py - 6, 18, 2);
      // Figura de mármol blanco
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 6, py - 38, 14, 28);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 8, py - 36, 10, 25);
      // Lirio dorado luminoso sostenido en lo alto
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 19, py - 44, 2, 26);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 17, py - 48, 6, 5);
    } else if (d.type === 'royal_palace_gate') {
      // Gran Portón de Entrada a la Corte Real (Mármol, Bronce y Rosas Reales)
      const w = 78;
      const h = 88;
      // Pilares de mármol blanco a los lados
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h, 14, h);
      ctx.fillRect(px + w - 14, py - h, 14, h);
      ctx.fillStyle = '#e2eafc';
      ctx.fillRect(px + 2, py - h + 2, 10, h - 2);
      ctx.fillRect(px + w - 12, py - h + 2, 10, h - 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 4, py - h + 4, 3, h - 4);
      ctx.fillRect(px + w - 10, py - h + 4, 3, h - 4);
      // Remate superior dorado y cornisa arqueada
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px - 4, py - h - 6, w + 8, 10);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 2, py - h - 4, w + 4, 3);
      ctx.fillRect(px + Math.floor(w / 2) - 10, py - h - 14, 20, 8);
      // Reja de hierro forjado y filigrana de oro en el centro
      ctx.fillStyle = '#ffd166';
      for (let gx = px + 18; gx < px + w - 18; gx += 8) {
        ctx.fillRect(gx, py - 48, 2, 48);
        ctx.fillRect(gx - 1, py - 52, 4, 4); // Puntas doradas de lanza
      }
      ctx.fillRect(px + 14, py - 26, w - 28, 3);
      // Rosas carmesí trepando por los pilares del portón
      for (let ry = py - h + 14; ry < py - 10; ry += 16) {
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(px + 3, ry, 8, 4);
        ctx.fillRect(px + w - 11, ry, 8, 4);
        ctx.fillStyle = '#e63946';
        ctx.fillRect(px + 5, ry - 1, 4, 4);
        ctx.fillRect(px + w - 9, ry - 1, 4, 4);
      }
      // Emblema de la Rosa Imperial en el centro
      ctx.fillStyle = '#ff4d6d';
      ctx.fillRect(px + Math.floor(w / 2) - 4, py - h - 2, 8, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + Math.floor(w / 2) - 2, py - h, 4, 4);

    } else if (d.type === 'royal_fountain') {
      // Fuente Imperial Barroca de 3 Niveles con Agua Cristalina y Salpicaduras Animadas
      const w = 54;
      const cx = px + Math.floor(w / 2);
      // Base y Cuenca Inferior de Mármol con Agua Reflectante
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - 14, w, 14);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px + 2, py - 13, w - 4, 12);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 3, py - 13, w - 6, 2);
      // Agua en la cuenca inferior con destellos y ondas
      ctx.fillStyle = '#16425b';
      ctx.fillRect(px + 4, py - 10, w - 8, 9);
      ctx.fillStyle = '#48cae4';
      ctx.fillRect(px + 6, py - 9, w - 12, 3);
      // Pétalos de rosa flotando en el agua de la fuente
      const petalBob = Math.round(Math.sin(frame * 0.1) * 1);
      ctx.fillStyle = '#ff758f';
      ctx.fillRect(px + 10, py - 8 + petalBob, 3, 2);
      ctx.fillRect(px + w - 14, py - 7 - petalBob, 3, 2);

      // Columna pedestal intermedia
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(cx - 5, py - 26, 10, 14);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 3, py - 26, 3, 14);

      // Cuenca Media
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 18, py - 28, 36, 6);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(cx - 17, py - 27, 34, 4);
      ctx.fillStyle = '#48cae4';
      ctx.fillRect(cx - 15, py - 26, 30, 2);

      // Pedestal superior y Cuenco pequeño
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(cx - 3, py - 38, 6, 11);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 10, py - 40, 20, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 9, py - 39, 18, 3);

      // Chorro y gotas de agua en animación líquida
      const sprayH = 7 + Math.round(Math.sin(frame * 0.25) * 2);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(cx - 1, py - 40 - sprayH, 3, sprayH);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx, py - 40 - sprayH - 2, 2, 2);

      // Cascadas de agua cayendo a los lados
      const dropOffset = (frame * 1.5) % 6;
      ctx.fillStyle = 'rgba(202, 240, 248, 0.75)';
      ctx.fillRect(cx - 15, py - 24 + dropOffset, 2, 7);
      ctx.fillRect(cx + 14, py - 24 + dropOffset, 2, 7);
      ctx.fillRect(cx - 8, py - 36 + dropOffset, 2, 5);
      ctx.fillRect(cx + 7, py - 36 + dropOffset, 2, 5);

    } else if (d.type === 'marble_balustrade') {
      // Balaustrada Real de Mármol con Copas y Enredaderas de Rosas
      const w = d.w || 64;
      const h = 24;
      // Zócalo y pasamanos de mármol blanco
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py - h, w, 4);
      ctx.fillRect(px, py - 4, w, 4);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px, py - h, w, 3);
      ctx.fillRect(px, py - 3, w, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px, py - h + 1, w, 1);

      // Balaustres torneados de mármol
      for (let bx = px + 6; bx < px + w - 6; bx += 8) {
        ctx.fillStyle = '#14101c';
        ctx.fillRect(bx, py - h + 4, 3, h - 8);
        ctx.fillStyle = '#e2eafc';
        ctx.fillRect(bx + 1, py - h + 4, 2, h - 8);
      }

      // Copa ornamental de mármol en el extremo con rosas
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px - 3, py - h - 8, 8, 8);
      ctx.fillRect(px - 1, py - h - 11, 4, 3);
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px - 4, py - h - 14, 10, 5);
      ctx.fillStyle = '#e63946';
      ctx.fillRect(px - 2, py - h - 16, 6, 4);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px, py - h - 15, 2, 2);

    } else if (d.type === 'palace_banner') {
      // Estandarte Real de Terciopelo Colgante con Insignia Dorada y Movimiento de Viento
      const isCrimson = d.color !== 'gold';
      const bgCol = isCrimson ? '#9b2226' : '#2b1b42';
      const borderCol = isCrimson ? '#ffd166' : '#ff8fab';
      const w = 22;
      const h = 58;

      // Soporte de bronce dorado montado en la pared
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 2, py - h - 4, w + 4, 4);
      ctx.fillStyle = '#583101';
      ctx.fillRect(px - 4, py - h - 5, 4, 6);
      ctx.fillRect(px + w, py - h - 5, 4, 6);

      // Tela del estandarte ondeando suavemente
      const wave = Math.round(Math.sin(frame * 0.08 + px * 0.1) * 2);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 1, py - h, w + 2, h - 8);
      ctx.fillStyle = bgCol;
      ctx.fillRect(px, py - h, w, h - 8);
      // Borde dorado bordado
      ctx.fillStyle = borderCol;
      ctx.fillRect(px + 1, py - h, 2, h - 8);
      ctx.fillRect(px + w - 3, py - h, 2, h - 8);
      // Punta en pico (cola de golondrina)
      ctx.beginPath();
      ctx.moveTo(px, py - 8);
      ctx.lineTo(px + Math.floor(w / 2) + wave, py);
      ctx.lineTo(px + w, py - 8);
      ctx.lineTo(px + Math.floor(w / 2) + wave, py - 6);
      ctx.fillStyle = bgCol;
      ctx.fill();

      // Emblema del Lirio Real bordado en oro en el centro
      ctx.fillStyle = borderCol;
      ctx.fillRect(px + Math.floor(w / 2) - 3, py - h + 14, 6, 12);
      ctx.fillRect(px + Math.floor(w / 2) - 6, py - h + 18, 12, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + Math.floor(w / 2) - 1, py - h + 16, 2, 4);

    } else if (d.type === 'lily_sanctuary') {
      // Gran Santuario Cúpula del Lirio Sagrado (Corte Imperial Monumental donde aguarda el Hijo #1)
      const w = 120;
      const h = 86;
      const cx = px + Math.floor(w / 2);

      // Bóveda / Cúpula Monumental de Mármol y Cristal Rosa en la parte superior
      ctx.fillStyle = '#14101c';
      ctx.fillRect(cx - 34, py - h - 8, 68, 20);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(cx - 32, py - h - 6, 64, 18);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 30, py - h - 6, 60, 4);

      // Rosetón de cristal emplomado luminoso en la cúpula
      ctx.fillStyle = '#241134';
      ctx.fillRect(cx - 16, py - h - 2, 32, 12);
      const glassGlow = Math.sin(frame * 0.15) * 0.15 + 0.85;
      ctx.fillStyle = `rgba(255, 143, 171, ${glassGlow.toFixed(2)})`;
      ctx.fillRect(cx - 12, py - h, 24, 8);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(cx - 4, py - h + 1, 8, 6);

      // Remate del Santuario: Gran Lirio de Oro en la cúspide
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(cx - 3, py - h - 20, 6, 14);
      ctx.fillRect(cx - 8, py - h - 24, 16, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 2, py - h - 22, 4, 4);

      // Cornisa y arquitrabe clásico sostenido por 4 columnas monumentales
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 4, py - h + 12, w + 8, 12);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px - 2, py - h + 14, w + 4, 9);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px, py - h + 21, w, 2);

      // Friso de rosas en el arquitrabe
      for (let rx = px + 8; rx < px + w - 8; rx += 14) {
        ctx.fillStyle = rx % 28 === 8 ? '#e63946' : '#ff8fab';
        ctx.fillRect(rx, py - h + 16, 4, 4);
      }

      // 4 Columnas Corintias de Mármol con Capiteles
      const colX = [px + 4, px + 34, px + w - 42, px + w - 12];
      for (const cxPos of colX) {
        ctx.fillStyle = '#14101c';
        ctx.fillRect(cxPos - 1, py - h + 23, 10, h - 23);
        ctx.fillStyle = '#e2eafc';
        ctx.fillRect(cxPos, py - h + 23, 8, h - 23);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(cxPos + 2, py - h + 23, 2, h - 23);
        // Capitel y base
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(cxPos - 2, py - h + 23, 12, 4);
        ctx.fillRect(cxPos - 2, py - 5, 12, 5);
        // Hiedra trepadora con capullos de lirio
        for (let hy = py - h + 32; hy < py - 12; hy += 16) {
          ctx.fillStyle = '#2d6a4f';
          ctx.fillRect(cxPos - 1, hy, 10, 3);
          ctx.fillStyle = '#ffccd5';
          ctx.fillRect(cxPos + 3, hy - 1, 3, 3);
        }
      }

      // Incensarios sagrados humeantes a los lados
      for (const ix of [px + 18, px + w - 24]) {
        ctx.fillStyle = '#d8e2dc';
        ctx.fillRect(ix, py - 18, 8, 18);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(ix - 2, py - 22, 12, 5);
        // Brasa ardiente
        ctx.fillStyle = '#ff758f';
        ctx.fillRect(ix + 1, py - 24, 6, 3);
        // Humo aromático ascendente
        const smokeY = (frame * 0.4) % 18;
        const smokeX = Math.round(Math.sin(frame * 0.1 + ix) * 2);
        ctx.fillStyle = 'rgba(255, 202, 212, 0.45)';
        ctx.fillRect(ix + 2 + smokeX, py - 26 - smokeY, 4, 4);
      }
    } else if (d.type === 'lumafly_swarm') {
      // Enjambre de Luciérnagas del Jardín
      const isCyan = d.color === 'cyan';
      const coreCol = isCyan ? '#caf0f8' : '#fff3b0';
      const wingCol = isCyan ? '#00f5d4' : '#95d5b2';
      for (let i = 0; i < 4; i++) {
        const ang = frame * 0.06 + i * 1.57 + px * 0.1;
        const lx = px + Math.round(Math.cos(ang) * 14 + Math.sin(ang * 2) * 5);
        const ly = py + Math.round(Math.sin(ang * 1.5) * 9);
        ctx.fillStyle = wingCol;
        ctx.fillRect(lx - 1, ly, 4, 2);
        ctx.fillStyle = coreCol;
        ctx.fillRect(lx, ly, 2, 2);
      }
    } else if (d.type === 'garland') {
      // Guirnalda de Flores y Farolillos del Jardín
      const w = d.w || 120;
      for (let gx = 0; gx <= w; gx += 12) {
        const sag = Math.round(Math.sin((gx / w) * Math.PI) * 9);
        ctx.fillStyle = '#2d6a4f';
        ctx.fillRect(px + gx, py + sag, 12, 2);
        if (gx > 0 && gx < w) {
          const swing = Math.round(Math.sin(frame * 0.08 + gx) * 1);
          ctx.fillStyle = (gx / 12) % 2 === 0 ? '#ffd166' : '#ff8fab';
          ctx.fillRect(px + gx + swing, py + sag + 1, 4, 5);
        }
      }
    }
  };