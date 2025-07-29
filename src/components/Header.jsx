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
import { useState } from 'react'

const Header = ({ 
  title = "Bo and Hailey's Visual Notation System",
  subtitle = "An Alternate Visual Notation System for Solving Rubik's Cubes",
  style = {},
  selectedCategory,
  setSelectedCategory
}) => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const handleWiredButtonClick = () => {
    if (selectedCategory === 'Wired') {
      // If Wired is currently selected, switch back to All Categories
      setSelectedCategory('all')
    } else {
      // If any other category is selected, switch to Wired
      setSelectedCategory('Wired')
    }
  }

  const handleYouTubeButtonClick = () => {
    // Enhanced YouTube button click handler with mobile-friendly fallbacks
    const youtubeVideoUrl = 'https://youtu.be/R-R0KrXvWbc?feature=shared'
    
    try {
      // Method 1: Try window.open() first (works on most mobile browsers with user gesture)
      const newWindow = window.open(youtubeVideoUrl, '_blank')
      
      if (newWindow) {
        // Success - window opened
        return
      }
      
      // Method 2: Fallback - create and click a link element (more reliable on mobile)
      const link = document.createElement('a')
      link.href = youtubeVideoUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    } catch (error) {
      // Method 3: Final fallback - redirect current tab
      try {
        window.location.href = youtubeVideoUrl
      } catch (redirectError) {
        // Show user-friendly error message
        alert('Unable to open YouTube video. Please copy this link and open it manually: ' + youtubeVideoUrl)
      }
    }
  }

  const isWiredSelected = selectedCategory === 'Wired'

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
              {/* Mobile About button - only visible on mobile portrait */}
              <button
                className="mobile-about-button"
                onClick={() => setIsAboutModalOpen(true)}
                style={{
                  display: 'none', // Hidden by default, shown via CSS media query
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
            
            {/* Button Container */}
            <div style={{
              display: 'flex',
              gap: spacing[3],
              marginTop: spacing[4],
              flexWrap: 'wrap',
            }}>
              {/* Wired Magazine Button */}
              <button
                onClick={handleWiredButtonClick}
                style={{
                  padding: `${spacing[3]} ${spacing[4]}`,
                  border: isWiredSelected ? `2px solid ${colors.neutral[500]}` : `1px solid ${colors.border.medium}`,
                  borderRadius: '12px',
                  background: isWiredSelected ? colors.neutral[50] : colors.background.primary,
                  color: isWiredSelected ? colors.neutral[700] : colors.neutral[700],
                  fontWeight: typography.fontWeight.medium,
                  fontSize: typography.fontSize.sm,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  boxShadow: shadows.sm,
                  minHeight: '44px',
                  minWidth: '44px',
                  whiteSpace: 'nowrap',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = shadows.sm
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = isWiredSelected ? colors.neutral[100] : colors.neutral[50]
                  e.target.style.borderColor = isWiredSelected ? colors.neutral[600] : colors.border.dark
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isWiredSelected ? colors.neutral[50] : colors.background.primary
                  e.target.style.borderColor = isWiredSelected ? colors.neutral[500] : colors.border.medium
                }}
                aria-label={isWiredSelected ? "Switch back to all categories" : "Filter to Wired Magazine algorithms"}
                aria-pressed={isWiredSelected}
              >
                Algorithms Used in the Wired Magazine's YouTube Video
              </button>

              {/* YouTube Button */}
              <button
                onClick={handleYouTubeButtonClick}
                className="youtube-button"
                style={{
                  padding: `${spacing[3]} ${spacing[4]}`,
                  border: `1px solid ${colors.border.medium}`,
                  borderRadius: '12px',
                  background: colors.background.primary,
                  color: colors.neutral[700],
                  fontWeight: typography.fontWeight.medium,
                  fontSize: typography.fontSize.sm,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                  boxShadow: shadows.sm,
                  minHeight: '44px',
                  minWidth: '44px',
                  whiteSpace: 'nowrap',
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
                  // Add touch feedback
                  e.target.style.transform = 'scale(0.98)'
                  e.target.style.background = colors.neutral[100]
                }}
                onTouchEnd={(e) => {
                  // Remove touch feedback
                  e.target.style.transform = 'scale(1)'
                  e.target.style.background = colors.background.primary
                }}
                aria-label="Open YouTube tutorial video"
                title="Watch the Wired Magazine Rubik's Cube tutorial"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  style={{ flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="youtube-button-text">Click to Watch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right side - About button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          marginLeft: spacing[4],
          flexShrink: 0,
        }}>
          {/* About Button */}
          <button
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
        /* YouTube button specific styles */
        .youtube-button {
          position: relative;
          overflow: hidden;
        }
        
        .youtube-button:active {
          transform: scale(0.98);
        }
        
        .youtube-button-text {
          transition: all 0.2s ease;
        }
        
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
          
          /* Move About button to title area on mobile portrait */
          .responsive-header > div > div:last-child {
            display: none !important;
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
          
          /* Enhanced mobile YouTube button */
          .youtube-button {
            min-height: 44px !important;
            min-width: 44px !important;
            padding: 10px 14px !important;
            font-size: 0.875rem !important;
            border-radius: 10px !important;
          }
          
          .youtube-button svg {
            width: 18px !important;
            height: 18px !important;
          }
        }
        
        /* Desktop and tablet styles */
        @media (min-width: 769px), (max-width: 768px) and (orientation: landscape) {
          .mobile-about-button {
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
          
          /* Enhanced mobile YouTube button */
          .youtube-button {
            min-height: 48px !important;
            min-width: 48px !important;
            padding: 12px 16px !important;
            font-size: 0.875rem !important;
            border-radius: 10px !important;
          }
          
          .youtube-button svg {
            width: 18px !important;
            height: 18px !important;
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