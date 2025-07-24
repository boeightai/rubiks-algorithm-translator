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
  onToggle, 
  size = 16, 
  className = '',
  title,
  ariaLabel 
}) => {
  const defaultTitle = isWired ? 'Remove Wired tag' : 'Add Wired tag'
  const defaultAriaLabel = isWired ? 'Remove Wired' : 'Add Wired'

  return (
    <button
      onClick={onToggle}
      className={`responsive-wired-button ${className}`}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '44px',
        minHeight: '44px',
        borderRadius: '50%',
        transition: 'background-color 0.2s ease',
      }}
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
        />
      )}
      
      {/* Mobile-responsive styles */}
      <style>{`
        .responsive-wired-button:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .responsive-wired-button:active {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
          .responsive-wired-button {
            min-width: 48px !important;
            min-height: 48px !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-wired-button {
            min-width: 44px !important;
            min-height: 44px !important;
          }
        }
      `}</style>
    </button>
  )
}

export default WiredButton 