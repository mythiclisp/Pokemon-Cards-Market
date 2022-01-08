import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { auth, functions } from '../Scripts/firebaseconfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { deletePosts } from '../Scripts/firebasedb'
import Posts from '../components/Posts.jsx'
export default function Home() {
  const [user] = useAuthState(auth)


  return (
    <React.Fragment>
      <h1>Home</h1>
      {user ? (user.email === 'theonlybaconsandwich@gmail.com' ?
      <React.Fragment>
        <h3>Admin Actions: </h3>
        <div className="container center-align prompts-container">
          <button className='btn-large pulse green waves-effect' onClick={deletePosts}>
            Delete all posts
          </button>
        </div>
        <div className='border-break'></div>
      </React.Fragment> :
      null) : null
      }
      <div className="container center-align prompts-container">
        {user ?
        <button className='btn-large pulse yellow waves-effect modal-trigger' data-target='modal-createpost'>
          Create a post
        </button> :
        <React.Fragment>
          <div className="row">
            <div className="col s1">
              <button className='btn-large pulse purple waves-effect modal-trigger' data-target='modal-login'>
                Login
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col s1">
              <button className='btn-large pulse teal waves-effect modal-trigger' data-target='modal-signup'>
                Signup
              </button>
            </div>
          </div>
        </React.Fragment>}

      </div>
      <h3>Posts</h3>
      {user ? 
      <Posts limit={10} sort='createdAt'/>:
      <h3>
        Logn in to see posts</h3>
      }
    </React.Fragment>
  )
}
