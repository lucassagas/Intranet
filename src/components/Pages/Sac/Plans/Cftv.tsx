import * as Yup from 'yup'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useToast } from '../../../../hooks/toast'
import { api } from '../../../../services/api'
import { PriceTable } from '../../../Tables/PriceTable'
import { FiTrash } from '../../../../styles/icons'
import { Button } from '../../../Button'
import { Input } from '../../../Input'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../../utils/getValidationErrors'

import { useLoading } from '../../../../hooks/loading'
import { useModal } from '../../../../hooks/modal'
import { useAuth } from '../../../../hooks/auth'
import { useRouter } from 'next/router'

import { CreateCftvPlan } from '../../../Modal/CftvPlan/CreateCftvPlan'
import { UpdateCftvPlan } from '../../../Modal/CftvPlan/UpdateCftvPlan'
import { DeleteCftvPlan } from '../../../Modal/CftvPlan/DeleteCftvPlan'

import {
  AiOutlineCloud,
  FiSmartphone,
  HiOutlineUserGroup
} from '../../../../styles/icons'

import {
  Container,
  Wrapper,
  Comments,
  WrapperBenefit
} from '../../../../styles/components/Pages/Sac/Plans/Cftv'

export interface CftvProps {
  plan_id: number
  price_with_fidelity: number
  price_without_fidelity: number
  plan_name: number
}

interface observationProps {
  obs_content: string
  obs_id: number
}

export function Cftv() {
  const [plansCftv, setPlansCftv] = useState<CftvProps[]>([])
  const [selectedCftvPlan, setSelectedCftvPlan] = useState<CftvProps>()
  const [observations, setObservations] = useState<observationProps[]>([])

  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()
  const { setLoadingScreen } = useLoading()
  const router = useRouter()

  const loadCftvPlans = useCallback(() => {
    api
      .get('api/plan?type=cftv')
      .then(response => {
        setPlansCftv(response.data)
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.message
        })
      })
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

  useEffect(() => {
    if (!permissions.includes('SAC.PLANOS.VISUALIZAR')) {
      router.push('/')
    }

    api.get('/api/plan/observation?type=cftv').then(response => {
      setObservations(response.data)
    })

    loadCftvPlans()
  }, [])

  const PlansTitle = useMemo(
    () =>
      plansCftv.map(plan => (
        <span key={plan.plan_id}>
          {plan.plan_name > 1
            ? `${plan.plan_name} Dias`
            : `${plan.plan_name} Dia`}
        </span>
      )),
    [plansCftv]
  )

  const handleSelectCftvPlan = useCallback((cftvPlan: CftvProps) => {
    if (permissions.includes('SAC.PLANOS.EDITAR')) {
      setDisplayModal('modalUpdateCftvPlan')
      setSelectedCftvPlan(cftvPlan)
    }
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
          type: 'cftv',
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

  return (
    <Container>
      <PriceTable
        isEditable={permissions.includes('SAC.PLANOS.EDITAR')}
        ths={['Fidelidade', ...PlansTitle, 'Preço por camera']}
      >
        <tr>
          <td>Sim</td>
          {plansCftv.map(plan => {
            return (
              <td onClick={() => handleSelectCftvPlan(plan)} key={plan.plan_id}>
                {new Intl.NumberFormat([], {
                  style: 'currency',
                  currency: 'BRL'
                }).format(plan.price_with_fidelity)}
              </td>
            )
          })}
          <td>
            {new Intl.NumberFormat([], {
              style: 'currency',
              currency: 'BRL'
            }).format(50)}
          </td>
        </tr>
        <tr>
          <td>Não</td>
          {plansCftv.map(plan => {
            return (
              <td onClick={() => handleSelectCftvPlan(plan)} key={plan.plan_id}>
                {new Intl.NumberFormat([], {
                  style: 'currency',
                  currency: 'BRL'
                }).format(plan.price_without_fidelity)}
              </td>
            )
          })}

          <td>
            {new Intl.NumberFormat([], {
              style: 'currency',
              currency: 'BRL'
            }).format(300)}
          </td>
        </tr>
      </PriceTable>

      <WrapperBenefit>
        <section>
          <AiOutlineCloud size={24} />
          <strong>Armazenamento em Numvem</strong>
        </section>
        <section>
          <FiSmartphone size={24} />
          <strong>Acesso Via Web e Aplicativo</strong>
        </section>
        <section>
          <HiOutlineUserGroup size={24} />
          <strong>2 Usuários com acesso ilimitados</strong>
        </section>
      </WrapperBenefit>

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
            onClick={() => setDisplayModal('modalCreateCftvPlan')}
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

      <CreateCftvPlan id="modalCreateCftvPlan" loadCftvPlans={loadCftvPlans} />

      <UpdateCftvPlan
        id="modalUpdateCftvPlan"
        loadCftvPlans={loadCftvPlans}
        selectedCftvPlan={selectedCftvPlan}
      />

      <DeleteCftvPlan
        id="modalDeleteCftvPlan"
        loadCftvPlans={loadCftvPlans}
        selectedCftvPlan={selectedCftvPlan}
      />
    </Container>
  )
}
