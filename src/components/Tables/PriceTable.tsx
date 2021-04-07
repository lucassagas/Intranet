import { ReactNode } from 'react'
import { Container } from '../../styles/components/Tables/PriceTable'

interface PriceTableProps {
  children: ReactNode
  ths: any
  isEditable?: boolean
}

export function PriceTable({ children, ths, isEditable }: PriceTableProps) {
  return (
    <Container isEditable={isEditable}>
      <thead>
        <tr>
          {ths?.map(th => {
            return <th key={th}>{th}</th>
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Container>
  )
}
