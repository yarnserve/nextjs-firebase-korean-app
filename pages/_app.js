import { RecoilRoot } from 'recoil'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp
