import * as THREE from 'three'

export type LoadedCharacter = {
  group: THREE.Group
  mixer?: THREE.AnimationMixer
  actions?: Map<string, THREE.AnimationAction>
}

/**
 * Load character glTF from /models/character.glb
 * Returns { group, mixer, actions } or throws.
 */
export async function loadCharacter(scene: THREE.Scene, startPosition: THREE.Vector3, url: string): Promise<LoadedCharacter> {
  // dynamic import to avoid bundler/ts issues
  // @ts-ignore
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')
  const loader = new GLTFLoader()
  const gltf = await loader.loadAsync('/models/Duck.gltf')

  const root = gltf.scene || new THREE.Group()
  root.position.copy(startPosition)
  // Scale nhỏ lại, ví dụ 0.5 lần
  root.scale.set(0.5, 0.5, 0.5)

  // ensure shadows and convert materials to standard where useful
  root.traverse((c: any) => {
    if (c.isMesh) {
      c.castShadow = true
      c.receiveShadow = true
      try {
        if (!(c.material instanceof THREE.MeshStandardMaterial)) {
          const old = c.material
          const mat = new THREE.MeshStandardMaterial({
            map: old.map || null,
            color: old.color || new THREE.Color(0xffffff)
          })
          ;(mat as any).skinning = !!(c as any).skinned
          c.material = mat
        }
      } catch {}
    }
  })

  scene.add(root)

  const result: LoadedCharacter = { group: root }

  if ((gltf as any).animations && (gltf as any).animations.length > 0) {
    const mixer = new THREE.AnimationMixer(root)
    const actions = new Map<string, THREE.AnimationAction>()
    for (const clip of (gltf as any).animations) {
      const name = clip.name || clip.uuid
      const action = mixer.clipAction(clip)
      action.clampWhenFinished = true
      action.enabled = true
      actions.set(name, action)
    }
    result.mixer = mixer
    result.actions = actions
    // play Idle if present
    const idle = actions.get('Idle') || actions.get('idle') || actions.values().next().value
    if (idle) idle.play()
  }

  return result
}