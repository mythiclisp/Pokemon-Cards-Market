import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Posts from '../components/Posts.jsx'
import { auth } from '../Scripts/firebaseconfig.ts'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Home() {
  const [user] = useAuthState(auth)
  
  return (
    <React.Fragment>
      <h1>Home</h1>
      {user ? <Posts /> : <span>Please Sign In or make an account</span>}
    </React.Fragment>
  )
}
