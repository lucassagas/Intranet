import Head from 'next/head'
import { Header } from '../../components/Header'
import withAuth from '../../utils/withAuth'

import { CgScreen, BiGlobe, FiPhone } from '../../styles/icons'

import {
  Container,
  Content,
  Scroll,
  CategoryButton
} from '../../styles/pages/sac/plans'
import { useState } from 'react'
import { Internet } from '../../components/Pages/Sac/Plans/Internet'

function Plans() {
  const [activeCategory, setActiveCategory] = useState('internet')

  return (
    <Container>
      <Head>
        <title>Intranet | Sac | Planos</title>
      </Head>

      <Header category="Sac" route="Planos">
        <CategoryButton
          onClick={() => setActiveCategory('internet')}
          type="button"
          active={activeCategory === 'internet'}
        >
          <div />
          <span>
            <BiGlobe size={20} />
            Internet
          </span>
        </CategoryButton>
        <CategoryButton
          onClick={() => setActiveCategory('telephony')}
          active={activeCategory === 'telephony'}
          type="button"
        >
          <div />
          <span>
            <FiPhone size={20} />
            Telefonia
          </span>
        </CategoryButton>
        <CategoryButton
          onClick={() => setActiveCategory('camera')}
          active={activeCategory === 'camera'}
          type="button"
        >
          <div />
          <span>
            <CgScreen size={20} />
            CFTV
          </span>
        </CategoryButton>
      </Header>

      <Content>
        <Scroll>{activeCategory === 'internet' && <Internet />}</Scroll>
      </Content>
    </Container>
  )
}

export default withAuth(Plans)
