import * as THREE from 'three';

export const createGround = (size: number, material: THREE.Material) => {
    const geometry = new THREE.PlaneGeometry(size, size);
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    return ground;
};

export const createSky = (radius: number) => {
    const skyGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide });
    return new THREE.Mesh(skyGeometry, skyMaterial);
};

export const createTree = (materials: any) => {
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.2, 1, 8);
    const trunk = new THREE.Mesh(trunkGeometry, materials.trunk);
    trunk.castShadow = true;

    const leavesGeometry = new THREE.SphereGeometry(0.5, 8, 6);
    const leaves = new THREE.Mesh(leavesGeometry, materials.leaves);
    leaves.position.y = 0.8;
    leaves.castShadow = true;

    const tree = new THREE.Group();
    tree.add(trunk);
    tree.add(leaves);
    return tree;
};

export const createTeaPlant = (materials: any) => {
    const geometry = new THREE.SphereGeometry(0.2, 8, 6);
    const teaPlant = new THREE.Mesh(geometry, materials.teaPlant);
    teaPlant.castShadow = true;
    return teaPlant;
};

export const createWaterSurface = (size: number, material: THREE.Material) => {
    const geometry = new THREE.PlaneGeometry(size, size);
    const waterSurface = new THREE.Mesh(geometry, material);
    waterSurface.rotation.x = -Math.PI / 2;
    waterSurface.receiveShadow = true;
    return waterSurface;
};