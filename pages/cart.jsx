import React from "react";
import CartPosts from "../components/CartPosts";
import { auth } from "../Scripts/firebaseconfig";

export default function Cart() {

    return (
        <React.Fragment>
            <h3>Cart</h3>
            {auth.currentUser ? <CartPosts maxLength={1000} UID={auth.currentUser.uid}/> : ''}
        </React.Fragment>
    )
}