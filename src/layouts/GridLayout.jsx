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

import { colors, typography, spacing, borderRadius, shadows } from '../styles/designSystem'

const GridLayout = ({ 
  leftColumn, 
  rightColumn, 
  header,
  containerStyle = {},
  leftColumnStyle = {},
  rightColumnStyle = {}
}) => {
  return (
    <div 
      className="container responsive-container"
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
      
      {/* Main Content Grid */}
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
            ...leftColumnStyle
          }}
        >
          {leftColumn}
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
            ...rightColumnStyle
          }}
        >
          {rightColumn}
        </div>
      </div>

      {/* Enhanced responsive styles */}
      <style>{`
        /* Tablet breakpoint */
        @media (max-width: 1024px) {
          .container-flex {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .left-column {
            position: static !important;
            max-width: none !important;
            max-height: none !important;
            flex: 1 1 auto !important;
            min-width: auto !important;
          }
          .right-column {
            flex: 1 1 auto !important;
            min-width: auto !important;
          }
        }
        
        /* Mobile tablet breakpoint */
        @media (max-width: 768px) {
          .container {
            padding: 16px !important;
            width: 95% !important;
          }
          .left-column, .right-column {
            padding: 20px !important;
            min-width: auto !important;
            border-radius: 16px !important;
          }
          .container-flex {
            gap: 16px !important;
          }
        }
        
        /* Mobile phone breakpoint */
        @media (max-width: 480px) {
          .container {
            padding: 12px !important;
            width: 98% !important;
          }
          .left-column, .right-column {
            padding: 16px !important;
            border-radius: 12px !important;
            margin-bottom: 12px !important;
          }
          .container-flex {
            gap: 12px !important;
          }
        }
        
        /* Small mobile breakpoint */
        @media (max-width: 360px) {
          .container {
            padding: 8px !important;
            width: 100% !important;
          }
          .left-column, .right-column {
            padding: 12px !important;
            border-radius: 8px !important;
            margin-bottom: 8px !important;
          }
          .container-flex {
            gap: 8px !important;
          }
        }
        
        /* Landscape orientation adjustments */
        @media (max-width: 768px) and (orientation: landscape) {
          .container-flex {
            flex-direction: row !important;
            gap: 16px !important;
          }
          .left-column {
            flex: 1 1 300px !important;
            max-width: 300px !important;
          }
          .right-column {
            flex: 1 1 auto !important;
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

export default GridLayout 