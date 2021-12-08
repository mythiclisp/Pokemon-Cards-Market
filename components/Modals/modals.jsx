import React from 'react'
import modalStyles from '../../styles/Modals.module.css'

const SignInModal = () => {

    return (
        <React.Fragment>
            <div id="modal-signup" className="modal">
                <div className="modal-content">
                    <h4>Sign up</h4><br />
                    <form id="signup-form">
                        <div className="input-field">
                            <input type="email" id="signup-email" required />
                            <label htmlFor="signup-email">Email address</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="signup-password" required />
                            <label htmlFor="signup-password">Choose password</label>
                        </div>
                        <button className="btn yellow darken-2 z-depth-0 center-align">Sign up</button>
                        <p className="error pink-text center-align"></p>
                    </form>
                </div>
            </div>
            <button data-target="modal-signup" className="btn modal-trigger">Modal</button>
        </React.Fragment>
    )    
}

export default SignInModal