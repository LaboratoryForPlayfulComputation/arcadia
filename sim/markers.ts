namespace pxsim.markers {
    /**
     * Sets the string and color that displays when the marker is detected
     */
    //% blockId=ar_set_string block="%marker|set string %text| set color %colors_named"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function setStringAndColor(marker: Marker, text: string, bgColor: number){
        const m = board().marker(marker);
        let billboardMesh = createBillboard(marker, bgColor);
        let textMesh = createText(text, 0xffffff, marker);
        billboardMesh.rotation.x = Math.PI / 2;
        let group = board().markerStates[marker.toString()]['group'];
        clearGroup(group);
        group.add(billboardMesh);
    }

    /**
     * Sets the number and color that displays when the marker is detected
     */
    //% blockId=ar_set_number block="%marker|set number %number| set color %colors_named"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function setNumberAndColor(marker: Marker, number: number, bgColor: number){ //textColor: number, 
        const m = board().marker(marker);
        let billboardMesh = createBillboard(marker, bgColor);
        let textMesh = createText(number.toString(), 0xffffff, marker);
        billboardMesh.rotation.x = Math.PI / 2;
        let group = board().markerStates[marker.toString()]['group'];
        clearGroup(group);
        group.add(billboardMesh);
    }

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
    export function setShapeAndColor(marker: Marker, shape: Shape, color: number){
        const m = board().marker(marker);

        let geometry	= createGeometry(shape);
        let material	= new THREE.MeshBasicMaterial({
            transparent : true,
            opacity: 0.5,
            color: color,
            side: THREE.DoubleSide
        }); 
        let mesh	= new THREE.Mesh(geometry, material);
        let group = board().markerStates[marker.toString()]['group'];
        clearGroup(group);
        group.add(mesh);
    }    

    function createGeometry(shape: Shape) : THREE.Geometry {
        let cmds = [createBox, createSphere, createCone, createCylinder, createTetrahedron, createIcosahedron];
        return cmds[shape]();
    } 

    function createBox() : THREE.Geometry{
        return new THREE.BoxGeometry(1, 1, 1);
    }

    function createSphere() : THREE.Geometry {
        return new THREE.SphereGeometry(1, 32, 32);
    }

    function createCone() : THREE.Geometry {
        return new THREE.ConeGeometry(0.5, 1, 32);
    }

    function createCylinder() : THREE.Geometry {
        return new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    }

    function createTetrahedron() : THREE.Geometry {
        return new THREE.TetrahedronGeometry(1, 0);
    }

    function createIcosahedron() : THREE.Geometry {
        return new THREE.IcosahedronGeometry(1, 0);
    }

    function createPlane() : THREE.Geometry {
        return new THREE.PlaneGeometry(1, 1, 32);        
    }

    function clearGroup(group : THREE.Group){
        while (group.children.length){
            board().scene.remove(group.children[0]);
            group.remove(group.children[0]);
        }        
    }

    function createBillboard(marker: Marker, color: number) : THREE.Mesh {
        const m = board().marker(marker);
        var geometry = createPlane();
        var material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
        var billboard = new THREE.Mesh( geometry, material );        
        return billboard;
    }

    function createText(text: string, color: number, marker: Marker) {
        var loader = new THREE.FontLoader();
        loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
            var text3d = new THREE.TextGeometry(text, {
                    size: 0.25,
                    height: 0.025,
                    curveSegments: 2,
                    font: font 
            });   
            let material	= new THREE.MeshBasicMaterial({
                transparent : true,
                opacity: 5,
                color: color,
                side: THREE.DoubleSide
            }); 
            let textMesh	= new THREE.Mesh(text3d, material);            
            textMesh.rotation.x = -Math.PI / 2;
            textMesh.position.z += 0.25; 
            textMesh.position.x -= 0.5; 
            board().markerStates[marker.toString()]['group'].add(textMesh);                                  
        } );        
    }

    /**
     * Allows use to define callbacks for a marker moved event
     * @param marker 
     */
    //% blockId=ar_on_move block="%marker| on move"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"    
    export function onMoved(marker: Marker, handler: RefAction){
        // TO DO: map functions to the actual marker moved event

    }

    /**
     * Gets the x coordinates of a marker
     */
    //% blockId=ar_get_pos_x block="%marker|get X position"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function getPositionX(marker: Marker) : number {
        const pos = board().getMarkerPosition(marker);
        return pos.x;
    }   

    /**
     * Gets the y coordinates of a marker
     */
    //% blockId=ar_get_pos_y block="%marker|get Y position"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function getPositionY(marker: Marker) : number {
        const pos = board().getMarkerPosition(marker);
        return pos.y;
    } 

    /**
     * Gets the z coordinates of a marker
     */
    //% blockId=ar_get_pos_z block="%marker|get Z position"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function getPositionZ(marker: Marker) : number {
        const pos = board().getMarkerPosition(marker);
        console.log(pos.z.toString());
        return pos.z;
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
