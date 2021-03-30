import { ButtonHTMLAttributes, ReactNode } from 'react'
import { useLoading } from '../hooks/loading'

import { Container } from '../styles/components/Button'
import { LoadingButton } from './Loadings/LoadingButton'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  const { loadingButton } = useLoading()
  return (
    <Container type="button" {...rest}>
      {loadingButton ? <LoadingButton /> : children}
    </Container>
  )
}
