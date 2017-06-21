/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../typings/globals/three/index.d.ts" />
/// <reference path="../typings/globals/three-vreffect/index.d.ts" />
/// <reference path="aframe.d.ts" />
/// <reference path="aframe-ar.d.ts" />
/// <reference path="threex.d.ts" />

namespace pxsim {
    /**
     * This function gets called each time the program restarts
     */
    initCurrentRuntime = () => {
        runtime.board = new Board();
    };

    /**
     * Gets the current 'board', eg. program state.
     */
    export function board() : Board {
        return runtime.board as Board;
    }

    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public bus              : pxsim.EventBus;
        public font             : String;
        public scene            : THREE.Scene;
        public camera           : THREE.Camera;
        public markers          : pxsim.Map<THREEx.ArMarkerState>;
        public arToolkitContext : THREEx.ArToolkitContext;
        public arToolkitSource  : THREEx.ArToolkitSource;
        public renderer         : THREE.WebGLRenderer;
        public baseURL          : String;
        public onRenderFcts     : Array<any>;
        
        constructor() {
            super();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            return three.loadFontAsync()
                .then(font => {
                    this.bus              = new pxsim.EventBus(runtime);
                    this.font             = font;
                    this.markers          = {};
                    this.baseURL          = '/sim/AR.js/three.js/';
                    this.renderer         = getWebGlContext();
                    this.camera           = three.createCamera();
                    this.scene            = three.createScene();
                    this.arToolkitSource  = threex.createArToolkitSource();
                    this.arToolkitContext = threex.createArToolkitContext();
                    this.scene.add(this.camera);      
                    this.scene.add(three.createDirectionalLight());
                    this.scene.add(three.createAmbientLight());                    
                    threex.initArToolkitCallbacks();
                    this.initRenderFunctions();
                    this.runRenderingLoop();
                    return Promise.resolve();
                });
        }       

        /**
         * Define functions that we want to run on every render loop
         */
        initRenderFunctions(){
            this.onRenderFcts= [];
            /* update the AR toolkit source and context */
            this.onRenderFcts.push(() => {
                if(this.arToolkitSource.ready === false) return
                this.arToolkitContext.update(this.arToolkitSource.domElement)
                if (this.scene && this.camera)
                    this.scene.visible = this.camera.visible;
            });
            /* render the THREE.js scene */
            this.onRenderFcts.push(() => {
                if (this.renderer && this.scene && this.camera)
                    this.renderer.render(this.scene, this.camera);
            });
            /* updates marker state and triggers events if position or rotation changes */
            this.onRenderFcts.push(() => {
                for (var key in this.markers){
                    let markerState = this.markers[key];
                    this.triggerMarkerEvents(markerState);
                    this.updateMarkerState(markerState);      
                }
            });
        }

        /**
         * Checks for changed AR marker states and triggers marker events
         * @param markerState 
         */
        triggerMarkerEvents(markerState : THREEx.ArMarkerState){
            const marker          = markerState['marker'];
            let markerCurrentPos  = markerState['currentPos'];
            let markerPrevPos     = markerState['prevPos'];
            let markerCurrentRot  = markerState['currentRot'];
            let markerPrevRot     = markerState['prevRot'];       
            let markerPrevVisible = markerState['prevVisible'];             
            let markerVisible     = markerState['visible'];   
            // calculate differences in previous and current positions/rotations
            const distThreshold  = 0.07;
            const angleThreshold = Math.PI/16;          
            const distance       = markerPrevPos.distanceTo(markerCurrentPos);
            const distanceX      = markerCurrentPos.x - markerPrevPos.x; 
            const distanceY      = markerCurrentPos.y - markerPrevPos.y; 
            const distanceZ      = markerCurrentPos.z - markerPrevPos.z; 
            const angleX         = markerCurrentRot.x - markerPrevRot.x;
            const angleY         = markerCurrentRot.y - markerPrevRot.y;
            const angleZ         = markerCurrentRot.z - markerPrevRot.z;
            // trigger events depending on the changed state
            if      (distance >= distThreshold)   this.bus.queue(marker, MarkerEvent.Moved);
            if      (distanceX >= distThreshold)  this.bus.queue(marker, MarkerEvent.MovedRight);
            else if (distanceX <= -distThreshold) this.bus.queue(marker, MarkerEvent.MovedLeft);
            if      (distanceY >= distThreshold)  this.bus.queue(marker, MarkerEvent.MovedUp);
            else if (distanceY <= -distThreshold) this.bus.queue(marker, MarkerEvent.MovedDown);
            if      (distanceZ >= distThreshold)  this.bus.queue(marker, MarkerEvent.MovedForward);
            else if (distanceZ <= -distThreshold) this.bus.queue(marker, MarkerEvent.MovedBackward); 
            if      (angleX >= distThreshold)     this.bus.queue(marker, MarkerEvent.RotatedClockwise);
            else if (angleX <= -distThreshold)    this.bus.queue(marker, MarkerEvent.RotatedCounterClockwise);
            if (Math.abs(angleX) >= angleThreshold || Math.abs(angleY) >= angleThreshold || Math.abs(angleZ) >= angleThreshold){
                this.bus.queue(marker, MarkerEvent.Rotated);
            }
            if (markerVisible == true){
                this.bus.queue(marker, MarkerLoopEvent.WhileVisible);
                if (markerPrevVisible == false) this.bus.queue(marker, MarkerEvent.Visible);
            } else { // marker not visible
                this.bus.queue(marker, MarkerLoopEvent.WhileHidden);
                if (markerPrevVisible == true){
                    this.bus.queue(marker, MarkerEvent.Hidden);
                }
            }            
        }

        /**
         * Update previous and current AR marker state values
         * @param markerState 
         */
        updateMarkerState(markerState : THREEx.ArMarkerState){
            let marker                 = markerState['marker'];
            let markerCurrentPos       = markerState['currentPos'];
            let markerPrevPos          = markerState['prevPos'];
            let markerCurrentRot       = markerState['currentRot'];
            let markerPrevRot          = markerState['prevRot'];       
            let markerPrevVisible      = markerState['prevVisible'];             
            let markerVisible          = markerState['visible'];    
            let markerPrevVisibleTime  = markerState['prevVisibleTime'];
            markerState['prevPos']     = new THREE.Vector3(markerCurrentPos.x,
                                                            markerCurrentPos.y,
                                                             markerCurrentPos.z);
            markerState['prevRot']     = new THREE.Euler(markerCurrentRot.x,
                                                          markerCurrentRot.y,
                                                           markerCurrentRot.z);                                              
            markerState['prevVisible'] = markerVisible;
            markerState['currentPos']  = this.getMarkerPosition(marker);
            markerState['currentRot']  = this.getMarkerRotation(marker);      
            markerState['visible']     = this.getMarkerVisibility(marker);
        }

        runRenderingLoop(){
            let self         = this;
            let lastTimeMsec = 0;
            requestAnimationFrame(function animate(nowMsec){
                requestAnimationFrame(animate);
                lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
                let deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
                lastTimeMsec	= nowMsec;
                self.onRenderFcts.forEach(function(onRenderFct){
                    onRenderFct(deltaMsec/1000, nowMsec/1000);
                });
            });
        }

        kill() {
            if (this.scene) three.removeSceneChildren(this.scene);
            this.onRenderFcts = [];
            this.markers      = {};
        }

        /**
         * Gets or creates a new marker
         * @param marker 
         */
        marker(marker: Marker) : THREEx.ArMarkerState {
            let m = this.markers[marker.toString()];
            if (!m) 
                m = this.markers[marker.toString()] = this.createMarker(marker);
            return m;
        }

        createMarker(marker: Marker): THREEx.ArMarkerState {
            let markerRoot  = new THREE.Group;
            markerRoot.name = 'markerroot' + marker.toString();
            this.scene.add(markerRoot);
            let markerControls = threex.createMarkerControls(marker, markerRoot);
            this.scene.visible = false;
            return threex.createMarkerStateEnum(marker, markerRoot);
        }

        /**
         *  Gets the world x, y, and z coordinates of a marker
         */
        getMarkerPosition(marker: Marker): THREE.Vector3 {
            let markerObj = threex.getMarkerGroup(marker);
            if (markerObj) return markerObj.position;
            else return new THREE.Vector3(-9999,-9999,-9999);
        }

        /**
         *  Gets the world x, y, and z rotations of a marker
         */
        getMarkerRotation(marker: Marker): THREE.Euler {
            let markerObj = threex.getMarkerGroup(marker);
            if (markerObj) return markerObj.rotation;
            else return new THREE.Euler(-9999, -9999, -9999);
        }      

        /**
         *  Gets the world x, y, and z rotations of a marker
         */
        getMarkerVisibility(marker: Marker): boolean {
            let markerState  = this.markers[marker.toString()];
            let prevTimeSeen = markerState['prevVisibleTime'];
            let markerObj    = threex.getMarkerGroup(marker);
            let date         = new Date();
            let time         = date.getTime();
            if (markerObj) {
                if (markerObj.visible ){ // marker visible to artoolkit
                    markerState['prevVisibleTime'] = time;
                    return true;
                } else { // marker not visible to artoolkit
                    if (time - prevTimeSeen >= 250) return false
                    else return true
                }
            }
            return false;
        } 

        /**
         * Gets distance between two markers
         * @param marker1 
         * @param marker2 
         */
        getDistanceBetweenMarkers(marker1: Marker, marker2: Marker): number {
            let markerObj1 = threex.getMarkerGroup(marker1);
            let markerObj2 = threex.getMarkerGroup(marker2);
            if (markerObj1 && markerObj2) return markerObj1.position.distanceTo(markerObj2.position);  
            else return -9999;
        }  
    }

    /**
     * Uses the global variable "renderer" to ensure that it is only created once
     * WebGL contexts cannot be easily destroyed so it is best to just initialize
     * one renderer and give it to the Board constructor whenever it is initialized
     */
    let renderer : any = null;
    function getWebGlContext() : THREE.WebGLRenderer{
        if (renderer == null){
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setClearColor(new THREE.Color('lightgrey'), 0)
            renderer.setSize( 640, 480 );
            renderer.domElement.style.position = 'absolute'
            renderer.domElement.style.top = '0px'
            renderer.domElement.style.left = '0px'
            document.body.appendChild(renderer.domElement);
        }
        return renderer;        
    }

}