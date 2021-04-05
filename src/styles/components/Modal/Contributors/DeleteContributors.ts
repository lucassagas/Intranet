import styled from 'styled-components'

export const Container = styled.div`
  > button {
    border-radius: 0 0 0.6rem 0.6rem;
    background: var(--danger);
  }
`

export const Wrapper = styled.div`
  width: 90%;
  margin: 20px auto;

  > section {
    display: flex;

    > strong {
      margin-right: 10px;
    }
  }

  > p {
    margin-top: 20px;
  }
`
