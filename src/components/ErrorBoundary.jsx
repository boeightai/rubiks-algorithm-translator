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

import React from 'react'
import { colors, typography, spacing, borderRadius, shadows } from '../styles/designSystem'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
          padding: spacing[6],
          background: colors.background.primary,
          borderRadius: borderRadius.xl,
          border: `1px solid ${colors.border.light}`,
          boxShadow: shadows.lg,
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: spacing[4],
            color: colors.warning[500],
          }}>
            ⚠️
          </div>
          
          <h2 style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral[900],
            margin: `0 0 ${spacing[2]} 0`,
            textAlign: 'center',
          }}>
            Something went wrong
          </h2>
          
          <p style={{
            fontSize: typography.fontSize.base,
            color: colors.neutral[600],
            margin: `0 0 ${spacing[4]} 0`,
            textAlign: 'center',
            maxWidth: '500px',
            lineHeight: typography.lineHeight.normal,
          }}>
            We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
          </p>
          
          <button
            onClick={() => window.location.reload()}
            style={{
              background: colors.primary[600],
              color: 'white',
              border: 'none',
              padding: `${spacing[3]} ${spacing[4]}`,
              borderRadius: borderRadius.lg,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.background = colors.primary[700]}
            onMouseLeave={(e) => e.target.style.background = colors.primary[600]}
          >
            Refresh Page
          </button>
          
          {import.meta.env.DEV && this.state.error && (
            <details style={{
              marginTop: spacing[4],
              padding: spacing[3],
              background: colors.neutral[50],
              borderRadius: borderRadius.lg,
              border: `1px solid ${colors.border.light}`,
              maxWidth: '600px',
              width: '100%',
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: typography.fontWeight.medium,
                color: colors.neutral[700],
                marginBottom: spacing[2],
              }}>
                Error Details (Development)
              </summary>
              <pre style={{
                fontSize: typography.fontSize.xs,
                color: colors.neutral[600],
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0,
                fontFamily: typography.fontFamily.mono,
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 