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
        
        constructor() {
            super();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            this.initScene();
            this.markers = {};
            return Promise.resolve();
        }       
        
        updateView() {
        }

        /**
         * Initializes the THREE.js scene, renderer, and ARToolkit params
         */
        initScene(){
            // init renderer
            this.renderer	= new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            this.renderer.setClearColor(new THREE.Color('lightgrey'), 0)
            this.renderer.setSize( 640, 480 );
            this.renderer.domElement.style.position = 'absolute'
            this.renderer.domElement.style.top = '0px'
            this.renderer.domElement.style.left = '0px'
            document.body.appendChild(this.renderer.domElement);

            // array of functions for the rendering loop
            var onRenderFcts= [];

            // init scene and camera
            this.scene	= new THREE.Scene();
            this.camera = new THREE.Camera();
            this.scene.add(this.camera);

            this.arToolkitSource = new THREEx.ArToolkitSource({
                sourceType : 'webcam',
            })
            this.arToolkitSource.init(function onReady(){
                onResize()
            })
            
            window.addEventListener('resize', function(){
                onResize()
            })
            function onResize(){
                this.arToolkitSource.onResize()	
                this.arToolkitSource.copySizeTo(this.renderer.domElement)	
                if( this.arToolkitContext.arController !== null ){
                    this.arToolkitSource.copySizeTo(this.arToolkitContext.arController.canvas)	
                }	
            }

            // create arToolkitContext
            this.arToolkitContext = new THREEx.ArToolkitContext({
                cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
                detectionMode: 'mono_and_matrix',
                matrixCodeType: '3x3'
            })
            this.arToolkitContext.init(function onCompleted(){
                // copy projection matrix to camera
                this.camera.projectionMatrix.copy(this.arToolkitContext.getProjectionMatrix());
            })

            // update artoolkit on every frame
            onRenderFcts.push(function(){
                if(this.arToolkitSource.ready === false) return
                this.arToolkitContext.update(this.arToolkitSource.domElement)
                this.scene.visible = this.camera.visible
            })
            
        }

        kill() {
            // TODO: remove AFrame scene and DOM
            if (this.scene) {}
            this.markers = {};
        }

        // gets or creates a new marker
        marker(marker: Marker) : THREEx.ArMarkerControls {
            let m = this.markers[marker.toString()];
            if (!m) 
                m = this.markers[marker.toString()] = this.createMarker(marker);
            return m;
        }

        createMarker(marker: Marker): THREEx.ArMarkerControls {
            let markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.camera, {
                type : 'barcode',
                barcodeValue : marker,
                changeMatrixMode: 'cameraTransformMatrix'
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