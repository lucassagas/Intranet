import { ReactNode, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThemeName, themes } from '../styles/theme'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [themeName] = useState<ThemeName>('dark')
  const currentTheme = themes[themeName]
  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
}
