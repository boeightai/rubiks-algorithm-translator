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

// Modern Design System for Rubik's Cube Algorithm Translator

export const colors = {
  // Primary colors
  primary: {
    50: 'var(--primary-50)',
    100: 'var(--primary-100)',
    200: 'var(--primary-200)',
    300: 'var(--primary-300)',
    400: 'var(--primary-400)',
    500: 'var(--primary-500)',
    600: 'var(--primary-600)',
    700: 'var(--primary-700)',
    800: 'var(--primary-800)',
    900: 'var(--primary-900)',
  },
  
  // Neutral colors
  neutral: {
    50: 'var(--neutral-50)',
    100: 'var(--neutral-100)',
    200: 'var(--neutral-200)',
    300: 'var(--neutral-300)',
    400: 'var(--neutral-400)',
    500: 'var(--neutral-500)',
    600: 'var(--neutral-600)',
    700: 'var(--neutral-700)',
    800: 'var(--neutral-800)',
    900: 'var(--neutral-900)',
  },
  
  // Success colors
  success: {
    50: 'var(--success-50)',
    100: 'var(--success-100)',
    200: 'var(--success-200)',
    300: 'var(--success-300)',
    400: 'var(--success-400)',
    500: 'var(--success-500)',
    600: 'var(--success-600)',
    700: 'var(--success-700)',
    800: 'var(--success-800, #166534)',
    900: 'var(--success-900, #14532d)',
  },
  
  // Warning colors
  warning: {
    50: 'var(--warning-50)',
    100: 'var(--warning-100)',
    200: 'var(--warning-200)',
    300: 'var(--warning-300)',
    400: 'var(--warning-400)',
    500: 'var(--warning-500)',
    600: 'var(--warning-600)',
    700: 'var(--warning-700)',
    800: 'var(--warning-800, #92400e)',
    900: 'var(--warning-900, #78350f)',
  },
  
  // Info colors (blue)
  info: {
    50: 'var(--info-50)',
    100: 'var(--info-100)',
    200: 'var(--info-200)',
    300: 'var(--info-300)',
    400: 'var(--info-400)',
    500: 'var(--info-500)',
    600: 'var(--info-600)',
    700: 'var(--info-700)',
    800: 'var(--info-800, #1e40af)',
    900: 'var(--info-900, #1e3a8a)',
  },
  
  // Background colors
  background: {
    primary: 'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
    tertiary: 'var(--bg-tertiary)',
    dark: 'var(--neutral-900)',
  },
  
  // Border colors
  border: {
    light: 'var(--border-light)',
    medium: 'var(--border-medium)',
    dark: 'var(--border-dark)',
  },
  
  // Common colors
  white: '#ffffff',
  black: '#000000'
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
  sm: 'var(--shadow-sm)',
  base: 'var(--shadow-base)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
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