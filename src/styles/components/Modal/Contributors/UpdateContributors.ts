import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  > form {
    width: 100%;

    > button {
      border-radius: 0 0 0.6rem 0.6rem;
    }

    > div {
      width: 90%;
      margin: 0 auto;

      > button {
        background: none;
        border: solid 1px var(--danger);
        color: var(--danger);

        transition: all 0.3s;

        width: 300px;
        margin: 20px auto;

        &:hover {
          background: var(--danger);
          color: var(--white);
        }
      }
    }
  }
`

export const WrapperInput = styled.div`
  flex: 1;

  display: flex;

  margin-top: 20px;

  > section {
    margin-right: 18px;

    &:nth-child(3) {
      margin-right: 0;
    }
  }
`
