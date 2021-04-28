import { useRouter } from 'next/router'

import { Button } from '../Button'

import { Container } from '../../styles/components/Errors/RemainingErrors'

interface ErrorsProps {
  error: number
}

export function RemainingErrors({ error }: ErrorsProps) {
  const router = useRouter()

  return (
    <Container>
      <h2>Oops!</h2>
      <h1>Tivemos um erro! {error}</h1>
      <span>
        Por favor, reinicie a página, caso o problema <br /> persista contate um
        administrador.
      </span>

      <Button onClick={() => router.replace('/')} type="button">
        Voltar para o início
      </Button>
    </Container>
  )
}
