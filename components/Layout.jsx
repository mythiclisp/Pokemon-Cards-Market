import styles from '../css/Layout.module.css'
import Nav from './Nav'
import SignInModal from './Modals/modals.jsx'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Scripts/firebaseconfig'

const Layout = ({children}) => {
    const [user] = useAuthState(auth)

    return (
        <React.Fragment>
            <Nav/>
            <SignInModal />
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </React.Fragment>
    )
}

export default Layout