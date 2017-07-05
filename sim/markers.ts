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

        /**
         * Checks for changed AR marker states and triggers marker events
         * @param markerState 
         */
        export function triggerMarkerEvents(markerState : THREEx.ArMarkerState){
            const marker          = markerState.marker;
            let markerCurrentPos  = markerState.currentPos;
            let markerPrevPos     = markerState.prevPos;
            let markerCurrentRot  = markerState.currentRot;
            let markerPrevRot     = markerState.prevRot;       
            let markerPrevVisible = markerState.prevVisible;             
            let markerVisible     = markerState.visible;   
            /* calculate differences in previous and current positions/rotations */
            const distThreshold   = 0.07;
            const angleThreshold  = Math.PI/16;          
            const distance        = markerPrevPos.distanceTo(markerCurrentPos);
            const distanceX       = markerCurrentPos.x - markerPrevPos.x; 
            const distanceY       = markerCurrentPos.y - markerPrevPos.y; 
            const distanceZ       = markerCurrentPos.z - markerPrevPos.z; 
            const angleX          = markerCurrentRot.x - markerPrevRot.x;
            const angleY          = markerCurrentRot.y - markerPrevRot.y;
            const angleZ          = markerCurrentRot.z - markerPrevRot.z;
            /* trigger events depending on the changed state */
            if      (distance >= distThreshold)   board().bus.queue(marker, MarkerEvent.Moved);
            if      (distanceX >= distThreshold)  board().bus.queue(marker, MarkerEvent.MovedRight);
            else if (distanceX <= -distThreshold) board().bus.queue(marker, MarkerEvent.MovedLeft);
            if      (distanceY >= distThreshold)  board().bus.queue(marker, MarkerEvent.MovedUp);
            else if (distanceY <= -distThreshold) board().bus.queue(marker, MarkerEvent.MovedDown);
            if      (distanceZ >= distThreshold)  board().bus.queue(marker, MarkerEvent.MovedForward);
            else if (distanceZ <= -distThreshold) board().bus.queue(marker, MarkerEvent.MovedBackward); 
            if      (angleX >= distThreshold)     board().bus.queue(marker, MarkerEvent.RotatedClockwise);
            else if (angleX <= -distThreshold)    board().bus.queue(marker, MarkerEvent.RotatedCounterClockwise);
            if (Math.abs(angleX) >= angleThreshold || Math.abs(angleY) >= angleThreshold || Math.abs(angleZ) >= angleThreshold)
                board().bus.queue(marker, MarkerEvent.Rotated);
            if (markerVisible == true){
                board().bus.queue(marker, MarkerLoopEvent.WhileVisible);
                if (markerPrevVisible == false) board().bus.queue(marker, MarkerEvent.Visible);
            } else { // marker not visible
                board().bus.queue(marker, MarkerLoopEvent.WhileHidden);
                if (markerPrevVisible == true) board().bus.queue(marker, MarkerEvent.Hidden);
            }            
        }    

}
