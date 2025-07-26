import { colors, typography, spacing, shadows } from '../../styles/designSystem'

const YouTubeModal = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null

  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    if (!url) return null
    
    try {
      // Handle youtu.be format (like https://youtu.be/R-R0KrXvWbc?feature=shared)
      if (url.includes('youtu.be/')) {
        const urlObj = new URL(url)
        const pathParts = urlObj.pathname.split('/')
        const videoId = pathParts[1] // Get the part after youtu.be/
        return videoId && videoId.length === 11 ? videoId : null
      }
      
      // Handle youtube.com/watch format
      if (url.includes('youtube.com/watch')) {
        const urlObj = new URL(url)
        return urlObj.searchParams.get('v')
      }
      
      // Handle youtube.com/embed format
      if (url.includes('youtube.com/embed/')) {
        const urlObj = new URL(url)
        const pathParts = urlObj.pathname.split('/')
        const videoId = pathParts[2] // Get the part after /embed/
        return videoId && videoId.length === 11 ? videoId : null
      }
      
      return null
    } catch (error) {
      console.error('Error parsing YouTube URL:', error)
      return null
    }
  }

  const videoId = getVideoId(videoUrl)
  // Use the specific embed URL with the si parameter from the provided embed code
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?si=KV8SWyHT5Rw1tXz_&rel=0&modestbranding=1&showinfo=0` : ''
  
  // Debug logging
  console.log('Video URL:', videoUrl)
  console.log('Video ID:', videoId)
  console.log('Embed URL:', embedUrl)

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
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
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="youtube-modal-title"
    >
      <div
        style={{
          backgroundColor: colors.background.primary,
          borderRadius: '16px',
          boxShadow: shadows.xl,
          maxWidth: '90vw',
          maxHeight: '90vh',
          width: '800px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing[4]} ${spacing[6]}`,
            borderBottom: `1px solid ${colors.border.light}`,
          }}
        >
          <h2
            id="youtube-modal-title"
            style={{
              margin: 0,
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral[900],
            }}
          >
            Rubik's Cube Tutorial
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: colors.neutral[500],
              padding: spacing[2],
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '44px',
              minHeight: '44px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.neutral[100]
              e.target.style.color = colors.neutral[700]
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = colors.neutral[500]
            }}
            aria-label="Close video"
          >
            ×
          </button>
        </div>

        {/* Video Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%', // 16:9 aspect ratio
          }}
        >
          {embedUrl ? (
            <>
              <iframe
                src={embedUrl}
                title="YouTube video player"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '0 0 16px 16px',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                frameBorder="0"
                referrerPolicy="strict-origin-when-cross-origin"
                onError={(e) => {
                  console.error('YouTube iframe failed to load:', e)
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: spacing[4],
                  right: spacing[4],
                  zIndex: 10,
                }}
              >
                <button
                  onClick={() => window.open(videoUrl, '_blank')}
                  style={{
                    padding: `${spacing[2]} ${spacing[3]}`,
                    backgroundColor: colors.primary[600],
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                    cursor: 'pointer',
                    boxShadow: shadows.md,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.primary[700]
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = colors.primary[600]
                  }}
                >
                  Open in YouTube
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.neutral[100],
                borderRadius: '0 0 16px 16px',
                color: colors.neutral[600],
                fontSize: typography.fontSize.lg,
                padding: spacing[4],
                textAlign: 'center',
              }}
            >
              <div style={{ marginBottom: spacing[2] }}>
                Invalid YouTube URL
              </div>
              <div style={{ fontSize: typography.fontSize.sm, color: colors.neutral[500] }}>
                URL: {videoUrl}
              </div>
              <div style={{ fontSize: typography.fontSize.sm, color: colors.neutral[500] }}>
                Video ID: {videoId || 'Not found'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .youtube-modal {
            padding: 16px !important;
          }
          
          .youtube-modal > div {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 12px !important;
          }
          
          .youtube-modal h2 {
            font-size: 1.125rem !important;
          }
          
          .youtube-modal button {
            font-size: 20px !important;
            padding: 8px !important;
            min-width: 40px !important;
            min-height: 40px !important;
          }
        }
        
        @media (max-width: 480px) {
          .youtube-modal {
            padding: 12px !important;
          }
          
          .youtube-modal > div {
            border-radius: 8px !important;
          }
          
          .youtube-modal h2 {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}

export default YouTubeModal 