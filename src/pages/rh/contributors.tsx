import Head from 'next/head'
import withAuth from '../../utils/withAuth'

import { useCallback, useState } from 'react'
import { Header } from '../../components/Header'
import { AiOutlineSearch } from '../../styles/icons'

import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Table } from '../../components/Tables/Table'
import { useModal } from '../../hooks/modal'
import { CreateContributors } from '../../components/Modal/Contributors/CreateContributors'
import { UpdateContributors } from '../../components/Modal/Contributors/UpdateContributors'
import { format } from 'date-fns'
import { GetServerSideProps } from 'next'
import { api } from '../../services/api'
import { DeleteContributors } from '../../components/Modal/Contributors/DeleteContributors'
import { useAuth } from '../../hooks/auth'
import { ResultNotFound } from '../../components/Messages/ResultNotFound'
import { useToast } from '../../hooks/toast'

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

function Contributors({ contributorsProps }: ContributorsStateProps) {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [
    selectedContributor,
    setSelectedContributor
  ] = useState<ContributorsProps>()

  const [contributors, setContributors] = useState<ContributorsProps[]>(
    contributorsProps
  )

  const { permissions } = useAuth()
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleSearch = useCallback(
    async data => {
      try {
        const response = await api.get(
          `api/contributor/search?${isActiveFilter}=${data.filter}`
        )

        setContributors(response.data)
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

  const handleUpdateContributor = useCallback(
    (contributor: ContributorsProps) => {
      if (permissions && permissions.includes('RH.COLABORADORES.EDITAR')) {
        setDisplayModal(['modalUpdateContributor'])
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
            {contributors?.map(contributor => {
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
                    {contributor.contri_date_expiration
                      ? format(
                          new Date(contributor.contri_date_expiration),
                          'dd/MM/yyyy'
                        )
                      : null}
                  </td>
                </tr>
              )
            })}
          </Table>
          {!contributors[0] && <ResultNotFound />}
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
            onClick={() => setIsActiveFilter('document')}
            isActive={isActiveFilter === 'document'}
          >
            <div />
            <span>N??mero DOC</span>
          </ButtonFilter>
          <ButtonFilter
            onClick={() => setIsActiveFilter('date_expiration')}
            isActive={isActiveFilter === 'date_expiration'}
          >
            <div />
            <span>Data de Vencimento</span>
          </ButtonFilter>

          {permissions && permissions.includes('RH.COLABORADORES.CRIAR') && (
            <Button
              onClick={() => setDisplayModal(['modalCreateContributors'])}
            >
              Cadastar
            </Button>
          )}
        </WrapperFilter>
      </Content>

      <CreateContributors
        id="modalCreateContributors"
        contributors={contributors}
        setContributors={setContributors}
      />

      <UpdateContributors
        contributors={contributors}
        setContributors={setContributors}
        selectedContributor={selectedContributor}
        id="modalUpdateContributor"
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
    if (
      err.response &&
      err.response.data.message === 'usuario nao tem permissao'
    ) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
      props: {}
    }
  }
}
