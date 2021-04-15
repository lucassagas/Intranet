import * as Yup from 'yup'
import { useCallback, useRef } from 'react'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { ServiceProps } from '../../Pages/Sac/Services/Service'
import { api } from '../../../services/api'

import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'

import { Container } from '../../../styles/components/Modal/Services/CreateService'

interface CreateServiceProps {
  id: string
  handleLoadPlans: () => void
}

export function CreateService({ id, handleLoadPlans }: CreateServiceProps) {
  const formRef = useRef<FormHandles>()
  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()

  const handleSubmit = useCallback(async (data, { reset }) => {
    setLoadingScreen(true)
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        price: Yup.number().required('Campo obrigatório'),
        deadline: Yup.number().required('Campo obrigatório'),
        name: Yup.string().required('Campo obrigatório'),
        form_payment: Yup.string().required('Campo obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const formattedData = {
        type: 'service',
        ...data
      }

      await api.post('api/service', formattedData)

      handleLoadPlans()

      setDisplayModal('')
      reset()
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Serviço ${data.name} cadastrado com sucesso!`
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
        description: err.response ? err.response.data.message : err.message
      })
    } finally {
      setLoadingScreen(false)
    }
  }, [])

  return (
    <GlobalModal id={id} size={600} title="Cadastrar Serviço">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <div>
          <span>
            <Input name="price" label="Valor" type="number" />
          </span>

          <span>
            <Input name="deadline" label="Prazo de Pagamento" />
          </span>

          <span>
            <Input name="form_payment" label="Tipo de pagamento" />
          </span>
        </div>

        <div>
          <span style={{ width: '100%' }}>
            <Input name="name" width="100%" label="Serviço" />
          </span>
        </div>
        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
