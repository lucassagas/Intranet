import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled(Form)`
  width: 100%;
  position: relative;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;

    &.deleteButton {
      background: none;
      border: solid 1px var(--danger);
      color: var(--danger);

      transition: all 0.3s;

      width: 300px;
      margin: 20px auto;
      border-radius: 0.6rem;

      &:hover {
        background: var(--danger);
        color: var(--white);
      }
    }
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
