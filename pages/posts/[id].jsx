import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Post from "../../components/PostCollapsible";
import { auth, db } from "../../Scripts/firebaseconfig";

export default function Posts() {

    const { query } = useRouter();
    const { id } = query;
    
    //Refrence to firestore collection
    let postsRef = db.collection('Posts')

    //Make state variable for posts
    let [post, setPost] = useState()

    let [authUser] = useAuthState(auth)
    
    
    useEffect(() => {
        if (authUser) {
            
            db.collection('Posts').doc(id).get().then(res => {

                setPost(res)
                console.log(post)
            })   
        }
    }, [authUser])

    return (
        <React.Fragment>
            <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {post ? 
                    <Post key={id} postId={id} data={post.data()}/>
                    : null}
                </div>
            </div>
            </div>
        </React.Fragment>
    )
}