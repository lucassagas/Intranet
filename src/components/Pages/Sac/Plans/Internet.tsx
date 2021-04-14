import * as Yup from 'yup'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PriceTable } from '../../../Tables/PriceTable'
import { api } from '../../../../services/api'
import { useToast } from '../../../../hooks/toast'
import { BsCheck, BsX, FiTrash } from '../../../../styles/icons'
import { Input } from '../../../Input'
import { Button } from '../../../Button'
import { FormHandles } from '@unform/core'

import { useModal } from '../../../../hooks/modal'
import { useAuth } from '../../../../hooks/auth'
import { useLoading } from '../../../../hooks/loading'
import { useRouter } from 'next/router'

import { CreateInternetPlan } from '../../../Modal/InternetPlan/CreateInternetPlan'
import { UpdateInternetPlan } from '../../../Modal/InternetPlan/UpdateInternetPlan'
import { DeleteInternetPlan } from '../../../Modal/InternetPlan/DeleteInternetPlan'

import {
  Container,
  Wrapper,
  Comments,
  Actions
} from '../../../../styles/components/Pages/Sac/Plans/Internet'
import { getValidationErrors } from '../../../../utils/getValidationErrors'

export interface PlansProps {
  plan_id: number
  plan_name: string
  activation: number
  price: number
  download: number
  upload: number
  neo_stream: boolean
  neo_drive: boolean
  paramount: boolean
  noggin: boolean
  telephone: boolean
}

interface observationProps {
  obs_content: string
  obs_id: number
}

export function Internet() {
  const [observations, setObservations] = useState<observationProps[]>([])
  const [plans, setPlans] = useState<PlansProps[]>([])
  const [selectedPlan, setSelectedPlan] = useState<PlansProps>()
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()
  const { setLoadingScreen } = useLoading()
  const router = useRouter()

  const handleLoadPlans = useCallback(() => {
    api
      .get('api/plan?type=network')
      .then(response => {
        setPlans(response.data)
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.message
        })
      })
  }, [])

  useEffect(() => {
    if (!permissions.includes('SAC.PLANOS.VISUALIZAR')) {
      router.push('/')
    }
    handleLoadPlans()

    api.get('/api/plan/observation?type=network').then(response => {
      setObservations(response.data)
    })
  }, [])

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)
      try {
        const schema = Yup.object().shape({
          observation: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const formattedData = {
          type: 'network',
          content: data.observation
        }
        const response = await api.post('api/plan/observation', formattedData)

        setObservations([response.data.obs, ...observations])

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Observação cadastrada com sucesso!'
        })

        reset()
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
    [observations, addToast]
  )

  const handleDeleteObservations = useCallback(
    async (id: number) => {
      try {
        const response = await api.delete(`api/plan/observation/${id}`)

        console.log(response)

        const remainingObservations = observations.filter(
          obs => obs.obs_id !== id
        )

        setObservations(remainingObservations)
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      }
    },
    [observations]
  )

  const handleSelectPlan = useCallback((plan: PlansProps) => {
    setDisplayModal('modalUpdateInternetPlan')
    setSelectedPlan(plan)
  }, [])

  const handleDeleteInternetPlan = useCallback((plan: PlansProps) => {
    setDisplayModal('modalDeleteInternetPlan')
    setSelectedPlan(plan)
  }, [])

  const plansTitle = useMemo(() => plans.map(plan => plan.plan_name), [plans])

  const formattedPlan = useMemo(() => {
    let preco = []
    let download = []
    let upload = []
    let ativacao = []
    let neoredetv = []
    let neorededrive = []
    let paramount = []
    let noggin = []
    let telefonia = []
    let actions = []

    let formatterCurrency = new Intl.NumberFormat([], {
      style: 'currency',
      currency: 'BRL'
    })

    plans.map(plan => {
      preco.push(<td>{formatterCurrency.format(plan.price)}</td>)

      download.push(<td>{plan.download}Mb's</td>)

      upload.push(<td>{plan.upload}Mb's</td>)

      ativacao.push(<td>{formatterCurrency.format(plan.activation)}</td>)
      neoredetv.push(
        <td>
          {plan.neo_stream ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      neorededrive.push(
        <td>
          {plan.neo_drive ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      paramount.push(
        <td>
          {plan.paramount ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      noggin.push(
        <td>
          {plan.noggin ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      telefonia.push(
        <td>
          {plan.telephone ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      actions.push(
        <td>
          <Actions>
            {permissions.includes('SAC.PLANOS.EDITAR') && (
              <button onClick={() => handleSelectPlan(plan)}>Editar</button>
            )}

            {permissions.includes('SAC.PLANOS.DELETAR') && (
              <button onClick={() => handleDeleteInternetPlan(plan)}>
                Excluir
              </button>
            )}
          </Actions>
        </td>
      )
    })

    return {
      preco,
      download,
      upload,
      ativacao,
      neoredetv,
      neorededrive,
      paramount,
      noggin,
      telefonia,
      actions
    }
  }, [plans])

  return (
    <Container>
      <PriceTable ths={['Plano', ...plansTitle]}>
        <tr>
          <td>Preço</td>
          {formattedPlan.preco}
        </tr>
        <tr>
          <td>Download</td>
          {formattedPlan.download}
        </tr>
        <tr>
          <td>Upload</td>
          {formattedPlan.upload}
        </tr>
        <tr>
          <td>Ativação</td>
          {formattedPlan.ativacao}
        </tr>
        <tr>
          <td>
            Neorede <br /> Streaming
          </td>
          {formattedPlan.neoredetv}
        </tr>
        <tr>
          <td>
            Neorede <br /> Drive
          </td>
          {formattedPlan.neorededrive}
        </tr>
        <tr>
          <td>Paramount</td>
          {formattedPlan.paramount}
        </tr>
        <tr>
          <td>Noggin</td>
          {formattedPlan.noggin}
        </tr>
        <tr>
          <td>Telefonia</td>
          {formattedPlan.telefonia}
        </tr>
        {permissions.includes('SAC.PLANOS.EDITAR' || 'SAC.PLANOS.EXCLUIR') && (
          <tr>
            <td>Ações</td>
            {formattedPlan.actions}
          </tr>
        )}
      </PriceTable>
      {permissions.includes('SAC.PLANOS.CRIAR') && (
        <Wrapper ref={formRef} onSubmit={handleSubmit}>
          <Input
            width="100%"
            name="observation"
            type="text"
            placeholder="Inserir observações"
          />
          <Button type="submit">Inserir Observações</Button>
          <Button
            onClick={() => setDisplayModal('modalCreateInternetPlan')}
            type="button"
          >
            Cadastrar Planos
          </Button>
        </Wrapper>
      )}

      <Comments>
        <strong>Observações: </strong>
        {observations.map(obs => {
          return (
            <div key={obs.obs_id}>
              <p>{obs.obs_content}</p>
              {permissions.includes('SAC.PLANOS.DELETAR') && (
                <button
                  onClick={() => handleDeleteObservations(obs.obs_id)}
                  type="button"
                >
                  <FiTrash size={20} />
                </button>
              )}
            </div>
          )
        })}
      </Comments>
      <CreateInternetPlan
        handleLoadPlans={handleLoadPlans}
        id="modalCreateInternetPlan"
      />

      <UpdateInternetPlan
        handleLoadPlans={handleLoadPlans}
        id="modalUpdateInternetPlan"
        selectedPlan={selectedPlan}
      />

      <DeleteInternetPlan
        handleLoadPlans={handleLoadPlans}
        id="modalDeleteInternetPlan"
        selectedPlan={selectedPlan}
      />
    </Container>
  )
}
