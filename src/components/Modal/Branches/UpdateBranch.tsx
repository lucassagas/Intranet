import * as Yup from 'yup'
import { useCallback, useRef } from 'react'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'

import { BranchesProps } from '../../../pages/rh/branches'

import { Container } from '../../../styles/components/Modal/Branches/UpdateBranch'
import { Button } from '../../Button'
import { useToast } from '../../../hooks/toast'
import { useLoading } from '../../../hooks/loading'
import { useModal } from '../../../hooks/modal'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import { apiDev } from '../../../services/apiDev'

interface UpdateBranchProps {
  id: string
  branches: BranchesProps[]
  setBranches: (data: BranchesProps[]) => void
}

export function UpdateBranch({ id, branches, setBranches }: UpdateBranchProps) {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
      setLoadingScreen(true)
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          bran_sector: Yup.string().required('Campo obrigatório'),
          bran_number: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await apiDev.post('branches', data)

        setBranches([response.data, ...branches])
        setDisplayModal('')
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Ramal editado com sucesso'
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
          description: err.message
        })
      } finally {
        setLoadingScreen(false)
      }
    },
    [branches, addToast]
  )

  return (
    <GlobalModal id={id} size={500} title="Editar Ramal">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <div>
          <span style={{ width: '100%' }}>
            <Input name="bran_sector" label="Setor Responsável" />
          </span>
          <span>
            <Input width="150px" name="bran_number" label="Número do Ramal" />
          </span>
        </div>
        <Button type="submit">Salvar alterações</Button>
      </Container>
    </GlobalModal>
  )
}
