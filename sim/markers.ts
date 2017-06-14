namespace pxsim.markers {
    /**
     * Sets the shape and color that displays when the marker is detected
     */
    //% blockId=ar_set_shape block="%marker|set shape %shape|set color %color=colors.named"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% shape.fieldEditor="gridpicker"
    //% shape.fieldOptions.width="200" shape.fieldOptions.columns="2"
    //% shape.fieldOptions.itemColour="black" shape.fieldOptions.tooltips="true"
    export function setShapeAndColor(marker: Marker, shape: Shape, color: number){
        const m = board().marker(marker);

        let geometry	= new THREE.CubeGeometry(1,1,1);
        let material	= new THREE.MeshNormalMaterial({
            transparent : true,
            opacity: 0.5,
            side: THREE.DoubleSide
        }); 
        let mesh	= new THREE.Mesh(geometry, material);
        mesh.position.y	= geometry.parameters.height/2
        board().scene.add(mesh);
        
       /* var geometry	= new THREE.TorusKnotGeometry(0.3,0.1,64,16);
        var material	= new THREE.MeshNormalMaterial(); 
        var mesh	= new THREE.Mesh( geometry, material );
        mesh.position.y	= 0.5
        board().scene.add(mesh);*/
        
        /*board().onRenderFcts.push(function(delta: number){
            mesh.rotation.x += Math.PI*delta;
        })  */ // torus animation     
    }

   /* function createGeometry(shape: Shape) : THREE.Geometry {
    } */

    function createBox(side: number) : THREE.Geometry{
        return new THREE.BoxGeometry(side, side, side);
    }

    function createSphere(radius : number) : THREE.Geometry {
        return new THREE.SphereGeometry(radius, 32, 32);
    }

    function createCone(radius : number, height : number) : THREE.Geometry {
        return new THREE.ConeGeometry(radius, height, 32);
    }

    function createCylinder(radius : number, height : number) : THREE.Geometry {
        return new THREE.CylinderGeometry(radius, radius, height, 32);
    }

    function createTetrahedron(radius : number) : THREE.Geometry {
        return new THREE.TetrahedronGeometry(radius, 0);
    }

    function createIcosahedron(radius : number) : THREE.Geometry {
        return new THREE.IcosahedronGeometry(radius, 0);
    }

    /**
     * Sets the shape that displays when the marker is detected
     */
    //% blockId=ar_marker_on_move block="on move stub"    
    export function onMove(){

    }

    /**
     * Sets the shape that displays when the marker is detected
     */
    //% blockId=ar_marker_on_rotate block="on rotate stub"
    export function onRotate(){
        
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
