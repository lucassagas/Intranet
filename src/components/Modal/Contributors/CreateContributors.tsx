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

interface CreateContributorsProps {
  id: string
}

export function CreateContributors({ id }: CreateContributorsProps) {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const handleSubmit = useCallback(async (data, { reset }) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        date: Yup.string().required('Campo obrigatório'),
        document: Yup.string().required('Campo obrigatório'),
        numberofdocument: Yup.string().required('Campo obrigatório'),
        dateofvalidate: Yup.string().required('Campo obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
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
        description: err.message
      })
    }
  }, [])

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
                <Input name="date" label="Data de Nascimento" type="date" />
              </section>

              <section>
                <Input
                  list="documents"
                  name="document"
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
                <Input name="numberofdocument" label="N° do Documento " />
              </section>
              <section>
                <Input
                  name="dateofvalidate"
                  label="Data de Validade"
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
