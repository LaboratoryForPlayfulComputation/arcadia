namespace pxsim.ui {

    /**
     * Maps the value of 1 marker in relation to its distance between 2 markers.
     */
    //% blockId=ar_slider block="slider %marker1=marker_block|from %marker2=marker_block|to %marker3=marker_block" blockGap=8
    export function slider(marker1: number, marker2: number, marker3: number) : number{
        let m1 = board().marker(marker1);
        let m2 = board().marker(marker2);
        let m3 = board().marker(marker3);
        let sliderVal  = 0;
        let totalDist = markers.distance(m2.code(), m3.code());
        let sliderDist = markers.distance(m1.code(), m2.code());
        if (totalDist > 0 && sliderDist != -9999)
            sliderVal = sliderDist / totalDist;
        return sliderVal;    
    }

    export function knob(){
        
    }

}