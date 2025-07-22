import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../styles/designSystem'

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt, algorithmName }) => {
  if (!isOpen) return null

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = `${algorithmName}-tutorial.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
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
    >
      <div
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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing[4],
          paddingBottom: spacing[4],
          borderBottom: `1px solid ${colors.border.light}`,
        }}>
          <h2 style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral[900],
            margin: 0,
          }}>
            {algorithmName} - Tutorial Image
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
              borderRadius: borderRadius.base,
              transition: transitions.fast,
              '&:hover': {
                backgroundColor: colors.neutral[100],
                color: colors.neutral[700],
              },
            }}
          >
            ×
          </button>
        </div>

        {/* Image */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: spacing[4],
        }}>
          <img
            src={imageSrc}
            alt={imageAlt}
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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: spacing[3],
        }}>
          <button
            onClick={handleDownload}
            style={{
              background: colors.primary[600],
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
              '&:hover': {
                background: colors.primary[700],
              },
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
            style={{
              background: colors.neutral[100],
              color: colors.neutral[700],
              border: `1px solid ${colors.border.medium}`,
              padding: `${spacing[3]} ${spacing[4]}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              cursor: 'pointer',
              transition: transitions.fast,
              '&:hover': {
                background: colors.neutral[200],
              },
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageModal 