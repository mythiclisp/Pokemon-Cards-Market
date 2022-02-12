import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import Posts from "../components/Posts"
import { auth } from "../Scripts/firebaseconfig"


export default function Home() {

    let [user] = useAuthState(auth)

    return (
        <React.Fragment>
            {user ?
            <>
                <Posts limit={30} orders={true}></Posts>
            </>
            :
            <>Log in or sign up to see orders</>}
        </React.Fragment>
    )
}