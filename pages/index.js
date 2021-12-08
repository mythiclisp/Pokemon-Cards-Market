import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Next App</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      </Head>
      <div>
        <h1>Home</h1>
      </div>
    </React.Fragment>
  )
}
