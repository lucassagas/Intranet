import { useCallback, useState, MouseEvent, useEffect } from 'react'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { GlobalModal } from '../GlobalModal'

import { IoIosArrowDown, BiCheck } from '../../../styles/icons'

import {
  Container,
  WrapperOptions,
  StyledOption,
  SubGroups,
  MainButton
} from '../../../styles/components/Modal/Group/UpdateGroup'
import { Form } from '@unform/web'
import { api } from '../../../services/api'
import { useToast } from '../../../hooks/toast'
import { FiCheck } from 'react-icons/fi'
import { useModal } from '../../../hooks/modal'

interface EditGroupProps {
  id: string | number
}

interface pageProps {
  page_name: string
  page_permissions: Array<{
    created_at: string
    updated_at: string
    perm_id: number
    perm_name: string
  }>
}

interface GroupsProps {
  page_index: string
  pages: pageProps[]
  page_index_permission: {
    perm_id: number
  }
}

export function EditGroup({ id }: EditGroupProps) {
  const [isActiveGroup, setIsActiveGroup] = useState([])
  const [openGroup, setOpenGroup] = useState('')
  const [permissionsId, setPermissionsId] = useState([])
  const [groupName, setGroupName] = useState('')
  const [groupsAndPermissions, setGroupsAndPermissions] = useState<
    GroupsProps[]
  >([])

  const { addToast } = useToast()
  const { setDisplayModal, displayModal } = useModal()

  useEffect(() => {
    api
      .get('api/permission')
      .then(response => {
        setGroupsAndPermissions(response.data)
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Erro ao carregar permissões'
        })
      })

    if (id !== 0) {
      let permissions_id = []
      api
        .get(`api/group/${id}`)
        .then(response => {
          setGroupName(response.data.group_name)
          response.data.permissions.map((permission: GroupsProps) => {
            permissions_id.push(permission.page_index_permission.perm_id)
            permission.pages.map(page => {
              page.page_permissions.map(p => {
                permissions_id.push(p?.perm_id)
              })
            })
          })
        })
        .catch(err => {
          addToast({
            type: 'error',
            title: 'Erro',
            description: err.response ? err.response.data.message : err.message
          })
        })

      setPermissionsId(permissions_id)
    }
  }, [id, displayModal])

  const handleSubmit = useCallback(() => {
    api
      .put(`api/group/${id}`, {
        permissions: [...permissionsId, ...isActiveGroup]
      })
      .then(response => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: response.data.message
        })

        setDisplayModal('')
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Erro',
          description: err.response.data.message
        })
      })
  }, [permissionsId, id])

  const handleSelectGroup = useCallback(
    (group: number) => {
      if (permissionsId.includes(group)) {
        const groups = permissionsId.filter(isActive => isActive !== group)
        setIsActiveGroup(groups)

        return
      }

      setIsActiveGroup([...permissionsId, group])
    },
    [isActiveGroup]
  )

  const handleSelectPermissions = useCallback(
    (permission_id: number) => {
      if (permissionsId.includes(permission_id)) {
        const permissions = permissionsId.filter(
          permission => permission !== permission_id
        )
        setPermissionsId(permissions)

        return
      }

      setPermissionsId([...permissionsId, permission_id])
    },
    [permissionsId]
  )

  const handleOpenGroup = useCallback(
    (group: string) => {
      openGroup === group ? setOpenGroup('') : setOpenGroup(group)
    },
    [openGroup]
  )

  return (
    <GlobalModal title="Vincular Permissões" id={id} size={600}>
      <Container>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input value={groupName.toUpperCase()} name="name" readOnly />

            {groupsAndPermissions &&
              groupsAndPermissions.map(group => {
                return (
                  <WrapperOptions
                    key={group.page_index}
                    onClick={() => {
                      handleOpenGroup(group.page_index)
                    }}
                    openedGroup={openGroup === group.page_index}
                    isActive={isActiveGroup.includes(group.page_index)}
                  >
                    <div>
                      <span>
                        <MainButton
                          isActive={permissionsId?.includes(
                            group.page_index_permission?.perm_id
                          )}
                          type="button"
                          onClick={(e: MouseEvent) => {
                            handleSelectGroup(
                              group.page_index_permission?.perm_id
                            )
                            e.stopPropagation()
                          }}
                        >
                          {permissionsId.includes(
                            group.page_index_permission?.perm_id
                          ) && <BiCheck size={18} />}
                        </MainButton>
                        {group.page_index}
                        <IoIosArrowDown size={18} />
                      </span>
                      <span>Criar</span>
                      <span>Visualizar</span>
                      <span>Editar</span>
                      <span>Deletar</span>
                    </div>

                    <SubGroups
                      onClick={(event: MouseEvent) => event.stopPropagation()}
                      openedGroup={openGroup === group.page_index}
                    >
                      {group.pages.map(page => {
                        let criar: number
                        let visualizar: number
                        let editar: number
                        let deletar: number

                        page.page_permissions.map(p => {
                          if (p.perm_name.includes('.CRIAR')) {
                            criar = p.perm_id
                          }

                          if (p.perm_name.includes('.VISUALIZAR')) {
                            visualizar = p.perm_id
                          }

                          if (p.perm_name.includes('.EDITAR')) {
                            editar = p.perm_id
                          }

                          if (p.perm_name.includes('.DELETAR')) {
                            deletar = p.perm_id
                          }
                        })

                        return (
                          <div key={page.page_name}>
                            <span>{page.page_name}</span>
                            <span>
                              <StyledOption
                                isActive={permissionsId.includes(criar)}
                                onClick={(event: MouseEvent) => {
                                  handleSelectPermissions(criar)
                                  event.stopPropagation()
                                }}
                                type="button"
                              >
                                {permissionsId.includes(criar) && (
                                  <FiCheck size={18} />
                                )}
                              </StyledOption>
                            </span>
                            <span>
                              <StyledOption
                                isActive={permissionsId.includes(visualizar)}
                                onClick={(event: MouseEvent) => {
                                  handleSelectPermissions(visualizar)
                                  event.stopPropagation()
                                }}
                                type="button"
                              >
                                {permissionsId.includes(visualizar) && (
                                  <FiCheck size={18} />
                                )}
                              </StyledOption>
                            </span>
                            <span>
                              <StyledOption
                                isActive={permissionsId.includes(editar)}
                                onClick={(event: MouseEvent) => {
                                  handleSelectPermissions(editar)
                                  event.stopPropagation()
                                }}
                                type="button"
                              >
                                {permissionsId.includes(editar) && (
                                  <FiCheck size={18} />
                                )}
                              </StyledOption>
                            </span>
                            <span>
                              <StyledOption
                                isActive={permissionsId.includes(deletar)}
                                onClick={(event: MouseEvent) => {
                                  handleSelectPermissions(deletar)
                                  event.stopPropagation()
                                }}
                                type="button"
                              >
                                {permissionsId.includes(deletar) && (
                                  <FiCheck size={18} />
                                )}
                              </StyledOption>
                            </span>
                          </div>
                        )
                      })}
                    </SubGroups>
                  </WrapperOptions>
                )
              })}
          </div>
          <Button type="submit">Salvar</Button>
        </Form>
      </Container>
    </GlobalModal>
  )
}
