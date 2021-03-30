import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from '../services/api'
import { useToast } from './toast'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'

interface SignInProps {
  email: string
  password: string
}

interface UserProps {
  user_id: number
  user_name: string
}

interface AuthContextData {
  handleSignIn: (Credentials: SignInProps) => void
  handleSignOut: () => void
  user: UserProps
}

interface AuthProviderData {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderData) {
  const [user, setUser] = useState<UserProps>()

  const { addToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    function loadingStorageData() {
      const token = Cookie.get('intranet-token')
      const user = Cookie.get('intranet-user')

      if (user) {
        setUser(JSON.parse(user))

        api.defaults.headers.tokenaccess = token
      }
    }

    loadingStorageData()
  }, [])

  const handleSignIn = useCallback(({ email, password }: SignInProps) => {
    api
      .post('api/auth', { email, password })
      .then(response => {
        const { user, token } = response.data

        setUser(user)

        Cookie.set('intranet-token', token, { expires: 1 })
        Cookie.set('intranet-user', JSON.stringify(user), { expires: 1 })

        api.defaults.headers.tokenaccess = token

        router.push('/')
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: err.response.data.message
        })
      })
  }, [])

  const handleSignOut = useCallback(() => {
    Cookie.remove('intranet-token')
    Cookie.remove('intranet-user')

    router.push('/signin')
  }, [])

  return (
    <AuthContext.Provider value={{ handleSignIn, handleSignOut, user }}>
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
