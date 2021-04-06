import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Contributors/DeleteContributors'

import { UpdateContributorsProps } from './UpdateContributors'
import { useCallback } from 'react'
import { api } from '../../../services/api'
import { useLoading } from '../../../hooks/loading'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'

export function DeleteContributors({
  id,
  contributors,
  setContributors,
  selectedContributor
}: UpdateContributorsProps) {
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleDeleteContributor = useCallback(() => {
    setLoadingScreen(true)
    api
      .delete(`api/contributor/${selectedContributor.contri_id}`)
      .then(() => {
        const removedContributors = contributors.contributorsProps.filter(
          contributor => contributor.contri_id !== selectedContributor.contri_id
        )

        setDisplayModal('')

        setContributors({ contributorsProps: [...removedContributors] })

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Usuário: ${selectedContributor.contri_name} excluido com sucesso!`
        })
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.message
        })
      })
      .finally(() => setLoadingScreen(false))
  }, [selectedContributor])

  return (
    <GlobalModal id={id} size={300} title="Delete Colaborador">
      <Container>
        <Wrapper>
          <section>
            <strong>Nome:</strong>
            <p>{selectedContributor && selectedContributor.contri_name}</p>
          </section>

          <p>Deseja realmente deletar este colaborador ?</p>
        </Wrapper>
        <Button onClick={handleDeleteContributor} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
