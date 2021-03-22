import { ReactNode } from 'react'

interface HeaderProps {
  category: string
  route: string
  children?: ReactNode
}

import { Container } from '../styles/components/Header'

export function Header({ children, category, route }: HeaderProps) {
  return (
    <Container>
      <div>
        <h1>{category}</h1>
        <h2> {'>'} </h2>
        <strong>{route}</strong>
      </div>
      <div>{children}</div>
    </Container>
  )
}
