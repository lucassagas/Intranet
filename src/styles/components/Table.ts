import styled, { css } from 'styled-components'

interface TableProps {
  isEditable?: boolean
}

export const StyledTable = styled.table<TableProps>`
  width: 100%;
  border-collapse: collapse;
  background: var(--darkgray);

  ${props =>
    props.isEditable &&
    css`
      cursor: pointer;
    `}

  th {
    text-align: left;
    padding-bottom: 10px;
    position: sticky;
    top: 0;
    background: var(--darkgray);
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
