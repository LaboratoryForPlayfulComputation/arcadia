/**
 * Augment Reality markers
 */
//% weight=90 icon="\uf21d" color=#9239ff
namespace markers {
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
    //% blockId=music_play_chord block="play chord %notes| for %duration=device_beat"
    //% blockNamespace=music inBasicCategory=true
    export function playChord(notes: number[], duration: string): void {
        let noteString = "";
        let notesLen   = notes.length;
        for (let i = 0; i < notesLen-1; i++){
            noteString = noteString + notes[i].toString() + ",";
        }
        noteString = noteString + notes[notesLen-1].toString(); // so we don't have a trailing comma
        playChordCommand(noteString, duration);
    }
}

/**
 * Colors
 */
//% weight=90 icon="\uf1fc" color=#4c38ff
namespace colors {
}

/**
 * Events
 */
//% weight=90 icon="\uf110" color=#FF5722
namespace events {
}
