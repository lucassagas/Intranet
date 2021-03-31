import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../../../../hooks/modal'
import { api } from '../../../../services/api'
import { parseISO, format } from 'date-fns'
import { Table } from '../../../Table'
import { Form } from '@unform/web'
import { Input } from '../../../Input'
import { Button } from '../../../Button'

import { AiOutlineSearch } from '../../../../styles/icons'

import {
  Content,
  Wrapper,
  WrapperFilter,
  ButtonFilter
} from '../../../../styles/components/Pages/Adm/Users/Users'
import { CreateUser } from '../../../Modal/User/CreateUser'
import { EditUser } from '../../../Modal/User/EditUser'

interface userProps {
  user_id: number
  user_name: string
  user_email: string
  user_status: boolean
  group_name: string
  created_at: string
}

export interface UniqueUserProps {
  user_id: number
  user_name: string
  user_email: string
  user_status: boolean
  group_name: string
  created_at: string
}

export function Users() {
  const [selectedUser, setSelectedUser] = useState<UniqueUserProps>()
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [users, setUsers] = useState<userProps[]>([])

  const { setDisplayModal } = useModal()

  useEffect(() => {
    handleLoadUsers()
  }, [])

  const handleLoadUsers = useCallback(() => {
    setIsActiveFilter('name')
    api.get('api/user').then(response => {
      setUsers(response.data)
    })
  }, [])

  const handleSearch = useCallback(data => {}, [])

  return (
    <Content>
      <Wrapper>
        <Table isEditable ths={['Nome', 'E-mail', 'Data adicionado', 'Grupo']}>
          {users &&
            users.map(user => {
              const parsedCreatedDate = format(
                parseISO(user.created_at),
                'dd/MM/yyyy - HH:mm'
              )

              return (
                <tr
                  onClick={() => {
                    setDisplayModal('modalEditUser')
                    setSelectedUser(user)
                  }}
                  key={user.user_id}
                >
                  <td>{user.user_name}</td>
                  <td>{user.user_email}</td>
                  <td>{parsedCreatedDate}</td>
                  <td>{user.group_name}</td>
                </tr>
              )
            })}
        </Table>
      </Wrapper>
      <WrapperFilter>
        <Form onSubmit={handleSearch}>
          <Input name="filter" placeholder="Buscar" />
          <AiOutlineSearch size={20} />
        </Form>

        <ButtonFilter
          onClick={() => setIsActiveFilter('name')}
          isActive={isActiveFilter === 'name'}
        >
          <div />
          <span>Nome</span>
        </ButtonFilter>
        <ButtonFilter
          onClick={() => setIsActiveFilter('email')}
          isActive={isActiveFilter === 'email'}
        >
          <div />
          <span>E-mail</span>
        </ButtonFilter>
        <ButtonFilter
          onClick={() => setIsActiveFilter('date')}
          isActive={isActiveFilter === 'date'}
        >
          <div />
          <span>Data adicionado</span>
        </ButtonFilter>

        <ButtonFilter
          onClick={() => setIsActiveFilter('group')}
          isActive={isActiveFilter === 'group'}
        >
          <div />
          <span>Grupo</span>
        </ButtonFilter>

        <Button onClick={() => setDisplayModal('modalCreateUser')}>
          Cadastar
        </Button>
      </WrapperFilter>

      <CreateUser reloadFunction={handleLoadUsers} id="modalCreateUser" />
      <EditUser
        reloadFunction={handleLoadUsers}
        id="modalEditUser"
        user={selectedUser}
      />
    </Content>
  )
}
