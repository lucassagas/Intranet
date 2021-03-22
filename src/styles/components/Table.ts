import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding-bottom: 10px;
    &:first-child {
      padding-left: 5px;
    }
  }

  td {
    text-transform: uppercase;
    padding: 10px 0;

    &:first-child {
      border-radius: 6px 0 0 6px;
      padding-left: 5px;
    }

    &:last-child {
      border-radius: 0 6px 6px 0;
    }
  }

  tbody tr:hover {
    background: var(--darkgrayhover);
  }
`
