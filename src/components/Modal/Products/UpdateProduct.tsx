import * as Yup from 'yup'
import { useCallback, useMemo, useRef } from 'react'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { ProductsProps } from '../../Pages/Sac/Services/Product'
import { api } from '../../../services/api'

import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { useAuth } from '../../../hooks/auth'

import { Container } from '../../../styles/components/Modal/Products/UpdateProduct'

export interface UpdateProductsProps {
  id: string
  handleLoadProducts: () => void
  selectedProduct: ProductsProps
}

export function UpdateeProduct({
  id,
  selectedProduct,
  handleLoadProducts
}: UpdateProductsProps) {
  const formRef = useRef<FormHandles>()
  const { setDisplayModal } = useModal()
  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()
  const { permissions } = useAuth()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          price: Yup.number().required('Campo obrigatório'),
          deadline: Yup.string().required('Campo obrigatório'),
          lending: Yup.string().required('Campo obrigatório'),
          name: Yup.string().required('Campo obrigatório'),
          form_payment: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const formattedData = {
          type: 'product',
          ...data
        }

        await api.put(`api/service/${selectedProduct.serv_id}`, formattedData)

        handleLoadProducts()

        setDisplayModal([])
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Produto ${data.name} editado com sucesso!`
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
    [selectedProduct]
  )

  const products = useMemo(() => {
    const price = selectedProduct?.products.find(
      product => product.prod_name === 'PRICE'
    )

    const deadline = selectedProduct?.products.find(
      product => product.prod_name === 'DEADLINE'
    )

    const form_payment = selectedProduct?.products.find(
      product => product.prod_name === 'FORM_PAYMENT'
    )

    const lending = selectedProduct?.products.find(
      product => product.prod_name === 'LENDING'
    )

    return {
      price,
      deadline,
      form_payment,
      lending
    }
  }, [selectedProduct])

  return (
    <GlobalModal id={id} size={600} title="Editar Produto">
      <Container
        initialData={{
          price: products?.price?.product_value_string,
          deadline: products?.deadline?.product_value_string,
          lending: products?.lending?.product_value_string,
          name: selectedProduct?.serv_name,
          form_payment: products?.form_payment?.product_value_string
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div>
          <span>
            <Input name="price" label="Valor" type="number" />
          </span>

          <span>
            <Input name="deadline" label="Prazo de Pagamento" type="text" />
          </span>

          <span>
            <Input name="lending" label="Comotado" list="lending" />

            <datalist id="lending">
              <option value="SIM">SIM</option>
              <option value="NÃO">NÃO</option>
            </datalist>
          </span>
        </div>

        <div>
          <span style={{ width: '100%' }}>
            <Input name="name" width="100%" label="Produto" />
          </span>

          <span>
            <Input
              name="form_payment"
              label="Tipo de pagamento"
              list="form_payment"
            />
            <datalist id="form_payment">
              <option value="BOLETO">BOLETO</option>
            </datalist>
          </span>
        </div>
        {permissions.includes('SAC.SERVICOS.DELETAR') && (
          <Button
            onClick={() => setDisplayModal(['modalDeleteProduct'])}
            className="deleteButton"
            type="button"
          >
            Excluir
          </Button>
        )}

        <Button type="submit">Salvar Alterações</Button>
      </Container>
    </GlobalModal>
  )
}
