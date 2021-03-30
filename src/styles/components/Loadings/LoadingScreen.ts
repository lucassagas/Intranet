import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  overflow: hidden;

  top: 0;
  left: 0;

  z-index: 10;

  background: rgba(0, 0, 0, 0.6);

  backdrop-filter: blur(1px);

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: 600px;
  }
`
