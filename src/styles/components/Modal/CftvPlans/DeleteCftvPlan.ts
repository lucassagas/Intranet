import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  > div {
    width: 90%;

    margin: 1.2rem auto;

    > section {
      margin-bottom: 1rem;
    }
  }

  > button {
    border-radius: 0 0 0.6rem 0.6rem;
    background: var(--danger);
  }
`
