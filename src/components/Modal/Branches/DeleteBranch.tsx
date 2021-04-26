import { useCallback } from 'react'
import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'
import { UpdateBranchProps } from './UpdateBranch'
import { apiDev } from '../../../services/apiDev'
import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'

import { Container } from '../../../styles/components/Modal/Branches/DeleteBranch'

export function DeleteBranch({
  id,
  branches,
  setBranches,
  selectedBranch
}: UpdateBranchProps) {
  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()

  const handleDeleteBranch = useCallback(() => {
    setLoadingScreen(true)

    apiDev
      .delete(`branches/${selectedBranch.bran_id}`)
      .then(() => {
        const remainingExtensions = branches.filter(
          branch => branch.bran_id !== selectedBranch.bran_id
        )
        setBranches(remainingExtensions)
        setDisplayModal([])

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Ramal excluido com sucesso!'
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
  }, [selectedBranch, addToast])
  return (
    <GlobalModal id={id} size={400} title="Deletar Ramal">
      <Container>
        <div>
          <section>
            <strong>Setor</strong>
            <p>{selectedBranch?.bran_sector}</p>
          </section>
          <section>
            <strong>Ramal</strong>
            <p>{selectedBranch?.bran_number}</p>
          </section>
        </div>
        <Button onClick={handleDeleteBranch} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
