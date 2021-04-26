import * as Yup from 'yup'

import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'
import { Button } from '../../Button'
import { FormHandles } from '@unform/core'
import { useCallback, useRef, useState } from 'react'
import { getValidationErrors } from '../../../utils/getValidationErrors'
import { api } from '../../../services/api'
import { EquipmentsProps } from '../../Pages/Noc/Backup/Equipments'

import { useModal } from '../../../hooks/modal'
import { useLoading } from '../../../hooks/loading'
import { useToast } from '../../../hooks/toast'
import { useAuth } from '../../../hooks/auth'

import { ResultBackup } from './ResultBackup'

import {
  Container,
  Wrapper,
  ButtonStartBackup
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
  const [accessGranted, setAccessGranted] = useState<string>('initial')
  const formRef = useRef<FormHandles>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const { addToast } = useToast()
  const { setLoadingScreen } = useLoading()
  const { setDisplayModal, displayModal } = useModal()
  const { permissions } = useAuth()

  const handleSubmit = useCallback(
    async (data, { reset }) => {
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

        await api.put(
          `api/bkp_equipment/${selectedEquipment.bkp_equi_id}`,
          formattedData
        )

        handleLoadEquipments()
        setDisplayModal([])
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
    },
    [selectedEquipment]
  )

  const handleStartBackup = useCallback(async () => {
    try {
      setLoadingScreen(true)
      const response = await api.get(
        `api/bkp_equipment/${selectedEquipment.bkp_equi_id}/run_backup`
      )

      const replacedResult = response.data.stdout.replace(/\n/g, '<br />')

      setDisplayModal([...displayModal, 'modalResultBackup'])
      resultRef.current.innerHTML = replacedResult

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: `Backup do equipamento ${selectedEquipment.bkp_equi_name} realizado com sucesso!`
      })

      console.log(response)
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: err.response ? err.response.data.message : err.message
      })
    } finally {
      setLoadingScreen(false)
    }
  }, [selectedEquipment, addToast, displayModal, resultRef])

  const handleTestAcess = useCallback(async () => {
    try {
      setLoadingScreen(true)
      await api.get(
        `api/bkp_equipment/${selectedEquipment.bkp_equi_id}/test_access`
      )
      setAccessGranted('granted')
      setTimeout(() => {
        setAccessGranted('initial')
      }, 4000)
    } catch (err) {
      setAccessGranted('denied')
      setTimeout(() => {
        setAccessGranted('initial')
      }, 4000)
      addToast({
        type: 'error',
        title: 'Error',
        description: err.response ? err.response.data.message : err.message
      })
    } finally {
      setLoadingScreen(false)
    }
  }, [selectedEquipment, addToast])

  const handlePing = useCallback(async () => {
    try {
      setLoadingScreen(true)

      const response = await api.get(
        `api/bkp_equipment/${selectedEquipment.bkp_equi_id}/ping`
      )

      const replacedResult = response.data.stdout.replace(/\n/g, '<br />')

      setDisplayModal([...displayModal, 'modalResultBackup'])
      resultRef.current.innerHTML = replacedResult
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error',
        description: err.response ? err.response.data.message : err.message
      })
    } finally {
      setLoadingScreen(false)
    }
  }, [selectedEquipment, addToast, resultRef])

  return (
    <GlobalModal id={id} size={600} title="Editar Equipamento">
      <Container
        initialData={{
          name: selectedEquipment?.bkp_equi_name,
          status: selectedEquipment?.bkp_equi_status ? 'ATIVO' : 'INATIVO',
          city: selectedEquipment?.city_name,
          type: selectedEquipment?.bkp_equi_type,
          manu: selectedEquipment?.manu_name,
          access: selectedEquipment?.bkp_equi_access,
          username: selectedEquipment?.bkp_equi_username,
          port: selectedEquipment?.bkp_equi_port,
          ip: selectedEquipment?.bkp_equi_ip
        }}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Wrapper>
          {permissions.includes('NOC.BACKUP.EDITAR') && (
            <section>
              <ButtonStartBackup
                className="StaticBG"
                type="button"
                onClick={handleStartBackup}
              >
                Realizar Backup
              </ButtonStartBackup>
              <ButtonStartBackup
                accessGranted={accessGranted}
                type="button"
                onClick={handleTestAcess}
              >
                {accessGranted === 'initial' && <span>Testar Acesso</span>}
                {accessGranted === 'granted' && <span>Acesso Garantido</span>}
                {accessGranted === 'denied' && <span>Acesso Negado</span>}
              </ButtonStartBackup>

              <ButtonStartBackup
                className="StaticBG"
                type="button"
                onClick={handlePing}
              >
                Ping
              </ButtonStartBackup>
            </section>
          )}
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
                name="type"
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
                name="manu"
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
                name="username"
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
            onClick={() =>
              setDisplayModal([...displayModal, 'modalDeleteEquipment'])
            }
          >
            Excluir
          </Button>
        )}

        {permissions.includes('NOC.BACKUP.EDITAR') && (
          <Button type="submit">Salvar alterações</Button>
        )}
      </Container>

      <ResultBackup id="modalResultBackup">
        <div ref={resultRef} />
      </ResultBackup>
    </GlobalModal>
  )
}
