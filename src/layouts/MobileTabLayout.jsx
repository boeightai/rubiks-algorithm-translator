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

import { useState, useEffect, useRef } from 'react'
import { colors, typography, spacing, borderRadius, shadows } from '../styles/designSystem'
import TabNavigation from '../components/ui/TabNavigation'

const MobileTabLayout = ({ 
  header,
  algorithmsContent,
  visualSequenceContent,
  selectedAlgorithm,
  containerStyle = {}
}) => {
  const [activeTab, setActiveTab] = useState('algorithms')
  const [isMobile, setIsMobile] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const autoSwitchTimeoutRef = useRef(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-switch to visual sequence tab when an algorithm is selected on mobile
  // Only auto-switch if we're currently on the algorithms tab and haven't manually switched yet
  useEffect(() => {
    if (isMobile && selectedAlgorithm && activeTab === 'algorithms') {
      // Clear any existing timeout
      if (autoSwitchTimeoutRef.current) {
        clearTimeout(autoSwitchTimeoutRef.current)
      }
      
      // Show notification
      setShowNotification(true)
      
      // Add a small delay to allow the user to see the selection before switching
      autoSwitchTimeoutRef.current = setTimeout(() => {
        setActiveTab('visual')
        setShowNotification(false)
        autoSwitchTimeoutRef.current = null
      }, 1200) // Increased delay to give users more time to see the selection
      
      return () => {
        if (autoSwitchTimeoutRef.current) {
          clearTimeout(autoSwitchTimeoutRef.current)
          autoSwitchTimeoutRef.current = null
        }
      }
    }
  }, [selectedAlgorithm, isMobile, activeTab])

  const tabs = [
    {
      id: 'algorithms',
      label: 'Algorithms',
      icon: '📋'
    },
    {
      id: 'visual',
      label: 'Visual Sequence',
      icon: '🎯'
    }
  ]

  return (
    <div 
      className="mobile-container"
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: spacing[6],
        fontFamily: typography.fontFamily.primary,
        background: colors.background.secondary,
        minHeight: '100vh',
        ...containerStyle
      }}
    >
      {header}
      
      {/* Tab Navigation - only show on mobile */}
      {isMobile && (
        <>
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs}
            selectedAlgorithm={selectedAlgorithm}
          />
          
          {/* Notification when switching tabs */}
          {showNotification && (
            <div style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: colors.primary[500],
              color: colors.white,
              padding: `${spacing[3]} ${spacing[4]}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              zIndex: 1000,
              boxShadow: shadows.lg,
              animation: 'slideDown 0.3s ease-out',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[3],
            }}>
              <span>Switching to Visual Sequence...</span>
              <button
                onClick={() => {
                  setShowNotification(false)
                  // Clear the auto-switch timeout
                  if (autoSwitchTimeoutRef.current) {
                    clearTimeout(autoSwitchTimeoutRef.current)
                    autoSwitchTimeoutRef.current = null
                  }
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: colors.white,
                  borderRadius: borderRadius.sm,
                  padding: `${spacing[1]} ${spacing[2]}`,
                  fontSize: typography.fontSize.xs,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                ✕
              </button>
            </div>
          )}
        </>
      )}

      {/* Mobile Tab Content */}
      {isMobile ? (
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
              {selectedAlgorithm ? (
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
                    No Algorithm Selected
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.sm,
                    marginBottom: spacing[4],
                    color: colors.neutral[600],
                  }}>
                    Select an algorithm from the Algorithms tab to view its visual sequence
                  </div>
                  <button
                    onClick={() => setActiveTab('algorithms')}
                    style={{
                      padding: `${spacing[3]} ${spacing[4]}`,
                      background: colors.primary[500],
                      color: colors.white,
                      border: 'none',
                      borderRadius: borderRadius.lg,
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.medium,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.background = colors.primary[600]}
                    onMouseLeave={(e) => e.target.style.background = colors.primary[500]}
                  >
                    Browse Algorithms
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
              maxWidth: '450px',
              background: colors.background.primary,
              borderRadius: borderRadius['2xl'],
              boxShadow: shadows.lg,
              border: `1px solid ${colors.border.light}`,
              padding: spacing[6],
              marginBottom: spacing[6],
              position: 'sticky',
              top: spacing[6],
              maxHeight: 'calc(100vh - 120px)',
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
              borderRadius: borderRadius['2xl'],
              boxShadow: shadows.lg,
              border: `1px solid ${colors.border.light}`,
              padding: spacing[6],
              marginBottom: spacing[6],
              display: 'flex',
              flexDirection: 'column',
              minHeight: '600px',
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
            gap: 24px !important;
          }
          
          .left-column {
            position: sticky !important;
            max-width: 450px !important;
            max-height: calc(100vh - 120px) !important;
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
        }
      `}</style>
    </div>
  )
}

export default MobileTabLayout 