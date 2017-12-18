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
declare namespace colors {
    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% blockId="colors_rgb" block="red %red|green %green|blue %blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% advanced=false    
    //% weight=19
    //% blockGap=8
    //% shim=colors::rgb
    function rgb(red: number, green: number, blue: number): number;

    /**
     * Get the RGB value of a known color
     */
    //% blockId=colors_named block="%color"
    //% advanced=false    
    //% weight=20
    //% blockGap=8
    //% help="colors/named"
    //% shim=TD_ID
    //% shim=colors::named
    function named(color: Colors): number;

}
declare namespace design {
    /**
     * Sets the text  that displays when the marker is detected
     */
    //% blockId=ar_set_text block="%marker=marker_block|set text %text" blockGap=8
    //% weight=98
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setText
    function setText(marker: number, text: string): void;

    /**
     * Sets the number that displays when the marker is detected
     */
    //% blockId=ar_set_number block="%marker=marker_block|set number %number" blockGap=8
    //% weight=96
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setNumber
    function setNumber(marker: number, number: number): void;

    /**
     * Sets the shape that displays when the marker is detected
     */
    //% blockId=ar_set_shape block="%marker=marker_block|set shape %shape" blockGap=8
    //% weight=100
    //% shape.fieldEditor="gridpicker"
    //% shape.fieldOptions.width="200" shape.fieldOptions.columns="2"
    //% shape.fieldOptions.itemColour="black" shape.fieldOptions.tooltips="true"
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setShape
    function setShape(marker: number, shape: Shape): void;

    /**
     * Sets the model that displays when the marker is detected. Takes in a string of the 3D model.
     */
    //% blockId=ar_set_model block="%marker=marker_block|set model %content" blockGap=8
    //% weight=20
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setModel
    function setModel(marker: number, type: ModelType, content: string): void;

    /**
     * Sets the color that displays when the marker is detected
     */
    //% blockId=ar_set_color block="%marker=marker_block|set color %color=colors_named" blockGap=8
    //% weight=99
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setColor
    function setColor(marker: number, color: number): void;

    /**
     * Sets the opacity of the shape that is displayed on the marker. 0 is invisible, 1 is fully opaque.
     * @param value How opaque the shape should be between 0 and 1, eg: 0.9
     */
    //% blockId=ar_set_opacity block="%marker=marker_block|set opacity %value" blockGap=8
    //% weight=95
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setOpacity
    function setOpacity(marker: number, value: number): void;

    /**
     * Sets the text color that displays when the marker is detected
     */
    //% blockId=ar_set_text_color block="%marker=marker_block|set text color %color=colors_named" blockGap=8
    //% weight=97
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setTextColor
    function setTextColor(marker: number, color: number): void;

    /**
     * Sets the size of the 3D object that is rendered. Shapes will automatically have a default scale value of 1.
     * @param size The amount to scale the model by, eg: 1
     */
    //% blockId=ar_set_scale block="%marker=marker_block|set scale %number" blockGap=8
    //% weight=94
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=design::setScale
    function setScale(marker: number, size: number): void;

    /**
     * Sets the size of the 3D object that is rendered. Shapes will automatically have a default scale value of (1, 1, 1).
     * @param x The amount to scale the model in the x direction, eg: 1
     * @param y The amount to scale the model in the y direction, eg: 1
     * @param z The amount to scale the model in the z direction, eg: 1
     */
    //% blockId=ar_set_scale_3d block="%marker=marker_block|set scale x: %x|y: %y|z: %z" blockGap=8
    //% blockNamespace=design advanced=true
    //% inlineInputMode="inline"
    //% shim=design::setScale3D
    function setScale3D(marker: number, x: number, y: number, z: number): void;

    /**
     * Sets the position of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default position of (0, 0, 0).
     */
    //% blockId=ar_set_position block="%marker=marker_block|set position x: %x|y: %y|z: %z" blockGap=8
    //% weight=92
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=design::setPosition
    function setPosition(marker: number, x: number, y: number, z: number): void;

    /**
     * Sets the rotation of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default rotation of 0°.
     */
    //% blockId=ar_set_rotation block="%marker=marker_block|set rotation %degrees|°" blockGap=8
    //% weight=93
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=design::setRotation
    function setRotation(marker: number, degrees: number): void;

    /**
     * Sets the rotation of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default rotation of (0, 0, 0).
     */
    //% blockId=ar_set_rotation_3d block="%marker=marker_block|set rotation x: %x|° y: %y|° z: %z|°" blockGap=8
    //% blockNamespace=design advanced=true
    //% inlineInputMode="inline"
    //% shim=design::setRotation3D
    function setRotation3D(marker: number, x: number, y: number, z: number): void;

    /**
     * Sets the filter of the video feed.
     */
    //% blockId=ar_add_filter block="add filter %filter" blockGap=8
    //% weight=91
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=design::addFilter
    function addFilter(filter: Filter): void;

    /**
     * Sets the filter of the video feed.
     */
    //% blockId=ar_remove_filter block="remove filter %filter" blockGap=8
    //% weight=90
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=design::removeFilter
    function removeFilter(filter: Filter): void;

}
declare namespace interaction {
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
    //% shim=interaction::onEvent
    function onEvent(marker: number, event: MarkerEvent, handler: () => void): void;

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
    //% shim=interaction::whileEvent
    function whileEvent(marker: number, event: MarkerLoopEvent, handler: () => void): void;

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
    //% shim=interaction::whileMultiEvent
    function whileMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: () => void): void;

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
    //% shim=interaction::onMultiEvent
    function onMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: () => void): void;

}
declare namespace markers {
    /**
     * Gets the distance between the centers of 2 markers
     */
    //% blockId=ar_get_dist block="distance from %marker1=marker_block| to %marker2=marker_block" blockGap=8
    //% weight=97
    //% shim=markers::distance
    function distance(marker1: number, marker2: number): number;

    /**
     * Gets the x, y, z positional coordinates of a marker
     */
    //% blockId=ar_get_pos block="%marker=marker_block|position %axis" blockGap=8
    //% weight=99
    //% shim=markers::position
    function position(marker: number, axis: Axes): number;

    /**
     * Gets the x, y, z rotational values of a marker
     */
    //% blockId=ar_get_rot block="%marker=marker_block|rotation %axis" blockGap=8
    //% weight=98
    //% shim=markers::rotation
    function rotation(marker: number, axis: Axes): number;

    /**
     * Maps the x, y, or z position of a marker to a specified range.
     * @param out_min The lower end of the range to map to, eg: 0
     * @param out_max The upper end of the range to map to, eg: 100
     */
    //% blockId=ar_map_pos block="%marker=marker_block|map position %axis|from %out_min|to %out_max" blockGap=8
    //% weight=96
    //% inlineInputMode="inline"
    //% shim=markers::mapPosition
    function mapPosition(marker: number, axis: Axes, out_min: number, out_max: number): number;

    /**
     * Maps the x, y, or z position of a marker to a specified range. When you rotate the marker, the lowest value will be when the marker is in it's normal orientation and will get higher as you turn it clockwise.
     * @param out_min The lower end of the range to map to, eg: 0
     * @param out_max The upper end of the range to map to, eg: 100
     */
    //% blockId=ar_map_rot block="%marker=marker_block|map rotation from %out_min|to %out_max" blockGap=8
    //% weight=95
    //% inlineInputMode="inline"
    //% shim=markers::mapRotation
    function mapRotation(marker: number, out_min: number, out_max: number): number;

    /**
     * Maps the value of 1 marker in relation to its distance between 2 markers.
     */
    //% blockId=ar_slider block="slider %marker1=marker_block|from %marker2=marker_block|to %marker3=marker_block" blockGap=8
    //% weight=94
    //% shim=markers::slider
    function slider(marker1: number, marker2: number, marker3: number): number;

}
declare namespace messaging {
    /**
     * Peer
     * @param id The value of the marker
     */
    //% blockId=peer_block block="send key %key| value %value| to %id"
    //% blockNamespace=messaging inBasicCategory=true
    //% weight=100
    //% shim=messaging::send
    function send(key: string, value: number, id: string): void;

    /**
     * Allows user to define callbacks for receive event
     * @param key 
     */
    //% blockId=peer_receive block="when I receive key %key|do" blockGap=8
    //% blockNamespace=messaging inBasicCategory=true
    //% weight=99
    //% shim=messaging::receive
    function receive(key: string, handler: () => void): void;

}
declare namespace paint {
    /**
     * Use a marker as an AR paintbrush..
     */
    //% blockId=ar_set_brush_mode block="%marker=marker_block|set brush %val" blockGap=8
    //% blockNamespace=paint inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=paint::setBrushMode
    function setBrushMode(marker: number, val: Toggle): void;

    /**
     * Set the color of your AR paintbrush.
     */
    //% blockId=ar_set_brush_color block="%marker=marker_block|set brush color %color=colors_named" blockGap=8
    //% blockNamespace=paint inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=paint::setBrushColor
    function setBrushColor(marker: number, color: number): void;

    /**
     * Clear all strokes made by your AR paintbrush.
     */
    //% blockId=ar_clear_brush_strokes block="%marker=marker_block|clear brush strokes" blockGap=8
    //% blockNamespace=paint inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=paint::clearBrushStrokes
    function clearBrushStrokes(marker: number): void;

}

// Auto-generated. Do not edit. Really.
