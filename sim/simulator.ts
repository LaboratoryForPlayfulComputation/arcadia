/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
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
        public element : AFrame.AScene;
        
        constructor() {
            super();
            this.element = <AFrame.AScene>document.getElementById('a-scene');
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {

            return Promise.resolve();
        }       
        
        updateView() {
            
        }
    }
}