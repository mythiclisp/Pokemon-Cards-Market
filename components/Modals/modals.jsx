import React from 'react'
import modalStyles from '../../css/Modals.module.css'
import {logIn, signUp} from '../../Scripts/firebaseauth.ts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../Scripts/firebaseconfig'

const SignInModal = () => {

    const [user] = useAuthState(auth)

    const handleSubmit = e => {
        
        //Prevent Page reload
        e.preventDefault()
    }

    const sendPasswordReset = e => {
        const email = e.target.parentNode.children[0].children[0].value
        auth.sendPasswordResetEmail(email).then(response => {
            console.log(response)
        })
    }

    const changeDisplayName = e => {
        const proposedDisplayName = e.target.parentNode.children[1].value
        auth.currentUser.updateProfile({
            displayName: proposedDisplayName
        })
    }

    return (
        <React.Fragment>
            <div id="modal-signup" className="modal">
                <div className="modal-content">
                    <h4>Sign up</h4><br />
                    <form id="signup-form" onSubmit={handleSubmit}>
                        <div className="input-field">
                            <input type="text" id="signup-displayname" required />
                            <label htmlFor="signup-password">Display Name</label>
                        </div>
                        <div className="input-field">
                            <input type="email" id="signup-email" required />
                            <label htmlFor="signup-email">Email address</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="signup-password" required />
                            <label htmlFor="signup-password">Choose password</label>
                        </div>
                        <button type='submit' className="btn yellow darken-2 z-depth-0 center-align waves-effect waves-green" onClick={signUp}>Sign up</button>
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
                        <ul className="collapsible">
                            <li>
                                <div className="collapsible-header teal-text">Reset Password</div>
                                <div className="collapsible-body">
                                    <div className='forgot-password-form'>
                                        <div className="input-field">
                                            <input type="email" id='forgot-password-email' />
                                            <label htmlFor="forgot-password-email">Email</label>
                                        </div>
                                        <button className="btn yellow darken-2 z-depth-0" onClick={sendPasswordReset}>Send reset email</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className="btn yellow darken-2 z-depth-0" onClick={logIn}>Login</button>
                    </form>
                </div>
            </div>
            <div id="modal-account" className="modal">
                <div className="modal-content">
                    <h4>Account</h4>
                    <h6>
                        {user ? user.displayName : null}
                    </h6>
                    <h6>
                        {user ? user.email : null}
                    </h6>
                    <br />
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header teal-text">Reset Password</div>
                            <div className="collapsible-body">
                                <div className='forgot-password-form'>
                                    <div className="input-field">
                                        <input type="email" id='forgot-password-email' />
                                        <label htmlFor="forgot-password-email">Email</label>
                                    </div>
                                    <button className="btn yellow darken-2 z-depth-0" onClick={sendPasswordReset}>Send reset email</button>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="collapsible-header teal-text">Change Display Name</div>
                            <div className="collapsible-body">
                                <div className='forgot-password-form'>
                                        <label htmlFor="forgot-password-email">Display name</label>
                                        <input type="email" id='forgot-password-email' placeholder={user ? user.displayName : null} />
                                    <button className="btn yellow darken-2 z-depth-0" onClick={changeDisplayName}>Change</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )    
}

export default SignInModal


