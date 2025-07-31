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
import { useMobileDetection } from '../hooks/useMobileDetection'

function ModeToggle({ mode, onToggle }) {
  const { isMobile } = useMobileDetection()
  
  return (
    <div style={{
      position: 'fixed',
      top: spacing[4],
      right: spacing[4],
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
    }}>
      
      {/* Toggle button */}
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          padding: `${spacing[2]} ${spacing[3]}`,
          backgroundColor: colors.primary[500],
          color: colors.white,
          border: `1px solid ${colors.border.medium}`,
          borderRadius: '8px',
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
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
      >
        {/* Icon */}
        <span style={{ fontSize: '16px' }}>
          {mode === 'tutorial' ? '🔍' : '📚'}
        </span>
        
        {/* Text */}
        <span>
          {mode === 'tutorial' ? 'Full Algorithms List' : 'Tutorial Mode'}
        </span>
        
        {/* Arrow indicator */}
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{
            transform: 'rotate(90deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      
      {/* Tooltip on mobile */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: spacing[2],
          padding: `${spacing[2]} ${spacing[3]}`,
          backgroundColor: colors.neutral[800],
          color: colors.white,
          borderRadius: borderRadius.md,
          fontSize: typography.fontSize.xs,
          whiteSpace: 'nowrap',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.2s ease',
        }}>
          Switch to {mode === 'tutorial' ? 'Full Algorithms List' : 'Tutorial Mode'}
        </div>
      )}
    </div>
  )
}

export default ModeToggle