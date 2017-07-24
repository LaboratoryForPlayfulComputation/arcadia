namespace pxsim.markers {

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
    export function marker(marker: MarkerCode): number {
        board().marker(marker);
        return marker;
    } 

    /**
     * Gets the distance between the centers of 2 markers
     */
    //% blockId=ar_get_dist block="distance from %marker1=marker_block| to %marker2=marker_block" blockGap=8
    export function distance(marker1: number, marker2: number): number {     
        let m1 = board().marker(marker1);
        let m2 = board().marker(marker2);
        if (m1.group() && m2.group()) return m1.position().distanceTo(m2.position());  
        else return -9999;
    }

    /**
     * Gets the x, y, z positional coordinates of a marker
     */
    //% blockId=ar_get_pos block="%marker=marker_block|position %axis" blockGap=8
    export function position(marker: number, axis: Axes): number {
        let m = board().marker(marker);
        switch(axis) {
            case Axes.x: return m.position().x;
            case Axes.y: return m.position().y;
            default:     return m.position().z;
        }
    }

    /**
     * Gets the x, y, z rotational values of a marker
     */
    //% blockId=ar_get_rot block="%marker=marker_block|rotation %axis" blockGap=8
    export function rotation(marker: number, axis: Axes): number {
        let m = board().marker(marker);
        switch(axis) {
            case Axes.x: return m.rotation().x;
            case Axes.y: return m.rotation().y;
            default:     return m.rotation().z;
        }
    }

    /* Class to store marker data */
    export class Marker {
        private code_            : MarkerCode;
        private group_           : THREE.Group;
        private prevPos_         : THREE.Vector3;
        private prevRot_         : THREE.Euler;
        private prevVisible_     : boolean;
        private prevVisibleTime_ : number;
        private prevHiddenTime_  : number;
        private color_           : number;
        private fontColor_       : number;
        private scaleX_          : number;
        private scaleY_          : number;
        private scaleZ_          : number;
        private posX_            : number;
        private posY_            : number;
        private posZ_            : number;
        private rotX_            : number;
        private rotY_            : number;
        private rotZ_            : number;
        private neighbors_       : any[][];

        constructor(code: MarkerCode) {
            this.code_            = code;
            this.group_           = this.initControls();
            this.prevPos_         = new THREE.Vector3(0, 0, 0);
            this.prevRot_         = new THREE.Euler(0, 0, 0);
            this.prevVisible_     = false;
            this.prevVisibleTime_ = 0;
            this.prevHiddenTime_  = 0;
            this.color_           = 0x000000;
            this.fontColor_       = 0xffffff;
            this.scaleX_          = 1;
            this.scaleY_          = 1;
            this.scaleZ_          = 1;
            this.posX_            = 0;
            this.posY_            = 0;
            this.posZ_            = 0;            
            this.rotX_            = 0;
            this.rotY_            = 0;
            this.rotZ_            = 0;
            this.neighbors_       = [];
        }

        triggerEvents(){
            /* calculate differences in previous and current positions/rotations */
            const distThreshold  = 0.07;
            const angleThreshold = Math.PI/16;
            const currentPos     = this.position();          
            const currentRot     = this.rotation();          
            const distance       = this.prevPos_.distanceTo(currentPos);
            const distanceX      = currentPos.x - this.prevPos_.x; 
            const distanceY      = currentPos.y - this.prevPos_.y; 
            const distanceZ      = currentPos.z - this.prevPos_.z; 
            const angleX         = currentRot.x - this.prevRot_.x;
            const angleY         = currentRot.y - this.prevRot_.y;
            const angleZ         = currentRot.z - this.prevRot_.z;
            /* trigger events depending on the changed state */
            if      (distance >= distThreshold)   board().bus.queue(this.code_, MarkerEvent.Moved);
            if      (distanceX >= distThreshold)  board().bus.queue(this.code_, MarkerEvent.MovedRight);
            else if (distanceX <= -distThreshold) board().bus.queue(this.code_, MarkerEvent.MovedLeft);
            if      (distanceY >= distThreshold)  board().bus.queue(this.code_, MarkerEvent.MovedUp);
            else if (distanceY <= -distThreshold) board().bus.queue(this.code_, MarkerEvent.MovedDown);
            if      (distanceZ >= distThreshold)  board().bus.queue(this.code_, MarkerEvent.MovedForward);
            else if (distanceZ <= -distThreshold) board().bus.queue(this.code_, MarkerEvent.MovedBackward); 
            if      (angleX >= distThreshold)     board().bus.queue(this.code_, MarkerEvent.RotatedClockwise);
            else if (angleX <= -distThreshold)    board().bus.queue(this.code_, MarkerEvent.RotatedCounterClockwise);
            if      (angleX >= angleThreshold)    board().bus.queue(this.code_, MarkerEvent.RotatedClockwise);
            else if (angleX <= -angleThreshold)   board().bus.queue(this.code_, MarkerEvent.RotatedCounterClockwise);            
            if (Math.abs(angleX) >= angleThreshold || Math.abs(angleY) >= angleThreshold || Math.abs(angleZ) >= angleThreshold)
                board().bus.queue(this.code_, MarkerEvent.Rotated);
            if (this.visible() == true){
                board().bus.queue(this.code_, MarkerLoopEvent.WhileVisible);
                if (this.prevVisible_ == false) board().bus.queue(this.code_, MarkerEvent.Visible);
            } else{ // marker not visible
                board().bus.queue(this.code_, MarkerLoopEvent.WhileHidden);
                if (this.prevVisible_ == true) board().bus.queue(this.code_, MarkerEvent.Hidden);
            }
            this.checkNeighbors();  
        }

        neighbor(i: number, dist: string) : boolean {
            if (this.neighbors_[i][1] == dist) return true;
            return false;
        }

        setNeighborDist(index: number, dist: string){
            this.neighbors_[index][1] = dist;
        }

        cueTouching(marker: Marker, event?: string){
            let s = MultiMarkerEvent.Touching.toString() + 'marker' + this.code().toString() + 'marker' + marker.code().toString();
            if (event)
                s = event + s;
            board().bus.queue(s, MultiMarkerEvent.Touching);
        }
        cueClose(marker: Marker, event?: string){
            let s = MultiMarkerEvent.Close.toString() + 'marker' + this.code().toString() + 'marker' + marker.code().toString();
            if (event)
                s = event + s;
            board().bus.queue(s, MultiMarkerEvent.Close);
        }
        cueFar(marker: Marker, event?: string){
            let s = MultiMarkerEvent.Far.toString() + 'marker' + this.code().toString() + 'marker' + marker.code().toString();
            if (event)
                s = event + s;
            board().bus.queue(s, MultiMarkerEvent.Far);
        }

        checkNeighbors(){
            for (let i = 0; i < this.neighbors_.length; i++){
                let marker = this.neighbors_[i][0];
                let neighborPos = marker.position();
                let dist = neighborPos.distanceTo(this.position());
                
                if (this.code() == marker.code()){ // if the markers are the same, touching & close (while) 
                    this.cueTouching(marker);
                    this.cueClose(marker);
                    if (this.neighbor(i, '') || !this.prevVisible()){ // touching & close (on)
                        this.cueTouching(marker, 'on');
                        this.cueClose(marker, 'on');                        
                    }
                    this.neighbors_[i][1] = 'touching';
                } else {
                    if (dist <= 2.5 && this.visible() && marker.visible()){ // close (while)
                        if (dist <= 1.5){
                            this.cueClose(marker);
                            this.cueTouching(marker);
                            if (!this.neighbor(i, 'touching') || this.neighbor(i, '')){ // touching (on)
                                this.cueClose(marker, 'on');
                                this.cueTouching(marker, 'on');
                            }
                            this.neighbors_[i][1] = 'touching';
                        } else {
                            this.cueClose(marker);
                            if (!this.neighbor(i, 'close') || this.neighbor(i, '')){ // close(on)
                                this.cueClose(marker, 'on');
                            }
                            this.neighbors_[i][1] = 'close';
                        }
                    } else{ // far (while)
                        this.cueFar(marker);
                        if (!this.neighbor(i, 'far') || this.neighbor(i, '')){ // far (on)
                            this.cueFar(marker, 'on');
                        }
                        this.neighbors_[i][1] = 'far';
                    }
                }
            }
        }

        /**
         * Update previous and current AR marker state values
         */
        updateState(){
            this.prevVisible_ = this.visible();
            this.prevPos_ = new THREE.Vector3(this.position().x,
                                                  this.position().y,
                                                  this.position().z);
            this.prevRot_ = new THREE.Euler(this.rotation().x,
                                                this.rotation().y,
                                                this.rotation().z);                                              
        }  

        initControls(): THREE.Group {
            let group = new THREE.Group;
            group.name = 'markerroot' + this.code_.toString();
            board().scene.add(group);
            board().scene.visible = false;
            let markerControls = threex.createMarkerControls(this.code_, group);
            return group;
        }

        /* Getter methods */
        textObject(){ return this.group_.getObjectByName(this.code_.toString() + '-text'); }    
        shapeObject(){ return this.group_.getObjectByName(this.code_.toString() + '-shape'); }
        code(){ return this.code_; }
        group(){ return this.group_; }
        position(){ return this.group_.position; }
        prevPosition(){ return this.prevPos_; }
        rotation(){ return this.group_.rotation; }
        prevRotation(){ return this.prevRot_; }
        prevVisible(){ return this.prevVisible_; }
        prevVisibleTime(){ return this.prevVisibleTime_; }
        prevHiddenTime(){ return this.prevHiddenTime_; }
        color(){ return this.color_; }
        fontColor(){ return this.fontColor_; }
        scaleX() {return this.scaleX_; }
        scaleY() {return this.scaleY_; }
        scaleZ() {return this.scaleZ_; }
        posX() {return this.posX_; }
        posY() {return this.posY_; }
        posZ() {return this.posZ_; }
        rotX() {return this.rotX_; }
        rotY() {return this.rotY_; }
        rotZ() {return this.rotZ_; }        
        visible(): boolean { // Checks if marker is visible but also uses extra logic to prevent flickers
            let date = new Date();
            let time = date.getTime();
            if (this.group_) {
                if (this.group_.visible){
                    this.setPrevVisibleTime(time);
                    return true;
                } else {
                    if (time - this.prevVisibleTime() >= 175) return false
                    else return true
                }
            }
            return false;
        } 

        /* Setter methods */
        setPrevVisibleTime(time: number){
            this.prevVisibleTime_ = time;
        }
        setColor(color: number){
            this.color_ = color;
        }
        setFontColor(color: number){
            this.fontColor_ = color;
        }
        setScale(x: number, y: number, z: number){
            this.scaleX_ = x;
            this.scaleY_ = y;
            this.scaleZ_ = z;
        }
        setPosition(x: number, y: number, z: number){
            this.posX_ = x;
            this.posY_ = y;
            this.posX_ = z;
        }   
        setRotation(x: number, y: number, z: number){
            this.rotX_ = x;
            this.rotY_ = y;
            this.rotX_ = z;
        }                
        addNeighbor(neighbor: any[]){
            this.neighbors_.push(neighbor);
        }
           
    }           

}
