import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;

  gap: 0.5rem;
`

export const PrevButton = styled.button`
  min-width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;

  border: 0;
  padding: 0.1rem;

  border-radius: 0.4rem;
  font-weight: bold;
`

interface PaginateButtonProps {
  isActive: boolean
}

export const PaginateButton = styled.button<PaginateButtonProps>`
  min-width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isActive
      ? css`
          background: var(--orange);
          border: solid 1px var(--orange);
          &:hover {
            color: var(--white);
            border: solid 1px var(--orange);
          }
        `
      : css`
          background: transparent;
          border: solid 1px var(--white);

          &:hover {
            border: solid 1px var(--orange);
            color: var(--orange);
          }
        `}

  padding: 0.1rem;

  border-radius: 0.4rem;
  font-weight: bold;
`

export const NextButton = styled.button`
  min-width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;

  border: 0;
  padding: 0.1rem;

  border-radius: 0.4rem;
  font-weight: bold;
`
