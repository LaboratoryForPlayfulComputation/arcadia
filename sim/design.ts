namespace pxsim.design {

    /**
     * Sets the text  that displays when the marker is detected
     */
    //% blockId=ar_set_text block="%marker=marker_block|set text %text" blockGap=8
    //% weight=98
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
    //% weight=96
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
    //% weight=100
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
     * Sets the model that displays when the marker is detected. Takes in a string of the 3D model.
     */
    //% blockId=ar_set_model block="%marker=marker_block|set model %content" blockGap=8
    //% weight=20
    //% blockNamespace=design inBasicCategory=true
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
    //% weight=99
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
    //% weight=95
    //% blockNamespace=design inBasicCategory=true
    export function setOpacity(marker: number, value: number) {
        let m = board().markers[marker.toString()];
        m.setOpacity(value);
        let object = m.shapeObject();
        if (object){
            object.traverse(function(child){
                if (child instanceof THREE.Mesh) child.material.opacity = value;
            });            
        }
    }

    /**
     * Sets the text color that displays when the marker is detected
     */
    //% blockId=ar_set_text_color block="%marker=marker_block|set text color %color=colors_named" blockGap=8
    //% weight=97
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
    //% weight=94
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
    //% weight=92
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
    //% weight=93
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
    //% weight=91
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline" 
    export function addFilter(filter: Filter) {
        switch (filter){
            case Filter.Grayscale:
                addFilterHelper("grayscale(100%)");
                break;
            case Filter.Invert:
                addFilterHelper("invert(100%)");
                break;
            case Filter.Saturate:
                addFilterHelper("saturate(2)");
                break;
            case Filter.HueRotate:
                addFilterHelper("hue-rotate(90deg)");
                break;  
            case Filter.Blur:
                addFilterHelper("blur(5px)");
                break;    
            case Filter.Contrast:
                addFilterHelper("contrast(200%)");
                break;       
            case Filter.Green:
                addFilterHelper("grayscale(100%) sepia(100%) hue-rotate(90deg)");
                break;                                                                  
            default:
                addFilterHelper("sepia(100%)");
        }
    }

    /**
     * Sets the filter of the video feed.
     */
    //% blockId=ar_remove_filter block="remove filter %filter" blockGap=8
    //% weight=90
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline" 
    export function removeFilter(filter: Filter) {
        switch (filter){
            case Filter.Grayscale:
                removeFilterHelper("grayscale(100%)");
                break;
            case Filter.Invert:
                removeFilterHelper("invert(100%)");
                break;
            case Filter.Saturate:
                removeFilterHelper("saturate(2)");
                break;
            case Filter.HueRotate:
                removeFilterHelper("hue-rotate(90deg)");
                break;  
            case Filter.Blur:
                removeFilterHelper("blur(5px)");
                break;    
            case Filter.Contrast:
                removeFilterHelper("contrast(200%)");
                break;       
            case Filter.Green:
                removeFilterHelper("grayscale(100%) sepia(100%) hue-rotate(90deg)");
                break;                                                                  
            default:
                removeFilterHelper("sepia(100%)");
        }
    }

    export function addFilterHelper(filter: string) {
        let canvas = document.getElementsByTagName("canvas")[0];
        let video  = document.getElementsByTagName("video")[0];
        let filterString = canvas.style.filter;
        if (canvas && video){
            if (!(filterString as any).includes(filter)){
                filterString = filterString + " " + filter;
            }
            canvas.style.filter = filterString;
            video.style.filter = filterString;
        }
    }

    export function removeFilterHelper(filter: string) {
        let canvas = document.getElementsByTagName("canvas")[0];
        let video  = document.getElementsByTagName("video")[0];
        if (canvas && video){
            let filterString = canvas.style.filter;
            if ((filterString as any).includes(filter)){
                filterString = filterString.replace(filter, "");
            }
            canvas.style.filter = filterString;
            video.style.filter = filterString;
        }
    }

    export function removeAllFilters() {
        removeFilter(Filter.Grayscale);
        removeFilter(Filter.Invert);
        removeFilter(Filter.Saturate);
        removeFilter(Filter.HueRotate);
        removeFilter(Filter.Blur);
        removeFilter(Filter.Contrast);
        removeFilter(Filter.Green);
        removeFilter(Filter.Sepia);
    }

}