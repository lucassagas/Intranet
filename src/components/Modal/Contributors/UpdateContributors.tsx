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
} from '../../../styles/components/Modal/Contributors/UpdateContributors'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { useToast } from '../../../hooks/toast'
import { api } from '../../../services/api'
import { useModal } from '../../../hooks/modal'

import {
  ContributorsStateProps,
  ContributorsProps
} from '../../../pages/rh/contributors'
import { format } from 'date-fns'
import { InputMask } from '../../InputMask'

interface UpdateContributorsProps {
  id: string
  contributors: ContributorsStateProps
  setContributors: (data: ContributorsStateProps) => void
  selectedContributor: ContributorsProps
}

export function UpdateContributors({
  id,
  contributors,
  setContributors,
  selectedContributor
}: UpdateContributorsProps) {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

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
          description: 'Colaborador atualizado com sucesso !'
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
    <GlobalModal id={id} size={600} title="Atualizar Colaborador">
      {selectedContributor && (
        <Container>
          <Form
            initialData={{
              type_document: selectedContributor.contri_type_document,
              date_expiration: format(
                new Date(selectedContributor.contri_date_expiration),
                'dd/MM/yyyy'
              )
            }}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div>
              <WrapperInput>
                <section style={{ flex: 1 }}>
                  <Input
                    name="name"
                    label="Nome Completo"
                    value={selectedContributor.contri_name}
                    readOnly
                  />
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
                  <Input
                    name="document"
                    label="N° do Documento "
                    value={selectedContributor.contri_document}
                    readOnly
                  />
                </section>
                <section>
                  <InputMask
                    label="Data de Validade"
                    name="date_expiration"
                    mask="99/99/9999"
                  />
                </section>

                <section>
                  <Input
                    name="date_birth"
                    label="Data de Nascimento"
                    type="text"
                    value={format(
                      new Date(selectedContributor.contri_date_birth),
                      'dd/MM/yyyy'
                    )}
                    readOnly
                  />
                </section>
              </WrapperInput>
            </div>
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Container>
      )}
    </GlobalModal>
  )
}
