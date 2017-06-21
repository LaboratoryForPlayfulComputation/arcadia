namespace pxsim.timbre {

    declare var T: any;

    export function playTone(frequency: number) {
        var sine1 = T("sin", {freq: frequency, mul: 0.5});

        T("perc", {r: 500}, sine1).on("ended", function() {
            this.pause();
        }).bang().play();
        console.log("tone");
    }

    export function playDrumBeat(drum: Drum) {
        T("audio").load("/sim/timbre/misc/audio/drumkit.wav", function() {
            var BD  = this.slice(   0,  500).set({bang:false});
            var SD  = this.slice( 500, 1000).set({bang:false});
            var HH1 = this.slice(1000, 1500).set({bang:false, mul:0.2});
            var HH2 = this.slice(1500, 2000).set({bang:false, mul:0.2});
            var CYM = this.slice(2000).set({bang:false, mul:0.2});    

            var drumSounds = T("lowshelf", {freq:110, gain:8, mul:0.6}, BD, SD, HH1, HH2, CYM).play();  

            switch(drum){
                case Drum.Kick: BD.bang();
                case Drum.Snare: SD.bang();
                case Drum.HiHatClosed: HH1.bang();
                case Drum.HiHatOpen: HH2.bang();
                case Drum.Cymbal: CYM.bang();
                default: BD.bang();
            }  
        });
    }

    export function playChord(){}

    export function playArpeggio(){}

}