import React from 'react'
import { auth } from '../Scripts/firebaseconfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { deletePosts, addTemplatePosts } from '../Scripts/firebasedb'
import Posts from '../components/Posts.jsx'
import { reloadOrders } from '../Scripts/firebaseauth'

export default function Home() {


  function openModal(modalName) {

    let instance = M ? M.Modal.getInstance(document.getElementById(modalName)) : null
    instance.open()
  }

  const [user] = useAuthState(auth)

  return (
    <React.Fragment>
      <h1>Home</h1>
      {user ? (user.email === 'theonlybaconsandwich@gmail.com' ?
      <React.Fragment>
        <h3>Admin Actions: </h3>
        <div className="container center-align prompts-container">
          <button className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500' onClick={deletePosts}>
            Delete all posts
          </button>
          <button
          className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500'
          onClick={() => addTemplatePosts(user)}
          >
            Add template posts
          </button>
          <button
          className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500'
          onClick={() => reloadOrders()}
          >
            Reload Orders
          </button>
        </div>
        <div className='border-break'></div>
      </React.Fragment> :
      null) : null
      }
      <div className="container center-align prompts-container">
        {user ?
        <button
        className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-emerald-500'
        onClick={() => openModal('modal-createpost')}
        >
          Create a post
        </button> :
        <React.Fragment>
          <div className="row">
            <div className="col s1">
              <button
              className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500'
              onClick={() => openModal('modal-login')}
              >
                Login
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col s1">
              <button
              className='text-center text-slate-50 rounded px-10 py-5 w-auto bg-indigo-500'
              onClick={() => openModal('modal-signup')}
              >
                Signup
              </button>
            </div>
          </div>
        </React.Fragment>}

      </div>
      <h3>Posts</h3>
      {user ?
      <Posts limit={10} sort='createdAt'/>:

      <Posts limit={10} sort='createdAt'/>
      }
    </React.Fragment>
  )
}
