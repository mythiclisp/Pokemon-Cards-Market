import Layout from '../components/Layout'
import '../styles/globals.css'
import '../Scripts/scriptdir.js'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
} 

export default MyApp
