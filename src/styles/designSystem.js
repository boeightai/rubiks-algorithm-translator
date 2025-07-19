// Modern Design System for Rubik's Cube Algorithm Translator

export const colors = {
  // Primary colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Neutral colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Success colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Warning colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    dark: '#0f172a',
  },
  
  // Border colors
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#94a3b8',
  }
}

export const typography = {
  fontFamily: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'JetBrains Mono, "Fira Code", Consolas, monospace',
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  }
}

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
}

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
}

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
}

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '200ms ease-in-out',
  slow: '300ms ease-in-out',
}

// Component-specific styles
export const componentStyles = {
  // Card styles
  card: {
    background: colors.background.primary,
    borderRadius: borderRadius.xl,
    boxShadow: shadows.lg,
    border: `1px solid ${colors.border.light}`,
    transition: transitions.normal,
  },
  
  // Button styles
  button: {
    primary: {
      background: colors.primary[600],
      color: 'white',
      border: 'none',
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      cursor: 'pointer',
      transition: transitions.fast,
      '&:hover': {
        background: colors.primary[700],
        transform: 'translateY(-1px)',
        boxShadow: shadows.md,
      },
      '&:active': {
        transform: 'translateY(0)',
      },
    },
    secondary: {
      background: colors.neutral[100],
      color: colors.neutral[700],
      border: `1px solid ${colors.border.medium}`,
      borderRadius: borderRadius.lg,
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      cursor: 'pointer',
      transition: transitions.fast,
      '&:hover': {
        background: colors.neutral[200],
        borderColor: colors.border.dark,
      },
    },
    ghost: {
      background: 'transparent',
      color: colors.neutral[600],
      border: 'none',
      borderRadius: borderRadius.lg,
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      cursor: 'pointer',
      transition: transitions.fast,
      '&:hover': {
        background: colors.neutral[100],
        color: colors.neutral[800],
      },
    },
  },
  
  // Input styles
  input: {
    background: colors.background.primary,
    border: `1px solid ${colors.border.medium}`,
    borderRadius: borderRadius.lg,
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSize.sm,
    color: colors.neutral[800],
    transition: transitions.fast,
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary[500],
      boxShadow: `0 0 0 3px ${colors.primary[100]}`,
    },
    '&:hover': {
      borderColor: colors.border.dark,
    },
  },
  
  // Badge styles
  badge: {
    primary: {
      background: colors.primary[100],
      color: colors.primary[700],
      padding: `${spacing[1]} ${spacing[2]}`,
      borderRadius: borderRadius.full,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
    },
    success: {
      background: colors.success[100],
      color: colors.success[700],
      padding: `${spacing[1]} ${spacing[2]}`,
      borderRadius: borderRadius.full,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
    },
    warning: {
      background: colors.warning[100],
      color: colors.warning[700],
      padding: `${spacing[1]} ${spacing[2]}`,
      borderRadius: borderRadius.full,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
    },
  },
}

// Utility function to apply styles
export const applyStyles = (baseStyles, variantStyles = {}) => ({
  ...baseStyles,
  ...variantStyles,
}) 