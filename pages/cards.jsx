import { initial } from 'lodash'
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import Posts from '../components/Posts'
import { auth } from '../Scripts/firebaseconfig'
import { useAuthState } from 'react-firebase-hooks/auth'


const Home = () => {

    const [user] = useAuthState(auth)

    return (
        <React.Fragment>
            <h1>Cards</h1>
            {user ?
            <React.Fragment>
                <h3>Popular</h3>
                <Posts limit={5}/>
                <h3>Trending</h3>
                <Posts limit={5}/>
                <h3>Recomended</h3>
                <Posts limit={5}/>
            </React.Fragment>
            : <h3>Please log in or sign up</h3>}
        </React.Fragment>
    )
}

export default Home