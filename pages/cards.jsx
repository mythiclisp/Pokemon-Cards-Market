import { initial } from 'lodash'
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import Posts from '../components/Posts'
import { auth } from '../Scripts/firebaseconfig'
import { useAuthState } from 'react-firebase-hooks/auth'


const Home = () => {

    const [user] = useAuthState(auth)

    // TODO FIX THIS, CAUSES ERROR DURING NPM RUN BUILD
    // TODO INSTEAD OF INNERHTML, USE REACT STATES
    // useEffect(() => {
    //     document.querySelectorAll('.posts-container').forEach(postContainer => {

    //         postContainer.innerHTML = `
    //             <ul class="collapsible">
    //                 <div class="collapsible-header">
    //                     <span style="opacity: 0;">Header</span>
    //                 </div>
    //                 <div class="collapsible-body"></div>
    //             </ul>
    //         `
    //     })
    // })

    return (
        <React.Fragment>
            <h1>Cards</h1>
            {user ? 
            <React.Fragment>
                <h3>Popular</h3>
                <Posts />
                <h3>Trending</h3>
                <Posts />
                <h3>Recomended</h3>
                <Posts />
            </React.Fragment>
            : <h3>Please log in or sign up</h3>}
        </React.Fragment>
    )
}

export default Home