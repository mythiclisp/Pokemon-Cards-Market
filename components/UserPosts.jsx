import React, { useEffect, useRef, useState } from 'react'
import PostStyles from '../css/Posts.module.css'
import { auth, db } from '../Scripts/firebaseconfig'
import { returnRates } from '../Scripts/currency'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'

const UserPosts = ({ maxLength, UID }) => {

    //Holds the postHTML content
    let [postHTML, setPostHTML] = useState([])

    //The firebase user state
    const [user] = useAuthState(auth)

    async function getData(UID) {

        const userRef = db.collection('Users').doc(UID)
        const doc = await userRef.get()
        if (doc.data()) {
            const email = doc.data().email
            const displayName = doc.data().displayName
            const currency = doc.data().currency
            return <Link href={`/users/${UID}`}>{displayName}</Link>
        }
        return `User ID ${UID} could not be found`
    }

    useEffect(() => {

        //Re-init posts
        let collapsibleElems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(collapsibleElems)
    }, [postHTML])

    //Updates the post list
    useEffect(() => {

        //Make sure user is defined
        if (user === null) return

        let postHTMLList = []

        let userPosts

        db.collection('Users').doc(UID).get().then(doc => {

            let unParsedUserPosts = doc.data().posts
            unParsedUserPosts = unParsedUserPosts.slice(1)
            userPosts = unParsedUserPosts.split(',')

            console.log(userPosts)

            for (let x=0;x<userPosts.length;x++) {

                let postDocId = userPosts[x]

                console.log(postDocId)

                let i = 0

                db.collection('Posts').doc(postDocId).get().then(post => {

                    //Skip the template post
                    if (post.id === 'Initial') return

                    //Tracks the max length
                    i++

                    //For the max length of the post list
                    if (i < maxLength + 2) {

                        //Wait until currency conversion is return
                        returnRates(user).then((response) => {

                            //Set variables for post info
                            let price = Math.round(post.data().price * 100)/100
                            let calcPrice = Math.round(response.rate * parseFloat(price) * 100) /100
                            const symbol = response.symbol

                            //Clear the post list
                            setPostHTML(postHTML.concat())
                            getData(post.data().user).then((response) => {
                                let userLinkRef = response
                                //Push the post HTML content to the list

                                postHTMLList.push(
                                <li key={Math.random()} className={PostStyles.post}>
                                    <div className={`collapsible-header ${PostStyles.post_header}`}>
                                        <div className={PostStyles.post_header_content} style={{float: 'left'}}>
                                            <span>
                                                {`${post.data().header} by `}
                                                <span>
                                                    {userLinkRef}
                                                </span>
                                            </span>
                                            <span style={{}}>
                                                {post.data().date}
                                            </span>
                                        </div>
                                        <div className={PostStyles.post_price_content}>
                                            {`${symbol}${calcPrice}`}
                                        </div>
                                    </div>
                                    <div className={`collapsible-body ${PostStyles.post_body}`}>
                                        <div className={PostStyles.post_header}>
                                            {
                                                `${post.data().header}
                                                ${post.data().description}`
                                            }
                                            <button className='btn pulse red waves-effect modal-trigger' data-target='modal-buy'>Buy now</button>
                                            <button className='btn pulse orange waves-effect'>Add to cart</button>
                                        </div>
                                    </div>
                                </li>)

                                //Set the state to the post HTML list to update the UI
                                setPostHTML(postHTML.concat(postHTMLList))
                            })


                        })
                    }
                })
            }
        })
    }, [user])

    return (
        <React.Fragment>
            <ul className={`collapsible posts-container ${PostStyles.posts_container}`}>
                {postHTML}
            </ul>
        </React.Fragment>
    )
}

export default UserPosts

