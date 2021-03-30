import styled from 'styled-components'

export const Container = styled.button`
  background: var(--orange);
  height: 40px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: var(--white);
  width: 100%;
  font-weight: 700;
  margin-top: 16px;
  transition: opacity 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: brightness(0.9);
  }
`
