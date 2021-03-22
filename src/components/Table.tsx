import { ReactNode } from 'react'

import { StyledTable } from '../styles/components/Table'

interface TableProps {
  ths: Array<string>
  children: ReactNode
}

export function Table({ ths, children }: TableProps) {
  return (
    <StyledTable>
      <thead>
        <tr>
          {ths.map(th => {
            return <th key={th}>{th}</th>
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </StyledTable>
  )
}
