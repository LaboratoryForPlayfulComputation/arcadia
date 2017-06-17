// Auto-generated from simulator. Do not edit.
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

}
declare namespace console {
    /**
     * Print out message
     */
    //%
    //% shim=console::log
    function log(msg: string): void;

}
declare namespace markers {
    /**
     * Sets the text and color that displays when the marker is detected
     */
    //% blockId=ar_set_text block="%marker|set text %text| text %textColor| background %bgColor"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% shim=markers::setTextAndColor
    function setTextAndColor(marker: Marker, text: string | number, textColor: number, bgColor: number): void;

    /**
     * Sets the string and color that displays when the marker is detected
     */
    //% blockId=ar_set_string block="%marker|set string %text| set color %colors_named"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% shim=markers::setStringAndColor
    function setStringAndColor(marker: Marker, text: string, bgColor: number): void;

    /**
     * Sets the number and color that displays when the marker is detected
     */
    //% blockId=ar_set_number block="%marker|set number %number| set color %colors_named"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% shim=markers::setNumberAndColor
    function setNumberAndColor(marker: Marker, number: number, bgColor: number): void;

    /**
     * Sets the shape and color that displays when the marker is detected
     */
    //% blockId=ar_set_shape block="%marker|set shape %shape|set color %colors_named"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% shape.fieldEditor="gridpicker"
    //% shape.fieldOptions.width="200" shape.fieldOptions.columns="2"
    //% shape.fieldOptions.itemColour="black" shape.fieldOptions.tooltips="true"
    //% shim=markers::setShapeAndColor
    function setShapeAndColor(marker: Marker, shape: Shape, color: number): void;

    /**
     * Allows use to define callbacks for a marker moved event
     * @param marker 
     */
    //% blockId=ar_on_move block="%marker| on move"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% shim=markers::onMoved
    function onMoved(marker: Marker, handler: () => void): void;

    /**
     * Gets the distance between the centers of 2 markers
     */
    //% blockId=ar_get_dist block="get distance from %marker1| to %marker2"
    //% marker1.fieldEditor="gridpicker"
    //% marker1.fieldOptions.width="400" marker1.fieldOptions.columns="4"
    //% marker1.fieldOptions.itemColour="black" marker1.fieldOptions.tooltips="true"
    //% marker2.fieldEditor="gridpicker"
    //% marker2.fieldOptions.width="400" marker2.fieldOptions.columns="4"
    //% marker2.fieldOptions.itemColour="black" marker2.fieldOptions.tooltips="true"
    //% shim=markers::getDistance
    function getDistance(marker1: Marker, marker2: Marker): number;

    /**
     * Gets the coordinates of a marker
     */
    //% blockId=ar_get_pos block="%marker|get position %coordinate"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% shim=markers::getPosition
    function getPosition(marker: Marker, coordinate: Coordinate): void;

}
declare namespace colors {
    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% blockId="colors_rgb" block="red %red|green %green|blue %blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% advanced=true    
    //% weight=19
    //% blockGap=8
    //% shim=colors::rgb
    function rgb(red: number, green: number, blue: number): number;

    /**
     * Get the RGB value of a known color
     */
    //% blockId=colors_named block="%color"
    //% advanced=true    
    //% weight=20
    //% blockGap=8
    //% help="colors/named"
    //% shim=TD_ID
    //% shim=colors::named
    function named(color: Colors): number;

}

// Auto-generated. Do not edit. Really.
