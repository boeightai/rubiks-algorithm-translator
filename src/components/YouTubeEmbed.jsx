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

import { colors, borderRadius, shadows, typography, spacing } from '../styles/designSystem'
import { useMobileDetection } from '../hooks/useMobileDetection'

function YouTubeEmbed() {
  const { isMobile, isTablet } = useMobileDetection()
  
  // Determine if we're on desktop for compact layout
  const isDesktop = !isMobile && !isTablet
  
  // Determine max width based on device type
  const getMaxWidth = () => {
    if (isMobile) return '100%' // Full width on mobile
    if (isTablet) return '600px' // Medium size on tablet
    return isDesktop ? '500px' : '700px' // More compact on desktop
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.neutral[100],
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          padding: spacing[4],
        }}>
          <div style={{
            fontSize: typography.fontSize.xl,
            marginBottom: spacing[3],
            color: colors.neutral[400],
          }}>
            🎥
          </div>
          <div style={{
            fontSize: typography.fontSize.lg,
            color: colors.neutral[700],
            fontWeight: '600',
          }}>
            Video Tutorial Coming Soon
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouTubeEmbed