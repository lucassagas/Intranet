import { useRouter } from 'next/router'
import React from 'react'

import { Button } from '../Button'

import { Container } from '../../styles/components/Errors/404'

export function NotFoundPage() {
  const router = useRouter()

  return (
    <Container>
      <h1>404</h1>
      <span>A página requerida não foi encontrada</span>

      <Button onClick={() => router.replace('/')} type="button">
        Voltar para o início
      </Button>
    </Container>
  )
}
