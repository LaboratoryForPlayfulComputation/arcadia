namespace pxsim.events {

    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_on_event block="on %marker=marker_block| %event" blockGap=8
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
    //% blockId=ar_while_event block="while %marker=marker_block| %event" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    export function whileEvent(marker: number, event: MarkerLoopEvent, handler: RefAction) {
        board().bus.listen(marker, event, handler);
    }

    /**
     * Allows use to define callbacks for multi marker event
     * @param marker 
     */
    //% blockId=ar_on_multi_event block="on %marker1=marker_block| %event| %marker2=marker_block" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    export function onMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: RefAction) {
        board().bus.listen(marker1, event, handler);
        board().bus.listen(marker2, event, handler);
    }

}