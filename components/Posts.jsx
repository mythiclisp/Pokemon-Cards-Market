import React, { useEffect, useRef, useState } from 'react'
import PostStyles from '../css/Posts.module.css'
import { auth, db } from '../Scripts/firebaseconfig'
import { returnRates } from '../Scripts/currency'
import { useAuthState } from 'react-firebase-hooks/auth'

const Posts = ({ maxLength, currency }) => {

    let loadingPostsRefs = useRef()

    let [postHTML, setPostHTML] = useState([])

    const [user] = useAuthState(auth)

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
                if (i < maxLength + 2) {

                    returnRates(user).then(response => {
                        let price = Math.round(post.data().price * 100)/100
                        let calcPrice = Math.round(response.rate * parseFloat(price) * 100) /100
                        const symbol = response.symbol
                        setPostHTML(postHTML.concat())

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
                                            {`${symbol}${calcPrice}`}
                                        </div>
                                    </div>
                                    <div className="collapsible-body">
                                        <img src={post.data().image} alt="Post image" style={{width: '60%'}}/>
                                        {`${post.data().description}`}
                                    </div>
                                </li>)
                                setPostHTML(postHTML.concat(postHTMLList))

                        }

                    })
                }
            })
        })
    }, [user])

    return (
        <React.Fragment>
            <ul ref={loadingPostsRefs} className={`collapsible posts-container ${PostStyles.posts_container}`}>
                {postHTML}
            </ul>
        </React.Fragment>
    )
}

export default Posts

