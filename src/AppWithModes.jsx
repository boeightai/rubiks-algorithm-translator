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

import { useState } from 'react'
import AlgorithmSelectorRefactored from './AlgorithmSelectorRefactored'
import TutorialMode from './TutorialMode'
import ErrorBoundary from './components/ErrorBoundary'
import { colors } from './styles/designSystem'

/*
 * Only written when someone deliberately switches modes.
 *
 * The previous key ('appMode') was written on every mount, so it recorded the
 * default rather than a choice — every past visitor has 'explorer' stored
 * whether they wanted it or not. That value cannot be trusted, so it is ignored
 * and preferences start fresh here.
 */
const MODE_STORAGE_KEY = 'appModeChoice'

function AppWithModes() {
  // Everyone lands on the tutorial. Explorer is opt-in, and only sticks once
  // someone has actually asked for it.
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem(MODE_STORAGE_KEY) === 'explorer' ? 'explorer' : 'tutorial'
    } catch {
      return 'tutorial'
    }
  })

  const toggleMode = () => {
    setMode(prevMode => {
      const nextMode = prevMode === 'tutorial' ? 'explorer' : 'tutorial'
      try {
        localStorage.setItem(MODE_STORAGE_KEY, nextMode)
      } catch {
        // Remembering the choice is best-effort
      }
      return nextMode
    })
  }

  return (
    <ErrorBoundary>
      <div style={{
        minHeight: '100vh',
        backgroundColor: colors.background.primary,
        position: 'relative',
      }}>
        {/* Mode content with transition */}
        <div style={{
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out',
        }}>
          {mode === 'tutorial' ? (
            <TutorialMode onModeToggle={toggleMode} />
          ) : (
            <AlgorithmSelectorRefactored onModeToggle={toggleMode} currentMode={mode} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default AppWithModes