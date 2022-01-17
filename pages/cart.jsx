import Link from "next/link";
import React from "react";
import Posts from "../components/Posts";
import { auth } from "../Scripts/firebaseconfig";

export default function Cart() {

    return (
        <React.Fragment>
            <h3>Cart</h3>
            {auth.currentUser ? <Posts limit={30} cart={true}></Posts> : ''}

            <Link href='/checkout/cart'>
                <a className="text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500 mb-32" aria-current="page">Checkout</a>
            </Link>
        </React.Fragment>
    )
}