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
 * Messaging
 */
//% color=#6657b2 icon="\uf003" weight=88
namespace messaging {
    
}