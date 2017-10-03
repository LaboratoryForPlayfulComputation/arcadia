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


    let arToolkitContextSingleton = null as any;
    let arToolkitSourceSingleton = null as any;
    export function initArToolkit(){
        if (!arToolkitContextSingleton && !arToolkitSourceSingleton){
            let arToolkitSource = new THREEx.ArToolkitSource({
                sourceType: 'webcam',
                sourceURL: null,
                sourceWidth: 1200,
                sourceHeight: 675,
                displayWidth: 1200,
                displayHeight: 675             
            });   
            let arToolkitContext = new THREEx.ArToolkitContext({
                cameraParametersUrl: board().baseURL + 'AR.js/data/data/camera_para.dat',
                detectionMode: 'mono_and_matrix',
                matrixCodeType: '3x3'
            });

            let self = board();
            arToolkitSource.init(function onReady(){
                onResize();
            });    
            window.addEventListener('resize', () => onResize());           
            function onResize(){
                if (arToolkitSource){
                    arToolkitSource.onResize();
                    arToolkitSource.copySizeTo(self.renderer.domElement);
                    if (arToolkitContext && (arToolkitContext.arController !== null))
                        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
                }
            }
            arToolkitContext.init(function onCompleted(){
                if (self.camera) self.camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
            });
                        
            arToolkitContextSingleton = arToolkitContext;
            arToolkitSourceSingleton = arToolkitSource;
        }
        board().arToolkitContext = arToolkitContextSingleton;
        board().arToolkitSource = arToolkitSourceSingleton;
    }

}