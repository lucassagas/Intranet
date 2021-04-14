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
import { useLoading } from './loading'

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
  permissions: any
}

interface AuthProviderData {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderData) {
  const [user, setUser] = useState<UserProps>()
  const [permissions, setPermissions] = useState<string[]>()

  const { addToast } = useToast()
  const router = useRouter()
  const { setLoadingButton } = useLoading()

  useEffect(() => {
    function loadingStorageData() {
      const token = Cookie.get('intranet-token')
      const user = Cookie.get('intranet-user')

      if (user && token) {
        setUser(JSON.parse(user))
        api.defaults.headers.tokenaccess = token

        const { user_id } = JSON.parse(user)
        let permissions = []

        api.get(`api/permission/user?id_user=${user_id}`).then(response => {
          response.data.map(permission => {
            permissions.push(permission.perm_name)
          })
        })

        setPermissions(permissions)
      }
    }

    loadingStorageData()
  }, [])

  const handleSignIn = useCallback(({ email, password }: SignInProps) => {
    setLoadingButton(true)
    api
      .post('api/auth', { email, password })
      .then(response => {
        const { user, token } = response.data
        setUser(user)

        Cookie.set('intranet-token', token, { expires: 1 })
        Cookie.set('intranet-user', JSON.stringify(user), { expires: 1 })

        api.defaults.headers.tokenaccess = token

        let permissions = []

        api
          .get(`api/permission/user?id_user=${user.user_id}`)
          .then(response => {
            response.data.map(permission => {
              permissions.push(permission.perm_name)
            })
          })

        setPermissions(permissions)

        router.push('/')
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: err.response ? err.response.data.message : err.message
        })
      })
      .finally(() => setLoadingButton(false))
  }, [])

  const handleSignOut = useCallback(() => {
    Cookie.remove('intranet-token')
    Cookie.remove('intranet-user')
    setPermissions([])

    router.push('/signin')
  }, [])

  return (
    <AuthContext.Provider
      value={{ handleSignIn, handleSignOut, user, permissions }}
    >
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
