import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  top: 0;

  bottom: 0;
  left: 1.2rem;
  right: 0;
  z-index: 2;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  > h2 {
    font-size: 2rem;
  }

  > p {
    font-size: 1rem;
    margin-top: 2rem;
  }
`
