import Head from 'next/head'
import { Header } from '../components/Header'

import { Container, Content } from '../styles/pages/home'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Intranet - DashBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header category="Home" route="Dashboard" />
      <Content />
    </Container>
  )
}
