namespace pxsim.music {

    /**
    * Play a tone.
    * @param note pitch of the tone to play in Hertz (Hz)
    * @param duration number of beats to play tone for
    */
    //% blockId=music_play_tone block="play tone %note=device_note| for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function playTone(note: number, duration: string) { 
        board().monosynth.triggerAttackRelease(note, duration); 
    }

    /**
    * Rest.
    * @param duration number of beats to rest for
    */
    //% blockId=music_rest block="rest for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function rest(duration: string) {}

    /**
    * Play a chord.
    * @param notes pitches of the tones to play in Hertz (Hz)
    * @param duration number of beats to play tone for
    */
    //% blockId=music_play_chord block="play chord %notes| for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function playChord(notes: [number], duration: string) {
        //board().polysynth.triggerAttackRelease(notes, duration);
    }

    /**
    * Play a drum beat.
    * @param drum which drum sound to use
    */
    //% blockId=music_play_drum_beat block="play %drum" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% drum.fieldEditor="gridpicker"
    //% drum.fieldOptions.width="200" drum.fieldOptions.columns="1"
    //% drum.fieldOptions.tooltips="true"        
    export function drumBeat(drum: Drum) {
        switch (drum) {
            case Drum.Kick:
               board().kickdrum.triggerAttackRelease("C3", "8n");
               break;
            default:
               board().kickdrum.triggerAttackRelease("C3", "8n");
               break;            
        }
    }

    export function createMonoSynth() : Tone.MonoSynth {
        return new Tone.MonoSynth({oscillator: {
                                            type: "sine"
                                        },
                                        envelope: {
                                            attack: 0.005,
                                            decay: 0.1,
                                            sustain: 0.3,
                                            release: 1
                                        }});        
    }

    export function createPolySynth() : Tone.PolySynth {
        return new Tone.PolySynth();        
    }

    export function createKickDrum() : Tone.MembraneSynth {
        return new Tone.MembraneSynth({"envelope" : {
                                            "sustain" : 0,
                                            "attack" : 0.02,
                                            "decay" : 0.8
                                        },
                                        "octaves" : 10
                                    });
    }

    /**
    * Add an effect to an audio context.
    * @param effect which drum sound to use
    */
    //% blockId=music_add_effect block="add effect %effect" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"  
    export function addEffect(effect: Effect) {
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
        board().monosynth.connect(fx);
        //board().polysynth.connect(fx);
    }

    /**
    * Shift pitch by a certain amount of semitones. For reference, an octave is 12 semitones.
    * @param pitch amount in semitones to shift the pitch by
    */
    //% blockId=music_bend block="bend by %pitch| semitones" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function bend(pitch: number) {
        let shift = new Tone.PitchShift(pitch);
        board().monosynth.connect(shift);
        //board().polysynth.connect(shift);       
    }
    
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

    

    /**
     * Get the frequency of a note.
     * @param name the note name, eg: Note.C
     */
    //% weight=1 help=music/note-frequency
    //% blockId=device_note block="%note"
    //% shim=TD_ID
    //% note.fieldEditor="note" note.defl="262" note.fieldOptions.decompileLiterals=true
    //% useEnumVal=1 blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function noteFrequency(name: Note): number {
        return name;
    }      

    /**
     * Plays a musical phrase once
     * @param name 
     */
    //% blockId=music_play_phrase block="play phrase %name" blockGap=8
    export function playPhrase(name: string) {
        let phrase = board().phrases[name];
        phrase.loop = false;
        phrase.start(0);
    }

    /**
     * Loops a musical phrase
     * @param name 
     */
    //% blockId=music_loop_phrase block="loop phrase %name" blockGap=8
    export function loopPhrase(name: string) {
        let phrase = board().phrases[name];
        phrase.loop = true;
        phrase.start(0);
    }

    /**
     * Create a drum pattern
     * @param name
     * @param beat a string describing the beat
     */
    //% blockId="music_drumbeat" block="create drum beat %name|%beat"
    //% weight=100
    //% beat.fieldEditor="drums"
    //% beat.fieldOptions.onParentBlock=true
    //% beat.fieldOptions.decompileLiterals=true
    //% blockExternalInputs="true" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function drumSequencer(name: string, beat: string){
        let part = new Tone.Part(function(time, note){
                    board().monosynth.triggerAttackRelease(note, "8n", time, 1);
                }, [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]);
        let phrase = board().phrase(name, part);
    }

}