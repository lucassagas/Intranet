import styled, { css } from 'styled-components'
import { Tooltip } from '../../components/Tooltip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  width?: string
  theme?: string
  calendar?: boolean
  disabled?: boolean
}

interface LabelProps {
  disabled?: boolean
}

export const Label = styled.span<LabelProps>`
  color: ${props => (props.disabled ? 'var(--gray)' : 'var(--white)')};
  font-weight: 400;
  font-size: 0.8rem;
  display: block;
  padding-bottom: 3px;
`

export const Container = styled.div<ContainerProps>`
  background: var(--darkgray);
  border-radius: 10px;
  padding: 10px;
  max-height: 40px;

  ${props =>
    props.width
      ? css`
          width: ${props.width};
        `
      : css`
          width: '100%';
        `};

  border: 1px solid var(--gray);
  color: var(--white);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 15px;
  }

  svg {
    margin-right: 10px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--error);
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--orange);
      border-color: var(--orange);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--orange);
    `}

    input {
    background: transparent;
    border: 0;
    color: var(--white);
    width: 100%;
    flex: 1;

    cursor: ${props => props.disabled && 'not-allowed'};

    ::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }

    &::placeholder {
      color: var(--gray);
    }
  }

  > span {
    margin-right: -13px;
    margin-top: 5px;
    cursor: pointer;
  }
`
export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: var(--error);
    color: var(--white);

    &::before {
      border-color: var(--error) transparent;
    }
  }
`
