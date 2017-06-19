namespace pxsim.three {

    export function createGeometry(shape: Shape): THREE.Geometry {
        let cmds = [createBox, createSphere, createCone, createCylinder, createTetrahedron, createIcosahedron];
        return cmds[shape]();
    }

    export function createBox(): THREE.Geometry {
        return new THREE.BoxGeometry(1, 1, 1);
    }

    export function createSphere(): THREE.Geometry {
        return new THREE.SphereGeometry(1, 32, 32);
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
        return new THREE.IcosahedronGeometry(1, 0);
    }

    export function createPlane(): THREE.Geometry {
        return new THREE.PlaneGeometry(1, 1, 32);
    }

    export function createBillboard(marker: Marker, color: number): THREE.Mesh {
        const m = board().marker(marker);
        var geometry = createPlane();
        var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
        var billboard = new THREE.Mesh(geometry, material);
        return billboard;
    }    

    export function removeObjectFromGroup(group: THREE.Group, obj: THREE.Object3D) {
        group.remove(obj);
    }    
}