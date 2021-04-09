import Head from 'next/head'
import React, { useState } from 'react'
import { Header } from '../../components/Header'
import withAuth from '../../utils/withAuth'

import { Products } from '../../components/Pages/Sac/Services/Product'
import { Services } from '../../components/Pages/Sac/Services/Service'

import { AiOutlineShopping, AiOutlineTag } from '../../styles/icons'

import {
  Container,
  CategoryButton,
  Content,
  Scroll
} from '../../styles/pages/sac/services'

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('products')
  return (
    <Container>
      <Head>
        <title>Intranet | Sac | Serviços</title>
      </Head>

      <Header category="Sac" route="Serviços">
        <CategoryButton
          onClick={() => setActiveCategory('products')}
          type="button"
          active={activeCategory === 'products'}
        >
          <div />
          <span>
            <AiOutlineShopping size={20} />
            Produtos
          </span>
        </CategoryButton>
        <CategoryButton
          onClick={() => setActiveCategory('services')}
          active={activeCategory === 'services'}
          type="button"
        >
          <div />
          <span>
            <AiOutlineTag size={20} />
            Serviços
          </span>
        </CategoryButton>
      </Header>

      <Content>
        <Scroll>{activeCategory === 'products' && <Products />}</Scroll>
        <Scroll>{activeCategory === 'services' && <Services />}</Scroll>
      </Content>
    </Container>
  )
}

export default withAuth(ServicesPage)
