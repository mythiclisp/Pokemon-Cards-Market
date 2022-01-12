import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { returnRates } from "../Scripts/currency"
import { auth, db } from "../Scripts/firebaseconfig"
import { deleteCartItem, deletePost } from "../Scripts/firebasedb"
import Link from "next/link"
import { useState } from "react"

export default function Post (props) {

    //Define props
    const {header, date, description, image, user, price} = props.data
    const id = props.postId
    const index = props.index

    let [authUser] = useAuthState(auth)

    //The price and symbol of the post
    let [computedPrice, setPrice] = useState('Undefined')

    //Link to the user page
    let [userLink, setUserLink] = useState(<Link href='/Users/undefined'>User</Link>)

    let [admin] = useState(authUser.email==='theonlybaconsandwich@gmail.com')
    console.log(admin, props.cart)

    //Returns user link
    async function getData(UID) {

        const userRef = db.collection('Users').doc(UID)
        const doc = await userRef.get()
        if (doc.data()) {
            const email = doc.data().email
            const displayName = doc.data().displayName
            const currency = doc.data().currency
            return (
            <Link href={`/users/${UID}`}>
                {displayName}
            </Link>)
        }
        return `User ID ${UID} could not be found`
    }

    //Collects data for state variables
    useEffect(() => {

        returnRates(auth.currentUser).then((res) => {
            let calcPrice = Math.round(res.rate * parseFloat(Math.round(price * 100)/100) * 100) /100
            const symbol = res.symbol

            setPrice(`${symbol} ${calcPrice}`)
        })

        getData(user).then((res) => {

            setUserLink(res)
        })
    },[user])

    return (
        <React.Fragment>
          <div className="grid grid-auto-row row-gap-10">
            <div key={id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={image}
                    alt={header}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                  <div className="absolute left-0 top-0 w-full h-full select-none">
                    <h1 style={{fontSize: '2rem'}} className="relative w-auto ml-5 mt-5 text-slate-50 hidden group-hover:block">
                      <span className="relative rounded opacity-50 cursor-pointer bg-black aspect-square h-full px-2">
                        {props.cart ? <span className="opacity-100" onClick={() => deleteCartItem(index, authUser)}>✖</span> : 
                        (admin ? <span className="opacity-100" onClick={() => deletePost(id, authUser.uid)}>✖</span>: null)}
                      </span>
                    </h1>
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
        </React.Fragment>
    )
}