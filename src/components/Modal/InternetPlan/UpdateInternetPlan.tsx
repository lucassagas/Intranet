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
import { apiDev } from '../../../services/apiDev'
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
      setNeoredeTv(selectedPlan.plan_neoredetv)
      setTelefone(selectedPlan.plan_telephony)
      setNeoredeDrive(selectedPlan.plan_neorede_drive)
      setNoggin(selectedPlan.plan_noggin)
      setParamount(selectedPlan.plan_paramount)
    }
  }, [selectedPlan])

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          plan_title: Yup.string().required('Campo obrigatório'),
          plan_installation: Yup.number().required('Campo obrigatório'),
          plan_monthly_payment: Yup.number().required('Campo obrigatório'),
          plan_download: Yup.number().required('Campo obrigatório'),
          plan_upload: Yup.number().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const formattedData = {
          plan_neoredetv: neoredeTv,
          plan_neorede_drive: neoredeDrive,
          plan_paramount: paramount,
          plan_noggin: noggin,
          plan_telephony: telefone,
          ...data
        }

        await apiDev.patch(`/plans/${selectedPlan.plan_id}`, formattedData)

        handleLoadPlans()
        setDisplayModal('')
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Plano ${selectedPlan.plan_title} editado com sucesso!`
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
    [selectedPlan, addToast]
  )

  return (
    <GlobalModal id={id} size={600} title="Editar Plano">
      <Container
        initialData={{
          plan_title: selectedPlan?.plan_title,
          plan_installation: selectedPlan?.plan_installation_price,
          plan_monthly_payment: selectedPlan?.plan_monthly_payment,
          plan_download: selectedPlan?.plan_download,
          plan_upload: selectedPlan?.plan_upload
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Content>
          <section>
            <div>
              <Input name="plan_title" label="Titulo do Plano" />
            </div>
            <div>
              <Input
                name="plan_installation"
                label="Preço de Instalação"
                type="number"
              />
            </div>
            <div>
              <Input
                name="plan_monthly_payment"
                label="Valor Mensal"
                type="number"
              />
            </div>
          </section>

          <section>
            <div>
              <Input name="plan_download" label="Download" type="number" />
            </div>
            <div>
              <Input name="plan_upload" label="Upload" type="number" />
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
