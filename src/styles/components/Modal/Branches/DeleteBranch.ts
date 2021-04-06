import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;
    background: var(--danger);
  }

  > div {
    width: 90%;
    margin: 20px auto;

    > section {
      margin: 20px 0;
    }
  }
`
