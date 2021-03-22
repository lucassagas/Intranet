import Head from 'next/head'
import React, { useCallback, useState } from 'react'
import { Form } from '@unform/web'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Table } from '../../components/Table'
import { GlobalModal } from '../../components/Modal/GlobalModal'

import { AiOutlineSearch, BiLockAlt, FaRegUser } from '../../styles/icons'

import {
  Container,
  ButtonCategory,
  Content,
  Wrapper,
  WrapperFilter,
  ButtonFilter
} from '../../styles/pages/adm/user'
import { useModal } from '../../hooks/modal'

function Users() {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [category, setCategory] = useState('users')

  const { setDisplayModal } = useModal()

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
  }, [setCategory, setIsActiveFilter])

  const handleLoadPermissions = useCallback(() => {
    setCategory('permissions')
    setIsActiveFilter('name')
  }, [setCategory, setIsActiveFilter])

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
              ths={['ID', 'Nome do grupo', 'Criado em', 'Ultima alteração']}
            >
              <tr>
                <td>1</td>
                <td>NOC</td>
                <td>2020-07-03</td>
                <td>2020-07-03</td>
              </tr>
              <tr>
                <td>1</td>
                <td>NOC</td>
                <td>2020-07-03</td>
                <td>2020-07-03</td>
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
              onClick={() => setIsActiveFilter('date')}
              isActive={isActiveFilter === 'date'}
            >
              <span>Data adicionado</span>
            </ButtonFilter>

            <Button>Cadastar</Button>
          </WrapperFilter>
        </Content>
      )}

      {category === 'permissions' && (
        <Content>
          <Wrapper>
            <Table ths={['ID', 'Nome', 'Criado em', 'Ultima alteração']}>
              <tr>
                <td>1</td>
                <td>Noc.edicao</td>
                <td>2020-07-03</td>
                <td>2020-07-03</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Noc.edicao</td>
                <td>2020-07-03</td>
                <td>2020-07-03</td>
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
              onClick={() => setIsActiveFilter('date')}
              isActive={isActiveFilter === 'date'}
            >
              <span>Data adicionado</span>
            </ButtonFilter>

            <Button>Cadastar</Button>
          </WrapperFilter>
        </Content>
      )}
    </Container>
  )
}

export default Users
