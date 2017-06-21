namespace pxsim.timbre {

    declare var T: any;

    export function playTone(frequency: number) {
        var sine1 = T("sin", {freq: frequency, mul: 0.5});

        T("perc", {r: 500}, sine1).on("ended", function() {
            this.pause();
        }).bang().play();
        console.log("tone");
    }

    export function playChord(){}

    export function playArpeggio(){}

}