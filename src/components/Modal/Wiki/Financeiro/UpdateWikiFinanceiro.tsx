import * as Yup from 'yup'

import { GlobalModal } from '../../GlobalModal'
import { Input } from '../../../Input'
import { Button } from '../../../Button'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../../utils/getValidationErrors'
import { api } from '../../../../services/api'
import { WikiFinanceiroProps } from '../../../../pages/wiki/financeiro'
import { FileInput } from '../../../FileInput'

import { useCallback, useRef } from 'react'
import { useToast } from '../../../../hooks/toast'
import { useModal } from '../../../../hooks/modal'
import { useLoading } from '../../../../hooks/loading'
import { useAuth } from '../../../../hooks/auth'

import {
  Container,
  Wrapper
} from '../../../../styles/components/Modal/Wiki/Financeiro/UpdateWikiFinanceiro'

interface UpdateWikiFinanceiroProps {
  id: string
  faqs: WikiFinanceiroProps[]
  setFaqs: (faqs: WikiFinanceiroProps[]) => void
  selectedFaq: WikiFinanceiroProps
}

export function UpdateWikiFinanceiro({
  id,
  faqs,
  setFaqs,
  selectedFaq
}: UpdateWikiFinanceiroProps) {
  const formRef = useRef<FormHandles>(null)

  const { setDisplayModal, displayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()
  const { permissions } = useAuth()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)

      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          title: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const type = 'financeiro'
        const formData = new FormData()

        formData.append('wiki_file', data.wiki_file)
        formData.append('title', data.title)
        formData.append('type', type)

        const response = await api.put(
          `api/wiki/${selectedFaq.wiki_id}`,
          formData
        )

        const remainingFaqsFinanceiro = faqs.filter(
          faq => faq.wiki_id !== selectedFaq.wiki_id
        )

        setFaqs([response.data.wiki, ...remainingFaqsFinanceiro])

        reset()
        setDisplayModal([])
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `FAQ ${data.title} editada com sucesso!`
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
    [faqs, selectedFaq, addToast]
  )

  const handleViewFaq = useCallback(() => {
    window.open(
      `${process.env.NEXT_PUBLIC_ENV_API_ARCHIVE_URL + selectedFaq.url_file}`
    )
  }, [selectedFaq])

  return (
    <GlobalModal size={600} title="Editar FAQ Financeiro" id={id}>
      <Container
        initialData={{
          title: selectedFaq?.wiki_title
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Wrapper>
          <span style={{ width: '100%' }}>
            <Input
              name="title"
              label="Nome da FAQ"
              disabled={!permissions?.includes('WIKI.TIPOS.EDITAR')}
            />
          </span>
        </Wrapper>

        <Wrapper>
          <span>
            <FileInput
              name="wiki_file"
              label="Arquivo(Somente PDF)"
              type="file"
              disabled={!permissions?.includes('WIKI.TIPOS.EDITAR')}
            />
          </span>
        </Wrapper>

        <section>
          {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
            <Button onClick={handleViewFaq} type="button">
              Visualizar
            </Button>
          )}

          {permissions?.includes('WIKI.TIPOS.DELETAR') && (
            <Button
              onClick={() =>
                setDisplayModal([...displayModal, 'modalDeleteWikiFinanceiro'])
              }
              className="deleteButton"
              type="button"
            >
              Excluir
            </Button>
          )}
        </section>

        {permissions?.includes('WIKI.TIPOS.EDITAR') && (
          <Button type="submit">Salvar Alterações</Button>
        )}
      </Container>
    </GlobalModal>
  )
}
