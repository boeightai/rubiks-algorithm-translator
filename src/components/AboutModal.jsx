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
import { colors, typography, spacing, borderRadius } from '../styles/designSystem'
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
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? '24px' : '32px',
          maxWidth: isMobile ? '100%' : '700px',
          maxHeight: isMobile ? '90vh' : '85vh',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
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
            background: 'rgba(255, 255, 255, 0.9)',
            color: colors.neutral[600],
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            fontSize: '20px',
            fontWeight: typography.fontWeight.medium,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 1)'
            e.target.style.transform = 'scale(1.1) rotate(90deg)'
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)'
            e.target.style.transform = 'scale(1) rotate(0deg)'
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          onTouchStart={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 1)'
            e.target.style.transform = 'scale(0.95)'
          }}
          onTouchEnd={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)'
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
                color: colors.neutral[900],
                fontSize: isMobile ? typography.fontSize['2xl'] : typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing[2],
                marginTop: 0,
                lineHeight: typography.lineHeight.tight,
                background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
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
            color: colors.neutral[700],
            fontSize: typography.fontSize.base,
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: borderRadius.xl,
              padding: spacing[5],
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            }}>
              <p style={{ margin: 0, marginBottom: spacing[4] }}>
                Welcome to our Rubik's Cube Algorithm Translator! This project was born from a shared passion 
                between father and daughter - Bo and Hailey's love for solving Rubik's cubes and learning to code together.
              </p>
              <p style={{ margin: 0, marginBottom: spacing[4] }}>
                We created this application because we found the standard Rubik's cube notation system challenging 
                to memorize. Our solution? A custom visual notation system that makes learning algorithms 
                more intuitive and accessible for beginners and advanced cubers alike.
              </p>
              <p style={{ margin: 0, marginBottom: spacing[4] }}>
                This project serves dual purposes: it helps cubers master algorithms through our visual system, 
                while also serving as our coding learning journey. We're exploring modern development tools 
                like Cursor and Claude Code, making this a perfect blend of our interests.
              </p>
              <p style={{ margin: 0, marginBottom: spacing[4] }}>
                We're excited to share our work with the broader community and welcome contributions from both 
                the programming community and the Rubik's cube community! Whether you're a developer who wants 
                to help improve the codebase or a cuber who wants to suggest new features or algorithms, 
                we'd love to hear from you.
              </p>
              <p style={{ margin: 0, marginBottom: spacing[4] }}>
                Our longer-term vision is to keep creating and adding more features, with the goal of one day 
                developing this into a freemium business model. We plan to offer premium features while ensuring 
                that beginners can always access our visual notational system and core learning tools for free. 
                This way, we can support the community while building something sustainable.
              </p>
              <p style={{ margin: 0 }}>
                Check out our GitHub repository to see the code, contribute to the project, or share your ideas 
                for new features. Together, we can make learning the Rubik's cube more accessible and enjoyable 
                for everyone!
              </p>
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
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .about-modal-content::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 3px;
        }
        
        .about-modal-content::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  )
}

export default AboutModal 