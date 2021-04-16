import { Form } from '@unform/web'
import { Input } from '../../../Input'
import { Table } from '../../../Tables/Table'

import { useCallback } from 'react'

import { AiOutlineSearch, AiOutlineDownload } from '../../../../styles/icons'
import {
  Scroll,
  WrapperFilter
} from '../../../../styles/components/Pages/Noc/Backup/Archives'

export function Archives() {
  const handleSearch = useCallback(data => {}, [])

  return (
    <Scroll>
      <Table isEditable ths={['Arquivo', 'Tamanho', 'Download']}>
        <tr>
          <td>ANGELINA</td>
          <td>5217 KB</td>
          <td style={{ textAlign: 'center' }}>
            <button>
              <AiOutlineDownload size={24} />
            </button>
          </td>
        </tr>
      </Table>
      <WrapperFilter>
        <Form onSubmit={handleSearch}>
          <Input name="filter" placeholder="Buscar" />
          <button type="button">
            <AiOutlineSearch size={20} />
          </button>
        </Form>
      </WrapperFilter>
    </Scroll>
  )
}
