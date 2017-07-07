namespace pxsim.colors {
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
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    /**
     * Get the RGB value of a known color
    */
    //% blockId=colors_named block="%color"
    //% advanced=false    
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

    /**
     * Sets the color that displays when the marker is detected
     */
    //% blockId=ar_set_color block="%marker=marker_block|set color %color" blockGap=8
    //% blockNamespace=markers advanced=true
    export function setColor(marker: number, color: number) {
        let m = board().markers[marker.toString()];
        m.setColor(color);
        let object = m.shapeObject();
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
    //% blockNamespace=markers advanced=true
    export function setTextColor(marker: number, color: number) {
        let m = board().marker(marker);
        m.setFontColor(color);        
        let object = m.textObject();
        if (object)
            (object as any).material = new THREE.MeshBasicMaterial({transparent: true,
                                                                    opacity: 5,
                                                                    color: color,
                                                                    side: THREE.DoubleSide});
    } 

}
