import Head from 'next/head'
import withAuth from '../../utils/withAuth'

import { Header } from '../../components/Header'
import { Table } from '../../components/Tables/Table'
import { AiOutlineSearch } from '../../styles/icons'
import { useCallback, useState } from 'react'
import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { GetServerSideProps } from 'next'
import { CreateExams } from '../../components/Modal/Exams/CreateExam'
import { UpdateExams } from '../../components/Modal/Exams/UpdateExam'
import { DeleteExam } from '../../components/Modal/Exams/DeleteExam'
import { api } from '../../services/api'

import { useAuth } from '../../hooks/auth'
import { useModal } from '../../hooks/modal'

import {
  Container,
  Content,
  Scroll,
  WrapperFilter,
  ButtonFilter
} from '../../styles/pages/rh/exams'

export interface ExamsProps {
  exam_id: number
  contri_name: string
  exam_type: string
  exam_local_service: string
  exam_date_realization: string | number
  exam_date_expiration: string | number
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
      setDisplayModal(['modalUpdateExam'])
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
              const dateFormatter = new Intl.DateTimeFormat('pt-br')
              return (
                <tr onClick={() => handleSelectExam(exam)} key={exam.exam_id}>
                  <td>{exam.contri_name}</td>
                  <td>{exam.exam_type}</td>
                  <td>
                    {dateFormatter.format(new Date(exam.exam_date_realization))}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {dateFormatter.format(new Date(exam.exam_date_expiration))}
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
            <Button onClick={() => setDisplayModal(['modalCreateExam'])}>
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const response = await api.get('api/exam', {
      headers: {
        tokenaccess: req.cookies['intranet-token']
      }
    })

    const examsProps = response.data

    return {
      props: { examsProps }
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
