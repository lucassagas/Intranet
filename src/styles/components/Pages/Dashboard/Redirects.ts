import styled from 'styled-components'

export const Container = styled.div`
  background: var(--background);

  display: grid;
  grid-area: R;

  border-radius: 0.4rem;
`

export const Content = styled.div`
  padding: 1rem;

  > header {
    background: var(--darkgray);

    height: 5rem;

    border-radius: 0.4rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > span {
      display: flex;
      align-items: center;
      gap: 5px;

      &:first-child {
        margin-bottom: 0.8rem;
      }
    }
  }
`

export const Wrapper = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  @media (max-width: 1440px) {
    gap: 1rem;
    justify-content: center;
    height: 70%;
  }
`

export const ImageWrapper = styled.div`
  display: flex;

  gap: 3rem;
`
