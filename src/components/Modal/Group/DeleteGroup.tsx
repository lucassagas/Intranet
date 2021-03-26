import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Group/DeleteGroup'
import { useCallback } from 'react'
import { api } from '../../../services/api'
import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'

interface DeleteGroupProps {
  id: string
  reloadFunction: () => void
}

export function DeleteGroup({ id, reloadFunction }: DeleteGroupProps) {
  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  // const handleDeleteGroup = useCallback(() => {
  //   api
  //     .delete(`api/group/${group.id}`)
  //     .then(response => {
  //       console.log(response)
  //       addToast({
  //         type: 'success',
  //         title: 'Sucesso',
  //         description: response.data.message
  //       })
  //       reloadFunction()
  //       setDisplayModal('')
  //     })
  //     .catch(err => {
  //       addToast({
  //         type: 'error',
  //         title: 'Error',
  //         description: err.response.data.message
  //       })
  //     })
  // }, [addToast, group])
  return (
    <GlobalModal id={id} size={400} title="Deletar grupo">
      <Container>
        <Wrapper>
          <strong>Deseja realmente deletar este grupo? </strong>
          {/* <p>{group && group.groupName}</p> */}
        </Wrapper>
        <Button type="button">Confirmar</Button>
      </Container>
    </GlobalModal>
  )
}
