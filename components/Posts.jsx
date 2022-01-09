import { auth, db } from '../Scripts/firebaseconfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import React, { useMemo, useState } from 'react'
import Post from './PostCollapsible.jsx'
import { useEffect } from 'react'
import PostStyles from '../css/Posts.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getCart } from '../Scripts/firebasedb'

export default function Posts(props) {
    
    let sort = props.sort ? props.sort : 'createdAt'
    
    //Refrence to firestore collection
    let postsRef = db.collection('Posts')
   
    //Query results by date and add limit
    const query =  postsRef.orderBy(sort, "desc").limit(props.limit)

    //Query posts by UID
    let userQuery = props.uid ? postsRef.where('user', '==', props.uid) : null

    //Make state variable for posts
    let [posts] = props.cart ? useCollectionData() : useCollectionData((props.uid ? userQuery : query), {idField: 'id'})
    let [cartPosts, setCartPosts] = useState()

    let [authUser] = useAuthState(auth)
    
    
    useEffect(() => {

        //Reinitialize the materilize components
        let collapsibleElems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(collapsibleElems)
    },[posts, cartPosts])

    useEffect(() => {
        if (props.cart) {

            getCart(authUser).then(res => {

                setCartPosts(res)
            })  
        }
    }, [authUser])

    return (
        <React.Fragment>
            <ul className={`collapsible popout posts-container ${PostStyles.posts_container}`}>
                {props.cart ? 
                cartPosts && cartPosts.map(post => <Post key={post.id} postId={post.id} data={post}/>)
                : posts && posts.map(post => <Post key={post.id} postId={post.id} data={post}/>)}
            </ul>
        </React.Fragment>
    )
}