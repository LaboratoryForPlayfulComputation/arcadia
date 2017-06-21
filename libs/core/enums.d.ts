declare const enum Direction {
    //% block=left
    Left,
    //% block=right
    Right
}

declare const enum Axes {
    //% block='x' blockIdentity=axes.named
    x,
    //% block='y' blockIdentity=axes.named
    y,
    //% block='z' blockIdentity=axes.named
    z
}

/**
 * An augmented reality marker
 */
declare const enum Marker {
    //% block=0 enumval=0
    //% blockImage=1
    Marker0 = 0,
    //% block=1 enumval=1
    //% blockImage=1
    Marker1 = 1,
    //% block=2 enumval=2
    //% blockImage=1
    Marker2 = 2,
    //% block=3 enumval=3
    //% blockImage=1
    Marker3 = 3,
    //% block=4 enumval=4
    //% blockImage=1
    Marker4 = 4,
    //% block=5 enumval=5
    //% blockImage=1
    Marker5 = 5,
    //% block=6 enumval=6
    //% blockImage=1
    Marker6 = 6,
    //% block=7 enumval=7
    //% blockImage=1
    Marker7 = 7,
    //% block=8 enumval=8
    //% blockImage=1
    Marker8 = 8,
    //% block=9 enumval=9
    //% blockImage=1
    Marker9 = 9,
    //% block=10 enumval=10
    //% blockImage=1
    Marker10 = 10,
    //% block=11 enumval=11
    //% blockImage=1
    Marker11 = 11,
    //% block=12 enumval=12
    //% blockImage=1
    Marker12 = 12,
    //% block=13 enumval=13
    //% blockImage=1
    Marker13 = 13,
    //% block=14 enumval=14
    //% blockImage=1
    Marker14 = 14,
    //% block=15 enumval=15
    //% blockImage=1
    Marker15 = 15
}

declare const enum MarkerEvent {
    //% block="moved"
    //% enumval=0x01
    Moved = 0x01,
    //% block="moved left"
    //% enumval=0x02
    MovedLeft = 0x02,
    //% block="moved right"
    //% enumval=0x03
    MovedRight = 0x03,    
    //% block="moved up"
    //% enumval=0x04
    MovedUp = 0x04,
    //% block="moved down"
    //% enumval=0x05
    MovedDown = 0x05,    
    //% block="moved forward"
    //% enumval=0x06
    MovedForward = 0x06,
    //% block="moved backward"
    //% enumval=0x07
    MovedBackward = 0x07,    
    //% block="rotated"
    //% enumval=0x08
    Rotated = 0x08,
    //% block="rotated clockwise"
    //% enumval=0x09
    RotatedClockwise = 0x09,
    //% block="rotated counterclockwise"
    //% enumval=0x10
    RotatedCounterClockwise = 0x10,  
    //% block="hidden"
    //% enumval=0x11
    Hidden = 0x11,     
    //% block="visible"
    //% enumval=0x12
    Visible = 0x12,        
}

declare const enum MarkerLoopEvent {
    //% block="hidden"
    //% enumval=0x13    
    WhileHidden = 0x13,
    //% block="visible"
    //% enumval=0x14    
    WhileVisible = 0x14
}

declare const enum MultiMarkerEvent {
    //% block="close to"
    //% enumval=0x01
    Close = 0x01,
    //% block="far from"
    //% enumval=0x02
    Far = 0x02,
}

/**
 * Well known colors for a NeoPixel strip
 */
declare const enum Colors {
    //% block=red blockIdentity=colors.named
    //% enumval=0xFF0000
    Red = 0xFF0000,
    //% block=orange blockIdentity=colors.named
    //% enumval=0xFFA500
    Orange = 0xFFA500,
    //% block=yellow blockIdentity=colors.named
    //% enumval=0xFFFF00
    Yellow = 0xFFFF00,
    //% block=green blockIdentity=colors.named
    //% enumval=0x00FF00
    Green = 0x00FF00,
    //% block=blue blockIdentity=colors.named
    //% enumval=0x0000FF
    Blue = 0x0000FF,
    //% block=indigo blockIdentity=colors.named
    //% enumval=0x4b0082
    Indigo = 0x4b0082,
    //% block=violet blockIdentity=colors.named
    //% enumval=0x8a2be2
    Violet = 0x8a2be2,
    //% block=purple blockIdentity=colors.named
    //% enumval=0xFF00FF
    Purple = 0xFF00FF,
    //% block=pink blockIdentity=colors.named
    //% enumval=0xFFC0CB
    Pink = 0xFFC0CB,
    //% block=white blockIdentity=colors.named
    //% enumval=0xFFFFFF
    White = 0xFFFFFF,
    //% block=black  blockIdentity=colors.named
    //% enumval=0x000000
    Black = 0x000000
}

/**
 * 3D Shape Primitives supported by THREE.js
 */
declare const enum Shape {
    //% block='box'
    //% blockImage=1
    Box,
    //% block='sphere'
    //% blockImage=1
    Sphere,    
    //% block='cone'
    //% blockImage=1
    Cone, 
    //% block='cylinder'
    //% blockImage=1
    Cylinder,    
    //% block='tetrahedron'
    //% blockImage=1
    Tetrahedron,
    //% block='icosahedron'
    //% blockImage=1    
    Icosahedron,
}

declare const enum Drum {
    //% block="kick"
    //% enumval=0
    Kick = 1,
    //% block="snare"
    //% enumval=1
    Snare = 2,
    //% block="hihat closed"
    //% enumval=2
    HiHatClosed = 3,
    //% block="hihat open"
    //% enumval=3
    HiHatOpen = 4,
    //% block="cymbal"
    //% enumval=4
    Cymbal = 5
}