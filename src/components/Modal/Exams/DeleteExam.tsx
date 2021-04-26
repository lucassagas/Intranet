import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'
import { UpdateExamsProps } from './UpdateExam'
import { useCallback } from 'react'
import { api } from '../../../services/api'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Exams/DeleteExam'

export function DeleteExam({
  id,
  exams,
  setExams,
  selectedExam
}: UpdateExamsProps) {
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  const handleDeleteExam = useCallback(() => {
    setLoadingScreen(true)
    api
      .delete(`api/exam/${selectedExam.exam_id}`)
      .then(() => {
        setDisplayModal([])
        const remainingExams = exams.filter(
          exam => exam.exam_id !== selectedExam.exam_id
        )
        setExams(remainingExams)
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Exame de ${selectedExam.contri_name} excluido com sucesso!`
        })
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.message
        })
      })
      .finally(() => setLoadingScreen(false))
  }, [selectedExam])

  return (
    <GlobalModal id={id} size={400} title="Deletar exame">
      <Container>
        <Wrapper>
          <strong>Colaborador:</strong>
          <p>{selectedExam?.contri_name}</p>
        </Wrapper>

        <Wrapper>
          <strong>Exame:</strong>
          <p>{selectedExam?.exam_type}</p>
        </Wrapper>

        <Wrapper>
          <strong>Data de validade:</strong>
          <p>{selectedExam?.exam_date_realization}</p>
        </Wrapper>

        <Button onClick={handleDeleteExam} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
