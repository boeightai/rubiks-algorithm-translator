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

import { Component } from 'react'
import { colors, typography, spacing, borderRadius } from '../styles/designSystem'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Update state with error info
    this.setState({
      error,
      errorInfo
    })
    
    // In production, you might want to send this to an error reporting service
    // Example: logErrorToService(error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: colors.background.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: spacing[4],
        }}>
          <div style={{
            maxWidth: '500px',
            textAlign: 'center',
            backgroundColor: colors.background.secondary,
            padding: spacing[6],
            borderRadius: borderRadius.xl,
            border: `1px solid ${colors.border.light}`,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{
              fontSize: typography.fontSize['3xl'],
              marginBottom: spacing[4],
              color: colors.error[500],
            }}>
              ⚠️
            </div>
            
            <h1 style={{
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              color: colors.neutral[900],
              marginBottom: spacing[3],
            }}>
              Something went wrong
            </h1>
            
            <p style={{
              fontSize: typography.fontSize.sm,
              color: colors.neutral[600],
              marginBottom: spacing[4],
              lineHeight: typography.lineHeight.relaxed,
            }}>
              We encountered an unexpected error. This might be due to a temporary issue or corrupted data.
            </p>
            
            <div style={{
              display: 'flex',
              gap: spacing[3],
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: `${spacing[2]} ${spacing[4]}`,
                  backgroundColor: colors.primary[500],
                  color: colors.white,
                  border: 'none',
                  borderRadius: borderRadius.md,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.primary[600]
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.primary[500]
                }}
              >
                Reload Page
              </button>
              
              <button
                onClick={this.handleGoHome}
                style={{
                  padding: `${spacing[2]} ${spacing[4]}`,
                  backgroundColor: colors.neutral[100],
                  color: colors.neutral[700],
                  border: `1px solid ${colors.border.medium}`,
                  borderRadius: borderRadius.md,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.neutral[200]
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.neutral[100]
                }}
              >
                Go Home
              </button>
            </div>
            
            {/* Development error details */}
            {typeof window !== 'undefined' && window.location.hostname === 'localhost' && this.state.error && (
              <details style={{
                marginTop: spacing[4],
                padding: spacing[3],
                backgroundColor: colors.neutral[50],
                borderRadius: borderRadius.md,
                border: `1px solid ${colors.border.light}`,
                fontSize: typography.fontSize.xs,
                color: colors.neutral[700],
              }}>
                <summary style={{
                  cursor: 'pointer',
                  fontWeight: typography.fontWeight.medium,
                  marginBottom: spacing[2],
                }}>
                  Error Details (Development)
                </summary>
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontSize: typography.fontSize.xs,
                  color: colors.error[600],
                  margin: 0,
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 