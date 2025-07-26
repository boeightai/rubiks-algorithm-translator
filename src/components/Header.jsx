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

const Header = ({ 
  title = "Bo and Hailey's Visual Notation System",
  subtitle = "An Alternate Visual Notation System for Solving Rubik's Cubes",
  style = {},
  selectedCategory,
  setSelectedCategory
}) => {
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
        console.log('YouTube opened successfully in new window/tab')
        return
      }
      
      // Method 2: Fallback - create and click a link element (more reliable on mobile)
      console.log('window.open() failed, trying link element method...')
      const link = document.createElement('a')
      link.href = youtubeVideoUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    } catch (error) {
      console.error('YouTube button error:', error)
      
      // Method 3: Final fallback - redirect current tab
      try {
        console.log('Falling back to current tab redirect...')
        window.location.href = youtubeVideoUrl
      } catch (redirectError) {
        console.error('All YouTube opening methods failed:', redirectError)
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
        alignItems: 'center',
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
              {title}
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
                Wired Magazine's How to Solve a Rubik's Cube
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
                  // Mobile-specific improvements
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
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = colors.background.primary
                  e.target.style.borderColor = colors.border.medium
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
            margin-bottom: 16px !important;
            padding: 16px 0 !important;
          }
          
          .responsive-header h1 {
            font-size: 1.25rem !important;
            line-height: 1.2 !important;
          }
          
          .responsive-header p {
            font-size: 0.875rem !important;
            margin-top: 6px !important;
          }
          
          .responsive-header button {
            font-size: 0.8rem !important;
            padding: 0.625rem 0.875rem !important;
            margin-top: 0.875rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .responsive-header {
            margin-bottom: 12px !important;
            padding: 12px 0 !important;
          }
          
          .responsive-header h1 {
            font-size: 1.125rem !important;
          }
          
          .responsive-header p {
            font-size: 0.8rem !important;
            margin-top: 4px !important;
          }
          
          .responsive-header button {
            font-size: 0.75rem !important;
            padding: 0.5rem 0.75rem !important;
            margin-top: 0.75rem !important;
          }
        }
        
        /* Landscape orientation adjustments */
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
      `}</style>
    </div>
  )
}

export default Header 