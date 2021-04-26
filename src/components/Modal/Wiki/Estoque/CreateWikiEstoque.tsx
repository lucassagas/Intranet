import * as Yup from 'yup'

import { GlobalModal } from '../../GlobalModal'
import { Input } from '../../../Input'
import { Button } from '../../../Button'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../../utils/getValidationErrors'
import { apiDev } from '../../../../services/apiDev'
import { WikiEstoqueProps } from '../../../../pages/wiki/estoque'

import { useCallback, useRef } from 'react'
import { useToast } from '../../../../hooks/toast'
import { useModal } from '../../../../hooks/modal'
import { useLoading } from '../../../../hooks/loading'

import {
  Container,
  Wrapper
} from '../../../../styles/components/Modal/Wiki/Estoque/CreateWikiEstoque'

interface CreateWikiEstoqueProps {
  id: string
  faqs: WikiEstoqueProps[]
  setFaqs: (faqs: WikiEstoqueProps[]) => void
}

export function CreateWikiEstoque({
  id,
  faqs,
  setFaqs
}: CreateWikiEstoqueProps) {
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
          name: Yup.string().required('Campo obrigatório'),
          subject: Yup.string().required('Campo obrigatório'),
          archive: Yup.string().required('Campo obrigatório').label('file')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const formData = new FormData()

        const { name, archive, subject } = data

        formData.append('name', name)
        formData.append('subject', subject)
        formData.append('archive', archive)

        const response = await apiDev.post('faqestoque', data)

        setFaqs([response.data, ...faqs])

        reset()
        setDisplayModal([])
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `FAQ ${data.name} criada com sucesso!`
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
    <GlobalModal size={600} title="Cadastrar FAQ Estoque" id={id}>
      <Container ref={formRef} onSubmit={handleSubmit}>
        <Wrapper>
          <span>
            <Input width="200px" name="subject" label="Assunto" />
          </span>

          <span style={{ width: '100%' }}>
            <Input name="name" label="Nome da FAQ" />
          </span>
        </Wrapper>

        <Wrapper>
          <span>
            <Input name="archive" label="Arquivo(Somente PDF)" type="file" />
          </span>
        </Wrapper>

        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
