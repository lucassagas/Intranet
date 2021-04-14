import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'

import Cookie from 'js-cookie'
import { useToast } from '../hooks/toast'

export default function withAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: unknown) => {
    const router = useRouter()
    const { addToast } = useToast()

    useEffect(() => {
      const token = Cookie.get('intranet-token')
      if (!token) {
        router.replace('/signin')
        addToast({
          type: 'info',
          title: 'Sessão expirada',
          description:
            'Sua sessão foi expirada, por favor faça o login novamente.'
        })
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}
