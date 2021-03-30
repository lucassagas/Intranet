import styled from 'styled-components'

import { motion } from 'framer-motion'

export const Container = styled.div`
  max-width: 200px;
  width: 100%;
  height: 100vh;

  > header {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > strong {
      margin-top: 0.5rem;
    }

    padding: 3.5rem 0;
    > img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }

  > nav {
    width: 100%;
    overflow: auto;
    min-height: 60vh;

    > ul {
      list-style: none;
    }
  }

  > img {
    margin-left: 1.5rem;
    position: absolute;
    bottom: 20px;

    width: 150px;
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

  padding: 0 0.5rem;
  border-left: solid 4px transparent;

  border-left: ${props =>
      props.isCategory ? '3px solid var(--orange);' : 'none'}
    > svg {
    color: var(--gray);
  }
`

interface MenuOptionsProps {
  isActive?: boolean
}

export const MenuOption = styled.a<MenuOptionsProps>`
  text-decoration: none;

  position: relative;

  color: var(--gray);

  padding: 0.6rem 0.6rem;

  font-size: 1rem;

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

interface SubMenuOptionsProps {
  isActive?: boolean
}

export const SubMenuOption = styled.span<SubMenuOptionsProps>`
  margin: 0.3rem 0;

  position: relative;

  color: var(--gray);

  padding: 0.6rem 0.6rem;

  font-size: 1rem;

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
