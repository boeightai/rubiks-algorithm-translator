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

import { useState, useEffect, useRef, useCallback } from 'react'
import { colors, typography, spacing, borderRadius, shadows } from '../styles/designSystem'
import { debounce } from '../utils/performance'
import TabNavigation from '../components/ui/TabNavigation'
import { useMobileDetection } from '../hooks/useMobileDetection'

const MobileTabLayout = ({ 
  header,
  algorithmsContent,
  visualSequenceContent,
  selectedAlgorithm,
  containerStyle = {}
}) => {
  const [activeTab, setActiveTab] = useState('algorithms')
  const autoSwitchTimeoutRef = useRef(null)
  const { isMobile, isTablet, isPortrait } = useMobileDetection()
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  
  // Update window width on resize with debouncing
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth)
    }, 150)
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Determine if we should use mobile layout
  // iPad portrait behaves like mobile; iPad landscape behaves like desktop
  const isIPadPortrait = isTablet && isPortrait
  const shouldUseMobileLayout = isMobile || isIPadPortrait || (isTablet && windowWidth <= 1024 && isPortrait)

  // Handle tab changes while preserving the current visual reference.
  const handleTabChange = useCallback((newTab) => {
    // Clear any existing auto-switch timeout
    if (autoSwitchTimeoutRef.current) {
      clearTimeout(autoSwitchTimeoutRef.current)
      autoSwitchTimeoutRef.current = null
    }

    setActiveTab(newTab)
  }, [])

  // Reset active tab to algorithms when switching from mobile to desktop
  useEffect(() => {
    if (!shouldUseMobileLayout && activeTab === 'visual') {
      setActiveTab('algorithms')
    }
  }, [shouldUseMobileLayout, activeTab])

  // Auto-switch to visual sequence tab when an algorithm is selected on mobile.
  useEffect(() => {
    if (shouldUseMobileLayout && selectedAlgorithm && activeTab === 'algorithms') {
      if (autoSwitchTimeoutRef.current) {
        clearTimeout(autoSwitchTimeoutRef.current)
        autoSwitchTimeoutRef.current = null
      }

      autoSwitchTimeoutRef.current = setTimeout(() => {
        setActiveTab('visual')
        autoSwitchTimeoutRef.current = null
      }, 450)
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (autoSwitchTimeoutRef.current) {
        clearTimeout(autoSwitchTimeoutRef.current)
        autoSwitchTimeoutRef.current = null
      }
    }
  }, [selectedAlgorithm, shouldUseMobileLayout, activeTab])

  // Prevent potential crashes by ensuring selectedAlgorithm is valid
  const safeSelectedAlgorithm = selectedAlgorithm && typeof selectedAlgorithm === 'object' ? selectedAlgorithm : null

  const tabs = [
    {
      id: 'algorithms',
      label: 'Move Library'
    },
    {
      id: 'visual',
      label: 'Picture Steps'
    }
  ]

  return (
    <div 
      className="mobile-container"
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: spacing[4],
        fontFamily: typography.fontFamily.primary,
        background: colors.background.secondary,
        minHeight: '100vh',
        ...containerStyle
      }}
    >
      {header}
      
      {/* Tab Navigation - only show on mobile/tablet */}
      {shouldUseMobileLayout && (
        <>
          <TabNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            tabs={tabs}
            selectedAlgorithm={safeSelectedAlgorithm}
          />
        </>
      )}

      {/* Mobile/Tablet Tab Content */}
      {shouldUseMobileLayout ? (
        <div 
          className="mobile-tab-content"
          style={{
            background: colors.background.primary,
            borderRadius: borderRadius['2xl'],
            boxShadow: shadows.lg,
            border: `1px solid ${colors.border.light}`,
            padding: spacing[6],
            minHeight: '600px',
            transition: 'all 0.3s ease',
          }}
        >
          {activeTab === 'algorithms' && (
            <div className="mobile-algorithms-tab">
              {algorithmsContent}
            </div>
          )}
          
          {activeTab === 'visual' && (
            <div className="mobile-visual-tab">
              {safeSelectedAlgorithm ? (
                visualSequenceContent
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '400px',
                  textAlign: 'center',
                  color: colors.neutral[500],
                }}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: spacing[4],
                  }}>
                    🎯
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.xl,
                    fontWeight: typography.fontWeight.semibold,
                    marginBottom: spacing[2],
                    color: colors.neutral[700],
                  }}>
                    No Move Selected
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.sm,
                    marginBottom: spacing[4],
                    color: colors.neutral[600],
                  }}>
                    Pick a move from the Move Library to see Bo and Hailey's picture steps.
                  </div>
                  <button
                    onClick={() => handleTabChange('algorithms')}
                    style={{
                      padding: `${spacing[3]} ${spacing[4]}`,
                      background: colors.primary[500],
                      color: colors.background.primary,
                      border: 'none',
                      borderRadius: borderRadius.lg,
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.medium,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      minWidth: '44px',
                      minHeight: '44px',
                    }}
                    onMouseEnter={(e) => e.target.style.background = colors.primary[600]}
                    onMouseLeave={(e) => e.target.style.background = colors.primary[500]}
                  >
                    Browse Moves
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Desktop Layout - fallback to original grid layout */
        <div 
          className="container-flex responsive-flex"
          style={{
            display: 'flex',
            gap: spacing[6],
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* Left Column */}
          <div 
            className="left-column"
            style={{
              flex: '1 1 400px',
              minWidth: '350px',
              maxWidth: '410px',
              background: colors.background.primary,
              borderRadius: borderRadius.xl,
              boxShadow: shadows.lg,
              border: `1px solid ${colors.border.light}`,
              padding: spacing[4],
              marginBottom: spacing[4],
              position: 'sticky',
              top: spacing[4],
              maxHeight: 'calc(100vh - 104px)',
              overflow: 'hidden',
            }}
          >
            {algorithmsContent}
          </div>

          {/* Right Column */}
          <div 
            className="right-column"
            style={{
              flex: '2 1 600px',
              minWidth: '400px',
              background: colors.background.primary,
              borderRadius: borderRadius.xl,
              boxShadow: shadows.lg,
              border: `1px solid ${colors.border.light}`,
              padding: spacing[4],
              marginBottom: spacing[4],
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'auto',
            }}
          >
            {visualSequenceContent}
          </div>
        </div>
      )}

      {/* Enhanced responsive styles */}
      <style>{`
        /* Mobile breakpoint */
        @media (max-width: 768px) {
          .mobile-container {
            padding: 16px !important;
            width: 95% !important;
          }
          
          .mobile-algorithms-tab,
          .mobile-visual-tab {
            padding: 0 !important;
          }
          
          /* Ensure algorithm list doesn't have height constraints on mobile */
          .mobile-algorithms-tab .responsive-algorithm-list {
            max-height: none !important;
            overflow-y: visible !important;
          }
          
          /* Tab transition animations */
          .mobile-tab-content {
            animation: fadeIn 0.3s ease-in-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0.8;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
        }
        
        /* Mobile phone breakpoint */
        @media (max-width: 480px) {
          .mobile-container {
            padding: 12px !important;
            width: 98% !important;
          }
        }
        
        /* Small mobile breakpoint */
        @media (max-width: 360px) {
          .mobile-container {
            padding: 8px !important;
            width: 100% !important;
          }
        }
        
        /* Desktop fallback styles */
        @media (min-width: 769px) {
          .container-flex {
            flex-direction: row !important;
            gap: 20px !important;
          }
          
          .left-column {
            position: sticky !important;
            max-width: 410px !important;
            max-height: calc(100vh - 104px) !important;
            flex: 1 1 400px !important;
            min-width: 350px !important;
          }
          
          .right-column {
            flex: 2 1 600px !important;
            min-width: 400px !important;
          }
        }
        
        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .left-column, .right-column {
            border-width: 0.5px !important;
          }
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .left-column, .right-column {
            transition: none !important;
          }
          
          .mobile-tab-content {
            animation: none !important;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .mobile-container button {
            min-width: 44px !important;
            min-height: 44px !important;
          }
          
          .mobile-container input,
          .mobile-container select {
            font-size: 16px !important;
          }
        }
        
        /* iPad specific - portrait mode */
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
          .mobile-container {
            padding: 20px !important;
            width: 94% !important;
          }
          
          .mobile-tab-content {
            padding: 24px !important;
            min-height: 700px !important;
          }
          
          .mobile-algorithms-tab,
          .mobile-visual-tab {
            padding: 0 !important;
          }
          
          /* Ensure visual sequence is visible on iPad */
          .mobile-visual-tab {
            min-height: 600px !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
        }
        
        /* iPad Pro specific */
        @media (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
          .mobile-container {
            padding: 24px !important;
            width: 92% !important;
            max-width: 1000px !important;
          }
          
          .mobile-tab-content {
            padding: 32px !important;
            min-height: 800px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default MobileTabLayout 
