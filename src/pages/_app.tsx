import { AnimatePresence } from 'framer-motion'
import { AppProps } from 'next/app'
import styled from 'styled-components'
import { SideMenu } from '../components/SideMenu'
import { AppProvider } from '../hooks'

import GlobalStyles from '../styles/GlobalStyles'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Router } from 'next/router'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`

NProgress.configure({
  showSpinner: false
})

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

Router.events.on('routeChangeError', () => {
  NProgress.done()
})

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
