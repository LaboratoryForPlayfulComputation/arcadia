namespace pxsim.phrases {

    let pitches    = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    let drumSounds = ["kick", "snare", "hihat", "click", "splat"];

    /**
     * Plays a phrase once
     * @param name 
     */
    //% blockId=music_play_phrase block="play phrase %name" blockGap=8
    //% blockNamespace=music advanced=true
    export function playPhrase(name: string) {
        let phrase = board().phrase(name);
        if (phrase) phrase.play();
    }

    /**
     * Loops a musical phrase
     * @param name 
     */
    //% blockId=music_loop_phrase block="loop phrase %name" blockGap=8
    //% blockNamespace=music advanced=true
    export function loopPhrase(name: string) {
        let phrase = board().phrase(name);
        if (phrase) phrase.loop();
    }

    /**
     * Stop a musical phrase
     * @param name 
     */
    //% blockId=music_stop_phrase block="stop phrase %name" blockGap=8
    //% blockNamespace=music advanced=true
    export function stopPhrase(name: string) {
        let phrase = board().phrase(name);
        if (phrase) phrase.stop();
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
    //% blockNamespace=music advanced=true
    export function drumPhrase(name: string, beatString: string){ 
        let beat = createNotesMap(JSON.parse(beatString), 8, drumSounds);
        let numTracks = drumSounds.length;
        let phrase = tone.createDrumSequence("8n", 8, beat);
        board().phrases[name] = phrase;
    }

    /* translates what beats are active on each track,
       to each note that needs to be played on each beat */
    export function createNotesMap(sequence: pxsim.Map<string[]>, numBeats: number, sounds: string[], octave?: string) : pxsim.Map<string[]> {
        let notesMap = {} as pxsim.Map<string[]>;
        for (let i = 0; i < numBeats; i++){
            let beatNotes = [] as string[];
            let trackindex = 0;
            for (var track in sequence) {
                if (parseInt(sequence[track][i])) {
                    if (octave) beatNotes.push(sounds[trackindex] + octave);
                    else beatNotes.push(sounds[trackindex]);
                }
                trackindex++;
            }
            notesMap[i] = beatNotes;
        }
        notesMap = addRests(notesMap);
        return notesMap;
    }    

    export function getOctave(octave: Octave): string {
        switch(octave){
            case Octave.Lowest: return "2";
            case Octave.Low: return "3";
            case Octave.Middle: return "4";
            case Octave.High: return "5";
            default: return "4";
        }
    }

    export function addRests(notesMap: pxsim.Map<string[]>) : pxsim.Map<string[]> {
        for (var beat in notesMap){
            let seq = notesMap[beat];
            for (let i = 0; i < seq.length; i++){
                if (seq[i].length == 0)
                    seq[i] = null;
            }
        }
        return notesMap;
    }

    /* Class to store all of the details of a user created musical phrase */
    export class Phrase {
        public sequence   : Tone.Sequence;
        public instrument : Tone.Instrument | Tone.MultiPlayer;
        public fx         : pxsim.Map<Tone.Effect>;

        constructor(seq: Tone.Sequence, instr: Tone.Instrument | Tone.MultiPlayer, effects?: pxsim.Map<Tone.Effect>) {
            this.sequence   = seq;
            this.instrument = instr;
            this.fx         = {};
            if (effects)
                this.fx = effects;
        }

        discard(){
            this.sequence.dispose();
        }

        addEffect(effect: Effect){
            var fx : Tone.Effect;
            var type : string;
            switch(effect){
                case Effect.Chorus:
                    fx = new Tone.Chorus(4, 2.5, 0.5).toMaster();
                    type = "chorus";
                    break;
                case Effect.Delay:
                    fx = new Tone.FeedbackDelay("8n").toMaster();
                    type = "delay";
                    break;
                case Effect.Distortion:
                    fx = new Tone.Distortion(0.8).toMaster();
                    type = "distortion";
                    break;
                case Effect.Phaser:
                    fx = new Tone.Phaser({"frequency": 15, 
                                            "octaves": 5, 
                                            "baseFrequency": 1000
                                        }).toMaster();
                    type = "phaser";
                    break;
                default: 
                    fx = new Tone.Freeverb().toMaster();
                    type = "reverb";
                    break;
            }
            this.fx[type] = fx;
            this.instrument.connect(fx);
        }

        removeEffect(effect: Effect){
            var type : string;
            switch(effect){
                case Effect.Chorus: type = "chorus";
                case Effect.Delay: type = "delay";
                case Effect.Distortion: type = "distortion";
                case Effect.Phaser: type = "phaser";
                default: type = "reverb";
            }
            if (this.fx[type]){
                this.instrument.disconnect(this.fx[type]);
                this.fx[type].dispose();
                this.fx[type] = null;
            } 
        }

        play(time?: Tone.Time){
            this.sequence.loop = false;   
            this.sequence.start("+16t");
            this.sequence.stop("+1m");
        }  

        loop(time?: Tone.Time){
            if (this.sequence.state == "stopped"){
                this.sequence.loop = true;      
                this.sequence.start("+16t");
            } 
        }

        stop(time?: Tone.Time){
            this.sequence.stop();
        }             
    }

}