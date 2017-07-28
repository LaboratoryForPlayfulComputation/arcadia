/// <reference path="../node_modules/pxt-core/typings/globals/bluebird/index.d.ts"/>
/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../typings/globals/three/index.d.ts" />
/// <reference path="../typings/globals/three-vreffect/index.d.ts" />
/// <reference path="aframe.d.ts" />
/// <reference path="threex.d.ts" />
/// <reference path="tone.d.ts" />

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
        public font             : String;
        public scene            : THREE.Scene;
        public camera           : THREE.PerspectiveCamera;
        public markers          : pxsim.Map<pxsim.markers.Marker>;
        public arToolkitContext : THREEx.ArToolkitContext;
        public arToolkitSource  : THREEx.ArToolkitSource;
        public renderer         : THREE.WebGLRenderer;
        public stereoRenderer   : any;
        public video            : threex.ArVideo;
        public mirror           : boolean;
        public vrEffect         : boolean;
        public baseURL          : string;
        public onRenderFcts     : Array<any>;
        public instruments      : Array<Tone.Instrument>;
        public fx               : pxsim.Map<Tone.Effect>;
        public monosynth        : Tone.MonoSynth;
        public polysynth        : Tone.PolySynth;
        public drumPlayers      : pxsim.Map<Tone.Player>;
        public phrases          : pxsim.Map<pxsim.phrases.Phrase>;
        public drumMachine      : Tone.MultiPlayer;
        public drumSamples      : Tone.Buffers;
        public oscillators      : pxsim.Map<Tone.Oscillator>;
        
        constructor() {
            super();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            this.baseURL = msg.cdnUrl;
            return three.loadFontAsync(this.baseURL)
                .then(font => {
                    this.font = font;
                    return tone.loadDrumSamplesAsync(this.baseURL)
                        .then(drumSamples => {
                            this.bus  = new pxsim.EventBus(runtime);
                            /* AR */
                            this.markers          = {};
                            this.renderer         = getWebGlContext();
                            this.stereoRenderer   = getStereoRenderer();
                            this.mirror           = false;
                            this.vrEffect         = true;
                            this.camera           = three.createCamera();
                            this.scene            = three.createScene();
                            threex.initArToolkit();
                            this.scene.add(this.camera);      
                            this.scene.add(three.createDirectionalLight());
                            this.scene.add(three.createAmbientLight());      
                            this.initRenderFunctions();
                            /* music */
                            this.phrases     = {};
                            this.instruments = [];
                            this.fx          = {};            
                            this.monosynth   = tone.createMonoSynth().toMaster();  // for play tone blocks
                            this.polysynth   = tone.createPolySynth(5).toMaster(); // for play chord blocks
                            this.instruments.push(this.monosynth);
                            this.instruments.push(this.polysynth);
                            this.drumSamples = drumSamples;
                            this.drumPlayers = {"kick" : new Tone.Player(this.drumSamples.get("kick")).toMaster(), // for one-off drum hits
                                                "snare": new Tone.Player(this.drumSamples.get("snare")).toMaster(),
                                                "hihat": new Tone.Player(this.drumSamples.get("hihat")).toMaster(),
                                                "click": new Tone.Player(this.drumSamples.get("click")).toMaster(),
                                                "splat": new Tone.Player(this.drumSamples.get("splat")).toMaster()};
                            this.drumMachine = tone.createDrumMachine().toMaster(); // for building drum sequences
                            this.oscillators = {"sine": tone.createOsc(Wave.Sine, 440),
                                                "square": tone.createOsc(Wave.Square, 440),
                                                "triangle": tone.createOsc(Wave.Triangle, 440),
                                                "sawtooth": tone.createOsc(Wave.Sawtooth, 440)};
                            tone.bpm(120);
                            /* start rendering */                    
                            this.runRenderingLoop();   
                            tone.startTransport(0);    
                            music.setVolume(50);
                            return Promise.resolve();                            
                        });
                });
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
            board().onRenderFcts.push(() => {this.video.update(this.camera);});              
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
            document.body.className = ""; // removes all filters added from usercode
            if (this.scene)       three.removeSceneChildren(this.scene);
            if (this.fx)          tone.killFX();
            if (this.phrases)     tone.killPhrases();
            if (this.instruments) tone.killInstruments();
            if (this.oscillators) tone.killOscillators();
            tone.stopTransport();
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
                m = this.markers[marker.toString()] = new pxsim.markers.Marker(marker);
            return m;
        }

        /**
         * Gets a phrase
         * @param name 
         */
        phrase(name: string): pxsim.phrases.Phrase {
            return this.phrases[name];
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
            document.body.appendChild(renderer.domElement);
        }
        return renderer;        
    }

    let stereoRenderer: any = null;
    function getStereoRenderer(): any {
        if (stereoRenderer == null){
          stereoRenderer = new (THREE as any).StereoEffect(getWebGlContext());
          //stereoRenderer = new (THREE as any).VREffect(getWebGlContext());
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

}