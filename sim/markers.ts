namespace pxsim.markers {
    /**
     * Sets the text  that displays when the marker is detected
     */
    //% blockId=ar_set_text block="%marker|set text %text"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function setText(marker: Marker, text: string) {
        board().marker(marker);
        let billboardMesh = three.createBillboard(marker, 0x000000);
        let textMesh      = three.createText(text, 0xffffff, marker);
        let group         = threex.getMarkerGroup(marker);
        billboardMesh.name       = marker.toString() + '-shape';
        billboardMesh.rotation.x = Math.PI / 2;
        textMesh.name            = marker.toString() + '-text';
        textMesh.rotation.x      = -Math.PI / 2;
        textMesh.position.z      += 0.25;
        textMesh.position.x      -= 0.5; 
        three.removeShapeFromMarker(marker);
        three.removeTextFromMarker(marker);                 
        group.add(billboardMesh);
        group.add(textMesh);
    }

    /**
     * Sets the number that displays when the marker is detected
     */
    //% blockId=ar_set_number block="%marker|set number %number"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function setNumber(marker: Marker, number: number) {
        board().marker(marker);
        let markerState   = board().markers[marker.toString()];   
        let billboardMesh = three.createBillboard(marker, markerState['color']);
        let textMesh      = three.createText(number.toString(), markerState['fontColor'], marker);
        let group         = threex.getMarkerGroup(marker);
        billboardMesh.name       = marker.toString() + '-shape';
        billboardMesh.rotation.x = Math.PI / 2;
        textMesh.name            = marker.toString() + '-text';
        textMesh.rotation.x      = -Math.PI / 2;
        textMesh.position.z      += 0.25;
        textMesh.position.x      -= 0.5;  
        three.removeShapeFromMarker(marker);
        three.removeTextFromMarker(marker);              
        group.add(billboardMesh);
        group.add(textMesh);
    }

    /**
     * Sets the shape that displays when the marker is detected
     */
    //% blockId=ar_set_shape block="%marker|set shape %shape"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% shape.fieldEditor="gridpicker"
    //% shape.fieldOptions.width="200" shape.fieldOptions.columns="2"
    //% shape.fieldOptions.itemColour="black" shape.fieldOptions.tooltips="true"
    export function setShape(marker: Marker, shape: Shape) {
        board().marker(marker);
        let markerState = board().markers[marker.toString()];        
        let geometry    = three.createGeometry(shape);
        let material    = new THREE.MeshPhongMaterial({transparent: true,
                                                        opacity: 0.9,
                                                         color: markerState['color'],
                                                          side: THREE.DoubleSide});
        let group       = threex.getMarkerGroup(marker);
        let mesh        = new THREE.Mesh(geometry, material);
        mesh.name       = marker.toString() + '-shape';
        mesh.position.y += 0.5;
        three.removeShapeFromMarker(marker);
        group.add(mesh);
    }

    /**
     * Sets the color that displays when the marker is detected
     */
    //% blockId=ar_set_color block="%marker|set color %color"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function setColor(marker: Marker, color: number) {
        board().marker(marker);
        let markerState      = board().markers[marker.toString()];
        markerState['color'] = color;
        let group            = threex.getMarkerGroup(marker);
        let object           = group.getObjectByName(marker.toString() + '-shape');
        if (object)
            (object as any).material = new THREE.MeshPhongMaterial({transparent: true,
                                                                     opacity: 0.9,
                                                                      color: color,
                                                                       side: THREE.DoubleSide});
    }   

    /**
     * Sets the text color that displays when the marker is detected
     */
    //% blockId=ar_set_text_color block="%marker|set text color %color"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function setTextColor(marker: Marker, color: number) {
        board().marker(marker);
        let group                = threex.getMarkerGroup(marker);
        let markerState          = board().markers[marker.toString()];
        markerState['fontColor'] = color;        
        let object               = group.getObjectByName(marker.toString() + '-text');
        if (object)
            (object as any).material = new THREE.MeshBasicMaterial({transparent: true,
                                                                     opacity: 5,
                                                                      color: color,
                                                                       side: THREE.DoubleSide});
    }  

    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_on_event block="on %marker| %event"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"    
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    export function onEvent(marker: Marker, event: MarkerEvent, handler: RefAction) {
        board().marker(marker);
        board().bus.listen(marker, event, handler);
    }

    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_while_event block="while %marker| %event"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"    
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    export function whileEvent(marker: Marker, event: MarkerLoopEvent, handler: RefAction) {
        board().marker(marker);
        board().bus.listen(marker, event, handler);
    }

    /**
     * Allows use to define callbacks for multi marker event
     * @param marker 
     */
    //% blockId=ar_on_multi_event block="on %marker1| %event| %marker2"
    //% marker1.fieldEditor="gridpicker"
    //% marker1.fieldOptions.width="400" marker1.fieldOptions.columns="4"
    //% marker1.fieldOptions.itemColour="black" marker1.fieldOptions.tooltips="true" 
    //% marker2.fieldEditor="gridpicker"
    //% marker2.fieldOptions.width="400" marker2.fieldOptions.columns="4"
    //% marker2.fieldOptions.itemColour="black" marker2.fieldOptions.tooltips="true"          
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    export function onMultiEvent(marker1: Marker, marker2: Marker, event: MultiMarkerEvent, handler: RefAction) {
        board().marker(marker1);
        board().marker(marker2);
        board().bus.listen(marker1, event, handler);
        board().bus.listen(marker2, event, handler);
    }

    /**
     * Gets the distance between the centers of 2 markers
     */
    //% blockId=ar_get_dist block="distance from %marker1| to %marker2"
    //% marker1.fieldEditor="gridpicker"
    //% marker1.fieldOptions.width="400" marker1.fieldOptions.columns="4"
    //% marker1.fieldOptions.itemColour="black" marker1.fieldOptions.tooltips="true"
    //% marker2.fieldEditor="gridpicker"
    //% marker2.fieldOptions.width="400" marker2.fieldOptions.columns="4"
    //% marker2.fieldOptions.itemColour="black" marker2.fieldOptions.tooltips="true"    
    export function distance(marker1: Marker, marker2: Marker): number {
        board().marker(marker1);
        board().marker(marker2);        
        return board().getDistanceBetweenMarkers(marker1, marker2);
    }

    /**
     * Gets the x, y, z positional coordinates of a marker
     */
    //% blockId=ar_get_pos block="%marker|position %axis"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function position(marker: Marker, axis: Axes): number {
        board().marker(marker);
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
    //% blockId=ar_get_rot block="%marker|rotation %axis"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function rotation(marker: Marker, axis: Axes): number {
        board().marker(marker);
        const rot = board().getMarkerRotation(marker);
        switch(axis) {
            case Axes.x: return rot.x;
            case Axes.y: return rot.y;
            default:     return rot.z;
        }
    }    

}

namespace pxsim.colors {
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
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    /**
     * Get the RGB value of a known color
    */
    //% blockId=colors_named block="%color"
    //% advanced=true    
    //% weight=20
    //% blockGap=8
    //% help="colors/named"
    //% shim=TD_ID
    export function named(color: Colors): number {
        return color;
    }

    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb >> 0) & 0xFF;
        return b;
    }
}
