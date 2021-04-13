import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled(Form)`
  width: 100%;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;
  }
`

export const Wrapper = styled.div`
  width: 90%;
  margin: 1.2rem auto;

  display: flex;

  gap: 1rem;
`
