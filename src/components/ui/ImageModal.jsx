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

import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../styles/designSystem'
import { useState } from 'react'

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt, algorithmName }) => {
  const [isCloseButtonHovered, setIsCloseButtonHovered] = useState(false)
  const [isDownloadButtonHovered, setIsDownloadButtonHovered] = useState(false)
  const [isCloseActionButtonHovered, setIsCloseActionButtonHovered] = useState(false)

  if (!isOpen) return null

  const handleDownload = () => {
    try {
      const link = document.createElement('a')
      link.href = imageSrc
      link.download = `${algorithmName}-tutorial.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to download image:', error)
      }
      // Could add user notification here
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="responsive-modal-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: spacing[4],
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="responsive-modal-content"
        style={{
          background: colors.background.primary,
          borderRadius: borderRadius.xl,
          padding: spacing[6],
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: shadows.xl,
          border: `1px solid ${colors.border.light}`,
          position: 'relative',
        }}
      >
        {/* Header */}
        <div 
          className="responsive-modal-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing[4],
            paddingBottom: spacing[4],
            borderBottom: `1px solid ${colors.border.light}`,
          }}
        >
          <h2 style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral[900],
            margin: 0,
            flex: '1 1 auto',
          }}>
            {algorithmName} - Tutorial Image
          </h2>
          <button
            onClick={onClose}
            onMouseEnter={() => setIsCloseButtonHovered(true)}
            onMouseLeave={() => setIsCloseButtonHovered(false)}
            style={{
              background: isCloseButtonHovered ? colors.neutral[100] : 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: isCloseButtonHovered ? colors.neutral[700] : colors.neutral[500],
              padding: spacing[2],
              borderRadius: borderRadius.base,
              transition: transitions.fast,
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Image */}
        <div 
          className="responsive-modal-image-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: spacing[4],
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="responsive-modal-image"
            style={{
              maxWidth: '100%',
              maxHeight: '60vh',
              width: 'auto',
              height: 'auto',
              borderRadius: borderRadius.lg,
              boxShadow: shadows.lg,
              border: `1px solid ${colors.border.light}`,
            }}
          />
        </div>

        {/* Actions */}
        <div 
          className="responsive-modal-actions"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: spacing[3],
          }}
        >
          <button
            onClick={handleDownload}
            onMouseEnter={() => setIsDownloadButtonHovered(true)}
            onMouseLeave={() => setIsDownloadButtonHovered(false)}
            style={{
              background: isDownloadButtonHovered ? colors.primary[700] : colors.primary[600],
              color: 'white',
              border: 'none',
              padding: `${spacing[3]} ${spacing[4]}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              cursor: 'pointer',
              transition: transitions.fast,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              minHeight: '44px',
            }}
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
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Image
          </button>
          
          <button
            onClick={onClose}
            onMouseEnter={() => setIsCloseActionButtonHovered(true)}
            onMouseLeave={() => setIsCloseActionButtonHovered(false)}
            style={{
              background: isCloseActionButtonHovered ? colors.neutral[200] : colors.neutral[100],
              color: colors.neutral[700],
              border: `1px solid ${colors.border.medium}`,
              padding: `${spacing[3]} ${spacing[4]}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              cursor: 'pointer',
              transition: transitions.fast,
              minHeight: '44px',
            }}
          >
            Close
          </button>
        </div>
      </div>

      {/* Mobile-responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .responsive-modal-backdrop {
            padding: 12px !important;
          }
          
          .responsive-modal-content {
            padding: 20px !important;
            max-width: 95vw !important;
            max-height: 95vh !important;
          }
          
          .responsive-modal-header {
            margin-bottom: 16px !important;
            padding-bottom: 16px !important;
          }
          
          .responsive-modal-header h2 {
            font-size: 1.125rem !important;
          }
          
          .responsive-modal-image {
            max-height: 50vh !important;
          }
          
          .responsive-modal-actions {
            flex-direction: column !important;
            gap: 12px !important;
          }
          
          .responsive-modal-actions button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-modal-backdrop {
            padding: 8px !important;
          }
          
          .responsive-modal-content {
            padding: 16px !important;
            max-width: 98vw !important;
            max-height: 98vh !important;
          }
          
          .responsive-modal-header {
            margin-bottom: 12px !important;
            padding-bottom: 12px !important;
          }
          
          .responsive-modal-header h2 {
            font-size: 1rem !important;
          }
          
          .responsive-modal-image {
            max-height: 40vh !important;
          }
          
          .responsive-modal-actions {
            gap: 8px !important;
          }
        }
        
        @media (max-width: 360px) {
          .responsive-modal-content {
            padding: 12px !important;
          }
          
          .responsive-modal-header h2 {
            font-size: 0.875rem !important;
          }
          
          .responsive-modal-image {
            max-height: 35vh !important;
          }
        }
        
        /* Landscape orientation adjustments */
        @media (max-width: 768px) and (orientation: landscape) {
          .responsive-modal-content {
            max-height: 90vh !important;
          }
          
          .responsive-modal-image {
            max-height: 45vh !important;
          }
          
          .responsive-modal-actions {
            flex-direction: row !important;
            gap: 12px !important;
          }
          
          .responsive-modal-actions button {
            width: auto !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ImageModal 