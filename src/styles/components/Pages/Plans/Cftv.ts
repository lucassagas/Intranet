import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled.div``

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
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    padding: 0.5rem 0;

    border-bottom: 1px solid var(--orange);

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

export const WrapperBenefit = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  > section {
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--grayPriceTable);

    width: 100%;

    gap: 0.5rem;

    padding: 1rem 0.2rem;
    border-radius: 0.2rem;

    margin: 1.5rem 0 0.5rem;
  }
`
