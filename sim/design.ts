namespace pxsim.design {

    /**
     * Sets the text  that displays when the marker is detected
     */
    //% blockId=ar_set_text block="%marker=marker_block|set text %text" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    export function setText(marker: number, text: string) {
        let m = board().marker(marker);
        let billboardMesh = three.createBillboard(marker, m.color());
        let textMesh = three.createText(text, m.fontColor(), marker);
        let group = m.group();
        billboardMesh.name = marker.toString() + '-shape';
        billboardMesh.rotation.x = Math.PI / 2;
        textMesh.name = marker.toString() + '-text';
        textMesh.rotation.x = -Math.PI / 2;
        textMesh.position.z += 0.25;
        textMesh.position.x -= 0.5;
        three.removeShapeFromMarker(marker);
        three.removeTextFromMarker(marker);
        group.add(billboardMesh);
        group.add(textMesh);
    }

    /**
     * Sets the number that displays when the marker is detected
     */
    //% blockId=ar_set_number block="%marker=marker_block|set number %number" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    export function setNumber(marker: number, number: number) {
        let m = board().marker(marker);
        let billboardMesh = three.createBillboard(marker, m.color());
        let textMesh = three.createText(number.toString(), m.fontColor(), marker);
        billboardMesh.name = marker.toString() + '-shape';
        billboardMesh.rotation.x = Math.PI / 2;
        textMesh.name = marker.toString() + '-text';
        textMesh.rotation.x = -Math.PI / 2;
        textMesh.position.z += 0.25;
        textMesh.position.x -= 0.5;
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
    //% blockNamespace=design inBasicCategory=true
    export function setShape(marker: number, shape: Shape) {
        let m = board().marker(marker);
        let geometry = three.createGeometry(shape);
        let material = new THREE.MeshPhongMaterial({
            transparent: true,
            opacity: m.opacity(),
            color: m.color(),
            side: THREE.DoubleSide
        });
        let mesh = new THREE.Mesh(geometry, material);
        m.setAutoScale(1);
        mesh.scale.set(m.scaleX(), m.scaleY(), m.scaleZ());
        mesh.name = marker.toString() + '-shape';
        mesh.position.y += 0.5;
        mesh.position.y += m.posY();
        mesh.position.x += m.posX();
        mesh.position.z += m.posZ();
        three.removeShapeFromMarker(marker);
        m.group().add(mesh);
    }

    /**
 * Sets the shape that displays when the marker is detected
 */
    //% blockId=ar_set_model block="%marker=marker_block|set model %type|%content" blockGap=8
    //% blockNamespace=design advanced=true
    export function setModel(marker: number, type: ModelType, content: string) {
        const m = board().marker(marker);
        const mod = three.loadModel(type, content)
        let material = new THREE.MeshPhongMaterial({
            transparent: true,
            opacity: m.opacity(),
            color: m.color(),
            side: THREE.DoubleSide
        });
        mod.traverse(function(child){
            if (child instanceof THREE.Mesh) child.material = material;
        });        
        const boundingBox  = new THREE.Box3().setFromObject(mod);
        const maxDimension = Math.max(boundingBox.max.x, boundingBox.max.y, boundingBox.max.z);
        let autoScale      = 1;
        if (maxDimension > 1) autoScale = maxDimension / 1.25;
        else if (maxDimension < 0.5) autoScale = maxDimension * 2;
        m.setAutoScale(autoScale);
        mod.scale.set(m.scaleX()/autoScale, m.scaleY()/autoScale, m.scaleZ()/autoScale);
        mod.name = marker.toString() + '-model';
        mod.position.y += 0.5;
        mod.position.y += m.posY();
        mod.position.x += m.posX();
        mod.position.z += m.posZ();
        three.removeShapeFromMarker(marker);
        m.group().add(mod);
    }

    /**
     * Sets the color that displays when the marker is detected
     */
    //% blockId=ar_set_color block="%marker=marker_block|set color %color=colors_named" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    export function setColor(marker: number, color: number) {
        let m = board().markers[marker.toString()];
        m.setColor(color);
        let object = m.shapeObject();
        if (object){
            let mat = new THREE.MeshPhongMaterial({
                transparent: true,
                opacity: m.opacity(),
                color: color,
                side: THREE.DoubleSide
            });
            object.traverse(function(child){
                if (child instanceof THREE.Mesh) child.material = mat;
            });
        }
    }

    /**
     * Sets the opacity of the shape that is displayed on the marker. 0 is invisible, 1 is fully opaque.
     * @param value How opaque the shape should be between 0 and 1, eg: 0.9
     */
    //% blockId=ar_set_opacity block="%marker=marker_block|set opacity %value" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    export function setOpacity(marker: number, value: number) {
        let m = board().markers[marker.toString()];
        m.setOpacity(value);
        let object = m.shapeObject();
        if (object) (object as any).material.opacity = value;
    }

    /**
     * Sets the text color that displays when the marker is detected
     */
    //% blockId=ar_set_text_color block="%marker=marker_block|set text color %color=colors_named" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    export function setTextColor(marker: number, color: number) {
        let m = board().marker(marker);
        m.setFontColor(color);
        let object = m.textObject();
        if (object)
            (object as any).material = new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 5,
                color: color,
                side: THREE.DoubleSide
            });
    }

    /**
     * Sets the size of the 3D object that is rendered. Shapes will automatically have a default scale value of 1.
     * @param size The amount to scale the model by, eg: 1
     */
    //% blockId=ar_set_scale block="%marker=marker_block|set scale %number" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"    
    export function setScale(marker: number, size: number) {
        let m = board().marker(marker);
        m.setScale(size);
        let object = m.shapeObject();
        if (object) object.scale.set(m.scaleX(), m.scaleY(), m.scaleZ());
    }

    /**
     * Sets the size of the 3D object that is rendered. Shapes will automatically have a default scale value of (1, 1, 1).
     * @param x The amount to scale the model in the x direction, eg: 1
     * @param y The amount to scale the model in the y direction, eg: 1
     * @param z The amount to scale the model in the z direction, eg: 1
     */
    //% blockId=ar_set_scale_3d block="%marker=marker_block|set scale x: %x|y: %y|z: %z" blockGap=8
    //% blockNamespace=design advanced=true
    //% inlineInputMode="inline"   
    export function setScale3D(marker: number, x: number, y: number, z: number) {
        let m = board().marker(marker);
        m.setScale(x, y, z);
        let object = m.shapeObject();
        if (object) object.scale.set(m.scaleX(), m.scaleY(), m.scaleZ());
    }

    /**
     * Sets the position of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default position of (0, 0, 0).
     */
    //% blockId=ar_set_position block="%marker=marker_block|set position x: %x|y: %y|z: %z" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"    
    export function setPosition(marker: number, x: number, y: number, z: number) {
        let m = board().marker(marker);
        m.setPosition(x, y, z);
        let object = m.shapeObject();
        if (object) {
            object.position.x += x;
            object.position.y += y;
            object.position.z += z;
        }
    }

    /**
     * Sets the rotation of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default rotation of 0°.
     */
    //% blockId=ar_set_rotation block="%marker=marker_block|set rotation %degrees|°" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"    
    export function setRotation(marker: number, degrees: number) {
        let m = board().marker(marker);
        m.setRotation(degrees);
        let object = m.shapeObject();
        if (object) {
            object.rotation.x = m.rotX();
            object.rotation.y = m.rotY();
            object.rotation.z = m.rotZ();
        }
    }

    /**
     * Sets the rotation of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default rotation of (0, 0, 0).
     */
    //% blockId=ar_set_rotation_3d block="%marker=marker_block|set rotation x: %x|° y: %y|° z: %z|°" blockGap=8
    //% blockNamespace=design advanced=true
    //% inlineInputMode="inline"    
    export function setRotation3D(marker: number, x: number, y: number, z: number) {
        let m = board().marker(marker);
        m.setRotation(x, y, z);
        let object = m.shapeObject();
        if (object) {
            object.rotation.x = m.rotX();
            object.rotation.y = m.rotY();
            object.rotation.z = m.rotZ();
        }
    }


    /**
     * Sets the filter of the video feed.
     */
    //% blockId=ar_add_filter block="add filter %filter" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline" 
    export function addFilter(filter: Filter) {
        switch (filter){
            case Filter.Grayscale:
                //document.body.style.filter = "grayscale(100%)"; // works
                pxsim.U.addClass(document.body, "grayscale-sim"); // doesn't work
                break;
            case Filter.Invert:
                pxsim.U.addClass(document.body, "invert-sim");
                break;
            case Filter.Saturate:
                pxsim.U.addClass(document.body, "saturate-sim");
                break;
            case Filter.HueRotate:
                pxsim.U.addClass(document.body, "huerotate-sim");
                break;  
            case Filter.Blur:
                pxsim.U.addClass(document.body, "blur-sim");
                break;    
            case Filter.Contrast:
                pxsim.U.addClass(document.body, "highcontrast-sim");
                break;       
            case Filter.Green:
                pxsim.U.addClass(document.body, "green-sim");
                break;                                                                  
            default:
                pxsim.U.addClass(document.body, "sepia-sim");
        }
    }

    /**
     * Sets the filter of the video feed.
     */
    //% blockId=ar_remove_filter block="remove filter %filter" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline" 
    export function removeFilter(filter: Filter) {
        switch (filter){
            case Filter.Grayscale:
                pxsim.U.removeClass(document.body, "grayscale-sim");
                break;
            case Filter.Invert:
                pxsim.U.removeClass(document.body, "invert-sim");
                break;
            case Filter.Saturate:
                pxsim.U.removeClass(document.body, "saturate-sim");
                break;
            case Filter.HueRotate:
                pxsim.U.removeClass(document.body, "huerotate-sim");
                break;  
            case Filter.Blur:
                pxsim.U.removeClass(document.body, "blur-sim");
                break;    
            case Filter.Contrast:
                pxsim.U.removeClass(document.body, "highcontrast-sim");
                break;        
            case Filter.Green:
                pxsim.U.removeClass(document.body, "green-sim");
                break;                                                                  
            default:
                pxsim.U.removeClass(document.body, "sepia-sim");
        }
    }

}