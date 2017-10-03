namespace pxsim.music {

    /**
    * Play a tone for a duration of time
    * @param note pitch of the tone to play in Hertz (Hz)
    * @param duration number of beats to play tone for, eg: BeatFraction.Quarter
    */
    //% blockId=music_play_tone block="play tone %note=device_note| for %duration" blockGap=8
    //% weight=100
    //% blockNamespace=music inBasicCategory=true promise
    export function playToneAsync(note: number, duration: BeatFraction): Promise<void> { 
        const t = beat(duration);
        const tone = board().monosynth
        tone.triggerAttackRelease(note, t, "+16t");
        return pauseBeatAsync(tone, duration);
    }

    /**
    * Rest for a duration of time
    * @param duration number of beats to rest for
    */
    //% blockId=music_rest block="rest for %duration" blockGap=8
    //% weight=97
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
        const tone = board().polysynth;
        if (notesString != ""){
            let notes = notesString.split(",");
            let notesToPlay = [] as any;
            if (notes.length > 5){
                for (let i = 0; i < 5; i++) notesToPlay.push(notes[i]);
            } else {
                notesToPlay = notes;
            }
            const t = beat(duration);
            board().polysynth.triggerAttackRelease(notesToPlay, t, "+16t");
        }
        return pauseBeatAsync(tone, duration);
    }

    /**
    * Play a type of drum sound
    * @param drum which drum sound to use
    */
    //% blockId=music_play_drum_beat block="play %drum" blockGap=8
    //% weight=99
    //% blockNamespace=music inBasicCategory=true
    //% drum.fieldEditor="gridpicker"
    //% drum.fieldOptions.width="200" drum.fieldOptions.columns="1"
    //% drum.fieldOptions.tooltips="true"        
    export function playDrum(drum: Drum) {
        switch (drum) {
            case Drum.Kick:
               board().drumPlayers["kick"].start("+16t");
               break;
            case Drum.Snare:
               board().drumPlayers["snare"].start("+16t");
               break;
            case Drum.HiHat:
               board().drumPlayers["hihat"].start("+16t");
               break;   
            case Drum.Click:
               board().drumPlayers["click"].start("+16t");
               break;                           
            default:
               board().drumPlayers["splat"].start("+16t");
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
        return loops.pauseAsync(s * 1000);
    }

    /**
     * Change the frequency (pitch) of an oscillator
     * @param wave type of sound wave
     */
    //% blockId="music_osc_freq" block="set %wave|wave to %note=device_note"
    //% weight=90
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
        }
        let osc = board().oscillators[type];
        osc.frequency.value = freq;
    }

    /**
     * Stop an oscillator type
     * @param wave type of sound wave
     */
    //% blockId="music_stop_osc" block="stop %wave|wave"
    //% weight=89
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
        }
        let osc = board().oscillators[type];
        osc.stop();
    }

    /**
     * Start an oscillator type
     * @param wave type of sound wave
     */
    //% blockId="music_start_osc" block="start %wave|wave"
    //% weight=91
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
        }
        let osc = board().oscillators[type];
        osc.volume.value = vol;
        osc.stop();
        osc.start("+16t");
    }    

    /**
     * Set the beats per minute (tempo)
     * @param bpm The number of beats per minute, eg: 120
     */
    //% blockId="music_bpm" block="set tempo %bpm"
    //% weight=95
    //% blockExternalInputs="true" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function setTempo(bpm: number){
        tone.bpm(bpm);
    }

    /**
     * Set the master volume. Choose a number in the range of 0-100, the default volume is 100.
     * @param volume The volume level, eg: 100
     */
    //% blockId="music_volume" block="set volume %volume"
    //% weight=94
    //% blockExternalInputs="true" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function setVolume(volume: number){
        const cappedVal = Math.min(Math.max(volume, 0), 100); // caps number between the ranges 0 and 100
        const mappedVal = (cappedVal - 0) * (1 - 0) / (100 - 0) + 0;
        const decibels  = Math.log(mappedVal)*10;
        Tone.Master.volume.value = decibels;
    }

}