import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Permission/DeletePermission'
import { useCallback } from 'react'
import { api } from '../../../services/api'
import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'

interface DeletePermissionProps {
  id: string
  reloadFunction: () => void
  permission: {
    permissionName?: string
    id: number
  }
}

export function DeletePermission({
  id,
  permission,
  reloadFunction
}: DeletePermissionProps) {
  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  const handleDeletePermission = useCallback(() => {
    api
      .delete(`api/permission/${permission.id}`)
      .then(response => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: response.data.message
        })
        reloadFunction()
        setDisplayModal([])
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Error',
          description: 'Erro ao deletar permissão, contato um administrador'
        })
      })
  }, [addToast, permission])
  return (
    <GlobalModal id={id} size={400} title="Deletar permissão">
      <Container>
        <Wrapper>
          <strong>Deseja realmente deletar está permissão? </strong>
          <p>{permission && permission.permissionName}</p>
        </Wrapper>
        <Button onClick={handleDeletePermission} type="button">
          Confirmar
        </Button>
      </Container>
    </GlobalModal>
  )
}
