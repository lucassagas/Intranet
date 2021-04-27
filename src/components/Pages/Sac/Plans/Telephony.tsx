import * as Yup from 'yup'
import { PriceTable } from '../../../Tables/PriceTable'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../../../../services/api'
import { useToast } from '../../../../hooks/toast'
import { BsCheck, BsX, FiTrash } from '../../../../styles/icons'
import { Input } from '../../../Input'
import { Button } from '../../../Button'

import { useModal } from '../../../../hooks/modal'
import { useAuth } from '../../../../hooks/auth'
import { useRouter } from 'next/router'
import { useLoading } from '../../../../hooks/loading'

import { CreateTelephonyPlan } from '../../../Modal/TelephonyPlan/CreateTelephonyPlan'
import { UpdateTelephonyPlan } from '../../../Modal/TelephonyPlan/UpdateTelephonyPlan'
import { DeleteTelephonyPlan } from '../../../Modal/TelephonyPlan/DeleteTelephonyPlan'

import {
  Container,
  Wrapper,
  Comments,
  Actions
} from '../../../../styles/components/Pages/Sac/Plans/Telephony'
import { getValidationErrors } from '../../../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'

export interface PlansProps {
  plan_id: number
  plan_name: string
  branches: string
  landline_ddd: boolean
  price: number
  minutes: number
  landline_local: boolean
  mobile_ddd: boolean
  mobile_local: boolean
  activation: number
  international_called: boolean
}

interface observationProps {
  obs_content: string
  obs_id: number
}

export function Telephony() {
  const [observations, setObservations] = useState<observationProps[]>([])
  const [plans, setPlans] = useState<PlansProps[]>([])
  const [selectedPlan, setSelectedPlan] = useState<PlansProps>()

  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()
  const router = useRouter()
  const { setLoadingScreen } = useLoading()

  const handleLoadPlans = useCallback(() => {
    api
      .get('api/plan?type=telephone')
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
    if (!permissions?.includes('SAC.PLANOS.VISUALIZAR')) {
      router.push('/')
    }

    api.get('/api/plan/observation?type=telephone').then(response => {
      setObservations(response.data)
    })

    handleLoadPlans()
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
          type: 'telephone',
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

  const handleSelectPlan = useCallback((plan: PlansProps) => {
    setDisplayModal(['modalUpdateTelephonyPlan'])
    setSelectedPlan(plan)
  }, [])

  const handleDeleteTelephonyPlan = useCallback((plan: PlansProps) => {
    setDisplayModal(['modalDeleteTelephonyPlan'])
    setSelectedPlan(plan)
  }, [])

  const handleDeleteObservations = useCallback(
    async (id: number) => {
      try {
        await api.delete(`api/plan/observation/${id}`)

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

  const plansTitle = useMemo(() => plans.map(plan => plan.plan_name), [plans])

  const formattedPlan = useMemo(() => {
    let preco = []
    let ativacao = []
    let ramais = []
    let minutos = []
    let fixo_local = []
    let fixo_ddd = []
    let movel_local = []
    let movel_ddd = []
    let internacionais = []
    let actions = []

    let formatterCurrency = new Intl.NumberFormat([], {
      style: 'currency',
      currency: 'BRL'
    })

    plans.map(plan => {
      preco.push(<td>{formatterCurrency.format(plan.price)}</td>)

      ativacao.push(<td>{formatterCurrency.format(plan.activation)}</td>)

      minutos.push(<td>{plan.minutes}</td>)

      ramais.push(<td>{plan.branches}</td>)

      fixo_local.push(
        <td>
          {plan.landline_local ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      fixo_ddd.push(
        <td>
          {plan.landline_ddd ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      movel_local.push(
        <td>
          {plan.mobile_local ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      movel_ddd.push(
        <td>
          {plan.mobile_ddd ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      internacionais.push(
        <td>
          <BsX size={20} color="var(--danger)" />
        </td>
      )
      actions.push(
        <td>
          <Actions>
            {permissions?.includes('SAC.PLANOS.EDITAR') && (
              <button onClick={() => handleSelectPlan(plan)}>Editar</button>
            )}

            {permissions?.includes('SAC.PLANOS.DELETAR') && (
              <button onClick={() => handleDeleteTelephonyPlan(plan)}>
                Excluir
              </button>
            )}
          </Actions>
        </td>
      )
    })

    return {
      preco,
      ativacao,
      ramais,
      minutos,
      fixo_local,
      fixo_ddd,
      movel_local,
      movel_ddd,
      internacionais,
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
          <td>Ativação</td>
          {formattedPlan.ativacao}
        </tr>
        <tr>
          <td>Minutos</td>
          {formattedPlan.minutos}
        </tr>
        <tr>
          <td>Ramais</td>
          {formattedPlan.ramais}
        </tr>
        <tr>
          <td>Fixo Local</td>
          {formattedPlan.fixo_local}
        </tr>
        <tr>
          <td>Fixo DDD</td>
          {formattedPlan.fixo_ddd}
        </tr>
        <tr>
          <td>Movel Local</td>
          {formattedPlan.movel_local}
        </tr>
        <tr>
          <td>Movel DDD</td>
          {formattedPlan.movel_ddd}
        </tr>
        <tr>
          <td>
            Chamadas <br /> Internacionais
          </td>
          {formattedPlan.internacionais}
        </tr>

        {permissions?.includes('SAC.PLANOS.EDITAR' || 'SAC.PLANOS.DELETAR') && (
          <tr>
            <td>Ações</td>
            {formattedPlan.actions}
          </tr>
        )}
      </PriceTable>

      {permissions?.includes('SAC.PLANOS.CRIAR') && (
        <Wrapper ref={formRef} onSubmit={handleSubmit}>
          <Input
            width="100%"
            name="observation"
            type="text"
            placeholder="Inserir observações"
          />
          <Button type="submit">Inserir Observações</Button>
          <Button
            onClick={() => setDisplayModal(['modalCreateTelephonyPlan'])}
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
              {permissions?.includes('SAC.PLANOS.DELETAR') && (
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

      <CreateTelephonyPlan
        id="modalCreateTelephonyPlan"
        handleLoadPlans={handleLoadPlans}
      />

      <UpdateTelephonyPlan
        id="modalUpdateTelephonyPlan"
        handleLoadPlans={handleLoadPlans}
        selectedPlan={selectedPlan}
      />

      <DeleteTelephonyPlan
        id="modalDeleteTelephonyPlan"
        handleLoadPlans={handleLoadPlans}
        selectedPlan={selectedPlan}
      />
    </Container>
  )
}
