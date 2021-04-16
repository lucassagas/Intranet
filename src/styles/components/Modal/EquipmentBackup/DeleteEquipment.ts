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
  margin: 1.2rem auto;

  > span {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;

    > p {
      margin-top: 0.4rem;
    }
  }
`
