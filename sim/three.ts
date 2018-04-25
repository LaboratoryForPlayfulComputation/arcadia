namespace pxsim.three {

    /**
     * Creates our scene, this will store our 
     * camera, lights, shapes, etc.
     */
    let scene: any = null;
    export function createScene(): THREE.Scene{
        if (scene == null)
            scene = new THREE.Scene();
        return scene;        
    }

    /**
     * Creates a camera for our scene
     */
    let camera: any = null;
    export function createCamera(): THREE.Camera{
        if (camera == null)
            camera = new THREE.Camera();
        return camera;
    }

    /**
     * A light source that sits in the "front" of the scene
     * and creates highlights and shadows on an object's
     * material depending on the position
     */
    export function createDirectionalLight(): THREE.DirectionalLight {
        let directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 1, 0.9).normalize();
        directionalLight.name = 'directionallight';        
        return directionalLight;
    }

    /**
     * A light source that comes from all directions, creates
     * an evenly diffused light source for the scene
     */
    export function createAmbientLight(): THREE.AmbientLight {
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
    export function createLine(v1: THREE.Vector3, v2: THREE.Vector3, color: number): THREE.Line {
        let material = new THREE.LineBasicMaterial({
                    color: color,
                });

        let geometry = new THREE.Geometry();
        geometry.vertices.push(v1, v2);

        return new THREE.Line(geometry, material);
    }

    /**
     * Creates a solid colored plane in a particular marker group
     * @param marker 
     * @param color 
     */
    export function createBillboard(marker: MarkerCode, color: number): THREE.Mesh {
        let m = board().marker(marker);
        var geometry = createPlane();
        var material = new THREE.MeshPhongMaterial({transparent: true,
                                                    opacity: 1.0,
                                                    color: color,
                                                    side: THREE.DoubleSide});
        var billboard = new THREE.Mesh(geometry, material);
        return billboard;
    }    

    export function createText(text: string, color: number, marker: MarkerCode): THREE.Mesh {
        let text3d = new THREE.TextGeometry(text, {
            size: 0.25,
            bevelEnabled: false,
            bevelThickness: 3,
            bevelSize: 1,
            height: 0.025,
            curveSegments: 2,
            font: board().font
        });
        let material = new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 5,
            color: color,
            side: THREE.DoubleSide
        });
        let m = board().marker(marker);
        //let object = m.group.getObjectByName(marker.toString() + '-text');
        let textMesh = new THREE.Mesh(text3d, material);
        return textMesh;
    }

    export function removeTextFromMarker(marker: MarkerCode){
        let m = board().marker(marker);
        let textObject = m.textObject();
        if (textObject) three.removeObjectFromGroup(m.group(), textObject);        
    }

    export function removeShapeFromMarker(marker: MarkerCode){
        let m = board().marker(marker);
        let shapeObject = m.shapeObject();
        if (shapeObject) three.removeObjectFromGroup(m.group(), shapeObject);        
    }

    /**
     * Remove a particular object by name from a group
     * @param group 
     * @param obj 
     */
    export function removeObjectFromGroup(group: THREE.Group, obj: THREE.Object3D){
        group.remove(obj);
    }   

    /**
     * Removes all objects and child objects from scene
     * @param scene 
     */
    export function removeSceneChildren(scene: THREE.Scene){
        while (scene.children.length){
            scene.remove(scene.children[0]);
        }      
    }  

    export function loadFontAsync(url: string): Promise<THREE.Font> {
        let loader = new THREE.FontLoader();
        return new Promise<THREE.Font>((resolve, reject) => {
            loader.load(url + "fonts/helvetiker_regular.typeface.json", (font) => { 
                resolve(font);
            }, null, e => reject(e));
        });            
    }

    export function parseFont(typeface: any) : THREE.Font{
        let loader = new THREE.FontLoader();
        let font = loader.parse(typeface);
        return font;
    }

    export function loadModel(type: ModelType, content: string): THREE.Object3D {
        let loader = null as any;
        switch (type) {
            case ModelType.STL:
                loader = new (THREE as any).STLLoader();
                break;
            case ModelType.MTL:
                loader = new (THREE as any).MTLLoader();
                break;                
            case ModelType.DAE:
                loader = new (THREE as any).ColladaLoader();
                break;                
            default:
                loader = new (THREE as any).OBJLoader();
        }
        const model = loader.parse(content);
        return model;
    }

}