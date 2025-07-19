import StarIcon from './StarIcon'

const StarButton = ({ 
  isFavorite, 
  onToggle, 
  size = 22, 
  className = '',
  title,
  ariaLabel 
}) => {
  const defaultTitle = isFavorite ? 'Remove from favorites' : 'Add to favorites'
  const defaultAriaLabel = isFavorite ? 'Unstar' : 'Star'

  return (
    <button
      onClick={onToggle}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        height: '32px',
      }}
      className={className}
      aria-label={ariaLabel || defaultAriaLabel}
      title={title || defaultTitle}
    >
      <StarIcon filled={isFavorite} size={size} />
    </button>
  )
}

export default StarButton 