namespace pxsim.decorations {

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

}