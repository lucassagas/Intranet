import { GlobalModal } from '../GlobalModal'
import { UpdateServicesProps } from './UpdateService'
import { useCallback } from 'react'
import { Button } from '../../Button'
import { api } from '../../../services/api'

import { useLoading } from '../../../hooks/loading'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Services/DeleteService'

export function DeleteService({
  id,
  selectedService,
  handleLoadPlans
}: UpdateServicesProps) {
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleDeleteService = useCallback(() => {
    setLoadingScreen(true)
    api
      .delete(`api/service/${selectedService.serv_id}`)
      .then(() => {
        setDisplayModal('')
        handleLoadPlans()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Serviço ${selectedService.serv_name} deletado com sucesso!`
        })
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      })
      .finally(() => setLoadingScreen(false))
  }, [selectedService])

  return (
    <GlobalModal size={400} title="Deletar Serviço" id={id}>
      <Container>
        <Wrapper>
          <span>
            <strong>Serviço</strong>
            <p>{selectedService?.serv_name}</p>
          </span>

          <p>Tem certeza de que quer deletar este serviço ?</p>
        </Wrapper>
        <Button onClick={handleDeleteService} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
