/**
 * Augment Reality markers
 */
//% weight=89 icon="\uf21d" color=#9239ff
namespace markers {

    /**
     * An augmented reality marker
     * @param marker The value of the marker
     */
    //% blockId=marker_block block="%marker"
    //% weight=100
    //% marker.fieldEditor="imagedropdown"
    //% marker.fieldOptions.width="250" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% marker.fieldOptions.decompileLiterals=true marker.defl=0
    //% shim=TD_ID useEnumVal=1
    export function marker(marker: MarkerCode): number { 
        return marker;
    } 
}

/**
 * Music
 */
//% weight=90 icon="\uf001" color=#ff3acd
namespace music {
    /**
     * @param notes 
     * @param duration 
     */
    //% blockGap=8
    //% blockId=music_play_chord block="play chord %notes=lists_create_with| for %duration"
    //% weight=98
    //% blockNamespace=music inBasicCategory=true
    export function playChord(notes: number[], duration: BeatFraction): void {
        let noteString = "";
        let notesLen = notes.length;
        if (notesLen > 0){
            for (let i = 0; i < notesLen - 1; i++) {
                noteString = noteString + notes[i].toString() + ",";
            }
            noteString = noteString + notes[notesLen - 1].toString(); // so we don't have a trailing comma
        }
        playChordCommand(noteString, duration);
    }

   /**
     * Get the frequency of a note
     * @param note the note name, eg: Note.C
     */
    //% weight=96 help=music/note-frequency
    //% blockId=device_note block="%note"
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% note.fieldEditor="note" note.defl="262" note.fieldOptions.decompileLiterals=true
    //% useEnumVal=1 blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function noteFrequency(note: Note): number {
        return note;
    }      
}

/**
 * Network
 */
namespace network {
    /**
     * Send OSC message
     * @param ip the ip address, eg: 127.0.0.1
     * @param port the port, eg: 3333
     * @param addr the osc message address, eg: /message
     */
    //% blockId=osc_send block="send OSC packet| IP %ip| PORT %port| ADDRESS %addr| ARGS %params=lists_create_with|" blockGap=8
    //% weight=98
    //% blockNamespace=network inBasicCategory=true
    export function sendOsc(ip: string, port: number, addr: string, params: number[]) {
        let args = '';
        for (let i = 0; i < params.length; i++) {
            args = args + params[i].toString() + ",";
        }
        /*let tags     = '';
        for (let i = 0; i < params.length; i++) {
            switch(typeof(params[i])){
                case "boolean":
                    tags += "b,";                   
                    break;
                case "number":
                    if (params[i] % 1 === 0)
                        tags += "i,";                   
                    else
                        tags += "f,";                   
                        break;
                case "string":
                    tags += "s,";                   
                    break;
                default:
                    tags += "n,";                   
            }
            //args.push(params[i]);                   
        }*/
        sendOSCCommand(ip, port, addr, args);
    }    
}

/**
 * Colors
 */
//% weight=87 icon="\uf1fc" color=#4c38ff
namespace colors {
}

/**
 * Design
 */
//% weight=91 icon="\uf005" color=#16ccb0
namespace design {
}

/**
 * Motion
 */
//% weight=92 icon="\uf110" color=#FF5722
namespace interaction {
}

/**
 * Paint
 */
//% icon="\uf1fc" color=#e00d0d
namespace paint {
}


/**
 * Models
 */
//% weight=88 icon="\uf1fc" color=#4d03a3
namespace models {
}

/**
 * Network
 */
//% weight=86 icon="\uf1fc" color=#4c38ff
namespace network {
}

