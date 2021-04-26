import React, { useCallback, useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import { Button } from '../../../Button'
import { PriceTable } from '../../../Tables/PriceTable'

import { useToast } from '../../../../hooks/toast'
import { useModal } from '../../../../hooks/modal'
import { useAuth } from '../../../../hooks/auth'
import { useRouter } from 'next/router'

import { CreateService } from '../../../Modal/Services/CreateService'
import { UpdateService } from '../../../Modal/Services/UpdateService'
import { DeleteService } from '../../../Modal/Services/DeleteService'

import {
  Container,
  Wrapper
} from '../../../../styles/components/Pages/Sac/Services/Service'

export interface ServiceProps {
  serv_id: number
  serv_name: string
  products: Array<{
    prod_id: number
    prod_name: string
    product_value_string: string
    product_value_boolean: boolean
  }>
}

export function Services() {
  const [services, setServices] = useState<ServiceProps[]>([])
  const [selectedService, setSelectedService] = useState<ServiceProps>()

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()
  const router = useRouter()

  const handleLoadPlans = useCallback(() => {
    api
      .get('/api/service?type=service')
      .then(response => {
        setServices(response.data)
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      })
  }, [])

  useEffect(() => {
    if (!permissions.includes('SAC.SERVICOS.VISUALIZAR')) {
      router.push('/')
    }
    handleLoadPlans()
  }, [])

  const handleSelectService = useCallback((product: ServiceProps) => {
    if (permissions.includes('SAC.SERVICOS.EDITAR')) {
      setSelectedService(product)
      setDisplayModal(['modalUpdateService'])
    }
  }, [])

  const CurrencyFormatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL'
  })

  return (
    <Container>
      <PriceTable
        ths={['Serviço', 'Valor', 'Tipo de Pagamento', 'Prazo de Pagamento']}
        isEditable={permissions.includes('SAC.SERVICOS.EDITAR')}
      >
        {services.map(service => {
          const price = service.products.find(
            product => product.prod_name === 'PRICE'
          )

          const form_payment = service.products.find(
            product => product.prod_name === 'FORM_PAYMENT'
          )

          const deadline = service.products.find(
            product => product.prod_name === 'DEADLINE'
          )

          return (
            <tr
              onClick={() => handleSelectService(service)}
              key={service.serv_id}
            >
              <td>{service.serv_name}</td>
              <td>
                {CurrencyFormatter.format(Number(price.product_value_string))}
              </td>
              <td>{form_payment.product_value_string}</td>
              <td>{deadline.product_value_string}</td>
            </tr>
          )
        })}
      </PriceTable>
      {permissions.includes('SAC.SERVICOS.CRIAR') && (
        <Wrapper>
          <Button
            onClick={() => setDisplayModal(['modalCreateService'])}
            type="button"
          >
            Cadastrar Serviços
          </Button>
        </Wrapper>
      )}

      {permissions.includes('SAC.SERVICOS.CRIAR') && (
        <CreateService
          id="modalCreateService"
          handleLoadPlans={handleLoadPlans}
        />
      )}

      {permissions.includes('SAC.SERVICOS.EDITAR') && (
        <UpdateService
          id="modalUpdateService"
          handleLoadPlans={handleLoadPlans}
          selectedService={selectedService}
        />
      )}

      {permissions.includes('SAC.SERVICOS.DELETAR') && (
        <DeleteService
          id="modalDeleteService"
          handleLoadPlans={handleLoadPlans}
          selectedService={selectedService}
        />
      )}
    </Container>
  )
}
