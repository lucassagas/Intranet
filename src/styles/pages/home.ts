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

  display: grid;

  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1.2fr 1fr 1fr 1fr;

  @media (max-width: 1440px) {
    grid-template-rows: 1.8fr 1fr 1fr 1fr;
  }

  grid-gap: 20px;

  overflow: hidden;

  grid-template-areas:
    'M C'
    'W C'
    'W R'
    'W R';
`
