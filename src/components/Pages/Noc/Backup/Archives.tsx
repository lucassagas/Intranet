import { useCallback, useEffect, useState } from 'react'
import { useLoading } from '../../../../hooks/loading'
import { useToast } from '../../../../hooks/toast'
import { useRouter } from 'next/router'
import { useAuth } from '../../../../hooks/auth'

import { Form } from '@unform/web'
import { Input } from '../../../Input'
import { Table } from '../../../Tables/Table'
import { api } from '../../../../services/api'

import { AiOutlineSearch, AiOutlineDownload } from '../../../../styles/icons'
import {
  Scroll,
  WrapperFilter,
  ButtonFilter
} from '../../../../styles/components/Pages/Noc/Backup/Archives'

interface ArchivesProps {
  name: string
  url: string
}

export function Archives() {
  const [isActiveFilter, setIsActiveFilter] = useState('olt')
  const [archives, setArchives] = useState<ArchivesProps[]>([])

  const { setLoadingScreen } = useLoading()
  const { addToast } = useToast()
  const { permissions } = useAuth()
  const router = useRouter()

  const handleSearch = useCallback(
    data => {
      setLoadingScreen(true)
      api
        .get(
          `api/bkp_equipment/archive?type=${isActiveFilter}&query=${data.filter}`
        )
        .then(response => {
          setArchives(response.data)
        })
        .catch(err => {
          addToast({
            type: 'error',
            title: 'Error',
            description: err.response ? err.response.data.message : err.message
          })
        })
        .finally(() => setLoadingScreen(false))
    },
    [isActiveFilter]
  )

  useEffect(() => {
    if (!permissions?.includes('NOC.BACKUP.VISUALIZAR')) {
      router.replace('/')
    }

    setLoadingScreen(true)
    api
      .get(`api/bkp_equipment/archive?type=${isActiveFilter}`)
      .then(response => {
        setArchives(response.data)
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      })
      .finally(() => setLoadingScreen(false))
  }, [isActiveFilter])

  const handleDownloadArchive = useCallback((url: string) => {
    window.open(`${process.env.NEXT_PUBLIC_ENV_API_ARCHIVE_URL + url}`)
  }, [])

  return (
    <Scroll>
      <Table isEditable ths={['Arquivo', 'Download']}>
        {archives.map(archive => {
          return (
            <tr key={archive.url}>
              <td>{archive.name}</td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => handleDownloadArchive(archive.url)}>
                  <AiOutlineDownload size={24} />
                </button>
              </td>
            </tr>
          )
        })}
      </Table>
      <WrapperFilter>
        <Form onSubmit={handleSearch}>
          <Input name="filter" placeholder="Buscar" />
          <button type="button">
            <AiOutlineSearch size={20} />
          </button>
        </Form>

        <ButtonFilter
          onClick={() => setIsActiveFilter('olt')}
          isActive={isActiveFilter === 'olt'}
        >
          <div />
          <span>OLT</span>
        </ButtonFilter>
        <ButtonFilter
          onClick={() => setIsActiveFilter('huawei')}
          isActive={isActiveFilter === 'huawei'}
        >
          <div />
          <span>Huawei</span>
        </ButtonFilter>
        <ButtonFilter
          onClick={() => setIsActiveFilter('routerboard')}
          isActive={isActiveFilter === 'routerboard'}
        >
          <div />
          <span>RouterBoard</span>
        </ButtonFilter>
      </WrapperFilter>
    </Scroll>
  )
}
