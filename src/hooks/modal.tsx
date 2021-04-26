import { createContext, ReactNode, useContext, useState } from 'react'

interface ModalContextData {
  displayModal: any
  setDisplayModal(data: any[]): void
}

interface ModalProviderProps {
  children: ReactNode
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

function ModalProvider({ children }: ModalProviderProps) {
  const [displayModal, setDisplayModal] = useState<any[]>([])

  return (
    <ModalContext.Provider value={{ displayModal, setDisplayModal }}>
      {children}
    </ModalContext.Provider>
  )
}

function useModal(): ModalContextData {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within an ModalProvider')
  }

  return context
}

export { ModalProvider, useModal }
