import { useCallback, useEffect, useMemo, useState } from 'react'
import { PriceTable } from '../../../Tables/PriceTable'
import { apiDev } from '../../../../services/apiDev'
import { useToast } from '../../../../hooks/toast'
import { BsCheck, BsX, FiTrash } from '../../../../styles/icons'
import { Input } from '../../../Input'
import { Button } from '../../../Button'
import { useModal } from '../../../../hooks/modal'

import { CreateInternetPlan } from '../../../Modal/InternetPlan/CreateInternetPlan'
import { UpdateInternetPlan } from '../../../Modal/InternetPlan/UpdateInternetPlan'
import { DeleteInternetPlan } from '../../../Modal/InternetPlan/DeleteInternetPlan'

import {
  Container,
  Wrapper,
  Comments,
  Actions
} from '../../../../styles/components/Pages/Sac/Plans/Internet'

export interface PlansProps {
  plan_id: number
  plan_title: string
  plan_installation_price: number
  plan_monthly_payment: number
  plan_download: number
  plan_upload: number
  plan_neoredetv: boolean
  plan_neorede_drive: boolean
  plan_paramount: boolean
  plan_noggin: boolean
  plan_telephony: boolean
}

export function Internet() {
  const [plans, setPlans] = useState<PlansProps[]>([])
  const [selectedPlan, setSelectedPlan] = useState<PlansProps>()
  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  const handleLoadPlans = useCallback(() => {
    apiDev
      .get('plans')
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
    setDisplayModal('modalUpdateInternetPlan')
    setSelectedPlan(plan)
  }, [])

  const handleDeleteInternetPlan = useCallback((plan: PlansProps) => {
    setDisplayModal('modalDeleteInternetPlan')
    setSelectedPlan(plan)
  }, [])

  const plansTitle = useMemo(() => plans.map(plan => plan.plan_title), [plans])

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
      preco.push(<td>{formatterCurrency.format(plan.plan_monthly_payment)}</td>)

      download.push(<td>{plan.plan_download}Mb's</td>)

      upload.push(<td>{plan.plan_upload}Mb's</td>)

      ativacao.push(
        <td>{formatterCurrency.format(plan.plan_installation_price)}</td>
      )
      neoredetv.push(
        <td>
          {plan.plan_neoredetv ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      neorededrive.push(
        <td>
          {plan.plan_neorede_drive ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      paramount.push(
        <td>
          {plan.plan_paramount ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      noggin.push(
        <td>
          {plan.plan_noggin ? (
            <BsCheck size={20} color="var(--green)" />
          ) : (
            <BsX size={20} color="var(--danger)" />
          )}
        </td>
      )
      telefonia.push(
        <td>
          {plan.plan_telephony ? (
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
            <button onClick={() => handleDeleteInternetPlan(plan)}>
              Excluir
            </button>
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
          onClick={() => setDisplayModal('modalCreateInternetPlan')}
          type="button"
        >
          Cadastrar Planos
        </Button>
      </Wrapper>
      <Comments>
        <strong>Observações: </strong>
        <div>
          <p>Planos Combo R possuem Wifi de Alta bla bla bla bla bla bla bla</p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>Planos Combo R possuem Wifi de Alta bla bla bla bla bla bla bla</p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>Planos Combo R possuem Wifi de Alta bla bla bla bla bla bla bla</p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>Planos Combo R possuem Wifi de Alta bla bla bla bla bla bla bla</p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>Planos Combo R possuem Wifi de Alta bla bla bla bla bla bla bla</p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>Planos Combo R possuem Wifi de Alta bla bla bla bla bla bla bla</p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>Planos Combo R possuem Wifi de Alta bla bla bla bla bla bla bla</p>
          <FiTrash size={20} />
        </div>
        <div>
          <p>Planos Combo R possuem Wifi de Alta bla bla bla bla bla bla bla</p>
          <FiTrash size={20} />
        </div>
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
