import { colors, transitions } from '../../styles/designSystem'

const StarIcon = ({ filled, size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? colors.warning[500] : 'none'}
    stroke={filled ? colors.warning[500] : colors.neutral[400]}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ 
      verticalAlign: 'middle', 
      marginRight: 2,
      transition: transitions.fast,
    }}
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export default StarIcon 