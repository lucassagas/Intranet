import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useToast } from '../../../../hooks/toast'
import { apiDev } from '../../../../services/apiDev'
import { PriceTable } from '../../../Tables/PriceTable'
import { FiTrash } from '../../../../styles/icons'
import { Button } from '../../../Button'
import { Input } from '../../../Input'
import { useModal } from '../../../../hooks/modal'

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
  id: number
  price_with_fidelity: number
  price_without_fidelity: number
  recording_days: number
}

export function Cftv() {
  const [plansCftv, setPlansCftv] = useState<CftvProps[]>([])
  const [selectedCftvPlan, setSelectedCftvPlan] = useState<CftvProps>()

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  const loadCftvPlans = useCallback(() => {
    apiDev
      .get('cftv')
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

  useEffect(() => {
    loadCftvPlans()
  }, [])

  const PlansTitle = useMemo(
    () =>
      plansCftv.map(plan => (
        <span key={plan.id}>
          {plan.recording_days > 1
            ? `${plan.recording_days} Dias`
            : `${plan.recording_days} Dia`}
        </span>
      )),
    [plansCftv]
  )

  const handleSelectCftvPlan = useCallback((cftvPlan: CftvProps) => {
    setDisplayModal('modalUpdateCftvPlan')
    setSelectedCftvPlan(cftvPlan)
  }, [])

  const handleSubmit = useCallback(() => {}, [])

  return (
    <Container>
      <PriceTable
        isEditable
        ths={['Fidelidade', ...PlansTitle, 'Preço por camera']}
      >
        <tr>
          <td>Sim</td>
          {plansCftv.map(plan => {
            return (
              <td onClick={() => handleSelectCftvPlan(plan)} key={plan.id}>
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
              <td onClick={() => handleSelectCftvPlan(plan)} key={plan.id}>
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

      <Wrapper onSubmit={handleSubmit}>
        <Input
          width="100%"
          name="comments"
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
