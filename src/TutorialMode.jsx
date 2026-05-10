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
import { beginnerMethodSteps } from './data/beginnerMethod'
import moves from './data/moves.json'
import { canAnimateNotation } from './utils/cubeMoves'
import { colors, spacing, typography, borderRadius, shadows } from './styles/designSystem'

const InteractiveCubeDemo = lazy(() => import('./components/InteractiveCubeDemo'))

const daisyCases = [
  {
    id: 'top',
    label: 'White on top',
    look: 'The white edge already touches yellow.',
    actionTitle: 'Leave it',
    action: 'That petal is done. Find another white edge.',
    check: 'Keep yellow on top and save that petal.',
    notation: '',
  },
  {
    id: 'side',
    label: 'White on side',
    look: 'The white sticker points sideways.',
    actionTitle: 'Flip the edge',
    action: 'Use the three picture cards.',
    check: 'Look for one new white petal around yellow.',
    notation: "F U' R",
  },
  {
    id: 'bottom',
    label: 'White below',
    look: 'The white edge is hiding on the bottom.',
    actionTitle: 'Bring it up',
    action: 'Turn the bottom or front face until you can see the edge, then choose again.',
    check: 'Only work with one white edge at a time.',
    notation: '',
  },
  {
    id: 'unsure',
    label: 'Not sure',
    look: 'You see white, but the piece is confusing.',
    actionTitle: 'Find an edge',
    action: 'Edges have two stickers. Ignore white corners for the daisy.',
    check: 'Choose one white edge, then match it to a picture.',
    notation: '',
  },
]

const beginnerLessons = {
  foundations: {
    lookTitle: 'Find the centers',
    look: 'Centers do not move. Yellow is the top for this method.',
    actionTitle: 'Hold the cube',
    action: 'Yellow center on top. White center on bottom.',
    check: 'You can point to yellow, white, red, orange, blue, and green centers.',
    notation: '',
    target: 'centers',
    algorithms: [
      {
        id: 'right-trigger',
        name: 'Right Trigger',
        notation: "R U R' U'",
        useWhen: 'Use this right-hand rhythm in corners, middle layer, and many later steps.',
      },
      {
        id: 'left-trigger',
        name: 'Left Trigger',
        notation: "L' U' L U",
        useWhen: 'Use this left-hand mirror when the piece belongs on the left side.',
      },
    ],
  },
  daisy: {
    lookTitle: 'Choose one white edge',
    look: 'Make four white edge petals around the yellow center.',
    actionTitle: 'Match the case',
    action: 'Tap the picture that matches one white edge.',
    check: 'Repeat until yellow has four white petals.',
    notation: "F U' R",
    target: 'daisy',
    algorithms: [
      {
        id: 'daisy-edge-flipper',
        name: 'Daisy Edge Flipper',
        notation: "F U' R",
        useWhen: 'Use this when a white edge is near the top but the white sticker points sideways.',
      },
    ],
  },
  'white-cross': {
    lookTitle: 'Match a petal to a center',
    look: 'Turn the top until a daisy petal matches the side center color.',
    actionTitle: 'Turn it down',
    action: 'When the colors match, turn that face twice.',
    check: 'White edge is on bottom and its side color matches its center.',
    notation: 'F2',
    target: 'cross',
    algorithms: [
      {
        id: 'white-cross-turn-down',
        name: 'Turn Down',
        notation: 'F2',
        useWhen: 'Use this after the daisy petal matches the front center color.',
      },
    ],
  },
  'white-corners': {
    lookTitle: 'Find a white corner',
    look: 'A corner has three stickers. Match it with the two side centers.',
    actionTitle: 'Use the right trigger',
    action: 'Repeat the picture cards until the corner drops into place.',
    check: 'One white corner is solved with matching side colors.',
    notation: "R U R' U'",
    target: 'corner',
    algorithms: [
      {
        id: 'right-trigger',
        name: 'Right Trigger',
        notation: "R U R' U'",
        useWhen: 'Repeat this until the white corner drops into the bottom layer.',
      },
      {
        id: 'left-trigger',
        name: 'Left Trigger',
        notation: "L' U' L U",
        useWhen: 'Use the mirror case when the corner belongs on the left.',
      },
    ],
  },
  'middle-layer': {
    lookTitle: 'Find a top edge with no yellow',
    look: 'The edge belongs in the middle layer, not the yellow top.',
    actionTitle: 'Send it right',
    action: 'Use this picture sequence when the edge needs the right slot.',
    check: 'The middle edge sits between matching centers.',
    notation: "U R U' R' U' F' U F",
    target: 'middle',
    algorithms: [
      {
        id: 'second-layer-right',
        name: 'Second Layer Right',
        notation: "U R U' R' U' F' U F",
        useWhen: 'Use this when the top edge needs to move into the right middle slot.',
      },
      {
        id: 'second-layer-left',
        name: 'Second Layer Left',
        notation: "U' L' U L U F U' F'",
        useWhen: 'Use this when the top edge needs to move into the left middle slot.',
      },
    ],
  },
  'yellow-cross': {
    lookTitle: 'Look at the yellow top',
    look: 'Dot, line, or L shape all become the yellow cross.',
    actionTitle: 'Make the cross',
    action: 'Hold the yellow pattern, then copy the cards.',
    check: 'The top has a yellow cross.',
    notation: "F U R U' R' F'",
    target: 'yellow-cross',
    algorithms: [
      {
        id: 'kite-oll',
        name: 'Kite OLL',
        notation: "F U R U' R' F'",
        useWhen: 'Use this to turn the yellow top pattern into a yellow cross.',
      },
    ],
  },
  'yellow-face': {
    lookTitle: 'Find the yellow fish',
    look: 'Turn the top until the yellow pattern matches the lesson picture.',
    actionTitle: 'Use Sune',
    action: 'Copy the cards. You may need to repeat from a new angle.',
    check: 'The whole top face is yellow.',
    notation: "R U R' U R U2 R'",
    target: 'yellow-face',
    algorithms: [
      {
        id: 'sune',
        name: 'Sune',
        notation: "R U R' U R U2 R'",
        useWhen: 'Use this when the yellow top has a Sune-style fish pattern.',
      },
    ],
  },
  'last-layer-corners': {
    lookTitle: 'Place the top corners',
    look: 'Corners can be twisted later. First, put them in the correct homes.',
    actionTitle: 'Cycle corners',
    action: 'Use the corner picture cards, then recheck the homes.',
    check: 'Each top corner has the right three colors.',
    notation: "L' U R U' L U R'",
    target: 'last-corners',
    algorithms: [
      {
        id: 't-perm-setup',
        name: 'Corner Home Finder',
        notation: "L' U R U' L U R'",
        useWhen: 'Use this to move top corners toward their correct homes.',
      },
    ],
  },
  'last-layer-edges': {
    lookTitle: 'Place the final edges',
    look: 'Only the last top edges should be unsolved now.',
    actionTitle: 'Cycle edges',
    action: 'Use the edge cycle cards to finish the cube.',
    check: 'All six faces are solved.',
    notation: "R U' R F' R F R' F R F' R' F' R U R'",
    target: 'solved',
    algorithms: [
      {
        id: 'beginner-pll-edges',
        name: 'Beginner Edge Permutation',
        notation: "R U' R F' R F R' F R F' R' F' R U R'",
        useWhen: 'Use this to cycle the final top-layer edges.',
      },
    ],
  },
}

const getMoveTokens = (notation) => notation.split(/\s+/).filter(Boolean)

function MiniCube({ type }) {
  const targetClass = `mini-cube mini-cube-${type}`

  return (
    <div className={targetClass} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  )
}

function MoveCards({ notation, activeMoveIndex = null }) {
  const moveTokens = getMoveTokens(notation)

  if (moveTokens.length === 0) return null

  return (
    <div className="picture-card-row" aria-label="Picture move cards">
      {moveTokens.map((move, index) => (
        <div
          className={`picture-card ${activeMoveIndex === index ? 'picture-card-active' : ''}`}
          key={`${move}-${index}`}
        >
          <span>{index + 1}</span>
          {moves[move] ? (
            <img src={moves[move]} alt={move} draggable="false" />
          ) : (
            <div className="picture-card-fallback">{move}</div>
          )}
          <strong>{move}</strong>
        </div>
      ))}
    </div>
  )
}

function TutorialMode({ onModeToggle }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(
    Math.max(0, beginnerMethodSteps.findIndex((step) => step.id === 'daisy'))
  )
  const [selectedDaisyCaseId, setSelectedDaisyCaseId] = useState('side')
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState(null)
  const [activeMoveIndex, setActiveMoveIndex] = useState(null)

  const currentStep = beginnerMethodSteps[currentStepIndex] || beginnerMethodSteps[0]
  const selectedDaisyCase = useMemo(() => {
    return daisyCases.find((lessonCase) => lessonCase.id === selectedDaisyCaseId) || daisyCases[1]
  }, [selectedDaisyCaseId])

  const baseLesson = beginnerLessons[currentStep.id] || beginnerLessons.foundations
  const lesson = currentStep.id === 'daisy'
    ? {
        ...baseLesson,
        lookTitle: selectedDaisyCase.label,
        look: selectedDaisyCase.look,
        actionTitle: selectedDaisyCase.actionTitle,
        action: selectedDaisyCase.action,
        check: selectedDaisyCase.check,
        notation: selectedDaisyCase.notation,
      }
    : baseLesson
  const lessonAlgorithms = useMemo(() => lesson.algorithms || [], [lesson.algorithms])
  const activeAlgorithm = useMemo(() => {
    if (lessonAlgorithms.length === 0) return null
    return lessonAlgorithms.find((algorithm) => algorithm.id === selectedAlgorithmId) || lessonAlgorithms[0]
  }, [lessonAlgorithms, selectedAlgorithmId])
  const activeNotation = activeAlgorithm?.notation || lesson.notation
  const shouldShowDemo = activeAlgorithm && canAnimateNotation(activeNotation)
  const canGoPrevious = currentStepIndex > 0
  const canGoNext = currentStepIndex < beginnerMethodSteps.length - 1

  useEffect(() => {
    const nextLesson = beginnerLessons[currentStep.id] || beginnerLessons.foundations
    setSelectedAlgorithmId(nextLesson.algorithms?.[0]?.id || null)
    setActiveMoveIndex(null)
  }, [currentStep.id])

  useEffect(() => {
    setActiveMoveIndex(null)
  }, [activeAlgorithm?.id])

  const goToStep = (index) => {
    setCurrentStepIndex(Math.max(0, Math.min(index, beginnerMethodSteps.length - 1)))
  }

  const renderCubeLoadingState = () => (
    <div className="cube-demo-loading">Loading 3D cube...</div>
  )

  return (
    <div className="minimal-tutorial-page">
      <div className="minimal-tutorial-container">
        <Header
          title="Bo and Hailey's Beginner Method"
          subtitle="Learn one cube step at a time with picture moves."
          style={{ marginBottom: spacing[4], paddingBottom: spacing[4] }}
        />

        <main className="method-layout">
          <aside className="method-path" aria-label="Beginner method steps">
            <div className="path-heading">
              <span>Beginner method</span>
              <strong>{beginnerMethodSteps.length} picture lessons</strong>
            </div>
            <div className="path-list">
              {beginnerMethodSteps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  className={`path-step ${index === currentStepIndex ? 'path-step-active' : ''}`}
                  onClick={() => goToStep(index)}
                >
                  <span>{index + 1}</span>
                  <strong>{step.shortTitle}</strong>
                </button>
              ))}
            </div>
            <button type="button" className="library-link" onClick={onModeToggle}>
              Move Library
            </button>
          </aside>

          <section className="lesson-stage" aria-labelledby="lesson-title">
            <div className="lesson-header">
              <div>
                <span className="lesson-count">Step {currentStepIndex + 1}</span>
                <h2 id="lesson-title">{currentStep.title}</h2>
              </div>
              <p>{currentStep.summary}</p>
            </div>

            <div className="lesson-grid">
              <section className="lesson-panel look-panel" aria-labelledby="look-title">
                <span className="panel-label">Look</span>
                <h3 id="look-title">{lesson.lookTitle}</h3>
                <MiniCube type={lesson.target} />
                <p>{lesson.look}</p>

                {currentStep.id === 'daisy' && (
                  <div className="daisy-case-list" aria-label="Daisy cases">
                    {daisyCases.map((lessonCase) => (
                      <button
                        key={lessonCase.id}
                        type="button"
                        className={`daisy-case ${lessonCase.id === selectedDaisyCaseId ? 'daisy-case-active' : ''}`}
                        onClick={() => setSelectedDaisyCaseId(lessonCase.id)}
                      >
                        {lessonCase.label}
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <section className="lesson-panel turn-panel" aria-labelledby="turn-title">
                <span className="panel-label">Turn</span>
                <h3 id="turn-title">{lesson.actionTitle}</h3>
                <p>{lesson.action}</p>
                {lessonAlgorithms.length > 0 ? (
                  <>
                    <div className="algorithm-tabs" aria-label="Lesson algorithms">
                      {lessonAlgorithms.map((algorithm) => (
                        <button
                          key={algorithm.id}
                          type="button"
                          className={`algorithm-tab ${algorithm.id === activeAlgorithm?.id ? 'algorithm-tab-active' : ''}`}
                          onClick={() => setSelectedAlgorithmId(algorithm.id)}
                        >
                          {algorithm.name}
                        </button>
                      ))}
                    </div>

                    {activeAlgorithm && (
                      <div className="algorithm-card" aria-label={`${activeAlgorithm.name} visual notation`}>
                        <div className="algorithm-card-header">
                          <div>
                            <span>Visual notation</span>
                            <strong>{activeAlgorithm.name}</strong>
                          </div>
                          <code>{activeAlgorithm.notation}</code>
                        </div>
                        <p>{activeAlgorithm.useWhen}</p>
                        <MoveCards notation={activeAlgorithm.notation} activeMoveIndex={activeMoveIndex} />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="no-move-needed">No picture move yet.</div>
                )}
              </section>
            </div>

            {activeAlgorithm && (
              <section className="cube-demo-panel" aria-label={`${activeAlgorithm.name} 3D visualization`}>
                <div className="cube-demo-heading">
                  <span className="panel-label">3D visualization</span>
                  <strong>{activeAlgorithm.name}</strong>
                </div>
                {shouldShowDemo ? (
                  <Suspense fallback={renderCubeLoadingState()}>
                    <InteractiveCubeDemo
                      key={`${activeAlgorithm.id}-${activeAlgorithm.notation}`}
                      algorithmId={activeAlgorithm.id}
                      notation={activeNotation}
                      onActiveMoveChange={setActiveMoveIndex}
                    />
                  </Suspense>
                ) : (
                  <div className="cube-demo-loading">3D playback is not available for this notation yet.</div>
                )}
              </section>
            )}

            <section className="check-panel" aria-label="Check your cube">
              <div>
                <span className="panel-label">Check</span>
                <strong>{lesson.check}</strong>
              </div>
              <div className="lesson-nav">
                <button type="button" onClick={() => goToStep(currentStepIndex - 1)} disabled={!canGoPrevious}>
                  Previous
                </button>
                <button type="button" onClick={() => goToStep(currentStepIndex + 1)} disabled={!canGoNext}>
                  Next
                </button>
              </div>
            </section>
          </section>
        </main>
      </div>

      <style>{`
        .minimal-tutorial-page {
          min-height: 100vh;
          background: ${colors.background.secondary};
          color: ${colors.neutral[900]};
        }

        .minimal-tutorial-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 ${spacing[4]} ${spacing[10]};
        }

        .method-layout {
          display: grid;
          grid-template-columns: 260px minmax(0, 1fr);
          gap: ${spacing[5]};
          align-items: start;
        }

        .method-path,
        .lesson-stage,
        .lesson-panel,
        .cube-demo-panel,
        .check-panel {
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.primary};
          box-shadow: ${shadows.sm};
        }

        .method-path {
          position: sticky;
          top: ${spacing[4]};
          display: grid;
          gap: ${spacing[4]};
          padding: ${spacing[4]};
        }

        .path-heading,
        .lesson-header,
        .lesson-panel,
        .check-panel {
          min-width: 0;
        }

        .path-heading span,
        .lesson-count,
        .panel-label {
          display: block;
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.xs};
          font-weight: ${typography.fontWeight.extrabold};
          text-transform: uppercase;
        }

        .path-heading strong {
          display: block;
          margin-top: ${spacing[1]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.tight};
        }

        .path-list {
          display: grid;
          gap: ${spacing[2]};
        }

        .path-step,
        .library-link,
        .lesson-nav button,
        .daisy-case {
          min-height: 44px;
          border: 1px solid ${colors.border.medium};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.primary};
          color: ${colors.neutral[800]};
          font: inherit;
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
          cursor: pointer;
        }

        .path-step {
          display: grid;
          grid-template-columns: 32px minmax(0, 1fr);
          align-items: center;
          gap: ${spacing[2]};
          padding: ${spacing[2]};
          text-align: left;
        }

        .path-step span {
          display: inline-grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${colors.neutral[100]};
          color: ${colors.neutral[700]};
          font-size: ${typography.fontSize.xs};
        }

        .path-step-active {
          border-color: ${colors.primary[500]};
          background: ${colors.primary[50]};
          color: ${colors.primary[800]};
        }

        .path-step-active span {
          background: ${colors.primary[600]};
          color: ${colors.white};
        }

        .library-link {
          width: 100%;
        }

        .lesson-stage {
          display: grid;
          gap: ${spacing[5]};
          padding: ${spacing[5]};
        }

        .lesson-header {
          display: grid;
          grid-template-columns: minmax(0, 0.75fr) minmax(260px, 0.65fr);
          gap: ${spacing[4]};
          align-items: end;
          padding-bottom: ${spacing[4]};
          border-bottom: 1px solid ${colors.border.light};
        }

        .lesson-header h2 {
          margin: ${spacing[1]} 0 0;
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize['3xl']};
          line-height: ${typography.lineHeight.tight};
          letter-spacing: 0;
        }

        .lesson-header p,
        .lesson-panel p {
          margin: 0;
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.base};
          line-height: ${typography.lineHeight.normal};
        }

        .lesson-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: ${spacing[4]};
        }

        .lesson-panel {
          display: grid;
          align-content: start;
          gap: ${spacing[3]};
          padding: ${spacing[4]};
        }

        .lesson-panel h3 {
          margin: 0;
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize['2xl']};
          line-height: ${typography.lineHeight.tight};
          letter-spacing: 0;
        }

        .look-panel {
          border-top: 6px solid #facc15;
        }

        .turn-panel {
          border-top: 6px solid #2563eb;
        }

        .algorithm-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: ${spacing[2]};
        }

        .algorithm-tab {
          min-height: 40px;
          padding: 0 ${spacing[3]};
          border: 1px solid ${colors.border.medium};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.primary};
          color: ${colors.neutral[800]};
          font: inherit;
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
          cursor: pointer;
        }

        .algorithm-tab-active {
          border-color: ${colors.primary[500]};
          background: ${colors.primary[50]};
          color: ${colors.primary[800]};
        }

        .algorithm-card {
          display: grid;
          gap: ${spacing[3]};
          padding: ${spacing[3]};
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.secondary};
        }

        .algorithm-card-header {
          display: flex;
          align-items: start;
          justify-content: space-between;
          gap: ${spacing[3]};
        }

        .algorithm-card-header span {
          display: block;
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.xs};
          font-weight: ${typography.fontWeight.extrabold};
          text-transform: uppercase;
        }

        .algorithm-card-header strong {
          display: block;
          margin-top: ${spacing[1]};
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.tight};
        }

        .algorithm-card-header code {
          flex: 0 1 auto;
          max-width: 45%;
          color: ${colors.neutral[800]};
          font-family: ${typography.fontFamily.mono};
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
          line-height: ${typography.lineHeight.normal};
          text-align: right;
          overflow-wrap: anywhere;
        }

        .check-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: ${spacing[4]};
          padding: ${spacing[4]};
          border-top: 6px solid #16a34a;
        }

        .check-panel strong {
          display: block;
          margin-top: ${spacing[1]};
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.tight};
        }

        .lesson-nav {
          display: flex;
          gap: ${spacing[2]};
          flex: 0 0 auto;
        }

        .lesson-nav button {
          padding: 0 ${spacing[4]};
        }

        .lesson-nav button:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .mini-cube {
          display: grid;
          grid-template-columns: repeat(3, 42px);
          grid-template-rows: repeat(3, 42px);
          gap: 5px;
          width: max-content;
          padding: ${spacing[3]};
          border-radius: ${borderRadius.lg};
          background: #111827;
          box-shadow: ${shadows.md};
        }

        .mini-cube span {
          border: 2px solid rgba(255, 255, 255, 0.16);
          border-radius: ${borderRadius.md};
          background: #1f2937;
        }

        .mini-cube-daisy span:nth-child(2),
        .mini-cube-daisy span:nth-child(4),
        .mini-cube-daisy span:nth-child(6),
        .mini-cube-daisy span:nth-child(8),
        .mini-cube-cross span:nth-child(2),
        .mini-cube-cross span:nth-child(4),
        .mini-cube-cross span:nth-child(5),
        .mini-cube-cross span:nth-child(6),
        .mini-cube-cross span:nth-child(8),
        .mini-cube-solved span,
        .mini-cube-corner span:nth-child(7),
        .mini-cube-middle span:nth-child(4) {
          background: #f8fafc;
        }

        .mini-cube-daisy span:nth-child(5),
        .mini-cube-yellow-cross span:nth-child(2),
        .mini-cube-yellow-cross span:nth-child(4),
        .mini-cube-yellow-cross span:nth-child(5),
        .mini-cube-yellow-cross span:nth-child(6),
        .mini-cube-yellow-cross span:nth-child(8),
        .mini-cube-yellow-face span,
        .mini-cube-last-corners span:nth-child(1),
        .mini-cube-last-corners span:nth-child(3),
        .mini-cube-last-corners span:nth-child(7),
        .mini-cube-last-corners span:nth-child(9),
        .mini-cube-last-edges span:nth-child(2),
        .mini-cube-last-edges span:nth-child(4),
        .mini-cube-last-edges span:nth-child(6),
        .mini-cube-last-edges span:nth-child(8) {
          background: #facc15;
        }

        .mini-cube-centers span:nth-child(5) {
          background: #facc15;
        }

        .daisy-case-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: ${spacing[2]};
          margin-top: ${spacing[1]};
        }

        .daisy-case {
          padding: 0 ${spacing[2]};
          text-align: center;
        }

        .daisy-case-active {
          border-color: #f59e0b;
          background: ${colors.warning[50]};
          color: ${colors.warning[800]};
        }

        .picture-card-row {
          display: flex;
          flex-wrap: wrap;
          gap: ${spacing[3]};
          margin-top: ${spacing[1]};
        }

        .picture-card {
          display: grid;
          grid-template-rows: 24px 78px 20px;
          justify-items: center;
          align-items: center;
          width: 92px;
          padding: ${spacing[2]};
          border: 1px solid ${colors.border.medium};
          border-radius: ${borderRadius.lg};
          background: ${colors.background.secondary};
        }

        .picture-card-active {
          border-color: ${colors.primary[500]};
          box-shadow: ${shadows.md};
        }

        .picture-card span {
          display: inline-grid;
          place-items: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #dbeafe;
          color: #1d4ed8;
          font-size: ${typography.fontSize.xs};
          font-weight: ${typography.fontWeight.bold};
        }

        .picture-card img {
          width: 74px;
          height: 74px;
          object-fit: contain;
          border-radius: ${borderRadius.md};
          background: var(--move-image-bg);
          padding: var(--move-image-padding);
        }

        .picture-card strong,
        .picture-card-fallback {
          align-self: center;
          color: ${colors.neutral[900]};
          font-family: ${typography.fontFamily.mono};
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
        }

        .picture-card-fallback {
          display: grid;
          place-items: center;
          width: 74px;
          height: 74px;
          border: 1px solid ${colors.border.medium};
          border-radius: ${borderRadius.md};
          background: ${colors.background.primary};
        }

        .letter-code {
          width: fit-content;
          color: ${colors.neutral[500]};
          font-size: ${typography.fontSize.sm};
        }

        .letter-code summary {
          cursor: pointer;
          min-height: 32px;
        }

        .letter-code code {
          color: ${colors.neutral[800]};
          font-family: ${typography.fontFamily.mono};
          font-weight: ${typography.fontWeight.bold};
        }

        .cube-demo-panel {
          display: grid;
          gap: ${spacing[3]};
          padding: ${spacing[4]};
          overflow: hidden;
        }

        .cube-demo-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: ${spacing[3]};
          padding-bottom: ${spacing[2]};
          border-bottom: 1px solid ${colors.border.light};
        }

        .cube-demo-heading strong {
          color: ${colors.neutral[900]};
          font-size: ${typography.fontSize.lg};
          line-height: ${typography.lineHeight.tight};
        }

        .cube-demo-panel > div:not(.cube-demo-heading):not(.cube-demo-loading) {
          max-width: 720px;
          margin: 0 auto;
        }

        .cube-demo-loading {
          display: grid;
          place-items: center;
          min-height: 280px;
          color: ${colors.neutral[600]};
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
        }

        .no-move-needed {
          width: fit-content;
          padding: ${spacing[2]} ${spacing[3]};
          border: 1px solid ${colors.border.light};
          border-radius: ${borderRadius.lg};
          color: ${colors.neutral[600]};
          background: ${colors.background.secondary};
          font-size: ${typography.fontSize.sm};
          font-weight: ${typography.fontWeight.bold};
        }

        @media (max-width: 900px) {
          .method-layout,
          .lesson-header,
          .lesson-grid {
            grid-template-columns: 1fr;
          }

          .lesson-stage {
            order: 1;
          }

          .method-path {
            position: static;
            order: 2;
          }

          .path-list {
            display: flex;
            gap: ${spacing[2]};
            overflow-x: auto;
            padding-bottom: ${spacing[1]};
            scrollbar-width: thin;
          }

          .path-step {
            min-width: 150px;
          }
        }

        @media (max-width: 600px) {
          .minimal-tutorial-container {
            padding: 0 ${spacing[3]} ${spacing[8]};
          }

          .lesson-stage {
            padding: ${spacing[4]};
          }

          .daisy-case-list {
            grid-template-columns: 1fr;
          }

          .path-step {
            min-width: 136px;
          }

          .lesson-header h2 {
            font-size: ${typography.fontSize['2xl']};
          }

          .lesson-panel h3 {
            font-size: ${typography.fontSize.xl};
          }

          .check-panel {
            display: grid;
          }

          .lesson-nav {
            width: 100%;
          }

          .lesson-nav button {
            flex: 1;
          }

          .mini-cube {
            grid-template-columns: repeat(3, 36px);
            grid-template-rows: repeat(3, 36px);
          }

          .picture-card {
            width: 82px;
            grid-template-rows: 24px 68px 20px;
          }

          .picture-card img,
          .picture-card-fallback {
            width: 64px;
            height: 64px;
          }

          .algorithm-card-header {
            display: grid;
          }

          .algorithm-card-header code {
            max-width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </div>
  )
}

export default TutorialMode
