import React, { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { CurrencyDollarIcon, GlobeIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Scripts/firebaseconfig'
import getRates, { returnRates } from "../../Scripts/currency"
import Link from 'next/link'
import { addToCart } from '../../Scripts/firebaseauth'

const product = {
  images: [
    {
      id: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ]
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {


    const { query } = useRouter();
    const { id } = query;
    
    //Refrence to firestore collection
    let postsRef = db.collection('Posts')

    //Make state variable for posts
    let [post, setPost] = useState()

    let [authUser] = useAuthState(auth)

    let [computedPrice, setPrice] = useState(0)

    let [userLink, setUserLink] = useState()

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
    
    useEffect(() => {
        if (authUser) {
            
            db.collection('Posts').doc(id).get().then(res => {

                setPost(res)
            })   
        }
        if (authUser) {
    
            getData(authUser.uid).then(res => {
    
                setUserLink(res)
            })  
        }
    }, [authUser])
    useEffect(() => {
        if (authUser) {
            if (post) {
                console.log(post.data().createdAt)
                console.log(new Date())

                returnRates(authUser).then(res => {
              
                    let calcPrice = Math.round(res.rate * parseFloat(Math.round(post.data().price * 100)/100) * 100) /100
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
                        <p className="text-xl font-medium text-gray-900">{computedPrice}</p>
                    </div>
                </div>
                <div className="mt-10 lg:col-start-8 lg:col-span-5">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-medium text-gray-900 max-w-xs">
                            {`Created on ${typeof post.data().createdAt} by `}
                            {userLink}
                        </h1>
                    </div>
                </div>

                {/* Image gallery */}
                <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                    {product.images.map((image) => (
                    <img
                        key={image.id}
                        src={post.data().image}
                        alt={image.imageAlt}
                        className={classNames(
                        image.primary ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                        'rounded-lg'
                        )}
                    />
                    ))}
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
                className="modal-trigger mt-8 w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                data-target='modal-buy'
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