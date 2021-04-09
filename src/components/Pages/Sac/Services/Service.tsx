import React, { useCallback, useEffect, useState } from 'react'
import { apiDev } from '../../../../services/apiDev'
import { Button } from '../../../Button'
import { PriceTable } from '../../../Tables/PriceTable'

import { useToast } from '../../../../hooks/toast'
import { useModal } from '../../../../hooks/modal'

import { CreateService } from '../../../Modal/Services/CreateService'
import { UpdateService } from '../../../Modal/Services/UpdateService'
import { DeleteService } from '../../../Modal/Services/DeleteService'

import {
  Container,
  Wrapper
} from '../../../../styles/components/Pages/Sac/Services/Service'

export interface ServiceProps {
  id: number
  value: number
  deadline: number
  service: string
  type_of_payment: string
}

export function Services() {
  const [services, setServices] = useState<ServiceProps[]>([])
  const [selectedService, setSelectedService] = useState<ServiceProps>()

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  useEffect(() => {
    apiDev
      .get('service')
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

  const handleSelectService = useCallback((product: ServiceProps) => {
    setSelectedService(product)
    setDisplayModal('modalUpdateService')
  }, [])

  const CurrencyFormatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL'
  })

  return (
    <Container>
      <PriceTable
        ths={['Serviço', 'Valor', 'Tipo de Pagamento', 'Prazo de Pagamento']}
        isEditable
      >
        {services.map(service => {
          return (
            <tr onClick={() => handleSelectService(service)} key={service.id}>
              <td>{service.service.toLowerCase()}</td>
              <td>{CurrencyFormatter.format(service.value)}</td>
              <td>{service.type_of_payment.toLowerCase()}</td>
              <td>{service.deadline} Dias</td>
            </tr>
          )
        })}
      </PriceTable>
      <Wrapper>
        <Button
          onClick={() => setDisplayModal('modalCreateService')}
          type="button"
        >
          Cadastrar Serviços
        </Button>
      </Wrapper>

      <CreateService
        id="modalCreateService"
        services={services}
        setServices={setServices}
      />

      <UpdateService
        id="modalUpdateService"
        services={services}
        setServices={setServices}
        selectedService={selectedService}
      />

      <DeleteService
        id="modalDeleteService"
        services={services}
        setServices={setServices}
        selectedService={selectedService}
      />
    </Container>
  )
}
