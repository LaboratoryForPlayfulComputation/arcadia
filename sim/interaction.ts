namespace pxsim.interaction {

    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     * @param event 
     */
    //% blockId=ar_on_event block="on %marker=marker_block|%event |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"
    //% weight=99    
    export function onEvent(marker: number, event: MarkerEvent, handler: RefAction) {
        board().bus.listen(marker, event, handler);
    }

    /**
     * Allows use to define callbacks for a marker event
     * @param marker
     * @param event 
     */
    //% blockId=ar_while_event block="while %marker=marker_block|%event |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    //% weight=97    
    export function whileEvent(marker: number, event: MarkerLoopEvent, handler: RefAction) {
        board().bus.listen(marker, event, handler);
    }

    /**
     * Allows user to define callbacks that fire while the multi marker event is true
     * @param marker1 
     * @param marker2 
     * @param event 
     */
    //% blockId=ar_while_multi_event block="while %marker1=marker_block|%event |%marker2=marker_block |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"
    //% inlineInputMode="inline"    
    //% weight=96    
    export function whileMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: RefAction) {
        let eventString = event.toString() + 'marker' + marker1.toString() + 'marker' + marker2.toString();
        let m1 = board().marker(marker1);
        let m2 = board().marker(marker2);
        m1.addNeighbor([m2, '']);
        board().bus.listen(eventString, event, handler);
    }

    /**
     * Allows user to define callbacks that trigger once when the multi marker event is true
     * @param marker1 
     * @param marker2 
     * @param event 
     */
    //% blockId=ar_on_multi_event block="on %marker1=marker_block|%event |%marker2=marker_block |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    //% inlineInputMode="inline"    
    //% weight=98    
    export function onMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: RefAction) {
        let eventString = 'on' + event.toString() + 'marker' + marker1.toString() + 'marker' + marker2.toString();
        let m1 = board().marker(marker1);
        let m2 = board().marker(marker2);
        m1.addNeighbor([m2, '']);
        board().bus.listen(eventString, event, handler);
    }

}