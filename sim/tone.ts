namespace pxsim.tone {


    export function startTransport() {
        Tone.Transport.start(0); // this is the current usage, not sure how to fix this in typings
    }

    export function stopTransport() {
        Tone.Transport.stop();
    }

    /*export function createAudioContext() : Tone.Context {
        return new Tone.Context();
    }*/

    // Not currently used. Event callback never fires, but no 404 errors...
    export function loadDrumSamplesAsync() : Promise<Tone.MultiPlayer> {
        return new Promise<Tone.MultiPlayer>((resolve, reject) => {
            var percussion = new Tone.MultiPlayer({
                urls : {
                    "kick"         : "/audio/percussion/kick.mp3",
                    "snare"        : "/audio/percussion/snare.mp3",
                    "hihat-closed" : "/audio/percussion/hh.mp3",
                    "hihat-open"   : "/audio/percussion/hh.mp3",
                    "cymbal"       : "/audio/percussion/hh.mp3"
                },
                volume  : -10,
                fadeOut : 0.1,
            }, (percussion) => {
                resolve(percussion);
            });            
        });            
    }   

    export function createMelodySequence(time: Tone.Time, notesArray: string[][], numTracks: number) : Tone.Sequence {
        let instrument = tone.createPolySynth(numTracks);
        //instrument.toMaster();
        let seq = new Tone.Sequence(function(time, notes){
            instrument.triggerAttackRelease(notes, time);
        }, notesArray, "8n");
        return seq;     
    }

    export function createMonoSynth() : Tone.MonoSynth {
        let mono = new Tone.MonoSynth({oscillator: {
                                            type: "sine"
                                        },
                                        envelope: {
                                            attack: 0.005,
                                            decay: 0.1,
                                            sustain: 0.3,
                                            release: 0.25
                                        }}).toMaster();  
        board().instruments.push(mono);
        return mono;
              
    }

    export function createPolySynth(voices: number) : Tone.PolySynth {
        let poly = new Tone.PolySynth(voices, Tone.MonoSynth);     
        poly.set("volume", -20);
        poly.set({
            "envelope" : {
                "attack" : 0.1,
                "sustain" : 0,
                "release": 0.01
            }}).toMaster();
        board().instruments.push(poly);
        return poly;   
    }

    export function createKickDrum() : Tone.MembraneSynth {
        let kick = new Tone.MembraneSynth({"envelope" : {
                                              "sustain" : 0,
                                              "attack" : 0.02,
                                              "decay" : 0.8},
                                           "octaves" : 10}).toMaster();
        board().instruments.push(kick);
        return kick;                                    
    }     

    export function bpm(val: Tone.BPM){
        Tone.Transport.bpm.value = val;        
    }

    export function createEffect(fx: Effect) : Tone.Effect {
        let effect = null as Tone.Effect;
        switch (fx) {
            case Effect.Distortion:
                effect = new Tone.Distortion(0.8).toMaster();
                break;
            case Effect.Delay:
                effect = new Tone.FeedbackDelay("8n").toMaster();
                break;
            case Effect.Chorus:
                effect = new Tone.Chorus(4, 2.5, 0.5).toMaster();
                break;
            case Effect.Phaser:
                effect = new Tone.Phaser({"frequency" : 15, 
                                            "octaves" : 5, 
                                            "baseFrequency" : 1000
                                        }).toMaster();
                break;
            case Effect.Reverb:
                effect = new Tone.Freeverb().toMaster();
                break;
            default:
                effect = new Tone.Distortion(0.8).toMaster();
                break;
        }
        board().fx.push(effect);
        return effect;        
    }

}