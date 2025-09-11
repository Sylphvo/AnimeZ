'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { loadCharacter } from './characters/loadCharacter'
import { createMaterials, createTextures } from './TeaGarden/helpers'
import { Ground, Trees, Hands, CHUNK_SIZE } from './TeaGarden/sceneHelpers';
import { usePlayer, PlayerProvider } from './PlayerContext';

function SceneContent({ materials }: { materials: any }) {
  const { camera, scene } = useThree()
  const player = usePlayer()
  const { playerRef } = player

  const characterGroupRef = useRef<THREE.Group | null>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const actionsRef = useRef<Map<string, THREE.AnimationAction> | null>(null)
  const activeActionRef = useRef<THREE.AnimationAction | null>(null)
  const clockRef = useRef(new THREE.Clock())

  const movementRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    jump: false,
  })

  const mouseRef = useRef({ phi: 0, theta: 0 })

  // pointer lock on click
  useEffect(() => {
    const onClick = () => {
      const el = document.getElementById('root-canvas') || document.body
      el.requestPointerLock?.()
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  // key handlers
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          movementRef.current.forward = true
          break
        case 'KeyS':
        case 'ArrowDown':
          movementRef.current.backward = true
          break
        case 'KeyA':
        case 'ArrowLeft':
          movementRef.current.left = true
          break
        case 'KeyD':
        case 'ArrowRight':
          movementRef.current.right = true
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          movementRef.current.shift = true
          break
        case 'Space':
          movementRef.current.jump = true
          break
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          movementRef.current.forward = false
          break
        case 'KeyS':
        case 'ArrowDown':
          movementRef.current.backward = false
          break
        case 'KeyA':
        case 'ArrowLeft':
          movementRef.current.left = false
          break
        case 'KeyD':
        case 'ArrowRight':
          movementRef.current.right = false
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          movementRef.current.shift = false
          break
        case 'Space':
          movementRef.current.jump = false
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  // mouse movement to control look
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement) {
        mouseRef.current.theta -= e.movementX * 0.002
        mouseRef.current.phi -= e.movementY * 0.002
        mouseRef.current.phi = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseRef.current.phi))
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // load character into scene
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await loadCharacter(scene, playerRef.current.clone())
        if (!mounted) return
        characterGroupRef.current = res.group
        if (res.mixer) mixerRef.current = res.mixer
        if (res.actions) actionsRef.current = res.actions
      } catch (err) {
        const g = new THREE.Group()
        const body = new THREE.BoxGeometry(0.6, 1.6, 0.4)
        const mat = new THREE.MeshStandardMaterial({ color: 0x996644 })
        const mesh = new THREE.Mesh(body, mat)
        mesh.castShadow = true
        mesh.position.set(0, 0.8, 0)
        g.add(mesh)
        g.position.copy(playerRef.current)
        scene.add(g)
        characterGroupRef.current = g
      }
    })()
    return () => {
      mounted = false
    }
    // scene is stable in R3F, no dependency on loadCharacter here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene])

  useFrame((state, dt) => {
    // update mixer
    if (mixerRef.current) mixerRef.current.update(dt)

    // apply camera rotation from mouse (first-person default)
    camera.rotation.order = 'YXZ'
    camera.rotation.x = mouseRef.current.phi
    camera.rotation.y = mouseRef.current.theta
    camera.rotation.z = 0

    // movement relative to camera forward
    const speed = movementRef.current.shift ? 4.0 * dt : 2.0 * dt
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize()

    if (movementRef.current.forward) playerRef.current.addScaledVector(forward, speed)
    if (movementRef.current.backward) playerRef.current.addScaledVector(forward, -speed)
    if (movementRef.current.left) playerRef.current.addScaledVector(right, -speed)
    if (movementRef.current.right) playerRef.current.addScaledVector(right, speed)

    // keep camera at eye height
    const EYE_HEIGHT = 1.6
    camera.position.copy(playerRef.current)
    camera.position.y = EYE_HEIGHT

    // sync character mesh
    if (characterGroupRef.current) {
      const char = characterGroupRef.current
      const target = new THREE.Vector3(playerRef.current.x, 0, playerRef.current.z)
      char.position.lerp(target, 0.2)
      char.rotation.y = mouseRef.current.theta
    }

    // hands bob handled inside Hands (attached to camera)
  })

  return null
}

export default function TeaGardenExplorer() {
  const { playerRef } = usePlayer()
  const [materials, setMaterials] = useState<any | null>(null)
  const textures = useRef(createTextures()).current

  useEffect(() => {
    const mats = createMaterials(textures)
    setMaterials(mats)
  }, [textures])

  if (!materials) return <div style={{ width: '100%', height: '100%' }} />

  return (
    <PlayerProvider>
      <div style={{ width: '100%', height: '100vh' }}>
        <Canvas id="root-canvas" shadows camera={{ position: [0, 1.6, 0], fov: 75 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[50, 50, 25]} intensity={1.0} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          <SceneContent materials={materials} />
          <Ground materials={materials} />
          <Trees materials={materials} count={80} spread={CHUNK_SIZE} />
          <Hands materials={materials} />
        </Canvas>
      </div>
    </PlayerProvider>
  )
}