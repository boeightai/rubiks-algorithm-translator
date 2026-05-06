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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

export const MOVE_DEFINITIONS = {
  F: { axis: 'z', layer: 1, angle: -Math.PI / 2 },
  "F'": { axis: 'z', layer: 1, angle: Math.PI / 2 },
  F2: { axis: 'z', layer: 1, angle: -Math.PI },
  R: { axis: 'x', layer: 1, angle: -Math.PI / 2 },
  "R'": { axis: 'x', layer: 1, angle: Math.PI / 2 },
  R2: { axis: 'x', layer: 1, angle: -Math.PI },
  L: { axis: 'x', layer: -1, angle: Math.PI / 2 },
  "L'": { axis: 'x', layer: -1, angle: -Math.PI / 2 },
  L2: { axis: 'x', layer: -1, angle: Math.PI },
  U: { axis: 'y', layer: 1, angle: -Math.PI / 2 },
  "U'": { axis: 'y', layer: 1, angle: Math.PI / 2 },
  U2: { axis: 'y', layer: 1, angle: -Math.PI },
}

export const parseNotation = (notation) => {
  if (!notation || typeof notation !== 'string') return []
  return notation.split(' ').filter(Boolean)
}

export const canAnimateNotation = (notation) => {
  const moves = parseNotation(notation)
  return moves.length > 0 && moves.every((move) => MOVE_DEFINITIONS[move])
}

export const expandMoveForAnimation = (move) => {
  if (!move || typeof move !== 'string') return []
  if (!move.endsWith('2')) return [move]

  const quarterTurn = move.slice(0, -1)
  return [quarterTurn, quarterTurn]
}

export const expandNotationForAnimation = (notation) => {
  const visualMoves = parseNotation(notation)
  const animationMoves = []
  const visualMoveIndices = []

  visualMoves.forEach((move, visualIndex) => {
    expandMoveForAnimation(move).forEach((animationMove) => {
      animationMoves.push(animationMove)
      visualMoveIndices.push(visualIndex)
    })
  })

  return {
    visualMoves,
    animationMoves,
    visualMoveIndices,
  }
}
