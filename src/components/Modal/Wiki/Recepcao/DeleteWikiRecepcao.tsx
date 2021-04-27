import { Button } from '../../../Button'
import { GlobalModal } from '../../GlobalModal'
import { api } from '../../../../services/api'
import { WikiRecepcaoProps } from '../../../../pages/wiki/recepcao'

import { useCallback } from 'react'
import { useLoading } from '../../../../hooks/loading'
import { useToast } from '../../../../hooks/toast'
import { useModal } from '../../../../hooks/modal'

import {
  Container,
  Wrapper
} from '../../../../styles/components/Modal/Wiki/Recepcao/DeleteWikiRecepcao'

interface DeleteWikiProps {
  id: string
  selectedFaq: WikiRecepcaoProps
  faqs: WikiRecepcaoProps[]
  setFaqs: (faqs: WikiRecepcaoProps[]) => void
}

export function DeleteWikiRecepcao({
  id,
  selectedFaq,
  faqs,
  setFaqs
}: DeleteWikiProps) {
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()

  const handleDeleteFaq = useCallback(async () => {
    setLoadingScreen(true)
    try {
      await api.delete(`api/wiki/${selectedFaq.wiki_id}`)

      const remainingFaqs = faqs.filter(
        faq => faq.wiki_id !== selectedFaq.wiki_id
      )

      setFaqs(remainingFaqs)
      setDisplayModal([])
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Faq ${selectedFaq.wiki_title} excluida com sucesso!`
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
  }, [selectedFaq, faqs])

  return (
    <GlobalModal size={400} title="Deletar FAQ" id={id}>
      <Container>
        <Wrapper>
          <strong>Nome:</strong>
          <p>{selectedFaq?.wiki_title}</p>
        </Wrapper>
        <Wrapper>
          <strong>Tipo:</strong>
          <p>{selectedFaq?.wiki_type}</p>
        </Wrapper>
        <Wrapper>
          <p>Tem certeza de que quer excluir esta FAQ ?</p>
        </Wrapper>
        <Button onClick={handleDeleteFaq} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
