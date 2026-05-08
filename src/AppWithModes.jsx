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
import AlgorithmSelectorRefactored from './AlgorithmSelectorRefactored'
import TutorialMode from './TutorialMode'
import ErrorBoundary from './components/ErrorBoundary'
import { colors } from './styles/designSystem'

function AppWithModes() {
  // Initialize mode from URL, localStorage, or default to the beginner method.
  const [mode, setMode] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedMode = params.get('mode')
    if (requestedMode === 'tutorial' || requestedMode === 'explorer') {
      return requestedMode
    }

    const savedMode = localStorage.getItem('appMode')
    if (savedMode === 'tutorial' || savedMode === 'explorer') {
      return savedMode
    }

    return 'tutorial'
  })

  // Save mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('appMode', mode)

    const url = new URL(window.location.href)
    url.searchParams.set('mode', mode)
    window.history.replaceState({}, '', url)
  }, [mode])

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'tutorial' ? 'explorer' : 'tutorial')
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
