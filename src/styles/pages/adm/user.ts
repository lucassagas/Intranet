import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: relative;

  width: 100%;
`

export const ButtonCategory = styled.button`
  background: var(--darkgray);
  border: 0;

  padding: 5px 15px;
  border-radius: 0.4rem;

  font-size: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;

  & + button {
    margin-left: 10px;
  }

  :hover {
    filter: brightness(0.7);
  }
`

export const Content = styled.div`
  margin-right: 20px;
  height: 90%;

  border-radius: 1rem;

  padding: 1rem;

  background: var(--darkgray);

  position: relative;
  box-sizing: border-box;
`

export const Wrapper = styled.div`
  height: 95%;
`

export const CategoryList = styled.div`
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
`

interface SectionProps {
  isActiveCategory: boolean
}

export const Section = styled.section<SectionProps>`
  width: 100%;
  display: flex;
  cursor: pointer;
  border: solid 1px var(--mediumgray);

  & + section {
    margin-top: -1px;
  }

  flex-direction: column;
  &:first-child {
    border-radius: 1rem 1rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 1rem 1rem;
  }

  > strong {
    overflow: hidden;
    width: 100%;
    padding: 1rem;
    transition: all 0.2s;
    ${props =>
      props.isActiveCategory
        ? css`
            background: var(--orange);

            > svg {
              transform: rotate(180deg);
            }
          `
        : css`
            background: transparent;

            > svg {
              transform: rotate(0deg);
            }
          `};

    display: flex;
    align-items: center;

    > svg {
      margin-left: 10px;
      transition: all 0.3s;
    }

    & + strong {
      margin-top: -1px;
    }
  }
`

interface PageProps {
  isActiveCategory: boolean
}

export const PageList = styled.div<PageProps>`
  display: flex;
  flex-direction: column;
  margin-top: -1px;
  cursor: pointer;
  transition: max-height 0.3s;
  ${props =>
    props.isActiveCategory
      ? css`
          max-height: 600px;
        `
      : css`
          max-height: 0;
        `};
  overflow: hidden;

  > strong {
    width: 100%;
    padding: 1rem 2rem;
    border-bottom: solid 1px var(--mediumgray);

    & + strong {
      margin-top: -1px;
    }
  }
`

interface PermissionList {
  isActivePage: boolean
}

export const PermissionList = styled.div<PermissionList>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: -1px;

  transition: max-height 0.3s;

  max-height: ${props => (props.isActivePage ? '600px' : '0')};
  overflow: hidden;

  > strong {
    padding-left: 3rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    background: transparent;
    border: 0;
    border-bottom: solid 1px var(--mediumgray);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.9rem;

    &:hover {
      background: var(--darkgrayhover);
    }

    > button {
      background: var(--danger);
      border: 0;
      padding: 0.6rem;
      width: 150px;
      margin-left: auto;
      margin-right: 20px;
      border-radius: 2px;
    }

    & + strong {
      margin-top: -1px;
    }
  }
`
interface TitlePage {
  isActivePage: boolean
}

export const TitlePage = styled.strong<TitlePage>`
  width: 100%;
  padding: 1rem 2rem;

  display: flex;
  align-items: center;

  & + strong {
    margin-top: -1px;
  }

  > svg {
    margin-left: 10px;
    transition: all 0.3s;

    ${props =>
      props.isActivePage
        ? css`
            transform: rotate(180deg);
          `
        : css`
            transform: rotate(0);
          `}
  }
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

  > table tbody tr td {
    cursor: pointer;
  }

  > button:last-child {
    max-width: 200px;
    height: 30px;
    margin-top: -1px;
    margin-left: -20px;
  }

  > form {
    position: relative;
    flex: 1;
    > div {
      height: 30px;
      width: 100%;
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

  &:last-child {
    margin-right: -1rem;
    background: red;
  }

  &:after {
    content: '';

    width: 12px;
    height: 12px;
    ${props =>
      props.isActive
        ? css`
            border: solid 1px var(--orange);
            background: var(--orange);
          `
        : css`
            border: solid 1px var(--white);
            background: transparent;
          `}
    border-radius: 0.2rem;

    position: absolute;
    transition: all 0.2s;

    left: -1rem;
  }
`

export const DeleteButton = styled.button`
  width: 150px;
  border: 0;
  background: var(--danger);
  padding: 0.6rem;

  border-radius: 2px;
`
