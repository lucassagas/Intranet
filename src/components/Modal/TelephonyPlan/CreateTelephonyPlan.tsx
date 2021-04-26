import * as Yup from 'yup'

import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'
import { Input } from '../../Input'
import { useCallback, useRef, useState } from 'react'
import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { api } from '../../../services/api'

import {
  Container,
  Content,
  BenefitButton
} from '../../../styles/components/Modal/TelephonyPlan/CreateTelephonyPlan'

interface CreateTelephonyPlanProps {
  id: string
  handleLoadPlans: () => void
}

export function CreateTelephonyPlan({
  id,
  handleLoadPlans
}: CreateTelephonyPlanProps) {
  const [fixoLocal, setFixoLocal] = useState(false)
  const [fixoDDD, setFixoDDD] = useState(false)
  const [movelLocal, setMovelLocal] = useState(false)
  const [movelDDD, setMovelDDD] = useState(false)
  const [international, setInternational] = useState(false)

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
          name: Yup.string().required('Campo obrigatório'),
          activation: Yup.number().required('Campo obrigatório'),
          price: Yup.number().required('Campo obrigatório'),
          minutes: Yup.number().required('Campo obrigatório'),
          branches: Yup.number().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const formattedData = {
          type: 'telephone',
          landline_local: fixoLocal,
          landline_ddd: fixoDDD,
          mobile_local: movelLocal,
          mobile_ddd: movelDDD,
          international_call: international,
          ...data
        }

        await api.post('api/plan', formattedData)

        handleLoadPlans()
        setDisplayModal([])
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Plano ${data.name} criado com sucesso!`
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
    [fixoLocal, fixoDDD, movelLocal, movelDDD, international, addToast]
  )

  return (
    <GlobalModal id={id} size={600} title="Criar Plano">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <Content>
          <section>
            <div>
              <Input name="name" label="Titulo do Plano" />
            </div>
            <div>
              <Input name="minutes" label="Minutagem do Plano" type="number" />
            </div>
            <div>
              <Input name="branches" label="Ramais" type="number" />
            </div>
          </section>

          <section>
            <div>
              <Input
                name="activation"
                label="Preço de Instalação"
                type="number"
              />
            </div>
            <div>
              <Input name="price" label="Valor Mensal" type="number" />
            </div>
          </section>

          <section>
            <BenefitButton
              onClick={() => setFixoLocal(!fixoLocal)}
              active={fixoLocal}
              type="button"
            >
              <div />
              <span>Fixo Local</span>
            </BenefitButton>

            <BenefitButton
              onClick={() => setFixoDDD(!fixoDDD)}
              active={fixoDDD}
              type="button"
            >
              <div />
              <span>Fixo DDD</span>
            </BenefitButton>
            <BenefitButton
              onClick={() => setMovelLocal(!movelLocal)}
              active={movelLocal}
              type="button"
            >
              <div />
              <span>Movel Local</span>
            </BenefitButton>
            <BenefitButton
              onClick={() => setMovelDDD(!movelDDD)}
              active={movelDDD}
              type="button"
            >
              <div />
              <span>Movel DDD</span>
            </BenefitButton>
            <BenefitButton
              onClick={() => setInternational(!international)}
              active={international}
              type="button"
            >
              <div />
              <span>Ligações Internacionais</span>
            </BenefitButton>
          </section>
        </Content>
        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
