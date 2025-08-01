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

import { useEffect, useRef } from 'react'
import { typography, spacing, borderRadius } from '../styles/designSystem'
import { useMobileDetection } from '../hooks/useMobileDetection'

const AboutModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const { isMobile } = useMobileDetection()

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent background scrolling
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Handle click outside modal
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  // Handle swipe to dismiss (mobile)
  const handleTouchStart = (event) => {
    if (!isMobile) return
    
    const touch = event.touches[0]
    const startY = touch.clientY
    
    const handleTouchMove = (event) => {
      const touch = event.touches[0]
      const currentY = touch.clientY
      const deltaY = currentY - startY
      
      if (deltaY > 50) { // Swipe down threshold
        onClose()
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '16px' : '32px',
        animation: 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onClick={handleBackdropClick}
      onTouchStart={handleTouchStart}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div
        style={{
          background: 'var(--bg-primary)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? '24px' : '32px',
          maxWidth: isMobile ? '100%' : '700px',
          maxHeight: isMobile ? '90vh' : '85vh',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          boxShadow: 'var(--shadow-lg)',
          animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modern close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: spacing[4],
            right: spacing[4],
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--bg-secondary)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            fontSize: '20px',
            fontWeight: typography.fontWeight.medium,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'var(--shadow-base)',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--bg-primary)'
            e.target.style.transform = 'scale(1.1) rotate(90deg)'
            e.target.style.boxShadow = 'var(--shadow-md)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--bg-secondary)'
            e.target.style.transform = 'scale(1) rotate(0deg)'
            e.target.style.boxShadow = 'var(--shadow-base)'
          }}
          onTouchStart={(e) => {
            e.target.style.background = 'var(--bg-primary)'
            e.target.style.transform = 'scale(0.95)'
          }}
          onTouchEnd={(e) => {
            e.target.style.background = 'var(--bg-secondary)'
            e.target.style.transform = 'scale(1)'
          }}
          aria-label="Close about modal"
        >
          ✕
        </button>

        {/* Content */}
        <div style={{ 
          padding: isMobile ? spacing[6] : spacing[8],
          paddingTop: isMobile ? spacing[12] : spacing[8],
          flex: 1,
          overflow: 'auto',
          height: '100%',
        }}>
          {/* Header Section */}
          <div style={{
            marginBottom: spacing[6],
            textAlign: 'center',
          }}>
            <h1
              id="about-modal-title"
              style={{
                color: 'var(--text-primary)',
                fontSize: isMobile ? typography.fontSize['2xl'] : typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing[2],
                marginTop: 0,
                lineHeight: typography.lineHeight.tight,
                background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              About This Project
            </h1>
          </div>

          {/* Content Sections */}
          <div style={{
            lineHeight: typography.lineHeight.relaxed,
            color: 'var(--text-secondary)',
            fontSize: typography.fontSize.base,
          }}>
            {/* Family Photo */}
            <div style={{
              marginBottom: spacing[6],
              textAlign: 'center',
            }}>
              <img
                src="/images/family-photo.png"
                alt="Hailey and I working on Rubik's Cube algorithms"
                style={{
                  width: '100%',
                  maxWidth: isMobile ? '250px' : '300px',
                  height: 'auto',
                  borderRadius: borderRadius.lg,
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--border-light)',
                  objectFit: 'cover',
                }}
              />
            </div>
            
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: borderRadius.xl,
              padding: spacing[5],
              border: '1px solid var(--border-light)',
              backdropFilter: 'blur(10px)',
            }}>
              <p style={{ margin: 0, marginBottom: spacing[4] }}>
                Welcome to our Rubik's Cube Algorithm Translator. This project was born from a shared passion 
                between my 9 year old daughter Hailey and I - our love of solving Rubik's Cubes and learning to code.
              </p>
              <p style={{ margin: 0, marginBottom: spacing[4] }}>
                We're excited to share our ongoing development with both the speedcubing and coding communities. 
                We also hope to attract new people to learn how to solve Rubik's Cubes with our visual system!
              </p>
            </div>

            {/* GitHub Repository Link */}
            <div style={{
              marginTop: spacing[6],
              textAlign: 'center',
            }}>
              <a
                href="https://github.com/boeightai/rubiks-algorithm-translator"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  padding: `${spacing[3]} ${spacing[6]}`,
                  background: 'linear-gradient(135deg, #24292e 0%, #040d21 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: borderRadius.xl,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: 'var(--shadow-base)',
                  minHeight: '48px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-base)'
                }}
              >
                {/* GitHub Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .about-modal-content {
            padding: 24px !important;
            padding-top: 80px !important;
          }
        }
        
        /* High DPI displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .about-modal-backdrop {
            backdrop-filter: blur(12px);
          }
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .about-modal-backdrop,
          .about-modal-content {
            animation: none !important;
          }
        }
        
        /* Custom scrollbar for the modal content */
        .about-modal-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .about-modal-content::-webkit-scrollbar-track {
          background: var(--scrollbar-track);
          border-radius: 3px;
        }
        
        .about-modal-content::-webkit-scrollbar-thumb {
          background: var(--scrollbar-thumb);
          border-radius: 3px;
        }
        
        .about-modal-content::-webkit-scrollbar-thumb:hover {
          background: var(--scrollbar-thumb-hover);
        }
      `}</style>
    </div>
  )
}

export default AboutModal 