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

  .deleteButton {
    background: transparent;

    transition: all 0.3s;

    border-radius: 0.6rem;

    border: solid 1px var(--danger);
    color: var(--danger);
    width: 200px;

    margin: 0 auto;

    &:hover {
      background: var(--danger);
      color: var(--white);
    }
  }
`
