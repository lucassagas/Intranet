import * as Yup from 'yup'

import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { FormHandles } from '@unform/core'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { api } from '../../../services/api'

import { useCallback, useRef } from 'react'
import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/EquipmentBackup/CreateEquipment'

interface CreateEquipmentProps {
  id: string
  handleLoadEquipments: () => void
}

export function CreateEquipment({
  id,
  handleLoadEquipments
}: CreateEquipmentProps) {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()

  const handleSubmit = useCallback(async (data, { reset }) => {
    setLoadingScreen(true)

    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        status: Yup.string().required('Campo obrigatório'),
        city: Yup.string().required('Campo obrigatório'),
        ip: Yup.string().required('Campo obrigatório'),
        type: Yup.string().required('Campo obrigatório'),
        manu: Yup.string().required('Campo obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const formattedData = {
        ...data,
        status: data.status === 'ATIVO' ? true : false
      }

      await api.post('api/bkp_equipment', formattedData)

      handleLoadEquipments()
      setDisplayModal([])
      reset()
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Equipamento ${data.name} cadastrado com sucesso!`
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
  }, [])

  return (
    <GlobalModal id={id} size={600} title="Cadastrar Equipamento">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <Wrapper>
          <section>
            <span style={{ width: '100%' }}>
              <Input name="name" label="Nome" />
            </span>

            <span>
              <Input name="status" label="Status" list="status" />

              <datalist id="status">
                <option value="ATIVO">ATIVO</option>
                <option value="INATIVO">INATIVO</option>
              </datalist>
            </span>
          </section>

          <section>
            <span style={{ width: '100%' }}>
              <Input name="city" label="Cidade" />
            </span>
            <span>
              <Input width="200px" name="ip" label="IP" />
            </span>
          </section>

          <section>
            <span>
              <Input name="type" label="Equipamento" list="equipment" />
              <datalist id="equipment">
                <option value="OLT">OLT</option>
                <option value="ROUTERBOARD">ROUTERBOARD</option>
                <option value="HUAWEI">HUAWEI</option>
              </datalist>
            </span>

            <span>
              <Input name="manu" label="Fabricante" list="manufactory" />
              <datalist id="manufactory">
                <option value="HUAWEI">HUAWEI</option>
                <option value="DATACOM">DATACOM</option>
                <option value="INTELBRAS">INTELBRAS</option>
                <option value="MIKROTIK">MIKROTIK</option>
              </datalist>
            </span>
          </section>
        </Wrapper>
        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
