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
import { useLoading } from '../../../hooks/loading'

import {
  Container,
  WrapperInputs
} from '../../../styles/components/Modal/Exams/CreateExam'

interface CreateExamsProps {
  id: string
  exams: ExamsProps[]
  setExams: (data: ExamsProps[]) => void
}

interface ContributorProps {
  contri_name: string
}

export function CreateExams({ id, exams, setExams }: CreateExamsProps) {
  const formRef = useRef<FormHandles>(null)
  const [contributorName, setContributorName] = useState<ContributorProps[]>([])
  const { displayModal, setDisplayModal } = useModal()
  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()

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
          contributor: Yup.string().required('Campo obrigatório'),
          type: Yup.string().required('Campo obrigatório'),
          date_realized: Yup.string().required('Campo obrigatório'),
          date_expiration: Yup.string().required('Campo obrigatório'),
          company: Yup.string().required('Campo obrigatório'),
          local_service: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await apiDev.post('exam', data)

        setDisplayModal('')
        reset()
        setExams([response.data, ...exams])

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Exame cadastrado com sucesso!'
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
    [exams]
  )

  return (
    <GlobalModal id={id} size={700} title="Cadastrar Exame">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <WrapperInputs>
          <section>
            <div style={{ width: '100%' }}>
              <Input
                name="contributor"
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
                name="type"
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
              <Input name="date_realized" label="Data Realização" type="date" />
            </div>

            <div>
              <Input
                name="date_expiration"
                label="Data de Validade"
                type="date"
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
          />
        </WrapperInputs>
        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
