namespace pxsim.tone {

    export function startTransport() {
        Tone.Transport.start(0);
    }

    export function stopTransport() {
        Tone.Transport.stop();
    }

    export function killFX(){
        for (var effect in board().fx){
            board().fx[effect].dispose();
        }
        board().fx = {};            
    }

    export function killPhrases(){
        for (var phrase in board().phrases)
            board().phrases[phrase].discard();
        board().phrases = {};
    }

    export function killInstruments(){
        for (let i = 0; i < board().instruments.length; i++)
            board().instruments[i].dispose();
        board().instruments = [];
    }

    export function killOscillators(){
        for (var osc in board().oscillators){
            board().oscillators[osc].dispose();
        }
        board().oscillators = {};
    }

    /* Not currently used. Event callback never fires, but no 404 errors... */
    export function loadDrumSamplesAsync(): Promise<Tone.MultiPlayer> {
        return new Promise<Tone.MultiPlayer>((resolve, reject) => {
            let drumMachine = new Tone.MultiPlayer({
                    "kick" : "/audio/percussion/kick.ogg",
                    "snare": "/audio/percussion/snare.ogg",
                    "hihat": "/audio/percussion/hh.ogg",
                    "click": "/audio/percussion/click.mp3",
                    "splat": "/audio/percussion/splat.mp3"
                }, () => {
                resolve(drumMachine);
            }).toMaster();            
        });            
    }   

    export function createMelodySequence(time: Tone.Time, beats: number, pattern: pxsim.Map<string[]>, numTracks: number): pxsim.music.Phrase {
        let division = [] as number[];
        for (let i = 0; i < beats; i++) division.push(i);

        let instrument = tone.createPolySynth(numTracks);
        let seq = new Tone.Sequence(function(time, note){
            let notes = pattern[note];
            instrument.triggerAttackRelease(notes, time);
        }, division, "8n");
        return new pxsim.music.Phrase(seq, instrument);        
    }

    export function createDrumSequence(time: Tone.Time, beats: number, pattern: pxsim.Map<string[]>): pxsim.music.Phrase {
        let division = [] as number[];
        for (let i = 0; i < beats; i++) division.push(i);

        let seq = new Tone.Sequence(function(time, note){
            let beat = pattern[note];
            for (let i = 0; i < beat.length; i++){
                if (beat[i]) board().drumMachine.start(beat[i]);
            }
        }, division, "8n");
        return new pxsim.music.Phrase(seq, board().drumMachine);
    }

    export function createMonoSynth(): Tone.MonoSynth {
        let mono = new Tone.MonoSynth({oscillator: {
                                            type: "sine"
                                        },
                                        envelope: {
                                            attack:  0.005,
                                            decay:   0.1,
                                            sustain: 0.3,
                                            release: 0.25
                                        }}).toMaster();  
        board().instruments.push(mono);
        return mono;
    }

    export function createPolySynth(voices: number): Tone.PolySynth {
        let poly = new Tone.PolySynth(voices, Tone.MonoSynth);     
        poly.set("volume", -20);
        poly.set({
            "envelope": {
                "attack":  0.1,
                "sustain": 0,
                "release": 0.01
            }}).toMaster();
        board().instruments.push(poly);
        return poly;   
    }

    export function createKickDrum(): Tone.MembraneSynth {
        let kick = new Tone.MembraneSynth({"envelope": {
                                              "sustain": 0,
                                              "attack":  0.02,
                                              "decay":   0.8},
                                           "octaves": 10
                                         }).toMaster();
        board().instruments.push(kick);
        return kick;                                    
    }     

    export function createOsc(wave: Wave, freq: number) : Tone.Oscillator {
        switch(wave){
            case Wave.Sine: return new Tone.Oscillator(freq, "sine").toMaster();
            case Wave.Square: return new Tone.Oscillator(freq, "square").toMaster();
            case Wave.Triangle: return new Tone.Oscillator(freq, "triangle").toMaster();
            default: return new Tone.Oscillator(freq, "sawtooth").toMaster();
        }
    }

    export function bpm(val: Tone.BPM){
        Tone.Transport.bpm.value = val;        
    }

    export function createEffect(fx: Effect): Tone.Effect {
        var effect : Tone.Effect;
        var type : string;
        switch (fx) {
            case Effect.Distortion:
                effect = new Tone.Distortion(0.8).toMaster();
                type = "distortion";
                break;
            case Effect.Delay:
                effect = new Tone.FeedbackDelay("8n").toMaster();
                type = "delay";
                break;
            case Effect.Chorus:
                effect = new Tone.Chorus(4, 2.5, 0.5).toMaster();
                type = "chorus";
                break;
            case Effect.Phaser:
                effect = new Tone.Phaser({"frequency": 15, 
                                            "octaves": 5, 
                                            "baseFrequency": 1000
                                        }).toMaster();
                type = "phaser";
                break;
            default:
                effect = new Tone.Freeverb().toMaster();
                type = "reverb";
                break;
        }
        board().fx[type] = effect;
        return effect;        
    }

}