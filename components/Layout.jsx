import styles from '../css/Layout.module.css'
import Nav from './Nav'
import Modals from './Modals/modals.jsx'
import React, { useEffect } from 'react'
import loadAnimation from '../Scripts/Animations/main'

const Layout = ({children}) => {

    useEffect(() => {

    })

    return (
        <React.Fragment>
            <Nav/>
            <Modals />
            <canvas id="bg" className={styles.animation_canvas}></canvas>
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </React.Fragment>
    )
}

export default Layout