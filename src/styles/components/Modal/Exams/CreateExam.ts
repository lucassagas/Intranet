import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled(Form)`
  width: 100%;
  position: relative;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;
  }
`

export const WrapperInputs = styled.div`
  width: 90%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  flex-wrap: wrap;

  > section {
    display: flex;

    gap: 20px;

    margin: 10px 0;
  }
`
