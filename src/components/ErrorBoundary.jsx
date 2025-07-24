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
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      isDesktop: window.innerWidth > 768
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log additional context for debugging
    console.log('Error context:', {
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      timestamp: new Date().toISOString()
    })
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          maxWidth: '800px',
          margin: '50px auto',
          padding: spacing[6],
          background: colors.background.primary,
          borderRadius: borderRadius.xl,
          boxShadow: shadows.lg,
          border: `1px solid ${colors.border.light}`,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: spacing[4],
            color: colors.warning[500],
          }}>
            ⚠️
          </div>
          
          <h2 style={{
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral[900],
            marginBottom: spacing[3],
          }}>
            Something went wrong
          </h2>
          
          <p style={{
            fontSize: typography.fontSize.base,
            color: colors.neutral[600],
            marginBottom: spacing[4],
            lineHeight: typography.lineHeight.normal,
          }}>
            {this.state.isDesktop 
              ? 'There was an error displaying the algorithm on desktop. This might be related to recent mobile performance improvements.'
              : 'There was an error displaying the algorithm on mobile.'
            }
          </p>
          
          {this.state.error && (
            <details style={{
              marginBottom: spacing[4],
              textAlign: 'left',
              background: colors.neutral[50],
              padding: spacing[4],
              borderRadius: borderRadius.lg,
              border: `1px solid ${colors.border.light}`,
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: typography.fontWeight.medium,
                color: colors.neutral[700],
                marginBottom: spacing[2],
              }}>
                Error Details
              </summary>
              <div style={{
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily.mono,
                color: colors.neutral[600],
                whiteSpace: 'pre-wrap',
                overflow: 'auto',
                maxHeight: '200px',
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </div>
            </details>
          )}
          
          <div style={{
            display: 'flex',
            gap: spacing[3],
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: `${spacing[3]} ${spacing[4]}`,
                background: colors.primary[600],
                color: 'white',
                border: 'none',
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.background = colors.primary[700]}
              onMouseLeave={(e) => e.target.style.background = colors.primary[600]}
            >
              Try Again
            </button>
            
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: `${spacing[3]} ${spacing[4]}`,
                background: colors.neutral[100],
                color: colors.neutral[700],
                border: `1px solid ${colors.border.medium}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.background = colors.neutral[200]}
              onMouseLeave={(e) => e.target.style.background = colors.neutral[100]}
            >
              Reload Page
            </button>
          </div>
          
          <div style={{
            marginTop: spacing[4],
            padding: spacing[3],
            background: colors.warning[50],
            borderRadius: borderRadius.lg,
            border: `1px solid ${colors.warning[200]}`,
          }}>
            <p style={{
              fontSize: typography.fontSize.sm,
              color: colors.warning[700],
              margin: 0,
            }}>
              <strong>Note:</strong> If this error persists, it may be related to recent mobile performance improvements. 
              Please report this issue with the error details above.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 