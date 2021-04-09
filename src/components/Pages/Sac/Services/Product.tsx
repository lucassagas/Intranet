import { useCallback, useEffect, useState } from 'react'
import { apiDev } from '../../../../services/apiDev'
import { Button } from '../../../Button'
import { PriceTable } from '../../../Tables/PriceTable'

import { useToast } from '../../../../hooks/toast'
import { useModal } from '../../../../hooks/modal'

import { CreateProduct } from '../../../Modal/Products/CreateProduct'
import { UpdateeProduct } from '../../../Modal/Products/UpdateProduct'
import { DeleteProduct } from '../../../Modal/Products/DeleteProduct'

import {
  Container,
  Wrapper
} from '../../../../styles/components/Pages/Sac/Services/Product'

export interface ProductsProps {
  id: number
  value: number
  deadline: number
  lending: string
  product: string
  type_of_payment: string
}

export function Products() {
  const [products, setProducts] = useState<ProductsProps[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductsProps>()

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()

  useEffect(() => {
    apiDev
      .get('product')
      .then(response => {
        setProducts(response.data)
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      })
  }, [])

  const handleSelectProduct = useCallback((product: ProductsProps) => {
    setSelectedProduct(product)
    setDisplayModal('modalUpdateProduct')
  }, [])

  const CurrencyFormatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL'
  })

  return (
    <Container>
      <PriceTable
        ths={[
          'Produto',
          'Valor',
          'Tipo de Pagamento',
          'Prazo de Pagamento',
          'Comodato'
        ]}
        isEditable
      >
        {products.map(product => {
          return (
            <tr onClick={() => handleSelectProduct(product)} key={product.id}>
              <td>{product.product.toUpperCase()}</td>
              <td>{CurrencyFormatter.format(product.value)}</td>
              <td>{product.type_of_payment.toLowerCase()}</td>
              <td>{product.deadline} Dias</td>
              <td>{product.lending.toLowerCase()}</td>
            </tr>
          )
        })}
      </PriceTable>
      <Wrapper>
        <Button
          onClick={() => setDisplayModal('modalCreateProduct')}
          type="button"
        >
          Cadastrar Produtos
        </Button>
      </Wrapper>

      <CreateProduct
        id="modalCreateProduct"
        products={products}
        setProducts={setProducts}
      />

      <UpdateeProduct
        id="modalUpdateProduct"
        products={products}
        setProducts={setProducts}
        selectedProduct={selectedProduct}
      />

      <DeleteProduct
        id="modalDeleteProduct"
        products={products}
        setProducts={setProducts}
        selectedProduct={selectedProduct}
      />
    </Container>
  )
}
