import Head from 'next/head'
import withAuth from '../utils/withAuth'

import { useCallback, useState } from 'react'
import { useModal } from '../hooks/modal'
import { useAuth } from '../hooks/auth'

import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { GetServerSideProps } from 'next'
import { apiDev } from '../services/apiDev'

import { CreateMuralMessage } from '../components/Modal/Mural/CreateMuralMessage'
import { DeleteMuralMessage } from '../components/Modal/Mural/DeleteMuralMessage'

import { FiTrash } from '../styles/icons'
import {
  Container,
  Content,
  Scroll,
  WrapperFilter,
  Message
} from '../styles/pages/mural'

export interface MessagesProps {
  id: number
  title: string
  priority: number
  message: string
  link: string
}

interface ServerSideProps {
  messagesssr: MessagesProps[]
}

function Mural({ messagesssr }: ServerSideProps) {
  const [messages, setMessages] = useState<MessagesProps[]>(messagesssr)
  const [selectedMessage, setSelectedMessage] = useState<MessagesProps>()
  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

  const handleSelectMessage = useCallback((message: MessagesProps) => {
    setSelectedMessage(message)
    setDisplayModal(['modalDeleteMuralMessage'])
  }, [])

  return (
    <Container>
      <Head>
        <title>Intranet | Mural</title>
      </Head>

      <Header category="Dashboard" route="Mural" />

      <Content>
        <Scroll permission={!!permissions?.includes('DASHBOARD.MURAL.CRIAR')}>
          {messages?.map(message => {
            return (
              <Message key={message.id}>
                <header>
                  <a href={message.link} target="_blank">
                    {message.title}
                  </a>
                  {permissions?.includes('DASHBOARD.MURAL.DELETAR') && (
                    <button
                      onClick={() => handleSelectMessage(message)}
                      type="button"
                    >
                      <FiTrash size={20} />
                    </button>
                  )}
                </header>

                <p>{message.message}</p>
              </Message>
            )
          })}
          {permissions?.includes('DASHBOARD.MURAL.CRIAR') && (
            <WrapperFilter>
              <Button
                onClick={() => setDisplayModal(['modalCreateMuralMessage'])}
                type="button"
              >
                Cadastrar
              </Button>
            </WrapperFilter>
          )}
        </Scroll>
      </Content>

      {permissions?.includes('DASHBOARD.MURAL.CRIAR') && (
        <CreateMuralMessage
          messages={messages}
          setMessages={setMessages}
          id="modalCreateMuralMessage"
        />
      )}

      {permissions?.includes('DASHBOARD.MURAL.DELETAR') && (
        <DeleteMuralMessage
          selectedMessage={selectedMessage}
          messages={messages}
          setMessages={setMessages}
          id="modalDeleteMuralMessage"
        />
      )}
    </Container>
  )
}

export default withAuth(Mural)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const response = await apiDev.get('mural', {
      headers: {
        tokenaccess: req.cookies['intranet-token']
      }
    })

    return {
      props: { messagesssr: response.data }
    }
  } catch (err) {
    if (
      err.response.data.message &&
      err.response.data.message === 'usuario nao tem permissao'
    ) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
      props: {}
    }
  }
}
