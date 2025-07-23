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

import { colors, typography, spacing, borderRadius, shadows, transitions } from '../../styles/designSystem'

const TabNavigation = ({ activeTab, onTabChange, tabs, selectedAlgorithm }) => {
  return (
    <div style={{
      display: 'flex',
      background: colors.neutral[100],
      borderRadius: borderRadius.xl,
      padding: spacing[1],
      marginBottom: spacing[4],
      border: `1px solid ${colors.border.light}`,
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            flex: 1,
            padding: `${spacing[3]} ${spacing[4]}`,
            background: activeTab === tab.id ? colors.background.primary : 'transparent',
            border: 'none',
            borderRadius: borderRadius.lg,
            cursor: 'pointer',
            transition: transitions.normal,
            boxShadow: activeTab === tab.id ? shadows.sm : 'none',
            borderColor: activeTab === tab.id ? colors.border.light : 'transparent',
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing[2],
          }}>
            {tab.icon && (
              <span style={{
                fontSize: typography.fontSize.lg,
                color: activeTab === tab.id ? colors.primary[600] : colors.neutral[500],
              }}>
                {tab.icon}
              </span>
            )}
            <span style={{
              fontSize: typography.fontSize.sm,
              fontWeight: activeTab === tab.id ? typography.fontWeight.semibold : typography.fontWeight.medium,
              color: activeTab === tab.id ? colors.neutral[900] : colors.neutral[600],
            }}>
              {tab.label}
              {/* Show indicator when algorithm is selected and we're on visual tab */}
              {tab.id === 'visual' && selectedAlgorithm && (
                <span style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: colors.primary[500],
                  marginLeft: spacing[1],
                  verticalAlign: 'middle',
                }} />
              )}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

export default TabNavigation 