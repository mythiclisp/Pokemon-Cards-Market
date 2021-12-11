import React from 'react'
import modalStyles from '../../css/Modals.module.css'
import {logIn, signUp} from '../../Scripts/firebaseauth.js'
import { auth } from '../../Scripts/firebaseconfig.js'


const email = 'user1@x.com'
const password = 'password'


const SignInModal = () => {

    const handleSubmit = e => {
        
        //Prevent Page reload
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <div id="modal-signup" className="modal">
                <div className="modal-content">
                    <h4>Sign up</h4><br />
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input type="email" id="signup-email" required />
                            <label htmlFor="signup-email">Email address</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="signup-password" required />
                            <label htmlFor="signup-password">Choose password</label>
                        </div>
                        <button type='submit' className="btn yellow darken-2 z-depth-0 center-align" onClick={signUp}>Sign up</button>
                        <p className="error pink-text center-align"></p>
                    </form>
                </div>
            </div>
            <div id="modal-login" className="modal">
                <div className="modal-content">
                <h4>Login</h4><br />
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input type="email" id="login-email" required />
                        <label htmlFor="login-email">Email address</label>
                    </div>
                    <div className="input-field">
                        <input type="password" id="login-password" required />
                        <label htmlFor="login-password">Your password</label>
                    </div>
                    <button className="btn yellow darken-2 z-depth-0" onClick={logIn}>Login</button>
                </form>
                </div>
            </div>
        </React.Fragment>
    )    
}

export default SignInModal


