import { ButtonHTMLAttributes, ReactNode } from 'react'

import { Container } from '../styles/components/Button'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  )
}
