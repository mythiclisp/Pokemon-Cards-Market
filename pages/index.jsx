import Image from 'next/image'
import React, { useEffect } from 'react'
import { auth, db, functions } from '../Scripts/firebaseconfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { deletePosts, addTemplatePosts } from '../Scripts/firebasedb'
import { createCheckout } from '../Scripts/firebasefunctions'
import Posts from '../components/Posts.jsx'
import { reloadOrders } from '../Scripts/firebaseauth'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {

  const [user] = useAuthState(auth)

  return (
    <React.Fragment>
      <h1>Home</h1>
      {user ? (user.email === 'user1@gmail.com' ?
      <React.Fragment>
        <h3>Admin Actions: </h3>
        <div className="container center-align prompts-container">
          <button className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500' onClick={deletePosts}>
            Delete all posts
          </button>
          <button className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500' onClick={() => addTemplatePosts(user)}>
            Add template posts
          </button>
          <button className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500' onClick={() => reloadOrders()}>
            Reload Orders
          </button>
          <button className='modal-trigger' data-target='modal-test'>Click for modal</button>
        </div>
        <div className='border-break'></div>
      </React.Fragment> :
      null) : null
      }
      <div className="container center-align prompts-container">
        {user ?
        <button className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-emerald-500 modal-trigger' data-target='modal-createpost'>
          Create a post
        </button> :
        <React.Fragment>
          <div className="row">
            <div className="col s1">
              <button className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500 modal-trigger' data-target='modal-login'>
                Login
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col s1">
              <button className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500 modal-trigger' data-target='modal-signup'>
                Signup
              </button>
            </div>
          </div>
        </React.Fragment>}

      </div>
      <button className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500' onClick={createCheckout}>
            Checkout
      </button>
      <h3>Posts</h3>
      {user ?
      <Posts limit={10} sort='createdAt'/>:
      <h3>
        Login in to see posts
      </h3>
      }
    </React.Fragment>
  )
}
