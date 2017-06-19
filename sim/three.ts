namespace pxsim.three {

    /**
     * Creates our scene, this will store our 
     * camera, lights, shapes, etc.
     */
    export function createScene() : THREE.Scene{
        return new THREE.Scene();
    }

    /**
     * Creates a camera for our scene
     */
    export function createCamera() : THREE.Camera{
        return new THREE.Camera();
    }

    /**
     * A light source that sits in the "front" of the scene
     * and creates highlights and shadows on an object's
     * material depending on the position
     */
    export function createDirectionalLight() : THREE.DirectionalLight {
        let directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 1, 0.9).normalize();
        directionalLight.name = 'directionallight';        
        return directionalLight;
    }

    /**
     * A light source that comes from all directions, creates
     * an evenly diffused light source for the scene
     */
    export function createAmbientLight() : THREE.AmbientLight {
        let ambientLight = new THREE.AmbientLight(0xcccccc);
        ambientLight.name = 'ambientlight';
        return ambientLight;        
    }

    /**
     * Call the proper THREE Geometry constructor
     * based on the user's shape selection
     * @param shape 
     */
    export function createGeometry(shape: Shape): THREE.Geometry {
        switch(shape){
            case 0: return createBox();
            case 1: return createSphere();
            case 2: return createCone();
            case 3: return createCylinder();
            case 4: return createTetrahedron();
            case 5: return createIcosahedron();
            default: return createBox();
        }
    }

    /**
     * Helpers to create different THREE Geometries
     * The dimensions create shapes that fit within
     * the boundry of the AR marker
     */
    export function createBox(): THREE.Geometry {
        return new THREE.BoxGeometry(1, 1, 1);
    }
    export function createSphere(): THREE.Geometry {
        return new THREE.SphereGeometry(0.5, 32, 32);
    }
    export function createCone(): THREE.Geometry {
        return new THREE.ConeGeometry(0.5, 1, 32);
    }
    export function createCylinder(): THREE.Geometry {
        return new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    }
    export function createTetrahedron(): THREE.Geometry {
        return new THREE.TetrahedronGeometry(1, 0);
    }
    export function createIcosahedron(): THREE.Geometry {
        return new THREE.IcosahedronGeometry(0.5, 0);
    }
    export function createPlane(): THREE.Geometry {
        return new THREE.PlaneGeometry(1, 1, 32);
    }

    /**
     * Creates a solid colored plane in a particular marker group
     * @param marker 
     * @param color 
     */
    export function createBillboard(marker: Marker, color: number): THREE.Mesh {
        const m = board().marker(marker);
        var geometry = createPlane();
        var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
        var billboard = new THREE.Mesh(geometry, material);
        return billboard;
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
     * Remove a particular object by name from a group
     * @param group 
     * @param obj 
     */
    export function removeObjectFromGroup(group: THREE.Group, obj: THREE.Object3D) {
        group.remove(obj);
    }   

    /**
     * Removes all objects and child objects from scene
     * @param scene 
     */
    export function removeSceneChildren(scene : THREE.Scene){
        while (scene.children.length){
            scene.remove(scene.children[0]);
        }      
    }     
}