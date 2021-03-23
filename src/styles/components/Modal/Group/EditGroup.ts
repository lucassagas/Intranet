import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  > form {
    > div {
      width: 95%;
      margin: 20px auto 10px;
    }

    > button {
      border-radius: 0 0 6px 6px;
    }
  }
`

export const WrapperOptions = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  text-transform: uppercase;

  > h3 {
    font-size: 1rem;
    margin: 20px 0 0;

    &:after {
      content: '';
      display: inline-block;

      width: 100%;
      height: 2px;
      background: var(--orange);
      margin: 0px 0 20px 0;
    }
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
`

export const StyledOption = styled.button`
  padding: 5px;
  border: 0;

  border: solid 1px var(--gray);

  background: var(--darkgray);

  border-radius: 4px;
`
