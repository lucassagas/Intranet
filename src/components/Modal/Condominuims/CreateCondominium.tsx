import * as Yup from 'yup'

import { useCallback, useRef, useState } from 'react'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Textarea } from '../../Textarea'
import { GlobalModal } from '../GlobalModal'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { CondominiumProps } from '../../../pages/sac/condominium'
import { apiDev } from '../../../services/apiDev'
import { InputMask } from '../../InputMask'

import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Condominium/CreateCondominium'

interface CreateCondominium {
  id: string
  condominiums: CondominiumProps[]
  setCondominiums: (condominiums: CondominiumProps[]) => void
}

interface CepProps {
  localidade: string
  logradouro: string
  bairro: string
  uf: string
}

export function CreateCondominium({
  id,
  condominiums,
  setCondominiums
}: CreateCondominium) {
  const [cep, setCep] = useState<CepProps>()

  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)

      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          cep: Yup.string().required('Campo obrigatório'),
          state: Yup.string().required('Campo obrigatório'),
          city: Yup.string().required('Campo obrigatório'),
          neighborhood: Yup.string().required('Campo obrigatório'),
          street: Yup.string().required('Campo obrigatório'),
          number: Yup.number().required('Campo obrigatório'),
          condominium: Yup.string().required('Campo obrigatório'),
          connection: Yup.string().required('Campo obrigatório'),
          housing_type: Yup.string().required('Campo obrigatório'),
          price: Yup.number().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await apiDev.post('condominium', data)

        setCondominiums([response.data, ...condominiums])

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Condomínio ${data.condominium} cadastrado com sucesso!`
        })

        setDisplayModal('')
        setCep(null)
        reset()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'error',
          description: err.response ? err.response.data.message : err.message
        })
      } finally {
        setLoadingScreen(false)
      }
    },
    [condominiums, addToast]
  )

  const searchCEP = useCallback(
    event => {
      const parsedCep = event.toString().replace('_', '')

      if (parsedCep?.length !== 9) {
        addToast({
          type: 'info',
          title: 'Erro no CEP',
          description: 'CEP deve conter 8 digitos'
        })

        return
      }

      fetch(`https://viacep.com.br/ws/${parsedCep}/json/`)
        .then((response: any) => response.json())
        .then((data: any) => {
          if (data.erro) {
            addToast({
              type: 'error',
              title: 'CEP NÃO ENCONTRADO',
              description: 'CEP informado não encontrado.'
            })

            return
          }

          setCep(data)
        })
    },
    [addToast, cep]
  )

  return (
    <GlobalModal size={700} title="Cadastrar Condomínio" id={id}>
      <Container
        ref={formRef}
        initialData={{
          city: cep?.localidade,
          street: cep?.logradouro,
          neighborhood: cep?.bairro,
          state: cep?.uf
        }}
        onSubmit={handleSubmit}
      >
        <Wrapper>
          <span>
            <InputMask
              mask="99999-999"
              onBlur={event => searchCEP(event.target.value)}
              name="cep"
              width="150px"
              label="Cep"
            />
          </span>

          <span>
            <Input name="state" width="60px" label="Estado" />
          </span>

          <span style={{ width: '100%' }}>
            <Input name="city" label="Cidade" />
          </span>
        </Wrapper>

        <Wrapper>
          <span>
            <Input width="200px" name="neighborhood" label="Bairro" />
          </span>

          <span style={{ width: '100%' }}>
            <Input name="street" label="Rua" />
          </span>

          <span>
            <Input name="number" width="60px" label="Número" type="number" />
          </span>
        </Wrapper>

        <Wrapper>
          <span style={{ width: '100%' }}>
            <Input name="condominium" label="Condomínio" />
          </span>

          <span>
            <Input
              name="connection"
              width="100px"
              label="Conexão"
              list="connections"
            />

            <datalist id="connections">
              <option value="Fibra">Fibra</option>
              <option value="Radio">Radio</option>
            </datalist>
          </span>

          <span>
            <Input name="housing_type" width="120px" label="Tipo de Moradia" />
          </span>

          <span>
            <Input
              name="price"
              width="120px"
              label="Valor da Instalação"
              type="number"
            />
          </span>
        </Wrapper>

        <Wrapper>
          <span style={{ width: '100%' }}>
            <Textarea name="observation" label="Observações" rows={5} />
          </span>
        </Wrapper>
        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
