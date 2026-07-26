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

import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import StepPage from './components/tutorial/StepPage'
import InterludePage from './components/tutorial/InterludePage'
import StepNav from './components/tutorial/StepNav'
import tutorialSteps from './data/tutorialSteps.json'
import { colors, spacing, typography } from './styles/designSystem'
import { useMobileDetection } from './hooks/useMobileDetection'

const STORAGE_KEY = 'tutorialStepIndex'

/*
 * Tutorial mode is an onboarding wizard: one solve step per screen, with
 * everything needed to finish that step contained on the page. The learner has
 * a cube in their hands, so nothing here should require navigating away.
 */
function TutorialMode({ onModeToggle }) {
  const { isMobile, isTablet } = useMobileDetection()
  const useCompactLayout = isMobile || isTablet

  // Resume where the learner left off — a step can take days
  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const saved = parseInt(localStorage.getItem(STORAGE_KEY), 10)
      if (Number.isInteger(saved) && saved >= 0 && saved < tutorialSteps.length) {
        return saved
      }
    } catch {
      // localStorage unavailable — start at the beginning
    }
    return 0
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(currentIndex))
    } catch {
      // Persisting progress is best-effort
    }
  }, [currentIndex])

  // A new step means new content above the fold
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentIndex])

  const goToIndex = useCallback((index) => {
    if (index >= 0 && index < tutorialSteps.length) {
      setCurrentIndex(index)
    }
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, tutorialSteps.length - 1))
  }, [])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const currentStep = tutorialSteps[currentIndex]

  if (!currentStep) {
    return (
      <div style={{
        backgroundColor: colors.background.primary,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.neutral[600],
        fontSize: typography.fontSize.sm,
      }}>
        No tutorial steps available
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: colors.background.primary,
      minHeight: '100vh',
      paddingBottom: spacing[10],
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `${spacing[4]} ${spacing[4]} 0`,
      }}>
        <Header
          title="A Visual Way to Solve Rubik's Cubes"
          subtitle="Step-by-step tutorial using Bo and Hailey's Visual Notation System"
          onModeToggle={onModeToggle}
          currentMode="tutorial"
        />
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `${useCompactLayout ? spacing[5] : spacing[6]} ${spacing[4]} 0`,
      }}>
        {currentStep.type === 'interlude' ? (
          <InterludePage step={currentStep} isMobile={useCompactLayout} />
        ) : (
          <StepPage step={currentStep} isMobile={useCompactLayout} />
        )}

        <StepNav
          steps={tutorialSteps}
          currentIndex={currentIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onGoToIndex={goToIndex}
          isMobile={useCompactLayout}
        />
      </div>
    </div>
  )
}

export default TutorialMode
