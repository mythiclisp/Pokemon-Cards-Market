import { auth, db } from '../Scripts/firebaseconfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import React, { useState  } from 'react'
import Post from './Post'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getCart, getOrders } from '../Scripts/firebasedb'
import { returnRates } from '../Scripts/currency'

export default function Posts(props) {

    let sort = props.sort ? props.sort : 'views'

    //Refrence to firestore collection
    let postsRef = db.collection('Posts')

    //Query results by date and add limit
    let query =  postsRef.where("bought", "==", false).orderBy(sort, props.asc ? 'asc' : 'desc').limit(props.limit)

    //Query posts by UID
    let userQuery = props.uid ? postsRef.where('user', '==', props.uid) : null

    //Make state variable for posts
    let [posts] = useCollectionData((props.uid ? userQuery : query), {idField: 'id'})
    let [cartPosts, setCartPosts]:any = useState()
    let [orderPosts, setOrderPosts] = useState(null)
    let [emptyCart, setEmptyCart] = useState(false)
    let [authUser] = useAuthState(auth)
    let [trendingPosts, setTrendingPosts] = useState(null)

    useEffect(() => {

        let trendingList = []

        db.collection("Posts").orderBy('views', 'asc').get().then(res => {

            res.forEach(post => {

                const curTime = Math.round(new Date().getTime() / 1000)

                if (post.data().createdAt > curTime-2419200) {

                    trendingList.push(post.data())
                }
            })

            setTrendingPosts(trendingPosts = trendingList)
        })

    }, [posts])



    useEffect(() => {

        if (!(cartPosts && cartPosts.map((post, index) => <Post key={post.id} cart={true} index={index} postId={post.id} data={post}/>)) && props.cart ) {

            setEmptyCart(emptyCart = true)
        } else {

            setEmptyCart(emptyCart = false)
        }
    },[cartPosts])

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
            })
        }
    }, [authUser])

    function handlePostsType() {

        try {

            if (props.cart) {

                return cartPosts && cartPosts.map((post, index) => <Post key={post.id} cart={true} index={index} postId={post.id} data={post}/>)
            }

            else if (props.orders) {

                return orderPosts
            }

            else if (props.trending) {

                return trendingPosts.map(post => <Post key={post.id} postId={post.id} data={post}/>)
            } else {

                return posts &&
                (!props.orderBy ?
                [...posts].reverse().map(post => <Post key={post.id} postId={post.id} data={post}/>)
                : posts.map(post => <Post key={post.id} postId={post.id} data={post}/>))
            }
        } catch(err) {

            return null
        }

    }

    return (
        <React.Fragment>
            {emptyCart ?
            <h1 className='my-10'>
                Empty cart
            </h1>:
            <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {handlePostsType() ? handlePostsType() : null}
                </div>
                {props.orders ? orderPosts : null}
            </div>
            </div>}
        </React.Fragment>
    )
}