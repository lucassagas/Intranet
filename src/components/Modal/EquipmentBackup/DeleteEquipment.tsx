import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { UpdateEquipamentProps } from './UpdateEquipment'
import { apiDev } from '../../../services/apiDev'

import { useCallback } from 'react'
import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/EquipmentBackup/DeleteEquipment'

export function DeleteEquipment({
  id,
  handleLoadEquipments,
  selectedEquipment
}: UpdateEquipamentProps) {
  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()

  const handleDeleteEquipment = useCallback(async () => {
    setLoadingScreen(true)
    try {
      await apiDev.delete(`equipment/${selectedEquipment.id}`)

      handleLoadEquipments()

      setDisplayModal('')
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Equipamento ${selectedEquipment.name} foi exluido com sucesso!`
      })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: err.response ? err.response.data.message : err.message
      })
    } finally {
      setLoadingScreen(false)
    }
  }, [selectedEquipment])

  return (
    <GlobalModal size={400} title="Deletar Equipamento" id={id}>
      <Container>
        <Wrapper>
          <span>
            <strong>Equipamento:</strong>
            <p>{selectedEquipment?.name}</p>
          </span>

          <span>
            <strong>IP:</strong>
            <p>{selectedEquipment?.ip}</p>
          </span>
        </Wrapper>
        <Button onClick={handleDeleteEquipment} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
