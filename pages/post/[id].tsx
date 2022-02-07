import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, functions } from '../../Scripts/firebaseconfig'
import { returnRates } from "../../Scripts/currency"
import Link from 'next/link'
import { addToCart } from '../../Scripts/firebaseauth'
import { stripe } from '../../Scripts/firebasefunctions'

export default function Example() {


    const { query } = useRouter();
    const { id } = query;


    //Make state variable for posts
    let [post, setPost]:any = useState()

    let [authUser] = useAuthState(auth)

    let [computedPrice, setPrice] = useState('0')

    let [userLink, setUserLink] = useState()

    async function getData(UID) {

        const userRef = db.collection('Users').doc(UID)
        const doc = await userRef.get()
        const postDoc = await db.collection('Posts').doc(id).get()

        if (doc.data()) {
            const displayName = doc.data().displayName
            console.log(postDoc.data())
            return (
            <Link href={`/users/${postDoc.data().user}`}>
                <a className='text-blue-500'>
                    {postDoc.data().userDisplayName}
                </a>
            </Link>)
        }
        return `User ID ${UID} could not be found`
    }

    function handleCheckout() {

        if (post) {

            let price:number = Math.round(Math.round(post.data().price * 100)/100 * 10000) /100

            let postData = [
                {
                    postIds: post.id,
                    posts: [{
                        quantity: 1,
                        price_data: {
                            currency: "usd",
                            unit_amount: (100) * (price / 100), // 10000 = 100 USD
                            product_data: {
                                name: post.data().header,
                            },
                        },
                    }],
                    userId: authUser.uid,
                },
                JSON.parse(window.localStorage.getItem(authUser.email)).currency,
            ]

            console.log(postData)

            let createStripeCheckout = functions.httpsCallable('createStripeCheckout')

            createStripeCheckout(postData).then((res) => {

                const sessionId = res.data.id

                //Redirect to stripe checkout
                stripe.redirectToCheckout({sessionId: sessionId})
            }).catch(err => {

                console.log(err)

                M.toast({html: 'Failed to create checkout'})
            })
        }
    }

    useEffect(() => {
        if (authUser) {

            db.collection('Posts').doc(id).get().then(res => {

                setPost(res)
            })
        }
        if (authUser) {

            getData(authUser.uid).then((res:any) => {

                setUserLink(res)
            })
        }
    }, [authUser])
    useEffect(() => {
        if (authUser) {
            if (post) {
                console.log(post.data().createdAt)
                console.log(new Date())

                returnRates(authUser).then((res:any) => {

                    let calcPrice = Math.round(res.rate * parseFloat((Math.round(post.data().price * 100)/100).toString()) * 100) /100
                    const symbol = res.symbol

                    setPrice(`${symbol} ${calcPrice}`)
                })
            }
        }

    }, [post])

  return (
    <React.Fragment>
        {post ?
        <div className="bg-white">

        <div className="pt-6 pb-16 sm:pb-24">
            <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                <div className="lg:col-start-8 lg:col-span-5">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-medium text-gray-900 max-w-xs">{post.data().header}</h1>
                        <p className="text-xl font-medium text-gray-900">{computedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                    </div>
                </div>
                <div className="mt-10 lg:col-start-8 lg:col-span-5">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-medium text-gray-900 max-w-xs">
                            {`Created on ${post.data().date} by `}
                            <div className='text-blue-300'>
                                {userLink}
                            </div>
                        </h1>
                    </div>
                </div>

                {/* Image gallery */}
                <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                    <img
                        key={post.id}
                        src={post.data().image}
                        alt={post.data().header}
                        className='lg:col-span-2 lg:row-span-2'
                    />
                </div>
                </div>

                <div className="mt-8 lg:col-span-5">

                <button
                onClick={() => addToCart(post.id)}
                className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Add to cart
                </button>
                <button
                className="mt-8 w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleCheckout()}
                >
                Buy now
                </button>

                {/* Product details */}
                <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Description</h2>

                    <div
                    className="mt-4 prose prose-sm text-gray-500"
                    dangerouslySetInnerHTML={{ __html: post.data().description }}
                    />
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-900">Card condition</h2>

                    <div className="mt-4 prose prose-sm text-gray-500">
                    <ul role="list">
                        {post.data().condition}
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div> :
        null }
    </React.Fragment>
  )
}