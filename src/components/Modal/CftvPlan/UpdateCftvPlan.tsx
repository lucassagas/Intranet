import * as Yup from 'yup'
import { GlobalModal } from '../GlobalModal'

import { useCallback, useRef } from 'react'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'
import { useLoading } from '../../../hooks/loading'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { apiDev } from '../../../services/apiDev'
import { CftvProps } from '../../Pages/Sac/Plans/Cftv'

import { Container } from '../../../styles/components/Modal/CftvPlans/UpdateCftvPlan'

export interface UpdateCftvProps {
  id: string
  loadCftvPlans: () => void
  selectedCftvPlan: CftvProps
}

export function UpdateCftvPlan({
  id,
  loadCftvPlans,
  selectedCftvPlan
}: UpdateCftvProps) {
  const formRef = useRef<FormHandles>(null)

  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          price_with_fidelity: Yup.number().required('Campo obrigatório'),
          price_without_fidelity: Yup.number().required('Campo obrigatório'),
          recording_days: Yup.number().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await apiDev.patch(`cftv/${selectedCftvPlan.id}`, data)

        reset()
        setDisplayModal('')
        loadCftvPlans()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Plano ${selectedCftvPlan.recording_days} editado com sucesso!`
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: err.message
        })
      } finally {
        setLoadingScreen(false)
      }
    },
    [selectedCftvPlan]
  )
  return (
    <GlobalModal id={id} size={400} title="Editar Plano">
      <Container
        initialData={{
          price_with_fidelity: selectedCftvPlan?.price_with_fidelity,
          price_without_fidelity: selectedCftvPlan?.price_without_fidelity,
          recording_days: selectedCftvPlan?.recording_days
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div>
          <Input
            name="price_with_fidelity"
            label="Valor com Fidelidade"
            type="number"
          />
          <Input
            name="price_without_fidelity"
            label="Valor sem Mensalidade"
            type="number"
          />
          <Input name="recording_days" label="Dias de Gravação" type="number" />
        </div>
        <Button
          onClick={() => setDisplayModal('modalDeleteCftvPlan')}
          className="deleteButton"
          type="button"
        >
          Excluir
        </Button>
        <Button type="submit">Salvar Alterações</Button>
      </Container>
    </GlobalModal>
  )
}
