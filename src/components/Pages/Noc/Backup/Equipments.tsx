import { Form } from '@unform/web'
import { Input } from '../../../Input'
import { Table } from '../../../Tables/Table'
import { Button } from '../../../Button'
import { api } from '../../../../services/api'

import { CreateEquipment } from '../../../Modal/EquipmentBackup/CreateEquipment'
import { UpdateEquipment } from '../../../Modal/EquipmentBackup/UpdateEquipment'
import { DeleteEquipment } from '../../../Modal/EquipmentBackup/DeleteEquipment'

import { useCallback, useEffect, useState } from 'react'
import { useModal } from '../../../../hooks/modal'
import { useToast } from '../../../../hooks/toast'
import { useAuth } from '../../../../hooks/auth'
import { useRouter } from 'next/router'

import { AiOutlineSearch } from '../../../../styles/icons'
import {
  Scroll,
  WrapperFilter,
  ButtonFilter
} from '../../../../styles/components/Pages/Noc/Backup/Equipments'

export interface EquipmentsProps {
  bkp_equi_id: number
  bkp_equi_name: string
  bkp_equi_status: boolean
  city_name: string
  bkp_equi_ip: string
  bkp_equi_type: string
  manu_name: string
  bkp_equi_access: string
  bkp_equi_username: string
  bkp_equi_password: string
  bkp_equi_port: number
}

export function Equipments() {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentsProps>()
  const [equipments, setEquipments] = useState<EquipmentsProps[]>([])

  const { setDisplayModal } = useModal()
  const { addToast } = useToast()
  const { permissions } = useAuth()
  const router = useRouter()

  const handleSearch = useCallback(data => {}, [])

  const handleLoadEquipments = useCallback(async () => {
    try {
      const response = await api.get('api/bkp_equipment')
      setEquipments(response.data)
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: err.response ? err.response.data.message : err.message
      })
    }
  }, [])

  useEffect(() => {
    if (!permissions.includes('NOC.BACKUP.VISUALIZAR')) {
      router.replace('/')
    }
    handleLoadEquipments()
  }, [])

  const handleSelectEquipment = useCallback((equipment: EquipmentsProps) => {
    setDisplayModal(['modalUpdateEquipment'])
    setSelectedEquipment(equipment)
  }, [])

  return (
    <Scroll>
      <Table
        isEditable
        ths={['Nome', 'Cidade', 'IP', 'Equipamento', 'Fabricante']}
      >
        {equipments.map(equip => {
          return (
            <tr
              onClick={() => handleSelectEquipment(equip)}
              key={equip.bkp_equi_id}
            >
              <td>{equip.bkp_equi_name}</td>
              <td>{equip.city_name}</td>
              <td>{equip.bkp_equi_ip}</td>
              <td>{equip.bkp_equi_type}</td>
              <td>{equip.manu_name}</td>
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

        {permissions.includes('NOC.BACKUP.CRIAR') && (
          <Button
            type="button"
            onClick={() => setDisplayModal(['modalCreateEquipament'])}
          >
            Cadastar
          </Button>
        )}
      </WrapperFilter>

      {permissions.includes('NOC.BACKUP.CRIAR') && (
        <CreateEquipment
          handleLoadEquipments={handleLoadEquipments}
          id="modalCreateEquipament"
        />
      )}

      {permissions.includes('NOC.BACKUP.VISUALIZAR') && (
        <UpdateEquipment
          handleLoadEquipments={handleLoadEquipments}
          id="modalUpdateEquipment"
          selectedEquipment={selectedEquipment}
        />
      )}

      {permissions.includes('NOC.BACKUP.DELETAR') && (
        <DeleteEquipment
          handleLoadEquipments={handleLoadEquipments}
          id="modalDeleteEquipment"
          selectedEquipment={selectedEquipment}
        />
      )}
    </Scroll>
  )
}
