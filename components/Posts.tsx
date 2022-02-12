import { auth, db } from '../Scripts/firebaseconfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import React, { useMemo, useState } from 'react'
import Post from './Post'
import { useEffect } from 'react'
import PostStyles from '../css/Posts.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getCart, getOrders } from '../Scripts/firebasedb'
import { returnRates } from '../Scripts/currency'

export default function Posts(props) {

    let sort = props.sort ? props.sort : 'createdAt'

    //Refrence to firestore collection
    let postsRef = db.collection('Posts')

    //Query results by date and add limit
    const query =  postsRef.orderBy(sort, "desc").limit(props.limit)

    //Query posts by UID
    let userQuery = props.uid ? postsRef.where('user', '==', props.uid) : null

    //Make state variable for posts
    let [posts] = useCollectionData((props.uid ? userQuery : query), {idField: 'id'})
    let [cartPosts, setCartPosts]:any = useState()
    let [orderPosts, setOrderPosts] = useState(null)
    let [emptyCart, setEmptyCart] = useState(false)

    useEffect(() => {

        if (!(cartPosts && cartPosts.map((post, index) => <Post key={post.id} cart={true} index={index} postId={post.id} data={post}/>)) && props.cart ) {

            setEmptyCart(emptyCart = true)
            console.log(props.cart)
        } else {

            setEmptyCart(emptyCart = false)
        }
    },[cartPosts])

    let [authUser] = useAuthState(auth)


    useEffect(() => {

        //Reinitialize the materilize components
        let collapsibleElems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(collapsibleElems)
    },[posts, cartPosts])

    useEffect(() => {
        if (props.cart) {

            getCart(authUser).then((res:any) => {

                setCartPosts(res)
            })
        }
        if (props.orders) {

            getOrders(authUser.uid).then(res => {

                let ordersList = []

                for (let i=0;i<res[0].length;i++) {

                    returnRates(auth.currentUser).then((response:any) => {
                        console.log(res)

                        let calcPrice = Math.round(response.rate * parseFloat((Math.round(res[1][1][i] * 100)/100 * 100).toString()) /100)
                        const symbol = response.symbol

                        let order = res[0][i]
                        ordersList.push(props.orders ? order &&
                        <>
                            <h2 className='my-10'>Order {i+1}</h2>
                            <h1 className="text-slate-600">{`Order Status: ${res[1][0][i]}`}</h1>
                            <h1 className="text-slate-600">{`Total Price: ${symbol}${calcPrice}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                            <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                                {order.map((post, index) => <Post key={index} order={true} index={index} postId={post.id} data={post}/>)}
                            </div>
                        </> : null)

                        setOrderPosts(<div className='mt-6 grid grid-cols-1'>{ordersList}</div>)
                    })
                }

                if (!res) {

                    console.log("No res")
                }
            })
        }
    }, [authUser])

    return (
        <React.Fragment>
            {emptyCart ?
            <h1 className='my-10'>
                Empty cart
            </h1>:
            <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {props.cart ? cartPosts && cartPosts.map((post, index) => <Post key={post.id} cart={true} index={index} postId={post.id} data={post}/>)
                    : null}
                    {!props.cart && !props.orders ? posts && posts.map(post => <Post key={post.id} postId={post.id} data={post}/>) : null}
                </div>
                {props.orders ? orderPosts : null}
            </div>
            </div>}
        </React.Fragment>
    )
}