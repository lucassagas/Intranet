import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Overlay = styled(motion.div)`
  position: fixed;

  width: 100vw;
  height: 100vh;

  top: 0;
  left: 0;
  backdrop-filter: blur(1.5px);
  z-index: 10;

  background: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;
`

interface ModalBoxProps {
  size: number
}

export const Modalbox = styled(motion.div)<ModalBoxProps>`
  background: var(--darkgray);
  max-width: ${props => props.size}px;
  width: 100%;

  border-radius: 0.4rem;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;

    padding-top: 1.5rem;
    padding-bottom: 0.5rem;

    margin: 0 auto;

    border-bottom: 1px solid var(--mediumgray);

    > svg {
      cursor: pointer;
      transition: color 0.2s;
      &:hover {
        color: var(--error);
      }
    }
  }
`
