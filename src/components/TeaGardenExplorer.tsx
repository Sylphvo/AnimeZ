'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { loadCharacter } from './characters/loadCharacter'
import { usePlayer, PlayerProvider } from './PlayerContext'

// ---------------------- SceneContent (runs inside Canvas) ----------------------
function SceneContent({ materials, thirdPerson, modelPath }: { materials: any; thirdPerson: boolean; modelPath?: string }) {
   const { camera, scene } = useThree()
   const player = usePlayer()
   const { playerRef } = player

   const characterGroupRef = useRef<THREE.Group | null>(null)
   const mixerRef = useRef<THREE.AnimationMixer | null>(null)
   const actionsRef = useRef<Map<string, THREE.AnimationAction> | null>(null)
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
         // remove previous if any
         if (characterGroupRef.current) {
           try { scene.remove(characterGroupRef.current) } catch {}
           characterGroupRef.current = null
         }
         const url = modelPath ? '/models/character.glb' : '/models/Duck.gltf';
         const res = await loadCharacter(scene, playerRef.current.clone(), url)
         if (!mounted) return
         characterGroupRef.current = res.group
         // Thêm dòng này để scale nhỏ lại, ví dụ 0.5 lần
         characterGroupRef.current.scale.set(0.5, 0.5, 0.5)
         if (res.mixer) mixerRef.current = res.mixer
         if (res.actions) actionsRef.current = res.actions
         if (characterGroupRef.current) characterGroupRef.current.visible = thirdPerson
       } catch (err) {
         console.error('[SceneContent] loadCharacter failed', modelPath, err)
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
         characterGroupRef.current.visible = thirdPerson
       }
     })()
     return () => { mounted = false }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [scene, modelPath, thirdPerson])

   // per-frame update
   useFrame((state, dt) => {
     // update mixer
     if (mixerRef.current) mixerRef.current.update(dt)

     // Movement and camera control
     const speed = movementRef.current.shift ? 4.0 * dt : 2.0 * dt
     const forward = new THREE.Vector3()
     camera.getWorldDirection(forward)
     forward.y = 0
     forward.normalize()
     const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize()

     let moveDir = new THREE.Vector3()
     if (movementRef.current.forward) moveDir.add(forward)
     if (movementRef.current.backward) moveDir.add(forward.clone().negate())
     if (movementRef.current.left) moveDir.add(right.clone().negate())
     if (movementRef.current.right) moveDir.add(right)
     moveDir.normalize()

     if (moveDir.length() > 0) {
       playerRef.current.addScaledVector(moveDir, speed)
     }

     // camera control: first-person or third-person
     const EYE_HEIGHT = 1.6
     if (thirdPerson) {
       // third-person: camera behind and above player
       const back = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(0, mouseRef.current.theta, 0))
       const camPos = playerRef.current.clone().addScaledVector(back.normalize(), 3) // 3 units back
       camPos.y = playerRef.current.y + 1.6
       camera.position.lerp(camPos, 0.15)
       camera.lookAt(playerRef.current.x, playerRef.current.y + 1.0, playerRef.current.z)
       // show character model
       if (characterGroupRef.current) characterGroupRef.current.visible = true
     } else {
       // first-person
       camera.position.copy(playerRef.current)
       camera.position.y = EYE_HEIGHT
       camera.rotation.order = 'YXZ'
       camera.rotation.x = mouseRef.current.phi
       camera.rotation.y = mouseRef.current.theta
       camera.rotation.z = 0
       // hide character model
       if (characterGroupRef.current) characterGroupRef.current.visible = false
     }

     // sync character root (smooth follow)
     if (characterGroupRef.current) {
       const char = characterGroupRef.current
       const target = new THREE.Vector3(playerRef.current.x, 0, playerRef.current.z)
       char.position.lerp(target, 0.2)
       // Quay theo hướng di chuyển nếu có
       if (moveDir.length() > 0) {
         char.rotation.y = Math.atan2(moveDir.x, moveDir.z)
       } else {
         char.rotation.y = mouseRef.current.theta // fallback
       }
     }
   })

   return null
}

// ---------------------- Helpers (create textures/materials/scene helpers) ----------------------
const CHUNK_SIZE = 50

export function createTextures() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const context = canvas.getContext('2d')!
  context.fillStyle = '#3a5f3a'
  context.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 1000; i++) {
    context.fillStyle = `hsl(${80 + Math.random() * 20}, 50%, ${30 + Math.random() * 20}%)`
    context.fillRect(Math.random() * 256, Math.random() * 256, 1, 1)
  }
  const grassTexture = new THREE.CanvasTexture(canvas)
  grassTexture.wrapS = THREE.RepeatWrapping
  grassTexture.wrapT = THREE.RepeatWrapping
  grassTexture.repeat.set(10, 10)
  return { grassTexture }
}

export function createMaterials(textures: any) {
  return {
    grass: new THREE.MeshLambertMaterial({ color: 0x3a5f3a, map: textures.grassTexture }),
    mossyGrass: new THREE.MeshLambertMaterial({ color: 0x4a6f4a }),
    water: new THREE.MeshPhongMaterial({
      color: 0x4682B4,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    }),
    stone: new THREE.MeshLambertMaterial({ color: 0x808080 }),
    wood: new THREE.MeshLambertMaterial({ color: 0x8B4513 }),
    trunk: new THREE.MeshLambertMaterial({ color: 0x4a3c28 }),
    lantern: new THREE.MeshPhongMaterial({
      color: 0xff6b35,
      emissive: 0xff6b35,
      emissiveIntensity: 0.2
    }),
    teaPlant: new THREE.MeshLambertMaterial({ color: 0x228B22 })
  }
}

// Ground (as a simple mesh component for Canvas children)
export function Ground({ materials }: { materials: any }) {
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[CHUNK_SIZE * 2, CHUNK_SIZE * 2]} />
      <meshStandardMaterial color={(materials.mossyGrass as any)?.color || 0x6b8b3b} />
    </mesh>
  )
}

// Trees component (for Canvas children)
export function Trees({ materials, count = 60, spread = CHUNK_SIZE }: { materials: any; count?: number; spread?: number }) {
  const positions = useRef<Array<[number, number, number]>>([])
  if (positions.current.length === 0) {
    for (let i = 0; i < count; i++) {
      positions.current.push([(Math.random() - 0.5) * spread * 2, 0, (Math.random() - 0.5) * spread * 2])
    }
  }

  return (
    <group>
      {positions.current.map((p, i) => {
        const s = 0.8 + Math.random() * 0.8
        return (
          <group key={i} position={p} scale={[s, s, s]} rotation-y={Math.random() * Math.PI * 2}>
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.25, 2, 8]} />
              <meshStandardMaterial color={(materials.trunk as any)?.color || 0x4a3c28} />
            </mesh>
            <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
              <coneGeometry args={[1.2, 2, 8]} />
              <meshStandardMaterial color={(materials.teaPlant as any)?.color || 0x2d5a27} />
            </mesh>
            <mesh position={[0, 3.05, 0]} castShadow receiveShadow>
              <coneGeometry args={[0.8, 1.4, 8]} />
              <meshStandardMaterial color={(materials.teaPlant as any)?.color || 0x3a6b32} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

// Hands component attaches to camera (R3F child)
export function Hands({ materials }: { materials: any }) {
  const groupRef = useRef<THREE.Group | null>(null)
  const { camera } = useThree()

  useEffect(() => {
    const g = groupRef.current!
    camera.add(g)
    g.position.set(0, -0.25, -0.5)
    return () => {
      try { camera.remove(g) } catch {}
    }
  }, [camera])

  const mat = (materials.wood as any) || new THREE.MeshStandardMaterial({ color: 0xd1a17a })

  return (
    <group ref={groupRef}>
      <mesh position={[-0.18, 0, -0.15]} castShadow>
        <boxGeometry args={[0.18, 0.18, 0.5]} />
        <meshStandardMaterial {...(mat as any)} />
      </mesh>
      <mesh position={[-0.18, -0.12, -0.4]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.2]} />
        <meshStandardMaterial {...(mat as any)} />
      </mesh>
      <mesh position={[0.18, 0, -0.15]} castShadow>
        <boxGeometry args={[0.18, 0.18, 0.5]} />
        <meshStandardMaterial {...(mat as any)} />
      </mesh>
      <mesh position={[0.18, -0.12, -0.4]} castShadow>
        <boxGeometry args={[0.14, 0.08, 0.2]} />
        <meshStandardMaterial {...(mat as any)} />
      </mesh>
    </group>
  )
}

// ---------------------- Entry component (Canvas wrapper) ----------------------
export default function TeaGardenExplorer() {
  const textures = useMemo(() => createTextures(), [])
  const materials = useMemo(() => createMaterials(textures), [textures])

   // lightweight loading flag (optional)
  const [isReady, setIsReady] = useState(true)

   // third-person toggle
  const [thirdPerson, setThirdPerson] = useState(false)

   // models list + selected model
  const [models] = useState<string[]>(["characters.glb", "Duck.gltf"]);
  const [selected, setSelected] = useState<string>(models[0]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  //  useEffect(() => {
  //    let mounted = true
  //    ;(async () => {
  //      try {
  //        const res = await fetch('/api/models')
  //        const data = await res.json()
  //        if (!mounted) return
  //        const files: string[] = Array.isArray(data.files) ? data.files : []
  //        setModels(files)
  //        if (files.length > 0) setSelectedModel(files[0])
  //      } catch (err) {
  //        console.error('failed to fetch models', err)
  //      }
  //    })()
  //    return () => { mounted = false }
  //  }, [])

   useEffect(() => {
     // if you need async material/texture loading, set isReady when done
     setIsReady(true)
   }, [])

   if (!isReady) return <div style={{ width: '100%', height: '100%' }} />
   
   return (
     <PlayerProvider>
       <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
         <Canvas id="root-canvas" shadows camera={{ position: [0, 1.6, 0], fov: 75 }}>
           <ambientLight intensity={0.6} />
           <directionalLight position={[50, 50, 25]} intensity={1.0} castShadow />
           {/* pass modelPath to SceneContent */}
           <SceneContent materials={materials} thirdPerson={thirdPerson} modelPath={ selected ? `/models/${selected}` : undefined } />
           <Ground materials={materials} />
           <Trees materials={materials} count={80} spread={CHUNK_SIZE} />
           {!thirdPerson && <Hands materials={materials} />}
         </Canvas>

         {/* UI overlay for toggles */}
         <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 6, color: 'white' }}>
           <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
             <input type="checkbox" checked={thirdPerson} onChange={() => setThirdPerson(v => !v)} />
             <span style={{ fontSize: 12 }}>Third-person</span>
           </label>
           <div style={{ marginTop: 8 }}>
             <label style={{ fontSize: 12 }}>Character:</label>
             <select value={selected} onChange={handleChange} style={{ display: 'block', marginTop: 4 }}>
               <option value="">(default)</option>
                {models.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
             </select>
           </div>
         </div>
       </div>
     </PlayerProvider>
   )
 }
