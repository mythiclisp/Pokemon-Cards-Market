import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Scripts/firebaseconfig'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Nav() {
    function openModal(modalName) {

        let instance = M ? M.Modal.getInstance(document.getElementById(modalName)) : null
        instance.open()
    }

    let [user] = useAuthState(auth)

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
                            <img className="hidden lg:block h-8 w-auto" src="/Images/logo.svg" alt="Workflow"/>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link href='/'>
                                    <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</a>
                                </Link>
                                <Link href='/about'>
                                    <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">About</a>
                                </Link>
                                <Link href='/cards'>
                                    <a href="#" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Cards</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="gap-x-5 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {user ?
                        <>
                        <div className='relative mr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                            </svg>
                            <Link href='/orders'>
                                <a className='absolute inset-y-0 left-0 h-full w-full'></a>
                            </Link>
                        </div>
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <Link href='/cart'>
                                <a className='absolute inset-y-0 left-0 h-full w-full'></a>
                            </Link>
                        </div>
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="focus:bg-gray-900 inline-flex justify-center w-full rounded-md  shadow-sm px-4 py-2 bg-gray-900 text-sm font-medium text-white">
                                    Account
                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 bg-white">
                                <div className="py-1">
                                    <Menu.Item>
                                    {({ active }) => (
                                        <a
                                        href="#"
                                        className={'text-gray-700 block px-4 py-2 text-sm'}
                                        onClick={() => openModal('modal-account')}
                                        >
                                        Account settings
                                        </a>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <a
                                        href="/orders"
                                        className={'text-gray-700 block px-4 py-2 text-sm'}
                                        >
                                        Orders
                                        </a>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <a
                                        href="/cart"
                                        className={'text-gray-700 block px-4 py-2 text-sm'}
                                        >
                                        Shopping Cart
                                        </a>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                                    {({ active }) => (
                                        <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        onClick={() => auth.signOut()}
                                        >
                                        Signout
                                        </a>
                                    )}
                                    </Menu.Item>
                                </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <div
                        className="cursor-pointer bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => openModal('modal-account')}
                        >Create Post</div>
                        <svg onClick={() => auth.signOut()} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        </> :
                        <>
                        <div
                        className='cursor-pointer bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                        onClick={() => openModal('modal-login')}
                        >Login</div>
                        <div
                        className='cursor-pointer bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                        onClick={() => openModal('modal-account')}
                        >Sign up</div>
                        </>}
                    </div>
                </div>
            </div>
        </nav>
    )
}