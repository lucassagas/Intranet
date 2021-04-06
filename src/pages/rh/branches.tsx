import Head from 'next/head'
import withAuth from '../../utils/withAuth'
import { Header } from '../../components/Header'
import { AiOutlineSearch } from '../../styles/icons'
import { Table } from '../../components/Tables/Table'
import { useModal } from '../../hooks/modal'
import { useAuth } from '../../hooks/auth'
import { useCallback, useState } from 'react'
import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { GetServerSideProps } from 'next'
import { UpdateBranch } from '../../components/Modal/Branches/UpdateBranch'
import { CreateBranch } from '../../components/Modal/Branches/CreateBranch'
import { DeleteBranch } from '../../components/Modal/Branches/DeleteBranch'
import { apiDev } from '../../services/apiDev'

import {
  Container,
  Content,
  Scroll,
  WrapperFilter
} from '../../styles/pages/rh/branches'

export interface BranchesProps {
  bran_id: number
  bran_number: number
  bran_sector: string
}

export interface BranchesServerSideProps {
  branchesProps: BranchesProps[]
}

function Branches({ branchesProps }: BranchesServerSideProps) {
  const [branches, setBranches] = useState<BranchesProps[]>(branchesProps)
  const [selectedBranch, setSelectedBranch] = useState<BranchesProps>()
  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

  const handleSearch = useCallback(data => {}, [])

  const handleSelectBranch = useCallback((branch: BranchesProps) => {
    if (permissions?.includes('RH.RAMAIS.EDITAR')) {
      setDisplayModal('modalUpdateBranch')
      setSelectedBranch(branch)
    }
  }, [])

  return (
    <Container>
      <Head>
        <title>Intranet | RH | Ramais</title>
      </Head>

      <Header category="RH" route="Ramais" />

      <Content>
        <Scroll>
          <Table
            isEditable={permissions?.includes('RH.RAMAIS.EDITAR')}
            ths={['Setor', 'Ramal']}
          >
            {branches?.map(branch => {
              return (
                <tr
                  onClick={() => handleSelectBranch(branch)}
                  key={branch.bran_id}
                >
                  <td>{branch.bran_sector}</td>
                  <td style={{ textAlign: 'center' }}>{branch.bran_number}</td>
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

          {permissions && permissions.includes('RH.RAMAIS.CRIAR') && (
            <Button onClick={() => setDisplayModal('modalCreateBranch')}>
              Cadastar
            </Button>
          )}
        </WrapperFilter>
      </Content>

      <CreateBranch
        id="modalCreateBranch"
        branches={branches}
        setBranches={setBranches}
      />

      <UpdateBranch
        id="modalUpdateBranch"
        branches={branches}
        setBranches={setBranches}
        selectedBranch={selectedBranch}
      />

      <DeleteBranch
        id="modalDeleteBranch"
        branches={branches}
        setBranches={setBranches}
        selectedBranch={selectedBranch}
      />
    </Container>
  )
}

export default withAuth(Branches)

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await apiDev.get('branches')

  const branchesProps = response.data

  return {
    props: { branchesProps }
  }
}
