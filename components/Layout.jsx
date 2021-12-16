import styles from '../css/Layout.module.css'
import Nav from './Nav'
import SignInModal from './Modals/modals.jsx'
import React, { useEffect } from 'react'
import loadAnimation from '../Scripts/Animations/main'

const Layout = ({children}) => {

    useEffect(() => {
        
    })

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