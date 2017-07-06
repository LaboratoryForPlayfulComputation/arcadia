namespace pxsim.threex {

    export function createMarkerControls(marker: MarkerCode, markerRoot: THREE.Group): THREEx.ArMarkerControls {
        return new THREEx.ArMarkerControls(board().arToolkitContext, markerRoot, {
                type: 'barcode',
                barcodeValue: marker,
                changeMatrixMode: 'modelViewMatrix',
                size: 1,
                patternUrl: null,
            })
    }

    /**
     * Creates the AR Toolkit Source which defines
     * where our imagery is coming from -- in this case
     * we are using the webcam as our source
     */
    let arToolkitSource: any = null
    export function createArToolkitSource(): THREEx.ArToolkitSource {
        if (arToolkitSource == null){
            arToolkitSource = new THREEx.ArToolkitSource({
                sourceType: 'webcam',
                sourceURL: null,
            });   
        }         
        return arToolkitSource;          
    }

    /**
     * Creates the AR Toolkit Context which defines
     * the detection mode we will be using for discovering
     * matrix markers.
     * singleton
     * @param baseURL 
     */
    let arToolkitContext: any = null
    export function createArToolkitContext(): THREEx.ArToolkitContext {
        if (arToolkitContext == null){
            arToolkitContext = new THREEx.ArToolkitContext({
                cameraParametersUrl: board().baseURL + '../data/data/camera_para.dat',
                detectionMode: 'mono_and_matrix',
                matrixCodeType: '3x3'
            });
        }
        return arToolkitContext;
    }

    /**
     * Initializes the ArToolkit Source and Context callbacks
     */
    let initialized = false;
    export function initArToolkitCallbacks(){
        if (!initialized){
            let self = board();
            self.arToolkitSource.init(function onReady(){
                onResize();
            });    
            window.addEventListener('resize', () => onResize());           
            function onResize(){
                if (self.arToolkitSource){
                    self.arToolkitSource.onResize();
                    self.arToolkitSource.copySizeTo(self.renderer.domElement);
                    if (self.arToolkitContext && (self.arToolkitContext.arController !== null))
                        self.arToolkitSource.copySizeTo(self.arToolkitContext.arController.canvas);
                }
            }
            self.arToolkitContext.init(function onCompleted(){
                if (self.camera) self.camera.projectionMatrix.copy(self.arToolkitContext.getProjectionMatrix());
            });            
            initialized = true;
        }
    }    

}