import React, { useEffect, useRef, useState } from 'react'
import PostStyles from '../css/Posts.module.css'
import { db } from '../Scripts/firebaseconfig'

const Posts = () => {

    let loadingPostsRefs = useRef()

    let [postHTML, setPostHTML] = useState([])

    useEffect(() => {

        //Re-init posts
        let collapsibleElems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(collapsibleElems)
    }, [postHTML])

    useEffect(() => {

        db.collection('Posts').get().then(posts => {

            let i = 0

            let postHTMLList = []

            posts.forEach((post) => {


                i++

                if (post.id != 'Initial') {
                    postHTMLList.push(
                        <li key={Math.random()} className={PostStyles.post}>
                            <div className={`collapsible-header ${PostStyles.post_header}`}>
                                <div className={PostStyles.post_header_content} style={{float: 'left'}}>
                                    {`${post.data().header} by `}
                                    <span style={{fontWeight: 'bold'}}>
                                        {post.data().user}
                                    </span>
                                </div>
                                <div className={PostStyles.post_price_content}>
                                    {`$${post.data().price}`}
                                </div>
                            </div>
                            <div className="collapsible-body">{post.data().description}</div>
                        </li>)
                }
            })

            setPostHTML(postHTML.concat(postHTMLList))
        })
    }, [])

    return (
        <React.Fragment>
            <ul ref={loadingPostsRefs} className={`collapsible posts-container ${PostStyles.posts_container}`}>
                {postHTML}
            </ul>
        </React.Fragment>
    )
}

export default Posts

