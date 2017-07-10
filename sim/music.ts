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
/*
    export function rest(duration: string) {
    }
*/

    /**
    * Play a chord.
    * @param notes pitches of the tones to play in Hertz (Hz)
    * @param duration number of beats to play tone for
    */
    //% blockId=music_play_chord block="play chord %notes| for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
/*
    export function playChord(notes: number[], duration: string) {
        //board().polysynth.triggerAttackRelease(notes, duration);
    }
*/

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
               board().drumPlayers["kick"].start(0);
               break;
            case Drum.Snare:
               board().drumPlayers["snare"].start(0);
               break;
            case Drum.HiHat:
               board().drumPlayers["hihat"].start(0);
               break;   
            case Drum.Click:
               board().drumPlayers["click"].start(0);
               break;                           
            default:
               board().drumPlayers["splat"].start(0);
               break;            
        }
    }

    /**
    * Shift pitch by a certain amount of semitones. For reference, an octave is 12 semitones.
    * @param pitch amount in semitones to shift the pitch by
    */
/*
    //% blockId=music_bend block="bend by %pitch| semitones" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function bend(pitch: number) {
        let shift = new Tone.PitchShift(pitch);
        for (let i = 0; i < board().instruments.length; i++)
            board().instruments[i].connect(shift);       
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
     * Change freq of an oscillator
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
        osc.stop(0);
    }

    /**
     * Play an oscillator type
     * @param wave type of sound wave
     */
    //% blockId="music_play_osc" block="start %wave|wave"
    //% weight=100
    //% wave.fieldEditor="gridpicker"
    //% wave.fieldOptions.width="200" octave.fieldOptions.columns="1"
    //% wave.fieldOptions.tooltips="true"      
    //% blockNamespace=music inBasicCategory=true
    export function playOsc(wave: Wave){
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
        osc.stop(0);
        osc.start(0);
    }    

    /**
     * Set tempo
     * @param bpm
     */
    //% blockId="music_tempo" block="set tempo %bpm"
    //% weight=100
    //% blockExternalInputs="true" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function setTempo(bpm: number){
        tone.bpm(bpm);
    }

}