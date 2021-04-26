import * as Yup from 'yup'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { useModal } from '../../../hooks/modal'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import { useToast } from '../../../hooks/toast'
import { ExamsProps } from '../../../pages/rh/exams'
import { api } from '../../../services/api'
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

  const formatterDate = new Intl.DateTimeFormat('pt-br')

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current.setErrors({})
        setLoadingScreen(true)

        const schema = Yup.object().shape({
          contributor: Yup.string().required('Campo obrigatório'),
          type: Yup.string().required('Campo obrigatório'),
          date_realization: Yup.string().required('Campo obrigatório'),
          date_expiration: Yup.string().required('Campo obrigatório'),
          company: Yup.string().required('Campo obrigatório'),
          local_service: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await api.put(`api/exam/${selectedExam.exam_id}`, data)

        const formattedExams = exams.filter(
          exam => exam.exam_id !== selectedExam.exam_id
        )

        const formattedExamDate = {
          ...response.data.exam,
          date_expiration: formatterDate.format(
            response.data.exam.date_expiration
          ),
          date_realization: formatterDate.format(
            response.data.exam.date_realization
          )
        }

        setDisplayModal([])
        reset()
        setExams([formattedExamDate, ...formattedExams])

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
          description: err.response ? err.response.data.message : err.message
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
          contributor: selectedExam?.contri_name,
          type: selectedExam?.exam_type,
          local_service: selectedExam?.exam_local_service,
          date_realization: selectedExam?.exam_date_realization,
          date_expiration: selectedExam?.exam_date_expiration
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <WrapperInputs>
          <section>
            <div style={{ width: '100%' }}>
              <Input
                name="contributor"
                label="Nome Completo"
                placeholder="Selecione uma colaborador"
                list="contributorsNames"
                readOnly
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
                name="type"
                label="Exame"
                placeholder="Selecione um exame"
                width="250px"
                list="exams"
                readOnly
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
                mask="9999-99-99"
                name="date_realization"
                label="Data Realização"
              />
            </div>

            <div>
              <InputMask
                mask="9999-99-99"
                name="date_expiration"
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

          <Input
            name="local_service"
            label="Local"
            placeholder="Ex: Corpori Biguaçu"
            readOnly
          />
        </WrapperInputs>

        {permissions?.includes('RH.EXAMES.DELETAR') && (
          <Button
            onClick={() => setDisplayModal(['modalDeleteExam'])}
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
