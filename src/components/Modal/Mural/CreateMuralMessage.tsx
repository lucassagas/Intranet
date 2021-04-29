import * as Yup from 'yup'

import { useCallback, useRef, useState } from 'react'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'
import { useLoading } from '../../../hooks/loading'

import { Button } from '../../Button'
import { Textarea } from '../../Textarea'
import { GlobalModal } from '../GlobalModal'
import { Input } from '../../Input'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { api } from '../../../services/api'
import { MessagesProps } from '../../../pages/mural'

import {
  Container,
  Wrapper,
  CustomSelect
} from '../../../styles/components/Modal/Mural/CreateMuralMessage'

interface CreateMuralMessageProps {
  id: string
  messages: MessagesProps[]
  setMessages: (messages: MessagesProps[]) => void
}

export function CreateMuralMessage({
  id,
  messages,
  setMessages
}: CreateMuralMessageProps) {
  const [priority, setPriority] = useState<string | undefined>('')

  const formRef = useRef<FormHandles>(null)
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      if (!priority) {
        addToast({
          type: 'error',
          title: 'Error',
          description: 'Selecione uma prioridade para a mensagem'
        })

        return
      }

      setLoadingScreen(true)
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          title: Yup.string().required('Campo obrigatório'),
          link: Yup.string().required('Campo obrigatório'),
          content: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const formData = {
          ...data,
          priority
        }

        const response = await api.post('api/mural', formData)

        setMessages([...messages, response.data.mural])

        reset()
        setDisplayModal([])
        addToast({
          type: 'success',
          title: 'Success',
          description: `Mensagem ${data.title} cadastrada com sucesso!`
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
    [priority, addToast, messages]
  )

  return (
    <GlobalModal size={700} id={id} title="Inserir Mensagem no Mural">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <Wrapper>
          <Input width="100%" name="title" placeholder="Título" />

          <Input width="100%" name="link" placeholder="Link" />
        </Wrapper>

        <Textarea name="content" placeholder="Mensagem" rows={5} />

        <Wrapper>
          <CustomSelect
            onChange={event => setPriority(event.currentTarget.value)}
          >
            <option value="">Prioridade da Notícia</option>
            <option value="1">1</option>
            <option value="3">2</option>
            <option value="2">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="6">7</option>
          </CustomSelect>

          <Button type="submit">Inserir</Button>
        </Wrapper>
      </Container>
    </GlobalModal>
  )
}
