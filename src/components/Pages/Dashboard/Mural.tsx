import Cookies from 'js-cookie'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '../../../hooks/toast'

import { MessagesProps } from '../../../pages/mural'
import { api } from '../../../services/api'

import {
  FiClipboard,
  IoIosArrowBack,
  IoIosArrowForward
} from '../../../styles/icons'

import {
  Container,
  Wrapper
} from '../../../styles/components/Pages/Dashboard/Mural'

export function Mural() {
  const [message, setMessage] = useState<MessagesProps>()
  const [offset, setOffset] = useState(0)
  const router = useRouter()
  const { addToast } = useToast()

  useEffect(() => {
    const token = Cookies.get('intranet-token')
    api
      .get(`api/mural/dashboard?offset=${offset}&setOffset=${setOffset}`, {
        headers: {
          tokenaccess: token
        }
      })
      .then(response => {
        setMessage(response.data)
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      })
  }, [offset])

  const handleNextMessage = useCallback(() => {
    if (offset < 5) {
      setOffset(offset + 1)
    }
  }, [offset])

  const handlePreviousMessage = useCallback(() => {
    if (offset > 0) {
      setOffset(offset - 1)
    }
  }, [offset])

  return (
    <Container>
      <header>
        <span>
          <FiClipboard size={18} />
          <strong>Mural</strong>
          <button type="button" onClick={() => router.push('/mural')}>
            Ver mais
          </button>
        </span>
        <span>
          <button onClick={handlePreviousMessage} type="button">
            <IoIosArrowBack size={16} />
          </button>
          <button onClick={handleNextMessage} type="button">
            <IoIosArrowForward size={16} />
          </button>
        </span>
      </header>
      <Wrapper>
        <strong>{message?.mural_title}</strong>

        <p>{message?.mural_content}</p>
      </Wrapper>
    </Container>
  )
}
