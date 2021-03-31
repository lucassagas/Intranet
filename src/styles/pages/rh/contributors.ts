import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: relative;

  width: 100%;
`

export const Content = styled.div`
  margin-right: 20px;
  max-height: calc(100vh - 90px);
  height: 100%;

  border-radius: 1rem;

  padding: 1rem;

  background: var(--darkgray);

  position: relative;
`

export const WrapperFilter = styled.div`
  position: absolute;
  bottom: 10px;

  display: flex;

  width: 97%;
  height: 40px;

  align-items: center;
  justify-content: flex-start;

  gap: 2rem;

  > button:last-child {
    max-width: 200px;
    height: 30px;
    margin-top: -1px;
  }

  > form {
    position: relative;
    flex: 1;
    > div {
      height: 30px;
      flex: 1;
    }

    > svg {
      position: absolute;

      right: 7px;
      top: 5px;
      background: var(--darkgray);
    }
  }
`

interface ButtonFilterProps {
  isActive: boolean
}

export const ButtonFilter = styled.button<ButtonFilterProps>`
  border: 0;

  padding: 0.4rem;

  border: 0;
  background: transparent;
  position: relative;

  display: flex;
  align-items: center;

  > div {
    width: 12px;
    height: 12px;
    border-radius: 2px;

    margin-right: 10px;

    transition: all 0.3s;

    ${props =>
      props.isActive
        ? css`
            background: var(--orange);
            border: 0;
          `
        : css`
            background: transparent;
            border: 1px solid var(--gray);
          `}

    &:first-child {
      margin-right: 10px;
    }
  }
`
