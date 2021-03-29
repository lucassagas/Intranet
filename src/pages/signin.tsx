import logoImg from '../assets/logo.png'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { useCallback, useRef } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Container, Wrapper, DevelopedWrapper } from '../styles/pages/sigin'

import { FaRegUser, BiLockAlt } from '../styles/icons'
import Head from 'next/head'
import { useAuth } from '../hooks/auth'
import { getValidationErrors } from '../utils/getValidationErrors'
import { FormHandles } from '@unform/core'

function SignIn() {
  const { handleSignIn } = useAuth()
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async data => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um email válido')
          .required('Campo obrigatório'),
        password: Yup.string().required('Campo obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      handleSignIn(data)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current.setErrors(errors)

        return
      }
    }
  }, [])

  return (
    <Container>
      <Head>
        <title>Intranet | Login</title>
      </Head>

      <Wrapper>
        <h1>
          Seja Bem-vindo <br /> a nova
        </h1>
        <img src={logoImg} alt="Logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FaRegUser} name="email" placeholder="Usuário" />
          <Input
            icon={BiLockAlt}
            name="password"
            placeholder="Password"
            password
          />
          <Button type="submit">Entrar</Button>
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
