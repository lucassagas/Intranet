import styled from 'styled-components'
import backgroundImg from '../../assets/background.png'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  z-index: 10;
  overflow: hidden;

  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 30%;

  padding: 2.31rem 3.06rem;
`

export const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
  height: 100%;

  padding: 1.2rem;

  background: var(--darkgray);

  border-radius: 1rem;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  position: relative;

  filter: drop-shadow(11px 15px 11px rgba(0, 0, 0, 0.25));

  > form {
    width: 100%;
    margin-top: 4rem;
  }

  > h1 {
    font-size: 2.4rem;
    font-weight: 300;
    margin-bottom: 0.7rem;
  }
`

export const DevelopedWrapper = styled.div`
  position: absolute;

  bottom: 1rem;

  > div {
    width: 80px;
    height: 2px;

    background: var(--white);
  }

  > p {
    font-size: 0.8rem;
    color: var(--white);

    margin-top: 2rem;
    margin-bottom: 0.3rem;
  }

  > strong {
    color: var(--gray);
    font-size: 0.9rem;
  }
`
