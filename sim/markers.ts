namespace pxsim.markers {



    /**
     * Gets the distance between the centers of 2 markers
     */
    //% blockId=ar_get_dist block="distance from %marker1=marker_block| to %marker2=marker_block" blockGap=8
    //% weight=97
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
    //% weight=99
    export function position(marker: number, axis: Axes): number {
        let m = board().marker(marker);
        switch (axis) {
            case Axes.x: return m.position().x;
            case Axes.y: return m.position().y;
            default: return m.position().z;
        }
    }

    /**
     * Gets the x, y, z rotational values of a marker
     */
    //% blockId=ar_get_rot block="%marker=marker_block|rotation %axis" blockGap=8
    //% weight=98
    export function rotation(marker: number, axis: Axes): number {
        let m = board().marker(marker);
        switch (axis) {
            case Axes.x: return m.rotation().x;
            case Axes.y: return m.rotation().y;
            default: return m.rotation().z;
        }
    }

    /**
     * Maps the x, y, or z position of a marker to a specified range.
     * @param out_min The lower end of the range to map to, eg: 0
     * @param out_max The upper end of the range to map to, eg: 100
     */
    //% blockId=ar_map_pos block="%marker=marker_block|map position %axis|from %out_min|to %out_max" blockGap=8
    //% weight=96
    //% inlineInputMode="inline"    
    export function mapPosition(marker: number, axis: Axes, out_min: number, out_max: number): number {
        let m = board().marker(marker);
        const in_min = -1.5;
        const in_max = 1.5;
        return (position(marker, axis) - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    /**
     * Maps the x, y, or z position of a marker to a specified range. When you rotate the marker, the lowest value will be when the marker is in it's normal orientation and will get higher as you turn it clockwise.
     * @param out_min The lower end of the range to map to, eg: 0
     * @param out_max The upper end of the range to map to, eg: 100
     */
    //% blockId=ar_map_rot block="%marker=marker_block|map rotation from %out_min|to %out_max" blockGap=8
    //% weight=95
    //% inlineInputMode="inline"    
    export function mapRotation(marker: number, out_min: number, out_max: number): number {
        let m = board().marker(marker);
        const out_min_first = out_min;
        const out_min_second = out_max / 4;
        const out_min_third = out_max / 2;
        const out_min_fourth = out_max * (3 / 4);
        const out_max_first = out_max / 4;
        const out_max_second = out_max / 2;
        const out_max_third = out_max * (3 / 4);
        const out_max_fourth = out_max;
        const first_max = 40;
        const second_max = 49;
        const third_max = 25;
        let rotY = THREE.Math.radToDeg(rotation(marker, Axes.y));
        let w = THREE.Math.radToDeg(m.rotation().w);
        let map = 0;

        if (rotY <= 0 || w <= 0) { // 1st and 2nd quadrant
            if (rotY < 0) rotY *= -1;
            map = (rotY) * (out_max_second - out_min_first) / (second_max) + out_min_first;
        } else if (rotY >= third_max) { // 3rd quadrant
            map = (-rotY + second_max) * (out_max_third - out_min_third) / (-third_max + second_max) + out_min_third;
        } else { // 4th quadrant
            map = (-rotY + third_max) * (out_max_fourth - out_min_fourth) / (third_max) + out_min_fourth;
        }
        return map;
    }

    /**
     * Maps the value of 1 marker in relation to its distance between 2 markers.
     */
    //% blockId=ar_slider block="slider %marker1=marker_block|from %marker2=marker_block|to %marker3=marker_block" blockGap=8
    //% weight=94    
    export function slider(marker1: number, marker2: number, marker3: number): number {
        // TO DO: remember last state that the slider was in if there's a flicker
        let m1 = board().marker(marker1);
        let m2 = board().marker(marker2);
        let m3 = board().marker(marker3);
        let sliderVal = 0;
        let totalDist = markers.distance(m2.code(), m3.code());
        let sliderDist = markers.distance(m1.code(), m2.code());
        if (totalDist > 0 && sliderDist != -9999)
            sliderVal = sliderDist / totalDist;
        return sliderVal;
    }


    /* Class to store marker data */
    export class Marker {
        private code_: MarkerCode;
        private group_: THREE.Group;
        private prevWorldPos_: THREE.Vector3;
        private prevPos_: THREE.Vector3;
        private prevRot_: THREE.Quaternion;
        private prevVisible_: boolean;
        private prevVisibleTime_: number;
        private prevHiddenTime_: number;
        private color_: number;
        private opacity_: number;
        private fontColor_: number;
        private brushColor_: number;
        private brushWidth_: number;
        private scaleX_: number;
        private scaleY_: number;
        private scaleZ_: number;
        private autoScale_: number;
        private posX_: number;
        private posY_: number;
        private posZ_: number;
        private rotX_: number;
        private rotY_: number;
        private rotZ_: number;
        private neighbors_: any[][];
        private paintGroup_: THREE.Group;
        private painting_: boolean;

        constructor(code: MarkerCode, color: number) {
            this.code_ = code;
            this.group_ = this.initControls();
            this.prevWorldPos_ = new THREE.Vector3(0, 0, 0);
            this.prevPos_ = new THREE.Vector3(0, 0, 0);
            this.prevRot_ = new THREE.Quaternion(0, 0, 0, 0);
            this.prevVisible_ = false;
            this.prevVisibleTime_ = 0;
            this.prevHiddenTime_ = 0;
            this.color_ = 0x000000;
            if (color)
                this.color_ = color;
            this.opacity_ = 0.9;
            this.fontColor_ = 0xffffff;
            this.brushColor_ = 0xffffff;
            this.brushWidth_ = 1;
            this.scaleX_ = 1;
            this.scaleY_ = 1;
            this.scaleZ_ = 1;
            this.autoScale_ = 1;
            this.posX_ = 0;
            this.posY_ = 0;
            this.posZ_ = 0;
            this.rotX_ = 0;
            this.rotY_ = 0;
            this.rotZ_ = 0;
            this.neighbors_ = [];
            this.paintGroup_ = new THREE.Group();
            this.paintGroup_.name = "paintgroup" + this.code_.toString();
            this.painting_ = false;
            board().scene.add(this.paintGroup_);
        }

        triggerEvents() {
            /* calculate differences in previous and current positions/rotations */
            const distThreshold = 0.07;
            const angleThreshold = Math.PI / 16;
            const currentPos = this.position();
            const currentRot = this.rotation();
            const distance = this.prevPos_.distanceTo(currentPos);
            const distanceX = currentPos.x - this.prevPos_.x;
            const distanceY = currentPos.y - this.prevPos_.y;
            const distanceZ = currentPos.z - this.prevPos_.z;
            const angleX = currentRot.x - this.prevRot_.x;
            const angleY = currentRot.y - this.prevRot_.y;
            const angleZ = currentRot.z - this.prevRot_.z;
            /* trigger events depending on the changed state */
            if (distance >= distThreshold) board().bus.queue(this.code_, MarkerEvent.Moved);
            if (distanceX >= distThreshold) board().bus.queue(this.code_, MarkerEvent.MovedRight);
            else if (distanceX <= -distThreshold) board().bus.queue(this.code_, MarkerEvent.MovedLeft);
            if (distanceY >= distThreshold) board().bus.queue(this.code_, MarkerEvent.MovedUp);
            else if (distanceY <= -distThreshold) board().bus.queue(this.code_, MarkerEvent.MovedDown);
            if (distanceZ >= distThreshold) board().bus.queue(this.code_, MarkerEvent.MovedForward);
            else if (distanceZ <= -distThreshold) board().bus.queue(this.code_, MarkerEvent.MovedBackward);
            //if      (angleX >= distThreshold)     board().bus.queue(this.code_, MarkerEvent.RotatedClockwise);
            //else if (angleX <= -distThreshold)    board().bus.queue(this.code_, MarkerEvent.RotatedCounterClockwise);
            //if      (angleX >= angleThreshold)    board().bus.queue(this.code_, MarkerEvent.RotatedClockwise);
            //else if (angleX <= -angleThreshold)   board().bus.queue(this.code_, MarkerEvent.RotatedCounterClockwise);            
            //if (Math.abs(angleX) >= angleThreshold || Math.abs(angleY) >= angleThreshold || Math.abs(angleZ) >= angleThreshold)
            //board().bus.queue(this.code_, MarkerEvent.Rotated);
            if (this.visible() == true) {
                board().bus.queue(this.code_, MarkerLoopEvent.WhileVisible);
                if (this.prevVisible_ == false) board().bus.queue(this.code_, MarkerEvent.Visible);
            } else { // marker not visible
                board().bus.queue(this.code_, MarkerLoopEvent.WhileHidden);
                if (this.prevVisible_ == true) board().bus.queue(this.code_, MarkerEvent.Hidden);
            }
            this.checkNeighbors();
        }

        neighbor(i: number, dist: string): boolean {
            if (this.neighbors_[i][1] == dist) return true;
            return false;
        }

        setNeighborDist(index: number, dist: string) {
            this.neighbors_[index][1] = dist;
        }

        cueTouching(marker: Marker, event?: string) {
            let s = MultiMarkerEvent.Touching.toString() + 'marker' + this.code().toString() + 'marker' + marker.code().toString();
            if (event)
                s = event + s;
            board().bus.queue(s, MultiMarkerEvent.Touching);
        }
        cueClose(marker: Marker, event?: string) {
            let s = MultiMarkerEvent.Close.toString() + 'marker' + this.code().toString() + 'marker' + marker.code().toString();
            if (event)
                s = event + s;
            board().bus.queue(s, MultiMarkerEvent.Close);
        }
        cueFar(marker: Marker, event?: string) {
            let s = MultiMarkerEvent.Far.toString() + 'marker' + this.code().toString() + 'marker' + marker.code().toString();
            if (event)
                s = event + s;
            board().bus.queue(s, MultiMarkerEvent.Far);
        }

        checkNeighbors() {
            for (let i = 0; i < this.neighbors_.length; i++) {
                let marker = this.neighbors_[i][0];
                let neighborPos = marker.position();
                let dist = neighborPos.distanceTo(this.position());

                if (this.code() == marker.code()) { // if the markers are the same, touching & close (while) 
                    this.cueTouching(marker);
                    this.cueClose(marker);
                    if (this.neighbor(i, '') || !this.prevVisible()) { // touching & close (on)
                        this.cueTouching(marker, 'on');
                        this.cueClose(marker, 'on');
                    }
                    this.neighbors_[i][1] = 'touching';
                } else {
                    if (dist <= 2.5 && this.visible() && marker.visible()) { // close (while)
                        if (dist <= 1.5) {
                            this.cueClose(marker);
                            this.cueTouching(marker);
                            if (!this.neighbor(i, 'touching') || this.neighbor(i, '')) { // touching (on)
                                this.cueClose(marker, 'on');
                                this.cueTouching(marker, 'on');
                            }
                            this.neighbors_[i][1] = 'touching';
                        } else {
                            this.cueClose(marker);
                            if (!this.neighbor(i, 'close') || this.neighbor(i, '')) { // close(on)
                                this.cueClose(marker, 'on');
                            }
                            this.neighbors_[i][1] = 'close';
                        }
                    } else { // far (while)
                        this.cueFar(marker);
                        if (!this.neighbor(i, 'far') || this.neighbor(i, '')) { // far (on)
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
        updateState() {
            this.prevVisible_ = this.visible();
            this.prevPos_ = new THREE.Vector3(this.position().x,
                this.position().y,
                this.position().z);
            this.prevRot_ = this.rotation();
            this.prevWorldPos_ = new THREE.Vector3(this.worldPosition().x,
                this.worldPosition().y,
                this.worldPosition().z);
        }

        paint() {
            let pp = this.prevWorldPos_;
            let cp = this.worldPosition();
            if (pp != cp) {
                let line = three.createLine(pp, cp, this.brushColor());
                line.name = 'markerrroot' + this.code_.toString();
                this.paintGroup_.add(line);
            }
        }

        clearBrushStrokes() {
            while (this.paintGroup_.children.length) {
                this.paintGroup_.remove(this.paintGroup_.children[0]);
            }
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
        textObject(): THREE.Object3D { return this.group_.getObjectByName(this.code_.toString() + '-text'); }
        shapeObject(): THREE.Object3D {
            return this.group_.getObjectByName(this.code_.toString() + '-shape')
                || this.group_.getObjectByName(this.code_.toString() + '-model');
        }
        code() { return this.code_; }
        group(): THREE.Group { return this.group_; }
        position(): THREE.Vector3 { return this.group_.position; }
        worldPosition(): THREE.Vector3 { return this.group_.getWorldPosition(); }
        prevPosition(): THREE.Vector3 { return this.prevPos_; }
        rotation(): THREE.Quaternion { return this.group_.quaternion; }
        prevRotation(): THREE.Quaternion { return this.prevRot_; }
        prevVisible() { return this.prevVisible_; }
        prevVisibleTime() { return this.prevVisibleTime_; }
        prevHiddenTime() { return this.prevHiddenTime_; }
        color() { return this.color_; }
        opacity() { return this.opacity_; }
        fontColor() { return this.fontColor_; }
        brushColor() { return this.brushColor_; }
        brushWidth() { return this.brushWidth_; }
        scaleX() { return this.scaleX_; }
        scaleY() { return this.scaleY_; }
        scaleZ() { return this.scaleZ_; }
        posX() { return this.posX_; }
        posY() { return this.posY_; }
        posZ() { return this.posZ_; }
        rotX() { return this.rotX_; }
        rotY() { return this.rotY_; }
        rotZ() { return this.rotZ_; }
        visible(): boolean { // Checks if marker is visible but also uses extra logic to prevent flickers
            let date = new Date();
            let time = date.getTime();
            if (this.group_) {
                if (this.group_.visible) {
                    this.setPrevVisibleTime(time);
                    return true;
                } else {
                    if (time - this.prevVisibleTime() >= 175) return false
                    else return true
                }
            }
            return false;
        }
        painting(): boolean { return this.painting_; }

        /* Setter methods */
        setPrevVisibleTime(time: number) {
            this.prevVisibleTime_ = time;
        }
        setColor(color: number) {
            this.color_ = color;
        }
        setOpacity(opacity: number) {
            this.opacity_ = opacity;
        }
        setFontColor(color: number) {
            this.fontColor_ = color;
        }
        setBrushColor(color: number) {
            this.brushColor_ = color;
        }
        setBrushWidth(thickness: number) {
            this.brushWidth_ = thickness;
        }
        setScale(x: number, y?: number, z?: number) {
            this.scaleX_ = x / this.autoScale_;
            if (y) this.scaleY_ = y / this.autoScale_;
            else this.scaleY_ = this.scaleX_;
            if (z) this.scaleZ_ = z / this.autoScale_;
            else this.scaleZ_ = this.scaleX_;
        }
        setAutoScale(value: number) {
            this.autoScale_ = value;
        }
        setPosition(x: number, y: number, z: number) {
            this.posX_ = x;
            this.posY_ = y;
            this.posX_ = z;
        }
        setRotation(x: number, y?: number, z?: number) {
            if (x && y && z) {
                this.rotX_ = x * Math.PI / 180;
                this.rotY_ = y * Math.PI / 180;
                this.rotZ_ = z * Math.PI / 180;
            } else {
                this.rotX_ = 0;
                this.rotZ_ = 0;
                this.rotY_ = x * Math.PI / 180;;
            }
        }
        addNeighbor(neighbor: any[]) {
            this.neighbors_.push(neighbor);
        }
        setPainting(val: boolean) {
            this.painting_ = val;
        }

    }

}
