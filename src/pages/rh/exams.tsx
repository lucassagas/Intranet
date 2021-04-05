import Head from 'next/head'
import withAuth from '../../utils/withAuth'

import { Header } from '../../components/Header'
import { Table } from '../../components/Table'
import { AiOutlineSearch } from '../../styles/icons'
import { useCallback, useState } from 'react'
import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/auth'
import { GetServerSideProps } from 'next'
import { apiDev } from '../../services/apiDev'

import {
  Container,
  Content,
  Scroll,
  WrapperFilter,
  ButtonFilter
} from '../../styles/pages/rh/exams'
import { CreateExams } from '../../components/Modal/Exams/CreateExam'
import { useModal } from '../../hooks/modal'
import { UpdateExams } from '../../components/Modal/Exams/UpdateExam'
import { DeleteExam } from '../../components/Modal/Exams/DeleteExam'

export interface ExamsProps {
  exam_id: number
  exam_name: string
  exam_type: string
  exam_realized_date: string
  exam_expiration_date: string
}

export interface ExamsServerSideProps {
  examsProps: ExamsProps[]
}

function Exams({ examsProps }: ExamsServerSideProps) {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [exams, setExams] = useState<ExamsProps[]>(examsProps)
  const [selectedExam, setSelectedExam] = useState<ExamsProps>()

  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

  const handleSearch = useCallback(data => {}, [])

  const handleSelectExam = useCallback((data: ExamsProps) => {
    if (permissions && permissions.includes('RH.EXAMES.EDITAR')) {
      setDisplayModal('modalUpdateExam')
      setSelectedExam(data)

      return
    }
  }, [])

  return (
    <Container>
      <Head>
        <title>Intranet | RH | Exames</title>
      </Head>

      <Header category="RH" route="Exames" />

      <Content>
        <Scroll>
          <Table
            isEditable={permissions?.includes('RH.EXAMES.EDITAR')}
            ths={['Nome', 'Exame', 'Realizado', 'Data de Validade']}
          >
            {exams.map(exam => {
              return (
                <tr onClick={() => handleSelectExam(exam)} key={exam.exam_id}>
                  <td>{exam.exam_name}</td>
                  <td>{exam.exam_type}</td>
                  <td>{exam.exam_realized_date}</td>
                  <td style={{ textAlign: 'center' }}>
                    {exam.exam_expiration_date}
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
            onClick={() => setIsActiveFilter('exam')}
            isActive={isActiveFilter === 'exam'}
          >
            <div />
            <span>Exame</span>
          </ButtonFilter>

          {permissions && permissions.includes('RH.EXAMES.CRIAR') && (
            <Button onClick={() => setDisplayModal('modalCreateExam')}>
              Cadastar
            </Button>
          )}
        </WrapperFilter>
      </Content>

      <CreateExams id="modalCreateExam" exams={exams} setExams={setExams} />

      <UpdateExams
        selectedExam={selectedExam}
        id="modalUpdateExam"
        exams={exams}
        setExams={setExams}
      />

      <DeleteExam
        selectedExam={selectedExam}
        id="modalDeleteExam"
        exams={exams}
        setExams={setExams}
      />
    </Container>
  )
}

export default withAuth(Exams)

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await apiDev.get('exam')

  const examsProps = response.data

  return {
    props: { examsProps }
  }
}
