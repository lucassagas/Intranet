import { createContext, ReactNode, useContext, useState } from 'react'
import { LoadingScreen } from '../components/Loadings/LoadingScreen'

interface LoadingContextData {
  loadingScreen: boolean
  setLoadingScreen: (state: boolean) => void
  loadingButton: boolean
  setLoadingButton: (state: boolean) => void
}

interface LoadingProviderProps {
  children: ReactNode
}

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData
)

function LoadingProvider({ children }: LoadingProviderProps) {
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  return (
    <LoadingContext.Provider
      value={{
        loadingScreen,
        setLoadingScreen,
        loadingButton,
        setLoadingButton
      }}
    >
      {children}
      {loadingScreen && <LoadingScreen />}
    </LoadingContext.Provider>
  )
}

function useLoading(): LoadingContextData {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error('useLoading must be used within an LoadingProvider')
  }

  return context
}

export { LoadingProvider, useLoading }
