import * as Yup from 'yup'
import { useCallback, useRef } from 'react'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { ServiceProps } from '../../Pages/Sac/Services/Service'
import { apiDev } from '../../../services/apiDev'

import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'

import { Container } from '../../../styles/components/Modal/Services/CreateService'

interface CreateServiceProps {
  id: string
  services: ServiceProps[]
  setServices: (services: ServiceProps[]) => void
}

export function CreateService({
  id,
  services,
  setServices
}: CreateServiceProps) {
  const formRef = useRef<FormHandles>()
  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          value: Yup.number().required('Campo obrigatório'),
          deadline: Yup.number().required('Campo obrigatório'),
          service: Yup.string().required('Campo obrigatório'),
          type_of_payment: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await apiDev.post('service', data)

        setServices([response.data, ...services])

        setDisplayModal('')
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Serviço ${data.service} cadastrado com sucesso!`
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
    },
    [services]
  )

  return (
    <GlobalModal id={id} size={600} title="Cadastrar Serviço">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <div>
          <span>
            <Input name="value" label="Valor" type="number" />
          </span>

          <span>
            <Input name="deadline" label="Prazo de Pagamento" />
          </span>

          <span>
            <Input name="type_of_payment" label="Tipo de pagamento" />
          </span>
        </div>

        <div>
          <span style={{ width: '100%' }}>
            <Input name="service" width="100%" label="Serviço" />
          </span>
        </div>
        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
