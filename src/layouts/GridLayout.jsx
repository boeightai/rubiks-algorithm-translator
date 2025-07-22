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
      className="container"
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
        className="container-flex"
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

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .container-flex {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .left-column {
            position: static !important;
            max-width: none !important;
            max-height: none !important;
          }
        }
        @media (max-width: 768px) {
          .container {
            padding: 16px !important;
          }
          .left-column, .right-column {
            padding: 20px !important;
            min-width: auto !important;
          }
        }
        @media (max-width: 480px) {
          .container {
            padding: 12px !important;
          }
          .left-column, .right-column {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default GridLayout 