(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/characters/loadCharacter.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "loadCharacter": (()=>loadCharacter)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
async function loadCharacter(scene, startPosition) {
    // dynamic import to avoid bundler/ts issues
    // @ts-ignore
    const { GLTFLoader } = await __turbopack_context__.r("[project]/node_modules/three/examples/jsm/loaders/GLTFLoader.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('/models/character.glb');
    const root = gltf.scene || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    root.position.copy(startPosition);
    // ensure shadows and convert materials to standard where useful
    root.traverse((c)=>{
        if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
            try {
                if (!(c.material instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"])) {
                    const old = c.material;
                    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                        map: old.map || null,
                        color: old.color || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xffffff)
                    });
                    mat.skinning = !!c.skinned;
                    c.material = mat;
                }
            } catch  {}
        }
    });
    scene.add(root);
    const result = {
        group: root
    };
    if (gltf.animations && gltf.animations.length > 0) {
        const mixer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimationMixer"](root);
        const actions = new Map();
        for (const clip of gltf.animations){
            const name = clip.name || clip.uuid;
            const action = mixer.clipAction(clip);
            action.clampWhenFinished = true;
            action.enabled = true;
            actions.set(name, action);
        }
        result.mixer = mixer;
        result.actions = actions;
        // play Idle if present
        const idle = actions.get('Idle') || actions.get('idle') || actions.values().next().value;
        if (idle) idle.play();
    }
    return result;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/TeaGarden/sceneHelpers.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CHUNK_SIZE": (()=>CHUNK_SIZE),
    "Ground": (()=>Ground),
    "Hands": (()=>Hands),
    "Trees": (()=>Trees)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export C as useThree>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
const CHUNK_SIZE = 50;
function Ground({ materials }) {
    const size = CHUNK_SIZE * 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        "rotation-x": -Math.PI / 2,
        receiveShadow: true,
        position: [
            0,
            0,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                args: [
                    size,
                    size
                ]
            }, void 0, false, {
                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                color: materials.mossyGrass?.color || 0x6b8b3b,
                roughness: 1
            }, void 0, false, {
                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = Ground;
function Trees({ materials, count = 60, spread = CHUNK_SIZE }) {
    _s();
    const positions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    if (positions.current.length === 0) {
        for(let i = 0; i < count; i++){
            positions.current.push([
                (Math.random() - 0.5) * spread * 2,
                0,
                (Math.random() - 0.5) * spread * 2
            ]);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: positions.current.map((p, i)=>{
            const s = 0.8 + i % 5 * 0.02 + Math.random() * 0.6;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: p,
                scale: [
                    s,
                    s,
                    s
                ],
                "rotation-y": Math.random() * Math.PI * 2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            1,
                            0
                        ],
                        castShadow: true,
                        receiveShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                args: [
                                    0.18,
                                    0.25,
                                    2,
                                    8
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                                lineNumber: 40,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: materials.trunk?.color || 0x4a3c28
                            }, void 0, false, {
                                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                                lineNumber: 41,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            2.2,
                            0
                        ],
                        castShadow: true,
                        receiveShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                                args: [
                                    1.2,
                                    2,
                                    8
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: materials.teaPlant?.color || 0x2d5a27
                            }, void 0, false, {
                                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            3.05,
                            0
                        ],
                        castShadow: true,
                        receiveShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("coneGeometry", {
                                args: [
                                    0.8,
                                    1.4,
                                    8
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: materials.teaPlant?.color || 0x3a6b32
                            }, void 0, false, {
                                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                                lineNumber: 49,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 47,
                        columnNumber: 13
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                lineNumber: 38,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(Trees, "INNpnWuLzDacqhX1u9n5RV8h4uw=");
_c1 = Trees;
function Hands({ materials }) {
    _s1();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Hands.useEffect": ()=>{
            const g = groupRef.current;
            camera.add(g);
            g.position.set(0, -0.25, -0.5);
            return ({
                "Hands.useEffect": ()=>{
                    try {
                        camera.remove(g);
                    } catch  {}
                }
            })["Hands.useEffect"];
        }
    }["Hands.useEffect"], [
        camera
    ]);
    const mat = materials.wood || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0xd1a17a
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -0.18,
                    0,
                    -0.15
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.18,
                            0.18,
                            0.5
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        ...mat
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    -0.18,
                    -0.12,
                    -0.4
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.14,
                            0.08,
                            0.2
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        ...mat
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.18,
                    0,
                    -0.15
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.18,
                            0.18,
                            0.5
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        ...mat
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0.18,
                    -0.12,
                    -0.4
                ],
                castShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("boxGeometry", {
                        args: [
                            0.14,
                            0.08,
                            0.2
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        ...mat
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TeaGarden/sceneHelpers.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s1(Hands, "8j9hAmw2wrtuus35KXRwsyU6+ng=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"]
    ];
});
_c2 = Hands;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Ground");
__turbopack_context__.k.register(_c1, "Trees");
__turbopack_context__.k.register(_c2, "Hands");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/PlayerContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PlayerProvider": (()=>PlayerProvider),
    "usePlayer": (()=>usePlayer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
const defaultPlayer = {
    playerRef: {
        current: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1.6, 0)
    }
};
const PlayerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(defaultPlayer);
const PlayerProvider = ({ children })=>{
    _s();
    const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1.6, 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlayerContext.Provider, {
        value: {
            playerRef
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/PlayerContext.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
};
_s(PlayerProvider, "ezlvRaRDG1HW7XN2TkWUyOHHTRM=");
_c = PlayerProvider;
function usePlayer() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PlayerContext);
}
_s1(usePlayer, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "PlayerProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/TeaGardenExplorer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TeaGardenExplorer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$characters$2f$loadCharacter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/characters/loadCharacter.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TeaGarden$2f$sceneHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TeaGarden/sceneHelpers.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PlayerContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function SceneContent({ materials }) {
    _s();
    const { camera, scene } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const player = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayer"])();
    const { playerRef } = player;
    const characterGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mixerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const actionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeActionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const clockRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]());
    const movementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false,
        jump: false
    });
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        phi: 0,
        theta: 0
    });
    // pointer lock on click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SceneContent.useEffect": ()=>{
            const onClick = {
                "SceneContent.useEffect.onClick": ()=>{
                    const el = document.getElementById('root-canvas') || document.body;
                    el.requestPointerLock?.();
                }
            }["SceneContent.useEffect.onClick"];
            window.addEventListener('click', onClick);
            return ({
                "SceneContent.useEffect": ()=>window.removeEventListener('click', onClick)
            })["SceneContent.useEffect"];
        }
    }["SceneContent.useEffect"], []);
    // key handlers
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SceneContent.useEffect": ()=>{
            const onKeyDown = {
                "SceneContent.useEffect.onKeyDown": (e)=>{
                    switch(e.code){
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
                        case 'ShiftLeft':
                        case 'ShiftRight':
                            movementRef.current.shift = true;
                            break;
                        case 'Space':
                            movementRef.current.jump = true;
                            break;
                    }
                }
            }["SceneContent.useEffect.onKeyDown"];
            const onKeyUp = {
                "SceneContent.useEffect.onKeyUp": (e)=>{
                    switch(e.code){
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
                        case 'Space':
                            movementRef.current.jump = false;
                            break;
                    }
                }
            }["SceneContent.useEffect.onKeyUp"];
            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('keyup', onKeyUp);
            return ({
                "SceneContent.useEffect": ()=>{
                    window.removeEventListener('keydown', onKeyDown);
                    window.removeEventListener('keyup', onKeyUp);
                }
            })["SceneContent.useEffect"];
        }
    }["SceneContent.useEffect"], []);
    // mouse movement to control look
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SceneContent.useEffect": ()=>{
            const onMouseMove = {
                "SceneContent.useEffect.onMouseMove": (e)=>{
                    if (document.pointerLockElement) {
                        mouseRef.current.theta -= e.movementX * 0.002;
                        mouseRef.current.phi -= e.movementY * 0.002;
                        mouseRef.current.phi = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseRef.current.phi));
                    }
                }
            }["SceneContent.useEffect.onMouseMove"];
            window.addEventListener('mousemove', onMouseMove);
            return ({
                "SceneContent.useEffect": ()=>window.removeEventListener('mousemove', onMouseMove)
            })["SceneContent.useEffect"];
        }
    }["SceneContent.useEffect"], []);
    // load character into scene
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SceneContent.useEffect": ()=>{
            let mounted = true;
            ({
                "SceneContent.useEffect": async ()=>{
                    try {
                        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$characters$2f$loadCharacter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCharacter"])(scene, playerRef.current.clone());
                        if (!mounted) return;
                        characterGroupRef.current = res.group;
                        if (res.mixer) mixerRef.current = res.mixer;
                        if (res.actions) actionsRef.current = res.actions;
                    } catch (err) {
                        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                        const body = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.6, 1.6, 0.4);
                        const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                            color: 0x996644
                        });
                        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](body, mat);
                        mesh.castShadow = true;
                        mesh.position.set(0, 0.8, 0);
                        g.add(mesh);
                        g.position.copy(playerRef.current);
                        scene.add(g);
                        characterGroupRef.current = g;
                    }
                }
            })["SceneContent.useEffect"]();
            return ({
                "SceneContent.useEffect": ()=>{
                    mounted = false;
                }
            })["SceneContent.useEffect"];
        // scene is stable in R3F, no dependency on loadCharacter here
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["SceneContent.useEffect"], [
        scene
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "SceneContent.useFrame": (state, dt)=>{
            // update mixer
            if (mixerRef.current) mixerRef.current.update(dt);
            // apply camera rotation from mouse (first-person default)
            camera.rotation.order = 'YXZ';
            camera.rotation.x = mouseRef.current.phi;
            camera.rotation.y = mouseRef.current.theta;
            camera.rotation.z = 0;
            // movement relative to camera forward
            const speed = movementRef.current.shift ? 4.0 * dt : 2.0 * dt;
            const forward = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            camera.getWorldDirection(forward);
            forward.y = 0;
            forward.normalize();
            const right = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(forward, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0)).normalize();
            if (movementRef.current.forward) playerRef.current.addScaledVector(forward, speed);
            if (movementRef.current.backward) playerRef.current.addScaledVector(forward, -speed);
            if (movementRef.current.left) playerRef.current.addScaledVector(right, -speed);
            if (movementRef.current.right) playerRef.current.addScaledVector(right, speed);
            // keep camera at eye height
            const EYE_HEIGHT = 1.6;
            camera.position.copy(playerRef.current);
            camera.position.y = EYE_HEIGHT;
            // sync character mesh
            if (characterGroupRef.current) {
                const char = characterGroupRef.current;
                const target = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](playerRef.current.x, 0, playerRef.current.z);
                char.position.lerp(target, 0.2);
                char.rotation.y = mouseRef.current.theta;
            }
        // hands bob handled inside Hands (attached to camera)
        }
    }["SceneContent.useFrame"]);
    return null;
}
_s(SceneContent, "Wh/W001xtbKT1Ii48jimT7TR45U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayer"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = SceneContent;
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
    _s1();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const handsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const characterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [thirdPerson, setThirdPerson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    //const clockRef = useRef<THREE.Clock>(new THREE.Clock())
    const { camera, scene } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const player = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayer"])();
    const { playerRef } = player;
    const characterGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mixerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const actionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeActionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const clockRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Clock"]());
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [locale, setLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en-US');
    // Invert mouse options
    const [invertY, setInvertY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [invertX, setInvertX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Toggle for optional physics engine (cannon-es)
    const [usePhysicsEngine, setUsePhysicsEngine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
    // first-person player position
    const EYE_HEIGHT = 1.6;
    // Physics-related refs (dynamically set when cannon-es is loaded)
    const physicsWorldRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playerBodyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cannonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Trees group ref used for simple collision detection
    const treesGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Player collision radius used by simple physics / cannon body
    const PLAYER_RADIUS = 0.3;
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
    // pointer lock on click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeaGardenExplorer.useEffect": ()=>{
            const onClick = {
                "TeaGardenExplorer.useEffect.onClick": ()=>{
                    const el = document.getElementById('root-canvas') || document.body;
                    el.requestPointerLock?.();
                }
            }["TeaGardenExplorer.useEffect.onClick"];
            window.addEventListener('click', onClick);
            return ({
                "TeaGardenExplorer.useEffect": ()=>window.removeEventListener('click', onClick)
            })["TeaGardenExplorer.useEffect"];
        }
    }["TeaGardenExplorer.useEffect"], []);
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
    // Ground plane creation (keep a subtle ground but not dominating grass)
    const createGround = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TeaGardenExplorer.useCallback[createGround]": (materials)=>{
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaneGeometry"](CHUNK_SIZE * 2, CHUNK_SIZE * 2);
            // use mossyGrass/stone instead of bright grass
            const ground = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geometry, materials.mossyGrass || materials.grass);
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
            // first-person: start at player eye height and use YXZ order so yaw (Y) is applied before pitch (X)
            camera.rotation.order = 'YXZ';
            camera.position.copy(playerRef.current);
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
            // Load character model (try glTF in public/models/character.glb), fallback to simple placeholder
            const loadCharacter = {
                "TeaGardenExplorer.useEffect.loadCharacter": async ()=>{
                    try {
                        // dynamically import GLTFLoader at runtime; use ts-ignore to avoid TS compile-time module errors
                        // @ts-ignore
                        const { GLTFLoader } = await __turbopack_context__.r("[project]/node_modules/three/examples/jsm/loaders/GLTFLoader.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
                        const loader = new GLTFLoader();
                        const gltf = await loader.loadAsync('/models/character.glb');
                        const root = gltf.scene;
                        root.traverse({
                            "TeaGardenExplorer.useEffect.loadCharacter": (c)=>{
                                if (c.isMesh) {
                                    c.castShadow = true;
                                    c.receiveShadow = true;
                                }
                            }
                        }["TeaGardenExplorer.useEffect.loadCharacter"]);
                        root.scale.set(1, 1, 1);
                        root.position.copy(playerRef.current);
                        characterRef.current = root;
                        scene.add(root);
                    } catch (e) {
                        // fallback placeholder
                        const placeholder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                        const body = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.6, 1.6, 0.4);
                        const mat = materials.wood || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                            color: 0x996644
                        });
                        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](body, mat);
                        mesh.castShadow = true;
                        mesh.position.set(0, 0.8, 0);
                        placeholder.add(mesh);
                        placeholder.position.copy(playerRef.current);
                        characterRef.current = placeholder;
                        scene.add(placeholder);
                    }
                }
            }["TeaGardenExplorer.useEffect.loadCharacter"];
            loadCharacter();
            // Create first-person hands and attach to camera
            const hands = createHands(materials);
            handsRef.current = hands;
            camera.add(hands) // attach so hands follow camera transforms
            ;
            const ground = createGround(materials);
            scene.add(ground);
            // Add trees instead of dense grass/tea plant field
            const treesGroup = createTrees(materials, 80, CHUNK_SIZE) // adjust count as needed
            ;
            treesGroupRef.current = treesGroup;
            scene.add(treesGroup);
            // Optional: keep some small shrubs as instanced meshes
            // const teaBushes = createTeaPlants(materials)
            // scene.add(teaBushes)
            // Add sky
            const sky = createSky();
            scene.add(sky);
            // Setup lighting
            setupLighting(scene);
            // Setup fog
            setupFog(scene);
            // Add a checkers board (size 8, square = 1 unit) placed ahead of the camera
            const checkers = createCheckersBoard(materials, 8, 1, {
                position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.05, -10)
            });
            scene.add(checkers);
            // Add tea plants
            const teaPlants = createTeaPlants(materials);
            scene.add(teaPlants);
            // Add trees (duplicate-safe)
            const trees = createTrees(materials, 60, CHUNK_SIZE);
            scene.add(trees);
            setIsLoading(false);
            // Animation loop
            const animate = {
                "TeaGardenExplorer.useEffect.animate": ()=>{
                    animationIdRef.current = requestAnimationFrame(animate);
                    // hands bob / sway — safe-guard refs
                    const handsGroup = handsRef.current;
                    if (handsGroup) {
                        const t = performance.now() / 1000;
                        const movement = movementRef.current;
                        const isMoving = movement.forward || movement.backward || movement.left || movement.right;
                        const walkSpeed = isMoving ? 8 : 2;
                        const bobAmp = isMoving ? 0.04 : 0.01;
                        // vertical bob
                        handsGroup.position.y = -0.2 + Math.sin(t * walkSpeed) * bobAmp;
                        // small forward/back tilt
                        handsGroup.rotation.x = Math.sin(t * walkSpeed * 1.2) * bobAmp * 0.7;
                        // slight sway when strafing
                        const strafe = (movement.left ? -1 : 0) + (movement.right ? 1 : 0);
                        handsGroup.rotation.z = strafe * 0.1 * (isMoving ? 1 : 0);
                    }
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
                    // detach hands from camera
                    if (handsRef.current && camera) {
                        camera.remove(handsRef.current);
                    }
                    if (mountRef.current && renderer.domElement) {
                        mountRef.current?.removeChild(renderer.domElement);
                    }
                    // cleanup physics if created
                    if (physicsWorldRef.current) {
                        try {
                            physicsWorldRef.current.bodies?.forEach({
                                "TeaGardenExplorer.useEffect": (b)=>physicsWorldRef.current.removeBody(b)
                            }["TeaGardenExplorer.useEffect"]);
                        } catch  {}
                        physicsWorldRef.current = null;
                        playerBodyRef.current = null;
                        cannonRef.current = null;
                    }
                    renderer.dispose();
                }
            })["TeaGardenExplorer.useEffect"];
        }
    }["TeaGardenExplorer.useEffect"], []) // keep single scene init
    ;
    // Physics engine init / teardown (cannon-es) — dynamic import when toggle enabled
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeaGardenExplorer.useEffect": ()=>{
            if (!usePhysicsEngine || !sceneRef.current) {
                // if disabling physics, teardown existing world
                if (physicsWorldRef.current) {
                    try {
                        physicsWorldRef.current.bodies?.forEach({
                            "TeaGardenExplorer.useEffect": (b)=>physicsWorldRef.current.removeBody(b)
                        }["TeaGardenExplorer.useEffect"]);
                    } catch  {}
                    physicsWorldRef.current = null;
                    playerBodyRef.current = null;
                    cannonRef.current = null;
                }
                return;
            }
            let cancelled = false;
            ({
                "TeaGardenExplorer.useEffect": async ()=>{
                    try {
                        const CANNON = await __turbopack_context__.r("[project]/node_modules/cannon-es/dist/cannon-es.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
                        if (cancelled) return;
                        cannonRef.current = CANNON;
                        const world = new CANNON.World();
                        world.broadphase = new CANNON.NaiveBroadphase();
                        world.solver.iterations = 10;
                        world.gravity.set(0, -9.82, 0);
                        physicsWorldRef.current = world;
                        // create ground body (large static plane)
                        const groundBody = new CANNON.Body({
                            mass: 0
                        });
                        const groundShape = new CANNON.Plane();
                        groundBody.addShape(groundShape);
                        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
                        groundBody.position.set(0, 0, 0);
                        world.addBody(groundBody);
                        // create player body (sphere approx)
                        const playerShape = new CANNON.Sphere(PLAYER_RADIUS);
                        const playerBody = new CANNON.Body({
                            mass: 1,
                            shape: playerShape,
                            fixedRotation: true
                        });
                        playerBody.position.set(playerRef.current.x, playerRef.current.y, playerRef.current.z);
                        playerBody.linearDamping = 0.9;
                        playerBody.collisionFilterGroup = 1;
                        world.addBody(playerBody);
                        playerBodyRef.current = playerBody;
                        // create static bodies for trees to block player
                        const treesGroup = treesGroupRef.current;
                        if (treesGroup) {
                            treesGroup.children.forEach({
                                "TeaGardenExplorer.useEffect": (tree)=>{
                                    const pos = tree.position;
                                    const radius = 0.6 * (tree.scale.x || 1);
                                    const shape = new CANNON.Sphere(radius);
                                    const body = new CANNON.Body({
                                        mass: 0
                                    });
                                    body.addShape(shape);
                                    body.position.set(pos.x, pos.y + 1, pos.z) // trunk approx center
                                    ;
                                    world.addBody(body);
                                }
                            }["TeaGardenExplorer.useEffect"]);
                        }
                        // simple step loop: run in a timer to keep physics updated
                        const step = {
                            "TeaGardenExplorer.useEffect.step": ()=>{
                                if (!physicsWorldRef.current) return;
                                const fixedTimeStep = 1.0 / 60.0;
                                physicsWorldRef.current.step(fixedTimeStep);
                                // sync playerRef from body
                                if (playerBodyRef.current) {
                                    const p = playerBodyRef.current.position;
                                    playerRef.current.set(p.x, p.y, p.z);
                                }
                            }
                        }["TeaGardenExplorer.useEffect.step"];
                        const interval = setInterval(step, 1000 / 60);
                        return ({
                            "TeaGardenExplorer.useEffect": ()=>{
                                clearInterval(interval);
                            }
                        })["TeaGardenExplorer.useEffect"];
                    } catch (err) {
                        // dynamic import failed: notify user in console
                        console.error('Failed to load cannon-es; install it with `npm i cannon-es` to enable physics', err);
                        setUsePhysicsEngine(false);
                    }
                }
            })["TeaGardenExplorer.useEffect"]();
            return ({
                "TeaGardenExplorer.useEffect": ()=>{
                    cancelled = true;
                }
            })["TeaGardenExplorer.useEffect"];
        }
    }["TeaGardenExplorer.useEffect"], [
        usePhysicsEngine
    ]);
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
                    if (!document.pointerLockElement) return;
                    const signX = invertX ? -1 : 1;
                    const signY = invertY ? -1 : 1;
                    // horizontal (theta) and vertical (phi). adjust signs to invert axes.
                    mouseRef.current.theta += event.movementX * 0.002 * signX;
                    mouseRef.current.phi -= event.movementY * 0.002 * signY;
                    mouseRef.current.phi = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseRef.current.phi));
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
    }["TeaGardenExplorer.useEffect"], [
        invertX,
        invertY
    ]);
    // Movement and physics (use physics engine when enabled, otherwise kinematic + simple collision)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeaGardenExplorer.useEffect": ()=>{
            const updateMovement = {
                "TeaGardenExplorer.useEffect.updateMovement": ()=>{
                    if (!cameraRef.current) return;
                    const camera = cameraRef.current;
                    const movement = movementRef.current;
                    const physics = physicsRef.current;
                    const player = playerRef.current;
                    const speed = movement.shift ? 0.2 : 0.1;
                    // If physics engine enabled, control playerBody velocity instead of manual position
                    if (usePhysicsEngine && playerBodyRef.current && physicsWorldRef.current) {
                        const CANNON = cannonRef.current;
                        const body = playerBodyRef.current;
                        // compute desired horizontal velocity in world XZ plane
                        const forward = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                        camera.getWorldDirection(forward);
                        forward.y = 0;
                        forward.normalize();
                        const right = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(forward, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0)).normalize();
                        const vel = new CANNON.Vec3(0, body.velocity.y, 0);
                        if (movement.forward) vel.vadd(new CANNON.Vec3(forward.x * speed * 60, 0, forward.z * speed * 60), vel);
                        if (movement.backward) vel.vadd(new CANNON.Vec3(-forward.x * speed * 60, 0, -forward.z * speed * 60), vel);
                        if (movement.left) vel.vadd(new CANNON.Vec3(-right.x * speed * 60, 0, -right.z * speed * 60), vel);
                        if (movement.right) vel.vadd(new CANNON.Vec3(right.x * speed * 60, 0, right.z * speed * 60), vel);
                        // apply velocity (keep y from physics)
                        body.velocity.set(vel.x, body.velocity.y, vel.z);
                        // jump
                        if (movement.jump && Math.abs(body.velocity.y) < 0.001) {
                            body.velocity.y = JUMP_POWER * 50;
                        }
                        // update playerRef from body (physics loop also updates periodically)
                        const p = body.position;
                        playerRef.current.set(p.x, p.y, p.z);
                    } else {
                        // Kinematic movement (existing): compute candidate position then check collisions with trees (simple sphere check)
                        // Apply camera rotation from mouse for direction vectors
                        camera.rotation.x = mouseRef.current.phi;
                        camera.rotation.y = mouseRef.current.theta;
                        camera.rotation.z = 0;
                        const dir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                        camera.getWorldDirection(dir);
                        dir.y = 0;
                        dir.normalize();
                        const right = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
                        right.crossVectors(dir, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0)).normalize();
                        const candidate = player.clone();
                        if (movement.forward) candidate.addScaledVector(dir, speed);
                        if (movement.backward) candidate.addScaledVector(dir, -speed);
                        if (movement.left) candidate.addScaledVector(right, -speed);
                        if (movement.right) candidate.addScaledVector(right, speed);
                        // simple collision vs treesGroupRef: don't move inside tree radius
                        const trees = treesGroupRef.current;
                        let blocked = false;
                        if (trees) {
                            for (const t of trees.children){
                                const dx = candidate.x - t.position.x;
                                const dz = candidate.z - t.position.z;
                                const dist2 = dx * dx + dz * dz;
                                const minDist = (PLAYER_RADIUS + 0.6 * (t.scale.x || 1)) ** 2;
                                if (dist2 < minDist) {
                                    blocked = true;
                                    break;
                                }
                            }
                        }
                        if (!blocked) {
                            player.copy(candidate);
                        }
                        // Physics fallback vertical
                        physics.yVelocity += GRAVITY;
                        player.y += physics.yVelocity;
                        if (player.y <= EYE_HEIGHT) {
                            player.y = EYE_HEIGHT;
                            physics.yVelocity = 0;
                            physics.isGrounded = true;
                        }
                    }
                    // Update camera depending on view mode
                    if (thirdPerson) {
                        // place camera behind and above the player
                        const back = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1).applyEuler(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"](0, mouseRef.current.theta, 0));
                        const camPos = player.clone().addScaledVector(back, 3) // 3 units behind
                        ;
                        camPos.y = player.y + 1.6;
                        camera.position.lerp(camPos, 0.2);
                        camera.lookAt(player.x, player.y + 1.0, player.z);
                    } else {
                        // first-person
                        camera.position.copy(player);
                    }
                    // sync character model (visible in third-person)
                    if (characterRef.current) {
                        const char = characterRef.current;
                        char.position.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](player.x, 0, player.z), 0.3);
                        char.rotation.y = mouseRef.current.theta;
                        char.visible = thirdPerson;
                    }
                }
            }["TeaGardenExplorer.useEffect.updateMovement"];
            const interval = setInterval(updateMovement, 16) // ~60fps
            ;
            return ({
                "TeaGardenExplorer.useEffect": ()=>clearInterval(interval)
            })["TeaGardenExplorer.useEffect"];
        }
    }["TeaGardenExplorer.useEffect"], [
        thirdPerson,
        usePhysicsEngine
    ]);
    // load character into scene
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeaGardenExplorer.useEffect": ()=>{
            let mounted = true;
            ({
                "TeaGardenExplorer.useEffect": async ()=>{
                    try {
                        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$characters$2f$loadCharacter$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCharacter"])(scene, playerRef.current.clone());
                        if (!mounted) return;
                        characterGroupRef.current = res.group;
                        if (res.mixer) mixerRef.current = res.mixer;
                        if (res.actions) actionsRef.current = res.actions;
                    } catch (err) {
                        const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                        const body = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.6, 1.6, 0.4);
                        const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                            color: 0x996644
                        });
                        const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](body, mat);
                        mesh.castShadow = true;
                        mesh.position.set(0, 0.8, 0);
                        g.add(mesh);
                        g.position.copy(playerRef.current);
                        scene.add(g);
                        characterGroupRef.current = g;
                    }
                }
            })["TeaGardenExplorer.useEffect"]();
            return ({
                "TeaGardenExplorer.useEffect": ()=>{
                    mounted = false;
                }
            })["TeaGardenExplorer.useEffect"];
        // scene is stable in R3F, no dependency on loadCharacter here
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["TeaGardenExplorer.useEffect"], [
        scene
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "TeaGardenExplorer.useFrame": (state, dt)=>{
            // update mixer
            if (mixerRef.current) mixerRef.current.update(dt);
            // apply camera rotation from mouse (first-person default)
            camera.rotation.order = 'YXZ';
            camera.rotation.x = mouseRef.current.phi;
            camera.rotation.y = mouseRef.current.theta;
            camera.rotation.z = 0;
            // movement relative to camera forward
            const speed = movementRef.current.shift ? 4.0 * dt : 2.0 * dt;
            const forward = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            camera.getWorldDirection(forward);
            forward.y = 0;
            forward.normalize();
            const right = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]().crossVectors(forward, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0)).normalize();
            if (movementRef.current.forward) playerRef.current.addScaledVector(forward, speed);
            if (movementRef.current.backward) playerRef.current.addScaledVector(forward, -speed);
            if (movementRef.current.left) playerRef.current.addScaledVector(right, -speed);
            if (movementRef.current.right) playerRef.current.addScaledVector(right, speed);
            // keep camera at eye height
            const EYE_HEIGHT = 1.6;
            camera.position.copy(playerRef.current);
            camera.position.y = EYE_HEIGHT;
            // sync character mesh
            if (characterGroupRef.current) {
                const char = characterGroupRef.current;
                const target = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](playerRef.current.x, 0, playerRef.current.z);
                char.position.lerp(target, 0.2);
                char.rotation.y = mouseRef.current.theta;
            }
        // hands bob handled inside Hands (attached to camera)
        }
    }["TeaGardenExplorer.useFrame"]);
    const [materials, setMaterials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const textures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(createTextures()).current;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TeaGardenExplorer.useEffect": ()=>{
            const mats = createMaterials(textures);
            setMaterials(mats);
        }
    }["TeaGardenExplorer.useEffect"], [
        textures
    ]);
    if (!materials) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100%'
        }
    }, void 0, false, {
        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
        lineNumber: 972,
        columnNumber: 26
    }, this);
    // return (
    //   <div className="w-full h-screen relative">
    //     <div ref={mountRef} className="w-full h-full" />
    //     {isLoading && (
    //       <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
    //         <div className="text-center">
    //           <div className="text-2xl mb-4">{t('loadingText')}</div>
    //           <div>{t('loadingWait')}</div>
    //         </div>
    //       </div>
    //     )}
    //    {/* Invert mouse controls */}
    //    <div className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded">
    //      <label className="flex items-center gap-2">
    //        <input type="checkbox" checked={invertY} onChange={() => setInvertY(v => !v)} />
    //        <span className="text-sm">Invert Y</span>
    //      </label>
    //      <label className="flex items-center gap-2 mt-1">
    //        <input type="checkbox" checked={invertX} onChange={() => setInvertX(v => !v)} />
    //        <span className="text-sm">Invert X</span>
    //      </label>
    //      <label className="flex items-center gap-2 mt-1">
    //        <input type="checkbox" checked={thirdPerson} onChange={() => setThirdPerson(v => !v)} />
    //        <span className="text-sm">Third-person</span>
    //      </label>
    //      <label className="flex items-center gap-2 mt-1">
    //        <input type="checkbox" checked={usePhysicsEngine} onChange={() => setUsePhysicsEngine(v => !v)} />
    //        <span className="text-sm">Enable Physics Engine (cannon-es)</span>
    //      </label>
    //    </div>
    //     <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-4 rounded">
    //       <div>{t('controlsWasd')}</div>
    //       <div>{t('controlsSpace')}</div>
    //       <div>{t('controlsShift')}</div>
    //     </div>
    //   </div>
    // )
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlayerProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                width: '100%',
                height: '100vh'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                id: "root-canvas",
                shadows: true,
                camera: {
                    position: [
                        0,
                        1.6,
                        0
                    ],
                    fov: 75
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                        intensity: 0.6
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                        lineNumber: 1014,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                        position: [
                            50,
                            50,
                            25
                        ],
                        intensity: 1.0,
                        castShadow: true,
                        "shadow-mapSize-width": 2048,
                        "shadow-mapSize-height": 2048
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                        lineNumber: 1015,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SceneContent, {
                        materials: materials
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                        lineNumber: 1016,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TeaGarden$2f$sceneHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ground"], {
                        materials: materials
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                        lineNumber: 1017,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TeaGarden$2f$sceneHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trees"], {
                        materials: materials,
                        count: 80,
                        spread: CHUNK_SIZE
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                        lineNumber: 1018,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TeaGarden$2f$sceneHelpers$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hands"], {
                        materials: materials
                    }, void 0, false, {
                        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                        lineNumber: 1019,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TeaGardenExplorer.tsx",
                lineNumber: 1013,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/TeaGardenExplorer.tsx",
            lineNumber: 1012,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/TeaGardenExplorer.tsx",
        lineNumber: 1011,
        columnNumber: 7
    }, this);
}
_s1(TeaGardenExplorer, "PsFC2Rig/5+adALLlyeQBs6YDlM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayer"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = TeaGardenExplorer;
// Tree creation (replaces the dense grass area)
const createTrees = (materials, count = 60, chunkSize = 50)=>{
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    const trunkGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.18, 0.25, 2, 8);
    const coneGeo1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](1.2, 2, 8);
    const coneGeo2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConeGeometry"](0.8, 1.4, 8);
    for(let i = 0; i < count; i++){
        const tree = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
        const trunk = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](trunkGeo, materials.trunk);
        trunk.position.y = 1;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);
        const leaves1 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](coneGeo1, materials.teaPlant);
        leaves1.position.y = 2.2;
        leaves1.castShadow = true;
        tree.add(leaves1);
        const leaves2 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](coneGeo2, materials.teaPlant);
        leaves2.position.y = 3.1;
        leaves2.castShadow = true;
        tree.add(leaves2);
        const x = (Math.random() - 0.5) * chunkSize * 2;
        const z = (Math.random() - 0.5) * chunkSize * 2;
        tree.position.set(x, 0, z);
        tree.rotation.y = Math.random() * Math.PI * 2;
        const s = 0.8 + Math.random() * 0.8;
        tree.scale.set(s, s, s);
        group.add(tree);
    }
    return group;
};
// (removed simple checkers board implementation to avoid duplicate declaration; use the detailed createCheckersBoard below)
// New: create a checkers board with pieces
const createCheckersBoard = (materials, size = 8, squareSize = 1, opts)=>{
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    const board = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    const half = size * squareSize / 2;
    const darkMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
        color: 0x3b3b3b
    });
    const lightMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
        color: 0xE0CDA2
    });
    const pieceBlack = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
        color: 0x111111
    });
    const pieceRed = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
        color: 0xAA2222
    });
    const squareGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](squareSize, 0.06, squareSize);
    const pieceGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](squareSize * 0.35, squareSize * 0.35, 0.25, 16);
    for(let row = 0; row < size; row++){
        for(let col = 0; col < size; col++){
            const isDark = (row + col) % 2 === 1;
            const mat = isDark ? darkMat : lightMat;
            const sq = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](squareGeo, mat);
            const x = col * squareSize - half + squareSize / 2;
            const z = row * squareSize - half + squareSize / 2;
            sq.position.set(x, 0, z);
            sq.receiveShadow = true;
            board.add(sq);
            // Place pieces on dark squares in first 3 and last 3 rows
            if (isDark && (row < 3 || row >= size - 3)) {
                const piece = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](pieceGeo, row < 3 ? pieceBlack : pieceRed);
                piece.position.set(x, 0.16, z);
                piece.castShadow = true;
                board.add(piece);
            }
        }
    }
    // thin board base
    const baseGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](size * squareSize + 0.2, 0.1, size * squareSize + 0.2);
    const baseMat = materials.stone || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshLambertMaterial"]({
        color: 0x554433
    });
    const base = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](baseGeo, baseMat);
    base.position.set(0, -0.05, 0);
    base.receiveShadow = true;
    group.add(base);
    group.add(board);
    // position group if provided
    if (opts?.position) {
        group.position.copy(opts.position);
    }
    return group;
};
// Hands creation for first-person view
const createHands = (materials)=>{
    const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
    // position relative to camera (in front, slightly down and to center)
    group.position.set(0, -0.2, -0.5);
    // left forearm
    const armGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.18, 0.18, 0.5);
    const handGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.14, 0.08, 0.2);
    const mat = materials.wood || new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
        color: 0xD1A17A
    });
    const leftArm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](armGeo, mat);
    leftArm.position.set(-0.18, 0, -0.15);
    leftArm.castShadow = true;
    group.add(leftArm);
    const leftHand = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](handGeo, mat);
    leftHand.position.set(-0.18, -0.12, -0.4);
    leftHand.castShadow = true;
    group.add(leftHand);
    // right forearm
    const rightArm = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](armGeo, mat);
    rightArm.position.set(0.18, 0, -0.15);
    rightArm.castShadow = true;
    group.add(rightArm);
    const rightHand = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](handGeo, mat);
    rightHand.position.set(0.18, -0.12, -0.4);
    rightHand.castShadow = true;
    group.add(rightHand);
    // scale a bit and return
    group.scale.set(0.9, 0.9, 0.9);
    return group;
};
var _c, _c1;
__turbopack_context__.k.register(_c, "SceneContent");
__turbopack_context__.k.register(_c1, "TeaGardenExplorer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_2895b3d7._.js.map