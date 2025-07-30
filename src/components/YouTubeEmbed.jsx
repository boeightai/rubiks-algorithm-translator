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

import { colors, borderRadius, shadows, spacing } from '../styles/designSystem'

function YouTubeEmbed() {
  // Placeholder video ID - replace with your actual video ID
  const videoId = 'YOUR_VIDEO_ID' // Replace with actual YouTube video ID
  
  return (
    <div style={{
      width: '100%',
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
        />
      </div>
      
      {/* Video placeholder message if no video ID */}
      {videoId === 'YOUR_VIDEO_ID' && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          padding: spacing[4],
          backgroundColor: colors.neutral[900] + 'CC',
          color: colors.white,
          borderRadius: borderRadius.lg,
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: '48px', marginBottom: spacing[2] }}>📹</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            YouTube Video Placeholder
          </div>
          <div style={{ fontSize: '14px', marginTop: spacing[2], opacity: 0.8 }}>
            Replace 'YOUR_VIDEO_ID' with your actual YouTube video ID
          </div>
        </div>
      )}
    </div>
  )
}

export default YouTubeEmbed