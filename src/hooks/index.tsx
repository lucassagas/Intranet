import { ReactNode, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThemeName, themes } from '../styles/theme'
import { AuthProvider } from './auth'
import { LoadingProvider } from './loading'
import { ModalProvider } from './modal'
import { ToastProvider } from './toast'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [themeName] = useState<ThemeName>('dark')
  const currentTheme = themes[themeName]
  return (
    <ToastProvider>
      <LoadingProvider>
        <AuthProvider>
          <ThemeProvider theme={currentTheme}>
            <ModalProvider>{children}</ModalProvider>
          </ThemeProvider>
        </AuthProvider>
      </LoadingProvider>
    </ToastProvider>
  )
}
