declare namespace THREEx {
	 interface ArToolkitSourceOptions {
      sourceType : String;
      sourceURL : String;
	}
    class ArToolkitSource {
        constructor(options: ArToolkitSourceOptions);
        init(callback: () => void): void;
        domElement: HTMLElement;
        ready: Boolean;
        onResize(): void;
        copySizeTo(element: HTMLElement): void;
    }
    interface ArToolkitContextOptions {
		cameraParametersUrl: String;
		detectionMode: String;
		matrixCodeType: String;        
    }
    class ArToolkitContext {
        constructor(options: ArToolkitContextOptions);
        baseURL: String;
        arController: any;
        init(callback: () => void): void;
        getProjectionMatrix(): THREE.Matrix4;
        update(domElement: HTMLElement): void;
    }
    interface ArMarkerControlsOptions {
        size : Number;
        type : String;
        patternUrl : String;
        barcodeValue : Number;
        changeMatrixMode : String;
    }
    class ArMarkerControls {
        constructor(context: ArToolkitContext, group: THREE.Group, options: ArMarkerControlsOptions);
        object3D: THREE.Object3D;
    }
    interface ArMarkerContextOptions {
        debug: Boolean;
        detectionMode: String;
        matrixCodeType: String;
        cameraParametersUrl: String;
        maxDetectionRate: Number;
        canvasWidth: Number;
        canvasHeight: Number;
        imageSmoothingEnabled : Boolean;      
    }
    class ArMarkerContext {
        constructor(options: ArMarkerContextOptions);
    }    
    interface ArMarkerSourceOptions {
        sourceType : String;
        sourceUrl : String;
        sourceWidth: Number;
        sourceHeight: Number;
        displayWidth: Number;
        displayHeight: Number;        
    }
    class ArMarkerSource {
        constructor(options: ArMarkerSourceOptions);
    }
    type Coordinate = { x: number, y: number, z: number };
    interface ArMarkerState {
        marker: Marker,
        group: THREE.Group;
        currentPos: THREE.Vector3,
        prevPos: THREE.Vector3,
        currentRot: THREE.Euler,
        prevRot: THREE.Euler,
        scripts: pxsim.Map<() => void>;
    }
}