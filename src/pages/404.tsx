import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import backgroundImg from '../assets/bg404.png'
import { Button } from '../components/Button'

export default function NotFoundPage() {
  const router = useRouter()

  const Container = styled.div`
    width: 100vw;
    height: 100vh;

    position: fixed;
    z-index: 10;

    background-image: url(${backgroundImg});
    background-size: cover;

    display: flex;
    justify-content: center;
    flex-direction: column;

    padding-left: 4rem;

    > h1 {
      font-size: 7rem;
      font-weight: 800;
    }

    > span {
      font-size: 2rem;
    }

    > button {
      max-width: 400px;
      margin-top: 3rem;
      font-size: 1.3rem;
      font-weight: 400;
    }
  `

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
