import styled, { css } from 'styled-components'

export const Container = styled.div`
  width: 100%;

  > form {
    > div {
      width: 90%;
      margin: 20px auto 10px;
    }

    > button {
      border-radius: 0 0 6px 6px;
    }
  }
`

interface WrapperOptionsProps {
  isActive: boolean
  openedGroup: boolean
}

export const WrapperOptions = styled.div<WrapperOptionsProps>`
  width: 100%;
  padding: 0.3rem 1rem 0rem 1rem;

  background: var(--gray3);
  margin: 1rem 0;

  border-radius: 1rem;

  > div {
    display: flex;
    margin: 1rem 0;
    &:first-child {
      font-weight: 600;
      cursor: pointer;
    }

    span {
      display: flex;
      width: 80px;
      align-items: center;
      justify-content: center;

      > svg {
        transition: all 0.3s;

        ${props => props.openedGroup && 'transform: rotate(180deg);'}
      }

      &:first-child {
        flex: 1;
        justify-content: flex-start;
        display: flex;
        gap: 10px;
        text-transform: uppercase;
      }
    }
  }
`

interface StyledOptionProps {
  isActive: boolean
}

export const StyledOption = styled.button<StyledOptionProps>`
  width: 20px;
  height: 20px;
  transition: all 0.3s;
  ${props =>
    props.isActive
      ? css`
          background: var(--orange);
          border: 0;
        `
      : css`
          background: transparent;
          border: solid 1px var(--gray);
        `}

  border-radius: 2px;
`

interface SubGroups {
  openedGroup: boolean
}

export const SubGroups = styled.div<SubGroups>`
  width: 100%;
  display: flex;

  ${props =>
    props.openedGroup
      ? css`
    max-height: 600px;
    transition: max-height: 0.4s ease-in;
  `
      : css`
    max-height: 0;
    transition: max-height: 0.4s ease-out;
  `};
  flex-direction: column;
  overflow: hidden;
  transition: max-height 0.3s;

  > div {
    display: flex;
    margin: 1rem 0;
    padding: 5px 0;
    &:first-child {
      cursor: pointer;
    }

    span {
      display: flex;
      width: 80px;
      align-items: center;
      justify-content: center;

      &:first-child {
        flex: 1;
        justify-content: flex-start;
        display: flex;
        gap: 10px;
      }
    }
  }
`

interface MainButtonProps {
  isActive: boolean
}

export const MainButton = styled.button<MainButtonProps>`
  transition: all 0.3s;
  width: 18px;
  height: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isActive
      ? css`
          border: 0;
          background: var(--orange);
        `
      : css`
          border: solid 1px var(--gray);
          background: transparent;
        `}

  border-radius: 2px;
  margin-top: -2px;
  cursor: pointer;
`
