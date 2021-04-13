import * as Yup from 'yup'

import { useCallback, useRef } from 'react'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Textarea } from '../../Textarea'
import { GlobalModal } from '../GlobalModal'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { CondominiumProps } from '../../../pages/sac/condominium'
import { apiDev } from '../../../services/apiDev'

import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Condominium/UpdateCondominium'

export interface UpdateCondominiumProps {
  id: string
  condominiums: CondominiumProps[]
  setCondominiums: (condominiums: CondominiumProps[]) => void
  selectedCondominium: CondominiumProps
}

export function UpdateCondominium({
  id,
  condominiums,
  setCondominiums,
  selectedCondominium
}: UpdateCondominiumProps) {
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

        const response = await apiDev.put(
          `condominium/${selectedCondominium.id}`,
          data
        )

        const remainingCondominiums = condominiums.filter(
          cond => cond.id !== selectedCondominium.id
        )

        setCondominiums([response.data, ...remainingCondominiums])

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Condomínio ${data.condominium} editado com sucesso!`
        })

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
          title: 'error',
          description: err.response ? err.response.data.message : err.message
        })
      } finally {
        setLoadingScreen(false)
      }
    },
    [condominiums, addToast, selectedCondominium]
  )

  return (
    <GlobalModal size={700} title="Editar Condomínio" id={id}>
      <Container
        initialData={{
          cep: selectedCondominium?.cep,
          state: selectedCondominium?.state,
          city: selectedCondominium?.city,
          neighborhood: selectedCondominium?.neighborhood,
          street: selectedCondominium?.street,
          number: selectedCondominium?.number,
          condominium: selectedCondominium?.condominium,
          connection: selectedCondominium?.connection,
          housing_type: selectedCondominium?.housing_type,
          price: selectedCondominium?.price
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Wrapper>
          <span>
            <Input readOnly disabled name="cep" width="150px" label="Cep" />
          </span>

          <span>
            <Input readOnly disabled name="state" width="60px" label="Estado" />
          </span>

          <span style={{ width: '100%' }}>
            <Input readOnly disabled name="city" label="Cidade" />
          </span>
        </Wrapper>

        <Wrapper>
          <span>
            <Input
              readOnly
              disabled
              width="200px"
              name="neighborhood"
              label="Bairro"
            />
          </span>

          <span style={{ width: '100%' }}>
            <Input readOnly disabled name="street" label="Rua" />
          </span>

          <span>
            <Input
              readOnly
              disabled
              name="number"
              width="60px"
              label="Número"
              type="number"
            />
          </span>
        </Wrapper>

        <Wrapper>
          <span style={{ width: '100%' }}>
            <Input readOnly disabled name="condominium" label="Condomínio" />
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
            <Input
              readOnly
              disabled
              name="housing_type"
              width="140px"
              label="Tipo de Moradia"
            />
          </span>

          <span>
            <Input name="price" width="120px" label="Valor da Instalação" />
          </span>
        </Wrapper>

        <Wrapper>
          <span style={{ width: '100%' }}>
            <Textarea name="observation" label="Observações" rows={5} />
          </span>
        </Wrapper>
        <Button
          onClick={() => setDisplayModal('modalDeleteCondominium')}
          className="deleteButton"
          type="button"
        >
          Excluir
        </Button>
        <Button type="submit">Salvar alterações</Button>
      </Container>
    </GlobalModal>
  )
}
