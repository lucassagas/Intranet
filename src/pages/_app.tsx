import { AppProps } from 'next/app'
import styled from 'styled-components'
import { SideMenu } from '../components/SideMenu'
import { AppProvider } from '../hooks'

import GlobalStyles from '../styles/GlobalStyles'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Container>
        <SideMenu />
        <Component {...pageProps} />

        <GlobalStyles />
      </Container>
    </AppProvider>
  )
}

export default MyApp
