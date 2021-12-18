import Layout from '../components/Layout'
import '../css/globals.css'
import '../Scripts/scriptdir.ts'
import setLocalStorage from '../Scripts/localStorage'
import { returnRates } from '../Scripts/currency'
import { useAuthState } from 'react-firebase-hooks/auth'
import React, { useEffect } from 'react'
import Head from 'next/head'
import { auth } from '../Scripts/firebaseconfig'

function MyApp({ Component, pageProps }) {

  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      setLocalStorage()
      returnRates()
    }
  },[user])

  return (
    <React.Fragment>
      <Head>
        <title>Pokemon Cards Market</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  )
}

export default MyApp
