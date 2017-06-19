namespace pxsim.markers {
    /**
     * Sets the string and color that displays when the marker is detected
     */
    //% blockId=ar_set_string block="%marker|set string %text| font color %textColor| background %bgColor"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% async
    export function setStringAndColorAsync(marker: Marker, text: string, textColor: number, bgColor: number): Promise<void> {
        const m = board().marker(marker);
        let billboardMesh = three.createBillboard(marker, bgColor);
        return createTextAsync(text, textColor, marker)
            .then(textMesh => {
                billboardMesh.rotation.x = Math.PI / 2;
                let group = board().markerStates[marker.toString()]['group'];
                let object = group.getObjectByName(marker.toString() + '-shape');
                if (object) {
                    three.removeObjectFromGroup(group, object);
                }
                billboardMesh.name = marker.toString() + '-shape';
                group.add(billboardMesh);
            });
    }

    /**
     * Sets the number and color that displays when the marker is detected
     */
    //% blockId=ar_set_number block="%marker|set number %number| font color %textColor| background %bgColor"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    //% async
    export function setNumberAndColorAsync(marker: Marker, number: number, textColor: number, bgColor: number) {
        const m = board().marker(marker);
        let billboardMesh = three.createBillboard(marker, bgColor);
        return createTextAsync(number.toString(), textColor, marker)
            .then(textMesh => {
                let group = board().markerStates[marker.toString()]['group'];
                let object = group.getObjectByName(marker.toString() + '-shape');
                if (object) {
                    three.removeObjectFromGroup(group, object);
                }
                billboardMesh.name = marker.toString() + '-shape';
                billboardMesh.rotation.x = Math.PI / 2;
                group.add(billboardMesh);
            });
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
    export function setShapeAndColor(marker: Marker, shape: Shape, color: number) {
        const m = board().marker(marker);

        let geometry = three.createGeometry(shape);
        let material = new THREE.MeshPhongMaterial({
            transparent: true,
            opacity: 0.9,
            color: color,
            side: THREE.FrontSide
        });
        let group = board().markerStates[marker.toString()]['group'];
        let object = group.getObjectByName(marker.toString() + '-shape');
        if (object) {
            three.removeObjectFromGroup(group, object);
        }
        let mesh = new THREE.Mesh(geometry, material);
        mesh.name = marker.toString() + '-shape';
        mesh.position.y += 0.5;
        group.add(mesh);
    }

    function loadFontAsync(): Promise<THREE.Font> {
        let loader = new THREE.FontLoader();
        return new Promise<THREE.Font>((resolve, reject) => {
            loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
                resolve(loader.parse(font));
            }, null, e => reject(e));
        });
    }

    function createTextAsync(text: string, color: number, marker: Marker): Promise<void> {
        return loadFontAsync()
            .then(font => {
                let text3d = new THREE.TextGeometry(text, {
                    size: 0.25,
                    bevelEnabled: false,
                    bevelThickness: 3,
                    bevelSize: 1,
                    height: 0.025,
                    curveSegments: 2,
                    font: font
                });
                let material = new THREE.MeshBasicMaterial({
                    transparent: true,
                    opacity: 5,
                    color: color,
                    side: THREE.DoubleSide
                });
                let group = board().markerStates[marker.toString()]['group'];
                let object = group.getObjectByName(marker.toString() + '-text');
                if (object) {
                    three.removeObjectFromGroup(group, object);
                }
                let textMesh = new THREE.Mesh(text3d, material);
                textMesh.name = marker.toString() + '-text';
                textMesh.rotation.x = -Math.PI / 2;
                textMesh.position.z += 0.25;
                textMesh.position.x -= 0.5;
                board().markerStates[marker.toString()]['group'].add(textMesh);
            })
    }

    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_on_move block="on %marker| %event"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"    
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    export function onEvent(marker: Marker, event: MarkerEvent, handler: RefAction) {
        board().bus.listen(marker, event, handler);
        // to trigger this...
        // board().bus.queue(marker, MarkerMoved);
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
        const dist = board().getDistanceBetweenMarkers(marker1, marker2);
        return dist;
    }

    /**
     * Gets the coordinates of a marker
     */
    //% blockId=ar_get_pos block="%marker|position %axis"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"
    export function position(marker: Marker, axis: Coordinate): number {
        const pos = board().getMarkerPosition(marker);
        switch(axis) {
            case Coordinate.x: return pos.x;
            case Coordinate.y: return pos.y;
            default: return pos.z;
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
