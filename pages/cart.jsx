import React from "react";
import Posts from "../components/Posts";
import { auth } from "../Scripts/firebaseconfig";

export default function Cart() {

    return (
        <React.Fragment>
            <h3>Cart</h3>
            {auth.currentUser ? <Posts limit={30}></Posts> : ''}
        </React.Fragment>
    )
}