/*
 * Rubik's Cube Algorithm Translator
 * Copyright (C) 2025 Bo Nam
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR ANY PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { colors, borderRadius, shadows, typography, spacing } from '../styles/designSystem'
import { useMobileDetection } from '../hooks/useMobileDetection'

const CUBIE_SPACING = 1.06
const CUBE_SCALE = 0.9
const TURN_DURATION_MS = 1200
const MOVE_PAUSE_MS = 450
const START_PAUSE_MS = 1000

const FACE_COLORS = {
  U: 0xf8fafc,
  D: 0xfacc15,
  F: 0x22c55e,
  B: 0x3b82f6,
  R: 0xef4444,
  L: 0xf97316,
}

const DAISY_PATTERN_COLORS = {
  black: 0x020617,
  blue: 0x0284c7,
  gray: 0xcbd5e1,
  yellow: 0xfacc15,
}

const MOVE_DEFINITIONS = {
  F: { axis: 'z', layer: 1, angle: -Math.PI / 2 },
  "F'": { axis: 'z', layer: 1, angle: Math.PI / 2 },
  F2: { axis: 'z', layer: 1, angle: -Math.PI },
  R: { axis: 'x', layer: 1, angle: -Math.PI / 2 },
  "R'": { axis: 'x', layer: 1, angle: Math.PI / 2 },
  R2: { axis: 'x', layer: 1, angle: -Math.PI },
  U: { axis: 'y', layer: 1, angle: -Math.PI / 2 },
  "U'": { axis: 'y', layer: 1, angle: Math.PI / 2 },
  U2: { axis: 'y', layer: 1, angle: -Math.PI },
}

const easeInOutCubic = (t) => {
  if (t < 0.5) return 4 * t * t * t
  return 1 - Math.pow(-2 * t + 2, 3) / 2
}

const parseNotation = (notation) => {
  if (!notation || typeof notation !== 'string') return []
  return notation.split(' ').filter(Boolean)
}

const getDaisyPatternStickerColor = (face, x, y, z) => {
  if (face === 'F') {
    if (x === 0 && y === 1) return DAISY_PATTERN_COLORS.gray
    if (x === 0 && y === 0) return DAISY_PATTERN_COLORS.blue
    return DAISY_PATTERN_COLORS.black
  }

  if (face === 'U') {
    if (x === 0 && z === 1) return DAISY_PATTERN_COLORS.blue
    if (x === 0 && z === 0) return DAISY_PATTERN_COLORS.yellow
    if (Math.abs(x) + Math.abs(z) === 1) return DAISY_PATTERN_COLORS.gray
    return DAISY_PATTERN_COLORS.black
  }

  if (face === 'L' || face === 'R') {
    return DAISY_PATTERN_COLORS.black
  }

  if (face === 'D') {
    return DAISY_PATTERN_COLORS.black
  }

  return FACE_COLORS[face]
}

function InteractiveCubeDemo({ notation, onActiveMoveChange }) {
  const { isMobile, isTablet } = useMobileDetection()
  const mountRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const viewRootRef = useRef(null)
  const cubeRootRef = useRef(null)
  const cubiesRef = useRef([])
  const renderFrameRef = useRef(null)
  const moveFrameRef = useRef(null)
  const timeoutRef = useRef(null)
  const isRunningRef = useRef(false)
  const isPausedRef = useRef(false)
  const activeMoveRef = useRef(null)
  const pointerRef = useRef({
    isDragging: false,
    x: 0,
    y: 0,
  })

  const [activeMoveIndex, setActiveMoveIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

  const moves = useMemo(() => parseNotation(notation), [notation])
  const currentMove = activeMoveIndex === null ? null : moves[activeMoveIndex]
  const isCompact = isMobile || isTablet

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const setActiveMove = useCallback((index) => {
    activeMoveRef.current = index
    setActiveMoveIndex(index)
    if (typeof onActiveMoveChange === 'function') {
      onActiveMoveChange(index)
    }
  }, [onActiveMoveChange])

  const createSticker = useCallback((face, position, rotation, gridPosition) => {
    const geometry = new THREE.PlaneGeometry(0.72, 0.72)
    const material = new THREE.MeshStandardMaterial({
      color: getDaisyPatternStickerColor(face, gridPosition.x, gridPosition.y, gridPosition.z),
      roughness: 0.72,
      metalness: 0.02,
      side: THREE.DoubleSide,
    })
    const sticker = new THREE.Mesh(geometry, material)
    sticker.position.set(position.x, position.y, position.z)
    sticker.rotation.set(rotation.x, rotation.y, rotation.z)
    return sticker
  }, [])

  const createCubie = useCallback((x, y, z) => {
    const group = new THREE.Group()
    group.position.set(x * CUBIE_SPACING, y * CUBIE_SPACING, z * CUBIE_SPACING)
    group.userData.grid = { x, y, z }

    const geometry = new THREE.BoxGeometry(0.96, 0.96, 0.96)
    const material = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.55,
      metalness: 0.03,
    })
    group.add(new THREE.Mesh(geometry, material))

    if (y === 1) {
      group.add(createSticker('U', { x: 0, y: 0.486, z: 0 }, { x: -Math.PI / 2, y: 0, z: 0 }, { x, y, z }))
    }
    if (y === -1) {
      group.add(createSticker('D', { x: 0, y: -0.486, z: 0 }, { x: Math.PI / 2, y: 0, z: 0 }, { x, y, z }))
    }
    if (z === 1) {
      group.add(createSticker('F', { x: 0, y: 0, z: 0.486 }, { x: 0, y: 0, z: 0 }, { x, y, z }))
    }
    if (z === -1) {
      group.add(createSticker('B', { x: 0, y: 0, z: -0.486 }, { x: 0, y: Math.PI, z: 0 }, { x, y, z }))
    }
    if (x === 1) {
      group.add(createSticker('R', { x: 0.486, y: 0, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 }, { x, y, z }))
    }
    if (x === -1) {
      group.add(createSticker('L', { x: -0.486, y: 0, z: 0 }, { x: 0, y: -Math.PI / 2, z: 0 }, { x, y, z }))
    }

    return group
  }, [createSticker])

  const resetCube = useCallback(() => {
    const cubeRoot = cubeRootRef.current
    if (!cubeRoot) return

    while (cubeRoot.children.length > 0) {
      const child = cubeRoot.children[0]
      cubeRoot.remove(child)
    }

    const cubies = []
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          const cubie = createCubie(x, y, z)
          cubies.push(cubie)
          cubeRoot.add(cubie)
        }
      }
    }

    const viewRoot = viewRootRef.current
    if (viewRoot) {
      viewRoot.rotation.set(0, 0, 0)
      viewRoot.scale.setScalar(isCompact ? 0.56 : CUBE_SCALE)
      viewRoot.position.set(0, isCompact ? 0.75 : 0.25, 0)
    }
    cubeRoot.rotation.set(0, 0, 0)
    cubiesRef.current = cubies
  }, [createCubie, isCompact])

  const resizeRenderer = useCallback(() => {
    const mount = mountRef.current
    const renderer = rendererRef.current
    const camera = cameraRef.current
    if (!mount || !renderer || !camera) return

    const { width, height } = mount.getBoundingClientRect()
    renderer.setSize(width, height, true)
    camera.aspect = width / Math.max(height, 1)
    camera.updateProjectionMatrix()
  }, [])

  const animateMove = useCallback((move, moveIndex) => {
    const definition = MOVE_DEFINITIONS[move]

    if (!definition) {
      return Promise.resolve()
    }

    setActiveMove(moveIndex)

    const layerCubies = cubiesRef.current.filter((cubie) => {
      return Math.round(cubie.userData.grid[definition.axis]) === definition.layer
    })

    const axisVector = new THREE.Vector3(
      definition.axis === 'x' ? 1 : 0,
      definition.axis === 'y' ? 1 : 0,
      definition.axis === 'z' ? 1 : 0
    )
    const startStates = layerCubies.map((cubie) => {
      return {
        cubie,
        position: cubie.position.clone(),
        quaternion: cubie.quaternion.clone(),
      }
    })

    return new Promise((resolve) => {
      let elapsed = 0
      let lastTime = performance.now()

      const tick = (now) => {
        const delta = now - lastTime
        lastTime = now

        if (!isRunningRef.current) {
          resolve()
          return
        }

        if (isPausedRef.current) {
          moveFrameRef.current = requestAnimationFrame(tick)
          return
        }

        elapsed += delta
        const progress = Math.min(elapsed / TURN_DURATION_MS, 1)
        const rotation = new THREE.Quaternion().setFromAxisAngle(
          axisVector,
          definition.angle * easeInOutCubic(progress)
        )

        startStates.forEach(({ cubie, position, quaternion }) => {
          cubie.position.copy(position).applyQuaternion(rotation)
          cubie.quaternion.copy(rotation).multiply(quaternion)
        })

        if (progress < 1) {
          moveFrameRef.current = requestAnimationFrame(tick)
          return
        }

        startStates.forEach(({ cubie }) => {
          const nextGrid = {
            x: Math.round(cubie.position.x / CUBIE_SPACING),
            y: Math.round(cubie.position.y / CUBIE_SPACING),
            z: Math.round(cubie.position.z / CUBIE_SPACING),
          }
          cubie.position.set(
            nextGrid.x * CUBIE_SPACING,
            nextGrid.y * CUBIE_SPACING,
            nextGrid.z * CUBIE_SPACING
          )
          cubie.userData.grid = nextGrid
        })
        resolve()
      }

      moveFrameRef.current = requestAnimationFrame(tick)
    })
  }, [setActiveMove])

  const playSequence = useCallback(async () => {
    if (moves.length === 0) return

    isRunningRef.current = true
    isPausedRef.current = false
    setIsPlaying(true)
    setIsPaused(false)
    setHasCompleted(false)
    setActiveMove(null)
    clearTimers()
    resetCube()

    await new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, START_PAUSE_MS)
    })

    for (let index = 0; index < moves.length; index += 1) {
      if (!isRunningRef.current) break
      await animateMove(moves[index], index)
      if (!isRunningRef.current) break
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, MOVE_PAUSE_MS)
      })
    }

    if (isRunningRef.current) {
      setHasCompleted(true)
    }
    isRunningRef.current = false
    isPausedRef.current = false
    setIsPlaying(false)
    setIsPaused(false)
    setActiveMove(null)
  }, [animateMove, clearTimers, moves, resetCube, setActiveMove])

  const stopSequence = useCallback(() => {
    isRunningRef.current = false
    isPausedRef.current = false
    clearTimers()
    if (moveFrameRef.current) {
      cancelAnimationFrame(moveFrameRef.current)
      moveFrameRef.current = null
    }
    setIsPlaying(false)
    setIsPaused(false)
    setActiveMove(null)
  }, [clearTimers, setActiveMove])

  const replay = useCallback(() => {
    stopSequence()
    window.setTimeout(() => {
      playSequence()
    }, 0)
  }, [playSequence, stopSequence])

  const togglePause = useCallback(() => {
    if (!isPlaying) {
      replay()
      return
    }
    isPausedRef.current = !isPausedRef.current
    setIsPaused(isPausedRef.current)
  }, [isPlaying, replay])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8fafc)

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 7.2, 7.2)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    mount.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(4, 5, 6)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.1)
    fillLight.position.set(-3, 2, 4)
    scene.add(fillLight)

    const viewRoot = new THREE.Group()
    const cubeRoot = new THREE.Group()
    viewRoot.add(cubeRoot)
    scene.add(viewRoot)

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer
    viewRootRef.current = viewRoot
    cubeRootRef.current = cubeRoot

    resetCube()
    resizeRenderer()

    const render = () => {
      renderer.render(scene, camera)
      renderFrameRef.current = requestAnimationFrame(render)
    }
    render()

    const handleResize = () => resizeRenderer()
    window.addEventListener('resize', handleResize)

    return () => {
      stopSequence()
      window.removeEventListener('resize', handleResize)
      if (renderFrameRef.current) {
        cancelAnimationFrame(renderFrameRef.current)
      }
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [resetCube, resizeRenderer, stopSequence])

  useEffect(() => {
    replay()
    return () => stopSequence()
  }, [replay, stopSequence])

  const handlePointerDown = (event) => {
    pointerRef.current = {
      isDragging: true,
      x: event.clientX,
      y: event.clientY,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const pointer = pointerRef.current
    const viewRoot = viewRootRef.current
    if (!pointer.isDragging || !viewRoot) return

    const deltaX = event.clientX - pointer.x
    const deltaY = event.clientY - pointer.y
    viewRoot.rotation.y += deltaX * 0.008
    viewRoot.rotation.x += deltaY * 0.006
    pointer.x = event.clientX
    pointer.y = event.clientY
  }

  const handlePointerUp = (event) => {
    pointerRef.current.isDragging = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: isMobile ? '100%' : isTablet ? '600px' : '500px',
      margin: '0 auto',
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.xl,
      overflow: 'hidden',
      boxShadow: shadows.lg,
      border: `1px solid ${colors.border.light}`,
    }}>
      <div style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        minHeight: isCompact ? '260px' : '280px',
        backgroundColor: colors.neutral[50],
      }}>
        <div
          ref={mountRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            position: 'absolute',
            inset: 0,
            cursor: 'grab',
            touchAction: 'none',
          }}
          aria-label="Interactive Rubik's cube move demonstration"
          role="img"
        />

        <div style={{
          position: 'absolute',
          left: isCompact ? spacing[3] : spacing[4],
          right: isCompact ? spacing[3] : spacing[4],
          bottom: isCompact ? spacing[3] : spacing[4],
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCompact ? 'center' : 'space-between',
          gap: spacing[3],
          flexWrap: 'wrap',
          flexDirection: isCompact ? 'column' : 'row',
          pointerEvents: 'none',
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            border: `1px solid ${colors.border.light}`,
            borderRadius: borderRadius.lg,
            padding: `${spacing[2]} ${spacing[3]}`,
            boxShadow: shadows.sm,
            color: colors.neutral[800],
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            minWidth: isCompact ? '0' : '132px',
            textAlign: isCompact ? 'center' : 'left',
          }}>
            {currentMove ? `Move ${activeMoveIndex + 1} of ${moves.length}: ${currentMove}` : hasCompleted ? 'Sequence complete' : 'Ready'}
          </div>

          <div style={{
            display: 'flex',
            gap: spacing[2],
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}>
            <button
              type="button"
              onClick={togglePause}
              style={{
                minHeight: '40px',
                padding: `${spacing[2]} ${spacing[3]}`,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.border.medium}`,
                backgroundColor: colors.white,
                color: colors.neutral[800],
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                cursor: 'pointer',
                boxShadow: shadows.sm,
              }}
            >
              {isPlaying && !isPaused ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              onClick={replay}
              style={{
                minHeight: '40px',
                padding: `${spacing[2]} ${spacing[3]}`,
                borderRadius: borderRadius.lg,
                border: 'none',
                backgroundColor: colors.primary[500],
                color: colors.white,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                cursor: 'pointer',
                boxShadow: shadows.sm,
              }}
            >
              Replay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveCubeDemo
