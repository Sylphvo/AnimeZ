import * as THREE from 'three'

export function createTextures() {
  // placeholder — add TextureLoader calls if you have textures
  return {}
}

export function createMaterials(_: any) {
  return {
    trunk: new THREE.MeshStandardMaterial({ color: 0x4a3c28 }),
    teaPlant: new THREE.MeshStandardMaterial({ color: 0x2d5a27 }),
    mossyGrass: new THREE.MeshStandardMaterial({ color: 0x6b8b3b }),
    stone: new THREE.MeshStandardMaterial({ color: 0x554433 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x996644 }),
  }
}