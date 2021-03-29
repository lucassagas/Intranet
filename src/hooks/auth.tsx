import { createContext, ReactNode, useCallback, useContext } from 'react'
import { api } from '../services/api'
import { useToast } from './toast'

interface SignInProps {
  email: string
  password: string
}

interface AuthContextData {
  handleSignIn: (Credentials: SignInProps) => void
}

interface AuthProviderData {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderData) {
  const { addToast } = useToast()
  const handleSignIn = useCallback(({ email, password }: SignInProps) => {
    api
      .post('api/auth', { email, password })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: err.response.data.message
        })
      })
  }, [])

  return (
    <AuthContext.Provider value={{ handleSignIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
