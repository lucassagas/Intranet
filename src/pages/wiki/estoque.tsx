import Head from 'next/head'
import withAuth from '../../utils/withAuth'

import { Header } from '../../components/Header'
import { GetServerSideProps } from 'next'
import { apiDev } from '../../services/apiDev'
import { Table } from '../../components/Tables/Table'
import { Form } from '@unform/web'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useModal } from '../../hooks/modal'

import { CreateWikiEstoque } from '../../components/Modal/Wiki/Estoque/CreateWikiEstoque'
import { DeleteWikiEstoque } from '../../components/Modal/Wiki/Estoque/DeleteWikiEstoque'
import { useCallback, useState } from 'react'

import { AiOutlineSearch } from '../../styles/icons'
import {
  Container,
  Content,
  Scroll,
  WrapperFilter,
  ButtonFilter
} from '../../styles/pages/wiki/estoque'

export interface WikiEstoqueProps {
  id: number
  name: string
  subject: string
  archive: string
}

interface ServerSideProps {
  faqProps: WikiEstoqueProps[]
}

function WikiEstoque({ faqProps }: ServerSideProps) {
  const [isActiveFilter, setIsActiveFilter] = useState('name')
  const [selectedFaq, setSelectedFaq] = useState<WikiEstoqueProps>()
  const [faqs, setFaqs] = useState<WikiEstoqueProps[]>(faqProps)

  const { setDisplayModal } = useModal()

  const handleSelectFaq = useCallback((faq: WikiEstoqueProps) => {
    setDisplayModal('modalDeleteWikiEstoque')
    setSelectedFaq(faq)
  }, [])

  const handleSearch = useCallback(async data => {}, [])

  return (
    <Container>
      <Head>
        <title>Intranet | Wiki | Estoque</title>
      </Head>

      <Header category="Wiki" route="Estoque" />

      <Content>
        <Scroll>
          <Table isEditable ths={['Assunto', 'Nome da FAQ', 'Ações']}>
            {faqs.map(faq => {
              return (
                <tr key={faq.id}>
                  <td>{faq.subject}</td>
                  <td>{faq.name}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => handleSelectFaq(faq)} type="button">
                      Excluir
                    </button>
                  </td>
                </tr>
              )
            })}
          </Table>
          <WrapperFilter>
            <Form onSubmit={handleSearch}>
              <Input name="filter" placeholder="Buscar" />
              <button type="submit">
                <AiOutlineSearch size={20} />
              </button>
            </Form>

            <ButtonFilter
              onClick={() => setIsActiveFilter('name')}
              isActive={isActiveFilter === 'name'}
            >
              <div />
              <span>Nome da FAQ</span>
            </ButtonFilter>

            <Button onClick={() => setDisplayModal('modalCreateWikiEstoque')}>
              Cadastar
            </Button>
          </WrapperFilter>
        </Scroll>
      </Content>

      <CreateWikiEstoque
        faqs={faqs}
        setFaqs={setFaqs}
        id="modalCreateWikiEstoque"
      />

      <DeleteWikiEstoque
        id="modalDeleteWikiEstoque"
        selectedFaq={selectedFaq}
        faqs={faqs}
        setFaqs={setFaqs}
      />
    </Container>
  )
}

export default withAuth(WikiEstoque)

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await apiDev.get('faqestoque')

  const faqProps = response.data

  return {
    props: { faqProps }
  }
}
