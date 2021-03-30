import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;

  height: 50px;
  background: var(--background);

  padding: 0 50px 0 17px;

  > div {
    display: flex;
    align-items: center;

    > h1 {
      color: var(--gray);
      font-size: 1.5rem;
    }

    > h2 {
      margin: 5px 10px 0;
      color: var(--gray);
      font-weight: 400;
      font-size: 1rem;
    }

    > strong {
      margin-top: 5px;
    }

    & + div {
      margin-left: auto;
    }
  }
`
