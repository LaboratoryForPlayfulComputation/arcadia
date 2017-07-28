namespace pxsim.paint {
    /**
     * Use a marker as an AR paintbrush..
     */
    //% blockId=ar_set_brush_mode block="%marker=marker_block|set brush %val" blockGap=8
    //% blockNamespace=paint inBasicCategory=true
    //% inlineInputMode="inline"    
    export function setBrushMode(marker: number, val: Toggle) {
        let m = board().marker(marker);
        switch (val){
            case Toggle.on:
                m.setPainting(true);
                break;
            default:
                m.setPainting(false);
        }
    }  

    /**
     * Set the color of your AR paintbrush.
     */
    //% blockId=ar_set_brush_color block="%marker=marker_block|set brush color %color=colors_named" blockGap=8
    //% blockNamespace=paint inBasicCategory=true
    //% inlineInputMode="inline"    
    export function setBrushColor(marker: number, color: number) {
        let m = board().marker(marker);
        m.setBrushColor(color);
    }

    /**
     * Clear all strokes made by your AR paintbrush.
     */
    //% blockId=ar_clear_brush_strokes block="%marker=marker_block|clear brush strokes" blockGap=8
    //% blockNamespace=paint inBasicCategory=true
    //% inlineInputMode="inline"    
    export function clearBrushStrokes(marker: number) {
        let m = board().marker(marker);
        m.clearBrushStrokes();
    }    
}