namespace pxsim.interaction {

    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_on_event block="on %marker=marker_block|%event |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    export function onEvent(marker: number, event: MarkerEvent, handler: RefAction) {
        board().bus.listen(marker, event, handler);
    }

    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_while_event block="while %marker=marker_block|%event |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    export function whileEvent(marker: number, event: MarkerLoopEvent, handler: RefAction) {
        board().bus.listen(marker, event, handler);
    }

    /**
     * Allows user to define callbacks that fire while the multi marker event is true
     * @param marker 
     */
    //% blockId=ar_while_multi_event block="while %marker1=marker_block|%event |%marker2=marker_block |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"
    //% inlineInputMode="inline"    
    export function whileMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: RefAction) {
        let eventString = event.toString() + 'marker' + marker1.toString() + 'marker' + marker2.toString();
        let m1 = board().marker(marker1);
        let m2 = board().marker(marker2);
        m1.addNeighbor([m2, '']);
        board().bus.listen(eventString, event, handler);
    }

    /**
     * Allows user to define callbacks that trigger once when the multi marker event is true
     * @param marker 
     */
    //% blockId=ar_on_multi_event block="on %marker1=marker_block|%event |%marker2=marker_block |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    //% inlineInputMode="inline"    
    export function onMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: RefAction) {
        let eventString = 'on' + event.toString() + 'marker' + marker1.toString() + 'marker' + marker2.toString();
        let m1 = board().marker(marker1);
        let m2 = board().marker(marker2);
        m1.addNeighbor([m2, '']);
        board().bus.listen(eventString, event, handler);
    }

    /**
     * Maps the value of 1 marker in relation to its distance between 2 markers.
     */
    //% blockId=ar_slider block="slider %marker1=marker_block|from %marker2=marker_block|to %marker3=marker_block" blockGap=8
    export function slider(marker1: number, marker2: number, marker3: number) : number {
        // TO DO: remember last state that the slider was in if there's a flicker
        let m1 = board().marker(marker1);
        let m2 = board().marker(marker2);
        let m3 = board().marker(marker3);
        let sliderVal  = 0;
        let totalDist = markers.distance(m2.code(), m3.code());
        let sliderDist = markers.distance(m1.code(), m2.code());
        if (totalDist > 0 && sliderDist != -9999)
            sliderVal = sliderDist / totalDist;
        return sliderVal;    
    }
    
    /**
     * Maps the value of 1 marker in relation to its angle with a 2nd marker.
     */
    //% blockId=ar_wheel block="wheel %marker1=marker_block|and %marker2=marker_block" blockGap=8
    export function wheel(marker1: number, marker2: number) : number { // TO DO: figure out what the difference b/w these angles are...
        let m1 = board().marker(marker1);
        let m2 = board().marker(marker2);
        let v1 = m1.rotation().toVector3();
        let v2 = m2.rotation().toVector3();
        let angle = v1.distanceTo(v2);
        const in_min  = 0;
        const in_max  = 4;
        const out_min = 0;
        const out_max = 1;
        return (angle - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}