import styled, { css } from 'styled-components'

export const Scroll = styled.div`
  max-height: calc(100% - 60px);
  overflow: auto;
  background: var(--darkgray);
  padding: 1rem;

  th:last-child {
    text-align: center;
  }

  td:last-child button {
    padding: 0 1rem;
    background: none;
    border: 0;
  }

  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--black);
    border-radius: 6px;
  }
`

export const WrapperFilter = styled.div`
  position: absolute;
  bottom: 10px;

  display: flex;

  width: 97%;
  height: 40px;

  align-items: center;
  justify-content: flex-start;
  background: var(--darkgray);

  gap: 0.5rem;

  > button:last-child {
    max-width: 200px;
    height: 30px;
    margin-top: -1px;
  }

  > form {
    position: relative;
    flex: 1;
    > div {
      height: 30px;
      flex: 1;
    }

    > button {
      position: absolute;

      right: 7px;
      top: 5px;

      border: 0;
      background: none;

      > svg {
        background: var(--darkgray);
      }
    }
  }
`
