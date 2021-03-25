import * as Yup from 'yup'

import { Form } from '@unform/web'
import { useCallback, useRef } from 'react'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { FormHandles } from '@unform/core'
import { Button } from '../../Button'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { useModal } from '../../../hooks/modal'
import { api } from '../../../services/api'
import { useToast } from '../../../hooks/toast'

import { Container } from '../../../styles/components/Modal/Permission/CreatePermission'

interface CreatePermissionProps {
  id: string
  reloadFunction: () => void
}

export function CreatePermission({
  id,
  reloadFunction
}: CreatePermissionProps) {
  const formRef = useRef<FormHandles>(null)
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleSubmit = useCallback(async (data, { reset }) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Preenchimento obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const response = await api.post('api/permission', data)

      reloadFunction()
      setDisplayModal('')
      reset()

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: response.data.message
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
        description:
          'Ocorreu um erro ao criar a permissão, contate um administrador'
      })
    }
  }, [])

  return (
    <GlobalModal size={400} title="Criar Permissão" id={id}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <Input name="name" placeholder="Digite o nome da permissão" />
          </div>
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Container>
    </GlobalModal>
  )
}
