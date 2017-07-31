namespace pxsim.fx {

    /**
    * Add an effect to a sequence.
    * @param name name of the phrase
    * @param effect which drum sound to use
    */
    //% blockId=music_add_effect_seq block="add %effect|to %name" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"  
    /*
    export function addEffectSeq(effect: Effect, name: string) {
        let phrase = board().phrase(name);
        if (phrase) phrase.addEffect(effect);
    }
    */

    /**
    * Remove an effect from a sequence.
    * @param name name of the phrase
    * @param effect which drum sound to use
    */
    //% blockId=music_rem_effect_seq block="remove %effect|from %name" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"  
    /*
    export function removeEffectSeq(effect: Effect, name: string) {
        let phrase = board().phrase(name);
        if (phrase) phrase.removeEffect(effect);
    }
    */

    /**
    * Add an effect to every active instrument.
    * @param effect which effect to use
    */
    //% blockId=music_add_effect_global block="add effect %effect" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"  
    export function addGlobalEffect(effect: Effect) {
        // Iterate over phrases and add fx to them
        let phrases = board().phrases;
        for (var phrase in phrases){
            phrases[phrase].addEffect(effect);
        }
        // Add fx to all of the boards instruments and oscillators 
        let fx = tone.createEffect(effect);
        for (let i = 0; i < board().instruments.length; i++)
            board().instruments[i].connect(fx);
        for (var osc in board().oscillators)
            board().oscillators[osc].connect(fx);
    }

    /**
    * Remove an effect to every active instrument.
    * @param effect which effect to use
    */
    //% blockId=music_rem_effect_global block="remove effect %effect" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"  
    export function removeGlobalEffect(effect: Effect) {
        var type: string;
        switch(effect){
            case Effect.Chorus: 
                type = "chorus";
                break;
            case Effect.Delay:
                type = "delay";
                break;
            case Effect.Distortion:
                type = "distortion";
                break;
            case Effect.Phaser:
                type = "phaser";
                break;
            default:
                type = "reverb";
                break;
            }

        for (let i = 0; i < board().instruments.length; i++)
            board().instruments[i].disconnect(board().fx[type]);
        for (var osc in board().oscillators)
            board().oscillators[osc].disconnect(board().fx[type]);

        let phrases = board().phrases;
        for (var phrase in phrases){
            let p = phrases[phrase];
            if (p) p.removeEffect(effect);
        }
    }

}