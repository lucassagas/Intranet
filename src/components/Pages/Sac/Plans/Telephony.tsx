import { PriceTable } from '../../../Tables/PriceTable'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { apiDev } from '../../../../services/apiDev'
import { useToast } from '../../../../hooks/toast'
import { BsCheck, BsX, FiTrash } from '../../../../styles/icons'
import { Input } from '../../../Input'
import { Button } from '../../../Button'
import { useModal } from '../../../../hooks/modal'
import { CreateTelephonyPlan } from '../../../Modal/TelephonyPlan/CreateTelephonyPlan'
import { UpdateTelephonyPlan } from '../../../Modal/TelephonyPlan/UpdateTelephonyPlan'
import { DeleteTelephonyPlan } from '../../../Modal/TelephonyPlan/DeleteTelephonyPlan'

import {
  Container,
  Wrapper,
  Comments,
  Actions
} from '../../../../styles/components/Pages/Plans/Telephony'

export interface PlansProps {
  plan_id: number
  plan_title: string
  plan_installation_price: number
  plan_monthly_payment: number
  plan_minutes: number
  plan_branches: number
  plan_fix_local: boolean
  plan_fix_ddd: boolean
  plan_mov_local: boolean
  plan_mov_ddd: boolean
  plan_international: boolean
}

export function Telephony() {
  const [plans, setPlans] = useState<PlansProps[]>([])
  const [selectedPlan, setSelectedPlan] = useState<PlansProps>()
  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  const handleLoadPlans = useCallback(() => {
    apiDev
      .get('telephony')
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
    handleLoadPlans()
  }, [])

  const handleSubmit = useCallback(() => {}, [])

  const handleSelectPlan = useCallback((plan: PlansProps) => {
    setDisplayModal('modalUpdateTelephonyPlan')
    setSelectedPlan(plan)
  }, [])

  const handleDeleteTelephonyPlan = useCallback((plan: PlansProps) => {
    setDisplayModal('modalDeleteTelephonyPlan')
    setSelectedPlan(plan)
  }, [])

  const plansTitle = useMemo(() => plans.map(plan => plan.plan_title), [plans])

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
      preco.push(<td>{formatterCurrency.format(plan.plan_monthly_payment)}</td>)

      ativacao.push(
        <td>{formatterCurrency.format(plan.plan_installation_price)}</td>
      )

      minutos.push(<td>{plan.plan_minutes}</td>)

      ramais.push(<td>{plan.plan_branches}</td>)

      fixo_local.push(
        <td>
          {plan.plan_fix_local ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      fixo_ddd.push(
        <td>
          {plan.plan_fix_ddd ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      movel_local.push(
        <td>
          {plan.plan_mov_local ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      movel_ddd.push(
        <td>
          {plan.plan_mov_ddd ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      internacionais.push(
        <td>
          {plan.plan_international ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      actions.push(
        <td>
          <Actions>
            <button onClick={() => handleSelectPlan(plan)}>Editar</button>
            <button onClick={() => handleDeleteTelephonyPlan(plan)}>
              Excluir
            </button>
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
        <tr>
          <td>Ações</td>
          {formattedPlan.actions}
        </tr>
      </PriceTable>
      <Wrapper onSubmit={handleSubmit}>
        <Input
          width="100%"
          name="comments"
          type="text"
          placeholder="Inserir observações"
        />
        <Button type="submit">Inserir Observações</Button>
        <Button
          onClick={() => setDisplayModal('modalCreateTelephonyPlan')}
          type="button"
        >
          Cadastrar Planos
        </Button>
      </Wrapper>
      <Comments>
        <strong>Observações: </strong>
        <div>
          <p>
            Planos de telefonia PABX são planos que possuem RAMAIS + URA para o
            cliente final.
          </p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>
            Planos de telefonia PABX são planos que possuem RAMAIS + URA para o
            cliente final.
          </p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>
            Planos de telefonia PABX são planos que possuem RAMAIS + URA para o
            cliente final.
          </p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>
            Planos de telefonia PABX são planos que possuem RAMAIS + URA para o
            cliente final.
          </p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>
            Planos de telefonia PABX são planos que possuem RAMAIS + URA para o
            cliente final.
          </p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>
            Planos de telefonia PABX são planos que possuem RAMAIS + URA para o
            cliente final.
          </p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>
            Planos de telefonia PABX são planos que possuem RAMAIS + URA para o
            cliente final.
          </p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>
            Planos de telefonia PABX são planos que possuem RAMAIS + URA para o
            cliente final.
          </p>
          <FiTrash size={20} />
        </div>
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
