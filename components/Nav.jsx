import navStyles from '../css/Nav.module.css'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Scripts/firebaseconfig'


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
            <li>
                <Link href='/cart'>Cart</Link>
            </li>
            <li data-target='modal-createpost' className='modal-trigger' style={user ? null : style}>
                <Link href="/">Create Post</Link>
            </li>
            <li data-target='modal-account' className='modal-trigger' style={user ? null : style}>
                <Link href="/">
                    {user ? (user.displayName ? user.displayName : 'No display name') : ''}
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
            </ul>
            <ul className={navStyles.nav_account_actions}>
                <LoggedInLinks />
                <LoggedOutLinks />
            </ul>
        </div>
    )
}

export default Nav