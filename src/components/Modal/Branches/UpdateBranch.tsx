import * as Yup from 'yup'
import { useCallback, useRef } from 'react'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'

import { BranchesProps } from '../../../pages/rh/branches'
import { Button } from '../../Button'
import { useToast } from '../../../hooks/toast'
import { useLoading } from '../../../hooks/loading'
import { useModal } from '../../../hooks/modal'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { FormHandles } from '@unform/core'
import { api } from '../../../services/api'

import { Container } from '../../../styles/components/Modal/Branches/UpdateBranch'
import { useAuth } from '../../../hooks/auth'

export interface UpdateBranchProps {
  id: string
  branches: BranchesProps[]
  setBranches: (data: BranchesProps[]) => void
  selectedBranch: BranchesProps
}

export function UpdateBranch({
  id,
  branches,
  setBranches,
  selectedBranch
}: UpdateBranchProps) {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

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

        const response = await api.put(
          `api/branch/${selectedBranch.bran_id}`,
          data
        )

        const remainingExtensions = branches.filter(
          branch => branch.bran_id !== selectedBranch.bran_id
        )

        setBranches([response.data.branch, ...remainingExtensions])
        setDisplayModal('')
        reset()
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: `Ramal ${data.number} editado com sucesso`
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
    [branches, addToast, selectedBranch]
  )

  return (
    <GlobalModal id={id} size={500} title="Editar Ramal">
      <Container
        initialData={{
          sector: selectedBranch?.bran_sector.toUpperCase(),
          number: selectedBranch?.bran_number
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div>
          <span style={{ width: '100%' }}>
            <Input name="sector" label="Setor Responsável" />
          </span>
          <span>
            <Input width="150px" name="number" label="Número do Ramal" />
          </span>
        </div>

        {permissions?.includes('RH.RAMAIS.DELETAR') && (
          <Button
            type="button"
            className="deleteButton"
            onClick={() => setDisplayModal('modalDeleteBranch')}
          >
            Excluir
          </Button>
        )}

        <Button type="submit">Salvar alterações</Button>
      </Container>
    </GlobalModal>
  )
}
