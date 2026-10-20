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