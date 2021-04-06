import { PriceTable } from '../../../Tables/PriceTable'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLoading } from '../../../../hooks/loading'
import { apiDev } from '../../../../services/apiDev'
import { useToast } from '../../../../hooks/toast'
import { BsCheck, BsX, FiTrash } from '../../../../styles/icons'

import { Input } from '../../../Input'
import { Button } from '../../../Button'
import { CreateInternetPlan } from '../../../Modal/InternetPlan/CreateInternetPlan'
import { useModal } from '../../../../hooks/modal'

import {
  Container,
  Wrapper,
  Comments
} from '../../../../styles/components/Pages/Plans/Internet'

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
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  const reloadPlans = useCallback(() => {
    setLoadingScreen(true)
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
      .finally(() => setLoadingScreen(false))
  }, [])

  useEffect(() => {
    reloadPlans()
  }, [])

  const handleSubmit = useCallback(() => {}, [])

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
      telefonia
    }
  }, [plans])

  return (
    <Container>
      <PriceTable title="Plano" ths={['Plano', ...plansTitle]}>
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
        reloadPlans={reloadPlans}
        id="modalCreateInternetPlan"
      />
    </Container>
  )
}
