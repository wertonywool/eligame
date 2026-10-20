// ============================================================================
// MUNDO 1: "EL JARDÍN DE LOS LIRIOS"
// ============================================================================
// ARCHIVO GENERADO AUTOMATICAMENTE DESDE src/mundos/mundo1/
// Para editar el nivel, modifica los archivos pequeños en su fase/parte correspondiente:
// - Fase 1: src/mundos/mundo1/fase1/ (partes 1, 2, 3, 4)
// - Fase 2: src/mundos/mundo1/fase2/ (partes 1, 2, 3)
// - Fase 3: src/mundos/mundo1/fase3/ (partes 1, 2, 3)

window.LEVELS = [
{
  "id": 1,
  "name": "Mundo 1: Jardín de los Lirios",
  "subtitle": "3 Zonas Botánicas: Aldea del Trébol • Estanque de Loto • Rosas Reales",
  "theme": "garden",
  "worldWidth": 5750,
  "worldHeight": 280,
  "playerSpawn": {
    "x": 52,
    "y": 196
  },
  "platforms": [
    {
      "x": 0,
      "y": 230,
      "w": 460,
      "h": 55,
      "type": "grass",
      "zone": 1
    },
    {
      "x": 140,
      "y": 180,
      "w": 80,
      "h": 14,
      "type": "floating",
      "subType": "wood_pergola",
      "zone": 1,
      "oneWay": true
    },
    {
      "x": 460,
      "y": 230,
      "w": 220,
      "h": 55,
      "type": "grass",
      "zone": 1
    },
    {
      "x": 680,
      "y": 220,
      "w": 240,
      "h": 65,
      "type": "grass",
      "zone": 1
    },
    {
      "x": 530,
      "y": 175,
      "w": 100,
      "h": 14,
      "type": "floating",
      "subType": "wood_pergola",
      "zone": 1,
      "oneWay": true
    },
    {
      "x": 740,
      "y": 165,
      "w": 90,
      "h": 14,
      "type": "floating",
      "subType": "wood_pergola",
      "zone": 1,
      "oneWay": true
    },
    {
      "x": 920,
      "y": 220,
      "w": 260,
      "h": 65,
      "type": "grass",
      "zone": 1
    },
    {
      "x": 1180,
      "y": 225,
      "w": 310,
      "h": 60,
      "type": "grass",
      "zone": 1
    },
    {
      "x": 1040,
      "y": 160,
      "w": 85,
      "h": 14,
      "type": "floating",
      "subType": "wood_pergola",
      "zone": 1,
      "oneWay": true
    },
    {
      "x": 1080,
      "y": 100,
      "w": 110,
      "h": 14,
      "type": "floating",
      "subType": "wood_pergola",
      "zone": 1,
      "oneWay": true
    },
    {
      "x": 1220,
      "y": 85,
      "w": 85,
      "h": 14,
      "type": "floating",
      "subType": "wood_pergola",
      "zone": 1,
      "oneWay": true
    },
    {
      "x": 1490,
      "y": 255,
      "w": 310,
      "h": 30,
      "type": "grass",
      "subType": "lotus_pond",
      "zone": 1
    },
    {
      "x": 1515,
      "y": 195,
      "w": 70,
      "h": 14,
      "type": "floating",
      "subType": "wood_pergola",
      "zone": 1,
      "oneWay": true
    },
    {
      "x": 1580,
      "y": 168,
      "w": 80,
      "h": 14,
      "type": "floating",
      "subType": "wood_pergola",
      "zone": 1,
      "oneWay": true
    },
    {
      "x": 1675,
      "y": 200,
      "w": 50,
      "h": 65,
      "type": "grass",
      "zone": 1
    },
    {
      "x": 1735,
      "y": 185,
      "w": 60,
      "h": 16,
      "type": "floating",
      "subType": "lotus_pad",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 1800,
      "y": 215,
      "w": 140,
      "h": 70,
      "type": "grass",
      "zone": 2
    },
    {
      "x": 1940,
      "y": 255,
      "w": 580,
      "h": 30,
      "type": "grass",
      "subType": "lotus_pond",
      "zone": 2
    },
    {
      "x": 1965,
      "y": 195,
      "w": 80,
      "h": 16,
      "type": "floating",
      "subType": "lotus_pad",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 2080,
      "y": 175,
      "w": 80,
      "h": 16,
      "type": "floating",
      "subType": "lotus_pad",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 2195,
      "y": 215,
      "w": 75,
      "h": 70,
      "type": "grass",
      "zone": 2
    },
    {
      "x": 2305,
      "y": 182,
      "w": 80,
      "h": 16,
      "type": "floating",
      "subType": "lotus_pad",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 2420,
      "y": 165,
      "w": 85,
      "h": 16,
      "type": "floating",
      "subType": "lotus_pad",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 2535,
      "y": 210,
      "w": 100,
      "h": 75,
      "type": "grass",
      "zone": 2
    },
    {
      "x": 2635,
      "y": 235,
      "w": 580,
      "h": 50,
      "type": "grass",
      "zone": 2
    },
    {
      "x": 2660,
      "y": 182,
      "w": 120,
      "h": 14,
      "type": "floating",
      "subType": "greenhouse",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 2810,
      "y": 158,
      "w": 75,
      "h": 14,
      "type": "floating",
      "subType": "greenhouse",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 2915,
      "y": 135,
      "w": 135,
      "h": 14,
      "type": "floating",
      "subType": "greenhouse",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 2975,
      "y": 78,
      "w": 90,
      "h": 14,
      "type": "floating",
      "subType": "greenhouse",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 3080,
      "y": 162,
      "w": 105,
      "h": 14,
      "type": "floating",
      "subType": "greenhouse",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 3215,
      "y": 195,
      "w": 95,
      "h": 90,
      "type": "grass",
      "zone": 2
    },
    {
      "x": 3310,
      "y": 255,
      "w": 265,
      "h": 30,
      "type": "grass",
      "subType": "lotus_pond",
      "zone": 2
    },
    {
      "x": 3335,
      "y": 195,
      "w": 75,
      "h": 16,
      "type": "floating",
      "subType": "lotus_pad",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 3400,
      "y": 138,
      "w": 85,
      "h": 14,
      "type": "floating",
      "subType": "greenhouse",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 3485,
      "y": 180,
      "w": 75,
      "h": 16,
      "type": "floating",
      "subType": "lotus_pad",
      "zone": 2,
      "oneWay": true
    },
    {
      "x": 3575,
      "y": 215,
      "w": 95,
      "h": 70,
      "type": "grass",
      "zone": 2
    },
    {
      "x": 3670,
      "y": 220,
      "w": 210,
      "h": 65,
      "type": "grass",
      "subType": "royal_marble",
      "zone": 3
    },
    {
      "x": 3880,
      "y": 220,
      "w": 520,
      "h": 65,
      "type": "grass",
      "subType": "royal_marble",
      "zone": 3
    },
    {
      "x": 4400,
      "y": 220,
      "w": 550,
      "h": 65,
      "type": "grass",
      "subType": "royal_marble",
      "zone": 3
    },
    {
      "x": 4950,
      "y": 220,
      "w": 480,
      "h": 65,
      "type": "grass",
      "subType": "royal_marble",
      "zone": 3
    },
    {
      "x": 4170,
      "y": 156,
      "w": 140,
      "h": 14,
      "type": "floating",
      "subType": "royal_gazebo",
      "zone": 3,
      "oneWay": true
    },
    {
      "x": 4345,
      "y": 180,
      "w": 50,
      "h": 14,
      "type": "floating",
      "subType": "royal_marble",
      "zone": 3,
      "oneWay": true
    },
    {
      "x": 4710,
      "y": 148,
      "w": 150,
      "h": 14,
      "type": "floating",
      "subType": "royal_gazebo",
      "zone": 3,
      "oneWay": true
    },
    {
      "x": 4625,
      "y": 178,
      "w": 50,
      "h": 14,
      "type": "floating",
      "subType": "royal_marble",
      "zone": 3,
      "oneWay": true
    },
    {
      "x": 5215,
      "y": 156,
      "w": 140,
      "h": 14,
      "type": "floating",
      "subType": "royal_gazebo",
      "zone": 3,
      "oneWay": true
    },
    {
      "x": 5135,
      "y": 180,
      "w": 50,
      "h": 14,
      "type": "floating",
      "subType": "royal_marble",
      "zone": 3,
      "oneWay": true
    },
    {
      "x": 5430,
      "y": 205,
      "w": 130,
      "h": 80,
      "type": "grass",
      "subType": "royal_marble",
      "zone": 3
    },
    {
      "x": 5560,
      "y": 190,
      "w": 190,
      "h": 95,
      "type": "grass",
      "subType": "royal_marble",
      "zone": 3
    }
  ],
  "decorations": [
    {
      "type": "torii_gate",
      "x": 25,
      "y": 230,
      "w": 64,
      "h": 72
    },
    {
      "type": "stone_lantern",
      "x": 110,
      "y": 230
    },
    {
      "type": "cherry_tree",
      "x": 220,
      "y": 230,
      "h": 62
    },
    {
      "type": "garden_cottage",
      "x": 330,
      "y": 230,
      "w": 72,
      "h": 48
    },
    {
      "type": "bamboo_fountain",
      "x": 500,
      "y": 230
    },
    {
      "type": "stone_lantern",
      "x": 620,
      "y": 230
    },
    {
      "type": "cherry_tree",
      "x": 710,
      "y": 220,
      "h": 60
    },
    {
      "type": "flower_bush",
      "x": 850,
      "y": 220,
      "color": "pink"
    },
    {
      "type": "stone_lantern",
      "x": 920,
      "y": 220
    },
    {
      "type": "cherry_tree",
      "x": 1060,
      "y": 100,
      "h": 74,
      "size": "grand"
    },
    {
      "type": "flower_arch",
      "x": 1120,
      "y": 100,
      "w": 62,
      "h": 60
    },
    {
      "type": "lumafly_swarm",
      "x": 1160,
      "y": 75,
      "color": "gold"
    },
    {
      "type": "stone_lantern",
      "x": 1210,
      "y": 85
    },
    {
      "type": "cherry_tree",
      "x": 1295,
      "y": 225,
      "h": 64
    },
    {
      "type": "torii_gate",
      "x": 1410,
      "y": 225,
      "w": 62,
      "h": 70
    },
    {
      "type": "lotus_water",
      "x": 1490,
      "y": 255,
      "w": 310
    },
    {
      "type": "cattails",
      "x": 1498,
      "y": 255
    },
    {
      "type": "giant_lotus",
      "x": 1640,
      "y": 255
    },
    {
      "type": "cattails",
      "x": 1785,
      "y": 255
    },
    {
      "type": "greenhouse_arch",
      "x": 1810,
      "y": 215,
      "w": 64,
      "h": 70
    },
    {
      "type": "lotus_water",
      "x": 1945,
      "y": 255,
      "w": 260
    },
    {
      "type": "lotus_water",
      "x": 2225,
      "y": 255,
      "w": 290
    },
    {
      "type": "cattails",
      "x": 1955,
      "y": 255
    },
    {
      "type": "giant_lotus",
      "x": 2045,
      "y": 195
    },
    {
      "type": "lumafly_swarm",
      "x": 2120,
      "y": 130,
      "color": "cyan"
    },
    {
      "type": "botanist_table",
      "x": 2200,
      "y": 215
    },
    {
      "type": "cattails",
      "x": 2210,
      "y": 215
    },
    {
      "type": "giant_lotus",
      "x": 2390,
      "y": 182
    },
    {
      "type": "botanist_table",
      "x": 2550,
      "y": 210
    },
    {
      "type": "greenhouse_dome",
      "x": 2680,
      "y": 182,
      "w": 90,
      "h": 62
    },
    {
      "type": "lumafly_swarm",
      "x": 2845,
      "y": 125,
      "color": "cyan"
    },
    {
      "type": "greenhouse_dome",
      "x": 2935,
      "y": 135,
      "w": 96,
      "h": 64
    },
    {
      "type": "botanist_table",
      "x": 2750,
      "y": 235
    },
    {
      "type": "botanist_table",
      "x": 3050,
      "y": 235
    },
    {
      "type": "lumafly_swarm",
      "x": 2950,
      "y": 200,
      "color": "cyan"
    },
    {
      "type": "greenhouse_arch",
      "x": 3230,
      "y": 195,
      "w": 62,
      "h": 68
    },
    {
      "type": "lotus_water",
      "x": 3310,
      "y": 255,
      "w": 265
    },
    {
      "type": "cattails",
      "x": 3320,
      "y": 255
    },
    {
      "type": "giant_lotus",
      "x": 3435,
      "y": 255
    },
    {
      "type": "lumafly_swarm",
      "x": 3440,
      "y": 120,
      "color": "cyan"
    },
    {
      "type": "cattails",
      "x": 3555,
      "y": 255
    },
    {
      "type": "greenhouse_arch",
      "x": 3585,
      "y": 215,
      "w": 62,
      "h": 68
    },
    {
      "type": "royal_palace_gate",
      "x": 3780,
      "y": 220
    },
    {
      "type": "palace_banner",
      "x": 3845,
      "y": 220,
      "color": "crimson"
    },
    {
      "type": "marble_balustrade",
      "x": 3900,
      "y": 220,
      "w": 50
    },
    {
      "type": "topiary_tree",
      "x": 3960,
      "y": 220
    },
    {
      "type": "palace_banner",
      "x": 4160,
      "y": 220,
      "color": "crimson"
    },
    {
      "type": "marble_balustrade",
      "x": 4200,
      "y": 220,
      "w": 80
    },
    {
      "type": "royal_fountain",
      "x": 4425,
      "y": 220
    },
    {
      "type": "topiary_tree",
      "x": 4575,
      "y": 220
    },
    {
      "type": "lily_statue",
      "x": 4780,
      "y": 220
    },
    {
      "type": "palace_banner",
      "x": 4970,
      "y": 220,
      "color": "gold"
    },
    {
      "type": "marble_balustrade",
      "x": 5040,
      "y": 220,
      "w": 50
    },
    {
      "type": "marble_balustrade",
      "x": 5240,
      "y": 220,
      "w": 80
    },
    {
      "type": "rose_arch",
      "x": 5440,
      "y": 205,
      "w": 64,
      "h": 72
    },
    {
      "type": "marble_balustrade",
      "x": 5510,
      "y": 205,
      "w": 40
    },
    {
      "type": "lily_sanctuary",
      "x": 5580,
      "y": 190
    },
    {
      "type": "lumafly_swarm",
      "x": 5640,
      "y": 135,
      "color": "gold"
    },
    {
      "type": "marble_balustrade",
      "x": 5705,
      "y": 190,
      "w": 40
    }
  ],
  "lanterns": [
    {
      "x": 70,
      "y": 230
    },
    {
      "x": 280,
      "y": 230
    },
    {
      "x": 580,
      "y": 230
    },
    {
      "x": 880,
      "y": 220
    },
    {
      "x": 1010,
      "y": 220
    },
    {
      "x": 1280,
      "y": 225
    },
    {
      "x": 1375,
      "y": 225
    },
    {
      "x": 1695,
      "y": 200
    },
    {
      "x": 1840,
      "y": 215
    },
    {
      "x": 2210,
      "y": 215
    },
    {
      "x": 2620,
      "y": 210
    },
    {
      "x": 2880,
      "y": 158
    },
    {
      "x": 3120,
      "y": 162
    },
    {
      "x": 3260,
      "y": 195
    },
    {
      "x": 3610,
      "y": 215
    },
    {
      "x": 3710,
      "y": 220
    },
    {
      "x": 3870,
      "y": 220
    },
    {
      "x": 4070,
      "y": 220
    },
    {
      "x": 4325,
      "y": 220
    },
    {
      "x": 4605,
      "y": 220
    },
    {
      "x": 4875,
      "y": 220
    },
    {
      "x": 5115,
      "y": 220
    },
    {
      "x": 5365,
      "y": 220
    },
    {
      "x": 5540,
      "y": 205
    },
    {
      "x": 5720,
      "y": 190
    }
  ],
  "lilies": [
    {
      "x": 100,
      "y": 230
    },
    {
      "x": 190,
      "y": 230
    },
    {
      "x": 390,
      "y": 230
    },
    {
      "x": 540,
      "y": 230
    },
    {
      "x": 760,
      "y": 220
    },
    {
      "x": 1070,
      "y": 225
    },
    {
      "x": 1330,
      "y": 225
    },
    {
      "x": 1405,
      "y": 225
    },
    {
      "x": 1712,
      "y": 198
    },
    {
      "x": 1860,
      "y": 215
    },
    {
      "x": 2225,
      "y": 215
    },
    {
      "x": 2700,
      "y": 182
    },
    {
      "x": 2955,
      "y": 135
    },
    {
      "x": 3245,
      "y": 195
    },
    {
      "x": 3600,
      "y": 215
    },
    {
      "x": 3730,
      "y": 220
    },
    {
      "x": 3920,
      "y": 220
    },
    {
      "x": 4210,
      "y": 220
    },
    {
      "x": 4530,
      "y": 220
    },
    {
      "x": 4790,
      "y": 220
    },
    {
      "x": 5010,
      "y": 220
    },
    {
      "x": 5250,
      "y": 220
    },
    {
      "x": 5460,
      "y": 205
    },
    {
      "x": 5670,
      "y": 190
    }
  ],
  "geysers": [
    {
      "x": 990,
      "y": 220,
      "w": 28,
      "boostHeight": 125,
      "force": -340,
      "isGarden": true
    },
    {
      "x": 2215,
      "y": 215,
      "w": 28,
      "boostHeight": 100,
      "force": -305,
      "isGarden": true
    },
    {
      "x": 2880,
      "y": 235,
      "w": 28,
      "boostHeight": 145,
      "force": -360,
      "isGarden": true
    },
    {
      "x": 4905,
      "y": 220,
      "w": 26,
      "boostHeight": 95,
      "force": -300,
      "isGarden": true
    }
  ],
  "spikes": [
    {
      "x": 4095,
      "y": 212,
      "w": 40
    },
    {
      "x": 4345,
      "y": 212,
      "w": 40
    },
    {
      "x": 4625,
      "y": 212,
      "w": 40
    },
    {
      "x": 4860,
      "y": 212,
      "w": 32
    },
    {
      "x": 5135,
      "y": 212,
      "w": 40
    },
    {
      "x": 5385,
      "y": 212,
      "w": 40
    }
  ],
  "checkpoints": [
    {
      "id": 1,
      "x": 1850,
      "y": 215,
      "name": "Fase 2: Estanque de Loto e Invernadero"
    },
    {
      "id": 2,
      "x": 3720,
      "y": 220,
      "name": "Fase 3: Laberinto de Rosas Reales"
    }
  ],
  "npcs": [
    {
      "x": 240,
      "y": 212,
      "name": "Abuela Camelia (Aldeana del Trébol)",
      "color": "#fde2e4",
      "hatColor": "#ff8fab",
      "gardenHat": true,
      "lines": [
        "¡Cielo santo, Elizabeth! Ese sujeto rubio con capa pasó volando sobre nuestros cerezos.",
        "Se llevó al pequeño Ratoncito #1 hasta el Santuario Real de las Rosas. ¡Sigue el sendero floral!"
      ]
    },
    {
      "x": 945,
      "y": 202,
      "name": "Boticario Dexter (Guardián de los Lirios)",
      "color": "#d8f3dc",
      "hatColor": "#52b788",
      "gardenHat": true,
      "lines": [
        "¡Qué hermoso brilla tu Lirio de Dexter! Usa la Flor de Brisa a mi derecha para subir a la Glorieta Secreta.",
        "Si saltas sobre el caparazón de las mariquitas del jardín, rebotarás y soltarán Lirios de Dexter."
      ]
    },
    {
      "x": 1850,
      "y": 197,
      "name": "Flora (Guardiana del Estanque de Loto)",
      "color": "#caf0f8",
      "hatColor": "#00b4d8",
      "gardenHat": true,
      "lines": [
        "¡Bienvenida a la Fase 2: el Estanque de Loto y el Gran Invernadero de Cristal!",
        "Salta sobre las hojas de loto gigantes y rebota en las abejas reales para subir a la cúpula de cristal."
      ]
    },
    {
      "x": 2580,
      "y": 192,
      "name": "Cornelio (Botánico Real)",
      "color": "#fefae0",
      "hatColor": "#bc6c25",
      "gardenHat": true,
      "lines": [
        "♪ Hmm-hm-hmm... ♪ ¡Qué ejemplares tan bellos crecen en este invernadero nocturno!",
        "Recuerda que puedes abrir el Mapa Estelar (★ ZONAS) para viajar entre las 3 fases del jardín."
      ]
    },
    {
      "x": 3750,
      "y": 202,
      "name": "Rosalía (Centinela del Jardín Real)",
      "color": "#ffe5ec",
      "hatColor": "#e63946",
      "gardenHat": true,
      "lines": [
        "¡Cuidado, Elizabeth! Homelander encerró al pequeño en un escudo de energía al fondo del santuario.",
        "Para desactivarlo debes activar los 7 Cristales Reales en el orden indicado en la barra superior.",
        "¡No están en línea recta! Deberás cruzar la corte, saltar las zarzas espinosas y usar los techos de las 3 Glorietas para cubrirte de su láser."
      ]
    }
  ],
  "colorPads": [
    {
      "id": 0,
      "colorKey": "red",
      "colorName": "ROJO",
      "hex": "#ff0055",
      "glowHex": "#ff758f",
      "rgb": "255,0,85",
      "x": 4020,
      "y": 220,
      "w": 32,
      "h": 10,
      "label": "ROJO"
    },
    {
      "id": 1,
      "colorKey": "blue",
      "colorName": "AZUL",
      "hex": "#0077b6",
      "glowHex": "#90e0ef",
      "rgb": "0,119,182",
      "x": 4235,
      "y": 156,
      "w": 32,
      "h": 10,
      "label": "AZUL"
    },
    {
      "id": 2,
      "colorKey": "green",
      "colorName": "VERDE",
      "hex": "#2ec4b6",
      "glowHex": "#cbf3f0",
      "rgb": "46,196,182",
      "x": 4505,
      "y": 220,
      "w": 32,
      "h": 10,
      "label": "VERDE"
    },
    {
      "id": 3,
      "colorKey": "yellow",
      "colorName": "AMARILLO",
      "hex": "#ffd166",
      "glowHex": "#fff3b0",
      "rgb": "255,209,102",
      "x": 4780,
      "y": 148,
      "w": 32,
      "h": 10,
      "label": "AMARILLO"
    },
    {
      "id": 4,
      "colorKey": "purple",
      "colorName": "PÚRPURA",
      "hex": "#9b5de5",
      "glowHex": "#e0aaff",
      "rgb": "155,93,229",
      "x": 5280,
      "y": 156,
      "w": 32,
      "h": 10,
      "label": "PÚRPURA"
    },
    {
      "id": 5,
      "colorKey": "orange",
      "colorName": "NARANJA",
      "hex": "#ff7b00",
      "glowHex": "#ffb703",
      "rgb": "255,123,0",
      "x": 5010,
      "y": 220,
      "w": 32,
      "h": 10,
      "label": "NARANJA"
    },
    {
      "id": 6,
      "colorKey": "white",
      "colorName": "BLANCO",
      "hex": "#ffffff",
      "glowHex": "#e2eafc",
      "rgb": "255,255,255",
      "x": 5460,
      "y": 205,
      "w": 32,
      "h": 10,
      "label": "BLANCO"
    }
  ],
  "magmaCrawlers": [
    {
      "x": 730,
      "y": 205,
      "minX": 690,
      "maxX": 840,
      "speed": 28,
      "variant": "ladybug"
    },
    {
      "x": 1230,
      "y": 210,
      "minX": 1195,
      "maxX": 1270,
      "speed": 24,
      "variant": "ladybug"
    },
    {
      "x": 1335,
      "y": 210,
      "minX": 1300,
      "maxX": 1365,
      "speed": 20,
      "variant": "ladybug"
    },
    {
      "x": 2700,
      "y": 167,
      "minX": 2665,
      "maxX": 2770,
      "speed": 38,
      "variant": "emerald_beetle"
    },
    {
      "x": 2890,
      "y": 220,
      "minX": 2750,
      "maxX": 3050,
      "speed": 30,
      "variant": "emerald_beetle"
    },
    {
      "x": 3120,
      "y": 147,
      "minX": 3085,
      "maxX": 3180,
      "speed": 40,
      "variant": "emerald_beetle"
    }
  ],
  "fireBats": [
    {
      "x": 2025,
      "y": 152,
      "minX": 1980,
      "maxX": 2070,
      "baseY": 152,
      "speed": 44,
      "variant": "bee"
    },
    {
      "x": 2360,
      "y": 145,
      "minX": 2315,
      "maxX": 2410,
      "baseY": 145,
      "speed": 46,
      "variant": "bee"
    },
    {
      "x": 2860,
      "y": 125,
      "minX": 2815,
      "maxX": 2905,
      "baseY": 125,
      "speed": 48,
      "variant": "bee"
    },
    {
      "x": 3440,
      "y": 155,
      "minX": 3390,
      "maxX": 3490,
      "baseY": 155,
      "speed": 42,
      "variant": "bee"
    },
    {
      "x": 4780,
      "y": 135,
      "minX": 4700,
      "maxX": 4860,
      "baseY": 135,
      "speed": 42,
      "variant": "moth"
    }
  ],
  "cheeses": [
    {
      "x": 175,
      "y": 155
    },
    {
      "x": 785,
      "y": 138
    },
    {
      "x": 1120,
      "y": 76
    },
    {
      "x": 1255,
      "y": 60
    },
    {
      "x": 1618,
      "y": 138
    },
    {
      "x": 2120,
      "y": 150
    },
    {
      "x": 2450,
      "y": 140
    },
    {
      "x": 2710,
      "y": 155
    },
    {
      "x": 3020,
      "y": 55
    },
    {
      "x": 3440,
      "y": 108
    },
    {
      "x": 4235,
      "y": 130
    },
    {
      "x": 4440,
      "y": 170
    },
    {
      "x": 4780,
      "y": 122
    },
    {
      "x": 5280,
      "y": 130
    },
    {
      "x": 5460,
      "y": 178
    }
  ],
  "colorSequence": [
    1,
    5,
    3,
    0,
    4,
    2,
    6
  ],
  "homelander": {
    "active": true,
    "minX": 3700,
    "maxX": 5660,
    "y": 44,
    "groundY": 220,
    "speed": 135,
    "aimDuration": 1.1,
    "fireDuration": 0.75,
    "cooldown": 1.4,
    "beamWidth": 26
  },
  "babyMouse": {
    "id": 1,
    "x": 5640,
    "y": 172,
    "name": "Ratoncito Júnior #1",
    "requiresPuzzle": true,
    "nextAbilityName": "LAVA RUN (Dash Ígneo para el Mundo 2)",
    "dialogues": [
      {
        "speaker": "Hijo #1",
        "text": "¡MAMÁ! ¡Desactivaste la secuencia de 7 colores y expulsaste a Homelander!"
      },
      {
        "speaker": "Mamá Eli",
        "text": "Nadie encierra a uno de mis pequeños. ¡Las glorietas de mármol me cubrieron de sus rayos!"
      },
      {
        "speaker": "Hijo #1",
        "text": "¡Abre el portal verde hacia casa! Allá te daré mi poder LAVA RUN para el Volcán."
      },
      {
        "speaker": "Mamá Eli",
        "text": "¡Vamos a la madriguera, cariño! Ya casi estamos todos juntos de nuevo."
      }
    ]
  }
}
];
