import styled from 'styled-components'

export const Container = styled.div`
  background: var(--background);
  border-radius: 0.4rem;
  padding: 0.4rem 1.5rem;
  max-height: 200px;

  position: relative;

  display: grid;
  grid-area: M;

  > header {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    max-height: 40px;

    > span {
      display: flex;
      align-items: center;
      gap: 10px;

      > button {
        background: transparent;
        border: 0;

        transition: text-decoration 0.3s;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`

export const Wrapper = styled.div`
  background: var(--darkgray);
  border-radius: 0.4rem;
  padding: 0.7rem;

  overflow: auto;

  position: absolute;

  top: 50px;

  left: 0.8rem;
  right: 0.8rem;
  bottom: 0.8rem;

  > p {
    margin-top: 1.5rem;
    font-size: 1rem;
    font-weight: 300;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gray);
    border-radius: 4px;
  }
`
