import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled(Form)`
  width: 100%;
  > button {
    border-radius: 0 0 0.6rem 0.6rem;
  }

  > section {
    display: flex;
    width: 90%;
    margin: auto;
    gap: 1rem;
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

      &:first-child {
        background: var(--orange);
        border: solid 1px var(--orange);

        transition: all 0.3s;

        width: 300px;
        margin: 20px auto;
        border-radius: 0.6rem;
      }
    }
  }
`

export const Wrapper = styled.div`
  width: 90%;

  margin: 1rem auto;

  gap: 1rem;

  display: flex;
`
