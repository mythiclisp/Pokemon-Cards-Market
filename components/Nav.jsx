import navStyles from '../css/Nav.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Scripts/firebaseconfig'

export default function Nav() {

    let [user] = useAuthState(auth)

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
                            <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"/>
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
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>  
                            <Link href='/cart'>
                                <a className='absolute inset-y-0 left-0 h-full w-full'></a>
                            </Link>
                        </div>
                        <div className='modal-trigger' data-target='modal-account'>
                            <img style={{objectFit: 'cover',}} src={user.photoURL} alt="Profile picture" className='border-emerald-500 border-2 rounded-full h-8 w-8 rounded-full'/>
                        </div>
                        <div className="modal-trigger border-teal-900 border-2 bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" data-target='modal-createpost'>Create Post</div>
                        <svg onClick={() => auth.signOut()} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        </> : 
                        <>
                        <div className='modal-trigger bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' data-target='modal-login'>Login</div>
                        <div className='modal-trigger bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium' data-target='modal-signup'>Sign up</div>
                        </>}
                    </div>
                </div>
            </div>
        </nav>
    )
}