import * as Yup from 'yup'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { api } from '../../../services/api'
import { useModal } from '../../../hooks/modal'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import { useToast } from '../../../hooks/toast'
import { ExamsProps } from '../../../pages/rh/exams'
import { apiDev } from '../../../services/apiDev'
import { InputMask } from '../../InputMask'
import { useLoading } from '../../../hooks/loading'
import { useAuth } from '../../../hooks/auth'

import {
  Container,
  WrapperInputs
} from '../../../styles/components/Modal/Exams/UpdateExam'

export interface UpdateExamsProps {
  id: string
  exams: ExamsProps[]
  setExams: (data: ExamsProps[]) => void
  selectedExam: ExamsProps
}

interface ContributorProps {
  contri_name: string
}

export function UpdateExams({
  id,
  exams,
  setExams,
  selectedExam
}: UpdateExamsProps) {
  const formRef = useRef<FormHandles>(null)
  const [contributorName, setContributorName] = useState<ContributorProps[]>([])
  const { displayModal, setDisplayModal } = useModal()
  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()
  const { permissions } = useAuth()

  useEffect(() => {
    if (displayModal === id) {
      api
        .get('api/contributor')
        .then(response => {
          setContributorName(response.data)
        })
        .catch(err => {
          alert(err.message)
        })
    }
  }, [displayModal, id])

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current.setErrors({})
        setLoadingScreen(true)

        const schema = Yup.object().shape({
          exam_name: Yup.string().required('Campo obrigatório'),
          exam_type: Yup.string().required('Campo obrigatório'),
          exam_realized_date: Yup.string().required('Campo obrigatório'),
          exam_expiration_date: Yup.string().required('Campo obrigatório'),
          company: Yup.string().required('Campo obrigatório'),
          local: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await apiDev.patch(
          `exam/${selectedExam.exam_id}`,
          data
        )

        const formattedExams = exams.filter(
          exam => exam.exam_id !== selectedExam.exam_id
        )

        setDisplayModal('')
        reset()
        setExams([response.data, ...formattedExams])

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Exame editado com sucesso!'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: err.message
        })
      } finally {
        setLoadingScreen(false)
      }
    },
    [exams, selectedExam]
  )

  return (
    <GlobalModal id={id} size={700} title="Editar Exame">
      <Container
        initialData={{
          exam_name: selectedExam?.exam_name,
          exam_type: selectedExam?.exam_type,
          exam_realized_date: selectedExam?.exam_realized_date,
          exam_expiration_date: selectedExam?.exam_expiration_date
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <WrapperInputs>
          <section>
            <div style={{ width: '100%' }}>
              <Input
                name="exam_name"
                label="Nome Completo"
                placeholder="Selecione uma colaborador"
                list="contributorsNames"
              />

              <datalist id="contributorsNames">
                <option value="" />
                {contributorName?.map(contributorName => {
                  return (
                    <option
                      key={contributorName.contri_name}
                      value={contributorName.contri_name}
                    >
                      {contributorName.contri_name}
                    </option>
                  )
                })}
              </datalist>
            </div>

            <div>
              <Input
                name="exam_type"
                label="Exame"
                placeholder="Selecione um exame"
                width="250px"
                list="exams"
              />

              <datalist id="exams">
                <option value="ADMISSIONAL">ADMISSIONAL</option>
                <option value="DEMISSIONAL">DEMISSIONAL</option>
                <option value="PERIODICO">PERIODICO</option>
                <option value="MUDANCA DE FUNCAO">MUDANCA DE FUNCAO</option>
                <option value="RETORNO DE TRABALHO">RETORNO DE TRABALHO</option>
              </datalist>
            </div>
          </section>

          <section>
            <div>
              <InputMask
                mask="99/99/9999"
                name="exam_realized_date"
                label="Data Realização"
              />
            </div>

            <div>
              <InputMask
                mask="99/99/9999"
                name="exam_expiration_date"
                label="Data de Validade"
              />
            </div>

            <div>
              <Input
                name="company"
                label="Empresa"
                placeholder="Selecione uma empresa"
                value="CORPORI"
                readOnly
              />
            </div>
          </section>

          <Input name="local" label="Local" placeholder="Ex: Corpori Biguaçu" />
        </WrapperInputs>

        {permissions?.includes('RH.EXAMES.DELETAR') && (
          <Button
            onClick={() => setDisplayModal('modalDeleteExam')}
            className="deleteButton"
            type="button"
          >
            Excluir
          </Button>
        )}

        <Button type="submit">Salvar</Button>
      </Container>
    </GlobalModal>
  )
}
