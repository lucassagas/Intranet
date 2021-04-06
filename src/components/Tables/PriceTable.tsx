import { ReactNode } from 'react'
import { Container } from '../../styles/components/Tables/PriceTable'

interface PriceTableProps {
  children: ReactNode
  ths: Array<string>
  title: string
}

export function PriceTable({ children, ths }: PriceTableProps) {
  return (
    <Container>
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
