declare namespace Tone {

    class Master {
        constructor();
    }

    class Synth extends Monophonic {
        constructor(options: SynthOptions);
    }

    class Monophonic extends Instrument {
        constructor();
        portamento : Time;
        volume     : Decibels;
        triggerAttack(note: String, time: String, velocity: Number) : Monophonic;
    }

    class Instrument {
        constructor();
        triggerAttackRelease(note: Frequency, duration: Time, velocity: NormalRange) : Instrument;
        dispose() : Instrument;
        toMaster(): void;
        connect() : void;
    }

    interface SynthOptions {
        oscillator : SynthType;
        envelope: EnvelopeOptions;
    }

    interface SynthType {
        type : String;
    }

    interface EnvelopeOptions {
        attack  : Number;
        decay   : Number;
        sustain : Number;
        release : Number;
    }

    type Frequency   = Number | String;
    type Time        = Number | String;
    type Decibels    = String;
    type NormalRange = Number;

}
