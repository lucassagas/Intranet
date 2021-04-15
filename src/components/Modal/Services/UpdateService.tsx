import * as Yup from 'yup'
import { useCallback, useMemo, useRef } from 'react'
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
import { useAuth } from '../../../hooks/auth'

import { Container } from '../../../styles/components/Modal/Services/UpdateService'

export interface UpdateServicesProps {
  id: string
  handleLoadPlans: () => void
  selectedService: ServiceProps
}

export function UpdateService({
  id,
  handleLoadPlans,
  selectedService
}: UpdateServicesProps) {
  const formRef = useRef<FormHandles>()
  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()
  const { permissions } = useAuth()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
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

        await api.put(`api/service/${selectedService.serv_id}`, formattedData)

        handleLoadPlans()
        setDisplayModal('')
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Serviço ${data.name} editado com sucesso!`
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
    [selectedService]
  )

  const products = useMemo(() => {
    const price = selectedService?.products.find(
      service => service.prod_name === 'PRICE'
    )
    const deadline = selectedService?.products.find(
      service => service.prod_name === 'DEADLINE'
    )
    const form_payment = selectedService?.products.find(
      service => service.prod_name === 'FORM_PAYMENT'
    )

    return {
      price,
      deadline,
      form_payment
    }
  }, [selectedService])

  return (
    <GlobalModal id={id} size={600} title="Editar Serviço">
      <Container
        initialData={{
          price: products?.price?.product_value_string,
          deadline: products?.deadline?.product_value_string,
          name: selectedService?.serv_name,
          form_payment: products?.form_payment?.product_value_string
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div>
          <span>
            <Input name="price" label="Valor" type="number" />
          </span>

          <span>
            <Input name="deadline" label="Prazo de Pagamento" type="number" />
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

        {permissions.includes('SAC.SERVICOS.DELETAR') && (
          <Button
            onClick={() => setDisplayModal('modalDeleteService')}
            className="deleteButton"
            type="button"
          >
            Excluir
          </Button>
        )}

        <Button type="submit">Salvar Alterações</Button>
      </Container>
    </GlobalModal>
  )
}
