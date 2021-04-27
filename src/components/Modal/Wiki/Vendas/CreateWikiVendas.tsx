import * as Yup from 'yup'

import { GlobalModal } from '../../GlobalModal'
import { Input } from '../../../Input'
import { Button } from '../../../Button'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../../utils/getValidationErrors'
import { api } from '../../../../services/api'
import { WikiVendasProps } from '../../../../pages/wiki/vendas'
import { FileInput } from '../../../FileInput'

import { useCallback, useRef } from 'react'
import { useToast } from '../../../../hooks/toast'
import { useModal } from '../../../../hooks/modal'
import { useLoading } from '../../../../hooks/loading'

import {
  Container,
  Wrapper
} from '../../../../styles/components/Modal/Wiki/Vendas/CreateWikiVendas'

interface CreateWikiVendasProps {
  id: string
  faqs: WikiVendasProps[]
  setFaqs: (faqs: WikiVendasProps[]) => void
}

export function CreateWikiVendas({ id, faqs, setFaqs }: CreateWikiVendasProps) {
  const formRef = useRef<FormHandles>(null)

  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)

      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          title: Yup.string().required('Campo obrigatório'),
          wiki_file: Yup.string().required('Campo obrigatório').label('file')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const type = 'vendas'
        const formData = new FormData()

        formData.append('wiki_file', data.wiki_file)
        formData.append('title', data.title)
        formData.append('type', type)

        const response = await api.post('api/wiki', formData)

        setFaqs([response.data.wiki, ...faqs])

        reset()
        setDisplayModal([])
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `FAQ ${data.title} criada com sucesso!`
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
    [faqs]
  )

  return (
    <GlobalModal size={600} title="Cadastrar FAQ Vendas" id={id}>
      <Container ref={formRef} onSubmit={handleSubmit}>
        <Wrapper>
          <span style={{ width: '100%' }}>
            <Input name="title" label="Nome da FAQ" />
          </span>
        </Wrapper>

        <Wrapper>
          <span>
            <FileInput
              name="wiki_file"
              label="Arquivo(Somente PDF)"
              type="file"
            />
          </span>
        </Wrapper>

        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
