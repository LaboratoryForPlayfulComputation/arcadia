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
                this.scene.remove();
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
            let boxEl = document.createElement('a-box');
            let torusKnotEl = document.createElement('a-torus-knot');
            let animationEl = document.createElement('a-animation');
            let slider = document.createElement('ui-entity');
            markerEl.setAttribute('type', 'barcode'); 
            markerEl.setAttribute('value', marker.toString()); 
            markerEl.setAttribute('id', 'marker' + marker.toString()); 
            boxEl.setAttribute('material', 'opacity: 0.75; side: double; color:purple;');
            torusKnotEl.setAttribute('radius', '0.27');
            torusKnotEl.setAttribute('radius-tubular', '0.05');
            animationEl.setAttribute('attribute', 'rotation');
            animationEl.setAttribute('to', '360 0 0');
            animationEl.setAttribute('dur', '5000');
            animationEl.setAttribute('easing', 'linear');
            animationEl.setAttribute('repeat', 'indefinite');
            this.scene.appendChild(markerEl); 
            markerEl.appendChild(boxEl);
            boxEl.appendChild(torusKnotEl);
            torusKnotEl.appendChild(animationEl);                    
            return markerEl as AFrame.Entity;
        }
    }
}