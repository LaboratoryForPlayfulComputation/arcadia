declare namespace THREEx {
	export interface ArToolkitSource {
      sourceType : String;
      sourceURL : String;
	}
    export interface ArToolkitContext {
		cameraParametersUrl: String;
		detectionMode: String;
		matrixCodeType: String;
    }
    export interface ArMarkerControls {
        size : Number;
        type : String;
        patternUrl : String;
        barcodeValue : Number;
        changeMatrixMode : String;
        object3D : THREE.Object3D;        
    }
    export interface ArMarkerContext {
        debug: Boolean;
        detectionMode: String;
        matrixCodeType: String;
        cameraParametersUrl: String;
        maxDetectionRate: Number;
        canvasWidth: Number;
        canvasHeight: Number;
        imageSmoothingEnabled : Boolean;      
    }
    export interface ArMarkerSource {
        sourceType : String;
        sourceUrl : String;
        sourceWidth: Number;
        sourceHeight: Number;
        displayWidth: Number;
        displayHeight: Number;        
    }

    export type Coordinate = { x: number, y: number, z: number };
}