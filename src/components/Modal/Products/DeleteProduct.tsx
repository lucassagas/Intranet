import { GlobalModal } from '../GlobalModal'
import { UpdateProductsProps } from './UpdateProduct'
import { useCallback } from 'react'
import { Button } from '../../Button'
import { apiDev } from '../../../services/apiDev'

import { useLoading } from '../../../hooks/loading'
import { useModal } from '../../../hooks/modal'
import { useToast } from '../../../hooks/toast'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/Products/DeleteProduct'

export function DeleteProduct({
  id,
  products,
  setProducts,
  selectedProduct
}: UpdateProductsProps) {
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  const handleDeleteProduct = useCallback(() => {
    setLoadingScreen(true)
    apiDev
      .delete(`product/${selectedProduct.id}`)
      .then(() => {
        const remainingProducts = products.filter(
          product => product.id !== selectedProduct.id
        )

        setProducts(remainingProducts)
        setDisplayModal('')
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Produto ${selectedProduct.product.toUpperCase()} deletado com sucesso!`
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

  const CurrencyFormatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL'
  })

  return (
    <GlobalModal size={400} title="Deletar Produto" id={id}>
      <Container>
        <Wrapper>
          <span>
            <strong>Produto</strong>
            <p>{selectedProduct?.product}</p>
          </span>
          <span>
            <strong>Valor</strong>
            <p>{CurrencyFormatter.format(selectedProduct?.value)}</p>
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
