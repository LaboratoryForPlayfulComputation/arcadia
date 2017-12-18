/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../typings/globals/three/index.d.ts" />
/// <reference path="../typings/globals/peerjs/index.d.ts" />
/// <reference path="../typings/globals/three-vreffect/index.d.ts" />
/// <reference path="aframe.d.ts" />
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
    export function board(): Board {
        return runtime.board as Board;
    }

    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public bus              : pxsim.EventBus;
        public font             : THREE.Font;
        public scene            : THREE.Scene;
        public camera           : THREE.Camera;
        public markers          : pxsim.Map<pxsim.markers.Marker>;
        public markerColors     : Array<number>;
        public arToolkitContext : THREEx.ArToolkitContext;
        public arToolkitSource  : THREEx.ArToolkitSource;
        public renderer         : THREE.WebGLRenderer;
        public stereoRenderer   : any;
        public mirror           : boolean;
        public vrEffect         : boolean;
        public baseURL          : string;
        public onRenderFcts     : Array<any>;
        
        constructor() {
            super();

            this.bus  = new pxsim.EventBus(runtime);
            this.font = three.parseFont(font.helvetiker_regular);
            
            /* AR */
            this.markers          = {};
            this.markerColors     = [0xff0000, 0xff4c00, 0xffe100, 0x33b500,
                                        0x00660a, 0x00e082, 0x00e0ba, 0x006ee5,
                                            0x0003e5, 0x4200a5, 0x6600ff, 0xe500ff,
                                                0xff00a5, 0x822600, 0x000000, 0xffffff];
            this.renderer         = getWebGlContext();
            this.stereoRenderer   = getStereoRenderer();
            this.mirror           = false;
            this.vrEffect         = false;
            this.camera           = three.createCamera();
            this.scene            = three.createScene();
            this.scene.add(this.camera);      
            this.scene.add(three.createDirectionalLight());
            this.scene.add(three.createAmbientLight());                  
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            this.baseURL = msg.cdnUrl;

            /* start rendering */                    
            threex.initArToolkit();
            this.initMarkers();
            this.initRenderFunctions(); 
            this.runRenderingLoop();   
                       
            return Promise.resolve();  
        }       

        /**
         * Define functions that we want to run on every render loop
         */
        initRenderFunctions(){
            this.onRenderFcts = [];
            /* update the AR toolkit source and context */
            this.onRenderFcts.push(() => {
                if(!this.arToolkitSource || this.arToolkitSource.ready === false) return
                this.arToolkitContext.update(this.arToolkitSource.domElement)
                if (this.scene && this.camera)
                    this.scene.visible = this.camera.visible;
            });
            /* render the THREE.js scene */
            this.onRenderFcts.push(() => {
                if (!this.vrEffect){
                    if (this.renderer && this.scene && this.camera)
                        this.renderer.render(this.scene, this.camera);
                }
                else{
                    if (this.stereoRenderer && this.scene && this.camera)
                        this.stereoRenderer.render(this.scene, this.camera);                    
                }
            });
            /* updates marker state and triggers events if position or rotation changes */
            this.onRenderFcts.push(() => {
                for (var key in this.markers){
                    let marker = this.markers[key];
                    marker.triggerEvents();
                    if (marker.painting()) marker.paint();
                    marker.updateState();      
                }
            });
        }

        initMarkers(){
            for (let i = 0; i < 16; i++){
                //this.marker(i);
                design.setShape(i, Shape.Box);
            }
        }

        runRenderingLoop(){
            let self = this;
            let lastTimeMsec = 0;
            requestAnimationFrame(function animate(nowMsec){
                requestAnimationFrame(animate);
                lastTimeMsec = lastTimeMsec || nowMsec-1000/60;
                let deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
                lastTimeMsec = nowMsec;
                self.onRenderFcts.forEach(function(onRenderFct){
                    onRenderFct(deltaMsec/1000, nowMsec/1000);
                });
            });
        }

        kill() {
            design.removeAllFilters();
            if (this.scene)       three.removeSceneChildren(this.scene);
            this.onRenderFcts = [];
            this.markers = {};
        }

        /**
         * Gets or creates a new marker
         * @param marker 
         */
        marker(marker: MarkerCode): pxsim.markers.Marker {
            if (!this.markers) this.markers = {};
            let m = this.markers[marker.toString()];
            if (!m) 
                m = this.markers[marker.toString()] = new pxsim.markers.Marker(marker, this.markerColors[marker]);
            return m;
        }

    }

    /**
     * Uses the global variable "renderer" to ensure that it is only created once
     * WebGL contexts cannot be easily destroyed so it is best to just initialize
     * one renderer and give it to the Board constructor whenever it is initialized
     */
    let renderer: any = null;
    function getWebGlContext(): THREE.WebGLRenderer{
        if (renderer == null){
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
                //canvas: document.getElementById("scene3dcanvas") as HTMLCanvasElement
            });
            renderer.setClearColor(new THREE.Color('lightgrey'), 0);
            let width = window.innerWidth ||
                        document.documentElement.clientWidth ||
                        document.body.clientWidth ||
                        document.body.offsetWidth;
            let height = window.innerHeight ||
                        document.documentElement.clientHeight ||
                        document.body.clientHeight ||
                        document.body.offsetHeight;                        
            renderer.setSize(width, height);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = '0px';
            renderer.domElement.style.left = '0px';
            //let scene3d = document.getElementById("scene3d");
            //scene3d.appendChild(renderer.domElement);
            document.body.appendChild(renderer.domElement);
        }
        return renderer;        
    }

    let stereoRenderer: any = null;
    function getStereoRenderer(): any {
        if (stereoRenderer == null){
          //stereoRenderer = new (THREE as any).StereoEffect(getWebGlContext());
          stereoRenderer = new (THREE as any).VREffect(getWebGlContext());
        let width = window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth ||
                    document.body.offsetWidth;
        let height = window.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight ||
                    document.body.offsetHeight;            
          stereoRenderer.setSize(width, height);
        }
        return stereoRenderer;
    }

    function isChrome() {
        var isChromium = (window as any).chrome,
            winNav = window.navigator,
            vendorName = winNav.vendor,
            isOpera = winNav.userAgent.indexOf("OPR") > -1,
            isIEedge = winNav.userAgent.indexOf("Edge") > -1,
            isIOSChrome = winNav.userAgent.match("CriOS");

        if(isIOSChrome) return true;
        else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false)
            return true;
        else return false;
    }

}