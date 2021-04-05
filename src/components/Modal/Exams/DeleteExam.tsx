import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'
import { UpdateExamsProps } from './UpdateExam'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Exams/DeleteExam'
import { useCallback } from 'react'
import { apiDev } from '../../../services/apiDev'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'

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
    apiDev
      .delete(`exam/${selectedExam.exam_id}`)
      .then(() => {
        setDisplayModal('')
        const remainingExams = exams.filter(
          exam => exam.exam_id !== selectedExam.exam_id
        )
        setExams(remainingExams)
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Exame de ${selectedExam.exam_name} excluido com sucesso!`
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
          <p>{selectedExam?.exam_name}</p>
        </Wrapper>

        <Wrapper>
          <strong>Exame:</strong>
          <p>{selectedExam?.exam_type}</p>
        </Wrapper>

        <Wrapper>
          <strong>Data de validade:</strong>
          <p>{selectedExam?.exam_realized_date}</p>
        </Wrapper>

        <Button onClick={handleDeleteExam} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
