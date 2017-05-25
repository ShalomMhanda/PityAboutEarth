class PlayWavesState extends PlayState {
    static get waves() {
        const zigzag = 'createZigZagBarrage';
        const spiral = 'createSpiralBarrage';
        const column = 'createColumnBarrage';
        return Object.freeze([
            {
                number: 1,
                barrageCount: 2,
                difficulty: 0.5,
                barrageStyles: [spiral]
            },
            {
                number: 2,
                barrageCount: 2,
                difficulty: 1.0,
                barrageStyles: [zigzag]
            },
            {
                number: 3,
                barrageCount: 2,
                difficulty: 1.5,
                barrageStyles: [column]
            },
        ]);
    }
    beginGame() {
        this.currentWave = 1;
        this.newGamePlus = 0;

        this.beginWave();
    }
    beginWave() {
        if (this.currentWave > PlayWavesState.waves.length) {
            this.currentWave = 1;
            this.newGamePlus += 1;
        }
        const wave = PlayWavesState.waves[this.currentWave-1];

        // start the first wave, as a test
        console.log(`[play-waves] WAVE ${this.currentWave}! (NG ${this.newGamePlus})`);

        // set difficulty for this wave
        const newGameDifficulty = this.newGamePlus / 4; // how much extra difficulty the newGamePlus level should add
        this.stats.difficulty = wave.difficulty + newGameDifficulty;

        // set active barrages for this wave
        this.barrageFunctions = _.map(wave.barrageStyles, style => this[style]);

        // schedule first barrage (fireBarrage itself schedules the rest)
        this.game.time.events.add(2000, () => this.fireBarrage(wave.barrageCount, this.nextWave.bind(this)), this);

    }
    nextWave() {
        console.log(`[play-waves] wave ${this.currentWave} complete.  starting next wave!`);
        this.currentWave += 1;
        this.beginWave();
    }
}
