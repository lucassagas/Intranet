import styled from 'styled-components'

export const Container = styled.div`
  display: relative;

  width: 100%;
`

export const Content = styled.div`
  margin-right: 20px;
  max-height: calc(100vh - 90px);
  height: 100%;

  border-radius: 1rem;

  padding: 1rem;

  background: var(--darkgray);

  position: relative;
`

export const Scroll = styled.div`
  max-height: calc(100% - 40px);
  overflow: auto;
  background: var(--darkgray);

  > table thead tr th:last-child {
    text-align: center;
  }

  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--background);
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

  gap: 2rem;

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

    > svg {
      position: absolute;

      right: 7px;
      top: 5px;
      background: var(--darkgray);
    }
  }
`
