import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Posts from "../components/Posts";
import { auth, db, functions } from "../Scripts/firebaseconfig";
import { getCart } from "../Scripts/firebasedb";
import { stripe } from "../Scripts/firebasefunctions";

export default function Cart() {

    let [user] = useAuthState(auth)

    let checkout = useRef(null)

    function handleCheckout(e) {

        checkout.current.innerHTML = 'Loading Checkout'

        if (user) {

            //Get user cart items
            getCart(user).then((response:any) => {

                //Cloud function that creates stripe checkout
                const createStripeCheckout = functions.httpsCallable('createStripeCheckout')

                //For line items
                let postsList:object[] = []
                let postIds:string[] = []

                //Loop through cart items
                response.forEach((post:any) => {

                    //Get price
                    let price:number = Math.round(Math.round(post.price * 100)/100 * 10000) /100

                    //Push to list
                    postsList.push({
                        quantity: 1,
                        price_data: {
                          currency: "usd",
                          unit_amount: (100) * (price / 100), // 10000 = 100 USD
                          product_data: {
                            name: post.header,
                          },
                        },
                    })

                    postIds.push(post.id)
                })

                const list:object[] = [{userId: user.uid, posts: postsList, postIds: postIds.join(',')}]

                db.collection("Users").doc(user.uid).get().then((res:any) => {

                    list.push(res.data().currency)
                })

                createStripeCheckout(list).then((res) => {

                    const sessionId = res.data.id

                    //Redirect to stripe chechout
                    stripe.redirectToCheckout({sessionId: sessionId})
                }).catch(err => {

                    console.log(err)

                    M.toast({html: 'Failed to create checkout'})
                    checkout.current.innerHTML = 'Checkout'
                })
            })
        }
    }

    return (
        <React.Fragment>
            <h3>Cart</h3>
            {auth.currentUser ? <Posts limit={30} cart={true}></Posts> : ''}
            <button
            className='text-center text-slate-50 mb-10 rounded px-10 py-5 w-auto bg-indigo-500'
            onClick={() => handleCheckout(self)}
            ref={checkout}>
                Checkout
            </button>
        </React.Fragment>
    )
}