import * as Yup from 'yup'
import { useCallback, useRef } from 'react'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { ProductsProps } from '../../Pages/Sac/Services/Product'
import { apiDev } from '../../../services/apiDev'

import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'

import { Container } from '../../../styles/components/Modal/Products/UpdateProduct'

export interface UpdateProductsProps {
  id: string
  products: ProductsProps[]
  setProducts: (products: ProductsProps[]) => void
  selectedProduct: ProductsProps
}

export function UpdateeProduct({
  id,
  products,
  setProducts,
  selectedProduct
}: UpdateProductsProps) {
  const formRef = useRef<FormHandles>()
  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          value: Yup.number().required('Campo obrigatório'),
          deadline: Yup.number().required('Campo obrigatório'),
          lending: Yup.string().required('Campo obrigatório'),
          product: Yup.string().required('Campo obrigatório'),
          type_of_payment: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await apiDev.put(`product/${selectedProduct.id}`, data)

        const remainingProducts = products.filter(
          product => product.id !== selectedProduct.id
        )

        setProducts([response.data, ...remainingProducts])

        setDisplayModal('')
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Produto ${data.product} editado com sucesso!`
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      } finally {
        setLoadingScreen(false)
      }
    },
    [products, selectedProduct]
  )

  return (
    <GlobalModal id={id} size={600} title="Editar Produto">
      <Container
        initialData={{
          value: selectedProduct?.value,
          deadline: selectedProduct?.deadline,
          lending: selectedProduct?.lending,
          product: selectedProduct?.product,
          type_of_payment: selectedProduct?.type_of_payment
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div>
          <span>
            <Input name="value" label="Valor" type="number" />
          </span>

          <span>
            <Input name="deadline" label="Prazo de Pagamento" type="number" />
          </span>

          <span>
            <Input name="lending" label="Comotado" />
          </span>
        </div>

        <div>
          <span style={{ width: '100%' }}>
            <Input name="product" width="100%" label="Produto" />
          </span>

          <span>
            <Input name="type_of_payment" label="Tipo de pagamento" />
          </span>
        </div>
        <Button
          onClick={() => setDisplayModal('modalDeleteProduct')}
          className="deleteButton"
          type="button"
        >
          Excluir
        </Button>

        <Button type="submit">Salvar Alterações</Button>
      </Container>
    </GlobalModal>
  )
}
