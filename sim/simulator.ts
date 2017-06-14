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
        public markers: pxsim.Map<THREEx.ArMarkerControls>;
        
        constructor() {
            super();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            this.scene = this.initScene();
            this.markers = {};
            return Promise.resolve();
        }       
        
        updateView() {
        }

        initScene(){
            // init renderer
            var renderer	= new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setClearColor(new THREE.Color('lightgrey'), 0)
            renderer.setSize( 640, 480 );
            renderer.domElement.style.position = 'absolute'
            renderer.domElement.style.top = '0px'
            renderer.domElement.style.left = '0px'
            document.body.appendChild( renderer.domElement );

            // array of functions for the rendering loop
            var onRenderFcts= [];

            // init scene and camera
            var scene	= new THREE.Scene();
            var camera = new THREE.Camera();
            scene.add(camera);

            var arToolkitSource = new THREEx.ArToolkitSource({
                sourceType : 'webcam',
            })

            arToolkitSource.init(function onReady(){
                onResize()
            })
            
            // handle resize
            window.addEventListener('resize', function(){
                onResize()
            })
            function onResize(){
                arToolkitSource.onResize()	
                arToolkitSource.copySizeTo(renderer.domElement)	
                if( arToolkitContext.arController !== null ){
                    arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
                }	
            }

            // create arToolkitContext
            var arToolkitContext = new THREEx.ArToolkitContext({
                cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
                detectionMode: 'mono_and_matrix',
                matrixCodeType: '3x3'
            })
            // initialize it
            arToolkitContext.init(function onCompleted(){
                // copy projection matrix to camera
                camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
            })

            // update artoolkit on every frame
            onRenderFcts.push(function(){
                if( arToolkitSource.ready === false )	return
                arToolkitContext.update( arToolkitSource.domElement )
                scene.visible = camera.visible
            })            

            return scene;
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

        createMarker(marker: Marker): AFrame.Entity {
            // TODO: do something better here
            let markerEl = document.createElement('a-marker');
            markerEl.setAttribute('type', 'barcode'); 
            markerEl.setAttribute('value', marker.toString()); 
            markerEl.setAttribute('id', 'marker' + marker.toString()); 
            this.scene.appendChild(markerEl); 
            return markerEl as AFrame.Entity;
        }

        /**
         *  Gets the world x, y, and z coordinates of a marker
         */
        getMarkerPosition(marker: Marker): {x: Number, y: Number, z: Number} {
            let markerEl = this.marker(marker);
            let pos = {x: markerEl.object3D.getWorldPosition().x,
                       y: markerEl.object3D.getWorldPosition().y,
                       z: markerEl.object3D.getWorldPosition().z};
            return pos;
        }

        /**
         *  Gets the world x, y, and z rotations of a marker
         */
        getMarkerRotation(marker: Marker): {x: Number, y: Number, z: Number} {
            let markerEl = this.marker(marker);
            let rot = {x: markerEl.object3D.getWorldRotation().x,
                       y: markerEl.object3D.getWorldRotation().y,
                       z: markerEl.object3D.getWorldRotation().z};
            return rot;
        }        
    }
}