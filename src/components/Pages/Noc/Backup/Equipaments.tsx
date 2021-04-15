import { Form } from '@unform/web'
import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineSearch } from '../../../../styles/icons'
import { Input } from '../../../Input'

import {
  Scroll,
  WrapperFilter,
  ButtonFilter
} from '../../../../styles/components/Pages/Noc/Backup/Equipaments'
import { Table } from '../../../Tables/Table'
import { Button } from '../../../Button'
import { useModal } from '../../../../hooks/modal'
import { CreateEquipament } from '../../../Modal/EquipamentBackup/CreateEquipament'
import { apiDev } from '../../../../services/apiDev'
import { useToast } from '../../../../hooks/toast'
import { UpdateEquipament } from '../../../Modal/EquipamentBackup/UpdateEquipament'

export interface EquipamentsProps {
  id: number
  name: string
  status: string
  city: string
  ip: string
  equipament: string
  manufactory: string
  access: string
  user: string
  password: string
  port: number
}

export function Equipaments() {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [selectedEquipment, setSelectedEquipment] = useState<EquipamentsProps>()
  const [equipaments, setEquipaments] = useState<EquipamentsProps[]>([])

  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleSearch = useCallback(data => {}, [])

  const handleLoadEquipaments = useCallback(async () => {
    try {
      const response = await apiDev.get('equipament')
      setEquipaments(response.data)
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: err.response ? err.response.data.message : err.message
      })
    }
  }, [])

  useEffect(() => {
    handleLoadEquipaments()
  }, [])

  const handleSelectEquipament = useCallback((equipment: EquipamentsProps) => {
    setDisplayModal('modalUpdateEquipment')
    setSelectedEquipment(equipment)
  }, [])

  return (
    <Scroll>
      <Table
        isEditable
        ths={['Nome', 'Cidade', 'IP', 'Equipamento', 'Fabricante']}
      >
        {equipaments.map(equip => {
          return (
            <tr onClick={() => handleSelectEquipament(equip)} key={equip.id}>
              <td>{equip.name}</td>
              <td>{equip.city}</td>
              <td>{equip.ip}</td>
              <td>{equip.equipament}</td>
              <td>{equip.manufactory}</td>
            </tr>
          )
        })}
      </Table>
      <WrapperFilter>
        <Form onSubmit={handleSearch}>
          <Input name="filter" placeholder="Buscar" />
          <button type="button">
            <AiOutlineSearch size={20} />
          </button>
        </Form>

        <ButtonFilter
          onClick={() => setIsActiveFilter('name')}
          isActive={isActiveFilter === 'name'}
        >
          <div />
          <span>Nome</span>
        </ButtonFilter>
        <ButtonFilter
          onClick={() => setIsActiveFilter('city')}
          isActive={isActiveFilter === 'city'}
        >
          <div />
          <span>Cidade</span>
        </ButtonFilter>
        <ButtonFilter
          onClick={() => setIsActiveFilter('ip')}
          isActive={isActiveFilter === 'ip'}
        >
          <div />
          <span>IP</span>
        </ButtonFilter>
        <ButtonFilter
          onClick={() => setIsActiveFilter('equipment')}
          isActive={isActiveFilter === 'equipment'}
        >
          <div />
          <span>Equipamento</span>
        </ButtonFilter>
        <ButtonFilter
          onClick={() => setIsActiveFilter('manufactory')}
          isActive={isActiveFilter === 'manufactory'}
        >
          <div />
          <span>Fabricante</span>
        </ButtonFilter>

        <Button
          type="button"
          onClick={() => setDisplayModal('modalCreateEquipament')}
        >
          Cadastar
        </Button>
      </WrapperFilter>

      <CreateEquipament
        handleLoadEquipaments={handleLoadEquipaments}
        id="modalCreateEquipament"
      />

      <UpdateEquipament
        handleLoadEquipaments={handleLoadEquipaments}
        id="modalUpdateEquipment"
        selectedEquipment={selectedEquipment}
      />
    </Scroll>
  )
}
