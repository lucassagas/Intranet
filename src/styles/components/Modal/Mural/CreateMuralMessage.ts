import { Form } from '@unform/web'
import styled from 'styled-components'

export const Container = styled(Form)`
  width: 90%;
  margin: 1.2rem auto 2rem;
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 1.4rem 0;

  gap: 0.6rem;

  > div {
    margin: 0;
  }

  > button {
    margin: 0;
  }

  &:last-child {
    margin: 1.4rem 0;
  }
`

export const CustomSelect = styled.select`
  background: var(--darkgray);
  border-radius: 10px;
  padding: 10px;
  max-height: 40px;

  border: 1px solid var(--gray);
  color: var(--white);

  display: flex;
  align-items: center;
`
