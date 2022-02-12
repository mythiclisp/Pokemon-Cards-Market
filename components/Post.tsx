import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { returnRates } from "../Scripts/currency"
import { auth, db } from "../Scripts/firebaseconfig"
import { deleteCartItem, deletePost } from "../Scripts/firebasedb"
import Link from "next/link"
import { useState } from "react"
import { addToCart } from "../Scripts/firebaseauth"

export default function Post(props) {

    //Define props
    const {header, date, description, image, user, price} = props.data
    const id = props.postId
    const index = props.index

    let [authUser]:any = useAuthState(auth)

    //The price and symbol of the post
    let [computedPrice, setPrice] = useState('Undefined')

    //Link to the user page
    let [userLink, setUserLink] = useState(<Link href='/Users/undefined'>User</Link>)

    let [admin] = useState(authUser ? authUser.email==='theonlybaconsandwich@gmail.com':null)

    let [deleted, removePost] = useState(false)

    //Returns user link
    async function getData(UID) {

        const userRef = db.collection('Users').doc(UID)
        const doc = await userRef.get()

        if (doc.data()) {

            const displayName = doc.data().displayName

            return (
            <Link href={`/users/${UID}`}>
                {displayName}
            </Link>)
        }
        return `User ID ${UID} could not be found`
    }

    function handleCartDelete(index, user) {

      deleteCartItem(index,user)
      removePost(deleted = true)
      console.log(deleted)
    }

    //Collects data for state variables
    useEffect(() => {

        returnRates(auth.currentUser).then((res:any) => {

            let calcPrice = Math.round(res.rate * parseFloat((Math.round(price * 100)/100 * 100).toString()) /100)
            const symbol = res.symbol

            setPrice(`${symbol} ${calcPrice}`)
        })

        getData(user).then((res:any) => {

            setUserLink(res)
        })
    },[user])

    return (
        <React.Fragment>
          {deleted ? null :
          <div className="grid grid-auto-row row-gap-10">
          <div key={id} className="group relative">
              <div className="relative w-full min-h-80 bg-gray-200 relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={image}
                  alt={header}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
                <div className="absolute left-0 top-0 w-full h-full select-none">
                {admin || props.cart ?
                  <h1 style={{fontSize: '2rem'}} className="relative w-auto ml-5 mt-5 text-slate-50 hidden group-hover:block">
                    <span className="relative rounded opacity-50 cursor-pointer bg-black aspect-square h-full px-2">
                      <span className="opacity-100"
                      onClick={() => {
                        props.cart ?
                        handleCartDelete(index, authUser) :
                        deletePost(id, authUser.id)}
                      }
                      >✖</span>
                    </span>
                  </h1>
                 :
                <></>
                }
                {!props.cart ?
                <h1 style={{fontSize: '2rem'}} className="absolute top-0 right-0 w-auto mr-5 mt-5 text-slate-50 hidden group-hover:block">
                  <span className="relative rounded opacity-50 cursor-pointer bg-black aspect-square h-full px-2">

                      <span className="opacity-100"
                      onClick={() => {
                        addToCart(id)
                      }
                      }
                      >
                        <span className='text-black'>
                          ✖
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </span>
                    </span>
                  </h1>
                 : null}

                </div>
              </div>
              <div style={{gridTemplateColumns: '1.45fr .55fr'}} className="mt-4 grid grid-cols-2">
                <div>
                  <h3 className="text-base m-0">
                    <Link href={`../post/${id}`}>
                      <span className="text-gray-700">
                        <span aria-hidden={true} className="z-0 absolute bottom-0 left-0 right-0 top-20"></span>
                        {header}
                      </span>
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{userLink}</p>
                </div>
                <p className="text-right text-sm font-medium text-gray-900">{computedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
          </div>
          </div>
          }

        </React.Fragment>
    )
}