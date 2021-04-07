import styled from 'styled-components'

interface ContainerProps {
  isEditable: boolean
}

export const Container = styled.table<ContainerProps>`
  width: 100%;

  border: solid 2px var(--orange);

  border-radius: 1rem;
  overflow: hidden;

  border-spacing: 0;

  tbody {
  }

  thead th {
    background: var(--orange);
    padding: 0.9rem;
    text-transform: capitalize;

    &:not(:last-child) {
      border-right: 1px solid var(--gray);
    }

    > button {
      background: none;
      border: 0;
      margin-left: 10px;
    }
  }

  tr {
    background: var(--grayPriceTable);
    &:nth-child(odd) {
      background: var(--black);
    }

    td {
      height: 2.9em;
      padding: 0.5rem 0;

      text-align: center;

      border-spacing: 20px;
      text-transform: capitalize;

      cursor: ${props => props.isEditable && 'pointer'};

      &:not(:last-child) {
        border-right: 1px solid var(--gray);
      }
    }
  }
`
