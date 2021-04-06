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
