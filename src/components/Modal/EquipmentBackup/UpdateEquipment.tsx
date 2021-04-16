import * as Yup from 'yup'

import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { FormHandles } from '@unform/core'
import { useCallback, useRef } from 'react'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { apiDev } from '../../../services/apiDev'
import { EquipmentsProps } from '../../Pages/Noc/Backup/Equipments'

import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { useAuth } from '../../../hooks/auth'

import {
  Container,
  Wrapper
} from '../../../styles/components/Modal/EquipmentBackup/UpdateEquipment'

export interface UpdateEquipamentProps {
  id: string
  handleLoadEquipments: () => void
  selectedEquipment: EquipmentsProps
}

export function UpdateEquipment({
  id,
  handleLoadEquipments,
  selectedEquipment
}: UpdateEquipamentProps) {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

  const handleSubmit = useCallback(async (data, { reset }) => {
    setLoadingScreen(true)

    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        status: Yup.string().required('Campo obrigatório'),
        city: Yup.string().required('Campo obrigatório'),
        ip: Yup.string().required('Campo obrigatório'),
        equipment: Yup.string().required('Campo obrigatório'),
        manufactory: Yup.string().required('Campo obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      await apiDev.post('equipment', data)

      handleLoadEquipments()
      setDisplayModal('')
      reset()
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Equipamento ${data.name} editado com sucesso!`
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
    <GlobalModal id={id} size={600} title="Editar Equipamento">
      <Container
        initialData={{
          name: selectedEquipment?.name,
          status: selectedEquipment?.status,
          city: selectedEquipment?.city,
          equipment: selectedEquipment?.equipment,
          manufactory: selectedEquipment?.manufactory,
          access: selectedEquipment?.access,
          user: selectedEquipment?.user,
          port: selectedEquipment?.port,
          ip: selectedEquipment?.ip
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Wrapper>
          <section>
            <span style={{ width: '100%' }}>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                name="name"
                label="Nome"
              />
            </span>

            <span>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                name="status"
                label="Status"
                list="status"
              />

              <datalist id="status">
                <option value="ATIVO">ATIVO</option>
                <option value="INATIVO">INATIVO</option>
              </datalist>
            </span>
          </section>

          <section>
            <span style={{ width: '100%' }}>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                name="city"
                label="Cidade"
              />
            </span>
            <span>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                width="200px"
                name="ip"
                label="IP"
              />
            </span>
          </section>

          <section>
            <span style={{ width: '100%' }}>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                name="equipment"
                label="Equipamento"
                list="equipment"
              />
              <datalist id="equipment">
                <option value="OLT">OLT</option>
                <option value="RB">RB</option>
                <option value="HUAWEI">HUAWEI</option>
              </datalist>
            </span>

            <span>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                width="150px"
                name="manufactory"
                label="Fabricante"
                list="manufactory"
              />
              <datalist id="manufactory">
                <option value="HUAWEI">HUAWEI</option>
                <option value="DATACOM">DATACOM</option>
                <option value="INTELBRAS">INTELBRAS</option>
                <option value="MIKROTIK">MIKROTIK</option>
              </datalist>
            </span>

            <span>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                name="access"
                width="130px"
                label="Acesso"
                list="access"
              />

              <datalist id="access">
                <option value="SSH">SSH</option>
                <option value="TELNET">TELNET</option>
              </datalist>
            </span>
          </section>

          <section>
            <span style={{ width: '100%' }}>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                name="user"
                label="Usuário"
              />
            </span>
            <span style={{ width: '100%' }}>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                name="password"
                password
                label="Senha"
              />
            </span>

            <span>
              <Input
                disabled={!permissions.includes('NOC.BACKUP.EDITAR')}
                width="120px"
                name="port"
                label="Porta"
              />
            </span>
          </section>
        </Wrapper>
        {permissions.includes('NOC.BACKUP.DELETAR') && (
          <Button
            className="deleteButton"
            type="button"
            onClick={() => setDisplayModal('modalDeleteEquipment')}
          >
            Excluir
          </Button>
        )}

        {permissions.includes('NOC.BACKUP.EDITAR') && (
          <Button type="submit">Salvar alterações</Button>
        )}
      </Container>
    </GlobalModal>
  )
}
