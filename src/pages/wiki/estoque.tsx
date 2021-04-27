import { useCallback, useState } from 'react'
import { useModal } from '../../hooks/modal'
import { useAuth } from '../../hooks/auth'

import Head from 'next/head'
import withAuth from '../../utils/withAuth'

import { Header } from '../../components/Header'
import { GetServerSideProps } from 'next'
import { api } from '../../services/api'
import { Table } from '../../components/Tables/Table'
import { Button } from '../../components/Button'

import { CreateWikiEstoque } from '../../components/Modal/Wiki/Estoque/CreateWikiEstoque'
import { UpdateWikiEstoque } from '../../components/Modal/Wiki/Estoque/UpdateWikiEstoque'
import { DeleteWikiEstoque } from '../../components/Modal/Wiki/Estoque/DeleteWikiEstoque'

import {
  Container,
  Content,
  Scroll,
  WrapperFilter
} from '../../styles/pages/wiki/estoque'

export interface WikiEstoqueProps {
  wiki_id: number
  wiki_title: string
  wiki_type: string
  wiki_file: string
  url_file: string
}

interface ServerSideProps {
  faqProps: WikiEstoqueProps[]
}

function WikiEstoque({ faqProps }: ServerSideProps) {
  const [selectedFaq, setSelectedFaq] = useState<WikiEstoqueProps>()
  const [faqs, setFaqs] = useState<WikiEstoqueProps[]>(faqProps)

  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

  const handleSelectFaq = useCallback((faq: WikiEstoqueProps) => {
    setDisplayModal(['modalUpdateWikiEstoque'])
    setSelectedFaq(faq)
  }, [])

  return (
    <Container>
      <Head>
        <title>Intranet | Wiki | Estoque</title>
      </Head>

      <Header category="Wiki" route="Estoque" />

      <Content>
        <Scroll>
          <Table isEditable ths={['Tipo', 'Nome da FAQ']}>
            {faqs.map(faq => {
              return (
                <tr onClick={() => handleSelectFaq(faq)} key={faq.wiki_id}>
                  <td>{faq.wiki_type}</td>
                  <td style={{ textAlign: 'center' }}>{faq.wiki_title}</td>
                </tr>
              )
            })}
          </Table>
          <WrapperFilter>
            {permissions?.includes('WIKI.TIPOS.CRIAR') && (
              <Button
                onClick={() => setDisplayModal(['modalCreateWikiEstoque'])}
              >
                Cadastar
              </Button>
            )}
          </WrapperFilter>
        </Scroll>
      </Content>

      {permissions?.includes('WIKI.TIPOS.CRIAR') && (
        <CreateWikiEstoque
          faqs={faqs}
          setFaqs={setFaqs}
          id="modalCreateWikiEstoque"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
        <UpdateWikiEstoque
          faqs={faqs}
          setFaqs={setFaqs}
          selectedFaq={selectedFaq}
          id="modalUpdateWikiEstoque"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.DELETAR') && (
        <DeleteWikiEstoque
          id="modalDeleteWikiEstoque"
          selectedFaq={selectedFaq}
          faqs={faqs}
          setFaqs={setFaqs}
        />
      )}
    </Container>
  )
}

export default withAuth(WikiEstoque)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const response = await api.get('api/wiki?type=estoque', {
      headers: {
        tokenaccess: req.cookies['intranet-token']
      }
    })

    const faqProps = response.data

    return {
      props: { faqProps }
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}
