namespace pxsim.decorations {

    /**
     * Sets the text  that displays when the marker is detected
     */
    //% blockId=ar_set_text block="%marker=marker_block|set text %text" blockGap=8
    //% blockNamespace=markers advanced=true
    export function setText(marker: number, text: string) {
        let m = board().marker(marker);
        let billboardMesh = three.createBillboard(marker, m.color());
        let textMesh      = three.createText(text, m.fontColor(), marker);
        let group         = m.group();
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
    //% blockNamespace=markers advanced=true
    export function setNumber(marker: number, number: number) {
        let m = board().marker(marker);   
        let billboardMesh = three.createBillboard(marker, m.color());
        let textMesh      = three.createText(number.toString(), m.fontColor(), marker);
        billboardMesh.name       = marker.toString() + '-shape';
        billboardMesh.rotation.x = Math.PI / 2;
        textMesh.name            = marker.toString() + '-text';
        textMesh.rotation.x      = -Math.PI / 2;
        textMesh.position.z      += 0.25;
        textMesh.position.x      -= 0.5;  
        three.removeShapeFromMarker(marker);
        three.removeTextFromMarker(marker);              
        m.group().add(billboardMesh);
        m.group().add(textMesh);
    }

    /**
     * Sets the shape that displays when the marker is detected
     */
    //% blockId=ar_set_shape block="%marker=marker_block|set shape %shape" blockGap=8
    //% shape.fieldEditor="gridpicker"
    //% shape.fieldOptions.width="200" shape.fieldOptions.columns="2"
    //% shape.fieldOptions.itemColour="black" shape.fieldOptions.tooltips="true"
    //% blockNamespace=markers advanced=true
    export function setShape(marker: number, shape: Shape) {
        let m = board().marker(marker);
        let geometry    = three.createGeometry(shape);
        let material    = new THREE.MeshPhongMaterial({transparent: true,
                                                        opacity: 0.9,
                                                         color: m.color(),
                                                          side: THREE.DoubleSide});
        let mesh        = new THREE.Mesh(geometry, material);
        mesh.name       = marker.toString() + '-shape';
        mesh.position.y += 0.5;
        three.removeShapeFromMarker(marker);
        m.group().add(mesh);
    }

}