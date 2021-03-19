import { AppProps } from 'next/app'
import { AppProvider } from '../hooks'
import GlobalStyles from '../styles/GlobalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />

      <GlobalStyles />
    </AppProvider>
  )
}

export default MyApp
