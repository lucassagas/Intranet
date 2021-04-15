import * as Yup from 'yup'

import { useCallback, useRef } from 'react'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Textarea } from '../../Textarea'
import { GlobalModal } from '../GlobalModal'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { CondominiumProps } from '../../../pages/sac/condominium'
import { api } from '../../../services/api'

import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'
import { useAuth } from '../../../hooks/auth'

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
  const { permissions } = useAuth()

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)

      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          city: Yup.string().required('Campo obrigatório'),
          neigh: Yup.string().required('Campo obrigatório'),
          street: Yup.string().required('Campo obrigatório'),
          number: Yup.number().required('Campo obrigatório'),
          name: Yup.string().required('Campo obrigatório'),
          connection: Yup.string().required('Campo obrigatório'),
          type: Yup.string().required('Campo obrigatório'),
          price: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await api.put(
          `api/condominium/${selectedCondominium.cond_id}`,
          data
        )

        const remainingCondominiums = condominiums.filter(
          cond => cond.cond_id !== selectedCondominium.cond_id
        )

        console.log(response)

        // setCondominiums([response.data.condominium, ...remainingCondominiums])

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Condomínio ${data.name} editado com sucesso!`
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
          city: selectedCondominium?.city_name,
          neigh: selectedCondominium?.cond_neigh,
          street: selectedCondominium?.cond_street,
          number: selectedCondominium?.cond_number,
          name: selectedCondominium?.cond_name,
          connection: selectedCondominium?.cond_connection,
          type: selectedCondominium?.cond_type,
          price: selectedCondominium?.cond_price,
          obs: selectedCondominium?.cond_obs
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Wrapper>
          <span style={{ width: '100%' }}>
            <Input readOnly disabled name="city" label="Cidade" />
          </span>

          <span>
            <Input
              readOnly
              disabled
              width="200px"
              name="neigh"
              label="Bairro"
            />
          </span>
        </Wrapper>

        <Wrapper>
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
            <Input readOnly disabled name="name" label="Condomínio" />
          </span>

          <span>
            <Input
              name="connection"
              width="100px"
              label="Conexão"
              list="connections"
              disabled={!permissions.includes('SAC.CONDOMINIOS.EDITAR')}
            />

            <datalist id="connections">
              <option value="Fibra">Fibra</option>
              <option value="Radio">Radio</option>
            </datalist>
          </span>
        </Wrapper>

        <Wrapper>
          <span>
            <Input readOnly disabled name="type" label="Tipo de Moradia" />
          </span>

          <span>
            <Input
              disabled={!permissions.includes('SAC.CONDOMINIOS.EDITAR')}
              name="price"
              label="Valor da Instalação"
            />
          </span>
        </Wrapper>

        <Wrapper>
          <span style={{ width: '100%' }}>
            <Textarea
              disabled={!permissions.includes('SAC.CONDOMINIOS.EDITAR')}
              name="obs"
              label="Observações"
              rows={5}
            />
          </span>
        </Wrapper>
        {permissions.includes('SAC.CONDOMINIOS.DELETAR') && (
          <Button
            onClick={() => setDisplayModal('modalDeleteCondominium')}
            className="deleteButton"
            type="button"
          >
            Excluir
          </Button>
        )}

        {permissions.includes('SAC.CONDOMINIOS.EDITAR') && (
          <Button type="submit">Salvar alterações</Button>
        )}
      </Container>
    </GlobalModal>
  )
}
