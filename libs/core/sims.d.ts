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

    /**
     * Sets the color that displays when the marker is detected
     */
    //% blockId=ar_set_color block="%marker=marker_block|set color %color" blockGap=8
    //% shim=colors::setColor
    function setColor(marker: number, color: number): void;

    /**
     * Sets the text color that displays when the marker is detected
     */
    //% blockId=ar_set_text_color block="%marker=marker_block|set text color %color" blockGap=8
    //% shim=colors::setTextColor
    function setTextColor(marker: number, color: number): void;

}
declare namespace decorations {
    /**
     * Sets the text  that displays when the marker is detected
     */
    //% blockId=ar_set_text block="%marker=marker_block|set text %text" blockGap=8
    //% shim=decorations::setText
    function setText(marker: number, text: string): void;

    /**
     * Sets the number that displays when the marker is detected
     */
    //% blockId=ar_set_number block="%marker=marker_block|set number %number" blockGap=8
    //% shim=decorations::setNumber
    function setNumber(marker: number, number: number): void;

    /**
     * Sets the shape that displays when the marker is detected
     */
    //% blockId=ar_set_shape block="%marker=marker_block|set shape %shape" blockGap=8
    //% shape.fieldEditor="gridpicker"
    //% shape.fieldOptions.width="200" shape.fieldOptions.columns="2"
    //% shape.fieldOptions.itemColour="black" shape.fieldOptions.tooltips="true"
    //% shim=decorations::setShape
    function setShape(marker: number, shape: Shape): void;

}
declare namespace events {
    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_on_event block="on %marker=marker_block| %event" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"
    //% shim=events::onEvent
    function onEvent(marker: number, event: MarkerEvent, handler: () => void): void;

    /**
     * Allows use to define callbacks for a marker event
     * @param marker 
     */
    //% blockId=ar_while_event block="while %marker=marker_block| %event" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"
    //% shim=events::whileEvent
    function whileEvent(marker: number, event: MarkerLoopEvent, handler: () => void): void;

    /**
     * Allows use to define callbacks for multi marker event
     * @param marker 
     */
    //% blockId=ar_on_multi_event block="on %marker1=marker_block| %event| %marker2=marker_block" blockGap=8
    //% event.fieldEditor="gridpicker"
    //% event.fieldOptions.width="400" event.fieldOptions.columns="4"
    //% event.fieldOptions.tooltips="true"
    //% shim=events::onMultiEvent
    function onMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: () => void): void;

}
declare namespace markers {
    //% blockId=marker_block block="%marker"
    //% marker.fieldEditor="gridpicker"
    //% marker.fieldOptions.width="400" marker.fieldOptions.columns="4"
    //% marker.fieldOptions.itemColour="black" marker.fieldOptions.tooltips="true"    
    //% marker.fieldOptions.decompileLiterals=true
    //% shim=TD_ID
    //% useEnumVal=1
    //% shim=markers::marker
    function marker(marker: Marker): number;

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
     * Gets the rotational values of a marker
     */
    //% blockId=ar_get_rot block="%marker=marker_block|rotation %axis" blockGap=8
    //% shim=markers::rotation
    function rotation(marker: number, axis: Axes): number;

}
declare namespace music {
    /**
     * Play a tone.
     * @param note pitch of the tone to play in Hertz (Hz)
     * @param duration number of beats to play tone for
     */
    //% blockId=music_play_tone block="play tone %note=device_note| for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::playTone
    function playTone(note: number, duration: string): void;

    /**
     * Rest.
     * @param duration number of beats to rest for
     */
    //% blockId=music_rest block="rest for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::rest
    function rest(duration: string): void;

    /**
     * Play a chord.
     * @param notes pitches of the tones to play in Hertz (Hz)
     * @param duration number of beats to play tone for
     */
    //% blockId=music_play_chord block="play chord %notes| for %duration=device_beat" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::playChord
    function playChord(notes: [number], duration: string): void;

    /**
     * Play a drum beat.
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
     * Add an effect to an audio context.
     * @param effect which drum sound to use
     */
    //% blockId=music_add_effect block="add effect %effect" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% effect.fieldEditor="gridpicker"
    //% effect.fieldOptions.width="200" effect.fieldOptions.columns="1"
    //% effect.fieldOptions.tooltips="true"
    //% shim=music::addEffect
    function addEffect(effect: Effect): void;

    /**
     * Add an effect to an audio context.
     * @param pitch amount in semitones to shift the pitch by
     */
    //% blockId=music_bend block="bend by %pitch| semitones" blockGap=8
    //% blockNamespace=music inBasicCategory=true
    //% shim=music::bend
    function bend(pitch: number): void;

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
     * Get the frequency of a note.
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
     * Defines a musical phrase
     * @param name 
     */
    //% blockId=music_create_phrase block="create phrase %name" blockGap=8
    //% shim=music::createPhrase
    function createPhrase(name: string, handler: () => void): void;

    /**
     * Plays a musical phrase once
     * @param name 
     */
    //% blockId=music_play_phrase block="play phrase %name" blockGap=8
    //% shim=music::playPhrase
    function playPhrase(name: string): void;

    /**
     * Loops a musical phrase
     * @param name 
     */
    //% blockId=music_loop_phrase block="loop phrase %name" blockGap=8
    //% shim=music::loopPhrase
    function loopPhrase(name: string): void;

}

// Auto-generated. Do not edit. Really.
