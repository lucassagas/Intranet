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
  overflow: hidden;

  background: var(--darkgray);

  position: relative;
`

export const Scroll = styled.div`
  max-height: 100%;
  overflow: auto;
  background: var(--darkgray);
  padding: 1rem;

  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--black);
    border-radius: 6px;
  }
`

interface CategoryButtonProps {
  active?: boolean
}

export const CategoryButton = styled.button<CategoryButtonProps>`
  position: relative;
  width: 10rem;
  border-radius: 0.4rem;
  background: transparent;

  padding: 0.2rem;

  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.4s;
  overflow: hidden;

  & + button {
    margin-left: 20px;
  }

  > span {
    z-index: 1;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  > div {
    background: var(--orange);
    height: 100%;
    width: calc(100% + 5px);
    position: absolute;

    transition: all 0.3s;
  }

  ${props =>
    props.active
      ? css`
          > div {
            max-width: 200px;
          }
          color: var(--white);
          border: 0;
          border: 1px solid var(--orange);
        `
      : css`
          > div {
            max-width: 0;
          }
          color: var(--gray);
          border: 1px solid var(--gray);
        `}
`
