namespace pxsim.music {

    /**
    * Play a tone.
    * @param marker marker
    * @param note pitch of the tone to play in Hertz (Hz)
    * @param duration number of beats to play tone for
    */
    //% blockId=music_play_tone block="%marker=marker_block| play tone %note| for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function playTone(marker: number, note: number, duration: string) { 
        let m = board().marker(marker);
        m['monoSynth'].triggerAttackRelease(note, duration); 
    }

    /**
    * Play a chord.
    * @param marker marker
    * @param notes pitches of the tones to play in Hertz (Hz)
    * @param duration number of beats to play tone for
    */
    //% blockId=music_play_chord block="%marker=marker_block| play chord %notes| for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function playChord(marker: number, notes: [number], duration: string) {
        let m = board().marker(marker);
        //m['polySynth'].triggerAttackRelease(notes, duration);
    }

    /**
    * Play a drum beat.
    * @param marker marker
    * @param drum which drum sound to use
    */
    //% blockId=music_play_drum_beat block="%marker=marker_block| play %drum" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% drum.fieldEditor="gridpicker"
    //% drum.fieldOptions.width="200" drum.fieldOptions.columns="1"
    //% drum.fieldOptions.tooltips="true"        
    export function drumBeat(marker: number, drum: Drum) {
        //board().drumkit.playDrumBeat(drum);
    }

    export function createMonoSynth() : Tone {
        return new Tone.MonoSynth({oscillator: {
                                            type: "sine"
                                        },
                                        envelope: {
                                            attack: 0.005,
                                            decay: 0.1,
                                            sustain: 0.3,
                                            release: 1
                                        }}).toMaster();        
    }

    export function createPolySynth() : Tone {
        return new Tone.PolySynth().toMaster();        
    }

    /**
    * Add an effect to an audio context.
    * @param marker marker
    * @param effect which drum sound to use
    */
    //% blockId=music_add_effect block="%marker=marker_block| add effect %effect" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"  
    export function addEffect(marker: Marker, effect: Effect) {
        let m = board().marker(marker);
        switch (effect) {
            case Effect.Distortion:
                var fx = new Tone.Distortion(0.8).toMaster();
                break;
            case Effect.Delay:
                var fx = new Tone.FeedbackDelay("8n").toMaster();
                break;
            case Effect.Chorus:
                var fx = new Tone.Chorus(4, 2.5, 0.5).toMaster();
                break;
            case Effect.Phaser:
                var fx = new Tone.Phaser({"frequency" : 15, 
                                            "octaves" : 5, 
                                            "baseFrequency" : 1000
                                        }).toMaster();
                break;
            case Effect.Reverb:
                var fx = new Tone.Freeverb().toMaster();
                break;
            default:
                var fx = new Tone.Distortion(0.8).toMaster();
                break;
        }
        m['monoSynth'].connect(fx);
        m['polySynth'].connect(fx);
    }

    /**
    * Add an effect to an audio context.
    * @param marker marker
    * @param pitch amount in semitones to shift the pitch by
    */
    //% blockId=music_bend block="%marker=marker_block| bend by %pitch| semitones" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function bend(marker: Marker, pitch: number) {
        let m = board().marker(marker);
        let shift = new Tone.PitchShift(pitch);
        m['monoSynth'].connect(shift);
        m['polySynth'].connect(shift);       
    }

    /*
    export function loadDrumSamplesAsync() : Promise<Tone.Sampler> {
        return new Promise<Tone.Sampler>((resolve, reject) => {
            let sampler = new Tone.Sampler("./audio/casio/A1.mp3", () => {
                resolve(sampler);
            }, null, e => reject(e));
        });  
    }
    */
    
    /**
     * Return the duration of a beat in milliseconds (the beat fraction).
     * @param fraction the fraction of the current whole note, eg: BeatFraction.Half
     */
    //% help=music/beat weight=49 blockGap=8
    //% blockId=device_beat block="%fraction|beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function beat(fraction?: BeatFraction): string {
        switch (fraction) {
            case BeatFraction.Half: return "2n";
            case BeatFraction.Quarter: return "4n";
            case BeatFraction.Eighth: return "8n";
            case BeatFraction.Sixteenth: return "16n";
            case BeatFraction.Double: return "32n";
            case BeatFraction.Breve: return "64n";
            default: return "8n";
        }
    }    

}