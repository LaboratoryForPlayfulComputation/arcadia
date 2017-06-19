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
        public bus: pxsim.EventBus;
        public scene :  THREE.Scene;
        public camera: THREE.Camera;
        public markers: pxsim.Map<THREE.Group>;
        public markerStates: pxsim.Map<THREEx.ArMarkerState>;
        public arToolkitContext: THREEx.ArToolkitContext;
        public arToolkitSource: THREEx.ArToolkitSource;
        public renderer: THREE.WebGLRenderer;
        public baseURL: String;
        public onRenderFcts: Array<any>;
        
        constructor() {
            super();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            this.bus = new pxsim.EventBus(runtime);
            this.markers = {};
            this.markerStates = {};
            this.baseURL = '/sim/AR.js/three.js/';
            this.renderer = getWebGlContext(); // singleton
            this.camera = three.createCamera();
            this.scene = three.createScene();
            this.scene.add(this.camera);      
            this.scene.add(three.createDirectionalLight());
            this.scene.add(three.createAmbientLight());
            this.arToolkitSource = three.createArToolkitSource();
            this.arToolkitContext = three.createArToolkitContext(this.baseURL);
            this.initArToolkitCallbacks();
            this.initRenderFunctions();
            this.runRenderingLoop();
            return Promise.resolve();
        }       
        
        /**
         * Initializes the ArToolkit Source and Context callbacks
         */
        initArToolkitCallbacks(){
            let self = this;
            this.arToolkitSource.init(function onReady(){
                onResize();
            })    
            window.addEventListener('resize', function(){
                onResize();
            })           
            function onResize(){
                if (self.arToolkitSource){
                    self.arToolkitSource.onResize();
                    self.arToolkitSource.copySizeTo(self.renderer.domElement);
                    if (self.arToolkitContext && (self.arToolkitContext.arController !== null)){
                        self.arToolkitSource.copySizeTo(self.arToolkitContext.arController.canvas);
                    }
                }
            }
            this.arToolkitContext.init(function onCompleted(){
                if (self.camera){
                    self.camera.projectionMatrix.copy(self.arToolkitContext.getProjectionMatrix());
                }
            })
        }

        initRenderFunctions(){
            this.onRenderFcts= [];
            let self = this; // the "this" keyword gets lost in the request animation frame callback
            this.onRenderFcts.push(function(){
                if(self.arToolkitSource.ready === false) return
                self.arToolkitContext.update(self.arToolkitSource.domElement)
                if (self.scene && self.camera){
                    self.scene.visible = self.camera.visible
                }
            })
            this.onRenderFcts.push(function(){ 	// render the scene
                if (self.renderer && self.scene && self.camera){
                    self.renderer.render(self.scene, self.camera);
                }
            })
            self = this; // now that we've added some functions to this.onRenderFcts, we need to update "self"          
        }

        runRenderingLoop(){
            let lastTimeMsec = 0;
            let self = this; // the "this" keyword gets lost in the request animation frame callback
            requestAnimationFrame(function animate(nowMsec){
                requestAnimationFrame(animate);
                lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
                let deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
                lastTimeMsec	= nowMsec;
                self.onRenderFcts.forEach(function(onRenderFct){
                    onRenderFct(deltaMsec/1000, nowMsec/1000);
                })
            })
        }

        kill() {
            if (this.scene) three.removeSceneChildren(this.scene);
            //if (this.renderer) this.removeRendererChildren();
            this.onRenderFcts = [];
            this.markers = {};
            this.markerStates = {};
            this.arToolkitContext = null;
            this.arToolkitSource = null;
            this.camera = null;            
            this.scene = null;
        }

        /**
         * Gets or creates a new marker
         * @param marker 
         */
        marker(marker: Marker) : THREE.Group {
            let m = this.markers[marker.toString()];
            if (!m) 
                m = this.markers[marker.toString()] = this.createMarker(marker);
            return m;
        }

        createMarker(marker: Marker): THREE.Group {
            let markerRoot = new THREE.Group;
            markerRoot.name = 'markerroot' + marker.toString();
            this.scene.add(markerRoot);
            let markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, markerRoot, {
                type : 'barcode',
                barcodeValue : marker,
                changeMatrixMode: 'modelViewMatrix',
                size: 1,
                patternUrl: null,
            })
            this.scene.visible = false;
            this.markerStates[marker.toString()] = {
                group: markerRoot,
                scripts: {}
            }
            return markerRoot;
        }

        /**
         *  Gets the world x, y, and z coordinates of a marker
         */
        getMarkerPosition(marker: Marker): THREEx.Coordinate {
            let markerObj = this.scene.getObjectByName('markerroot' + marker.toString());
            if (markerObj){
              return markerObj.position;
            } else{
                return {x: -9999, y: -9999, z: -9999};
            }
        }

        /**
         *  Gets the world x, y, and z rotations of a marker
         */
        getMarkerRotation(marker: Marker): THREEx.Coordinate {
            let markerObj = this.scene.getObjectByName('markerroot' + marker.toString());
            if (markerObj){
              return markerObj.rotation;
            }
            return {x: -9999, y: -9999, z: -9999};
        }      

        /**
         * Gets distance between two markers
         * @param marker1 
         * @param marker2 
         */
        getDistanceBetweenMarkers(marker1: Marker, marker2: Marker): number {
            let markerObj1 = this.scene.getObjectByName('markerroot' + marker1.toString());
            let markerObj2 = this.scene.getObjectByName('markerroot' + marker2.toString());
            if (markerObj1 && markerObj2){
                return markerObj1.position.distanceTo(markerObj2.position);  
            }
            return -9999;
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
            renderer	= new THREE.WebGLRenderer({
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