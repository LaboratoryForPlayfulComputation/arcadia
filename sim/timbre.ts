namespace pxsim.timbre {

    declare var T: any;

    export class Drumkit {
        public kick              : any;
        public snare             : any;
        public hihatClosed       : any;
        public hihatOpen         : any;
        public cymbal            : any;
        
        constructor() {
            let self = this;
            T("audio").load("/sim/timbre/misc/audio/drumkit.wav", function() {
                self.kick         = this.slice(   0,  500).set({bang:false});
                self.snare        = this.slice( 500, 1000).set({bang:false});
                self.hihatClosed  = this.slice(1000, 1500).set({bang:false, mul:0.2});
                self.hihatOpen    = this.slice(1500, 2000).set({bang:false, mul:0.2});
                self.cymbal       = this.slice(2000).set({bang:false, mul:0.2});    

                var drumSounds = T("lowshelf",
                                    {freq:110,gain:6, mul:0.6},
                                        self.kick,
                                            self.snare,
                                                self.hihatClosed,
                                                    self.hihatOpen,
                                                        self.cymbal).play();   
            });
        }

        playDrumBeat(drum: Drum) {
            switch(drum){
                case Drum.Kick: this.kick.bang();
                case Drum.Snare: this.snare.bang();
                case Drum.HiHatClosed: this.hihatClosed.bang();
                case Drum.HiHatOpen: this.hihatOpen.bang();
                case Drum.Cymbal: this.cymbal.bang();
                default: this.kick.bang();
            } 
        }
}

    export function playTone(frequency: number) {
        var sine1 = T("sin", {freq: frequency, mul: 0.5});

        T("perc", {r: 500}, sine1).on("ended", function() {
            this.pause();
        }).bang().play();
    }

    export function playChord(){}

    export function playArpeggio(){}

}