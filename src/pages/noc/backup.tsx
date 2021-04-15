import Head from 'next/head'
import { useState } from 'react'
import { Header } from '../../components/Header'
import withAuth from '../../utils/withAuth'
import { RiDatabase2Line, AiOutlineDatabase } from '../../styles/icons'

import {
  Container,
  CategoryButton,
  Content
} from '../../styles/pages/noc/backup'
import { Equipaments } from '../../components/Pages/Noc/Backup/Equipaments'

function Backup() {
  const [activeCategory, setActiveCategory] = useState('equipments')

  return (
    <Container>
      <Head>
        <title>Intranet | Noc | Backup</title>
      </Head>

      <Header category="Noc" route="Backup">
        <CategoryButton
          onClick={() => setActiveCategory('equipments')}
          type="button"
          active={activeCategory === 'equipments'}
        >
          <div />
          <span>
            <AiOutlineDatabase size={20} />
            Equipamentos
          </span>
        </CategoryButton>

        <CategoryButton
          onClick={() => setActiveCategory('archives')}
          type="button"
          active={activeCategory === 'archives'}
        >
          <div />
          <span>
            <RiDatabase2Line size={20} />
            Arquivos
          </span>
        </CategoryButton>
      </Header>

      <Content>{activeCategory === 'equipments' && <Equipaments />}</Content>
    </Container>
  )
}

export default withAuth(Backup)
