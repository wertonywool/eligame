// ============================================================================
// MOTOR DE SPRITES PIXEL ART 16-BIT (EL GRAN ESCAPE DE ELIZABETH)
// ARCHIVO GENERADO AUTOMATICAMENTE DESDE src/sprites/
// Para modificar los sprites, edita directamente los archivos en src/sprites/
// ============================================================================


// --- MÓDULO: src/sprites/manager.js ---
// ============================================================================
// SPRITE MANAGER BASE: CACHÉ Y RASTERIZACIÓN PIXEL-ART 16-BIT
// ============================================================================
class SpriteManager {
  constructor() {
    this.cache = {};
    this.palettes = {
      mama: {
        '.': null,
        'K': '#14101c', // Contorno oscuro pixel-art
        'W': '#ffffff', // Pelaje blanco brillante
        'S': '#dce2f0', // Sombra suave del pelaje blanco
        'D': '#b0bad0', // Sombra profunda del pelaje
        'P': '#f4a398', // Rosa interior oreja / manos / pies / nariz
        'p': '#d0766c', // Sombra rosa (cola, pies, oreja)
        'C': '#7a1f42', // Capa borgoña / vino principal
        'c': '#54122c', // Sombra capa borgoña
        'L': '#9b2d57', // Luz capa borgoña
        'G': '#f7c948', // Broche dorado brillante
        'g': '#c89216', // Sombra broche dorado
        'E': '#2b6e2e', // Hoja verde del Lirio
        'e': '#52b74a', // Luz verde hoja del Lirio
        'F': '#f8f9fa', // Campanita blanca del Lirio
        'R': '#d90429'  // Detalle rojo carmesí del Lirio
      },
      baby: {
        '.': null,
        'K': '#14101c',
        'W': '#ffffff',
        'S': '#dce2f0',
        'D': '#b0bad0',
        'P': '#f4a398',
        'p': '#d0766c',
        'B': '#4ea8de',
        'G': '#f7c948'
      },
      homelander: {
        '.': null,
        'K': '#120e1a',
        'Y': '#ffd166',
        'y': '#e09f3e',
        'F': '#f4b393',
        'f': '#d98a6c',
        'B': '#1d3557',
        'b': '#11223a',
        'u': '#2b5082',
        'R': '#d62828',
        'r': '#9b1515',
        'W': '#f1faee',
        'L': '#ff0033',
        'l': '#ff758f'
      }
    };

    this.initSprites();
  }

  bakeGrid(key, grid, palette) {
    const h = grid.length;
    const w = grid[0].length;
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const octx = off.getContext('2d');

    for (let y = 0; y < h; y++) {
      const row = grid[y];
      for (let x = 0; x < w; x++) {
        const ch = row[x];
        const color = palette[ch];
        if (color) {
          octx.fillStyle = color;
          octx.fillRect(x, y, 1, 1);
        }
      }
    }
    this.cache[key] = off;
  }
}


// --- MÓDULO: src/sprites/player/palettes.js ---
// ============================================================================
// PALETAS DE COLOR DE SKINS: MAMÁ RATÓN
SpriteManager.prototype.getSkinPalettes = function() {
  const skinPalettes = {
      classic: this.palettes.mama,
      sakura: {
        ...this.palettes.mama,
        'W': '#ffd6e0', // Pelaje rosa pastel suave
        'S': '#ffb3c6', // Sombra rosa
        'D': '#fb6f92',
        'C': '#8f143c', // Capa rosado oscuro
        'c': '#5a0824',
        'L': '#d92568',
        'P': '#ffffff',
        'p': '#ff8fab',
        'E': '#ff75a0',
        'e': '#ffcad4',
        'F': '#ffffff',
        'R': '#ff2a70'
      },
      noir: {
        ...this.palettes.mama,
        'W': '#2d2633', // Pelaje negro/carbón sigiloso
        'S': '#1e1824',
        'D': '#120d18',
        'C': '#b31b52', // Capa rosado neón brillante
        'c': '#6b0d2e',
        'L': '#ff2a75',
        'P': '#ff75a0',
        'p': '#d92568',
        'G': '#ffffff',
        'g': '#ff8fab'
      },
      empress: {
        ...this.palettes.mama,
        'W': '#ffffff', // Pelaje blanco armiño imperial
        'S': '#f3e8ee',
        'D': '#d8c4cf',
        'C': '#540822', // Capa borgoña real profunda
        'c': '#2d0312',
        'L': '#8a123a',
        'G': '#ffffff', // Broche de diamante blanco puro
        'g': '#ffccd5',
        'P': '#ffccd5',
        'p': '#e699ad'
      },
      steampunk: {
        ...this.palettes.mama,
        'W': '#fefae0', // Pelaje crema topo inventor
        'S': '#e9d8a6',
        'D': '#d4a373',
        'C': '#7a1f3d', // Capa cobriza de relojero
        'c': '#45091d',
        'L': '#b31b52',
        'G': '#e09f3e',
        'g': '#99582a',
        'P': '#faedcd',
        'p': '#dda15e'
      },
      mage: {
        ...this.palettes.mama,
        'W': '#e8d7f1', // Pelaje lila cósmico místico
        'S': '#c3aed6', // Sombra lila
        'D': '#9f86c0',
        'C': '#3c096c', // Capa púrpura mística profunda
        'c': '#240046',
        'L': '#7b2cbf', // Resalte lila brillante
        'G': '#ffe066', // Broche y luna dorada
        'g': '#f4a261',
        'P': '#ffffff',
        'p': '#e0aaff',
        'E': '#c77dff',
        'e': '#e8d7f1'
      },
      rick_prime: {
        ...this.palettes.mama,
        'W': '#e2e8f0', // Pelaje y rostro gris espacial claro
        'S': '#94a3b8', // Sombra gris acero
        'D': '#64748b', // Sombra profunda
        'C': '#f8fafc', // Bata de laboratorio blanca
        'c': '#334155', // Solapa interior y pliegues
        'L': '#ffffff', // Brillo de bata
        'G': '#00f5d4', // Ocular cibernético y hebilla cian
        'g': '#0f766e', // Sombra ocular cian
        'P': '#cbd5e1', // Rostro / manos
        'p': '#64748b', // Sombra de manos
        'E': '#22c55e', // Verde portal
        'e': '#4ade80', // Verde brillante portal
        'R': '#00f5d4', // Chispa cian
        'u': '#64748b', // Uniceja de Rick
        'B': '#0f172a', // Camiseta y pantalones tácticos negros
        'b': '#1e293b', // Sombra táctica
        'H': '#cbd5e1', // Pelo puntiagudo Rick
        'h': '#94a3b8'  // Sombra pelo puntiagudo
      },
      homelander: {
        ...this.palettes.mama,
        'Y': '#fde047', // Cabello rubio héroe dorado
        'y': '#eab308', // Sombra rubia dorada
        'a': '#ca8a04', // Sombra profunda de cabello
        'F': '#fed7aa', // Piel caucásica heroica
        'f': '#fba874', // Sombra de piel
        'W': '#1e3a8a', // Traje azul marino heroico
        'S': '#172554', // Sombra traje azul
        'D': '#0f172a', // Sombra profunda de traje
        'C': '#dc2626', // Capa patriótica roja
        'c': '#991b1b', // Sombra de capa
        'L': '#ffffff', // Rayas blancas de la bandera americana
        'l': '#cbd5e1', // Sombra de raya blanca
        'G': '#ffd700', // Hombreras doradas de águila y cinturón
        'g': '#d97706', // Sombra dorada
        'P': '#fed7aa', // Manos y rostro
        'p': '#fba874', // Sombra de manos
        'E': '#ffd700',
        'e': '#fef08a',
        'R': '#ff0033', // Ojos láser carmesí incandescentes
        'r': '#b91c1c'  // Botas de combate y guantes carmesí
      },
      peacemaker: {
        ...this.palettes.mama,
        'E': '#e2e8f0', // Casco cromado plateado brillante
        'e': '#ffffff', // Reflejo especular blanco puro del casco
        'M': '#94a3b8', // Sombra metálica de acero del casco
        'm': '#475569', // Sombra profunda de acero
        'G': '#facc15', // Emblema de la Paloma de la Paz dorado
        'g': '#ca8a04', // Sombra dorada del emblema
        'F': '#fed7aa', // Rostro y mandíbula descubierta
        'f': '#fba874', // Sombra de mandíbula
        'W': '#dc2626', // Camiseta táctica patriota carmesí
        'S': '#991b1b', // Sombra de camiseta carmesí
        'D': '#7f1d1d', // Sombra profunda
        'C': '#1e3a8a', // Pantalones de combate azul marino
        'c': '#172554', // Sombra de pantalones tácticos
        'L': '#f8fafc', // Correas del arnés táctico blanco
        'l': '#94a3b8', // Sombra de correas
        'P': '#f1f5f9', // Guanteletes y manos tácticas
        'p': '#94a3b8', // Sombra de guanteletes
        'B': '#0f172a', // Botas de combate tácticas negras
        'b': '#334155', // Resalte de botas
        'R': '#ef4444'  // Línea de visor
      },
      ivan_alien_stage: {
        ...this.palettes.mama,
        'H': '#18181b', // Cabello azabache idol en capas
        'h': '#09090b', // Sombra de cabello azabache
        'a': '#000000', // Contorno profundo de cabello
        'I': '#3f3f46', // Brillo especular de escenario en cabello
        'F': '#f8fafc', // Rostro blanco porcelana
        'f': '#cbd5e1', // Sombra de piel porcelana
        'E': '#18181b', // Ojos afilados de escenario
        'e': '#ffffff', // Colmillo canino afilado en sonrisa
        'W': '#18181b', // Traje blazer negro de sastre
        'S': '#09090b', // Sombra de blazer negro
        'D': '#000000', // Sombra profunda de blazer
        'L': '#ffffff', // Camisa de vestir blanca
        'l': '#cbd5e1', // Sombra de camisa
        'R': '#ef4444', // Corbata carmesí de concierto
        'r': '#991b1b', // Sombra de corbata
        'C': '#18181b', // Pantalones de vestir negros
        'c': '#09090b', // Sombra de pantalones
        'P': '#f8fafc', // Manos de porcelana
        'p': '#cbd5e1', // Sombra de manos
        'B': '#09090b', // Zapatos de vestir de escenario
        'b': '#27272a', // Brillo de zapatos
        'G': '#e2e8f0', // Hebilla plateada de escenario
        'g': '#64748b'  // Sombra de hebilla
      },
      abaddon_hotel: {
        ...this.palettes.mama,
        'H': '#4c0519', // Cuernos demoníacos carmesí profundo
        'h': '#1e020a', // Sombra de cuernos demoníacos
        'a': '#ff0055', // Resalte ardiente en las puntas de los cuernos
        'W': '#11071f', // Ente espectral vacío sombra obsidiana
        'S': '#07020d', // Sombra de cuerpo espectral
        'D': '#000000', // Contorno y vacío profundo
        'K': '#05010a', // Contorno exterior oscuro
        'C': '#581c87', // Manto espectral púrpura místico
        'c': '#2e1065', // Sombra de manto espectral
        'L': '#9333ea', // Runas y fringas brillantes de manto
        'l': '#c084fc', // Borde resplandeciente místico
        'G': '#ff0055', // Amuletos / runas espectrales carmesí
        'g': '#881337', // Sombra de runas carmesí
        'P': '#ff1744', // Manos y garras espectrales carmesí
        'p': '#990024', // Sombra de garras
        'B': '#07020d', // Pezuñas / botas de sombra oscura
        'b': '#2e1065', // Brillo de pezuñas
        'E': '#ff0055', // Ojos espectrales carmesí neón
        'e': '#ffffff', // Pupila / brillo blanco intenso de mirada espectral
        'R': '#ff0055', // Sonrisa afilada demoníaca
        'r': '#881337'  // Sombra de sonrisa demoníaca
      }
    };
    return skinPalettes;
  };

// --- MÓDULO: src/sprites/player/grids.js ---
// ============================================================================
// MATRICES PIXEL ART: MAMÁ RATÓN (IDLE, TRANSICIÓN, CARRERA, SALTO)
// ============================================================================
    // 1. MAMÁ RATÓN - IDLE (DE PIE BÍPEDA - 29x32)
    // ========================================================================
    const mamaIdle0 = [
      ".........KKKKK....KKKK..........",
      "........KWWWWWK..KSSSSK.........",
      ".......KWPPPPPWKKSSSSSSK........",
      ".......KWPPPPeeEKSWWWWWSK.......",
      ".......KWPPPPeFEeWWWWWWWK.......",
      ".......KWWPPPEFFRWWWWWWWK.......",
      "........KWWWWWeeEWWWWWWK........",
      ".........KWWWWWWWWWWWWK.........",
      ".........KWWWWKKWWWWWWK.........",
      ".........KWWWWKWKWWWWWWKK.......",
      ".........KWWWWKKWWWWWWWKPK......",
      ".........KWWWWWWWWWWWWWWPK......",
      "..KKK....KWWWWWWKKKKWWWWK.......",
      ".KPPPK...KSSSSWWWWWWWWK.........",
      "KPp..PK.KCCCCLLLLGGCCCCK........",
      "KP...PKKCCCCCCLLGGGGCCCCK.......",
      ".KP..PKCCCCCCCCccggCCCCCCK......",
      "..KP..KCCCWWWWWccccccWWCCK......",
      "...KP.KCCWWWWWWWWWWWWWWWCK......",
      "....KPKCCPKWWWWWWWWWWWKPKCK.....",
      "....KPKCCPKWWWWWWWWWWWKPKCK.....",
      "...KppKcccKWWWWWWWWWWWKccCK.....",
      "..Kpp..KccKWWWWWDWWWWWKccCK.....",
      "..Kp....KKKWWWWWDWWWWWKKKCK.....",
      "...Kppp..KSSSSSSDSSSSSSK.KK.....",
      "....KKK..KSSSSSSKSSSSSSK........",
      ".........KPPPPPPKPPPPPPK........",
      ".........KPPppPPKPPppPPK........",
      ".........KKKKKKKKKKKKKKK........"
    ];

    const mamaIdle1 = [
      "................................",
      ".........KKKKK....KKKK..........",
      "........KWWWWWK..KSSSSK.........",
      ".......KWPPPPPWKKSSSSSSK........",
      ".......KWPPPPeeEKSWWWWWSK.......",
      ".......KWPPPPeFEeWWWWWWWK.......",
      ".......KWWPPPEFFRWWWWWWWK.......",
      "........KWWWWWeeEWWWWWWK........",
      ".........KWWWWWWWWWWWWK.........",
      ".........KWWWWKKWWWWWWK.........",
      ".........KWWWWKWKWWWWWWKK.......",
      ".........KWWWWKKWWWWWWWKPK......",
      ".........KWWWWWWWWWWWWWWPK......",
      "...KKK...KWWWWWWKKKKWWWWK.......",
      "..KPPPK..KSSSSWWWWWWWWK.........",
      ".KPp..PKKCCCCLLLLGGCCCCK........",
      ".KP...PKCCCCCCLLGGGGCCCCK.......",
      "..KP..KCCCCCCCCccggCCCCCCK......",
      "...KP.KCCCWWWWWccccccWWCCK......",
      "....KPKCCWWWWWWWWWWWWWWWCK......",
      "....KPKCCPKWWWWWWWWWWWKPKCK.....",
      "...KppKcccKWWWWWWWWWWWKccCK.....",
      "..Kpp..KccKWWWWWDWWWWWKccCK.....",
      "..Kp....KKKWWWWWDWWWWWKKKCK.....",
      "...Kppp..KSSSSSSDSSSSSSK.KK.....",
      "....KKK..KSSSSSSKSSSSSSK........",
      ".........KPPPPPPKPPPPPPK........",
      ".........KPPppPPKPPppPPK........",
      ".........KKKKKKKKKKKKKKK........"
    ];

    // ========================================================================
    // 2. CUADRO DE TRANSICIÓN (IDLE <-> CARRERA): INCLINACIÓN PROGRESIVA
    //    Evita el cambio brusco cuando empieza a caminar o cuando frena
    // ========================================================================
    const mamaTransition = [
      "................................",
      "...........KKKKK....KKKK........",
      "..........KWWWWWK..KSSSSK.......",
      ".........KWPPPPPWKKSSSSSSK......",
      ".........KWPPPPeeEKSWWWWWSK.....",
      ".........KWPPPPeFEeWWWWWWWK.....",
      ".........KWWPPPEFFRWWWWWWWK.....",
      "..........KWWWWWeeEWWWWWWK......",
      "...........KWWWWWWWWWWWWK.......",
      "...........KWWWWKKWWWWWWK.......",
      "...........KWWWWKWKWWWWWWKK.....",
      "...........KWWWWKKWWWWWWWKPK....",
      "...........KWWWWWWWWWWWWWWPK....",
      "..KKK......KWWWWWWKKKKWWWWK.....",
      ".KPPPK....KSSSSWWWWWWWWK........",
      "KPp..PK.KKCCCCLLLLGGCCCCK.......",
      ".KP...PKCCCCCCCLLGGGGCCCCK......",
      "..KP..KCCCCCCCCCccggCCCCCCK.....",
      "...KPKccccWWWWWWccccccWWCCK.....",
      "...KppKKKWWWWWWWWWWWWWWPKCK.....",
      "..Kpp...KWWWWWWWWWWWWWWPKKK.....",
      "..Kp....KWWWWWWWDWWWWWWK........",
      "...Kppp.KSSSSSSSKSSSSSSK........",
      "....KKK.KSSSSSSK.KSSSSSSK.......",
      ".......KPPPPPPK...KPPPPPPK......",
      ".......KPPppPPK...KPPppPPK......",
      ".......KKKKKKKK...KKKKKKKK......"
    ];

    // ========================================================================
    // 3. CICLO DE CARRERA FLUIDO DE 4 CUADROS (ALTURA Y VOLUMEN NATURAL)
    // ========================================================================
    // Frame 0: Zancada abierta (pie derecho adelante, pie izquierdo atrás, capa ondeando)
    const mamaRun0 = [
      "................................",
      "............KKKKK....KKKK.......",
      "...........KWWWWWK..KSSSSK......",
      "..........KWPPPPPWKKSSSSSSK.....",
      "..........KWPPPPeeEKSWWWWWSK....",
      "..........KWPPPPeFEeWWWWWWWK....",
      "..........KWWPPPEFFRWWWWWWWK....",
      "...........KWWWWWeeEWWWWWWK.....",
      "............KWWWWWWWWWWWWK......",
      "............KWWWWKKWWWWWWK......",
      "............KWWWWKWKWWWWWWKK....",
      "............KWWWWKKWWWWWWWKPK...",
      "............KWWWWWWWWWWWWWWPK...",
      "......KKKKKKKWWWWWWKKKKWWWWK....",
      "....KKCCCCCCCLLLLGGWWWWWWK......",
      "...KCCCCCCCCCCLLGGGGWWWWK.......",
      "..KCCCCCCCCCCCCccggWWWWWWKK.....",
      ".KcccccCCCCCCCCcccWWWWWWWKPK....",
      ".KKKKKKWWWWWWWWWWWWWWWWWWKPK....",
      "..KKpppKSSSSSSSSWWWWWWWWWK......",
      ".Kpp...KSSSSSSSKKSSSSSSSSK......",
      "Kpp...KSSSSSSSK..KSSSSSSSK......",
      ".KK..KPPPPPPKK....KPPPPPPK......",
      ".....KPPppPPK.....KPPppPPK......",
      ".....KKKKKKKK.....KKKKKKKK......"
    ];

    // Frame 1: Paso intermedio de apoyo (cuerpo baja 1px, piernas cruzando, capa sube)
    const mamaRun1 = [
      "................................",
      "................................",
      "............KKKKK....KKKK.......",
      "...........KWWWWWK..KSSSSK......",
      "..........KWPPPPPWKKSSSSSSK.....",
      "..........KWPPPPeeEKSWWWWWSK....",
      "..........KWPPPPeFEeWWWWWWWK....",
      "..........KWWPPPEFFRWWWWWWWK....",
      "...........KWWWWWeeEWWWWWWK.....",
      "............KWWWWWWWWWWWWK......",
      "............KWWWWKKWWWWWWK......",
      "............KWWWWKWKWWWWWWKK....",
      "............KWWWWKKWWWWWWWKPK...",
      ".....KKKKKKKKWWWWWWWWWWWWWWPK...",
      "...KKCCCCCCCCLLLLGGKKKKWWWWK....",
      "..KCCCCCCCCCCCLLGGGGWWWWWWK.....",
      ".KCCCCCCCCCCCCCccggWWWWWWWK.....",
      ".KccccccCCCCCCCcccWWWWWWWKPK....",
      "..KKKKKKWWWWWWWWWWWWWWWWWKPK....",
      "..KKppppKSSSSSSSSWWWWWWWWK......",
      ".Kpp....KSSSSSSSSSSSSSSSSK......",
      "..KK.....KSSSSSSKKSSSSSSK.......",
      ".........KPPPPPPK.KPPPPPPK......",
      ".........KPPppPPK.KPPppPPK......",
      ".........KKKKKKKK.KKKKKKKK......"
    ];

    // Frame 2: Impulso aéreo en carrera (extensión dinámica, capa totalmente desplegada)
    const mamaRun2 = [
      "............KKKKK....KKKK.......",
      "...........KWWWWWK..KSSSSK......",
      "..........KWPPPPPWKKSSSSSSK.....",
      "..........KWPPPPeeEKSWWWWWSK....",
      "..........KWPPPPeFEeWWWWWWWK....",
      "..........KWWPPPEFFRWWWWWWWK....",
      "...........KWWWWWeeEWWWWWWK.....",
      "............KWWWWWWWWWWWWK......",
      "............KWWWWKKWWWWWWK......",
      "............KWWWWKWKWWWWWWKK....",
      "............KWWWWKKWWWWWWWKPK...",
      ".....KKKKKKKKWWWWWWWWWWWWWWPK...",
      "...KKCCCCCCCCLLLLGGKKKKWWWWK....",
      "..KCCCCCCCCCCCLLGGGGWWWWWWK.....",
      ".KCCCCCCCCCCCCCccggWWWWWWWKPK...",
      "KcccccccCCCCCCCcccWWWWWWWWKPK...",
      "KKKKKKKKWWWWWWWWWWWWWWWWWWK.....",
      "..KKppppKSSSSSSSSWWWWWWWWK......",
      ".Kpp...KSSSSSSSSKSSSSSSSSSK.....",
      "Kpp...KPPPPPPKK...KKPPPPPPK.....",
      ".KK...KPPppPPK......KPPppPPK....",
      "......KKKKKKKK......KKKKKKKK....",
      "................................",
      "................................",
      "................................"
    ];

    // Frame 3: Recogida de piernas antes del siguiente apoyo
    const mamaRun3 = [
      "................................",
      "............KKKKK....KKKK.......",
      "...........KWWWWWK..KSSSSK......",
      "..........KWPPPPPWKKSSSSSSK.....",
      "..........KWPPPPeeEKSWWWWWSK....",
      "..........KWPPPPeFEeWWWWWWWK....",
      "..........KWWPPPEFFRWWWWWWWK....",
      "...........KWWWWWeeEWWWWWWK.....",
      "............KWWWWWWWWWWWWK......",
      "............KWWWWKKWWWWWWK......",
      "............KWWWWKWKWWWWWWKK....",
      "............KWWWWKKWWWWWWWKPK...",
      "......KKKKKKKWWWWWWWWWWWWWWPK...",
      "....KKCCCCCCCLLLLGGKKKKWWWWK....",
      "...KCCCCCCCCCCLLGGGGWWWWWWK.....",
      "..KCCCCCCCCCCCCccggWWWWWWWK.....",
      "..KcccccCCCCCCCcccWWWWWWKPK.....",
      "...KKKKKWWWWWWWWWWWWWWWWKPK.....",
      "..KKpppKSSSSSSSSWWWWWWWWK.......",
      ".Kpp...KSSSSSSSSSSSSSSSSK.......",
      "..KK...KSSSSSSSKSSSSSSSK........",
      ".......KPPPPPPK.KPPPPPPK........",
      ".......KPPppPPK.KPPppPPK........",
      ".......KKKKKKKK.KKKKKKKK........",
      "................................"
    ];

    // ========================================================================
    // 4. SALTO Y CAÍDA (IMPULSO HACIA ARRIBA vs CAÍDA CON CAPA ELEVADA)
    // ========================================================================
    const mamaJumpUp = [
      "..........KKKKK....KKKK.........",
      ".........KWWWWWK..KSSSSK........",
      "........KWPPPPPWKKSSSSSSK.......",
      "........KWPPPPeeEKSWWWWWSK......",
      "........KWPPPPeFEeWWWWWWWK......",
      "........KWWPPPEFFRWWWWWWWK......",
      ".........KWWWWWeeEWWWWWWK.......",
      "..........KWWWWWWWWWWWWK........",
      "..........KWWWWKKWWWWWWK........",
      "..........KWWWWKWKWWWWWWKK......",
      "..........KWWWWKKWWWWWWWKPK.....",
      "..........KWWWWWWWWWWWWWWPK.....",
      "..........KWWWWWWKKKKWWWWK......",
      ".........KSSSSWWWWWWWWK.........",
      ".......KKCCCCLLLLGGCCCCK........",
      "......KCCCCCCLLGGGGCCCCCK.......",
      ".....KCCCCCCCCccggCCCCCCK.......",
      "....KccccWWWWWccccccWWCCK.......",
      "...KpppKKWWWWWWWWWWWWWKCK.......",
      "..Kpp...KWWWWWWWWWWWWWKPK.......",
      "..Kp....KWWWWWWWDWWWWWKPK.......",
      "...Kppp.KSSSSSSSDSSSSSK.........",
      "....KKK..KPPPPPPKPPPPPK.........",
      ".........KPPppPPKPPppPK.........",
      ".........KKKKKKKKKKKKKK........."
    ];

    const mamaJumpFall = [
      "...........KKKKK....KKKK........",
      "..........KWWWWWK..KSSSSK.......",
      ".........KWPPPPPWKKSSSSSSK......",
      ".........KWPPPPeeEKSWWWWWSK.....",
      ".........KWPPPPeFEeWWWWWWWK.....",
      ".........KWWPPPEFFRWWWWWWWK.....",
      "..........KWWWWWeeEWWWWWWK......",
      "...........KWWWWWWWWWWWWK.......",
      "...KKKKKKKKKWWWWKKWWWWWWK.......",
      "..KCCCCCCCCLWWWWKWKWWWWWWKK.....",
      ".KCCCCCCCCCLWWWWKKWWWWWWWKPK....",
      ".KccccCCCCCCWWWWWWWWWWWWWWPK....",
      "..KKKKCCCCCCLLLLGGKKKKWWWWK.....",
      ".....KCCCCCCLLGGGGWWWWWWK.......",
      "....KpppKCCCccggWWWWWWWWKPK.....",
      "...Kpp..KWWWWWWWWWWWWWWWKPK.....",
      "..Kpp...KSSSSSSSSWWWWWWWK.......",
      "...KK...KSSSSSSSKKSSSSSSK.......",
      ".......KPPPPPPKK..KPPPPPPK......",
      ".......KPPppPPK...KPPppPPK......",
      ".......KKKKKKKK...KKKKKKKK......"
    ];

    // ========================================================================
    // 5. POSTURA DE SURFISTA Y WATER DASH (MAMA RATON EN LA TABLA DE SURF)
    // ========================================================================
    // Frame 0: Surfing crucero normal (rodillas flexionadas, cola y capa al viento)
    const mamaSurf0 = [
      "....................................",
      "............KKKKK....KKKK...........",
      "...........KWWWWWK..KSSSSK..........",
      "..........KWPPPPPWKKSSSSSSK.........",
      "..........KWPPPPeeEKSWWWWWSK........",
      "..........KWPPPPeFEeWWWWWWWK........",
      "..........KWWPPPEFFRWWWWWWWK........",
      "...........KWWWWWeeEWWWWWWK.........",
      "............KWWWWWWWWWWWWK..........",
      "....KKK.....KWWWWKKWWWWWWK..........",
      "..KKPPPK....KWWWWKWKWWWWWWKK........",
      ".KPPPPPK....KWWWWKKWWWWWWWKPK.......",
      "KPP..PPK....KWWWWWWWWWWWWWWPK.......",
      ".KP..PK..KKKKSSSSWWWWWWWWK.KKKK.....",
      "..KP..PKKCCCCCCCLLLLGGWWK.KPPPPK....",
      "...KPKCCCCCCCCCLLGGGGWWKKKKPPPPPK...",
      "...KCCCCCCCCCCCCccggWWKKKKKPPPPPK...",
      "..KCCCCCCCCCCCCCCcccWWWWKKKKKKKK....",
      ".KcccccCCCCCCCCCCccWWWWWWWWK........",
      ".KKKKKKWWWWWWWWWWWWWWWWWWWWK........",
      "....KppKSSSSSSS...KSSSSSSK..........",
      "...Kpp..KSSSSSSK..KSSSSSSK..........",
      "...Kp...KSSSSSSK...KSSSSSK..........",
      "....KK..KSSSSSSK...KSSSSSSK.........",
      ".......KPPPPPPK.....KPPPPPPK........",
      ".......KPPPPPPK.....KPPPPPPK........",
      ".......KPPppPPK.....KPPppPPK........",
      ".......KKKKKKKK.....KKKKKKKK........",
      "....................................",
      "...................................."
    ];

    // Frame 1: Onda marina de crucero (amortiguacion de rodillas y ondulacion de capa)
    const mamaSurf1 = [
      "....................................",
      "....................................",
      "............KKKKK....KKKK...........",
      "...........KWWWWWK..KSSSSK..........",
      "..........KWPPPPPWKKSSSSSSK.........",
      "..........KWPPPPeeEKSWWWWWSK........",
      "..........KWPPPPeFEeWWWWWWWK........",
      "..........KWWPPPEFFRWWWWWWWK........",
      "...........KWWWWWeeEWWWWWWK.........",
      "....KKK.....KWWWWWWWWWWWWK..........",
      "..KKPPPK....KWWWWKKWWWWWWK..........",
      ".KPPPPPK....KWWWWKWKWWWWWWKK........",
      "KPP..PPK....KWWWWKKWWWWWWWKPK.......",
      ".KP..PK..KKKKWWWWWWWWWWWWWWPK.......",
      "..KP..PKKCCCCCCCLLLLGGWWWWK.KKKK....",
      "...KPKCCCCCCCCCCCLLGGGGWWK.KPPPPK...",
      "...KCCCCCCCCCCCCCCccggWWKKKKPPPPPK..",
      "..KCCCCCCCCCCCCCCCCcccWWWWKKPPPPPK..",
      ".KcccccCCCCCCCCCCCCccWWWWKKKKKKK....",
      ".KKKKKKWWWWWWWWWWWWWWWWWWWWK........",
      "....KppKSSSSSSS...KSSSSSSK..........",
      "...Kpp..KSSSSSSK..KSSSSSSK..........",
      "...Kp...KSSSSSSK...KSSSSSK..........",
      "....KK..KSSSSSSK...KSSSSSSK.........",
      ".......KPPPPPPK.....KPPPPPPK........",
      ".......KPPPPPPK.....KPPPPPPK........",
      ".......KPPppPPK.....KPPppPPK........",
      ".......KKKKKKKK.....KKKKKKKK........",
      "....................................",
      "...................................."
    ];

    // Frame 2: Water Dash / Impulso aerodinamico a maxima velocidad
    const mamaSurfDash = [
      "....................................",
      "....................................",
      "....................................",
      "....................................",
      "..............KKKKK....KKKK.........",
      ".............KWWWWWK..KSSSSK........",
      "............KWPPPPPWKKSSSSSSK.......",
      "............KWPPPPeeEKSWWWWWSK......",
      "............KWPPPPeFEeWWWWWWWK......",
      "............KWWPPPEFFRWWWWWWWK......",
      ".............KWWWWWeeEWWWWWWK.......",
      "..............KWWWWWWWWWWWWK........",
      "..............KWWWWKKWWWWWWK........",
      "....KKKKKKKKKKKWWWWKWKWWWWWWKK......",
      "..KKCCCCCCCCCCCLLLLGGWWWWWWWWKPK....",
      ".KCCCCCCCCCCCCCCLLGGGGWWWWWWWKPK....",
      "KCCCCCCCCCCCCCCCCccggWWWWWWWWWPKKKKK",
      "KcccccccCCCCCCCCCCcccWWWWWWWWWWKPPPP",
      "KKKKKKKKWWWWWWWWWWWWWWWWWWWWWWWWKPPP",
      "..KKppppKSSSSSSSSSSSS..KSSSSSSSKKKKK",
      ".Kpp...KSSSSSSSSSSSSK...KSSSSSSSK...",
      "Kpp...KSSSSSSSSSSSSK.....KSSSSSSSK..",
      ".KK..KPPPPPPPPPPPKK.......KPPPPPPPK.",
      ".....KPPPPPPPPPPPK.........KPPPPPPPK",
      ".....KPPppppppPPPK.........KPPppppPK",
      ".....KKKKKKKKKKKKK.........KKKKKKKKK",
      "....................................",
      "....................................",
      "....................................",
      "...................................."
    ];

    // Paletas temáticas de Aspectos / Skins para Elizabeth (Comprables con Flores en la Tienda)

// --- MÓDULO: src/sprites/player/grids_rick_prime.js ---
// ============================================================================
// MATRICES PIXEL ART: RICK PRIME (CIENTÍFICO MULTIVERSAL - RICK & MORTY)
// ============================================================================
// Matrices dedicadas con pelo puntiagudo de Rick, uniceja, ocular cibernético,
// bata blanca de laboratorio, camiseta táctica oscura y botas cibernéticas.

// 1. Idle 0 (32x29)
const rickPrimeIdle0 = [
  "..............KKK...KKK.........",
  ".............KHHHK.KHHHK........",
  ".......KKK...KHHHHhHHHHhK.......",
  "......KHHHK.KHHHHHHHHHHHhK......",
  ".....KHHHHhKHHHHHHHHHHHHhK......",
  ".....KHHHHhKHHHHHHHHHHHHHhK.KKK.",
  "......KhhhhKHHHHHHHHHHHHhK.KHHHK",
  ".......KKKKKHHHHHHHHHHHHhK.KHHHK",
  "..........KuuuuuuuuuuhhhK..KhhhK",
  "..........KWWWWWWWWWKKKK....KKK.",
  "..........KWWKKWWWWWKGGK........",
  "..........KWKWKWWWWWKRGK........",
  "..........KWWKKWWWWWKGGK........",
  "..........KWWWWWWWWWWWWK........",
  "....KKK...KWWWWKWKWWWWWK........",
  "...KCCCK..KSSSSWWWWWWWWK........",
  "..KCCCCCK.KCCCBBBBBBCCCCK.......",
  "..KCCCCCCKCCCCBBBBBBCCCCK.......",
  ".KCCCCCCCCCCCCBBBBBBCCCCK.......",
  ".KCCCLLLLCCCCCBBBBBBCCCCK.......",
  ".KCCCccggCCCCCBBBBBBCCCCK.......",
  ".KCCCccccccCCCBBBBBBCCCCK.......",
  "..KCCCccccccCCBGGGGGBCCCK.......",
  "...KKKccccccCCKKKKKKKCCCK.......",
  ".....KSSSSSSDDBBBBBBBK..........",
  ".....KSSSSSSKKBBBBBBBK..........",
  ".....KBBBBBBK.KBBBBBBK..........",
  ".....KGGGGGGK.KGGGGGGK..........",
  ".....KKKKKKKK.KKKKKKKK.........."
];

// 2. Idle 1 (32x29)
const rickPrimeIdle1 = [
  "................................",
  "..............KKK...KKK.........",
  ".............KHHHK.KHHHK........",
  ".......KKK...KHHHHhHHHHhK.......",
  "......KHHHK.KHHHHHHHHHHHhK......",
  ".....KHHHHhKHHHHHHHHHHHHhK......",
  ".....KHHHHhKHHHHHHHHHHHHHhK.KKK.",
  "......KhhhhKHHHHHHHHHHHHhK.KHHHK",
  ".......KKKKKHHHHHHHHHHHHhK.KHHHK",
  "..........KuuuuuuuuuuhhhK..KhhhK",
  "..........KWWWWWWWWWKKKK....KKK.",
  "..........KWWKKWWWWWKGGK........",
  "..........KWKWKWWWWWKRGK........",
  "..........KWWKKWWWWWKGGK........",
  "..........KWWWWWWWWWWWWK........",
  "....KKK...KWWWWKWKWWWWWK........",
  "...KCCCK..KSSSSWWWWWWWWK........",
  "..KCCCCCK.KCCCBBBBBBCCCCK.......",
  "..KCCCCCCKCCCCBBBBBBCCCCK.......",
  ".KCCCCCCCCCCCCBBBBBBCCCCK.......",
  ".KCCCLLLLCCCCCBBBBBBCCCCK.......",
  ".KCCCccggCCCCCBBBBBBCCCCK.......",
  ".KCCCccccccCCCBBBBBBCCCCK.......",
  "..KCCCccccccCCBGGGGGBCCCK.......",
  "...KKKccccccCCKKKKKKKCCCK.......",
  ".....KSSSSSSDDBBBBBBBK..........",
  ".....KBBBBBBK.KBBBBBBK..........",
  ".....KGGGGGGK.KGGGGGGK..........",
  ".....KKKKKKKK.KKKKKKKK.........."
];

// 3. Transition (32x26)
const rickPrimeTransition = [
  "................................",
  "................KKK...KKK.......",
  "...............KHHHK.KHHHK......",
  ".........KKK...KHHHHhHHHHhK.....",
  "........KHHHK.KHHHHHHHHHHHhK....",
  ".......KHHHHhKHHHHHHHHHHHHhK....",
  ".......KHHHHhKHHHHHHHHHHHHHhK...",
  "........KhhhhKHHHHHHHHHHHHhK....",
  ".........KKKKKuuuuuuuuuuhhhK....",
  "............KWWWWWWWWWKKKK......",
  "............KWWKKWWWWWKGGK......",
  "............KWKWKWWWWWKRGK......",
  "............KWWKKWWWWWKGGK......",
  "....KKK.....KWWWWWWWWWWWWK......",
  "...KCCCK...KSSSSWWWWWWWWK.......",
  "..KCCCCCK.KCCCBBBBBBCCCCK.......",
  "..KCCCCCCKCCCCBBBBBBCCCCK.......",
  ".KCCCCCCCCCCCCBBBBBBCCCCK.......",
  ".KCCCLLLLCCCCCBBBBBBCCCCK.......",
  "..KccccccccccCCBGGGGGBCCCK......",
  "..KKKccccccccCCKKKKKKKCCCK......",
  ".....KSSSSSSSDDBBBBBBBK.........",
  ".....KSSSSSSK.KBBBBBBK..........",
  ".....KBBBBBBK..KBBBBBBK.........",
  ".....KGGGGGGK..KGGGGGGK.........",
  ".....KKKKKKKK..KKKKKKKK........."
];

// 4. Run 0 (32x25)
const rickPrimeRun0 = [
  "................................",
  "................KKK...KKK.......",
  "...............KHHHK.KHHHK......",
  ".........KKK...KHHHHhHHHHhK.....",
  "........KHHHK.KHHHHHHHHHHHhK....",
  ".......KHHHHhKHHHHHHHHHHHHhK....",
  ".......KHHHHhKHHHHHHHHHHHHHhK...",
  "........KhhhhKHHHHHHHHHHHHhK....",
  ".........KKKKKuuuuuuuuuuhhhK....",
  "............KWWWWWWWWWKKKK......",
  "............KWWKKWWWWWKGGK......",
  "............KWKWKWWWWWKRGK......",
  "............KWWKKWWWWWKGGK......",
  "......KKKKKKKWWWWWWWWWWWWK......",
  "....KKCCCCCCCLLLLGGWWWWWWK......",
  "...KCCCCCCCCCCLLGGGGWWWWK.......",
  "..KCCCCCCCCCCCCBBBBWWWWWWKK.....",
  ".KcccccCCCCCCCCBBBWWWWWWWKPK....",
  ".KKKKKKCCCCCCCCBBWWWWWWWWKPK....",
  "..KKppppKSSSSSSSBBWWWWWWWK......",
  ".Kpp...KSSSSSSSKKBBBBBBBBK......",
  "Kpp...KBBBBBBBK..KBBBBBBBK......",
  ".KK..KGGGGGGKK....KGGGGGGK......",
  ".....KKKKKKKK.....KKKKKKKK......",
  "................................"
];

// 5. Run 1 (32x25)
const rickPrimeRun1 = [
  "................................",
  "................................",
  "................KKK...KKK.......",
  "...............KHHHK.KHHHK......",
  ".........KKK...KHHHHhHHHHhK.....",
  "........KHHHK.KHHHHHHHHHHHhK....",
  ".......KHHHHhKHHHHHHHHHHHHhK....",
  "........KhhhhKHHHHHHHHHHHHHhK...",
  ".........KKKKKuuuuuuuuuuhhhK....",
  "............KWWWWWWWWWKKKK......",
  "............KWWKKWWWWWKGGK......",
  "............KWKWKWWWWWKRGK......",
  "............KWWKKWWWWWKGGK......",
  ".....KKKKKKKKWWWWWWWWWWWWK......",
  "...KKCCCCCCCCLLLLGGWWWWWWK......",
  "..KCCCCCCCCCCCLLGGGGWWWWK.......",
  ".KCCCCCCCCCCCCCBBBBWWWWWWK......",
  ".KccccccCCCCCCCBBBWWWWWWWKPK....",
  "..KKKKKKCCCCCCCBBWWWWWWWWKPK....",
  "..KKppppKSSSSSSSBBWWWWWWWK......",
  ".Kpp....KBBBBBBBBBBBBBBBBK......",
  "..KK.....KBBBBBBKKBBBBBBK.......",
  ".........KGGGGGGK.KGGGGGGK......",
  ".........KKKKKKKK.KKKKKKKK......",
  "................................"
];

// 6. Run 2 (32x25)
const rickPrimeRun2 = [
  "................KKK...KKK.......",
  "...............KHHHK.KHHHK......",
  ".........KKK...KHHHHhHHHHhK.....",
  "........KHHHK.KHHHHHHHHHHHhK....",
  ".......KHHHHhKHHHHHHHHHHHHhK....",
  ".......KHHHHhKHHHHHHHHHHHHHhK...",
  "........KhhhhKHHHHHHHHHHHHhK....",
  ".........KKKKKuuuuuuuuuuhhhK....",
  "............KWWWWWWWWWKKKK......",
  "............KWWKKWWWWWKGGK......",
  "............KWKWKWWWWWKRGK......",
  "............KWWKKWWWWWKGGK......",
  ".....KKKKKKKKWWWWWWWWWWWWK......",
  "...KKCCCCCCCCLLLLGGWWWWWWK......",
  "..KCCCCCCCCCCCLLGGGGWWWWK.......",
  ".KCCCCCCCCCCCCCBBBBWWWWWWKPK....",
  "KcccccccCCCCCCCBBBWWWWWWWWKPK...",
  "KKKKKKKKCCCCCCCBBWWWWWWWWWWK....",
  "..KKppppKSSSSSSSBBWWWWWWWK......",
  ".Kpp...KBBBBBBBBKBBBBBBBBBK.....",
  "Kpp...KGGGGGGKK...KKGGGGGGK.....",
  ".KK...KKKKKKKK......KKKKKKKK....",
  "................................",
  "................................",
  "................................"
];

// 7. Run 3 (32x25)
const rickPrimeRun3 = [
  "................................",
  "................KKK...KKK.......",
  "...............KHHHK.KHHHK......",
  ".........KKK...KHHHHhHHHHhK.....",
  "........KHHHK.KHHHHHHHHHHHhK....",
  ".......KHHHHhKHHHHHHHHHHHHhK....",
  ".......KHHHHhKHHHHHHHHHHHHHhK...",
  "........KhhhhKHHHHHHHHHHHHhK....",
  ".........KKKKKuuuuuuuuuuhhhK....",
  "............KWWWWWWWWWKKKK......",
  "............KWWKKWWWWWKGGK......",
  "............KWKWKWWWWWKRGK......",
  "............KWWKKWWWWWKGGK......",
  "......KKKKKKKWWWWWWWWWWWWK......",
  "....KKCCCCCCCLLLLGGWWWWWWK......",
  "...KCCCCCCCCCCLLGGGGWWWWK.......",
  "..KCCCCCCCCCCCCBBBBWWWWWWK......",
  "..KcccccCCCCCCCBBBWWWWWWKPK.....",
  "...KKKKKCCCCCCCBBWWWWWWWWKPK....",
  "..KKpppKSSSSSSSSBBWWWWWWK.......",
  ".Kpp...KBBBBBBBBBBBBBBBBK.......",
  "..KK...KBBBBBBBKBBBBBBBK........",
  ".......KGGGGGGK.KGGGGGGK........",
  ".......KKKKKKKK.KKKKKKKK........",
  "................................"
];

// 8. Jump Up (32x25)
const rickPrimeJumpUp = [
  "..........KKK...KKK.............",
  ".........KHHHK.KHHHK............",
  "...KKK...KHHHHhHHHHhK...........",
  "..KHHHK.KHHHHHHHHHHHhK..........",
  ".KHHHHhKHHHHHHHHHHHHhK..........",
  ".KHHHHhKHHHHHHHHHHHHHhK.KKK.....",
  "..KhhhhKHHHHHHHHHHHHhK.KHHHK....",
  "...KKKKKHHHHHHHHHHHHhK.KHHHK....",
  "......KuuuuuuuuuuhhhK..KhhhK....",
  "......KWWWWWWWWWKKKK....KKK.....",
  "......KWWKKWWWWWKGGK............",
  "......KWKWKWWWWWKRGK............",
  "......KWWKKWWWWWKGGK............",
  "......KWWWWWWWWWWWWK............",
  "......KSSSSWWWWWWWWK............",
  "....KKCCCCLLLLGGCCCCK...........",
  "...KCCCCCCLLGGGGCCCCCK..........",
  "..KCCCCCCCCBBBBCCCCCCCK.........",
  ".KccccCCCCCBBBCCCCCCCCK.........",
  "..KKKCCCCCCBBBBCCCCCCCK.........",
  "....KSSSSSSDDBBBBBBBK...........",
  "....KBBBBBBKKKBBBBBBK...........",
  "....KGGGGGGK..KGGGGGGK..........",
  "....KKKKKKKK..KKKKKKKK..........",
  "................................"
];

// 9. Jump Fall (32x21)
const rickPrimeJumpFall = [
  "...........KKK...KKK............",
  "..........KHHHK.KHHHK...........",
  "....KKK...KHHHHhHHHHhK..........",
  "...KHHHK.KHHHHHHHHHHHhK.........",
  "..KHHHHhKHHHHHHHHHHHHhK.........",
  "..KHHHHhKHHHHHHHHHHHHHhK.KKK....",
  "...KhhhhKHHHHHHHHHHHHhK.KHHHK...",
  "....KKKKKuuuuuuuuuuhhhK..KhhhK..",
  ".......KWWWWWWWWWKKKK....KKK....",
  "...KKKKKKWWKKWWWWWKGGK..........",
  "..KCCCCCLWKWKWWWWWKRGK..........",
  ".KCCCCCCCLWWKKWWWWWKGGK.........",
  ".KccccCCCCWWWWWWWWWWWWK.........",
  "..KKKKCCCCLLLLGGWWWWWWK.........",
  ".....KCCCCLLGGGGWWWWK...........",
  "....KSSSSSSDBBBWWWWWWK..........",
  "...KBBBBBBKKKBBBBBBBBK..........",
  "..KBBBBBBK...KBBBBBBBK..........",
  "...KKKKKKK...KKKKKKKK...........",
  "................................",
  "................................"
];

// 10. Surf 0 (36x30)
const rickPrimeSurf0 = [
  "....................................",
  "..............KKK...KKK.............",
  ".............KHHHK.KHHHK............",
  ".......KKK...KHHHHhHHHHhK...........",
  "......KHHHK.KHHHHHHHHHHHhK..........",
  ".....KHHHHhKHHHHHHHHHHHHhK..........",
  ".....KHHHHhKHHHHHHHHHHHHHhK.KKK.....",
  "......KhhhhKHHHHHHHHHHHHhK.KHHHK....",
  ".......KKKKKHHHHHHHHHHHHhK.KHHHK....",
  "....KKK...KuuuuuuuuuuhhhK..KhhhK....",
  "..KKPPPK..KWWWWWWWWWKKKK....KKK.....",
  ".KPPPPPK..KWWKKWWWWWKGGK............",
  "KPP..PPK..KWKWKWWWWWKRGK............",
  ".KP..PK...KWWKKWWWWWKGGK...KKKK.....",
  "..KP..PKKKKWWWWWWWWWWWWK..KPPPPK....",
  "...KPKCCCCCCCLLLLGGWWWWKKKKPPPPPK...",
  "...KCCCCCCCCCCLLGGGGWWKKKKKPPPPPK...",
  "..KCCCCCCCCCCCCBBBBWWWWKKKKKKKKK....",
  ".KcccccCCCCCCCCBBBWWWWWWWWK.........",
  ".KKKKKKCCCCCCCCBBWWWWWWWWWK.........",
  "....KppKSSSSSSS..KBBBBBBBK..........",
  "...Kpp..KBBBBBBK.KBBBBBBBK..........",
  "...Kp...KBBBBBBK..KBBBBBBK..........",
  "....KK..KBBBBBBK..KBBBBBBK..........",
  ".......KGGGGGGK....KGGGGGGK.........",
  ".......KGGGGGGK....KGGGGGGK.........",
  ".......KKKKKKKK....KKKKKKKK.........",
  "....................................",
  "....................................",
  "...................................."
];

// 11. Surf 1 (36x30)
const rickPrimeSurf1 = [
  "....................................",
  "....................................",
  "..............KKK...KKK.............",
  ".............KHHHK.KHHHK............",
  ".......KKK...KHHHHhHHHHhK...........",
  "......KHHHK.KHHHHHHHHHHHhK..........",
  ".....KHHHHhKHHHHHHHHHHHHhK..........",
  ".....KHHHHhKHHHHHHHHHHHHHhK.KKK.....",
  "......KhhhhKHHHHHHHHHHHHhK.KHHHK....",
  "....KKK...KuuuuuuuuuuhhhK..KhhhK....",
  "..KKPPPK..KWWWWWWWWWKKKK....KKK.....",
  ".KPPPPPK..KWWKKWWWWWKGGK............",
  "KPP..PPK..KWKWKWWWWWKRGK............",
  ".KP..PK...KWWKKWWWWWKGGK...KKKK.....",
  "..KP..PKKKKWWWWWWWWWWWWK..KPPPPK....",
  "...KPKCCCCCCCLLLLGGWWWWKKKKPPPPPK...",
  "...KCCCCCCCCCCLLGGGGWWKKKKKPPPPPK...",
  "..KCCCCCCCCCCCCBBBBWWWWKKKKKKKKK....",
  ".KcccccCCCCCCCCBBBWWWWWWWWK.........",
  ".KKKKKKCCCCCCCCBBWWWWWWWWWK.........",
  "....KppKSSSSSSS..KBBBBBBBK..........",
  "...Kpp..KBBBBBBK.KBBBBBBBK..........",
  "...Kp...KBBBBBBK..KBBBBBBK..........",
  "....KK..KBBBBBBK..KBBBBBBK..........",
  ".......KGGGGGGK....KGGGGGGK.........",
  ".......KGGGGGGK....KGGGGGGK.........",
  ".......KKKKKKKK....KKKKKKKK.........",
  "....................................",
  "....................................",
  "...................................."
];

// 12. Surf Dash (36x30)
const rickPrimeSurfDash = [
  "....................................",
  "....................................",
  "....................................",
  "....................................",
  "................KKK...KKK...........",
  "...............KHHHK.KHHHK..........",
  ".........KKK...KHHHHhHHHHhK.........",
  "........KHHHK.KHHHHHHHHHHHhK........",
  ".......KHHHHhKHHHHHHHHHHHHhK........",
  ".......KHHHHhKHHHHHHHHHHHHHhK.......",
  "........KhhhhKHHHHHHHHHHHHhK........",
  ".........KKKKKuuuuuuuuuuhhhK........",
  "..............KWWWWWWWWWKKKK........",
  "....KKKKKKKKKKKWWKKWWWWWKGGKKK......",
  "..KKCCCCCCCCCCKWKWKWWWWWKRGKKPK.....",
  ".KCCCCCCCCCCCCKWWKKWWWWWKGGKKPK.....",
  "KCCCCCCCCCCCCCCBBBBWWWWWWWWWWPKKKKKK",
  "KcccccccCCCCCCCBBBWWWWWWWWWWWWKPPPPP",
  "KKKKKKKKCCCCCCCBBWWWWWWWWWWWWWWKPPPP",
  "..KKppppKSSSSSSSSBBWWWWWWWKKKKKKKKKK",
  ".Kpp...KBBBBBBBBBBBBBBBBK...KBBBBBBK",
  "Kpp...KBBBBBBBBBBBBBBBBK.....KBBBBBK",
  ".KK..KGGGGGGGGGGGGGGGKK.......KGGGGK",
  ".....KGGGGGGGGGGGGGGGK.........KGGGK",
  ".....KKKKKKKKKKKKKKKKK.........KKKKK",
  "....................................",
  "....................................",
  "....................................",
  "....................................",
  "...................................."
];


// --- MÓDULO: src/sprites/player/grids_homelander.js ---
// ============================================================================
// MATRICES PIXEL ART: HOMELANDER (EL PATRIOTA SUPREMO - THE BOYS)
// ============================================================================
// Matrices dedicadas orientadas al frente (derecha) con cabello rubio impecable,
// ojos láser carmesí incandescentes (visión térmica), hombreras doradas de águila,
// traje azul marino heroico con emblema de águila en el pecho, capa patriótica
// con barras de la bandera americana que ondea hacia atrás, cinturón dorado y
// botas de combate rojas.

const homelanderIdle0 = [
  "................................",
  "............KKKKKKKK............",
  "..........KKYYYYYYYYKK..........",
  ".........KYYYYYYYYYYYYK.........",
  "........KYYYyyyyyyyyYYYK........",
  "........KYYyyyyyyyyyyYYYK.......",
  "........KyaaKKKKKFFFFFYYK.......",
  "........KyaKFFFFFFFFFFFyK.......",
  "........KyaKFFFFFRRFFFFK........",
  ".........KKKFFFFFRRFFFFK........",
  "...........KFFFFFFFFFFFK.KKKK...",
  "...........KFFFFFffFFFFKKGGGGK..",
  ".........KGGGK.KFFFFFFFKKGGGGK..",
  "........KCCLLcKWWWWWWWWKKGggGK..",
  ".......KCCCLLCcWWWWWWWWWKKKKK...",
  ".......KCCCLLCcWWWWWWWWWWWKPK...",
  ".......KCCCLLCcWWWWGGWWWWWKPK...",
  ".......KCCCLLCcWWWGGGGWWWWK.....",
  ".......KCCCLLCcWWWWWWWWWWWK.....",
  ".......KCCCLLCcWWWWSSWWWWWK.....",
  ".......KCCCLLCcGGGGGGGGGGGK.....",
  ".......KCCCLLCcWWWWK..KWWWK.....",
  ".......KCCCLLCcWWWWK..KWWWK.....",
  ".......KCCCLLCcSSSSK..KSSSK.....",
  ".......KCCCLLCcrrrrK..KrrrK.....",
  ".......KcccllcKrrrrK..KrrrK.....",
  "........KKKKKKKGGGGK..KGGGK.....",
  "..............KrrrrK..KrrrK.....",
  "..............KKKKKK..KKKKK....."
];

const homelanderIdle1 = [
  "................................",
  "................................",
  "............KKKKKKKK............",
  "..........KKYYYYYYYYKK..........",
  ".........KYYYYYYYYYYYYK.........",
  "........KYYYyyyyyyyyYYYK........",
  "........KYYyyyyyyyyyyYYYK.......",
  "........KyaaKKKKKFFFFFYYK.......",
  "........KyaKFFFFFFFFFFFyK.......",
  "........KyaKFFFFFRRFFFFK........",
  ".........KKKFFFFFRRFFFFK........",
  "...........KFFFFFFFFFFFK.KKKK...",
  "...........KFFFFFffFFFFKKGGGGK..",
  ".........KGGGK.KFFFFFFFKKGGGGK..",
  "........KCCLLcKWWWWWWWWKKGggGK..",
  ".......KCCCLLCcWWWWWWWWWKKKKK...",
  ".......KCCCLLCcWWWWWWWWWWWKPK...",
  ".......KCCCLLCcWWWWGGWWWWWKPK...",
  ".......KCCCLLCcWWWGGGGWWWWK.....",
  ".......KCCCLLCcWWWWWWWWWWWK.....",
  ".......KCCCLLCcWWWWSSWWWWWK.....",
  ".......KCCCLLCcGGGGGGGGGGGK.....",
  ".......KCCCLLCcWWWWK..KWWWK.....",
  ".......KCCCLLCcWWWWK..KWWWK.....",
  ".......KCCCLLCcSSSSK..KSSSK.....",
  ".......KCCCLLCcrrrrK..KrrrK.....",
  ".......KcccllcKrrrrK..KrrrK.....",
  "........KKKKKKKGGGGK..KGGGK.....",
  "..............KKKKKK..KKKKK....."
];

const homelanderTransition = [
  "................................",
  "............KKKKKKKK............",
  "..........KKYYYYYYYYKK..........",
  ".........KYYYYYYYYYYYYK.........",
  "........KYYYyyyyyyyyYYYK........",
  "........KYYyyyyyyyyyyYYYK.......",
  "........KyaaKKKKKFFFFFYYK.......",
  "........KyaKFFFFFFFFFFFyK.......",
  "........KyaKFFFFFRRFFFFK........",
  ".........KKKFFFFFRRFFFFK........",
  "...........KFFFFFFFFFFFK.KKKK...",
  "...........KFFFFFffFFFFKKGGGGK..",
  ".........KGGGK.KFFFFFFFKKGggGK..",
  "........KCCLLcKWWWWWWWWKKKKKK...",
  ".......KCCCLLCcWWWWWWWWWWWKPK...",
  ".......KCCCLLCcWWWWGGWWWWWKPK...",
  ".......KCCCLLCcWWWGGGGWWWWK.....",
  ".......KCCCLLCcWWWWWWWWWWWK.....",
  ".......KCCCLLCcWWWWSSWWWWWK.....",
  ".......KCCCLLCcGGGGGGGGGGGK.....",
  ".......KCCCLLCcWWWWWWWWWWWK.....",
  ".......KCCCLLCcSSSSSSSSSSSK.....",
  "........KCCLLcKrrrrrKKrrrrK.....",
  ".........KKKKKKGGGGGK.KGGGK.....",
  "..............KrrrrrK.KrrrK.....",
  "..............KKKKKKK.KKKKK....."
];

const homelanderRun0 = [
  "...........KKKKKKKK.............",
  ".........KKYYYYYYYYKK...........",
  "........KYYYYYYYYYYYYK..........",
  ".......KYYYyyyyyyyyYYYK.........",
  ".......KYYyyyyyyyyyyYYYK........",
  ".......KyaaKKKKKFFFFFYYK........",
  ".......KyaKFFFFFFFFFFFyK........",
  ".......KyaKFFFFFRRFFFFK.........",
  "........KKKFFFFFRRFFFFK..KKKK...",
  "..........KFFFFFFFFFFFK.KGGGGK..",
  ".......KGGGK..KFFFFffFFKKGggGK..",
  ".....KKCCLLCK.KWWWWWWWWKKKKKK...",
  "...KKCCCLLCCcKKWWWWGGWWWWKPK....",
  ".KKCCCCLLLLCcKKWWWWGGGGWWKPK....",
  "KCCCCCCLLLLCcKKWWWWWWWWWWWK.....",
  ".KCCCCCCCCCCcKKWWWWSSWWWWK......",
  "..KKKKCCCCCCcKKGGGGGGGGGGK......",
  "......KKKKKK...KWWWWWWWWWK......",
  "..............KWWWWK.KWWWWK.....",
  "..............KSSSSK..KSSSSK....",
  ".............KrrrrK....KrrrrK...",
  ".............KrrrrK.....KrrrrK..",
  ".............KGGGGK......KGGGGK.",
  ".............KrrrrK.......KrrrrK",
  ".............KKKKKK.......KKKKKK"
];

const homelanderRun1 = [
  "...........KKKKKKKK.............",
  ".........KKYYYYYYYYKK...........",
  "........KYYYYYYYYYYYYK..........",
  ".......KYYYyyyyyyyyYYYK.........",
  ".......KYYyyyyyyyyyyYYYK........",
  ".......KyaaKKKKKFFFFFYYK........",
  ".......KyaKFFFFFFFFFFFyK........",
  ".......KyaKFFFFFRRFFFFK.........",
  "........KKKFFFFFRRFFFFK..KKKK...",
  "..........KFFFFFFFFFFFK.KGGGGK..",
  ".......KGGGK..KFFFFffFFKKGggGK..",
  ".....KKCCLLCK.KWWWWWWWWKKKKKK...",
  "...KKCCCLLCCcKKWWWWGGWWWWKPK....",
  ".KKCCCCLLLLCcKKWWWWGGGGWWKPK....",
  "KCCCCCCLLLLCcKKWWWWWWWWWWWK.....",
  ".KCCCCCCCCCCcKKWWWWSSWWWWK......",
  "..KKKKCCCCCCcKKGGGGGGGGGGK......",
  "......KKKKKK..KWWWWWWWWWWK......",
  "..............KWWWWWWWWWWK......",
  "..............KSSSSSKSSSSK......",
  "..............KrrrrrKrrrrK......",
  "..............KrrrrrKrrrrK......",
  "..............KGGGGGKGGGGK......",
  "..............KrrrrrKrrrrK......",
  "..............KKKKKKKKKKKK......"
];

const homelanderRun2 = [
  "...........KKKKKKKK.............",
  ".........KKYYYYYYYYKK...........",
  "........KYYYYYYYYYYYYK..........",
  ".......KYYYyyyyyyyyYYYK.........",
  ".......KYYyyyyyyyyyyYYYK........",
  ".......KyaaKKKKKFFFFFYYK........",
  ".......KyaKFFFFFFFFFFFyK........",
  ".......KyaKFFFFFRRFFFFK.........",
  "........KKKFFFFFRRFFFFK..KKKK...",
  "..........KFFFFFFFFFFFK.KGGGGK..",
  ".......KGGGK..KFFFFffFFKKGggGK..",
  ".....KKCCLLCK.KWWWWWWWWKKKKKK...",
  "...KKCCCLLCCcKKWWWWGGWWWWKPK....",
  ".KKCCCCLLLLCcKKWWWWGGGGWWKPK....",
  "KCCCCCCLLLLCcKKWWWWWWWWWWWK.....",
  ".KCCCCCCCCCCcKKWWWWSSWWWWK......",
  "..KKKKCCCCCCcKKGGGGGGGGGGK......",
  "......KKKKKK...KWWWWWWWWWK......",
  "..............KWWWWK.KWWWWK.....",
  ".............KSSSSK...KSSSSK....",
  "............KrrrrK.....KrrrrK...",
  "...........KrrrrK.......KrrrrK..",
  "...........KGGGGK........KGGGGK.",
  "...........KrrrrK.........KrrrrK",
  "...........KKKKKK.........KKKKKK"
];

const homelanderRun3 = [
  "...........KKKKKKKK.............",
  ".........KKYYYYYYYYKK...........",
  "........KYYYYYYYYYYYYK..........",
  ".......KYYYyyyyyyyyYYYK.........",
  ".......KYYyyyyyyyyyyYYYK........",
  ".......KyaaKKKKKFFFFFYYK........",
  ".......KyaKFFFFFFFFFFFyK........",
  ".......KyaKFFFFFRRFFFFK.........",
  "........KKKFFFFFRRFFFFK..KKKK...",
  "..........KFFFFFFFFFFFK.KGGGGK..",
  ".......KGGGK..KFFFFffFFKKGggGK..",
  ".....KKCCLLCK.KWWWWWWWWKKKKKK...",
  "...KKCCCLLCCcKKWWWWGGWWWWKPK....",
  ".KKCCCCLLLLCcKKWWWWGGGGWWKPK....",
  "KCCCCCCLLLLCcKKWWWWWWWWWWWK.....",
  ".KCCCCCCCCCCcKKWWWWSSWWWWK......",
  "..KKKKCCCCCCcKKGGGGGGGGGGK......",
  "......KKKKKK...KWWWWWWWWWK......",
  "...............KWWWWWWWWWK......",
  "...............KSSSSKSSSSK......",
  "..............KrrrrrKrrrrK......",
  "..............KrrrrrKrrrrK......",
  "..............KGGGGGKGGGGK......",
  "..............KrrrrrKrrrrK......",
  "..............KKKKKKKKKKKK......"
];

const homelanderJumpUp = [
  ".....................KKKK.......",
  "...........KKKKKKKK.KPPPPK......",
  ".........KKYYYYYYYYKKKPPPK......",
  "........KYYYYYYYYYYYYKKKK.......",
  ".......KYYYyyyyyyyyYYYK.........",
  ".......KYYyyyyyyyyyyYYYK........",
  ".......KyaaKKKKKFFFFFYYK........",
  ".......KyaKFFFFFFFFFFFyK........",
  ".......KyaKFFFFFRRFFFFK..KKKK...",
  "........KKKFFFFFRRFFFFK.KGGGGK..",
  ".......KGGGK..KFFFFFFFFFKKGggGK.",
  "......KCCLLCK.KWWWWWWWWWKKKKKKK.",
  ".....KCCCLLCcKKWWWWGGWWWWWK.....",
  ".....KCCCLLCcKWWWWWGGGGWWWK.....",
  ".....KCCCLLCcKWWWWWWWWWWWWK.....",
  ".....KCCCLLCcKWWWWWSSWWWWWK.....",
  ".....KCCCLLCcKGGGGGGGGGGGGK.....",
  "......KCCLLCK..KWWWWWWWWWWK.....",
  ".......KCCCK...KSSSSSSSSSSK.....",
  "........KKK....KrrrrrrKrrrK.....",
  "...............KrrrrrrKrrrK.....",
  "...............KGGGGGGKGGGK.....",
  "...............KrrrrrrKrrrK.....",
  "...............KKKKKKKKKKKK.....",
  "................................"
];

const homelanderJumpFall = [
  "............KKKKKKKK............",
  "..........KKYYYYYYYYKK..........",
  ".........KYYYYYYYYYYYYK.........",
  "........KYYYyyyyyyyyYYYK........",
  "........KYYyyyyyyyyyyYYYK.......",
  "........KyaaKKKKKFFFFFYYK.......",
  "........KyaKFFFFFRRFFFFK..KKKK..",
  ".........KKKFFFFFRRFFFFK.KGGGGK.",
  "........KGGGK..KFFFFFFFFFKKGggGK",
  ".......KCCLLCK.KWWWWWWWWWKKKKKKK",
  "......KCCCLLCcKKWWWWGGWWWWKPK...",
  "......KCCCLLCcKWWWWWGGGGWWKPK...",
  "......KCCCLLCcKWWWWWWWWWWWK.....",
  "......KCCCLLCcKGGGGGGGGGGGK.....",
  ".......KCCLLCK..KWWWWK.KWWK.....",
  "........KCCCK...KSSSSK.KSSK.....",
  ".........KKK....KrrrrK.KrrK.....",
  "................KGGGGK.KGGK.....",
  "................KrrrrK.KrrK.....",
  "................KKKKKK.KKKK.....",
  "................................"
];

const homelanderSurf0 = [
  "....................................",
  "..............KKKKKKKK..............",
  "............KKYYYYYYYYKK............",
  "...........KYYYYYYYYYYYYK...........",
  "..........KYYYyyyyyyyyYYYK..........",
  "..........KYYyyyyyyyyyyYYYK.........",
  "..........KyaaKKKKKFFFFFYYK.........",
  "..........KyaKFFFFFFFFFFFyK.........",
  "..........KyaKFFFFFRRFFFFK...KKKK...",
  "...........KKKFFFFFRRFFFFK..KGGGGK..",
  "........KGGGK..KFFFFFFFFFK..KGggGK..",
  ".......KCCLLCK.KWWWWWWWWWKKKKKKKK...",
  "......KCCCLLCcKKWWWWGGWWWWKPK.......",
  "......KCCCLLCcKWWWWWGGGGWWKPK.......",
  "......KCCCLLCcKWWWWWWWWWWWKKKK......",
  "......KCCCLLCcKWWWWSSWWWWKPPPPK.....",
  "......KCCCLLCcKGGGGGGGGGGKPPPPPK....",
  ".......KCCLLCKKKWWWWWWWWKKKKPPPPK...",
  "........KCCCK..KSSSSSSSK...KKKKK....",
  ".........KKK...KWWWWWWWK............",
  "...............KWWWWWWWK............",
  "...............KSSSSSSSK............",
  "...............KrrrrrrrK............",
  "...............KrrrrrrrK............",
  "...............KGGGGGGGK............",
  "...............KrrrrrrrK............",
  "...............KKKKKKKKK............",
  "....................................",
  "....................................",
  "...................................."
];

const homelanderSurf1 = [
  "....................................",
  "....................................",
  "..............KKKKKKKK..............",
  "............KKYYYYYYYYKK............",
  "...........KYYYYYYYYYYYYK...........",
  "..........KYYYyyyyyyyyYYYK..........",
  "..........KYYyyyyyyyyyyYYYK.........",
  "..........KyaaKKKKKFFFFFYYK.........",
  "..........KyaKFFFFFFFFFFFyK.........",
  "..........KyaKFFFFFRRFFFFK...KKKK...",
  "...........KKKFFFFFRRFFFFK..KGGGGK..",
  "........KGGGK..KFFFFFFFFFK..KGggGK..",
  ".......KCCLLCK.KWWWWWWWWWKKKKKKKK...",
  "......KCCCLLCcKKWWWWGGWWWWKPK.......",
  "......KCCCLLCcKWWWWWGGGGWWKPK.......",
  "......KCCCLLCcKWWWWWWWWWWWKKKK......",
  "......KCCCLLCcKWWWWSSWWWWKPPPPK.....",
  "......KCCCLLCcKGGGGGGGGGGKPPPPPK....",
  ".......KCCLLCKKKWWWWWWWWKKKKPPPPK...",
  "........KCCCK..KSSSSSSSK...KKKKK....",
  ".........KKK...KWWWWWWWK............",
  "...............KWWWWWWWK............",
  "...............KSSSSSSSK............",
  "...............KrrrrrrrK............",
  "...............KrrrrrrrK............",
  "...............KGGGGGGGK............",
  "...............KrrrrrrrK............",
  "...............KKKKKKKKK............",
  "....................................",
  "...................................."
];

const homelanderSurfDash = [
  "....................................",
  "....................................",
  "....................................",
  "....................................",
  "................KKKKKKKK............",
  "..............KKYYYYYYYYKK..........",
  ".............KYYYYYYYYYYYYK.........",
  "............KYYYyyyyyyyyYYYK........",
  "............KYYyyyyyyyyyyYYYK.......",
  "............KyaaKKKKKFFFFFYYK.......",
  "............KyaKFFFFFFFFFFFyK.......",
  "............KyaKFFFFFRRFFFFK...KKKK.",
  ".............KKKFFFFFRRFFFFK..KGGGGK",
  "..........KGGGK..KFFFFFFFFFK..KGggGK",
  "........KKCCLLCK.KWWWWWWWWWKKKKKKKKK",
  "......KKCCCLLCCcKKWWWWGGWWWWKPK.....",
  ".....KCCCCLLLLCcKKWWWWGGGGWWKPK.....",
  "....KCCCCCCLLLLCcKWWWWWWWWWWKKKK....",
  "....KCCCCCCCCCCCcKWWWWSSWWWWKPPPPK..",
  ".....KKKKCCCCCCCcKGGGGGGGGGGKPPPPK..",
  ".........KKKKKKKKKWWWWWWWWWWKKKKK...",
  ".................KSSSSSSSSSSK.......",
  ".................KrrrrrrrrrrK.......",
  ".................KGGGGGGGGGGK.......",
  ".................KrrrrrrrrrrK.......",
  ".................KKKKKKKKKKKK.......",
  "....................................",
  "....................................",
  "....................................",
  "...................................."
];



// --- MÓDULO: src/sprites/player/grids_peacemaker.js ---
// ============================================================================
// MATRICES PIXEL ART: PEACEMAKER (HÉROE DEL CASCO CROMADO - DC COMICS)
// ============================================================================
// Matrices dedicadas orientadas al frente (derecha) con icónico casco cromado
// plateado reflectante, emblema frontal de la Paloma de la Paz dorada, traje
// táctico patriota rojo y azul con correas blancas de arnés, guantes y botas de combate.

const peacemakerIdle0 = [
  "................................",
  "................................",
  "............KKKKKKKK............",
  "..........KKeEEEEEEEeKK.........",
  ".........KeEEEEEEEEEEEeK........",
  "........KeEEEEEEEEEEEEEeK.......",
  "........KEEEEeMMMMMeEEEEeK......",
  "........KEEEMMKGGGMMEEEEeK......",
  "........KEEEMKGGGGMKEEEEeK......",
  "........KEEEMMKGGGMKFFKKKKK.....",
  ".........KEEMMMMMMKFFKFKFK......",
  "..........KEMMMMMMKKFFFFFK......",
  "...........KKKKKKKKKFFFFfK.KKKK.",
  "..........KLLLLLLLLKFFFfKKKPPPK.",
  ".........KLLWWWWWWWWKKKKK.KPPPK.",
  "........KLLWWWWWWWWWWKKKKKKPPPK.",
  "........KLWWWWWWGGWWWWWWK.KPPPK.",
  "........KLWWWWWGGGGWWWWWK..KKK..",
  "........KLWWWWWWGGWWWWWWK.......",
  "........KLWWWWWWWWWWWWWWK.......",
  "........KLWWWWWWSSWWWWWWK.......",
  ".........KGGGGGGGGGGGGGGK.......",
  ".........KCCCCCC..KCCCCK........",
  ".........KCCCCCC..KCCCCK........",
  ".........Kcccccc..KccccK........",
  ".........KBBBBBB..KBBBBK........",
  ".........KBBBBBB..KBBBBK........",
  ".........Kbbbbbb..KbbbbK........",
  ".........KKKKKKK..KKKKKK........"
];

const peacemakerIdle1 = [
  "................................",
  "................................",
  "................................",
  "............KKKKKKKK............",
  "..........KKeEEEEEEEeKK.........",
  ".........KeEEEEEEEEEEEeK........",
  "........KeEEEEEEEEEEEEEeK.......",
  "........KEEEEeMMMMMeEEEEeK......",
  "........KEEEMMKGGGMMEEEEeK......",
  "........KEEEMKGGGGMKEEEEeK......",
  "........KEEEMMKGGGMKFFKKKKK.....",
  ".........KEEMMMMMMKFFKFKFK......",
  "..........KEMMMMMMKKFFFFFK......",
  "...........KKKKKKKKKFFFFfK.KKKK.",
  "..........KLLLLLLLLKFFFfKKKPPPK.",
  ".........KLLWWWWWWWWKKKKK.KPPPK.",
  "........KLLWWWWWWWWWWKKKKKKPPPK.",
  "........KLWWWWWWGGWWWWWWK.KPPPK.",
  "........KLWWWWWGGGGWWWWWK..KKK..",
  "........KLWWWWWWGGWWWWWWK.......",
  "........KLWWWWWWWWWWWWWWK.......",
  "........KLWWWWWWSSWWWWWWK.......",
  ".........KGGGGGGGGGGGGGGK.......",
  ".........KCCCCCC..KCCCCK........",
  ".........KCCCCCC..KCCCCK........",
  ".........Kcccccc..KccccK........",
  ".........KBBBBBB..KBBBBK........",
  ".........Kbbbbbb..KbbbbK........",
  ".........KKKKKKK..KKKKKK........"
];

const peacemakerTransition = [
  "................................",
  "............KKKKKKKK............",
  "..........KKeEEEEEEEeKK.........",
  ".........KeEEEEEEEEEEEeK........",
  "........KeEEEEEEEEEEEEEeK.......",
  "........KEEEEeMMMMMeEEEEeK......",
  "........KEEEMMKGGGMMEEEEeK......",
  "........KEEEMKGGGGMKEEEEeK......",
  "........KEEEMMKGGGMKFFKKKKK.....",
  ".........KEEMMMMMMKFFKFKFK......",
  "..........KEMMMMMMKKFFFFFK......",
  "...........KKKKKKKKKFFFFfK.KKKK.",
  "..........KLLLLLLLLKFFFfKKKPPPK.",
  ".........KLLWWWWWWWWKKKKK.KPPPK.",
  "........KLWWWWWWGGWWWWWWKKKPPPK.",
  "........KLWWWWWGGGGWWWWWK..KKK..",
  "........KLWWWWWWGGWWWWWWK.......",
  "........KLWWWWWWWWWWWWWWK.......",
  "........KLWWWWWWSSWWWWWWK.......",
  ".........KGGGGGGGGGGGGGGK.......",
  ".........KCCCCCCCCCCCCCCK.......",
  ".........KccccccccccccccK.......",
  ".........KBBBBBBKKBBBBBBK.......",
  ".........KbbbbbbK.KbbbbbK.......",
  ".........KBBBBBBK.KBBBBBK.......",
  ".........KKKKKKKK.KKKKKKK......."
];

const peacemakerRun0 = [
  "...........KKKKKKKK.............",
  ".........KKeEEEEEEEeKK..........",
  "........KeEEEEEEEEEEEeK.........",
  ".......KeEEEEEEEEEEEEEeK........",
  ".......KEEEEeMMMMMeEEEEeK.......",
  ".......KEEEMMKGGGMMEEEEeK.......",
  ".......KEEEMKGGGGMKEEEEeK.......",
  ".......KEEEMMKGGGMKFFKKKKK......",
  "........KEEMMMMMMKFFKFKFK.......",
  ".........KEMMMMMMKKFFFFFK..KKKK.",
  "..........KKKKKKKKKFFFFfKKKPPPK.",
  ".........KLLLLLLLLKFFFfKK.KPPPK.",
  "........KLLWWWWWWWWKKKKK..KPPPK.",
  ".......KLLWWWWWWGGWWWWWWK..KKK..",
  ".......KLWWWWWWGGGGWWWWWK.......",
  ".......KLWWWWWWWWWWWWWWWK.......",
  ".......KLWWWWWWSSWWWWWWWK.......",
  "........KGGGGGGGGGGGGGGGK.......",
  "........KCCCCCCK..KCCCCK........",
  ".......KccccccK....KccccK.......",
  ".......KBBBBBK......KBBBBK......",
  "......KBBBBBK........KBBBBK.....",
  "......KbbbbbK.........KbbbbK....",
  "......KBBBBBK..........KBBBBK...",
  "......KKKKKKK..........KKKKKK..."
];

const peacemakerRun1 = [
  "...........KKKKKKKK.............",
  ".........KKeEEEEEEEeKK..........",
  "........KeEEEEEEEEEEEeK.........",
  ".......KeEEEEEEEEEEEEEeK........",
  ".......KEEEEeMMMMMeEEEEeK.......",
  ".......KEEEMMKGGGMMEEEEeK.......",
  ".......KEEEMKGGGGMKEEEEeK.......",
  ".......KEEEMMKGGGMKFFKKKKK......",
  "........KEEMMMMMMKFFKFKFK.......",
  ".........KEMMMMMMKKFFFFFK..KKKK.",
  "..........KKKKKKKKKFFFFfKKKPPPK.",
  ".........KLLLLLLLLKFFFfKK.KPPPK.",
  "........KLLWWWWWWWWKKKKK..KPPPK.",
  ".......KLLWWWWWWGGWWWWWWK..KKK..",
  ".......KLWWWWWWGGGGWWWWWK.......",
  ".......KLWWWWWWWWWWWWWWWK.......",
  ".......KLWWWWWWSSWWWWWWWK.......",
  "........KGGGGGGGGGGGGGGGK.......",
  "........KCCCCCCCCCCCCCCK........",
  "........KccccccccccccccK........",
  "........KBBBBBBKKBBBBBBK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KbbbbbbK.KbbbbbK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KKKKKKKK.KKKKKKK........"
];

const peacemakerRun2 = [
  "...........KKKKKKKK.............",
  ".........KKeEEEEEEEeKK..........",
  "........KeEEEEEEEEEEEeK.........",
  ".......KeEEEEEEEEEEEEEeK........",
  ".......KEEEEeMMMMMeEEEEeK.......",
  ".......KEEEMMKGGGMMEEEEeK.......",
  ".......KEEEMKGGGGMKEEEEeK.......",
  ".......KEEEMMKGGGMKFFKKKKK......",
  "........KEEMMMMMMKFFKFKFK.......",
  ".........KEMMMMMMKKFFFFFK..KKKK.",
  "..........KKKKKKKKKFFFFfKKKPPPK.",
  ".........KLLLLLLLLKFFFfKK.KPPPK.",
  "........KLLWWWWWWWWKKKKK..KPPPK.",
  ".......KLLWWWWWWGGWWWWWWK..KKK..",
  ".......KLWWWWWWGGGGWWWWWK.......",
  ".......KLWWWWWWWWWWWWWWWK.......",
  ".......KLWWWWWWSSWWWWWWWK.......",
  "........KGGGGGGGGGGGGGGGK.......",
  "........KCCCCK...KCCCCCCK.......",
  ".......KccccK.....KccccK........",
  "......KBBBBK.......KBBBBK.......",
  ".....KBBBBK.........KBBBBK......",
  "....KbbbbK...........KbbbbK.....",
  "....KBBBBK............KBBBBK....",
  "....KKKKKK............KKKKKK...."
];

const peacemakerRun3 = [
  "...........KKKKKKKK.............",
  ".........KKeEEEEEEEeKK..........",
  "........KeEEEEEEEEEEEeK.........",
  ".......KeEEEEEEEEEEEEEeK........",
  ".......KEEEEeMMMMMeEEEEeK.......",
  ".......KEEEMMKGGGMMEEEEeK.......",
  ".......KEEEMKGGGGMKEEEEeK.......",
  ".......KEEEMMKGGGMKFFKKKKK......",
  "........KEEMMMMMMKFFKFKFK.......",
  ".........KEMMMMMMKKFFFFFK..KKKK.",
  "..........KKKKKKKKKFFFFfKKKPPPK.",
  ".........KLLLLLLLLKFFFfKK.KPPPK.",
  "........KLLWWWWWWWWKKKKK..KPPPK.",
  ".......KLLWWWWWWGGWWWWWWK..KKK..",
  ".......KLWWWWWWGGGGWWWWWK.......",
  ".......KLWWWWWWWWWWWWWWWK.......",
  ".......KLWWWWWWSSWWWWWWWK.......",
  "........KGGGGGGGGGGGGGGGK.......",
  "........KCCCCCCCCCCCCCCK........",
  "........KccccccccccccccK........",
  "........KBBBBBBKKBBBBBBK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KbbbbbbK.KbbbbbK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KKKKKKKK.KKKKKKK........"
];

const peacemakerJumpUp = [
  ".....................KKKK.......",
  "...........KKKKKKKK.KPPPK.......",
  ".........KKeEEEEEEEeKKPPK.......",
  "........KeEEEEEEEEEEEeKKK.......",
  ".......KeEEEEEEEEEEEEEeK........",
  ".......KEEEEeMMMMMeEEEEeK.......",
  ".......KEEEMMKGGGMMEEEEeK.......",
  ".......KEEEMKGGGGMKEEEEeK.......",
  ".......KEEEMMKGGGMKFFKKKKK......",
  "........KEEMMMMMMKFFKFKFK.......",
  ".........KEMMMMMMKKFFFFFK.......",
  "..........KKKKKKKKKFFFFfK.......",
  ".........KLLLLLLLLKFFFfKK.......",
  "........KLLWWWWWWWWKKKKK........",
  ".......KLLWWWWWWGGWWWWWWK.......",
  ".......KLWWWWWWGGGGWWWWWK.......",
  ".......KLWWWWWWWWWWWWWWWK.......",
  ".......KLWWWWWWSSWWWWWWWK.......",
  "........KGGGGGGGGGGGGGGGK.......",
  "........KCCCCCCCCCCCCCCK........",
  "........KccccccccccccccK........",
  "........KBBBBBBKKBBBBBBK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KbbbbbbK.KbbbbbK........",
  "........KKKKKKKK.KKKKKKK........"
];

const peacemakerJumpFall = [
  "............KKKKKKKK............",
  "..........KKeEEEEEEEeKK.........",
  ".........KeEEEEEEEEEEEeK........",
  "........KeEEEEEEEEEEEEEeK.......",
  "........KEEEEeMMMMMeEEEEeK......",
  "........KEEEMMKGGGMMEEEEeK......",
  "........KEEEMKGGGGMKEEEEeK......",
  "........KEEEMMKGGGMKFFKKKKK.....",
  ".........KEEMMMMMMKFFKFKFK......",
  "..........KEMMMMMMKKFFFFFK..KKK.",
  "...........KKKKKKKKKFFFFfKKKPPPK",
  "..........KLLLLLLLLKFFFfKKKPPPK.",
  ".........KLLWWWWWWWWKKKKK..KKK..",
  "........KLWWWWWWGGWWWWWWK.......",
  "........KLWWWWWWWWWWWWWWK.......",
  ".........KGGGGGGGGGGGGGGK.......",
  ".........KCCCCCCKKCCCCCCK.......",
  ".........KccccccK.KcccccK.......",
  ".........KBBBBBBK.KBBBBBK.......",
  ".........KbbbbbbK.KbbbbbK.......",
  ".........KKKKKKKK.KKKKKKK......."
];

const peacemakerSurf0 = [
  "....................................",
  "..............KKKKKKKK..............",
  "............KKeEEEEEEEeKK...........",
  "...........KeEEEEEEEEEEEeK..........",
  "..........KeEEEEEEEEEEEEEeK.........",
  "..........KEEEEeMMMMMeEEEEeK........",
  "..........KEEEMMKGGGMMEEEEeK........",
  "..........KEEEMKGGGGMKEEEEeK........",
  "..........KEEEMMKGGGMKFFKKKKK.......",
  "...........KEEMMMMMMKFFKFKFK........",
  "............KEMMMMMMKKFFFFFK...KKKK.",
  ".............KKKKKKKKKFFFFfKKKKPPPK.",
  "............KLLLLLLLLKFFFfKKK.KPPPK.",
  "...........KLLWWWWWWWWKKKKK...KPPPK.",
  "..........KLLWWWWWWGGWWWWWWK...KKK..",
  "..........KLWWWWWWGGGGWWWWWKKKK.....",
  "..........KLWWWWWWWWWWWWWWKPPPPK....",
  "..........KLWWWWWWSSWWWWWWKPPPPPK...",
  "...........KGGGGGGGGGGGGGGKPPPPK....",
  "...........KCCCCCCCCCCCCCCKKKKK.....",
  "...........KccccccccccccccK.........",
  "...........KCCCCCCCCCCCCCCK.........",
  "...........KBBBBBBKKBBBBBBK.........",
  "...........KBBBBBBK.KBBBBBK.........",
  "...........KbbbbbbK.KbbbbbK.........",
  "...........KBBBBBBK.KBBBBBK.........",
  "...........KKKKKKKK.KKKKKKK.........",
  "....................................",
  "....................................",
  "...................................."
];

const peacemakerSurf1 = [
  "....................................",
  "....................................",
  "..............KKKKKKKK..............",
  "............KKeEEEEEEEeKK...........",
  "...........KeEEEEEEEEEEEeK..........",
  "..........KeEEEEEEEEEEEEEeK.........",
  "..........KEEEEeMMMMMeEEEEeK........",
  "..........KEEEMMKGGGMMEEEEeK........",
  "..........KEEEMKGGGGMKEEEEeK........",
  "..........KEEEMMKGGGMKFFKKKKK.......",
  "...........KEEMMMMMMKFFKFKFK........",
  "............KEMMMMMMKKFFFFFK...KKKK.",
  ".............KKKKKKKKKFFFFfKKKKPPPK.",
  "............KLLLLLLLLKFFFfKKK.KPPPK.",
  "...........KLLWWWWWWWWKKKKK...KPPPK.",
  "..........KLLWWWWWWGGWWWWWWK...KKK..",
  "..........KLWWWWWWGGGGWWWWWKKKK.....",
  "..........KLWWWWWWWWWWWWWWKPPPPK....",
  "..........KLWWWWWWSSWWWWWWKPPPPPK...",
  "...........KGGGGGGGGGGGGGGKPPPPK....",
  "...........KCCCCCCCCCCCCCCKKKKK.....",
  "...........KccccccccccccccK.........",
  "...........KCCCCCCCCCCCCCCK.........",
  "...........KBBBBBBKKBBBBBBK.........",
  "...........KBBBBBBK.KBBBBBK.........",
  "...........KbbbbbbK.KbbbbbK.........",
  "...........KBBBBBBK.KBBBBBK.........",
  "...........KKKKKKKK.KKKKKKK.........",
  "....................................",
  "...................................."
];

const peacemakerSurfDash = [
  "....................................",
  "....................................",
  "....................................",
  "................KKKKKKKK............",
  "..............KKeEEEEEEEeKK.........",
  ".............KeEEEEEEEEEEEeK........",
  "............KeEEEEEEEEEEEEEeK.......",
  "............KEEEEeMMMMMeEEEEeK......",
  "............KEEEMMKGGGMMEEEEeK......",
  "............KEEEMKGGGGMKEEEEeK......",
  "............KEEEMMKGGGMKFFKKKKK.....",
  ".............KEEMMMMMMKFFKFKFK......",
  "..............KEMMMMMMKKFFFFFK..KKK.",
  "...............KKKKKKKKKFFFFfKKKPPPK",
  "..............KLLLLLLLLKFFFfKKK.PPPK",
  ".............KLLWWWWWWWWKKKKK...KKK.",
  "............KLLWWWWWWGGWWWWWWK......",
  "............KLWWWWWWGGGGWWWWWKKKK...",
  "............KLWWWWWWWWWWWWWWKPPPPK..",
  "............KLWWWWWWSSWWWWWWKPPPPK..",
  ".............KGGGGGGGGGGGGGGKKKKK...",
  ".............KCCCCCCCCCCCCCCK.......",
  ".............KccccccccccccccK.......",
  ".............KBBBBBBKKBBBBBBK.......",
  ".............KbbbbbbK.KbbbbbK.......",
  ".............KBBBBBBK.KBBBBBK.......",
  ".............KKKKKKKK.KKKKKKK.......",
  "....................................",
  "....................................",
  "...................................."
];



// --- MÓDULO: src/sprites/player/grids_ivan.js ---
// ============================================================================
// MATRICES PIXEL ART: IVAN (VOCALISTA ALIEN STAGE - ROUND 6)
// ============================================================================
// Matrices dedicadas orientadas al frente (derecha) con cabello azabache rebelde
// en capas con flequillo sobre la frente, piel blanca porcelana, colmillo afilado
// en sonrisa, traje de sastre negro de idol con corbata roja carmesí y zapatos negros.

const ivanIdle0 = [
  "................................",
  "................................",
  "............KKKKKKKK............",
  "..........KKHHHHHHHHhK..........",
  ".........KHHHHHHHHHHHHhK........",
  "........KHHIIHHHHHHHIIHhK.......",
  "........KHHIIHhhHHHHIIHhK.......",
  "........KhhhaKKKKKFFFFHHhK......",
  "........KhhaKFFFFFFFFFFHhK......",
  "........KhhKFFFFFFEEFFFFhK......",
  ".........KKKFFFFFFEEFFFFK.......",
  "...........KFFFFFFFFFFFK.KKKK...",
  "...........KFFFFFFfeFFFK.KWWK...",
  "..........KWWWWWWKFFFFfKKKPPPK..",
  ".........KWWWWWWLLRRRKKKK.KPPPK.",
  "........KWWWWWWLLRRRWWKKKKKPPPK.",
  "........KWWWWWWLLRRRWWWK.KPPPK..",
  "........KWWWWWSSLLRRWWWWK..KKK..",
  "........KWWWWWSSLLRRWWWWK.......",
  "........KWWWWWWSSSRRWWWWK.......",
  "........KWWWWWWSSSSSWWWWK.......",
  ".........KGGGGGGGGGGGGGGK.......",
  ".........KCCCCCC..KCCCCK........",
  ".........KCCCCCC..KCCCCK........",
  ".........Kcccccc..KccccK........",
  ".........KBBBBBB..KBBBBK........",
  ".........KBBBBBB..KBBBBK........",
  ".........Kbbbbbb..KbbbbK........",
  ".........KKKKKKK..KKKKKK........"
];

const ivanIdle1 = [
  "................................",
  "................................",
  "................................",
  "............KKKKKKKK............",
  "..........KKHHHHHHHHhK..........",
  ".........KHHHHHHHHHHHHhK........",
  "........KHHIIHHHHHHHIIHhK.......",
  "........KHHIIHhhHHHHIIHhK.......",
  "........KhhhaKKKKKFFFFHHhK......",
  "........KhhaKFFFFFFFFFFHhK......",
  "........KhhKFFFFFFEEFFFFhK......",
  ".........KKKFFFFFFEEFFFFK.......",
  "...........KFFFFFFFFFFFK.KKKK...",
  "...........KFFFFFFfeFFFK.KWWK...",
  "..........KWWWWWWKFFFFfKKKPPPK..",
  ".........KWWWWWWLLRRRKKKK.KPPPK.",
  "........KWWWWWWLLRRRWWKKKKKPPPK.",
  "........KWWWWWWLLRRRWWWK.KPPPK..",
  "........KWWWWWSSLLRRWWWWK..KKK..",
  "........KWWWWWSSLLRRWWWWK.......",
  "........KWWWWWWSSSRRWWWWK.......",
  "........KWWWWWWSSSSSWWWWK.......",
  ".........KGGGGGGGGGGGGGGK.......",
  ".........KCCCCCC..KCCCCK........",
  ".........KCCCCCC..KCCCCK........",
  ".........Kcccccc..KccccK........",
  ".........KBBBBBB..KBBBBK........",
  ".........Kbbbbbb..KbbbbK........",
  ".........KKKKKKK..KKKKKK........"
];

const ivanTransition = [
  "................................",
  "............KKKKKKKK............",
  "..........KKHHHHHHHHhK..........",
  ".........KHHHHHHHHHHHHhK........",
  "........KHHIIHHHHHHHIIHhK.......",
  "........KHHIIHhhHHHHIIHhK.......",
  "........KhhhaKKKKKFFFFHHhK......",
  "........KhhaKFFFFFFFFFFHhK......",
  "........KhhKFFFFFFEEFFFFhK......",
  ".........KKKFFFFFFEEFFFFK.......",
  "...........KFFFFFFFFFFFK.KKKK...",
  "...........KFFFFFFfeFFFK.KWWK...",
  "..........KWWWWWWKFFFFfKKKPPPK..",
  ".........KWWWWWWLLRRRKKKK.KPPPK.",
  "........KWWWWWWLLRRRWWKKKKKPPPK.",
  "........KWWWWWWLLRRRWWWK.KPPPK..",
  "........KWWWWWSSLLRRWWWWK..KKK..",
  "........KWWWWWSSLLRRWWWWK.......",
  "........KWWWWWWSSSSSWWWWK.......",
  ".........KGGGGGGGGGGGGGGK.......",
  ".........KCCCCCCCCCCCCCCK.......",
  ".........KccccccccccccccK.......",
  ".........KBBBBBBKKBBBBBBK.......",
  ".........KbbbbbbK.KbbbbbK.......",
  ".........KBBBBBBK.KBBBBBK.......",
  ".........KKKKKKKK.KKKKKKK......."
];

const ivanRun0 = [
  "...........KKKKKKKK.............",
  ".........KKHHHHHHHHhK...........",
  "........KHHHHHHHHHHHHhK.........",
  ".......KHHIIHHHHHHHIIHhK........",
  ".......KHHIIHhhHHHHIIHhK........",
  ".......KhhhaKKKKKFFFFHHhK.......",
  ".......KhhaKFFFFFFFFFFHhK.......",
  ".......KhhKFFFFFFEEFFFFhK.......",
  "........KKKFFFFFFEEFFFFK........",
  "..........KFFFFFFFFFFFK..KKKK...",
  "..........KFFFFFFfeFFFK..KWWK...",
  ".........KWWWWWWKFFFFfKKKPPPK...",
  "........KWWWWWWLLRRRKKKK.KPPPK..",
  ".......KWWWWWWLLRRRWWKKKKKPPPK..",
  ".......KWWWWWWLLRRRWWWK..KKKK...",
  ".......KWWWWWSSLLRRWWWWK........",
  ".......KWWWWWWSSSSSWWWWK........",
  "........KGGGGGGGGGGGGGGK........",
  "........KCCCCCCK..KCCCCK........",
  ".......KccccccK....KccccK.......",
  ".......KBBBBBK......KBBBBK......",
  "......KBBBBBK........KBBBBK.....",
  "......KbbbbbK.........KbbbbK....",
  "......KBBBBBK..........KBBBBK...",
  "......KKKKKKK..........KKKKKK..."
];

const ivanRun1 = [
  "...........KKKKKKKK.............",
  ".........KKHHHHHHHHhK...........",
  "........KHHHHHHHHHHHHhK.........",
  ".......KHHIIHHHHHHHIIHhK........",
  ".......KHHIIHhhHHHHIIHhK........",
  ".......KhhhaKKKKKFFFFHHhK.......",
  ".......KhhaKFFFFFFFFFFHhK.......",
  ".......KhhKFFFFFFEEFFFFhK.......",
  "........KKKFFFFFFEEFFFFK........",
  "..........KFFFFFFFFFFFK..KKKK...",
  "..........KFFFFFFfeFFFK..KWWK...",
  ".........KWWWWWWKFFFFfKKKPPPK...",
  "........KWWWWWWLLRRRKKKK.KPPPK..",
  ".......KWWWWWWLLRRRWWKKKKKPPPK..",
  ".......KWWWWWWLLRRRWWWK..KKKK...",
  ".......KWWWWWSSLLRRWWWWK........",
  ".......KWWWWWWSSSSSWWWWK........",
  "........KGGGGGGGGGGGGGGK........",
  "........KCCCCCCCCCCCCCCK........",
  "........KccccccccccccccK........",
  "........KBBBBBBKKBBBBBBK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KbbbbbbK.KbbbbbK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KKKKKKKK.KKKKKKK........"
];

const ivanRun2 = [
  "...........KKKKKKKK.............",
  ".........KKHHHHHHHHhK...........",
  "........KHHHHHHHHHHHHhK.........",
  ".......KHHIIHHHHHHHIIHhK........",
  ".......KHHIIHhhHHHHIIHhK........",
  ".......KhhhaKKKKKFFFFHHhK.......",
  ".......KhhaKFFFFFFFFFFHhK.......",
  ".......KhhKFFFFFFEEFFFFhK.......",
  "........KKKFFFFFFEEFFFFK........",
  "..........KFFFFFFFFFFFK..KKKK...",
  "..........KFFFFFFfeFFFK..KWWK...",
  ".........KWWWWWWKFFFFfKKKPPPK...",
  "........KWWWWWWLLRRRKKKK.KPPPK..",
  ".......KWWWWWWLLRRRWWKKKKKPPPK..",
  ".......KWWWWWWLLRRRWWWK..KKKK...",
  ".......KWWWWWSSLLRRWWWWK........",
  ".......KWWWWWWSSSSSWWWWK........",
  "........KGGGGGGGGGGGGGGK........",
  "........KCCCCK...KCCCCCCK.......",
  ".......KccccK.....KccccK........",
  "......KBBBBK.......KBBBBK.......",
  ".....KBBBBK.........KBBBBK......",
  "....KbbbbK...........KbbbbK.....",
  "....KBBBBK............KBBBBK....",
  "....KKKKKK............KKKKKK...."
];

const ivanRun3 = [
  "...........KKKKKKKK.............",
  ".........KKHHHHHHHHhK...........",
  "........KHHHHHHHHHHHHhK.........",
  ".......KHHIIHHHHHHHIIHhK........",
  ".......KHHIIHhhHHHHIIHhK........",
  ".......KhhhaKKKKKFFFFHHhK.......",
  ".......KhhaKFFFFFFFFFFHhK.......",
  ".......KhhKFFFFFFEEFFFFhK.......",
  "........KKKFFFFFFEEFFFFK........",
  "..........KFFFFFFFFFFFK..KKKK...",
  "..........KFFFFFFfeFFFK..KWWK...",
  ".........KWWWWWWKFFFFfKKKPPPK...",
  "........KWWWWWWLLRRRKKKK.KPPPK..",
  ".......KWWWWWWLLRRRWWKKKKKPPPK..",
  ".......KWWWWWWLLRRRWWWK..KKKK...",
  ".......KWWWWWSSLLRRWWWWK........",
  ".......KWWWWWWSSSSSWWWWK........",
  "........KGGGGGGGGGGGGGGK........",
  "........KCCCCCCCCCCCCCCK........",
  "........KccccccccccccccK........",
  "........KBBBBBBKKBBBBBBK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KbbbbbbK.KbbbbbK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KKKKKKKK.KKKKKKK........"
];

const ivanJumpUp = [
  ".....................KKKK.......",
  "...........KKKKKKKK.KPPPK.......",
  ".........KKHHHHHHHHhKKPPK.......",
  "........KHHHHHHHHHHHHhKKK.......",
  ".......KHHIIHHHHHHHIIHhK........",
  ".......KHHIIHhhHHHHIIHhK........",
  ".......KhhhaKKKKKFFFFHHhK.......",
  ".......KhhaKFFFFFFFFFFHhK.......",
  ".......KhhKFFFFFFEEFFFFhK.......",
  "........KKKFFFFFFEEFFFFK........",
  "..........KFFFFFFFFFFFK.........",
  "..........KFFFFFFfeFFFK.........",
  ".........KWWWWWWKFFFFfKK........",
  "........KWWWWWWLLRRRKKKK........",
  ".......KWWWWWWLLRRRWWWWK........",
  ".......KWWWWWWLLRRRWWWWK........",
  ".......KWWWWWSSLLRRWWWWK........",
  ".......KWWWWWWSSSSSWWWWK........",
  "........KGGGGGGGGGGGGGGK........",
  "........KCCCCCCCCCCCCCCK........",
  "........KccccccccccccccK........",
  "........KBBBBBBKKBBBBBBK........",
  "........KBBBBBBK.KBBBBBK........",
  "........KbbbbbbK.KbbbbbK........",
  "........KKKKKKKK.KKKKKKK........"
];

const ivanJumpFall = [
  "............KKKKKKKK............",
  "..........KKHHHHHHHHhK..........",
  ".........KHHHHHHHHHHHHhK........",
  "........KHHIIHHHHHHHIIHhK.......",
  "........KHHIIHhhHHHHIIHhK.......",
  "........KhhhaKKKKKFFFFHHhK......",
  "........KhhaKFFFFFFFFFFHhK..KKK.",
  "........KhhKFFFFFFEEFFFFhKKKPPPK",
  ".........KKKFFFFFFEEFFFFK.KKPPPK",
  "...........KFFFFFFFFFFFK...KKK..",
  "...........KFFFFFFfeFFFK........",
  "..........KWWWWWWKFFFFfK........",
  ".........KWWWWWWLLRRRWWK........",
  "........KWWWWWWLLRRRWWWK........",
  "........KWWWWWWSSSSSWWWK........",
  ".........KGGGGGGGGGGGGGK........",
  ".........KCCCCCCKKCCCCCCK.......",
  ".........KccccccK.KcccccK.......",
  ".........KBBBBBBK.KBBBBBK.......",
  ".........KbbbbbbK.KbbbbbK.......",
  ".........KKKKKKKK.KKKKKKK......."
];

const ivanSurf0 = [
  "....................................",
  "..............KKKKKKKK..............",
  "............KKHHHHHHHHhK............",
  "...........KHHHHHHHHHHHHhK..........",
  "..........KHHIIHHHHHHHIIHhK.........",
  "..........KHHIIHhhHHHHIIHhK.........",
  "..........KhhhaKKKKKFFFFHHhK........",
  "..........KhhaKFFFFFFFFFFHhK........",
  "..........KhhKFFFFFFEEFFFFhK........",
  "...........KKKFFFFFFEEFFFFK.........",
  ".............KFFFFFFFFFFFK...KKKK...",
  ".............KFFFFFFfeFFFK...KWWK...",
  "............KWWWWWWKFFFFfKKKKPPPK...",
  "...........KWWWWWWLLRRRKKKK..KPPPK..",
  "..........KWWWWWWLLRRRWWKKKKKPPPK...",
  "..........KWWWWWWLLRRRWWWK...KKKK...",
  "..........KWWWWWSSLLRRWWWWKPPPPK....",
  "..........KWWWWWWSSSRRWWWWKPPPPPK...",
  "...........KGGGGGGGGGGGGGGKPPPPK....",
  "...........KCCCCCCCCCCCCCCKKKKK.....",
  "...........KccccccccccccccK.........",
  "...........KCCCCCCCCCCCCCCK.........",
  "...........KBBBBBBKKBBBBBBK.........",
  "...........KBBBBBBK.KBBBBBK.........",
  "...........KbbbbbbK.KbbbbbK.........",
  "...........KBBBBBBK.KBBBBBK.........",
  "...........KKKKKKKK.KKKKKKK.........",
  "....................................",
  "....................................",
  "...................................."
];

const ivanSurf1 = [
  "....................................",
  "....................................",
  "..............KKKKKKKK..............",
  "............KKHHHHHHHHhK............",
  "...........KHHHHHHHHHHHHhK..........",
  "..........KHHIIHHHHHHHIIHhK.........",
  "..........KHHIIHhhHHHHIIHhK.........",
  "..........KhhhaKKKKKFFFFHHhK........",
  "..........KhhaKFFFFFFFFFFHhK........",
  "..........KhhKFFFFFFEEFFFFhK........",
  "...........KKKFFFFFFEEFFFFK.........",
  ".............KFFFFFFFFFFFK...KKKK...",
  ".............KFFFFFFfeFFFK...KWWK...",
  "............KWWWWWWKFFFFfKKKKPPPK...",
  "...........KWWWWWWLLRRRKKKK..KPPPK..",
  "..........KWWWWWWLLRRRWWKKKKKPPPK...",
  "..........KWWWWWWLLRRRWWWK...KKKK...",
  "..........KWWWWWSSLLRRWWWWKPPPPK....",
  "..........KWWWWWWSSSRRWWWWKPPPPPK...",
  "...........KGGGGGGGGGGGGGGKPPPPK....",
  "...........KCCCCCCCCCCCCCCKKKKK.....",
  "...........KccccccccccccccK.........",
  "...........KCCCCCCCCCCCCCCK.........",
  "...........KBBBBBBKKBBBBBBK.........",
  "...........KBBBBBBK.KBBBBBK.........",
  "...........KbbbbbbK.KbbbbbK.........",
  "...........KBBBBBBK.KBBBBBK.........",
  "...........KKKKKKKK.KKKKKKK.........",
  "....................................",
  "...................................."
];

const ivanSurfDash = [
  "....................................",
  "....................................",
  "....................................",
  "................KKKKKKKK............",
  "..............KKHHHHHHHHhK..........",
  ".............KHHHHHHHHHHHHhK........",
  "............KHHIIHHHHHHHIIHhK.......",
  "............KHHIIHhhHHHHIIHhK.......",
  "............KhhhaKKKKKFFFFHHhK......",
  "............KhhaKFFFFFFFFFFHhK......",
  "............KhhKFFFFFFEEFFFFhK......",
  ".............KKKFFFFFFEEFFFFK.......",
  "...............KFFFFFFFFFFFK...KKKK.",
  "...............KFFFFFFfeFFFK...KWWK.",
  "..............KWWWWWWKFFFFfKKKKPPPK.",
  ".............KWWWWWWLLRRRKKKK..KPPPK",
  "............KWWWWWWLLRRRWWKKKKKPPPK.",
  "............KWWWWWWLLRRRWWWK...KKK..",
  "............KWWWWWSSLLRRWWWWKPPPPK..",
  "............KWWWWWWSSSSSWWWWKPPPPK..",
  ".............KGGGGGGGGGGGGGGKKKKK...",
  ".............KCCCCCCCCCCCCCCK.......",
  ".............KccccccccccccccK.......",
  ".............KBBBBBBKKBBBBBBK.......",
  ".............KbbbbbbK.KbbbbbK.......",
  ".............KBBBBBBK.KBBBBBK.......",
  ".............KKKKKKKK.KKKKKKK.......",
  "....................................",
  "....................................",
  "...................................."
];



// --- MÓDULO: src/sprites/player/grids_abaddon.js ---
// ============================================================================
// MATRICES PIXEL ART: ABADDON (SOMBRA HOTEL EMBRUJADO - HAZBIN HOTEL STYLE)
// ============================================================================
// Matrices dedicadas orientadas al frente (derecha) con cuernos demoniacos curvados
// carmesi profundo con puntas ardientes, silueta espectral de sombra obsidiana,
// ojos carmesi neon con destello blanco, sonrisa afilada demoniaca, manto espectral
// purpura ondeante con runas misticas, garras carmesi y pezunas oscuras.

const abaddonIdle0 = [
  "............KaK.......KaK.......",
  "...........KHHhK.....KHHhK......",
  "..........KHHHhK....KHHHhK......",
  ".........KHHHHhK...KHHHHhK......",
  "........KHHHHhK...KHHHHhK.......",
  "........KhhhKKKKKKKKKKhhK.......",
  ".........KKKWWWWWWWWKKKK........",
  "........KWWWWWWWWWWWWWWK........",
  ".......KWWWWWWWWWWWWWWWWK.......",
  ".......KWWWWWWWWWWWWEEeeK.......",
  ".......KWWWWWWWWWWWWEEeeK.......",
  "........KWWWWWWWWWWWKKKK........",
  "........KWWWWWWWRRRRRRRK.KKKK...",
  ".........KWWWWWWWeeeeerKKKPPPK..",
  ".......KKKWWWWWWKRRRRRKKKK.KPPPK",
  "......KCCCLKKKKKKWWWWWKKKKKKPPPK",
  ".....KCCCLLLCCKWWGGWWWWK.KPPPK..",
  "....KCCCLLllCCKWWGGWWWWK..KKK...",
  "...KCCCCLllCCCCKWWWWWWWWK.......",
  "..KCCCCLLlCCCCCCKWWWWWWWK.......",
  "..KCCCCLLCCCCCCCCKSSSWWWK.......",
  "..KCCCLLCCCCCCCCCCKSSSWWK.......",
  "...KCcLLcKCCCCCCK..KSSSWK.......",
  "....KKllK.KCCCCK....KSSSK.......",
  ".....KK...KBBBBK....KBBBK.......",
  "..........KBBBBK....KBBBK.......",
  "..........KbbbbK....KbbbbK......",
  "..........KBBBBK....KBBBBK......",
  "..........KKKKKK....KKKKKK......"
];

const abaddonIdle1 = [
  "................................",
  "............KaK.......KaK.......",
  "...........KHHhK.....KHHhK......",
  "..........KHHHhK....KHHHhK......",
  ".........KHHHHhK...KHHHHhK......",
  "........KHHHHhK...KHHHHhK.......",
  "........KhhhKKKKKKKKKKhhK.......",
  ".........KKKWWWWWWWWKKKK........",
  "........KWWWWWWWWWWWWWWK........",
  ".......KWWWWWWWWWWWWWWWWK.......",
  ".......KWWWWWWWWWWWWEEeeK.......",
  ".......KWWWWWWWWWWWWEEeeK.......",
  "........KWWWWWWWWWWWKKKK........",
  "........KWWWWWWWRRRRRRRK.KKKK...",
  ".........KWWWWWWWeeeeerKKKPPPK..",
  ".......KKKWWWWWWKRRRRRKKKK.KPPPK",
  "......KCCCLKKKKKKWWWWWKKKKKKPPPK",
  ".....KCCCLLLCCKWWGGWWWWK.KPPPK..",
  "....KCCCLLllCCKWWGGWWWWK..KKK...",
  "...KCCCCLllCCCCKWWWWWWWWK.......",
  "..KCCCCLLlCCCCCCKWWWWWWWK.......",
  "..KCCCCLLCCCCCCCCKSSSWWWK.......",
  "...KCcLLcKCCCCCCK..KSSSWK.......",
  "....KKllK.KCCCCK....KSSSK.......",
  ".....KK...KBBBBK....KBBBK.......",
  "..........KBBBBK....KBBBK.......",
  "..........KbbbbK....KbbbbK......",
  "..........KBBBBK....KBBBBK......",
  "..........KKKKKK....KKKKKK......"
];

const abaddonTransition = [
  "...........KaK.......KaK........",
  "..........KHHhK.....KHHhK.......",
  ".........KHHHhK....KHHHhK.......",
  "........KHHHHhK...KHHHHhK.......",
  "........KhhhKKKKKKKKKKhhK.......",
  ".........KKKWWWWWWWWKKKK........",
  "........KWWWWWWWWWWWWWWK........",
  ".......KWWWWWWWWWWWWEEeeK.......",
  ".......KWWWWWWWWWWWWEEeeK.......",
  "........KWWWWWWWRRRRRRRK.KKKK...",
  ".........KWWWWWWWeeeeerKKKPPPK..",
  ".......KKKWWWWWWKRRRRRKKKK.KPPPK",
  "......KCCCLKKKKKKWWWWWKKKKKKPPPK",
  ".....KCCCLLLCCKWWGGWWWWK.KPPPK..",
  "....KCCCLLllCCKWWGGWWWWK..KKK...",
  "...KCCCCLllCCCCKWWWWWWWWK.......",
  "..KCCCCLLlCCCCCCKWWWWWWWK.......",
  "..KCCCCLLCCCCCCCCKSSSWWWK.......",
  "...KCcLLcKCCCCCCKKSSSWWWK.......",
  "....KKllK.KCCCCK.KSSSSSSK.......",
  ".....KK...KBBBBK..KBBBBBK.......",
  "..........KBBBBK..KBBBBBK.......",
  "..........KbbbbK..KbbbbbbK......",
  "..........KBBBBK..KBBBBBBK......",
  "..........KBBBBK..KBBBBBBK......",
  "..........KKKKKK..KKKKKKKK......"
];

const abaddonRun0 = [
  "..........KaK.......KaK.........",
  ".........KHHhK.....KHHhK........",
  "........KHHHhK....KHHHhK........",
  ".......KHHHHhK...KHHHHhK........",
  ".......KhhhKKKKKKKKKKhhK........",
  "........KKKWWWWWWWWKKKK.........",
  ".......KWWWWWWWWWWWWWWK.........",
  "......KWWWWWWWWWWWWEEeeK........",
  "......KWWWWWWWWWWWWEEeeK........",
  ".......KWWWWWWWRRRRRRRK..KKKK...",
  "........KWWWWWWWeeeeerKKKPPPK...",
  "......KKKWWWWWWKRRRRRKKKK.KPPPK.",
  ".....KCCCLKKKKKKWWWWWKKKK..KPPPK",
  "....KCCCLLLCCKWWGGWWWWK.....KKK.",
  "...KCCCCLllCCKWWGGWWWWK.........",
  "..KCCCCLLlCCCCKWWWWWWWK.........",
  ".KCCCCLLlCCCCCCKWWWWWWK.........",
  ".KCCCLLlCCCCCCCCKSSSWWK.........",
  "..KCcLLK.KCCCCCCKKSSSWK.........",
  "...KKlK...KBBBBK.KBBBBK.........",
  "....K.....KBBBBK..KBBBK.........",
  "..........KbbbbK...KbbK.........",
  "..........KBBBBK....KBBK........",
  "..........KBBBBK.....KBBK.......",
  "..........KKKKKK......KKK......."
];

const abaddonRun1 = [
  "...........KaK.......KaK........",
  "..........KHHhK.....KHHhK.......",
  ".........KHHHhK....KHHHhK.......",
  "........KHHHHhK...KHHHHhK.......",
  "........KhhhKKKKKKKKKKhhK.......",
  ".........KKKWWWWWWWWKKKK........",
  "........KWWWWWWWWWWWWWWK........",
  ".......KWWWWWWWWWWWWEEeeK.......",
  ".......KWWWWWWWWWWWWEEeeK.......",
  "........KWWWWWWWRRRRRRRK.KKKK...",
  ".........KWWWWWWWeeeeerKKKPPPK..",
  ".......KKKWWWWWWKRRRRRKKKK.KPPPK",
  "......KCCCLKKKKKKWWWWWKKKKKKPPPK",
  ".....KCCCLLLCCKWWGGWWWWK.KPPPK..",
  "....KCCCLLllCCKWWGGWWWWK..KKK...",
  "...KCCCCLllCCCCKWWWWWWWWK.......",
  "..KCCCCLLlCCCCCCKWWWWWWWK.......",
  "..KCCCCLLCCCCCCCCKSSSWWWK.......",
  "...KCcLLcKCCCCCCK.KSSSWWK.......",
  "....KKllK.KBBBBK...KSSSWK.......",
  ".....KK...KBBBBK...KBBBBK.......",
  "..........KbbbbK...KbbbbK.......",
  "..........KBBBBK...KBBBBK.......",
  "..........KBBBBK...KBBBBK.......",
  "..........KKKKKK...KKKKKK......."
];

const abaddonRun2 = [
  "..........KaK.......KaK.........",
  ".........KHHhK.....KHHhK........",
  "........KHHHhK....KHHHhK........",
  ".......KHHHHhK...KHHHHhK........",
  ".......KhhhKKKKKKKKKKhhK........",
  "........KKKWWWWWWWWKKKK.........",
  ".......KWWWWWWWWWWWWWWK.........",
  "......KWWWWWWWWWWWWEEeeK........",
  "......KWWWWWWWWWWWWEEeeK........",
  ".......KWWWWWWWRRRRRRRK..KKKK...",
  "........KWWWWWWWeeeeerKKKPPPK...",
  "......KKKWWWWWWKRRRRRKKKK.KPPPK.",
  ".....KCCCLKKKKKKWWWWWKKKK..KPPPK",
  "....KCCCLLLCCKWWGGWWWWK.....KKK.",
  "...KCCCCLllCCKWWGGWWWWK.........",
  "..KCCCCLLlCCCCKWWWWWWWK.........",
  ".KCCCCLLlCCCCCCKWWWWWWK.........",
  ".KCCCLLlCCCCCCCCKSSSWWK.........",
  "..KCcLLK.KCCCCCCKKSSSWK.........",
  "...KKlK...KBBBBK..KBBBBK........",
  "....K.....KBBBBK...KBBBK........",
  "..........KbbbbK....KbbK........",
  "..........KBBBBK.....KBBK.......",
  "..........KBBBBK......KBBK......",
  "..........KKKKKK.......KKK......"
];

const abaddonRun3 = [
  "...........KaK.......KaK........",
  "..........KHHhK.....KHHhK.......",
  ".........KHHHhK....KHHHhK.......",
  "........KHHHHhK...KHHHHhK.......",
  "........KhhhKKKKKKKKKKhhK.......",
  ".........KKKWWWWWWWWKKKK........",
  "........KWWWWWWWWWWWWWWK........",
  ".......KWWWWWWWWWWWWEEeeK.......",
  ".......KWWWWWWWWWWWWEEeeK.......",
  "........KWWWWWWWRRRRRRRK.KKKK...",
  ".........KWWWWWWWeeeeerKKKPPPK..",
  ".......KKKWWWWWWKRRRRRKKKK.KPPPK",
  "......KCCCLKKKKKKWWWWWKKKKKKPPPK",
  ".....KCCCLLLCCKWWGGWWWWK.KPPPK..",
  "....KCCCLLllCCKWWGGWWWWK..KKK...",
  "...KCCCCLllCCCCKWWWWWWWWK.......",
  "..KCCCCLLlCCCCCCKWWWWWWWK.......",
  "..KCCCCLLCCCCCCCCKSSSWWWK.......",
  "...KCcLLcKCCCCCCK.KSSSWWK.......",
  "....KKllK..KBBBK...KSSSWK.......",
  ".....KK...KBBBBK...KBBBBK.......",
  "..........KbbbbK...KbbbbK.......",
  "..........KBBBBK...KBBBBK.......",
  "..........KBBBBK...KBBBBK.......",
  "..........KKKKKK...KKKKKK......."
];

const abaddonJumpUp = [
  "...........KaK.......KaK........",
  "..........KHHhK.....KHHhK.......",
  ".........KHHHhK....KHHHhK.......",
  "........KHHHHhK...KHHHHhK.......",
  "........KhhhKKKKKKKKKKhhK.......",
  ".........KKKWWWWWWWWKKKK........",
  "........KWWWWWWWWWWWWWWK........",
  ".......KWWWWWWWWWWWWEEeeK.......",
  ".......KWWWWWWWWWWWWEEeeK.......",
  "........KWWWWWWWRRRRRRRK.KKKK...",
  ".........KWWWWWWWeeeeerKKKPPPK..",
  ".......KKKWWWWWWKRRRRRKKKK.KPPPK",
  "......KCCCLKKKKKKWWWWWKKKKKKPPPK",
  ".....KCCCLLLCCKWWGGWWWWK.KPPPK..",
  "....KCCCLLllCCKWWGGWWWWK..KKK...",
  "...KCCCCLllCCCCKWWWWWWWWK.......",
  "..KCCCCLLlCCCCCCKWWWWWWWK.......",
  ".KCCCCLLlCCCCCCCKSSSWWWWK.......",
  ".KCCCLLlCCCCCCCC.KSSSWWWK.......",
  "..KCcLLK.KCCCCK..KSSSSSSK.......",
  "...KKlK...KCCK...KBBBBBBK.......",
  "....K............KBBBBBBK.......",
  ".................KbbbbbbK.......",
  ".................KBBBBBBK.......",
  ".................KKKKKKKK......."
];

const abaddonJumpFall = [
  ".........KaK.......KaK..........",
  "........KHHhK.....KHHhK.........",
  ".......KHHHhK....KHHHhK.........",
  "......KHHHHhK...KHHHHhK.........",
  "......KhhhKKKKKKKKKKhhK.........",
  ".......KKKWWWWWWWWKKKK..........",
  "......KWWWWWWWWWWWWWWK..........",
  ".....KWWWWWWWWWWWWEEeeK.........",
  ".....KWWWWWWWWWWWWEEeeK.........",
  "......KWWWWWWWRRRRRRRK.KKKK.....",
  ".......KWWWWWWWeeeeerKKKPPPK....",
  ".....KKKWWWWWWKRRRRRKKKK.KPPPK..",
  "....KCCCLKKKKKKWWWWWKKKKKKPPPK..",
  "...KCCCLLLCCKWWGGWWWWK.KPPPK....",
  "..KCCCCLllCCKWWGGWWWWK..KKK.....",
  ".KCCCCLLlCCCCKWWWWWWWWK.........",
  "KCCCCLLlCCCCCCKWWWWWWWK.........",
  "KCCCLLlCCCCCCCCKSSSWWWK.........",
  ".KCcLLK.KCCCCKKKSSSWWWK.........",
  "..KKlK...KBBBBK.KBBBBBK.........",
  "...K.....KKKKKK.KKKKKKK........."
];

const abaddonSurf0 = [
  "..............KaK.......KaK.........",
  ".............KHHhK.....KHHhK........",
  "............KHHHhK....KHHHhK........",
  "...........KHHHHhK...KHHHHhK........",
  "...........KhhhKKKKKKKKKKhhK........",
  "............KKKWWWWWWWWKKKK.........",
  "...........KWWWWWWWWWWWWWWK.........",
  "..........KWWWWWWWWWWWWEEeeK........",
  "..........KWWWWWWWWWWWWEEeeK........",
  "...........KWWWWWWWRRRRRRRK..KKKK...",
  "............KWWWWWWWeeeeerKKKPPPK...",
  "..........KKKWWWWWWKRRRRRKKKK.KPPPK.",
  ".........KCCCLKKKKKKWWWWWKKKK..KPPPK",
  "........KCCCLLLCCKWWGGWWWWK.....KKK.",
  ".......KCCCCLllCCKWWGGWWWWK.........",
  "......KCCCCLLlCCCCKWWWWWWWK.........",
  ".....KCCCCLLlCCCCCCKWWWWWWK.........",
  "....KCCCCLLlCCCCCCCCKSSSWWK.........",
  "...KCCCCCLLlCCCCCCCCCKSSSWK.........",
  "...KCCCCLLlCCCCCCCCCCKSSSWK.........",
  "....KCcLLcKCCCCCCCCCCCKSSWK.........",
  ".....KKllK.KCCCCCCCCCCKSSSK.........",
  "......KK...KBBBBK.KBBBKSSSK.........",
  "...........KBBBBK..KBBBBBK..........",
  "...........KbbbbK..KbbbbbK..........",
  "...........KBBBBK..KBBBBBK..........",
  "...........KKKKKK..KKKKKKK..........",
  "....................................",
  "....................................",
  "...................................."
];

const abaddonSurf1 = [
  "....................................",
  "..............KaK.......KaK.........",
  ".............KHHhK.....KHHhK........",
  "............KHHHhK....KHHHhK........",
  "...........KHHHHhK...KHHHHhK........",
  "...........KhhhKKKKKKKKKKhhK........",
  "............KKKWWWWWWWWKKKK.........",
  "...........KWWWWWWWWWWWWWWK.........",
  "..........KWWWWWWWWWWWWEEeeK........",
  "..........KWWWWWWWWWWWWEEeeK........",
  "...........KWWWWWWWRRRRRRRK..KKKK...",
  "............KWWWWWWWeeeeerKKKPPPK...",
  "..........KKKWWWWWWKRRRRRKKKK.KPPPK.",
  ".........KCCCLKKKKKKWWWWWKKKK..KPPPK",
  "........KCCCLLLCCKWWGGWWWWK.....KKK.",
  ".......KCCCCLllCCKWWGGWWWWK.........",
  "......KCCCCLLlCCCCKWWWWWWWK.........",
  ".....KCCCCLLlCCCCCCKWWWWWWK.........",
  "....KCCCCLLlCCCCCCCCKSSSWWK.........",
  "...KCCCCCLLlCCCCCCCCCKSSSWK.........",
  "....KCcLLcKCCCCCCCCCCCKSSWK.........",
  ".....KKllK.KCCCCCCCCCCKSSSK.........",
  "......KK...KBBBBK.KBBBKSSSK.........",
  "...........KBBBBK..KBBBBBK..........",
  "...........KbbbbK..KbbbbbK..........",
  "...........KBBBBK..KBBBBBK..........",
  "...........KKKKKK..KKKKKKK..........",
  "....................................",
  "....................................",
  "...................................."
];

const abaddonSurfDash = [
  "................KaK.......KaK.......",
  "...............KHHhK.....KHHhK......",
  "..............KHHHhK....KHHHhK......",
  ".............KHHHHhK...KHHHHhK......",
  ".............KhhhKKKKKKKKKKhhK......",
  "..............KKKWWWWWWWWKKKK.......",
  ".............KWWWWWWWWWWWWWWK.......",
  "............KWWWWWWWWWWWWEEeeK......",
  "............KWWWWWWWWWWWWEEeeK......",
  ".............KWWWWWWWRRRRRRRK..KKKK.",
  "..............KWWWWWWWeeeeerKKKPPPK.",
  "............KKKWWWWWWKRRRRRKKKK.KPPP",
  "...........KCCCLKKKKKKWWWWWKKKKK.KPP",
  "..........KCCCLLLCCKWWGGWWWWK....KKK",
  ".........KCCCCLllCCKWWGGWWWWK.......",
  "........KCCCCLLlCCCCKWWWWWWWK.......",
  ".......KCCCCLLlCCCCCCKWWWWWWK.......",
  "......KCCCCLLlCCCCCCCCKSSSWWK.......",
  ".....KCCCCCLLlCCCCCCCCCKSSSWK.......",
  "....KCCCCCCLLlCCCCCCCCCCKSSWK.......",
  "...KCCCCcLLcKCCCCCCCCCCCKSSWK.......",
  "..KCCCCKKllK.KCCCCCCCCCCKSSSK.......",
  "..KCCCKK.KK...KBBBBK.KBBBKSSK.......",
  "..KKKK........KBBBBK..KBBBBBK.......",
  "..............KbbbbK..KbbbbbK.......",
  "..............KBBBBK..KBBBBBK.......",
  "..............KKKKKK..KKKKKKK.......",
  "....................................",
  "....................................",
  "...................................."
];



// --- MÓDULO: src/sprites/player/bake.js ---
// ============================================================================
// REGISTRO Y PRE-RENDERIZADO DE SPRITES EN MEMORIA
// ============================================================================
SpriteManager.prototype.initSprites = function() {
    const skinPalettes = this.getSkinPalettes();
    for (const [skinKey, pal] of Object.entries(skinPalettes)) {
      const prefix = skinKey === 'classic' ? 'mama_' : `mama_${skinKey}_`;
      const isRP = skinKey === 'rick_prime' && typeof rickPrimeIdle0 !== 'undefined';
      const isHL = skinKey === 'homelander' && typeof homelanderIdle0 !== 'undefined';
      const isPM = skinKey === 'peacemaker' && typeof peacemakerIdle0 !== 'undefined';
      const isIV = skinKey === 'ivan_alien_stage' && typeof ivanIdle0 !== 'undefined';
      const isAB = skinKey === 'abaddon_hotel' && typeof abaddonIdle0 !== 'undefined';
      const pickGrid = (rpGrid, hlGrid, pmGrid, ivGrid, abGrid, mamaGrid) =>
        isRP ? rpGrid : (isHL ? hlGrid : (isPM ? pmGrid : (isIV ? ivGrid : (isAB ? abGrid : mamaGrid))));

      this.bakeGrid(`${prefix}idle_0`, pickGrid(rickPrimeIdle0, homelanderIdle0, peacemakerIdle0, ivanIdle0, abaddonIdle0, mamaIdle0), pal);
      this.bakeGrid(`${prefix}idle_1`, pickGrid(rickPrimeIdle1, homelanderIdle1, peacemakerIdle1, ivanIdle1, abaddonIdle1, mamaIdle1), pal);
      this.bakeGrid(`${prefix}transition`, pickGrid(rickPrimeTransition, homelanderTransition, peacemakerTransition, ivanTransition, abaddonTransition, mamaTransition), pal);
      this.bakeGrid(`${prefix}run_0`, pickGrid(rickPrimeRun0, homelanderRun0, peacemakerRun0, ivanRun0, abaddonRun0, mamaRun0), pal);
      this.bakeGrid(`${prefix}run_1`, pickGrid(rickPrimeRun1, homelanderRun1, peacemakerRun1, ivanRun1, abaddonRun1, mamaRun1), pal);
      this.bakeGrid(`${prefix}run_2`, pickGrid(rickPrimeRun2, homelanderRun2, peacemakerRun2, ivanRun2, abaddonRun2, mamaRun2), pal);
      this.bakeGrid(`${prefix}run_3`, pickGrid(rickPrimeRun3, homelanderRun3, peacemakerRun3, ivanRun3, abaddonRun3, mamaRun3), pal);
      this.bakeGrid(`${prefix}jump_up`, pickGrid(rickPrimeJumpUp, homelanderJumpUp, peacemakerJumpUp, ivanJumpUp, abaddonJumpUp, mamaJumpUp), pal);
      this.bakeGrid(`${prefix}jump_fall`, pickGrid(rickPrimeJumpFall, homelanderJumpFall, peacemakerJumpFall, ivanJumpFall, abaddonJumpFall, mamaJumpFall), pal);
      this.bakeGrid(`${prefix}surf_0`, pickGrid(rickPrimeSurf0, homelanderSurf0, peacemakerSurf0, ivanSurf0, abaddonSurf0, mamaSurf0), pal);
      this.bakeGrid(`${prefix}surf_1`, pickGrid(rickPrimeSurf1, homelanderSurf1, peacemakerSurf1, ivanSurf1, abaddonSurf1, mamaSurf1), pal);
      this.bakeGrid(`${prefix}surf_dash`, pickGrid(rickPrimeSurfDash, homelanderSurfDash, peacemakerSurfDash, ivanSurfDash, abaddonSurfDash, mamaSurfDash), pal);
    }


    // ========================================================================
    // 5. HIJO RATONCITO (MISMO ESTILO PIXEL ART BLANCO CON CONTORNO)
    // ========================================================================
    const babyGrid = [
      "..KKKK....KKKK....",
      ".KWWWWK..KSSSSK...",
      "KWPPPPWKKSPPPPSK..",
      "KWPPPPWWWWPPPPSWK.",
      ".KWWWWWWWWWWWWWK..",
      "..KWWKKWWWWWWWWK..",
      ".KPWWKWKWWWWWWK...",
      ".KPWWWWWWWWWWWK...",
      "..KBBBBGGBBBBK....",
      "..KWWWWWWWWWWWK...",
      "..KWWWWWWWWWWWKKK.",
      "..KSSSSSSSSSSSKpPK",
      "...KPPPPKPPPPK..PK",
      "...KKKKK.KKKKK.KK."
    ];
    this.bakeGrid('baby_0', babyGrid, this.palettes.baby);

    // ========================================================================
    // 6. HOMELANDER 16-BIT (CON CAPA ONDEANDO EN 2 CUADROS)
    // ========================================================================
    const hlPatrol = [
      "........KKKKKKK.........",
      ".......KYYYYYYYK........",
      "......KYYYYYYYYYK.......",
      "......KYYFFFFFYYK.......",
      "......KYFFKFKFFYK.......",
      "......KYFFFFFFFYK.......",
      ".......KFFFFFFFK........",
      "....KKKKKBBBBBKKKKK.....",
      "...KYYYYKBBBBBKYYYYK....",
      "..KYYYYYKBuuuBKYYYYYK...",
      "..KRRRRRKBuuuBKRRRRRK...",
      ".KRRRRRRKBBBBBKRRRRRRK..",
      ".KWWWWWWKBBBBBKWWWWWWK..",
      ".KRRRRRRKyyyyyKRRRRRRK..",
      "KWWWWWWWKBBBBBKWWWWWWWK.",
      "KRRRRRRRKBBKBBKRRRRRRRK.",
      "KRRRRRRRKBbKBbKRRRRRRRK.",
      ".KRRRRRRKRRKRRKRRRRRRK..",
      "..KKKKKKKRRKRRKKKKKKK...",
      "........KrrKrrK.........",
      "........KKK.KKK........."
    ];

    const hlPatrol2 = [
      "........KKKKKKK.........",
      ".......KYYYYYYYK........",
      "......KYYYYYYYYYK.......",
      "......KYYFFFFFYYK.......",
      "......KYFFKFKFFYK.......",
      "......KYFFFFFFFYK.......",
      ".......KFFFFFFFK........",
      "....KKKKKBBBBBKKKKK.....",
      "...KYYYYKBBBBBKYYYYK....",
      "..KYYYYYKBuuuBKYYYYYK...",
      "..KRRRRRKBuuuBKRRRRRK...",
      ".KRRRRRRKBBBBBKRRRRRRK..",
      "KWWWWWWWKBBBBBKWWWWWWWK.",
      "KRRRRRRRKyyyyyKRRRRRRRK.",
      ".KWWWWWWKBBBBBKWWWWWWK..",
      ".KRRRRRRKBBKBBKRRRRRRK..",
      "..KRRRRRKBbKBbKRRRRRK...",
      "..KKKKKKKRRKRRKKKKKKK...",
      "........KrrKrrK.........",
      "........KrrKrrK.........",
      "........KKK.KKK........."
    ];

    const hlLaser = [
      "........KKKKKKK.........",
      ".......KYYYYYYYK........",
      "......KYYYYYYYYYK.......",
      "......KYYFFFFFYYK.......",
      ".....KlLLWLFLWLLlK......",
      ".....KlLLFFFFFLLlK......",
      ".......KFFFFFFFK........",
      "....KKKKKBBBBBKKKKK.....",
      "...KYYYYKBBBBBKYYYYK....",
      "..KYYYYYKBuuuBKYYYYYK...",
      "..KRRRRRKBuuuBKRRRRRK...",
      ".KRRRRRRKBBBBBKRRRRRRK..",
      ".KWWWWWWKBBBBBKWWWWWWK..",
      ".KRRRRRRKyyyyyKRRRRRRK..",
      "KWWWWWWWKBBBBBKWWWWWWWK.",
      "KRRRRRRRKBBKBBKRRRRRRRK.",
      "KRRRRRRRKBbKBbKRRRRRRRK.",
      ".KRRRRRRKRRKRRKRRRRRRK..",
      "..KKKKKKKRRKRRKKKKKKK...",
      "........KrrKrrK.........",
      "........KKK.KKK........."
    ];

    const hlLaser2 = [
      "........KKKKKKK.........",
      ".......KYYYYYYYK........",
      "......KYYYYYYYYYK.......",
      "......KYYFFFFFYYK.......",
      ".....KlLLWLFLWLLlK......",
      ".....KlLLFFFFFLLlK......",
      ".......KFFFFFFFK........",
      "....KKKKKBBBBBKKKKK.....",
      "...KYYYYKBBBBBKYYYYK....",
      "..KYYYYYKBuuuBKYYYYYK...",
      "..KRRRRRKBuuuBKRRRRRK...",
      ".KRRRRRRKBBBBBKRRRRRRK..",
      "KWWWWWWWKBBBBBKWWWWWWWK.",
      "KRRRRRRRKyyyyyKRRRRRRRK.",
      ".KWWWWWWKBBBBBKWWWWWWK..",
      ".KRRRRRRKBBKBBKRRRRRRK..",
      "..KRRRRRKBbKBbKRRRRRK...",
      "..KKKKKKKRRKRRKKKKKKK...",
      "........KrrKrrK.........",
      "........KrrKrrK.........",
      "........KKK.KKK........."
    ];

    this.bakeGrid('hl_patrol_0', hlPatrol, this.palettes.homelander);
    this.bakeGrid('hl_patrol_1', hlPatrol2, this.palettes.homelander);
    this.bakeGrid('hl_laser_0', hlLaser, this.palettes.homelander);
    this.bakeGrid('hl_laser_1', hlLaser2, this.palettes.homelander);
};


// --- MÓDULO: src/sprites/player/render.js ---
// ============================================================================
// RENDERIZADO DE MAMÁ RATÓN (ANIMACIÓN, SKINS Y EFECTO VÓRTICE LAVA RUN)
// ============================================================================
SpriteManager.prototype.drawMamaMouse = function(ctx, x, y, state, frame, facingRight, squashX = 1, squashY = 1, vy = 0, isLavaDash = false, forceSkin = null) {
    ctx.save();
    const footX = Math.round(x + 12);
    const footY = Math.round(y + 24);
    ctx.translate(footX, footY);

    const safeSquashX = Math.max(0.2, Math.min(2.5, isNaN(squashX) ? 1 : squashX));
    const safeSquashY = Math.max(0.2, Math.min(2.5, isNaN(squashY) ? 1 : squashY));

    if (!facingRight) {
      ctx.scale(-safeSquashX, safeSquashY);
    } else {
      ctx.scale(safeSquashX, safeSquashY);
    }

    if (isLavaDash) {
      // VÓRTICE DE LLAMAS ROSAS OSCURAS (Lava Run Dash estilo Hollow Knight Shade Cloak)
      const swirlT = (frame || 0) * 0.3;
      
      // Halo exterior de vacío y borgoña profundo
      ctx.fillStyle = 'rgba(12, 2, 14, 0.75)';
      ctx.beginPath();
      ctx.ellipse(-2, -15, 22, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Manto ciclónico de llamas rosas oscuras
      ctx.fillStyle = '#8f143c';
      ctx.beginPath();
      ctx.ellipse(-2, -15, 19, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hebras helicoidales del vórtice
      ctx.fillStyle = '#b31b52';
      ctx.fillRect(-18, -19, 32, 8);
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(-15, -18, 26, 6);
      
      // Espuelas de fuego y cola del vórtice
      const trailWav = Math.sin(swirlT) * 3;
      ctx.fillStyle = '#ff2a70';
      ctx.fillRect(-22, -17 + Math.round(trailWav), 8, 4);
      ctx.fillRect(-26, -15 - Math.round(trailWav), 6, 2);

      // Núcleo de sombra oscura interior
      ctx.fillStyle = '#07020a';
      ctx.fillRect(-12, -17, 20, 8);

      // Ojo de fuego incandescente blanco/rosa
      ctx.fillStyle = '#ffcad4';
      ctx.fillRect(4, -16, 6, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(6, -15, 3, 2);

      ctx.restore();
      return;
    }

    const activeSkin = forceSkin || (window.saveState && window.saveState.equippedSkin) || 'classic';
    const skinPrefix = (activeSkin && activeSkin !== 'classic') ? `mama_${activeSkin}_` : 'mama_';

    let spriteKey = `${skinPrefix}idle_0`;
    let drawX = -15;
    let drawY = -29;

    if (state === 'jump') {
      if (vy < 20) {
        spriteKey = `${skinPrefix}jump_up`;
        drawY = -25;
      } else {
        spriteKey = `${skinPrefix}jump_fall`;
        drawY = -21;
      }
    } else if (state === 'transition') {
      spriteKey = `${skinPrefix}transition`;
      drawY = -27;
    } else if (state === 'run') {
      const runIdx = Math.floor(frame) % 4;
      spriteKey = `${skinPrefix}run_${runIdx}`;
      drawY = -25;
    } else {
      spriteKey = Math.floor(frame * 0.45) % 2 === 0 ? `${skinPrefix}idle_0` : `${skinPrefix}idle_1`;
      drawY = -29;
    }

    let img = this.cache[spriteKey] || this.cache['mama_idle_0'];
    if (img) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
      ctx.fillRect(-9, -2, 18, 3);

      // Vórtice interdimensional de Rick Prime (Portal verde y lima giratorio detrás)
      if (activeSkin === 'rick_prime') {
        const t = (frame || 0) * 0.08;
        ctx.save();
        ctx.translate(drawX + 3, drawY + 14);
        ctx.rotate(t * 0.25);
        ctx.fillStyle = 'rgba(22, 163, 74, 0.45)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 4; i++) {
          const ang = t + i * (Math.PI / 2);
          ctx.fillStyle = (i % 2 === 0) ? '#22c55e' : '#4ade80';
          const px = Math.cos(ang) * 11;
          const py = Math.sin(ang) * 7;
          ctx.fillRect(Math.round(px) - 2, Math.round(py) - 2, 3, 3);
        }

        ctx.fillStyle = '#052e16';
        ctx.beginPath();
        ctx.ellipse(0, 0, 7, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-1, -1, 2, 2);
        ctx.restore();
      }

      ctx.drawImage(img, drawX, drawY);

      // Accesorios físicos exclusivos en Pixel Art según el TIPO de Skin
      if (activeSkin === 'empress') {
        // 👑 TIPO REALEZA / IMPERIAL: Corona dorada de 3 puntas con rubí y destellos
        const cx = drawX + 11;
        const cy = drawY - 3;
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(cx, cy + 2, 8, 3);
        ctx.fillRect(cx - 1, cy, 2, 4);
        ctx.fillRect(cx + 3, cy - 1, 2, 5);
        ctx.fillRect(cx + 7, cy, 2, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(cx - 1, cy, 1, 1);
        ctx.fillRect(cx + 3, cy - 1, 1, 1);
        ctx.fillRect(cx + 7, cy, 1, 1);
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(cx + 3, cy + 2, 2, 2);
      } else if (activeSkin === 'mage') {
        // 🔮 TIPO ARCANO / MAGA: Sombrero de brujita cósmica con luna dorada
        const hx = drawX + 9;
        const hy = drawY - 6;
        ctx.fillStyle = '#240046';
        ctx.fillRect(hx - 2, hy + 5, 13, 2);
        ctx.fillRect(hx + 1, hy + 2, 7, 3);
        ctx.fillRect(hx + 3, hy, 4, 3);
        ctx.fillRect(hx + 5, hy - 2, 2, 3);
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(hx + 3, hy + 4, 3, 2);
        ctx.fillStyle = '#c77dff';
        ctx.fillRect(hx + 5, hy - 3, 2, 2);
      } else if (activeSkin === 'steampunk') {
        // ⚡ TIPO TECNOLOGÍA / CIENCIA: Gafas de aviador de cobre con lentes cian
        const gx = drawX + 13;
        const gy = drawY + 3;
        ctx.fillStyle = '#8c4f27';
        ctx.fillRect(gx, gy, 7, 4);
        ctx.fillStyle = '#48cae4';
        ctx.fillRect(gx + 1, gy + 1, 2, 2);
        ctx.fillRect(gx + 4, gy + 1, 2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(gx + 1, gy + 1, 1, 1);
        ctx.fillRect(gx + 4, gy + 1, 1, 1);
        ctx.fillStyle = '#3a1f11';
        ctx.fillRect(gx - 3, gy + 1, 3, 2);
      } else if (activeSkin === 'noir') {
        // 🥷 TIPO SIGILO / ASESINA: Antifaz táctico y cintas ninjas flotando al viento
        const nx = drawX + 14;
        const ny = drawY + 5;
        ctx.fillStyle = '#0f0c14';
        ctx.fillRect(nx, ny, 6, 3);
        ctx.fillStyle = '#ff2a75';
        ctx.fillRect(nx + 2, ny + 1, 2, 1);
        const wave = Math.sin((frame || 0) * 0.4) * 2;
        ctx.fillStyle = '#ff2a75';
        ctx.fillRect(nx - 6, ny + 1 + wave, 5, 2);
        ctx.fillRect(nx - 9, ny + 2 + wave * 1.5, 4, 2);
      } else if (activeSkin === 'sakura') {
        // 🌸 TIPO SAGRADA / DIVINA: Flor de loto sagrada en oreja y alitas etéreas de luz
        const fx = drawX + 8;
        const fy = drawY + 1;
        ctx.fillStyle = '#ff8fab';
        ctx.fillRect(fx, fy + 1, 4, 2);
        ctx.fillRect(fx + 1, fy, 2, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(fx + 1, fy + 1, 2, 2);
        ctx.fillStyle = 'rgba(255, 200, 221, 0.55)';
        const wingFlap = Math.sin((frame || 0) * 0.3) * 2;
        ctx.fillRect(drawX + 3, drawY + 11 + wingFlap, 5, 4);
        ctx.fillRect(drawX + 1, drawY + 10 + wingFlap, 3, 3);
      } else if (activeSkin === 'rick_prime') {
        // 🔬 RICK PRIME: Visor HUD ocular cibernético animado, retícula de escaneo láser y chispas del guantelete
        const eyeX = drawX + 18;
        const eyeY = drawY + 10;
        const scanPulse = (Math.sin((frame || 0) * 0.25) + 1) * 0.5;

        // Ocular cian brillante con núcleo blanco
        ctx.fillStyle = '#00f5d4';
        ctx.fillRect(eyeX, eyeY, 3, 3);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(eyeX + 1, eyeY + 1, 1, 1);

        // Retícula holográfica de escaneo HUD
        ctx.strokeStyle = `rgba(0, 245, 212, ${(0.45 + scanPulse * 0.5).toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(eyeX - 2, eyeY - 2, 7, 7);

        // Haz láser horizontal de barrido
        const scanLen = 3 + Math.round(scanPulse * 6);
        ctx.fillStyle = 'rgba(85, 255, 153, 0.8)';
        ctx.fillRect(eyeX + 3, eyeY + 1, scanLen, 1);

        // Chispas de energía cuántica del guantelete de portal
        if (Math.floor((frame || 0) * 0.2) % 2 === 0) {
          ctx.fillStyle = '#55ff99';
          ctx.fillRect(drawX + 22, drawY + 16, 2, 2);
          ctx.fillStyle = '#00f5d4';
          ctx.fillRect(drawX + 24, drawY + 14, 1, 1);
        }
      } else if (activeSkin === 'homelander') {
        // 🦅 HOMELANDER: Ojos láser de calor proyectados, haz incandescente y destellos de águila dorada
        let eyeOffsetY = 8;
        if (state === 'run' || (state === 'jump' && vy < 20)) eyeOffsetY = 7;
        else if (state === 'jump') eyeOffsetY = 6;
        else if (Math.floor((frame || 0) * 0.45) % 2 !== 0) eyeOffsetY = 9;

        const eyeX = drawX + 18;
        const eyeY = drawY + eyeOffsetY;
        const pulse = (Math.sin((frame || 0) * 0.35) + 1) * 0.5;
        const beamLen = 8 + Math.round(pulse * 8);

        // Núcleo blanco de calor extremo en la pupila
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(eyeX, eyeY, 2, 2);

        // Haz de calor láser proyectado al frente cortando el aire
        ctx.fillStyle = `rgba(255, 0, 51, ${(0.65 + pulse * 0.35).toFixed(2)})`;
        ctx.fillRect(eyeX + 2, eyeY, beamLen, 2);
        ctx.fillStyle = `rgba(254, 240, 138, ${(0.8 + pulse * 0.2).toFixed(2)})`;
        ctx.fillRect(eyeX + 1, eyeY, Math.max(3, beamLen - 3), 1);

        // Chispas de plasma que saltan del rayo de calor
        if (Math.floor((frame || 0) * 0.25) % 2 === 0) {
          ctx.fillStyle = '#ffea00';
          ctx.fillRect(eyeX + beamLen + 1, eyeY - 1, 2, 1);
          ctx.fillStyle = '#ff0033';
          ctx.fillRect(eyeX + beamLen - 2, eyeY + 2, 1, 1);
        }

        // Destello especular ocasional en la hombrera de águila dorada
        const glint = Math.sin((frame || 0) * 0.15);
        if (glint > 0.8) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(drawX + 25, drawY + eyeOffsetY + 4, 2, 2);
        }
      } else if (activeSkin === 'peacemaker') {
        // 🕊️ PEACEMAKER: Destello especular cromado, brillo en la Paloma de la Paz y pluma etérea
        let helmOffsetY = 6;
        if (state === 'run' || (state === 'jump' && vy < 20)) helmOffsetY = 5;
        else if (state === 'jump') helmOffsetY = 4;
        else if (Math.floor((frame || 0) * 0.45) % 2 !== 0) helmOffsetY = 7;

        const helmX = drawX + 17;
        const helmY = drawY + helmOffsetY;
        const shineT = (frame || 0) * 0.2;
        const shineSweep = Math.sin(shineT);

        // Barrido de brillo especular sobre el cromo curvo del casco
        if (shineSweep > 0.4) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          const sx = helmX - 3 + Math.round((shineSweep - 0.4) * 8);
          ctx.fillRect(sx, helmY - 2, 2, 3);
          ctx.fillRect(sx + 1, helmY - 1, 1, 3);
        }

        // Destello en forma de estrella de 4 puntas en la Paloma de la Paz dorada
        const doveGlint = Math.sin((frame || 0) * 0.18 + 1.2);
        if (doveGlint > 0.82) {
          const gx = helmX - 1;
          const gy = helmY + 1;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(gx, gy - 2, 1, 5);
          ctx.fillRect(gx - 2, gy, 5, 1);
          ctx.fillStyle = '#facc15';
          ctx.fillRect(gx, gy, 1, 1);
        }

        // Pluma blanca etérea flotando serenamente detrás del héroe
        if (Math.floor((frame || 0) * 0.3) % 3 === 0) {
          const featherWav = Math.sin((frame || 0) * 0.4) * 2;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(drawX + 4, drawY + helmOffsetY + 8 + Math.round(featherWav), 2, 2);
          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(drawX + 5, drawY + helmOffsetY + 9 + Math.round(featherWav), 1, 1);
        }
      } else if (activeSkin === 'ivan_alien_stage') {
        // 🎤 IVAN (ALIEN STAGE): Destello en colmillo canino, pétalos de rosa negra y brasas rojas de concierto
        let headOffsetY = 0;
        if (state === 'run' || (state === 'jump' && vy < 20)) headOffsetY = -1;
        else if (state === 'jump') headOffsetY = -2;
        else if (Math.floor((frame || 0) * 0.45) % 2 !== 0) headOffsetY = 1;

        const fangX = drawX + 18;
        const fangY = drawY + headOffsetY + 12;

        // Destello especular en el colmillo canino afilado
        const toothGlint = Math.sin((frame || 0) * 0.22);
        if (toothGlint > 0.8) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(fangX - 1, fangY, 3, 1);
          ctx.fillRect(fangX, fangY - 1, 1, 3);
        }

        // Pétalos negros de rosa y brasas de concierto flotando alrededor
        const t = (frame || 0) * 0.35;
        const p1Wav = Math.sin(t) * 2;
        const p2Wav = Math.cos(t * 0.8) * 3;

        // Pétalo negro 1
        ctx.fillStyle = '#18181b';
        ctx.fillRect(drawX + 3, drawY + 14 + Math.round(p1Wav), 2, 2);
        ctx.fillStyle = '#27272a';
        ctx.fillRect(drawX + 4, drawY + 15 + Math.round(p1Wav), 1, 1);

        // Brasa roja incandescente de escenario
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(drawX + 25, drawY + 8 + Math.round(p2Wav), 2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(drawX + 25, drawY + 8 + Math.round(p2Wav), 1, 1);

        // Ondeo rítmico de la cinta / corbata carmesí
        if (Math.floor(t) % 2 === 0) {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(drawX + 19, drawY + headOffsetY + 19, 2, 2);
        }
      } else if (activeSkin === 'abaddon_hotel') {
        // 👁️ ABADDON (HOTEL EMBRUJADO): Destello ocular demoníaco, destello en sonrisa afilada y niebla espectral etérea
        let headOffsetY = 0;
        if (state === 'run' || (state === 'jump' && vy < 20)) headOffsetY = -1;
        else if (state === 'jump') headOffsetY = -2;
        else if (Math.floor((frame || 0) * 0.45) % 2 !== 0) headOffsetY = 1;

        const eyeX = drawX + 18;
        const eyeY = drawY + headOffsetY + 9;
        const t = (frame || 0) * 0.28;

        // Pulso ardiente en los ojos espectrales carmesí neón
        const eyePulse = (Math.sin(t) + 1) * 0.5;
        if (eyePulse > 0.4) {
          ctx.fillStyle = `rgba(255, 0, 85, ${(0.4 + eyePulse * 0.5).toFixed(2)})`;
          ctx.fillRect(eyeX - 1, eyeY - 1, 4, 3);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(eyeX + 1, eyeY, 1, 1);
        }

        // Destello siniestro en la sonrisa demoníaca
        const grinGlint = Math.sin(t * 0.8 + 1.2);
        if (grinGlint > 0.78) {
          const gx = drawX + 19;
          const gy = drawY + headOffsetY + 13;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(gx - 1, gy, 3, 1);
          ctx.fillRect(gx, gy - 1, 1, 3);
        }

        // Fuego fatuo y niebla espectral púrpura flotando alrededor del manto
        const mistWave = Math.sin(t * 1.2) * 2.5;
        ctx.fillStyle = 'rgba(147, 51, 234, 0.4)';
        ctx.fillRect(drawX + 2, drawY + 16 + Math.round(mistWave), 5, 3);
        ctx.fillStyle = 'rgba(192, 132, 252, 0.35)';
        ctx.fillRect(drawX + 4, drawY + 15 + Math.round(mistWave), 3, 2);

        // Brasa carmesí de las puntas de los cuernos
        if (Math.floor(t * 1.5) % 2 === 0) {
          ctx.fillStyle = '#ff0055';
          ctx.fillRect(drawX + 11, drawY - 2, 2, 2);
          ctx.fillRect(drawX + 19, drawY - 2, 2, 2);
        }
      }
    }

    ctx.restore();
  }


// --- MÓDULO: src/sprites/player/surf/board.js ---
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


// --- MÓDULO: src/sprites/player/surf/stance.js ---
// ============================================================================
// SPRITES MUNDO 3: POSTURA DE SURFISTA PROFESIONAL Y SOPORTE DE TODAS LAS SKINS
// ============================================================================
// Utiliza los sprites oficiales pre-renderizados en memoria (mamaSurf0, mamaSurf1, mamaSurfDash)
// garantizando 100% de coherencia anatómica con el personaje principal e integrando
// accesorios exclusivos de todas las Skins:
// - empress: Corona dorada imperial con rubí
// - mage: Sombrero de brujita cósmica con luna dorada
// - steampunk: Gafas de aviador de cobre con lentes cian
// - noir: Antifaz táctico negro con cintas ninjas ondeando al viento
// - sakura: Flor de loto sagrada y alitas etéreas de luz
// - rick_prime: Pelo puntiagudo gris, visor cibernético cian y chispa cuántica
// - homelander: Hombreras doradas de águila, pelo rubio impecable y ojos láser
// - peacemaker: Casco cromado con emblema de la paloma dorada
// - ivan_alien_stage: Flequillo rebelde, colmillo blanco y corbata de idol roja
// - abaddon_hotel: Cuernos demoníacos curvados, ojos espectrales y niebla oscura

SpriteManager.prototype.drawSurferSkinAccessories = function(ctx, drawX, drawY, activeSkin, isImpulse, frame) {
  if (activeSkin === 'empress') {
    // Corona dorada de 3 puntas con rubí y destellos
    const cx = drawX + (isImpulse ? 17 : 15);
    const cy = drawY + (isImpulse ? 2 : -2);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(cx, cy + 2, 8, 3);
    ctx.fillRect(cx - 1, cy, 2, 4);
    ctx.fillRect(cx + 3, cy - 1, 2, 5);
    ctx.fillRect(cx + 7, cy, 2, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(cx - 1, cy, 1, 1);
    ctx.fillRect(cx + 3, cy - 1, 1, 1);
    ctx.fillRect(cx + 7, cy, 1, 1);
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(cx + 3, cy + 2, 2, 2);
  } else if (activeSkin === 'mage') {
    // Sombrero de brujita cósmica con luna dorada
    const hx = drawX + (isImpulse ? 16 : 14);
    const hy = drawY + (isImpulse ? -1 : -5);
    ctx.fillStyle = '#240046';
    ctx.fillRect(hx - 2, hy + 5, 13, 2);
    ctx.fillRect(hx + 1, hy + 2, 7, 3);
    ctx.fillRect(hx + 3, hy, 4, 3);
    ctx.fillRect(hx + 5, hy - 2, 2, 3);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(hx + 3, hy + 4, 3, 2);
    ctx.fillStyle = '#c77dff';
    ctx.fillRect(hx + 5, hy - 3, 2, 2);
  } else if (activeSkin === 'steampunk') {
    // Gafas de aviador de cobre con lentes cian
    const gx = drawX + (isImpulse ? 20 : 18);
    const gy = drawY + (isImpulse ? 9 : 6);
    ctx.fillStyle = '#8c4f27';
    ctx.fillRect(gx, gy, 7, 4);
    ctx.fillStyle = '#48cae4';
    ctx.fillRect(gx + 1, gy + 1, 2, 2);
    ctx.fillRect(gx + 4, gy + 1, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(gx + 1, gy + 1, 1, 1);
    ctx.fillRect(gx + 4, gy + 1, 1, 1);
    ctx.fillStyle = '#3a1f11';
    ctx.fillRect(gx - 3, gy + 1, 3, 2);
  } else if (activeSkin === 'noir') {
    // Antifaz táctico y cintas ninjas flotando al viento
    const nx = drawX + (isImpulse ? 21 : 19);
    const ny = drawY + (isImpulse ? 11 : 8);
    ctx.fillStyle = '#0f0c14';
    ctx.fillRect(nx, ny, 6, 3);
    ctx.fillStyle = '#ff2a75';
    ctx.fillRect(nx + 2, ny + 1, 2, 1);
    const wave = Math.sin((frame || 0) * 0.4) * 2;
    ctx.fillStyle = '#ff2a75';
    ctx.fillRect(nx - 7, ny + 1 + Math.round(wave), 6, 2);
    ctx.fillRect(nx - 11, ny + 2 + Math.round(wave * 1.5), 5, 2);
  } else if (activeSkin === 'sakura') {
    // Flor de loto sagrada en oreja y alitas etéreas de luz
    const fx = drawX + (isImpulse ? 14 : 12);
    const fy = drawY + (isImpulse ? 6 : 3);
    ctx.fillStyle = '#ff8fab';
    ctx.fillRect(fx, fy + 1, 4, 2);
    ctx.fillRect(fx + 1, fy, 2, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(fx + 1, fy + 1, 2, 2);
    ctx.fillStyle = 'rgba(255, 200, 221, 0.65)';
    const wingFlap = Math.sin((frame || 0) * 0.35) * 2.5;
    ctx.fillRect(drawX + (isImpulse ? 6 : 7), drawY + 13 + Math.round(wingFlap), 6, 4);
    ctx.fillRect(drawX + (isImpulse ? 4 : 5), drawY + 12 + Math.round(wingFlap), 4, 3);
  } else if (activeSkin === 'rick_prime') {
    // Visor HUD ocular cibernético animado, retícula de escaneo láser y chispas cuánticas
    const eyeX = drawX + (isImpulse ? 23 : 21);
    const eyeY = drawY + (isImpulse ? 11 : 9);
    const scanPulse = (Math.sin((frame || 0) * 0.25) + 1) * 0.5;

    ctx.fillStyle = '#00f5d4';
    ctx.fillRect(eyeX, eyeY, 3, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(eyeX + 1, eyeY + 1, 1, 1);

    ctx.strokeStyle = `rgba(0, 245, 212, ${(0.45 + scanPulse * 0.5).toFixed(2)})`;
    ctx.lineWidth = 1;
    ctx.strokeRect(eyeX - 2, eyeY - 2, 7, 7);

    const scanLen = 3 + Math.round(scanPulse * 6);
    ctx.fillStyle = 'rgba(85, 255, 153, 0.8)';
    ctx.fillRect(eyeX + 3, eyeY + 1, scanLen, 1);

    if (Math.floor((frame || 0) * 0.2) % 2 === 0) {
      ctx.fillStyle = '#55ff99';
      ctx.fillRect(drawX + (isImpulse ? 28 : 26), drawY + (isImpulse ? 17 : 15), 2, 2);
    }
  } else if (activeSkin === 'homelander') {
    // 🦅 HOMELANDER: Haz de calor láser proyectado sobre las olas y destellos de energía
    const lx = drawX + (isImpulse ? 21 : 19);
    const ly = drawY + (isImpulse ? 11 : 8);
    const pulse = (Math.sin((frame || 0) * 0.35) + 1) * 0.5;
    const beamLen = 7 + Math.round(pulse * 8);

    // Núcleo blanco y brillo carmesí
    ctx.fillStyle = '#ff0033';
    ctx.fillRect(lx, ly, 3, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(lx + 1, ly, 1, 1);

    // Haz láser de calor proyectado hacia adelante cortando el spray del mar
    ctx.fillStyle = `rgba(255, 0, 51, ${(0.6 + pulse * 0.35).toFixed(2)})`;
    ctx.fillRect(lx + 3, ly, beamLen, 2);
    ctx.fillStyle = `rgba(254, 240, 138, ${(0.75 + pulse * 0.25).toFixed(2)})`;
    ctx.fillRect(lx + 2, ly, Math.max(3, beamLen - 3), 1);

    // Chispas incandescentes que vuelan sobre el agua
    if (Math.floor((frame || 0) * 0.25) % 2 === 0) {
      ctx.fillStyle = '#ffea00';
      ctx.fillRect(lx + beamLen + 1, ly - 1, 2, 1);
      ctx.fillStyle = '#ff0033';
      ctx.fillRect(lx + beamLen - 1, ly + 2, 1, 1);
    }
  } else if (activeSkin === 'peacemaker') {
    // 🕊️ PEACEMAKER: Destello especular cromado sobre las olas y pluma de la paz flotando
    const hx = drawX + (isImpulse ? 20 : 18);
    const hy = drawY + (isImpulse ? 8 : 6);
    const shineT = (frame || 0) * 0.25;

    // Destello de cromo pulido reflejando el sol del mediodía
    if (Math.sin(shineT) > 0.5) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(hx, hy - 2, 2, 3);
      ctx.fillRect(hx + 1, hy - 1, 1, 3);
    }

    // Estrella de 4 puntas en el emblema de la paloma dorada
    if (Math.sin(shineT * 0.8 + 1.5) > 0.75) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(hx - 1, hy + 2, 1, 4);
      ctx.fillRect(hx - 2, hy + 3, 4, 1);
      ctx.fillStyle = '#facc15';
      ctx.fillRect(hx - 1, hy + 3, 1, 1);
    }

    // Pluma blanca de la paz flotando sobre el spray marino
    if (Math.floor((frame || 0) * 0.25) % 2 === 0) {
      const sprayWave = Math.sin((frame || 0) * 0.5) * 2;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(drawX + (isImpulse ? 6 : 8), drawY + 14 + Math.round(sprayWave), 2, 2);
    }
  } else if (activeSkin === 'ivan_alien_stage') {
    // 🎤 IVAN (ALIEN STAGE): Pétalos de rosa negra y brasas carmesí sobre las olas
    const t = (frame || 0) * 0.3;
    const fangX = drawX + (isImpulse ? 25 : 23);
    const fangY = drawY + (isImpulse ? 13 : 11);

    // Destello en el colmillo sobre el agua
    if (Math.sin(t * 0.7) > 0.8) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(fangX - 1, fangY, 3, 1);
      ctx.fillRect(fangX, fangY - 1, 1, 3);
    }

    // Pétalo de rosa negra flotando sobre el spray
    const pWav = Math.sin(t) * 2.5;
    ctx.fillStyle = '#18181b';
    ctx.fillRect(drawX + (isImpulse ? 5 : 7), drawY + 12 + Math.round(pWav), 2, 2);
    ctx.fillStyle = '#27272a';
    ctx.fillRect(drawX + (isImpulse ? 6 : 8), drawY + 13 + Math.round(pWav), 1, 1);

    // Brasa carmesí de concierto
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(drawX + (isImpulse ? 28 : 26), drawY + 16 - Math.round(pWav), 2, 2);
  } else if (activeSkin === 'abaddon_hotel') {
    // 👁️ ABADDON (HOTEL EMBRUJADO): Destellos espectrales sobre el mar y niebla púrpura
    const t = (frame || 0) * 0.35;
    const eyeX = drawX + (isImpulse ? 24 : 22);
    const eyeY = drawY + (isImpulse ? 11 : 9);

    // Pulso ardiente en los ojos espectrales carmesí
    const eyePulse = (Math.sin(t) + 1) * 0.5;
    if (eyePulse > 0.4) {
      ctx.fillStyle = `rgba(255, 0, 85, ${(0.4 + eyePulse * 0.5).toFixed(2)})`;
      ctx.fillRect(eyeX - 1, eyeY - 1, 4, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(eyeX + 1, eyeY, 1, 1);
    }

    // Niebla espectral violeta y brasas sobre el agua y la tabla
    const mistWave = Math.sin(t * 1.2) * 2;
    ctx.fillStyle = 'rgba(147, 51, 234, 0.45)';
    ctx.fillRect(drawX + (isImpulse ? 5 : 7), drawY + 16 + Math.round(mistWave), 6, 3);
    ctx.fillStyle = 'rgba(192, 132, 252, 0.35)';
    ctx.fillRect(drawX + (isImpulse ? 7 : 9), drawY + 15 + Math.round(mistWave), 4, 2);

    // Brasa carmesí de los cuernos flotando sobre las olas
    if (Math.floor(t) % 2 === 0) {
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(drawX + (isImpulse ? 18 : 16), drawY + 1, 2, 2);
    }
  }
};

SpriteManager.prototype.drawSurferMama = function(ctx, x, y, facingRight, isImpulse = false, frame = 0, tilt = 0, forceSkin = null) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (!facingRight) ctx.scale(-1, 1);
  ctx.rotate(tilt * 0.6);

  const activeSkin = forceSkin || (typeof saveState !== 'undefined' && saveState && saveState.equippedSkin) || 'classic';
  const skinPrefix = (activeSkin && activeSkin !== 'classic') ? `mama_${activeSkin}_` : 'mama_';

  // Seleccionar sprite según modo de navegación (Impulso / Water Dash o Navegación en el oleaje)
  let spriteKey;
  let drawX = -18;
  let drawY = -10;

  if (isImpulse) {
    spriteKey = `${skinPrefix}surf_dash`;
    drawY = -7;
  } else {
    const cycle = Math.floor(frame * 0.14) % 2;
    spriteKey = cycle === 0 ? `${skinPrefix}surf_0` : `${skinPrefix}surf_1`;
    drawY = -10;
  }

  const img = this.cache[spriteKey] || this.cache[`${skinPrefix}idle_0`] || this.cache['mama_idle_0'];
  if (img) {
    ctx.drawImage(img, drawX, drawY);

    // Accesorios físicos exclusivos en Pixel Art según el TIPO de Skin adaptados a la postura de Surf
    this.drawSurferSkinAccessories(ctx, drawX, drawY, activeSkin, isImpulse, frame);
  }

  // Destellos de concentración aerodinámica en modo impulso
  if (isImpulse) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(drawX + 31, drawY + 12, 3, 1);
    ctx.fillRect(drawX + 29, drawY + 15, 2, 1);
  }

  ctx.restore();
};


// --- MÓDULO: src/sprites/player/surf/dash_fx.js ---
// ============================================================================
// SPRITES MUNDO 3: EFECTOS DE IMPULSO ACUÁTICO Y NAVEGACIÓN EN OLAS
// ============================================================================
// Incluye:
// - Chorro de propulsión hidrodinámica de alta presión (Twin Hydro-Jets)
// - Ola de corte en proa (Bow Wave) y anillo de cavitación supersónico
// - Estela de espuma blanca marina, burbujas y siluetas de velocidad (Ghost Trails)

SpriteManager.prototype.drawSurfSpray = function(ctx, x, y, facingRight, isImpulse, frame) {
  ctx.save();
  const dir = facingRight ? 1 : -1;
  const tailX = x - dir * 18;
  const tailY = y + 21;
  const bowX = x + dir * 20;
  const bowY = y + 21;

  if (isImpulse) {
    // ========================================================================
    // 🚀 WATER DASH: CHORRO DE PROPULSIÓN HIDRODINÁMICA A MÁXIMA POTENCIA
    // ========================================================================

    // 1. Doble cono de eyección de agua a alta presión hacia atrás
    for (let i = 0; i < 9; i++) {
      const dist = 10 + i * 8 + ((frame * 3 + i * 11) % 22);
      const spread = Math.sin(frame * 0.45 + i * 0.8) * (3 + i * 1.8);
      const px = tailX - dir * dist;
      const py = tailY + spread;

      // Núcleo de agua marina presurizada en azul marino
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(Math.round(px), Math.round(py + 1), 6, 4);
      // Chorro intermedio en turquesa vibrante y cyan
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(Math.round(px + dir * 2), Math.round(py), 5, 3);
      ctx.fillStyle = '#48cae4';
      ctx.fillRect(Math.round(px + dir * 4), Math.round(py), 3, 2);

      // Gotas y burbujas de espuma blanca marina
      ctx.fillStyle = (i % 2 === 0) ? '#ffffff' : '#caf0f8';
      ctx.fillRect(Math.round(px - dir), Math.round(py - 1), 2, 2);
    }

    // 2. Anillo de cavitación supersónico en popa (Onda de choque al acelerar)
    const ringRadius = 6 + (frame % 8) * 2;
    const ringAlpha = (1 - (frame % 8) / 8) * 0.6;
    const ringColor = `rgba(0, 180, 216, ${ringAlpha.toFixed(2)})`;
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(tailX - dir * 4, tailY + 1, ringRadius, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Ola de proa afilada (Bow Wave) cortando el mar como una flecha
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bowX + dir * 2, bowY - 2, 5, 4);
    ctx.fillRect(bowX + dir * 6, bowY - 4, 4, 3);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(bowX + dir * 1, bowY, 6, 2);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(bowX + dir * 4, bowY + 2, 5, 2);

    // Salpicaduras aerodinámicas proyectadas hacia arriba a los lados
    for (let s = 0; s < 3; s++) {
      const splashX = bowX + dir * (4 + s * 4);
      const splashY = bowY - 5 - s * 3 - ((frame + s * 2) % 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(splashX), Math.round(splashY), 2, 2);
    }

    // 4. Manto superficial de estela blanca (Wake) con líneas de velocidad
    for (let w = 0; w < 5; w++) {
      const wakeX = tailX - dir * (6 + w * 14);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(wakeX), tailY + 3, 9, 2);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(Math.round(wakeX + dir * 3), tailY + 5, 6, 1);
    }

  } else {
    // ========================================================================
    // 🌊 SURFING NORMAL: DESLIZAMIENTO FLUIDO CON OLEAJE Y BRISA MARINA
    // ========================================================================
    const waveBob = Math.sin(frame * 0.22) * 2;

    // Salpicadura suave en popa (Estela de quillas)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(tailX - dir * 6, tailY + Math.round(waveBob), 4, 2);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(tailX - dir * 3, tailY + 1 + Math.round(waveBob), 5, 2);
    ctx.fillRect(tailX - dir * 8, tailY + 2, 3, 1);

    // Arco de corte tenue en proa
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bowX + dir, bowY + Math.round(waveBob * 0.5), 4, 2);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(bowX, bowY + 1, 3, 1);
  }

  ctx.restore();
};


// --- MÓDULO: src/sprites/player/surf/index.js ---
// ============================================================================
// SPRITES MUNDO 3: COORDINADOR DE HABILIDAD SURF & IMPULSO (WATER DASH)
// ============================================================================
// Conecta y orquesta los módulos divididos:
// - board.js: Casco, quillas, stringer y deck de la tabla
// - stance.js: Postura anatómica de surfista de Mamá Elizabeth con skins completas
// - dash_fx.js: Chorros de propulsión hidrodinámica, estela y olas de corte

SpriteManager.prototype.drawMamaSurfing = function(ctx, x, y, facingRight, isImpulse = false, frame = 0, forceSkin = null, forceBoardSkin = null) {
  ctx.save();
  const px = Math.round(x);
  const py = Math.round(y);

  const activeSkin = forceSkin || (typeof saveState !== 'undefined' && saveState && saveState.equippedSkin) || 'classic';
  const activeBoardSkin = forceBoardSkin || (typeof saveState !== 'undefined' && saveState && saveState.surfboardSkin) || 'classic';

  // Oscilación marina natural producida por el oleaje
  const bobbing = Math.sin(frame * 0.16) * 1.8;
  const tilt = isImpulse ? -0.14 : (Math.sin(frame * 0.12) * 0.06);

  // 1. Estelas espectrales de velocidad (After-images) en modo Impulso
  if (isImpulse) {
    const dir = facingRight ? 1 : -1;
    for (let g = 2; g >= 1; g--) {
      ctx.save();
      ctx.globalAlpha = g === 2 ? 0.22 : 0.42;
      const ghostX = px - dir * (g * 14);
      const ghostY = py + bobbing;
      this.drawSurfboard(ctx, ghostX + (facingRight ? 2 : -2), ghostY + 20, facingRight, tilt, true, activeBoardSkin);
      this.drawSurferMama(ctx, ghostX, ghostY, facingRight, true, frame, tilt, activeSkin);
      ctx.restore();
    }
  }

  // 2. Chorro hidrodinámico, estela de espuma y corte de proa
  this.drawSurfSpray(ctx, px, py + bobbing, facingRight, isImpulse, frame);

  // 3. Tabla de Surf colocada firmemente bajo sus patas
  const boardY = py + 20 + bobbing;
  this.drawSurfboard(ctx, px + (facingRight ? 2 : -2), boardY, facingRight, tilt, isImpulse, activeBoardSkin);

  // 4. Mamá Elizabeth en su postura atlética de equilibrio sobre el deck
  this.drawSurferMama(ctx, px, py + bobbing, facingRight, isImpulse, frame, tilt, activeSkin);

  ctx.restore();
};


// --- MÓDULO: src/sprites/collectibles/baby_mouse.js ---
// ============================================================================
// HIJOS RATONCITOS Y JAULA DE RESCATE
// ============================================================================
SpriteManager.prototype.drawBabyMouse = function(ctx, x, y, frame, babyId = 1) {
    ctx.save();
    const bounce = Math.abs(Math.floor(Math.sin((frame + babyId * 17) * 0.1) * 3));
    const px = Math.round(x);
    const py = Math.round(y + 4 - bounce);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(px + 2, Math.round(y + 18), 14, 2);

    const img = this.cache['baby_0'];
    if (img) {
      ctx.drawImage(img, px, py);
    }

    // Distintivo de color para cada hermanito ratón (Hijo #1 Celeste, Hijo #2 Fuego/Naranja, etc.)
    const bandanaColors = ['#4ea8de', '#ff5400', '#70e000', '#ffd166', '#b5179e', '#00f5d4', '#ff0055'];
    ctx.fillStyle = bandanaColors[(babyId - 1) % bandanaColors.length];
    ctx.fillRect(px + 3, py + 8, 8, 2);

    const heartY = py - 8 + Math.round(Math.sin(frame * 0.12) * 2);
    ctx.fillStyle = '#ff4d6d';
    ctx.fillRect(px + 6, heartY, 2, 2);
    ctx.fillRect(px + 9, heartY, 2, 2);
    ctx.fillRect(px + 5, heartY + 1, 7, 2);
    ctx.fillRect(px + 6, heartY + 3, 5, 1);
    ctx.fillRect(px + 7, heartY + 4, 3, 1);
    ctx.fillRect(px + 8, heartY + 5, 1, 1);

    ctx.restore();
  }


SpriteManager.prototype.drawBabyCage = function(ctx, x, y, frame, isGarden = false) {
    const px = Math.round(x - 6);
    const py = Math.round(y - 8);

    if (isGarden) {
      // 🌸 Escudo de Fuerza Floral y Vought de Homelander en el Jardín
      const pulse = Math.sin(frame * 0.18) * 0.15 + 0.35;
      const r = 20 + Math.sin(frame * 0.15) * 2;
      const grad = ctx.createRadialGradient(px + 14, py + 14, 2, px + 14, py + 14, r + 6);
      grad.addColorStop(0, 'rgba(255, 0, 85, 0.12)');
      grad.addColorStop(0.65, `rgba(0, 245, 212, ${pulse.toFixed(2)})`);
      grad.addColorStop(1, 'rgba(255, 0, 85, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px + 14, py + 14, r + 6, 0, Math.PI * 2);
      ctx.fill();

      // Aro exterior del escudo con runas giratorias
      ctx.strokeStyle = '#00f5d4';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px + 14, py + 14, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#ff0055';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(px + 14, py + 14, r - 3, frame * 0.05, frame * 0.05 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Candado de 5 gemas en la parte superior
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 9, py - 9, 10, 7);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 10, py - 8, 8, 5);
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(px + 13, py - 6, 2, 2);
      return;
    }

    const pulse = Math.sin(frame * 0.15) * 0.12 + 0.25;

    // Campo de fuerza carmesí interno (dentro de los barrotes de la jaula)
    ctx.fillStyle = `rgba(255, 42, 85, ${pulse.toFixed(2)})`;
    ctx.fillRect(px + 3, py + 4, 24, 24);

    // Base y techo de obsidiana
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py, 30, 4);
    ctx.fillRect(px - 2, py + 28, 34, 4);
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 2, py + 1, 26, 2);

    // Barrotes láser incandescentes
    for (let bx = px + 3; bx <= px + 27; bx += 6) {
      ctx.fillStyle = '#d00000';
      ctx.fillRect(bx, py + 4, 3, 24);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(bx + 1, py + 4, 1, 24);
    }

    // Candado energético superior
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 12, py - 5, 6, 5);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 14, py - 3, 2, 2);
  }


// --- MÓDULO: src/sprites/collectibles/cheese.js ---
// ============================================================================
// COLECCIONABLES: QUESO DORADO, LIRIOS SOLTADOS Y DESTELLOS
// ============================================================================
SpriteManager.prototype.drawSparkleStar = function(ctx, cx, cy, size, color = '#ffd166') {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size * 2);
  ctx.lineTo(cx + size * 0.6, cy - size * 0.6);
  ctx.lineTo(cx + size * 2, cy);
  ctx.lineTo(cx + size * 0.6, cy + size * 0.6);
  ctx.lineTo(cx, cy + size * 2);
  ctx.lineTo(cx - size * 0.6, cy + size * 0.6);
  ctx.lineTo(cx - size * 2, cy);
  ctx.lineTo(cx - size * 0.6, cy - size * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

SpriteManager.prototype.drawDroppedLily = function(ctx, x, y, frame) {
  const px = Math.round(x);
  const py = Math.round(y + Math.sin(frame * 0.15 + x) * 1.8);

  // Halo suave sutil
  const glow = ctx.createRadialGradient(px + 4, py + 4, 1, px + 4, py + 4, 10);
  glow.addColorStop(0, 'rgba(255, 143, 171, 0.28)');
  glow.addColorStop(1, 'rgba(255, 143, 171, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(px - 6, py - 6, 20, 20);

  // Destello de estrella glint estilo Chiki's Chase
  if (Math.floor((frame + x) * 0.12) % 3 === 0) {
    this.drawSparkleStar(ctx, px + 7, py - 1, 2, '#fff0f3');
  }

  // Contorno oscuro
  ctx.fillStyle = '#14101c';
  ctx.fillRect(px, py, 8, 8);

  // Hojas verdes del Lirio de Dexter
  ctx.fillStyle = '#2b6e2e';
  ctx.fillRect(px + 1, py + 3, 2, 4);
  ctx.fillStyle = '#52b74a';
  ctx.fillRect(px + 1, py + 4, 1, 2);

  // Flor campanita blanca y rosa
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(px + 3, py + 1, 4, 5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 1, 2, 2);
  ctx.fillStyle = '#ff758f';
  ctx.fillRect(px + 3, py + 2, 1, 1);
};

SpriteManager.prototype.drawCheese = function(ctx, x, y, frame) {
  const floatY = Math.round(Math.sin((frame + x) * 0.1) * 2.2);
  const px = Math.round(x);
  const py = Math.round(y + floatY);

  // Halo cálido sutil de luz dorada
  const glow = ctx.createRadialGradient(px + 6, py + 5, 1, px + 6, py + 5, 12);
  glow.addColorStop(0, 'rgba(255, 225, 105, 0.32)');
  glow.addColorStop(1, 'rgba(255, 183, 3, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(px - 6, py - 7, 24, 24);

  // Destello de estrella rotando/pulsando estilo Chiki's Chase
  const sparklePhase = ((frame + x) * 0.08) % 3;
  if (sparklePhase < 1.4) {
    const sparkleSize = 2 + Math.sin(frame * 0.22) * 0.8;
    this.drawSparkleStar(ctx, px + 10, py - 1, sparkleSize, '#fff3b0');
  }

  // Contorno oscuro marcado
  ctx.fillStyle = '#14101c';
  ctx.fillRect(px + 1, py, 10, 11);
  ctx.fillRect(px, py + 2, 12, 8);

  // Corteza superior dorada brillante
  ctx.fillStyle = '#ffe169';
  ctx.fillRect(px + 2, py + 1, 8, 3);
  // Cara de queso cheddar maduro
  ctx.fillStyle = '#fca311';
  ctx.fillRect(px + 1, py + 4, 10, 6);
  // Sombra biselada inferior
  ctx.fillStyle = '#cc7700';
  ctx.fillRect(px + 1, py + 8, 10, 2);
  // Agujeros de queso con profundidad
  ctx.fillStyle = '#b05e00';
  ctx.fillRect(px + 2, py + 5, 2, 2);
  ctx.fillRect(px + 7, py + 6, 2, 2);
  ctx.fillRect(px + 5, py + 8, 1, 1);
  ctx.fillStyle = '#ffb703';
  ctx.fillRect(px + 3, py + 6, 1, 1);
  ctx.fillRect(px + 8, py + 7, 1, 1);
  // Brillo especular blanco en la cresta
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 3, py + 2, 3, 1);
};


// --- MÓDULO: src/sprites/collectibles/icecream.js ---
// ============================================================================
// SPRITES MUNDO 3 • FASE 3: ICONO DE HELADO DE FRESA Y VAINILLA
// ============================================================================
function drawIceCreamCone(ctx, x, y, scale = 1) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (scale !== 1) ctx.scale(scale, scale);

  // 1. Cono de barquillo crujiente dorado
  ctx.fillStyle = '#4a2810';
  ctx.fillRect(-4, 0, 8, 2);
  ctx.fillRect(-3, 2, 6, 3);
  ctx.fillRect(-2, 5, 4, 3);
  ctx.fillRect(-1, 8, 2, 2);

  ctx.fillStyle = '#c4923e';
  ctx.fillRect(-3, 0, 6, 2);
  ctx.fillRect(-2, 2, 4, 3);
  ctx.fillRect(-1, 5, 2, 3);

  // Cuadrícula del barquillo
  ctx.fillStyle = '#e9c46a';
  ctx.fillRect(-2, 1, 1, 1);
  ctx.fillRect(1, 1, 1, 1);
  ctx.fillRect(-1, 3, 1, 1);

  // 2. Bola / Remolino de helado de fresa y vainilla
  ctx.fillStyle = '#4a2810';
  ctx.fillRect(-5, -6, 10, 6);
  ctx.fillRect(-4, -9, 8, 4);
  ctx.fillRect(-2, -11, 4, 3);

  // Capa de fresa
  ctx.fillStyle = '#ff4d6d';
  ctx.fillRect(-4, -5, 8, 5);
  ctx.fillRect(-3, -8, 6, 3);

  // Espiral de nata/vainilla blanca
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-2, -10, 4, 2);
  ctx.fillRect(-1, -7, 3, 2);
  ctx.fillRect(-3, -4, 2, 2);
  ctx.fillRect(1, -3, 2, 2);

  // Guinda roja en la punta
  ctx.fillStyle = '#d90429';
  ctx.fillRect(0, -11, 1, 1);

  ctx.restore();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawIceCreamCone = drawIceCreamCone;
}

if (typeof module !== 'undefined') {
  module.exports = { drawIceCreamCone };
}


// --- MÓDULO: src/sprites/collectibles/frog.js ---
// ============================================================================
// SPRITES MUNDO 3 • FASE 4: LA RANITA DE RAÚL (PIXEL ART 16-BIT)
// ============================================================================
// Renderiza la pequeña rana de Raúl posada sobre la cabeza de Mamá Elizabeth.
// Paleta estricta: #07020a, #120415, #3b0820, #8f143c, #b31b52, #ff2a70, #ffcad4, #ffffff

function drawFrogSprite(ctx, x, y, facingRight, frame = 0) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  if (!facingRight) ctx.scale(-1, 1);

  // 1. Cuerpo redondeado de la ranita (12px ancho x 8px alto)
  ctx.fillStyle = '#07020a';
  ctx.fillRect(-6, -4, 12, 8);
  ctx.fillStyle = '#8f143c';
  ctx.fillRect(-5, -3, 10, 6);

  // 2. Garganta inflable con animación de respiración
  const breathe = Math.sin(frame * 0.15) > 0 ? 1 : 0;
  ctx.fillStyle = '#ffcad4';
  ctx.fillRect(-2, 0, 5 + breathe, 3);

  // 3. Grandes ojos saltones en la parte superior
  const isBlinking = frame % 110 < 6;
  // Ojo izquierdo
  ctx.fillStyle = '#07020a';
  ctx.fillRect(-4, -7, 4, 4);
  ctx.fillStyle = isBlinking ? '#8f143c' : '#ffffff';
  ctx.fillRect(-3, -6, 2, 2);
  if (!isBlinking) {
    ctx.fillStyle = '#07020a';
    ctx.fillRect(-3, -5, 1, 1); // Pupila
  }

  // Ojo derecho
  ctx.fillStyle = '#07020a';
  ctx.fillRect(1, -7, 4, 4);
  ctx.fillStyle = isBlinking ? '#8f143c' : '#ffffff';
  ctx.fillRect(2, -6, 2, 2);
  if (!isBlinking) {
    ctx.fillStyle = '#07020a';
    ctx.fillRect(2, -5, 1, 1); // Pupila
  }

  // 4. Patas palmeadas abrazando la cabeza
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(-6, 3, 3, 2); // Pata delantera izq
  ctx.fillRect(4, 3, 3, 2);  // Pata delantera der
  ctx.fillStyle = '#3b0820';
  ctx.fillRect(-7, 1, 2, 3); // Anca trasera

  ctx.restore();
}

function drawFrogOnHead(ctx, player, frame) {
  if (typeof saveState === 'undefined' || !saveState.raulQuest || saveState.raulQuest.state !== 'FROG_ON_HEAD') {
    return;
  }

  // Posición de la cabeza de Mamá Elizabeth (entre sus orejitas)
  const dir = player.facingRight ? 1 : -1;
  const bobbing = player.state === 'run' ? Math.sin(frame * 0.4) * 1.5 : (player.state === 'idle' ? Math.sin(frame * 0.1) * 0.8 : 0);
  const frogX = player.x + 11 + dir * 1;
  const frogY = player.y - 2 + bobbing;

  drawFrogSprite(ctx, frogX, frogY, player.facingRight, frame);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawFrogSprite = drawFrogSprite;
  SpriteManager.prototype.drawFrogOnHead = drawFrogOnHead;
}

if (typeof module !== 'undefined') {
  module.exports = { drawFrogSprite, drawFrogOnHead };
}


// --- MÓDULO: src/sprites/collectibles/key_assembly.js ---
// ============================================================================
// SPRITES: ANIMACIÓN DE ENSAMBLAJE DE LA LLAVE MAESTRA (MUNDO 3 • FASE 4)
// ============================================================================
// Paleta estricta: #07020a, #120415, #3b0820, #8f143c, #b31b52, #ff2a70, #ffcad4, #ffffff

function drawKeyFragment(ctx, pieceIndex, x, y, scale = 1, alpha = 1) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale, scale);
  ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

  if (pieceIndex === 0) {
    // Pieza 1: Aro de sujeción / Cabezal ornamental (Sami el Heladero)
    ctx.fillStyle = '#07020a'; ctx.fillRect(-10, -10, 20, 16);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(-8, -8, 16, 12);
    ctx.fillStyle = '#07020a'; ctx.fillRect(-4, -4, 8, 5); // Hueco interior
    ctx.fillStyle = '#ffffff'; ctx.fillRect(-7, -7, 3, 3); // Brillo
    // Orejitas ornamentales de ratón en el pomo
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(-8, -12, 4, 3);
    ctx.fillRect(4, -12, 4, 3);
  } else if (pieceIndex === 1) {
    // Pieza 2: Vástago central acanalado (Surfista Kai)
    ctx.fillStyle = '#07020a'; ctx.fillRect(-4, -8, 8, 22);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(-3, -7, 6, 20);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(-1, -7, 2, 20); // Estría reflectante
    ctx.fillStyle = '#8f143c'; ctx.fillRect(-3, 0, 6, 2);   // Engarce medio
  } else if (pieceIndex === 2) {
    // Pieza 3: Paleta dentada de desbloqueo (La Costa)
    ctx.fillStyle = '#07020a'; ctx.fillRect(-2, -6, 14, 14);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(-1, -5, 12, 12);
    // Dientes asimétricos de combinación
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4, -3, 6, 2);
    ctx.fillRect(6, 1, 4, 2);
    ctx.fillRect(2, 5, 8, 2);
  } else if (pieceIndex === 3) {
    // Pieza 4: Joya / Núcleo de poder maestro (Don Pancho)
    ctx.fillStyle = '#07020a'; ctx.fillRect(-6, -6, 12, 12);
    ctx.fillStyle = '#ff2a70'; ctx.fillRect(-5, -5, 10, 10);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(-3, -3, 6, 6);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(-1, -1, 3, 3); // Destello estelar
  }

  ctx.restore();
}

function drawMasterKeyAssembled(ctx, x, y, scale = 1, glow = 1, glint = 0) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(scale, scale);

  // Aura radiante de poder unificado
  const glowAlpha = Math.max(0, Math.min(0.6, 0.35 * glow));
  ctx.fillStyle = `rgba(255, 209, 102, ${glowAlpha})`;
  ctx.beginPath();
  ctx.arc(0, 4, 36, 0, Math.PI * 2);
  ctx.fill();

  // 1. Cabeza de la Llave Maestra con corona de ratón
  ctx.fillStyle = '#07020a'; ctx.fillRect(-14, -26, 28, 22);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(-12, -24, 24, 18);
  ctx.fillStyle = '#07020a'; ctx.fillRect(-6, -18, 12, 8); // Ojo central

  // Orejitas ornamentales de ratón en el pomo
  ctx.fillStyle = '#07020a';
  ctx.fillRect(-12, -30, 7, 5); ctx.fillRect(5, -30, 7, 5);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(-11, -29, 5, 4); ctx.fillRect(6, -29, 5, 4);

  // Joya de Don Pancho engarzada en el corazón de la llave
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(-3, -15, 6, 4);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-1, -14, 2, 2);

  // 2. Vástago pesado con estrías doradas y blancas
  ctx.fillStyle = '#07020a'; ctx.fillRect(-5, -5, 10, 36);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(-3, -4, 6, 34);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(-1, -4, 2, 34); // Brillo metálico continuo
  ctx.fillStyle = '#8f143c'; ctx.fillRect(-4, 10, 8, 3);  // Anillo de refuerzo

  // 3. Dientes maestros del mecanismo del rascacielos
  ctx.fillStyle = '#07020a'; ctx.fillRect(4, 12, 14, 18);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(5, 13, 12, 16);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(10, 15, 6, 3);
  ctx.fillRect(12, 21, 4, 3);
  ctx.fillRect(8, 26, 8, 2);

  // 4. Destello estelar móvil que recorre la llave
  if (glint > 0) {
    const glintY = -24 + (glint % 1) * 55;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-2, Math.round(glintY), 4, 4);
    ctx.fillRect(-5, Math.round(glintY) + 1, 10, 2);
  }

  ctx.restore();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawKeyFragment = drawKeyFragment;
  SpriteManager.prototype.drawMasterKeyAssembled = drawMasterKeyAssembled;
}

if (typeof module !== 'undefined') {
  module.exports = { drawKeyFragment, drawMasterKeyAssembled };
}


// --- MÓDULO: src/sprites/bosses/homelander.js ---
// ============================================================================
// JEFE: HOMELANDER (FASE 4 - MUNDO 1)
// ============================================================================
SpriteManager.prototype.drawHomelander = function(ctx, x, y, phase, frame) {
    ctx.save();

    if (phase === 'defeated') {
      // Homelander derrotado: gira fuera de control con humo hacia el cielo
      const spinAngle = (frame * 0.35);
      ctx.translate(Math.round(x), Math.round(y));
      ctx.rotate(spinAngle);
      const img = this.cache['hl_laser_0'] || this.cache['hl_patrol_0'];
      if (img) ctx.drawImage(img, -12, -12);
      ctx.restore();
      return { leftEyeX: x, rightEyeX: x, eyeY: y };
    }

    const hoverOffset = Math.round(Math.sin(frame * 0.08) * 3);
    const px = Math.round(x - 12);
    const py = Math.round(y + hoverOffset);

    if (phase === 'charging' || phase === 'firing') {
      const radius = 18 + Math.sin(frame * 0.6) * 4;
      const grad = ctx.createRadialGradient(x, py + 8, 2, x, py + 8, radius);
      grad.addColorStop(0, 'rgba(255, 0, 55, 0.65)');
      grad.addColorStop(1, 'rgba(255, 0, 55, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, py + 8, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const capeFrame = Math.floor(frame * 0.18) % 2;
    const key = phase === 'patrol' ? `hl_patrol_${capeFrame}` : `hl_laser_${capeFrame}`;
    const img = this.cache[key];
    if (img) {
      ctx.drawImage(img, px, py);
    }

    ctx.restore();

    return {
      leftEyeX: px + 9,
      rightEyeX: px + 13,
      eyeY: py + 5
    };
  }


// --- MÓDULO: src/sprites/bosses/omniman.js ---
// ============================================================================
// JEFE: OMNI-MAN (FASE 4 - MUNDO 2 VOLCÁN)
// ============================================================================
SpriteManager.prototype.drawOmniMan = function(ctx, x, y, facingRight, isThrowing, frame, hp = 7, maxHp = 7, hitFlash = false, bossState = 'patrol', isEnraged = false) {
    const hoverY = (bossState === 'swoop' || bossState === 'slam_down' || bossState === 'slam_recover')
      ? 0
      : Math.round(Math.sin(frame * (isEnraged ? 0.2 : 0.1)) * 4);
    const px = Math.round(x);
    const py = Math.round(y + hoverY);

    ctx.save();

    // Aura de Furia Viltrumita cuando entra en FASE 2 (tras recibir 3 golpes: hp <= 4)
    if (isEnraged) {
      const pulse = 20 + Math.sin(frame * 0.4) * 5;
      const grad = ctx.createRadialGradient(px + 12, py + 12, 3, px + 12, py + 12, pulse);
      grad.addColorStop(0, 'rgba(255, 0, 55, 0.65)');
      grad.addColorStop(0.6, 'rgba(255, 84, 0, 0.3)');
      grad.addColorStop(1, 'rgba(255, 0, 55, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(px - 16, py - 16, 56, 56);
    }

    // Indicador visual de carga de ataque sin texto en pantalla
    if (bossState === 'swoop_charge' || bossState === 'slam_aim') {
      const flash = Math.floor(frame / 2) % 2 === 0;
      ctx.fillStyle = flash ? '#ffffff' : '#ff0055';
      ctx.fillRect(px + 10, py - 18, 4, 7);
      ctx.fillRect(px + 10, py - 9, 4, 3);
    }

    // Barra compacta de 7 vidas sobre Omni-Man
    const barW = maxHp * 5 + 2;
    const barX = px + 12 - Math.floor(barW / 2);
    const barY = py - 13;
    ctx.fillStyle = '#14101c';
    ctx.fillRect(barX - 1, barY - 1, barW, 6);
    for (let i = 0; i < maxHp; i++) {
      ctx.fillStyle = i < hp ? (isEnraged ? '#ff0055' : '#ff5400') : '#3b2d54';
      ctx.fillRect(barX + i * 5, barY, 4, 4);
    }

    ctx.translate(px + 12, py + 28);
    if (!facingRight) ctx.scale(-1, 1);

    if (bossState === 'swoop') {
      ctx.rotate(0.35);
      // Cono de ruptura sónica
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillRect(-10, -24, 24, 22);
    }

    // Aura de vuelo sónico bajo sus botas
    ctx.fillStyle = isEnraged ? 'rgba(255, 42, 85, 0.55)' : 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(-9, 0, 18, 3);

    // Capa roja viltrumita ondeando al volar
    const wave = Math.round(Math.sin(frame * (isEnraged ? 0.35 : 0.22)) * 4);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(-16 - wave, -21, 20 + wave, 21);
    ctx.fillStyle = hitFlash ? '#ffffff' : (isEnraged ? '#ff0a36' : '#d62828');
    ctx.fillRect(-15 - wave, -20, 16 + wave, 19);

    // Torso musculoso blanco y rojo (Traje de Omni-Man)
    ctx.fillStyle = '#14101c';
    ctx.fillRect(-7, -21, 15, 15);
    ctx.fillStyle = hitFlash ? '#ffd166' : '#ffffff';
    ctx.fillRect(-6, -20, 13, 13);
    // Emblema "O" rojo en el pecho
    ctx.fillStyle = hitFlash ? '#ffffff' : '#d62828';
    ctx.fillRect(-3, -18, 8, 9);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-1, -16, 4, 5);

    // Cabeza con cabello negro, sienes canosas blancas y el icónico BIGOTE
    ctx.fillStyle = '#14101c';
    ctx.fillRect(-5, -30, 11, 10);
    ctx.fillStyle = hitFlash ? '#ffffff' : '#f4b393';
    ctx.fillRect(-4, -28, 9, 7);
    ctx.fillStyle = '#1d1e2c';
    ctx.fillRect(-4, -30, 9, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-4, -28, 2, 3);
    // Ojos rojos brillantes en Fase 2 Enfurecida
    ctx.fillStyle = isEnraged ? '#ff0033' : '#14101c';
    ctx.fillRect(1, -26, 3, 2);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(0, -23, 5, 2); // Bigote viltrumita

    // Brazos
    if (isThrowing) {
      ctx.fillStyle = '#f4b393';
      ctx.fillRect(2, -28, 4, 8);
      this.drawMagmaRock(ctx, 0, -34, frame);
    } else if (bossState === 'swoop') {
      ctx.fillStyle = '#f4b393';
      ctx.fillRect(6, -22, 6, 4);
    } else {
      ctx.fillStyle = '#d62828';
      ctx.fillRect(5, -15, 3, 5);
    }

    // Piernas flotando en postura de vuelo aéreo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-6, -7, 4, 4);
    ctx.fillRect(0, -6, 4, 4);
    ctx.fillStyle = '#d62828';
    ctx.fillRect(-7, -3, 4, 4);
    ctx.fillRect(0, -2, 4, 3);

    ctx.restore();
  }


// --- MÓDULO: src/sprites/bosses/kraken.js ---
// ============================================================================
// SPRITES JEFE: KRAKEN DE LAS PROFUNDIDADES (TITÁN ABISAL DEL MEGATSUNAMI)
// ============================================================================
// Cefalópodo titánico con manto orgánico redondeado, aletas laterales de manta,
// 8 ojos bioluminiscentes con pupilas rastreadoras, pico córneos de obsidiana,
// tentáculos maestros ondulantes y vórtice de marea en su base.

function drawKrakenBoss(ctx, k, frame) {
  const px = Math.round(k.x);
  const py = Math.round(k.y);
  const bob = Math.round(Math.sin(frame * 0.07) * 5);
  const hitFlash = k.hitTimer > 0;
  const phase = k.phase || 1;
  const eyesLeft = k.eyesRemaining !== undefined ? k.eyesRemaining : 8;

  // Dirección hacia donde mira el Kraken (persigue al jugador)
  const playerDir = (typeof player !== 'undefined' && player) ? (player.x < px ? -1 : 1) : -1;

  ctx.save();

  // --------------------------------------------------------------------------
  // 1. TENTÁCULOS MAESTROS TRASEROS (ALZÁNDOSE EN LOS FLANCOS)
  // --------------------------------------------------------------------------
  drawMasterTentacle(ctx, px - 52, py - 12 + bob, frame, -1, phase, hitFlash);
  drawMasterTentacle(ctx, px + 52, py - 12 + bob, frame + 16, 1, phase, hitFlash);

  // --------------------------------------------------------------------------
  // 2. VÓRTICE DE AGUA Y REMOLINO DE FONDO EN LA BASE
  // --------------------------------------------------------------------------
  const vortexGrad = ctx.createLinearGradient(px - 60, py + 30, px + 60, py + 65);
  vortexGrad.addColorStop(0, '#001233');
  vortexGrad.addColorStop(0.4, '#023e8a');
  vortexGrad.addColorStop(0.8, '#0077b6');
  vortexGrad.addColorStop(1, '#001233');
  ctx.fillStyle = vortexGrad;
  ctx.beginPath();
  ctx.ellipse(px, py + 48, 62, 17, 0, 0, Math.PI * 2);
  ctx.fill();

  // Anillos de espuma concéntricos y spray girando en el vórtice
  for (let ring = 0; ring < 3; ring++) {
    const ringRad = 36 + ring * 12;
    const ringY = py + 45 + ring * 5;
    ctx.strokeStyle = ring % 2 === 0 ? 'rgba(202, 240, 248, 0.75)' : 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(px, ringY, ringRad, ringRad * 0.28, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Chorro / spray de agua pulverizada salpicando hacia los lados
  for (let sp = 0; sp < 6; sp++) {
    const spAngle = (frame * 0.12 + sp * 1.1) % (Math.PI * 2);
    const spDist = 44 + (sp % 3) * 9;
    const spX = px + Math.cos(spAngle) * spDist;
    const spY = py + 48 + Math.sin(spAngle) * (spDist * 0.25);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(spX, spY, 2, 2);
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(spX + 1, spY - 2, 2, 2);
  }

  // --------------------------------------------------------------------------
  // 3. MANTO ORGÁNICO ESCULPIDO DEL KRAKEN (CÚPULA CEFALÓPODA Y ALETAS)
  // --------------------------------------------------------------------------
  // Paleta dinámica según fase y daño
  const outCol = hitFlash ? '#ffffff' : '#000814';
  const mantleCol = hitFlash ? '#caf0f8' : (phase === 3 ? '#0a192f' : '#03045e');
  const toneCol = hitFlash ? '#ffffff' : (phase === 3 ? '#1c2541' : '#0077b6');
  const cyanGlow = phase === 3 ? '#ff0054' : (phase === 2 ? '#00f5d4' : '#00b4d8');

  // Aletas laterales ondulantes (Manta flukes) que se ensanchan a los lados
  const finWave = Math.sin(frame * 0.08) * 3;
  ctx.fillStyle = outCol;
  ctx.beginPath();
  ctx.ellipse(px - 38 + finWave, py - 20 + bob, 16, 26, -0.2, 0, Math.PI * 2);
  ctx.ellipse(px + 38 - finWave, py - 20 + bob, 16, 26, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = mantleCol;
  ctx.beginPath();
  ctx.ellipse(px - 38 + finWave, py - 20 + bob, 14, 24, -0.2, 0, Math.PI * 2);
  ctx.ellipse(px + 38 - finWave, py - 20 + bob, 14, 24, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Borde brillante de las aletas
  ctx.fillStyle = cyanGlow;
  ctx.fillRect(px - 51 + finWave, py - 22 + bob, 2, 14);
  ctx.fillRect(px + 49 - finWave, py - 22 + bob, 2, 14);

  // Cúpula del manto principal (Esculpida de arriba a abajo)
  // Nivel 1: Punta apical superior del manto
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 12, py - 66 + bob, 24, 14);
  ctx.fillStyle = mantleCol;
  ctx.fillRect(px - 10, py - 64 + bob, 20, 12);
  ctx.fillStyle = toneCol;
  ctx.fillRect(px - 6, py - 63 + bob, 12, 6);

  // Nivel 2: Cúpula superior media
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 22, py - 54 + bob, 44, 16);
  ctx.fillStyle = mantleCol;
  ctx.fillRect(px - 20, py - 52 + bob, 40, 14);
  ctx.fillStyle = toneCol;
  ctx.fillRect(px - 14, py - 50 + bob, 28, 8);

  // Nivel 3: Masa muscular del manto y frente
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 34, py - 40 + bob, 68, 22);
  ctx.fillStyle = mantleCol;
  ctx.fillRect(px - 32, py - 38 + bob, 64, 20);
  ctx.fillStyle = toneCol;
  ctx.fillRect(px - 24, py - 36 + bob, 48, 10);

  // Nivel 4: Cresta supraciliar y ceja acorazada
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 40, py - 20 + bob, 80, 26);
  ctx.fillStyle = mantleCol;
  ctx.fillRect(px - 38, py - 18 + bob, 76, 24);

  // Placas de armadura quitinosa abisal en la ceja
  ctx.fillStyle = toneCol;
  ctx.fillRect(px - 34, py - 16 + bob, 68, 6);
  ctx.fillStyle = outCol;
  ctx.fillRect(px - 2, py - 16 + bob, 4, 6); // Separador nasal central

  // Vetas bioluminiscentes ramificadas (pulso cardíaco)
  const pulseSpeed = phase === 3 ? 0.35 : (phase === 2 ? 0.22 : 0.12);
  const pulse = Math.sin(frame * pulseSpeed) * 0.3 + 0.7;
  let veinCol = '#00b4d8';
  if (phase === 2) veinCol = pulse > 0.75 ? '#00f5d4' : '#48cae4';
  else if (phase === 3) veinCol = pulse > 0.65 ? '#ffd166' : '#ff0054';

  ctx.fillStyle = veinCol;
  // Tronco central de energía
  ctx.fillRect(px - 1, py - 60 + bob, 2, 22);
  // Ramas diagonales izquierda y derecha
  ctx.fillRect(px - 14, py - 48 + bob, 10, 2);
  ctx.fillRect(px + 4, py - 48 + bob, 10, 2);
  ctx.fillRect(px - 22, py - 38 + bob, 14, 2);
  ctx.fillRect(px + 8, py - 38 + bob, 14, 2);

  // --------------------------------------------------------------------------
  // 4. LOS 8 OJOS DEL KRAKEN (ALMENDRADOS CON SEGUIMIENTO Y DAÑO)
  // --------------------------------------------------------------------------
  const eyeCoords = [
    // Fila superior (4 ojos arqueados)
    { ox: -24, oy: -20, r: 4 },
    { ox: -9, oy: -23, r: 5 },
    { ox: 9, oy: -23, r: 5 },
    { ox: 24, oy: -20, r: 4 },
    // Fila inferior (4 ojos principales grandes)
    { ox: -26, oy: -9, r: 5 },
    { ox: -9, oy: -11, r: 6 },
    { ox: 9, oy: -11, r: 6 },
    { ox: 26, oy: -9, r: 5 }
  ];

  for (let i = 0; i < 8; i++) {
    const c = eyeCoords[i];
    const ex = px + c.ox;
    const ey = py + c.oy + bob;
    const isAlive = i < eyesLeft;
    const size = c.r;

    // Cuenca ocular sombría
    ctx.fillStyle = '#000814';
    ctx.fillRect(ex - size - 1, ey - size - 1, size * 2 + 2, size * 2 + 2);

    if (isAlive) {
      // Esclerótica brillante
      ctx.fillStyle = phase === 3 ? '#ffbe0b' : (phase === 2 ? '#ffd166' : '#caf0f8');
      ctx.fillRect(ex - size, ey - size, size * 2, size * 2);

      // Iris con color dinámico de fase
      const irisCol = phase === 3 ? '#ff0054' : (phase === 2 ? '#ffb703' : '#00b4d8');
      ctx.fillStyle = irisCol;
      ctx.fillRect(ex - size + 1, ey - size + 1, size * 2 - 2, size * 2 - 2);

      // Pupila vertical rasgada que sigue activamente la posición del jugador
      const pupilShiftX = playerDir * 1;
      ctx.fillStyle = '#000814';
      ctx.fillRect(ex + pupilShiftX - 1, ey - size + 1, 2, size * 2 - 2);

      // Brillo especular húmedo
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ex - size + 1, ey - size + 1, 1, 1);
    } else {
      // Ojo destruido / cegado
      ctx.fillStyle = '#0a1128';
      ctx.fillRect(ex - size, ey - size, size * 2, size * 2);

      // Cicatriz horizontal
      ctx.fillStyle = '#343a40';
      ctx.fillRect(ex - size + 1, ey, size * 2 - 2, 2);

      // Tinta abisal brotando hacia abajo
      ctx.fillStyle = '#000814';
      ctx.fillRect(ex - 1, ey + size, 2, 6);
      ctx.fillRect(ex, ey + size + 6, 2, 4);
    }
  }

  // --------------------------------------------------------------------------
  // 5. PICO CÓRNEO DE OBSIDIANA Y MANDÍBULA RAPAZ
  // --------------------------------------------------------------------------
  const beakY = py + 7 + bob;
  const isRoaring = hitFlash || (frame % 80 < 22);

  // Cavidad bucal profunda
  ctx.fillStyle = '#000814';
  ctx.fillRect(px - 16, beakY - 4, 32, 22);

  // Pico superior curvado de obsidiana
  ctx.fillStyle = '#1b263b';
  ctx.fillRect(px - 12, beakY - 2, 24, 8);
  ctx.fillStyle = '#0d1b2a';
  ctx.fillRect(px - 8, beakY + 4, 16, 6);
  // Filo afilado de corte ámbar
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 2, beakY + 8, 4, 3);

  // Dientes cónicos córneos
  ctx.fillStyle = '#ffffff';
  for (let d = 0; d < 5; d++) {
    const dx = px - 9 + d * 4;
    ctx.fillRect(dx, beakY, 2, 2);
    if (isRoaring) {
      ctx.fillRect(dx, beakY + 12, 2, 2);
    }
  }

  // Saliva y espuma de mar goteando del pico
  if (frame % 6 < 3) {
    ctx.fillStyle = 'rgba(144, 224, 239, 0.75)';
    ctx.fillRect(px - 4, beakY + 12, 2, 5);
    ctx.fillRect(px + 3, beakY + 11, 2, 6);
  }

  // --------------------------------------------------------------------------
  // 6. BRAZOS FRONTALES CORTOS EN LA BASE
  // --------------------------------------------------------------------------
  for (let a = -2; a <= 2; a++) {
    if (a === 0) continue;
    const ax = px + a * 14;
    const awave = Math.sin(frame * 0.1 + a) * 4;
    const ay = py + 22 + bob + awave;

    ctx.fillStyle = outCol;
    ctx.fillRect(ax - 5, ay, 10, 14);
    ctx.fillStyle = mantleCol;
    ctx.fillRect(ax - 4, ay + 1, 8, 12);
    // Ventosa frontal bioluminiscente
    ctx.fillStyle = veinCol;
    ctx.fillRect(ax - 2, ay + 4, 4, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ax - 1, ay + 5, 2, 2);
  }

  ctx.restore();
}

// RENDERIZADO DEL TENTÁCULO MAESTRO LATERAL GIGANTE
function drawMasterTentacle(ctx, tx, ty, frame, dir, phase, hitFlash) {
  const wave = Math.sin(frame * 0.08) * 10;
  const curl = Math.cos(frame * 0.05) * 8;

  const segs = [
    { dx: 0, dy: 30, w: 20 },
    { dx: dir * 8 + wave * 0.2, dy: 14, w: 18 },
    { dx: dir * 18 + wave * 0.5, dy: -4, w: 16 },
    { dx: dir * 26 + wave * 0.8, dy: -24, w: 14 },
    { dx: dir * 30 + wave * 1.1 + curl * 0.4, dy: -46, w: 12 },
    { dx: dir * 28 + wave * 1.4 + curl * 0.8, dy: -68, w: 9 },
    { dx: dir * 20 + wave * 1.6 + curl * 1.2, dy: -86, w: 6 },
    { dx: dir * 10 + wave * 1.8 + curl * 1.5, dy: -100, w: 3 }
  ];

  // Silueta contorno
  ctx.fillStyle = hitFlash ? '#ffffff' : '#000814';
  segs.forEach(s => {
    ctx.fillRect(tx + s.dx - Math.floor(s.w / 2) - 1, ty + s.dy - 1, s.w + 2, 16);
  });

  // Masa del tentáculo
  const tentCol = hitFlash ? '#caf0f8' : (phase === 3 ? '#0a192f' : '#03045e');
  ctx.fillStyle = tentCol;
  segs.forEach(s => {
    ctx.fillRect(tx + s.dx - Math.floor(s.w / 2), ty + s.dy, s.w, 14);
  });

  // Franja dorsal reflectante
  ctx.fillStyle = phase === 3 ? '#1c2541' : '#0077b6';
  segs.forEach(s => {
    ctx.fillRect(tx + s.dx - Math.floor(s.w / 2) + 2, ty + s.dy, 3, 14);
  });

  // Ventosas bioluminiscentes en el lado interior
  const suckerCol = phase === 3 ? '#ffd166' : (phase === 2 ? '#00f5d4' : '#90e0ef');
  segs.forEach((s, idx) => {
    if (idx >= 1 && idx <= 6) {
      const sx = tx + s.dx - dir * Math.floor(s.w / 2) + (dir > 0 ? -3 : 1);
      const sy = ty + s.dy + 3;
      ctx.fillStyle = '#000814';
      ctx.fillRect(sx - 1, sy - 1, 5, 5);
      ctx.fillStyle = suckerCol;
      ctx.fillRect(sx, sy, 3, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx + 1, sy + 1, 1, 1);
    }
  });
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawKrakenBoss = drawKrakenBoss;
}

if (typeof module !== 'undefined') {
  module.exports = { drawKrakenBoss };
}


// --- MÓDULO: src/sprites/enemies/volcano.js ---
// ============================================================================
// ENEMIGOS DEL VOLCÁN (MUNDO 2)
// ============================================================================
SpriteManager.prototype.drawMagmaCrawler = function(ctx, x, y, facingRight, frame, variant = 'magma') {
    const px = Math.round(x);
    const py = Math.round(y);
    const step = Math.floor(frame * 0.25) % 2;

    if (variant === 'crab' && this.drawCoastalCrab) {
      this.drawCoastalCrab(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'car' && this.drawCityCar) {
      this.drawCityCar(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'shark' && this.drawTsunamiShark) {
      this.drawTsunamiShark(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'space_drone' && this.drawSpaceDrone) {
      this.drawSpaceDrone(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'frost_crawler' && this.drawFrostCrawler) {
      this.drawFrostCrawler(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'kailash_scarab' && this.drawKailashScarab) {
      this.drawKailashScarab(ctx, x, y, facingRight, frame);
      return;
    }
    if (variant === 'agartha_sentinel' && this.drawAgarthaSentinel) {
      this.drawAgarthaSentinel(ctx, x, y, facingRight, frame);
      return;
    }

    if (variant === 'ladybug') {
      // FASE 1 MUNDO 1: Mariquita / Catarina del Jardin Silvestre
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 1, py + 2, 16, 12);
      // Caparazón rojo carmesí con lunares negros
      ctx.fillStyle = '#e63946';
      ctx.fillRect(px + 2, py + 3, 14, 9);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + 4, py + 3, 5, 2);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 5, py + 6, 2, 2);
      ctx.fillRect(px + 10, py + 5, 2, 2);
      ctx.fillRect(px + 8, py + 9, 2, 2);
      // Cabecita y antenitas verdes de hoja
      const headX = facingRight ? px + 12 : px + 2;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(headX, py + 5, 4, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(facingRight ? headX + 2 : headX, py + 6, 2, 2);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(facingRight ? px + 14 : px + 3, py, 2, 3);
      // Patitas
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 3 + step, py + 13, 3, 2);
      ctx.fillRect(px + 12 - step, py + 13, 3, 2);
      return;
    }

    if (variant === 'emerald_beetle') {
      // FASE 2 MUNDO 1: Escarabajo Esmeralda del Estanque de Loto
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 1, py + 2, 16, 12);
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px + 2, py + 3, 14, 9);
      // Brillo iridiscente esmeralda y gota de rocío cian
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 3, py + 3, 12, 5);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 5, py + 2, 8, 3);
      ctx.fillStyle = '#caf0f8';
      ctx.fillRect(px + 7, py + 2, 3, 2);
      const eyeX = facingRight ? px + 13 : px + 3;
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(eyeX, py + 7, 2, 2);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 3 + step, py + 13, 3, 2);
      ctx.fillRect(px + 12 - step, py + 13, 3, 2);
      return;
    }

    // Contorno y caparazón de roca volcánica (Mundo 2)
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 1, py + 2, 16, 12);
    ctx.fillStyle = '#370617';
    ctx.fillRect(px + 2, py + 3, 14, 9);

    // Grietas de lava brillante en el lomo
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 4, py + 2, 10, 4);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 6, py + 3, 6, 2);

    // Ojos amarillos brillantes
    const eyeX = facingRight ? px + 13 : px + 3;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(eyeX, py + 7, 2, 2);

    // Patitas animadas
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 3 + step, py + 13, 3, 2);
    ctx.fillRect(px + 12 - step, py + 13, 3, 2);
  }

  // Dibuja una Criatura Voladora (Abeja Real o Mariposa Nocturna en Mundo 1, Murciélago Ígneo en Mundo 2)
SpriteManager.prototype.drawFireBat = function(ctx, x, y, frame, variant = 'fire_bat') {
    const px = Math.round(x);
    const py = Math.round(y);
    const flap = Math.floor(frame * 0.35) % 2 === 0;

    if (variant === 'seagull' && this.drawCoastalGull) {
      this.drawCoastalGull(ctx, x, y, frame);
      return;
    }
    if (variant === 'jellyfish' && this.drawElectricJellyfish) {
      this.drawElectricJellyfish(ctx, x, y, frame);
      return;
    }
    if (variant === 'space_probe' && this.drawSpaceProbe) {
      this.drawSpaceProbe(ctx, x, y, frame);
      return;
    }
    if (variant === 'frost_flier' && this.drawFrostFlier) {
      this.drawFrostFlier(ctx, x, y, frame);
      return;
    }
    if (variant === 'astral_flier' && this.drawAstralFlier) {
      this.drawAstralFlier(ctx, x, y, frame);
      return;
    }

    if (variant === 'bee') {
      // FASE 2 MUNDO 1: Abeja Real de Nectar del Invernadero
      ctx.fillStyle = 'rgba(202, 240, 248, 0.85)';
      if (flap) {
        ctx.fillRect(px + 1, py - 5, 4, 5);
        ctx.fillRect(px + 7, py - 5, 4, 5);
      } else {
        ctx.fillRect(px - 1, py - 2, 4, 4);
        ctx.fillRect(px + 9, py - 2, 4, 4);
      }
      // Cuerpo redondeado con franjas doradas y negras
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px, py, 12, 10);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 1, py + 1, 3, 8);
      ctx.fillRect(px + 6, py + 1, 3, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 9, py + 3, 2, 2);
      return;
    }

    if (variant === 'moth') {
      // FASE 3 MUNDO 1: Mariposa Nocturna de las Rosas Reales
      ctx.fillStyle = '#ff4d6d';
      if (flap) {
        ctx.fillRect(px - 5, py - 4, 6, 8);
        ctx.fillRect(px + 11, py - 4, 6, 8);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(px - 3, py - 2, 2, 3);
        ctx.fillRect(px + 13, py - 2, 2, 3);
      } else {
        ctx.fillRect(px - 4, py + 1, 5, 6);
        ctx.fillRect(px + 11, py + 1, 5, 6);
      }
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 2, py, 8, 10);
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + 4, py + 2, 4, 6);
      return;
    }

    ctx.fillStyle = '#d00000';
    if (flap) {
      ctx.fillRect(px - 6, py - 4, 6, 7);
      ctx.fillRect(px + 12, py - 4, 6, 7);
    } else {
      ctx.fillRect(px - 6, py + 2, 6, 6);
      ctx.fillRect(px + 12, py + 2, 6, 6);
    }

    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py, 12, 10);
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 2, py + 2, 8, 6);

    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 3, py + 3, 2, 2);
    ctx.fillRect(px + 7, py + 3, 2, 2);
  }

  // Variante 3: Sapo Volcánico Saltarín (Lava Hopper - Da grandes saltos y escupe chispas)
SpriteManager.prototype.drawLavaHopper = function(ctx, x, y, facingRight, inAir, frame) {
    const px = Math.round(x);
    const py = Math.round(y);

    // Contorno negro
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py + (inAir ? 0 : 3), 18, inAir ? 16 : 13);

    // Cuerpo anfibio de magma carmesí y panza amarilla
    ctx.fillStyle = '#9d0208';
    ctx.fillRect(px + 2, py + 4, 14, 10);
    ctx.fillStyle = '#ffbe0b';
    ctx.fillRect(px + 4, py + 9, 10, 4);

    // Pústulas incandescentes en la espalda
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 4, py + 3, 4, 3);
    ctx.fillRect(px + 10, py + 3, 4, 3);

    // Ojo saltones
    const ex = facingRight ? px + 12 : px + 3;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ex, py + 1, 4, 4);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(facingRight ? ex + 2 : ex, py + 2, 2, 2);

    // Patas estiradas al saltar o encogidas en el suelo
    ctx.fillStyle = '#6a040f';
    if (inAir) {
      ctx.fillRect(px + 1, py + 14, 4, 5);
      ctx.fillRect(px + 13, py + 14, 4, 5);
    } else {
      ctx.fillRect(px - 1, py + 12, 5, 4);
      ctx.fillRect(px + 14, py + 12, 5, 4);
    }
  }

  // Variante 4: Espíritu Orbital de Ceniza y Fuego (Flame Wisp - Flota en círculos)
SpriteManager.prototype.drawFlameWisp = function(ctx, x, y, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    const flicker = Math.floor(frame * 0.35) % 2;

    // Halo circular suave (sin bloques cuadrados)
    const grad = ctx.createRadialGradient(px + 7, py + 5, 1, px + 7, py + 5, 13);
    grad.addColorStop(0, 'rgba(255, 120, 0, 0.45)');
    grad.addColorStop(1, 'rgba(255, 84, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px + 7, py + 5, 13, 0, Math.PI * 2);
    ctx.fill();

    // Llama exterior violeta/carmesí y núcleo dorado
    ctx.fillStyle = '#d00000';
    ctx.fillRect(px + 2, py - 2 - flicker, 10, 14 + flicker);
    ctx.fillRect(px, py + 2, 14, 9);
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 2, py + 1, 10, 9);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 4, py + 3, 6, 6);

    // Ojos oscuros de espíritu
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 4, py + 5, 2, 3);
    ctx.fillRect(px + 8, py + 5, 2, 3);
  }

  // Variante 5: Gólem Acorazado de Obsidiana (Obsidian Brute - Élite de 2 Golpes con Dash)
SpriteManager.prototype.drawObsidianBrute = function(ctx, x, y, facingRight, hp, maxHp, hitFlash, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    const step = Math.floor(frame * 0.16) % 2;

    // Barra de 2 vidas sobre el Gólem
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 1, py - 9, 20, 5);
    for (let i = 0; i < maxHp; i++) {
      ctx.fillStyle = i < hp ? '#ff5400' : '#3b2d54';
      ctx.fillRect(px + 2 + i * 9, py - 8, 8, 3);
    }

    // Cuerpo pesado de obsidiana negra con bordes morados y grietas de magma
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 1, py, 24, 22);
    ctx.fillStyle = hitFlash ? '#ffffff' : '#241934';
    ctx.fillRect(px + 1, py + 2, 20, 17);

    // Hombreras y grietas de lava en el pecho
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 3, py + 5, 16, 3);
    ctx.fillRect(px + 8, py + 8, 6, 7);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 9, py + 6, 4, 4);

    // Visor de ojo ardiente
    const visorX = facingRight ? px + 11 : px + 4;
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(visorX, py + 3, 6, 2);

    // Pies pesados
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 2, py + 19 + step, 7, 4);
    ctx.fillRect(px + 13, py + 20 - step, 7, 4);
  }

  // Variante 6: Gusano / Serpiente de Magma (Magma Worm - Salta verticalmente de las grietas)
SpriteManager.prototype.drawMagmaWorm = function(ctx, x, y, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    const wave = Math.round(Math.sin(frame * 0.25) * 2);

    // Segmentos articulados de lava
    for (let s = 0; s < 3; s++) {
      const sx = px + (s % 2 === 0 ? wave : -wave);
      const sy = py + s * 6;
      ctx.fillStyle = '#14101c';
      ctx.fillRect(sx, sy, 12, 7);
      ctx.fillStyle = s === 0 ? '#ff5400' : '#d00000';
      ctx.fillRect(sx + 1, sy + 1, 10, 5);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(sx + 3, sy + 2, 4, 2);
    }
    // Mandíbulas superiores
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 2, py - 2, 2, 2);
    ctx.fillRect(px + 8, py - 2, 2, 2);
  }


// --- MÓDULO: src/sprites/enemies/coastal.js ---
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


// --- MÓDULO: src/sprites/enemies/marine.js ---
// ============================================================================
// SPRITES MUNDO 3: ENEMIGOS MARINOS DEL MEGATSUNAMI (PIXEL ART)
// ============================================================================

function drawElectricJellyfish(ctx, x, y, frame) {
  const px = Math.round(x);
  const py = Math.round(y);
  const pulse = Math.sin(frame * 0.15) * 2;

  // Campana de la medusa con brillo translúcido turquesa
  ctx.fillStyle = '#005f73';
  ctx.fillRect(px + 2, py - 4 + pulse, 12, 9);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 3, py - 3 + pulse, 10, 7);
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px + 4, py - 2 + pulse, 8, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 6, py - 1 + pulse, 4, 2);

  // Tentáculos eléctricos ondulantes
  const tentBob = Math.sin(frame * 0.2) * 2;
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 3, py + 5 + pulse, 2, 7 + tentBob);
  ctx.fillRect(px + 7, py + 5 + pulse, 2, 9 - tentBob);
  ctx.fillRect(px + 11, py + 5 + pulse, 2, 7 + tentBob);

  // Chispas de energía bioeléctrica dorada
  if (frame % 16 < 8) {
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 1, py + 2 + pulse, 2, 2);
    ctx.fillRect(px + 13, py + 6 + pulse, 2, 2);
  }
}

function drawTsunamiShark(ctx, x, y, facingRight, frame) {
  const px = Math.round(x);
  const py = Math.round(y);
  const swimBob = Math.sin(frame * 0.2 + x * 0.1) * 2;

  // Espuma del corte en el agua turquesa
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 4, py + 8, 24, 3);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 2, py + 6, 18, 2);

  // Gran aleta dorsal triangular en azul marino / pizarra
  ctx.fillStyle = '#0b132b';
  ctx.fillRect(px + 4, py - 4 + swimBob, 7, 12);
  ctx.fillStyle = '#1c2541';
  ctx.fillRect(px + 5, py - 3 + swimBob, 5, 10);
  ctx.fillStyle = '#3a506b';
  ctx.fillRect(px + 6, py - 1 + swimBob, 3, 6);

  // Mandíbula y cuerpo sumergido
  ctx.fillStyle = '#0b132b';
  ctx.fillRect(px, py + 4 + swimBob, 16, 6);
  ctx.fillStyle = '#e63946';
  ctx.fillRect(px + (facingRight ? 12 : 2), py + 5 + swimBob, 3, 2); // Ojo hostil
  // Dientes afilados blancos
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + (facingRight ? 10 : 2), py + 8 + swimBob, 2, 2);
  ctx.fillRect(px + (facingRight ? 13 : 5), py + 8 + swimBob, 2, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawElectricJellyfish = drawElectricJellyfish;
  SpriteManager.prototype.drawTsunamiShark = drawTsunamiShark;
}

if (typeof module !== 'undefined') {
  module.exports = { drawElectricJellyfish, drawTsunamiShark };
}


// --- MÓDULO: src/sprites/enemies/space.js ---
// ============================================================================
// SPRITES MUNDO 4: ENEMIGOS ESPACIALES Y SONDAS ORBITALES (PIXEL ART)
// ============================================================================

function drawSpaceDrone(ctx, x, y, facingRight, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  const hover = Math.round(Math.sin(frame * 0.2 + x * 0.1) * 2);

  // Orugas o patines magnéticos
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px, py + 10, 18, 4);
  ctx.fillStyle = '#3b0820';
  ctx.fillRect(px + 2, py + 11, 14, 2);

  // Chasis blindado angular
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px + 2, py + 2 + hover, 14, 9);
  ctx.fillStyle = '#120415';
  ctx.fillRect(px + 3, py + 3 + hover, 12, 7);

  // Lente visor óptico hostil
  const eyeX = facingRight ? px + 10 : px + 3;
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(eyeX, py + 4 + hover, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(facingRight ? eyeX + 2 : eyeX, py + 5 + hover, 2, 2);

  // Antena superior parpadeante
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 8, py - 3 + hover, 2, 5);
  if (frame % 16 < 8) {
    ctx.fillStyle = '#ffcad4';
    ctx.fillRect(px + 7, py - 4 + hover, 4, 2);
  }
}

function drawSpaceProbe(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  const floatBob = Math.round(Math.sin(frame * 0.15 + x * 0.2) * 3);

  // Cuerpo central octogonal de la sonda
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px + 4, py - 4 + floatBob, 12, 12);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 5, py - 3 + floatBob, 10, 10);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(px + 8, py + floatBob, 4, 4); // Núcleo de energía

  // Paneles solares laterales desplegados
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px - 6, py - 1 + floatBob, 10, 6);
  ctx.fillRect(px + 16, py - 1 + floatBob, 10, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 5, py + floatBob, 8, 4);
  ctx.fillRect(px + 17, py + floatBob, 8, 4);

  // Pulsos de telemetría y datos cósmicos
  if (frame % 20 < 10) {
    ctx.fillStyle = '#ffcad4';
    ctx.fillRect(px + 9, py - 7 + floatBob, 2, 2);
    ctx.fillRect(px + 9, py + 9 + floatBob, 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSpaceDrone = drawSpaceDrone;
  SpriteManager.prototype.drawSpaceProbe = drawSpaceProbe;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSpaceDrone, drawSpaceProbe };
}


// --- MÓDULO: src/sprites/enemies/snow.js ---
// ============================================================================
// SPRITES MUNDO 4: ENEMIGOS ÁRTICOS Y DE ALTA MONTAÑA (PIXEL ART)
// ============================================================================
// 1. Frost Crawler: Oruga acorazada de hielo glacial con espinas de escarcha.
// 2. Frost Flier: Criatura alada de cristal de hielo que acecha en las alturas.

function drawFrostCrawler(ctx, x, y, facingRight, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const step = Math.floor(frame * 0.25) % 2;

  // 1. Sombra bajo la oruga helada
  ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
  ctx.beginPath();
  ctx.ellipse(px + 10, py + 14, 9, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Patitas articuladas de hielo
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 2 + step, py + 12, 3, 3);
  ctx.fillRect(px + 7 - step, py + 12, 3, 3);
  ctx.fillRect(px + 12 + step, py + 12, 3, 3);
  ctx.fillRect(px + 16 - step, py + 12, 3, 3);

  // 3. Segmentos del caparazón blindado de hielo ártico
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py + 2, 20, 11);
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px + 1, py + 3, 18, 9);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 2, py + 4, 16, 7);
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px + 3, py + 5, 14, 5);

  // 4. Espinas afiladas de cristal de hielo en el lomo
  const spikes = [
    { x: px + 3, h: 5 },
    { x: px + 7, h: 7 },
    { x: px + 11, h: 8 },
    { x: px + 15, h: 6 }
  ];

  for (const sp of spikes) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(sp.x - 2, py + 3);
    ctx.lineTo(sp.x, py + 3 - sp.h);
    ctx.lineTo(sp.x + 2, py + 3);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(sp.x - 1, py + 3 - sp.h + 2, 1, sp.h - 2);
  }

  // 5. Ojos helados brillantes
  const eyeX = facingRight ? px + 14 : px + 3;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(eyeX, py + 6, 3, 3);
  ctx.fillStyle = '#00f5d4';
  ctx.fillRect(facingRight ? eyeX + 1 : eyeX, py + 7, 2, 2);

  // Mandíbulas gélidas
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(facingRight ? px + 18 : px - 1, py + 9, 3, 2);
}

function drawFrostFlier(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const bob = Math.round(Math.sin(frame * 0.16 + x * 0.1) * 2.5);
  const flap = Math.floor(frame * 0.35) % 2 === 0;

  // 1. Núcleo central de hielo y cristal glacial
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 4, py + 1 + bob, 12, 12);
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px + 5, py + 2 + bob, 10, 10);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 6, py + 3 + bob, 8, 8);
  ctx.fillStyle = '#90e0ef';
  ctx.fillRect(px + 8, py + 5 + bob, 4, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 9, py + 6 + bob, 2, 2);

  // 2. Alas de cristales de hielo translucidos
  ctx.fillStyle = 'rgba(202, 240, 248, 0.88)';
  if (flap) {
    // Alas levantadas
    ctx.beginPath();
    ctx.moveTo(px + 4, py + 4 + bob);
    ctx.lineTo(px - 5, py - 6 + bob);
    ctx.lineTo(px - 1, py + 8 + bob);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 16, py + 4 + bob);
    ctx.lineTo(px + 25, py - 6 + bob);
    ctx.lineTo(px + 21, py + 8 + bob);
    ctx.closePath();
    ctx.fill();

    // Bordes brillantes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 4, py - 5 + bob, 3, 2);
    ctx.fillRect(px + 21, py - 5 + bob, 3, 2);
  } else {
    // Alas batidas hacia abajo
    ctx.beginPath();
    ctx.moveTo(px + 4, py + 6 + bob);
    ctx.lineTo(px - 6, py + 14 + bob);
    ctx.lineTo(px + 2, py + 9 + bob);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 16, py + 6 + bob);
    ctx.lineTo(px + 26, py + 14 + bob);
    ctx.lineTo(px + 18, py + 9 + bob);
    ctx.closePath();
    ctx.fill();

    // Bordes brillantes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 4, py + 11 + bob, 3, 2);
    ctx.fillRect(px + 21, py + 11 + bob, 3, 2);
  }

  // 3. Ojos brillantes de ventisca
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 6, py + 5 + bob, 2, 2);
  ctx.fillRect(px + 12, py + 5 + bob, 2, 2);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(px + 7, py + 6 + bob, 1, 1);
  ctx.fillRect(px + 13, py + 6 + bob, 1, 1);

  // 4. Carámbanos inferiores colgantes
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 7, py + 13 + bob, 2, 3);
  ctx.fillRect(px + 11, py + 13 + bob, 2, 4);
}

// 3. Escarabajo Sagrado de Lapislázuli del Monte Kailash (Pixel Art)
function drawKailashScarab(ctx, x, y, facingRight, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const step = Math.floor(frame * 0.22) % 2;

  // Sombra
  ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
  ctx.beginPath();
  ctx.ellipse(px + 10, py + 14, 9, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Patitas doradas articuladas
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + 2 + step, py + 12, 3, 3);
  ctx.fillRect(px + 7 - step, py + 12, 3, 3);
  ctx.fillRect(px + 12 + step, py + 12, 3, 3);
  ctx.fillRect(px + 16 - step, py + 12, 3, 3);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px + 3 + step, py + 13, 1, 2);
  ctx.fillRect(px + 8 - step, py + 13, 1, 2);
  ctx.fillRect(px + 13 + step, py + 13, 1, 2);
  ctx.fillRect(px + 17 - step, py + 13, 1, 2);

  // Caparazón acorazado de lapislázuli ultramarino
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py + 2, 20, 11);
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(px + 1, py + 3, 18, 9);
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(px + 2, py + 4, 16, 7);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 3, py + 5, 14, 4);

  // Veta ceremonial dorada en el lomo
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px + 6, py + 4, 8, 2);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px + 7, py + 4, 6, 1);
  ctx.fillRect(px + 9, py + 2, 2, 8);

  // Gema astral en el centro del lomo pulsante
  const pulse = Math.sin(frame * 0.14) * 0.3 + 0.7;
  ctx.fillStyle = 'rgba(254, 240, 138, ' + pulse.toFixed(2) + ')';
  ctx.fillRect(px + 9, py + 5, 2, 2);

  // Ojos sagrados de esmeralda celestial
  const eyeX = facingRight ? px + 15 : px + 2;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(eyeX, py + 6, 3, 3);
  ctx.fillStyle = '#10b981';
  ctx.fillRect(facingRight ? eyeX + 1 : eyeX, py + 7, 2, 2);

  // Pinzas rituales doradas
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(facingRight ? px + 18 : px - 1, py + 8, 3, 2);
  ctx.fillRect(facingRight ? px + 19 : px - 2, py + 7, 1, 1);
}

// 4. Guardián Cristalino de Agartha (Autómata Sagrado de Cuarzo y Amatista)
function drawAgarthaSentinel(ctx, x, y, facingRight, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const step = Math.floor(frame * 0.2) % 2;

  // Sombra mística
  ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
  ctx.beginPath();
  ctx.ellipse(px + 10, py + 14, 9, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Extremidades de cuarzo y mármol
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 2 + step, py + 12, 3, 3);
  ctx.fillRect(px + 8 - step, py + 12, 3, 3);
  ctx.fillRect(px + 14 + step, py + 12, 3, 3);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px + 3 + step, py + 13, 1, 2);
  ctx.fillRect(px + 9 - step, py + 13, 1, 2);
  ctx.fillRect(px + 15 + step, py + 13, 1, 2);

  // Chasis angular de obsidiana estelar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 1, py + 3, 18, 10);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 2, py + 4, 16, 8);
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 3, py + 5, 14, 6);

  // Núcleo central de amatista radiante
  const aGlow = Math.sin(frame * 0.15) * 0.25 + 0.75;
  ctx.fillStyle = '#6b21a8';
  ctx.fillRect(px + 7, py + 6, 6, 5);
  ctx.fillStyle = 'rgba(192, 132, 252, ' + aGlow.toFixed(2) + ')';
  ctx.fillRect(px + 8, py + 7, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 9, py + 8, 2, 1);

  // Espinas dorsales de cuarzo azul levitantes
  const floatY = Math.sin(frame * 0.1) * 1.5;
  const crystals = [
    { x: px + 3, h: 6, c: '#38bdf8' },
    { x: px + 7, h: 8, c: '#c084fc' },
    { x: px + 12, h: 9, c: '#38bdf8' },
    { x: px + 16, h: 6, c: '#c084fc' }
  ];

  for (const c of crystals) {
    ctx.fillStyle = c.c;
    ctx.beginPath();
    ctx.moveTo(c.x - 2, py + 4 + floatY);
    ctx.lineTo(c.x, py + 4 - c.h + floatY);
    ctx.lineTo(c.x + 2, py + 4 + floatY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(c.x - 1, py + 4 - c.h + 2 + floatY, 1, c.h - 3);
  }

  // Visor estelar del autómata
  const visorX = facingRight ? px + 14 : px + 3;
  ctx.fillStyle = '#fde047';
  ctx.fillRect(visorX, py + 6, 3, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(facingRight ? visorX + 1 : visorX, py + 6, 1, 1);
}

// 5. Fénix Astral / Murciélago Cósmico de Agartha (Pixel Art)
function drawAstralFlier(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const bob = Math.round(Math.sin(frame * 0.15 + x * 0.08) * 3);
  const flap = Math.floor(frame * 0.28) % 2 === 0;

  // Estela de polvo estelar cósmico
  const tProg = (frame * 0.06) % 1;
  ctx.fillStyle = 'rgba(192, 132, 252, ' + (1 - tProg).toFixed(2) + ')';
  ctx.fillRect(px + 7 + Math.sin(frame * 0.2) * 3, py + 14 + bob + tProg * 8, 2, 2);
  ctx.fillStyle = 'rgba(56, 189, 248, ' + (1 - tProg).toFixed(2) + ')';
  ctx.fillRect(px + 11 - Math.sin(frame * 0.2) * 3, py + 14 + bob + tProg * 8, 2, 2);

  // Cuerpo romboidal de amatista y oro
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px + 6, py + 2 + bob, 8, 10);
  ctx.fillStyle = '#6b21a8';
  ctx.fillRect(px + 7, py + 3 + bob, 6, 8);
  ctx.fillStyle = '#a855f7';
  ctx.fillRect(px + 8, py + 4 + bob, 4, 6);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px + 9, py + 5 + bob, 2, 4);

  // Alas de aurora boreal (degradado cian, violeta y ámbar)
  if (flap) {
    // Alas alzadas
    ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
    ctx.beginPath();
    ctx.moveTo(px + 6, py + 5 + bob);
    ctx.lineTo(px - 6, py - 6 + bob);
    ctx.lineTo(px - 1, py + 9 + bob);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 14, py + 5 + bob);
    ctx.lineTo(px + 26, py - 6 + bob);
    ctx.lineTo(px + 21, py + 9 + bob);
    ctx.closePath();
    ctx.fill();

    // Borde de luz violeta
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px - 6, py - 6 + bob);
    ctx.lineTo(px + 6, py + 5 + bob);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px + 26, py - 6 + bob);
    ctx.lineTo(px + 14, py + 5 + bob);
    ctx.stroke();
  } else {
    // Alas extendidas hacia abajo
    ctx.fillStyle = 'rgba(192, 132, 252, 0.85)';
    ctx.beginPath();
    ctx.moveTo(px + 6, py + 5 + bob);
    ctx.lineTo(px - 7, py + 14 + bob);
    ctx.lineTo(px + 4, py + 11 + bob);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(px + 14, py + 5 + bob);
    ctx.lineTo(px + 27, py + 14 + bob);
    ctx.lineTo(px + 16, py + 11 + bob);
    ctx.closePath();
    ctx.fill();

    // Borde de luz cian
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(px - 7, py + 14 + bob);
    ctx.lineTo(px + 6, py + 5 + bob);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px + 27, py + 14 + bob);
    ctx.lineTo(px + 14, py + 5 + bob);
    ctx.stroke();
  }

  // Ojos dorados de halcón estelar
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 7, py + 5 + bob, 2, 2);
  ctx.fillRect(px + 11, py + 5 + bob, 2, 2);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px + 7, py + 6 + bob, 1, 1);
  ctx.fillRect(px + 12, py + 6 + bob, 1, 1);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawFrostCrawler = drawFrostCrawler;
  SpriteManager.prototype.drawFrostFlier = drawFrostFlier;
  SpriteManager.prototype.drawKailashScarab = drawKailashScarab;
  SpriteManager.prototype.drawAgarthaSentinel = drawAgarthaSentinel;
  SpriteManager.prototype.drawAstralFlier = drawAstralFlier;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawFrostCrawler,
    drawFrostFlier,
    drawKailashScarab,
    drawAgarthaSentinel,
    drawAstralFlier
  };
}


// --- MÓDULO: src/sprites/environment/checkpoints.js ---
// ============================================================================
// ELEMENTOS DE ENTORNO: CHECKPOINTS, PORTALES Y GÉISERES
// ============================================================================
SpriteManager.prototype.drawPortal = function(ctx, x, y, frame, scale = 1) {
    if (scale <= 0.01) return;
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.scale(scale, scale);

    // 1. Resplandor volumétrico exterior en Rosado Oscuro y aura pulsante
    const auraPulse = Math.sin(frame * 0.12) * 3;
    const auraRx = 28 + auraPulse;
    const auraRy = 38 + auraPulse * 1.3;
    const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, auraRy);
    grad.addColorStop(0, 'rgba(255, 42, 110, 0.72)');
    grad.addColorStop(0.32, 'rgba(180, 24, 76, 0.42)');
    grad.addColorStop(0.68, 'rgba(74, 8, 32, 0.18)');
    grad.addColorStop(1, 'rgba(10, 2, 8, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, auraRx, auraRy, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Ondas de choque dimensionales saliendo del núcleo (Shockwave Rings)
    for (let r = 0; r < 2; r++) {
      const ringProg = ((frame * 0.038 + r * 0.5) % 1);
      const ringW = 16 * ringProg + 3;
      const ringH = 26 * ringProg + 4;
      const ringAlpha = (1 - ringProg) * 0.6;
      ctx.save();
      ctx.strokeStyle = `rgba(255, 143, 171, ${ringAlpha})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.ellipse(0, 0, ringW, ringH, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 3. Silueta orgánica exterior ondulante (Tear in Space-Time)
    const numPoints = 18;
    const baseRx = 14;
    const baseRy = 23;

    // Capa 1: Borde exterior profundo negro obsidiana/vino
    ctx.beginPath();
    for (let i = 0; i <= numPoints; i++) {
      const ang = (i / numPoints) * Math.PI * 2;
      const wobble = Math.sin(ang * 4 + frame * 0.14) * 1.8 + Math.cos(ang * 3 - frame * 0.18) * 1.2;
      const vx = Math.cos(ang) * (baseRx + 2.5 + wobble);
      const vy = Math.sin(ang) * (baseRy + 3.2 + wobble * 1.25);
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();
    ctx.fillStyle = '#1a040f';
    ctx.fill();

    // Capa 2: Manto rosado oscuro profundo
    ctx.beginPath();
    for (let i = 0; i <= numPoints; i++) {
      const ang = (i / numPoints) * Math.PI * 2;
      const wobble = Math.sin(ang * 4 + frame * 0.14) * 1.4 + Math.cos(ang * 3 - frame * 0.18) * 0.9;
      const vx = Math.cos(ang) * (baseRx + wobble);
      const vy = Math.sin(ang) * (baseRy + wobble * 1.2);
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();
    ctx.fillStyle = '#7a1038';
    ctx.fill();

    // Capa 3: Plasma interior rosado magenta vibrante
    ctx.beginPath();
    for (let i = 0; i <= numPoints; i++) {
      const ang = (i / numPoints) * Math.PI * 2;
      const wobble = Math.sin(ang * 3 - frame * 0.16) * 1.1;
      const vx = Math.cos(ang) * (baseRx * 0.78 + wobble);
      const vy = Math.sin(ang) * (baseRy * 0.78 + wobble * 1.2);
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.closePath();
    ctx.fillStyle = '#d92568';
    ctx.fill();

    // 4. Brazos de Vórtice en Espiral Fluida (Blanco Puro y Rosado Claro)
    const arms = 3;
    ctx.save();
    for (let a = 0; a < arms; a++) {
      const baseAng = frame * 0.15 + (a * (Math.PI * 2 / arms));
      ctx.beginPath();
      for (let step = 0; step < 11; step++) {
        const t = step / 10;
        const armAng = baseAng + t * 2.3;
        const armR = (t * baseRx * 0.74);
        const ax = Math.cos(armAng) * armR;
        const ay = Math.sin(armAng) * armR * 1.45;
        if (step === 0) ctx.moveTo(ax, ay);
        else ctx.lineTo(ax, ay);
      }
      ctx.strokeStyle = a % 2 === 0 ? '#ffffff' : '#ff75a0';
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.restore();

    // 5. Núcleo de Singularidad Cósmica (Centro palpitante negro vacío y blanco puro)
    const coreWobbleX = Math.sin(frame * 0.24) * 1.4;
    const coreWobbleY = Math.cos(frame * 0.20) * 1.8;
    const corePulse = Math.sin(frame * 0.28) * 1.2;

    ctx.fillStyle = '#ff2a70';
    ctx.beginPath();
    ctx.ellipse(coreWobbleX, coreWobbleY, 5.5 + corePulse, 8.5 + corePulse * 1.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Centro blanco puro brillante
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(coreWobbleX, coreWobbleY, 3 + corePulse * 0.6, 5 + corePulse * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // 6. Chispas y Arcos de Plasma Orbitando el Portal
    const sparkCount = 7;
    for (let i = 0; i < sparkCount; i++) {
      const spkAng = frame * (0.09 + (i % 3) * 0.03) + (i * Math.PI * 2 / sparkCount);
      const orbitRx = baseRx + 3 + Math.sin(frame * 0.2 + i) * 2.5;
      const orbitRy = baseRy + 4 + Math.cos(frame * 0.2 + i) * 3;
      const sx = Math.cos(spkAng) * orbitRx;
      const sy = Math.sin(spkAng) * orbitRy;

      const isStar = (i + Math.floor(frame * 0.1)) % 3 === 0;
      if (isStar) {
        this.drawSparkleStar(ctx, Math.round(sx), Math.round(sy), 2.2, '#ffffff');
      } else {
        ctx.fillStyle = (i % 2 === 0) ? '#ff8fab' : '#ffffff';
        ctx.beginPath();
        ctx.arc(Math.round(sx), Math.round(sy), 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  };

SpriteManager.prototype.drawGeyser = function(ctx, g, frame, isGarden = false) {
    const px = Math.round(g.x);
    const py = Math.round(g.y);

    if (g.isCosmic || (typeof level !== 'undefined' && level && level.id === 4 && g.x >= 33000)) {
      // ✨ Vórtice de Polvo Estelar / Fuente Cósmica del Firmamento (Mundo 4 Fase 9)
      // 1. Pedestal astral de obsidiana y oro celestial
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(px - 3, py - 4, g.w + 6, 5);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(px - 1, py - 6, g.w + 2, 3);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px - 3, py - 7, g.w + 6, 2);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(px + 4, py - 8, g.w - 8, 2);

      // 2. Columna de energía luminosa translúcida
      const grad = ctx.createLinearGradient(0, py - g.boostHeight, 0, py);
      grad.addColorStop(0, 'rgba(0, 245, 212, 0.05)');
      grad.addColorStop(0.5, 'rgba(114, 9, 183, 0.22)');
      grad.addColorStop(1, 'rgba(0, 245, 212, 0.45)');
      ctx.fillStyle = grad;
      ctx.fillRect(px, py - g.boostHeight, g.w, g.boostHeight);

      // 3. Estrellas y polvo cósmico ascendiendo en espiral
      for (let i = 0; i < 7; i++) {
        const offset = ((frame * 2.4 + i * 20) % g.boostHeight);
        const wy = py - 8 - offset;
        const sway = Math.round(Math.sin(frame * 0.12 + i * 1.2) * 5);
        const alpha = Math.max(0.2, 1 - offset / g.boostHeight);

        // Estrellas titilantes
        ctx.fillStyle = (i % 2 === 0) ? `rgba(255, 209, 102, ${alpha.toFixed(2)})` : `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        ctx.fillRect(px + 4 + ((i * 6) % (g.w - 8)) + sway, Math.round(wy), 3, 3);

        // Chispas turquesas cruzadas
        if (i % 3 === 0) {
          ctx.fillStyle = `rgba(0, 245, 212, ${(alpha * 0.9).toFixed(2)})`;
          ctx.fillRect(px + 5 + ((i * 4) % (g.w - 10)) - sway, Math.round(wy) - 2, 2, 5);
          ctx.fillRect(px + 3 + ((i * 4) % (g.w - 10)) - sway, Math.round(wy), 5, 2);
        }
      }

      // 4. Anillo de energía boreal en la base
      const pulse = Math.sin(frame * 0.2) * 2;
      ctx.strokeStyle = '#00f5d4';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 2 - pulse, py - 9, g.w - 4 + pulse * 2, 3);
      return;
    }

    if (isGarden || g.isGarden) {
      // 🌸 Flor de Brisa Mágica del Jardín (Hojas esmeralda, corola rosada y pétalos flotando hacia arriba)
      ctx.fillStyle = '#1b4332';
      ctx.fillRect(px - 2, py - 4, g.w + 4, 5);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px, py - 5, 8, 4);
      ctx.fillRect(px + g.w - 8, py - 5, 8, 4);
      // Pétalos de la flor impulsora
      ctx.fillStyle = '#ff8fab';
      ctx.fillRect(px + 5, py - 7, g.w - 10, 5);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(px + 9, py - 6, g.w - 18, 3);

      // Pétalos rosados y hojas verdes subiendo en espiral con la brisa
      for (let i = 0; i < 6; i++) {
        const offset = ((frame * 1.9 + i * 18) % g.boostHeight);
        const wy = py - 8 - offset;
        const sway = Math.round(Math.sin(frame * 0.1 + i) * 3);
        const alpha = Math.max(0.15, 1 - offset / g.boostHeight);
        ctx.fillStyle = i % 2 === 0
          ? `rgba(255, 143, 171, ${(alpha * 0.75).toFixed(2)})`
          : `rgba(149, 213, 178, ${(alpha * 0.7).toFixed(2)})`;
        ctx.fillRect(px + 4 + ((i * 5) % (g.w - 8)) + sway, Math.round(wy), 4, 4);
      }
      return;
    }

    // Base de cráter pequeño en el suelo (Mundo 2 Volcán)
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 2, py - 5, g.w + 4, 6);
    ctx.fillStyle = '#ff5400';
    ctx.fillRect(px + 2, py - 4, g.w - 4, 4);

    // Columnas de vapor / aire caliente subiendo
    for (let i = 0; i < 6; i++) {
      const offset = ((frame * 2.2 + i * 18) % g.boostHeight);
      const wy = py - 6 - offset;
      const alpha = Math.max(0.1, 1 - offset / g.boostHeight);
      ctx.fillStyle = `rgba(255, 209, 102, ${(alpha * 0.55).toFixed(2)})`;
      ctx.fillRect(px + 3 + ((i * 5) % (g.w - 8)), Math.round(wy), 4, 8);
    }
  }

  // Dibuja una Piedra de Lava / Magma ardiente
SpriteManager.prototype.drawMagmaRock = function(ctx, x, y, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 5, py - 5, 10, 10);
    ctx.fillStyle = '#370617';
    ctx.fillRect(px - 4, py - 4, 8, 8);
    // Grietas de magma incandescente
    ctx.fillStyle = Math.floor(frame / 4) % 2 === 0 ? '#ff5400' : '#ffd166';
    ctx.fillRect(px - 2, py - 3, 4, 2);
    ctx.fillRect(px - 3, py, 5, 2);
    ctx.fillRect(px, py + 2, 2, 2);
  }

  // Dibuja un Checkpoint (Santuario Floral del Lirio en Mundo 1 o Cristal Volcánico en Mundo 2)
SpriteManager.prototype.drawCheckpoint = function(ctx, x, y, active, frame, isGarden = false) {
    const px = Math.round(x);
    const py = Math.round(y);

    if (isGarden) {
      if (active) {
        const pulse = Math.sin(frame * 0.12) * 3;
        const r = 24 + pulse;
        const grad = ctx.createRadialGradient(px + 8, py - 15, 2, px + 8, py - 15, r);
        grad.addColorStop(0, 'rgba(149, 213, 178, 0.45)');
        grad.addColorStop(1, 'rgba(149, 213, 178, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px + 8, py - 15, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Pedestal de mármol blanco con musgo esmeralda
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px - 1, py - 7, 18, 7);
      ctx.fillStyle = '#d8e2dc';
      ctx.fillRect(px + 1, py - 6, 14, 5);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 2, py - 6, 12, 2);
      // Tallo y hojas del Gran Lirio de Guardado
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(px + 7, py - 20, 3, 13);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(px + 3, py - 14, 4, 3);
      ctx.fillRect(px + 10, py - 16, 4, 3);
      // Flor del Lirio Sagrado (cerrada en gris lavanda, abierta blanca y carmesí al activarse)
      ctx.fillStyle = '#14101c';
      ctx.fillRect(px + 3, py - 27, 11, 9);
      ctx.fillStyle = active ? '#ffffff' : '#6c757d';
      ctx.fillRect(px + 4, py - 26, 9, 7);
      ctx.fillStyle = active ? '#ff2a55' : '#3b2d54';
      ctx.fillRect(px + 7, py - 24, 3, 4);
      if (active) {
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(px + 8, py - 25, 1, 2);
      }
      return;
    }

    if (active) {
      const pulse = Math.sin(frame * 0.12) * 3;
      const r = 22 + pulse;
      const grad = ctx.createRadialGradient(px + 8, py - 14, 2, px + 8, py - 14, r);
      grad.addColorStop(0, 'rgba(0, 245, 212, 0.42)');
      grad.addColorStop(1, 'rgba(0, 245, 212, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px + 8, py - 14, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pedestal de piedra
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py - 6, 16, 6);
    ctx.fillStyle = '#4a4e69';
    ctx.fillRect(px + 2, py - 5, 12, 4);

    // Cristal central
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 4, py - 24, 8, 18);
    ctx.fillStyle = active ? '#00f5d4' : '#3b2d54';
    ctx.fillRect(px + 5, py - 22, 6, 15);
    if (active) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 6, py - 20, 2, 10);
    }
  };



// --- MÓDULO: src/sprites/environment/interactive.js ---
// ============================================================================
// ELEMENTOS INTERACTIVOS: NPCS, PADS DE COLORES, FAROLES Y LIRIOS
// ============================================================================
SpriteManager.prototype.drawNPC = function(ctx, x, y, npc, frame, isGarden = false) {
    const px = Math.round(x);
    const py = Math.round(y);

    if (npc.questNpc === 'hotdogs' || npc.name === 'Don Pancho') {
      const q = typeof getHotdogQuest === 'function' ? getHotdogQuest() : null;
      const fate = q ? q.fate : null;
      if (typeof drawHotdogCart === 'function') drawHotdogCart(ctx, px - 18, py + 2, frame);
      if (typeof drawDonPancho === 'function') drawDonPancho(ctx, px + 8, py, fate, frame);
      if (!fate) {
        const iconBob = Math.round(Math.sin(frame * 0.1 + x) * 1.5);
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(px + 9, py - 18 + iconBob, 6, 4);
        ctx.fillStyle = '#14101c';
        ctx.fillRect(px + 10, py - 17 + iconBob, 1, 1);
        ctx.fillRect(px + 13, py - 17 + iconBob, 1, 1);
      }
      return;
    }

    if (npc.isBaby || npc.name === 'Hijo Ratoncito') {
      if (typeof this.drawBabyMouse === 'function') {
        this.drawBabyMouse(ctx, px, py - 6, frame, 3);
        return;
      }
    }

    const bob = Math.floor(Math.sin(frame * 0.08 + x) * 1);

    // Sombra
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(px + 1, py + 16, 14, 2);

    // Orejitas de ratón NPC
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 1, py - 2 + bob, 4, 4);
    ctx.fillRect(px + 11, py - 2 + bob, 4, 4);
    ctx.fillStyle = npc.color || '#d8e2dc';
    ctx.fillRect(px + 2, py - 1 + bob, 2, 2);
    ctx.fillRect(px + 12, py - 1 + bob, 2, 2);

    // Cuerpo de ratoncito aldeano / jardinero / explorador
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 2, py + 2 + bob, 12, 15);
    ctx.fillStyle = npc.color || '#d8e2dc';
    ctx.fillRect(px + 3, py + 3 + bob, 10, 13);

    // Sombrero de paja/flor para el Jardín o Casco de minero para el Volcán
    ctx.fillStyle = npc.hatColor || '#ffb703';
    ctx.fillRect(px + 1, py + bob, 14, 4);
    if (isGarden || npc.gardenHat) {
      // Florcita decorativa en el sombrero del Jardín
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 6, py - 2 + bob, 4, 2);
      ctx.fillStyle = '#ff2a55';
      ctx.fillRect(px + 7, py - 2 + bob, 2, 1);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px + 11, py + 1 + bob, 2, 2); // Linterna de casco en el Volcán
    }

    // Ojo y bigotito
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 10, py + 6 + bob, 2, 2);

    // Ranita posada sobre el sombrero de Raúl antes de entregársela a Elizabeth
    if (npc.name === 'Raúl' && (typeof saveState === 'undefined' || !saveState.raulQuest || saveState.raulQuest.state === 'NOT_STARTED')) {
      if (typeof drawFrogSprite === 'function') {
        drawFrogSprite(ctx, px + 8, py - 3 + bob, true, frame);
      }
    }
    // Indicador flotante discreto sobre el NPC ("💬")
    const iconBob = Math.round(Math.sin(frame * 0.1 + x) * 1.5);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 5, py - 9 + iconBob, 6, 4);
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 6, py - 8 + iconBob, 1, 1);
    ctx.fillRect(px + 9, py - 8 + iconBob, 1, 1);
  }


SpriteManager.prototype.drawColorPad = function(ctx, pad, isCurrentTarget, isActivated, isWrong, frame) {
    const px = Math.round(pad.x);
    const py = Math.round(pad.y);
    const pw = pad.w || 32;
    const ph = pad.h || 10;
    const cx = px + pw / 2;
    const cy = py - ph / 2;

    const rgb = pad.rgb || (pad.hex === '#ff0055' ? '255,0,85' : (pad.hex === '#0077b6' ? '0,119,182' : (pad.hex === '#2ec4b6' ? '46,196,182' : (pad.hex === '#ffd166' ? '255,209,102' : (pad.hex === '#9b5de5' ? '155,93,229' : (pad.hex === '#ff7b00' ? '255,123,0' : '255,255,255'))))));
    const gemColor = isWrong ? '#ff0033' : (isActivated ? '#ffd166' : pad.hex);
    const glowColor = isWrong ? '#ff758f' : (isActivated ? '#fff3b0' : (pad.glowHex || pad.hex));
    const padLabel = pad.label || pad.colorName || '';

    // --- 1. AURA RADIANTE INTENSA (Visible a gran distancia en todo momento) ---
    const ambPulse = Math.sin(frame * 0.14 + px * 0.05) * 2;
    const ambRad = isCurrentTarget ? 38 : (isActivated ? 24 : 18 + ambPulse);
    const ambGrad = ctx.createRadialGradient(cx, cy - 4, 3, cx, cy - 4, ambRad);
    if (isActivated) {
      ambGrad.addColorStop(0, 'rgba(255, 209, 102, 0.65)');
      ambGrad.addColorStop(0.5, 'rgba(0, 245, 212, 0.25)');
      ambGrad.addColorStop(1, 'rgba(0,0,0,0)');
    } else if (isCurrentTarget) {
      ambGrad.addColorStop(0, `rgba(${rgb}, 0.90)`);
      ambGrad.addColorStop(0.4, `rgba(${rgb}, 0.45)`);
      ambGrad.addColorStop(1, 'rgba(0,0,0,0)');
    } else {
      // Incluso en reposo emite un resplandor vivo de su color (NUNCA apagado ni invisible)
      ambGrad.addColorStop(0, `rgba(${rgb}, 0.58)`);
      ambGrad.addColorStop(0.6, `rgba(${rgb}, 0.22)`);
      ambGrad.addColorStop(1, 'rgba(0,0,0,0)');
    }
    ctx.fillStyle = ambGrad;
    ctx.beginPath();
    ctx.arc(cx, cy - 4, ambRad, 0, Math.PI * 2);
    ctx.fill();

    // --- 2. COLUMNA DE LUZ CELESTIAL / BEACON (Cuando es el objetivo activo a pisar) ---
    if (isCurrentTarget && !isActivated) {
      const beamH = 68;
      const beamGrad = ctx.createLinearGradient(0, py - ph - beamH, 0, py - ph);
      beamGrad.addColorStop(0, `rgba(${rgb}, 0)`);
      beamGrad.addColorStop(0.3, `rgba(${rgb}, 0.25)`);
      beamGrad.addColorStop(0.7, `rgba(${rgb}, 0.65)`);
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(px + 4, py - ph - beamH, pw - 8, beamH);

      // Partículas y destellos de luz orbitando el rayo
      for (let i = 0; i < 5; i++) {
        const sparkAng = frame * 0.16 + i * (Math.PI * 2 / 5);
        const spRadX = 16 + Math.sin(frame * 0.2 + i) * 3;
        const spRadY = 10 + Math.cos(frame * 0.2 + i) * 2;
        const spX = cx + Math.cos(sparkAng) * spRadX;
        const spY = cy - 8 + Math.sin(sparkAng) * spRadY;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(Math.round(spX) - 1, Math.round(spY) - 1, 2, 2);
        ctx.fillStyle = glowColor;
        ctx.fillRect(Math.round(spX), Math.round(spY), 1, 1);
      }

      // Flecha pixel art pulsante sobre el cristal objetivo (sin textos que saturen)
      const arrowBob = Math.round(Math.sin(frame * 0.2) * 3);
      const arrowY = py - ph - 14 + arrowBob;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 4, arrowY, 8, 2);
      ctx.fillRect(cx - 3, arrowY + 2, 6, 2);
      ctx.fillRect(cx - 2, arrowY + 4, 4, 2);
      ctx.fillRect(cx - 1, arrowY + 6, 2, 2);
    }

    // --- 3. PEDESTAL / ALTAR IMPERIAL DE MÁRMOL Y ORO ---
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 2, py - ph - 1, pw + 4, ph + 2);
    // Escalón inferior de mármol pulido
    ctx.fillStyle = '#2d1b4e';
    ctx.fillRect(px - 1, py - ph, pw + 2, ph);
    ctx.fillStyle = isActivated ? '#ffd166' : '#ffd166';
    ctx.fillRect(px, py - ph, pw, 2); // Moldura dorada superior
    // Zócalo de mármol
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(px + 2, py - ph + 2, pw - 4, ph - 2);
    ctx.fillStyle = '#dee2e6';
    ctx.fillRect(px + 3, py - ph + 4, pw - 6, ph - 4);

    // --- 4. GEMA / CRISTAL RECTANGULAR FACETADO ELEVADO ---
    // Sombra del cristal sobre el altar
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 3, py - ph - 6, pw - 6, 8);
    // Cuerpo vibrante de la gema con su color puro (siempre brillante, nunca oscuro)
    ctx.fillStyle = gemColor;
    ctx.fillRect(px + 4, py - ph - 5, pw - 8, 7);
    // Faceta iluminada superior
    ctx.fillStyle = glowColor;
    ctx.fillRect(px + 5, py - ph - 5, pw - 10, 3);
    // Destello blanco central estilo diamante
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + pw / 2 - 3, py - ph - 5, 6, 2);
    ctx.fillRect(px + pw / 2 - 1, py - ph - 6, 2, 4);

    // --- 5. INDICADOR CENTRAL: ✓ si completado, o inicial clara ---
    if (isActivated) {
      ctx.fillStyle = '#14101c';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('✓', cx, py - ph + 1);
      ctx.fillStyle = '#00f5d4';
      ctx.fillText('✓', cx, py - ph);
      ctx.textAlign = 'left';
    }
  }


SpriteManager.prototype.drawLantern = function(ctx, x, y, frame) {
    const px = Math.round(x);
    const py = Math.round(y);
    const r = 24 + Math.sin(frame * 0.15 + x) * 2;

    const grad = ctx.createRadialGradient(px + 4, py - 22, 2, px + 4, py - 22, r);
    grad.addColorStop(0, 'rgba(255, 209, 102, 0.34)');
    grad.addColorStop(0.55, 'rgba(252, 163, 17, 0.12)');
    grad.addColorStop(1, 'rgba(252, 163, 17, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px + 4, py - 22, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#14101c';
    ctx.fillRect(px + 2, py - 24, 4, 24);
    ctx.fillStyle = '#3b3355';
    ctx.fillRect(px + 3, py - 23, 2, 22);
    ctx.fillRect(px, py - 3, 8, 3);

    ctx.fillStyle = '#14101c';
    ctx.fillRect(px, py - 27, 8, 8);
    ctx.fillRect(px + 2, py - 29, 4, 2);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 2, py - 25, 4, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 3, py - 24, 2, 3);
  }

  // Dibuja un Lirio del Valle silvestre (guiño a Dexter)
SpriteManager.prototype.drawWildLily = function(ctx, x, y, sway) {
    const px = Math.round(x);
    const py = Math.round(y);
    const s = Math.round(sway);

    ctx.fillStyle = '#1e4d20';
    ctx.fillRect(px - 2, py - 5, 2, 5);
    ctx.fillStyle = '#409142';
    ctx.fillRect(px, py - 7, 2, 7);
    ctx.fillRect(px + 2, py - 5, 2, 5);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 1 + s, py - 9, 3, 2);
    ctx.fillRect(px + 3 + s, py - 7, 3, 2);
    ctx.fillStyle = '#d90429';
    ctx.fillRect(px + 2 + s, py - 10, 1, 1);
  }


// --- MÓDULO: src/sprites/environment/skyscraper_interior.js ---
// ============================================================================
// SPRITES: INTERIOR DEL RASCACIELOS (PRIMER PISO, LOBBY Y ASCENSOR)
// ============================================================================
// Paleta estricta: #07020a, #120415, #3b0820, #8f143c, #b31b52, #ff2a70, #ffcad4, #ffffff

function drawSkyscraperDoors(ctx, x, y, isOpen = false, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Portal monumental exterior en granito oscuro pulido y latón
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 10, py - 56, 52, 56);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 8, py - 54, 48, 54);

  // Pilares laterales de mármol con remates dorados
  ctx.fillStyle = '#d4a373';
  ctx.fillRect(px - 8, py - 52, 6, 52);
  ctx.fillRect(px + 34, py - 52, 6, 52);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 9, py - 54, 8, 3);
  ctx.fillRect(px + 33, py - 54, 8, 3);
  ctx.fillRect(px - 9, py - 3, 8, 3);
  ctx.fillRect(px + 33, py - 3, 8, 3);

  // 2. Marquesina voladiza y rótulo iluminado "TORRE CENTRAL"
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 14, py - 60, 60, 8);
  ctx.fillStyle = '#d4a373';
  ctx.fillRect(px - 12, py - 59, 56, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 14, py - 61, 60, 2);
  // Letras luminosas del cartel
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 4, py - 58, 40, 4);
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px - 2, py - 57, 36, 2);

  // 3. Ventana de espejo / tragaluz superior con luz interior cálida
  const interiorGlow = ctx.createLinearGradient(px, py - 46, px, py - 36);
  interiorGlow.addColorStop(0, '#ffd166');
  interiorGlow.addColorStop(1, 'rgba(255, 209, 102, 0.25)');
  ctx.fillStyle = interiorGlow;
  ctx.fillRect(px, py - 46, 32, 10);
  ctx.strokeStyle = '#d4a373';
  ctx.lineWidth = 1;
  ctx.strokeRect(px, py - 46, 32, 10);

  // 4. Panel LED indicador de acceso / cerradura biométrica
  ctx.fillStyle = isOpen ? '#06d6a0' : '#ffd166';
  ctx.fillRect(px + 4, py - 34, 24, 3);

  // 5. Puertas dobles corredizas de cristal templado tintado
  const slide = isOpen ? 12 : 0;
  // Fondo del vestíbulo visible a través del cristal
  ctx.fillStyle = '#1e1b18';
  ctx.fillRect(px, py - 30, 32, 30);
  ctx.fillStyle = 'rgba(255, 243, 176, 0.35)';
  ctx.fillRect(px + 2, py - 28, 28, 28);

  // Hoja izquierda
  ctx.fillStyle = 'rgba(144, 224, 239, 0.45)';
  ctx.fillRect(px + 1 - slide, py - 30, 14, 30);
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 1;
  ctx.strokeRect(px + 1 - slide, py - 30, 14, 30);
  // Tirador vertical de latón
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 12 - slide, py - 20, 2, 10);

  // Hoja derecha
  ctx.fillStyle = 'rgba(144, 224, 239, 0.45)';
  ctx.fillRect(px + 17 + slide, py - 30, 14, 30);
  ctx.strokeRect(px + 17 + slide, py - 30, 14, 30);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 18 + slide, py - 20, 2, 10);

  // 6. Felpudo rojo de entrada con ribetes dorados
  ctx.fillStyle = '#c1121f';
  ctx.fillRect(px - 2, py - 2, 36, 2);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 3, py - 3, 38, 1);

  // 7. Candelabros / Farolas de entrada en las columnas
  const lampFlash = Math.sin(frame * 0.1) * 2;
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 7, py - 40, 4, 6);
  ctx.fillRect(px + 35, py - 40, 4, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 6, py - 39, 2, 4);
  ctx.fillRect(px + 36, py - 39, 2, 4);
  // Cono de luz sobre la terraza
  ctx.fillStyle = 'rgba(255, 230, 109, 0.16)';
  ctx.beginPath();
  ctx.moveTo(px - 5, py - 34); ctx.lineTo(px - 14, py); ctx.lineTo(px + 4, py); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(px + 37, py - 34); ctx.lineTo(px + 28, py); ctx.lineTo(px + 46, py); ctx.closePath(); ctx.fill();
}

function drawReceptionDesk(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Mostrador de mármol blanco curvo (44px ancho x 22px alto)
  ctx.fillStyle = '#343a40'; ctx.fillRect(px, py - 18, 44, 20);
  ctx.fillStyle = '#f8f9fa'; ctx.fillRect(px + 1, py - 17, 42, 18);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 2, py - 17, 40, 3); // Superficie pulida

  // Logotipo corporativo dorado en el frente
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 18, py - 10, 8, 4);
  ctx.fillStyle = '#0077b6';
  ctx.fillRect(px + 20, py - 9, 4, 2);

  // Pantalla de terminal con gráfico costero
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 6, py - 26, 12, 9);
  ctx.fillStyle = '#0077b6'; ctx.fillRect(px + 7, py - 25, 10, 7);
  const wave = (frame * 0.2) % 10;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 7 + Math.floor(wave), py - 22, 2, 2);
}

function drawLobbyElevator(ctx, x, y, isRooftop = false, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Gran portal monumental dorado del ascensor (38px ancho x 56px alto)
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px - 2, py - 54, 42, 56);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px, py - 52, 38, 54);

  // Display digital indicador de piso
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 6, py - 50, 26, 8);
  ctx.fillStyle = '#ffd166'; ctx.font = 'bold 5.5px monospace'; ctx.textAlign = 'center';
  ctx.fillText(isRooftop ? 'P-100' : 'P-01', px + 19, py - 44);

  // Puertas doradas de latón pulido con estrías art-deco
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 2, py - 40, 16, 40);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 20, py - 40, 16, 40);
  ctx.fillStyle = '#583110'; ctx.fillRect(px + 18, py - 40, 2, 40); // Ranura central

  // Botón luminoso de llamada
  const glow = Math.sin(frame * 0.15) > 0 ? '#ffffff' : '#ffd166';
  ctx.fillStyle = glow;
  ctx.fillRect(px + 40, py - 26, 3, 4);
}

function drawLobbyDecorations(ctx, x, y, type = 'palm', frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  if (type === 'palm') {
    // Maceta cilíndrica de cerámica blanca y palmera verde de interior
    ctx.fillStyle = '#343a40'; ctx.fillRect(px + 2, py - 10, 14, 12);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 3, py - 9, 12, 10);
    // Tallo y hojas tropicales verde esmeralda
    ctx.fillStyle = '#7f5539'; ctx.fillRect(px + 8, py - 22, 2, 13);
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(px + 1, py - 26, 8, 3);
    ctx.fillRect(px + 9, py - 26, 8, 3);
    ctx.fillStyle = '#52b788';
    ctx.fillRect(px + 4, py - 30, 10, 3);
  } else if (type === 'bench') {
    // Sofá / banco elegante de espera en madera noble y tapiz azul náutico
    ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 10, 32, 12);
    ctx.fillStyle = '#0077b6'; ctx.fillRect(px + 1, py - 9, 30, 8);
    ctx.fillStyle = '#e9ecef'; ctx.fillRect(px + 2, py - 12, 28, 4); // Cojín marfil
  } else if (type === 'turnstile') {
    // Molinete de control de acceso cromado
    ctx.fillStyle = '#343a40'; ctx.fillRect(px, py - 18, 8, 20);
    ctx.fillStyle = '#ced4da'; ctx.fillRect(px + 1, py - 17, 6, 18);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 2, py - 14, 4, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSkyscraperDoors = drawSkyscraperDoors;
  SpriteManager.prototype.drawReceptionDesk = drawReceptionDesk;
  SpriteManager.prototype.drawLobbyElevator = drawLobbyElevator;
  SpriteManager.prototype.drawLobbyDecorations = drawLobbyDecorations;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSkyscraperDoors, drawReceptionDesk, drawLobbyElevator, drawLobbyDecorations };
}


// --- MÓDULO: src/sprites/environment/skyscraper_lobby_props.js ---
// ============================================================================
// SPRITES: ELEMENTOS DECORATIVOS DEL LOBBY DEL RASCACIELOS (PIXEL ART)
// ============================================================================

function drawLobbyChandelier(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Cadena de suspension
  ctx.fillStyle = '#495057'; ctx.fillRect(px - 1, py, 2, 14);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px, py + 1, 1, 12);

  // Corona octogonal de bronce
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px - 10, py + 14, 20, 4);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 8, py + 15, 16, 2);

  // Prismas colgantes de cristal art-deco con destello
  const shimmer = (frame % 16 < 8);
  ctx.fillStyle = shimmer ? '#ffffff' : '#caf0f8';
  ctx.fillRect(px - 7, py + 18, 3, 7);
  ctx.fillRect(px - 2, py + 18, 4, 9);
  ctx.fillRect(px + 4, py + 18, 3, 7);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 1, py + 26, 2, 2);

  // Resplandor dorado tenue
  ctx.fillStyle = 'rgba(255, 235, 120, 0.18)';
  ctx.beginPath(); ctx.arc(px, py + 20, 14, 0, Math.PI * 2); ctx.fill();
}

function drawLuggageCart(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Ruedas y plataforma base
  ctx.fillStyle = '#343a40'; ctx.fillRect(px, py - 4, 26, 4);
  ctx.fillRect(px + 2, py - 2, 4, 4); ctx.fillRect(px + 20, py - 2, 4, 4);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 1, py - 5, 24, 2);

  // Marco tubular arqueado de laton dorado
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 2, py - 22, 2, 17); ctx.fillRect(px + 22, py - 22, 2, 17);
  ctx.fillRect(px + 2, py - 22, 22, 2);

  // Maletas de cuero marrón apiladas
  ctx.fillStyle = '#583110'; ctx.fillRect(px + 4, py - 12, 18, 7);
  ctx.fillStyle = '#c4923e'; ctx.fillRect(px + 6, py - 11, 2, 5); ctx.fillRect(px + 18, py - 11, 2, 5);
  ctx.fillStyle = '#7f5539'; ctx.fillRect(px + 6, py - 18, 14, 6);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 12, py - 19, 2, 1); // Hebilla
}

function drawDirectoryBoard(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Marco de bronce y panel
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 32, 22, 32);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 1, py - 31, 20, 30);
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 2, py - 30, 18, 28);

  // Lineas de texto iluminadas del directorio
  for (let ly = py - 27; ly < py - 8; ly += 4) {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 4, ly, 10, 1.5);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 15, ly, 3, 1.5);
  }
  // Aviso de evacuacion titilante
  const alertBlink = (frame % 20 < 10);
  ctx.fillStyle = alertBlink ? '#e63946' : '#583110';
  ctx.fillRect(px + 3, py - 7, 16, 4);
}

function drawEvacuationSiren(ctx, x, y, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Caja de pared
  ctx.fillStyle = '#343a40'; ctx.fillRect(px, py - 28, 12, 14);
  ctx.fillStyle = '#e63946'; ctx.fillRect(px + 1, py - 27, 10, 12);

  // Baliza giratoria de sirena
  const sirenBlink = (frame % 12 < 6);
  ctx.fillStyle = sirenBlink ? '#ffbe0b' : '#c1121f';
  ctx.fillRect(px + 2, py - 34, 8, 6);
  if (sirenBlink) {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 4, py - 33, 4, 3);
    ctx.fillStyle = 'rgba(255, 190, 11, 0.25)';
    ctx.beginPath(); ctx.arc(px + 6, py - 31, 10, 0, Math.PI * 2); ctx.fill();
  }
}

function drawStanchions(ctx, x, y) {
  const px = Math.round(x), py = Math.round(y);
  // Poste izquierdo con esfera
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px - 1, py - 16, 4, 16);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px, py - 15, 2, 15);
  ctx.fillRect(px - 1, py - 18, 4, 3); // Bola dorada

  // Poste derecho con esfera
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px + 23, py - 16, 4, 16);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 24, py - 15, 2, 15);
  ctx.fillRect(px + 23, py - 18, 4, 3);

  // Cordon de terciopelo rojo combado
  ctx.fillStyle = '#c1121f';
  ctx.fillRect(px + 2, py - 13, 7, 2);
  ctx.fillRect(px + 8, py - 11, 10, 2);
  ctx.fillRect(px + 17, py - 13, 7, 2);
}

function drawLoungeTable(ctx, x, y) {
  const px = Math.round(x), py = Math.round(y);
  // Mesa de centro de caoba
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 8, 24, 8);
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(px + 1, py - 7, 22, 3);
  ctx.fillStyle = '#583110'; ctx.fillRect(px + 2, py - 4, 3, 4); ctx.fillRect(px + 19, py - 4, 3, 4);

  // Periodico de la bahia sobre la mesa
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 5, py - 10, 7, 3);
  ctx.fillStyle = '#0077b6'; ctx.fillRect(px + 6, py - 9, 5, 1);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawLobbyChandelier = drawLobbyChandelier;
  SpriteManager.prototype.drawLuggageCart = drawLuggageCart;
  SpriteManager.prototype.drawDirectoryBoard = drawDirectoryBoard;
  SpriteManager.prototype.drawEvacuationSiren = drawEvacuationSiren;
  SpriteManager.prototype.drawStanchions = drawStanchions;
  SpriteManager.prototype.drawLoungeTable = drawLoungeTable;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawLobbyChandelier, drawLuggageCart, drawDirectoryBoard,
    drawEvacuationSiren, drawStanchions, drawLoungeTable
  };
}


// --- MÓDULO: src/sprites/environment/icecream_parlor_props.js ---
// ============================================================================
// SPRITES MUNDO 3 - FASE 3: MOBILIARIO Y ELEMENTOS DE LA HELADERIA ARTESANAL
// ============================================================================

function drawIceCreamTable(ctx, px, py, frame) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; ctx.fillRect(px - 14, py - 2, 28, 2);
  // Sillas izq y der
  ctx.fillStyle = '#495057'; ctx.fillRect(px - 13, py - 18, 2, 18); ctx.fillRect(px - 15, py - 16, 6, 2);
  ctx.fillRect(px + 11, py - 18, 2, 18); ctx.fillRect(px + 9, py - 16, 6, 2);
  ctx.fillStyle = '#00b4d8'; ctx.fillRect(px - 15, py - 9, 6, 3); ctx.fillRect(px + 9, py - 9, 6, 3);
  // Pedestal y tablero circular
  ctx.fillStyle = '#495057'; ctx.fillRect(px - 1, py - 12, 2, 12); ctx.fillRect(px - 5, py - 2, 10, 2);
  ctx.fillRect(px - 9, py - 15, 18, 3);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 8, py - 14, 16, 2);
  ctx.fillStyle = '#caf0f8'; ctx.fillRect(px - 6, py - 14, 12, 1);
  // Copa Sundae con guinda
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 2, py - 17, 4, 3);
  ctx.fillStyle = '#ff4d6d'; ctx.fillRect(px - 2, py - 20, 4, 3);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 1, py - 22, 2, 2);
  ctx.fillStyle = '#e63946'; ctx.fillRect(px, py - 23, 1, 1);
}

function drawIceCreamBooth(ctx, px, py, frame) {
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 24, 36, 24);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px + 1, py - 23, 34, 22);
  ctx.fillStyle = '#0077b6'; ctx.fillRect(px + 3, py - 21, 30, 8);
  ctx.fillStyle = '#00b4d8'; ctx.fillRect(px + 5, py - 19, 26, 4);
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(px + 1, py - 12, 34, 5);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 2, py - 11, 32, 2);
  ctx.fillStyle = '#caf0f8'; ctx.fillRect(px + 28, py - 18, 3, 6);
  ctx.fillStyle = '#e63946'; ctx.fillRect(px + 29, py - 21, 1, 4);
}

function drawIceCreamCounter(ctx, px, py, frame) {
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px, py - 24, 56, 24);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px + 2, py - 12, 52, 11);
  ctx.fillStyle = '#7f4f24'; ctx.fillRect(px + 4, py - 10, 48, 8);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 4, py - 12, 48, 1);
  ctx.fillStyle = 'rgba(202, 240, 248, 0.55)'; ctx.fillRect(px + 2, py - 22, 52, 10);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 3, py - 22, 50, 1);
  const flavors = ['#ff4d6d', '#ffbe0b', '#ffffff', '#52b788'];
  for (let i = 0; i < 4; i++) {
    const bx = px + 6 + i * 12;
    ctx.fillStyle = '#343a40'; ctx.fillRect(bx, py - 18, 9, 5);
    ctx.fillStyle = flavors[i]; ctx.fillRect(bx + 1, py - 17, 7, 4);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(bx + 2, py - 17, 3, 1);
  }
  ctx.fillStyle = '#495057'; ctx.fillRect(px + 44, py - 29, 9, 6);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 45, py - 28, 7, 4);
  ctx.fillStyle = '#e63946'; ctx.fillRect(px + 47, py - 31, 3, 2);
}

function drawIceCreamMenuBoard(ctx, px, py, frame) {
  ctx.fillStyle = '#4a2810'; ctx.fillRect(px - 1, py - 26, 22, 26);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px + 1, py - 24, 18, 18);
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 2, py - 23, 16, 16);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 4, py - 21, 12, 2);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 4, py - 17, 10, 1);
  ctx.fillRect(px + 4, py - 14, 11, 1); ctx.fillRect(px + 4, py - 11, 8, 1);
  ctx.fillStyle = '#b57639'; ctx.fillRect(px + 1, py - 6, 2, 6); ctx.fillRect(px + 17, py - 6, 2, 6);
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawIceCreamTable,
    drawIceCreamBooth,
    drawIceCreamCounter,
    drawIceCreamMenuBoard
  };
}


// --- MÓDULO: src/sprites/decorations/volcano.js ---
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

// --- MÓDULO: src/sprites/decorations/garden.js ---
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

// --- MÓDULO: src/sprites/decorations/coastal.js ---
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


// --- MÓDULO: src/sprites/decorations/beach.js ---
// SPRITES MUNDO 3 - FASE 2: DECORACIONES DE PLAYA Y ORILLA
function drawBeachDecoration(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);

  if (d.type === 'beach_umbrella') {
    // Sombrilla de playa rayada en azul turquesa y blanco puro
    ctx.fillStyle = '#4a2810';
    ctx.fillRect(px + 14, py - 38, 3, 38); // Mástil de madera
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(px + 15, py - 36, 1, 36);

    // Cúpula de la sombrilla
    ctx.fillStyle = '#005f73';
    ctx.fillRect(px - 1, py - 46, 34, 12);
    for (let i = 0; i < 4; i++) {
      const isAlt = i % 2 === 0;
      ctx.fillStyle = isAlt ? '#ffffff' : '#00b4d8';
      ctx.fillRect(px + i * 8, py - 44, 8, 8);
      ctx.fillStyle = isAlt ? '#caf0f8' : '#0096c7';
      ctx.fillRect(px + i * 8 + 1, py - 43, 6, 2);
    }
    // Punta superior dorada
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 15, py - 48, 2, 3);
  } else if (d.type === 'lifeguard_tower') {
    // Torreta de vigilancia costera en madera blanca y techo rojo
    ctx.fillStyle = '#495057';
    ctx.fillRect(px, py - 44, 26, 44);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(px + 2, py - 42, 22, 40);
    // Techo rojo salvavidas
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px - 2, py - 46, 30, 4);
    // Ventana de observación azul celeste
    ctx.fillStyle = '#90e0ef';
    ctx.fillRect(px + 5, py - 36, 16, 12);
    ctx.fillStyle = '#495057';
    ctx.fillRect(px + 12, py - 36, 2, 12);
    // Salvavidas colgado (Aro salvavidas rojo y blanco clásico)
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 8, py - 18, 10, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 10, py - 16, 6, 6);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(px + 11, py - 15, 4, 4);
  } else if (d.type === 'driftwood_log') {
    // Tronco de deriva marina varado en la arena
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(px, py - 8, 32, 8);
    ctx.fillStyle = '#c89f78';
    ctx.fillRect(px + 2, py - 7, 28, 6);
    ctx.fillStyle = '#ddb892';
    ctx.fillRect(px + 4, py - 6, 24, 2);
    ctx.fillStyle = '#f4e0a5';
    ctx.fillRect(px + 8, py - 5, 4, 1);
  } else if (d.type === 'seashells') {
    // Conchas marinas nacaradas en la arena dorada
    const glint = Math.sin(frame * 0.1 + px) > 0.4;
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(px, py - 4, 6, 4);
    ctx.fillStyle = glint ? '#ffffff' : '#fff1e6';
    ctx.fillRect(px + 1, py - 3, 4, 2);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 8, py - 3, 5, 3);
    ctx.fillStyle = glint ? '#ffffff' : '#fde2e4';
    ctx.fillRect(px + 9, py - 2, 3, 1);
  } else if (d.type === 'surf_rack') {
    // Rack de tablas de surf de playa
    ctx.fillStyle = '#583110';
    ctx.fillRect(px, py - 32, 4, 32);
    ctx.fillRect(px + 24, py - 32, 4, 32);
    ctx.fillRect(px, py - 20, 28, 3);
    // Tablas verticales guardadas (turquesa, amarillo, blanco)
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(px + 6, py - 34, 5, 34);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 8, py - 34, 1, 34);
    ctx.fillStyle = '#ffbe0b';
    ctx.fillRect(px + 15, py - 36, 5, 36);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 17, py - 36, 1, 36);
  } else if (d.type === 'sandcastle') {
    // Castillo de arena dorada esculpido con torrecillas
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(px, py - 16, 26, 16);
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(px + 1, py - 15, 24, 15);
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(px + 2, py - 18, 5, 4);
    ctx.fillRect(px + 19, py - 18, 5, 4);
    ctx.fillRect(px + 10, py - 21, 6, 6);
    ctx.fillStyle = '#7f5539';
    ctx.fillRect(px + 10, py - 7, 6, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 12, py - 26, 1, 5);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 13, py - 26, 4, 3); // Banderita roja
  } else if (d.type === 'buoy_marker') {
    // Boya marina flotante con baliza
    const bob = Math.sin(frame * 0.12 + px * 0.08) * 2;
    const by = py + Math.round(bob);
    ctx.fillStyle = '#1d3557';
    ctx.fillRect(px + 2, by - 14, 12, 14);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 3, by - 13, 10, 5);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 3, by - 8, 10, 7);
    const blink = Math.floor(frame * 0.2) % 2 === 0;
    ctx.fillStyle = blink ? '#ffbe0b' : '#c4923e';
    ctx.fillRect(px + 6, by - 18, 4, 4);
    if (blink) { ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 7, by - 17, 2, 2); }
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawBeachDecoration = drawBeachDecoration;
}

if (typeof module !== 'undefined') {
  module.exports = { drawBeachDecoration };
}


// --- MÓDULO: src/sprites/decorations/resort.js ---
// SPRITES MUNDO 3 - FASE 3: DECORACIONES DEL RESORT PLAYERO Y HELADERIA
function drawResortDecoration(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);

  if (d.type === 'ice_cream_cart') {
    // Carrito móvil de helados de Sami en estilo resort playero
    // Ruedas de radios
    ctx.fillStyle = '#343a40';
    ctx.beginPath();
    ctx.arc(px + 8, py - 6, 6, 0, Math.PI * 2);
    ctx.arc(px + 36, py - 6, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 7, py - 7, 2, 2);
    ctx.fillRect(px + 35, py - 7, 2, 2);

    // Caja frigorífica blanca pulida
    ctx.fillStyle = '#495057';
    ctx.fillRect(px, py - 24, 44, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 2, py - 22, 40, 12);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(px + 4, py - 20, 36, 4);

    // Logo de helado en el frontal
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(px + 18, py - 15, 8, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 20, py - 18, 4, 4);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 21, py - 19, 2, 2); // Guinda del helado

    // Toldo a rayas del carrito (turquesa y blanco)
    ctx.fillStyle = '#c4923e';
    ctx.fillRect(px + 4, py - 38, 2, 16);  // Poste soporte izquierdo
    ctx.fillRect(px + 38, py - 38, 2, 16); // Poste soporte derecho
    ctx.fillStyle = '#005f73';
    ctx.fillRect(px - 4, py - 46, 52, 10);
    for (let s = 0; s < 5; s++) {
      const isAlt = s % 2 === 0;
      ctx.fillStyle = isAlt ? '#ffffff' : '#00b4d8';
      ctx.fillRect(px - 2 + s * 10, py - 45, 10, 8);
      ctx.fillStyle = isAlt ? '#caf0f8' : '#0077b6';
      ctx.fillRect(px - 2 + s * 10, py - 38, 10, 2);
    }
    // Campanilla dorada del heladero
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 41, py - 27, 3, 4);
  } else if (d.type === 'beach_towel') {
    // Toalla de playa rayada en turquesa y blanco sobre la arena
    ctx.fillStyle = '#c4923e';
    ctx.fillRect(px, py - 3, 28, 3);
    for (let t = 0; t < 4; t++) {
      ctx.fillStyle = (t % 2 === 0) ? '#00b4d8' : '#ffffff';
      ctx.fillRect(px + 1 + t * 6, py - 2, 6, 2);
    }
    // Refresco tropical con rodaja de limón
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 20, py - 5, 4, 3);
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 21, py - 7, 2, 2);
  } else if (d.type === 'sand_castle') {
    // Castillo de arena dorada con torres y foso
    ctx.fillStyle = '#b07d62';
    ctx.fillRect(px, py - 14, 24, 14);
    ctx.fillStyle = '#dfb15b';
    ctx.fillRect(px + 1, py - 13, 22, 13);
    ctx.fillStyle = '#e9c46a';
    ctx.fillRect(px + 2, py - 10, 20, 10);
    // Tres almenas superiores
    ctx.fillStyle = '#f4e0a5';
    ctx.fillRect(px + 2, py - 13, 4, 4);
    ctx.fillRect(px + 10, py - 15, 4, 6); // Torre central
    ctx.fillRect(px + 18, py - 13, 4, 4);
    // Banderita roja en la torre central
    ctx.fillStyle = '#e63946';
    ctx.fillRect(px + 14, py - 18, 5, 3);
  } else if (d.type === 'volleyball_net') {
    // Red de voleibol de playa
    ctx.fillStyle = '#583110';
    ctx.fillRect(px, py - 36, 3, 36);      // Poste izq
    ctx.fillRect(px + 52, py - 36, 3, 36); // Poste der
    // Cinta superior blanca de la red
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 3, py - 34, 49, 3);
    // Malla cuadriculada blanca translúcida
    ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';
    ctx.fillRect(px + 3, py - 31, 49, 14);
    for (let gx = px + 6; gx < px + 50; gx += 6) {
      ctx.fillStyle = '#495057';
      ctx.fillRect(gx, py - 31, 1, 14);
    }
  } else if (d.type === 'beach_chair') {
    // Tumbona reclinable de playa en blanco y azul náutico
    ctx.fillStyle = '#495057';
    ctx.fillRect(px, py - 10, 26, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 2, py - 9, 22, 3); // Marco blanco
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(px + 2, py - 14, 8, 6); // Respaldo náutico
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(px + 3, py - 13, 6, 4);
  } else if (d.type === 'surf_shop') {
    if (typeof drawSurfShop === 'function') drawSurfShop(ctx, d, frame);
  } else if (d.type === 'surfboard_stand') {
    if (typeof drawSurfboardStand === 'function') drawSurfboardStand(ctx, d, frame);
  } else if (d.type === 'ice_cream_table') {
    if (typeof drawIceCreamTable === 'function') drawIceCreamTable(ctx, px, py, frame);
  } else if (d.type === 'ice_cream_booth') {
    if (typeof drawIceCreamBooth === 'function') drawIceCreamBooth(ctx, px, py, frame);
  } else if (d.type === 'ice_cream_counter') {
    if (typeof drawIceCreamCounter === 'function') drawIceCreamCounter(ctx, px, py, frame);
  } else if (d.type === 'ice_cream_menu_board') {
    if (typeof drawIceCreamMenuBoard === 'function') drawIceCreamMenuBoard(ctx, px, py, frame);
  }
}

if (typeof SpriteManager !== 'undefined') SpriteManager.prototype.drawResortDecoration = drawResortDecoration;
if (typeof module !== 'undefined') module.exports = { drawResortDecoration };


// --- MÓDULO: src/sprites/decorations/surfshop.js ---
// ============================================================================
// SPRITES MUNDO 3 • FASE 3: TIENDA DE SURF DE KAI ("KAI SURF SHACK")
// ============================================================================
// Módulo de sprite para la tienda de surf, carteles de neón y exhibidor de tablas

function drawSurfShop(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);
  const isOpen = (typeof saveState !== 'undefined' && saveState.kaiQuest && saveState.kaiQuest.shopOpen);

  // 1. Estructura principal de madera tropical (choza playera)
  ctx.fillStyle = '#583110';
  ctx.fillRect(px, py - 52, 72, 52);
  ctx.fillStyle = '#b57639';
  ctx.fillRect(px + 2, py - 50, 68, 48);

  // Tablones de madera verticales
  for (let bx = px + 8; bx < px + 68; bx += 8) {
    ctx.fillStyle = '#7f4f24';
    ctx.fillRect(bx, py - 50, 1, 48);
  }

  // 2. Mostrador frontal
  ctx.fillStyle = '#7f4f24';
  ctx.fillRect(px + 6, py - 22, 42, 22);
  ctx.fillStyle = '#c48b4f';
  ctx.fillRect(px + 8, py - 20, 38, 4); // Borde superior del mostrador

  // 3. Exhibidor lateral de tablas de surf (Rack de 3 tablas)
  const rackX = px + 50;
  ctx.fillStyle = '#583110';
  ctx.fillRect(rackX, py - 32, 18, 32);
  
  // Tabla 1: Azul turquesa
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(rackX + 2, py - 30, 4, 28);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(rackX + 3, py - 26, 2, 20);

  // Tabla 2: Nácar / Blanco puro
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(rackX + 7, py - 33, 4, 31);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(rackX + 8, py - 29, 2, 23);

  // Tabla 3: Dorada / Amarillo sol
  ctx.fillStyle = '#ffbe0b';
  ctx.fillRect(rackX + 12, py - 28, 4, 26);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(rackX + 13, py - 24, 2, 18);

  // 4. Techo de paja tropical y toldo a rayas náuticas
  ctx.fillStyle = '#583110';
  ctx.fillRect(px - 4, py - 60, 80, 10);
  for (let s = 0; s < 8; s++) {
    ctx.fillStyle = (s % 2 === 0) ? '#0077b6' : '#ffffff';
    ctx.fillRect(px - 2 + s * 10, py - 59, 10, 8);
  }

  // 5. Cartel superior en forma de tabla de surf
  const signY = py - 74;
  ctx.fillStyle = '#005f73';
  ctx.fillRect(px + 10, signY, 52, 13);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px + 12, signY + 2, 48, 9);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 7px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KAI SURF', px + 36, signY + 9);

  // 6. Estado: CERRADO / ABIERTO
  if (isOpen) {
    // Cartel Neón "OPEN"
    const blink = Math.floor(frame * 0.1) % 2 === 0;
    ctx.fillStyle = blink ? '#ffd166' : '#ffffff';
    ctx.fillRect(px + 16, py - 34, 22, 9);
    ctx.fillStyle = '#07020a';
    ctx.font = 'bold 6px sans-serif';
    ctx.fillText('OPEN', px + 27, py - 27);
  } else {
    // Cadena y cartel "CERRADO"
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px + 12, py - 32, 30, 8);
    ctx.fillStyle = '#ced4da';
    ctx.font = 'bold 5.5px sans-serif';
    ctx.fillText('CERRADO', px + 27, py - 26);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSurfShop = drawSurfShop;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSurfShop };
}


// --- MÓDULO: src/sprites/decorations/wave_crest.js ---
// ============================================================================
// SPRITES MUNDO 3 • FASE 3: OLAS DE LA ROMPIENTE (SURF WAVE CREST)
// ============================================================================
// Módulo de renderizado para las olas del desafío de Kai Surf

function drawSurfWave(ctx, wave, frame) {
  if (typeof drawRealisticSurfWave === 'function') {
    drawRealisticSurfWave(ctx, wave, frame);
    return;
  }
  const wx = Math.round(wave.x);
  const wy = Math.round(wave.y);
  const t = frame * 0.14 + (wave.id || 0) * 1.5;
  const bob = Math.sin(t) * 3.5;

  // Sombra marina profunda
  ctx.fillStyle = 'rgba(2, 62, 138, 0.55)';
  ctx.beginPath();
  ctx.ellipse(wx + 14, wy + 4, 18, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pared del tubo en azul marino profundo
  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.moveTo(wx + 28, wy + 2);
  ctx.quadraticCurveTo(wx + 14, wy - 22 + bob, wx - 4, wy - 28 + bob);
  ctx.lineTo(wx - 10, wy - 20 + bob);
  ctx.quadraticCurveTo(wx + 4, wy - 2, wx + 6, wy + 2);
  ctx.closePath();
  ctx.fill();

  // Interior del tubo translúcido
  ctx.fillStyle = '#00b4d8';
  ctx.beginPath();
  ctx.moveTo(wx + 20, wy);
  ctx.quadraticCurveTo(wx + 10, wy - 18 + bob, wx - 2, wy - 24 + bob);
  ctx.lineTo(wx - 7, wy - 19 + bob);
  ctx.quadraticCurveTo(wx + 6, wy - 4, wx + 10, wy);
  ctx.closePath();
  ctx.fill();

  // Labio cayendo hacia adelante (Pitching Lip)
  ctx.fillStyle = '#48cae4';
  ctx.beginPath();
  ctx.moveTo(wx - 2, wy - 25 + bob);
  ctx.quadraticCurveTo(wx + 2, wy - 29 + bob, wx + 8, wy - 22 + bob);
  ctx.lineTo(wx + 4, wy - 18 + bob);
  ctx.quadraticCurveTo(wx, wy - 23 + bob, wx - 4, wy - 22 + bob);
  ctx.closePath();
  ctx.fill();

  // Espuma blanca pura explosiva
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(wx - 8, wy - 30 + Math.round(bob), 14, 5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(wx - 6, wy - 32 + Math.round(bob), 11, 4);
  ctx.fillRect(wx + 4, wy - 26 + Math.round(bob), 5, 4);

  // Spray marino y gotas
  const sprayAnim = (frame * 2 + (wave.id || 0) * 11) % 6;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(wx - 12 + sprayAnim, wy - 36 + Math.round(bob), 3, 3);
  ctx.fillRect(wx - 6 - sprayAnim, wy - 39 + Math.round(bob), 2, 2);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(wx + 12, wy - 24 + Math.round(bob), 2, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSurfWave = drawSurfWave;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSurfWave };
}


// --- MÓDULO: src/sprites/decorations/surfboard_stands.js ---
// ============================================================================
// SPRITES MUNDO 3 • FASE 3: PEDESTALES DE SKINS DE SURF EN LA TIENDA DE KAI
// ============================================================================
// Renderiza los 3 pedestales de exhibición con las tablas expuestas:
// 1. Rosa Neón ('classic')
// 2. Nácar Marina ('nacar')
// 3. Obsidiana Magma ('obsidian')

function drawSurfboardStand(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);
  const skinKey = d.skinKey || 'classic';
  const isShopOpen = typeof saveState !== 'undefined' && saveState.kaiQuest && saveState.kaiQuest.shopOpen;
  const isEquipped = typeof saveState !== 'undefined' && (saveState.surfboardSkin || 'classic') === skinKey;

  // 1. Pedestal de madera de teca con ranura
  ctx.fillStyle = '#4a2810';
  ctx.fillRect(px - 14, py - 6, 28, 6);
  ctx.fillStyle = '#b57639';
  ctx.fillRect(px - 12, py - 5, 24, 4);
  ctx.fillStyle = '#d49b5d';
  ctx.fillRect(px - 10, py - 4, 20, 2);

  // 2. Tabla de Surf colocada verticalmente sobre el pedestal
  ctx.save();
  ctx.translate(px, py - 18);
  ctx.rotate(-0.25); // Inclinación elegante de exhibición
  if (typeof SpriteManager !== 'undefined' && SpriteManager.prototype.drawSurfboard) {
    SpriteManager.prototype.drawSurfboard(ctx, 0, 0, true, 0, false, skinKey);
  }
  ctx.restore();

  // 3. Brillo de estrellas si está equipada
  if (isEquipped) {
    const pulse = Math.sin(frame * 0.12) * 2;
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px - 10, py - 38 + pulse, 3, 3);
    ctx.fillRect(px + 8, py - 32 - pulse, 2, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 6, py - 40, 2, 2);
  }

  // 4. Cartel identificador / Etiqueta debajo del pedestal
  const labelY = py + 2;
  ctx.fillStyle = '#212529';
  ctx.fillRect(px - 18, labelY, 36, 11);
  ctx.fillStyle = isEquipped ? '#ffd166' : (isShopOpen ? '#ffffff' : '#ced4da');
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';

  const title = skinKey === 'classic' ? 'ROSA NEON' : (skinKey === 'nacar' ? 'NACAR' : 'OBSIDIANA');
  ctx.fillText(title, px, labelY + 6);

  // 5. Estado: EQUIPADA / [SALTAR]
  if (isEquipped) {
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 4.5px sans-serif';
    ctx.fillText('EQUIPADA', px, labelY + 10);
  } else if (isShopOpen) {
    ctx.fillStyle = '#90e0ef';
    ctx.font = 'bold 4.5px sans-serif';
    ctx.fillText('SALTAR', px, labelY + 10);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSurfboardStand = drawSurfboardStand;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSurfboardStand };
}


// --- MÓDULO: src/sprites/decorations/offices.js ---
// ============================================================================
// SPRITES MUNDO 3: OFICINAS CORPORATIVAS Y LOBBY (PIXEL ART)
// ============================================================================
function drawOfficeDecoration(ctx, d, frame) {
  const px = Math.round(d.x), py = Math.round(d.y);

  if (d.type === 'office_desk') {
    ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - 18, 28, 18);
    ctx.fillStyle = '#3b0820'; ctx.fillRect(px + 2, py - 16, 24, 4);
    ctx.fillStyle = '#120415'; ctx.fillRect(px + 3, py - 12, 4, 12); ctx.fillRect(px + 21, py - 12, 4, 12);
    ctx.fillStyle = '#07020a'; ctx.fillRect(px + 8, py - 28, 14, 11);
    ctx.fillStyle = (frame % 30 < 15) ? '#ffcad4' : '#ffffff'; ctx.fillRect(px + 9, py - 27, 12, 8);
    ctx.fillStyle = '#ff2a70'; ctx.fillRect(px + 11, py - 25, 8, 2);
    ctx.fillStyle = '#8f143c'; ctx.fillRect(px + 10, py - 16, 9, 2);
  } else if (d.type === 'office_cooler') {
    ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - 24, 12, 24);
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 2, py - 14, 8, 13);
    ctx.fillStyle = '#ffcad4'; ctx.fillRect(px + 2, py - 23, 8, 8);
    ctx.fillStyle = '#ff2a70'; ctx.fillRect(px + 4, py - 13, 2, 2);
  } else if (d.type === 'rooftop_hvac') {
    const w = d.w || 36, h = d.h || 24;
    ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - h, w, h);
    ctx.fillStyle = '#1e0524'; ctx.fillRect(px + 2, py - h + 2, w - 4, h - 4);
    const cx = px + Math.floor(w / 2), cy = py - Math.floor(h / 2);
    ctx.fillStyle = '#07020a'; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
    const angle = (frame * 0.3) % (Math.PI * 2);
    ctx.strokeStyle = '#ff2a70'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(cx - Math.cos(angle) * 6, cy - Math.sin(angle) * 6);
    ctx.lineTo(cx + Math.cos(angle) * 6, cy + Math.sin(angle) * 6); ctx.stroke();
  } else if (d.type === 'rooftop_antenna') {
    const h = d.h || 52;
    ctx.fillStyle = '#07020a'; ctx.fillRect(px + 1, py - h, 3, h);
    ctx.fillStyle = '#8f143c'; ctx.fillRect(px + 2, py - h + 2, 1, h - 2);
    for (let y = py - h + 12; y < py - 6; y += 10) { ctx.fillStyle = '#ff2a70'; ctx.fillRect(px - 5, y, 15, 2); }
    const beacon = (frame % 20 < 10);
    ctx.fillStyle = beacon ? '#ff2a70' : '#3b0820'; ctx.fillRect(px - 2, py - h - 4, 9, 5);
    if (beacon) { ctx.fillStyle = '#ffffff'; ctx.fillRect(px + 1, py - h - 3, 3, 3); }
  } else if (d.type === 'helipad' || d.subType === 'city_helipad') {
    const w = d.w || 64;
    ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - 4, w, 4);
    ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 4, py - 3, w - 8, 2);
    const hx = px + Math.floor(w / 2) - 6;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(hx, py - 12, 3, 10); ctx.fillRect(hx + 9, py - 12, 3, 10);
    ctx.fillRect(hx + 3, py - 8, 6, 2);
  } else if (d.subType === 'skyscraper_doors' && typeof drawSkyscraperDoors === 'function') {
    drawSkyscraperDoors(ctx, px, py, false, frame);
  } else if (d.subType === 'lobby_reception_desk' && typeof drawReceptionDesk === 'function') {
    drawReceptionDesk(ctx, px, py, frame);
  } else if (d.subType === 'lobby_turnstiles' && typeof drawLobbyDecorations === 'function') {
    drawLobbyDecorations(ctx, px, py, 'turnstile', frame);
  } else if (d.subType === 'lobby_elevator' && typeof drawLobbyElevator === 'function') {
    drawLobbyElevator(ctx, px, py, d.isRooftop, frame);
  } else if (d.subType === 'lobby_decor_palm' && typeof drawLobbyDecorations === 'function') {
    drawLobbyDecorations(ctx, px, py, 'palm', frame);
  } else if (d.subType === 'lobby_decor_bench' && typeof drawLobbyDecorations === 'function') {
    drawLobbyDecorations(ctx, px, py, 'bench', frame);
  } else if (d.subType === 'lobby_chandelier' && typeof drawLobbyChandelier === 'function') {
    drawLobbyChandelier(ctx, px, py, frame);
  } else if (d.subType === 'lobby_luggage_cart' && typeof drawLuggageCart === 'function') {
    drawLuggageCart(ctx, px, py, frame);
  } else if (d.subType === 'lobby_directory_board' && typeof drawDirectoryBoard === 'function') {
    drawDirectoryBoard(ctx, px, py, frame);
  } else if (d.subType === 'lobby_evacuation_siren' && typeof drawEvacuationSiren === 'function') {
    drawEvacuationSiren(ctx, px, py, frame);
  } else if (d.subType === 'lobby_stanchions' && typeof drawStanchions === 'function') {
    drawStanchions(ctx, px, py);
  } else if (d.subType === 'lobby_lounge_table' && typeof drawLoungeTable === 'function') {
    drawLoungeTable(ctx, px, py);
  } else if (d.subType === 'lobby_water_cooler') {
    drawOfficeDecoration(ctx, { type: 'office_cooler', x: px, y: py }, frame);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawOfficeDecoration = drawOfficeDecoration;
}

if (typeof module !== 'undefined') {
  module.exports = { drawOfficeDecoration };
}


// --- MÓDULO: src/sprites/decorations/hotdog_cart.js ---
// ============================================================================
// SPRITES MUNDO 3 • FASE 4: CARRITO DE HOTDOGS Y DON PANCHO (PIXEL ART 16-BIT)
// ============================================================================
// Paleta estricta: #07020a, #120415, #3b0820, #8f143c, #b31b52, #ff2a70, #ffcad4, #ffffff

function drawHotdogCart(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Toldo a rayas del carrito (28px x 8px)
  const canopyX = px - 4, canopyY = py - 24;
  for (let c = 0; c < 7; c++) {
    ctx.fillStyle = c % 2 === 0 ? '#e63946' : '#ffbe0b';
    ctx.fillRect(canopyX + c * 4, canopyY, 4, 7);
  }
  ctx.fillStyle = '#343a40';
  ctx.fillRect(canopyX - 1, canopyY + 6, 29, 2);

  // 2. Postes delgados y cuerpo de acero
  ctx.fillStyle = '#ced4da';
  ctx.fillRect(px - 2, py - 17, 2, 16);
  ctx.fillRect(px + 22, py - 17, 2, 16);
  ctx.fillStyle = '#495057'; ctx.fillRect(px, py - 2, 24, 16);
  ctx.fillStyle = '#e9ecef'; ctx.fillRect(px + 1, py - 1, 22, 14);

  // Parrilla caliente y hotdogs con salsa
  ctx.fillStyle = '#212529'; ctx.fillRect(px + 3, py + 1, 12, 5);
  ctx.fillStyle = '#e9c46a'; ctx.fillRect(px + 4, py + 2, 10, 3); // Pan
  ctx.fillStyle = '#c1121f'; ctx.fillRect(px + 5, py + 3, 8, 1); // Salchicha
  ctx.fillStyle = '#ffbe0b'; ctx.fillRect(px + 6, py + 2, 6, 1); // Mostaza

  // Humo y ruedas
  const steamY = Math.round(Math.sin(frame * 0.12) * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(px + 8, py - 6 + steamY, 2, 2);
  ctx.fillRect(px + 12, py - 9 + steamY, 2, 2);
  ctx.fillStyle = '#212529';
  ctx.beginPath();
  ctx.arc(px + 5, py + 15, 4, 0, Math.PI * 2);
  ctx.arc(px + 19, py + 15, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 14, 2, 2);
  ctx.fillRect(px + 18, py + 14, 2, 2);
}

function drawDonPancho(ctx, x, y, fate, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  if (!fate) {
    const bob = Math.floor(Math.sin(frame * 0.08) * 1);
    // Sombrero de chef
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 3, py - 10 + bob, 8, 7);
    ctx.fillRect(px + 2, py - 4 + bob, 10, 2);
    // Cara y bigote
    ctx.fillStyle = '#ffcad4';
    ctx.fillRect(px + 3, py - 2 + bob, 8, 7);
    ctx.fillStyle = '#07020a';
    ctx.fillRect(px + 8, py + bob, 2, 2); // Ojo
    ctx.fillStyle = '#3b0820';
    ctx.fillRect(px + 6, py + 2 + bob, 5, 2); // Bigote
    // Cuerpo y delantal
    ctx.fillStyle = '#8f143c';
    ctx.fillRect(px + 2, py + 5 + bob, 10, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 4, py + 6 + bob, 6, 8); // Delantal
  } else if (fate === 'FREEZE') {
    // Bloque de hielo translúcido con Don Pancho congelado
    ctx.fillStyle = 'rgba(255, 202, 212, 0.45)';
    ctx.fillRect(px - 1, py - 12, 16, 28);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(px - 1, py - 12, 16, 28);
    // Destello de escarcha
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 1, py - 10, 3, 3);
    ctx.fillRect(px + 10, py + 8, 3, 3);
  } else if (fate === 'ELECTROCUTE') {
    // Silueta chamuscada con pequeños arcos voltaicos
    const zap = frame % 12 < 6;
    ctx.fillStyle = zap ? '#ffffff' : '#07020a';
    ctx.fillRect(px + 2, py - 5, 10, 20);
    ctx.fillStyle = '#ff2a70';
    if (zap) {
      ctx.fillRect(px - 2, py - 8, 2, 4);
      ctx.fillRect(px + 13, py + 2, 2, 4);
    }
  } else if (fate === 'EXPLODE') {
    // Marca de quemadura en el asfalto con migajas
    ctx.fillStyle = '#07020a';
    ctx.beginPath();
    ctx.ellipse(px + 6, py + 15, 10, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff2a70';
    ctx.fillRect(px + 2, py + 13, 2, 2);
    ctx.fillRect(px + 9, py + 14, 2, 2);
  }
}

function drawDroppedKeyPiece(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const bob = Math.sin(frame * 0.12) * 3;
  const py = Math.round(y + bob);

  // Destello resplandeciente
  const glow = 0.5 + Math.sin(frame * 0.15) * 0.3;
  ctx.save();
  ctx.globalAlpha = glow;
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(px + 6, py + 6, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Llave dorada 4/4 (Cabeza con aro ornamental y dientes)
  ctx.fillStyle = '#07020a';
  ctx.fillRect(px + 1, py + 1, 10, 10);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 2, py + 2, 8, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py + 4, 4, 4);
  // Vástago y dientes de la llave
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 6, py + 10, 3, 8);
  ctx.fillRect(px + 9, py + 14, 3, 2);
  ctx.fillRect(px + 9, py + 17, 3, 2);

  if (frame % 8 < 4) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 2, py - 2, 2, 2);
    ctx.fillRect(px + 14, py + 6, 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawHotdogCart = drawHotdogCart;
  SpriteManager.prototype.drawDonPancho = drawDonPancho;
  SpriteManager.prototype.drawDroppedKeyPiece = drawDroppedKeyPiece;
}

if (typeof module !== 'undefined') {
  module.exports = { drawHotdogCart, drawDonPancho, drawDroppedKeyPiece };
}


// --- MÓDULO: src/sprites/decorations/tsunami.js ---
// ============================================================================
// SPRITES MUNDO 3: MEGATSUNAMI, ESCOMBROS Y TENTÁCULOS (PIXEL ART)
// ============================================================================

function drawTsunamiWave(ctx, x, y, w, h, frame) {
  if (typeof drawRealisticTsunamiWall === 'function') {
    drawRealisticTsunamiWall(ctx, x, y, w, h, frame);
    return;
  }
  const px = Math.round(x);
  const py = Math.round(y);
  const t = frame * 0.055;
  const surgeHeight = Math.max(h, 48);
  const bobSurge = Math.sin(t * 1.5 + x * 0.02) * 5;

  const waveGrad = ctx.createLinearGradient(px, py - 15, px, py + surgeHeight);
  waveGrad.addColorStop(0, '#00b4d8');
  waveGrad.addColorStop(0.18, '#0077b6');
  waveGrad.addColorStop(0.5, '#023e8a');
  waveGrad.addColorStop(1, '#001233');
  ctx.fillStyle = waveGrad;
  ctx.fillRect(px, py + bobSurge, w, surgeHeight);

  // Vórtices internos
  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py + bobSurge, w, surgeHeight);
  ctx.clip();
  for (let vx = px - 10; vx < px + w + 10; vx += 24) {
    const vOffset = Math.sin(t * 2.2 + vx * 0.12) * 6;
    ctx.fillStyle = 'rgba(72, 202, 228, 0.28)';
    ctx.fillRect(vx + vOffset, py + 8 + bobSurge, 16, 3);
    ctx.fillStyle = 'rgba(2, 62, 138, 0.45)';
    ctx.fillRect(vx - vOffset, py + 16 + bobSurge, 18, 4);
  }
  ctx.restore();

  // Cresta con espuma violenta y spray
  const step = 5;
  for (let ox = 0; ox < w; ox += step) {
    const curX = px + ox;
    const waveCurl = Math.sin(t * 3.2 + curX * 0.14) * 4.5 + Math.cos(t * 1.8 + curX * 0.08) * 3.0;
    const crestY = py + bobSurge + Math.round(waveCurl);

    ctx.fillStyle = '#03045e';
    ctx.fillRect(curX, crestY + 5, step, 5);
    ctx.fillStyle = '#00b4d8';
    ctx.fillRect(curX, crestY + 2, step, 4);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(curX, crestY, step, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(curX, crestY - 2, step, 2);

    if ((frame + ox) % 4 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(curX + 1, crestY - 7, 2, 2);
      ctx.fillRect(curX + 3, crestY - 11, 2, 2);
    }
  }
}

function drawFloatingDebris(ctx, x, y, type = 'slab', frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  const floatBob = Math.round(Math.sin(frame * 0.06 + x) * 2.5);
  const by = py + floatBob;

  if (type === 'girder') {
    // Viga de acero estructural I-Beam industrial con franjas amarillas de peligro
    ctx.fillStyle = '#0a1128';
    ctx.fillRect(px - 1, by - 6, 42, 9);
    ctx.fillStyle = '#293241';
    ctx.fillRect(px, by - 5, 40, 7);
    ctx.fillStyle = '#3d5a80';
    ctx.fillRect(px + 1, by - 4, 38, 5);

    // Franjas diagonales de advertencia reflectantes (Hazard yellow / black)
    for (let hx = px + 4; hx < px + 36; hx += 8) {
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(hx, by - 4, 4, 5);
      ctx.fillStyle = '#14101c';
      ctx.fillRect(hx + 4, by - 4, 4, 5);
    }
    // Remaches de unión
    ctx.fillStyle = '#adb5bd';
    ctx.fillRect(px + 2, by - 3, 2, 2);
    ctx.fillRect(px + 36, by - 3, 2, 2);
  } else if (type === 'slab') {
    // Losa de autopista / concreto fracturado con varillas de ferralla expuestas
    ctx.fillStyle = '#14101c';
    ctx.fillRect(px - 1, by - 8, 48, 13);
    ctx.fillStyle = '#343a40';
    ctx.fillRect(px, by - 7, 46, 11);
    ctx.fillStyle = '#495057';
    ctx.fillRect(px + 2, by - 6, 42, 9);
    ctx.fillStyle = '#6c757d';
    ctx.fillRect(px + 4, by - 5, 38, 2); // Capa superficial de rodadura

    // Varillas de hierro corrugado oxidado saliendo de la fractura
    ctx.fillStyle = '#7f4f24';
    ctx.fillRect(px + 44, by - 5, 6, 2);
    ctx.fillRect(px - 5, by - 3, 6, 2);
    ctx.fillStyle = '#a3704c';
    ctx.fillRect(px + 46, by - 4, 3, 1);

    // Algas marinas y musgo adherido al concreto húmedo
    ctx.fillStyle = '#2d6a4f';
    ctx.fillRect(px + 8, by + 1, 14, 3);
    ctx.fillRect(px + 28, by, 10, 4);
  } else if (type === 'car' || type === 'taxi') {
    // Taxi metropolitano urbano amarillo sumergido y a la deriva
    ctx.fillStyle = '#0a1128';
    ctx.fillRect(px - 1, by - 13, 38, 13);
    // Carrocería amarilla
    ctx.fillStyle = '#ffb703';
    ctx.fillRect(px, by - 12, 36, 11);
    ctx.fillStyle = '#fb8500';
    ctx.fillRect(px + 2, by - 8, 32, 7);

    // Franja lateral a cuadros blanco y negro de taxi
    for (let cx = px + 4; cx < px + 32; cx += 4) {
      const isWhite = ((cx - px) % 8 === 4);
      ctx.fillStyle = isWhite ? '#ffffff' : '#14101c';
      ctx.fillRect(cx, by - 7, 4, 2);
    }

    // Parabrisas agrietado reflejando el agua
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(px + 6, by - 11, 7, 4);
    ctx.fillRect(px + 22, by - 11, 8, 4);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(px + 13, by - 11, 2, 4); // Pilar de puerta

    // Letrero luminoso TAXI en el techo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 14, by - 15, 8, 3);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(px + 15, by - 14, 6, 1);

    // Ruedas y faldón en el agua
    ctx.fillStyle = '#212529';
    ctx.fillRect(px + 4, by - 2, 7, 2);
    ctx.fillRect(px + 24, by - 2, 7, 2);
  } else if (type === 'container') {
    // Contenedor de carga flotante a la deriva
    ctx.fillStyle = '#0a1128';
    ctx.fillRect(px - 1, by - 11, 38, 12);
    ctx.fillStyle = '#0077b6';
    ctx.fillRect(px, by - 10, 36, 10);
    // Nervios ondulados
    for (let rx = px + 4; rx < px + 32; rx += 5) {
      ctx.fillStyle = '#023e8a';
      ctx.fillRect(rx, by - 9, 2, 8);
      ctx.fillStyle = '#0096c7';
      ctx.fillRect(rx + 2, by - 9, 2, 8);
    }
    // Cantoneras
    ctx.fillStyle = '#212529';
    ctx.fillRect(px, by - 10, 4, 3);
    ctx.fillRect(px + 32, by - 10, 4, 3);
  }

  // Estela de espuma blanca alrededor de la pieza flotante
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillRect(px - 3, by - 1, 6, 2);
  ctx.fillRect(px + 34, by - 1, 6, 2);
}

function drawKrakenTentacle(ctx, x, y, frame, scale = 1) {
  const px = Math.round(x), py = Math.round(y);
  const wave = Math.sin(frame * 0.05 + x * 0.1) * 8;

  // Anillo de espuma y oleaje turbulento en la base del tentáculo
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillRect(px - 18, py - 4, 36, 5);
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 14, py - 6, 28, 3);
  ctx.fillStyle = '#00b4d8';
  ctx.fillRect(px - 20, py - 2, 40, 2);

  const segs = [
    { dy: -8, w: 16, ox: 0 },
    { dy: -20, w: 14, ox: wave * 0.3 },
    { dy: -32, w: 12, ox: wave * 0.7 },
    { dy: -44, w: 10, ox: wave * 1.0 },
    { dy: -56, w: 7, ox: wave * 1.3 },
    { dy: -66, w: 4, ox: wave * 1.5 }
  ];

  // Contorno oscuro abisal
  ctx.fillStyle = '#000814';
  segs.forEach(s => ctx.fillRect(px + s.ox - s.w / 2 - 1, py + s.dy - 1, s.w + 2, 13));

  // Masa del tentáculo en azul índigo oceánico profundo
  ctx.fillStyle = '#03045e';
  segs.forEach(s => ctx.fillRect(px + s.ox - s.w / 2, py + s.dy, s.w, 12));

  // Reflejo dorsal en azul marino vivo
  ctx.fillStyle = '#0077b6';
  segs.forEach(s => ctx.fillRect(px + s.ox - s.w / 2 + 1, py + s.dy, 2, 12));

  // Ventosas bioluminiscentes en cian y aguamarina brillante
  const pulse = Math.sin(frame * 0.1 + px * 0.05) * 0.25 + 0.75;
  ctx.fillStyle = pulse > 0.8 ? '#00f5d4' : '#caf0f8';
  segs.forEach((s, idx) => {
    if (idx > 0 && idx < 5) {
      // Ventosas laterales
      ctx.fillRect(px + s.ox - s.w / 2 + 2, py + s.dy + 3, 3, 3);
      ctx.fillRect(px + s.ox + s.w / 2 - 4, py + s.dy + 3, 3, 3);
    }
  });
}

function drawDebrisPile(ctx, x, y, frame) {
  const px = Math.round(x), py = Math.round(y);
  // Base de escombros con maderas, tuberías y balizas náuticas
  ctx.fillStyle = '#0a1128';
  ctx.fillRect(px - 18, py - 12, 36, 12);
  ctx.fillStyle = '#343a40';
  ctx.fillRect(px - 16, py - 10, 32, 10);
  ctx.fillStyle = '#7f5539';
  ctx.fillRect(px - 10, py - 14, 18, 5);
  ctx.fillStyle = '#b08968';
  ctx.fillRect(px - 8, py - 13, 14, 2);
  // Señal o boya de advertencia
  ctx.fillStyle = (frame % 30 < 15) ? '#ffd166' : '#d90429';
  ctx.fillRect(px - 4, py - 18, 8, 6);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, py - 16, 4, 2);
}

function drawTsunamiDecoration(ctx, d, frame) {
  const px = Math.round(d.x), py = Math.round(d.y);
  if (d.subType === 'tsunami_wave') drawTsunamiWave(ctx, px, py, d.w || 80, d.h || 24, frame);
  else if (d.subType === 'floating_debris') drawFloatingDebris(ctx, px, py, d.debrisType || 'slab', frame);
  else if (d.subType === 'kraken_tentacle') drawKrakenTentacle(ctx, px, py, frame, d.scale || 1);
  else if (d.subType === 'debris_pile') drawDebrisPile(ctx, px, py, frame);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawTsunamiDecoration = drawTsunamiDecoration;
  SpriteManager.prototype.drawTsunamiWave = drawTsunamiWave;
  SpriteManager.prototype.drawFloatingDebris = drawFloatingDebris;
  SpriteManager.prototype.drawKrakenTentacle = drawKrakenTentacle;
  SpriteManager.prototype.drawDebrisPile = drawDebrisPile;
}

if (typeof module !== 'undefined') {
  module.exports = { drawTsunamiWave, drawFloatingDebris, drawKrakenTentacle, drawDebrisPile, drawTsunamiDecoration };
}


// --- MÓDULO: src/sprites/decorations/space.js ---
// ============================================================================
// SPRITES MUNDO 4: DECORACIONES ESPACIALES Y BASE DE DESPEGUE (PIXEL ART)
// ============================================================================
function drawSpaceRocket(ctx, x, y, stage = 'ready', frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  // Torre de servicio
  ctx.fillStyle = '#120415';
  ctx.fillRect(px - 28, py - 40, 10, 68);
  ctx.fillStyle = '#ff2a70';
  ctx.fillRect(px - 27, py - 38, 8, 2); ctx.fillRect(px - 27, py - 20, 8, 2); ctx.fillRect(px - 27, py - 2, 8, 2);

  // Fuselaje del cohete (blanco puro y lineas rosa neon)
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 14, py - 60, 28, 88);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 12, py - 58, 24, 84);
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(px - 8, py - 70, 16, 12); ctx.fillRect(px - 4, py - 78, 8, 8);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 2, py - 82, 4, 4);

  // Ventanillas circulares
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 4, py - 46, 8, 8);
  ctx.fillStyle = '#ffcad4'; ctx.fillRect(px - 3, py - 45, 6, 6);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 2, py - 44, 2, 2);

  // Aletas laterales
  ctx.fillStyle = '#8f143c'; ctx.fillRect(px - 20, py + 12, 8, 14); ctx.fillRect(px + 12, py + 12, 8, 14);

  // Toberas y llama de preignicion
  ctx.fillStyle = '#3b0820'; ctx.fillRect(px - 10, py + 26, 20, 4);
  const glow = (frame % 8 < 4);
  ctx.fillStyle = glow ? '#ffd166' : '#ff2a70';
  ctx.fillRect(px - 8, py + 30, 16, 3);
}

function drawSpaceRadarDish(ctx, x, y, scale = 1, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  const dy = Math.round(Math.sin(frame * 0.08) * 1.5);

  // Soporte triangular del pedestal
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 8, py - 16, 16, 16);
  ctx.fillStyle = '#120415'; ctx.fillRect(px - 6, py - 14, 12, 14);
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(px - 1, py - 12, 2, 10);
  ctx.fillStyle = '#8f143c'; ctx.fillRect(px - 4, py - 20, 8, 4);

  // Plato parabolico concavo con borde metalico
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 18, py - 38 + dy, 36, 18);
  ctx.fillStyle = '#3b0820'; ctx.fillRect(px - 16, py - 36 + dy, 32, 14);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 14, py - 34 + dy, 28, 10);
  ctx.fillStyle = '#120415'; ctx.fillRect(px - 12, py - 32 + dy, 24, 6);

  // Mastil focal y receptor con destello dorado
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(px - 2, py - 42 + dy, 4, 10);
  ctx.fillStyle = (frame % 20 < 10) ? '#ffd166' : '#ffffff';
  ctx.fillRect(px - 3, py - 44 + dy, 6, 3);
}

function drawSpaceBeacon(ctx, x, y, color = '#ffd166', frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  ctx.fillStyle = '#07020a'; ctx.fillRect(px - 4, py - 18, 8, 18);
  ctx.fillStyle = '#120415'; ctx.fillRect(px - 3, py - 17, 6, 16);
  ctx.fillStyle = '#8f143c'; ctx.fillRect(px - 2, py - 10, 4, 2);

  const blink = (frame % 24 < 12);
  ctx.fillStyle = blink ? color : '#3b0820';
  ctx.fillRect(px - 5, py - 23, 10, 6);
  if (blink) {
    ctx.fillStyle = '#ffffff'; ctx.fillRect(px - 2, py - 22, 4, 4);
    ctx.fillStyle = 'rgba(255, 209, 102, 0.18)'; ctx.fillRect(px - 1, py - 38, 2, 15);
  }
}

function drawSpaceTerminal(ctx, x, y, w = 32, h = 20, frame = 0) {
  const px = Math.round(x), py = Math.round(y);
  ctx.fillStyle = '#07020a'; ctx.fillRect(px, py - h, w, h);
  ctx.fillStyle = '#120415'; ctx.fillRect(px + 2, py - h + 2, w - 4, h - 4);
  ctx.fillStyle = '#ff2a70'; ctx.fillRect(px + 4, py - h + 4, w - 8, 7);
  ctx.fillStyle = '#ffd166';
  const scan = Math.floor(frame * 0.2) % 3;
  ctx.fillRect(px + 6 + scan * 6, py - h + 6, 4, 3);
}

function drawSpaceDecoration(ctx, d, frame) {
  const px = Math.round(d.x), py = Math.round(d.y);
  if (d.subType === 'space_rocket') drawSpaceRocket(ctx, px, py, d.stage, frame);
  else if (d.subType === 'space_radar_dish') drawSpaceRadarDish(ctx, px, py, d.scale || 1, frame);
  else if (d.subType === 'space_beacon') drawSpaceBeacon(ctx, px, py, d.color || '#ffd166', frame);
  else if (d.subType === 'space_terminal') drawSpaceTerminal(ctx, px, py, d.w || 32, d.h || 20, frame);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSpaceDecoration = drawSpaceDecoration;
  SpriteManager.prototype.drawSpaceRocket = drawSpaceRocket;
  SpriteManager.prototype.drawSpaceRadarDish = drawSpaceRadarDish;
  SpriteManager.prototype.drawSpaceBeacon = drawSpaceBeacon;
  SpriteManager.prototype.drawSpaceTerminal = drawSpaceTerminal;
}

if (typeof module !== 'undefined') {
  module.exports = { drawSpaceRocket, drawSpaceRadarDish, drawSpaceBeacon, drawSpaceTerminal, drawSpaceDecoration };
}


// --- MÓDULO: src/sprites/decorations/snow_base.js ---
// ============================================================================
// SPRITES MUNDO 4: DECORACIONES ALPINAS BASE (PIXEL ART)
// ============================================================================
// Cabaña de guardabosques, pinos alpinos nevados, señales de sendero, leña y faroles.

function drawAlpineCabin(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 78;
  const h = 54;

  // 1. Chimenea de piedra y humo ascendente
  const chimX = px + w - 20;
  const chimY = py - h - 10;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(chimX - 1, chimY, 12, 16);
  ctx.fillStyle = '#334155';
  ctx.fillRect(chimX, chimY + 1, 10, 14);
  ctx.fillStyle = '#475569';
  ctx.fillRect(chimX + 2, chimY + 3, 6, 4);

  // Volutas de humo cálido flotando con el viento
  for (let s = 0; s < 3; s++) {
    const sOff = ((frame * 0.4 + s * 14) % 36);
    const sx = chimX + 4 + Math.sin(frame * 0.05 + s) * 5 + sOff * 0.4;
    const sy = chimY - sOff;
    const sRad = 2.5 + sOff * 0.12;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.45 - sOff * 0.012) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Cimientos de piedra alpina
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, py - 10, w + 4, 10);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py - 9, w, 9);
  ctx.fillStyle = '#334155';
  for (let sx = px + 4; sx < px + w - 4; sx += 14) {
    ctx.fillRect(sx, py - 7, 10, 5);
  }

  // 3. Muros de troncos de madera rústica
  ctx.fillStyle = '#27160c';
  ctx.fillRect(px + 4, py - h + 12, w - 8, h - 22);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 5, py - h + 13, w - 10, h - 24);

  for (let ly = py - h + 17; ly < py - 10; ly += 6) {
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(px + 5, ly, w - 10, 1);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(px + 5, ly + 1, w - 10, 4);
  }

  // 4. Puerta de madera con herrajes
  const doorX = px + 12;
  const doorY = py - 28;
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(doorX - 1, doorY - 1, 16, 29);
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(doorX, doorY, 14, 28);
  ctx.fillStyle = '#5d4037';
  ctx.fillRect(doorX + 2, doorY + 2, 10, 24);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(doorX + 10, doorY + 13, 2, 3);

  // 5. Ventana iluminada con luz cálida ámbar
  const winX = px + 44;
  const winY = py - 32;
  const winGrad = ctx.createRadialGradient(winX + 9, winY + 9, 2, winX + 9, winY + 9, 22);
  winGrad.addColorStop(0, 'rgba(255, 209, 102, 0.45)');
  winGrad.addColorStop(1, 'rgba(255, 209, 102, 0)');
  ctx.fillStyle = winGrad;
  ctx.beginPath();
  ctx.arc(winX + 9, winY + 9, 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(winX - 1, winY - 1, 20, 18);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(winX, winY, 18, 16);
  ctx.fillStyle = '#fff3b0';
  ctx.fillRect(winX + 2, winY + 2, 6, 5);
  ctx.fillRect(winX + 10, winY + 2, 6, 5);
  ctx.fillRect(winX + 2, winY + 9, 6, 5);
  ctx.fillRect(winX + 10, winY + 9, 6, 5);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(winX + 8, winY, 2, 16);
  ctx.fillRect(winX, winY + 7, 18, 2);

  // Frontón triangular bajo el tejado
  ctx.fillStyle = '#27160c';
  ctx.beginPath();
  ctx.moveTo(px + 3, py - h + 14);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w - 3, py - h + 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.moveTo(px + 6, py - h + 14);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 8);
  ctx.lineTo(px + w - 6, py - h + 14);
  ctx.closePath();
  ctx.fill();

  // 6. Tejado con manto de nieve
  ctx.fillStyle = '#1c0f08';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - h + 14);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 12);
  ctx.lineTo(px + w + 6, py - h + 14);
  ctx.lineTo(px + w + 2, py - h + 18);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 8);
  ctx.lineTo(px - 2, py - h + 18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#caf0f8';
  ctx.beginPath();
  ctx.moveTo(px - 7, py - h + 13);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 14);
  ctx.lineTo(px + w + 7, py - h + 13);
  ctx.lineTo(px + w + 5, py - h + 6);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 20);
  ctx.lineTo(px - 5, py - h + 6);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 5, py - h + 10);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 17);
  ctx.lineTo(px + w + 5, py - h + 10);
  ctx.lineTo(px + w + 3, py - h + 6);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 20);
  ctx.lineTo(px - 3, py - h + 6);
  ctx.closePath();
  ctx.fill();

  // Carámbanos de hielo
  ctx.fillStyle = '#caf0f8';
  for (let ic = px; ic < px + w; ic += 9) {
    const icLen = 3 + ((ic * 5) % 6);
    ctx.fillRect(ic, py - h + 14, 2, icLen);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ic, py - h + 14, 1, icLen - 1);
    ctx.fillStyle = '#caf0f8';
  }
}

function drawAlpinePine(ctx, x, y, scale = 1, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const treeH = Math.round(70 * scale);
  const treeW = Math.round(44 * scale);

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 4, py - 18, 8, 18);
  ctx.fillStyle = '#3e2723';
  ctx.fillRect(px - 3, py - 17, 6, 17);

  const tiers = [
    { yOff: 14, w: treeW, h: 22 },
    { yOff: 30, w: Math.round(treeW * 0.78), h: 20 },
    { yOff: 46, w: Math.round(treeW * 0.54), h: 18 }
  ];

  for (let i = 0; i < tiers.length; i++) {
    const t = tiers[i];
    const ty = py - t.yOff;
    const halfW = Math.floor(t.w / 2);

    ctx.fillStyle = '#064e3b';
    ctx.beginPath();
    ctx.moveTo(px - halfW, ty);
    ctx.lineTo(px, ty - t.h);
    ctx.lineTo(px + halfW, ty);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#047857';
    ctx.beginPath();
    ctx.moveTo(px - Math.floor(halfW * 0.7), ty);
    ctx.lineTo(px, ty - t.h + 2);
    ctx.lineTo(px + Math.floor(halfW * 0.7), ty);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(px - halfW + 3, ty - 3, t.w - 6, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - halfW + 4, ty - 5, t.w - 8, 4);

    for (let bx = px - halfW + 4; bx < px + halfW - 4; bx += 6) {
      ctx.fillRect(bx, ty - 1, 4, 2);
    }
  }

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 4, py - treeH + 8);
  ctx.lineTo(px, py - treeH);
  ctx.lineTo(px + 4, py - treeH + 8);
  ctx.closePath();
  ctx.fill();
}

function drawAlpineSign(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 3, py - 30, 6, 30);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 2, py - 29, 4, 29);

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 22, py - 30, 44, 11);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 21, py - 29, 42, 9);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 16, py - 26, 32, 3);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 14, py - 27, 4, 5);

  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 18, py - 18, 38, 10);
  ctx.fillStyle = '#92400e';
  ctx.fillRect(px - 17, py - 17, 36, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 12, py - 15, 26, 3);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 22, py - 32, 44, 3);
  ctx.fillRect(px - 18, py - 20, 38, 2);
}

function drawFirewoodPile(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  const logs = [
    { x: px - 12, y: py - 7, r: 6 },
    { x: px, y: py - 7, r: 6 },
    { x: px + 12, y: py - 7, r: 6 },
    { x: px - 6, y: py - 15, r: 6 },
    { x: px + 6, y: py - 15, r: 6 },
    { x: px, y: py - 22, r: 6 }
  ];

  for (const log of logs) {
    ctx.fillStyle = '#1c0f08';
    ctx.beginPath();
    ctx.arc(log.x, log.y, log.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(log.x, log.y, log.r - 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.arc(log.x, log.y, log.r - 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#451a03';
    ctx.fillRect(log.x - 1, log.y - 1, 2, 2);
  }

  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 14, py - 25, 28, 4);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 12, py - 27, 24, 4);
}

function drawSnowLantern(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, py - 36, 4, 36);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 1, py - 35, 2, 35);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 36, 10, 3);
  ctx.fillRect(px + 8, py - 34, 3, 5);

  const lanX = px + 7;
  const lanY = py - 29;

  const flicker = Math.sin(frame * 0.2) * 2;
  const rad = 24 + flicker;
  const glowGrad = ctx.createRadialGradient(lanX + 3, lanY + 6, 1, lanX + 3, lanY + 6, rad);
  glowGrad.addColorStop(0, 'rgba(255, 209, 102, 0.45)');
  glowGrad.addColorStop(1, 'rgba(255, 209, 102, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(lanX + 3, lanY + 6, rad, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(lanX - 1, lanY - 1, 8, 14);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(lanX, lanY, 6, 12);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(lanX + 1, lanY + 2, 4, 4);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(lanX - 2, lanY - 3, 10, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(lanX - 2, py - 32, 10, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawAlpineCabin = drawAlpineCabin;
  SpriteManager.prototype.drawAlpinePine = drawAlpinePine;
  SpriteManager.prototype.drawAlpineSign = drawAlpineSign;
  SpriteManager.prototype.drawFirewoodPile = drawFirewoodPile;
  SpriteManager.prototype.drawSnowLantern = drawSnowLantern;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawAlpineCabin,
    drawAlpinePine,
    drawAlpineSign,
    drawFirewoodPile,
    drawSnowLantern
  };
}


// --- MÓDULO: src/sprites/decorations/snow_structures.js ---
// ============================================================================
// SPRITES MUNDO 4: ESTRUCTURAS GLACIARES Y ESCALADA ALPINAS (PIXEL ART)
// ============================================================================
// Escaleras heladas, cúmulos de cristales de hielo radiante y cuerdas fijas de altura.

function drawFrozenLadder(ctx, x, y, h = 48, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Pernos de anclaje de titanio incrustados en la pared de hielo
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 4, py - h, 4, 4);
  ctx.fillRect(px + 12, py - h, 4, 4);
  ctx.fillRect(px - 4, py - 4, 4, 4);
  ctx.fillRect(px + 12, py - 4, 4, 4);

  // 2. Rieles laterales verticales de escalada
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 1, py - h, 3, h);
  ctx.fillRect(px + 10, py - h, 3, h);

  ctx.fillStyle = '#475569';
  ctx.fillRect(px, py - h, 1, h);
  ctx.fillRect(px + 11, py - h, 1, h);

  // 3. Peldaños de aleación de montaña con escarcha de hielo
  for (let ry = py - h + 6; ry <= py - 4; ry += 10) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(px, ry, 12, 3);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(px, ry + 1, 12, 1);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 1, ry, 10, 1); // Escarcha superior
  }

  // 4. Carámbanos de condensación en el peldaño inferior
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px + 2, py - 1, 2, 4);
  ctx.fillRect(px + 8, py - 1, 2, 5);
}

function drawIceCrystalCluster(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Resplandor áurico glacial suave
  const glow = Math.sin(frame * 0.08 + px * 0.05) * 0.15 + 0.35;
  const rad = 14;
  const glowGrad = ctx.createRadialGradient(px, py - 8, 2, px, py - 8, rad);
  glowGrad.addColorStop(0, 'rgba(144, 224, 239, ' + glow.toFixed(2) + ')');
  glowGrad.addColorStop(1, 'rgba(0, 180, 216, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(px, py - 8, rad, 0, Math.PI * 2);
  ctx.fill();

  // 1. Cristal central alto
  ctx.fillStyle = '#023e8a';
  ctx.beginPath();
  ctx.moveTo(px - 4, py);
  ctx.lineTo(px, py - 18);
  ctx.lineTo(px + 4, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.moveTo(px - 3, py);
  ctx.lineTo(px, py - 17);
  ctx.lineTo(px + 2, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#90e0ef';
  ctx.beginPath();
  ctx.moveTo(px - 1, py);
  ctx.lineTo(px, py - 17);
  ctx.lineTo(px + 2, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - 18, 2, 3);

  // 2. Cristal izquierdo inclinado
  ctx.fillStyle = '#023e8a';
  ctx.beginPath();
  ctx.moveTo(px - 8, py);
  ctx.lineTo(px - 6, py - 12);
  ctx.lineTo(px - 2, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#48cae4';
  ctx.beginPath();
  ctx.moveTo(px - 7, py);
  ctx.lineTo(px - 6, py - 11);
  ctx.lineTo(px - 3, py);
  ctx.closePath();
  ctx.fill();

  // 3. Cristal derecho menor
  ctx.fillStyle = '#023e8a';
  ctx.beginPath();
  ctx.moveTo(px + 2, py);
  ctx.lineTo(px + 6, py - 10);
  ctx.lineTo(px + 8, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#caf0f8';
  ctx.beginPath();
  ctx.moveTo(px + 3, py);
  ctx.lineTo(px + 6, py - 9);
  ctx.lineTo(px + 7, py);
  ctx.closePath();
  ctx.fill();

  // Base de escarcha de nieve
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 10, py - 2, 20, 2);
}

function drawHangingRope(ctx, x, y, h = 40, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Placa de anclaje superior de aleación roja
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(px - 3, py, 6, 4);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 1, py + 1, 2, 2);

  // Oscilación suave con el viento polar
  const windSway = Math.sin(frame * 0.05 + px * 0.01) * 3;

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, py + 4);
  ctx.quadraticCurveTo(px + windSway * 0.5, py + h * 0.5, px + windSway, py + h);
  ctx.stroke();

  // Mosquetón y lazo final en el extremo inferior
  const endX = px + windSway;
  const endY = py + h;
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(Math.round(endX) - 2, Math.round(endY), 4, 5);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(Math.round(endX) - 1, Math.round(endY) + 1, 2, 3);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawFrozenLadder = drawFrozenLadder;
  SpriteManager.prototype.drawIceCrystalCluster = drawIceCrystalCluster;
  SpriteManager.prototype.drawHangingRope = drawHangingRope;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawFrozenLadder,
    drawIceCrystalCluster,
    drawHangingRope
  };
}


// --- MÓDULO: src/sprites/decorations/snow_village.js ---
// ============================================================================
// SPRITES MUNDO 4: DECORACIONES DEL PUEBLO NEVADO Y TABERNA (PIXEL ART)
// ============================================================================
// Fachada de la taberna, gran chimenea de piedra, barra rústica y mesas alpinas.

function drawAlpineTavernFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 110;
  const h = 76;

  // 1. Chimenea de piedra en el tejado con humo continuo
  const chimX = px + w - 24;
  const chimY = py - h - 14;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(chimX - 1, chimY, 14, 20);
  ctx.fillStyle = '#334155';
  ctx.fillRect(chimX, chimY + 1, 12, 18);
  ctx.fillStyle = '#475569';
  ctx.fillRect(chimX + 2, chimY + 3, 8, 5);

  // Volutas de humo cálido flotando
  for (let s = 0; s < 4; s++) {
    const sOff = ((frame * 0.45 + s * 12) % 40);
    const sx = chimX + 5 + Math.sin(frame * 0.06 + s) * 6 + sOff * 0.35;
    const sy = chimY - sOff;
    const sRad = 2.5 + sOff * 0.12;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.5 - sOff * 0.012) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Base de piedra sillar oscura
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#334155';
  for (let sx = px + 6; sx < px + w - 6; sx += 18) {
    ctx.fillRect(sx, py - 11, 12, 7);
  }

  // 3. Muros de troncos de abeto oscuro
  ctx.fillStyle = '#27160c';
  ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  for (let ly = py - h + 20; ly < py - 14; ly += 7) {
    ctx.fillStyle = '#1c0f08';
    ctx.fillRect(px + 6, ly, w - 12, 1);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(px + 6, ly + 1, w - 12, 5);
  }

  // 4. Puerta de entrada arqueada con herrajes de bronce
  const doorX = px + Math.floor(w / 2) - 12;
  const doorY = py - 32;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(doorX - 2, doorY - 2, 24, 34);
  ctx.fillStyle = '#27160c';
  ctx.fillRect(doorX, doorY, 20, 32);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(doorX + 2, doorY + 2, 16, 28);
  // Picaporte dorado
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(doorX + 14, doorY + 14, 2, 4);

  // Farol sobre la puerta con resplandor cálido
  const lanX = doorX + 8;
  const lanY = doorY - 12;
  const glowGrad = ctx.createRadialGradient(lanX + 2, lanY + 3, 1, lanX + 2, lanY + 3, 16);
  glowGrad.addColorStop(0, 'rgba(255, 209, 102, 0.45)');
  glowGrad.addColorStop(1, 'rgba(255, 209, 102, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(lanX + 2, lanY + 3, 16, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffd166';
  ctx.fillRect(lanX, lanY, 5, 7);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(lanX + 1, lanY + 1, 3, 3);

  // 5. Ventanales con celosía y luz cálida
  const winY = py - 36;
  const winW = 18;
  const winH = 20;
  [px + 14, px + w - 32].forEach(wx => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(wx - 1, winY - 1, winW + 2, winH + 2);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(wx, winY, winW, winH);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wx + 2, winY + 2, 6, 6);
    // Travesaño de madera
    ctx.fillStyle = '#27160c';
    ctx.fillRect(wx + Math.floor(winW / 2) - 1, winY, 2, winH);
    ctx.fillRect(wx, winY + Math.floor(winH / 2) - 1, winW, 2);
  });

  // 6. Letrero colgante: "EL REFUGIO CÁLIDO"
  ctx.fillStyle = '#78350f';
  ctx.fillRect(doorX - 14, doorY - 18, 48, 8);
  ctx.fillStyle = '#ffd166';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('REFUGIO CÁLIDO', doorX + 10, doorY - 12);

  // 7. Tejado a dos aguas con gruesa nieve virgen
  ctx.fillStyle = '#1c0f08';
  ctx.beginPath();
  ctx.moveTo(px - 10, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 12);
  ctx.lineTo(px + w + 10, py - h + 16);
  ctx.closePath();
  ctx.fill();

  // Nieve acumulada en el tejado
  ctx.fillStyle = '#caf0f8';
  ctx.beginPath();
  ctx.moveTo(px - 14, py - h + 18);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 16);
  ctx.lineTo(px + w + 14, py - h + 18);
  ctx.lineTo(px + w + 10, py - h + 14);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px - 10, py - h + 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 12, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 18);
  ctx.lineTo(px + w + 12, py - h + 16);
  ctx.lineTo(px + w + 8, py - h + 13);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 13);
  ctx.lineTo(px - 8, py - h + 13);
  ctx.closePath();
  ctx.fill();

  // Carámbanos colgantes del alero
  for (let ix = px - 6; ix < px + w + 8; ix += 12) {
    const iLen = 4 + ((ix * 7) % 6);
    ctx.fillStyle = '#caf0f8';
    ctx.fillRect(ix, py - h + 16, 2, iLen);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ix, py - h + 16, 1, iLen - 1);
  }
}

function drawTavernFireplace(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Hogar de piedra de río
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 18, py - 42, 36, 42);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 16, py - 40, 32, 40);

  // Hueco interior del fuego
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 10, py - 24, 20, 24);

  // Troncos ardiendo
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 8, py - 5, 16, 5);

  // Llamas animadas y brasas
  const fShift = (frame * 0.2) % 4;
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.moveTo(px - 7, py - 5);
  ctx.lineTo(px - 2 + fShift, py - 18 - (frame % 3));
  ctx.lineTo(px + 7, py - 5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(px - 5, py - 5);
  ctx.lineTo(px + (fShift % 2), py - 15 - ((frame + 1) % 4));
  ctx.lineTo(px + 5, py - 5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 2, py - 10, 4, 6);

  // Resplandor cálido envolvente
  const glow = ctx.createRadialGradient(px, py - 12, 4, px, py - 12, 32);
  glow.addColorStop(0, 'rgba(255, 140, 0, 0.4)');
  glow.addColorStop(1, 'rgba(255, 140, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(px, py - 12, 32, 0, Math.PI * 2);
  ctx.fill();

  // Repisa de madera superior con jarra
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 20, py - 44, 40, 4);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 6, py - 52, 6, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 5, py - 50, 2, 2);
}

function drawTavernCounter(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 46;
  const h = 26;

  // Barra de madera lustrosa
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px, py - h, w, h);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 2, py - h + 2, w - 4, h - 2);

  // Tablón superior pulido
  ctx.fillStyle = '#92400e';
  ctx.fillRect(px - 2, py - h - 3, w + 4, 4);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 1, py - h - 3, w + 2, 1);

  // Tazas de cacao humeante en la barra
  [px + 8, px + 26].forEach((mx, i) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(mx, py - h - 10, 7, 7);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(mx + 1, py - h - 9, 5, 2);
    // Vapor flotante
    const vapOff = (frame * 0.3 + i * 8) % 12;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.5 - vapOff * 0.04) + ')';
    ctx.fillRect(mx + 2 + Math.sin(frame * 0.1 + i) * 2, py - h - 12 - vapOff, 2, 2);
  });
}

function drawTavernTable(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Mesa redonda de madera
  ctx.fillStyle = '#27160c';
  ctx.fillRect(px - 3, py - 16, 6, 16);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 16, py - 19, 32, 4);
  ctx.fillStyle = '#92400e';
  ctx.fillRect(px - 15, py - 19, 30, 1);

  // Taburetes laterales
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 22, py - 10, 8, 10);
  ctx.fillRect(px + 14, py - 10, 8, 10);

  // Vela en botella en el centro
  ctx.fillStyle = '#10b981';
  ctx.fillRect(px - 2, py - 24, 4, 5);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 1, py - 27, 2, 3);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 1, py - 29, 2, 2);
}

function drawVillageStreetSign(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Poste de madera
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 2, py - 32, 4, 32);

  // Flecha 1: "TABERNA"
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 18, py - 30, 24, 8);
  ctx.fillStyle = '#ffd166';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TABERNA', px - 7, py - 24);

  // Flecha 2: "TIENDAS ->"
  ctx.fillStyle = '#92400e';
  ctx.fillRect(px - 4, py - 20, 26, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillText('TIENDA ->', px + 9, py - 14);

  // Nieve sobre las señales
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 19, py - 31, 26, 2);
  ctx.fillRect(px - 5, py - 21, 28, 2);
}

function drawHatShopFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100, h = 76;

  // 1. Muro de piedra y tablas de madera verde bosque
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#064e3b'; ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#047857'; ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  // 2. Vitrina iluminada con gorros de lana
  const winX = px + 10, winY = py - 40, winW = 34, winH = 26;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(winX - 1, winY - 1, winW + 2, winH + 2);
  ctx.fillStyle = '#fef08a'; ctx.fillRect(winX, winY, winW, winH);
  // Gorro rojo
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(winX + 10, winY + 16, 6, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#ffffff'; ctx.fillRect(winX + 4, winY + 16, 12, 3);
  ctx.beginPath(); ctx.arc(winX + 10, winY + 9, 2.5, 0, Math.PI * 2); ctx.fill();
  // Gorro azul con orejeras
  ctx.fillStyle = '#0284c7';
  ctx.beginPath(); ctx.arc(winX + 24, winY + 16, 6, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#ffd166'; ctx.fillRect(winX + 18, winY + 16, 12, 3);
  ctx.fillRect(winX + 18, winY + 19, 3, 4); ctx.fillRect(winX + 27, winY + 19, 3, 4);
  ctx.strokeStyle = '#065f46'; ctx.lineWidth = 1.5; ctx.strokeRect(winX, winY, winW, winH);

  // 3. Puerta de entrada elegante
  const doorX = px + 56, doorY = py - 34;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(doorX - 2, doorY - 2, 22, 36);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(doorX, doorY, 18, 34);
  ctx.fillStyle = '#0f766e'; ctx.fillRect(doorX + 2, doorY + 2, 14, 30);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(doorX + 12, doorY + 16, 2, 4);

  // Farol sobre la puerta
  const lanX = doorX + 7, lanY = doorY - 10;
  const glow = ctx.createRadialGradient(lanX + 2, lanY + 3, 1, lanX + 2, lanY + 3, 14);
  glow.addColorStop(0, 'rgba(255, 220, 100, 0.4)');
  glow.addColorStop(1, 'rgba(255, 220, 100, 0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(lanX + 2, lanY + 3, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffd166'; ctx.fillRect(lanX, lanY, 4, 6);

  // 4. Cartel superior: "EL GORRO NEVADO"
  ctx.fillStyle = '#042f2e';
  ctx.fillRect(px + 14, py - h + 6, 72, 9);
  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EL GORRO NEVADO', px + 50, py - h + 13);

  // 5. Tejado a dos aguas con nieve
  ctx.fillStyle = '#134e4a';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w + 8, py - h + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.moveTo(px - 12, py - h + 18);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 14);
  ctx.lineTo(px + w + 12, py - h + 18);
  ctx.lineTo(px + w + 8, py - h + 13);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 8);
  ctx.lineTo(px - 8, py - h + 13);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 10, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 16);
  ctx.lineTo(px + w + 10, py - h + 16);
  ctx.lineTo(px + w + 6, py - h + 12);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 11);
  ctx.lineTo(px - 6, py - h + 12);
  ctx.closePath();
  ctx.fill();
}

function drawShopDisplayRack(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Perchero de madera noble
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 1, py - 36, 3, 36);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 8, py - 3, 17, 3);
  // Ganchos superiores
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 12, py - 34, 25, 2);
  // Bufandas colgando
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(px - 10, py - 32, 5, 20);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 10, py - 24, 5, 3);
  // Capa verde
  ctx.fillStyle = '#059669';
  ctx.fillRect(px + 4, py - 32, 8, 24);
  ctx.fillStyle = '#34d399';
  ctx.fillRect(px + 6, py - 30, 4, 18);
}

function drawMannequinWithHat(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Base y poste
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 6, py - 2, 12, 2);
  ctx.fillRect(px - 1, py - 30, 2, 28);

  // Torso del maniquí con abrigo invernal de lana
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px - 6, py - 26, 12, 14);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(px - 5, py - 25, 10, 12);
  // Botones dorados
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px, py - 23, 1, 2);
  ctx.fillRect(px, py - 19, 1, 2);
  ctx.fillRect(px, py - 15, 1, 2);

  // Cabeza con gorro chullo andino/nepalí
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(px, py - 31, 5, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(px - 5, py - 31, 10, 3);
  // Orejeras del chullo
  ctx.fillRect(px - 5, py - 28, 2, 5);
  ctx.fillRect(px + 3, py - 28, 2, 5);
  // Pompón
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(px, py - 37, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawAlpineTavernFacade = drawAlpineTavernFacade;
  SpriteManager.prototype.drawTavernFireplace = drawTavernFireplace;
  SpriteManager.prototype.drawTavernCounter = drawTavernCounter;
  SpriteManager.prototype.drawTavernTable = drawTavernTable;
  SpriteManager.prototype.drawVillageStreetSign = drawVillageStreetSign;
  SpriteManager.prototype.drawHatShopFacade = drawHatShopFacade;
  SpriteManager.prototype.drawShopDisplayRack = drawShopDisplayRack;
  SpriteManager.prototype.drawMannequinWithHat = drawMannequinWithHat;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawAlpineTavernFacade,
    drawTavernFireplace,
    drawTavernCounter,
    drawTavernTable,
    drawVillageStreetSign,
    drawHatShopFacade,
    drawShopDisplayRack,
    drawMannequinWithHat
  };
}


// --- MÓDULO: src/sprites/decorations/snow_village_cabins.js ---
// ============================================================================
// SPRITES MUNDO 4: CABAÑA DE GASTON EL MELANCÓLICO (PIXEL ART)
// ============================================================================
// Fachada exterior desvencijada, mobiliario melancólico y pedestal del Pico de Hielo.

function drawDepressedCabinFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100, h = 76;

  // 1. Chimenea desvencijada con humo pálido y lánguido
  const chimX = px + w - 24;
  const chimY = py - h - 12;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(chimX - 1, chimY, 14, 18);
  ctx.fillStyle = '#334155'; ctx.fillRect(chimX, chimY + 1, 12, 16);
  // Humo grisáceo lento
  for (let s = 0; s < 3; s++) {
    const sOff = ((frame * 0.25 + s * 16) % 36);
    const sx = chimX + 5 + Math.sin(frame * 0.04 + s) * 4;
    const sy = chimY - sOff;
    ctx.fillStyle = 'rgba(148, 163, 184, ' + Math.max(0, 0.4 - sOff * 0.01) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, 2 + sOff * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Base de roca oscura y muros de tablas desgastadas
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#334155'; ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  // Listones de madera horizontales descoloridos
  for (let ly = py - h + 20; ly < py - 14; ly += 8) {
    ctx.fillStyle = '#0f172a'; ctx.fillRect(px + 6, ly, w - 12, 1);
    ctx.fillStyle = '#475569'; ctx.fillRect(px + 6, ly + 1, w - 12, 6);
  }

  // 3. Ventana empañada y solitaria
  const winX = px + 14, winY = py - 38, winW = 24, winH = 22;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(winX - 1, winY - 1, winW + 2, winH + 2);
  ctx.fillStyle = '#475569'; ctx.fillRect(winX, winY, winW, winH);
  ctx.fillStyle = '#64748b'; ctx.fillRect(winX + 2, winY + 2, winW - 4, winH - 4);
  // Reflejo empañado
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.moveTo(winX + 4, winY + 4);
  ctx.lineTo(winX + 16, winY + 4);
  ctx.lineTo(winX + 4, winY + 16);
  ctx.closePath();
  ctx.fill();

  // 4. Puerta desvencijada con letrero ligeramente torcido
  const doorX = px + 56, doorY = py - 34;
  ctx.fillStyle = '#0f172a'; ctx.fillRect(doorX - 2, doorY - 2, 22, 36);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(doorX, doorY, 18, 34);
  ctx.fillStyle = '#334155'; ctx.fillRect(doorX + 2, doorY + 2, 14, 30);
  ctx.fillStyle = '#64748b'; ctx.fillRect(doorX + 12, doorY + 16, 2, 4); // Picaporte oxidado

  // Letrero ligeramente torcido: "CABAÑA DE GASTON"
  ctx.save();
  ctx.translate(doorX + 9, doorY - 12);
  ctx.rotate(-0.06); // Torcido por la melancolía
  ctx.fillStyle = '#1e293b'; ctx.fillRect(-32, -5, 64, 10);
  ctx.fillStyle = '#334155'; ctx.fillRect(-31, -4, 62, 8);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 4.5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CABAÑA DE GASTON', 0, 2);
  ctx.restore();

  // Farol tenue
  const lanX = doorX + 7, lanY = doorY - 10;
  ctx.fillStyle = '#1e293b'; ctx.fillRect(lanX, lanY, 4, 6);
  ctx.fillStyle = '#fbbf24'; ctx.fillRect(lanX + 1, lanY + 2, 2, 2);

  // 5. Tejado nevado con nieve acumulada
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w + 8, py - h + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(px - 12, py - h + 18);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 14);
  ctx.lineTo(px + w + 12, py - h + 18);
  ctx.lineTo(px + w + 8, py - h + 13);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 8);
  ctx.lineTo(px - 8, py - h + 13);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 10, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 16);
  ctx.lineTo(px + w + 10, py - h + 16);
  ctx.lineTo(px + w + 6, py - h + 12);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 11);
  ctx.lineTo(px - 6, py - h + 12);
  ctx.closePath();
  ctx.fill();
}

function drawDepressedRoomFurniture(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Sillón descolorido con parche
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 14, py - 20, 28, 20);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px - 12, py - 18, 24, 18);
  ctx.fillStyle = '#334155'; ctx.fillRect(px - 10, py - 14, 20, 14);
  // Parche marrón en el respaldo
  ctx.fillStyle = '#78350f'; ctx.fillRect(px - 6, py - 18, 6, 5);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 5, py - 17, 4, 1);

  // Mesa pequeña al lado con taza solitaria
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px + 18, py - 14, 14, 14);
  ctx.fillStyle = '#78350f'; ctx.fillRect(px + 16, py - 16, 18, 3);
  // Taza vacía y cuchara
  ctx.fillStyle = '#e2e8f0'; ctx.fillRect(px + 20, py - 21, 5, 5);
  ctx.fillStyle = '#94a3b8'; ctx.fillRect(px + 26, py - 18, 4, 1);
}

function drawIcePickStand(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Pedestal de madera noble oscura
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 12, py - 22, 24, 22);
  ctx.fillStyle = '#1e293b'; ctx.fillRect(px - 10, py - 20, 20, 20);
  ctx.fillStyle = '#334155'; ctx.fillRect(px - 8, py - 18, 16, 18);

  // Placa dorada en el pedestal
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px - 6, py - 8, 12, 4);
  ctx.fillStyle = '#b45309'; ctx.fillRect(px - 5, py - 7, 10, 2);

  // El Gran Pico de Hielo Profesional (Ice Pick)
  const bob = Math.sin(frame * 0.12) * 2;
  const pickY = py - 32 + bob;

  // Destellos mágicos de hielo glacial
  const glow = ctx.createRadialGradient(px, pickY, 2, px, pickY, 24);
  glow.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  glow.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(px, pickY, 24, 0, Math.PI * 2);
  ctx.fill();

  // Mango ergonómico del pico
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 2, pickY - 4, 4, 20);
  ctx.fillStyle = '#334155'; ctx.fillRect(px - 1, pickY - 2, 2, 16);
  // Grip de goma azul
  ctx.fillStyle = '#0284c7'; ctx.fillRect(px - 2, pickY + 6, 4, 6);

  // Cabeza afilada de doble piolet en titanio glacial
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px - 12, pickY - 6);
  ctx.lineTo(px, pickY - 9);
  ctx.lineTo(px + 12, pickY - 5);
  ctx.lineTo(px + 10, pickY - 2);
  ctx.lineTo(px, pickY - 4);
  ctx.lineTo(px - 10, pickY - 3);
  ctx.closePath();
  ctx.fill();

  // Filo cortante ultra brillante
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 12, pickY - 6, 4, 2);
  ctx.fillRect(px + 8, pickY - 5, 4, 2);

  // Destello estelar brillante intermitente
  if ((frame % 20) < 10) {
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(px - 1, pickY - 11, 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawDepressedCabinFacade = drawDepressedCabinFacade;
  SpriteManager.prototype.drawDepressedRoomFurniture = drawDepressedRoomFurniture;
  SpriteManager.prototype.drawIcePickStand = drawIcePickStand;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawDepressedCabinFacade,
    drawDepressedRoomFurniture,
    drawIcePickStand
  };
}


// --- MÓDULO: src/sprites/decorations/snow_arcade.js ---
// ============================================================================
// SPRITES MUNDO 4: SALA ARCADE RETRO "ARCADE POLAR" (PIXEL ART)
// ============================================================================
// Fachada exterior con marquesina de neón, gabinetes arcade y rótulos fluorescentes.

function drawArcadeFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100, h = 76;

  // 1. Base y muros de ladrillo retro violeta oscuro
  ctx.fillStyle = '#0f051d'; ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#1e0a38'; ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#2e1065'; ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#3b0764'; ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  // Ribetes de neón magenta y cian en las esquinas
  const neonCyan = (frame % 30 < 25) ? '#06b6d4' : '#0891b2';
  const neonPink = (frame % 40 < 32) ? '#ec4899' : '#be185d';
  ctx.fillStyle = neonCyan;
  ctx.fillRect(px + 4, py - h + 14, 2, h - 28);
  ctx.fillStyle = neonPink;
  ctx.fillRect(px + w - 6, py - h + 14, 2, h - 28);

  // 2. Vitrina retro con pósteres pixel art fluorescentes
  const winX = px + 10, winY = py - 40, winW = 34, winH = 26;
  ctx.fillStyle = '#0f051d'; ctx.fillRect(winX - 1, winY - 1, winW + 2, winH + 2);
  ctx.fillStyle = '#1e1b4b'; ctx.fillRect(winX, winY, winW, winH);

  // Mini marcianito pixel art de neón en la vitrina
  const invPulse = (frame * 0.1) % 2 < 1;
  ctx.fillStyle = '#22c55e';
  // Marciano 8-bit
  ctx.fillRect(winX + 12, winY + 6, 10, 2);
  ctx.fillRect(winX + 10, winY + 8, 14, 4);
  ctx.fillRect(winX + 8, winY + 12, 18, 4);
  ctx.fillStyle = '#0f051d';
  ctx.fillRect(winX + 12, winY + 10, 2, 2);
  ctx.fillRect(winX + 20, winY + 10, 2, 2);
  ctx.fillStyle = '#22c55e';
  if (invPulse) {
    ctx.fillRect(winX + 8, winY + 16, 4, 3);
    ctx.fillRect(winX + 22, winY + 16, 4, 3);
  } else {
    ctx.fillRect(winX + 10, winY + 16, 4, 3);
    ctx.fillRect(winX + 20, winY + 16, 4, 3);
  }
  ctx.strokeStyle = '#ec4899'; ctx.lineWidth = 1.2; ctx.strokeRect(winX, winY, winW, winH);

  // 3. Puerta de entrada con halo de neón
  const doorX = px + 56, doorY = py - 34;
  ctx.fillStyle = '#0f051d'; ctx.fillRect(doorX - 2, doorY - 2, 22, 36);
  ctx.fillStyle = '#1e1b4b'; ctx.fillRect(doorX, doorY, 18, 34);
  ctx.fillStyle = '#4338ca'; ctx.fillRect(doorX + 2, doorY + 2, 14, 30);
  // Cristalera con luz interior magenta
  ctx.fillStyle = 'rgba(236, 72, 153, 0.35)'; ctx.fillRect(doorX + 4, doorY + 4, 10, 16);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(doorX + 12, doorY + 16, 2, 4); // Picaporte

  // 4. Gran Marquesina Superior: "ARCADE POLAR" con bombillas parpadeantes
  const marqX = px + 8, marqY = py - h + 5;
  ctx.fillStyle = '#0f051d'; ctx.fillRect(marqX - 1, marqY - 1, 84, 12);
  ctx.fillStyle = '#31104b'; ctx.fillRect(marqX, marqY, 82, 10);
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 5.5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ARCADE POLAR', px + 50, marqY + 7);

  // Bombillitas de la marquesina
  for (let bx = marqX + 2; bx < marqX + 80; bx += 8) {
    const isLit = (Math.floor(frame / 6) + Math.floor(bx / 8)) % 2 === 0;
    ctx.fillStyle = isLit ? '#facc15' : '#713f12';
    ctx.fillRect(bx, marqY, 2, 1);
    ctx.fillRect(bx, marqY + 9, 2, 1);
  }

  // 5. Tejado a dos aguas nevado con nieve que contrasta con el neón
  ctx.fillStyle = '#1e0a38';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w + 8, py - h + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e0e7ff';
  ctx.beginPath();
  ctx.moveTo(px - 12, py - h + 18);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 14);
  ctx.lineTo(px + w + 12, py - h + 18);
  ctx.lineTo(px + w + 8, py - h + 13);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 8);
  ctx.lineTo(px - 8, py - h + 13);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 10, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 16);
  ctx.lineTo(px + w + 10, py - h + 16);
  ctx.lineTo(px + w + 6, py - h + 12);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 11);
  ctx.lineTo(px - 6, py - h + 12);
  ctx.closePath();
  ctx.fill();
}

function drawArcadeCabinet(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 26, h = 38;

  // 1. Chasis del mueble arcade
  ctx.fillStyle = '#0f051d'; ctx.fillRect(px - Math.floor(w / 2) - 1, py - h - 1, w + 2, h + 2);
  ctx.fillStyle = '#2e1065'; ctx.fillRect(px - Math.floor(w / 2), py - h, w, h);

  // Moldura lateral en T (T-molding) brillante
  const tColor = (frame % 20 < 10) ? '#06b6d4' : '#ec4899';
  ctx.fillStyle = tColor;
  ctx.fillRect(px - Math.floor(w / 2), py - h, 2, h);
  ctx.fillRect(px + Math.floor(w / 2) - 2, py - h, 2, h);

  // 2. Marquesina retro iluminada
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - h + 2, w - 4, 7);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 4.5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('YETI-99', px, py - h + 7);

  // 3. Monitor CRT curvo inclinado
  const scW = 18, scH = 14;
  const scX = px - 9, scY = py - h + 11;
  ctx.fillStyle = '#09090b'; ctx.fillRect(scX, scY, scW, scH);
  ctx.fillStyle = '#022c22'; ctx.fillRect(scX + 1, scY + 1, scW - 2, scH - 2);

  // Animación del minijuego en la pantalla del gabinete
  const ballX = scX + 3 + ((frame * 0.4) % (scW - 6));
  const ballY = scY + 3 + Math.sin(frame * 0.2) * 3 + 3;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(Math.round(ballX), Math.round(ballY), 2, 2);
  // Paletas verdes
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(scX + 2, scY + 3 + Math.sin(frame * 0.15) * 3, 1.5, 5);
  ctx.fillRect(scX + scW - 3.5, scY + 4 + Math.cos(frame * 0.15) * 3, 1.5, 5);

  // Resplandor del monitor
  const glow = ctx.createRadialGradient(px, scY + 7, 2, px, scY + 7, 18);
  glow.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
  glow.addColorStop(1, 'rgba(6, 182, 212, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(px, scY + 7, 18, 0, Math.PI * 2);
  ctx.fill();

  // 4. Panel de control (Joystick y botones)
  const cpy = py - 12;
  ctx.fillStyle = '#1e1b4b'; ctx.fillRect(px - Math.floor(w / 2) + 2, cpy, w - 4, 5);
  // Joystick rojo
  ctx.fillStyle = '#0f172a'; ctx.fillRect(px - 5, cpy - 2, 2, 3);
  ctx.fillStyle = '#ef4444'; ctx.fillRect(px - 6, cpy - 4, 4, 3);
  // Botones amarillo y cian
  ctx.fillStyle = '#facc15'; ctx.fillRect(px + 2, cpy + 1, 2, 2);
  ctx.fillStyle = '#06b6d4'; ctx.fillRect(px + 6, cpy + 1, 2, 2);

  // 5. Ranura de monedas con luz roja
  ctx.fillStyle = '#0f051d'; ctx.fillRect(px - 4, py - 6, 8, 4);
  ctx.fillStyle = '#ef4444'; ctx.fillRect(px - 2, py - 5, 1, 2); ctx.fillRect(px + 1, py - 5, 1, 2);
}

function drawNeonSignCluster(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Letrero neón de pared: "INSERT COIN"
  const pulse = (frame % 30 < 20);
  ctx.fillStyle = pulse ? '#f43f5e' : 'rgba(244, 63, 94, 0.3)';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('INSERT COIN', px, py - 14);

  // Flecha de neón cian apuntando al gabinete
  ctx.fillStyle = (frame % 20 < 14) ? '#06b6d4' : 'rgba(6, 182, 212, 0.3)';
  ctx.fillRect(px - 1, py - 8, 2, 6);
  ctx.fillRect(px - 3, py - 4, 6, 2);
  ctx.fillRect(px - 5, py - 2, 10, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawArcadeFacade = drawArcadeFacade;
  SpriteManager.prototype.drawArcadeCabinet = drawArcadeCabinet;
  SpriteManager.prototype.drawNeonSignCluster = drawNeonSignCluster;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawArcadeFacade,
    drawArcadeCabinet,
    drawNeonSignCluster
  };
}


// --- MÓDULO: src/sprites/decorations/snow_bakery.js ---
// ============================================================================
// SPRITES MUNDO 4: PANADERÍA Y CASA DE TÉ "EL HORNO DEL YETI" (PIXEL ART)
// ============================================================================
// Fachada exterior cálida, gran horno de leña abovedado y mostrador de repostería.

function drawBakeryFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100, h = 76;

  // 1. Chimenea de arcilla con humo aromático dulce
  const chimX = px + w - 24;
  const chimY = py - h - 14;
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(chimX - 1, chimY, 14, 20);
  ctx.fillStyle = '#78350f'; ctx.fillRect(chimX, chimY + 1, 12, 18);
  ctx.fillStyle = '#b45309'; ctx.fillRect(chimX + 2, chimY + 3, 8, 6);

  // Espirales de humo suave
  for (let s = 0; s < 4; s++) {
    const sOff = ((frame * 0.4 + s * 10) % 36);
    const sx = chimX + 5 + Math.sin(frame * 0.05 + s) * 5 + sOff * 0.2;
    const sy = chimY - sOff;
    ctx.fillStyle = 'rgba(254, 243, 199, ' + Math.max(0, 0.45 - sOff * 0.012) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, 2 + sOff * 0.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Base de piedra y muros de madera color miel tostada
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px - 2, py - 14, w + 4, 14);
  ctx.fillStyle = '#451a03'; ctx.fillRect(px, py - 13, w, 13);
  ctx.fillStyle = '#78350f'; ctx.fillRect(px + 4, py - h + 14, w - 8, h - 28);
  ctx.fillStyle = '#92400e'; ctx.fillRect(px + 6, py - h + 15, w - 12, h - 30);

  // Tablones horizontales cálidos
  for (let ly = py - h + 20; ly < py - 14; ly += 7) {
    ctx.fillStyle = '#451a03'; ctx.fillRect(px + 6, ly, w - 12, 1);
    ctx.fillStyle = '#b45309'; ctx.fillRect(px + 6, ly + 1, w - 12, 5);
  }

  // 3. Gran vitrina arqueada con panes dorados y bollos
  const winX = px + 10, winY = py - 40, winW = 34, winH = 26;
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(winX - 1, winY - 1, winW + 2, winH + 2);
  ctx.fillStyle = '#fef3c7'; ctx.fillRect(winX, winY, winW, winH);

  // Estante interior de la vitrina con panes y cruasanes
  ctx.fillStyle = '#b45309'; ctx.fillRect(winX + 2, winY + 14, winW - 4, 2);
  // Panes dorados
  ctx.fillStyle = '#d97706';
  ctx.fillRect(winX + 4, winY + 8, 7, 5);
  ctx.fillRect(winX + 13, winY + 7, 8, 6);
  ctx.fillStyle = '#fde68a';
  ctx.fillRect(winX + 5, winY + 9, 5, 2);
  // Tetera de cobre en el estante inferior
  ctx.fillStyle = '#ea580c'; ctx.fillRect(winX + 6, winY + 18, 6, 6);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(winX + 10, winY + 17, 4, 2);
  ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1.5; ctx.strokeRect(winX, winY, winW, winH);

  // 4. Puerta de entrada con marco de roble
  const doorX = px + 56, doorY = py - 34;
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(doorX - 2, doorY - 2, 22, 36);
  ctx.fillStyle = '#451a03'; ctx.fillRect(doorX, doorY, 18, 34);
  ctx.fillStyle = '#b45309'; ctx.fillRect(doorX + 2, doorY + 2, 14, 30);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(doorX + 12, doorY + 16, 2, 4); // Picaporte

  // Farol sobre la puerta con halo dorado
  const lanX = doorX + 7, lanY = doorY - 10;
  const glow = ctx.createRadialGradient(lanX + 2, lanY + 3, 1, lanX + 2, lanY + 3, 14);
  glow.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
  glow.addColorStop(1, 'rgba(251, 191, 36, 0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(lanX + 2, lanY + 3, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffd166'; ctx.fillRect(lanX, lanY, 4, 6);

  // 5. Letrero superior: "EL HORNO DEL YETI"
  ctx.fillStyle = '#451a03'; ctx.fillRect(px + 14, py - h + 6, 72, 9);
  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 5px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EL HORNO DEL YETI', px + 50, py - h + 13);

  // 6. Tejado a dos aguas nevado
  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 10);
  ctx.lineTo(px + w + 8, py - h + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fef3c7';
  ctx.beginPath();
  ctx.moveTo(px - 12, py - h + 18);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 14);
  ctx.lineTo(px + w + 12, py - h + 18);
  ctx.lineTo(px + w + 8, py - h + 13);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 8);
  ctx.lineTo(px - 8, py - h + 13);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 10, py - h + 16);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 16);
  ctx.lineTo(px + w + 10, py - h + 16);
  ctx.lineTo(px + w + 6, py - h + 12);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 11);
  ctx.lineTo(px - 6, py - h + 12);
  ctx.closePath();
  ctx.fill();
}

function drawBakeryOven(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Gran horno de piedra refractaria
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px - 20, py - 42, 40, 42);
  ctx.fillStyle = '#78350f'; ctx.fillRect(px - 18, py - 40, 36, 40);

  // Bóveda del horno
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.arc(px, py - 24, 14, Math.PI, 0);
  ctx.fill();

  // Fuego y brasas ardiendo en el interior
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px - 12, py - 24, 24, 24);
  ctx.fillStyle = '#ea580c';
  const fShift = (frame * 0.25) % 4;
  ctx.beginPath();
  ctx.moveTo(px - 10, py - 4);
  ctx.lineTo(px - 2 + fShift, py - 18 - (frame % 3));
  ctx.lineTo(px + 10, py - 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 4);
  ctx.lineTo(px + (fShift % 2), py - 14 - ((frame + 1) % 3));
  ctx.lineTo(px + 6, py - 4);
  ctx.closePath();
  ctx.fill();

  // Resplandor cálido envolvente del horno
  const glow = ctx.createRadialGradient(px, py - 16, 4, px, py - 16, 36);
  glow.addColorStop(0, 'rgba(245, 158, 11, 0.42)');
  glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(px, py - 16, 36, 0, Math.PI * 2); ctx.fill();

  // Repisa superior con botes de especias
  ctx.fillStyle = '#451a03'; ctx.fillRect(px - 22, py - 44, 44, 4);
  ctx.fillStyle = '#10b981'; ctx.fillRect(px - 12, py - 52, 6, 8); // tarro verde
  ctx.fillStyle = '#f59e0b'; ctx.fillRect(px + 4, py - 50, 7, 6); // tarro miel
}

function drawBakeryDisplayCounter(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 46, h = 26;

  // Mostrador de madera pulida
  ctx.fillStyle = '#1c0f08'; ctx.fillRect(px, py - h, w, h);
  ctx.fillStyle = '#78350f'; ctx.fillRect(px + 2, py - h + 2, w - 4, h - 2);

  // Cubierta de mármol blanco
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(px - 2, py - h - 3, w + 4, 4);
  ctx.fillStyle = '#cbd5e1'; ctx.fillRect(px - 1, py - h - 3, w + 2, 1);

  // Bandeja con bollos de canela y tetera humeante
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px + 6, py - h - 8, 12, 5); // bollos
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 8, py - h - 8, 8, 1); // glaseado

  // Tetera de té de mantequilla de yak
  ctx.fillStyle = '#b45309'; ctx.fillRect(px + 26, py - h - 10, 8, 7);
  ctx.fillStyle = '#ffd166'; ctx.fillRect(px + 28, py - h - 12, 4, 2);

  // Vapor flotante aromático
  const vOff = (frame * 0.3) % 14;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.5 - vOff * 0.035) + ')';
  ctx.fillRect(px + 29 + Math.sin(frame * 0.1) * 2, py - h - 14 - vOff, 2, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawBakeryFacade = drawBakeryFacade;
  SpriteManager.prototype.drawBakeryOven = drawBakeryOven;
  SpriteManager.prototype.drawBakeryDisplayCounter = drawBakeryDisplayCounter;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawBakeryFacade,
    drawBakeryOven,
    drawBakeryDisplayCounter
  };
}


// --- MÓDULO: src/sprites/decorations/snow_forge.js ---
// ============================================================================
// SPRITES MUNDO 4: CASA 6 - TALLER DE HERRAMIENTAS Y FORJA DE HIELO
// ============================================================================
// "La Forja del Glaciar" del Maestro Kazi:
// 1. Fachada exterior con chimenea de hierro forjado, chispas y letrero de martillo.
// 2. Horno criogénico de fundición y gran Yunque de Hielo con resplandor azul.
// 3. Estante de herramientas de forja, tenazas, lingotes de hielo y cuba de templado.

function drawForgeFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 100;
  const h = 88;

  // Base de cimientos de piedra volcánica oscura
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 12, w, 12);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 2, py - 10, w - 4, 10);

  // Muros de vigas de madera oscura tratada con herrajes
  ctx.fillStyle = '#261b14';
  ctx.fillRect(px + 4, py - h + 20, w - 8, h - 32);

  // Tablones horizontales y remaches de hierro
  for (let ly = py - h + 24; ly < py - 12; ly += 10) {
    ctx.fillStyle = '#17100b';
    ctx.fillRect(px + 4, ly, w - 8, 1);
    ctx.fillStyle = '#334155';
    // Remaches metálicos en los bordes
    ctx.fillRect(px + 6, ly + 4, 2, 2);
    ctx.fillRect(px + w - 8, ly + 4, 2, 2);
  }

  // Tejado a dos aguas reforzado con tejas de pizarra oscura
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - h + 22);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 4);
  ctx.lineTo(px + w + 6, py - h + 22);
  ctx.closePath();
  ctx.fill();

  // Manto grueso de nieve sobre el tejado
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 21);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 7);
  ctx.lineTo(px + w + 8, py - h + 21);
  ctx.lineTo(px + w + 6, py - h + 25);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 2);
  ctx.lineTo(px - 6, py - h + 25);
  ctx.closePath();
  ctx.fill();

  // Témpanos afilados en los aleros
  ctx.fillStyle = '#bae6fd';
  const icicleOffsets = [4, 16, 28, 44, 56, 72, 84, 94];
  for (let i = 0; i < icicleOffsets.length; i++) {
    const ix = px + icicleOffsets[i];
    const ih = 6 + ((i * 3) % 7);
    ctx.beginPath();
    ctx.moveTo(ix, py - h + 22);
    ctx.lineTo(ix + 3, py - h + 22);
    ctx.lineTo(ix + 1.5, py - h + 22 + ih);
    ctx.closePath();
    ctx.fill();
  }

  // Gran Chimenea de hierro negro con abrazaderas de remaches
  const chimX = px + w - 24;
  const chimY = py - h - 18;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(chimX, chimY, 16, 36);
  ctx.fillStyle = '#334155';
  ctx.fillRect(chimX + 2, chimY, 12, 36);
  // Abrazaderas
  ctx.fillStyle = '#64748b';
  ctx.fillRect(chimX - 1, chimY + 8, 18, 2);
  ctx.fillRect(chimX - 1, chimY + 22, 18, 2);

  // Humo azul criogénico y chispas ámbar de la fragua
  const smokeFrame = Math.sin(frame * 0.12);
  for (let s = 0; s < 3; s++) {
    const sy = chimY - 8 - s * 12;
    const sx = chimX + 6 + Math.sin(frame * 0.08 + s) * 7;
    const sRad = 4 + s * 2;
    ctx.fillStyle = s % 2 === 0 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(251, 146, 60, 0.4)';
    ctx.beginPath();
    ctx.arc(sx, sy, sRad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Letrero de la forja: Yunque y Martillo de Hielo cruzados
  const signX = px + 14;
  const signY = py - 48;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(signX, signY, 24, 18);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(signX + 1, signY + 1, 22, 16);
  // Icono del martillo y yunque
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(signX + 6, signY + 10, 12, 4); // Yunque
  ctx.fillRect(signX + 8, signY + 14, 8, 2); // Base yunque
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(signX + 10, signY + 4, 4, 5); // Cabeza martillo
  ctx.fillStyle = '#b45309';
  ctx.fillRect(signX + 11, signY + 9, 2, 6); // Mango martillo

  // Puerta de entrada arqueada de roble oscuro con bisagras pesadas
  const doorX = px + 44;
  const doorY = py - 38;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(doorX - 2, doorY - 2, 22, 40);
  ctx.fillStyle = '#3f2213';
  ctx.fillRect(doorX, doorY, 18, 38);
  // Bisagras de hierro
  ctx.fillStyle = '#475569';
  ctx.fillRect(doorX, doorY + 6, 8, 3);
  ctx.fillRect(doorX, doorY + 26, 8, 3);
  // Picaporte de bronce
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(doorX + 13, doorY + 18, 3, 3);
}

function drawIceForgeAnvilAndFurnace(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // 1. Horno Criogénico de Fundición (Lado izquierdo)
  const fx = px;
  const fy = py;
  // Bóveda exterior de piedra de basalto
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(fx, fy - 52, 44, 52);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(fx + 2, fy - 50, 40, 50);

  // Campana de extracción y chimenea superior
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(fx - 2, fy - 52);
  ctx.lineTo(fx + 22, fy - 72);
  ctx.lineTo(fx + 46, fy - 52);
  ctx.closePath();
  ctx.fill();

  // Boca del horno con fuego místico azul y ámbar
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(fx + 8, fy - 34, 28, 30);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(fx + 12, fy - 30, 20, 24);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(fx + 16, fy - 22, 12, 16);

  // Resplandor pulsante del fuego criogénico
  const pulse = Math.sin(frame * 0.15) * 4;
  const halo = ctx.createRadialGradient(fx + 22, fy - 18, 6, fx + 22, fy - 18, 38 + pulse);
  halo.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  halo.addColorStop(0.6, 'rgba(14, 165, 233, 0.15)');
  halo.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(fx + 22, fy - 18, 38 + pulse, 0, Math.PI * 2);
  ctx.fill();

  // 2. Gran Yunque de Hielo (Lado derecho)
  const ax = px + 58;
  const ay = py;

  // Base maciza de tronco de roble curtido
  ctx.fillStyle = '#261b14';
  ctx.fillRect(ax - 2, ay - 18, 32, 18);
  ctx.fillStyle = '#3f2213';
  ctx.fillRect(ax, ay - 16, 28, 16);
  // Abrazaderas de hierro
  ctx.fillStyle = '#475569';
  ctx.fillRect(ax - 2, ay - 12, 32, 2);

  // Cuerpo del yunque de acero templado
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(ax + 2, ay - 28, 24, 10);
  ctx.fillStyle = '#334155';
  ctx.fillRect(ax - 6, ay - 34, 38, 6);
  // Cuerno del yunque
  ctx.beginPath();
  ctx.moveTo(ax - 6, ay - 34);
  ctx.lineTo(ax - 14, ay - 31);
  ctx.lineTo(ax - 6, ay - 28);
  ctx.closePath();
  ctx.fill();

  // Bloque de hielo cristalino templándose sobre el yunque
  ctx.fillStyle = '#7dd3fc';
  ctx.fillRect(ax + 4, ay - 42, 14, 8);
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(ax + 6, ay - 40, 10, 4);

  // Martillo de forja descansando
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(ax + 20, ay - 40, 6, 4);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(ax + 22, ay - 36, 2, 8);
}

function drawForgeToolRack(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Estante vertical de hierro
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 36, 3, 36);
  ctx.fillRect(px + 36, py - 36, 3, 36);
  ctx.fillRect(px, py - 32, 39, 3);
  ctx.fillRect(px, py - 18, 39, 3);

  // Herramientas colgadas: tenazas, martillo y cincel
  ctx.fillStyle = '#64748b';
  // Tenazas
  ctx.fillRect(px + 6, py - 30, 2, 14);
  ctx.fillRect(px + 10, py - 30, 2, 14);
  // Cincel de hielo
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 18, py - 30, 3, 12);
  // Mazo pesado
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 26, py - 30, 6, 5);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px + 28, py - 25, 2, 10);

  // Cuba de templado con agua gélida y vapor
  const tubX = px + 44;
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(tubX, py - 20, 22, 20);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(tubX + 2, py - 18, 18, 6);
  // Vapor tenue
  ctx.fillStyle = 'rgba(224, 242, 254, 0.35)';
  const vBob = Math.sin(frame * 0.1) * 2;
  ctx.beginPath();
  ctx.arc(tubX + 8, py - 22 + vBob, 4, 0, Math.PI * 2);
  ctx.arc(tubX + 14, py - 25 - vBob, 5, 0, Math.PI * 2);
  ctx.fill();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawForgeFacade = drawForgeFacade;
  SpriteManager.prototype.drawIceForgeAnvilAndFurnace = drawIceForgeAnvilAndFurnace;
  SpriteManager.prototype.drawForgeToolRack = drawForgeToolRack;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawForgeFacade,
    drawIceForgeAnvilAndFurnace,
    drawForgeToolRack
  };
}


// --- MÓDULO: src/sprites/decorations/snow_townhall.js ---
// ============================================================================
// SPRITES MUNDO 4: CASA 7 - LA ALCALDÍA Y SALIDA AL LAGO CONGELADO
// ============================================================================
// 1. Fachada señorial de la Alcaldía con torre del reloj, campanario y ventanales.
// 2. Gran escritorio de roble tallado, mapa del Everest y trono del Alcalde Dorje.
// 3. Gran Arco Glacial de salida del pueblo hacia el Lago Congelado de la Fase 4.

function drawTownHallFacade(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 120;
  const h = 96;

  // Cimientos de piedra sillar pulida con remates de mármol
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py - 14, w, 14);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 4, py - 12, w - 8, 12);

  // Muros de pino noble oscuro tallado con columnas laterales
  ctx.fillStyle = '#27160c';
  ctx.fillRect(px + 6, py - h + 22, w - 12, h - 36);

  // Columnas dóricas de madera tallada a los lados
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 6, py - h + 22, 10, h - 36);
  ctx.fillRect(px + w - 16, py - h + 22, 10, h - 36);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px + 8, py - h + 22, 6, h - 36);
  ctx.fillRect(px + w - 14, py - h + 22, 6, h - 36);

  // Ventanales señoriales de vidrieras con luz ámbar
  const winY = py - 60;
  // Ventana izquierda
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 22, winY, 18, 22);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px + 24, winY + 2, 14, 18);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + 30, winY + 2, 2, 18); // Parteluz
  ctx.fillRect(px + 24, winY + 10, 14, 2);

  // Ventana derecha
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + w - 40, winY, 18, 22);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px + w - 38, winY + 2, 14, 18);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + w - 32, winY + 2, 2, 18); // Parteluz
  ctx.fillRect(px + w - 38, winY + 10, 14, 2);

  // Gran Tejado a dos aguas de madera y pizarra azulada
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - h + 24);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 6);
  ctx.lineTo(px + w + 6, py - h + 24);
  ctx.closePath();
  ctx.fill();

  // Grueso manto de nieve sobre el tejado principal
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 8, py - h + 23);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 9);
  ctx.lineTo(px + w + 8, py - h + 23);
  ctx.lineTo(px + w + 6, py - h + 27);
  ctx.lineTo(px + Math.floor(w / 2), py - h - 4);
  ctx.lineTo(px - 6, py - h + 27);
  ctx.closePath();
  ctx.fill();

  // Témpanos decorativos colgando de los aleros
  ctx.fillStyle = '#bae6fd';
  const icicleOffsets = [4, 16, 28, 42, 58, 76, 92, 106, 116];
  for (let i = 0; i < icicleOffsets.length; i++) {
    const ix = px + icicleOffsets[i];
    const ih = 7 + ((i * 4) % 8);
    ctx.beginPath();
    ctx.moveTo(ix, py - h + 24);
    ctx.lineTo(ix + 3, py - h + 24);
    ctx.lineTo(ix + 1.5, py - h + 24 + ih);
    ctx.closePath();
    ctx.fill();
  }

  // Torre Central del Reloj y Campanario
  const tX = px + Math.floor(w / 2) - 16;
  const tY = py - h - 34;
  ctx.fillStyle = '#27160c';
  ctx.fillRect(tX, tY, 32, 28);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(tX + 2, tY + 2, 28, 24);

  // Tejado piramidal del campanario
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(tX - 3, tY);
  ctx.lineTo(tX + 16, tY - 14);
  ctx.lineTo(tX + 35, tY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(tX - 4, tY - 1);
  ctx.lineTo(tX + 16, tY - 16);
  ctx.lineTo(tX + 36, tY - 1);
  ctx.lineTo(tX + 34, tY + 2);
  ctx.lineTo(tX + 16, tY - 12);
  ctx.lineTo(tX - 2, tY + 2);
  ctx.closePath();
  ctx.fill();

  // Esfera del reloj dorado
  const clockX = tX + 16;
  const clockY = tY + 14;
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(clockX, clockY, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1c0f08';
  ctx.beginPath();
  ctx.arc(clockX, clockY, 7, 0, Math.PI * 2);
  ctx.fill();
  // Manecillas del reloj (animadas)
  const handAngle = frame * 0.04;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + Math.cos(handAngle) * 5, clockY + Math.sin(handAngle) * 5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX, clockY - 4);
  ctx.stroke();

  // Gran Puerta Doble Arqueada de la Alcaldía con Escudo
  const dX = px + Math.floor(w / 2) - 14;
  const dY = py - 42;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(dX - 2, dY - 2, 28, 44);
  ctx.fillStyle = '#3f2213';
  ctx.fillRect(dX, dY, 24, 42);
  ctx.fillStyle = '#17100b';
  ctx.fillRect(dX + 11, dY, 2, 42); // Hendidura entre las dos hojas
  // Escudo dorado de la villa sobre la puerta
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(dX + 8, dY + 6, 8, 10);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(dX + 10, dY + 8, 4, 6);
  // Picaportes de bronce
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(dX + 8, dY + 22, 2, 4);
  ctx.fillRect(dX + 14, dY + 22, 2, 4);
}

function drawTownHallMayorDesk(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Trono ceremonial de respaldo alto con terciopelo rojo
  const tx = px + 18;
  const ty = py;
  ctx.fillStyle = '#451a03';
  ctx.fillRect(tx - 4, ty - 56, 26, 56);
  ctx.fillStyle = '#be123c';
  ctx.fillRect(tx - 2, ty - 52, 22, 38);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(tx + 7, ty - 54, 4, 4); // Remate dorado superior

  // Gran Escritorio señorial de roble macizo
  const dx = px;
  const dy = py;
  ctx.fillStyle = '#27160c';
  ctx.fillRect(dx, dy - 26, 64, 26);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(dx + 2, dy - 24, 60, 24);
  // Molduras y tiradores dorados en los cajones
  ctx.fillStyle = '#17100b';
  ctx.fillRect(dx + 6, dy - 20, 20, 8);
  ctx.fillRect(dx + 38, dy - 20, 20, 8);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(dx + 15, dy - 16, 2, 2);
  ctx.fillRect(dx + 47, dy - 16, 2, 2);

  // Objetos sobre el escritorio:
  // 1. Mapa enrollado del Everest con sello de lacre
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(dx + 8, dy - 30, 14, 4);
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(dx + 13, dy - 31, 3, 3); // Lacre rojo

  // 2. Tintero con pluma dorada
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(dx + 26, dy - 30, 4, 4);
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.moveTo(dx + 28, dy - 30);
  ctx.lineTo(dx + 33, dy - 38);
  ctx.lineTo(dx + 30, dy - 34);
  ctx.closePath();
  ctx.fill();

  // 3. Candelabro con vela encendida y suave llama oscilante
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(dx + 48, dy - 34, 6, 8);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(dx + 50, dy - 42, 2, 8);
  // Llama
  const fBob = Math.sin(frame * 0.2) * 1.5;
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(dx + 51, dy - 45 + fBob, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(dx + 51, dy - 45 + fBob, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawGlacialGateArch(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 56;
  const h = 76;

  // Pilares ciclópeos de piedra de basalto tallada a los lados
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - h, 14, h);
  ctx.fillRect(px + w - 14, py - h, 14, h);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 2, py - h + 2, 10, h - 2);
  ctx.fillRect(px + w - 12, py - h + 2, 10, h - 2);

  // Gran dintel semicircular de hielo glacial tallado
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(px, py - h - 10, w, 14);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 4, py - h - 8, w - 8, 10);
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(px + 8, py - h - 6, w - 16, 4);

  // Escudo rúnico en la clave del arco con resplandor pulsante
  const rPulse = Math.sin(frame * 0.1) * 3;
  const keyX = px + Math.floor(w / 2);
  const keyY = py - h - 4;
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.arc(keyX, keyY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(keyX - 2, keyY - 2, 4, 4);

  // Resplandor glacial del paso hacia el Lago Congelado (Fase 4)
  const gHalo = ctx.createRadialGradient(keyX, py - 36, 10, keyX, py - 36, 38 + rPulse);
  gHalo.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  gHalo.addColorStop(0.7, 'rgba(14, 165, 233, 0.15)');
  gHalo.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = gHalo;
  ctx.beginPath();
  ctx.arc(keyX, py - 36, 38 + rPulse, 0, Math.PI * 2);
  ctx.fill();

  // Témpanos afilados colgando del dintel interior
  ctx.fillStyle = '#bae6fd';
  const tipX = [16, 24, 32, 40];
  for (let i = 0; i < tipX.length; i++) {
    const tx = px + tipX[i];
    const th = 8 + ((i * 3) % 7);
    ctx.beginPath();
    ctx.moveTo(tx - 2, py - h + 4);
    ctx.lineTo(tx + 2, py - h + 4);
    ctx.lineTo(tx, py - h + 4 + th);
    ctx.closePath();
    ctx.fill();
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawTownHallFacade = drawTownHallFacade;
  SpriteManager.prototype.drawTownHallMayorDesk = drawTownHallMayorDesk;
  SpriteManager.prototype.drawGlacialGateArch = drawGlacialGateArch;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawTownHallFacade,
    drawTownHallMayorDesk,
    drawGlacialGateArch
  };
}


// --- MÓDULO: src/sprites/decorations/snow_lake.js ---
// ============================================================================
// SPRITES MUNDO 4 - FASE 4: DECORACIONES DEL LAGO CONGELADO (PIXEL ART)
// ============================================================================
// 1. Cabaña de pesca en el hielo con estufa, agujero en el hielo y cubo de truchas.
// 2. Escultura de hielo cristalina esculpida en hielo glacial milenario.
// 3. Boya náutica congelada con campana de niebla y farol de advertencia ámbar.

function drawIceFishingHut(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 54;
  const h = 46;

  // Cimientos de patines de trineo de madera bajo la cabaña
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px, py - 4, w, 4);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 2, py - 6, w - 4, 3);

  // Muros de tablones de cedro rústico
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 4, py - h + 14, w - 8, h - 18);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px + 6, py - h + 16, w - 12, h - 22);

  // Tablones horizontales
  for (let ly = py - h + 20; ly < py - 6; ly += 8) {
    ctx.fillStyle = '#27160c';
    ctx.fillRect(px + 6, ly, w - 12, 1);
  }

  // Tejado inclinado a un agua con grueso manto de nieve
  ctx.fillStyle = '#1c0f08';
  ctx.beginPath();
  ctx.moveTo(px + 2, py - h + 14);
  ctx.lineTo(px + w - 2, py - h + 6);
  ctx.lineTo(px + w + 2, py - h + 10);
  ctx.lineTo(px - 2, py - h + 18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 4, py - h + 16);
  ctx.lineTo(px + w + 4, py - h + 6);
  ctx.lineTo(px + w + 2, py - h + 10);
  ctx.lineTo(px - 2, py - h + 20);
  ctx.closePath();
  ctx.fill();

  // Chimenea de tubo de hierro con humo de leña
  const chimX = px + 10;
  const chimY = py - h + 6;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(chimX, chimY - 14, 4, 16);
  // Humo suave
  for (let s = 0; s < 3; s++) {
    const sBob = Math.sin(frame * 0.1 + s * 1.2) * 4;
    ctx.fillStyle = 'rgba(226, 232, 240, 0.4)';
    ctx.beginPath();
    ctx.arc(chimX + 2 + sBob, chimY - 18 - s * 8, 3 + s * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ventanuco con luz cálida
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + w - 18, py - 32, 10, 10);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px + w - 16, py - 30, 6, 6);

  // Puerta de madera con picaporte
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px + 18, py - 28, 12, 24);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px + 19, py - 27, 10, 22);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + 20, py - 16, 2, 2);

  // Agujero de pesca en el hielo al lado derecho de la cabaña
  const holeX = px + w + 8;
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(holeX, py - 1, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(holeX, py - 1, 8, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Caña de pescar apoyada con sedal hacia el agujero
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(holeX - 12, py - 2);
  ctx.lineTo(holeX - 2, py - 14);
  ctx.stroke();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(holeX - 2, py - 14);
  ctx.lineTo(holeX + 1, py);
  ctx.stroke();

  // Cubo de madera con peces árticos al lado
  const bX = holeX - 20;
  ctx.fillStyle = '#78350f';
  ctx.fillRect(bX, py - 10, 7, 10);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(bX + 1, py - 12, 5, 3); // Colas de pescado
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(bX + 2, py - 14, 2, 3);
}

function drawIceSculpture(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Pedestal de roca de permafrost y nieve compacta
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 14, py - 8, 28, 8);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - 12, py - 10, 24, 3);

  // Escultura de cisne de hielo esculpida
  // Cuerpo cristalino
  ctx.fillStyle = '#7dd3fc';
  ctx.beginPath();
  ctx.ellipse(px, py - 18, 10, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Alas translúcidas talladas
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 18);
  ctx.lineTo(px - 14, py - 28);
  ctx.lineTo(px - 2, py - 22);
  ctx.closePath();
  ctx.fill();

  // Cuello elegante curvado
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.moveTo(px + 4, py - 18);
  ctx.quadraticCurveTo(px + 12, py - 26, px + 8, py - 34);
  ctx.lineTo(px + 5, py - 34);
  ctx.quadraticCurveTo(px + 8, py - 26, px + 1, py - 18);
  ctx.closePath();
  ctx.fill();

  // Cabeza y pico
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(px + 7, py - 34, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px + 9, py - 35, 3, 2); // Pico

  // Destello brillante cíclico
  const glint = (frame % 45 < 8);
  if (glint) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 2, py - 24, 3, 3);
    ctx.fillRect(px - 3, py - 23, 5, 1);
    ctx.fillRect(px - 1, py - 25, 1, 5);
  }
}

function drawFrozenLakeBuoy(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Plancha de hielo quebrada alrededor de la base
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 11, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cuerpo cilíndrico cónico de la boya (rojo de alta visibilidad)
  ctx.fillStyle = '#be123c';
  ctx.beginPath();
  ctx.moveTo(px - 7, py - 3);
  ctx.lineTo(px - 4, py - 22);
  ctx.lineTo(px + 4, py - 22);
  ctx.lineTo(px + 7, py - 3);
  ctx.closePath();
  ctx.fill();

  // Franja blanca reflectante central
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 11);
  ctx.lineTo(px - 5, py - 16);
  ctx.lineTo(px + 5, py - 16);
  ctx.lineTo(px + 6, py - 11);
  ctx.closePath();
  ctx.fill();

  // Témpanos colgantes de la boya
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(px - 5, py - 3, 2, 6);
  ctx.fillRect(px + 3, py - 3, 2, 5);

  // Farol de destello superior
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 3, py - 26, 6, 4);

  // Luz ámbar parpadeante
  const isLit = (frame % 36 < 22);
  ctx.fillStyle = isLit ? '#fbbf24' : '#78350f';
  ctx.fillRect(px - 2, py - 30, 4, 4);

  if (isLit) {
    const bHalo = ctx.createRadialGradient(px, py - 28, 2, px, py - 28, 18);
    bHalo.addColorStop(0, 'rgba(251, 191, 36, 0.5)');
    bHalo.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = bHalo;
    ctx.beginPath();
    ctx.arc(px, py - 28, 18, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGlacialAltar(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 64;
  const h = 54;

  // Base escalonada de basalto y permafrost milenario
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 8, w, 8);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 4, py - 14, w - 8, 6);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 8, py - 18, w - 16, 4);

  // Pilares gemelos de hielo rúnico a los costados
  const pW = 10;
  const pH = 32;
  // Pilar izquierdo
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(px + 10, py - 18 - pH, pW, pH);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 12, py - 18 - pH + 2, pW - 4, pH - 4);
  // Runas grabadas en pilar izquierdo
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px + 14, py - 40, 2, 4);
  ctx.fillRect(px + 13, py - 30, 4, 2);

  // Pilar derecho
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(px + w - 20, py - 18 - pH, pW, pH);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + w - 18, py - 18 - pH + 2, pW - 4, pH - 4);
  // Runas grabadas en pilar derecho
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px + w - 16, py - 40, 2, 4);
  ctx.fillRect(px + w - 17, py - 30, 4, 2);

  // Dintel superior de hielo tallado
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(px + 6, py - 18 - pH - 6, w - 12, 6);
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(px + 8, py - 18 - pH - 5, w - 16, 2);

  // Gema o cristal celestial en el centro del frontón
  const gemX = px + Math.floor(w / 2);
  const gemY = py - 18 - pH - 3;
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.arc(gemX, gemY, 4, 0, Math.PI * 2);
  ctx.fill();

  // Resplandor celestial pulsante
  const gPulse = Math.sin(frame * 0.1) * 3;
  const aHalo = ctx.createRadialGradient(gemX, gemY, 2, gemX, gemY, 24 + gPulse);
  aHalo.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  aHalo.addColorStop(0.7, 'rgba(14, 165, 233, 0.15)');
  aHalo.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = aHalo;
  ctx.beginPath();
  ctx.arc(gemX, gemY, 24 + gPulse, 0, Math.PI * 2);
  ctx.fill();

  // Pebetero central de bronce con fuego sagrado y humo turquesa
  const bX = px + Math.floor(w / 2) - 8;
  const bY = py - 18;
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(bX, bY - 8, 16, 8);
  ctx.fillStyle = '#b45309';
  ctx.fillRect(bX + 2, bY - 6, 12, 6);

  // Llama sagrada azul
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(bX + 8, bY - 11, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.arc(bX + 8, bY - 12, 2, 0, Math.PI * 2);
  ctx.fill();

  // Humo sagrado ascendente
  for (let s = 0; s < 3; s++) {
    const sBob = Math.sin(frame * 0.08 + s) * 3;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.beginPath();
    ctx.arc(bX + 8 + sBob, bY - 16 - s * 6, 2.5 + s, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawIceCrevasseMarker(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Base de nieve compacta
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Piolet clavado en el hielo
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 2);
  ctx.lineTo(px + 4, py - 24);
  ctx.stroke();

  // Cabeza de acero del piolet
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px + 1, py - 26, 6, 3);
  ctx.fillRect(px - 2, py - 25, 4, 2);

  // Banderín triangular de peligro naranja de alta visibilidad
  const wAngle = Math.sin(frame * 0.15) * 2;
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(px + 4, py - 22);
  ctx.lineTo(px + 18 + wAngle, py - 17);
  ctx.lineTo(px + 4, py - 12);
  ctx.closePath();
  ctx.fill();

  // Franja reflectante plateada en el banderín
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 8, py - 19, 2, 6);

  // Diodo de advertencia en la punta
  const isBlink = (frame % 28 < 14);
  ctx.fillStyle = isBlink ? '#ef4444' : '#7f1d1d';
  ctx.fillRect(px + 3, py - 28, 2, 2);
}

function drawSummitSignpost(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Poste de madera tratada para alta montaña
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 2, py - 36, 4, 36);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 1, py - 35, 2, 35);

  // Tablilla de dirección apuntando hacia arriba a la cumbre
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 16, py - 34, 32, 12);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 15, py - 33, 30, 10);

  // Flecha y texto reflectante
  ctx.fillStyle = '#ffd166';
  // Flecha hacia arriba a la derecha
  ctx.beginPath();
  ctx.moveTo(px + 8, py - 30);
  ctx.lineTo(px + 13, py - 30);
  ctx.lineTo(px + 13, py - 25);
  ctx.lineTo(px + 8, py - 30);
  ctx.fill();
  ctx.fillRect(px - 12, py - 29, 16, 2);

  // Nieve acumulada en la tablilla
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 17, py - 36, 34, 2);
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(px - 14, py - 22, 2, 4); // Témpano
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawIceFishingHut = drawIceFishingHut;
  SpriteManager.prototype.drawIceSculpture = drawIceSculpture;
  SpriteManager.prototype.drawFrozenLakeBuoy = drawFrozenLakeBuoy;
  SpriteManager.prototype.drawGlacialAltar = drawGlacialAltar;
  SpriteManager.prototype.drawIceCrevasseMarker = drawIceCrevasseMarker;
  SpriteManager.prototype.drawSummitSignpost = drawSummitSignpost;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawIceFishingHut,
    drawIceSculpture,
    drawFrozenLakeBuoy,
    drawGlacialAltar,
    drawIceCrevasseMarker,
    drawSummitSignpost
  };
}


// --- MÓDULO: src/sprites/decorations/snow_summit.js ---
// ============================================================================
// SPRITES MUNDO 4 - FASE 5: DECORACIONES DE ALTA MONTAÑA Y CUMBRE (PIXEL ART)
// ============================================================================
// 1. Puente de escaleras de aluminio sobre grietas del Khumbu (drawAluminumLadderBridge)
// 2. Depósito de botellas de oxígeno de alta montaña (drawOxygenDepot)
// 3. Estación de anclaje de cuerdas fijas y mosquetones (drawFixedRopesAnchor)
// 4. Mástil meteorológico de alta cota con anemómetro giratorio (drawWeatherStationMast)
// 5. Hito sagrado de piedras apiladas y cintas votivas (drawPrayerCairn)

function drawAluminumLadderBridge(ctx, x, y, len = 64, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = Math.max(32, Math.round(len));

  // 1. Estacas y placas de anclaje de acero en los extremos de la grieta
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 4, py - 6, 6, 8);
  ctx.fillRect(px + w - 2, py - 6, 6, 8);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 3, py - 8, 4, 3); // Clavija de hielo
  ctx.fillRect(px + w - 1, py - 8, 4, 3);

  // 2. Cuerdas guía laterales de seguridad (naranja brillante de rescate)
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 14);
  ctx.lineTo(px + w + 4, py - 14);
  ctx.stroke();

  // Postecillos verticales de soporte de la cuerda guía
  const numPosts = Math.max(2, Math.floor(w / 28));
  for (let i = 0; i <= numPosts; i++) {
    const postX = px + Math.round((w * i) / numPosts);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(postX - 1, py - 14, 2, 14);
    // Mosquetón pequeño
    ctx.fillStyle = '#fb923c';
    ctx.fillRect(postX - 2, py - 14, 4, 3);
  }

  // 3. Largueros tubulares de aluminio (superior e inferior)
  // Larguero superior
  ctx.fillStyle = '#475569';
  ctx.fillRect(px, py - 2, w, 3);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px, py - 2, w, 1);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px + 4, py - 2, w - 8, 1);

  // Larguero inferior
  ctx.fillStyle = '#334155';
  ctx.fillRect(px, py + 2, w, 3);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px, py + 2, w, 1);

  // 4. Peldaños antideslizantes estriados
  const rungs = Math.max(4, Math.floor(w / 8));
  for (let r = 0; r <= rungs; r++) {
    const rx = px + Math.round((w * r) / rungs);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(rx - 1, py - 2, 2, 7);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(rx, py - 1, 1, 5);
  }

  // 5. Pequeños carámbanos de escarcha colgando de los peldaños centrales
  ctx.fillStyle = '#bae6fd';
  for (let i = 1; i < numPosts; i++) {
    const icx = px + Math.round((w * i) / numPosts) + 6;
    ctx.beginPath();
    ctx.moveTo(icx - 1, py + 5);
    ctx.lineTo(icx + 1, py + 5);
    ctx.lineTo(icx, py + 10);
    ctx.closePath();
    ctx.fill();
  }
}

function drawOxygenDepot(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 44;
  const h = 30;

  // 1. Base y armazón metálico de expedición
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px, py - 3, w, 3);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 2, py - 14, 2, 12);
  ctx.fillRect(px + w - 4, py - 14, 2, 12);
  ctx.fillRect(px + 2, py - 14, w - 4, 2);

  // 2. Cilindros de oxígeno de alta montaña apilados
  // Colores: Naranja de rescate y Verde neón de alta presión
  const tanks = [
    { x: px + 6, color: '#f97316', capColor: '#c2410c', dialColor: '#ffffff' },
    { x: px + 15, color: '#22c55e', capColor: '#15803d', dialColor: '#ffffff' },
    { x: px + 24, color: '#f97316', capColor: '#c2410c', dialColor: '#ffffff' },
    { x: px + 33, color: '#22c55e', capColor: '#15803d', dialColor: '#ffffff' }
  ];

  tanks.forEach(t => {
    // Cuerpo del cilindro
    ctx.fillStyle = t.color;
    ctx.fillRect(t.x, py - 22, 6, 20);
    // Brillo cilíndrico
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(t.x + 1, py - 21, 1, 18);
    // Ojiva superior redondeada
    ctx.fillStyle = t.capColor;
    ctx.beginPath();
    ctx.arc(t.x + 3, py - 22, 3, Math.PI, 0);
    ctx.fill();
    // Válvula de bronce y manómetro
    ctx.fillStyle = '#d97706';
    ctx.fillRect(t.x + 2, py - 27, 2, 3);
    ctx.fillStyle = t.dialColor;
    ctx.beginPath();
    ctx.arc(t.x + 4, py - 26, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(t.x + 4, py - 26, 1, 1);
  });

  // Manguera flexible en espiral
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px + 10, py - 25);
  ctx.bezierCurveTo(px + 14, py - 18, px + 20, py - 28, px + 28, py - 25);
  ctx.stroke();

  // 3. Manto de nieve protectora sobre la repisa
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 22, Math.floor(w / 2) - 2, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px + 4, py - 2, w - 8, 2);
}

function drawFixedRopesAnchor(ctx, x, y, h = 60, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const height = Math.max(30, Math.round(h));

  // 1. Piqueta de nieve y tornillo de hielo profundo en la base
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 3, py - 4, 8, 6);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 2, py - 6, 6, 3);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px, py - 8, 2, 3);

  // 2. Placa multidireccional con mosquetones de seguridad
  ctx.fillStyle = '#dc2626'; // Mosquetón rojo
  ctx.beginPath();
  ctx.ellipse(px + 1, py - 10, 4, 3, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#0284c7'; // Mosquetón azul
  ctx.beginPath();
  ctx.ellipse(px + 3, py - 14, 4, 3, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Líneas de cuerda fija tensas (Amarillo fluorescente y Azul zafiro)
  // Cuerda 1 (Amarilla)
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(px + 1, py - 10);
  ctx.lineTo(px + 2, py - height);
  ctx.stroke();

  // Cuerda 2 (Azul zafiro)
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(px + 3, py - 14);
  ctx.lineTo(px + 5, py - height + 4);
  ctx.stroke();

  // 4. Puño de ascensión (Jumar) bloqueador en la cuerda
  const jumarY = py - Math.round(height * 0.55);
  ctx.fillStyle = '#e11d48';
  ctx.fillRect(px - 1, jumarY, 5, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, jumarY + 2, 2, 2);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px + 3, jumarY + 4, 2, 3);

  // Anclaje superior
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px, py - height, 4, 4);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - 2, py - height - 2, 8, 2);
}

function drawWeatherStationMast(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 54;

  // 1. Base de trípode con zapatas sobre permafrost
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 14, py - 3, 28, 3);
  ctx.fillStyle = '#64748b';
  // Patas diagonales del trípode
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 12, py - 3);
  ctx.lineTo(px, py - 16);
  ctx.lineTo(px + 12, py - 3);
  ctx.stroke();

  // 2. Mástil central en celosía de aleación ligera
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 2, py - h + 12, 4, h - 14);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 1, py - h + 12, 2, h - 14);

  // Celosía horizontal
  for (let ly = py - h + 18; ly < py - 16; ly += 7) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(px - 3, ly, 6, 1);
  }

  // 3. Caja de instrumental / registrador térmico
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - 7, py - 30, 14, 10);
  ctx.fillStyle = '#0f172a';
  ctx.strokeRect(px - 7, py - 30, 14, 10);

  // LED de transmisión por satélite (parpadeo verde)
  const ledOn = Math.floor(frame / 20) % 2 === 0;
  ctx.fillStyle = ledOn ? '#22c55e' : '#14532d';
  ctx.fillRect(px + 2, py - 28, 3, 3);

  // 4. Panel solar orientado al sol de altura
  ctx.save();
  ctx.translate(px - 8, py - 34);
  ctx.rotate(-0.35);
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(0, 0, 14, 7);
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 0.8;
  ctx.strokeRect(0, 0, 14, 7);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(1, 1, 4, 1); // Escarcha solar
  ctx.restore();

  // 5. Cúpula superior y anemómetro de cazoletas giratorio
  const mastTop = py - h + 10;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 1, mastTop - 6, 2, 6);

  // Travesaño de cazoletas
  const rot = (frame * 0.15) % (Math.PI * 2);
  const cupSpan = Math.cos(rot) * 9;

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(px - cupSpan, mastTop - 6);
  ctx.lineTo(px + cupSpan, mastTop - 6);
  ctx.stroke();

  // Cazoletas hemisféricas
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(px - cupSpan, mastTop - 6, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(px + cupSpan, mastTop - 6, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Veleta de viento apuntando
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(px, mastTop - 11, 6, 3);
  ctx.beginPath();
  ctx.moveTo(px - 4, mastTop - 10);
  ctx.lineTo(px, mastTop - 12);
  ctx.lineTo(px, mastTop - 8);
  ctx.closePath();
  ctx.fill();
}

function drawPrayerCairn(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 36;
  const h = 38;

  // 1. Zócalo de permafrost y nieve
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, py - 3, w + 4, 3);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px, py - 4, w, 2);

  // 2. Piedras de pizarra apiladas en pirámide (Cairn / Chörten)
  // Nivel 1 (Base ancha)
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 2, py - 12, w - 4, 8);
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 4, py - 11, w - 10, 4);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 12, py - 12, 1, 8);
  ctx.fillRect(px + 24, py - 12, 1, 8);

  // Nivel 2 (Medio)
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 6, py - 22, w - 12, 10);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + 8, py - 20, w - 18, 5);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 18, py - 22, 1, 10);

  // Nivel 3 (Superior)
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px + 11, py - 30, w - 22, 8);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px + 13, py - 29, w - 26, 4);

  // Piedra cimera vertical grabada
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px + 15, py - 36, 6, 6);
  ctx.fillStyle = '#fbbf24'; // Runa dorada
  ctx.fillRect(px + 17, py - 34, 2, 2);

  // 3. Cintas sagradas de oración atadas y ondeando al viento
  const wave = Math.sin(frame * 0.1) * 2;
  const colors = ['#3b82f6', '#f8fafc', '#ef4444', '#22c55e', '#eab308'];

  colors.forEach((col, idx) => {
    const ribbonX = px + 8 + idx * 4;
    const ribbonY = py - 22 - idx * 2;
    ctx.fillStyle = col;
    ctx.fillRect(ribbonX, ribbonY, 3, 2);
    // Vuelo de la cinta hacia la derecha
    ctx.beginPath();
    ctx.moveTo(ribbonX + 3, ribbonY);
    ctx.lineTo(ribbonX + 7 + wave, ribbonY + 2);
    ctx.lineTo(ribbonX + 3, ribbonY + 3);
    ctx.closePath();
    ctx.fill();
  });

  // 4. Copos y remate de nieve helada en las aristas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + 4, py - 13, 6, 2);
  ctx.fillRect(px + 22, py - 13, 8, 2);
  ctx.fillRect(px + 8, py - 23, 7, 2);
  ctx.fillRect(px + 14, py - 37, 8, 2);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawAluminumLadderBridge = drawAluminumLadderBridge;
  SpriteManager.prototype.drawOxygenDepot = drawOxygenDepot;
  SpriteManager.prototype.drawFixedRopesAnchor = drawFixedRopesAnchor;
  SpriteManager.prototype.drawWeatherStationMast = drawWeatherStationMast;
  SpriteManager.prototype.drawPrayerCairn = drawPrayerCairn;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawAluminumLadderBridge,
    drawOxygenDepot,
    drawFixedRopesAnchor,
    drawWeatherStationMast,
    drawPrayerCairn
  };
}


// --- MÓDULO: src/sprites/decorations/snow_summit_peak.js ---
// ============================================================================
// SPRITES MUNDO 4 - FASE 5: DECORACIONES DE LA CIMA DEL EVEREST (PIXEL ART)
// ============================================================================
// 1. Monumento de la Gran Cima del Everest 8848m (drawSummitVictoryMonument)
// 2. Anclajes y cuerdas técnicas del Paso de Hillary (drawHillaryStepRopes)
// 3. Tienda de asalto de alta montaña para la Zona de la Muerte (drawAssaultTent)
// 4. Nido térmico de plumas y cojín dorado para el Hijo Ratoncito (drawSummitNest)

function drawSummitVictoryMonument(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 54;

  // 1. Base escalonada de permafrost y piedras sagradas del Himalaya
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 4, py - 4, w + 8, 4);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px, py - 12, w, 8);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px + 4, py - 20, w - 8, 8);
  ctx.fillStyle = '#475569';
  ctx.fillRect(px + 10, py - 26, w - 20, 6);

  // Manto de nieve perpetua sobre las cornisas
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, py - 13, w + 4, 2);
  ctx.fillRect(px + 2, py - 21, w - 4, 2);
  ctx.fillRect(px + 8, py - 27, w - 16, 2);

  // 2. Placa dorada grabada "8848M"
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px + 14, py - 18, 26, 7);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px + 15, py - 17, 24, 5);
  ctx.fillStyle = '#78350f';
  // Texto pixelado "8848"
  ctx.fillRect(px + 17, py - 16, 3, 3);
  ctx.fillRect(px + 22, py - 16, 3, 3);
  ctx.fillRect(px + 27, py - 16, 2, 3);
  ctx.fillRect(px + 31, py - 16, 3, 3);

  // 3. Mástil central de la victoria (acero pulido de expedición)
  const mastX = px + Math.floor(w / 2);
  const mastTop = py - 46;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(mastX - 2, mastTop, 4, 32);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(mastX - 1, mastTop, 2, 32);

  // Remate dorado esférico del mástil
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(mastX, mastTop, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // 4. Gran Bandera de la Cumbre ondeando al viento polar (Rojo y Oro)
  const wave = Math.sin(frame * 0.18) * 3;
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(mastX + 2, mastTop + 2);
  ctx.lineTo(mastX + 26, mastTop + 2 + wave);
  ctx.lineTo(mastX + 22, mastTop + 14 + wave);
  ctx.lineTo(mastX + 2, mastTop + 14);
  ctx.closePath();
  ctx.fill();

  // Emblema dorado del Monte Everest en la bandera
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.moveTo(mastX + 10, mastTop + 11 + wave * 0.5);
  ctx.lineTo(mastX + 14, mastTop + 5 + wave * 0.5);
  ctx.lineTo(mastX + 18, mastTop + 11 + wave * 0.5);
  ctx.closePath();
  ctx.fill();

  // 5. Cuerdas radiales de banderines tibetanos (5 colores sagrados)
  const colors = ['#3b82f6', '#f8fafc', '#ef4444', '#22c55e', '#eab308'];
  // Vuelo hacia la izquierda
  for (let i = 0; i < 5; i++) {
    const fx = mastX - 6 - i * 6;
    const fy = mastTop + 16 + i * 4;
    ctx.fillStyle = colors[i];
    ctx.fillRect(fx, fy, 4, 3);
  }
  // Vuelo hacia la derecha
  for (let i = 0; i < 5; i++) {
    const fx = mastX + 6 + i * 6;
    const fy = mastTop + 16 + i * 4;
    ctx.fillStyle = colors[i];
    ctx.fillRect(fx, fy, 4, 3);
  }

  // Cuerdas de soporte
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(mastX, mastTop + 14);
  ctx.lineTo(px - 6, py - 4);
  ctx.moveTo(mastX, mastTop + 14);
  ctx.lineTo(px + w + 6, py - 4);
  ctx.stroke();
}

function drawHillaryStepRopes(ctx, x, y, h = 64, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const height = Math.max(36, Math.round(h));

  // Piqueta de roca y cuñas de titanio
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 3, py - 4, 7, 5);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px - 1, py - 6, 3, 3);

  // Doble cuerda fija (Amarillo de alta montaña y Azul cielo)
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(px, py - 4);
  ctx.lineTo(px + 2, py - height);
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(px + 3, py - 2);
  ctx.lineTo(px + 5, py - height + 2);
  ctx.stroke();

  // Mosquetones con seguro y bloqueador jumar
  const my = py - Math.round(height * 0.45);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(px - 1, my, 5, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px, my + 1, 2, 2);

  // Carámbanos en el anclaje
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.moveTo(px + 1, py - 1);
  ctx.lineTo(px + 3, py - 1);
  ctx.lineTo(px + 2, py + 4);
  ctx.closePath();
  ctx.fill();
}

function drawAssaultTent(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 44;
  const h = 22;

  // Piedras lastre contra el viento huracanado
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 4, py - 4, 6, 4);
  ctx.fillRect(px + w - 2, py - 4, 6, 4);

  // Manto de nieve que sella la base
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px - 2, py - 3, w + 4, 3);

  // Cúpula aerodinámica de asalto (Rojo de rescate y Amarillo ártico)
  ctx.fillStyle = '#b91c1c';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, Math.floor(w / 2), h, 0, Math.PI, 0);
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, Math.floor(w / 2) - 2, h - 2, 0, Math.PI, 0);
  ctx.fill();

  // Puerta de cremallera redonda con linterna interior
  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, 6, 12, 0, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px + Math.floor(w / 2) - 2, py - 10, 4, 8);

  // Vientos tensores diagonales
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px + 4, py - 12);
  ctx.lineTo(px - 6, py);
  ctx.moveTo(px + w - 4, py - 12);
  ctx.lineTo(px + w + 6, py);
  ctx.stroke();
}

function drawSummitNest(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 32;

  // 1. Zócalo ceremonial dorado
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 2, py - 2, w + 4, 3);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px, py - 4, w, 2);

  // 2. Cojín de seda budista escarlata y bordado dorado
  ctx.fillStyle = '#991b1b';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 4, Math.floor(w / 2) - 1, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 5, Math.floor(w / 2) - 4, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Plumón de ganso ártico blanco y suave
  ctx.fillStyle = '#f8fafc';
  for (let i = 0; i < 6; i++) {
    const fx = px + 4 + i * 4;
    const fy = py - 7 + Math.sin(i * 1.5) * 1.5;
    ctx.fillRect(fx, fy, 3, 2);
  }

  // 4. Suave aura dorada de protección
  const glow = Math.sin(frame * 0.1) * 0.15 + 0.35;
  ctx.fillStyle = 'rgba(251, 191, 36, ' + glow.toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py - 8, 18, 0, Math.PI * 2);
  ctx.fill();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSummitVictoryMonument = drawSummitVictoryMonument;
  SpriteManager.prototype.drawHillaryStepRopes = drawHillaryStepRopes;
  SpriteManager.prototype.drawAssaultTent = drawAssaultTent;
  SpriteManager.prototype.drawSummitNest = drawSummitNest;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawSummitVictoryMonument,
    drawHillaryStepRopes,
    drawAssaultTent,
    drawSummitNest
  };
}


// --- MÓDULO: src/sprites/decorations/snow_yeti_sanctuary.js ---
// ============================================================================
// SPRITES MUNDO 4 - FASE 6: DECORACIONES DEL SANTUARIO DEL YETI (PIXEL ART)
// ============================================================================
// 1. Huella gigante de Yeti en la nieve (drawYetiFootprint)
// 2. Arco de estalactitas y estalagmitas de hielo azul (drawIceCavernArch)
// 3. Aguja de cristal rúnico pulsante (drawRunicCrystalSpire)
// 4. Tótem de advertencia sherpa con calavera y marcas de garras (drawYetiWarningTotem)

function drawYetiFootprint(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Depresión cóncava de la huella en la nieve
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.ellipse(px, py - 2, 10, 5, -0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(px + 1, py - 2, 7, 3, -0.15, 0, Math.PI * 2);
  ctx.fill();

  // 4 garras gigantescas clavadas en el hielo
  const toes = [
    { dx: -7, dy: -6, r: 2.5 },
    { dx: -2, dy: -8, r: 2.8 },
    { dx: 3, dy: -7, r: 2.6 },
    { dx: 8, dy: -5, r: 2.2 }
  ];

  toes.forEach(t => {
    ctx.fillStyle = '#bae6fd';
    ctx.beginPath();
    ctx.arc(px + t.dx, py + t.dy, t.r + 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0369a1';
    ctx.beginPath();
    ctx.arc(px + t.dx, py + t.dy, t.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Cristales de hielo desprendidos alrededor
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 9, py - 3, 2, 1);
  ctx.fillRect(px + 8, py - 1, 2, 1);
}

function drawIceCavernArch(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 68;
  const h = 58;

  // 1. Estalagmitas ascendentes en el pilar izquierdo
  ctx.fillStyle = '#0369a1';
  ctx.beginPath();
  ctx.moveTo(px - 4, py);
  ctx.lineTo(px + 10, py - h * 0.45);
  ctx.lineTo(px + 16, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px + 10, py - h * 0.45);
  ctx.lineTo(px + 12, py);
  ctx.closePath();
  ctx.fill();

  // 2. Estalagmitas en el pilar derecho
  ctx.fillStyle = '#0369a1';
  ctx.beginPath();
  ctx.moveTo(px + w - 16, py);
  ctx.lineTo(px + w - 10, py - h * 0.5);
  ctx.lineTo(px + w + 4, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#7dd3fc';
  ctx.beginPath();
  ctx.moveTo(px + w - 12, py);
  ctx.lineTo(px + w - 10, py - h * 0.5);
  ctx.lineTo(px + w, py);
  ctx.closePath();
  ctx.fill();

  // 3. Gran arco superior de hielo con estalactitas colgantes
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - h + 14);
  ctx.bezierCurveTo(px + 16, py - h - 4, px + w - 16, py - h - 4, px + w + 6, py - h + 14);
  ctx.lineTo(px + w, py - h + 22);
  ctx.bezierCurveTo(px + w - 18, py - h + 6, px + 18, py - h + 6, px, py - h + 22);
  ctx.closePath();
  ctx.fill();

  // Estalactitas afiladas colgando del arco
  const stalactites = [
    { x: px + 14, len: 14 },
    { x: px + 26, len: 20 },
    { x: px + 36, len: 16 },
    { x: px + 48, len: 22 },
    { x: px + 56, len: 12 }
  ];

  stalactites.forEach(s => {
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath();
    ctx.moveTo(s.x - 3, py - h + 16);
    ctx.lineTo(s.x + 3, py - h + 16);
    ctx.lineTo(s.x, py - h + 16 + s.len);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(s.x - 1, py - h + 16, 1, s.len - 3);
  });
}

function drawRunicCrystalSpire(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 48;

  // Base de roca permafrost con runas grabadas
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 10, py - 6, 20, 6);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 8, py - 10, 16, 5);

  // Cristal de cuarzo glacial azul puro hexagonal
  const glow = Math.sin(frame * 0.12) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + (glow * 0.3).toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px, py - Math.floor(h / 2), 22, 0, Math.PI * 2);
  ctx.fill();

  // Cuerpo geométrico facetado del cristal
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 10);
  ctx.lineTo(px, py - h);
  ctx.lineTo(px + 6, py - 10);
  ctx.closePath();
  ctx.fill();

  // Faceta izquierda luminosa
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px - 6, py - 10);
  ctx.lineTo(px, py - h);
  ctx.lineTo(px - 1, py - 10);
  ctx.closePath();
  ctx.fill();

  // Brillo frontal
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.moveTo(px - 1, py - h + 4);
  ctx.lineTo(px + 1, py - h + 4);
  ctx.lineTo(px, py - 12);
  ctx.closePath();
  ctx.fill();

  // Runa mística brillante en el centro
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 2, py - Math.floor(h * 0.45), 4, 2);
  ctx.fillRect(px - 1, py - Math.floor(h * 0.45) - 3, 2, 7);
}

function drawYetiWarningTotem(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 50;

  // Poste de enebro envejecido clavado en la nieve
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 3, py - 4, 8, 4);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 2, py - h + 16, 5, h - 18);
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 1, py - h + 16, 2, h - 18);

  // Marcas de garras gigantes talladas en la madera
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(px - 1, py - 26, 3, 1);
  ctx.fillRect(px - 1, py - 24, 3, 1);
  ctx.fillRect(px - 1, py - 22, 3, 1);

  // Calavera ritual en la cima del poste
  const skullY = py - h + 6;
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(px + 1, skullY + 4, 7, 0, Math.PI * 2);
  ctx.fill();

  // Cuencas oculares oscuras
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 2, skullY + 3, 2, 3);
  ctx.fillRect(px + 3, skullY + 3, 2, 3);

  // Plumas de águila y cintas rojas ondeantes
  const wave = Math.sin(frame * 0.14) * 2;
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(px - 6, skullY + 4, 4, 2);
  ctx.fillRect(px + 7, skullY + 4, 4, 2);

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 6, skullY + 5);
  ctx.lineTo(px - 10 + wave, skullY + 12);
  ctx.lineTo(px - 6, skullY + 7);
  ctx.closePath();
  ctx.fill();
}

function drawHangingFrostBridge(ctx, x, y, width = 120, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = Math.round(width || 120);

  // Postes de anclaje de madera milenaria en ambos extremos
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 4, py - 14, 6, 20);
  ctx.fillRect(px + w - 2, py - 14, 6, 20);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 3, py - 13, 4, 18);
  ctx.fillRect(px + w - 1, py - 13, 4, 18);

  // Clavijas de hierro y herrajes
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 4, py - 12, 6, 2);
  ctx.fillRect(px + w - 2, py - 12, 6, 2);

  // Cuerdas de suspension catenarias (superior e inferior)
  const droop = 10;
  const sway = Math.sin(frame * 0.08) * 1.5;

  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2;
  // Cuerda pasamanos superior
  ctx.beginPath();
  ctx.moveTo(px, py - 10);
  ctx.quadraticCurveTo(px + w / 2, py - 10 + droop + sway, px + w, py - 10);
  ctx.stroke();

  // Cuerda inferior de soporte de tablones
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.quadraticCurveTo(px + w / 2, py + droop + sway, px + w, py);
  ctx.stroke();

  // Tirantes verticales y tablones de madera
  const numPlanks = Math.floor(w / 12);
  for (let i = 0; i <= numPlanks; i++) {
    const t = i / numPlanks;
    const curX = px + Math.round(t * w);
    const sag = 4 * droop * t * (1 - t) + (t > 0 && t < 1 ? sway : 0);
    const curTopY = Math.round(py - 10 + sag);
    const curBotY = Math.round(py + sag);

    // Tirante vertical de cuerda
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(curX, curTopY);
    ctx.lineTo(curX, curBotY);
    ctx.stroke();

    // Tablon horizontal
    ctx.fillStyle = (i % 2 === 0) ? '#78350f' : '#92400e';
    ctx.fillRect(curX - 4, curBotY, 8, 3);

    // Escarcha de nieve sobre el tablon
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(curX - 3, curBotY - 1, 6, 1);

    // Estalactitas de hielo colgando bajo ciertos tablones
    if (i % 3 === 1) {
      ctx.fillStyle = '#bae6fd';
      ctx.beginPath();
      ctx.moveTo(curX - 2, curBotY + 3);
      ctx.lineTo(curX + 2, curBotY + 3);
      ctx.lineTo(curX, curBotY + 8 + (i % 2) * 3);
      ctx.closePath();
      ctx.fill();
    }

    // Banderines de plegaria colgando de algunos tirantes
    if (i === 2 || i === Math.floor(numPlanks / 2) || i === numPlanks - 2) {
      const pColor = (i === 2) ? '#ef4444' : (i === numPlanks - 2 ? '#3b82f6' : '#eab308');
      ctx.fillStyle = pColor;
      ctx.beginPath();
      ctx.moveTo(curX, curTopY + 2);
      ctx.lineTo(curX + 4 + sway, curTopY + 6);
      ctx.lineTo(curX, curTopY + 5);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function drawPolarWindVortex(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const rot = (frame * 0.08) % (Math.PI * 2);

  ctx.save();
  ctx.translate(px, py);

  // Halo central de viento gelido
  const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, 32);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  grad.addColorStop(0.5, 'rgba(186, 230, 253, 0.2)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.fill();

  // Brazos espirales de la tormenta polar
  for (let i = 0; i < 3; i++) {
    const baseAngle = rot + (i * Math.PI * 2 / 3);
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(224, 242, 254, 0.75)' : 'rgba(56, 189, 248, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let r = 6; r <= 28; r += 2) {
      const a = baseAngle + r * 0.12;
      const vx = Math.cos(a) * r;
      const vy = Math.sin(a) * (r * 0.45);
      if (r === 6) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.stroke();
  }

  // Cristales de nieve orbitando en el vortice
  const crystals = [
    { dist: 14, speed: 0.12, offset: 0 },
    { dist: 22, speed: 0.09, offset: 2.1 },
    { dist: 26, speed: 0.14, offset: 4.2 }
  ];

  ctx.fillStyle = '#ffffff';
  crystals.forEach(c => {
    const ang = frame * c.speed + c.offset;
    const cx = Math.cos(ang) * c.dist;
    const cy = Math.sin(ang) * (c.dist * 0.45);
    ctx.fillRect(Math.round(cx) - 1, Math.round(cy) - 1, 2, 2);
  });

  ctx.restore();
}

function drawBlueBrazier(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  // Base y pedestal de piedra runica
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 7, py - 4, 14, 4);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 5, py - 18, 10, 14);
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 3, py - 16, 6, 10);
  // Runa cian grabada
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 1, py - 14, 2, 6);

  // Copa de hierro forjado
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 8, py - 22, 16, 4);
  ctx.fillStyle = '#475569';
  ctx.fillRect(px - 6, py - 21, 12, 2);

  // Resplandor de fuego azul
  const flicker = Math.sin(frame * 0.2) * 2;
  const flameH = 14 + flicker;
  const grad = ctx.createRadialGradient(px, py - 24, 2, px, py - 24, 20);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px, py - 24, 20, 0, Math.PI * 2);
  ctx.fill();

  // Lenguas de llama azul mistica
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px - 5, py - 22);
  ctx.quadraticCurveTo(px - 6 + flicker, py - 22 - flameH * 0.7, px, py - 22 - flameH);
  ctx.quadraticCurveTo(px + 6 - flicker, py - 22 - flameH * 0.7, px + 5, py - 22);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px - 3, py - 22);
  ctx.quadraticCurveTo(px - 3 + flicker, py - 22 - flameH * 0.5, px, py - 22 - flameH * 0.8);
  ctx.quadraticCurveTo(px + 3 - flicker, py - 22 - flameH * 0.5, px + 3, py - 22);
  ctx.closePath();
  ctx.fill();

  // Nucleo blanco caliente
  ctx.fillStyle = '#f0f9ff';
  ctx.fillRect(px - 1, py - 26, 2, 4);
}

function drawSanctuaryPortalArch(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 76;
  const h = 64;

  // 1. Pilares megaliticos de piedra runica
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 6, py - h, 14, h);
  ctx.fillRect(px + w - 8, py - h, 14, h);

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 4, py - h + 2, 10, h - 4);
  ctx.fillRect(px + w - 6, py - h + 2, 10, h - 4);

  // Relieves de piedra tallada en los pilares
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 2, py - h + 8, 6, 4);
  ctx.fillRect(px - 2, py - h + 20, 6, 4);
  ctx.fillRect(px - 2, py - h + 34, 6, 4);
  ctx.fillRect(px + w - 4, py - h + 8, 6, 4);
  ctx.fillRect(px + w - 4, py - h + 20, 6, 4);
  ctx.fillRect(px + w - 4, py - h + 34, 6, 4);

  // Runas celestiales brillantes en los pilares
  const glow = Math.sin(frame * 0.1) * 0.25 + 0.75;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + glow.toFixed(2) + ')';
  ctx.fillRect(px, py - h + 14, 2, 4);
  ctx.fillRect(px, py - h + 26, 2, 6);
  ctx.fillRect(px + w - 2, py - h + 14, 2, 4);
  ctx.fillRect(px + w - 2, py - h + 26, 2, 6);

  // 2. Dintel megalitico superior
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 10, py - h - 10, w + 20, 14);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 8, py - h - 8, w + 16, 10);

  // Capa de nieve sobre el dintel
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(px - 9, py - h - 11, w + 18, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 6, py - h - 12, w + 12, 2);

  // Timpano central con efigie esculpida del Yeti Ancestral
  const midX = px + Math.floor(w / 2);
  const archY = py - h - 4;
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.arc(midX, archY, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(midX - 4, archY - 3, 8, 6);
  // Ojos del relieve que resplandecen en azul mistico
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(midX - 3, archY - 1, 2, 2);
  ctx.fillRect(midX + 1, archY - 1, 2, 2);

  // 3. Estalactitas de hielo azul colgando del dintel
  const icicles = [
    { dx: 12, len: 12 }, { dx: 22, len: 18 }, { dx: 32, len: 10 },
    { dx: 44, len: 10 }, { dx: 54, len: 19 }, { dx: 64, len: 13 }
  ];
  icicles.forEach(ic => {
    ctx.fillStyle = '#bae6fd';
    ctx.beginPath();
    ctx.moveTo(px + ic.dx - 2, py - h + 4);
    ctx.lineTo(px + ic.dx + 2, py - h + 4);
    ctx.lineTo(px + ic.dx, py - h + 4 + ic.len);
    ctx.closePath();
    ctx.fill();
  });
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawYetiFootprint = drawYetiFootprint;
  SpriteManager.prototype.drawIceCavernArch = drawIceCavernArch;
  SpriteManager.prototype.drawRunicCrystalSpire = drawRunicCrystalSpire;
  SpriteManager.prototype.drawYetiWarningTotem = drawYetiWarningTotem;
  SpriteManager.prototype.drawHangingFrostBridge = drawHangingFrostBridge;
  SpriteManager.prototype.drawPolarWindVortex = drawPolarWindVortex;
  SpriteManager.prototype.drawBlueBrazier = drawBlueBrazier;
  SpriteManager.prototype.drawSanctuaryPortalArch = drawSanctuaryPortalArch;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawYetiFootprint,
    drawIceCavernArch,
    drawRunicCrystalSpire,
    drawYetiWarningTotem,
    drawHangingFrostBridge,
    drawPolarWindVortex,
    drawBlueBrazier,
    drawSanctuaryPortalArch
  };
}


// --- MÓDULO: src/sprites/decorations/snow_yeti_boss.js ---
// ============================================================================
// SPRITES MUNDO 4 - FASE 6: EL GRAN YETI Y EL TRONO DE CRISTAL (PIXEL ART)
// ============================================================================

function drawYetiCrystalThrone(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 58;
  const h = 50;

  // 1. Pedestal escalonado de piedra sagrada
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 4, py - 6, w + 8, 6);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 1, py - 12, w + 2, 6);

  // 2. Respaldo monumental de cristal glacial tallado
  const glow = Math.sin(frame * 0.1) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + (glow * 0.35).toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py - h + 14, 26, 0, Math.PI * 2);
  ctx.fill();

  // Facetas del cristal del trono
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.moveTo(px + 6, py - 12);
  ctx.lineTo(px + Math.floor(w / 2), py - h);
  ctx.lineTo(px + w - 6, py - 12);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px + 12, py - 12);
  ctx.lineTo(px + Math.floor(w / 2), py - h + 4);
  ctx.lineTo(px + Math.floor(w / 2), py - 12);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.moveTo(px + Math.floor(w / 2), py - h + 4);
  ctx.lineTo(px + w - 12, py - 12);
  ctx.lineTo(px + Math.floor(w / 2), py - 12);
  ctx.closePath();
  ctx.fill();

  // 3. Cojín de terciopelo real tibetano para el Ratoncito
  ctx.fillStyle = '#e11d48';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 14, 18, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Borde bordado en oro
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 14, 16, 4, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Emblema rúnico sagrado en la cabecera
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px + Math.floor(w / 2) - 3, py - h + 14, 6, 6);
}

function drawGreatSnowYeti(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Respiración suave y serena
  const breath = Math.sin(frame * 0.08) * 1.5;
  const by = py + breath;

  // 1. Sombra amplia en el suelo
  ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
  ctx.beginPath();
  ctx.ellipse(px + 24, py - 2, 28, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Piernas y cuerpo voluminoso de pelo blanco ártico
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 16, 25, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 17, 23, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pies peludos gigantes descansando en el suelo
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(px + 6, py - 6, 10, 6, 0, 0, Math.PI * 2);
  ctx.ellipse(px + 42, py - 6, 10, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Torso y hombros imponentes
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 32, 20, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 33, 18, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Guirnalda de cintas ceremoniales de plegaria (Himalaya)
  const colors = ['#3b82f6', '#ffffff', '#ef4444', '#eab308', '#22c55e'];
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(px + 14 + i * 4, by - 26, 3, 4);
  }

  // 4. Brazos robustos y garras pacíficas
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(px + 6, by - 26, 8, 0, Math.PI * 2);
  ctx.arc(px + 42, by - 26, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(px + 6, by - 27, 7, 0, Math.PI * 2);
  ctx.arc(px + 42, by - 27, 7, 0, Math.PI * 2);
  ctx.fill();

  // 5. Cabeza del Yeti
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(px + 24, by - 44, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(px + 24, by - 45, 13, 0, Math.PI * 2);
  ctx.fill();

  // Rostro de piel azul suave
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.ellipse(px + 24, by - 43, 8, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ojos benevolentes y sabios (parpadeo ocasional)
  const isBlinking = (frame % 120 < 6);
  if (isBlinking) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(px + 20, by - 45, 3, 1);
    ctx.fillRect(px + 25, by - 45, 3, 1);
  } else {
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(px + 21, by - 45, 2, 0, Math.PI * 2);
    ctx.arc(px + 27, by - 45, 2, 0, Math.PI * 2);
    ctx.fill();
    // Brillo en los ojos
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px + 21, by - 46, 1, 1);
    ctx.fillRect(px + 27, by - 46, 1, 1);
  }

  // Nariz y boca serena
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px + 23, by - 42, 2, 2);
  ctx.fillStyle = '#0369a1';
  ctx.fillRect(px + 22, by - 39, 4, 1);

  // Cuernos de hielo azul en la frente
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(px + 15, by - 52);
  ctx.lineTo(px + 13, by - 59);
  ctx.lineTo(px + 18, by - 52);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(px + 30, by - 52);
  ctx.lineTo(px + 35, by - 59);
  ctx.lineTo(px + 33, by - 52);
  ctx.closePath();
  ctx.fill();

  // Vaho de respiración gélida ocasional
  if (frame % 60 < 25) {
    const puffAge = (frame % 60) / 25;
    ctx.fillStyle = 'rgba(224, 242, 254, ' + (1 - puffAge).toFixed(2) + ')';
    ctx.beginPath();
    ctx.arc(px + 24 + puffAge * 6, by - 39 - puffAge * 10, 2 + puffAge * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawYetiCrystalThrone = drawYetiCrystalThrone;
  SpriteManager.prototype.drawGreatSnowYeti = drawGreatSnowYeti;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawYetiCrystalThrone,
    drawGreatSnowYeti
  };
}


// --- MÓDULO: src/sprites/decorations/snow_shambhala.js ---
// ============================================================================
// SPRITES MUNDO 4 - FASE 7: EL REINO OCULTO DE SHAMBHALA (PIXEL ART)
// ============================================================================

function drawCrystalLotusFlower(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Halo de resplandor dorado y cian
  const glow = Math.sin(frame * 0.12) * 0.2 + 0.8;
  const grad = ctx.createRadialGradient(px, py - 10, 2, px, py - 10, 18);
  grad.addColorStop(0, 'rgba(56, 189, 248, ' + (glow * 0.4).toFixed(2) + ')');
  grad.addColorStop(0.6, 'rgba(254, 240, 138, ' + (glow * 0.25).toFixed(2) + ')');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px, py - 10, 18, 0, Math.PI * 2);
  ctx.fill();

  // Hojas basales de jade esmeralda
  ctx.fillStyle = '#059669';
  ctx.beginPath();
  ctx.ellipse(px - 10, py - 2, 7, 3, -0.2, 0, Math.PI * 2);
  ctx.ellipse(px + 10, py - 2, 7, 3, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#34d399';
  ctx.fillRect(px - 11, py - 3, 5, 1);
  ctx.fillRect(px + 6, py - 3, 5, 1);

  // Pétalos exteriores de cuarzo cristalino azul
  const numPetals = 6;
  for (let i = 0; i < numPetals; i++) {
    const angle = (i * Math.PI) / (numPetals - 1) - Math.PI;
    const petX = px + Math.cos(angle) * 11;
    const petY = py - 7 + Math.sin(angle) * 8;
    ctx.fillStyle = (i % 2 === 0) ? '#0284c7' : '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(petX, petY, 5, 8, angle * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pétalos interiores blancos y translúcidos
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.ellipse(px - 4, py - 9, 3, 6, -0.2, 0, Math.PI * 2);
  ctx.ellipse(px + 4, py - 9, 3, 6, 0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px, py - 11, 3, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Corola central de oro místico
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(px, py - 9, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#eab308';
  ctx.fillRect(px - 1, py - 10, 2, 2);

  // Partículas doradas que ascienden en espiral
  const sparkle = (frame * 0.08) % 1;
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 3 + Math.sin(frame * 0.15) * 6, py - 16 - sparkle * 12, 2, 2);
}

function drawShambhalaPrayerBell(ctx, x, y, frame = 0, d = null) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 48;

  // Ondas de choque sónicas doradas si la campana está sonando
  if (d && d.ringing > 0) {
    d.ringing = Math.max(0, d.ringing - 0.02);
    const waveProgress = 1 - d.ringing;
    const waveRadius = 12 + waveProgress * 38;
    ctx.save();
    ctx.strokeStyle = 'rgba(253, 224, 71, ' + (d.ringing * 0.9).toFixed(2) + ')';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(px, py - 24, waveRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(245, 158, 11, ' + (d.ringing * 0.6).toFixed(2) + ')';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(px, py - 24, Math.max(4, waveRadius - 12), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 1. Armazón de madera lacada roja tibetana
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 12, py - 4, 6, 4);
  ctx.fillRect(px + 8, py - 4, 6, 4);

  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px - 10, py - h + 8, 4, h - 10);
  ctx.fillRect(px + 8, py - h + 8, 4, h - 10);

  // Viga transversal superior dorada
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 14, py - h + 6, 30, 5);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 12, py - h + 7, 26, 2);

  // Tejadillo asiático con aleros curvos
  ctx.fillStyle = '#7f1d1d';
  ctx.beginPath();
  ctx.moveTo(px - 16, py - h + 6);
  ctx.lineTo(px + Math.floor(2 / 2), py - h);
  ctx.lineTo(px + 18, py - h + 6);
  ctx.closePath();
  ctx.fill();

  // 2. Gran campana de bronce sagrado
  const sway = Math.sin(frame * 0.06) * 1.5;
  const bellX = px + 1 + sway;
  const bellY = py - h + 15;

  // Cadena de suspensión
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px + 1, py - h + 10);
  ctx.lineTo(bellX, bellY);
  ctx.stroke();

  // Cuerpo de la campana
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.moveTo(bellX - 6, bellY);
  ctx.lineTo(bellX + 6, bellY);
  ctx.lineTo(bellX + 9, bellY + 16);
  ctx.lineTo(bellX - 9, bellY + 16);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(bellX - 4, bellY + 2);
  ctx.lineTo(bellX + 4, bellY + 2);
  ctx.lineTo(bellX + 7, bellY + 15);
  ctx.lineTo(bellX - 7, bellY + 15);
  ctx.closePath();
  ctx.fill();

  // Grabados sagrados en la campana
  ctx.fillStyle = '#fde047';
  ctx.fillRect(bellX - 6, bellY + 8, 12, 2);
  ctx.fillRect(bellX - 7, bellY + 13, 14, 2);

  // Badajo inferior oscilante
  ctx.fillStyle = '#92400e';
  ctx.fillRect(bellX - 1, bellY + 16, 2, 6);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(bellX - 2, bellY + 20, 4, 3);
}

function drawHotSpringPool(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 68;

  // Borde de piedras volcánicas redondeadas
  const rocks = [
    { dx: -4, r: 6 }, { dx: 12, r: 5 }, { dx: 26, r: 7 },
    { dx: 42, r: 5 }, { dx: 56, r: 6 }, { dx: 68, r: 5 }
  ];

  ctx.fillStyle = '#1e293b';
  rocks.forEach(rk => {
    ctx.beginPath();
    ctx.arc(px + rk.dx, py - 3, rk.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#475569';
  rocks.forEach(rk => {
    ctx.beginPath();
    ctx.arc(px + rk.dx, py - 4, rk.r - 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Espejo de agua termal turquesa reluciente
  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 5, Math.floor(w / 2) - 4, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#67e8f9';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 6, Math.floor(w / 2) - 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ondulaciones en el agua
  const wave = Math.sin(frame * 0.1) * 2;
  ctx.fillStyle = '#cffafe';
  ctx.fillRect(px + 16 + wave, py - 7, 14, 1);
  ctx.fillRect(px + 36 - wave, py - 5, 12, 1);

  // Columnas de vapor caliente que se elevan
  for (let s = 0; s < 3; s++) {
    const steamTime = (frame * 0.05 + s * 0.33) % 1;
    const sx = px + 14 + s * 18 + Math.sin(frame * 0.1 + s) * 4;
    const sy = py - 8 - steamTime * 22;
    const alpha = (1 - steamTime) * 0.45;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha.toFixed(2) + ')';
    ctx.beginPath();
    ctx.arc(sx, sy, 3 + steamTime * 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 4. Gran Pagoda Dorada de Shambhala (Templo sagrado de múltiples niveles)
function drawGoldenPagodaTower(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 76;
  const w = 48;

  // Base y pedestal de mármol blanco y piedra tallada
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(px - Math.floor(w / 2), py - 6, w, 6);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 5, w - 4, 2);

  // Nivel 1: Columnas lacadas en rojo carmesí y cancel dorado
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px - 18, py - 26, 4, 20);
  ctx.fillRect(px + 14, py - 26, 4, 20);
  ctx.fillRect(px - 14, py - 24, 28, 18);

  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 12, py - 22, 24, 14);

  // Celosía dorada y resplandor interior
  const relicGlow = Math.sin(frame * 0.1) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(254, 240, 138, ' + relicGlow.toFixed(2) + ')';
  ctx.fillRect(px - 6, py - 18, 12, 10);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 1, py - 18, 2, 10);
  ctx.fillRect(px - 6, py - 14, 12, 2);

  // Tejado 1: Aleros curvos de oro místico
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - 26, py - 28, 52, 3);
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(px - 28, py - 27);
  ctx.lineTo(px - 16, py - 36);
  ctx.lineTo(px + 16, py - 36);
  ctx.lineTo(px + 28, py - 27);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 22, py - 34, 44, 2);
  ctx.fillRect(px - 14, py - 36, 28, 2);

  // Campanas de viento en las esquinas del tejado 1
  const windSway = Math.sin(frame * 0.08) * 1.2;
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 27 + windSway, py - 24, 2, 4);
  ctx.fillRect(px + 25 + windSway, py - 24, 2, 4);

  // Nivel 2: Santuario superior más esbelto
  ctx.fillStyle = '#991b1b';
  ctx.fillRect(px - 12, py - 50, 24, 14);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 4, py - 46, 8, 8);

  // Tejado 2: Cúpula dorada superior
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.moveTo(px - 20, py - 50);
  ctx.lineTo(px - 8, py - 58);
  ctx.lineTo(px + 8, py - 58);
  ctx.lineTo(px + 20, py - 50);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 16, py - 56, 32, 2);

  // Aguja y Pináculo Solar-Lunar (Chorten tibetano)
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px - 1, py - 70, 2, 12);
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(px, py - 72, 3, 0, Math.PI * 2);
  ctx.fill();

  // Destello en la cumbre
  const spark = (frame * 0.05) % 1;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - 75 - spark * 4, 2, 2);
}

// 5. Gran Altar Supremo del Loto del Nirvana
function drawNirvanaLotusAltar(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 54;

  // Pedestal de mármol blanco de Shambhala con bajorrelieves dorados
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px - Math.floor(w / 2), py - 8, w, 8);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - Math.floor(w / 2) + 4, py - 7, w - 8, 2);

  // Moldura dorada con gemas de lapislázuli
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 5, w - 4, 3);
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(px - 16, py - 4, 4, 2);
  ctx.fillRect(px - 2, py - 4, 4, 2);
  ctx.fillRect(px + 12, py - 4, 4, 2);

  // Flor del Loto Supremo del Nirvana (levitando suavemente)
  const floatY = Math.sin(frame * 0.07) * 2.5;
  const lotusY = py - 14 + floatY;

  // Halo sagrado radial
  const glow = Math.sin(frame * 0.1) * 0.25 + 0.85;
  const grad = ctx.createRadialGradient(px, lotusY, 4, px, lotusY, 26);
  grad.addColorStop(0, 'rgba(254, 240, 138, ' + (glow * 0.55).toFixed(2) + ')');
  grad.addColorStop(0.5, 'rgba(56, 189, 248, ' + (glow * 0.35).toFixed(2) + ')');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px, lotusY, 26, 0, Math.PI * 2);
  ctx.fill();

  // Pétalos exteriores de cuarzo cian sagrado
  const petals = 8;
  for (let i = 0; i < petals; i++) {
    const ang = (i * Math.PI) / (petals - 1) - Math.PI;
    const petX = px + Math.cos(ang) * 15;
    const petY = lotusY + Math.sin(ang) * 10;
    ctx.fillStyle = (i % 2 === 0) ? '#0284c7' : '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(petX, petY, 6, 10, ang * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pétalos interiores blancos y puros
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.ellipse(px - 6, lotusY - 2, 4, 8, -0.25, 0, Math.PI * 2);
  ctx.ellipse(px + 6, lotusY - 2, 4, 8, 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px, lotusY - 4, 4, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // Corazón dorado ardiente
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(px, lotusY - 2, 4, 0, Math.PI * 2);
  ctx.fill();

  // Partículas celestiales ascendentes
  for (let p = 0; p < 3; p++) {
    const pTime = (frame * 0.06 + p * 0.33) % 1;
    const pX = px - 6 + p * 6 + Math.sin(frame * 0.12 + p) * 5;
    const pY = lotusY - 8 - pTime * 20;
    ctx.fillStyle = (p % 2 === 0) ? '#fde047' : '#67e8f9';
    ctx.fillRect(pX, pY, 2, 2);
  }
}

// 6. Gran Portal a la Madriguera (Portal dimensional de Shambhala hacia el hogar)
function drawSanctuaryPortalGate(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 58;
  const w = 46;

  // Columnas del arco de piedra tallada y oro
  ctx.fillStyle = '#475569';
  ctx.fillRect(px - Math.floor(w / 2), py - h, 6, h);
  ctx.fillRect(px + Math.floor(w / 2) - 6, py - h, 6, h);

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - Math.floor(w / 2) + 1, py - h + 2, 4, h - 4);
  ctx.fillRect(px + Math.floor(w / 2) - 5, py - h + 2, 4, h - 4);

  // Dintel superior con relieves
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - Math.floor(w / 2) - 2, py - h - 4, w + 4, 6);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - Math.floor(w / 2), py - h - 3, w, 2);

  // Vórtice dimensional interior en espiral
  const vRadiusX = 14;
  const vRadiusY = 22;
  const vCenterY = py - Math.floor(h / 2);

  const vGrad = ctx.createRadialGradient(px, vCenterY, 2, px, vCenterY, vRadiusY);
  vGrad.addColorStop(0, '#fef08a');
  vGrad.addColorStop(0.35, '#38bdf8');
  vGrad.addColorStop(0.7, '#6366f1');
  vGrad.addColorStop(1, 'rgba(30, 27, 75, 0.2)');
  ctx.fillStyle = vGrad;
  ctx.beginPath();
  ctx.ellipse(px, vCenterY, vRadiusX, vRadiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  // Brazos espirales rotatorios del vórtice
  const rot = frame * 0.08;
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 1.5;
  for (let a = 0; a < 3; a++) {
    const angle = rot + (a * Math.PI * 2) / 3;
    ctx.beginPath();
    ctx.moveTo(px, vCenterY);
    ctx.quadraticCurveTo(
      px + Math.cos(angle) * (vRadiusX * 0.7),
      vCenterY + Math.sin(angle) * (vRadiusY * 0.7),
      px + Math.cos(angle + 0.8) * vRadiusX,
      vCenterY + Math.sin(angle + 0.8) * vRadiusY
    );
    ctx.stroke();
  }

  // Chispas que son atraídas hacia el centro del portal
  for (let s = 0; s < 4; s++) {
    const sProg = (frame * 0.05 + s * 0.25) % 1;
    const sAng = s * 1.57 + frame * 0.03;
    const sDist = (1 - sProg) * 16;
    const sx = px + Math.cos(sAng) * sDist;
    const sy = vCenterY + Math.sin(sAng) * (sDist * 1.3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx, sy, 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawCrystalLotusFlower = drawCrystalLotusFlower;
  SpriteManager.prototype.drawShambhalaPrayerBell = drawShambhalaPrayerBell;
  SpriteManager.prototype.drawHotSpringPool = drawHotSpringPool;
  SpriteManager.prototype.drawGoldenPagodaTower = drawGoldenPagodaTower;
  SpriteManager.prototype.drawNirvanaLotusAltar = drawNirvanaLotusAltar;
  SpriteManager.prototype.drawSanctuaryPortalGate = drawSanctuaryPortalGate;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawCrystalLotusFlower,
    drawShambhalaPrayerBell,
    drawHotSpringPool,
    drawGoldenPagodaTower,
    drawNirvanaLotusAltar,
    drawSanctuaryPortalGate
  };
}



// --- MÓDULO: src/sprites/decorations/snow_kailash.js ---
// ============================================================================
// SPRITES MUNDO 4 - FASE 8: EL MONTE KAILASH Y EL REINO ASTRAL (PIXEL ART)
// ============================================================================

// 1. Chorten Sagrado del Monte Kailash (Estupa tibetana con sedas rituales Khata)
function drawKailashChorten(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 42;
  const h = 64;

  // Base escalonada de piedra sagrada y marmol
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px - Math.floor(w / 2), py - 6, w, 6);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 5, w - 4, 2);

  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 16, py - 14, 32, 8);
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(px - 14, py - 13, 28, 2);

  // Cuerpo semiesferico blanco inmaculado (Bumpa)
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(px, py - 24, 14, Math.PI, 0, false);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px - 12, py - 24, 24, 3);

  // Hornacina dorada con gema astral
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - 4, py - 23, 8, 8);
  const gemGlow = Math.sin(frame * 0.12) * 0.3 + 0.7;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + gemGlow.toFixed(2) + ')';
  ctx.fillRect(px - 2, py - 21, 4, 4);

  // Sedas rituales Khata ondeando
  const wave = Math.sin(frame * 0.09) * 2;
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 14, py - 18);
  ctx.quadraticCurveTo(px - 18 + wave, py - 12, px - 20 + wave, py - 6);
  ctx.stroke();

  ctx.strokeStyle = '#93c5fd';
  ctx.beginPath();
  ctx.moveTo(px + 14, py - 18);
  ctx.quadraticCurveTo(px + 18 - wave, py - 12, px + 20 - wave, py - 6);
  ctx.stroke();

  // Capitel dorado y anillos conicos de sabiduria (13 anillos rituales)
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px - 7, py - 30, 14, 6);
  ctx.fillStyle = '#fbbf24';
  for (let i = 0; i < 6; i++) {
    const rw = 12 - i * 1.6;
    ctx.fillRect(px - Math.floor(rw / 2), py - 32 - i * 3, Math.round(rw), 2);
  }

  // Sombrilla ceremonial y Pinaculo Sol y Luna
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 9, py - 52, 18, 3);
  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 7, py - 51, 14, 1);

  // Aguja superior
  ctx.fillStyle = '#d97706';
  ctx.fillRect(px - 1, py - 60, 2, 8);
  // Luna creciente y disco solar
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(px, py - 61, 3, 0, Math.PI * 2);
  ctx.fill();

  // Particulas de incienso que ascienden
  const inc = (frame * 0.05) % 1;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + (1 - inc * 0.8).toFixed(2) + ')';
  ctx.fillRect(px - 2 + Math.sin(frame * 0.1) * 3, py - 64 - inc * 16, 2, 2);
}

// 2. Cristal Astral de Kailash (Gemas de cuarzo cosmico flotantes)
function drawAstralStarCrystal(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Levitacion armonica
  const floatY = Math.sin(frame * 0.08) * 3;
  const cy = py - 16 + floatY;

  // Halo astral violeta y cian
  const glow = Math.sin(frame * 0.1) * 0.25 + 0.75;
  const grad = ctx.createRadialGradient(px, cy, 2, px, cy, 20);
  grad.addColorStop(0, 'rgba(192, 132, 252, ' + (glow * 0.5).toFixed(2) + ')');
  grad.addColorStop(0.6, 'rgba(56, 189, 248, ' + (glow * 0.25).toFixed(2) + ')');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px, cy, 20, 0, Math.PI * 2);
  ctx.fill();

  // Cristal central romboidal
  ctx.fillStyle = '#8b5cf6';
  ctx.beginPath();
  ctx.moveTo(px, cy - 14);
  ctx.lineTo(px + 7, cy);
  ctx.lineTo(px, cy + 14);
  ctx.lineTo(px - 7, cy);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.moveTo(px, cy - 14);
  ctx.lineTo(px + 4, cy);
  ctx.lineTo(px, cy + 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, cy - 10, 2, 4);

  // Dos cristales satelites en orbita
  const orbRot = frame * 0.06;
  for (let s = 0; s < 2; s++) {
    const ang = orbRot + s * Math.PI;
    const sx = px + Math.cos(ang) * 14;
    const sy = cy + Math.sin(ang) * 6;
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(sx - 2, sy - 3, 4, 6);
    ctx.fillStyle = '#bae6fd';
    ctx.fillRect(sx - 1, sy - 2, 2, 2);
  }
}

// 3. Puente del Arcoiris de Kailash (Estructura de luz prismatica)
function drawRainbowBridge(ctx, x, y, w = 180, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Espectro de luz cromatica en gradiente horizontal
  const colors = [
    'rgba(239, 68, 68, 0.75)',   // Rojo
    'rgba(249, 115, 22, 0.75)',  // Naranja
    'rgba(234, 179, 8, 0.8)',    // Amarillo
    'rgba(34, 197, 94, 0.8)',    // Verde
    'rgba(6, 182, 212, 0.85)',   // Cian
    'rgba(59, 130, 246, 0.85)',  // Azul
    'rgba(168, 85, 247, 0.8)'    // Violeta
  ];

  const barH = 2;
  for (let c = 0; c < colors.length; c++) {
    ctx.fillStyle = colors[c];
    ctx.fillRect(px, py + c * barH, w, barH);
  }

  // Brillo estelar pulsante en la superficie
  const pulse = Math.sin(frame * 0.1) * 0.2 + 0.8;
  ctx.fillStyle = 'rgba(255, 255, 255, ' + (pulse * 0.6).toFixed(2) + ')';
  ctx.fillRect(px, py - 1, w, 1);

  // Destellos estelares sobre el arcoiris
  for (let s = 0; s < 5; s++) {
    const sTime = (frame * 0.04 + s * 0.2) % 1;
    const sx = px + sTime * w;
    const sy = py + (Math.sin(s * 2 + frame * 0.08) * 4) + 6;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx, sy, 2, 2);
  }
}

// 4. Palacio de Cristal de Agartha (Ciudadela celestial de cuarzo y oro)
function drawAgarthaCrystalPalace(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 54;
  const h = 80;

  // Pedestal y escalinatas de marmol sagrado
  ctx.fillStyle = '#475569';
  ctx.fillRect(px - Math.floor(w / 2), py - 6, w, 6);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 5, w - 4, 2);

  // Nivel 1: Columnas de lapislazuli y gran portal ojival
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(px - 22, py - 30, 6, 24);
  ctx.fillRect(px + 16, py - 30, 6, 24);
  ctx.fillRect(px - 16, py - 28, 32, 22);

  // Portal ojival con energia cosmica interior
  const portalGlow = Math.sin(frame * 0.1) * 0.25 + 0.75;
  ctx.fillStyle = 'rgba(192, 132, 252, ' + portalGlow.toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px, py - 18, 9, Math.PI, 0);
  ctx.lineTo(px + 9, py - 6);
  ctx.lineTo(px - 9, py - 6);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - 1, py - 20, 2, 14);

  // Cornisa y tejadillo de oro y lapislazuli
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - 26, py - 32, 52, 3);
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(px - 24, py - 34, 48, 2);

  // Nivel 2: Baluarte de cristales facetados y agujas de cuarzo
  ctx.fillStyle = '#6366f1';
  ctx.fillRect(px - 15, py - 54, 30, 20);

  // Agujas laterales de cristal de cuarzo
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.moveTo(px - 20, py - 32);
  ctx.lineTo(px - 15, py - 52);
  ctx.lineTo(px - 10, py - 32);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(px + 10, py - 32);
  ctx.lineTo(px + 15, py - 52);
  ctx.lineTo(px + 20, py - 32);
  ctx.closePath();
  ctx.fill();

  // Celosia de diamante estelar
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 4, py - 48, 8, 8);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 2, py - 46, 4, 4);

  // Aguja central y gran diamante de Agartha
  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.moveTo(px - 12, py - 54);
  ctx.lineTo(px, py - 72);
  ctx.lineTo(px + 12, py - 54);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(px - 4, py - 54);
  ctx.lineTo(px, py - 72);
  ctx.lineTo(px + 4, py - 54);
  ctx.closePath();
  ctx.fill();

  // Gran gema cumbrera de Agartha pulsante
  const gemPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;
  ctx.fillStyle = 'rgba(56, 189, 248, ' + gemPulse.toFixed(2) + ')';
  ctx.beginPath();
  ctx.arc(px, py - 75, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - 76, 2, 2);
}

// 5. Trono Celestial de las Estrellas (Altar del Hijo del Santuario)
function drawCelestialStarThrone(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 52;

  // Base de marmol celestial y oro con molduras sagradas
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - Math.floor(w / 2), py - 7, w, 7);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(px - Math.floor(w / 2) + 2, py - 6, w - 4, 2);

  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(px - Math.floor(w / 2) + 4, py - 4, w - 8, 2);

  // Respaldo de alas de cristal de luna
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.moveTo(px - 18, py - 7);
  ctx.quadraticCurveTo(px - 24, py - 26, px - 12, py - 32);
  ctx.lineTo(px - 8, py - 7);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(px + 18, py - 7);
  ctx.quadraticCurveTo(px + 24, py - 26, px + 12, py - 32);
  ctx.lineTo(px + 8, py - 7);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 10, py - 24, 20, 17);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - 3, py - 28, 6, 6);

  // Halo de luz estelar rotatorio
  const rot = frame * 0.08;
  const haloGlow = Math.sin(frame * 0.1) * 0.2 + 0.8;
  const hGrad = ctx.createRadialGradient(px, py - 18, 2, px, py - 18, 24);
  hGrad.addColorStop(0, 'rgba(254, 240, 138, ' + (haloGlow * 0.45).toFixed(2) + ')');
  hGrad.addColorStop(0.6, 'rgba(192, 132, 252, ' + (haloGlow * 0.25).toFixed(2) + ')');
  hGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = hGrad;
  ctx.beginPath();
  ctx.arc(px, py - 18, 24, 0, Math.PI * 2);
  ctx.fill();
}

// 6. Gran Portal Cosmico a la Madriguera (Portal dimensional supremo)
function drawCosmicBurrowPortal(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 46;
  const h = 60;

  // Columnas doradas con motivos de nubes y relampagos cosmicos
  ctx.fillStyle = '#b45309';
  ctx.fillRect(px - Math.floor(w / 2), py - h, 6, h);
  ctx.fillRect(px + Math.floor(w / 2) - 6, py - h, 6, h);

  ctx.fillStyle = '#fde047';
  ctx.fillRect(px - Math.floor(w / 2) + 1, py - h + 2, 4, h - 4);
  ctx.fillRect(px + Math.floor(w / 2) - 5, py - h + 2, 4, h - 4);

  // Dintel superior ceremonial
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px - Math.floor(w / 2) - 3, py - h - 5, w + 6, 7);
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(px - Math.floor(w / 2) - 1, py - h - 4, w + 2, 2);

  // Centro del vortice galactico dimensional
  const vRadX = 14;
  const vRadY = 22;
  const vCenterY = py - Math.floor(h / 2);

  const grad = ctx.createRadialGradient(px, vCenterY, 1, px, vCenterY, vRadY);
  grad.addColorStop(0, '#fef08a');
  grad.addColorStop(0.3, '#38bdf8');
  grad.addColorStop(0.65, '#a855f7');
  grad.addColorStop(1, 'rgba(15, 23, 42, 0.2)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(px, vCenterY, vRadX, vRadY, 0, 0, Math.PI * 2);
  ctx.fill();

  // Brazos de galaxia espiral en rotacion
  const rot = frame * 0.09;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  for (let a = 0; a < 3; a++) {
    const ang = rot + (a * Math.PI * 2) / 3;
    ctx.beginPath();
    ctx.moveTo(px, vCenterY);
    ctx.quadraticCurveTo(
      px + Math.cos(ang) * (vRadX * 0.7),
      vCenterY + Math.sin(ang) * (vRadY * 0.7),
      px + Math.cos(ang + 0.9) * vRadX,
      vCenterY + Math.sin(ang + 0.9) * vRadY
    );
    ctx.stroke();
  }

  // Particulas cosmicas absorbidas por el portal
  for (let p = 0; p < 4; p++) {
    const pProg = (frame * 0.05 + p * 0.25) % 1;
    const pDist = (1 - pProg) * 16;
    const pAng = p * 1.57 + frame * 0.04;
    ctx.fillStyle = (p % 2 === 0) ? '#fde047' : '#67e8f9';
    ctx.fillRect(px + Math.cos(pAng) * pDist, vCenterY + Math.sin(pAng) * (pDist * 1.3), 2, 2);
  }
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawKailashChorten = drawKailashChorten;
  SpriteManager.prototype.drawAstralStarCrystal = drawAstralStarCrystal;
  SpriteManager.prototype.drawRainbowBridge = drawRainbowBridge;
  SpriteManager.prototype.drawAgarthaCrystalPalace = drawAgarthaCrystalPalace;
  SpriteManager.prototype.drawCelestialStarThrone = drawCelestialStarThrone;
  SpriteManager.prototype.drawCosmicBurrowPortal = drawCosmicBurrowPortal;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawKailashChorten,
    drawAstralStarCrystal,
    drawRainbowBridge,
    drawAgarthaCrystalPalace,
    drawCelestialStarThrone,
    drawCosmicBurrowPortal
  };
}



// --- MÓDULO: src/sprites/decorations/snow_firmament.js ---
// ============================================================================
// SPRITES PIXEL ART: EL FIRMAMENTO CÓSMICO Y LAS BÓVEDAS ASTRALES
// Mundo 4 - Fase 9: Decoraciones de Auroras, Constelaciones y Altares de Cometa
// ============================================================================

function drawBorealPillar(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Base ceremonial de obsidiana astral y oro celestial
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 16, py - 6, 32, 6);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 14, py - 12, 28, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 16, py - 14, 32, 2);
  ctx.fillRect(px - 12, py - 16, 24, 2);

  // Grabados rúnicos dorados en la base
  ctx.fillStyle = '#fff3b0';
  ctx.fillRect(px - 8, py - 10, 3, 3);
  ctx.fillRect(px + 5, py - 10, 3, 3);

  // 2. Fuste del Pilar de Cristal Cósmico (Luz translúcida y facetada)
  const pillarHeight = 72;
  const topY = py - 16 - pillarHeight;

  // Fondo del núcleo de cristal
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(px - 9, topY, 18, pillarHeight);

  // Bandas ondulantes de Aurora Boreal dentro del pilar (Esmeralda, Cian, Violeta, Magenta)
  for (let i = 0; i < pillarHeight; i += 3) {
    const wave = Math.sin((f * 0.08) + (i * 0.12));
    const wave2 = Math.cos((f * 0.06) + (i * 0.15));
    const offset = Math.round(wave * 3);

    // Gradiente cromático por altura
    let auroraColor = '#00f5d4'; // Turquesa / Esmeralda
    if (i < 24) {
      auroraColor = '#f72585'; // Magenta en la cúspide
    } else if (i < 48) {
      auroraColor = '#9d4edd'; // Violeta astral en el medio
    }

    ctx.fillStyle = auroraColor;
    ctx.fillRect(px - 5 + offset, topY + i, 10, 2);

    // Hilos de brillo blanco estelar
    if ((i + Math.floor(f * 0.5)) % 9 === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(px - 2 + Math.round(wave2 * 2), topY + i, 4, 1);
    }
  }

  // Bordes cristalinos exteriores y facetado
  ctx.fillStyle = 'rgba(72, 202, 228, 0.9)';
  ctx.fillRect(px - 10, topY, 2, pillarHeight);
  ctx.fillRect(px + 8, topY, 2, pillarHeight);

  // 3. Anillos orbitales flotantes de diamante estelar
  const ringY1 = topY + 22 + Math.sin(f * 0.07) * 4;
  const ringY2 = topY + 50 + Math.cos(f * 0.07) * 4;

  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 13, ringY1, 26, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 11, ringY1 - 1, 4, 4);
  ctx.fillRect(px + 7, ringY1 - 1, 4, 4);

  ctx.fillStyle = '#48cae4';
  ctx.fillRect(px - 12, ringY2, 24, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, ringY2 - 1, 4, 4);

  // 4. Capitel y Cúspide de Diamante Astral
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 14, topY - 4, 28, 4);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 12, topY - 8, 24, 4);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 8, topY - 12, 16, 4);

  // Gran Rombo de Diamante de la Aurora en la cima
  const gemPulse = 1 + Math.sin(f * 0.1) * 0.15;
  const gSize = Math.round(7 * gemPulse);

  ctx.fillStyle = '#00f5d4';
  ctx.beginPath();
  ctx.moveTo(px, topY - 14 - gSize * 2);
  ctx.lineTo(px + gSize, topY - 14 - gSize);
  ctx.lineTo(px, topY - 14);
  ctx.lineTo(px - gSize, topY - 14 - gSize);
  ctx.closePath();
  ctx.fill();

  // Brillo central y destellos estelares
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, topY - 14 - gSize - 2, 4, 4);

  // Destellos estelares en cruz (Rayos de luz astral)
  const flare = 4 + Math.sin(f * 0.15) * 3;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillRect(px - flare, topY - 14 - gSize, flare * 2, 1);
  ctx.fillRect(px, topY - 14 - gSize - flare, 1, flare * 2);

  ctx.restore();
}

function drawConstellationArch(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Pilares gemelos de mármol azul y oro celestial
  const archW = 64;
  const archH = 58;
  const leftX = px - archW / 2;
  const rightX = px + archW / 2;
  const baseY = py;

  // Bases izquierda y derecha
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(leftX - 8, baseY - 6, 16, 6);
  ctx.fillRect(rightX - 8, baseY - 6, 16, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 6, baseY - 8, 12, 2);
  ctx.fillRect(rightX - 6, baseY - 8, 12, 2);

  // Fustes gemelos
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(leftX - 4, baseY - archH, 8, archH - 8);
  ctx.fillRect(rightX - 4, baseY - archH, 8, archH - 8);

  // Líneas doradas de energía en los fustes
  ctx.fillStyle = '#48cae4';
  ctx.fillRect(leftX - 1, baseY - archH + 4, 2, archH - 14);
  ctx.fillRect(rightX - 1, baseY - archH + 4, 2, archH - 14);

  // Capiteles
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 6, baseY - archH - 3, 12, 3);
  ctx.fillRect(rightX - 6, baseY - archH - 3, 12, 3);

  // 2. Arco Ojival de Constelaciones (Curva estelar con estrellas conectadas)
  const archTopY = baseY - archH - 18;
  const midX = px;

  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(leftX, baseY - archH);
  ctx.quadraticCurveTo(midX, archTopY, rightX, baseY - archH);
  ctx.stroke();

  // Segundo arco exterior de aurora turquesa
  ctx.strokeStyle = 'rgba(0, 245, 212, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(leftX - 3, baseY - archH + 2);
  ctx.quadraticCurveTo(midX, archTopY - 4, rightX + 3, baseY - archH + 2);
  ctx.stroke();

  // 3. Estrellas zodiacales incrustadas en el arco
  const starPoints = [
    { x: leftX + 4, y: baseY - archH - 6 },
    { x: leftX + 14, y: baseY - archH - 12 },
    { x: midX - 12, y: archTopY + 3 },
    { x: midX, y: archTopY },
    { x: midX + 12, y: archTopY + 3 },
    { x: rightX - 14, y: baseY - archH - 12 },
    { x: rightX - 4, y: baseY - archH - 6 }
  ];

  starPoints.forEach((sp, idx) => {
    const starBlink = (Math.sin(f * 0.12 + idx * 1.2) > 0);
    ctx.fillStyle = starBlink ? '#ffffff' : '#ffd166';
    ctx.fillRect(sp.x - 2, sp.y - 2, 4, 4);

    // Hilos de constelación conectados
    if (idx > 0) {
      ctx.strokeStyle = 'rgba(255, 209, 102, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(starPoints[idx - 1].x, starPoints[idx - 1].y);
      ctx.lineTo(sp.x, sp.y);
      ctx.stroke();
    }
  });

  // 4. Gran Esfera de Nebulosa Central suspendida en el arco
  const sphereY = archTopY + 12 + Math.sin(f * 0.08) * 3;

  // Halo difuso
  const haloRad = 9 + Math.sin(f * 0.1) * 2;
  const haloGrad = ctx.createRadialGradient(midX, sphereY, 2, midX, sphereY, haloRad);
  haloGrad.addColorStop(0, 'rgba(247, 37, 133, 0.8)');
  haloGrad.addColorStop(0.5, 'rgba(157, 78, 221, 0.4)');
  haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(midX, sphereY, haloRad, 0, Math.PI * 2);
  ctx.fill();

  // Esfera de cuarzo violeta
  ctx.fillStyle = '#7209b7';
  ctx.beginPath();
  ctx.arc(midX, sphereY, 6, 0, Math.PI * 2);
  ctx.fill();

  // Núcleo estelar blanco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(midX - 2, sphereY - 2, 4, 4);

  // Micro-destellos
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(midX - 4, sphereY, 1, 1);
  ctx.fillRect(midX + 3, sphereY, 1, 1);

  ctx.restore();
}

function drawCometAltar(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Basamento de meteorito astral facetado
  ctx.fillStyle = '#0b091a';
  ctx.beginPath();
  ctx.moveTo(px - 22, py);
  ctx.lineTo(px - 18, py - 8);
  ctx.lineTo(px + 18, py - 8);
  ctx.lineTo(px + 22, py);
  ctx.closePath();
  ctx.fill();

  // Ribetes dorados en la base
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 18, py - 9, 36, 2);

  // Cuerpo del altar con grietas de fuego cósmico
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px - 14, py - 22, 28, 13);

  // Fisuras resplandecientes cian y violeta
  ctx.fillStyle = '#00f5d4';
  ctx.fillRect(px - 10, py - 18, 5, 2);
  ctx.fillRect(px - 6, py - 16, 4, 2);
  ctx.fillRect(px + 4, py - 20, 6, 2);
  ctx.fillRect(px + 2, py - 14, 5, 2);

  // Mesa superior de ofrendas
  ctx.fillStyle = '#312e81';
  ctx.fillRect(px - 16, py - 25, 32, 3);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 18, py - 27, 36, 2);

  // 2. Copa ceremonial / Cuenco de stardust
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.moveTo(px - 10, py - 27);
  ctx.lineTo(px - 12, py - 33);
  ctx.lineTo(px + 12, py - 33);
  ctx.lineTo(px + 10, py - 27);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fff3b0';
  ctx.fillRect(px - 9, py - 32, 18, 2);

  // 3. Fuego de Cometa Pulsante Flotante (Llama cósmica azul, verde y blanca)
  const flameY = py - 36 + Math.sin(f * 0.12) * 3;
  const flameH = 12 + Math.cos(f * 0.15) * 3;

  // Llama exterior turquesa
  ctx.fillStyle = 'rgba(0, 245, 212, 0.8)';
  ctx.beginPath();
  ctx.moveTo(px - 7, flameY);
  ctx.quadraticCurveTo(px, flameY - flameH, px + 7, flameY);
  ctx.closePath();
  ctx.fill();

  // Llama intermedia violeta
  ctx.fillStyle = 'rgba(157, 78, 221, 0.9)';
  ctx.beginPath();
  ctx.moveTo(px - 4, flameY);
  ctx.quadraticCurveTo(px, flameY - (flameH * 0.75), px + 4, flameY);
  ctx.closePath();
  ctx.fill();

  // Núcleo blanco incandescente
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 2, flameY);
  ctx.quadraticCurveTo(px, flameY - (flameH * 0.45), px + 2, flameY);
  ctx.closePath();
  ctx.fill();

  // 4. Micro-cometas que orbitan la llama
  for (let c = 0; c < 2; c++) {
    const cometAngle = (f * 0.08) + (c * Math.PI);
    const cx = px + Math.cos(cometAngle) * 14;
    const cy = flameY - 4 + Math.sin(cometAngle) * 5;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(cx) - 1, Math.round(cy) - 1, 3, 3);

    // Estela del micro-cometa
    const tx = px + Math.cos(cometAngle - 0.3) * 14;
    const ty = flameY - 4 + Math.sin(cometAngle - 0.3) * 5;
    ctx.fillStyle = 'rgba(72, 202, 228, 0.6)';
    ctx.fillRect(Math.round(tx), Math.round(ty), 2, 2);
  }

  ctx.restore();
}

function drawNebulaGardenFlora(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Tallo y zarcillos de cristal bioluminiscente
  const stemWave = Math.sin(f * 0.08) * 3;
  ctx.strokeStyle = '#00f5d4';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.quadraticCurveTo(px + stemWave, py - 14, px, py - 26);
  ctx.stroke();

  // Hojas astrales de rocío lunar
  ctx.fillStyle = 'rgba(72, 202, 228, 0.7)';
  ctx.beginPath();
  ctx.ellipse(px - 6 + stemWave * 0.5, py - 12, 5, 2, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(px + 6 + stemWave * 0.5, py - 18, 5, 2, Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();

  // 2. Corola de Pétalos de Nebulosa (Púrpura, Magenta y Oro)
  const flowerY = py - 26;
  const pulse = 1 + Math.sin(f * 0.1) * 0.12;

  // Pétalos exteriores magenta translúcido
  ctx.fillStyle = 'rgba(247, 37, 133, 0.75)';
  for (let i = 0; i < 5; i++) {
    const angle = (i * (Math.PI * 2 / 5)) + (f * 0.02);
    const petX = px + Math.cos(angle) * (11 * pulse);
    const petY = flowerY + Math.sin(angle) * (9 * pulse);
    ctx.beginPath();
    ctx.arc(petX, petY, 5 * pulse, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pétalos interiores violeta cósmico
  ctx.fillStyle = 'rgba(157, 78, 221, 0.85)';
  for (let i = 0; i < 5; i++) {
    const angle = (i * (Math.PI * 2 / 5)) + (f * 0.02) + 0.3;
    const petX = px + Math.cos(angle) * (6 * pulse);
    const petY = flowerY + Math.sin(angle) * (5 * pulse);
    ctx.beginPath();
    ctx.arc(petX, petY, 3.5 * pulse, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Pistilo y Estambres de Polvo Estelar
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 2, flowerY - 2, 4, 4);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 1, flowerY - 1, 2, 2);

  // Esporas de polen estelar flotantes
  for (let s = 0; s < 3; s++) {
    const sporeAngle = (f * 0.09) + (s * 2.1);
    const sx = px + Math.cos(sporeAngle) * (15 + s * 2);
    const sy = flowerY - 6 + Math.sin(sporeAngle) * (10 + s);
    ctx.fillStyle = (s % 2 === 0) ? '#fff3b0' : '#00f5d4';
    ctx.fillRect(Math.round(sx), Math.round(sy), 2, 2);
  }

  ctx.restore();
}

function drawShootingStarArch(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  const w = 56;
  const h = 48;
  const leftX = px - w / 2;
  const rightX = px + w / 2;

  // 1. Columnas esbeltas de oro blanco
  ctx.fillStyle = '#334155';
  ctx.fillRect(leftX - 4, py - 4, 8, 4);
  ctx.fillRect(rightX - 4, py - 4, 8, 4);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 2, py - h, 4, h - 4);
  ctx.fillRect(rightX - 2, py - h, 4, h - 4);

  // 2. Arco parabólico de estelas de meteorito
  const arcPeakY = py - h - 16;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(leftX, py - h);
  ctx.quadraticCurveTo(px, arcPeakY, rightX, py - h);
  ctx.stroke();

  // Estela inferior de luz cian
  ctx.strokeStyle = 'rgba(0, 245, 212, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(leftX + 2, py - h + 2);
  ctx.quadraticCurveTo(px, arcPeakY + 4, rightX - 2, py - h + 2);
  ctx.stroke();

  // 3. Media luna celestial y estrella fugaz en la cúspide
  const moonY = arcPeakY + 2 + Math.sin(f * 0.07) * 2;
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(px, moonY, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(px + 2.5, moonY - 1, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Estrella fulgurante al centro del arco
  const starPulse = (Math.sin(f * 0.15) > 0);
  ctx.fillStyle = starPulse ? '#ffffff' : '#ffd166';
  ctx.fillRect(px - 1, moonY - 1, 3, 3);

  // Destellos estelares cayendo
  for (let i = 0; i < 3; i++) {
    const sparkX = leftX + 8 + (i * 18) + Math.sin(f * 0.1 + i) * 3;
    const sparkY = py - h + 4 + ((f * 0.8 + i * 12) % 24);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(Math.round(sparkX), Math.round(sparkY), 2, 2);
  }

  ctx.restore();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawBorealPillar = drawBorealPillar;
  SpriteManager.prototype.drawConstellationArch = drawConstellationArch;
  SpriteManager.prototype.drawCometAltar = drawCometAltar;
  SpriteManager.prototype.drawNebulaGardenFlora = drawNebulaGardenFlora;
  SpriteManager.prototype.drawShootingStarArch = drawShootingStarArch;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawBorealPillar,
    drawConstellationArch,
    drawCometAltar,
    drawNebulaGardenFlora,
    drawShootingStarArch
  };
}


// --- MÓDULO: src/sprites/decorations/snow_firmament_sanctum.js ---
// ============================================================================
// SPRITES PIXEL ART: EL SANCTUM SANCTORUM DE LA ESTRELLA POLAR
// Mundo 4 - Fase 9 Parte 3: Trono de Polaris, Templo Cósmico y Portal Supremo
// ============================================================================

function drawPolarisThrone(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Basamento escalonado de mármol astral y oro celestial
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 22, py - 6, 44, 6);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 18, py - 12, 36, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 20, py - 14, 40, 2);
  ctx.fillRect(px - 16, py - 16, 32, 2);

  // 2. Alas celestiales de cristal de luna (Respaldo del Trono)
  const wingPulse = Math.sin(f * 0.08) * 2;
  ctx.fillStyle = 'rgba(72, 202, 228, 0.85)';
  // Ala izquierda
  ctx.beginPath();
  ctx.moveTo(px - 10, py - 16);
  ctx.lineTo(px - 26, py - 38 + wingPulse);
  ctx.lineTo(px - 22, py - 52 + wingPulse);
  ctx.lineTo(px - 6, py - 36);
  ctx.closePath();
  ctx.fill();

  // Ala derecha
  ctx.beginPath();
  ctx.moveTo(px + 10, py - 16);
  ctx.lineTo(px + 26, py - 38 + wingPulse);
  ctx.lineTo(px + 22, py - 52 + wingPulse);
  ctx.lineTo(px + 6, py - 36);
  ctx.closePath();
  ctx.fill();

  // Ribetes dorados en las alas
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - 22, py - 52 + wingPulse);
  ctx.lineTo(px - 26, py - 38 + wingPulse);
  ctx.lineTo(px - 10, py - 16);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(px + 22, py - 52 + wingPulse);
  ctx.lineTo(px + 26, py - 38 + wingPulse);
  ctx.lineTo(px + 10, py - 16);
  ctx.stroke();

  // 3. Respaldo central del Trono de Cuarzo y Oro
  ctx.fillStyle = '#0b091a';
  ctx.fillRect(px - 12, py - 46, 24, 30);
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(px - 10, py - 44, 20, 28);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px - 12, py - 48, 24, 2);

  // Cojín de terciopelo cósmico índigo
  ctx.fillStyle = '#312e81';
  ctx.fillRect(px - 10, py - 22, 20, 6);
  ctx.fillStyle = '#4338ca';
  ctx.fillRect(px - 8, py - 20, 16, 2);

  // 4. Gran Corona de la Estrella Polar en la Cima
  const starTopY = py - 56;
  const starPulse = 1 + Math.sin(f * 0.12) * 0.15;
  const sRad = Math.round(6 * starPulse);

  // Halo radial de starlight
  const haloRad = 12 + Math.sin(f * 0.1) * 3;
  const haloGrad = ctx.createRadialGradient(px, starTopY, 2, px, starTopY, haloRad);
  haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
  haloGrad.addColorStop(0.4, 'rgba(0, 245, 212, 0.6)');
  haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(px, starTopY, haloRad, 0, Math.PI * 2);
  ctx.fill();

  // Gran Rombo de Diamante de Polaris
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px, starTopY - sRad * 2);
  ctx.lineTo(px + sRad, starTopY);
  ctx.lineTo(px, starTopY + sRad * 2);
  ctx.lineTo(px - sRad, starTopY);
  ctx.closePath();
  ctx.fill();

  // Destellos estelares en cruz (Rayos de luz polar)
  const rayLen = 8 + Math.sin(f * 0.15) * 4;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(px - rayLen, starTopY);
  ctx.lineTo(px + rayLen, starTopY);
  ctx.moveTo(px, starTopY - rayLen);
  ctx.lineTo(px, starTopY + rayLen);
  ctx.stroke();

  ctx.restore();
}

function drawCosmicNebulaSanctum(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  const sanctumW = 96;
  const sanctumH = 84;
  const baseY = py;
  const leftX = px - sanctumW / 2;

  // 1. Podio de la Ciudadela Celestial
  ctx.fillStyle = '#0b091a';
  ctx.fillRect(leftX, baseY - 8, sanctumW, 8);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX + 4, baseY - 10, sanctumW - 8, 2);

  // 2. Columnas cuádruples de mármol azul y oro
  const colX = [leftX + 10, leftX + 28, leftX + sanctumW - 36, leftX + sanctumW - 18];
  colX.forEach(cx => {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - 4, baseY - sanctumH + 16, 8, sanctumH - 26);
    ctx.fillStyle = '#00f5d4';
    ctx.fillRect(cx - 1, baseY - sanctumH + 20, 2, sanctumH - 34);
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(cx - 5, baseY - sanctumH + 14, 10, 2);
  });

  // 3. Ventanal Ojival Central con Nebulosa en Movimiento
  const windowW = 32;
  const windowH = 46;
  const winX = px - windowW / 2;
  const winY = baseY - windowH - 12;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(winX, winY, windowW, windowH);

  // Espiral de galaxia dentro del ventanal
  const galaxyGrad = ctx.createRadialGradient(px, winY + 24, 2, px, winY + 24, 16);
  galaxyGrad.addColorStop(0, '#f72585');
  galaxyGrad.addColorStop(0.5, '#7209b7');
  galaxyGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = galaxyGrad;
  ctx.beginPath();
  ctx.arc(px, winY + 24, 14, 0, Math.PI * 2);
  ctx.fill();

  // Partículas estelares en rotación
  for (let i = 0; i < 4; i++) {
    const starAngle = (f * 0.06) + (i * (Math.PI / 2));
    const sx = px + Math.cos(starAngle) * (8 + i * 1.5);
    const sy = winY + 24 + Math.sin(starAngle) * (5 + i);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.round(sx), Math.round(sy), 2, 2);
  }

  // Marco de oro del ventanal
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2;
  ctx.strokeRect(winX, winY, windowW, windowH);

  // 4. Techo de Pagoda Celestial y Cúpula de Cristal
  const roofY = baseY - sanctumH + 14;
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(leftX - 6, roofY);
  ctx.lineTo(leftX + 8, roofY - 14);
  ctx.lineTo(leftX + sanctumW - 8, roofY - 14);
  ctx.lineTo(leftX + sanctumW + 6, roofY);
  ctx.closePath();
  ctx.fill();

  // Aleros dorados con campanas celestes
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 8, roofY - 2, sanctumW + 16, 3);
  ctx.fillRect(leftX + 6, roofY - 16, sanctumW - 12, 2);

  // Aguja cumbrera con diamante estelar
  const spireTopY = roofY - 28;
  ctx.strokeStyle = '#ffd166';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, roofY - 16);
  ctx.lineTo(px, spireTopY);
  ctx.stroke();

  ctx.fillStyle = '#00f5d4';
  ctx.beginPath();
  ctx.arc(px, spireTopY - 4, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, spireTopY - 5, 2, 2);

  ctx.restore();
}

function drawSanctumBurrowGate(ctx, px, py, frame) {
  const f = frame || 0;
  ctx.save();

  // 1. Columnas ceremoniales doradas con nubes tibetanas
  const gateW = 60;
  const gateH = 68;
  const leftX = px - gateW / 2;
  const rightX = px + gateW / 2;
  const baseY = py;

  // Bases izquierda y derecha
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(leftX - 8, baseY - 8, 16, 8);
  ctx.fillRect(rightX - 8, baseY - 8, 16, 8);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 6, baseY - 10, 12, 2);
  ctx.fillRect(rightX - 6, baseY - 10, 12, 2);

  // Columnas verticales de oro
  ctx.fillStyle = '#eab308';
  ctx.fillRect(leftX - 4, baseY - gateH, 8, gateH - 10);
  ctx.fillRect(rightX - 4, baseY - gateH, 8, gateH - 10);

  // Dintel ceremonial superior
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX - 8, baseY - gateH - 4, gateW + 16, 6);
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(leftX - 4, baseY - gateH - 10, gateW + 8, 6);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(leftX, baseY - gateH - 12, gateW, 2);

  // 2. Vórtice Dimensional Cósmico a la Madriguera (Tricromático en rotación)
  const portalCenterX = px;
  const portalCenterY = baseY - (gateH / 2) - 2;
  const portalRadX = 22;
  const portalRadY = 30;

  // Capa exterior de energía cósmica púrpura
  ctx.fillStyle = 'rgba(114, 9, 183, 0.85)';
  ctx.beginPath();
  ctx.ellipse(portalCenterX, portalCenterY, portalRadX, portalRadY, 0, 0, Math.PI * 2);
  ctx.fill();

  // Capa intermedia de torbellino turquesa
  ctx.fillStyle = 'rgba(0, 245, 212, 0.75)';
  ctx.beginPath();
  ctx.ellipse(portalCenterX, portalCenterY, portalRadX * 0.75, portalRadY * 0.75, Math.sin(f * 0.05) * 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Núcleo blanco y dorado hiperdimensional
  const pulseCore = 1 + Math.sin(f * 0.1) * 0.2;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(portalCenterX, portalCenterY, 8 * pulseCore, 12 * pulseCore, 0, 0, Math.PI * 2);
  ctx.fill();

  // Brazo espiral de galaxia absorbiendo partículas hacia la Madriguera
  for (let i = 0; i < 6; i++) {
    const spiralAngle = (f * 0.08) + (i * (Math.PI / 3));
    const dist = 6 + ((f * 0.5 + i * 4) % 18);
    const sx = portalCenterX + Math.cos(spiralAngle) * dist;
    const sy = portalCenterY + Math.sin(spiralAngle) * (dist * 1.3);

    ctx.fillStyle = (i % 2 === 0) ? '#ffd166' : '#ffffff';
    ctx.fillRect(Math.round(sx) - 1, Math.round(sy) - 1, 2, 2);
  }

  // Resplandor exterior pulsante
  ctx.strokeStyle = 'rgba(255, 209, 102, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(portalCenterX, portalCenterY, portalRadX + 2, portalRadY + 2, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawPolarisThrone = drawPolarisThrone;
  SpriteManager.prototype.drawCosmicNebulaSanctum = drawCosmicNebulaSanctum;
  SpriteManager.prototype.drawSanctumBurrowGate = drawSanctumBurrowGate;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawPolarisThrone,
    drawCosmicNebulaSanctum,
    drawSanctumBurrowGate
  };
}


// --- MÓDULO: src/sprites/decorations/snow_expedition.js ---
// ============================================================================
// SPRITES MUNDO 4: DECORACIONES DE EXPEDICIÓN ALPINAS (PIXEL ART)
// ============================================================================
// Carpa geodésica, banderines tibetanos, pináculos de hielo, arco glacial y estufa.

function drawSherpaTent(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 48;
  const h = 26;

  // Falda de nieve que sella la carpa contra el viento
  ctx.fillStyle = '#caf0f8';
  ctx.fillRect(px - 4, py - 4, w + 8, 5);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 3, py - 5, w + 6, 2);

  // Cúpula geodésica de expedición (amarillo y naranja de alta visibilidad)
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, Math.floor(w / 2), h, 0, Math.PI, 0);
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - 2, Math.floor(w / 2) - 2, h - 2, 0, Math.PI, 0);
  ctx.fill();

  // Varillas de aluminio geodésico curvas
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(px + 14, py - 2, 18, Math.PI, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(px + w - 14, py - 2, 18, Math.PI, 0);
  ctx.stroke();

  // Entrada con cremallera y resplandor interior cálido
  ctx.fillStyle = '#78350f';
  ctx.fillRect(px + Math.floor(w / 2) - 5, py - 18, 10, 18);
  ctx.fillStyle = '#ffd166';
  ctx.fillRect(px + Math.floor(w / 2) - 3, py - 16, 6, 14);

  // Nieve acumulada en la parte superior
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(px + Math.floor(w / 2), py - h + 1, 10, 3, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawPrayerFlags(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const span = 64;

  // Postes de madera en los extremos
  ctx.fillStyle = '#1c0f08';
  ctx.fillRect(px - 2, py - 32, 4, 32);
  ctx.fillRect(px + span - 2, py - 32, 4, 32);
  ctx.fillStyle = '#451a03';
  ctx.fillRect(px - 1, py - 31, 2, 31);
  ctx.fillRect(px + span - 1, py - 31, 2, 31);

  // Cuerda combada
  ctx.strokeStyle = '#d7ccc8';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(px, py - 28);
  ctx.quadraticCurveTo(px + Math.floor(span / 2), py - 18, px + span, py - 28);
  ctx.stroke();

  // 5 Banderines tibetanos
  const colors = ['#2563eb', '#ffffff', '#dc2626', '#16a34a', '#f59e0b'];
  for (let i = 0; i < 5; i++) {
    const t = (i + 0.5) / 5;
    const fx = Math.round(px + t * span);
    const fy = Math.round((py - 28) * (1 - t) * (1 - t) + 2 * (py - 18) * (1 - t) * t + (py - 28) * t * t);
    const flutter = Math.sin(frame * 0.2 + i * 1.5) * 2;

    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(fx - 4, fy);
    ctx.lineTo(fx + 4, fy);
    ctx.lineTo(fx + 2 + flutter, fy + 8);
    ctx.lineTo(fx - 4 + flutter, fy + 8);
    ctx.closePath();
    ctx.fill();
  }
}

function drawIceSpire(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const h = 42;
  const w = 18;

  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.moveTo(px - Math.floor(w / 2), py);
  ctx.lineTo(px, py - h);
  ctx.lineTo(px + Math.floor(w / 2), py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#00b4d8';
  ctx.beginPath();
  ctx.moveTo(px - Math.floor(w / 3), py);
  ctx.lineTo(px, py - h + 2);
  ctx.lineTo(px + Math.floor(w / 2), py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#90e0ef';
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px, py - h + 4);
  ctx.lineTo(px + Math.floor(w / 2) - 2, py);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - h + 2, 2, h - 8);
}

function drawIceArch(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);
  const w = 84;
  const h = 68;

  // Arco monumental de hielo glacial translúcido
  ctx.fillStyle = '#0077b6';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2), Math.PI, 0);
  ctx.lineTo(px + w - 14, py);
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2) - 14, 0, Math.PI, true);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#00b4d8';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2) - 2, Math.PI, 0);
  ctx.lineTo(px + w - 12, py);
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2) - 12, 0, Math.PI, true);
  ctx.closePath();
  ctx.fill();

  // Escarcha y nieve en la parte superior
  ctx.fillStyle = '#caf0f8';
  ctx.beginPath();
  ctx.arc(px + Math.floor(w / 2), py, Math.floor(w / 2) + 2, Math.PI * 0.75, Math.PI * 0.25, true);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px + Math.floor(w / 2) - 18, py - h + 12, 36, 4);

  // Carámbanos colgantes del vano interior
  ctx.fillStyle = '#caf0f8';
  for (let ix = px + 22; ix < px + w - 22; ix += 10) {
    const iLen = 4 + ((ix * 7) % 6);
    ctx.fillRect(ix, py - Math.floor(h * 0.55), 2, iLen);
  }
}

function drawExpeditionStove(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Botella de gas de alta montaña (naranja/gris)
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(px - 5, py - 8, 10, 8);
  ctx.fillStyle = '#f97316';
  ctx.fillRect(px - 4, py - 7, 8, 6);

  // Quemador y llama azul/naranja viva
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px - 3, py - 11, 6, 3);
  const flicker = Math.sin(frame * 0.4) * 1.5;
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(px - 2, py - 14 + flicker, 4, 3);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 1, py - 13 + flicker, 2, 2);

  // Tetera de expedición
  ctx.fillStyle = '#334155';
  ctx.fillRect(px - 6, py - 22, 12, 8);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px - 5, py - 21, 10, 6);
  // Asa y pico
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(px - 8, py - 20, 2, 4);
  ctx.fillRect(px - 4, py - 24, 8, 2);

  // Volutas de vapor caliente
  for (let s = 0; s < 2; s++) {
    const sOff = ((frame * 0.35 + s * 10) % 20);
    const sx = px - 8 + Math.sin(frame * 0.08 + s) * 3 - sOff * 0.2;
    const sy = py - 24 - sOff;
    ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, 0.4 - sOff * 0.02) + ')';
    ctx.fillRect(Math.round(sx), Math.round(sy), 2, 2);
  }
}

function drawClimbingGearRack(ctx, x, y, frame = 0) {
  const px = Math.round(x);
  const py = Math.round(y);

  // Piolets / picos de hielo cruzados en la nieve
  ctx.fillStyle = '#64748b';
  ctx.fillRect(px - 8, py - 16, 2, 16);
  ctx.fillRect(px + 6, py - 16, 2, 16);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(px - 10, py - 18, 6, 2);
  ctx.fillRect(px + 4, py - 18, 6, 2);

  // Cuerda de escalada roja/amarilla enrollada
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(px - 1, py - 6, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  ctx.arc(px - 1, py - 6, 3, 0, Math.PI * 2);
  ctx.fill();

  // Nieve en la base
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(px - 12, py - 2, 24, 2);
}

function drawSnowDecoration(ctx, d, frame) {
  const px = Math.round(d.x);
  const py = Math.round(d.y);

  if (d.subType === 'alpine_cabin') drawAlpineCabin(ctx, px, py, frame);
  else if (d.subType === 'alpine_pine') drawAlpinePine(ctx, px, py, d.scale || 1, frame);
  else if (d.subType === 'alpine_sign') drawAlpineSign(ctx, px, py, frame);
  else if (d.subType === 'firewood_pile') drawFirewoodPile(ctx, px, py, frame);
  else if (d.subType === 'snow_lantern') drawSnowLantern(ctx, px, py, frame);
  else if (d.subType === 'sherpa_tent') drawSherpaTent(ctx, px, py, frame);
  else if (d.subType === 'prayer_flags') drawPrayerFlags(ctx, px, py, frame);
  else if (d.subType === 'ice_spire') drawIceSpire(ctx, px, py, frame);
  else if (d.subType === 'ice_arch') drawIceArch(ctx, px, py, frame);
  else if (d.subType === 'expedition_stove') drawExpeditionStove(ctx, px, py, frame);
  else if (d.subType === 'climbing_gear_rack') drawClimbingGearRack(ctx, px, py, frame);
  else if (d.subType === 'frozen_ladder' && typeof drawFrozenLadder === 'function') drawFrozenLadder(ctx, px, py, d.h || 48, frame);
  else if (d.subType === 'ice_crystal_cluster' && typeof drawIceCrystalCluster === 'function') drawIceCrystalCluster(ctx, px, py, frame);
  else if (d.subType === 'hanging_rope' && typeof drawHangingRope === 'function') drawHangingRope(ctx, px, py, d.h || 40, frame);
  else if (d.subType === 'alpine_tavern' && typeof drawAlpineTavernFacade === 'function') drawAlpineTavernFacade(ctx, px, py, frame);
  else if (d.subType === 'tavern_fireplace' && typeof drawTavernFireplace === 'function') drawTavernFireplace(ctx, px, py, frame);
  else if (d.subType === 'tavern_counter' && typeof drawTavernCounter === 'function') drawTavernCounter(ctx, px, py, frame);
  else if (d.subType === 'tavern_table' && typeof drawTavernTable === 'function') drawTavernTable(ctx, px, py, frame);
  else if (d.subType === 'village_street_sign' && typeof drawVillageStreetSign === 'function') drawVillageStreetSign(ctx, px, py, frame);
  else if (d.subType === 'hat_shop_facade' && typeof drawHatShopFacade === 'function') drawHatShopFacade(ctx, px, py, frame);
  else if (d.subType === 'shop_display_rack' && typeof drawShopDisplayRack === 'function') drawShopDisplayRack(ctx, px, py, frame);
  else if (d.subType === 'mannequin_with_hat' && typeof drawMannequinWithHat === 'function') drawMannequinWithHat(ctx, px, py, frame);
  else if (d.subType === 'depressed_cabin_facade' && typeof drawDepressedCabinFacade === 'function') drawDepressedCabinFacade(ctx, px, py, frame);
  else if (d.subType === 'depressed_room_furniture' && typeof drawDepressedRoomFurniture === 'function') drawDepressedRoomFurniture(ctx, px, py, frame);
  else if (d.subType === 'ice_pick_stand' && typeof drawIcePickStand === 'function') drawIcePickStand(ctx, px, py, frame);
  else if (d.subType === 'arcade_facade' && typeof drawArcadeFacade === 'function') drawArcadeFacade(ctx, px, py, frame);
  else if (d.subType === 'arcade_cabinet' && typeof drawArcadeCabinet === 'function') drawArcadeCabinet(ctx, px, py, frame);
  else if (d.subType === 'neon_sign_cluster' && typeof drawNeonSignCluster === 'function') drawNeonSignCluster(ctx, px, py, frame);
  else if (d.subType === 'bakery_facade' && typeof drawBakeryFacade === 'function') drawBakeryFacade(ctx, px, py, frame);
  else if (d.subType === 'bakery_oven' && typeof drawBakeryOven === 'function') drawBakeryOven(ctx, px, py, frame);
  else if (d.subType === 'bakery_counter' && typeof drawBakeryDisplayCounter === 'function') drawBakeryDisplayCounter(ctx, px, py, frame);
  else if (d.subType === 'forge_facade' && typeof drawForgeFacade === 'function') drawForgeFacade(ctx, px, py, frame);
  else if (d.subType === 'forge_anvil' && typeof drawIceForgeAnvilAndFurnace === 'function') drawIceForgeAnvilAndFurnace(ctx, px, py, frame);
  else if (d.subType === 'forge_tool_rack' && typeof drawForgeToolRack === 'function') drawForgeToolRack(ctx, px, py, frame);
  else if (d.subType === 'townhall_facade' && typeof drawTownHallFacade === 'function') drawTownHallFacade(ctx, px, py, frame);
  else if (d.subType === 'townhall_desk' && typeof drawTownHallMayorDesk === 'function') drawTownHallMayorDesk(ctx, px, py, frame);
  else if (d.subType === 'glacial_exit_gate' && typeof drawGlacialGateArch === 'function') drawGlacialGateArch(ctx, px, py, frame);
  else if (d.subType === 'ice_fishing_hut' && typeof drawIceFishingHut === 'function') drawIceFishingHut(ctx, px, py, frame);
  else if (d.subType === 'ice_sculpture' && typeof drawIceSculpture === 'function') drawIceSculpture(ctx, px, py, frame);
  else if (d.subType === 'frozen_buoy' && typeof drawFrozenLakeBuoy === 'function') drawFrozenLakeBuoy(ctx, px, py, frame);
  else if (d.subType === 'glacial_altar' && typeof drawGlacialAltar === 'function') drawGlacialAltar(ctx, px, py, frame);
  else if (d.subType === 'crevasse_marker' && typeof drawIceCrevasseMarker === 'function') drawIceCrevasseMarker(ctx, px, py, frame);
  else if (d.subType === 'summit_signpost' && typeof drawSummitSignpost === 'function') drawSummitSignpost(ctx, px, py, frame);
  else if (d.subType === 'ladder_bridge' && typeof drawAluminumLadderBridge === 'function') drawAluminumLadderBridge(ctx, px, py, d.w || 64, frame);
  else if (d.subType === 'oxygen_depot' && typeof drawOxygenDepot === 'function') drawOxygenDepot(ctx, px, py, frame);
  else if (d.subType === 'fixed_ropes' && typeof drawFixedRopesAnchor === 'function') drawFixedRopesAnchor(ctx, px, py, d.h || 60, frame);
  else if (d.subType === 'weather_station' && typeof drawWeatherStationMast === 'function') drawWeatherStationMast(ctx, px, py, frame);
  else if (d.subType === 'prayer_cairn' && typeof drawPrayerCairn === 'function') drawPrayerCairn(ctx, px, py, frame);
  else if (d.subType === 'summit_monument' && typeof drawSummitVictoryMonument === 'function') drawSummitVictoryMonument(ctx, px, py, frame);
  else if (d.subType === 'hillary_step_ropes' && typeof drawHillaryStepRopes === 'function') drawHillaryStepRopes(ctx, px, py, d.h || 64, frame);
  else if (d.subType === 'assault_tent' && typeof drawAssaultTent === 'function') drawAssaultTent(ctx, px, py, frame);
  else if (d.subType === 'summit_nest' && typeof drawSummitNest === 'function') drawSummitNest(ctx, px, py, frame);
  else if (d.subType === 'yeti_tracks' && typeof drawYetiFootprint === 'function') drawYetiFootprint(ctx, px, py, frame);
  else if (d.subType === 'ice_cavern_arch' && typeof drawIceCavernArch === 'function') drawIceCavernArch(ctx, px, py, frame);
  else if (d.subType === 'runic_crystal_spire' && typeof drawRunicCrystalSpire === 'function') drawRunicCrystalSpire(ctx, px, py, frame);
  else if (d.subType === 'yeti_warning_totem' && typeof drawYetiWarningTotem === 'function') drawYetiWarningTotem(ctx, px, py, frame);
  else if (d.subType === 'frost_bridge' && typeof drawHangingFrostBridge === 'function') drawHangingFrostBridge(ctx, px, py, d.w || 120, frame);
  else if (d.subType === 'polar_vortex' && typeof drawPolarWindVortex === 'function') drawPolarWindVortex(ctx, px, py, frame);
  else if (d.subType === 'blue_fire_brazier' && typeof drawBlueBrazier === 'function') drawBlueBrazier(ctx, px, py, frame);
  else if (d.subType === 'sanctuary_portal_arch' && typeof drawSanctuaryPortalArch === 'function') drawSanctuaryPortalArch(ctx, px, py, frame);
  else if (d.subType === 'great_snow_yeti' && typeof drawGreatSnowYeti === 'function') drawGreatSnowYeti(ctx, px, py, frame);
  else if (d.subType === 'yeti_crystal_throne' && typeof drawYetiCrystalThrone === 'function') drawYetiCrystalThrone(ctx, px, py, frame);
  else if (d.subType === 'crystal_lotus' && typeof drawCrystalLotusFlower === 'function') drawCrystalLotusFlower(ctx, px, py, frame);
  else if (d.subType === 'shambhala_prayer_bell' && typeof drawShambhalaPrayerBell === 'function') drawShambhalaPrayerBell(ctx, px, py, frame, d);
  else if (d.subType === 'hot_spring' && typeof drawHotSpringPool === 'function') drawHotSpringPool(ctx, px, py, frame);
  else if (d.subType === 'golden_pagoda_tower' && typeof drawGoldenPagodaTower === 'function') drawGoldenPagodaTower(ctx, px, py, frame);
  else if (d.subType === 'nirvana_lotus_altar' && typeof drawNirvanaLotusAltar === 'function') drawNirvanaLotusAltar(ctx, px, py, frame);
  else if (d.subType === 'sanctuary_portal_gate' && typeof drawSanctuaryPortalGate === 'function') drawSanctuaryPortalGate(ctx, px, py, frame);
  else if (d.subType === 'kailash_chorten' && typeof drawKailashChorten === 'function') drawKailashChorten(ctx, px, py, frame);
  else if (d.subType === 'astral_star_crystal' && typeof drawAstralStarCrystal === 'function') drawAstralStarCrystal(ctx, px, py, frame);
  else if (d.subType === 'rainbow_bridge' && typeof drawRainbowBridge === 'function') drawRainbowBridge(ctx, px, py, d.w || 180, frame);
  else if (d.subType === 'agartha_crystal_palace' && typeof drawAgarthaCrystalPalace === 'function') drawAgarthaCrystalPalace(ctx, px, py, frame);
  else if (d.subType === 'celestial_star_throne' && typeof drawCelestialStarThrone === 'function') drawCelestialStarThrone(ctx, px, py, frame);
  else if (d.subType === 'cosmic_burrow_portal' && typeof drawCosmicBurrowPortal === 'function') drawCosmicBurrowPortal(ctx, px, py, frame);
  else if (d.subType === 'boreal_pillar' && typeof drawBorealPillar === 'function') drawBorealPillar(ctx, px, py, frame);
  else if (d.subType === 'constellation_arch' && typeof drawConstellationArch === 'function') drawConstellationArch(ctx, px, py, frame);
  else if (d.subType === 'comet_altar' && typeof drawCometAltar === 'function') drawCometAltar(ctx, px, py, frame);
  else if (d.subType === 'nebula_garden_flora' && typeof drawNebulaGardenFlora === 'function') drawNebulaGardenFlora(ctx, px, py, frame);
  else if (d.subType === 'shooting_star_arch' && typeof drawShootingStarArch === 'function') drawShootingStarArch(ctx, px, py, frame);
  else if (d.subType === 'polaris_throne' && typeof drawPolarisThrone === 'function') drawPolarisThrone(ctx, px, py, frame);
  else if (d.subType === 'cosmic_nebula_sanctum' && typeof drawCosmicNebulaSanctum === 'function') drawCosmicNebulaSanctum(ctx, px, py, frame);
  else if (d.subType === 'sanctum_burrow_gate' && typeof drawSanctumBurrowGate === 'function') drawSanctumBurrowGate(ctx, px, py, frame);
}

if (typeof SpriteManager !== 'undefined') {
  SpriteManager.prototype.drawSnowDecoration = drawSnowDecoration;
  SpriteManager.prototype.drawSherpaTent = drawSherpaTent;
  SpriteManager.prototype.drawPrayerFlags = drawPrayerFlags;
  SpriteManager.prototype.drawIceSpire = drawIceSpire;
  SpriteManager.prototype.drawIceArch = drawIceArch;
  SpriteManager.prototype.drawExpeditionStove = drawExpeditionStove;
  SpriteManager.prototype.drawClimbingGearRack = drawClimbingGearRack;
}

if (typeof module !== 'undefined') {
  module.exports = {
    drawSnowDecoration,
    drawSherpaTent,
    drawPrayerFlags,
    drawIceSpire,
    drawIceArch,
    drawExpeditionStove,
    drawClimbingGearRack
  };
}


// --- MÓDULO: src/sprites/index.js ---
// ============================================================================
// INSTANCIA GLOBAL DE SPRITES
// ============================================================================
window.sprites = new SpriteManager();
