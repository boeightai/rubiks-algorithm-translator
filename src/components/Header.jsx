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

import { colors, typography, spacing, shadows } from '../styles/designSystem'
import StarIcon from './ui/StarIcon'
import AboutModal from './AboutModal'
import { useState, useEffect } from 'react'

const Header = ({ 
  title = "Bo and Hailey's Visual Notation System",
  subtitle = "An Alternate Visual Notation System for Solving Rubik's Cubes",
  style = {},
  onModeToggle,
  currentMode
}) => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    // Default to light mode unless user has explicitly chosen dark mode
    const initialTheme = savedTheme || 'light'
    
    setIsDarkMode(initialTheme === 'dark')
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <div 
      className="responsive-header"
      style={{
        marginBottom: spacing[8],
        padding: `${spacing[6]} 0`,
        borderBottom: `1px solid ${colors.border.light}`,
        textAlign: 'left',
        ...style
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: spacing[2],
      }}>
        {/* Left side - Title and subtitle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[3],
          flex: '1 1 auto',
        }}>
          <div style={{ width: '100%' }}>
            <h1 style={{ 
              color: colors.neutral[900], 
              fontSize: typography.fontSize['3xl'], 
              margin: 0, 
              fontWeight: typography.fontWeight.bold, 
              letterSpacing: '-0.025em',
              lineHeight: typography.lineHeight.tight,
            }}>
              <span>{title}</span>
              {/* Mobile buttons container - only visible on mobile portrait */}
              <div className="mobile-buttons-container" style={{
                display: 'none', // Hidden by default, shown via CSS media query
                alignItems: 'center',
                gap: spacing[2],
                flexShrink: 0,
              }}>
                {/* Mobile Theme Toggle Button */}
                <button
                  className="mobile-theme-toggle"
                  onClick={toggleTheme}
                  style={{
                    padding: `${spacing[2]} ${spacing[2]}`,
                    border: `1px solid ${colors.border.medium}`,
                    borderRadius: '8px',
                    background: colors.neutral[100],
                    color: colors.neutral[700],
                    fontWeight: typography.fontWeight.medium,
                    fontSize: typography.fontSize.sm,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    boxShadow: shadows.sm,
                    minHeight: '36px',
                    minWidth: '36px',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = shadows.sm
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = colors.neutral[50]
                    e.target.style.borderColor = colors.border.dark
                    e.target.style.transform = 'translateY(-1px)'
                    e.target.style.boxShadow = shadows.md
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.neutral[100]
                    e.target.style.borderColor = colors.border.medium
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = shadows.sm
                  }}
                  onTouchStart={(e) => {
                    e.target.style.transform = 'scale(0.98)'
                    e.target.style.background = colors.neutral[100]
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.background = colors.neutral[100]
                  }}
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? (
                    // Sun icon for light mode
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="5"/>
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                    </svg>
                  ) : (
                    // Moon icon for dark mode
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                      aria-hidden="true"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                  )}
                </button>

                {/* Mobile About button */}
                <button
                  className="mobile-about-button"
                  onClick={() => setIsAboutModalOpen(true)}
                  style={{
                    padding: `${spacing[2]} ${spacing[3]}`,
                    border: `1px solid ${colors.border.medium}`,
                    borderRadius: '8px',
                    background: colors.neutral[100],
                    color: colors.neutral[700],
                    fontWeight: typography.fontWeight.medium,
                    fontSize: typography.fontSize.sm,
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: spacing[2],
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    boxShadow: shadows.sm,
                    minHeight: '36px',
                    minWidth: '36px',
                    whiteSpace: 'nowrap',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = shadows.sm
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = colors.neutral[50]
                    e.target.style.borderColor = colors.border.dark
                    e.target.style.transform = 'translateY(-1px)'
                    e.target.style.boxShadow = shadows.md
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.neutral[100]
                    e.target.style.borderColor = colors.border.medium
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = shadows.sm
                  }}
                  onTouchStart={(e) => {
                    e.target.style.transform = 'scale(0.98)'
                    e.target.style.background = colors.neutral[100]
                  }}
                  onTouchEnd={(e) => {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.background = colors.neutral[100]
                  }}
                  aria-label="Learn more about this project"
                  title="About this project"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <span>About</span>
                </button>
              </div>
            </h1>
            <p style={{ 
              color: colors.neutral[600], 
              margin: `${spacing[2]} 0 0 0`, 
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.normal,
              lineHeight: typography.lineHeight.normal,
            }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right side - Theme toggle and About button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          marginLeft: spacing[4],
          flexShrink: 0,
        }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              padding: `${spacing[2]} ${spacing[2]}`,
              border: `1px solid ${colors.border.medium}`,
              borderRadius: '8px',
              background: colors.neutral[100],
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.medium,
              fontSize: typography.fontSize.sm,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              boxShadow: shadows.sm,
              minHeight: '36px',
              minWidth: '36px',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = shadows.sm
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.neutral[50]
              e.target.style.borderColor = colors.border.dark
              e.target.style.transform = 'translateY(-1px)'
              e.target.style.boxShadow = shadows.md
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.neutral[100]
              e.target.style.borderColor = colors.border.medium
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = shadows.sm
            }}
            onTouchStart={(e) => {
              e.target.style.transform = 'scale(0.98)'
              e.target.style.background = colors.neutral[100]
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.background = colors.neutral[100]
            }}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              // Sun icon for light mode
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Mode Toggle Button - only show when props are provided */}
          {onModeToggle && currentMode && (
            <button
              onClick={onModeToggle}
              style={{
                padding: `${spacing[2]} ${spacing[3]}`,
                border: `1px solid ${colors.border.medium}`,
                borderRadius: '8px',
                background: colors.primary[500],
                color: colors.white,
                fontWeight: typography.fontWeight.medium,
                fontSize: typography.fontSize.sm,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing[2],
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                boxShadow: shadows.sm,
                minHeight: '36px',
                minWidth: '36px',
                whiteSpace: 'nowrap',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                WebkitUserSelect: 'none',
                userSelect: 'none',
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = shadows.sm
              }}
              onMouseEnter={(e) => {
                e.target.style.background = colors.primary[600]
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = shadows.md
              }}
              onMouseLeave={(e) => {
                e.target.style.background = colors.primary[500]
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = shadows.sm
              }}
              onTouchStart={(e) => {
                e.target.style.transform = 'scale(0.98)'
                e.target.style.background = colors.primary[600]
              }}
              onTouchEnd={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.background = colors.primary[500]
              }}
              aria-label="Switch to Tutorial mode"
              title="Switch to Tutorial mode"
            >
              <span style={{ fontSize: '14px' }}>📚</span>
              <span>How to Solve a Rubik's Cube</span>
            </button>
          )}

          {/* About Button */}
          <button
            className="about-button"
            onClick={() => setIsAboutModalOpen(true)}
            style={{
              padding: `${spacing[2]} ${spacing[3]}`,
              border: `1px solid ${colors.border.medium}`,
              borderRadius: '8px',
              background: colors.neutral[100],
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.medium,
              fontSize: typography.fontSize.sm,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing[2],
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              boxShadow: shadows.sm,
              minHeight: '36px',
              minWidth: '36px',
              whiteSpace: 'nowrap',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = shadows.sm
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.neutral[50]
              e.target.style.borderColor = colors.border.dark
              e.target.style.transform = 'translateY(-1px)'
              e.target.style.boxShadow = shadows.md
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.background.primary
              e.target.style.borderColor = colors.border.medium
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = shadows.sm
            }}
            onTouchStart={(e) => {
              e.target.style.transform = 'scale(0.98)'
              e.target.style.background = colors.neutral[100]
            }}
            onTouchEnd={(e) => {
              e.target.style.transform = 'scale(1)'
              e.target.style.background = colors.background.primary
            }}
            aria-label="Learn more about this project"
            title="About this project"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <path d="M12 17h.01"/>
            </svg>
            <span>About</span>
          </button>
        </div>
      </div>

      {/* Mobile-responsive styles */}
      <style>{`
        /* iPhone vertical orientation specific styles */
        @media (max-width: 768px) and (orientation: portrait) {
          .responsive-header {
            margin-bottom: 16px !important;
            padding: 16px 0 !important;
          }
          
          .responsive-header h1 {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 12px !important;
          }
          
          .responsive-header p {
            font-size: 1rem !important;
            margin-top: 8px !important;
          }
          
          .responsive-header button {
            font-size: 0.875rem !important;
            padding: 0.75rem 1rem !important;
            margin-top: 0.75rem !important;
          }
          
          /* Hide desktop About button and theme toggle on mobile portrait */
          .responsive-header > div > div:last-child .about-button {
            display: none !important;
          }
          
          .responsive-header > div > div:last-child button:first-child {
            display: none !important;
          }
          
          /* Show mobile buttons container on mobile portrait */
          .mobile-buttons-container {
            display: flex !important;
          }
          
          .mobile-about-button {
            display: inline-flex !important;
            padding: 0.5rem !important;
            font-size: 0.875rem !important;
            margin: 0 !important;
            background: ${colors.neutral[100]} !important;
            border: 1px solid ${colors.border.medium} !important;
            min-height: 32px !important;
            min-width: 32px !important;
            flex-shrink: 0 !important;
          }
          
          .mobile-about-button span {
            display: none !important;
          }
          
          .mobile-theme-toggle {
            min-height: 32px !important;
            min-width: 32px !important;
            padding: 0.5rem !important;
            flex-shrink: 0 !important;
          }
          
        }
        
        /* Desktop and tablet styles */
        @media (min-width: 769px), (max-width: 768px) and (orientation: landscape) {
          .mobile-buttons-container {
            display: none !important;
          }
          
          .mobile-about-button {
            display: none !important;
          }
          
          .mobile-theme-toggle {
            display: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .responsive-header {
            margin-bottom: 24px !important;
            padding: 20px 0 !important;
          }
          
          .responsive-header h1 {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
          }
          
          .responsive-header p {
            font-size: 1rem !important;
            margin-top: 8px !important;
          }
          
          .responsive-header button {
            font-size: 0.875rem !important;
            padding: 0.75rem 1rem !important;
            margin-top: 1rem !important;
          }
          
        }
        
        @media (max-width: 480px) {
          .responsive-header {
            margin-bottom: 20px !important;
            padding: 16px 0 !important;
          }
          
          .responsive-header h1 {
            font-size: 1.375rem !important;
          }
          
          .responsive-header p {
            font-size: 0.9rem !important;
          }
          
          .responsive-header button {
            font-size: 0.8rem !important;
            padding: 0.625rem 0.875rem !important;
            margin-top: 0.875rem !important;
          }
        }
        
        @media (max-width: 768px) and (orientation: landscape) {
          .responsive-header {
            margin-bottom: 16px !important;
            padding: 12px 0 !important;
          }
          
          .responsive-header h1 {
            font-size: 1.375rem !important;
          }
          
          .responsive-header p {
            font-size: 0.9rem !important;
          }
          
          .responsive-header button {
            font-size: 0.825rem !important;
            padding: 0.625rem 0.875rem !important;
            margin-top: 0.875rem !important;
          }
        }

        /* Mobile layout adjustments */
        @media (max-width: 640px) {
          .responsive-header > div {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
          }
          
          .responsive-header > div > div:last-child {
            margin-left: 0 !important;
            justify-content: center !important;
            order: 1 !important;
          }
        }
      `}</style>
      
      {/* About Modal */}
      <AboutModal 
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  )
}

export default Header 