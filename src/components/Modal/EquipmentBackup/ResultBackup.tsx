import { GlobalModal } from '../GlobalModal'
import { Container } from '../../../styles/components/Modal/EquipmentBackup/ResultBackup'
import { ReactNode } from 'react'

interface ResultBackupProps {
  children: ReactNode
  id: string
}

export function ResultBackup({ children, id }: ResultBackupProps) {
  return (
    <GlobalModal id={id} size={700} title="Bash">
      <Container>{children}</Container>
    </GlobalModal>
  )
}
