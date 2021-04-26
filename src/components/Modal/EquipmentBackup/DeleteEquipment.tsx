import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { UpdateEquipamentProps } from './UpdateEquipment'
import { api } from '../../../services/api'

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
      await api.delete(`api/bkp_equipment/${selectedEquipment.bkp_equi_id}`)

      handleLoadEquipments()

      setDisplayModal([])
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Equipamento ${selectedEquipment.bkp_equi_name} foi exluido com sucesso!`
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
            <p>{selectedEquipment?.bkp_equi_name}</p>
          </span>

          <span>
            <strong>IP:</strong>
            <p>{selectedEquipment?.bkp_equi_ip}</p>
          </span>
        </Wrapper>
        <Button onClick={handleDeleteEquipment} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
