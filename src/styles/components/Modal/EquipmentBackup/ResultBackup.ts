import styled from 'styled-components'

export const Container = styled.div`
  width: 90%;
  margin: 1.2rem auto;

  max-height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--background);
    border-radius: 4px;
  }
`
