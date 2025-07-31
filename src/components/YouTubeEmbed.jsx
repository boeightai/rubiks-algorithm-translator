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

import { useState } from 'react'
import { colors, borderRadius, shadows, typography, spacing } from '../styles/designSystem'
import { useMobileDetection } from '../hooks/useMobileDetection'

function YouTubeEmbed() {
  // Use a default tutorial video ID - replace with your actual video ID
  const videoId = 'jVzB8wpKQgw' // Default Rubik's Cube tutorial video
  const { isMobile, isTablet } = useMobileDetection()
  const [hasError, setHasError] = useState(false)
  
  // Determine if we're on desktop for compact layout
  const isDesktop = !isMobile && !isTablet
  
  // Determine max width based on device type
  const getMaxWidth = () => {
    if (isMobile) return '100%' // Full width on mobile
    if (isTablet) return '600px' // Medium size on tablet
    return isDesktop ? '500px' : '700px' // More compact on desktop
  }
  
  const handleIframeError = () => {
    setHasError(true)
  }
  
  if (hasError) {
    return (
      <div style={{
        width: '100%',
        maxWidth: getMaxWidth(),
        margin: '0 auto',
        backgroundColor: colors.background.secondary,
        borderRadius: borderRadius.xl,
        padding: spacing[6],
        boxShadow: shadows.lg,
        border: `1px solid ${colors.border.light}`,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: typography.fontSize.xl,
          marginBottom: spacing[2],
          color: colors.neutral[400],
        }}>
          🎥
        </div>
        <div style={{
          fontSize: typography.fontSize.sm,
          color: colors.neutral[600],
          marginBottom: spacing[3],
        }}>
          Video temporarily unavailable
        </div>
        <div style={{
          fontSize: typography.fontSize.xs,
          color: colors.neutral[500],
        }}>
          Please check your internet connection and try again
        </div>
      </div>
    )
  }
  
  return (
    <div style={{
      width: '100%',
      maxWidth: getMaxWidth(),
      margin: '0 auto', // Center the video
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.xl,
      overflow: 'hidden',
      boxShadow: shadows.lg,
      border: `1px solid ${colors.border.light}`,
    }}>
      {/* 16:9 Aspect Ratio Container */}
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden',
      }}>
        <iframe
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="Rubik's Cube Tutorial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={handleIframeError}
        />
      </div>
      
    </div>
  )
}

export default YouTubeEmbed