(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/TeaGardenExplorer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TeaGardenExplorer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const TRANSLATIONS = {
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
};
function TeaGardenExplorer() {
    _s();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    //const clockRef = useRef<THREE.Clock>(new THREE.Clock())
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [locale, setLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en-US');
    // Game state refs
    const movementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
        shift: false
    });
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        phi: 0,
        theta: 0
    });
    const physicsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        yVelocity: 0,
        isGrounded: true
    });
    //const chunksRef = useRef<Map<string, THREE.Group>>(new Map())
    //const loadedChunksRef = useRef<Set<string>>(new Set())
    // Constants
    const CHUNK_SIZE = 50;
    const GRAVITY = -0.015;
    const JUMP_POWER = 0.3;
    // Translation helper
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeaGardenExplorer.useCallback[t]": (key)=>{
            return TRANSLATIONS[locale]?.[key] || TRANSLATIONS['en-US'][key] || key;
        }
    }["TeaGardenExplorer.useCallback[t]"], [
        locale
    ]);
    // Detect locale
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeaGardenExplorer.useEffect": ()=>{
            const browserLocale = navigator.languages?.[0] || navigator.language || 'en-US';
            const findMatchingLocale = {
                "TeaGardenExplorer.useEffect.findMatchingLocale": (locale)=>{
                    if (TRANSLATIONS[locale]) return locale;
                    const lang = locale.split('-')[0];
                    const match = Object.keys(TRANSLATIONS).find({
                        "TeaGardenExplorer.useEffect.findMatchingLocale.match": (key)=>key.startsWith(lang + '-')
                    }["TeaGardenExplorer.useEffect.findMatchingLocale.match"]);
                    return match || 'en-US';
                }
            }["TeaGardenExplorer.useEffect.findMatchingLocale"];
            setLocale(findMatchingLocale(browserLocale));
        }
    }["TeaGardenExplorer.useEffect"], []);
    // Texture creation
    const createTextures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeaGardenExplorer.useCallback[createTextures]": ()=>{
            // Create grass texture
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const context = canvas.getContext('2d');
            context.fillStyle = '#3a5f3a';
            context.fillRect(0, 0, 256, 256);
            // Add some noise for grass
            for(let i = 0; i < 1000; i++){
                context.fillStyle = `hsl(${80 + Math.random() * 20}, 50%, ${30 + Math.random() * 20}%)`;
                context.fillRect(Math.random() * 256, Math.random() * 256, 1, 1);
            }
            const grassTexture = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            grassTexture.wrapS = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            grassTexture.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
            grassTexture.repeat.set(10, 10);
            return {
                grassTexture
            };
        }
    }["TeaGardenExplorer.useCallback[createTextures]"], []);
    // Material creation
    const createMaterials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeaGardenExplorer.useCallback[createMaterials]": (textures)=>{
            return {
                grass: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
                    color: 0x3a5f3a,
                    map: textures.grassTexture
                }),
                mossyGrass: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
                    color: 0x4a6f4a
                }),
                water: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]({
                    color: 0x4682B4,
                    shininess: 100,
                    transparent: true,
                    opacity: 0.8
                }),
                stone: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
                    color: 0x808080
                }),
                wood: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
                    color: 0x8B4513
                }),
                trunk: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
                    color: 0x4a3c28
                }),
                lantern: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]({
                    color: 0xff6b35,
                    emissive: 0xff6b35,
                    emissiveIntensity: 0.2
                }),
                teaPlant: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
                    color: 0x228B22
                })
            };
        }
    }["TeaGardenExplorer.useCallback[createMaterials]"], []);
    // Tea plant creation with InstancedMesh
    const createTeaPlants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeaGardenExplorer.useCallback[createTeaPlants]": (materials)=>{
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.3, 8, 6);
            const instancedMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](geometry, materials.teaPlant, 200);
            const matrix = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
            const position = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            const rotation = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]();
            const scale = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            for(let i = 0; i < 200; i++){
                position.set((Math.random() - 0.5) * CHUNK_SIZE, 0.3, (Math.random() - 0.5) * CHUNK_SIZE);
                rotation.set(0, Math.random() * Math.PI * 2, 0);
                scale.setScalar(0.5 + Math.random() * 0.5);
                matrix.makeRotationFromEuler(rotation);
                matrix.setPosition(position);
                matrix.scale(scale);
                instancedMesh.setMatrixAt(i, matrix);
            }
            instancedMesh.castShadow = true;
            return instancedMesh;
        }
    }["TeaGardenExplorer.useCallback[createTeaPlants]"], []);
    // Ground plane creation
    const createGround = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeaGardenExplorer.useCallback[createGround]": (materials)=>{
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](CHUNK_SIZE * 2, CHUNK_SIZE * 2);
            const ground = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, materials.grass);
            ground.rotation.x = -Math.PI / 2;
            ground.receiveShadow = true;
            return ground;
        }
    }["TeaGardenExplorer.useCallback[createGround]"], []);
    // Sky gradient
    const createSky = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeaGardenExplorer.useCallback[createSky]": ()=>{
            const skyGeometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](1000, 32, 32);
            const skyMaterial = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShaderMaterial"]({
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
                side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackSide"]
            });
            const sky = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](skyGeometry, skyMaterial);
            return sky;
        }
    }["TeaGardenExplorer.useCallback[createSky]"], []);
    // Lighting setup
    const setupLighting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeaGardenExplorer.useCallback[setupLighting]": (scene)=>{
            const ambientLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmbientLight"](0x404040, 0.4);
            scene.add(ambientLight);
            const directionalLight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0xffffff, 0.8);
            directionalLight.position.set(50, 50, 25);
            directionalLight.castShadow = true;
            directionalLight.shadow.mapSize.width = 2048;
            directionalLight.shadow.mapSize.height = 2048;
            directionalLight.shadow.camera.near = 0.5;
            directionalLight.shadow.camera.far = 500;
            directionalLight.shadow.camera.left = -100;
            directionalLight.shadow.camera.right = 100;
            directionalLight.shadow.camera.top = 100;
            directionalLight.shadow.camera.bottom = -100;
            scene.add(directionalLight);
        }
    }["TeaGardenExplorer.useCallback[setupLighting]"], []);
    // Fog setup
    const setupFog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeaGardenExplorer.useCallback[setupFog]": (scene)=>{
            scene.fog = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fog"](0x87CEEB, 50, 200);
        }
    }["TeaGardenExplorer.useCallback[setupFog]"], []);
    // Initialization
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeaGardenExplorer.useEffect": ()=>{
            if (!mountRef.current) return;
            // Create scene
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            sceneRef.current = scene;
            // Create camera
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 5, 10);
            cameraRef.current = camera;
            // Create renderer
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["WebGLRenderer"]({
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PCFSoftShadowMap"];
            rendererRef.current = renderer;
            mountRef.current.appendChild(renderer.domElement);
            // Create textures and materials
            const textures = createTextures();
            const materials = createMaterials(textures);
            // Add ground
            const ground = createGround(materials);
            scene.add(ground);
            // Add sky
            const sky = createSky();
            scene.add(sky);
            // Setup lighting
            setupLighting(scene);
            // Setup fog
            setupFog(scene);
            // Add tea plants
            const teaPlants = createTeaPlants(materials);
            scene.add(teaPlants);
            setIsLoading(false);
            // Animation loop
            const animate = {
                "TeaGardenExplorer.useEffect.animate": ()=>{
                    animationIdRef.current = requestAnimationFrame(animate);
                    renderer.render(scene, camera);
                }
            }["TeaGardenExplorer.useEffect.animate"];
            animate();
            // Cleanup
            return ({
                "TeaGardenExplorer.useEffect": ()=>{
                    if (animationIdRef.current) {
                        cancelAnimationFrame(animationIdRef.current);
                    }
                    if (mountRef.current && renderer.domElement) {
                        mountRef.current?.removeChild(renderer.domElement);
                    }
                    renderer.dispose();
                }
            })["TeaGardenExplorer.useEffect"];
        }
    }["TeaGardenExplorer.useEffect"], []);
    // Event listeners
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeaGardenExplorer.useEffect": ()=>{
            const handleKeyDown = {
                "TeaGardenExplorer.useEffect.handleKeyDown": (event)=>{
                    switch(event.code){
                        case 'KeyW':
                        case 'ArrowUp':
                            movementRef.current.forward = true;
                            break;
                        case 'KeyS':
                        case 'ArrowDown':
                            movementRef.current.backward = true;
                            break;
                        case 'KeyA':
                        case 'ArrowLeft':
                            movementRef.current.left = true;
                            break;
                        case 'KeyD':
                        case 'ArrowRight':
                            movementRef.current.right = true;
                            break;
                        case 'Space':
                            if (physicsRef.current.isGrounded) {
                                physicsRef.current.yVelocity = JUMP_POWER;
                                physicsRef.current.isGrounded = false;
                            }
                            break;
                        case 'ShiftLeft':
                        case 'ShiftRight':
                            movementRef.current.shift = true;
                            break;
                    }
                }
            }["TeaGardenExplorer.useEffect.handleKeyDown"];
            const handleKeyUp = {
                "TeaGardenExplorer.useEffect.handleKeyUp": (event)=>{
                    switch(event.code){
                        case 'KeyW':
                        case 'ArrowUp':
                            movementRef.current.forward = false;
                            break;
                        case 'KeyS':
                        case 'ArrowDown':
                            movementRef.current.backward = false;
                            break;
                        case 'KeyA':
                        case 'ArrowLeft':
                            movementRef.current.left = false;
                            break;
                        case 'KeyD':
                        case 'ArrowRight':
                            movementRef.current.right = false;
                            break;
                        case 'ShiftLeft':
                        case 'ShiftRight':
                            movementRef.current.shift = false;
                            break;
                    }
                }
            }["TeaGardenExplorer.useEffect.handleKeyUp"];
            const handleMouseMove = {
                "TeaGardenExplorer.useEffect.handleMouseMove": (event)=>{
                    if (document.pointerLockElement) {
                        mouseRef.current.theta -= event.movementX * 0.002;
                        mouseRef.current.phi -= event.movementY * 0.002;
                        mouseRef.current.phi = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseRef.current.phi));
                    }
                }
            }["TeaGardenExplorer.useEffect.handleMouseMove"];
            const handleClick = {
                "TeaGardenExplorer.useEffect.handleClick": ()=>{
                    if (mountRef.current) {
                        mountRef.current.requestPointerLock();
                    }
                }
            }["TeaGardenExplorer.useEffect.handleClick"];
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            window.addEventListener('mousemove', handleMouseMove);
            if (mountRef.current) {
                mountRef.current.addEventListener('click', handleClick);
            }
            return ({
                "TeaGardenExplorer.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                    window.removeEventListener('keyup', handleKeyUp);
                    window.removeEventListener('mousemove', handleMouseMove);
                    if (mountRef.current) {
                        mountRef.current.removeEventListener('click', handleClick);
                    }
                }
            })["TeaGardenExplorer.useEffect"];
        }
    }["TeaGardenExplorer.useEffect"], []);
    // Movement and physics
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeaGardenExplorer.useEffect": ()=>{
            const updateMovement = {
                "TeaGardenExplorer.useEffect.updateMovement": ()=>{
                    if (!cameraRef.current) return;
                    const camera = cameraRef.current;
                    const movement = movementRef.current;
                    const physics = physicsRef.current;
                    //const delta = clockRef.current.getDelta()
                    const speed = movement.shift ? 0.2 : 0.1;
                    // Movement
                    if (movement.forward) {
                        camera.position.x += Math.sin(mouseRef.current.theta) * speed;
                        camera.position.z += Math.cos(mouseRef.current.theta) * speed;
                    }
                    if (movement.backward) {
                        camera.position.x -= Math.sin(mouseRef.current.theta) * speed;
                        camera.position.z -= Math.cos(mouseRef.current.theta) * speed;
                    }
                    if (movement.left) {
                        camera.position.x += Math.cos(mouseRef.current.theta) * speed;
                        camera.position.z -= Math.sin(mouseRef.current.theta) * speed;
                    }
                    if (movement.right) {
                        camera.position.x -= Math.cos(mouseRef.current.theta) * speed;
                        camera.position.z += Math.sin(mouseRef.current.theta) * speed;
                    }
                    // Physics
                    physics.yVelocity += GRAVITY;
                    camera.position.y += physics.yVelocity;
                    if (camera.position.y <= 1) {
                        camera.position.y = 1;
                        physics.yVelocity = 0;
                        physics.isGrounded = true;
                    }
                    // Camera rotation
                    camera.rotation.y = mouseRef.current.theta;
                    camera.rotation.x = mouseRef.current.phi;
                }
            }["TeaGardenExplorer.useEffect.updateMovement"];
            const interval = setInterval(updateMovement, 16) // ~60fps
            ;
            return ({
                "TeaGardenExplorer.useEffect": ()=>clearInterval(interval)
            })["TeaGardenExplorer.useEffect"];
        }
    }["TeaGardenExplorer.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-screen relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mountRef,
                className: "w-full h-full"
            }, void 0, false, {
                fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                lineNumber: 436,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-2xl mb-4",
                            children: t('loadingText')
                        }, void 0, false, {
                            fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                            lineNumber: 440,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: t('loadingWait')
                        }, void 0, false, {
                            fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                            lineNumber: 441,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                    lineNumber: 439,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                lineNumber: 438,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-4 rounded",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: t('controlsWasd')
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                        lineNumber: 446,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: t('controlsSpace')
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: t('controlsShift')
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                        lineNumber: 448,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                lineNumber: 445,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
        lineNumber: 435,
        columnNumber: 5
    }, this);
}
_s(TeaGardenExplorer, "xxHpsrjjupAD7g5Wwrl0aCDJwk4=");
_c = TeaGardenExplorer;
var _c;
__turbopack_context__.k.register(_c, "TeaGardenExplorer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_TeaGardenExplorer_tsx_3f721ef7._.js.map