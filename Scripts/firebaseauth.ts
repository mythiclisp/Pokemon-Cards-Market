import { auth } from './firebaseconfig'
import * as _ from 'lodash'

export function signUp(e: any) {

    // Sign up form
    const signUpForm = e.target.parentNode

    //When submitted
    signUpForm.addEventListener('submit',(e: any) => {

        //Prevent page reload
        e.preventDefault()

        //Get credential values from form
        const displayName: string = signUpForm['signup-displayname'].value
        const email: string = signUpForm['signup-email'].value;
        const password: string = signUpForm['signup-password'].value;

        auth.createUserWithEmailAndPassword(email, password).then(response => {

            //Close the form and reset it's values
            const modal: HTMLElement = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signUpForm.reset()

            //Set the display name
            return response.user.updateProfile({

                displayName: displayName
            })
        }).catch(err => {
            console.warn('Sign up error')
        })

    })
}

auth.onAuthStateChanged(user => {
    console.log(user ? `User detected: ${user.displayName}` : 'User not detected')
})

export function logIn(e: any) {

    // Log in form 
    const logInForm = e.target.parentNode

    //When submitted
    logInForm.addEventListener('submit',(e: any) => {
        e.preventDefault()

        //Get credential values from form
        const email: string = logInForm['login-email'].value
        const password: string = logInForm['login-password'].value

        //Log the user in with email and password
        auth.signInWithEmailAndPassword(email, password).then(() => {
            
            //Close the form and reset it's values
            const modal: HTMLElement = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            logInForm.reset();
        }).catch(err => {
            alert(err)
            console.warn('Sign in error')
        }) 
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const modals: any = document.querySelectorAll('.modal');
    const collapsibles: any = document.querySelectorAll('.collapsible')
    M.Modal.init(modals);
    M.Collapsible.init(collapsibles)
    
    document.querySelector('.logout-btn').addEventListener('click', () => {
        
        auth.signOut()
    })
})