import Link from "next/link";
import React from "react";

export default function Home() {

    return (
        <React.Fragment>
            <div style={{gridTemplateColumns: '.4fr 1.6fr'}} className="grid mb-10 w-auto h-auto">
                <h1 style={{fontSize: '4rem'}} className='text-indigo-500 font-bold pr-5 border-r-2 border-gray-300'>404</h1>
                <div className='h-auto w-auto ml-5'>
                    <h1 style={{fontSize: '4rem'}} className='text-black-500 font-bold'>Page not found</h1>
                    <h1 className='text-gray-400'>Please check the URL for typos</h1>
                </div>
            </div>
            <div className="relative">
                <button className="text-center text-slate-50 rounded py-2 w-32 bg-indigo-500">
                    Back To Home
                </button>
                <Link href='/'>
                    <a className='absolute inset-y-0 left-0 h-full w-full'></a>
                </Link>
            </div>
        </React.Fragment>
    )
}