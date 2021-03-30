import * as Yup from 'yup'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'

import {
  Container,
  InputWrapper
} from '../../../styles/components/Modal/User/CreateUser'
import { FormHandles } from '@unform/core'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { api } from '../../../services/api'

import { GroupsProps } from '../../../components/Pages/Adm/Users/Groups'

interface CreateUserProps {
  id: string
  reloadFunction: () => void
}

export function CreateUser({ id, reloadFunction }: CreateUserProps) {
  const [groups, setGroups] = useState<GroupsProps[]>([])
  const formRef = useRef<FormHandles>(null)

  const { setDisplayModal, displayModal } = useModal()
  const { addToast } = useToast()

  useEffect(() => {
    if (displayModal === id) {
      api
        .get('api/group')
        .then(response => {
          setGroups(response.data)
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro',
            description: 'Erro ao carregar grupos, contate um administrador'
          })
        })
    }
  }, [displayModal])

  const handleSubmit = useCallback(async (data, { reset }) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('Campo obrigatório'),
        password: Yup.string().required('Campo obrigatório'),
        group: Yup.string().required('Campo obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const response = await api.post('api/user', data)

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: response.data.message
      })
      reloadFunction()
      setDisplayModal('')
      reset()
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
  }, [])

  return (
    <GlobalModal id={id} size={400} title="Criar Usuário">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <InputWrapper>
          <Input label="Nome" name="name" placeholder="Nome Completo" />
          <Input label="E-mail" name="email" placeholder="E-mail" type="text" />
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
        </InputWrapper>
        <Button type="submit">Cadastrar</Button>
        <datalist id="groups">
          <option value="" />
          {groups.map(group => (
            <option key={group.group_id} value={group.group_name}>
              {group.group_name}
            </option>
          ))}
        </datalist>
      </Container>
    </GlobalModal>
  )
}
