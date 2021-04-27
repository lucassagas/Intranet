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

import { CreateWikiRelatorio } from '../../components/Modal/Wiki/Relatorio/CreateWikiRelatorio'
import { UpdateWikiRelatorio } from '../../components/Modal/Wiki/Relatorio/UpdateWikiRelatorio'
import { DeleteWikiRelatorio } from '../../components/Modal/Wiki/Relatorio/DeleteWikiRelatorio'

import {
  Container,
  Content,
  Scroll,
  WrapperFilter
} from '../../styles/pages/wiki/relatorio'

export interface WikiRelatorioProps {
  wiki_id: number
  wiki_title: string
  wiki_type: string
  wiki_file: string
  url_file: string
}

interface ServerSideProps {
  faqProps: WikiRelatorioProps[]
}

function WikiRelatorio({ faqProps }: ServerSideProps) {
  const [selectedFaq, setSelectedFaq] = useState<WikiRelatorioProps>()
  const [faqs, setFaqs] = useState<WikiRelatorioProps[]>(faqProps)

  const { setDisplayModal } = useModal()
  const { permissions } = useAuth()

  const handleSelectFaq = useCallback((faq: WikiRelatorioProps) => {
    setDisplayModal(['modalUpdateWikiRelatorio'])
    setSelectedFaq(faq)
  }, [])

  return (
    <Container>
      <Head>
        <title>Intranet | Wiki | Relatórios</title>
      </Head>

      <Header category="Wiki" route="Relatórios" />

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
                onClick={() => setDisplayModal(['modalCreateWikiRelatorio'])}
              >
                Cadastar
              </Button>
            )}
          </WrapperFilter>
        </Scroll>
      </Content>

      {permissions?.includes('WIKI.TIPOS.CRIAR') && (
        <CreateWikiRelatorio
          faqs={faqs}
          setFaqs={setFaqs}
          id="modalCreateWikiRelatorio"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
        <UpdateWikiRelatorio
          faqs={faqs}
          setFaqs={setFaqs}
          selectedFaq={selectedFaq}
          id="modalUpdateWikiRelatorio"
        />
      )}

      {permissions?.includes('WIKI.TIPOS.DELETAR') && (
        <DeleteWikiRelatorio
          id="modalDeleteWikiRelatorio"
          selectedFaq={selectedFaq}
          faqs={faqs}
          setFaqs={setFaqs}
        />
      )}
    </Container>
  )
}

export default withAuth(WikiRelatorio)

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const response = await api.get('api/wiki?type=relatorio', {
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
