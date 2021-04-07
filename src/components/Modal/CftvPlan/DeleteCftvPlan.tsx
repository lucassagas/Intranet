import React, { useCallback } from 'react'
import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'

import { UpdateCftvProps } from './UpdateCftvPlan'
import { apiDev } from '../../../services/apiDev'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'

import { Container } from '../../../styles/components/Modal/CftvPlans/DeleteCftvPlan'

export function DeleteCftvPlan({
  id,
  loadCftvPlans,
  selectedCftvPlan
}: UpdateCftvProps) {
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()

  const formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL'
  })

  const handleDeleteCftvPlan = useCallback(() => {
    setLoadingScreen(true)
    apiDev
      .delete(`cftv/${selectedCftvPlan.id}`)
      .then(() => {
        loadCftvPlans()
        setDisplayModal('')
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Plano ${selectedCftvPlan.recording_days} excluido com sucesso!`
        })
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.message
        })
      })
      .finally(() => {
        setLoadingScreen(false)
      })
  }, [selectedCftvPlan])

  return (
    <GlobalModal id={id} size={400} title="Deletar Plano">
      <Container>
        <div>
          <section>
            <strong>Dias</strong>
            <p>{selectedCftvPlan?.recording_days}</p>
          </section>
          <section>
            <strong>Valor com validade</strong>
            <p>{formatter.format(selectedCftvPlan?.price_with_fidelity)}</p>
          </section>
          <section>
            <strong>Valor sem fidelidade</strong>
            <p>{formatter.format(selectedCftvPlan?.price_without_fidelity)}</p>
          </section>

          <p>Tem certeza de que quer excluir este plano ?</p>
        </div>
        <Button onClick={handleDeleteCftvPlan} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
