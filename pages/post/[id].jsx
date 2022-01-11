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
  name: 'Basic Tee',
  price: '$35',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Women', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
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
  ],
  colors: [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: false },
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors',
  ],
}
const policies = [
  { name: 'International delivery', icon: GlobeIcon, description: 'Get your order in 2 years' },
  { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

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
    
    
    useEffect(() => {
        if (authUser) {
            
            db.collection('Posts').doc(id).get().then(res => {

                setPost(res)
                console.log(post)
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
            returnRates(authUser).then(res => {
            
                let calcPrice = Math.round(res.rate * parseFloat(Math.round(post.data().price * 100)/100) * 100) /100
                const symbol = res.symbol
    
                setPrice(`${symbol} ${calcPrice}`)
                console.log(post)
            })      
        }

    }, [post])

  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  return (
    <React.Fragment>
        {post ?
        <div className="bg-white">
        <div className="pt-6 pb-16 sm:pb-24">
            <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                <div className="lg:col-start-8 lg:col-span-5">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-medium text-gray-900">{post.data().header}</h1>
                        <p className="text-xl font-medium text-gray-900">{computedPrice}</p>
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

                {/* Policies */}
                <section aria-labelledby="policies-heading" className="mt-10">
                    <h2 id="policies-heading" className="sr-only">
                    Our Policies
                    </h2>

                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {policies.map((policy) => (
                        <div key={policy.name} className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                        <dt>
                            <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                        </div>
                    ))}
                    </dl>
                </section>
                </div>
            </div>
            </div>
        </div>
        </div> :
        null }
    </React.Fragment>
  )
}