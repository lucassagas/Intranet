import { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '../../Input'
import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'

import {
  Container,
  InputWrapper
} from '../../../styles/components/Modal/User/UpdateUser'
import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'
import { api } from '../../../services/api'

import * as Yup from 'yup'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import { GroupsProps } from '../../Pages/Adm/Users/Groups'

interface EditUserProps {
  id: string
  reloadFunction: () => void
  user: {
    user_id: number
    user_name: string
    user_email: string
    user_status: boolean
    group_name: string
    created_at: string
  }
}

export function EditUser({ id, reloadFunction, user }: EditUserProps) {
  const [groups, setGroups] = useState<GroupsProps[]>([])

  const formRef = useRef<FormHandles>(null)

  const { setDisplayModal, displayModal } = useModal()
  const { addToast } = useToast()

  useEffect(() => {
    if (displayModal === id) {
      api
        .get(`api/group`)
        .then(response => {
          setGroups(response.data)
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro',
            description: 'Error ao carregar grupos'
          })
        })
    }
  }, [])

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Campo obrigatório'),

          group: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const formData = {
          ...data,
          status: true
        }

        const response = await api.put(`api/user/${user.user_id}`, formData)

        await reloadFunction()
        setDisplayModal('')
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso',
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
          title: 'Erro',
          description: err.response.data.message
        })
      }
    },
    [user]
  )

  if (!user) return <div />

  return (
    <GlobalModal size={400} id={id} title="Editar Usuário">
      <Container
        initialData={{ group: user.group_name }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <InputWrapper>
          <Input
            readOnly
            value={user.user_name}
            label="Nome"
            name="name"
            placeholder="Nome Completo"
          />
          <Input
            readOnly
            value={user.user_email}
            label="E-mail"
            name="email"
            placeholder="E-mail"
            type="text"
          />
          <Input
            label="Senha"
            name="password"
            placeholder="Senha"
            type="password"
          />
          <Input
            label="Grupo"
            list="groups"
            name="group"
            placeholder="Seleciona um grupo"
          />
          <datalist id="groups">
            {groups.map(group => (
              <option key={group.group_id} value={group.group_name}>
                {group.group_name}
              </option>
            ))}
          </datalist>
        </InputWrapper>
        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
