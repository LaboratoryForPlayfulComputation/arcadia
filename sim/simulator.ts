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
        public scene :  THREE.Scene;
        public camera: THREE.Camera;
        public markers: pxsim.Map<THREEx.ArMarkerControls>;
        public arToolkitContext: THREEx.ArToolkitContext;
        public arToolkitSource: THREEx.ArToolkitSource;
        public renderer: THREE.WebGLRenderer;
        public baseURL: String;
        public onRenderFcts: Array<any>;
        
        constructor() {
            super();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            this.baseURL = '/sim/AR.js/three.js/';
            this.onRenderFcts= [];
            this.markers = {};
            this.renderer = this.initRenderer();
            this.camera = this.initCamera();
            this.scene = this.initScene();
            this.initArToolkit();
            this.initRenderFunctions();
            this.runRenderingLoop();
            return Promise.resolve();
        }       
        
        updateView() {
        }

        /**
         * Initializes the THREE.js renderer
         */
        initRenderer(): THREE.WebGLRenderer{
            let renderer	= new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setClearColor(new THREE.Color('lightgrey'), 0)
            renderer.setSize( 640, 480 );
            renderer.domElement.style.position = 'absolute'
            renderer.domElement.style.top = '0px'
            renderer.domElement.style.left = '0px'
            document.body.appendChild(renderer.domElement);
            return renderer;
        }

        /**
         * Initializes the THREE.js scene
         */
        initScene() : THREE.Scene{
            let scene	= new THREE.Scene();
            scene.add(this.camera);  
            return scene;    
        }
        /**
         * Initializes the THREE.js camera
         */
        initCamera() : THREE.Camera{
            return new THREE.Camera();
        }
        /**
         * Initializes the ArToolkit Source and Context
         */
        initArToolkit(){
            // create arToolkitSource
            this.arToolkitSource = new THREEx.ArToolkitSource({
                sourceType : 'webcam',
                sourceURL : null,
            });

            // create arToolkitContext
            this.arToolkitContext = new THREEx.ArToolkitContext({
                cameraParametersUrl: this.baseURL + '../data/data/camera_para.dat',
                detectionMode: 'mono_and_matrix',
                matrixCodeType: '3x3'
            });

            this.arToolkitSource.init(function onReady(){
                onResize()
            })
            window.addEventListener('resize', function(){
                onResize()
            })
            let self = this;
            function onResize(){
                self.arToolkitSource.onResize();
                self.arToolkitSource.copySizeTo(self.renderer.domElement);	
                if(self.arToolkitContext.arController !== null){
                    self.arToolkitSource.copySizeTo(self.arToolkitContext.arController.canvas);	
                }	
            }
            this.arToolkitContext.init(function onCompleted(){
                // copy projection matrix to camera
                self.camera.projectionMatrix.copy(self.arToolkitContext.getProjectionMatrix());
            })                        
        }

        initRenderFunctions(){
            // update artoolkit on every frame
            let self = this; // the "this" keyword gets lost in the request animation frame callback
            this.onRenderFcts.push(function(){
                if(self.arToolkitSource.ready === false) return
                self.arToolkitContext.update(self.arToolkitSource.domElement)
                self.scene.visible = self.camera.visible
            })
            this.onRenderFcts.push(function(){ 	// render the scene
                self.renderer.render(self.scene, self.camera);
            })
            self = this; // now that we've added some functions to this.onRenderFcts, we need to update "self"          
        }

        runRenderingLoop(){
            let lastTimeMsec = null
            let self = this; // the "this" keyword gets lost in the request animation frame callback
            requestAnimationFrame(function animate(nowMsec){
                // keep looping
                requestAnimationFrame(animate);
                // measure time
                lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
                let deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
                lastTimeMsec	= nowMsec;
                // call each update function
                self.onRenderFcts.forEach(function(onRenderFct){
                    onRenderFct(deltaMsec/1000, nowMsec/1000);
                })
            })
        }

        kill() {
            // TODO: remove all three.js stuff?
            if (this.scene) {}
            this.markers = {};
        }

        // gets or creates a new marker
        marker(marker: Marker) : THREEx.ArMarkerControls {
            let m = this.markers[marker.toString()];
            if (!m) 
                m = this.markers[marker.toString()] = this.createMarker(marker);
            console.log(m);
            return m;
        }

        createMarker(marker: Marker): THREEx.ArMarkerControls {
            let markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.camera, {
                type : 'barcode',
                barcodeValue : 5,
                changeMatrixMode: 'cameraTransformMatrix',
                size: 1,
                patternUrl: null,
            })
            // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
            this.scene.visible = false;
            return markerControls;
        }

        /**
         *  Gets the world x, y, and z coordinates of a marker
         */
        getMarkerPosition(marker: Marker): THREEx.Coordinate {
            let markerEl = this.marker(marker);
            return this.marker(marker).object3D.getWorldPosition();
        }

        /**
         *  Gets the world x, y, and z rotations of a marker
         */
        getMarkerRotation(marker: Marker): THREEx.Coordinate {
            let markerEl = this.marker(marker);
            return this.marker(marker).object3D.getWorldRotation();
        }        
    }
}