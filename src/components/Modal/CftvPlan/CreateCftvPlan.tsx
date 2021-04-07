import * as Yup from 'yup'
import { GlobalModal } from '../GlobalModal'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'
import { useLoading } from '../../../hooks/loading'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { apiDev } from '../../../services/apiDev'
import { useCallback, useRef } from 'react'

import { Container } from '../../../styles/components/Modal/CftvPlans/CreateCftvPlan'

interface CreateCftvProps {
  id: string
  loadCftvPlans: () => void
}

export function CreateCftvPlan({ id, loadCftvPlans }: CreateCftvProps) {
  const formRef = useRef<FormHandles>(null)

  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()

  const handleSubmit = useCallback(async (data, { reset }) => {
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

      await apiDev.post('cftv', data)

      reset()
      setDisplayModal('')
      loadCftvPlans()
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Plano cadastrado com sucesso!'
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
  }, [])
  return (
    <GlobalModal id={id} size={400} title="Cadastrar Plano">
      <Container ref={formRef} onSubmit={handleSubmit}>
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
        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
