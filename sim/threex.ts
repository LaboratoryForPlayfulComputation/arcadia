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

    let arToolkitContext = null as any;
    let arToolkitSource = null as any;
    export function initArToolkit(){
        if (!arToolkitContext && !arToolkitSource){
            arToolkitSource = new THREEx.ArToolkitSource({
                sourceType: 'webcam',
                sourceURL: null,
                sourceWidth: 1200,
                sourceHeight: 675,
                displayWidth: 1200,
                displayHeight: 675             
            });   
            arToolkitContext = new THREEx.ArToolkitContext({
                cameraParametersUrl: board().baseURL + 'AR.js/data/data/camera_para.dat',
                detectionMode: 'mono_and_matrix',
                matrixCodeType: '3x3'
            });

            let self = board();
            arToolkitSource.init(() => {
                onResize(arToolkitSource, arToolkitContext);
                initArVideo(arToolkitSource);
            });            
            window.addEventListener('resize', () => onResize(arToolkitSource, arToolkitContext));           
            function onResize(arToolkitSource: THREEx.ArToolkitSource, arToolkitContext: THREEx.ArToolkitContext){
                if (arToolkitSource){
                    arToolkitSource.onResize(self.renderer.domElement);
                    //arToolkitSource.copySizeTo(self.renderer.domElement);
                    let elWidth = parseFloat(arToolkitSource.domElement.style.width);
                    let elHeight = parseFloat(arToolkitSource.domElement.style.height);
                    board().stereoRenderer.setSize(elWidth, elHeight);
                    if (arToolkitContext && (arToolkitContext.arController !== null))
                        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
                    if (board().camera){
                    	(board().camera as any).aspect = elWidth / elHeight;
			            (board().camera as any).updateProjectionMatrix();
                    }	
                }
            }

            arToolkitContext.init(() => {
                if (self.camera) self.camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
            });
        }
        initArVideo(arToolkitSource);
        board().arToolkitContext = arToolkitContext;
        board().arToolkitSource = arToolkitSource;
    }

    function initArVideo(arToolkitSource: THREEx.ArToolkitSource){
        let videoTexture = new THREE.VideoTexture(arToolkitSource.domElement as HTMLVideoElement);
        videoTexture.minFilter =  THREE.NearestFilter;
        //let videoInWebgl = new THREEx.ArVideoInWebgl(videoTexture);
        let videoInWebgl = new ArVideo(videoTexture, arToolkitSource);
        board().scene.add(videoInWebgl.object3d);	
        arToolkitSource.domElement.style.visibility = 'hidden';   
        board().video = videoInWebgl;
    }

    export class ArVideo {
        public videoTexture: THREE.VideoTexture;
        public source      : THREEx.ArToolkitSource;
        public object3d    : THREE.Object3D;

        constructor(videoTexture: THREE.VideoTexture, source: THREEx.ArToolkitSource){
            this.videoTexture = videoTexture;
            this.source = source;
            var geometry = new THREE.PlaneGeometry(2, 2);
            var material = new THREE.MeshBasicMaterial({
                map : videoTexture,
            });
            var seethruPlane = new THREE.Mesh(geometry, material);
            this.object3d = seethruPlane;            
        }

        update(camera: THREE.PerspectiveCamera) {
            camera.updateMatrixWorld(true)
            var position = new THREE.Vector3(-0,0,-20)	// TODO how come you got that offset on x ???
            var position = new THREE.Vector3(-0,0,-20)	// TODO how come you got that offset on x ???
            this.object3d.position.copy(position)
            camera.localToWorld(this.object3d.position)
            camera.matrixWorld.decompose( camera.position, camera.quaternion, camera.scale );	
            this.object3d.quaternion.copy( camera.quaternion )
            var fov = THREE.Math.radToDeg(Math.atan(1/camera.projectionMatrix.elements[5]))*2;
            var elementWidth = parseFloat((this.source.domElement.style.width.replace(/px$/,''), 10 ) as any);
            var elementHeight = parseFloat((this.source.domElement.style.height.replace(/px$/,''), 10 ) as any);
            var aspect = elementWidth / elementHeight
            this.object3d.scale.y = Math.tan(THREE.Math.DEG2RAD * fov/2)*position.length() 
            this.object3d.scale.x = this.object3d.scale.y * aspect
	    }            
    }

}