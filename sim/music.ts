namespace pxsim.music {

    let pitches   = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

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
    export function playChord(notes: number[], duration: string) {
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


    /**
    * Add an effect to a sequence.
    * @param effect which drum sound to use
    */
    //% blockId=music_add_effect_seq block="add effect %effect|to phrase %name" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"  
    export function addEffectSeq(effect: Effect, name: string) {
        let fx = tone.createEffect(effect);
        let phrase = board().phrases[name];
        phrase.connect(fx);
    }

    /**
    * Add an effect to every active instrument.
    * @param effect which effect to use
    */
    //% blockId=music_add_effect_global block="add global effect %effect" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"  
    export function addGlobalEffect(effect: Effect) {
        let fx = tone.createEffect(effect);
        for (let i = 0; i < board().instruments.length; i++)
            board().instruments[i].connect(fx);
    }

    /**
    * Shift pitch by a certain amount of semitones. For reference, an octave is 12 semitones.
    * @param pitch amount in semitones to shift the pitch by
    */
    //% blockId=music_bend block="bend by %pitch| semitones" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function bend(pitch: number) {
        let shift = new Tone.PitchShift(pitch);
        //board().monosynth.connect(shift);       
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
     * Plays a phrase once
     * @param name 
     */
    //% blockId=music_play_phrase block="play phrase %name" blockGap=8
    export function playPhrase(name: string) {
        let sequence = board().phrases[name];
        if (sequence){
            sequence.loop = false;
            sequence.start(4);
            tone.startTransport();
        }
    }

    /**
     * Loops a musical phrase
     * @param name 
     */
    //% blockId=music_loop_phrase block="loop phrase %name" blockGap=8
    export function loopPhrase(name: string) {
        let sequence = board().phrases[name];
        if (sequence){
            sequence.loop = true;
            sequence.start(0);
            tone.startTransport();
        }
    }

    /**
     * Stop a musical phrase
     * @param name 
     */
    //% blockId=music_stop_phrase block="stop phrase %name" blockGap=8
    export function stopPhrase(name: string) {
        let sequence = board().phrases[name];
        if (sequence){
            sequence.loop = false;
            sequence.stop(0);
        }
    }    

    /**
     * Create a drum pattern
     * @param name
     * @param beat a string describing the beat
     */
    //% blockId="music_drumbeat" block="create beat %name|%beat"
    //% weight=100
    //% beat.fieldEditor="drums"
    //% beat.fieldOptions.onParentBlock=true
    //% beat.fieldOptions.decompileLiterals=true    
    //% blockExternalInputs="true" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function drumSequence(name: string, beat: string){ 
        let tempPitches = ["E", "G", "A", "B", "D"]; // TO DO: replace notes with drum samples
        let notesList   = createNotesArray(JSON.parse(beat), 8, tempPitches);
        let numTracks   = tempPitches.length;
        let seq         = tone.createMelodySequence("8n", notesList, numTracks);
        let phrase      = board().phrase(name, seq);
    }

    /**
     * Create a melody pattern
     * @param name
     * @param beat a string describing the beat
     */
    //% blockId="music_phrase" block="create phrase %name|octave %octave|%melody"
    //% weight=100
    //% octave.fieldEditor="gridpicker"
    //% octave.fieldOptions.width="200" octave.fieldOptions.columns="1"
    //% octave.fieldOptions.tooltips="true"      
    //% melody.fieldEditor="melody"
    //% melody.fieldOptions.onParentBlock=true
    //% melody.fieldOptions.decompileLiterals=true    
    //% blockExternalInputs="true" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function phrase(name: string, octave: Octave, melody: string){ 
        let oct       = getOctave(octave);
        let notesList = createNotesArray(JSON.parse(melody), 8, pitches, oct);
        let numTracks = pitches.length;
        let seq       = tone.createMelodySequence("8n", notesList, numTracks);
        let phrase    = board().phrase(name, seq);
    }

    export function createNotesArray(sequence: pxsim.Map<string[]>, numBeats: number, sounds: string[], octave?: string) : string[][] {
        let notesList = [] as string[][];
        for (let i = 0; i < numBeats; i++){
            let beatNotes = [] as string[];
            let trackindex = 0;
            for (var track in sequence){
                if (sequence[track][i] == "1") {
                    if (octave) beatNotes.push(pitches[trackindex] + octave);
                    else beatNotes.push(pitches[trackindex]);
                }
                trackindex++;
            }
            notesList.push(beatNotes);
        }
        notesList = addRests(notesList);
        return notesList;
    }    

    export function getOctave(octave: Octave) : string {
        switch(octave){
            case Octave.Lowest: return "2";
            case Octave.Low: return "3";
            case Octave.Middle: return "4";
            case Octave.High: return "5";
            default: return "4";
        }
    }

    export function addRests(notesList: string[][]) : string[][] {
        for (let i = 0; i < notesList.length; i++){
            if (notesList[i] == [])
                notesList[i] = [null];
        }
        return notesList;
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