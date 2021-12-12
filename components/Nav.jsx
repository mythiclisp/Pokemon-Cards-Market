import navStyles from '../css/Nav.module.css'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

firebase.initializeApp({
  apiKey: "AIzaSyA2t0HMueSTrkF3KYcRcJoZVQsdqYwVwDE",
  authDomain: "pokemon-cards-market.firebaseapp.com",
  projectId: "pokemon-cards-market",
  storageBucket: "pokemon-cards-market.appspot.com",
  messagingSenderId: "35885252296",
  appId: "1:35885252296:web:9e488e3cbfa77780c42ffd",
  measurementId: "G-KP98M0KWZB"
})

export const auth = firebase.auth()
export const db = firebase.firestore()

const LoggedInLinks = () => {

    const [user] = useAuthState(auth)
    

    const style = { 
        display: 'none'
    }

    function signOut() {
        auth.signOut()
        console.log('Hello')
    }

    return (
        <React.Fragment>
            <li style={user ? null : style}>
                <Link href="/" className='signout-btn' onClick={signOut}>
                    {user ? (user.displayName ? user.displayName : 'No display name') : 'No user'}
                </Link>
            </li>
            <li style={user ? null : style} className='logout-btn'>
                <Link href="/" className='signout-btn' onClick={signOut}>Log Out</Link>
            </li>
        </React.Fragment>
    )
}

const LoggedOutLinks = () => {
    

    const [user] = useAuthState(auth)

    const style = { 
        display: 'none'
    }

    function sayHi() {
        console.log('Hello World')
    }
    return (
        <React.Fragment>
            <li style={user ? style: null} data-target='modal-login' className="modal-trigger">
                <Link href="/">Log In</Link>
            </li>
            <li style={user ? style: null} data-target='modal-signup' className="modal-trigger">
                 <Link href="/">Sign up</Link>
            </li>
        </React.Fragment>
    )
}

const Nav = () => {

    function signInUser() {
        const email = 'user1@x.com'
        const password = 'password'
        auth.signInWithEmailAndPassword(email,password).then(response => {
            console.log(user ? `User detected ${user.email}` : 'User not detected')
        })
    }

    return (
        <div className={navStyles.nav}>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                <li>
                    <Link href="/cards">Cards</Link>
                </li>
                <li>
                    <Link href="/popular">Popular</Link>
                </li>
            </ul>
            <ul className={navStyles.nav_account_actions}>
                <LoggedInLinks />
                <LoggedOutLinks />
            </ul>
        </div>
    )
}

export default Nav