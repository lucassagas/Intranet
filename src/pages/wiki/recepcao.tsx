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

import { CreateWikiRecepcao } from '../../components/Modal/Wiki/Recepcao/CreateWikiRecepcao'
import { UpdateWikiRecepcao } from '../../components/Modal/Wiki/Recepcao/UpdateWikiRecepcao'
import { DeleteWikiRecepcao } from '../../components/Modal/Wiki/Recepcao/DeleteWikiRecepcao'

import {
  Container,
  Content,
  Scroll,
  WrapperFilter
} from '../../styles/pages/wiki/recepcao'

export interface WikiRecepcaoProps {
  wiki_id: number
  wiki_title: string
  wiki_type: string
  wiki_file: string
  url_file: string
}

interface ServerSideProps {
  faqProps: WikiRecepcaoProps[]
}

function WikiRecepcao({ faqProps }: ServerSideProps) {
  const [selectedFaq, setSelectedFaq] = useState<WikiRecepcaoProps>()
  const [faqs, setFaqs] = useState<WikiRecepcaoProps[]>(faqProps)

  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

  const handleSelectFaq = useCallback((faq: WikiRecepcaoProps) => {
    setDisplayModal(['modalUpdateWikiRecepcao'])
    setSelectedFaq(faq)
  }, [])

  return (
    <Container>
      <Head>
        <title>Intranet | Wiki | Recepcao</title>
      </Head>

      <Header category="Wiki" route="Recepcao" />

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
                onClick={() => setDisplayModal(['modalCreateWikiRecepcao'])}
              >
                Cadastar
              </Button>
            )}
          </WrapperFilter>
        </Scroll>
      </Content>

      {permissions?.includes('WIKI.TIPOS.CRIAR') && (
        <CreateWikiRecepcao
          faqs={faqs}
          setFaqs={setFaqs}
          id="modalCreateWikiRecepcao"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
        <UpdateWikiRecepcao
          faqs={faqs}
          setFaqs={setFaqs}
          selectedFaq={selectedFaq}
          id="modalUpdateWikiRecepcao"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.DELETAR') && (
        <DeleteWikiRecepcao
          id="modalDeleteWikiRecepcao"
          selectedFaq={selectedFaq}
          faqs={faqs}
          setFaqs={setFaqs}
        />
      )}
    </Container>
  )
}

export default withAuth(WikiRecepcao)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const response = await api.get('api/wiki?type=recepcao', {
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
