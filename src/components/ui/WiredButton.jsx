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

const WiredButton = ({ 
  isWired, 
  size = 16, 
  className = '',
  title,
  ariaLabel 
}) => {
  const defaultTitle = isWired ? 'Algorithm is wired (memorized)' : 'Algorithm is not wired'
  const defaultAriaLabel = isWired ? 'Wired algorithm' : 'Not wired algorithm'

  return (
    <div
      className={`wired-indicator ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '44px',
        minHeight: '44px',
        borderRadius: '50%',
      }}
      role="status"
      aria-label={ariaLabel || defaultAriaLabel}
      title={title || defaultTitle}
    >
      {isWired && (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: '#000000',
            transition: 'all 0.2s ease',
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile-responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .wired-indicator {
            min-width: 48px !important;
            min-height: 48px !important;
          }
        }
        
        @media (max-width: 480px) {
          .wired-indicator {
            min-width: 44px !important;
            min-height: 44px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default WiredButton 