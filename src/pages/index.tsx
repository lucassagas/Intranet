import Head from 'next/head'
import { Header } from '../components/Header'
import { Calendar } from '../components/Pages/Dashboard/Calendar'
import { Redirects } from '../components/Pages/Dashboard/Redirects'
import { Mural } from '../components/Pages/Dashboard/Mural'
import { Warnings } from '../components/Pages/Dashboard/Warnings'

import { Container, Content } from '../styles/pages/home'
import withAuth from '../utils/withAuth'

function Home() {
  return (
    <Container>
      <Head>
        <title>Intranet - DashBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header category="Home" route="Dashboard" />
      <Content>
        <Mural />
        <Calendar />
        <Warnings />
        <Redirects />
      </Content>
    </Container>
  )
}

export default withAuth(Home)
