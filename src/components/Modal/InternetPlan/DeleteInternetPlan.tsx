import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'
import { useCallback } from 'react'
import { UpdateInternetPlanProps } from './UpdateInternetPlan'

import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { apiDev } from '../../../services/apiDev'

import { Container } from '../../../styles/components/Modal/InternetPlan/DeleteInternetPlan'

export function DeleteInternetPlan({
  id,
  handleLoadPlans,
  selectedPlan
}: UpdateInternetPlanProps) {
  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()

  const handleDeleteInternetPlan = useCallback(() => {
    setLoadingScreen(true)
    apiDev
      .delete(`plans/${selectedPlan?.plan_id}`)
      .then(() => {
        setDisplayModal('')
        handleLoadPlans()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Plano ${selectedPlan?.plan_title} deletado com sucesso!`
        })
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.message
        })
      })
      .finally(() => setLoadingScreen(false))
  }, [selectedPlan])

  return (
    <GlobalModal id={id} size={400} title="Deletar Plano">
      <Container>
        <div>
          <section>
            <strong>Plano </strong>
            <p>{selectedPlan?.plan_title}</p>
          </section>

          <p>Tem certeza de que quer excluir este plano ?</p>
        </div>
        <Button onClick={handleDeleteInternetPlan} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
