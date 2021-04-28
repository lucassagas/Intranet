import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  position: relative;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;
    background: var(--danger);
  }
`

export const Wrapper = styled.div`
  width: 90%;
  margin: 1.2rem auto;

  > strong {
    display: block;
    margin-bottom: 0.4rem;
  }
`
