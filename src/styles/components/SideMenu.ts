import styled from 'styled-components'

import { motion } from 'framer-motion'

export const Container = styled.div`
  max-width: 294px;
  width: 100%;
  height: 100vh;

  border-right: 1px solid #fff;

  > header {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > strong {
      margin-top: 0.46rem;
    }

    padding: 3.5rem 0;
    > img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

  > nav {
    width: 100%;
    max-height: 70vh;
    overflow: auto;

    height: 100%;

    > ul {
      list-style: none;
    }
  }

  > img {
    margin-left: 1.8rem;
  }
`

interface LiProps {
  isCategory?: boolean
}

export const Li = styled.li<LiProps>`
  display: flex;
  width: 100%;
  align-items: center;

  margin-bottom: 0.6rem;

  padding: 0 1.8rem;

  border-left: 4px solid var(--orange);

  > svg {
    color: var(--gray);
  }
`

interface MenuOptionsProps {
  isActive?: boolean
}

export const MenuOption = styled.a<MenuOptionsProps>`
  text-decoration: none;
  margin: 0.3rem 0;

  position: relative;

  color: var(--gray);

  padding: 0.6rem 0.6rem;

  font-size: 1.2rem;

  width: 100%;
  font-weight: 600;

  display: flex;
  align-items: flex-end;

  border-radius: 0.4rem;

  cursor: pointer;

  background: ${props => (props.isActive ? 'var(--darkgray)' : 'transparent')};

  svg:first-child {
    margin-right: 1.4rem;
  }

  svg + svg {
    margin-left: auto;

    transition: transform 0.2s;

    transform: ${props => (props.isActive ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  &:hover {
    background: var(--darkgray);
  }
`

export const SubMenu = styled(motion.div)`
  position: absolute;
  width: 100%;
  left: 0;
  top: 90%;

  background: var(--darkgray);
  border-radius: 0 0 0.4rem 0.4rem;

  z-index: 1;
`
