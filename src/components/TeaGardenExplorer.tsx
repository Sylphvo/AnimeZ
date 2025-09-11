'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
// GLTFLoader will be imported dynamically inside loadCharacter to avoid TypeScript module/typing errors

interface Movement {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  jump: boolean
  shift: boolean
}

interface Translations {
  [key: string]: {
    controlsWasd: string
    controlsSpace: string
    controlsShift: string
    loadingText: string
    loadingWait: string
  }
}



const TRANSLATIONS: Translations = {
  "en-US": {
    "controlsWasd": "WASD/Arrow Keys: Move",
    "controlsSpace": "Space: Jump",
    "controlsShift": "Shift: Run",
    "loadingText": "Loading Tea Garden",
    "loadingWait": "Please wait..."
  },
  "es-ES": {
    "controlsWasd": "WASD/Flechas: Mover",
    "controlsSpace": "Espacio: Saltar",
    "controlsShift": "Shift: Correr",
    "loadingText": "Cargando Jardín de Té",
    "loadingWait": "Por favor espere..."
  },
  "vi-VN": {
    "controlsWasd": "WASD/Mũi tên: Di chuyển",
    "controlsSpace": "Space: Nhảy",
    "controlsShift": "Shift: Chạy",
    "loadingText": "Đang tải Vườn Trà",
    "loadingWait": "Vui lòng đợi..."
  }
}

export default function TeaGardenExplorer() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationIdRef = useRef<number | undefined>(undefined)
  const handsRef = useRef<THREE.Group | null>(null)
  const characterRef = useRef<THREE.Group | null>(null)
  const [thirdPerson, setThirdPerson] = useState(false)
  //const clockRef = useRef<THREE.Clock>(new THREE.Clock())

  const [isLoading, setIsLoading] = useState(true)
  const [locale, setLocale] = useState<keyof typeof TRANSLATIONS>('en-US')

  // Invert mouse options
  const [invertY, setInvertY] = useState(false)
  const [invertX, setInvertX] = useState(false)

  // Toggle for optional physics engine (cannon-es)
  const [usePhysicsEngine, setUsePhysicsEngine] = useState(false)
  
  // Game state refs
  const movementRef = useRef<Movement>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    shift: false
  })

  const mouseRef = useRef({ phi: 0, theta: 0 })
  const physicsRef = useRef({ yVelocity: 0, isGrounded: true })
  const playerRef = useRef(new THREE.Vector3(0, 1.6, 0)) // first-person player position
  const EYE_HEIGHT = 1.6

  // Physics-related refs (dynamically set when cannon-es is loaded)
  const physicsWorldRef = useRef<any | null>(null)
  const playerBodyRef = useRef<any | null>(null)
  const cannonRef = useRef<any | null>(null)

  // Trees group ref used for simple collision detection
  const treesGroupRef = useRef<THREE.Group | null>(null)

  // Player collision radius used by simple physics / cannon body
  const PLAYER_RADIUS = 0.3
  //const chunksRef = useRef<Map<string, THREE.Group>>(new Map())
  //const loadedChunksRef = useRef<Set<string>>(new Set())

  // Constants
  const CHUNK_SIZE = 50;
  const GRAVITY = -0.015;
  const JUMP_POWER = 0.3;

  // Translation helper
  const t = useCallback((key: keyof typeof TRANSLATIONS['en-US']) => {
    return TRANSLATIONS[locale]?.[key] || TRANSLATIONS['en-US'][key] || key
  }, [locale])

  // Detect locale
  useEffect(() => {
    const browserLocale = navigator.languages?.[0] || navigator.language || 'en-US'
    const findMatchingLocale = (locale: string) => {
      if (TRANSLATIONS[locale]) return locale
      const lang = locale.split('-')[0]
      const match = Object.keys(TRANSLATIONS).find(key => key.startsWith(lang + '-'))
      return match || 'en-US'
    }
    setLocale(findMatchingLocale(browserLocale))
  }, [])

  // Texture creation
  const createTextures = useCallback(() => {
    // Create grass texture
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const context = canvas.getContext('2d')!
    context.fillStyle = '#3a5f3a'
    context.fillRect(0, 0, 256, 256)
    // Add some noise for grass
    for (let i = 0; i < 1000; i++) {
      context.fillStyle = `hsl(${80 + Math.random() * 20}, 50%, ${30 + Math.random() * 20}%)`
      context.fillRect(Math.random() * 256, Math.random() * 256, 1, 1)
    }
    const grassTexture = new THREE.CanvasTexture(canvas)
    grassTexture.wrapS = THREE.RepeatWrapping
    grassTexture.wrapT = THREE.RepeatWrapping
    grassTexture.repeat.set(10, 10)
    return { grassTexture }
  }, [])

  // Material creation
  const createMaterials = useCallback((textures: any) => {
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
  }, [])

  // Tea plant creation with InstancedMesh
  const createTeaPlants = useCallback((materials: any) => {
    const geometry = new THREE.SphereGeometry(0.3, 8, 6)
    const instancedMesh = new THREE.InstancedMesh(geometry, materials.teaPlant, 200)
    const matrix = new THREE.Matrix4()
    const position = new THREE.Vector3()
    const rotation = new THREE.Euler()
    const scale = new THREE.Vector3()
    for (let i = 0; i < 200; i++) {
      position.set(
        (Math.random() - 0.5) * CHUNK_SIZE,
        0.3,
        (Math.random() - 0.5) * CHUNK_SIZE
      )
      rotation.set(
        0,
        Math.random() * Math.PI * 2,
        0
      )
      scale.setScalar(0.5 + Math.random() * 0.5)
      matrix.makeRotationFromEuler(rotation)
      matrix.setPosition(position)
      matrix.scale(scale)
      instancedMesh.setMatrixAt(i, matrix)
    }
    instancedMesh.castShadow = true
    return instancedMesh
  }, [])

  // Ground plane creation (keep a subtle ground but not dominating grass)
  const createGround = useCallback((materials: any) => {
    const geometry = new THREE.PlaneGeometry(CHUNK_SIZE * 2, CHUNK_SIZE * 2)
    // use mossyGrass/stone instead of bright grass
    const ground = new THREE.Mesh(geometry, materials.mossyGrass || materials.grass)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    return ground
  }, [])

  // Sky gradient
  const createSky = useCallback(() => {
    const skyGeometry = new THREE.SphereGeometry(1000, 32, 32)
    const skyMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec3 skyColor = vec3(0.5, 0.7, 1.0); // Light blue
          vec3 groundColor = vec3(0.1, 0.1, 0.1); // Dark
          float h = normalize(vWorldPosition).y;
          gl_FragColor = vec4(mix(groundColor, skyColor, max(pow(max(h, 0.0), 0.8), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide
    })
    const sky = new THREE.Mesh(skyGeometry, skyMaterial)
    return sky
  }, [])

  // Lighting setup
  const setupLighting = useCallback((scene: THREE.Scene) => {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 50, 25)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 500
    directionalLight.shadow.camera.left = -100
    directionalLight.shadow.camera.right = 100
    directionalLight.shadow.camera.top = 100
    directionalLight.shadow.camera.bottom = -100
    scene.add(directionalLight)
  }, [])

  // Fog setup
  const setupFog = useCallback((scene: THREE.Scene) => {
    scene.fog = new THREE.Fog(0x87CEEB, 50, 200)
  }, [])

  // Initialization
  useEffect(() => {
    if (!mountRef.current) return

    // Create scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // first-person: start at player eye height and use YXZ order so yaw (Y) is applied before pitch (X)
    camera.rotation.order = 'YXZ'
    camera.position.copy(playerRef.current)
    cameraRef.current = camera

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create textures and materials
    const textures = createTextures()
    const materials = createMaterials(textures)

    // Load character model (try glTF in public/models/character.glb), fallback to simple placeholder
        const loadCharacter = async () => {
          try {
            // dynamically import GLTFLoader at runtime; use ts-ignore to avoid TS compile-time module errors
            // @ts-ignore
            const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')
            const loader = new GLTFLoader()
            const gltf = await loader.loadAsync('/models/character.glb')
            const root = gltf.scene
            root.traverse((c: any) => {
              if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
              }
            })
            root.scale.set(1, 1, 1)
            root.position.copy(playerRef.current)
            characterRef.current = root
            scene.add(root)
          } catch (e) {
            // fallback placeholder
            const placeholder = new THREE.Group()
            const body = new THREE.BoxGeometry(0.6, 1.6, 0.4)
            const mat = materials.wood || new THREE.MeshStandardMaterial({ color: 0x996644 })
            const mesh = new THREE.Mesh(body, mat)
            mesh.castShadow = true
            mesh.position.set(0, 0.8, 0)
            placeholder.add(mesh)
            placeholder.position.copy(playerRef.current)
            characterRef.current = placeholder
            scene.add(placeholder)
          }
        }
    loadCharacter()

    // Create first-person hands and attach to camera
    const hands = createHands(materials)
    handsRef.current = hands
    camera.add(hands) // attach so hands follow camera transforms

    const ground = createGround(materials)
    scene.add(ground)

    // Add trees instead of dense grass/tea plant field
    const treesGroup = createTrees(materials, 80, CHUNK_SIZE) // adjust count as needed
    treesGroupRef.current = treesGroup
    scene.add(treesGroup)

    // Optional: keep some small shrubs as instanced meshes
    // const teaBushes = createTeaPlants(materials)
    // scene.add(teaBushes)

    // Add sky
    const sky = createSky()
    scene.add(sky)

    // Setup lighting
    setupLighting(scene)

    // Setup fog
    setupFog(scene)

    // Add a checkers board (size 8, square = 1 unit) placed ahead of the camera
    const checkers = createCheckersBoard(materials, 8, 1, { position: new THREE.Vector3(0, 0.05, -10) })
    scene.add(checkers)
    
    // Add tea plants
    const teaPlants = createTeaPlants(materials)
    scene.add(teaPlants)
    
    // Add trees (duplicate-safe)
    const trees = createTrees(materials, 60, CHUNK_SIZE)
    scene.add(trees)

    setIsLoading(false)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // hands bob / sway — safe-guard refs
      const handsGroup = handsRef.current
      if (handsGroup) {
        const t = performance.now() / 1000
        const movement = movementRef.current
        const isMoving = movement.forward || movement.backward || movement.left || movement.right
        const walkSpeed = isMoving ? 8 : 2
        const bobAmp = isMoving ? 0.04 : 0.01
        // vertical bob
        handsGroup.position.y = -0.2 + Math.sin(t * walkSpeed) * bobAmp
        // small forward/back tilt
        handsGroup.rotation.x = Math.sin(t * walkSpeed * 1.2) * bobAmp * 0.7
        // slight sway when strafing
        const strafe = (movement.left ? -1 : 0) + (movement.right ? 1 : 0)
        handsGroup.rotation.z = strafe * 0.1 * (isMoving ? 1 : 0)
      }

      renderer.render(scene, camera)
    }
    animate()
    
    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      // detach hands from camera
      if (handsRef.current && camera) {
        camera.remove(handsRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current?.removeChild(renderer.domElement)
      }
      // cleanup physics if created
      if (physicsWorldRef.current) {
        try {
          physicsWorldRef.current.bodies?.forEach((b: any) => physicsWorldRef.current.removeBody(b))
        } catch {}
        physicsWorldRef.current = null
        playerBodyRef.current = null
        cannonRef.current = null
      }
      renderer.dispose()
    }
  }, []) // keep single scene init

  // Physics engine init / teardown (cannon-es) — dynamic import when toggle enabled
  useEffect(() => {
    if (!usePhysicsEngine || !sceneRef.current) {
      // if disabling physics, teardown existing world
      if (physicsWorldRef.current) {
        try {
          physicsWorldRef.current.bodies?.forEach((b: any) => physicsWorldRef.current.removeBody(b))
        } catch {}
        physicsWorldRef.current = null
        playerBodyRef.current = null
        cannonRef.current = null
      }
      return
    }

    let cancelled = false
    ;(async () => {
      try {
        const CANNON = await import('cannon-es')
        if (cancelled) return
        cannonRef.current = CANNON
        const world = new CANNON.World()
        world.broadphase = new CANNON.NaiveBroadphase()
        ;(world.solver as any).iterations = 10
        world.gravity.set(0, -9.82, 0)
        physicsWorldRef.current = world

        // create ground body (large static plane)
        const groundBody = new CANNON.Body({ mass: 0 })
        const groundShape = new CANNON.Plane()
        groundBody.addShape(groundShape)
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
        groundBody.position.set(0, 0, 0)
        world.addBody(groundBody)

        // create player body (sphere approx)
        const playerShape = new CANNON.Sphere(PLAYER_RADIUS)
        const playerBody = new CANNON.Body({ mass: 1, shape: playerShape, fixedRotation: true })
        playerBody.position.set(playerRef.current.x, playerRef.current.y, playerRef.current.z)
        playerBody.linearDamping = 0.9
        playerBody.collisionFilterGroup = 1
        world.addBody(playerBody)
        playerBodyRef.current = playerBody

        // create static bodies for trees to block player
        const treesGroup = treesGroupRef.current
        if (treesGroup) {
          treesGroup.children.forEach((tree: any) => {
            const pos = tree.position
            const radius = 0.6 * (tree.scale.x || 1)
            const shape = new CANNON.Sphere(radius)
            const body = new CANNON.Body({ mass: 0 })
            body.addShape(shape)
            body.position.set(pos.x, pos.y + 1, pos.z) // trunk approx center
            world.addBody(body)
          })
        }

        // simple step loop: run in a timer to keep physics updated
        const step = () => {
          if (!physicsWorldRef.current) return
          const fixedTimeStep = 1.0 / 60.0
          physicsWorldRef.current.step(fixedTimeStep)
          // sync playerRef from body
          if (playerBodyRef.current) {
            const p = playerBodyRef.current.position
            playerRef.current.set(p.x, p.y, p.z)
          }
        }
        const interval = setInterval(step, 1000 / 60)

        return () => {
          clearInterval(interval)
        }
      } catch (err) {
        // dynamic import failed: notify user in console
        console.error('Failed to load cannon-es; install it with `npm i cannon-es` to enable physics', err)
        setUsePhysicsEngine(false)
      }
    })()

    return () => { cancelled = true }
  }, [usePhysicsEngine])

  // Event listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
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
        case 'Space':
          if (physicsRef.current.isGrounded) {
            physicsRef.current.yVelocity = JUMP_POWER
            physicsRef.current.isGrounded = false
          }
          break
        case 'ShiftLeft':
        case 'ShiftRight':
          movementRef.current.shift = true
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
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
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!document.pointerLockElement) return
      const signX = invertX ? -1 : 1
      const signY = invertY ? -1 : 1
      // horizontal (theta) and vertical (phi). adjust signs to invert axes.
      mouseRef.current.theta += event.movementX * 0.002 * signX
      mouseRef.current.phi -= event.movementY * 0.002 * signY
      mouseRef.current.phi = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseRef.current.phi))
    }
    
    const handleClick = () => {
      if (mountRef.current) {
        mountRef.current.requestPointerLock()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('mousemove', handleMouseMove)
    if (mountRef.current) {
      mountRef.current.addEventListener('click', handleClick)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('mousemove', handleMouseMove)
      if (mountRef.current) {
        mountRef.current.removeEventListener('click', handleClick)
      }
    }
  }, [invertX, invertY])

  // Movement and physics (use physics engine when enabled, otherwise kinematic + simple collision)
  useEffect(() => {
    const updateMovement = () => {
      if (!cameraRef.current) return

      const camera = cameraRef.current
      const movement = movementRef.current
      const physics = physicsRef.current
      const player = playerRef.current
      const speed = movement.shift ? 0.2 : 0.1

      // If physics engine enabled, control playerBody velocity instead of manual position
      if (usePhysicsEngine && playerBodyRef.current && physicsWorldRef.current) {
        const CANNON = cannonRef.current
        const body = playerBodyRef.current
        // compute desired horizontal velocity in world XZ plane
        const forward = new THREE.Vector3()
        camera.getWorldDirection(forward)
        forward.y = 0
        forward.normalize()
        const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0,1,0)).normalize()
        const vel = new CANNON.Vec3(0, body.velocity.y, 0)
        if (movement.forward) vel.vadd(new CANNON.Vec3(forward.x * speed * 60, 0, forward.z * speed * 60), vel)
        if (movement.backward) vel.vadd(new CANNON.Vec3(-forward.x * speed * 60, 0, -forward.z * speed * 60), vel)
        if (movement.left) vel.vadd(new CANNON.Vec3(-right.x * speed * 60, 0, -right.z * speed * 60), vel)
        if (movement.right) vel.vadd(new CANNON.Vec3(right.x * speed * 60, 0, right.z * speed * 60), vel)
        // apply velocity (keep y from physics)
        body.velocity.set(vel.x, body.velocity.y, vel.z)
        // jump
        if (movement.jump && Math.abs(body.velocity.y) < 0.001) {
          body.velocity.y = JUMP_POWER * 50
        }
        // update playerRef from body (physics loop also updates periodically)
        const p = body.position
        playerRef.current.set(p.x, p.y, p.z)
      } else {
        // Kinematic movement (existing): compute candidate position then check collisions with trees (simple sphere check)
        // Apply camera rotation from mouse for direction vectors
        camera.rotation.x = mouseRef.current.phi
        camera.rotation.y = mouseRef.current.theta
        camera.rotation.z = 0

        const dir = new THREE.Vector3()
        camera.getWorldDirection(dir)
        dir.y = 0
        dir.normalize()
        const right = new THREE.Vector3()
        right.crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize()

        const candidate = player.clone()
        if (movement.forward) candidate.addScaledVector(dir, speed)
        if (movement.backward) candidate.addScaledVector(dir, -speed)
        if (movement.left) candidate.addScaledVector(right, -speed)
        if (movement.right) candidate.addScaledVector(right, speed)

        // simple collision vs treesGroupRef: don't move inside tree radius
        const trees = treesGroupRef.current
        let blocked = false
        if (trees) {
          for (const t of trees.children as any) {
            const dx = candidate.x - t.position.x
            const dz = candidate.z - t.position.z
            const dist2 = dx*dx + dz*dz
            const minDist = (PLAYER_RADIUS + 0.6 * (t.scale.x || 1)) ** 2
            if (dist2 < minDist) {
              blocked = true
              break
            }
          }
        }

        if (!blocked) {
          player.copy(candidate)
        }

        // Physics fallback vertical
        physics.yVelocity += GRAVITY
        player.y += physics.yVelocity
        if (player.y <= EYE_HEIGHT) {
          player.y = EYE_HEIGHT
          physics.yVelocity = 0
          physics.isGrounded = true
        }
      }

      // Update camera depending on view mode
      if (thirdPerson) {
        // place camera behind and above the player
        const back = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(0, mouseRef.current.theta, 0))
        const camPos = player.clone().addScaledVector(back, 3) // 3 units behind
        camPos.y = player.y + 1.6
        camera.position.lerp(camPos, 0.2)
        camera.lookAt(player.x, player.y + 1.0, player.z)
      } else {
        // first-person
        camera.position.copy(player)
      }

      // sync character model (visible in third-person)
      if (characterRef.current) {
        const char = characterRef.current
        char.position.lerp(new THREE.Vector3(player.x, 0, player.z), 0.3)
        char.rotation.y = mouseRef.current.theta
        char.visible = thirdPerson
      }
    }

    const interval = setInterval(updateMovement, 16) // ~60fps
 
    return () => clearInterval(interval)
  }, [thirdPerson, usePhysicsEngine])

  return (
    <div className="w-full h-screen relative">
      <div ref={mountRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <div className="text-center">
            <div className="text-2xl mb-4">{t('loadingText')}</div>
            <div>{t('loadingWait')}</div>
          </div>
        </div>
      )}
     {/* Invert mouse controls */}
     <div className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded">
       <label className="flex items-center gap-2">
         <input type="checkbox" checked={invertY} onChange={() => setInvertY(v => !v)} />
         <span className="text-sm">Invert Y</span>
       </label>
       <label className="flex items-center gap-2 mt-1">
         <input type="checkbox" checked={invertX} onChange={() => setInvertX(v => !v)} />
         <span className="text-sm">Invert X</span>
       </label>
       <label className="flex items-center gap-2 mt-1">
         <input type="checkbox" checked={thirdPerson} onChange={() => setThirdPerson(v => !v)} />
         <span className="text-sm">Third-person</span>
       </label>
       <label className="flex items-center gap-2 mt-1">
         <input type="checkbox" checked={usePhysicsEngine} onChange={() => setUsePhysicsEngine(v => !v)} />
         <span className="text-sm">Enable Physics Engine (cannon-es)</span>
       </label>
     </div>
      <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-4 rounded">
        <div>{t('controlsWasd')}</div>
        <div>{t('controlsSpace')}</div>
        <div>{t('controlsShift')}</div>
      </div>
    </div>
  )
}

// Tree creation (replaces the dense grass area)
const createTrees = (materials: any, count = 60, chunkSize = 50) => {
  const group = new THREE.Group()
  const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 2, 8)
  const coneGeo1 = new THREE.ConeGeometry(1.2, 2, 8)
  const coneGeo2 = new THREE.ConeGeometry(0.8, 1.4, 8)

  for (let i = 0; i < count; i++) {
    const tree = new THREE.Group()

    const trunk = new THREE.Mesh(trunkGeo, materials.trunk)
    trunk.position.y = 1
    trunk.castShadow = true
    trunk.receiveShadow = true
    tree.add(trunk)

    const leaves1 = new THREE.Mesh(coneGeo1, materials.teaPlant)
    leaves1.position.y = 2.2
    leaves1.castShadow = true
    tree.add(leaves1)

    const leaves2 = new THREE.Mesh(coneGeo2, materials.teaPlant)
    leaves2.position.y = 3.1
    leaves2.castShadow = true
    tree.add(leaves2)

    const x = (Math.random() - 0.5) * chunkSize * 2
    const z = (Math.random() - 0.5) * chunkSize * 2
    tree.position.set(x, 0, z)
    tree.rotation.y = Math.random() * Math.PI * 2
    const s = 0.8 + Math.random() * 0.8
    tree.scale.set(s, s, s)

    group.add(tree)
  }

  return group
}

// (removed simple checkers board implementation to avoid duplicate declaration; use the detailed createCheckersBoard below)

// New: create a checkers board with pieces
const createCheckersBoard = (materials: any, size = 8, squareSize = 1, opts?: { position?: THREE.Vector3 }) => {
  const group = new THREE.Group()
  const board = new THREE.Group()
  const half = (size * squareSize) / 2

  const darkMat = new THREE.MeshLambertMaterial({ color: 0x3b3b3b })
  const lightMat = new THREE.MeshLambertMaterial({ color: 0xE0CDA2 })
  const pieceBlack = new THREE.MeshLambertMaterial({ color: 0x111111 })
  const pieceRed = new THREE.MeshLambertMaterial({ color: 0xAA2222 })

  const squareGeo = new THREE.BoxGeometry(squareSize, 0.06, squareSize)
  const pieceGeo = new THREE.CylinderGeometry(squareSize * 0.35, squareSize * 0.35, 0.25, 16)

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const isDark = (row + col) % 2 === 1
      const mat = isDark ? darkMat : lightMat
      const sq = new THREE.Mesh(squareGeo, mat)
      const x = col * squareSize - half + squareSize / 2
      const z = row * squareSize - half + squareSize / 2
      sq.position.set(x, 0, z)
      sq.receiveShadow = true
      board.add(sq)

      // Place pieces on dark squares in first 3 and last 3 rows
      if (isDark && (row < 3 || row >= size - 3)) {
        const piece = new THREE.Mesh(pieceGeo, row < 3 ? pieceBlack : pieceRed)
        piece.position.set(x, 0.16, z)
        piece.castShadow = true
        board.add(piece)
      }
    }
  }

  // thin board base
  const baseGeo = new THREE.BoxGeometry(size * squareSize + 0.2, 0.1, size * squareSize + 0.2)
  const baseMat = materials.stone || new THREE.MeshLambertMaterial({ color: 0x554433 })
  const base = new THREE.Mesh(baseGeo, baseMat)
  base.position.set(0, -0.05, 0)
  base.receiveShadow = true
  group.add(base)
  group.add(board)

  // position group if provided
  if (opts?.position) {
    group.position.copy(opts.position)
  }

  return group
}

// Hands creation for first-person view
const createHands = (materials: any) => {
  const group = new THREE.Group()
  // position relative to camera (in front, slightly down and to center)
  group.position.set(0, -0.2, -0.5)

  // left forearm
  const armGeo = new THREE.BoxGeometry(0.18, 0.18, 0.5)
  const handGeo = new THREE.BoxGeometry(0.14, 0.08, 0.2)
  const mat = materials.wood || new THREE.MeshStandardMaterial({ color: 0xD1A17A })

  const leftArm = new THREE.Mesh(armGeo, mat)
  leftArm.position.set(-0.18, 0, -0.15)
  leftArm.castShadow = true
  group.add(leftArm)

  const leftHand = new THREE.Mesh(handGeo, mat)
  leftHand.position.set(-0.18, -0.12, -0.4)
  leftHand.castShadow = true
  group.add(leftHand)

  // right forearm
  const rightArm = new THREE.Mesh(armGeo, mat)
  rightArm.position.set(0.18, 0, -0.15)
  rightArm.castShadow = true
  group.add(rightArm)

  const rightHand = new THREE.Mesh(handGeo, mat)
  rightHand.position.set(0.18, -0.12, -0.4)
  rightHand.castShadow = true
  group.add(rightHand)

  // scale a bit and return
  group.scale.set(0.9, 0.9, 0.9)
  return group
}
