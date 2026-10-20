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
