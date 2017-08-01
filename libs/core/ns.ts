/**
 * Augment Reality markers
 */
//% weight=92 icon="\uf21d" color=#9239ff
namespace markers {
}

/**
 * Music
 */
//% weight=89 icon="\uf001" color=#ff3acd
namespace music {
    /**
     * @param notes 
     * @param duration 
     */
    //% blockGap=8
    //% blockId=music_play_chord block="play chord %notes=lists_create_with| for %duration"
    //% blockNamespace=music inBasicCategory=true
    export function playChord(notes: number[], duration: BeatFraction): void {
        let noteString = "";
        let notesLen = notes.length;
        for (let i = 0; i < notesLen - 1; i++) {
            noteString = noteString + notes[i].toString() + ",";
        }
        noteString = noteString + notes[notesLen - 1].toString(); // so we don't have a trailing comma
        playChordCommand(noteString, duration);
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
//% weight=90 icon="\uf005" color=#16ccb0
namespace design {
}

/**
 * Motion
 */
//% weight=91 icon="\uf110" color=#FF5722
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