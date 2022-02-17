import styles from '../css/Layout.module.css'
import Nav from './Nav'
import Modals from './Modals/modals.jsx'
import React, { useEffect, useState } from 'react'
import loadAnimation from '../Scripts/Animations/main'
import SearchBar from './SearchBar'
import BreadCrumbs from './breadCrumbs'
import Footer from './Footer'
import { db } from '../Scripts/firebaseconfig'

const Layout = ({children}) => {
    
    let [posts, setPosts] = useState(null)

    async function getPosts() {

        const posts = await db.collection("Posts").get()
        return Promise.all(posts.docs.map(post => post))
    }

    getPosts().then(setPosts)

    return (
        <React.Fragment>
            <Nav/>
            <SearchBar placeholder='enter card' data={posts}/>
            <Modals />
            <canvas id="bg" className={styles.animation_canvas}></canvas>
            <div className={styles.container}>
                <main className={styles.main}>
                    <BreadCrumbs/>
                    {children}
                </main>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Layout