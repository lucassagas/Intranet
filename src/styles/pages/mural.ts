import styled from 'styled-components'

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

interface ScrollProps {
  permission: boolean
}

export const Scroll = styled.div<ScrollProps>`
  max-height: ${props => (props.permission ? 'calc(100% - 50px)' : '100%')};
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

export const WrapperFilter = styled.div`
  position: absolute;
  bottom: 0px;
  padding-bottom: 0.8rem;

  display: flex;

  width: 97%;
  height: 40px;

  align-items: center;
  justify-content: flex-start;
  background: var(--darkgray);

  gap: 2rem;

  > button:last-child {
    max-width: 200px;
    height: 30px;
    margin-top: -1px;
    margin-left: auto;
  }
`

export const Message = styled.div`
  width: 100%;

  border-bottom: solid 2px var(--orange);
  padding: 1rem 0;

  > header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > a {
      text-decoration: none;
      color: #fff;
      font-size: 1.4rem;
    }

    > button {
      background: none;
      border: 0;
    }
  }

  > p {
    margin-top: 1rem;
  }
`
