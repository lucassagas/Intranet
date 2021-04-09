import { GlobalModal } from '../GlobalModal'
import { UpdateServicesProps } from './UpdateService'
import { useCallback } from 'react'
import { Button } from '../../Button'
import { apiDev } from '../../../services/apiDev'

import { useLoading } from '../../../hooks/loading'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Services/DeleteService'

export function DeleteService({
  id,
  services,
  setServices,
  selectedService
}: UpdateServicesProps) {
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleDeleteService = useCallback(() => {
    setLoadingScreen(true)
    apiDev
      .delete(`service/${selectedService.id}`)
      .then(() => {
        const remainingServices = services.filter(
          service => service.id !== selectedService.id
        )

        setServices(remainingServices)
        setDisplayModal('')
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Serviço ${selectedService.service} deletado com sucesso!`
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

  const CurrencyFormatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL'
  })

  return (
    <GlobalModal size={400} title="Deletar Serviço" id={id}>
      <Container>
        <Wrapper>
          <span>
            <strong>Serviço</strong>
            <p>{selectedService?.service}</p>
          </span>
          <span>
            <strong>Valor</strong>
            <p>{CurrencyFormatter.format(selectedService?.value)}</p>
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
