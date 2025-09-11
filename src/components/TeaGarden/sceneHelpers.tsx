import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export const CHUNK_SIZE = 50

type Materials = {
  trunk?: THREE.Material
  teaPlant?: THREE.Material
  mossyGrass?: THREE.Material
  stone?: THREE.Material
  wood?: THREE.Material
}

export function Ground({ materials }: { materials: Materials }) {
  const size = CHUNK_SIZE * 2
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color={(materials.mossyGrass as any)?.color || 0x6b8b3b} roughness={1} />
    </mesh>
  )
}

export function Trees({ materials, count = 60, spread = CHUNK_SIZE }: { materials: Materials; count?: number; spread?: number }) {
  const positions = useRef<Array<[number, number, number]>>([])
  if (positions.current.length === 0) {
    for (let i = 0; i < count; i++) {
      positions.current.push([(Math.random() - 0.5) * spread * 2, 0, (Math.random() - 0.5) * spread * 2])
    }
  }

  return (
    <group>
      {positions.current.map((p, i) => {
        const s = 0.8 + (i % 5) * 0.02 + Math.random() * 0.6
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

export function Hands({ materials }: { materials: Materials }) {
  const groupRef = useRef<THREE.Group | null>(null)
  const { camera } = useThree()

  useEffect(() => {
    const g = groupRef.current!
    camera.add(g)
    g.position.set(0, -0.25, -0.5)
    return () => {
      try {
        camera.remove(g)
      } catch {}
    }
  }, [camera])

  const mat = (materials.wood as THREE.Material) || new THREE.MeshStandardMaterial({ color: 0xd1a17a })

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