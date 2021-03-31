import Head from 'next/head'
import withAuth from '../../utils/withAuth'

import { useCallback, useState } from 'react'
import { Header } from '../../components/Header'
import { AiOutlineSearch } from '../../styles/icons'

import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Table } from '../../components/Table'
import { useModal } from '../../hooks/modal'
import { CreateContributors } from '../../components/Modal/Contributors/CreateContributors'

import {
  Container,
  Content,
  WrapperFilter,
  ButtonFilter
} from '../../styles/pages/rh/contributors'
import { GetServerSideProps } from 'next'
import { api } from '../../services/api'
import Cookies from 'js-cookie'

interface ContributorsProps {
  contri_id: number
  contri_name: string
  contri_document: string
  contri_type_document: string
  contri_date_expiration
}

function Contributors() {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [contributors, setContributors] = useState<ContributorsProps[]>([])

  const { setDisplayModal } = useModal()

  const handleSearch = useCallback(data => {}, [])
  return (
    <Container>
      <Head>
        <title>Intranet | RH | Colaboradores</title>
      </Head>

      <Header category="RH" route="Colaboradores" />

      <Content>
        <Table
          ths={['Nome', 'Documento', 'Numero', 'Data de Validade']}
          isEditable
        >
          <tr>
            <td>Lucas Sagás</td>
            <td>CPF</td>
            <td>108.119.369-70</td>
            <td>27/03/2026</td>
          </tr>
        </Table>

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
            onClick={() => setIsActiveFilter('number')}
            isActive={isActiveFilter === 'number'}
          >
            <div />
            <span>Número DOC</span>
          </ButtonFilter>
          <ButtonFilter
            onClick={() => setIsActiveFilter('date')}
            isActive={isActiveFilter === 'date'}
          >
            <div />
            <span>Data de Vencimento</span>
          </ButtonFilter>

          <Button onClick={() => setDisplayModal('modalCreateContributors')}>
            Cadastar
          </Button>
        </WrapperFilter>
      </Content>

      <CreateContributors id="modalCreateContributors" />
    </Container>
  )
}

export default withAuth(Contributors)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = Cookies.get('intranet-token')

  console.log(req.cookies)

  console.log(token)
  // const response = await api.get(`api/contributor`)

  return {
    props: {}
  }
}
