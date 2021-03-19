import logoImg from '../assets/logo.png'
import { Form } from '@unform/web'
import { useCallback } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Container, Wrapper, DevelopedWrapper } from '../styles/pages/sigin'

import { FaRegUser, BiLockAlt } from '../styles/icons'

function SignIn() {
  const handleSubmit = useCallback(async data => {
    console.log(data)
  }, [])

  return (
    <Container>
      <Wrapper>
        <h1>
          Seja Bem-vindo <br /> a nova
        </h1>
        <img src={logoImg} alt="Logo" />

        <Form onSubmit={handleSubmit}>
          <Input icon={FaRegUser} name="user" placeholder="Usuário" />
          <Input
            icon={BiLockAlt}
            name="password"
            placeholder="Password"
            password
          />
          <Button>Entrar</Button>
        </Form>

        <DevelopedWrapper>
          <div />

          <p>Developed by:</p>
          <strong>
            Lucas Sagás, Marcelo Rabelo, <br /> Isaque Santos.
          </strong>
        </DevelopedWrapper>
      </Wrapper>
    </Container>
  )
}

export default SignIn
