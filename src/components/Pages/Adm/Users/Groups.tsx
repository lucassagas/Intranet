import { parseISO, format } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../../../../hooks/modal'
import { Table } from '../../../Table'
import { Form } from '@unform/web'
import { Button } from '../../../Button'
import { Input } from '../../../Input'

import { AiOutlineSearch } from '../../../../styles/icons'

import {
  Content,
  Wrapper,
  WrapperFilter,
  ButtonFilter
} from '../../../../styles/components/Pages/Adm/Users/Group'
import { CreateGroup } from '../../../Modal/Group/CreateGroup'
import { EditGroup } from '../../../Modal/Group/EditGroup'
import { DeleteGroup } from '../../../Modal/Group/DeleteGroup'
import { api } from '../../../../services/api'
import { useToast } from '../../../../hooks/toast'

export interface PermissionsProps {
  perm_id: number
  perm_name: string
  created_at: string
  updated_at: string
}

interface pageProps {
  page_name: string
  page_permissions: PermissionsProps[]
}

export interface GroupAndPermissionsProps {
  page_index: string
  pages: pageProps[]
}

export interface GroupsProps {
  group_id: number
  group_name: string
  created_at: string
  updated_at: string
}

export function Groups() {
  const [groups, setGroups] = useState<GroupsProps[]>([])
  const [selectedItem, setSelectedItem] = useState(0)
  const [isActiveFilter, setIsActiveFilter] = useState('name')

  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  useEffect(() => {
    handleLoadGroups()
  }, [])

  const handleSelectGroup = useCallback((group_id: number) => {
    setSelectedItem(group_id)
    setDisplayModal(group_id)
  }, [])

  const handleSearch = useCallback(data => {
    console.log(data)
  }, [])

  const handleLoadGroups = useCallback(() => {
    setIsActiveFilter('name')

    api
      .get('api/group')
      .then(response => {
        setGroups(response.data)
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Error',
          description: 'Erro ao carregar grupos, contate um administrador'
        })
      })
  }, [setIsActiveFilter])

  return (
    <Content>
      <Wrapper>
        <Table
          isEditable
          ths={['ID', 'Nome do grupo', 'Criado em', 'Ultima alteração']}
        >
          {groups.map(group => {
            const parsedCreatedDate = format(
              parseISO(group.created_at),
              'dd/MM/yyyy - HH:mm'
            )

            const parsedUpdatedDate = format(
              parseISO(group.updated_at),
              'dd/MM/yyyy - HH:mm'
            )

            return (
              <tr
                onClick={() => handleSelectGroup(group.group_id)}
                key={group.group_id}
              >
                <td>{group.group_id}</td>
                <td>{group.group_name}</td>
                <td>{parsedCreatedDate}</td>
                <td>{parsedUpdatedDate}</td>
                {/* <td>
                <DeleteButton
                  onClick={(event: MouseEvent) => {
                    setDisplayModal('modalDeleteGroup')
                    event.stopPropagation()
                    setSelectedGroupName({
                      groupName: group.group_name,
                      id: group.group_id
                    })
                  }}
                  type="button"
                >
                  Deletar
                </DeleteButton>
              </td> */}
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
          <span>Nome</span>
        </ButtonFilter>

        <ButtonFilter
          onClick={() => setIsActiveFilter('date')}
          isActive={isActiveFilter === 'date'}
        >
          <span>Data adicionado</span>
        </ButtonFilter>

        <Button onClick={() => setDisplayModal('modalCreateGroup')}>
          Cadastar
        </Button>
      </WrapperFilter>

      <CreateGroup
        groups={groups}
        setGroups={setGroups}
        id="modalCreateGroup"
      />

      <EditGroup id={selectedItem} />

      <DeleteGroup reloadFunction={handleLoadGroups} id="modalDeleteGroup" />
    </Content>
  )
}
