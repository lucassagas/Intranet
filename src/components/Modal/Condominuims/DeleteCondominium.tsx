import { useCallback } from 'react'
import { Button } from '../../Button'
import { GlobalModal } from '../GlobalModal'
import { UpdateCondominiumProps } from './UpdateCondominium'
import { apiDev } from '../../../services/apiDev'

import { useToast } from '../../../hooks/toast'
import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'

import { Container } from '../../../styles/components/Modal/Condominium/DeleteCondominium'

export function DeleteCondominium({
  id,
  condominiums,
  setCondominiums,
  selectedCondominium
}: UpdateCondominiumProps) {
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleDeleteCondominium = useCallback(async () => {
    setLoadingScreen(true)
    try {
      await apiDev.delete(`condominium/${selectedCondominium.id}`)

      const remainingCondominiums = condominiums.filter(
        cond => cond.id !== selectedCondominium.id
      )
      setCondominiums(remainingCondominiums)
      setDisplayModal('')

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Condomínio ${selectedCondominium?.condominium} excluido com sucesso!`
      })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: err.response ? err.response.data.message : err.message
      })
    } finally {
      setLoadingScreen(false)
    }
  }, [selectedCondominium, addToast])

  return (
    <GlobalModal size={400} title="Deletar Condomínio" id={id}>
      <Container>
        <div>
          <span>
            <strong>Condominio: </strong>
            <p>{selectedCondominium?.condominium}</p>
          </span>

          <span>
            <strong>Cidade: </strong>
            <p>{selectedCondominium?.city}</p>
          </span>

          <span>
            <strong>Bairro: </strong>
            <p>{selectedCondominium?.neighborhood}</p>
          </span>

          <span>
            <strong>Rua: </strong>
            <p>{selectedCondominium?.street}</p>
          </span>

          <p>Tem certeza de que quer excluir este condomínio ?</p>
        </div>
        <Button onClick={handleDeleteCondominium} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
