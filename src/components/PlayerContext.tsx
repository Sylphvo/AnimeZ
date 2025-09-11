import React, { createContext, useContext, useRef } from 'react'
import * as THREE from 'three'

type PlayerState = {
  playerRef: React.MutableRefObject<THREE.Vector3>
}

const defaultPlayer: PlayerState = {
  playerRef: { current: new THREE.Vector3(0, 1.6, 0) },
} as any

const PlayerContext = createContext<PlayerState>(defaultPlayer)

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const playerRef = useRef(new THREE.Vector3(0, 1.6, 0))
  return <PlayerContext.Provider value={{ playerRef }}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  return useContext(PlayerContext)
}