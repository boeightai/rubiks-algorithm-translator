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

import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import YouTubeEmbed from './components/YouTubeEmbed'
import AlgorithmCarousel from './components/AlgorithmCarousel'
import PatternDisplay from './components/PatternDisplay'
import { beginnerMethodSteps, daisyLesson, practiceHighlights } from './data/beginnerMethod'
import tutorialAlgorithms from './data/tutorialAlgorithms.json'
import moves from './data/moves.json'
import { canAnimateNotation } from './utils/cubeMoves'
import { getPatternImages } from './utils/patternMapping'
import { resolveAlgorithmByName } from './utils/algorithmLookup'
import { useMobileDetection } from './hooks/useMobileDetection'
import { colors, spacing, typography, borderRadius, shadows } from './styles/designSystem'

const InteractiveCubeDemo = lazy(() => import('./components/InteractiveCubeDemo'))

const caseCards = [
  {
    id: 'already-petal',
    label: 'On top',
    cue: 'White touches yellow.',
    title: 'That petal is done.',
    instruction: 'Leave it there. Find another white edge.',
    notation: '',
  },
  {
    id: 'side-flipped',
    label: 'On the side',
    cue: 'White points sideways.',
    title: 'Flip it into a petal.',
    instruction: 'Do these three picture moves, then check the white edge.',
    notation: "F U' R",
  },
  {
    id: 'bottom-edge',
    label: 'On bottom',
    cue: 'White is underneath.',
    title: 'Bring it up first.',
    instruction: 'Move that edge to the top area, then choose again.',
    notation: '',
  },
  {
    id: 'not-sure',
    label: 'Not sure',
    cue: 'I need help looking.',
    title: 'Find one white edge.',
    instruction: 'Edges have two stickers. Ignore corners for now.',
    notation: '',
  },
]

const getMoveTokens = (notation) => notation.split(/\s+/).filter(Boolean)
const DAISY_STEP_INDEX = Math.max(0, beginnerMethodSteps.findIndex((step) => step.id === 'daisy'))

function DaisyTarget() {
  return (
    <div className="simple-daisy-target" aria-label="Daisy target with white petals around yellow center">
      <span />
      <i />
      <span />
      <i />
      <b />
      <i />
      <span />
      <i />
      <span />
    </div>
  )
}

function TutorialMode({ onModeToggle }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(DAISY_STEP_INDEX)
  const [selectedCaseId, setSelectedCaseId] = useState('side-flipped')
  const [selectedPracticeId, setSelectedPracticeId] = useState('daisy-edge-flipper')
  const [activeDemoMoveIndex, setActiveDemoMoveIndex] = useState(null)
  const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = useState(0)
  const [tutorialActiveMoveIndex, setTutorialActiveMoveIndex] = useState(null)
  const [petalCheck, setPetalCheck] = useState(null)
  const { isMobile, isTablet } = useMobileDetection()

  const currentStep = beginnerMethodSteps[currentStepIndex] || beginnerMethodSteps[DAISY_STEP_INDEX]
  const isDaisyStep = currentStep.id === 'daisy'
  const currentTutorialAlgorithm = tutorialAlgorithms[currentAlgorithmIndex] || tutorialAlgorithms[0]
  const tutorialPatternImages = currentTutorialAlgorithm ? getPatternImages(currentTutorialAlgorithm.id) : null
  const hasMultipleTutorialPatterns = tutorialPatternImages && tutorialPatternImages.length > 1
  const resolvedTutorialAlgorithm = currentTutorialAlgorithm ? resolveAlgorithmByName(currentTutorialAlgorithm) : null
  const tutorialDemoNotation = resolvedTutorialAlgorithm?.notation || currentTutorialAlgorithm?.notation
  const shouldShowTutorialDemo = canAnimateNotation(tutorialDemoNotation)
  const shouldUseHorizontalTutorialLayout = !isMobile && !isTablet && tutorialPatternImages

  const selectedCase = useMemo(() => {
    return caseCards.find((lessonCase) => lessonCase.id === selectedCaseId) || caseCards[1]
  }, [selectedCaseId])

  const selectedPractice = useMemo(() => {
    return practiceHighlights.find((item) => item.id === selectedPracticeId) || practiceHighlights[0]
  }, [selectedPracticeId])

  const activeNotation = selectedCase.notation
  const showCubeDemo = canAnimateNotation(activeNotation)

  const goToStep = (nextIndex) => {
    const boundedIndex = Math.max(0, Math.min(nextIndex, beginnerMethodSteps.length - 1))
    setCurrentStepIndex(boundedIndex)
    setActiveDemoMoveIndex(null)
  }

  const goToTutorialAlgorithm = (targetIndex) => {
    if (targetIndex >= 0 && targetIndex < tutorialAlgorithms.length) {
      setCurrentAlgorithmIndex(targetIndex)
    }
  }

  const goToNextTutorialAlgorithm = () => {
    setCurrentAlgorithmIndex((previousIndex) =>
      previousIndex === tutorialAlgorithms.length - 1 ? 0 : previousIndex + 1
    )
  }

  const goToPreviousTutorialAlgorithm = () => {
    setCurrentAlgorithmIndex((previousIndex) =>
      previousIndex === 0 ? tutorialAlgorithms.length - 1 : previousIndex - 1
    )
  }

  useEffect(() => {
    setTutorialActiveMoveIndex(null)
  }, [currentAlgorithmIndex])

  const renderCubeLoadingState = () => (
    <div className="simple-cube-loading">Loading cube...</div>
  )

  const renderTutorialMedia = () => {
    if (!shouldShowTutorialDemo || !currentTutorialAlgorithm) {
      return <YouTubeEmbed />
    }

    return (
      <Suspense fallback={renderCubeLoadingState()}>
        <InteractiveCubeDemo
          algorithmId={currentTutorialAlgorithm.id}
          notation={tutorialDemoNotation}
          onActiveMoveChange={setTutorialActiveMoveIndex}
        />
      </Suspense>
    )
  }

  const renderVisualMoveStrip = (notation, activeIndex = null, compact = false) => (
    <div className={`simple-move-strip ${compact ? 'simple-move-strip-compact' : ''}`}>
      {getMoveTokens(notation).map((move, index) => (
        <div
          key={`${move}-${index}`}
          className={`simple-move-card ${activeIndex === index ? 'simple-move-card-active' : ''}`}
        >
          <span>{index + 1}</span>
          <img src={moves[move]} alt={move} draggable="false" />
          <strong>{move}</strong>
        </div>
      ))}
    </div>
  )

  return (
    <div className="simple-tutorial-page">
      <div className="simple-tutorial-container">
        <Header
          title="Bo and Hailey's Picture Moves"
          subtitle="A father-daughter picture-move system for our beginner method."
          style={{ marginBottom: spacing[3], paddingBottom: spacing[4] }}
        />

        <section className="method-hero" aria-labelledby="simple-hero-title">
          <div className="method-hero-copy">
            <div className="simple-kicker">Bo and Hailey's beginner method</div>
            <h2 id="simple-hero-title">
              {isDaisyStep ? 'Make a daisy without memorizing letters.' : currentStep.title}
            </h2>
            <p>
              {isDaisyStep
                ? 'Match your cube to a picture, copy the picture moves, then check the result.'
                : currentStep.summary}
            </p>
            <div className="method-why">
              <strong>Why picture moves?</strong>
              <span>Letters are hard at first. We teach the beginner method by showing what to look for and what to turn.</span>
            </div>
            <div className="method-actions">
              <div className="simple-family-note">
                <img src="/images/family-photo.png" alt="Bo and Hailey" />
                <span>Made by Bo and Hailey</span>
              </div>
              <button type="button" className="simple-library-button" onClick={onModeToggle}>
                Move Library
              </button>
            </div>
          </div>

          <div className="method-proof" aria-label="Picture move system preview">
            <div className="method-proof-card">
              <span>1 Look</span>
              <strong>{selectedCase.label}</strong>
              <p>{selectedCase.cue}</p>
            </div>
            <div className="method-proof-card method-proof-turn">
              <span>2 Turn</span>
              <strong>Copy the cards</strong>
              {renderVisualMoveStrip(daisyLesson.notation, null, true)}
            </div>
            <div className="method-proof-card method-proof-check">
              <span>3 Check</span>
              <strong>Did it make a petal?</strong>
              <DaisyTarget />
            </div>
          </div>
        </section>

        {isDaisyStep && (
          <section className="first-minute-flow" aria-label="First 60 seconds lesson plan">
            <div>
              <span>1</span>
              <strong>Hold yellow on top</strong>
            </div>
            <div>
              <span>2</span>
              <strong>Find one white edge</strong>
            </div>
            <div>
              <span>3</span>
              <strong>Tap the matching picture</strong>
            </div>
            <div>
              <span>4</span>
              <strong>Do the picture moves</strong>
            </div>
            <div>
              <span>5</span>
              <strong>Check for a petal</strong>
            </div>
          </section>
        )}

        <div className="simple-progress-summary" aria-label="Tutorial step navigation">
          <button
            type="button"
            className="simple-step-nav-button"
            onClick={() => goToStep(currentStepIndex - 1)}
            disabled={currentStepIndex === 0}
          >
            Previous
          </button>
          <div className="simple-step-current">
            <span>
              {isDaisyStep ? 'First full lesson' : currentStep.status === 'next' ? 'Coming next' : 'Step'} {currentStepIndex + 1} of {beginnerMethodSteps.length}
            </span>
            <strong>{currentStep.shortTitle}</strong>
          </div>
          <button
            type="button"
            className="simple-step-nav-button"
            onClick={() => goToStep(currentStepIndex + 1)}
            disabled={currentStepIndex === beginnerMethodSteps.length - 1}
          >
            Next
          </button>
        </div>

        {isDaisyStep ? (
          <main className="simple-lesson">
            <section className="simple-cube-panel" aria-label="3D cube demo">
            <div className="simple-hold-bar">
              <div>
                <span>Hold</span>
                <strong>Yellow center on top</strong>
              </div>
              <div>
                <span>Find</span>
                <strong>One white edge</strong>
              </div>
            </div>

            {selectedCase.notation && (
              <div className="simple-cube-move-preview">
                {renderVisualMoveStrip(selectedCase.notation, activeDemoMoveIndex, true)}
              </div>
            )}

            {showCubeDemo ? (
              <Suspense fallback={renderCubeLoadingState()}>
                <InteractiveCubeDemo
                  algorithmId={daisyLesson.algorithmId}
                  notation={activeNotation}
                  onActiveMoveChange={setActiveDemoMoveIndex}
                />
              </Suspense>
            ) : (
              <div className="simple-goal-picture">
                <DaisyTarget />
                <strong>Keep looking for white edge petals.</strong>
              </div>
            )}
            </section>

            <section className="simple-choice-panel" aria-labelledby="simple-choice-title">
            <div className="simple-kicker">What do you see?</div>
            <h3 id="simple-choice-title">Look at one white edge.</h3>

            <div className="simple-case-grid">
              {caseCards.map((lessonCase) => (
                <button
                  key={lessonCase.id}
                  type="button"
                  className={`simple-case-card ${lessonCase.id === selectedCase.id ? 'simple-case-card-active' : ''}`}
                  onClick={() => {
                    setSelectedCaseId(lessonCase.id)
                    setActiveDemoMoveIndex(null)
                    setPetalCheck(null)
                  }}
                >
                  <strong>{lessonCase.label}</strong>
                  <span>{lessonCase.cue}</span>
                </button>
              ))}
            </div>
            </section>

            <section className="simple-next-panel" aria-label="Next instruction">
            <div>
              <div className="simple-kicker">Next</div>
              <h3>{selectedCase.title}</h3>
              <p>{selectedCase.instruction}</p>
            </div>

            {selectedCase.notation ? (
              <div className="simple-notation-panel">
                <div className="simple-notation-header">
                  <span>Picture moves</span>
                  <strong>Daisy Edge Flipper</strong>
                </div>
                {renderVisualMoveStrip(selectedCase.notation, activeDemoMoveIndex)}
                <p className="simple-classic-line">
                  Letter code: <code>{selectedCase.notation}</code>
                </p>
                <div className="petal-check" aria-label="Check your cube result">
                  <strong>Did that make a white petal?</strong>
                  <div>
                    <button
                      type="button"
                      className={petalCheck === 'yes' ? 'petal-check-active' : ''}
                      onClick={() => setPetalCheck('yes')}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className={petalCheck === 'not-yet' ? 'petal-check-active' : ''}
                      onClick={() => setPetalCheck('not-yet')}
                    >
                      Not yet
                    </button>
                  </div>
                  {petalCheck === 'yes' && (
                    <p>Great. Leave that petal on top and find another white edge.</p>
                  )}
                  {petalCheck === 'not-yet' && (
                    <p>Turn the cube back to yellow on top, look at one white edge, and choose the picture that matches now.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="simple-target-panel">
                <div className="simple-notation-header">
                  <span>Goal picture</span>
                  <strong>White petals around yellow</strong>
                </div>
                <DaisyTarget />
              </div>
            )}
            </section>
          </main>
        ) : (
          <main className="simple-step-preview" aria-label={`${currentStep.title} preview`}>
            <div>
              <div className="simple-kicker">Step preview</div>
              <h3>{currentStep.title}</h3>
              <p>{currentStep.summary}</p>
            </div>
            <div className="simple-preview-note">
              <strong>Detailed lesson coming next.</strong>
              <span>
                Daisy is the first complete picture-move lesson. This step is part of our beginner method roadmap and will get the same visual treatment next.
              </span>
            </div>
          </main>
        )}

        {isDaisyStep && (
          <section className="simple-practice" aria-labelledby="simple-practice-title">
          <div>
            <div className="simple-kicker">Practice</div>
            <h3 id="simple-practice-title">Picture moves to remember.</h3>
          </div>

          <div className="simple-practice-tabs">
            {practiceHighlights.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`simple-practice-tab ${selectedPractice.id === item.id ? 'simple-practice-tab-active' : ''}`}
                onClick={() => setSelectedPracticeId(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="simple-practice-body">
            <div>
              <strong>{selectedPractice.memory}</strong>
              <span>{selectedPractice.useWhen}</span>
            </div>
            {renderVisualMoveStrip(selectedPractice.notation, null, true)}
          </div>
          </section>
        )}

        {currentTutorialAlgorithm && (
          <section className="tutorial-algorithm-section" aria-labelledby="tutorial-algorithm-title">
            <div className="tutorial-algorithm-heading">
              <div>
                <div className="simple-kicker">Tutorial carousel</div>
                <h3 id="tutorial-algorithm-title">Practice the picture moves.</h3>
              </div>
              <p>
                Use the original tutorial carousel to move through each algorithm, compare pattern pictures,
                and follow the visual sequence.
              </p>
            </div>

            <div className={shouldUseHorizontalTutorialLayout ? 'tutorial-media-row' : 'tutorial-media-stack'}>
              {shouldUseHorizontalTutorialLayout && hasMultipleTutorialPatterns ? (
                <>
                  <PatternDisplay algorithmId={currentTutorialAlgorithm.id} position="left" patternIndex={0} />
                  {renderTutorialMedia()}
                  <PatternDisplay algorithmId={currentTutorialAlgorithm.id} position="right" patternIndex={1} />
                </>
              ) : shouldUseHorizontalTutorialLayout ? (
                <>
                  <PatternDisplay algorithmId={currentTutorialAlgorithm.id} position="left" />
                  {renderTutorialMedia()}
                </>
              ) : (
                <>
                  {renderTutorialMedia()}
                  {tutorialPatternImages && (
                    hasMultipleTutorialPatterns ? (
                      <div className="tutorial-pattern-pair">
                        <PatternDisplay algorithmId={currentTutorialAlgorithm.id} position="left" patternIndex={0} />
                        <PatternDisplay algorithmId={currentTutorialAlgorithm.id} position="right" patternIndex={1} />
                      </div>
                    ) : (
                      <PatternDisplay algorithmId={currentTutorialAlgorithm.id} position="top" />
                    )
                  )}
                </>
              )}
            </div>

            <AlgorithmCarousel
              algorithms={tutorialAlgorithms}
              currentIndex={currentAlgorithmIndex}
              onNext={goToNextTutorialAlgorithm}
              onPrevious={goToPreviousTutorialAlgorithm}
              onGoToIndex={goToTutorialAlgorithm}
              activeMoveIndex={shouldShowTutorialDemo ? tutorialActiveMoveIndex : null}
            />
          </section>
        )}
      </div>

      <style>{`
        .simple-tutorial-page {
          min-height: 100vh;
          background: ${colors.background.primary};
          color: ${colors.neutral[900]};
          overflow-x: hidden;
        }

        .simple-tutorial-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 ${spacing[4]} ${spacing[10]};
        }

        .method-hero {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(420px, 1.08fr);
          gap: ${spacing[5]};
          align-items: stretch;
          padding: ${spacing[5]} 0;
          border-bottom: 1px solid ${colors.border.light};
        }

        .method-hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .simple-kicker {
          color: ${colors.primary[700]};
          font-size: ${typography.fontSize.xs};
          font-weight: ${typography.fontWeight.extrabold};
          text-transform: uppercase;
        }

        .method-hero h2 {
          margin: ${spacing[1]} 0;
          font-size: ${typography.fontSize['4xl']};
          line-height: ${typography.lineHeight.tight};
          letter-spacing: 0;
        }

        .method-hero p {
          margin: 0;
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.xl};
          line-height: ${typography.lineHeight.normal};
        }

        .method-why {
          display: grid;
          gap: ${spacing[1]};
          margin-top: ${spacing[4]};
          padding: ${spacing[3]};
          border-left: 4px solid ${colors.warning[400]};
          border-radius: ${borderRadius.md};
          background: ${colors.warning[50]};
        }

        .method-why strong {
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.base};
        }

        .method-why span {
          color: ${colors.neutral[700]};
          font-size: ${typography.fontSize.sm};
          line-height: ${typography.lineHeight.normal};
        }

        .method-actions {
          display: flex;
          align-items: center;
          gap: ${spacing[4]};
          flex-wrap: wrap;
          margin-top: ${spacing[4]};
        }

        .simple-family-note {
          display: flex;
          align-items: center;
          gap: ${spacing[2]};
          flex: 0 0 auto;
          color: ${colors.neutral[700]};
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
        }

        .simple-library-button {
          flex: 0 0 auto;
          align-self: center;
          height: 48px;
          min-height: 44px;
          padding: 0 ${spacing[4]};
          border: 1px solid ${colors.border.medium};
          border-radius: ${borderRadius.full};
          background: ${colors.background.secondary};
          color: ${colors.neutral[800]};
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
          cursor: pointer;
          box-shadow: ${shadows.sm};
        }

        .simple-family-note img {
          width: 52px;
          height: 52px;
          border-radius: ${borderRadius.md};
          object-fit: cover;
          border: 1px solid ${colors.border.light};
        }

        .method-proof {
          display: grid;
          grid-template-columns: minmax(120px, 0.8fr) minmax(190px, 1.25fr) minmax(140px, 0.95fr);
          gap: ${spacing[3]};
          padding: ${spacing[3]};
          border: 1px solid ${colors.primary[200]};
          border-radius: ${borderRadius.lg};
          background: ${colors.primary[50]};
          box-shadow: ${shadows.sm};
        }

        .method-proof-card {
          display: grid;
          align-content: start;
          gap: ${spacing[2]};
          min-width: 0;
          padding: ${spacing[3]};
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.primary};
        }

        .method-proof-card > span {
          color: ${colors.primary[700]};
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.extrabold};
          text-transform: uppercase;
        }

        .method-proof-card > strong {
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.tight};
        }

        .method-proof-card > p {
          margin: 0;
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.sm};
          line-height: ${typography.lineHeight.normal};
        }

        .method-proof-turn {
          grid-column: span 1;
        }

        .method-proof-turn .simple-move-strip {
          margin-top: ${spacing[1]};
        }

        .method-proof-turn .simple-move-strip-compact .simple-move-card {
          min-width: 54px;
          grid-template-rows: 18px 44px 18px;
        }

        .method-proof-turn .simple-move-strip-compact .simple-move-card img {
          width: 42px;
          height: 42px;
        }

        .method-proof-check {
          place-items: start center;
          text-align: center;
        }

        .method-proof-check .simple-daisy-target {
          grid-template-columns: repeat(3, 28px);
          grid-template-rows: repeat(3, 28px);
          gap: 4px;
          padding: ${spacing[2]};
          margin-top: ${spacing[1]};
        }

        .first-minute-flow {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: ${spacing[2]};
          margin: ${spacing[3]} 0;
        }

        .first-minute-flow div {
          display: flex;
          align-items: center;
          gap: ${spacing[2]};
          min-width: 0;
          padding: ${spacing[2]} ${spacing[3]};
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.full};
          background: ${colors.background.secondary};
        }

        .first-minute-flow span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex: 0 0 auto;
          border-radius: 50%;
          background: ${colors.primary[100]};
          color: ${colors.primary[700]};
          font-size: ${typography.fontSize.xs};
          font-weight: ${typography.fontWeight.extrabold};
        }

        .first-minute-flow strong {
          min-width: 0;
          color: ${colors.neutral[800]};
          font-size: ${typography.fontSize.sm};
          line-height: ${typography.lineHeight.tight};
        }

        .simple-progress-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: ${spacing[3]};
          margin: ${spacing[3]} 0 ${spacing[4]};
          padding: ${spacing[3]};
          border: 1px solid ${colors.primary[200]};
          border-radius: ${borderRadius.lg};
          background: ${colors.primary[50]};
        }

        .simple-step-current {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: ${spacing[1]};
          text-align: center;
        }

        .simple-step-current span {
          color: ${colors.primary[700]};
          font-size: ${typography.fontSize.xs};
          font-weight: ${typography.fontWeight.extrabold};
          text-transform: uppercase;
        }

        .simple-step-current strong {
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.lg};
        }

        .simple-step-nav-button {
          min-height: 40px;
          padding: 0 ${spacing[4]};
          border: 1px solid ${colors.primary[300]};
          border-radius: ${borderRadius.full};
          background: ${colors.background.primary};
          color: ${colors.primary[800]};
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
          cursor: pointer;
        }

        .simple-step-nav-button:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .simple-lesson {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
          gap: ${spacing[4]};
          align-items: start;
        }

        .simple-cube-panel,
        .simple-choice-panel,
        .simple-next-panel,
        .simple-practice,
        .simple-step-preview {
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.secondary};
          box-shadow: ${shadows.sm};
        }

        .simple-cube-panel {
          grid-row: span 2;
          padding: ${spacing[4]};
        }

        .simple-cube-panel > div:not(.simple-hold-bar) {
          max-width: 700px !important;
        }

        .simple-cube-panel,
        .simple-choice-panel,
        .simple-next-panel,
        .simple-practice {
          min-width: 0;
        }

        .simple-hold-bar {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: ${spacing[3]};
          margin-bottom: ${spacing[3]};
        }

        .simple-hold-bar div {
          padding: ${spacing[3]};
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.md};
          background: ${colors.background.primary};
        }

        .simple-hold-bar span,
        .simple-notation-header span {
          display: block;
          color: ${colors.primary[700]};
          font-size: ${typography.fontSize.xs};
          font-weight: ${typography.fontWeight.extrabold};
          text-transform: uppercase;
        }

        .simple-hold-bar strong,
        .simple-notation-header strong {
          display: block;
          margin-top: ${spacing[1]};
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.tight};
        }

        .simple-cube-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 320px;
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.primary};
          color: ${colors.neutral[600]};
          font-weight: ${typography.fontWeight.bold};
        }

        .simple-goal-picture {
          display: grid;
          gap: ${spacing[3]};
          place-items: center;
          min-height: 320px;
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.primary};
          padding: ${spacing[4]};
          text-align: center;
        }

        .simple-goal-picture strong {
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.tight};
        }

        .simple-goal-picture .pattern-display {
          margin: 0;
        }

        .simple-daisy-target {
          display: grid;
          grid-template-columns: repeat(3, 48px);
          grid-template-rows: repeat(3, 48px);
          gap: 6px;
          padding: ${spacing[4]};
          border-radius: ${borderRadius.lg};
          background: #111827;
          box-shadow: ${shadows.md};
        }

        .simple-daisy-target span,
        .simple-daisy-target i,
        .simple-daisy-target b {
          border-radius: ${borderRadius.md};
          border: 2px solid rgba(255, 255, 255, 0.16);
          display: block;
        }

        .simple-daisy-target span {
          background: #1f2937;
        }

        .simple-daisy-target i {
          background: #f8fafc;
        }

        .simple-daisy-target b {
          background: #facc15;
        }

        .simple-choice-panel,
        .simple-next-panel,
        .simple-practice {
          padding: ${spacing[4]};
        }

        .simple-step-preview {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 0.42fr);
          gap: ${spacing[4]};
          align-items: center;
          padding: ${spacing[6]};
        }

        .simple-step-preview h3 {
          margin: ${spacing[1]} 0 ${spacing[2]};
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize['3xl']};
          line-height: ${typography.lineHeight.tight};
          letter-spacing: 0;
        }

        .simple-step-preview p,
        .simple-preview-note span {
          margin: 0;
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.normal};
        }

        .simple-preview-note {
          display: grid;
          gap: ${spacing[2]};
          padding: ${spacing[4]};
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.primary};
        }

        .simple-preview-note strong {
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.lg};
        }

        .simple-choice-panel h3,
        .simple-next-panel h3,
        .simple-practice h3 {
          margin: ${spacing[1]} 0 ${spacing[3]};
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize['2xl']};
          line-height: ${typography.lineHeight.tight};
          letter-spacing: 0;
        }

        .simple-case-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: ${spacing[3]};
        }

        .simple-case-card {
          min-height: 88px;
          padding: ${spacing[3]};
          border: 2px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.primary};
          text-align: left;
          cursor: pointer;
        }

        .simple-case-card strong,
        .simple-case-card span {
          display: block;
        }

        .simple-case-card strong {
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.tight};
        }

        .simple-case-card span {
          margin-top: ${spacing[1]};
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.sm};
          line-height: ${typography.lineHeight.normal};
        }

        .simple-case-card-active {
          border-color: ${colors.primary[500]};
          background: ${colors.primary[50]};
        }

        .simple-next-panel {
          display: grid;
          gap: ${spacing[4]};
        }

        .simple-next-panel p {
          margin: 0;
          color: ${colors.neutral[700]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.normal};
        }

        .simple-notation-panel,
        .simple-target-panel {
          min-width: 0;
          padding-top: ${spacing[3]};
          border-top: 1px solid ${colors.border.light};
        }

        .simple-move-strip {
          display: flex;
          flex-wrap: wrap;
          gap: ${spacing[3]};
          margin-top: ${spacing[3]};
          min-width: 0;
        }

        .simple-cube-move-preview {
          display: none;
        }

        .simple-move-card {
          display: grid;
          grid-template-rows: 24px 76px 24px;
          justify-items: center;
          align-items: center;
          min-width: 88px;
          padding: ${spacing[2]};
          border: 2px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.primary};
          transition: transform 160ms ease, border-color 160ms ease;
        }

        .simple-move-card-active {
          transform: translateY(-3px);
          border-color: ${colors.primary[500]};
          box-shadow: ${shadows.md};
        }

        .simple-move-card span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${colors.primary[100]};
          color: ${colors.primary[700]};
          font-size: ${typography.fontSize.xs};
          font-weight: ${typography.fontWeight.bold};
        }

        .simple-move-card img {
          width: 72px;
          height: 72px;
          object-fit: contain;
          border-radius: ${borderRadius.md};
          background: var(--move-image-bg);
          padding: var(--move-image-padding);
        }

        .simple-move-card strong {
          color: ${colors.neutral[900]};
          font-family: ${typography.fontFamily.mono};
          font-size: ${typography.fontSize.base};
        }

        .simple-classic-line {
          margin-top: ${spacing[3]} !important;
          color: ${colors.neutral[500]} !important;
          font-size: ${typography.fontSize.sm} !important;
        }

        .simple-classic-line code {
          color: ${colors.neutral[800]};
          font-family: ${typography.fontFamily.mono};
          font-weight: ${typography.fontWeight.bold};
        }

        .petal-check {
          display: grid;
          gap: ${spacing[2]};
          margin-top: ${spacing[4]};
          padding: ${spacing[3]};
          border: 1px solid ${colors.primary[200]};
          border-radius: ${borderRadius.lg};
          background: ${colors.primary[50]};
        }

        .petal-check > strong {
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.base};
        }

        .petal-check > div {
          display: flex;
          flex-wrap: wrap;
          gap: ${spacing[2]};
        }

        .petal-check button {
          min-height: 40px;
          padding: 0 ${spacing[4]};
          border: 1px solid ${colors.primary[300]};
          border-radius: ${borderRadius.full};
          background: ${colors.background.primary};
          color: ${colors.primary[800]};
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
          cursor: pointer;
        }

        .petal-check button.petal-check-active {
          background: ${colors.primary[600]};
          border-color: ${colors.primary[600]};
          color: ${colors.background.primary};
        }

        .petal-check p {
          margin: 0;
          color: ${colors.neutral[700]};
          font-size: ${typography.fontSize.sm};
          line-height: ${typography.lineHeight.normal};
        }

        .simple-target-panel .pattern-display {
          margin: ${spacing[3]} auto 0;
        }

        .simple-practice {
          margin-top: ${spacing[4]};
        }

        .simple-practice {
          display: grid;
          grid-template-columns: minmax(180px, 0.35fr) minmax(0, 0.65fr);
          gap: ${spacing[4]};
          align-items: start;
        }

        .simple-practice-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: ${spacing[2]};
          grid-column: 1 / -1;
        }

        .simple-practice-tab {
          min-height: 40px;
          padding: 0 ${spacing[3]};
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.full};
          background: ${colors.background.primary};
          color: ${colors.neutral[700]};
          font-weight: ${typography.fontWeight.bold};
          cursor: pointer;
        }

        .simple-practice-tab-active {
          border-color: ${colors.primary[500]};
          background: ${colors.primary[50]};
          color: ${colors.primary[800]};
        }

        .simple-practice-body {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: minmax(180px, 0.35fr) minmax(0, 0.65fr);
          gap: ${spacing[4]};
          align-items: center;
        }

        .simple-practice-body > div {
          display: grid;
          gap: ${spacing[2]};
        }

        .simple-practice-body > div > strong {
          color: ${colors.warning[700]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.normal};
        }

        .simple-practice-body > div > span {
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.sm};
          line-height: ${typography.lineHeight.normal};
        }

        .simple-move-strip-compact {
          margin-top: 0;
          gap: ${spacing[2]};
        }

        .simple-move-strip-compact .simple-move-card {
          grid-template-rows: 20px 54px 20px;
          min-width: 64px;
          padding: ${spacing[1]};
        }

        .simple-move-strip-compact .simple-move-card img {
          width: 52px;
          height: 52px;
        }

        .simple-move-strip-compact .simple-move-card strong {
          font-size: ${typography.fontSize.sm};
        }

        .tutorial-algorithm-section {
          display: grid;
          gap: ${spacing[4]};
          margin-top: ${spacing[5]};
          padding: ${spacing[4]};
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.xl};
          background: ${colors.background.secondary};
          box-shadow: ${shadows.sm};
        }

        .tutorial-algorithm-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: ${spacing[4]};
          border-bottom: 1px solid ${colors.border.light};
          padding-bottom: ${spacing[3]};
        }

        .tutorial-algorithm-heading h3 {
          margin: ${spacing[1]} 0 0;
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize['2xl']};
          line-height: ${typography.lineHeight.tight};
        }

        .tutorial-algorithm-heading p {
          max-width: 460px;
          margin: 0;
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.sm};
          line-height: ${typography.lineHeight.normal};
        }

        .tutorial-media-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${spacing[4]};
        }

        .tutorial-media-row > * {
          flex: 1 1 0;
        }

        .tutorial-media-row > *:nth-child(2) {
          flex: 2 1 0;
        }

        .tutorial-media-stack {
          display: grid;
          gap: ${spacing[4]};
          justify-items: center;
        }

        .tutorial-pattern-pair {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: ${spacing[4]};
          width: 100%;
        }

        @media (max-width: 900px) {
          .method-hero,
          .simple-practice-body {
            align-items: stretch;
          }

          .method-hero,
          .simple-lesson,
          .simple-practice,
          .simple-practice-body,
          .simple-step-preview,
          .tutorial-algorithm-heading {
            grid-template-columns: 1fr;
          }

          .tutorial-algorithm-heading {
            display: grid;
            align-items: start;
          }

          .first-minute-flow {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .simple-cube-panel {
            grid-row: auto;
          }

          .simple-cube-move-preview {
            display: block;
            margin-top: ${spacing[3]};
          }
        }

        @media (max-width: 640px) {
          .simple-tutorial-container {
            padding: 0 ${spacing[3]} ${spacing[8]};
            overflow-x: clip;
          }

          .method-hero {
            padding-top: ${spacing[3]};
          }

          .method-hero-copy,
          .method-why {
            max-width: 340px;
          }

          .method-hero h2 {
            font-size: ${typography.fontSize['2xl']};
            overflow-wrap: anywhere;
          }

          .method-hero p {
            font-size: ${typography.fontSize.base};
            overflow-wrap: anywhere;
          }

          .method-why span,
          .method-why strong {
            overflow-wrap: anywhere;
          }

          .method-proof,
          .first-minute-flow,
          .tutorial-pattern-pair {
            grid-template-columns: 1fr;
          }

          .method-proof-card {
            padding: ${spacing[3]};
          }

          .simple-library-button {
            align-self: flex-start;
            height: 44px;
          }

          .simple-progress-summary {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: ${spacing[2]};
            padding: ${spacing[2]};
          }

          .simple-step-current {
            grid-column: 1 / -1;
            grid-row: 1;
            min-width: 0;
          }

          .simple-step-nav-button:first-child {
            grid-column: 1;
            grid-row: 2;
            justify-self: start;
          }

          .simple-step-nav-button:last-child {
            grid-column: 2;
            grid-row: 2;
            justify-self: end;
          }

          .simple-step-current span,
          .simple-step-current strong {
            overflow-wrap: anywhere;
          }

          .simple-step-nav-button {
            min-width: 76px;
            padding: 0 ${spacing[2]};
          }

          .simple-cube-panel,
          .simple-choice-panel,
          .simple-next-panel,
          .simple-practice,
          .simple-step-preview,
          .tutorial-algorithm-section {
            padding: ${spacing[3]};
          }

          .tutorial-algorithm-heading h3 {
            font-size: ${typography.fontSize.xl};
            overflow-wrap: anywhere;
          }

          .simple-hold-bar,
          .simple-case-grid {
            grid-template-columns: 1fr;
          }

          .simple-case-card {
            min-height: 72px;
          }

          .simple-move-card {
            grid-template-rows: 22px 60px 22px;
            min-width: 70px;
          }

          .simple-move-card img {
            width: 58px;
            height: 58px;
          }
        }
      `}</style>
    </div>
  )
}

export default TutorialMode
