import { Form } from '@unform/web'
import styled, { css } from 'styled-components'

export const Container = styled(Form)`
  width: 100%;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;

    &.deleteButton {
      background: none;
      border: solid 1px var(--danger);
      color: var(--danger);

      transition: all 0.3s;

      width: 300px;
      margin: 1.2rem auto;
      border-radius: 0.6rem;

      &:hover {
        background: var(--danger);
        color: var(--white);
      }
    }
  }
`

export const Wrapper = styled.div`
  width: 90%;

  margin: 0.6rem auto 0;

  > section {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;

    &:first-child {
      margin: 0.5rem 0;
    }
  }
`

interface ButtonStartBackupProps {
  accessGranted?: string
}

const backgroundVariations = {
  initial: css`
    background: var(--orange);
  `,

  granted: css`
    background: var(--green);
  `,

  denied: css`
    background: var(--danger);
  `
}

export const ButtonStartBackup = styled.button<ButtonStartBackupProps>`
  padding: 0.3rem 0.5rem;
  transition: all 0.2s;
  ${props => backgroundVariations[props.accessGranted]}
  border: 0;
  border-radius: 0.4rem;

  &.StaticBG {
    background: var(--orange);
  }

  &:hover {
    filter: brightness(0.9);
  }
`
