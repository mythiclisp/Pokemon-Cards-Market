import { auth, db } from '../Scripts/firebaseconfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import React, { useMemo, useState } from 'react'
import Post from './PostCollapsible.jsx'
import { useEffect } from 'react'
import PostStyles from '../css/Posts.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Posts(props) {
    
    let sort = props.sort ? props.sort : 'createdAt'
    
    //Refrence to firestore collection
    let postsRef = db.collection('Posts')
   
    //Query results by date and add limit
    const query =  postsRef.orderBy(sort, "desc").limit(props.limit)

    //Query posts by UID
    let userQuery = props.uid ? postsRef.where('user', '==', props.uid) : null

    let [user] = useAuthState(auth)
    
    //Make state variable for posts
    let [posts] = useCollectionData((props.uid ? userQuery : query), {idField: 'id'})
    let [userPosts] = useCollectionData((props.uid ? userQuery : query), {idField: 'id'})

    useEffect(() => {
        let collapsibleElems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(collapsibleElems)
    },[posts])

    return (
        <React.Fragment>
            <ul className={`collapsible popout posts-container ${PostStyles.posts_container}`}>
                {posts && posts.map(post => <Post key={post.id} data={post}/>)}
            </ul>
        </React.Fragment>
    )
}