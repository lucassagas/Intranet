import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled(Form)`
  width: 100%;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;
  }

  > div {
    width: 90%;
    margin: 1.2rem auto;

    > div {
      margin-bottom: 1rem;
    }
  }
`
