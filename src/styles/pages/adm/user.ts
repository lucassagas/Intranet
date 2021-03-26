import styled from 'styled-components'

export const Container = styled.div`
  display: relative;

  width: 100%;
`

export const ButtonCategory = styled.button`
  background: var(--darkgray);
  border: 0;

  padding: 5px 15px;
  border-radius: 0.4rem;

  font-size: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;

  & + button {
    margin-left: 10px;
  }

  :hover {
    filter: brightness(0.7);
  }
`
