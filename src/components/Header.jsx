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
import Logo from './ui/Logo'

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
                marginTop: spacing[4],
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
          </div>
        </div>
      </div>

      {/* Mobile-responsive styles */}
      <style>{`
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