'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

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
  //const clockRef = useRef<THREE.Clock>(new THREE.Clock())

  const [isLoading, setIsLoading] = useState(true)
  const [locale, setLocale] = useState<keyof typeof TRANSLATIONS>('en-US')

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
    camera.position.set(0, 5, 10)
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

    const ground = createGround(materials)
    scene.add(ground)

    // Add trees instead of dense grass/tea plant field
    const treesGroup = createTrees(materials, 80, CHUNK_SIZE) // adjust count as needed
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

    // Add tea plants
    const teaPlants = createTeaPlants(materials)
    scene.add(teaPlants)

    // Add trees
    const trees = createTrees(materials, 60, CHUNK_SIZE)
    scene.add(trees)

    setIsLoading(false)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
    
    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current?.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  // Event listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyS':
        case 'ArrowUp':
          movementRef.current.forward = true
          break
        case 'KeyW':
        case 'ArrowDown':
          movementRef.current.backward = true
          break
        case 'KeyD':
        case 'ArrowLeft':
          movementRef.current.left = true
          break
        case 'KeyA':
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
        case 'KeyS':
        case 'ArrowUp':
          movementRef.current.forward = false
          break
        case 'KeyW':
        case 'ArrowDown':
          movementRef.current.backward = false
          break
        case 'KeyD':
        case 'ArrowLeft':
          movementRef.current.left = false
          break
        case 'KeyA':
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
      if (document.pointerLockElement) {
        mouseRef.current.theta -= event.movementX * 0.002
        mouseRef.current.phi -= event.movementY * 0.002
        mouseRef.current.phi = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseRef.current.phi))
      }
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
  }, [])

  // Movement and physics
  useEffect(() => {
    const updateMovement = () => {
      if (!cameraRef.current) return

      const camera = cameraRef.current
      const movement = movementRef.current
      const physics = physicsRef.current
      //const delta = clockRef.current.getDelta()
      const speed = movement.shift ? 0.2 : 0.1

      // Movement
      if (movement.forward) {
        camera.position.x += Math.sin(mouseRef.current.theta) * speed
        camera.position.z += Math.cos(mouseRef.current.theta) * speed
      }
      if (movement.backward) {
        camera.position.x -= Math.sin(mouseRef.current.theta) * speed
        camera.position.z -= Math.cos(mouseRef.current.theta) * speed
      }
      if (movement.left) {
        camera.position.x += Math.cos(mouseRef.current.theta) * speed
        camera.position.z -= Math.sin(mouseRef.current.theta) * speed
      }
      if (movement.right) {
        camera.position.x -= Math.cos(mouseRef.current.theta) * speed
        camera.position.z += Math.sin(mouseRef.current.theta) * speed
      }

      // Physics
      physics.yVelocity += GRAVITY
      camera.position.y += physics.yVelocity

      if (camera.position.y <= 1) {
        camera.position.y = 1
        physics.yVelocity = 0
        physics.isGrounded = true
      }

      // Camera rotation
      camera.rotation.y = mouseRef.current.theta
      camera.rotation.x = mouseRef.current.phi
    }

    const interval = setInterval(updateMovement, 16) // ~60fps

    return () => clearInterval(interval)
  }, [])

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
