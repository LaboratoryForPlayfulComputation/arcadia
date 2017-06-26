namespace pxsim.music {

    /**
    * Play a tone.
    * @param marker marker
    * @param note pitch of the tone to play in Hertz (Hz)
    * @param duration number of beats to play tone for
    */
    //% blockId=music_play_tone block="%marker=marker_block| play tone %note=device_note| for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function playTone(marker: number, note: number, duration: string) { 
        let m = board().marker(marker);
        m['monoSynth'].triggerAttackRelease(note, duration); 
    }

    /**
    * Rest.
    * @param marker marker
    * @param duration number of beats to rest for
    */
    //% blockId=music_rest block="%marker=marker_block| rest for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function rest(marker: number, duration: string) { 
        let m = board().marker(marker);
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
        let m = board().marker(marker);
        switch (drum) {
            case Drum.Kick:
               m['kickDrum'].triggerAttackRelease("C3", "8n");
               break;
            default:
               m['kickDrum'].triggerAttackRelease("C3", "8n");
               break;            
        }
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

    export function createKickDrum() : Tone {
        return new Tone.MembraneSynth({"envelope" : {
                                            "sustain" : 0,
                                            "attack" : 0.02,
                                            "decay" : 0.8
                                        },
                                        "octaves" : 10
                                    }).toMaster();
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
     * Defines a musical phrase
     * @param name 
     */
    //% blockId=music_create_phrase block="create phrase called %name" blockGap=8
    export function createPhrase(name: string, handler: RefAction) {
        /* TO DO: fix from "RefAction" to something that will just give me a list.
        This will allow us to create nicely timed musical patterns that can be triggered by a 
        "play phrase" or "loop phrase" call
        */

        /* new Tone.Part(function(time, note){
            //the notes given as the second element in the array
            //will be passed in as the second argument
            synth.triggerAttackRelease(note, "8n", time);
        }, [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]);)
        */     
    }

}