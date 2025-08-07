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

import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for centralized mobile detection with iPad support
 * @param {number} breakpoint - The breakpoint width in pixels (default: 768)
 * @returns {Object} - Mobile detection state including device type
 */
export function useMobileDetection(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [deviceType, setDeviceType] = useState('desktop')
  const [isPortrait, setIsPortrait] = useState(true)
  const [isLandscape, setIsLandscape] = useState(false)

  const checkDevice = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const width = window.innerWidth
        const height = window.innerHeight
        const userAgent = navigator.userAgent.toLowerCase()
        
        // Check for iPad specifically
        const isIPad = /ipad/.test(userAgent) || 
                      (userAgent.includes('macintosh') && 'ontouchend' in document)
        
        // Check for other tablets
        const isTabletDevice = /tablet|ipad|playbook|silk/i.test(userAgent) ||
                              (width >= 768 && width <= 1024)
        
        // Mobile detection
        const isMobileDevice = width <= breakpoint || 
                              /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
        
        setIsMobile(isMobileDevice)
        setIsTablet(isTabletDevice || isIPad)
        setIsPortrait(height >= width)
        setIsLandscape(width > height)
        
        // Set device type for more specific targeting
        if (isIPad) {
          setDeviceType('ipad')
        } else if (isTabletDevice) {
          setDeviceType('tablet')
        } else if (isMobileDevice) {
          setDeviceType('mobile')
        } else {
          setDeviceType('desktop')
        }
      } catch {
        // Fallback to desktop if detection fails
        // Mobile detection failed - use safe defaults
        setIsMobile(false)
        setIsTablet(false)
        setIsPortrait(true)
        setIsLandscape(false)
        setDeviceType('desktop')
      }
    }
  }, [breakpoint])

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true)
    
    // Check immediately
    checkDevice()
    
    // Add event listener with debouncing
    let timeoutId
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkDevice, 100) // Debounce resize events
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize)
        clearTimeout(timeoutId)
      }
    }
  }, [checkDevice])

  // Return consistent values during SSR to prevent hydration mismatch
  return {
    isMobile: isClient ? isMobile : false,
    isTablet: isClient ? isTablet : false,
    isPortrait: isClient ? isPortrait : true,
    isLandscape: isClient ? isLandscape : false,
    isClient,
    deviceType: isClient ? deviceType : 'desktop'
  }
} 