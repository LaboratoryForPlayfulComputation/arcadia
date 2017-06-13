/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../typings/globals/three/index.d.ts" />
/// <reference path="../typings/globals/three-vreffect/index.d.ts" />
/// <reference path="aframe.d.ts" />

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
        public scene :  AFrame.Scene;
        public markers: pxsim.Map<AFrame.Entity>;
        
        constructor() {
            super();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            this.scene = <AFrame.Scene>document.getElementById('a-scene');
            this.markers = {};
            return Promise.resolve();
        }       
        
        updateView() {
        }

        kill() {
            // TODO: remove AFrame scene and DOM
            if (this.scene) {
                while (this.scene.firstChild){
                    this.scene.removeChild(this.scene.firstChild);
                }
                this.markers = {};
            }
        }

        // gets or creates a new marker
        marker(marker: Marker) : AFrame.Entity {
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