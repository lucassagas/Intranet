import * as Yup from 'yup'

import { Form } from '@unform/web'
import { useCallback, useRef } from 'react'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { FormHandles } from '@unform/core'

import {
  Container,
  WrapperInput
} from '../../../styles/components/Modal/Contributors/CreateContributors'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { useToast } from '../../../hooks/toast'
import { api } from '../../../services/api'
import { useModal } from '../../../hooks/modal'

import { ContributorsStateProps } from '../../../pages/rh/contributors'

interface CreateContributorsProps {
  id: string
  contributors: ContributorsStateProps
  setContributors: (data: ContributorsStateProps) => void
}

export function CreateContributors({
  id,
  contributors,
  setContributors
}: CreateContributorsProps) {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  console.log(contributors)

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          date_birth: Yup.string().required('Campo obrigatório'),
          type_document: Yup.string().required('Campo obrigatório'),
          document: Yup.string().required('Campo obrigatório'),
          date_expiration: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await api.post(`api/contributor`, data)

        setDisplayModal('')

        const contributorsProps = [
          response.data,
          ...contributors.contributorsProps
        ]

        setContributors({ contributorsProps })

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Colaborador cadastrado com sucesso !'
        })
        reset()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: err.response.data.message
        })
      }
    },
    [contributors]
  )

  return (
    <GlobalModal id={id} size={600} title="Cadastrar Colaborador">
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <WrapperInput>
              <section style={{ flex: 1 }}>
                <Input name="name" label="Nome Completo" />
              </section>

              <section>
                <Input
                  list="documents"
                  name="type_document"
                  label="Documento"
                  width="100px"
                />
              </section>

              <datalist id="documents">
                <option value="" />
                <option value="CPF">CPF</option>
                <option value="RG">RG</option>
                <option value="CNH">CNH</option>
              </datalist>
            </WrapperInput>
            <WrapperInput>
              <section>
                <Input name="document" label="N° do Documento " />
              </section>
              <section>
                <Input
                  name="date_expiration"
                  label="Data de Validade"
                  type="date"
                />
              </section>
              <section>
                <Input
                  name="date_birth"
                  label="Data de Nascimento"
                  type="date"
                />
              </section>
            </WrapperInput>
          </div>
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Container>
    </GlobalModal>
  )
}
