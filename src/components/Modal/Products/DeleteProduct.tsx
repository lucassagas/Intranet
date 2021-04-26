import { GlobalModal } from '../GlobalModal'
import { UpdateProductsProps } from './UpdateProduct'
import { useCallback } from 'react'
import { Button } from '../../Button'
import { api } from '../../../services/api'

import { useLoading } from '../../../hooks/loading'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Products/DeleteProduct'

export function DeleteProduct({
  id,
  handleLoadProducts,
  selectedProduct
}: UpdateProductsProps) {
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleDeleteProduct = useCallback(() => {
    setLoadingScreen(true)
    api
      .delete(`api/service/${selectedProduct.serv_id}`)
      .then(() => {
        handleLoadProducts()
        setDisplayModal([])
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Produto ${selectedProduct.serv_name.toUpperCase()} deletado com sucesso!`
        })
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      })
      .finally(() => setLoadingScreen(false))
  }, [selectedProduct])

  return (
    <GlobalModal size={400} title="Deletar Produto" id={id}>
      <Container>
        <Wrapper>
          <span>
            <strong>Produto</strong>
            <p>{selectedProduct?.serv_name}</p>
          </span>

          <p>Tem certeza de que quer deletar este produto ?</p>
        </Wrapper>
        <Button onClick={handleDeleteProduct} type="button">
          Excluir
        </Button>
      </Container>
    </GlobalModal>
  )
}
