namespace pxsim.music {

    /**
    * Play a tone for a duration of time
    * @param note pitch of the tone to play in Hertz (Hz)
    * @param duration number of beats to play tone for, eg: BeatFraction.Quarter
    */
    //% blockId=music_play_tone block="play tone %note=device_note| for %duration" blockGap=8
    //% blockNamespace=music inBasicCategory=true promise
    export function playToneAsync(note: number, duration: BeatFraction): Promise<void> { 
        const t = beat(duration);
        const tone = board().monosynth
        tone.triggerAttackRelease(note, t);
        return pauseBeatAsync(tone, duration);
    }


    /**
    * Rest for a duration of time
    * @param duration number of beats to rest for
    */
    //% blockId=music_rest block="rest for %duration" blockGap=8
    //% blockNamespace=music inBasicCategory=true promise
    export function restAsync(duration: BeatFraction): Promise<void> {
        const tone = board().monosynth;
        return pauseBeatAsync(tone, duration);        
    }

    /**
    * Play a chord of an array of notes for a duration of time. Can play up to 5 notes.
    * @param notes pitches of the tones to play in Hertz (Hz)
    * @param duration number of beats to play tone for
    */
    //% promise
    export function playChordCommandAsync(notesString: string, duration: BeatFraction): Promise<void> {
        let notes = notesString.split(",");
        let notesToPlay = [] as any;
        let i = 0;
        if (notes.length > 5){
            while (i < 5){
                notesToPlay.push(notes[i]);
                i++;
            }
        } else {
            notesToPlay = notes;
        }
        const t = beat(duration);
        const note = board().polysynth;
        board().polysynth.triggerAttackRelease(notesToPlay, t);
        return pauseBeatAsync(note, duration);
    }

    /**
    * Play a type of drum sound
    * @param drum which drum sound to use
    */
    //% blockId=music_play_drum_beat block="play %drum" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% drum.fieldEditor="gridpicker"
    //% drum.fieldOptions.width="200" drum.fieldOptions.columns="1"
    //% drum.fieldOptions.tooltips="true"        
    export function playDrum(drum: Drum) {
        switch (drum) {
            case Drum.Kick:
               board().drumPlayers["kick"].start();
               break;
            case Drum.Snare:
               board().drumPlayers["snare"].start();
               break;
            case Drum.HiHat:
               board().drumPlayers["hihat"].start();
               break;   
            case Drum.Click:
               board().drumPlayers["click"].start();
               break;                           
            default:
               board().drumPlayers["splat"].start();
               break;            
        }
    }

    
    /**
     * Converts into beat notation
     */
    function beat(fraction: BeatFraction): string {
        switch (fraction) {
            case BeatFraction.Whole: return "1n";
            case BeatFraction.Half: return "2n";
            case BeatFraction.Quarter: return "4n";
            case BeatFraction.Eighth: return "8n";
            case BeatFraction.Sixteenth: return "16n";
            default: return "8n";
        }
    }  

    function pauseBeatAsync(tone: Tone, fraction: BeatFraction): Promise<void> {
        const t = beat(fraction);
        const s = tone.toSeconds(t);
        return loops.pauseAsync(s * 1000 + 5);
    }

    /**
     * Get the frequency of a note
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
     * Change the frequency (pitch) of an oscillator
     * @param wave type of sound wave
     */
    //% blockId="music_osc_freq" block="set %wave|wave to %note=device_note"
    //% weight=100
    //% wave.fieldEditor="gridpicker"
    //% wave.fieldOptions.width="200" octave.fieldOptions.columns="1"
    //% wave.fieldOptions.tooltips="true"      
    //% blockNamespace=music inBasicCategory=true
    export function oscFreq(wave: Wave, freq: number){
        var type : string;        
        switch(wave){
            case Wave.Sine:
                type = "sine";
                break;
            case Wave.Square:
                type = "square";
                break;            
            case Wave.Triangle:
                type = "triangle";
                break;            
            default:
                type = "sawtooth";
                break;            
        }
        let osc = board().oscillators[type];
        osc.frequency.value = freq;
    }

    /**
     * Stop an oscillator type
     * @param wave type of sound wave
     */
    //% blockId="music_stop_osc" block="stop %wave|wave"
    //% weight=100
    //% wave.fieldEditor="gridpicker"
    //% wave.fieldOptions.width="200" octave.fieldOptions.columns="1"
    //% wave.fieldOptions.tooltips="true"      
    //% blockNamespace=music inBasicCategory=true
    export function stopOsc(wave: Wave){
        var type : string;        
        switch(wave){
            case Wave.Sine:
                type = "sine";
                break;
            case Wave.Square:
                type = "square";
                break;            
            case Wave.Triangle:
                type = "triangle";
                break;            
            default:
                type = "sawtooth";
                break;            
        }
        let osc = board().oscillators[type];
        osc.stop();
    }

    /**
     * Start an oscillator type
     * @param wave type of sound wave
     */
    //% blockId="music_start_osc" block="start %wave|wave"
    //% weight=100
    //% wave.fieldEditor="gridpicker"
    //% wave.fieldOptions.width="200" octave.fieldOptions.columns="1"
    //% wave.fieldOptions.tooltips="true"      
    //% blockNamespace=music inBasicCategory=true
    export function startOsc(wave: Wave){
        var type : string;
        var vol  : number;       
        switch(wave){
            case Wave.Sine:
                type = "sine";
                vol = -20;
                break;
            case Wave.Square:
                type = "square";
                vol = -30;
                break;            
            case Wave.Triangle:
                type = "triangle";
                vol = -20;
                break;            
            default:
                type = "sawtooth";
                vol = -30;
                break;            
        }
        let osc = board().oscillators[type];
        osc.volume.value = vol;
        osc.stop();
        osc.start();
    }    

    /**
     * Set the beats per minute (tempo)
     * @param bpm
     */
    //% blockId="music_bpm" block="set tempo %bpm"
    //% weight=100
    //% blockExternalInputs="true" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function setTempo(bpm: number){
        tone.bpm(bpm);
    }

}