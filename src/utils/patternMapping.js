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

const PATTERN_MAPPING = {
  'daisy-edge-flipper': ['/images/patterns/daisy-edge-flipper-pattern.png'],
  'sune': [
    '/images/patterns/sune-pattern.png',
    '/images/patterns/sune-pattern-2.png'
  ],
  'oll-case-24': ['/images/patterns/oll-case-24-pattern.png'],
  'oll-case-25': ['/images/patterns/oll-case-25-pattern.png'],
  '2look-oll-4': ['/images/patterns/2look-oll-4-pattern.png'],
  'kite-oll': ['/images/patterns/kite-oll-pattern.png'],
  't-perm-setup': ['/images/patterns/t-perm-setup-pattern.png']
}

/**
 * Get pattern images for a given algorithm ID
 * @param {string} algorithmId - The algorithm ID to get patterns for
 * @returns {string[]|null} - Array of pattern image paths or null if no patterns exist
 */
export const getPatternImages = (algorithmId) => {
  return PATTERN_MAPPING[algorithmId] || null
}
