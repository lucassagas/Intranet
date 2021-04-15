import Head from 'next/head'
import withAuth from '../../utils/withAuth'

import { useCallback, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Header } from '../../components/Header'
import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { api } from '../../services/api'
import { Table } from '../../components/Tables/Table'
import { Paginate } from '../../components/Paginate'

import { CreateCondominium } from '../../components/Modal/Condominuims/CreateCondominium'
import { UpdateCondominium } from '../../components/Modal/Condominuims/UpdateCondominium'
import { DeleteCondominium } from '../../components/Modal/Condominuims/DeleteCondominium'

import { useModal } from '../../hooks/modal'
import { useAuth } from '../../hooks/auth'

import { AiOutlineSearch } from '../../styles/icons'
import {
  Container,
  Content,
  Scroll,
  WrapperFilter,
  ButtonFilter
} from '../../styles/pages/sac/condominium'
import { useToast } from '../../hooks/toast'

export interface CondominiumProps {
  cond_id: number
  cond_name: string
  cond_type: string
  cond_connection: string
  cond_neigh: string
  cond_street: string
  cond_number: number
  cond_price: string
  city_name: string
  cond_obs: string
}

interface CondominuimServerSideProps {
  condominiumProps: CondominiumProps[]
  page: number
  totalPagesProps: number
}

function Condominium({
  condominiumProps,
  page,
  totalPagesProps
}: CondominuimServerSideProps) {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [totalPages, setTotalPages] = useState<number>(totalPagesProps)
  const [condominiums, setCondominiums] = useState<CondominiumProps[]>(
    condominiumProps
  )
  const [
    selectedCondominium,
    setSelectedCondominium
  ] = useState<CondominiumProps>()

  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()
  const { addToast } = useToast()

  useEffect(() => {
    setCondominiums(condominiumProps)
  }, [page])

  const handleSelectCondominium = useCallback(
    (condominium: CondominiumProps) => {
      setSelectedCondominium(condominium)
      setDisplayModal('modalUpdateCondominium')
    },
    []
  )

  function removeAccents(str) {
    return str.normalize('NFD').replace(/[^a -zA -Zs]/g, '')
  }

  const handleSearch = useCallback(
    async data => {
      try {
        const response = await api.get(
          `api/condominium/search?${isActiveFilter}=${
            isActiveFilter === 'city' ? removeAccents(data.filter) : data.filter
          }&limit=20`
        )

        setCondominiums(response.data.items)
        setTotalPages(response.data.meta.totalPages)
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      }
    },
    [isActiveFilter]
  )

  return (
    <Container>
      <Head>
        <title>Intranet | Sac | Condomínios</title>
      </Head>
      <Header category="Sac" route="Condomínios">
        <Paginate totalPages={totalPages} currentPage={page} />
      </Header>
      <Content>
        <Scroll>
          <Table
            isEditable
            ths={['Nome', 'Tipo', 'Rua', 'Número', 'Bairro', 'Cidade']}
          >
            {condominiums?.map(cond => {
              return (
                <tr
                  onClick={() => handleSelectCondominium(cond)}
                  key={cond.cond_id}
                >
                  <td>{cond.cond_name}</td>
                  <td>{cond.cond_type}</td>
                  <td>{cond.cond_street}</td>
                  <td>{cond.cond_number}</td>
                  <td>{cond.cond_neigh}</td>
                  <td>{cond.city_name}</td>
                </tr>
              )
            })}
          </Table>

          <WrapperFilter>
            <Form onSubmit={handleSearch}>
              <Input name="filter" placeholder="Buscar" />
              <button type="submit">
                <AiOutlineSearch size={20} />
              </button>
            </Form>

            <ButtonFilter
              onClick={() => setIsActiveFilter('name')}
              isActive={isActiveFilter === 'name'}
            >
              <div />
              <span>Condominios</span>
            </ButtonFilter>
            <ButtonFilter
              onClick={() => setIsActiveFilter('neigh')}
              isActive={isActiveFilter === 'neigh'}
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

            {permissions.includes('SAC.CONDOMINIOS.CRIAR') && (
              <Button onClick={() => setDisplayModal('modalCreateCondominuim')}>
                Cadastar
              </Button>
            )}
          </WrapperFilter>
        </Scroll>

        {permissions.includes('SAC.CONDOMINIOS.CRIAR') && (
          <CreateCondominium
            condominiums={condominiums}
            setCondominiums={setCondominiums}
            id="modalCreateCondominuim"
          />
        )}

        <UpdateCondominium
          condominiums={condominiums}
          setCondominiums={setCondominiums}
          id="modalUpdateCondominium"
          selectedCondominium={selectedCondominium}
        />

        {permissions.includes('SAC.CONDOMINIOS.DELETAR') && (
          <DeleteCondominium
            condominiums={condominiums}
            setCondominiums={setCondominiums}
            id="modalDeleteCondominium"
            selectedCondominium={selectedCondominium}
          />
        )}
      </Content>
    </Container>
  )
}

export default withAuth(Condominium)

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req
}) => {
  try {
    const page = query?.page ? query.page : 1

    const response = await api.get(
      `api/condominium/paginate?page=${page}&limit=20`,
      {
        headers: {
          tokenaccess: req.cookies['intranet-token']
        }
      }
    )

    console.log(response.data)

    const condominiumProps = response.data.items
    const totalPagesProps = response.data.meta.totalPages

    return {
      props: { condominiumProps, page, totalPagesProps }
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}
