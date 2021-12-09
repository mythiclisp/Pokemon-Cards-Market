import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'
import { auth } from '../Scripts/firebaseconfig'
import { logIn } from '../Scripts/firebaseauth.js'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router'
 'react-firebase-hooks'

let loggedIn = false

auth.onAuthStateChanged(user => {
    if (user === null) return loggedIn = false
    loggedIn = true
})

const LoggedInLinks = () => {

    const [user] = useAuthState(auth)

    return (
        <React.Fragment>
            <li className='logout-btn' onClick={auth.signOut()}>
                <Link href="/">Log Out</Link>
            </li>
        </React.Fragment>
    )
}

const LoggedOutLinks = () => {

    function sayHi() {
        console.log('Hello World')
    }
    return (
        <React.Fragment>
            <li data-target='modal-login' className="modal-trigger">
                <Link href="/">Log In</Link>
            </li>
            <li data-target='modal-signup' className="modal-trigger">
                 <Link href="/">Sign up</Link>
            </li>
        </React.Fragment>
    )
}

const Nav = () => {

    const [user] = useAuthState(auth)

    function tellUser() {
        console.log(user ? 'User detected' : 'User not detected')
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
                {user ? <LoggedInLinks /> : <LoggedOutLinks />}
                <button onClick={tellUser}>User??</button>
            </ul>
        </div>
    )
}

export default Nav