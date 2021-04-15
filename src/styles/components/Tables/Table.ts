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

    position: sticky;
    top: -20px;
    height: 40px;

    padding: 0 1rem 0 0;
    background: var(--darkgray);
    &:first-child {
      padding-left: 5px;
    }
  }

  td {
    text-transform: uppercase;
    padding: 0.8rem 1rem 0.8rem 0;

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
