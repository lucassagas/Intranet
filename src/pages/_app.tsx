import { AnimatePresence } from 'framer-motion'
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

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AppProvider>
      <Container>
        <SideMenu />

        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>

        <GlobalStyles />
      </Container>
    </AppProvider>
  )
}

export default MyApp
