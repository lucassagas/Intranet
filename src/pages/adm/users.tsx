import Head from 'next/head'
import React, { useCallback, useState } from 'react'
import { Form } from '@unform/web'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Table } from '../../components/Table'
import { CreatePermission } from '../../components/Modal/Permission/CreatePermission'
import { CreateGroup } from '../../components/Modal/Group/CreateGroup'
import { useModal } from '../../hooks/modal'
import { parseISO, format } from 'date-fns'
import { useToast } from '../../hooks/toast'
import { api } from '../../services/api'

import {
  AiOutlineSearch,
  BiLockAlt,
  FaRegUser,
  IoIosArrowDown
} from '../../styles/icons'

import {
  Container,
  ButtonCategory,
  Content,
  Wrapper,
  WrapperFilter,
  ButtonFilter,
  CategoryList,
  PageList,
  PermissionList,
  Section,
  TitlePage
} from '../../styles/pages/adm/user'
import { EditGroup } from '../../components/Modal/Group/EditGroup'

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

function Users() {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [isActiveCategory, setIsActiveCategory] = useState('')
  const [isActivePage, setIsActivePage] = useState('')
  const [category, setCategory] = useState('users')
  const [permissions, setPermissions] = useState<GroupAndPermissionsProps[]>([])

  const [groups, setGroups] = useState<GroupsProps[]>([])
  const [selectedItem, setSelectedItem] = useState(0)

  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleSearch = useCallback(data => {
    console.log(data)
  }, [])

  const handleLoadUsers = useCallback(() => {
    setCategory('users')
    setIsActiveFilter('name')
  }, [setCategory, setIsActiveFilter])

  const handleLoadGroups = useCallback(() => {
    setCategory('groups')
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
  }, [setCategory, setIsActiveFilter])

  const handleSelectGroup = useCallback((group_id: number) => {
    setSelectedItem(group_id)
    setDisplayModal(group_id)
  }, [])

  const handleLoadPermissions = useCallback(() => {
    setCategory('permissions')
    setIsActiveFilter('name')

    api
      .get('api/permission')
      .then(response => {
        setPermissions(response.data)
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Error',
          description: 'Erro ao carregar permissões, contate um administrador'
        })
      })
  }, [setCategory, setIsActiveFilter])

  const handleOpenCategory = useCallback(
    category => {
      if (isActiveCategory === category) {
        setIsActiveCategory('')

        return
      }

      setIsActiveCategory(category)
    },
    [isActiveCategory]
  )

  const handleOpenPage = useCallback(
    page => {
      if (isActivePage === page) {
        setIsActivePage('')

        return
      }

      setIsActivePage(page)
    },
    [isActivePage]
  )

  return (
    <Container>
      <Head>
        <title> ADM | Usuários</title>
      </Head>

      <Header category="Adm" route="Usuários">
        {category !== 'groups' && (
          <ButtonCategory onClick={handleLoadGroups}>
            <FaRegUser size={20} /> Grupos
          </ButtonCategory>
        )}

        {category !== 'users' && (
          <ButtonCategory onClick={handleLoadUsers}>
            <BiLockAlt size={20} /> Usuários
          </ButtonCategory>
        )}

        {category !== 'permissions' && (
          <ButtonCategory onClick={handleLoadPermissions}>
            <BiLockAlt size={20} /> Permissões
          </ButtonCategory>
        )}
      </Header>

      {category === 'users' && (
        <Content>
          <Wrapper>
            <Table ths={['Nome', 'E-mail', 'Data adicionado', 'Grupo']}>
              <tr>
                <td>ANDRESSA DIAS DOS SANTOS NEIGRAMES</td>
                <td>terc.andressadias@neorede.com.br</td>
                <td>2020-07-03</td>
                <td>sac</td>
              </tr>
              <tr>
                <td>Lucas Saǵas</td>
                <td>lucassaagas@gmail.com</td>
                <td>2020-07-03</td>
                <td>sac</td>
              </tr>
              <tr>
                <td>Isaque Santos</td>
                <td>isaque@gmail.com</td>
                <td>2020-07-03</td>
                <td>sac</td>
              </tr>
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
              onClick={() => setIsActiveFilter('email')}
              isActive={isActiveFilter === 'email'}
            >
              <span>E-mail</span>
            </ButtonFilter>
            <ButtonFilter
              onClick={() => setIsActiveFilter('date')}
              isActive={isActiveFilter === 'date'}
            >
              <span>Data adicionado</span>
            </ButtonFilter>

            <ButtonFilter
              onClick={() => setIsActiveFilter('group')}
              isActive={isActiveFilter === 'group'}
            >
              <span>Grupo</span>
            </ButtonFilter>

            <Button>Cadastar</Button>
          </WrapperFilter>
        </Content>
      )}

      {category === 'groups' && (
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
        </Content>
      )}

      {console.log(isActiveCategory)}

      {category === 'permissions' && (
        <Content>
          <Wrapper>
            <CategoryList>
              {permissions.map(permission => {
                return (
                  <Section
                    isActiveCategory={
                      isActiveCategory === permission.page_index
                    }
                    key={permission.page_index}
                  >
                    <strong
                      onClick={() => handleOpenCategory(permission.page_index)}
                    >
                      {permission.page_index.toUpperCase()}
                      <IoIosArrowDown size={18} />
                    </strong>
                    <PageList
                      isActiveCategory={
                        isActiveCategory === permission.page_index
                      }
                    >
                      {permission.pages.map(page => (
                        <React.Fragment key={page.page_name}>
                          <TitlePage
                            isActivePage={isActivePage === page.page_name}
                            onClick={() => handleOpenPage(page.page_name)}
                          >
                            {page.page_name.toUpperCase()}
                            <IoIosArrowDown size={18} />
                          </TitlePage>
                          <PermissionList
                            isActivePage={isActivePage === page.page_name}
                          >
                            {page.page_permissions.map(permission => (
                              <button key={permission.perm_id} type="button">
                                {permission.perm_name.toLocaleUpperCase()}
                              </button>
                            ))}
                          </PermissionList>
                        </React.Fragment>
                      ))}
                    </PageList>
                  </Section>
                )
              })}
            </CategoryList>
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

            <Button onClick={() => setDisplayModal('modalCreatePermission')}>
              Cadastar
            </Button>
          </WrapperFilter>
        </Content>
      )}

      <CreatePermission
        permissions={permissions}
        setPermissions={setPermissions}
        id="modalCreatePermission"
      />

      <CreateGroup
        groups={groups}
        setGroups={setGroups}
        id="modalCreateGroup"
      />

      <EditGroup id={selectedItem} />
    </Container>
  )
}

export default Users
