import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-area: W;
  position: relative;
  overflow: hidden;

  > footer {
    width: 100%;
    background: var(--background);
    height: 23px;
    position: absolute;

    z-index: 10;
    bottom: 0;

    border-radius: 0 0 0.4rem 0.4rem;
  }
`

export const Wrapper = styled.div`
  background: var(--background);
  border-radius: 0.4rem;
  padding: 3.3rem 1.5rem 1.5rem;

  max-height: 600px;
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

  > header {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 10;

    border-radius: 0.4rem 0.4rem 0 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    max-height: 50px;
    padding: 1.5rem 2rem;
    background: var(--background);

    > span {
      display: flex;
      align-items: center;
      gap: 10px;

      > button {
        background: transparent;
        border: 0;

        transition: text-decoration 0.3s;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`

interface WrapperMessagesProps {
  type: 'hight' | 'medium' | 'low'
  concluded: boolean
}

const severityVariations = {
  hight: css`
    background: var(--danger);
  `,
  medium: css`
    background: var(--purple);
  `,
  low: css`
    background: var(--yellow);
  `
}

export const WrapperMessage = styled.div<WrapperMessagesProps>`
  background: var(--darkgray);
  border-radius: 0.4rem;
  padding: 0.7rem;

  min-height: 160px;

  & + div {
    margin-top: 20px;
  }

  > header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      font-weight: 600;
      text-transform: capitalize;
      position: relative;
      display: flex;
      align-items: center;
      gap: 5px;

      &:first-child {
        &::after {
          content: '';
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border-radius: 2px;
          ${props => severityVariations[props.type]}
        }
      }

      &:last-child {
        &::before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 10px;
          background: ${props =>
            props.concluded ? 'var(--green)' : 'var(--danger)'};

          border-radius: 2px;
          margin-top: -3px;
        }
      }
    }
  }

  > strong {
    margin: 1rem 0;
    display: block;
  }

  > p + p {
    margin-top: 30px;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gray);
    border-radius: 4px;
  }
`

export const Scroll = styled.div`
  overflow: auto;
`
