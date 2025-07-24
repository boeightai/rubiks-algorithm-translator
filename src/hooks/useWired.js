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

import { useState, useEffect } from 'react'

export function useWired() {
  const [wiredIds, setWiredIds] = useState(() => {
    try {
      const stored = localStorage.getItem('wiredAlgorithmIds')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Ensure Right Trigger, Left Trigger, and Fish/Kite are included, but exclude OLL Case 7
        const filtered = parsed.filter(id => id !== 'oll-case-7') // Remove OLL Case 7 from wired list
        const updated = [...new Set([...filtered, 'white-corners-1', 'white-corners-2', 'fish-kite', 'sune', 't-perm-setup', 'pll-e-perm', 'pll-e-perm-inverse'])]
        return updated
      }
      return ['white-corners-1', 'white-corners-2', 'fish-kite', 'sune', 't-perm-setup', 'pll-e-perm', 'pll-e-perm-inverse'] // Right Trigger, Left Trigger, Fish/Kite, Sune, T-Perm Setup, E-Perm, and E-Perm Inverse algorithms start as wired
    } catch {
      return ['white-corners-1', 'white-corners-2', 'fish-kite', 'sune', 't-perm-setup', 'pll-e-perm', 'pll-e-perm-inverse'] // Right Trigger, Left Trigger, Fish/Kite, Sune, T-Perm Setup, E-Perm, and E-Perm Inverse algorithms start as wired
    }
  })

  // Persist wired tags to localStorage
  useEffect(() => {
    localStorage.setItem('wiredAlgorithmIds', JSON.stringify(wiredIds))
  }, [wiredIds])

  const toggleWired = (algorithmId) => {
    setWiredIds(ids =>
      ids.includes(algorithmId)
        ? ids.filter(id => id !== algorithmId)
        : [...ids, algorithmId]
    )
  }

  const isWired = (algorithmId) => wiredIds.includes(algorithmId)

  return {
    wiredIds,
    setWiredIds,
    toggleWired,
    isWired
  }
} 