import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled(Form)`
  width: 100%;

  > div {
    width: 90%;
    margin: 20px auto;

    display: flex;

    gap: 20px;
  }

  > button {
    border-radius: 0 0 0.6rem 0.6rem;
  }
`
