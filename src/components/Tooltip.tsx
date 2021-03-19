import { ReactNode } from 'react'

import { Container } from '../styles/components/Tooltip'

interface TooltipsProps {
  title: string
  className?: string
  children: ReactNode
}

export function Tooltip({ title, className = '', children }: TooltipsProps) {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  )
}
