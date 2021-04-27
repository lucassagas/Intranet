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

import { CreateWikiSuporte } from '../../components/Modal/Wiki/Suporte/CreateWikiSuporte'
import { UpdateWikiSuporte } from '../../components/Modal/Wiki/Suporte/UpdateWikiSuporte'
import { DeleteWikiSuporte } from '../../components/Modal/Wiki/Suporte/DeleteWikiSuporte'

import {
  Container,
  Content,
  Scroll,
  WrapperFilter
} from '../../styles/pages/wiki/suporte'

export interface WikiSuporteProps {
  wiki_id: number
  wiki_title: string
  wiki_type: string
  wiki_file: string
  url_file: string
}

interface ServerSideProps {
  faqProps: WikiSuporteProps[]
}

function WikiSuporte({ faqProps }: ServerSideProps) {
  const [selectedFaq, setSelectedFaq] = useState<WikiSuporteProps>()
  const [faqs, setFaqs] = useState<WikiSuporteProps[]>(faqProps)

  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

  const handleSelectFaq = useCallback((faq: WikiSuporteProps) => {
    setDisplayModal(['modalUpdateWikiSuporte'])
    setSelectedFaq(faq)
  }, [])

  return (
    <Container>
      <Head>
        <title>Intranet | Wiki | Suporte</title>
      </Head>

      <Header category="Wiki" route="Suporte" />

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
                onClick={() => setDisplayModal(['modalCreateWikiSuporte'])}
              >
                Cadastar
              </Button>
            )}
          </WrapperFilter>
        </Scroll>
      </Content>

      {permissions?.includes('WIKI.TIPOS.CRIAR') && (
        <CreateWikiSuporte
          faqs={faqs}
          setFaqs={setFaqs}
          id="modalCreateWikiSuporte"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
        <UpdateWikiSuporte
          faqs={faqs}
          setFaqs={setFaqs}
          selectedFaq={selectedFaq}
          id="modalUpdateWikiSuporte"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.DELETAR') && (
        <DeleteWikiSuporte
          id="modalDeleteWikiSuporte"
          selectedFaq={selectedFaq}
          faqs={faqs}
          setFaqs={setFaqs}
        />
      )}
    </Container>
  )
}

export default withAuth(WikiSuporte)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const response = await api.get('api/wiki?type=suporte', {
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
