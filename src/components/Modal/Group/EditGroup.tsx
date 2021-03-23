import { useCallback } from 'react'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'

import {
  Container,
  WrapperOptions,
  StyledOption
} from '../../../styles/components/Modal/Group/EditGroup'
import { Form } from '@unform/web'

interface EditGroupProps {
  id: string | number
}

export function EditGroup({ id }: EditGroupProps) {
  const handleSubmit = useCallback(() => {
    console.log('po')
  }, [])

  return (
    <GlobalModal title="Vincular Permissões" id={id} size={500}>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input name="name" readOnly />

            <WrapperOptions>
              <h3>noc</h3>
              <div>
                <StyledOption type="button">NOC.USERS</StyledOption>
                <StyledOption type="button">NOC.USERS.EDITAR</StyledOption>
                <StyledOption type="button">NOC.USERS.EXCLUIR</StyledOption>
                <StyledOption type="button">NOC.USER.CRIAR</StyledOption>
              </div>
            </WrapperOptions>
          </div>
          <Button>Salvar</Button>
        </Form>
      </Container>
    </GlobalModal>
  )
}
function usecallBack(arg0: () => any) {
  throw new Error('Function not implemented.')
}
