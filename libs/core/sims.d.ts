// Auto-generated from simulator. Do not edit.
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

}
declare namespace console {
    /**
     * Print out message
     */
    //%
    //% shim=console::log
    function log(msg: string): void;

}
declare namespace colors {
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
    //% shim=colors::rgb
    function rgb(red: number, green: number, blue: number): number;

    /**
     * Get the RGB value of a known color
     */
    //% blockId=colors_named block="%color"
    //% advanced=false    
    //% weight=20
    //% blockGap=8
    //% help="colors/named"
    //% shim=TD_ID
    //% shim=colors::named
    function named(color: Colors): number;

}
declare namespace design {
    /**
     * Sets the text  that displays when the marker is detected
     */
    //% blockId=ar_set_text block="%marker=marker_block|set text %text" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setText
    function setText(marker: number, text: string): void;

    /**
     * Sets the number that displays when the marker is detected
     */
    //% blockId=ar_set_number block="%marker=marker_block|set number %number" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setNumber
    function setNumber(marker: number, number: number): void;

    /**
     * Sets the shape that displays when the marker is detected
     */
    //% blockId=ar_set_shape block="%marker=marker_block|set shape %shape" blockGap=8
    //% shape.fieldEditor="gridpicker"
    //% shape.fieldOptions.width="200" shape.fieldOptions.columns="2"
    //% shape.fieldOptions.itemColour="black" shape.fieldOptions.tooltips="true"
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setShape
    function setShape(marker: number, shape: Shape): void;

    /**
     * Sets the color that displays when the marker is detected
     */
    //% blockId=ar_set_color block="%marker=marker_block|set color %color=colors_named" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setColor
    function setColor(marker: number, color: number): void;

    /**
     * Sets the opacity of the shape that is displayed on the marker. 0 is invisible, 1 is fully opaque. The default value is 0.9.
     */
    //% blockId=ar_set_opacity block="%marker=marker_block|set opacity %value" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setOpacity
    function setOpacity(marker: number, value: number): void;

    /**
     * Sets the text color that displays when the marker is detected
     */
    //% blockId=ar_set_text_color block="%marker=marker_block|set text color %color=colors_named" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% shim=design::setTextColor
    function setTextColor(marker: number, color: number): void;

    /**
     * Sets the size of the 3D object that is rendered. Shapes will automatically have a default scale value of (1, 1, 1).
     */
    //% blockId=ar_set_scale block="%marker=marker_block|set scale x: %x|y: %y|z: %z" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=design::setScale
    function setScale(marker: number, x: number, y: number, z: number): void;

    /**
     * Sets the position of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default position of (0, 0, 0).
     */
    //% blockId=ar_set_position block="%marker=marker_block|set position x: %x|y: %y|z: %z" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=design::setPosition
    function setPosition(marker: number, x: number, y: number, z: number): void;

    /**
     * Sets the rotation of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default rotation of (0, 0, 0).
     */
    //% blockId=ar_set_rotation block="%marker=marker_block|set rotation x: %x|y: %y|z: %z" blockGap=8
    //% blockNamespace=design inBasicCategory=true
    //% inlineInputMode="inline"
    //% shim=design::setRotation
    function setRotation(marker: number, x: number, y: number, z: number): void;

}
declare namespace events {
    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_on_event block="on %marker=marker_block|%event |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"
    //% shim=events::onEvent
    function onEvent(marker: number, event: MarkerEvent, handler: () => void): void;

    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_while_event block="while %marker=marker_block|%event |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"
    //% shim=events::whileEvent
    function whileEvent(marker: number, event: MarkerLoopEvent, handler: () => void): void;

    /**
     * Allows user to define callbacks that fire while the multi marker event is true
     * @param marker 
     */
    //% blockId=ar_while_multi_event block="while %marker1=marker_block|%event |%marker2=marker_block |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"
    //% inlineInputMode="inline"
    //% shim=events::whileMultiEvent
    function whileMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: () => void): void;

    /**
     * Allows user to define callbacks that trigger once when the multi marker event is true
     * @param marker 
     */
    //% blockId=ar_on_multi_event block="on %marker1=marker_block|%event |%marker2=marker_block |do" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"    
    //% inlineInputMode="inline"
    //% shim=events::onMultiEvent
    function onMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: () => void): void;

}
declare namespace fx {
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
    //% shim=fx::addGlobalEffect
    function addGlobalEffect(effect: Effect): void;

    /**
     * Remove an effect to every active instrument.
     * @param effect which effect to use
     */
    //% blockId=music_rem_effect_global block="remove effect %effect" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"
    //% shim=fx::removeGlobalEffect
    function removeGlobalEffect(effect: Effect): void;

}
declare namespace markers {
    /**
     * An augmented reality marker
     */
    //% blockId=marker_block block="%marker"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"    
    //% marker.fieldOptions.decompileLiterals=true
    //% shim=TD_ID
    //% useEnumVal=1
    //% shim=markers::marker
    function marker(marker: MarkerCode): number;

    /**
     * Gets the distance between the centers of 2 markers
     */
    //% blockId=ar_get_dist block="distance from %marker1=marker_block| to %marker2=marker_block" blockGap=8
    //% shim=markers::distance
    function distance(marker1: number, marker2: number): number;

    /**
     * Gets the x, y, z positional coordinates of a marker
     */
    //% blockId=ar_get_pos block="%marker=marker_block|position %axis" blockGap=8
    //% shim=markers::position
    function position(marker: number, axis: Axes): number;

    /**
     * Gets the x, y, z rotational values of a marker
     */
    //% blockId=ar_get_rot block="%marker=marker_block|rotation %axis" blockGap=8
    //% shim=markers::rotation
    function rotation(marker: number, axis: Axes): number;

}
declare namespace music {
    /**
     * Play a tone for a duration of time
     * @param note pitch of the tone to play in Hertz (Hz)
     * @param duration number of beats to play tone for
     */
    //% blockId=music_play_tone block="play tone %note=device_note| for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::playTone
    function playTone(note: number, duration: string): void;

    /**
     * Rest for a duration of time
     * @param duration number of beats to rest for
     */
    //% blockId=music_rest block="rest for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    /*
    export function rest(duration: string) {
     * TO DO:
     * pause for x ms based on the global bpm.
     * bps (beats per second) = Tone.Transport.bpm.value / 60
     * whole note (in ms)     = 1 * bps * 1000
     * half note (in ms)      = 0.5 * bps * 1000
     * quarter note (in ms)   = 0.25 * bps * 1000
     * eighth note (in ms)    = 0.125 * bps * 1000
     * sixteenth note (in ms) = 0.0625 * bps * 1000
     *    
    }
     */
    /**
     * Play a chord of an array of notes for a duration of time. Can play up to 5 notes.
     * @param notes pitches of the tones to play in Hertz (Hz)
     * @param duration number of beats to play tone for
     */
    //%
    //% shim=music::playChordCommand
    function playChordCommand(notesString: string, duration: string): void;

    /**
     * Play a type of drum sound
     * @param drum which drum sound to use
     */
    //% blockId=music_play_drum_beat block="play %drum" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% drum.fieldEditor="gridpicker"
    //% drum.fieldOptions.width="200" drum.fieldOptions.columns="1"
    //% drum.fieldOptions.tooltips="true"
    //% shim=music::drumBeat
    function drumBeat(drum: Drum): void;

    /**
     * Shift pitch by a certain amount of semitones. For reference, an octave is 12 semitones.
     * @param pitch amount in semitones to shift the pitch by
     */
    /*
    //% blockId=music_bend block="bend by %pitch| semitones" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    export function bend(pitch: number) {
    let shift = new Tone.PitchShift(pitch);
    for (let i = 0; i < board().instruments.length; i++)
    board().instruments[i].connect(shift);       
    }
     */
    /**
     * Return the duration of a beat in milliseconds (the beat fraction).
     * @param fraction the fraction of the current whole note, eg: BeatFraction.Half
     */
    //% help=music/beat weight=49 blockGap=8
    //% blockId=device_beat block="%fraction|beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::beat
    function beat(fraction?: BeatFraction): string;

    /**
     * Get the frequency of a note
     * @param name the note name, eg: Note.C
     */
    //% weight=1 help=music/note-frequency
    //% blockId=device_note block="%note"
    //% shim=TD_ID
    //% note.fieldEditor="note" note.defl="262" note.fieldOptions.decompileLiterals=true
    //% useEnumVal=1 blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::noteFrequency
    function noteFrequency(name: Note): number;

    /**
     * Change the frequency (pitch) of an oscillator
     * @param wave type of sound wave
     */
    //% blockId="music_osc_freq" block="set %wave|wave to %note=device_note"
    //% weight=100
    //% wave.fieldEditor="gridpicker"
    //% wave.fieldOptions.width="200" octave.fieldOptions.columns="1"
    //% wave.fieldOptions.tooltips="true"      
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::oscFreq
    function oscFreq(wave: Wave, freq: number): void;

    /**
     * Stop an oscillator type
     * @param wave type of sound wave
     */
    //% blockId="music_stop_osc" block="stop %wave|wave"
    //% weight=100
    //% wave.fieldEditor="gridpicker"
    //% wave.fieldOptions.width="200" octave.fieldOptions.columns="1"
    //% wave.fieldOptions.tooltips="true"      
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::stopOsc
    function stopOsc(wave: Wave): void;

    /**
     * Start an oscillator type
     * @param wave type of sound wave
     */
    //% blockId="music_start_osc" block="start %wave|wave"
    //% weight=100
    //% wave.fieldEditor="gridpicker"
    //% wave.fieldOptions.width="200" octave.fieldOptions.columns="1"
    //% wave.fieldOptions.tooltips="true"      
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::startOsc
    function startOsc(wave: Wave): void;

    /**
     * Set the beats per minute (tempo)
     * @param bpm
     */
    //% blockId="music_bpm" block="set tempo %bpm"
    //% weight=100
    //% blockExternalInputs="true" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::setTempo
    function setTempo(bpm: number): void;

}
declare namespace phrases {
    /**
     * Plays a phrase once
     * @param name 
     */
    //% blockId=music_play_phrase block="play phrase %name" blockGap=8
    //% blockNamespace=music advanced=true
    //% shim=phrases::playPhrase
    function playPhrase(name: string): void;

    /**
     * Loops a musical phrase
     * @param name 
     */
    //% blockId=music_loop_phrase block="loop phrase %name" blockGap=8
    //% blockNamespace=music advanced=true
    //% shim=phrases::loopPhrase
    function loopPhrase(name: string): void;

    /**
     * Stop a musical phrase
     * @param name 
     */
    //% blockId=music_stop_phrase block="stop phrase %name" blockGap=8
    //% blockNamespace=music advanced=true
    //% shim=phrases::stopPhrase
    function stopPhrase(name: string): void;

    /**
     * Create a drum pattern
     * @param name
     * @param beat a string describing the beat
     */
    //% blockId="music_drumbeat" block="create beat %name|%beat"
    //% weight=100
    //% beat.fieldEditor="drums"
    //% beat.fieldOptions.onParentBlock=true
    //% beat.fieldOptions.decompileLiterals=true    
    //% blockExternalInputs="true" blockGap=8
    //% blockNamespace=music advanced=true
    //% shim=phrases::drumPhrase
    function drumPhrase(name: string, beatString: string): void;

}

// Auto-generated. Do not edit. Really.
