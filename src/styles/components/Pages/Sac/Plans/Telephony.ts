import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
`

export const Wrapper = styled(Form)`
  display: flex;

  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  margin: 1.1rem auto;

  > button {
    max-width: 200px;
    margin: 0;
  }
`

export const Comments = styled.div`
  margin-top: 1rem;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    padding: 0.5rem 0;

    border-bottom: 1px solid var(--orange);

    > button {
      border: 0;
      background: none;
    }

    & + div {
      margin-top: 1rem;
    }
  }
`
export const Actions = styled.div`
  width: 100%;

  display: flex;

  align-items: center;
  justify-content: center;
  gap: 20px;

  > button {
    padding: 0.2rem 1rem;
    background: var(--orange);
    border: 0;
    border-radius: 0.2rem;

    & + button {
      background: transparent;
      border: solid 1px var(--danger);
      color: var(--danger);
      transition: all 0.3s;

      &:hover {
        background: var(--danger);
        color: var(--white);
      }
    }
  }
`
