import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;

    background: var(--danger);
  }
`

export const Wrapper = styled.div`
  width: 90%;

  margin: 20px auto;

  > strong {
    font-weight: 600;
  }

  > p {
    font-size: 1.2rem;
    margin-top: 10px;
  }
`
