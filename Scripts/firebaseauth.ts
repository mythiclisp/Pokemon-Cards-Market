import { auth } from './firebaseconfig'
import * as _ from 'lodash'

let errStop = false

function handleErrs(err: Object) {
    
    //Stops errors from accumulating
    errStop = true

    //Checks the type of error

    //Sign in Errors
    if (err.toLocaleString().includes('auth/email-already-in-use')) return 'Email is already in use'
    if (err.toLocaleString().includes('auth/invalid-email')) return 'Email adress is not valid'
    if (err.toLocaleString().includes('auth/operation-not-allowed')) return 'Server under maitenance currently'
    if (err.toLocaleString().includes('auth/weak-password')) return 'Password is not strong enough'
    
    //Log in Errors
    if (err.toLocaleString().includes('auth/invalid-email')) return 'Email adress is not valid'
    if (err.toLocaleString().includes('auth/user-disabled')) return 'This account has been disabled'
    if (err.toLocaleString().includes('auth/user-not-found')) return 'No user is registered under this email'
    if (err.toLocaleString().includes('auth/wrong-password')) return 'Password is incorrect'

    //General errors
    if (err.toLocaleString().includes('auth/too-many-requests')) return 'All requests blocked due to unusual activity detected from device'

    //If error is not recognizable
    else return 'Unknown error'
}

export function signUp(e: any) {

    if (errStop === true) return

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
            console.log(err)
            M.toast({html: handleErrs(err)})
        })

    })
}

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
            console.log(err)

            M.toast({html: handleErrs(err)})
        }) 
    })
}

auth.onAuthStateChanged(user => {
    console.log(user ? `User detected: ${user.displayName}` : 'User not detected')
})

document.addEventListener('DOMContentLoaded', () => {

    //Initialize materialize components
    const modals: any = document.querySelectorAll('.modal');
    const collapsibles: any = document.querySelectorAll('.collapsible')
    M.Modal.init(modals);
    M.Collapsible.init(collapsibles)

    //Onclick for signout button
    document.querySelector('.logout-btn').addEventListener('click', () => {
        
        auth.signOut()
    })
})
