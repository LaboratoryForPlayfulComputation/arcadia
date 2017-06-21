namespace pxsim.markers {

    //% blockId=marker_block block="%marker"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"    
    //% marker.fieldOptions.decompileLiterals=true
    //% shim=TD_ID
    //% useEnumVal=1
    export function marker(marker: Marker) : number {
        board().marker(marker);
        return marker;
    } 

    /**
     * Gets the distance between the centers of 2 markers
     */
    //% blockId=ar_get_dist block="distance from %marker1=marker_block| to %marker2=marker_block" blockGap=8
    export function distance(marker1: number, marker2: number): number {     
        return board().getDistanceBetweenMarkers(marker1, marker2);
    }

    /**
     * Gets the x, y, z positional coordinates of a marker
     */
    //% blockId=ar_get_pos block="%marker=marker_block|position %axis" blockGap=8
    export function position(marker: number, axis: Axes): number {
        const pos = board().getMarkerPosition(marker);
        switch(axis) {
            case Axes.x: return pos.x;
            case Axes.y: return pos.y;
            default:     return pos.z;
        }
    }

    /**
     * Gets the rotational values of a marker
     */
    //% blockId=ar_get_rot block="%marker=marker_block|rotation %axis" blockGap=8
    export function rotation(marker: number, axis: Axes): number {
        const rot = board().getMarkerRotation(marker);
        switch(axis) {
            case Axes.x: return rot.x;
            case Axes.y: return rot.y;
            default:     return rot.z;
        }
    }    

}
