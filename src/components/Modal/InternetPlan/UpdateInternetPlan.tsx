import * as Yup from 'yup'

import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'
import { Input } from '../../Input'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { api } from '../../../services/api'
import { PlansProps } from '../../Pages/Sac/Plans/Internet'

import {
  Container,
  Content,
  BenefitButton
} from '../../../styles/components/Modal/InternetPlan/UpdateInternetPlan'

export interface UpdateInternetPlanProps {
  id: string
  handleLoadPlans: () => void
  selectedPlan: PlansProps
}

export function UpdateInternetPlan({
  id,
  handleLoadPlans,
  selectedPlan
}: UpdateInternetPlanProps) {
  const [neoredeTv, setNeoredeTv] = useState(false)
  const [telefone, setTelefone] = useState(false)
  const [neoredeDrive, setNeoredeDrive] = useState(false)
  const [noggin, setNoggin] = useState(false)
  const [paramount, setParamount] = useState(false)

  const formRef = useRef<FormHandles>(null)

  const { setDisplayModal, displayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()

  useEffect(() => {
    if (displayModal === id) {
      setNeoredeTv(selectedPlan.neo_stream)
      setTelefone(selectedPlan.telephone)
      setNeoredeDrive(selectedPlan.neo_drive)
      setNoggin(selectedPlan.noggin)
      setParamount(selectedPlan.paramount)
    }
  }, [selectedPlan])

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          activation: Yup.number().required('Campo obrigatório'),
          price: Yup.number().required('Campo obrigatório'),
          download: Yup.number().required('Campo obrigatório'),
          upload: Yup.number().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const formattedData = {
          neo_stream: neoredeTv,
          neo_drive: neoredeDrive,
          paramount: paramount,
          noggin: noggin,
          telephone: telefone,
          type: 'network',
          ...data
        }

        await api.put(`api/plan/${selectedPlan.plan_id}`, formattedData)

        handleLoadPlans()
        setDisplayModal([])
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Plano ${selectedPlan.plan_name} editado com sucesso!`
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
    [
      selectedPlan,
      addToast,
      neoredeTv,
      neoredeDrive,
      paramount,
      noggin,
      telefone
    ]
  )

  return (
    <GlobalModal id={id} size={600} title="Editar Plano">
      <Container
        initialData={{
          name: selectedPlan?.plan_name,
          activation: selectedPlan?.activation,
          price: selectedPlan?.price,
          download: selectedPlan?.download,
          upload: selectedPlan?.upload
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Content>
          <section>
            <div>
              <Input name="name" label="Titulo do Plano" />
            </div>
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
            <div>
              <Input name="download" label="Download" type="number" />
            </div>
            <div>
              <Input name="upload" label="Upload" type="number" />
            </div>
          </section>

          <section>
            <BenefitButton
              onClick={() => setNeoredeTv(!neoredeTv)}
              active={neoredeTv}
              type="button"
            >
              <div />
              <span>NeoredeTV</span>
            </BenefitButton>

            <BenefitButton
              onClick={() => setTelefone(!telefone)}
              active={telefone}
              type="button"
            >
              <div />
              <span>Telefone</span>
            </BenefitButton>
            <BenefitButton
              onClick={() => setNeoredeDrive(!neoredeDrive)}
              active={neoredeDrive}
              type="button"
            >
              <div />
              <span>Neorede Drive</span>
            </BenefitButton>
            <BenefitButton
              onClick={() => setNoggin(!noggin)}
              active={noggin}
              type="button"
            >
              <div />
              <span>Noggin</span>
            </BenefitButton>
            <BenefitButton
              onClick={() => setParamount(!paramount)}
              active={paramount}
              type="button"
            >
              <div />
              <span>Paramount</span>
            </BenefitButton>
          </section>
        </Content>
        <Button type="submit">Salvar Alterações</Button>
      </Container>
    </GlobalModal>
  )
}
