import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { returnRates } from "../Scripts/currency"
import { auth, db } from "../Scripts/firebaseconfig"
import { deleteCartItem } from "../Scripts/firebasedb"
import Link from "next/link"
import { useState } from "react"

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
    const index = props.index

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
            return (
            <Link href={`/users/${UID}`}>
                {displayName}
            </Link>)
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
          <div className="grid grid-auto-row row-gap-10">
            <div key={id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={image}
                    alt={header}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-base m-0">
                      <Link href={`../post/${id}`}>
                        <span className="text-gray-700">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {header}
                        </span>
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{userLink}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{computedPrice}</p>
                
                </div>
            </div>
            <div className="w-full h-full flex items-end">
              <button
                className="modal-trigger max-h-2 w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                data-target='modal-buy'
                onClick={() => deleteCartItem(index, authUser)}
              >Remove from cart</button>
            </div>
          </div>
        </React.Fragment>
    )
}