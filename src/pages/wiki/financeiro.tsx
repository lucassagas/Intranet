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

import { CreateWikiFinanceiro } from '../../components/Modal/Wiki/Financeiro/CreateWikiFinanceiro'
import { UpdateWikiFinanceiro } from '../../components/Modal/Wiki/Financeiro/UpdateWikiFinanceiro'
import { DeleteWikiFinanceiro } from '../../components/Modal/Wiki/Financeiro/DeleteWikiFinanceiro'

import {
  Container,
  Content,
  Scroll,
  WrapperFilter
} from '../../styles/pages/wiki/financeiro'

export interface WikiFinanceiroProps {
  wiki_id: number
  wiki_title: string
  wiki_type: string
  wiki_file: string
  url_file: string
}

interface ServerSideProps {
  faqProps: WikiFinanceiroProps[]
}

function WikiFinanceiro({ faqProps }: ServerSideProps) {
  const [selectedFaq, setSelectedFaq] = useState<WikiFinanceiroProps>()
  const [faqs, setFaqs] = useState<WikiFinanceiroProps[]>(faqProps)

  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

  const handleSelectFaq = useCallback((faq: WikiFinanceiroProps) => {
    setDisplayModal(['modalUpdateWikiFinanceiro'])
    setSelectedFaq(faq)
  }, [])

  return (
    <Container>
      <Head>
        <title>Intranet | Wiki | Financeiro</title>
      </Head>

      <Header category="Wiki" route="Financeiro" />

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
                onClick={() => setDisplayModal(['modalCreateWikiFinanceiro'])}
              >
                Cadastar
              </Button>
            )}
          </WrapperFilter>
        </Scroll>
      </Content>

      {permissions?.includes('WIKI.TIPOS.CRIAR') && (
        <CreateWikiFinanceiro
          faqs={faqs}
          setFaqs={setFaqs}
          id="modalCreateWikiFinanceiro"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
        <UpdateWikiFinanceiro
          faqs={faqs}
          setFaqs={setFaqs}
          selectedFaq={selectedFaq}
          id="modalUpdateWikiFinanceiro"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.DELETAR') && (
        <DeleteWikiFinanceiro
          id="modalDeleteWikiFinanceiro"
          selectedFaq={selectedFaq}
          faqs={faqs}
          setFaqs={setFaqs}
        />
      )}
    </Container>
  )
}

export default withAuth(WikiFinanceiro)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const response = await api.get('api/wiki?type=financeiro', {
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
