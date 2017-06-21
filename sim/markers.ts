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
     * Sets the text  that displays when the marker is detected
     */
    //% blockId=ar_set_text block="%marker=marker_block|set text %text" blockGap=8
    export function setText(marker: number, text: string) {
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
    //% blockId=ar_set_number block="%marker=marker_block|set number %number" blockGap=8
    export function setNumber(marker: number, number: number) {
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
    //% blockId=ar_set_shape block="%marker=marker_block|set shape %shape" blockGap=8
    //% shape.fieldEditor="gridpicker"
    //% shape.fieldOptions.width="200" shape.fieldOptions.columns="2"
    //% shape.fieldOptions.itemColour="black" shape.fieldOptions.tooltips="true"
    export function setShape(marker: number, shape: Shape) {
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
    //% blockId=ar_set_color block="%marker=marker_block|set color %color" blockGap=8
    export function setColor(marker: number, color: number) {
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
    //% blockId=ar_set_text_color block="%marker=marker_block|set text color %color" blockGap=8
    export function setTextColor(marker: number, color: number) {
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
