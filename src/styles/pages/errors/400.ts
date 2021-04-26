import styled from 'styled-components'
import backgroundImg from '../../../assets/bg404.png'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  z-index: 10;

  background-image: url(${backgroundImg});
  background-size: cover;

  display: flex;
  justify-content: center;
  flex-direction: column;

  padding-left: 4rem;

  > h1 {
    font-size: 7rem;
    font-weight: 800;
  }

  > span {
    font-size: 2rem;
  }

  > button {
    max-width: 400px;
    margin-top: 3rem;
    font-size: 1.3rem;
    font-weight: 400;
  }
`
