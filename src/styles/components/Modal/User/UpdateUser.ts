import styled from 'styled-components'

import { Form } from '@unform/web'

export const Container = styled(Form)`
  width: 100%;
  margin: 0.8rem auto 0;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;
  }
`

export const InputWrapper = styled.div`
  width: 90%;
  margin: 20px auto 0;

  > div {
    margin-bottom: 10px;
  }
`
