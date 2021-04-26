import { useCallback, useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import { Button } from '../../../Button'
import { PriceTable } from '../../../Tables/PriceTable'

import { useToast } from '../../../../hooks/toast'
import { useModal } from '../../../../hooks/modal'
import { useAuth } from '../../../../hooks/auth'
import { useRouter } from 'next/router'

import { CreateProduct } from '../../../Modal/Products/CreateProduct'
import { UpdateeProduct } from '../../../Modal/Products/UpdateProduct'
import { DeleteProduct } from '../../../Modal/Products/DeleteProduct'

import {
  Container,
  Wrapper
} from '../../../../styles/components/Pages/Sac/Services/Product'

export interface ProductsProps {
  serv_id: number
  serv_name: string
  products: Array<{
    prod_id: number
    prod_name: string
    product_value_string: string
    product_value_boolean: boolean
  }>
}

export function Products() {
  const [products, setProducts] = useState<ProductsProps[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductsProps>()

  const { addToast } = useToast()
  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()
  const router = useRouter()

  const handleLoadProducts = useCallback(() => {
    api
      .get('api/service?type=product')
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

  useEffect(() => {
    if (!permissions.includes('SAC.SERVICOS.VISUALIZAR')) {
      router.push('/')
    }
    handleLoadProducts()
  }, [])

  const handleSelectProduct = useCallback((product: ProductsProps) => {
    if (permissions.includes('SAC.SERVICOS.EDITAR')) {
      setSelectedProduct(product)
      setDisplayModal(['modalUpdateProduct'])
    }
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
        isEditable={permissions.includes('SAC.SERVICOS.EDITAR')}
      >
        {products?.map(product => {
          const price = product.products.find(
            product => product.prod_name === 'PRICE'
          )
          const deadline = product.products.find(
            product => product.prod_name === 'DEADLINE'
          )
          const form_payment = product.products.find(
            product => product.prod_name === 'FORM_PAYMENT'
          )
          const lending = product.products.find(
            product => product.prod_name === 'LENDING'
          )
          return (
            <tr
              onClick={() => handleSelectProduct(product)}
              key={product.serv_id}
            >
              <td>{product.serv_name.toUpperCase()}</td>
              <td>
                {CurrencyFormatter.format(Number(price.product_value_string))}
              </td>
              <td>{form_payment.product_value_string?.toLowerCase()}</td>
              <td>{deadline.product_value_string}</td>
              <td>{lending.product_value_string?.toLowerCase()}</td>
            </tr>
          )
        })}
      </PriceTable>
      {permissions.includes('SAC.SERVICOS.CRIAR') && (
        <Wrapper>
          <Button
            onClick={() => setDisplayModal(['modalCreateProduct'])}
            type="button"
          >
            Cadastrar Produtos
          </Button>
        </Wrapper>
      )}

      {permissions.includes('SAC.SERVICOS.CRIAR') && (
        <CreateProduct
          id="modalCreateProduct"
          handleLoadProducts={handleLoadProducts}
        />
      )}

      {permissions.includes('SAC.SERVICOS.EDITAR') && (
        <UpdateeProduct
          id="modalUpdateProduct"
          handleLoadProducts={handleLoadProducts}
          selectedProduct={selectedProduct}
        />
      )}

      {permissions.includes('SAC.SERVICOS.DELETAR') && (
        <DeleteProduct
          id="modalDeleteProduct"
          selectedProduct={selectedProduct}
          handleLoadProducts={handleLoadProducts}
        />
      )}
    </Container>
  )
}
