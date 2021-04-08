import * as Yup from 'yup'
import { useCallback, useRef } from 'react'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { useToast } from '../../../hooks/toast'
import { useLoading } from '../../../hooks/loading'
import { useModal } from '../../../hooks/modal'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import { api } from '../../../services/api'
import { BranchesProps } from '../../../pages/rh/branches'

import { Container } from '../../../styles/components/Modal/Branches/CreateBranch'

interface CreateBranchProps {
  id: string
  branches: BranchesProps[]
  setBranches: (data: BranchesProps[]) => void
}

export function CreateBranch({ id, branches, setBranches }: CreateBranchProps) {
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
          sector: Yup.string().required('Campo obrigatório'),
          number: Yup.string().required('Campo obrigatório')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await api.post('api/branch', data)

        setBranches([response.data.branch, ...branches])
        setDisplayModal('')
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Ramal ${data.number} cadastrado com sucesso`
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
    [branches, addToast]
  )

  return (
    <GlobalModal id={id} size={500} title="Cadastrar Ramal">
      <Container ref={formRef} onSubmit={handleSubmit}>
        <div>
          <span style={{ width: '100%' }}>
            <Input name="sector" label="Setor Responsável" />
          </span>
          <span>
            <Input width="150px" name="number" label="Número do Ramal" />
          </span>
        </div>
        <Button type="submit">Cadastrar</Button>
      </Container>
    </GlobalModal>
  )
}
