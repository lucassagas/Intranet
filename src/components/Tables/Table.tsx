import { ReactNode } from 'react'

import { StyledTable } from '../../styles/components/Tables/Table'

interface TableProps {
  ths: Array<string>
  children: ReactNode
  isEditable?: boolean
}

export function Table({ ths, children, isEditable }: TableProps) {
  return (
    <StyledTable isEditable={isEditable}>
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
