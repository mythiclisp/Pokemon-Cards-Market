/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useMemo, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon, ClockIcon } from '@heroicons/react/outline'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../Scripts/firebaseconfig'
import { returnRates } from '../Scripts/currency'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface currency {
    rate?: number,
    symbol?: string
}

export default function Example() {

    let [user] = useAuthState(auth)
    let [orders, setOrders] = useState([])
    let [userCurrency, setCurrency] = useState<currency>({rate: 1, symbol: '$'})

    const getOrders = async () => {

        if (!user) return

        // Get user doc
        let userRef:any = await db.collection("Users").doc(user.uid).get()

        // Get all the user's orders
        const orders:any = Promise.all(userRef.data().orders.map(order => db.collection("Orders").doc(order).get()))

        // Get the posts in the orders
        const posts:any =  Promise.all((await orders).map(order => Promise.all(order.data().posts.map(post => db.collection("Posts").doc(post).get()))))

        // Get all the data in the posts
        const orderData = Promise.all((await posts).map(order => Promise.all(order.map(post => Object.assign(post.data(), {id: post.id})))))

        const resolvedOrders = (await orders)

        const currency: currency = await returnRates(user)

        setCurrency(userCurrency = currency)

        // Format data into JSON, add order totals and status
        const formatedOrderData = Promise.all((await orderData).map(async (order:any[], index) => (
            {
                data: order,
                orderTotal: `${currency.symbol}${Math.round((order.map(post => parseFloat(post.price)).reduce((a, b) => a + b, 0)) * currency.rate * 100) / 100}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                orderId: resolvedOrders[index].id,
                orderTime: resolvedOrders[index].data().createdAt,
                status: resolvedOrders[index].data().status
            }
        )))

        return formatedOrderData
    };

    function toDateTime(secs:number) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]

        let date = t.getUTCDate()
        let month = months[t.getMonth()]
        let year = t.getUTCFullYear()
        return `${month} ${date-1}, ${year}`
    }

    useMemo(() => {

        getOrders().then(res => {

            if (!res) return

            setOrders(res)
        })
    }, [user])

    return (
        <>
            <div className="bg-white">
                <div className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
                    <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                        <p className="mt-2 text-sm text-gray-500">
                        Check the status of recent orders, manage returns, and discover similar products.
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            * Orders can take up to 5 minutes be processed
                        </p>
                    </div>
                    </div>

                    <div className="mt-16">
                    <h2 className="sr-only">Recent orders</h2>
                    <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
                        <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                        {orders.map((order) => (
                            <div
                            key={order.orderId}
                            className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                            >
                            <h3 className="sr-only">
                                Order placed on {toDateTime(order.orderTime.seconds)}
                            </h3>

                            <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
                                <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-4 sm:grid-cols-3 lg:col-span-3">
                                <div>
                                    <dt className="font-medium text-gray-900">Order number</dt>
                                    <dd className="mt-1 text-gray-500">{order.orderId}</dd>
                                </div>
                                <div className="hidden sm:block">
                                    <dt className="font-medium text-gray-900">Date placed</dt>
                                    <dd className="mt-1 text-gray-500">
                                        {toDateTime(order.orderTime.seconds)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-gray-900">Total amount</dt>
                                    <dd className="mt-1 font-medium text-gray-900">{order.orderTotal}</dd>
                                </div>
                                </dl>

                                <Menu as="div" className="relative flex justify-end lg:hidden">
                                <div className="flex items-center">
                                    <Menu.Button className="-m-2 p-2 flex items-center text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Options for order {order.orderId}</span>
                                    <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-bottom-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                        {({ active }) => (
                                            <a
                                            href={order.href}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            >
                                            View
                                            </a>
                                        )}
                                        </Menu.Item>
                                        <Menu.Item>
                                        {({ active }) => (
                                            <a
                                            href={order.invoiceHref}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            >
                                            Invoice
                                            </a>
                                        )}
                                        </Menu.Item>
                                    </div>
                                    </Menu.Items>
                                </Transition>
                                </Menu>
                            </div>

                            {/* Products */}
                            <h4 className="sr-only">Items</h4>
                            <ul role="list" className="divide-y divide-gray-200">
                                {order.data.map((product) => (
                                <li key={product.id} className="p-4 sm:p-6">
                                    <div className="flex items-center sm:items-start">
                                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                                        <img
                                        src={product.image}
                                        alt={product.header}
                                        className="w-full h-full object-center object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 ml-6 text-sm">
                                        <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                        <h5>{product.header}</h5>
                                        <p className="mt-2 sm:mt-0">{`${userCurrency.symbol}${Math.round(parseFloat(product.price) * userCurrency.rate * 100) / 100}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                        </div>
                                        <p className="hidden text-gray-500 sm:block sm:mt-2">{product.description}</p>
                                    </div>
                                    </div>

                                    <div className="mt-6 sm:flex sm:justify-between">
                                    <div className="flex items-center">
                                        <ClockIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
                                        <p className="ml-2 text-sm font-medium text-gray-500">
                                        {order.status}
                                        </p>
                                    </div>

                                    <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                                        <div className="flex-1 flex justify-center">
                                        <a
                                            href={`/post/${product.id}`}
                                            className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                        >
                                            View product
                                        </a>
                                        </div>
                                        <div className="flex-1 pl-4 flex justify-center">
                                        {/* @ts-ignore */}
                                        <Link href="#" className="text-indigo-600 whitespace-nowrap hover:text-indigo-500">
                                            Buy again
                                        </Link>
                                        </div>
                                    </div>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
