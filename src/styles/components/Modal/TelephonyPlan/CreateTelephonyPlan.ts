import { Form } from '@unform/web'
import styled, { css } from 'styled-components'

export const Container = styled(Form)`
  width: 100%;

  > button {
    border-radius: 0 0 0.6rem 0.6rem;
  }
`

export const Content = styled.div`
  width: 90%;
  margin: 1.2rem auto;

  > section {
    display: flex;
    gap: 20px;
    margin-top: 1.2rem;

    width: 100%;

    &:last-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`

interface BenefitButton {
  active?: boolean
}

export const BenefitButton = styled.button<BenefitButton>`
  border: solid 1px ${props => (props.active ? 'var(--orange)' : 'var(--gray)')};
  background: transparent;

  padding: 0.4rem 0.4rem;

  border-radius: 0.4rem;

  position: relative;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: calc(100% + 5px);
    height: 100%;

    position: absolute;

    background: var(--orange);

    transition: max-width 0.3s;

    ${props =>
      props.active
        ? css`
            max-width: 200px;
          `
        : css`
            max-width: 0;
          `}
  }

  > span {
    position: relative;
    z-index: 1;
  }
`
