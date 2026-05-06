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

import algorithms from '../data/algorithms.json'

const normalizeSearchText = (value) => {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const getSearchNames = (algorithm) => {
  return [
    algorithm.name,
    ...(Array.isArray(algorithm.nicknames) ? algorithm.nicknames : []),
  ].map(normalizeSearchText).filter(Boolean)
}

export const resolveAlgorithmByName = (tutorialAlgorithm) => {
  if (!tutorialAlgorithm) return null

  const id = normalizeSearchText(tutorialAlgorithm.id)
  const name = normalizeSearchText(tutorialAlgorithm.name)
  const nicknames = Array.isArray(tutorialAlgorithm.nicknames)
    ? tutorialAlgorithm.nicknames.map(normalizeSearchText).filter(Boolean)
    : []

  return (
    algorithms.find((algorithm) => normalizeSearchText(algorithm.name) === name) ||
    algorithms.find((algorithm) => getSearchNames(algorithm).includes(name)) ||
    algorithms.find((algorithm) => nicknames.some((nickname) => getSearchNames(algorithm).includes(nickname))) ||
    algorithms.find((algorithm) => normalizeSearchText(algorithm.id) === id) ||
    null
  )
}
