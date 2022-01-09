import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import PostStyles from '../css/Posts.module.css'
import getRates, { returnRates } from "../Scripts/currency"
import { auth, db } from "../Scripts/firebaseconfig"
import { deletePost } from "../Scripts/firebasedb"
import Link from "next/link"
import { useState } from "react"
import { addToCart } from "../Scripts/firebaseauth"

export default function Post (props) {

    let usersRef = db.collection('Users')
    let cartQuery = usersRef.where('cart', '==', ``)
    cartQuery.get().then(users => {
        users.forEach(user => {
            let data = user.data()
            db.collection('Users').doc(user.data().id).set(data)
        })
    })

    //Define props
    const {header, date, description, image, user, price} = props.data
    const id = props.postId

    let [authUser] = useAuthState(auth)

    //The price and symbol of the post
    let [computedPrice, setPrice] = useState('Undefined')

    //Link to the user page
    let [userLink, setUserLink] = useState(<Link href='/Users/undefined'>User</Link>)

    //Returns user link
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

    //Collects data for state variables
    useEffect(() => {

        returnRates(auth.currentUser).then(res => {
            let calcPrice = Math.round(res.rate * parseFloat(Math.round(price * 100)/100) * 100) /100
            const symbol = res.symbol

            setPrice(`${symbol} ${calcPrice}`)
        })

        getData(user).then(res => {

            setUserLink(res)
        })
    },[user])

    return (
        <React.Fragment>
            <li key={Math.random()} className={PostStyles.post} data-postid={id}>
                <div className={`collapsible-header ${PostStyles.post_header}`}>
                    <div className={PostStyles.post_header_content} style={{float: 'left'}}>
                        <span>
                            {`${header} by `}
                            <span>
                                {userLink}
                                {' '}
                            </span>
                        </span>
                        <span style={{}}>
                            {date}
                        </span>
                    </div>
                    <div className={PostStyles.post_price_content}>
                        {authUser ? (authUser.email==='theonlybaconsandwich@gmail.com' ? 
                        <span 
                            onClick={() => deletePost(id, user)}
                            style={{fontWeight: 'bold', marginRight: '2rem', cursor: 'pointer'}}>✕</span> : ''):''}
                        {computedPrice}
                    </div>
                </div>
                <div className={`collapsible-body ${PostStyles.post_body}`}>
                    <div className={PostStyles.post_header}>
                        <div className={PostStyles.post_buttons}>
                            <button className='btn pulse red waves-effect modal-trigger' data-target='modal-buy'>Buy now</button>
                            <button className='btn pulse orange waves-effect' onClick={() => addToCart(id)}>Add to cart</button>
                        </div>
                        <span className={PostStyles.post_body_content}>
                            {
                                `${header}
                                ${description}`
                            }
                        </span>
                    </div>
                </div>
            </li>
        </React.Fragment>
    )
}