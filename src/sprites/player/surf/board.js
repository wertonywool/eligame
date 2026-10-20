// ============================================================================
// SPRITES MUNDO 3: TABLA DE SURF PROFESIONAL Y SKINS (PIXEL ART 16-BIT)
// ============================================================================
// Diseño hidrodinámico con 3 skins coleccionables:
// 1. 'classic': Rosa Neón (fucsia eléctrico + alma blanca titanio)
// 2. 'nacar': Nácar Marina (blanco perla celestial + reflejos dorados)
// 3. 'obsidian': Obsidiana Magma (negro volcánico + veta carmesí incandescente)

const SURFBOARD_SKINS = {
  classic: {
    name: 'Rosa Neón',
    hullDark: '#3b0820',
    hullLight: '#5c0c2e',
    deckDark: '#8f143c',
    deckLight: '#b31b52',
    stringer: '#ff2a70',
    stringerGlow: '#ffcad4',
    tip: '#ffffff',
    pad: '#120415',
    padAccent: '#ff2a70',
    fins: '#ff2a70',
    finEdge: '#ffffff',
    leash: '#ff2a70'
  },
  nacar: {
    name: 'Nácar Marina',
    hullDark: '#ffcad4',
    hullLight: '#ffffff',
    deckDark: '#ffcad4',
    deckLight: '#ffffff',
    stringer: '#ffd166',
    stringerGlow: '#ffffff',
    tip: '#ffd166',
    pad: '#3b0820',
    padAccent: '#ffd166',
    fins: '#ffffff',
    finEdge: '#ffd166',
    leash: '#ffcad4'
  },
  obsidian: {
    name: 'Obsidiana Magma',
    hullDark: '#07020a',
    hullLight: '#120415',
    deckDark: '#120415',
    deckLight: '#3b0820',
    stringer: '#ff2a70',
    stringerGlow: '#8f143c',
    tip: '#ffffff',
    pad: '#07020a',
    padAccent: '#8f143c',
    fins: '#8f143c',
    finEdge: '#ff2a70',
    leash: '#8f143c'
  }
};

SpriteManager.prototype.drawSurfboard = function(ctx, x, y, facingRight, tilt = 0, isImpulse = false, skinKey) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (!facingRight) ctx.scale(-1, 1);
  ctx.rotate(tilt);

  const activeSkinKey = skinKey || (typeof saveState !== 'undefined' && saveState.surfboardSkin) || 'classic';
  const pal = SURFBOARD_SKINS[activeSkinKey] || SURFBOARD_SKINS.classic;

  // 1. Silueta / Outline exterior hidrodinámico (38px de longitud)
  ctx.fillStyle = '#07020a';
  ctx.beginPath();
  ctx.moveTo(-18, 4);  // Popa inferior
  ctx.lineTo(-15, 6);
  ctx.lineTo(13, 6);
  ctx.lineTo(19, 1);   // Proa afilada elevada
  ctx.lineTo(16, -2);
  ctx.lineTo(-15, -2); // Cubierta superior
  ctx.lineTo(-19, 1);
  ctx.closePath();
  ctx.fill();

  // 2. Fondo del casco y canales cóncavos de velocidad
  ctx.fillStyle = pal.hullDark;
  ctx.fillRect(-15, 2, 30, 3);
  ctx.fillStyle = pal.hullLight;
  ctx.fillRect(-13, 1, 28, 2);

  // 3. Cubierta principal (Deck de fibra según la Skin)
  ctx.fillStyle = pal.deckDark;
  ctx.fillRect(-16, -1, 32, 3);
  ctx.fillStyle = pal.deckLight;
  ctx.fillRect(-14, -1, 29, 2);

  // 4. Alma central de velocidad (Stringer con brillo)
  ctx.fillStyle = pal.stringer;
  ctx.fillRect(-13, 0, 27, 1);
  ctx.fillStyle = pal.stringerGlow;
  ctx.fillRect(12, -1, 4, 1);
  ctx.fillStyle = pal.tip;
  ctx.fillRect(15, 0, 3, 1);

  // 5. Almohadilla de tracción antideslizante en popa
  ctx.fillStyle = pal.pad;
  ctx.fillRect(-16, -2, 8, 2);
  ctx.fillStyle = pal.padAccent;
  ctx.fillRect(-15, -2, 2, 1);
  ctx.fillRect(-11, -2, 2, 1);

  // 6. Quillas triples de alto rendimiento
  ctx.fillStyle = pal.fins;
  ctx.fillRect(-12, 5, 4, 3);
  ctx.fillRect(-6, 5, 3, 2);
  ctx.fillRect(-1, 5, 2, 2);
  ctx.fillStyle = pal.finEdge;
  ctx.fillRect(-12, 6, 1, 2);

  // 7. Invento / Leash de seguridad elástico
  ctx.fillStyle = pal.leash;
  ctx.fillRect(-17, -1, 2, 1);
  ctx.fillRect(-18, -3, 1, 2);
  ctx.fillRect(-17, -5, 2, 1);

  // 8. Modo Sobrecarga de Impulso
  if (isImpulse) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-18, 0, 3, 2);
    ctx.fillStyle = pal.stringer;
    ctx.fillRect(-20, -1, 3, 4);
    ctx.fillStyle = pal.stringerGlow;
    ctx.fillRect(-19, 1, 2, 1);
  }

  ctx.restore();
};
