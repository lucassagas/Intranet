import React, { useCallback, useState, Fragment, useEffect } from 'react'

import { IoIosArrowDown } from '../../../../styles/icons'
import {
  Content,
  Wrapper,
  CategoryList,
  Section,
  PageList,
  TitlePage,
  PermissionList,
  WrapperFilter
} from '../../../../styles/components/Pages/Adm/Users/Permission'
import { useModal } from '../../../../hooks/modal'
import { DeletePermission } from '../../../Modal/Permission/DeletePermission'
import { CreatePermission } from '../../../Modal/Permission/CreatePermission'
import { api } from '../../../../services/api'
import { useToast } from '../../../../hooks/toast'
import { Button } from '../../../Button'

export interface PermissionsProps {
  perm_id: number
  perm_name: string
  created_at: string
  updated_at: string
}

interface pageProps {
  page_name: string
  page_permissions: PermissionsProps[]
}

export interface GroupAndPermissionsProps {
  page_index: string
  pages: pageProps[]
}

export interface GroupsProps {
  group_id: number
  group_name: string
  created_at: string
  updated_at: string
}

export interface SelectedPermission {
  permissionName: string
  id: number
}

export function Permissions() {
  const [permissions, setPermissions] = useState<GroupAndPermissionsProps[]>([])
  const [isActiveCategory, setIsActiveCategory] = useState('')
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [isActivePage, setIsActivePage] = useState('')
  const [
    selectedPermissionName,
    setSelectedPermissionName
  ] = useState<SelectedPermission>()

  const { setDisplayModal } = useModal()
  const { addToast } = useToast()

  useEffect(() => {
    handleLoadPermissions()
  }, [])

  const handleOpenCategory = useCallback(
    category => {
      if (isActiveCategory === category) {
        setIsActiveCategory('')

        return
      }

      setIsActiveCategory(category)
    },
    [isActiveCategory]
  )

  const handleOpenPage = useCallback(
    page => {
      if (isActivePage === page) {
        setIsActivePage('')

        return
      }

      setIsActivePage(page)
    },
    [isActivePage]
  )

  const handleLoadPermissions = useCallback(() => {
    setIsActiveFilter('name')

    api
      .get('api/permission')
      .then(response => {
        setPermissions(response.data)
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Error',
          description: 'Erro ao carregar permissões, contate um administrador'
        })
      })
  }, [setIsActiveFilter])

  return (
    <Content>
      <Wrapper>
        <CategoryList>
          {permissions.map(permission => {
            return (
              <Section
                isActiveCategory={isActiveCategory === permission.page_index}
                key={permission.page_index}
              >
                <strong
                  onClick={() => handleOpenCategory(permission.page_index)}
                >
                  {permission.page_index.toUpperCase()}
                  <IoIosArrowDown size={18} />
                </strong>
                <PageList
                  isActiveCategory={isActiveCategory === permission.page_index}
                >
                  {permission.pages.map(page => (
                    <Fragment key={page.page_name}>
                      <TitlePage
                        isActivePage={isActivePage === page.page_name}
                        onClick={() => handleOpenPage(page.page_name)}
                      >
                        {page.page_name.toUpperCase()}
                        <IoIosArrowDown size={18} />
                      </TitlePage>
                      <PermissionList
                        isActivePage={isActivePage === page.page_name}
                      >
                        {page.page_permissions.map(permission => (
                          <strong key={permission.perm_id}>
                            {permission.perm_name.toLocaleUpperCase()}

                            <button
                              onClick={() => {
                                setDisplayModal(['modalDeletePermission'])
                                setSelectedPermissionName({
                                  permissionName: permission.perm_name,
                                  id: permission.perm_id
                                })
                              }}
                              type="button"
                            >
                              Deletar
                            </button>
                          </strong>
                        ))}
                      </PermissionList>
                    </Fragment>
                  ))}
                </PageList>
              </Section>
            )
          })}
        </CategoryList>
      </Wrapper>
      <WrapperFilter>
        <Button onClick={() => setDisplayModal(['modalCreatePermission'])}>
          Cadastar
        </Button>
      </WrapperFilter>

      <CreatePermission
        reloadFunction={handleLoadPermissions}
        id="modalCreatePermission"
      />

      <DeletePermission
        reloadFunction={handleLoadPermissions}
        id="modalDeletePermission"
        permission={selectedPermissionName}
      />
    </Content>
  )
}
