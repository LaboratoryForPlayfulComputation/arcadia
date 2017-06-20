namespace pxsim.threex {

    export function createMarkerControls(marker : Marker, markerRoot : THREE.Group) : THREEx.ArMarkerControls {
        return new THREEx.ArMarkerControls(board().arToolkitContext, markerRoot, {
                type : 'barcode',
                barcodeValue : marker,
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
    export function createArToolkitSource() : THREEx.ArToolkitSource {
        let arToolkitSource = new THREEx.ArToolkitSource({
            sourceType : 'webcam',
            sourceURL : null,
        });            
        return arToolkitSource;          
    }

    /**
     * Creates the AR Toolkit Context which defines
     * the detection mode we will be using for discovering
     * matrix markers
     * @param baseURL 
     */
    export function createArToolkitContext(baseURL : String) : THREEx.ArToolkitContext {
        let arToolkitContext = new THREEx.ArToolkitContext({
            cameraParametersUrl: baseURL + '../data/data/camera_para.dat',
            detectionMode: 'mono_and_matrix',
            matrixCodeType: '3x3'
        });
        return arToolkitContext;
    }

    /**
     * Initializes the ArToolkit Source and Context callbacks
     */
    export function initArToolkitCallbacks(){
        let self = board();
        board().arToolkitSource.init(function onReady(){
            onResize();
        });    
        window.addEventListener('resize', () => onResize());           
        function onResize(){
            if (self.arToolkitSource){
                self.arToolkitSource.onResize();
                self.arToolkitSource.copySizeTo(self.renderer.domElement);
                if (self.arToolkitContext && (self.arToolkitContext.arController !== null)){
                    self.arToolkitSource.copySizeTo(self.arToolkitContext.arController.canvas);
                }
            }
        }
        board().arToolkitContext.init(function onCompleted(){
            if (self.camera){
                self.camera.projectionMatrix.copy(self.arToolkitContext.getProjectionMatrix());
            }
        });
    }    

}