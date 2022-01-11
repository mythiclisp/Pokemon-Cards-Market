import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Scripts/firebaseconfig";

export default function BreadCrumbs() {

    let [urlPath, setUrlPath] = useState([])
    let [user] = useAuthState(auth)

    let router = useRouter()

    useEffect(() => {

        if (window) {

            var pathArray = window.location.pathname.split('/')
            setUrlPath(pathArray)
            window.addEventListener('locationchange', function(){
                console.log('hello')
                var pathArray = window.location.pathname.split('/')
                setUrlPath(pathArray)
            }) 
        }
    }, [user])

    useEffect(() => {
        let array = router.asPath.split('/')
        array.splice(0,1)
        array.splice(-1,1)
        setUrlPath(array)
    }, [router])

    return (
        <React.Fragment>
            {urlPath ? 
            <nav className="text-gray-500 my-8 bg-transparent" aria-label="Breadcrumb">
                <ol className="list-none p-0 inline-flex ml-10">
                    <li className="flex items-center text-grey-500">
                        <div className="relative">
                                <Link href='/'>
                                    <a className='absolute inset-y-0 left-0 h-full w-full'></a>
                                </Link>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </div>
                    </li>
                    {urlPath.map((urlFragment, index) => (
                        <>
                        {urlFragment==='' ? null :
                        <li key={index} className="flex items-center text-grey-500">
                            <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                            <Link href={`/${urlFragment}`}>
                                <a className="text-grey-500">{urlFragment}</a>
                            </Link>
                        </li>}
                        </>
                    ))}
                </ol>
            </nav>
            : null}
        </React.Fragment>
    )
}