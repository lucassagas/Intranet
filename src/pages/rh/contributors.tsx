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
import { UpdateContributors } from '../../components/Modal/Contributors/UpdateContributors'
import { format } from 'date-fns'
import { GetServerSideProps } from 'next'
import { api } from '../../services/api'
import { DeleteContributors } from '../../components/Modal/Contributors/DeleteContributors'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  Content,
  WrapperFilter,
  ButtonFilter,
  Scroll
} from '../../styles/pages/rh/contributors'

export interface ContributorsProps {
  contri_id: number
  contri_name: string
  contri_document: string
  contri_type_document: string
  contri_date_expiration: string
  contri_date_birth: string
}

export interface ContributorsStateProps {
  contributorsProps: ContributorsProps[]
}

function Contributors(contributorsProps: ContributorsStateProps) {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [
    selectedContributor,
    setSelectedContributor
  ] = useState<ContributorsProps>()

  const [contributors, setContributors] = useState<ContributorsStateProps>(
    contributorsProps
  )

  const { permissions } = useAuth()
  const { setDisplayModal } = useModal()

  const handleSearch = useCallback(data => {}, [])

  const handleUpdateContributor = useCallback(
    (contributor: ContributorsProps) => {
      if (permissions && permissions.includes('RH.COLABORADORES.EDITAR')) {
        setDisplayModal('modalUpdateContributor')
        setSelectedContributor(contributor)
      }
    },
    []
  )

  return (
    <Container>
      <Head>
        <title>Intranet | RH | Colaboradores</title>
      </Head>

      <Header category="RH" route="Colaboradores" />

      <Content>
        <Scroll>
          <Table
            ths={['Nome', 'Documento', 'Numero', 'Data de Validade']}
            isEditable={
              permissions && permissions.includes('RH.COLABORADORES.EDITAR')
            }
          >
            {contributors &&
              contributors.contributorsProps.map(contributor => {
                return (
                  <tr
                    onClick={() => {
                      handleUpdateContributor(contributor)
                    }}
                    key={contributor.contri_id}
                  >
                    <td>{contributor.contri_name}</td>
                    <td>{contributor.contri_type_document}</td>
                    <td>{contributor.contri_document}</td>
                    <td style={{ textAlign: 'center' }}>
                      {format(
                        new Date(contributor.contri_date_expiration),
                        'dd/MM/yyyy'
                      )}
                    </td>
                  </tr>
                )
              })}
          </Table>
        </Scroll>

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

          {permissions && permissions.includes('RH.COLABORADORES.CRIAR') && (
            <Button onClick={() => setDisplayModal('modalCreateContributors')}>
              Cadastar
            </Button>
          )}
        </WrapperFilter>
      </Content>

      <UpdateContributors
        contributors={contributors}
        setContributors={setContributors}
        selectedContributor={selectedContributor}
        id="modalUpdateContributor"
      />

      <CreateContributors
        id="modalCreateContributors"
        contributors={contributors}
        setContributors={setContributors}
      />

      <DeleteContributors
        id="modalDeleteContributor"
        selectedContributor={selectedContributor}
        contributors={contributors}
        setContributors={setContributors}
      />
    </Container>
  )
}

export default withAuth(Contributors)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const response = await api.get(`api/contributor`, {
      headers: {
        tokenaccess: req.cookies['intranet-token']
      }
    })

    const contributorsProps = response.data

    return {
      props: { contributorsProps }
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
