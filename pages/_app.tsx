import Layout from '../components/Layout'
import '../css/globals.css'
import '../Scripts/scriptdir.ts'
import '../res/materialize.min.css'
import setLocalStorage from '../Scripts/Cache/localStorage'
import { returnRates } from '../Scripts/currency'
import { useAuthState } from 'react-firebase-hooks/auth'
import React, { useEffect } from 'react'
import Head from 'next/head'
import { auth } from '../Scripts/firebaseconfig'

function MyApp({ Component, pageProps }) {

  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      setLocalStorage(false)
      returnRates(user)
    }
  },[user])

  return (
    <React.Fragment>
      <Head>
        <title>Pokemon Cards Market</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script src="https://js.stripe.com/v3/"></script>
        <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  )
}

export default MyApp
