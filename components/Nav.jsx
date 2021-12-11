import navStyles from '../css/Nav.module.css'
import Link from 'next/link'
import { auth } from '../Scripts/firebaseconfig'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const LoggedInLinks = () => {

    const [user] = useAuthState(auth)

    const style = { 
        display: 'none'
    }

    function signOut() {
        auth.signOut()
    }

    return (
        <React.Fragment>
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
                <LoggedOutLinks />
                <LoggedInLinks />
            </ul>
        </div>
    )
}

export default Nav