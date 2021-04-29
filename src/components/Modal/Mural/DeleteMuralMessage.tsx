import { useCallback } from 'react'
import { useLoading } from '../../../hooks/loading'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'

import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'
import { MessagesProps } from '../../../pages/mural'
import { api } from '../../../services/api'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Mural/DeleteMuralMessage'

interface DeleteMuralMessageProps {
  id: string
  selectedMessage: MessagesProps
  messages: MessagesProps[]
  setMessages: (message: MessagesProps[]) => void
}

export function DeleteMuralMessage({
  id,
  selectedMessage,
  messages,
  setMessages
}: DeleteMuralMessageProps) {
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  console.log(selectedMessage)

  const handleDeleteMessage = useCallback(async () => {
    setLoadingScreen(true)
    try {
      await api.delete(`api/mural/${selectedMessage.mural_id}`)

      const remainingMessages = messages.filter(
        message => message.mural_id !== selectedMessage.mural_id
      )

      setMessages(remainingMessages)
      setDisplayModal([])

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Mensagem ${selectedMessage.mural_title} excluida com sucesso!`
      })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: err.response ? err.response.data.message : err.message
      })
    } finally {
      setLoadingScreen(false)
    }
  }, [messages, selectedMessage])
  return (
    <GlobalModal id={id} size={400} title="Deletar Mensagem">
      <Container>
        <Wrapper>
          <strong>Titulo</strong>
          <p>{selectedMessage?.mural_title}</p>
        </Wrapper>
        <Button onClick={handleDeleteMessage} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
