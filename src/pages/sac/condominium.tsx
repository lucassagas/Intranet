import Head from 'next/head'
import withAuth from '../../utils/withAuth'

import { useCallback, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Header } from '../../components/Header'
import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { apiDev } from '../../services/apiDev'
import { Table } from '../../components/Tables/Table'
import { Paginate } from '../../components/Paginate'

import { CreateCondominium } from '../../components/Modal/Condominuims/CreateCondominium'
import { UpdateCondominium } from '../../components/Modal/Condominuims/UpdateCondominium'
import { DeleteCondominium } from '../../components/Modal/Condominuims/DeleteCondominium'

import { useModal } from '../../hooks/modal'

import { AiOutlineSearch } from '../../styles/icons'
import {
  Container,
  Content,
  Scroll,
  WrapperFilter,
  ButtonFilter
} from '../../styles/pages/sac/condominium'

export interface CondominiumProps {
  id: number
  cep: number
  city: string
  street: string
  number: number
  neighborhood: string
  state: string
  condominium: string
  connection: string
  housing_type: string
  price: number
  observation: string
}

interface CondominuimServerSideProps {
  condominiumProps: CondominiumProps[]
  page: number
}

function Condominium({ condominiumProps, page }: CondominuimServerSideProps) {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [
    selectedCondominium,
    setSelectedCondominium
  ] = useState<CondominiumProps>()
  const [condominiums, setCondominiums] = useState<CondominiumProps[]>(
    condominiumProps
  )

  const { setDisplayModal } = useModal()

  const handleSelectCondominium = useCallback(
    (condominium: CondominiumProps) => {
      setSelectedCondominium(condominium)
      setDisplayModal('modalUpdateCondominium')
    },
    []
  )

  const handleSearch = useCallback(data => {}, [])

  return (
    <Container>
      <Head>
        <title>Intranet | Sac | Condomínios</title>
      </Head>
      <Header category="Sac" route="Condomínios">
        <Paginate totalPages={300} currentPage={page} />
      </Header>
      <Content>
        <Scroll>
          <Table
            isEditable
            ths={['Nome', 'Tipo', 'Rua', 'Número', 'Bairro', 'Cidade']}
          >
            {condominiums?.map(cond => {
              return (
                <tr onClick={() => handleSelectCondominium(cond)} key={cond.id}>
                  <td>{cond.condominium}</td>
                  <td>{cond.housing_type}</td>
                  <td>{cond.street}</td>
                  <td>{cond.number}</td>
                  <td>{cond.neighborhood}</td>
                  <td>{cond.condominium}</td>
                </tr>
              )
            })}
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
              <span>Condominios</span>
            </ButtonFilter>
            <ButtonFilter
              onClick={() => setIsActiveFilter('neighborhood')}
              isActive={isActiveFilter === 'neighborhood'}
            >
              <div />
              <span>Bairro</span>
            </ButtonFilter>
            <ButtonFilter
              onClick={() => setIsActiveFilter('street')}
              isActive={isActiveFilter === 'street'}
            >
              <div />
              <span>Rua</span>
            </ButtonFilter>

            <ButtonFilter
              onClick={() => setIsActiveFilter('city')}
              isActive={isActiveFilter === 'city'}
            >
              <div />
              <span>Cidade</span>
            </ButtonFilter>

            <Button onClick={() => setDisplayModal('modalCreateCondominuim')}>
              Cadastar
            </Button>
          </WrapperFilter>
        </Scroll>

        <CreateCondominium
          condominiums={condominiums}
          setCondominiums={setCondominiums}
          id="modalCreateCondominuim"
        />

        <UpdateCondominium
          condominiums={condominiums}
          setCondominiums={setCondominiums}
          id="modalUpdateCondominium"
          selectedCondominium={selectedCondominium}
        />

        <DeleteCondominium
          condominiums={condominiums}
          setCondominiums={setCondominiums}
          id="modalDeleteCondominium"
          selectedCondominium={selectedCondominium}
        />
      </Content>
    </Container>
  )
}

export default withAuth(Condominium)

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const response = await apiDev.get('condominium')

  const condominiumProps = response.data

  const page = query?.page ? query.page : 1

  return {
    props: { condominiumProps, page }
  }
}
